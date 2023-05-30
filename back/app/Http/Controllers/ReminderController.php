<?php

namespace App\Http\Controllers;

use App\Email;
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

    public function indexReminder($token)
    {
        $email = Email::where([
            ['token', $token]
        ])->first();

        if ($email) {
            $reminders = Reminder::where('email_id', $email->id)->get();

            return response()->json([
                'reminders' => $reminders
            ], 200);
        }
        return response()->json([
            'reminders' => []
        ], 204);
    }

    public function storeReminder(Request $request)
    {
        $reminder = new Reminder;
        $reminder->name = $request->input('nombre');
        $reminder->detail = $request->input('detalle');
        $reminder->frequency = $request->input('frequency');
        $reminder->day = $request->input('day');
        $reminder->hour = $request->input('hour');

        $email = Email::where([
            ['token', $request->input('token')],
            ['is_verified', true]
        ])->first();

        if ($email) {
            $reminder->email_id = $email->id;
            $reminder->save();

            return response()->json([
                'reminder' => $reminder,
                'message' => 'Recordatorio guardado correctamente'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Tienes que verificar tu email primero o agregarlo.'
            ], 500);
        }

        return response()->json([
            'message' => 'Reminder didnt save.'
        ], 500);
    }

    public function updateReminder()
    {
        return Reminder::all();
    }

    public function deleteReminder($id)
    {
        Reminder::find($id)->delete();
        return response()->json([
            'message' => 'Reminder deleted.'
        ], 200);
    }

    public function runReminders()
    {
        return Reminder::all();
    }
}
