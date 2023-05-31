<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
</head>
<body>
    <h2>Gracias por usar MyGuardMoney.</h2><br>
    <h3>Ahora debes confirmar tu correo electrónico</h3>
    <hr>
    <a href="{{ env('APP_URL') }}/emails-verify/{{ $content }}" target="_blank">Confirmar</a>
    <hr>
    <b>MyGuardMoney</b>
</body>
</html>
