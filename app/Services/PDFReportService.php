<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\CommissionService;

class PDFReportService
{
    public function generateSalesReport(User $user, string $month = null, string $year = null): string
    {
        $month = $month ?? Carbon::now()->month;
        $year = $year ?? Carbon::now()->year;
        $monthName = Carbon::create($year, $month)->translatedFormat('F Y');

        $sales = Sale::where('user_id', $user->id)
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->with(['user', 'approvedBy', 'rejectedBy'])
            ->orderBy('payment_date', 'desc')
            ->get();

        $summary = [
            'total_sales' => $sales->count(),
            'approved_sales' => $sales->where('status', 'aprovado')->count(),
            'pending_sales' => $sales->where('status', 'pendente')->count(),
            'rejected_sales' => $sales->where('status', 'recusado')->count(),
            'total_revenue' => $sales->where('status', 'aprovado')->sum('received_amount'),
            'commission_base' => $sales->where('status', 'aprovado')->sum(function($sale) {
                return $sale->received_amount - $sale->shipping_amount;
            }),
            'commission_earned' => $this->calculateCommission($user, $month, $year),
        ];

        $performanceLevel = $this->getPerformanceLevel($summary['total_revenue']);
        $motivationalMessage = $this->getMotivationalMessage($performanceLevel, $summary['total_revenue']);
        $salesHistory = $this->getSalesHistory($user, 6);

        $data = [
            'user' => $user,
            'sales' => $sales,
            'summary' => $summary,
            'month_name' => $monthName,
            'generated_at' => now()->format('d/m/Y H:i'),
            'performance_level' => $performanceLevel,
            'motivational_message' => $motivationalMessage,
            'sales_history' => $salesHistory,
        ];

        $pdf = PDF::loadView('reports.sales', $data)
                  ->setPaper('a4', 'portrait');

        $filename = "relatorio_vendas_{$user->name}_{$month}_{$year}.pdf";
        
        return $pdf->download($filename);
    }

    public function generateCommissionReport(User $user, string $month = null, string $year = null): string
    {
        $month = $month ?? Carbon::now()->month;
        $year = $year ?? Carbon::now()->year;
        $monthName = Carbon::create($year, $month)->translatedFormat('F Y');

        $sales = Sale::where('user_id', $user->id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->with('user')
            ->orderBy('payment_date', 'desc')
            ->get();

        $commissionDetails = [];
        $totalCommissionBase = 0;
        $totalCommission = 0;

        foreach ($sales as $sale) {
            $commissionBase = $sale->received_amount - $sale->shipping_amount;
            $totalCommissionBase += $commissionBase;
            
            $commissionDetails[] = [
                'sale' => $sale,
                'commission_base' => $commissionBase,
                'commission_rate' => $this->getCommissionRate($totalCommissionBase),
                'commission_amount' => $commissionBase * $this->getCommissionRate($totalCommissionBase),
            ];
        }

        $totalCommission = $this->calculateCommission($user, $month, $year);

        $commissionService = new CommissionService();
        $commissionRanges = $commissionService->getCommissionRanges();
        
        $data = [
            'user' => $user,
            'commission_details' => $commissionDetails,
            'total_commission_base' => $totalCommissionBase,
            'total_commission' => $totalCommission,
            'commission_rate' => $this->getCommissionRate($totalCommissionBase),
            'commission_ranges' => $commissionRanges,
            'month_name' => $monthName,
            'generated_at' => now()->format('d/m/Y H:i'),
        ];

        $pdf = PDF::loadView('reports.commission', $data)
                  ->setPaper('a4', 'portrait');

        $filename = "relatorio_comissoes_{$user->name}_{$month}_{$year}.pdf";
        
        return $pdf->download($filename);
    }

    public function generateTeamReport(string $month = null, string $year = null): string
    {
        $month = $month ?? Carbon::now()->month;
        $year = $year ?? Carbon::now()->year;
        $monthName = Carbon::create($year, $month)->translatedFormat('F Y');

        $teamData = User::where('role', 'vendedora')
            ->withCount([
                'sales as total_sales' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                          ->whereMonth('payment_date', $month);
                },
                'sales as approved_sales' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                          ->whereYear('payment_date', $year)
                          ->whereMonth('payment_date', $month);
                }
            ])
            ->withSum([
                'sales as total_revenue' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                          ->whereYear('payment_date', $year)
                          ->whereMonth('payment_date', $month);
                }
            ], 'received_amount')
            ->orderBy('total_revenue', 'desc')
            ->get()
            ->map(function ($user) use ($month, $year) {
                // Calculate commission base manually to avoid DB::raw issues
                $commissionBase = Sale::where('user_id', $user->id)
                    ->where('status', 'aprovado')
                    ->whereYear('payment_date', $year)
                    ->whereMonth('payment_date', $month)
                    ->get()
                    ->sum(function ($sale) {
                        return ($sale->received_amount ?: 0) - ($sale->shipping_amount ?: 0);
                    });
                
                $user->commission_base = $commissionBase;
                $user->commission_earned = $this->calculateCommission($user, $month, $year);
                $user->commission_rate = $this->getCommissionRate($commissionBase);
                return $user;
            });

        $teamSummary = [
            'total_sellers' => $teamData->count(),
            'total_sales' => $teamData->sum('total_sales'),
            'total_approved_sales' => $teamData->sum('approved_sales'),
            'total_revenue' => $teamData->sum('total_revenue'),
            'total_commissions' => $teamData->sum('commission_earned'),
            'avg_sales_per_seller' => $teamData->count() > 0 ? round($teamData->sum('total_sales') / $teamData->count(), 1) : 0,
            'top_performer' => $teamData->first(),
        ];

        $data = [
            'team_data' => $teamData,
            'team_summary' => $teamSummary,
            'month_name' => $monthName,
            'generated_at' => now()->format('d/m/Y H:i'),
        ];

        $pdf = PDF::loadView('reports.team', $data)
                  ->setPaper('a4', 'landscape');

        $filename = "relatorio_equipe_{$month}_{$year}.pdf";
        
        return $pdf->download($filename);
    }

    private function calculateCommission(User $user, int $month, int $year): float
    {
        $commissionBase = Sale::where('user_id', $user->id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->get()
            ->sum(function ($sale) {
                return ($sale->received_amount ?: 0) - ($sale->shipping_amount ?: 0);
            });

        return $commissionBase * $this->getCommissionRate($commissionBase);
    }

    private function getCommissionRate(float $commissionBase): float
    {
        $commissionService = new CommissionService();
        return $commissionService->calculateCommissionRate($commissionBase) / 100;
    }

    private function getPerformanceLevel(float $revenue): string
    {
        if ($revenue >= 60000) {
            return 'elite';
        } elseif ($revenue >= 50000) {
            return 'avancada';
        } elseif ($revenue >= 40000) {
            return 'intermediaria';
        } else {
            return 'iniciante';
        }
    }

    private function getMotivationalMessage(string $level, float $revenue): array
    {
        $messages = [
            'elite' => [
                'title' => '🏆 Vendedora Elite BBKits!',
                'message' => 'Parabéns! Você é uma verdadeira estrela da equipe BBKits. Seu desempenho excepcional inspira toda a equipe!',
                'achievement' => 'Meta ultrapassada com excelência!',
                'icon' => '👑'
            ],
            'avancada' => [
                'title' => '⭐ Vendedora Avançada!',
                'message' => 'Excelente trabalho! Você está entre as melhores vendedoras BBKits. Continue brilhando!',
                'achievement' => 'Desempenho acima da média!',
                'icon' => '🌟'
            ],
            'intermediaria' => [
                'title' => '💪 Vendedora Intermediária!',
                'message' => 'Ótimo trabalho! Você atingiu sua meta e está no caminho certo para se tornar uma vendedora avançada.',
                'achievement' => 'Meta alcançada com sucesso!',
                'icon' => '🎯'
            ],
            'iniciante' => [
                'title' => '🌱 Vendedora em Crescimento',
                'message' => $revenue >= 30000 ? 
                    'Você está quase lá! Faltam apenas R$ ' . number_format(40000 - $revenue, 2, ',', '.') . ' para atingir sua meta e começar a ganhar comissões!' :
                    'Cada venda é um passo importante. Continue persistindo e logo você alcançará suas metas!',
                'achievement' => 'Em desenvolvimento constante',
                'icon' => '🚀'
            ]
        ];

        return $messages[$level];
    }

    public function getSalesHistory(User $user, int $months = 6): array
    {
        $history = [];
        $currentDate = Carbon::now();

        for ($i = 0; $i < $months; $i++) {
            $month = $currentDate->copy()->subMonths($i);
            $revenue = Sale::where('user_id', $user->id)
                ->where('status', 'aprovado')
                ->whereYear('payment_date', $month->year)
                ->whereMonth('payment_date', $month->month)
                ->sum('received_amount');

            $history[] = [
                'month' => $month->translatedFormat('F/Y'),
                'revenue' => $revenue,
                'commission' => $this->calculateCommission($user, $month->month, $month->year),
                'performance' => $this->getPerformanceLevel($revenue)
            ];
        }

        return array_reverse($history);
    }
}