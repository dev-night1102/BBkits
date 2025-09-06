<?php

namespace App\Providers;

use App\Models\Sale;
use App\Observers\SaleObserver;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production (Render uses proxy)
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        // Optional Vite optimization
        Vite::prefetch(concurrency: 3);
        
        // Register model observers
        Sale::observe(SaleObserver::class);
    }
}
