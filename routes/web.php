<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\IncidentController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $latestPosts = Post::query()
        ->published()
        ->latest('published_at')
        ->take(3)
        ->get()
        ->map(fn ($post) => [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'thumbnail_url' => $post->thumbnail_url,
            'excerpt' => Str::limit(strip_tags($post->content), 140),
            'published_at' => optional($post->published_at)->translatedFormat('d M Y'),
        ]);

    $latestEventsQuery = \App\Models\Event::query()
        ->where('event_date', '>=', now())
        ->orderBy('event_date', 'asc')
        ->take(4)
        ->get();

    if ($latestEventsQuery->isEmpty()) {
        $latestEventsQuery = \App\Models\Event::query()
            ->orderBy('event_date', 'desc')
            ->take(4)
            ->get();
    }

    $latestEvents = $latestEventsQuery->map(fn ($event) => [
        'id' => $event->id,
        'title' => $event->title,
        'slug' => $event->slug,
        'thumbnail_url' => $event->thumbnail_url,
        'excerpt' => Str::limit(strip_tags($event->content), 100),
        'event_date' => optional($event->event_date)->translatedFormat('d M Y H:i'),
        'location' => $event->location,
        'registration_link' => $event->registration_link,
    ]);

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'latestPosts' => $latestPosts,
        'latestEvents' => $latestEvents,
    ]);
})->name('home');

Route::get('/download/rfc-2350', [DownloadController::class, 'rfc2350'])
    ->name('download.rfc2350');

Route::get('/download/public-key', [DownloadController::class, 'publicKey'])
    ->name('download.public-key');

Route::get('/blog', [BlogController::class, 'index'])
    ->name('blog.index');

Route::get('/blog/{post:slug}', [BlogController::class, 'show'])
    ->name('blog.show');

Route::get('/events', [EventController::class, 'index'])
    ->name('events.index');

Route::get('/events/{event:slug}', [EventController::class, 'show'])
    ->name('events.show');

Route::post('/api/incidents', [IncidentController::class, 'store'])->name('api.incidents.store');
Route::get('/api/incidents/track', [IncidentController::class, 'track'])->name('api.incidents.track');
Route::get('/api/monitoring', [IncidentController::class, 'monitoring'])->name('api.monitoring');
Route::get('/api/captcha', [IncidentController::class, 'captcha'])->name('api.captcha');

Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
})->name('logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
