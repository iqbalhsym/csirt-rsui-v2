<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->components([
                        TextInput::make('title')
                            ->label('Judul Acara')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Set $set) {
                                if ($operation === 'create' && $state) {
                                    $slug = Str::slug($state);
                                    $originalSlug = $slug;
                                    $count = 1;
                                    
                                    while (\App\Models\Event::where('slug', $slug)->exists()) {
                                        $slug = $originalSlug . '-' . $count;
                                        $count++;
                                    }
                                    
                                    $set('slug', $slug);
                                }
                            }),

                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->rules(['alpha_dash'])
                            ->disabled()
                            ->dehydrated()
                            ->helperText('Dibuat otomatis dari judul'),

                        DateTimePicker::make('event_date')
                            ->label('Tanggal & Waktu Acara')
                            ->required()
                            ->native(false)
                            ->displayFormat('d/m/Y H:i')
                            ->seconds(false),

                        TextInput::make('location')
                            ->label('Lokasi / Platform')
                            ->placeholder('Contoh: Gd. B RSUI, Zoom, dll.')
                            ->maxLength(255),

                        TextInput::make('registration_link')
                            ->label('Link Pendaftaran / Informasi (Opsional)')
                            ->placeholder('https://...')
                            ->url()
                            ->maxLength(500)
                            ->columnSpanFull(),

                        FileUpload::make('thumbnail')
                            ->image()
                            ->disk('public')
                            ->directory('events/thumbnails')
                            ->maxSize(2048)
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->columnSpanFull(),

                        RichEditor::make('content')
                            ->label('Deskripsi Lengkap Acara')
                            ->required()
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('events/attachments')
                            ->fileAttachmentsVisibility('public')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Group::make()
                    ->components([
                        Placeholder::make('created_at')
                            ->label('Dibuat Pada')
                            ->content(fn ($record): string => $record?->created_at?->format('d/m/Y H:i') ?? '-'),

                        Placeholder::make('updated_at')
                            ->label('Terakhir Diperbarui')
                            ->content(fn ($record): string => $record?->updated_at?->format('d/m/Y H:i') ?? '-'),
                    ])
                    ->columns(2)
                    ->hidden(fn (string $operation): bool => $operation === 'create'),
            ]);
    }
}
