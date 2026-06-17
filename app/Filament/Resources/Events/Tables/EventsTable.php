<?php

namespace App\Filament\Resources\Events\Tables;

use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class EventsTable
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
                    ->label('Judul Acara')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('event_date')
                    ->label('Tanggal Acara')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),

                TextColumn::make('location')
                    ->label('Lokasi')
                    ->searchable()
                    ->placeholder('-'),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ])
            ->defaultSort('event_date', 'asc');
    }
}
