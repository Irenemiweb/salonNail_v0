<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Reserva;
use App\Models\ReservaServicio;


class ReservaHistorial extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'reserva_historial';

    protected $fillable = [
        'operation_uuid',
        'booking_group_id',
        'reserva_id',
        'reserva_servicio_id',
        'accion',
        'cambios',
        'total_pagar',
        'ids_reservas',
        'responsable_tipo',
        'responsable_id',
        'ip',
        'user_agent',
        'alls_booking_group_id',
        'ids_reservas_activas'
    ];

    protected $casts = [
        'cambios' => 'array',
        'ids_reservas' => 'array',
        'alls_booking_group_id' => 'array',
        'ids_reservas_activas' => 'array'
    ];

    // ================= Relaciones =================

    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'reserva_id');
    }

    public function reservaServicio()
    {
        return $this->belongsTo(ReservaServicio::class, 'reserva_servicio_id');
    }

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }
}
