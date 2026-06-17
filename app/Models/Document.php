<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Document extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'file_path',
        'is_active',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Document $document) {
            if (! $document->title) {
                return;
            }

            $baseSlug = Str::slug($document->title);
            $document->slug = static::generateUniqueSlug($baseSlug, $document->id);
        });
    }

    private static function generateUniqueSlug(?string $baseSlug, ?int $ignoreId = null): ?string
    {
        if (! $baseSlug) {
            return null;
        }

        $slug = $baseSlug;
        $counter = 2;

        while (static::query()
            ->where('slug', $slug)
            ->when($ignoreId, fn ($query, $id) => $query->where('id', '!=', $id))
            ->exists()) {
            $slug = $baseSlug.'-'.$counter;
            $counter++;
        }

        return $slug;
    }
}
