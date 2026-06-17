<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make()
                    ->components([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Set $set) {
                                if ($operation === 'create' && $state) {
                                    $slug = Str::slug($state);
                                    $originalSlug = $slug;
                                    $count = 1;
                                    
                                    // Check if slug exists and make it unique
                                    while (\App\Models\Post::where('slug', $slug)->exists()) {
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
                            ->helperText('Auto-generated from title'),

                        FileUpload::make('thumbnail')
                            ->image()
                            ->disk('public')
                            ->directory('thumbnails')
                            ->maxSize(2048)
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->columnSpanFull(),

                        RichEditor::make('content')
                            ->required()
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('posts/attachments')
                            ->fileAttachmentsVisibility('public')
                            ->columnSpanFull(),

                        DateTimePicker::make('published_at')
                            ->label('Publish Date')
                            ->default(now())
                            ->placeholder('Leave empty for draft')
                            ->native(false)
                            ->displayFormat('d/m/Y H:i')
                            ->seconds(false)
                            ->helperText('Set a future date to schedule publication'),
                    ])
                    ->columns(2),

                Group::make()
                    ->components([
                        Placeholder::make('likes_count')
                            ->label('Likes')
                            ->content(fn ($record): string => $record ? number_format($record->likes_count) : '0'),

                        Placeholder::make('dislikes_count')
                            ->label('Dislikes')
                            ->content(fn ($record): string => $record ? number_format($record->dislikes_count) : '0'),

                        Placeholder::make('created_at')
                            ->label('Created At')
                            ->content(fn ($record): string => $record?->created_at?->format('d/m/Y H:i') ?? '-'),

                        Placeholder::make('updated_at')
                            ->label('Last Updated')
                            ->content(fn ($record): string => $record?->updated_at?->format('d/m/Y H:i') ?? '-'),
                    ])
                    ->columns(2)
                    ->hidden(fn (string $operation): bool => $operation === 'create'),
            ]);
    }
}
