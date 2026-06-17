<?php

namespace App\Filament\Resources\Posts\Tables;

use Filament\Actions\BulkAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                    ->getStateUsing(fn ($record) => $record->thumbnail ? '/storage/' . ltrim($record->thumbnail, '/') : null)
                    ->size(60)
                    ->square()
                    ->defaultImageUrl(url('/asset/img/blog-placeholder.png')),

                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record): string => Str::limit(strip_tags($record->content), 50)),

                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('published_at')
                    ->label('Published')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->badge()
                    ->color(fn ($state): string => $state === null ? 'gray' : ($state > now() ? 'warning' : 'success'))
                    ->formatStateUsing(function ($state) {
                        if ($state === null) {
                            return 'Draft';
                        }
                        if ($state > now()) {
                            return 'Scheduled';
                        }
                        return $state->format('d/m/Y H:i');
                    }),

                TextColumn::make('likes_count')
                    ->label('Likes')
                    ->numeric()
                    ->sortable()
                    ->alignCenter()
                    ->icon('heroicon-o-hand-thumb-up')
                    ->color('success'),

                TextColumn::make('dislikes_count')
                    ->label('Dislikes')
                    ->numeric()
                    ->sortable()
                    ->alignCenter()
                    ->icon('heroicon-o-hand-thumb-down')
                    ->color('danger'),

                TextColumn::make('created_at')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'published' => 'Published',
                        'scheduled' => 'Scheduled',
                        'draft' => 'Draft',
                    ])
                    ->query(function ($query, array $data) {
                        return $query->when(
                            $data['value'] === 'published',
                            fn ($query) => $query->whereNotNull('published_at')->where('published_at', '<=', now())
                        )->when(
                            $data['value'] === 'scheduled',
                            fn ($query) => $query->whereNotNull('published_at')->where('published_at', '>', now())
                        )->when(
                            $data['value'] === 'draft',
                            fn ($query) => $query->whereNull('published_at')
                        );
                    }),

                Filter::make('published_at')
                    ->form([
                        DatePicker::make('published_from')
                            ->label('Published From'),
                        DatePicker::make('published_until')
                            ->label('Published Until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when(
                                $data['published_from'],
                                fn ($query, $date) => $query->whereDate('published_at', '>=', $date)
                            )
                            ->when(
                                $data['published_until'],
                                fn ($query, $date) => $query->whereDate('published_at', '<=', $date)
                            );
                    }),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    BulkAction::make('publish')
                        ->label('Publish Selected')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->update(['published_at' => now()])),
                    BulkAction::make('unpublish')
                        ->label('Unpublish Selected')
                        ->icon('heroicon-o-x-circle')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->update(['published_at' => null])),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
