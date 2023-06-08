<?php

namespace App\Jobs;

use App\Mail\MessageReminder;
use Illuminate\Support\Facades\Mail;

class ReminderJob extends Job
{
    private $reminder;
    private $content;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($reminder, $content)
    {
        $this->reminder = $reminder;
        $this->content = $content;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->reminder->email->email)->send(new MessageReminder('Recordatorio', $this->content, $this->reminder->email->email));
    }
}
