<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    protected $table = 'emails';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'token', 'is_verified'
    ];

    public function reminders(): hasMany
    {
        return $this->HasMany(Reminder::class);
    }
}
