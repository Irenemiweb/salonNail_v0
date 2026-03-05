<?php

namespace App\View\Components\PanelAdminAdministrator\Ventas;

use Illuminate\View\Component;
use App\Models\Payment;
use Carbon\Carbon;

class VentasTransacciones extends Component
{
  public $pagosAgrupados;

    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        // Obtener todos los payments ordenados del más actual al más antiguo
       $this->pagosAgrupados = Payment::orderBy('fecha', 'desc')
        ->get()
        ->groupBy(function ($pago) {
            return Carbon::parse($pago->fecha)->format('d-m-Y');
        });
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render()
    {
        return view('components.panel-admin-administrator.ventas.ventas-transacciones', [
            'pagosAgrupados' => $this->pagosAgrupados
        ]);
    }
}
