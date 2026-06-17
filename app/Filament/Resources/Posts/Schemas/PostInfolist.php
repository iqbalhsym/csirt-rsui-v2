<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PostInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->weight('bold')
                    ->size('lg'),
                    
                TextEntry::make('slug')
                    ->badge()
                    ->color('gray'),
                    
                ImageEntry::make('thumbnail')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->height(300)
                    ->defaultImageUrl(url('/images/no-image.png'))
                    ->columnSpanFull(),
                    
                TextEntry::make('content')
                    ->label('Content')
                    ->html()
                    ->columnSpanFull(),
                    
                TextEntry::make('published_at')
                    ->label('Published At')
                    ->dateTime('d F Y, H:i')
                    ->placeholder('Not published yet')
                    ->icon('heroicon-o-calendar'),
                    
                TextEntry::make('likes_count')
                    ->label('Likes')
                    ->numeric()
                    ->icon('heroicon-o-hand-thumb-up')
                    ->color('success'),
                    
                TextEntry::make('dislikes_count')
                    ->label('Dislikes')
                    ->numeric()
                    ->icon('heroicon-o-hand-thumb-down')
                    ->color('danger'),
                    
                TextEntry::make('created_at')
                    ->label('Created At')
                    ->dateTime('d F Y, H:i')
                    ->icon('heroicon-o-clock'),
                    
                TextEntry::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime('d F Y, H:i')
                    ->icon('heroicon-o-arrow-path'),
            ])
            ->columns(2);
    }
}
