<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->foreignId('corrected_by')->nullable()->constrained('users')->after('rejection_reason');
            $table->timestamp('corrected_at')->nullable()->after('corrected_by');
            $table->text('correction_reason')->nullable()->after('corrected_at');
            $table->string('original_status')->nullable()->after('correction_reason');
        });
    }

    public function down(): void
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropForeign(['corrected_by']);
            $table->dropColumn(['corrected_by', 'corrected_at', 'correction_reason', 'original_status']);
        });
    }
};