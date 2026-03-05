<?php

namespace App\View\Components\PanelAdminAdministrator\Ventas\Offcanvas;

use Illuminate\View\Component;
use App\Models\User;
use Illuminate\Support\Str;

class OffcanvasElegirTodos extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $clientes;
    public $iniciales;
    public function __construct()
    {
        $this->clientes = User::orderBy('name', 'asc')
            ->orderBy('primer_apellido', 'asc')
            ->get();
        // Crear un array con las iniciales de cada cliente
        $this->iniciales = $this->clientes->map(function ($cliente) {
            return Str::upper(Str::substr($cliente->name, 0, 1))
                . Str::upper(Str::substr($cliente->primer_apellido, 0, 1));
        });
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.panel-admin-administrator.ventas.offcanvas.offcanvas-elegir-todos');
    }
}
