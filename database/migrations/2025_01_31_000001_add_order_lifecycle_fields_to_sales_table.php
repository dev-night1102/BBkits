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
        Schema::table('sales', function (Blueprint $table) {
            // Embroidery details
            $table->string('child_name')->nullable()->after('client_name');
            $table->enum('embroidery_position', ['top', 'bottom', 'left', 'right', 'center'])->default('center')->after('child_name');
            $table->string('embroidery_color')->default('pink')->after('embroidery_position');
            $table->string('embroidery_font')->default('cursive')->after('embroidery_color');
            
            // Order lifecycle fields
            $table->string('unique_token')->unique()->nullable()->after('id');
            $table->enum('order_status', ['pending_payment', 'payment_approved', 'in_production', 'photo_sent', 'photo_approved', 'pending_final_payment', 'ready_for_shipping', 'shipped'])->default('pending_payment')->after('status');
            
            // Client info
            $table->string('client_email')->nullable()->after('client_name');
            $table->string('client_phone')->nullable()->after('client_email');
            $table->string('client_cpf')->nullable()->after('client_phone');
            
            // Delivery address
            $table->string('delivery_address')->nullable();
            $table->string('delivery_number')->nullable();
            $table->string('delivery_complement')->nullable();
            $table->string('delivery_neighborhood')->nullable();
            $table->string('delivery_city')->nullable();
            $table->string('delivery_state')->nullable();
            $table->string('delivery_zipcode')->nullable();
            
            // Production fields
            $table->foreignId('production_admin_id')->nullable()->constrained('users');
            $table->timestamp('production_started_at')->nullable();
            $table->string('product_photo')->nullable();
            $table->text('product_photo_data')->nullable();
            $table->timestamp('photo_sent_at')->nullable();
            $table->timestamp('photo_approved_at')->nullable();
            $table->timestamp('photo_rejected_at')->nullable();
            $table->text('photo_rejection_reason')->nullable();
            
            // Finance admin fields
            $table->foreignId('finance_admin_id')->nullable()->constrained('users');
            $table->timestamp('initial_payment_approved_at')->nullable();
            $table->timestamp('final_payment_approved_at')->nullable();
            
            // Shipping fields
            $table->string('invoice_number')->nullable();
            $table->string('tracking_code')->nullable();
            $table->timestamp('shipped_at')->nullable();
            $table->string('shipping_label')->nullable();
            
            // Additional payment proof
            $table->string('initial_payment_proof')->nullable();
            $table->text('initial_payment_proof_data')->nullable();
            $table->string('final_payment_proof')->nullable();
            $table->text('final_payment_proof_data')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn([
                'child_name',
                'embroidery_position',
                'embroidery_color',
                'embroidery_font',
                'unique_token',
                'order_status',
                'client_email',
                'client_phone',
                'client_cpf',
                'delivery_address',
                'delivery_number',
                'delivery_complement',
                'delivery_neighborhood',
                'delivery_city',
                'delivery_state',
                'delivery_zipcode',
                'production_admin_id',
                'production_started_at',
                'product_photo',
                'product_photo_data',
                'photo_sent_at',
                'photo_approved_at',
                'photo_rejected_at',
                'photo_rejection_reason',
                'finance_admin_id',
                'initial_payment_approved_at',
                'final_payment_approved_at',
                'invoice_number',
                'tracking_code',
                'shipped_at',
                'shipping_label',
                'initial_payment_proof',
                'initial_payment_proof_data',
                'final_payment_proof',
                'final_payment_proof_data'
            ]);
        });
    }
};