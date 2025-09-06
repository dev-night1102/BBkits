<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type');
            $table->text('message');
            $table->json('data')->nullable();
            $table->boolean('read')->default(false);
            $table->timestamps();
            
            $table->index(['user_id', 'read']);
            $table->index(['created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
};