<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatosNegocio extends Model
{
     // Nombre de la tabla (opcional si sigue la convención plural)
    protected $table = 'datos_negocios';

    // Los campos que se pueden asignar masivamente
    protected $fillable = [
        // Información básica del negocio
        'nombre',
        'slug',
        'descripcion',
        'telefono',
        'email',
        'direccion_completa',
        'ciudad',
        'provincia',
        'codigo_postal',
        'pais',
        'latitud',
        'longitud',
        'sitio_web',
        'imagen_logo',

        // Redes sociales
        'facebook',
        'instagram',
        'whatsapp',

        // Fiscalidad en España
        'razon_social',
        'nif',
        'iban',
        'banco',
        'moneda',

        // Estado
        'activo',
    ];

    // Cast de campos a tipo específico (opcional pero recomendado)
    protected $casts = [
        'latitud' => 'float',
        'longitud' => 'float',
        'activo' => 'boolean',
    ];
}
