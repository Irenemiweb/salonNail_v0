<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CategoriaServicio;
use App\Models\ReciboServicioVendido;

class Servicio extends Model
{
    use HasFactory;

    protected $table = 'servicios';
//activo quiere decir que no está eliminado
    protected $fillable = [
        'nombre', 'descripcion', 'categoria', 'precio', 'borderColor', 'horaNewService', 'minutosNewService', 'tipoPrecioNewService', 'duracion', 'activo', 'categoria_servicio_id', 'service_img', 'pasos', 'info_adicional', 'debes_saber'
    ];

    protected $primaryKey = 'id';

    public $timestamps = true;
    // En el modelo Servicio
public function recibosVendidos()
{
    return $this->hasMany(ReciboServicioVendido::class, 'id_servicio');
}
 public function categoriaServicio()
    {
        return $this->belongsTo(CategoriaServicio::class, 'categoria_servicio_id');
    }
    public function image(){
        return $this->hasOne(ImageNewService::class, 'servicio_id', 'id');
    }
}
