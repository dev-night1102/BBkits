<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;

class SaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get vendedoras
        $vendedoras = User::where('role', 'vendedora')->get();
        $admin = User::where('role', 'admin')->first();
        
        if ($vendedoras->isEmpty()) {
            $this->command->error('No vendedoras found. Please run UserSeeder first.');
            return;
        }

        // Sample client names
        $clientNames = [
            'Ana Paula Ferreira',
            'Camila Rodrigues',
            'Fernanda Almeida',
            'Gabriela Santos',
            'Isabella Costa',
            'Juliana Oliveira',
            'Larissa Silva',
            'Mariana Lima',
            'Natalia Pereira',
            'Priscila Souza',
            'Rafaela Martins',
            'Stephanie Barbosa',
            'Tatiana Gomes',
            'Vanessa Dias',
            'Yasmin Ribeiro',
            'Adriana Carvalho',
            'Beatriz Nascimento',
            'Carolina Moreira',
            'Daniela Castro',
            'Eduarda Ramos',
        ];

        $paymentMethods = ['pix', 'boleto', 'cartao', 'dinheiro'];
        $statuses = ['pendente', 'aprovado', 'recusado'];

        // Create sales for the last 3 months
        for ($monthOffset = 2; $monthOffset >= 0; $monthOffset--) {
            $salesPerMonth = $monthOffset === 0 ? 15 : rand(20, 30); // More sales in current month
            
            for ($i = 0; $i < $salesPerMonth; $i++) {
                $vendedora = $vendedoras->random();
                $paymentDate = Carbon::now()->subMonths($monthOffset)->subDays(rand(0, 28));
                
                $totalAmount = rand(800, 3500); // R$ 800 to R$ 3500
                $shippingAmount = rand(50, 200); // R$ 50 to R$ 200
                $receivedAmount = $totalAmount; // Assuming full payment
                
                $status = $statuses[array_rand($statuses)];
                
                // Higher chance of approval for older sales
                if ($monthOffset > 0) {
                    $status = rand(1, 10) <= 8 ? 'aprovado' : 'recusado';
                }

                $sale = Sale::create([
                    'user_id' => $vendedora->id,
                    'client_name' => $clientNames[array_rand($clientNames)],
                    'total_amount' => $totalAmount,
                    'shipping_amount' => $shippingAmount,
                    'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                    'received_amount' => $receivedAmount,
                    'payment_date' => $paymentDate,
                    'notes' => rand(1, 3) === 1 ? 'Cliente especial - desconto aplicado' : null,
                    'status' => $status,
                ]);

                // If approved, set approval details
                if ($status === 'aprovado') {
                    $sale->update([
                        'approved_by' => $admin->id,
                        'approved_at' => $paymentDate->addDays(rand(1, 3)),
                    ]);
                }

                // If rejected, set rejection details
                if ($status === 'recusado') {
                    $rejectionReasons = [
                        'Comprovante de pagamento inválido',
                        'Dados do cliente inconsistentes',
                        'Valor não confere com o pedido',
                        'Documentação incompleta',
                    ];
                    
                    $sale->update([
                        'rejected_by' => $admin->id,
                        'rejected_at' => $paymentDate->addDays(rand(1, 3)),
                        'rejection_reason' => $rejectionReasons[array_rand($rejectionReasons)],
                    ]);
                }
            }
        }

        // Create some high-value sales to test commission tiers
        $topVendedora = $vendedoras->first();
        
        // Create sales to reach each commission tier
        $highValueSales = [
            ['amount' => 15000, 'client' => 'Premium Cliente A'],
            ['amount' => 18000, 'client' => 'Premium Cliente B'], 
            ['amount' => 12000, 'client' => 'Premium Cliente C'],
            ['amount' => 20000, 'client' => 'Premium Cliente D'],
        ];

        foreach ($highValueSales as $saleData) {
            Sale::create([
                'user_id' => $topVendedora->id,
                'client_name' => $saleData['client'],
                'total_amount' => $saleData['amount'],
                'shipping_amount' => 150,
                'payment_method' => 'pix',
                'received_amount' => $saleData['amount'],
                'payment_date' => Carbon::now()->subDays(rand(5, 25)),
                'notes' => 'Venda premium - kit completo',
                'status' => 'aprovado',
                'approved_by' => $admin->id,
                'approved_at' => Carbon::now()->subDays(rand(1, 3)),
            ]);
        }

        $this->command->info('Sample sales created successfully!');
        $this->command->info('Created sales across 3 months with various statuses');
        $this->command->info('Top vendedora has high-value sales to test commission tiers');
    }
}