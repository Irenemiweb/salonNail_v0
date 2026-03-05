<?php

namespace App\View\Components\PanelAdminAdministrator\Ventas;

use Illuminate\View\Component;
use App\Models\Empleada;
use App\Models\Payment;
use Carbon\Carbon;

class Ventas extends Component
{
    public $empleados;
    public $pagosAgrupados;

    public function __construct()
    {
        $this->empleados = Empleada::all();
         // Obtener todos los payments ordenados del más actual al más antiguo
       $this->pagosAgrupados = Payment::orderBy('fecha', 'desc')
        ->get()
        ->groupBy(function ($pago) {
            return Carbon::parse($pago->fecha)->format('d-m-Y');
        });
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.panel-admin-administrator.ventas.ventas');
    }
}
