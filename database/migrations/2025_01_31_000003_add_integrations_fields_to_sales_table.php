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
            // Tiny ERP Integration Fields
            $table->string('tiny_erp_invoice_id')->nullable()->after('invoice_number');
            $table->string('tiny_erp_shipping_id')->nullable()->after('tiny_erp_invoice_id');
            $table->timestamp('invoice_generated_at')->nullable()->after('tiny_erp_shipping_id');
            $table->timestamp('shipping_label_generated_at')->nullable()->after('invoice_generated_at');
            $table->string('shipping_label_url')->nullable()->after('shipping_label_generated_at');
            $table->string('tiny_erp_status')->nullable()->after('shipping_label_url');
            $table->text('tiny_erp_error')->nullable()->after('tiny_erp_status');
            $table->timestamp('tiny_erp_sync_at')->nullable()->after('tiny_erp_error');
            
            // WhatsApp Integration Fields
            $table->boolean('whatsapp_confirmation_sent')->default(false)->after('tiny_erp_sync_at');
            $table->timestamp('whatsapp_confirmation_sent_at')->nullable()->after('whatsapp_confirmation_sent');
            $table->boolean('whatsapp_payment_approved_sent')->default(false)->after('whatsapp_confirmation_sent_at');
            $table->timestamp('whatsapp_payment_approved_sent_at')->nullable()->after('whatsapp_payment_approved_sent');
            $table->boolean('whatsapp_production_started_sent')->default(false)->after('whatsapp_payment_approved_sent_at');
            $table->timestamp('whatsapp_production_started_sent_at')->nullable()->after('whatsapp_production_started_sent');
            $table->boolean('whatsapp_photo_sent')->default(false)->after('whatsapp_production_started_sent_at');
            $table->timestamp('whatsapp_photo_sent_at')->nullable()->after('whatsapp_photo_sent');
            $table->boolean('whatsapp_shipping_sent')->default(false)->after('whatsapp_photo_sent_at');
            $table->timestamp('whatsapp_shipping_sent_at')->nullable()->after('whatsapp_shipping_sent');
            $table->boolean('whatsapp_payment_rejected_sent')->default(false)->after('whatsapp_shipping_sent_at');
            $table->timestamp('whatsapp_payment_rejected_sent_at')->nullable()->after('whatsapp_payment_rejected_sent');
            $table->boolean('whatsapp_final_payment_reminder_sent')->default(false)->after('whatsapp_payment_rejected_sent_at');
            $table->timestamp('whatsapp_final_payment_reminder_sent_at')->nullable()->after('whatsapp_final_payment_reminder_sent');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn([
                // Tiny ERP fields
                'tiny_erp_invoice_id',
                'tiny_erp_shipping_id',
                'invoice_generated_at',
                'shipping_label_generated_at',
                'shipping_label_url',
                'tiny_erp_status',
                'tiny_erp_error',
                'tiny_erp_sync_at',
                
                // WhatsApp fields
                'whatsapp_confirmation_sent',
                'whatsapp_confirmation_sent_at',
                'whatsapp_payment_approved_sent',
                'whatsapp_payment_approved_sent_at',
                'whatsapp_production_started_sent',
                'whatsapp_production_started_sent_at',
                'whatsapp_photo_sent',
                'whatsapp_photo_sent_at',
                'whatsapp_shipping_sent',
                'whatsapp_shipping_sent_at',
                'whatsapp_payment_rejected_sent',
                'whatsapp_payment_rejected_sent_at',
                'whatsapp_final_payment_reminder_sent',
                'whatsapp_final_payment_reminder_sent_at'
            ]);
        });
    }
};