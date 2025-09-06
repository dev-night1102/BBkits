<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('approved')->default(false)->after('role');
            $table->timestamp('approved_at')->nullable()->after('approved');
            $table->foreignId('approved_by')->nullable()->constrained('users')->after('approved_at');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['approved_by']);
            $table->dropColumn(['approved', 'approved_at', 'approved_by']);
        });
    }
};