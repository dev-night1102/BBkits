<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->boolean('is_processing')->default(false)->after('status');
            $table->timestamp('processing_started_at')->nullable()->after('is_processing');
            $table->string('processing_token')->nullable()->after('processing_started_at');
            
            $table->index(['status', 'is_processing']);
        });
    }

    public function down()
    {
        Schema::table('sales', function (Blueprint $table) {
            $table->dropColumn(['is_processing', 'processing_started_at', 'processing_token']);
        });
    }
};