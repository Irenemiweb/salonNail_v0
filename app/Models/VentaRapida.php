<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Empleada;
use App\Models\DetalleVentaRapida;




class VentaRapida extends Model
{
    use HasFactory;
     protected $table = 'ventas_rapidas';

    protected $fillable = [
        'user_id',
        'date_time',
        'created_at',
        'updated_at',
        'total',
    ];

    // RELACIONES

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function empleada(): BelongsTo
    {
        return $this->belongsTo(Empleada::class, 'empleada_id');
    }

    public function detalles(): HasMany
    {
        return $this->hasMany(DetalleVentaRapida::class, 'id_ventaRapida');
    }
}
