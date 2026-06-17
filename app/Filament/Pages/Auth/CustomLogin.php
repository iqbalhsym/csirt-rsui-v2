<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Schemas\Components\Component;

class CustomLogin extends BaseLogin
{
    /**
     * Get the password form component, keeping it strictly password type and disabling the reveal toggle.
     */
    protected function getPasswordFormComponent(): Component
    {
        return parent::getPasswordFormComponent()
            ->revealable(false);
    }
}

