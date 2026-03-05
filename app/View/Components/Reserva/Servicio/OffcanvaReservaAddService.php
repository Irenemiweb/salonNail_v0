<?php

namespace App\View\Components\Reserva\Servicio;

use Illuminate\View\Component;
use App\Models\CategoriaServicio;
use Carbon\Carbon;

class OffcanvaReservaAddService extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $categoriasServicios;
    public $fechaActual2;
    public $anioActual;
    public $mesActual;
    public function __construct()
    {
        $this->categoriasServicios =CategoriaServicio::all();
          Carbon::setLocale('es');
        $this->fechaActual2 = Carbon::now('Europe/Madrid'); // Fecha actual
        $this->anioActual =  $this->fechaActual2->format('Y');
        $this->mesActual =  $this->fechaActual2->translatedFormat('F Y');
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.reserva.servicio.offcanva-reserva-add-service');
    }
}
