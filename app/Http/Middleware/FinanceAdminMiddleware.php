<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FinanceAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->user() || !auth()->user()->canApprovePayments()) {
            abort(403);
        }
        return $next($request);
    }
}
