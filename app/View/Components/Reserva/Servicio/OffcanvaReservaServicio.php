<?php

namespace App\View\Components\Reserva\Servicio;

use App\Models\ConfiguracionReserva;
use Illuminate\View\Component;
use Carbon\Carbon;
use App\Models\Servicio;
use App\Models\Empleada;
use App\Models\Reserva;

class OffcanvaReservaServicio extends Component
{
    public $fechaActual;
    public $ultimoDiaDel2030;
    public $diasHasta2030;
    public $mesActual;
    public $fechaActual2;
    public $horaInicio2;
    public $horaFin2;
    public $fechaActual3;
    public $anioActual;
    public $allServices;
    public $empleadas;

    public function __construct(){
        $this->empleadas = Empleada::all();
        // $this->allServices = Servicio::all();
        $this->allServices = Servicio::where('activo', 'si')->get();
        $this->horaFin2 = Carbon::createFromTime(20, 0, 1);
        Carbon::setLocale('es');
        $this->horaInicio2 = $this->obtenerHoraRedondeada();
        $this->fechaActual = Carbon::now('Europe/Madrid'); // Fecha actual
        $this->fechaActual2 = Carbon::now('Europe/Madrid'); // Fecha actual
        $this->fechaActual3 = Carbon::now('Europe/Madrid'); // Fecha actual
        $this->anioActual = Carbon::now('Europe/Madrid')->format('Y');

        //consultamos base datos para obtener antelación máxima
        $config = ConfiguracionReserva::first(); // o donde obtienes la config
        $this->ultimoDiaDel2030 = $this->obtenerFechaLimiteDesdeAntelacion($config->antelacion_reserva);
        // $this->ultimoDiaDel2030 = Carbon::create(2026, 12, 31); // 31 de diciembre del 2030
        $this->diasHasta2030 = []; // Inicializar el array

        //Comprobar si la hora actual es 20:00 o más para ajustar la fecha actual
        // if ($this->fechaActual->hour >= 20 && $this->fechaActual->minute === 15) {
        if ($this->fechaActual->hour > 20 || ($this->fechaActual->hour === 20 && $this->fechaActual->minute >= 1)) {
            $this->fechaActual->addDay(); // Pasa al siguiente día
            $this->fechaActual2->addDay();
            $this->fechaActual3->addDay();
        }
        //Si la fecha actual es sábado (6) o domingo (7), avanzar hasta el próximo lunes (1)
        // if ($this->fechaActual->isWeekend()) {
        //     $this->fechaActual2->next(Carbon::MONDAY); // Avanza al próximo lunes
        //     $this->fechaActual3->next(Carbon::MONDAY);
        // }
        //Si la fecha actual es domingo (7), avanzar hasta el próximo lunes (1)
        if ($this->fechaActual->isSunday()) {
            $this->fechaActual2->next(Carbon::MONDAY); // Avanza al próximo lunes
            $this->fechaActual3->next(Carbon::MONDAY);
        }
        // Recorrer desde la fecha actual hasta el 31 de diciembre de 2030
        for ($fecha = $this->fechaActual->copy(); $fecha->lte($this->ultimoDiaDel2030); $fecha->addDay()) {
            $this->diasHasta2030[] = [
                'dia_semana' => $fecha->translatedFormat('D'),  // Nombre del día
                'numero_dia' => $fecha->format('d'),            // Número del día
                'mes_anio'   => $fecha->translatedFormat('F Y'), // Mes y año
                'fecha'      => $fecha->format('Y-m-d'),
                'mes'        => $fecha->translatedFormat('F'),   // Mes en español (ej. "Septiembre")
                'anio'       => $fecha->format('Y'),             // Formato completo de fecha (YYYY-MM-DD)
                // 'disponibilidad_color' => $this->obtenerColorPorDisponibilidad($fecha)
                // 'disponibilidad_color' => 'verde'
            ];
            //  \Log::info($fecha->format('Y-m-d'));
        }
        // foreach ($this->diasHasta2030 as &$dia) {
        //     try {
        //         $carbonFecha = Carbon::createFromFormat('Y-m-d', $dia['fecha']);
        //         $dia['disponibilidad_color'] = $this->obtenerColorPorDisponibilidad($carbonFecha);
        //     } catch (\Exception $e) {
        //         \Log::error("❌ Error al calcular disponibilidad para {$dia['fecha']}: " . $e->getMessage());
        //         $dia['disponibilidad_color'] = 'gris'; // fallback en caso de error
        //     }
        // }
        $this->fechaActual2 = $this->fechaActual2->format('Y-m-d');
        $this->mesActual = $this->fechaActual->translatedFormat('F Y'); // Mes y año actual
    }

    private function obtenerFechaLimiteDesdeAntelacion(string $valorAntelacion): Carbon{
        $now = Carbon::now();

        return match ($valorAntelacion) {
            'máx. con 7 días de antelación' => $now->copy()->addDays(7),
            'máx. con 14 días de antelación' => $now->copy()->addDays(14),
            'máx. con un mes de antelación' => $now->copy()->addMonth(),
            'máx. con 2 meses de antelación' => $now->copy()->addMonths(2),
            'máx. con 3 meses de antelación' => $now->copy()->addMonths(3),
            'máx. con 6 meses de antelación' => $now->copy()->addMonths(6),
            'máx. con 12 meses de antelación' => $now->copy()->addYear(),
            'máx. con 24 meses de antelación' => $now->copy()->addYears(2),
            default => $now->copy()->addMonths(3), // valor por defecto por si no hay coincidencia
        };
    }

    public function calcularPorcentajeDisponibilidad(Carbon $fecha){
        \Log::info('🕓 Calculando disponibilidad para: ' . $fecha->toDateString());

        $bloquesTotales = $fecha->isSaturday() ? 20 : 44; // 15min entre 09:00 y 14:00 o 20:00
        $bloquesDisponibles = 0;

        // Rango de tiempo del día (9:00 a 20:00 o 14:00 los sábados)
        $horaInicioDia = $fecha->copy()->setTime(9, 0);
        $horaFinDia = $fecha->isSaturday()
            ? $fecha->copy()->setTime(14, 0)
            : $fecha->copy()->setTime(20, 0);

        // Reservas activas del día
        $reservasDelDia = Reserva::whereDate('date_time', $fecha->toDateString())
            ->whereIn('status', ['pending', 'confirmed', 'pagada', 'completada'])
            ->get();

        \Log::info('🔍 Total reservas cargadas para ese día: ' . $reservasDelDia->count());

        // Recorremos bloques de 15 min
        for ($i = 0; $i < $bloquesTotales; $i++) {
            $bloqueInicio = $horaInicioDia->copy()->addMinutes($i * 15);
            $bloqueFin = $bloqueInicio->copy()->addMinutes(15);

            // Saltar bloque de comida si no es sábado
            if (!$fecha->isSaturday()) {
                $inicioAlmuerzo = $fecha->copy()->setTime(14, 15);
                $finAlmuerzo = $fecha->copy()->setTime(15, 0);

                if ($bloqueInicio->between($inicioAlmuerzo, $finAlmuerzo)) {
                    continue;
                }
            }

            // Verificar si hay reservas que bloqueen ese bloque de tiempo
            $bloqueado = $reservasDelDia->contains(function ($reserva) use ($bloqueInicio, $bloqueFin) {
                $inicioReserva = Carbon::parse($reserva->date_time);
                $finReserva = $inicioReserva->copy()->addMinutes($reserva->duration);

                return $inicioReserva->lt($bloqueFin) && $finReserva->gt($bloqueInicio);
            });

            if (!$bloqueado) {
                $bloquesDisponibles++;
            }
    }

    $porcentaje = $bloquesTotales > 0
        ? round(($bloquesDisponibles / $bloquesTotales) * 100, 2)
        : 0;

    \Log::info("📊 Porcentaje de disponibilidad: {$porcentaje}%");
    // \Log::info(print_r(debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 10), true));
    return $porcentaje;
}

public function obtenerColorPorDisponibilidad(Carbon $fecha)
{
    $porcentaje = $this->calcularPorcentajeDisponibilidad($fecha);

    if ($porcentaje == 0) {
        $color = 'rojo';
    } elseif ($porcentaje >= 70) {
        $color = 'verde';
    } else {
        $color = 'naranja';
    }

    \Log::info("🎨 Color asignado a {$fecha->toDateString()}: $color ($porcentaje%)");

    return $color;
}


    public function obtenerHoraRedondeada(){
        // Obtener la hora actual en la zona horaria 'Europe/Madrid'
        $horaActual = Carbon::now('Europe/Madrid');

        // Si la fecha actual es sábado (6) o domingo (7), avanzar hasta el próximo lunes (1) y poner la hora a las 9:00
        // if ($horaActual->isWeekend()) {
        if ($horaActual->isSunday()) {
            $horaActual->next(Carbon::MONDAY); // Avanza al próximo lunes
            $horaActual->setTime(9, 0); // Ajusta la hora a las 9:00
        }
        else {
            // Limitar el horario entre 9:00 y 20:00
            if ($horaActual->hour < 9) {
                // Si la hora actual es antes de las 9:00, ajusta a las 9:00
                $horaActual->setTime(9, 0);
            } elseif ($horaActual->hour >= 20 && $horaActual->minute === 15) {
                // Si la hora actual es 20:00 o más, pasa al día siguiente a las 9:00
                $horaActual->addDay()->setTime(9, 0);
            } else {
                // Obtener los minutos actuales
                $minutos = $horaActual->minute;

                // Redondear los minutos al múltiplo más cercano de 15 minutos
                $minutosRedondeados = ceil($minutos / 15) * 15;

                // Si los minutos redondeados son 60, avanzamos la hora en 1 y los minutos a 0
                if ($minutosRedondeados == 60) {
                    $horaActual->addHour();
                    $minutosRedondeados = 0;
                }

                // Establecer los minutos redondeados
                $horaActual->minute = $minutosRedondeados;

                // Si la hora después del redondeo es mayor o igual a las 20:00, pasamos al día siguiente a las 9:00
                if ($horaActual->hour >= 20 && $horaActual->minute === 15) {
                    $horaActual->addDay()->setTime(9, 0);
                }
            }
        }

        // Poner los segundos a cero para un redondeo exacto
        $horaActual->second = 0;

        // Formatear la hora redondeada a 'H:i' y devolverla
        return $horaActual->format('H:i');
    }





    public function render(){
        return view('components.reserva.servicio.offcanva-reserva-servicio', [
            'diasHasta2030' => $this->diasHasta2030, // Pasas el array normalmente
            'mesActual' => $this->mesActual,
            'fechaActual' => $this->fechaActual->format('Y-m-d'), // Pasar la fecha actual a la vista
            // 'horasDisponibles' => json_encode($this->horasDisponibles), // Codificas horasDisponibles en JSON
            'fechaActual2' => $this->fechaActual2,
            'fechaActual3' => $this->fechaActual3,
            'horaInicio2' => $this->horaInicio2,
            'horaFin' => $this->horaFin2->format('H:i'),
            'anioActual' =>$this->anioActual,
            'allServices' => $this->allServices,
            'empleadas' => $this->empleadas,
        ]);
    }
}
