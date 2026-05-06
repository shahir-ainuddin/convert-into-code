<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table): void {
            $table->id();
            $table->string('file_code')->nullable();
            $table->string('file_name')->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_visible')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
