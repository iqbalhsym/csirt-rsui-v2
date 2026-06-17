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
        Schema::create('incidents', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_number')->unique();
            $table->string('reporter_name');
            $table->string('reporter_email');
            $table->string('incident_type');
            $table->string('vulnerability_level')->default('low'); // low, medium, high, critical
            $table->dateTime('incident_date');
            $table->text('description');
            $table->string('status')->default('pending'); // pending, investigating, resolved, closed
            $table->string('attachment_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incidents');
    }
};
