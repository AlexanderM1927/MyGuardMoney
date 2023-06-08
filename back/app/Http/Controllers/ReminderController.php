<?php

namespace App\Http\Controllers;

use App\Email;
use App\Reminder;
use App\Mail\MessageReminder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

    public function deleteAllReminders($token)
    {
        $emailByToken = Email::where([
            ['token', $token]
        ])->first();

        if ($emailByToken) {
            $emails = Email::where([
                ['email', $emailByToken->email]
            ])->with('reminders')->get();

            $reminderIdsToDelete = [];
            foreach ($emails as $key => $emailObj) {
                foreach ($emailObj->reminders as $key => $reminder) {
                    $reminderIdsToDelete[] = $reminder->id;
                }
            }

            \Log::info('$reminderIdsToDelete');
            \Log::info($reminderIdsToDelete);

            Reminder::whereIn('id', $reminderIdsToDelete)->delete();
        }


        return response()->json([
            'message' => 'Reminders deleted.'
        ], 200);
    }

    public function runReminders()
    {
        date_default_timezone_set('America/Bogota');
        $reminders = Reminder::with('email')->get();
        $currentDate = new \DateTime();
        $currentHour = date('H');
        $currentMinute = date('i');
        $remindersToExecute = [];

        foreach ($reminders as $reminder) {
            $lastExecuted = new \DateTime($reminder->last_executed);
            $diffLastExecuted = $lastExecuted->diff($currentDate);
            $hourReminder = substr($reminder->hour, 0, strpos($reminder->hour, ':'));
            $minuteReminder = substr($reminder->hour, strpos($reminder->hour, ':') + 1);

            if (empty($reminder->last_executed) ||
                (intval($diffLastExecuted->m) >= 1 && $reminder->frequency == 'onceamonth') ||
                (intval($diffLastExecuted->days) >= 1 && $reminder->frequency == 'everyday')
            ) {
                if ($reminder->frequency == 'onceamonth' && $reminder->day > date('t')) {
                    if ($currentHour > $hourReminder || ($currentHour == $hourReminder && $currentMinute > $minuteReminder)) {
                        $remindersToExecute[] = $reminder;
                    }
                } elseif ($reminder->frequency == 'onceamonth' && $reminder->day == date('j')) {
                    $remindersToExecute[] = $reminder;
                } elseif ($reminder->frequency == 'everyday') {
                    if ($currentHour > $hourReminder || ($currentHour == $hourReminder && $currentMinute > $minuteReminder)) {
                        $remindersToExecute[] = $reminder;
                    }
                }
            }
        }

        $reminderIds = [];
        foreach ($remindersToExecute as $key => $reminder) {
            $reminderIds[] = $reminder->id;
            $content = "";
            $content .= '<b>Nombre:</b><br>'.$reminder->name.'<br>';
            $content .= '<b>Detalles:</b><br>'.$reminder->detail.'<br><br><br>';
            Mail::to($reminder->email->email)->send(new MessageReminder('Recordatorio', $content, $reminder->email->email));
        }

        Reminder::whereIn('id', $reminderIds)->update([
            'last_executed' => $currentDate
        ]);

        return $remindersToExecute;
    }
}
