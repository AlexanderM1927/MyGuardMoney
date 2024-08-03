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
$router->group(['prefix' => 'v1'], function () use ($router) {
    $router->get('/test', function () {
        phpinfo();
    });

    // Reminders
    $router->get('/reminders/{token}', ['as' => 'reminder.index', 'uses' => 'ReminderController@indexReminder']);
    $router->post('/reminders', ['as' => 'reminder.store', 'uses' => 'ReminderController@storeReminder']);
    $router->put('/reminders', ['as' => 'reminder.update', 'uses' => 'ReminderController@updateReminder']);
    $router->delete('/reminders/{id}', ['as' => 'reminder.delete', 'uses' => 'ReminderController@deleteReminder']);
    $router->delete('/reminders-all/{token}', ['as' => 'reminder.delete-all', 'uses' => 'ReminderController@deleteAllReminders']);
    $router->get('/reminders-run', ['as' => 'reminder.run', 'uses' => 'ReminderController@runReminders']);

    // Emails
    $router->get('/emails/{token}', ['as' => 'reminder.index', 'uses' => 'EmailController@checkIfEmailIsVerfied']);
    $router->post('/emails', ['as' => 'reminder.store', 'uses' => 'EmailController@storeEmail']);
    $router->get('/emails-verify/{token}', ['as' => 'reminder.update', 'uses' => 'EmailController@verifyEmail']);
});
