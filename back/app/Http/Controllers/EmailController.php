<?php

namespace App\Http\Controllers;

use App\Email;
use App\Mail\MessageConfirmEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
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

    public function storeEmail(Request $request)
    {
        try {

            $email = new Email;
            $email->token = $request->input('token');
            $email->email = $request->input('email');
            $email->save();

            Mail::to($email->email)->send(new MessageConfirmEmail('Confirmar correo', $email->token, $email->email));

            return $email;
        } catch (\Exception $e) {
            \Log::info($e);
        }
    }

    public function checkIfEmailIsVerfied(Request $request, $token)
    {
        $email = Email::where('token', $token)->get();
        return $email;
    }

    public function verifyEmail(Request $request, $token)
    {
        $email = Email::where('token', $token)->update([
            'is_verified' => 1
        ]);
        return 'Tu cuenta ha sido verificada.';
    }
}
