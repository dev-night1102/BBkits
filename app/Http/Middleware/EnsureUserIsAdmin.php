<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            return redirect('/login');
        }
        
        $user = auth()->user();
        if ($user->role !== 'admin' && $user->role !== 'financeiro') {
            abort(403, 'Acesso negado. Apenas administradores e equipe financeira podem acessar esta área.');
        }
        
        return $next($request);
    }
}
