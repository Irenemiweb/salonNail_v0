<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $exception): Response
    {
        // 🔐 Error de autenticación (sesión expirada)
        if ($exception instanceof AuthenticationException) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Unauthenticated.'], 401);
            }
        }

        // 🔐 Error de CSRF token inválido (por ejemplo, token expirado)
        if ($exception instanceof TokenMismatchException) {
            if ($request->expectsJson()) {
                // Si la petición es AJAX/JSON, responde con JSON
                return response()->json(['error' => 'CSRF token mismatch.'], 419);
            } else {
                // Si es petición normal, redirige a index.php con mensaje de sesión
            //    return redirect()->route('init_page')->with('error', 'Tu sesión ha expirado. Por favor, vuelve a intentarlo.');
            return response()->json(['error' => 'Tu sesión ha expirado. Por favor, vuelve a intentarlo.'], 419);
            }
        }

        // Deja que Laravel maneje el resto normalmente
        return parent::render($request, $exception);
    }
}
