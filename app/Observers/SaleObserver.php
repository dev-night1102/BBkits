<?php

namespace App\Observers;

use App\Models\Sale;
use Illuminate\Support\Str;

class SaleObserver
{
    /**
     * Handle the Sale "creating" event.
     */
    public function creating(Sale $sale): void
    {
        // Token generation is handled by the model's boot method
        // This observer can be used for other business logic if needed
    }
}