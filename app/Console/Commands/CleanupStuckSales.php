<?php

namespace App\Console\Commands;

use App\Models\Sale;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CleanupStuckSales extends Command
{
    protected $signature = 'sales:cleanup-stuck';
    protected $description = 'Clean up sales that are stuck in processing state';

    public function handle()
    {
        // Find sales that have been processing for more than 5 minutes
        $stuckSales = Sale::where('is_processing', true)
            ->where('processing_started_at', '<', now()->subMinutes(5))
            ->get();

        if ($stuckSales->isEmpty()) {
            $this->info('No stuck sales found.');
            return;
        }

        $this->info("Found {$stuckSales->count()} stuck sales. Cleaning up...");

        foreach ($stuckSales as $sale) {
            $sale->update([
                'is_processing' => false,
                'processing_started_at' => null,
                'processing_token' => null
            ]);

            Log::warning('Cleared stuck processing lock', [
                'sale_id' => $sale->id,
                'processing_started_at' => $sale->processing_started_at,
                'processing_token' => $sale->processing_token
            ]);

            $this->line("Cleared processing lock for sale ID: {$sale->id}");
        }

        $this->info('Cleanup completed.');
    }
}