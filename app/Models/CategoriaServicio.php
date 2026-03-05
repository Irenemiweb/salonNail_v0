<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Servicio;

class CategoriaServicio extends Model
{
    use HasFactory;

    protected $table = 'categoriaservicios';

    protected $fillable = [
        'categoria', 'activo', 'imagen', 'categoria_general_id'
    ];

    protected $primaryKey = 'id';

    public $timestamps = true;
    //  public function servicios()
    // {
    //     return $this->hasMany(Servicio::class);
    // }
      public function categoriaGeneral()
    {
        return $this->belongsTo(Categoriageneral::class, 'categoria_general_id');
    }
     public function servicios()
    {
        return $this->hasMany(Servicio::class, 'categoria_servicio_id');
    }
}
