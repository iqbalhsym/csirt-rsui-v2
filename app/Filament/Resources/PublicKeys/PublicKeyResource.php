<?php

namespace App\Filament\Resources\PublicKeys;

use App\Filament\Resources\PublicKeys\Pages\CreatePublicKey;
use App\Filament\Resources\PublicKeys\Pages\EditPublicKey;
use App\Filament\Resources\PublicKeys\Pages\ListPublicKeys;
use App\Filament\Resources\PublicKeys\Schemas\PublicKeyForm;
use App\Filament\Resources\PublicKeys\Tables\PublicKeysTable;
use App\Models\PublicKey;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PublicKeyResource extends Resource
{
    protected static ?string $model = PublicKey::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedKey;

    protected static ?string $navigationLabel = 'Public Key';

    protected static ?string $modelLabel = 'Public Key';

    protected static ?string $pluralModelLabel = 'Public Key';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return PublicKeyForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PublicKeysTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPublicKeys::route('/'),
            'create' => CreatePublicKey::route('/create'),
            'edit' => EditPublicKey::route('/{record}/edit'),
        ];
    }
}
