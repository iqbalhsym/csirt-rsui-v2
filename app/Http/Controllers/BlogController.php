<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(Request $request): Response
    {

        $yearFilter = $request->query('year');

        $postsQuery = Post::query()->published();

        if ($yearFilter) {
            if ($yearFilter === 'unknown') {
                $postsQuery->whereNull('published_at');
            } elseif (is_numeric($yearFilter)) {
                $postsQuery->whereYear('published_at', (int) $yearFilter);
            }
        }

        $posts = $postsQuery
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate(6)
            ->through(fn (Post $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'thumbnail_url' => $post->thumbnail_url,
                'excerpt' => Str::limit(strip_tags($post->content), 180),
                'published_at' => optional($post->published_at)->translatedFormat('d M Y'),
                'published_year' => optional($post->published_at)?->format('Y') ?? 'Tidak diketahui',
            ])
            ->withQueryString();

        $yearSections = collect($posts->items())
            ->groupBy(fn (array $post) => $post['published_year'] ?? 'Tidak diketahui')
            ->sortKeysUsing(function (string $a, string $b) {
                $aValue = is_numeric($a) ? (int) $a : PHP_INT_MIN;
                $bValue = is_numeric($b) ? (int) $b : PHP_INT_MIN;

                return $bValue <=> $aValue;
            })
            ->map(fn ($items, $year) => [
                'year' => $year,
                'posts' => array_values($items->all()),
            ])
            ->values();

        $archives = Post::query()
            ->published()
            ->get()
            ->groupBy(fn (Post $post) => optional($post->published_at)?->format('Y') ?? 'Tidak diketahui')
            ->sortKeysUsing(function (string $a, string $b) {
                $aValue = is_numeric($a) ? (int) $a : PHP_INT_MIN;
                $bValue = is_numeric($b) ? (int) $b : PHP_INT_MIN;

                return $bValue <=> $aValue;
            })
            ->map(fn ($items, $year) => [
                'year' => $year,
                'count' => $items->count(),
                'param' => $year === 'Tidak diketahui' ? 'unknown' : $year,
            ])
            ->values();

        $activeYear = $yearFilter === 'unknown'
            ? 'Tidak diketahui'
            : ($yearFilter ?: null);

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'yearSections' => $yearSections->all(),
            'archives' => $archives->all(),
            'activeYear' => $activeYear,
        ]);
    }

    public function show(Post $post): Response
    {
        abort_if(optional($post->published_at)->isFuture(), 404);

        return Inertia::render('blog/show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'thumbnail_url' => $post->thumbnail_url,
                'content' => $post->content,
                'published_at' => optional($post->published_at)->translatedFormat('d M Y'),
            ],
        ]);
    }
}
