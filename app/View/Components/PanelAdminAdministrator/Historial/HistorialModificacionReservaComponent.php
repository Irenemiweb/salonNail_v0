<?php

namespace App\View\Components\PanelAdminAdministrator\Historial;

use Illuminate\View\Component;
use App\Models\User;

class HistorialModificacionReservaComponent extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $clientes;
    public function __construct()
    {

    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        $this->clientes = User::all();
        return view('components.panel-admin-administrator.historial.historial-modificacion-reserva-component', [
            'clientes' => $this->clientes,
        ]);
    }
}
