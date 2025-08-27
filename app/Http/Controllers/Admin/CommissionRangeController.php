<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommissionRange;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommissionRangeController extends Controller
{
    public function index()
    {
        $ranges = CommissionRange::ordered()->get();
        
        return Inertia::render('Admin/CommissionRanges/Index', [
            'ranges' => $ranges,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'nullable|numeric|gt:min_amount',
            'percentage' => 'required|numeric|min:0|max:100',
            'order' => 'nullable|integer',
            'active' => 'boolean',
        ]);

        CommissionRange::create($validated);

        return redirect()->route('admin.commission-ranges.index')
            ->with('success', 'Faixa de comissão criada com sucesso!');
    }

    public function update(Request $request, CommissionRange $commissionRange)
    {
        $validated = $request->validate([
            'min_amount' => 'required|numeric|min:0',
            'max_amount' => 'nullable|numeric|gt:min_amount',
            'percentage' => 'required|numeric|min:0|max:100',
            'order' => 'nullable|integer',
            'active' => 'boolean',
        ]);

        $commissionRange->update($validated);

        return redirect()->route('admin.commission-ranges.index')
            ->with('success', 'Faixa de comissão atualizada com sucesso!');
    }

    public function destroy(CommissionRange $commissionRange)
    {
        $commissionRange->delete();

        return redirect()->route('admin.commission-ranges.index')
            ->with('success', 'Faixa de comissão removida com sucesso!');
    }
}