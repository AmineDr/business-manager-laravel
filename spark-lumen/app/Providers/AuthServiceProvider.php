<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            $token = $request->header('Authorization');

            // Check for token format (e.g., Bearer <token>)
            if (empty($token) || !str_starts_with($token, 'Bearer ')) {
                return null;
            }

            // Extract token value
            $token = str_replace('Bearer ', '', $token);

            // Validate token against your logic (e.g., database lookup)
            return User::where('api_token', $token)->first();
        });
    }

    public function handle($request, \Closure $next)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized | Provider'], 401);
        }

        return $next($request);
    }
}
