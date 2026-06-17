<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(Request $request): Response
    {
        $yearFilter = $request->query('year');
        $eventsQuery = Event::query();

        if ($yearFilter) {
            if ($yearFilter === 'unknown') {
                $eventsQuery->whereNull('event_date');
            } elseif (is_numeric($yearFilter)) {
                $eventsQuery->whereYear('event_date', (int) $yearFilter);
            }
        }

        $events = $eventsQuery
            ->orderBy('event_date', 'asc') // upcoming events first
            ->paginate(6)
            ->through(fn (Event $event) => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'thumbnail_url' => $event->thumbnail_url,
                'excerpt' => Str::limit(strip_tags($event->content), 180),
                'event_date' => optional($event->event_date)->translatedFormat('d M Y H:i'),
                'event_year' => optional($event->event_date)?->format('Y') ?? 'Tidak diketahui',
                'location' => $event->location,
                'registration_link' => $event->registration_link,
            ])
            ->withQueryString();

        $yearSections = collect($events->items())
            ->groupBy(fn (array $event) => $event['event_year'] ?? 'Tidak diketahui')
            ->sortKeysUsing(function (string $a, string $b) {
                $aValue = is_numeric($a) ? (int) $a : PHP_INT_MIN;
                $bValue = is_numeric($b) ? (int) $b : PHP_INT_MIN;

                return $bValue <=> $aValue;
            })
            ->map(fn ($items, $year) => [
                'year' => $year,
                'events' => array_values($items->all()),
            ])
            ->values();

        $archives = Event::query()
            ->get()
            ->groupBy(fn (Event $event) => optional($event->event_date)?->format('Y') ?? 'Tidak diketahui')
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

        return Inertia::render('events/index', [
            'events' => $events,
            'yearSections' => $yearSections->all(),
            'archives' => $archives->all(),
            'activeYear' => $activeYear,
        ]);
    }

    public function show(Event $event): Response
    {
        return Inertia::render('events/show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'slug' => $event->slug,
                'thumbnail_url' => $event->thumbnail_url,
                'content' => $event->content,
                'event_date' => optional($event->event_date)->translatedFormat('d M Y H:i'),
                'location' => $event->location,
                'registration_link' => $event->registration_link,
            ],
        ]);
    }
}
