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
        Schema::create('commission_ranges', function (Blueprint $table) {
            $table->id();
            $table->decimal('min_amount', 10, 2);
            $table->decimal('max_amount', 10, 2)->nullable(); // null means no upper limit
            $table->decimal('percentage', 5, 2);
            $table->integer('order')->default(0); // for sorting ranges
            $table->boolean('active')->default(true);
            $table->timestamps();
        });

        // Insert default commission ranges
        DB::table('commission_ranges')->insert([
            [
                'min_amount' => 40000,
                'max_amount' => 49999.99,
                'percentage' => 2,
                'order' => 1,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'min_amount' => 50000,
                'max_amount' => 59999.99,
                'percentage' => 3,
                'order' => 2,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'min_amount' => 60000,
                'max_amount' => null, // no upper limit
                'percentage' => 4,
                'order' => 3,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_ranges');
    }
};