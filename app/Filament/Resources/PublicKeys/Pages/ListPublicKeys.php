<?php

namespace App\Filament\Resources\PublicKeys\Pages;

use App\Filament\Resources\PublicKeys\PublicKeyResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPublicKeys extends ListRecords
{
    protected static string $resource = PublicKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
