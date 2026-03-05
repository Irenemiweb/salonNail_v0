<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Servicio;
use App\Models\Recibo;
use App\Models\VentaRapida;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class DetalleVentaRapida extends Model
{
    use HasFactory;
     protected $table = 'detalles_ventas_rapidas';

    protected $fillable = [
        'id_ventaRapida',
        'id_servicio',
        'cantidad',
        'id_recibo',
        'descuento_porcentaje',
        'descuento_importe',
        'atiende_empleada_id'
    ];

    // RELACIONES

    public function ventaRapida(): BelongsTo
    {
        return $this->belongsTo(VentaRapida::class, 'id_ventaRapida');
    }

    public function servicio(): BelongsTo
    {
        return $this->belongsTo(Servicio::class, 'id_servicio');
    }

    public function recibo(): BelongsTo
    {
        return $this->belongsTo(Recibo::class, 'id_recibo');
    }
     // Define la relación con el modelo Empleado
    public function empleado()
    {
        return $this->belongsTo(Empleada::class, 'atiende_empleada_id');
    }
}
