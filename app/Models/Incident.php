<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_number',
        'reporter_name',
        'reporter_email',
        'incident_type',
        'vulnerability_level',
        'incident_date',
        'description',
        'status',
        'attachment_path',
        'ip_address',
    ];

    protected $casts = [
        'incident_date' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($incident) {
            if (empty($incident->ticket_number)) {
                $date = now()->format('Ymd');
                $count = static::whereDate('created_at', now()->toDateString())->count() + 1;
                $incident->ticket_number = sprintf('INC-%s-%04d', $date, $count);
            }
        });
    }
}
