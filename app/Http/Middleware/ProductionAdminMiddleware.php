<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ProductionAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || !auth()->user()->canManageProduction()) {
            abort(403); // Forbidden
        }

        return $next($request);
    }
}
