<?php

namespace App\Console\Commands;

use App\Models\Sale;
use App\Services\TinyErpService;
use App\Services\WhatsAppService;
use App\Services\NotificationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ProcessIntegrations extends Command
{
    protected $signature = 'bbkits:process-integrations {--type=all : Type of integration to process (all, reminders, sync)}';
    protected $description = 'Process BBKits integrations (WhatsApp reminders, Tiny ERP sync, etc.)';

    protected $tinyErpService;
    protected $whatsAppService;
    protected $notificationService;

    public function __construct(
        TinyErpService $tinyErpService,
        WhatsAppService $whatsAppService,
        NotificationService $notificationService
    ) {
        parent::__construct();
        $this->tinyErpService = $tinyErpService;
        $this->whatsAppService = $whatsAppService;
        $this->notificationService = $notificationService;
    }

    public function handle()
    {
        $type = $this->option('type');
        
        $this->info('🚀 Iniciando processamento de integrações BBKits...');
        
        try {
            switch ($type) {
                case 'reminders':
                    $this->processReminders();
                    break;
                case 'sync':
                    $this->processTinyErpSync();
                    break;
                case 'all':
                default:
                    $this->processReminders();
                    $this->processTinyErpSync();
                    $this->processAutomatedNotifications();
                    break;
            }
            
            $this->info('✅ Processamento de integrações concluído com sucesso!');
        } catch (\Exception $e) {
            $this->error('❌ Erro no processamento: ' . $e->getMessage());
            Log::error('Integration processing failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Process WhatsApp reminders
     */
    private function processReminders()
    {
        $this->info('📱 Processando lembretes WhatsApp...');
        
        // Final payment reminders (orders waiting for final payment for >24h)
        $finalPaymentReminders = Sale::where('order_status', 'photo_approved')
            ->where('photo_approved_at', '<=', Carbon::now()->subHours(24))
            ->where('whatsapp_final_payment_reminder_sent', false)
            ->whereNotNull('client_phone')
            ->limit(20) // Process 20 at a time
            ->get();

        $this->info("📋 Encontrados {$finalPaymentReminders->count()} lembretes de pagamento final para enviar");

        foreach ($finalPaymentReminders as $sale) {
            try {
                $result = $this->notificationService->notifyFinalPaymentReminder($sale);
                
                if ($result['success']) {
                    $this->info("✅ Lembrete enviado para pedido #{$sale->unique_token}");
                } else {
                    $this->warn("⚠️ Falha no lembrete para pedido #{$sale->unique_token}: {$result['whatsapp']['message']}");
                }
            } catch (\Exception $e) {
                $this->error("❌ Erro no lembrete para pedido #{$sale->unique_token}: {$e->getMessage()}");
            }
        }

        // Photo approval reminders (photos sent >48h ago without approval)
        $photoReminders = Sale::where('order_status', 'photo_sent')
            ->where('photo_sent_at', '<=', Carbon::now()->subHours(48))
            ->whereNotNull('client_phone')
            ->limit(10) // Process 10 at a time
            ->get();

        $this->info("📸 Encontrados {$photoReminders->count()} lembretes de aprovação de foto para reenviar");

        foreach ($photoReminders as $sale) {
            try {
                $result = $this->whatsAppService->sendCustomMessage(
                    $sale->client_phone,
                    "🔔 Olá {$sale->client_name}! Não se esqueça de aprovar a foto do seu pedido #{$sale->unique_token}. Acesse: {$sale->getPersonalizedPageUrl()}"
                );
                
                if ($result['success']) {
                    $this->info("✅ Lembrete de foto enviado para pedido #{$sale->unique_token}");
                } else {
                    $this->warn("⚠️ Falha no lembrete de foto para pedido #{$sale->unique_token}: {$result['message']}");
                }
            } catch (\Exception $e) {
                $this->error("❌ Erro no lembrete de foto para pedido #{$sale->unique_token}: {$e->getMessage()}");
            }
        }
    }

    /**
     * Process Tiny ERP synchronization
     */
    private function processTinyErpSync()
    {
        $this->info('📊 Processando sincronização Tiny ERP...');
        
        // Sync orders that have Tiny ERP invoice but haven't been synced in >4 hours
        $ordersToSync = Sale::whereNotNull('tiny_erp_invoice_id')
            ->where(function ($query) {
                $query->whereNull('tiny_erp_sync_at')
                      ->orWhere('tiny_erp_sync_at', '<=', Carbon::now()->subHours(4));
            })
            ->where('order_status', '!=', 'shipped')
            ->limit(30) // Process 30 at a time
            ->get();

        $this->info("🔄 Encontrados {$ordersToSync->count()} pedidos para sincronizar");

        $synced = 0;
        $errors = 0;

        foreach ($ordersToSync as $sale) {
            try {
                $result = $this->tinyErpService->syncOrderStatus($sale);
                
                if ($result['success']) {
                    $synced++;
                    $this->info("✅ Pedido #{$sale->unique_token} sincronizado");
                } else {
                    $errors++;
                    $this->warn("⚠️ Falha na sincronização do pedido #{$sale->unique_token}: {$result['message']}");
                }
            } catch (\Exception $e) {
                $errors++;
                $this->error("❌ Erro na sincronização do pedido #{$sale->unique_token}: {$e->getMessage()}");
            }
        }

        $this->info("📊 Sincronização concluída: {$synced} sucessos, {$errors} erros");
    }

    /**
     * Process automated notifications for order lifecycle
     */
    private function processAutomatedNotifications()
    {
        $this->info('🔔 Processando notificações automáticas...');
        
        // Send order confirmations for new orders (created <1h ago, no WhatsApp sent)
        $newOrders = Sale::where('created_at', '>=', Carbon::now()->subHour())
            ->where('whatsapp_confirmation_sent', false)
            ->whereNotNull('client_phone')
            ->limit(50)
            ->get();

        $this->info("🎉 Encontrados {$newOrders->count()} novos pedidos sem confirmação");

        foreach ($newOrders as $sale) {
            try {
                $result = $this->notificationService->notifyOrderCreated($sale);
                
                if ($result['success']) {
                    $this->info("✅ Confirmação enviada para pedido #{$sale->unique_token}");
                } else {
                    $this->warn("⚠️ Falha na confirmação do pedido #{$sale->unique_token}: {$result['whatsapp']['message']}");
                }
            } catch (\Exception $e) {
                $this->error("❌ Erro na confirmação do pedido #{$sale->unique_token}: {$e->getMessage()}");
            }
        }

        // Auto-generate invoices and shipping labels for ready orders
        $readyForShipping = Sale::where('order_status', 'ready_for_shipping')
            ->whereNull('tiny_erp_invoice_id')
            ->limit(10)
            ->get();

        $this->info("📦 Encontrados {$readyForShipping->count()} pedidos prontos para envio sem nota fiscal");

        foreach ($readyForShipping as $sale) {
            try {
                $result = $this->notificationService->notifyOrderShipped($sale);
                
                if ($result['success']) {
                    $this->info("✅ Nota fiscal e etiqueta geradas para pedido #{$sale->unique_token}");
                } else {
                    $this->warn("⚠️ Falha na geração de documentos para pedido #{$sale->unique_token}");
                }
            } catch (\Exception $e) {
                $this->error("❌ Erro na geração de documentos para pedido #{$sale->unique_token}: {$e->getMessage()}");
            }
        }
    }
}