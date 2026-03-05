<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\ReservaAuditable;

class Reserva extends Model
{
    use HasFactory;
    use SoftDeletes;
    use ReservaAuditable;

    protected $table = 'reservas';

    protected $fillable = [
        'user_id', 'service_id', 'date_time', 'status', 'cliente_confirmo_modificacion', 'duration', 'empleada_id', 'nota', 'status_payment', 'total_payment', 'comprobada', 'empleado_seleccionado', 'nota_interna', 'mensaje_cliente', 'multiple', 'modificacion_confirmarda_por', 'deleted_at'
    ];
    //modificacion_confirmada_por por defauls cliente,
    protected $primaryKey = 'id';

    protected $casts = [
        'cambios' => 'array',
        'total_payment' => 'decimal:2',
    ];
    public $timestamps = true;

    // Relación muchos a uno con 'ReservaServicio'
    public function reservaServicio()
    {
        return $this->belongsTo(ReservaServicio::class, 'multiple');  // 'multiple' es la clave foránea
    }

    public function empleada(){
        return $this->belongsTo(Empleada::class, 'empleada_id');
    }

    public function servicio(){
        return $this->belongsTo(Servicio::class, 'service_id');
    }


    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    // Relación inversa con el modelo InfoAdicionalCliente
    public function infoAdicionalCliente(){
        return $this->belongsTo(InfoAdicionalCliente::class, 'user_id', 'id_cliente');
    }
    public function cancelaciones(){
        return $this->hasMany(Cancelacion::class);
    }
    public function inasistencias(){
        return $this->hasMany(Inasistencia::class, 'id_reserva');
    }
    public function payments(){
        return $this->hasMany(Payment::class, 'reserva_id', 'id');
    }
}
