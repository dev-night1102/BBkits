<?php

namespace App\Jobs;

use App\Models\Sale;
use App\Services\CommissionService;
use App\Services\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessSaleApproval implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = [1, 5, 15]; // Retry after 1s, 5s, 15s

    protected $saleId;
    protected $approvedBy;
    protected $action; // 'approve' or 'reject'
    protected $rejectionReason;

    public function __construct(int $saleId, int $approvedBy, string $action, ?string $rejectionReason = null)
    {
        $this->saleId = $saleId;
        $this->approvedBy = $approvedBy;
        $this->action = $action;
        $this->rejectionReason = $rejectionReason;
    }

    public function handle(CommissionService $commissionService, NotificationService $notificationService)
    {
        try {
            DB::beginTransaction();

            $sale = Sale::lockForUpdate()->findOrFail($this->saleId);

            // Check if already being processed
            if ($sale->is_processing) {
                Log::warning('Sale is already being processed', [
                    'sale_id' => $this->saleId,
                    'processing_started_at' => $sale->processing_started_at,
                    'action' => $this->action
                ]);
                DB::rollBack();
                return;
            }

            // Verify sale is still pending
            if ($sale->status !== 'pendente') {
                Log::warning('Sale status changed before processing', [
                    'sale_id' => $this->saleId,
                    'current_status' => $sale->status,
                    'action' => $this->action
                ]);
                DB::rollBack();
                return;
            }

            // Set processing lock
            $processingToken = uniqid('proc_', true);
            $sale->update([
                'is_processing' => true,
                'processing_started_at' => now(),
                'processing_token' => $processingToken
            ]);

            if ($this->action === 'approve') {
                $sale->update([
                    'status' => 'aprovado',
                    'approved_by' => $this->approvedBy,
                    'approved_at' => now(),
                    'is_processing' => false,
                    'processing_started_at' => null,
                    'processing_token' => null
                ]);

                // Create commission record
                $commission = $commissionService->createCommissionForSale($sale->fresh());

                Log::info('Sale approved via job', [
                    'sale_id' => $this->saleId,
                    'approved_by' => $this->approvedBy,
                    'commission_created' => $commission ? $commission->id : null,
                    'processing_token' => $processingToken
                ]);

                $notificationService->notifySaleApproved($sale);

            } elseif ($this->action === 'reject') {
                $sale->update([
                    'status' => 'recusado',
                    'rejected_by' => $this->approvedBy,
                    'rejected_at' => now(),
                    'rejection_reason' => $this->rejectionReason,
                    'is_processing' => false,
                    'processing_started_at' => null,
                    'processing_token' => null
                ]);

                Log::info('Sale rejected via job', [
                    'sale_id' => $this->saleId,
                    'rejected_by' => $this->approvedBy,
                    'reason' => $this->rejectionReason,
                    'processing_token' => $processingToken
                ]);

                $notificationService->notifySaleRejected($sale, $this->rejectionReason);
            }

            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to process sale approval in job', [
                'sale_id' => $this->saleId,
                'action' => $this->action,
                'error' => $e->getMessage(),
                'attempt' => $this->attempts()
            ]);

            // Re-throw to trigger retry mechanism
            throw $e;
        }
    }

    public function failed(\Throwable $exception)
    {
        Log::critical('Sale approval job failed permanently', [
            'sale_id' => $this->saleId,
            'action' => $this->action,
            'error' => $exception->getMessage(),
            'attempts' => $this->attempts()
        ]);

        // Clear processing lock
        try {
            $sale = Sale::find($this->saleId);
            if ($sale && $sale->is_processing) {
                $sale->update([
                    'is_processing' => false,
                    'processing_started_at' => null,
                    'processing_token' => null
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Failed to clear processing lock', [
                'sale_id' => $this->saleId, 
                'error' => $e->getMessage()
            ]);
        }

        // Could send admin notification about failed approval
    }
}