<?php

namespace App\Helpers;

class CurrencyHelper
{
    public static function format($amount): string
    {
        return number_format((float) $amount, 2, '.', ',');
    }

    public static function formatForDisplay($amount): string
    {
        return 'R$ ' . self::format($amount);
    }
}