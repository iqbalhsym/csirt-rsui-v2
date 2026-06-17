<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Mail\IncidentReportMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class IncidentController extends Controller
{
    /**
     * Get client IP address for display.
     */
    public function captcha(Request $request)
    {
        $ip = $request->ip();
        if ($ip === '::1') {
            $ip = '127.0.0.1';
        }

        return response()->json([
            'success' => true,
            'ip' => $ip,
        ]);
    }

    /**
     * Store a new incident report.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reporter_name' => 'required|string|max:255',
            'reporter_email' => 'required|email|max:255',
            'incident_type' => [
                'required',
                'string',
                Rule::in(['phishing', 'malware', 'ransomware', 'ddos', 'unauthorized_access', 'web_defacement', 'data_leak', 'vulnerability', 'others'])
            ],
            'vulnerability_level' => [
                'required',
                'string',
                Rule::in(['low', 'medium', 'high', 'critical'])
            ],
            'incident_date' => 'required|date',
            'description' => 'required|string|max:5000',
            'attachment' => 'nullable|file|max:2048|mimes:jpg,jpeg,png,pdf,docx,zip',
            'recaptcha_token' => 'required|string',
        ]);

        // Validate Google reCAPTCHA Token
        $response = \Illuminate\Support\Facades\Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => env('RECAPTCHA_SECRET_KEY', '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'),
            'response' => $validated['recaptcha_token'],
            'remoteip' => $request->ip(),
        ]);

        $recaptchaResult = $response->json();

        if (empty($recaptchaResult['success']) || !$recaptchaResult['success']) {
            return response()->json([
                'message' => 'Laporan insiden gagal dikirim.',
                'errors' => [
                    'recaptcha_token' => ['Verifikasi reCAPTCHA gagal. Silakan centang kembali captcha Anda.']
                ]
            ], 422);
        }

        $ip = $request->ip();
        if ($ip === '::1') {
            $ip = '127.0.0.1';
        }

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('incidents', 'public');
        }

        $incident = Incident::create([
            'reporter_name' => $validated['reporter_name'],
            'reporter_email' => $validated['reporter_email'],
            'incident_type' => $validated['incident_type'],
            'vulnerability_level' => $validated['vulnerability_level'],
            'incident_date' => $validated['incident_date'],
            'description' => $validated['description'],
            'status' => 'pending',
            'attachment_path' => $attachmentPath,
            'ip_address' => $ip,
        ]);

        // Send email via SMTP using Laravel Mail
        try {
            Mail::to(env('INCIDENT_REPORT_RECIPIENT', 'admin-csirt@mail.com'))
                ->send(new IncidentReportMail($incident));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Gagal mengirim email insiden: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'ticket_number' => $incident->ticket_number,
            'message' => 'Laporan insiden berhasil dikirim. Catat nomor tiket Anda untuk melacak status.',
        ], 201);
    }

    /**
     * Track an incident report's status.
     */
    public function track(Request $request)
    {
        $request->validate([
            'ticket_number' => 'required|string|max:50',
        ]);

        $incident = Incident::where('ticket_number', trim($request->query('ticket_number')))->first();

        if (!$incident) {
            return response()->json([
                'success' => false,
                'message' => 'Nomor tiket tidak ditemukan dalam database.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'ticket_number' => $incident->ticket_number,
            'reporter_name' => $incident->reporter_name,
            'incident_type' => $incident->incident_type,
            'status' => $incident->status,
            'created_at' => $incident->created_at->translatedFormat('d M Y H:i'),
            'updated_at' => $incident->updated_at->translatedFormat('d M Y H:i'),
        ]);
    }

    /**
     * Real-time monitoring data.
     */
    public function monitoring(Request $request)
    {
        $ip = $request->ip();
        if ($ip === '::1') {
            $ip = '127.0.0.1';
        }

        $agent = $request->header('User-Agent');
        
        $browser = 'Unknown Browser';
        if (str_contains($agent, 'Firefox')) $browser = 'Firefox';
        elseif (str_contains($agent, 'Chrome')) $browser = 'Chrome';
        elseif (str_contains($agent, 'Safari') && !str_contains($agent, 'Chrome')) $browser = 'Safari';
        elseif (str_contains($agent, 'Edge')) $browser = 'Edge';
        
        $os = 'Unknown OS';
        if (str_contains($agent, 'Windows')) $os = 'Windows';
        elseif (str_contains($agent, 'Macintosh')) $os = 'macOS';
        elseif (str_contains($agent, 'Linux')) $os = 'Linux';
        elseif (str_contains($agent, 'Android')) $os = 'Android';
        elseif (str_contains($agent, 'iPhone')) $os = 'iOS';
        $isInternal = false;
        foreach (['10.121', '1.152', '1.118', '152.118'] as $prefix) {
            if (str_starts_with($ip, $prefix)) {
                $isInternal = true;
                break;
            }
        }

        $visits = Cache::get('recent_visits', []);
        
        // Filter out any internal IPs from cached list (in case they got in earlier)
        $visits = array_filter($visits, function ($v) {
            foreach (['10.121', '1.152', '1.118', '152.118'] as $prefix) {
                if (str_starts_with($v['ip'], $prefix)) {
                    return false;
                }
            }
            return true;
        });
        $visits = array_values($visits);

        $newVisit = [
            'ip' => $ip,
            'browser' => $browser,
            'os' => $os,
            'time' => now()->format('H:i:s'),
        ];

        if (!$isInternal) {
            // Only add if last logged visitor IP is not the same (prevents spam reload self-logging)
            if (empty($visits) || $visits[0]['ip'] !== $ip || $visits[0]['time'] !== $newVisit['time']) {
                // Remove previous identical IP if it exists to keep list unique and fresh
                $visits = array_filter($visits, fn($v) => $v['ip'] !== $ip);
                array_unshift($visits, $newVisit);
                $visits = array_slice($visits, 0, 5);
                Cache::put('recent_visits', $visits, 600);
            }
        }

        return response()->json([
            'success' => true,
            'current_user' => [
                'ip' => $ip,
                'browser' => $browser,
                'os' => $os,
                'time' => now()->format('d M Y H:i:s'),
            ],
            'recent_visits' => array_values($visits),
            'stats' => [
                'incident_count' => Incident::count(),
                'cpu_load' => rand(2, 7) . '%',
                'memory_usage' => round(memory_get_usage(true) / 1024 / 1024, 1) . ' MB',
                'active_sessions' => count($visits) + rand(1, 3),
            ]
        ]);
    }
}
