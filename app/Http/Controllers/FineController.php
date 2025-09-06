<?php

namespace App\Http\Controllers;

use App\Models\Fine;
use App\Models\User;
use App\Models\Sale;
use Illuminate\Http\Request;
use App\Services\CommissionService;

class FineController extends Controller
{
    protected $commissionService;

    public function __construct(CommissionService $commissionService)
    {
        $this->middleware(['auth', 'admin']);
        $this->commissionService = $commissionService;
    }

    public function index()
    {
        $fines = Fine::with(['user', 'sale', 'appliedBy'])
            ->orderBy('applied_at', 'desc')
            ->paginate(20);

        return view('admin.fines.index', compact('fines'));
    }

    public function create()
    {
        $users = User::where('role', 'vendedora')->orderBy('name')->get();
        $sales = Sale::with('user')->orderBy('created_at', 'desc')->limit(50)->get();

        return view('admin.fines.create', compact('users', 'sales'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sale_id' => 'nullable|exists:sales,id',
            'amount' => 'required|numeric|min:0.01',
            'type' => 'required|in:commission_only,commission_plus_additional',
            'reason' => 'required|string|max:1000',
        ]);

        $fine = Fine::create([
            'user_id' => $validated['user_id'],
            'sale_id' => $validated['sale_id'],
            'amount' => $validated['amount'],
            'type' => $validated['type'],
            'reason' => $validated['reason'],
            'applied_by' => auth()->id(),
            'applied_at' => now(),
            'status' => 'active',
            'outstanding_balance' => $validated['type'] === 'commission_plus_additional' ? $validated['amount'] : 0,
        ]);

        if ($validated['sale_id']) {
            $sale = Sale::find($validated['sale_id']);
            $this->commissionService->recalculateMonthlyCommissions(
                $sale->user,
                $sale->payment_date->month,
                $sale->payment_date->year
            );
        }

        return redirect()->route('admin.fines.index')
            ->with('success', 'Multa aplicada com sucesso.');
    }

    public function show(Fine $fine)
    {
        $fine->load(['user', 'sale', 'appliedBy']);
        return view('admin.fines.show', compact('fine'));
    }

    public function update(Request $request, Fine $fine)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,paid,cancelled',
            'outstanding_balance' => 'nullable|numeric|min:0',
        ]);

        $fine->update($validated);

        return redirect()->route('admin.fines.show', $fine)
            ->with('success', 'Status da multa atualizado com sucesso.');
    }

    public function destroy(Fine $fine)
    {
        $fine->delete();

        return redirect()->route('admin.fines.index')
            ->with('success', 'Multa removida com sucesso.');
    }
}