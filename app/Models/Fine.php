<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sale_id',
        'amount',
        'type',
        'reason',
        'applied_by',
        'applied_at',
        'status',
        'outstanding_balance'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'applied_at' => 'datetime',
        'outstanding_balance' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function appliedBy()
    {
        return $this->belongsTo(User::class, 'applied_by');
    }

    public function isCommissionOnly()
    {
        return $this->type === 'commission_only';
    }

    public function hasOutstandingBalance()
    {
        return $this->outstanding_balance > 0;
    }
}