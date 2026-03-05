<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MensajeEnviado extends Model
{
      use HasFactory;

    protected $table = 'mensajes_enviados';

    protected $fillable = [
        'id_reserva',
        'id_usuario',
        'tipo_mensaje',
        'contenido',
        'canal',
        'enviado_en',
    ];

    protected $casts = [
        'enviado_en' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // 🔗 Relación con el usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    // 🔗 Relación con la reserva (opcional)
    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'id_reserva');
    }
}
