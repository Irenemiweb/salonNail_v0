<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Auth\Events\Registered;
use App\Models\Descuento;


class CrearDescuentoUsuario
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
     public function handle(Registered $event)
    {
        Descuento::create([
            'user_id' => $event->user->id,
            'porcentaje' => 'Sin descuento',
            'importe_descuento' => 0.00,
        ]);
    }
}
