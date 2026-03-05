<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoriageneral extends Model
{
    use HasFactory;
    // Especificar el nombre exacto de la tabla
    protected $table = 'categoriasgenerales';

    // Laravel manejará los timestamps
    public $timestamps = true;

    // Nombres personalizados para los campos de timestamps
    const CREATED_AT = 'fecha_creacion';
    const UPDATED_AT = 'fecha_modificacion';

    // Opcional: define los campos que se pueden asignar masivamente
    protected $fillable = ['nombre','slug', 'imagen', 'backgroundImage', 'frase'];

    public function categoriasServicios()
    {
        return $this->hasMany(CategoriaServicio::class, 'categoria_general_id');
    }
}
