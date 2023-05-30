<?php

namespace App\Http\Controllers;

use App\Reminder;
use Illuminate\Http\Request;

class ReminderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function indexReminder()
    {
        return Reminder::all();
    }

    public function storeReminder(Request $request)
    {
        return Reminder::all();
    }

    public function updateReminder()
    {
        return Reminder::all();
    }

    public function deleteReminder()
    {
        return Reminder::all();
    }
}
