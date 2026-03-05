<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Payment extends Model
{
    use HasFactory;
     // Nombre de la tabla en la base de datos
     protected $table = 'payments';

     // Definir los campos que se pueden asignar de manera masiva (Mass Assignment)
     protected $fillable = [
         'total',
         'metodo_pago',
         'fecha',
         'recibo_id'
     ];

     // Relación con la tabla de recibos (Un recibo puede tener diferentes métodos de pagos) payments_ibfk_1
     public function recibo()
     {
         return $this->belongsTo(Recibo::class, 'recibo_id', 'id');
     }
      public function getFechaFormateadaAttribute()
    {
        return Carbon::parse($this->fecha)->format('d-m-Y');
    }
}
//metodo de pago enum alternativas:
// Efectivo
// Terminal de tarjeta física
// Bizum
// American Express
// PayPal
// Pago fraccionado
// Suscripción
// Tarjeta regalo
// Bono de sesiones
