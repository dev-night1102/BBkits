<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('sale_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('amount', 10, 2);
            $table->enum('type', ['commission_only', 'commission_plus_additional']);
            $table->text('reason');
            $table->foreignId('applied_by')->constrained('users');
            $table->timestamp('applied_at');
            $table->enum('status', ['active', 'paid', 'cancelled'])->default('active');
            $table->decimal('outstanding_balance', 10, 2)->default(0);
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['applied_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fines');
    }
};