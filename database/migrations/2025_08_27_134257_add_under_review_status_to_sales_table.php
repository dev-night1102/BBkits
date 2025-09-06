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
            // Add fields for under review status
            $table->timestamp('review_started_at')->nullable()->after('corrected_at');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null')->after('review_started_at');
            $table->text('review_reason')->nullable()->after('reviewed_by');
            $table->timestamp('review_resolved_at')->nullable()->after('review_reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropForeign(['reviewed_by']);
            $table->dropColumn([
                'review_started_at',
                'reviewed_by', 
                'review_reason',
                'review_resolved_at'
            ]);
        });
    }
};