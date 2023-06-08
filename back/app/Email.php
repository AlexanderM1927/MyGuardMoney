<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class);
    }
}
