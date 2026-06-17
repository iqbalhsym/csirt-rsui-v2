<?php

namespace App\Filament\Resources\PublicKeys\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PublicKeyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->components([
                        TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, Set $set) {
                                $set('slug', $state ? Str::slug($state) : null);
                            }),

                        TextInput::make('slug')
                            ->label('Slug')
                            ->required()
                            ->disabled()
                            ->dehydrated()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Slug otomatis dari judul'),

                        FileUpload::make('file_path')
                            ->label('Upload Public Key')
                            ->required()
                            ->disk('public')
                            ->directory('public-keys')
                            ->preserveFilenames()
                            ->openable()
                            ->downloadable()
                            ->acceptedFileTypes(['text/plain', 'application/pgp-keys'])
                            ->columnSpanFull(),

                        Toggle::make('is_active')
                            ->label('Aktif')
                            ->default(true)
                            ->inline(false)
                            ->helperText('Matikan toggle untuk menonaktifkan akses public key ini.'),
                    ])
                    ->columns(1),
            ]);
    }
}
