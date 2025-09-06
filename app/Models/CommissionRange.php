<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionRange extends Model
{
    use HasFactory;

    protected $fillable = [
        'min_amount',
        'max_amount',
        'percentage',
        'order',
        'active',
    ];

    protected $casts = [
        'min_amount' => 'decimal:2',
        'max_amount' => 'decimal:2',
        'percentage' => 'decimal:2',
        'active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('min_amount');
    }

    public function getFormattedRangeAttribute()
    {
        $min = number_format($this->min_amount, 2, ',', '.');
        if ($this->max_amount) {
            $max = number_format($this->max_amount, 2, ',', '.');
            return "R$ {$min} - R$ {$max}";
        }
        return "R$ {$min} ou mais";
    }

    public function appliesTo($amount)
    {
        if ($amount < $this->min_amount) {
            return false;
        }
        
        if ($this->max_amount && $amount > $this->max_amount) {
            return false;
        }
        
        return true;
    }
}