<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
     protected $table = 'direcciones';

    protected $fillable = [
        'id_cliente',
        'id_empresa',
        'tipo',
        'calle',
        'numero',
        'ciudad',
        'estado',
        'codigo_postal',
        'pais',
    ];

    // Si no quieres timestamps
    public $timestamps = true;

    /**
     * Relación inversa al cliente
     */
    public function cliente()
    {
        // id_cliente en direcciones apunta a id en clientes
        return $this->belongsTo(\App\Models\Cliente::class, 'id_cliente', 'id');
    }
     /**
     * Relación con empresa
     */
    public function empresa()
    {
        return $this->belongsTo(\App\Models\InfoEmpresaCliente::class, 'id_empresa', 'id');
    }
}
