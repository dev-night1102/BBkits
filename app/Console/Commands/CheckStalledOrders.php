<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Sale;
use App\Models\User;
use App\Services\NotificationService;
use Carbon\Carbon;

class CheckStalledOrders extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'orders:check-stalled {--hours=48 : Number of hours to consider order as stalled}';

    /**
     * The console command description.
     */
    protected $description = 'Check for stalled orders and send notifications';

    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $stalledHours = $this->option('hours');
        $stalledTime = Carbon::now()->subHours($stalledHours);
        
        $this->info("Checking for orders stalled for more than {$stalledHours} hours...");
        
        // Find stalled orders in different stages
        $stalledOrders = $this->findStalledOrders($stalledTime);
        
        if ($stalledOrders->isEmpty()) {
            $this->info('✅ No stalled orders found.');
            return;
        }
        
        $this->warn("⚠️ Found {$stalledOrders->count()} stalled orders:");
        
        foreach ($stalledOrders as $order) {
            $this->processStalledOrder($order, $stalledHours);
        }
        
        $this->info("✅ Processed all stalled orders notifications.");
    }
    
    private function findStalledOrders($stalledTime)
    {
        return Sale::with(['user', 'financeAdmin', 'productionAdmin'])
            ->where('updated_at', '<', $stalledTime)
            ->whereIn('order_status', [
                'pending_payment',
                'payment_approved', 
                'in_production',
                'photo_sent',
                'pending_final_payment'
            ])
            ->where('status', '!=', 'cancelado')
            ->get();
    }
    
    private function processStalledOrder($order, $stalledHours)
    {
        $hoursStalled = Carbon::parse($order->updated_at)->diffInHours(now());
        
        $this->line("📋 Order #{$order->unique_token} - {$order->order_status} - {$hoursStalled}h stalled");
        
        // Determine who to notify based on order status
        $notificationTargets = $this->getNotificationTargets($order);
        
        foreach ($notificationTargets as $target) {
            $this->notificationService->createNotification(
                $target['user_id'],
                'order_stalled',
                "⏰ Pedido #{$order->unique_token} está parado há {$hoursStalled}h no status: {$this->getStatusLabel($order->order_status)}",
                [
                    'sale_id' => $order->id,
                    'token' => $order->unique_token,
                    'status' => $order->order_status,
                    'hours_stalled' => $hoursStalled,
                    'action_required' => $target['action']
                ]
            );
            
            $this->info("   📧 Notification sent to {$target['name']} - Action: {$target['action']}");
        }
        
        // Create internal comment about stalled status
        \App\Models\OrderComment::create([
            'sale_id' => $order->id,
            'user_id' => 1, // System user
            'department' => 'admin',
            'comment' => "🚨 ALERTA: Pedido parado há {$hoursStalled} horas no status '{$this->getStatusLabel($order->order_status)}'. Ação necessária!",
            'is_internal' => true
        ]);
    }
    
    private function getNotificationTargets($order)
    {
        $targets = [];
        
        switch ($order->order_status) {
            case 'pending_payment':
                // Notify seller to follow up with client
                $targets[] = [
                    'user_id' => $order->user_id,
                    'name' => $order->user->name,
                    'action' => 'Confirmar pagamento com cliente'
                ];
                
                // Notify finance admin
                if ($financeAdmins = User::where('role', 'finance_admin')->get()) {
                    foreach ($financeAdmins as $admin) {
                        $targets[] = [
                            'user_id' => $admin->id,
                            'name' => $admin->name,
                            'action' => 'Verificar status do pagamento'
                        ];
                    }
                }
                break;
                
            case 'payment_approved':
                // Notify production team
                if ($productionAdmins = User::where('role', 'production_admin')->get()) {
                    foreach ($productionAdmins as $admin) {
                        $targets[] = [
                            'user_id' => $admin->id,
                            'name' => $admin->name,
                            'action' => 'Iniciar produção do pedido'
                        ];
                    }
                }
                break;
                
            case 'in_production':
                // Notify assigned production admin or all production admins
                if ($order->production_admin_id) {
                    $targets[] = [
                        'user_id' => $order->production_admin_id,
                        'name' => $order->productionAdmin->name,
                        'action' => 'Finalizar produção e enviar foto'
                    ];
                } else {
                    if ($productionAdmins = User::where('role', 'production_admin')->get()) {
                        foreach ($productionAdmins as $admin) {
                            $targets[] = [
                                'user_id' => $admin->id,
                                'name' => $admin->name,
                                'action' => 'Finalizar produção e enviar foto'
                            ];
                        }
                    }
                }
                break;
                
            case 'photo_sent':
                // Notify seller to follow up with client
                $targets[] = [
                    'user_id' => $order->user_id,
                    'name' => $order->user->name,
                    'action' => 'Cliente não aprovou foto - fazer contato'
                ];
                break;
                
            case 'pending_final_payment':
                // Notify seller to collect final payment
                $targets[] = [
                    'user_id' => $order->user_id,
                    'name' => $order->user->name,
                    'action' => 'Coletar pagamento final do cliente'
                ];
                break;
        }
        
        // Always notify admins for severely stalled orders (72+ hours)
        $hoursStalled = Carbon::parse($order->updated_at)->diffInHours(now());
        if ($hoursStalled >= 72) {
            $admins = User::where('role', 'admin')->get();
            foreach ($admins as $admin) {
                $targets[] = [
                    'user_id' => $admin->id,
                    'name' => $admin->name,
                    'action' => 'Pedido CRÍTICO - Intervenção necessária'
                ];
            }
        }
        
        return $targets;
    }
    
    private function getStatusLabel($status)
    {
        $labels = [
            'pending_payment' => 'Aguardando Pagamento',
            'payment_approved' => 'Pagamento Aprovado',
            'in_production' => 'Em Produção',
            'photo_sent' => 'Foto Enviada para Aprovação',
            'pending_final_payment' => 'Pagamento Final Pendente'
        ];
        
        return $labels[$status] ?? $status;
    }
}