<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Services\CommissionService;

class AdminReportsController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }

        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);

        // Get sales data by seller
        $salesData = $this->getSalesDataBySeller($month, $year);
        
        // Get commission data
        $commissionData = $this->getCommissionData($month, $year);
        
        // Get total statistics
        $totalStats = $this->getTotalStatistics($month, $year);

        return Inertia::render('Admin/Reports/Index', [
            'salesData' => $salesData,
            'commissionData' => $commissionData,
            'totalStats' => $totalStats,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    private function getSalesDataBySeller($month, $year)
    {
        $sellers = User::where('role', 'vendedora')
            ->withCount([
                'sales as total_sales_count' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                },
                'sales as approved_sales_count' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ])
            ->withSum([
                'sales as total_sale_value' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], 'total_amount')
            ->withSum([
                'sales as total_received_amount' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], 'received_amount')
            ->withSum([
                'sales as approved_sale_value' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], 'total_amount')
            ->withSum([
                'sales as approved_received_amount' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], 'received_amount')
            ->get()
            ->map(function ($seller) use ($month, $year) {
                $commissionService = new CommissionService();
                
                // Get all sales for calculations
                $allSales = Sale::where('user_id', $seller->id)
                    ->whereYear('payment_date', $year)
                    ->whereMonth('payment_date', $month)
                    ->get();
                
                $approvedSales = $allSales->where('status', 'aprovado');
                $pendingSales = $allSales->where('status', 'pendente');
                
                // Calculate totals - now properly separating sale value from received amount
                $totalSaleValue = $allSales->sum('total_amount');
                $totalReceivedAmount = $allSales->sum('received_amount');
                $approvedSaleValue = $approvedSales->sum('total_amount');
                $approvedReceivedAmount = $approvedSales->sum('received_amount');
                $pendingSaleValue = $pendingSales->sum('total_amount');
                $pendingReceivedAmount = $pendingSales->sum('received_amount');
                $totalShipping = $allSales->sum('shipping_amount');
                
                // Calculate commission base using received amount for commission calculation
                $commissionBase = $approvedSales->sum(function ($sale) {
                    return ($sale->received_amount ?: 0) - ($sale->shipping_amount ?: 0);
                });
                
                $commission = $this->calculateCommissionForSeller($seller->id, $month, $year);
                
                return [
                    'id' => $seller->id,
                    'name' => $seller->name,
                    'email' => $seller->email,
                    'salesCount' => $seller->total_sales_count,
                    'approvedSalesCount' => $seller->approved_sales_count,
                    // Sales values (full sale amounts)
                    'totalSaleValue' => $totalSaleValue,
                    'approvedSaleValue' => $approvedSaleValue,
                    'pendingSaleValue' => $pendingSaleValue,
                    // Received amounts (payments received)
                    'totalReceivedAmount' => $totalReceivedAmount,
                    'approvedReceivedAmount' => $approvedReceivedAmount,
                    'pendingReceivedAmount' => $pendingReceivedAmount,
                    // Remaining amounts
                    'totalRemainingAmount' => $totalSaleValue - $totalReceivedAmount,
                    'approvedRemainingAmount' => $approvedSaleValue - $approvedReceivedAmount,
                    'pendingRemainingAmount' => $pendingSaleValue - $pendingReceivedAmount,
                    // Legacy fields for compatibility
                    'totalSales' => $seller->total_sale_value ?: 0,
                    'approvedSales' => $seller->approved_sale_value ?: 0,
                    'pendingSales' => $pendingSaleValue,
                    'totalShipping' => $totalShipping,
                    'commissionBase' => $commissionBase,
                    'totalCommission' => $commission,
                    'commissionRate' => $commissionService->calculateCommissionRate($commissionBase),
                    'level' => $this->getPerformanceLevel($commissionBase),
                    'metaAchieved' => $commissionService->calculateCommissionRate($commissionBase) > 0
                ];
            });

        return $sellers;
    }

    private function getCommissionData($month, $year)
    {
        $commissions = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->with('user')
            ->get()
            ->groupBy('user_id')
            ->map(function ($sales, $userId) {
                $user = $sales->first()->user;
                $totalBase = $sales->sum(function ($sale) {
                    return $sale->received_amount - $sale->shipping_amount;
                });
                
                $totalCommission = $sales->sum(function ($sale) {
                    return $this->calculateSaleCommission($sale);
                });

                return [
                    'user_id' => $userId,
                    'user_name' => $user->name,
                    'total_base' => $totalBase,
                    'total_commission' => $totalCommission,
                    'commission_rate' => $this->getCommissionRate($totalBase),
                    'sales_count' => $sales->count(),
                ];
            });

        return $commissions->values();
    }

    private function getTotalStatistics($month, $year)
    {
        $totalSellers = User::where('role', 'vendedora')->count();
        
        // Total sale values (full sale amounts)
        $totalSaleValue = Sale::whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('total_amount');
            
        // Total received amounts (payments received)
        $totalReceivedAmount = Sale::whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('received_amount');
            
        $approvedSaleValue = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('total_amount');
            
        $approvedReceivedAmount = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('received_amount');
            
        $totalCommissions = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->get()
            ->sum(function ($sale) {
                return $this->calculateSaleCommission($sale);
            });

        $sellersWithMeta = User::where('role', 'vendedora')
            ->whereHas('sales', function ($query) use ($month, $year) {
                $query->where('status', 'aprovado')
                    ->whereYear('payment_date', $year)
                    ->whereMonth('payment_date', $month);
            })
            ->get()
            ->filter(function ($user) use ($month, $year) {
                $totalBase = Sale::where('user_id', $user->id)
                    ->where('status', 'aprovado')
                    ->whereYear('payment_date', $year)
                    ->whereMonth('payment_date', $month)
                    ->get()
                    ->sum(function ($sale) {
                        return ($sale->received_amount ?: 0) - ($sale->shipping_amount ?: 0);
                    });
                $commissionService = new CommissionService();
                return $commissionService->calculateCommissionRate($totalBase) > 0;
            })
            ->count();

        return [
            'totalSellers' => $totalSellers,
            // Sales values (full sale amounts)
            'totalSaleValue' => $totalSaleValue,
            'approvedSaleValue' => $approvedSaleValue,
            // Received amounts (payments received)
            'totalReceivedAmount' => $totalReceivedAmount,
            'approvedReceivedAmount' => $approvedReceivedAmount,
            // Remaining amounts
            'totalRemainingAmount' => $totalSaleValue - $totalReceivedAmount,
            'approvedRemainingAmount' => $approvedSaleValue - $approvedReceivedAmount,
            // Legacy fields for compatibility
            'totalSales' => $totalSaleValue,
            'approvedSales' => $approvedSaleValue,
            'totalCommissions' => $totalCommissions,
            'metaAchieved' => $sellersWithMeta,
            'approvalRate' => $totalSaleValue > 0 ? ($approvedSaleValue / $totalSaleValue) * 100 : 0,
        ];
    }

    private function calculateCommissionForSeller($sellerId, $month, $year)
    {
        $commissionService = new CommissionService();
        
        $sellerSales = Sale::where('user_id', $sellerId)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->get();

        $totalBase = $sellerSales->sum(function ($sale) {
            return $sale->received_amount - $sale->shipping_amount;
        });

        $rate = $commissionService->calculateCommissionRate($totalBase);
        
        return $totalBase * ($rate / 100);
    }

    private function calculateSaleCommission($sale)
    {
        if ($sale->status !== 'aprovado') {
            return 0;
        }

        $commissionService = new CommissionService();
        $commissionBase = $sale->received_amount - $sale->shipping_amount;
        
        // Get seller's monthly total for commission calculation
        $paymentDate = Carbon::parse($sale->payment_date);
        $sellerMonthlyTotal = Sale::where('user_id', $sale->user_id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $paymentDate->year)
            ->whereMonth('payment_date', $paymentDate->month)
            ->get()
            ->sum(function ($s) {
                return ($s->received_amount ?: 0) - ($s->shipping_amount ?: 0);
            });
        
        // Use CommissionService for rate calculation
        $rate = $commissionService->calculateCommissionRate($sellerMonthlyTotal);
        
        return $commissionBase * ($rate / 100);
    }

    private function getCommissionRate($totalBase)
    {
        $commissionService = new CommissionService();
        return $commissionService->calculateCommissionRate($totalBase);
    }

    private function getPerformanceLevel($totalBase)
    {
        $commissionService = new CommissionService();
        $rate = $commissionService->calculateCommissionRate($totalBase);
        
        if ($rate >= 4) {
            return 'Elite';
        } elseif ($rate >= 3) {
            return 'Avançada';
        } elseif ($rate >= 2) {
            return 'Intermediária';
        }
        
        return 'Iniciante';
    }
}