<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRemindersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('detail')->nullable();
            $table->string('hour', 100);
            $table->string('frequency', 100);
            $table->string('day', 100)->nullable();
            $table->dateTime('last_executed')->nullable();

            $table->unsignedBigInteger('email_id');

            $table->foreign('email_id')->references('id')->on('emails');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reminders');
    }
}
