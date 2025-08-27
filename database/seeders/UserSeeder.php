<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@bbkits.com'],
            [
                'name' => 'Administrador BBKits',
                'email_verified_at' => now(),
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // Create Finance User
        User::updateOrCreate(
            ['email' => 'financeiro@bbkits.com'],
            [
                'name' => 'Financeiro BBKits',
                'email_verified_at' => now(),
                'password' => Hash::make('financeiro123'),
                'role' => 'financeiro',
            ]
        );

        // Create Sales Users (Vendedoras)
        $vendedoras = [
            ['name' => 'Maria Silva', 'email' => 'maria@bbkits.com'],
            ['name' => 'Ana Santos', 'email' => 'ana@bbkits.com'],
            ['name' => 'Juliana Costa', 'email' => 'juliana@bbkits.com'],
            ['name' => 'Carla Oliveira', 'email' => 'carla@bbkits.com'],
            ['name' => 'Patricia Lima', 'email' => 'patricia@bbkits.com'],
        ];

        foreach ($vendedoras as $vendedora) {
            User::updateOrCreate(
                ['email' => $vendedora['email']],
                [
                    'name' => $vendedora['name'],
                    'email_verified_at' => now(),
                    'password' => Hash::make('vendedora123'),
                    'role' => 'vendedora',
                ]
            );
        }

        $this->command->info('Users created or updated successfully!');
        $this->command->info('Admin: admin@bbkits.com / admin123');
        $this->command->info('Financeiro: financeiro@bbkits.com / financeiro123');
        $this->command->info('Vendedoras: maria@bbkits.com, ana@bbkits.com, etc. / vendedora123');
    }
}