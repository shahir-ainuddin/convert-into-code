<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('images', function (Blueprint $table): void {
            $table->id();
            $table->string('image_code')->nullable();
            $table->string('image_name')->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_visible')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
