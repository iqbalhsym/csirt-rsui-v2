<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@mail.com'],
            [
                'name' => 'Test User',
                'password' => 'qwer1234',
                'email_verified_at' => now(),
            ]
        );

        // Seed some sample events
        $events = [
            [
                'title' => 'Webinar Nasional: Mengamankan Infrastruktur IT Rumah Sakit dari Ancaman Ransomware',
                'slug' => 'webinar-mengamankan-infrastruktur-it-rs',
                'content' => '<p>Webinar ini membahas strategi praktis mitigasi ransomware pada rumah sakit dan sistem rekam medis elektronik.</p>',
                'event_date' => now()->addDays(5)->setHour(9)->setMinute(0),
                'location' => 'Zoom Meeting & YouTube Live',
                'registration_link' => 'https://rs.ui.ac.id/webinar-security',
            ],
            [
                'title' => 'Cyber Security Awareness & Phishing Simulation Camp',
                'slug' => 'cyber-security-awareness-phishing-simulation',
                'content' => '<p>Pelatihan simulasi serangan phishing untuk mendeteksi rekayasa sosial bagi seluruh staf medis dan non-medis RSUI.</p>',
                'event_date' => now()->addDays(12)->setHour(13)->setMinute(30),
                'location' => 'Gd. B Lantai 5, RSUI Depok',
                'registration_link' => 'https://rs.ui.ac.id/security-camp',
            ],
            [
                'title' => 'Audit & Vulnerability Assessment Internal Infrastruktur Medis',
                'slug' => 'audit-vulnerability-assessment-internal',
                'content' => '<p>Audit internal berkala yang melibatkan tim NetSecOps untuk memeriksa celah keamanan server database pasien.</p>',
                'event_date' => now()->addDays(20)->setHour(8)->setMinute(0),
                'location' => 'Data Center RSUI',
                'registration_link' => null,
            ],
        ];

        foreach ($events as $event) {
            \App\Models\Event::firstOrCreate(
                ['slug' => $event['slug']],
                $event
            );
        }
    }
}
