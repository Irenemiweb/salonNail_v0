<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Recibo;
use App\Models\Payment;
use App\Models\ReciboServicioVendido;
use App\Models\DetalleVentaRapida;
use Carbon\Carbon;
use App\Models\Reserva;
use App\Models\Empleada;
use App\Models\Servicio;
use App\Models\User;

class Recibo extends Model
{
    use HasFactory;

    // Especifica la tabla asociada al modelo
    protected $table = 'recibos';
    public $timestamps = false;
    // Especifica las columnas que pueden ser asignadas en masa
    protected $fillable = [
        'numero_recibo',
        'fecha',
        'id_cliente',
        'tipo_impuesto',
        'valor_neto',
        'importe_impuesto',
        'valor_bruto',
        'subtotal',
        'descuento_total',
        'descuento_total_porcentaje',
        'responsable_cobro',
        'multiple',
        'id_reserva',
        'status',
        'motivo_anulacion',
        'fecha_anulacion',

    ];

    // Define la relación con el modelo User
    public function cliente()
    {
        return $this->belongsTo(User::class, 'id_cliente');
    }
    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'id_reserva');
    }
    public function reservaMultiple()
    {
        return $this->belongsTo(ReservaServicio::class, 'id_reserva');
    }
    // En el modelo Recibo
    public function serviciosVendidos()
    {
        return $this->hasMany(ReciboServicioVendido::class, 'id_recibo');
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function detallesVentasRapidas()
    {
        return $this->hasMany(DetalleVentaRapida::class, 'id_recibo');
    }
    // Si deseas que el número de recibo se incremente automáticamente, puedes manejarlo con un método fk_reserva_recibo_id
    public static function boot()
    {
        parent::boot();

        static::creating(function ($recibo) {
            if (!$recibo->numero_recibo) {
                $recibo->numero_recibo = self::max('numero_recibo') + 1;
            }
        });
    }
}
/*
ALTER TABLE recibos
ADD COLUMN id_reserva INT,
ADD CONSTRAINT fk_reserva_recibo_id
  FOREIGN KEY (id_reserva)
  REFERENCES reservas(id);
*/
