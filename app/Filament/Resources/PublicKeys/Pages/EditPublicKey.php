<?php

namespace App\Filament\Resources\PublicKeys\Pages;

use App\Filament\Resources\PublicKeys\PublicKeyResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPublicKey extends EditRecord
{
    protected static string $resource = PublicKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
