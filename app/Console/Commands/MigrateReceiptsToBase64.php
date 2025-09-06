<?php

namespace App\Console\Commands;

use App\Models\Sale;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class MigrateReceiptsToBase64 extends Command
{
    protected $signature = 'receipts:migrate-to-base64';
    protected $description = 'Migrate existing receipt files to base64 format';

    public function handle()
    {
        $this->info('Starting migration of receipts to base64...');
        
        $sales = Sale::whereNotNull('payment_receipt')
                    ->whereNull('receipt_data')
                    ->get();
        
        $migrated = 0;
        $errors = 0;
        
        foreach ($sales as $sale) {
            try {
                $filePath = storage_path('app/public/' . $sale->payment_receipt);
                
                if (file_exists($filePath)) {
                    $fileContent = file_get_contents($filePath);
                    $mimeType = mime_content_type($filePath);
                    
                    // Create base64 data URL
                    $base64Data = 'data:' . $mimeType . ';base64,' . base64_encode($fileContent);
                    
                    // Update the sale record
                    $sale->receipt_data = $base64Data;
                    $sale->save();
                    
                    $migrated++;
                    $this->info("Migrated receipt for sale #{$sale->id}");
                } else {
                    $this->warn("File not found for sale #{$sale->id}: {$sale->payment_receipt}");
                    $errors++;
                }
            } catch (\Exception $e) {
                $this->error("Error migrating sale #{$sale->id}: " . $e->getMessage());
                $errors++;
            }
        }
        
        $this->info("Migration completed!");
        $this->info("Migrated: {$migrated} receipts");
        
        if ($errors > 0) {
            $this->warn("Errors: {$errors} receipts could not be migrated");
        }
        
        return 0;
    }
}