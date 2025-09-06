<?php

namespace App\Services;

use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\CommissionService;

class ExcelExportService
{
    public function exportSalesReport($month = null, $year = null)
    {
        $month = $month ?: Carbon::now()->month;
        $year = $year ?: Carbon::now()->year;

        $sales = Sale::with(['user', 'approvedBy'])
            ->whereMonth('payment_date', $month)
            ->whereYear('payment_date', $year)
            ->orderBy('payment_date', 'desc')
            ->get();

        $csv = [];
        $csv[] = ['Relatório de Vendas - ' . Carbon::create($year, $month)->format('F Y')];
        $csv[] = [];
        $csv[] = [
            'ID',
            'Data',
            'Vendedora',
            'Cliente',
            'Valor Total',
            'Frete',
            'Valor Líquido',
            'Forma de Pagamento',
            'Status',
            'Comissão',
            'Aprovado Por',
            'Data Aprovação'
        ];

        foreach ($sales as $sale) {
            $commissionValue = $this->calculateCommission($sale);
            $csv[] = [
                $sale->id,
                $sale->payment_date->format('d/m/Y'),
                $sale->user->name,
                $sale->client_name,
                'R$ ' . number_format($sale->total_amount, 2, ',', '.'),
                'R$ ' . number_format($sale->shipping_amount, 2, ',', '.'),
                'R$ ' . number_format($sale->received_amount, 2, ',', '.'),
                $sale->payment_method,
                $this->getStatusLabel($sale->status),
                $commissionValue > 0 ? 'R$ ' . number_format($commissionValue, 2, ',', '.') : '-',
                $sale->approvedBy ? $sale->approvedBy->name : '-',
                $sale->approved_at ? $sale->approved_at->format('d/m/Y H:i') : '-'
            ];
        }

        $csv[] = [];
        $csv[] = ['Resumo por Vendedora'];
        $csv[] = ['Vendedora', 'Total Vendido', 'Total Aprovado', 'Comissões', 'Meta Atingida'];

        $vendedoras = User::where('role', 'vendedora')->get();
        foreach ($vendedoras as $vendedora) {
            $vendedoraSales = $sales->where('user_id', $vendedora->id);
            $totalVendido = $vendedoraSales->sum('received_amount');
            $totalAprovado = $vendedoraSales->where('status', 'aprovado')->sum('received_amount');
            $totalComissao = $vendedoraSales->where('status', 'aprovado')->sum(function ($sale) {
                return $this->calculateCommission($sale);
            });

            $csv[] = [
                $vendedora->name,
                'R$ ' . number_format($totalVendido, 2, ',', '.'),
                'R$ ' . number_format($totalAprovado, 2, ',', '.'),
                'R$ ' . number_format($totalComissao, 2, ',', '.'),
                $totalAprovado >= 40000 ? 'Sim' : 'Não'
            ];
        }

        return $this->arrayToCsv($csv);
    }

    public function exportCommissionsReport($month = null, $year = null)
    {
        $month = $month ?: Carbon::now()->month;
        $year = $year ?: Carbon::now()->year;

        $vendedoras = User::where('role', 'vendedora')
            ->with(['sales' => function ($query) use ($month, $year) {
                $query->whereMonth('payment_date', $month)
                    ->whereYear('payment_date', $year)
                    ->where('status', 'aprovado');
            }])
            ->get();

        $csv = [];
        $csv[] = ['Relatório de Comissões - ' . Carbon::create($year, $month)->format('F Y')];
        $csv[] = [];
        $csv[] = [
            'Vendedora',
            'Total Vendido Aprovado',
            'Total Base (sem frete)',
            'Faixa de Comissão',
            'Percentual',
            'Valor da Comissão'
        ];

        foreach ($vendedoras as $vendedora) {
            $totalAprovado = $vendedora->sales->sum('received_amount');
            $totalBase = $vendedora->sales->sum(function ($sale) {
                return $sale->received_amount - $sale->shipping_amount;
            });
            $totalComissao = $vendedora->sales->sum(function ($sale) {
                return $this->calculateCommission($sale);
            });

            $faixa = $this->getCommissionTier($totalBase);
            $percentual = $this->getCommissionPercentage($totalBase);

            $csv[] = [
                $vendedora->name,
                'R$ ' . number_format($totalAprovado, 2, ',', '.'),
                'R$ ' . number_format($totalBase, 2, ',', '.'),
                $faixa,
                $percentual . '%',
                'R$ ' . number_format($totalComissao, 2, ',', '.')
            ];
        }

        $csv[] = [];
        $csv[] = ['Total Geral', '', '', '', '', 'R$ ' . number_format($vendedoras->sum(function ($v) {
            return $v->sales->sum(function ($s) {
                return $this->calculateCommission($s);
            });
        }), 2, ',', '.')];

        return $this->arrayToCsv($csv);
    }
    
    /**
     * Export filtered sales report
     */
    public function exportFilteredSalesReport($filters)
    {
        $query = Sale::with(['user', 'approvedBy']);
        
        // Apply date filter
        if ($filters['date_filter'] === 'current_month') {
            $query->whereYear('payment_date', now()->year)
                  ->whereMonth('payment_date', now()->month);
        } elseif ($filters['date_filter'] === 'last_month') {
            $lastMonth = Carbon::now()->subMonth();
            $query->whereYear('payment_date', $lastMonth->year)
                  ->whereMonth('payment_date', $lastMonth->month);
        } elseif ($filters['date_filter'] === 'last_7_days') {
            $query->where('payment_date', '>=', Carbon::now()->subDays(7));
        } elseif ($filters['date_filter'] === 'last_30_days') {
            $query->where('payment_date', '>=', Carbon::now()->subDays(30));
        } elseif ($filters['date_filter'] === 'custom' && !empty($filters['start_date']) && !empty($filters['end_date'])) {
            $query->whereBetween('payment_date', [$filters['start_date'], $filters['end_date']]);
        }
        
        // Apply status filter
        if ($filters['status_filter'] !== 'all') {
            $query->where('status', $filters['status_filter']);
        }
        
        // Apply order status filter
        if (!empty($filters['order_status_filter']) && $filters['order_status_filter'] !== 'all') {
            $query->where('order_status', $filters['order_status_filter']);
        }
        
        $sales = $query->orderBy('payment_date', 'desc')->get();
        
        $csv = [];
        $csv[] = ['Relatório de Vendas Filtradas - ' . now()->format('d/m/Y H:i')];
        $csv[] = ['Filtros: ' . $this->getFilterDescription($filters)];
        $csv[] = [];
        $csv[] = [
            'ID',
            'Token',
            'Data',
            'Vendedora',
            'Cliente',
            'Valor Total',
            'Frete',
            'Valor Líquido',
            'Forma de Pagamento',
            'Status',
            'Status do Pedido',
            'Comissão',
            'Aprovado Por',
            'Data Aprovação'
        ];

        foreach ($sales as $sale) {
            $commissionValue = $this->calculateCommission($sale);
            $csv[] = [
                $sale->id,
                $sale->unique_token ?? '',
                $sale->payment_date ? $sale->payment_date->format('d/m/Y') : '',
                $sale->user->name,
                $sale->client_name,
                'R$ ' . number_format($sale->total_amount, 2, ',', '.'),
                'R$ ' . number_format($sale->shipping_amount, 2, ',', '.'),
                'R$ ' . number_format($sale->received_amount, 2, ',', '.'),
                $sale->payment_method ?? '',
                $this->getStatusLabel($sale->status),
                $this->getOrderStatusLabel($sale->order_status ?? ''),
                $commissionValue > 0 ? 'R$ ' . number_format($commissionValue, 2, ',', '.') : '-',
                $sale->approvedBy ? $sale->approvedBy->name : '-',
                $sale->approved_at ? $sale->approved_at->format('d/m/Y H:i') : '-'
            ];
        }

        return $this->arrayToCsv($csv);
    }
    
    /**
     * Export filtered commissions report
     */
    public function exportFilteredCommissionsReport($filters)
    {
        $query = User::where('role', 'vendedora')
            ->with(['sales' => function ($salesQuery) use ($filters) {
                // Apply date filter to sales relationship
                if ($filters['date_filter'] === 'current_month') {
                    $salesQuery->whereYear('payment_date', now()->year)
                              ->whereMonth('payment_date', now()->month);
                } elseif ($filters['date_filter'] === 'last_month') {
                    $lastMonth = Carbon::now()->subMonth();
                    $salesQuery->whereYear('payment_date', $lastMonth->year)
                              ->whereMonth('payment_date', $lastMonth->month);
                } elseif ($filters['date_filter'] === 'last_7_days') {
                    $salesQuery->where('payment_date', '>=', Carbon::now()->subDays(7));
                } elseif ($filters['date_filter'] === 'last_30_days') {
                    $salesQuery->where('payment_date', '>=', Carbon::now()->subDays(30));
                } elseif ($filters['date_filter'] === 'custom' && !empty($filters['start_date']) && !empty($filters['end_date'])) {
                    $salesQuery->whereBetween('payment_date', [$filters['start_date'], $filters['end_date']]);
                }
                
                // Apply status filter
                if ($filters['status_filter'] !== 'all') {
                    $salesQuery->where('status', $filters['status_filter']);
                } else {
                    $salesQuery->where('status', 'aprovado'); // Default to approved for commissions
                }
            }]);

        $vendedoras = $query->get();

        $csv = [];
        $csv[] = ['Relatório de Comissões Filtradas - ' . now()->format('d/m/Y H:i')];
        $csv[] = ['Filtros: ' . $this->getFilterDescription($filters)];
        $csv[] = [];
        $csv[] = [
            'Vendedora',
            'Total Vendas',
            'Total Aprovado',
            'Total Base (sem frete)',
            'Faixa de Comissão',
            'Percentual',
            'Valor da Comissão'
        ];

        foreach ($vendedoras as $vendedora) {
            $totalVendas = $vendedora->sales->count();
            $totalAprovado = $vendedora->sales->sum('received_amount');
            $totalBase = $vendedora->sales->sum(function ($sale) {
                return $sale->received_amount - $sale->shipping_amount;
            });
            $totalComissao = $vendedora->sales->sum(function ($sale) {
                return $this->calculateCommission($sale);
            });

            $faixa = $this->getCommissionTier($totalBase);
            $percentual = $this->getCommissionPercentage($totalBase);

            $csv[] = [
                $vendedora->name,
                $totalVendas,
                'R$ ' . number_format($totalAprovado, 2, ',', '.'),
                'R$ ' . number_format($totalBase, 2, ',', '.'),
                $faixa,
                $percentual . '%',
                'R$ ' . number_format($totalComissao, 2, ',', '.')
            ];
        }

        $csv[] = [];
        $csv[] = ['Total Geral', '', '', '', '', '', 'R$ ' . number_format($vendedoras->sum(function ($v) {
            return $v->sales->sum(function ($s) {
                return $this->calculateCommission($s);
            });
        }), 2, ',', '.')];

        return $this->arrayToCsv($csv);
    }
    
    /**
     * Get filter description for reports
     */
    private function getFilterDescription($filters)
    {
        $descriptions = [];
        
        switch ($filters['date_filter']) {
            case 'current_month':
                $descriptions[] = 'Período: Mês atual';
                break;
            case 'last_month':
                $descriptions[] = 'Período: Mês passado';
                break;
            case 'last_7_days':
                $descriptions[] = 'Período: Últimos 7 dias';
                break;
            case 'last_30_days':
                $descriptions[] = 'Período: Últimos 30 dias';
                break;
            case 'custom':
                if (!empty($filters['start_date']) && !empty($filters['end_date'])) {
                    $descriptions[] = 'Período: ' . $filters['start_date'] . ' a ' . $filters['end_date'];
                }
                break;
        }
        
        if ($filters['status_filter'] !== 'all') {
            $descriptions[] = 'Status: ' . ucfirst($filters['status_filter']);
        }
        
        if (!empty($filters['order_status_filter']) && $filters['order_status_filter'] !== 'all') {
            $descriptions[] = 'Status do Pedido: ' . $this->getOrderStatusLabel($filters['order_status_filter']);
        }
        
        return implode(', ', $descriptions);
    }
    
    /**
     * Get order status label
     */
    private function getOrderStatusLabel($orderStatus)
    {
        $labels = [
            'pending_payment' => 'Aguardando Pagamento',
            'payment_approved' => 'Pagamento Aprovado',
            'in_production' => 'Em Produção',
            'photo_sent' => 'Foto Enviada',
            'photo_approved' => 'Foto Aprovada',
            'pending_final_payment' => 'Pagamento Final Pendente',
            'ready_for_shipping' => 'Pronto para Envio',
            'shipped' => 'Enviado'
        ];
        
        return $labels[$orderStatus] ?? $orderStatus;
    }

    private function arrayToCsv(array $data)
    {
        $output = fopen('php://temp', 'r+');

        foreach ($data as $row) {
            fputcsv($output, $row, ';');
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }

    private function getStatusLabel($status)
    {
        return match($status) {
            'pendente' => 'Pendente',
            'aprovado' => 'Aprovado',
            'recusado' => 'Recusado',
            default => $status
        };
    }

    private function calculateCommission($sale)
    {
        if ($sale->status !== 'aprovado') {
            return 0;
        }

        $commissionBase = $sale->received_amount - $sale->shipping_amount;
        
        // Get seller's monthly total for commission calculation
        $sellerMonthlyTotal = Sale::where('user_id', $sale->user_id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $sale->payment_date->year)
            ->whereMonth('payment_date', $sale->payment_date->month)
            ->get()
            ->sum(function ($s) {
                return ($s->received_amount ?: 0) - ($s->shipping_amount ?: 0);
            });
        
        // Use CommissionService for rate calculation
        $commissionService = new CommissionService();
        $rate = $commissionService->calculateCommissionRate($sellerMonthlyTotal);
        
        return $commissionBase * ($rate / 100);
    }

    private function getCommissionTier($total)
    {
        if ($total < 40000) return 'Sem comissão';
        if ($total < 50000) return 'R$ 40.000 - R$ 49.999';
        if ($total < 60000) return 'R$ 50.000 - R$ 59.999';
        return 'R$ 60.000+';
    }

    private function getCommissionPercentage($total)
    {
        if ($total < 40000) return 0;
        if ($total < 50000) return 2;
        if ($total < 60000) return 3;
        return 4;
    }
}