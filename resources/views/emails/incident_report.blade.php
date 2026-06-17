<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Insiden Baru</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            border-top: 4px solid #dc2626; /* Accent color for critical/incident reports */
        }
        .header {
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header h2 {
            margin: 0;
            color: #111827;
            font-size: 20px;
        }
        .ticket-no {
            display: inline-block;
            background: #eff6ff;
            color: #2563eb;
            padding: 5px 12px;
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
            margin-top: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        th, td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #eeeeee;
            font-size: 14px;
        }
        th {
            width: 30%;
            color: #6b7280;
            font-weight: 600;
        }
        td {
            color: #1f2937;
        }
        .description-box {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            border-radius: 6px;
            padding: 15px;
            font-size: 14px;
            color: #374151;
            white-space: pre-wrap;
            margin-bottom: 25px;
        }
        .footer {
            border-top: 1px solid #eeeeee;
            padding-top: 15px;
            font-size: 12px;
            color: #9ca3af;
            text-align: center;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h2>Laporan Insiden Keamanan Siber Baru</h2>
        <span class="ticket-no">{{ $incident->ticket_number }}</span>
    </div>

    <table>
        <tr>
            <th>Nama Pelapor</th>
            <td>{{ $incident->reporter_name }}</td>
        </tr>
        <tr>
            <th>Email Pelapor</th>
            <td><a href="mailto:{{ $incident->reporter_email }}">{{ $incident->reporter_email }}</a></td>
        </tr>
        <tr>
            <th>Tipe Insiden</th>
            <td>
                @if ($incident->incident_type === 'phishing')
                    Phishing / Social Engineering
                @elseif ($incident->incident_type === 'malware')
                    Malware Infection
                @elseif ($incident->incident_type === 'ransomware')
                    Ransomware
                @elseif ($incident->incident_type === 'ddos')
                    DDoS Attack
                @elseif ($incident->incident_type === 'unauthorized_access')
                    Unauthorized Access
                @elseif ($incident->incident_type === 'web_defacement')
                    Web Defacement
                @elseif ($incident->incident_type === 'data_leak')
                    Data Leak
                @elseif ($incident->incident_type === 'vulnerability')
                    Kerentanan Keamanan / Vulnerability
                @else
                    {{ ucfirst($incident->incident_type) }}
                @endif
            </td>
        </tr>
        <tr>
            <th>Tingkat Kerentanan</th>
            <td>
                @if ($incident->vulnerability_level === 'low')
                    Rendah (Low)
                @elseif ($incident->vulnerability_level === 'medium')
                    Sedang (Medium)
                @elseif ($incident->vulnerability_level === 'high')
                    Tinggi (High)
                @elseif ($incident->vulnerability_level === 'critical')
                    Kritis (Critical)
                @else
                    {{ ucfirst($incident->vulnerability_level) }}
                @endif
            </td>
        </tr>
        <tr>
            <th>Waktu Kejadian</th>
            <td>{{ $incident->incident_date->format('d M Y H:i') }} WIB</td>
        </tr>
        <tr>
            <th>IP Address Pelapor</th>
            <td>{{ $incident->ip_address ?? 'Tidak terdeteksi' }}</td>
        </tr>
        <tr>
            <th>File Lampiran</th>
            <td>
                @if ($incident->attachment_path)
                    Ada (Terlampir pada email ini)
                @else
                    Tidak Ada
                @endif
            </td>
        </tr>
    </table>

    <div class="header" style="border-bottom: none; margin-bottom: 5px; padding-bottom: 0;">
        <h3 style="margin: 0; font-size: 14px; color: #6b7280; font-weight: 600;">Deskripsi Kejadian / Kronologi:</h3>
    </div>
    <div class="description-box">
        {{ $incident->description }}
    </div>

    <div class="footer">
        Email ini dikirim otomatis oleh Sistem Sentinel CSIRT RSUI.<br>
        Silakan lakukan investigasi lebih lanjut berdasarkan informasi di atas.
    </div>
</div>

</body>
</html>
