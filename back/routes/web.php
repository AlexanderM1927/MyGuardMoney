<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// Reminders
$router->get('/reminders', ['as' => 'reminder.index', 'uses' => 'ReminderController@indexReminder']);
$router->post('/reminders', ['as' => 'reminder.store', 'uses' => 'ReminderController@storeReminder']);
$router->put('/reminders', ['as' => 'reminder.update', 'uses' => 'ReminderController@updateReminder']);
$router->delete('/reminders', ['as' => 'reminder.delete', 'uses' => 'ReminderController@deleteReminder']);
