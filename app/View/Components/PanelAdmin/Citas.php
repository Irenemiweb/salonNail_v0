<?php

namespace App\View\Components\PanelAdmin;

use Illuminate\Support\Facades\Auth;
use Illuminate\View\Component;
use App\Models\Reserva;
use App\Models\Servicio;
use Carbon\Carbon;

class Citas extends Component
{
    public $citasProximas;
    public $citasTerminadas;
    public $servicios;

   public function __construct()
{
    $userId = Auth::id(); // ID usuario autenticado
    $now = Carbon::now();

    // === Citas próximas ===
    $citasProximas = Reserva::with('servicio')
        ->where('user_id', $userId)
        ->where('date_time', '>=', $now)
        ->orderBy('date_time')
        ->get();

    $citasAgrupadasProximas = $citasProximas->groupBy(function ($item) {
        return $item->multiple ?? 'single_' . $item->id;
    });
    $this->servicios = Servicio::all();
    $this->citasProximas = $citasAgrupadasProximas->map(function ($grupo) {
        $primeraCita = $grupo->first();
        $numeroServicios = $grupo->count();
        $precioTotal = $grupo->sum(fn($cita) => $cita->servicio->precio);

        $primeraCita->numero_servicios = $numeroServicios;
        $primeraCita->precio_total = $precioTotal;

        return $primeraCita;
    })->values();

    // === Citas terminadas ===
    $citasTerminadas = Reserva::with('servicio')
        ->where('user_id', $userId)
        ->where('date_time', '<', $now)
        ->orderByDesc('date_time')
        ->get();

    $citasAgrupadasTerminadas = $citasTerminadas->groupBy(function ($item) {
        return $item->multiple ?? 'single_' . $item->id;
    });

    $this->citasTerminadas = $citasAgrupadasTerminadas->map(function ($grupo) {
        $primeraCita = $grupo->first();
        $numeroServicios = $grupo->count();
        $precioTotal = $grupo->sum(fn($cita) => $cita->servicio->precio);

        $primeraCita->numero_servicios = $numeroServicios;
        $primeraCita->precio_total = $precioTotal;

        return $primeraCita;
    })->values();
}


    public function render()
    {
        return view('components.panel-admin.citas', [
            'citasProximas' => $this->citasProximas,
            'citasTerminadas' => $this->citasTerminadas,
            'servicios' =>$this->servicios
        ]);
    }
}
