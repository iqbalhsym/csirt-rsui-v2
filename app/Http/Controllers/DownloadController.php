<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\PublicKey;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function rfc2350()
    {
        $document = Document::query()
            ->where('is_active', true)
            ->latest('updated_at')
            ->first();

        if (! $document || ! Storage::disk('public')->exists($document->file_path)) {
            abort(404, 'Dokumen RFC 2350 tidak ditemukan.');
        }

        return Storage::disk('public')->download(
            $document->file_path,
            sprintf('%s.%s', $document->slug, pathinfo($document->file_path, PATHINFO_EXTENSION) ?: 'pdf')
        );
    }

    public function publicKey()
    {
        $publicKey = PublicKey::query()
            ->where('is_active', true)
            ->latest('updated_at')
            ->first();

        if (! $publicKey || ! Storage::disk('public')->exists($publicKey->file_path)) {
            abort(404, 'Public key tidak ditemukan.');
        }

        return Storage::disk('public')->download(
            $publicKey->file_path,
            sprintf('%s.%s', $publicKey->slug, pathinfo($publicKey->file_path, PATHINFO_EXTENSION) ?: 'txt')
        );
    }
}
