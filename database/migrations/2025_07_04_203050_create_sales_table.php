<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('client_name');
            $table->decimal('total_amount', 10, 2);
            $table->decimal('shipping_amount', 10, 2);
            $table->enum('payment_method', ['pix', 'boleto', 'cartao', 'dinheiro']);
            $table->decimal('received_amount', 10, 2);
            $table->date('payment_date');
            $table->string('payment_receipt')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['pendente', 'aprovado', 'recusado', 'cancelado', 'estornado'])->default('pendente');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
