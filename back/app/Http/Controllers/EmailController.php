<?php

namespace App\Http\Controllers;

use App\Email;
use Illuminate\Http\Request;

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
        $email = new Email;
        $email->token = $request->input('token');
        $email->email = $request->input('email');
        $email->save();
        return $email;
    }

    public function checkIfEmailIsVerfied(Request $request, $token)
    {
        $email = Email::where('token', $request->input('token'))->get();
        return $email;
    }

    public function verifyEmail(Request $request, $token)
    {
        $email = Email::where('token', $request->input('token'))->update([
            'is_verified' => true
        ]);
        return $email;
    }
}
