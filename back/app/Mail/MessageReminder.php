<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MessageReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $content;
    public $email;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($title,$content,$email)
    {
        //
        $this->subject = $title;
        $this->content = $content;
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email');
    }
}
