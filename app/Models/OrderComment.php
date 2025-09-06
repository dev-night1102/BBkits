<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderComment extends Model
{
    protected $fillable = [
        'sale_id',
        'user_id',
        'department',
        'comment',
        'is_internal',
        'mention_user_id'
    ];

    protected $casts = [
        'is_internal' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mentionedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mention_user_id');
    }

    public function getDepartmentIcon(): string
    {
        return match($this->department) {
            'finance' => '💰',
            'production' => '🏭',
            'admin' => '🛡️',
            'sales' => '💼',
            default => '💬'
        };
    }

    public function getDepartmentLabel(): string
    {
        return match($this->department) {
            'finance' => 'Financeiro',
            'production' => 'Produção',
            'admin' => 'Administração',
            'sales' => 'Vendas',
            default => 'Geral'
        };
    }
}