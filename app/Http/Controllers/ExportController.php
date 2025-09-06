<?php

namespace App\Http\Controllers;

use App\Services\ExcelExportService;
use App\Models\Sale;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class ExportController extends Controller
{
    protected $excelService;

    public function __construct(ExcelExportService $excelService)
    {
        $this->excelService = $excelService;
    }

    public function exportSales(Request $request)
    {
        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);
        $dateFilter = $request->input('date_filter', 'current_month');
        $statusFilter = $request->input('status_filter', 'all');
        $orderStatusFilter = $request->input('order_status_filter', 'all');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $filters = [
            'date_filter' => $dateFilter,
            'status_filter' => $statusFilter,
            'order_status_filter' => $orderStatusFilter,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'month' => $month,
            'year' => $year
        ];

        $csv = $this->excelService->exportFilteredSalesReport($filters);

        $filename = 'vendas_filtradas_' . now()->format('Y_m_d_H_i_s') . '.csv';

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Encoding', 'UTF-8');
    }

    public function exportCommissions(Request $request)
    {
        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);
        $dateFilter = $request->input('date_filter', 'current_month');
        $statusFilter = $request->input('status_filter', 'all');

        $filters = [
            'date_filter' => $dateFilter,
            'status_filter' => $statusFilter,
            'month' => $month,
            'year' => $year
        ];

        $csv = $this->excelService->exportFilteredCommissionsReport($filters);

        $filename = 'comissoes_filtradas_' . now()->format('Y_m_d_H_i_s') . '.csv';

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Encoding', 'UTF-8');
    }
    
    /**
     * Export order lifecycle data
     */
    public function exportOrderLifecycle(Request $request)
    {
        $dateFilter = $request->input('date_filter', 'current_month');
        $orderStatusFilter = $request->input('order_status_filter', 'all');
        
        $query = Sale::with(['user', 'financeAdmin', 'productionAdmin']);
        
        // Apply date filter
        if ($dateFilter === 'current_month') {
            $query->whereYear('created_at', now()->year)
                  ->whereMonth('created_at', now()->month);
        } elseif ($dateFilter === 'last_month') {
            $lastMonth = Carbon::now()->subMonth();
            $query->whereYear('created_at', $lastMonth->year)
                  ->whereMonth('created_at', $lastMonth->month);
        } elseif ($dateFilter === 'last_7_days') {
            $query->where('created_at', '>=', Carbon::now()->subDays(7));
        } elseif ($dateFilter === 'last_30_days') {
            $query->where('created_at', '>=', Carbon::now()->subDays(30));
        }
        
        // Apply order status filter
        if ($orderStatusFilter !== 'all') {
            $query->where('order_status', $orderStatusFilter);
        }
        
        $orders = $query->orderBy('created_at', 'desc')->get();
        
        $csv = "ID,Token,Cliente,Vendedora,Valor Total,Status do Pedido,Criado em,Pagamento Aprovado,Produção Iniciada,Foto Enviada,Foto Aprovada,Enviado\n";
        
        foreach ($orders as $order) {
            $csv .= sprintf(
                "%d,%s,%s,%s,%.2f,%s,%s,%s,%s,%s,%s,%s\n",
                $order->id,
                $order->unique_token,
                $order->client_name,
                $order->user->name,
                $order->total_amount,
                $order->order_status,
                $order->created_at->format('Y-m-d H:i:s'),
                $order->initial_payment_approved_at?->format('Y-m-d H:i:s') ?? '',
                $order->production_started_at?->format('Y-m-d H:i:s') ?? '',
                $order->photo_sent_at?->format('Y-m-d H:i:s') ?? '',
                $order->photo_approved_at?->format('Y-m-d H:i:s') ?? '',
                $order->shipped_at?->format('Y-m-d H:i:s') ?? ''
            );
        }
        
        $filename = 'ciclo_pedidos_' . now()->format('Y_m_d_H_i_s') . '.csv';
        
        return response($csv)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Encoding', 'UTF-8');
    }
    
    /**
     * Export performance metrics
     */
    public function exportPerformanceMetrics(Request $request)
    {
        $dateFilter = $request->input('date_filter', 'current_month');
        $dbDriver = config('database.default');
        
        // Get performance data - database agnostic
        if ($dbDriver === 'mysql') {
            $avgProcessingTime = Sale::whereNotNull('shipped_at')
                ->whereNotNull('created_at')
                ->selectRaw('AVG(TIMESTAMPDIFF(DAY, created_at, shipped_at)) as avg_days')
                ->value('avg_days') ?? 0;
        } else {
            // SQLite version - calculate in PHP
            $shippedSales = Sale::whereNotNull('shipped_at')
                ->whereNotNull('created_at')
                ->select(['created_at', 'shipped_at'])
                ->get();
            
            $avgProcessingTime = 0;
            if ($shippedSales->count() > 0) {
                $totalDays = $shippedSales->sum(function ($sale) {
                    return Carbon::parse($sale->shipped_at)->diffInDays(Carbon::parse($sale->created_at));
                });
                $avgProcessingTime = round($totalDays / $shippedSales->count(), 1);
            }
        }
        
        $totalOrders = Sale::count();
        $shippedOrders = Sale::where('order_status', 'shipped')->count();
        $approvedOrders = Sale::where('order_status', '!=', 'pending_payment')->count();
        
        $conversionRates = [
            'payment_approval_rate' => $totalOrders > 0 ? ($approvedOrders / $totalOrders) * 100 : 0,
            'completion_rate' => $totalOrders > 0 ? ($shippedOrders / $totalOrders) * 100 : 0,
        ];
        
        // Stage processing times - simplified for database compatibility
        if ($dbDriver === 'mysql') {
            $stageMetrics = Sale::selectRaw('
                order_status,
                COUNT(*) as count,
                AVG(CASE 
                    WHEN order_status != "pending_payment" AND initial_payment_approved_at IS NOT NULL 
                    THEN TIMESTAMPDIFF(HOUR, created_at, initial_payment_approved_at) 
                END) as avg_payment_time,
                AVG(CASE 
                    WHEN production_started_at IS NOT NULL AND initial_payment_approved_at IS NOT NULL 
                    THEN TIMESTAMPDIFF(HOUR, initial_payment_approved_at, production_started_at) 
                END) as avg_production_start_time,
                AVG(CASE 
                    WHEN photo_sent_at IS NOT NULL AND production_started_at IS NOT NULL 
                    THEN TIMESTAMPDIFF(HOUR, production_started_at, photo_sent_at) 
                END) as avg_photo_time,
                AVG(CASE 
                    WHEN shipped_at IS NOT NULL AND photo_approved_at IS NOT NULL 
                    THEN TIMESTAMPDIFF(HOUR, photo_approved_at, shipped_at) 
                END) as avg_shipping_time
            ')
            ->groupBy('order_status')
            ->get();
        } else {
            // SQLite version - basic metrics without complex time calculations
            $stageMetrics = Sale::selectRaw('order_status, COUNT(*) as count')
                ->groupBy('order_status')
                ->get()
                ->map(function ($item) {
                    $item->avg_payment_time = 0;
                    $item->avg_production_start_time = 0;
                    $item->avg_photo_time = 0;
                    $item->avg_shipping_time = 0;
                    return $item;
                });
        }
        
        $csv = "Métrica,Valor\n";
        $csv .= "Tempo Médio de Processamento (dias)," . round($avgProcessingTime, 2) . "\n";
        $csv .= "Taxa de Aprovação de Pagamento (%)," . round($conversionRates['payment_approval_rate'], 2) . "\n";
        $csv .= "Taxa de Conclusão (%)," . round($conversionRates['completion_rate'], 2) . "\n";
        $csv .= "Total de Pedidos," . $totalOrders . "\n";
        $csv .= "Pedidos Enviados," . $shippedOrders . "\n";
        $csv .= "Pedidos com Pagamento Aprovado," . $approvedOrders . "\n\n";
        
        $csv .= "Status,Quantidade,Tempo Médio Pagamento (h),Tempo Médio Início Produção (h),Tempo Médio Foto (h),Tempo Médio Envio (h)\n";
        
        foreach ($stageMetrics as $metric) {
            $csv .= sprintf(
                "%s,%d,%.1f,%.1f,%.1f,%.1f\n",
                $metric->order_status,
                $metric->count,
                $metric->avg_payment_time ?? 0,
                $metric->avg_production_start_time ?? 0,
                $metric->avg_photo_time ?? 0,
                $metric->avg_shipping_time ?? 0
            );
        }
        
        $filename = 'metricas_performance_' . now()->format('Y_m_d_H_i_s') . '.csv';
        
        return response($csv)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Encoding', 'UTF-8');
    }
}