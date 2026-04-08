<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoEmpresaCliente extends Model
{
     protected $table = 'infoEmpresaClientes';

    protected $fillable = [
        'id_cliente',
        'nombre_empresa',
        'nif_empresa',
    ];

    public $timestamps = true;

    /**
     * Relación inversa al cliente
     */
    public function cliente()
    {
        // id_cliente en infoEmpresaClientes apunta a id en clientes
        return $this->belongsTo(\App\Models\Cliente::class, 'id_cliente', 'id');
    }
     /**
     * Relación 1:N con direcciones de la empresa
     */
    public function direcciones()
    {
        return $this->hasMany(\App\Models\Direccion::class, 'id_empresa', 'id');
    }

}
