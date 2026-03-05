<?php

namespace App\View\Components\Usuario;

use Illuminate\View\Component;

class MenuCitaProxima extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $reserva_por_confirmar;
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.usuario.menu-cita-proxima');
    }
}
