<?php

namespace App\Http\Controllers;
// use App\View\Components\Reserva\Servicio\OffcanvaReservaServicio;  // Importa la clase

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Reserva;
use App\Models\Empleada;
use App\Models\Servicio;
use App\Models\User;
use App\View\Components\Reserva\Servicio\ContinueReserv;
use App\Events\NewReserv;
use App\Models\Cancelacion;
use App\Models\Inasistencia;
use App\Models\ConfiguracionReserva;
use App\Models\ReservaServicio;
use App\Models\Recibo;
use App\Models\Payment;
use App\Models\ReciboServicioVendido;
use App\Models\DetalleVentaRapida;
use App\Mail\ReservaConfirmadaMail;
use App\Mail\ModificacionReservaMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\MensajeEnviado;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\ReservaHistorial;


class ReservaServicioController extends Controller
{

    //CONFIRMAR MODIFICACION
    public function confirmarModificacion($id, Request $request){
        $reserva = Reserva::findOrFail($id);

        // Si la reserva tiene un grupo (campo multiple)
        if (!is_null($reserva->multiple)) {

            // Obtener todas las reservas del mismo grupo
            $reservasGrupo = Reserva::where('multiple', $reserva->multiple)->get();

            foreach ($reservasGrupo as $r) {
                $r->cliente_confirmo_modificacion = 'confirmado';
                $r->save();
            }

        } else {

            // Si no pertenece a un grupo, solo la individual
            $reserva->cliente_confirmo_modificacion = 'confirmado';
            $reserva->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'La modificación fue confirmada correctamente.'
        ]);
    }

    //CANCELAR MODIFICACION
    public function cancelarModificacion($id, Request $request){
        $reserva = Reserva::findOrFail($id);

        // Variable donde guardaremos lo que se devolverá en el response
        $reservasActualizadas = [];

        // Si la reserva tiene un grupo (campo multiple)
        if (!is_null($reserva->multiple)) {

            // Obtener todas las reservas del mismo grupo
            $reservasGrupo = Reserva::where('multiple', $reserva->multiple)->get();

            foreach ($reservasGrupo as $r) {
                $r->cliente_confirmo_modificacion = 'confirmado';
                $r->status = 'cancelled';
                $r->save();
                $reservasActualizadas[] = $r; // agregamos cada reserva actualizada
            }

        } else {
            // Si no pertenece a un grupo, solo la individual
            $reserva->cliente_confirmo_modificacion = 'confirmado';
            $reserva->status = 'cancelled';
            $reserva->save();

            $reservasActualizadas[] = $reserva;
        }

        return response()->json([
            'success' => true,
            'message' => 'La modificación fue cancelada correctamente.',
            'reservas' => $reservasActualizadas
        ]);
    }

    public function obtenerReservasById($id, Request $request)
{
    // Cargar reserva con todas las relaciones necesarias
    $reserva = Reserva::with(['servicio', 'empleada', 'user'])->findOrFail($id);

    $reservas = [];

    // Si la reserva pertenece a un grupo (campo multiple)
    if (!is_null($reserva->multiple)) {

        // Cargar todas las reservas del grupo + relaciones
        $reservasGrupo = Reserva::with(['servicio', 'empleada', 'user'])
                                ->where('multiple', $reserva->multiple)
                                ->get();

        foreach ($reservasGrupo as $r) {
            $reservas[] = $r;
        }

    } else {
        // Reserva individual
        $reservas[] = $reserva;
    }

    return response()->json([
        'success' => true,
        'reservas' => $reservas
    ]);
}





    public function obtenerHoraRedondeada2(){
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

    function formatearDuracion($minutos){
        $horas = floor($minutos / 60);
        $restoMinutos = $minutos % 60;

        $texto = '';
        if ($horas > 0) {
            $texto .= $horas . ' h';
        }
        if ($restoMinutos > 0) {
            $texto .= ($horas > 0 ? ' ' : '') . $restoMinutos . ' min';
        }

        return $texto;
    }

    // para obtener la fecha en el formato deseado Miércoles, 26 de noviembre, 13:50 - 14:00
    private function obtenerDuracionEnMinutos($duracion){
        $totalMinutos = 0;

        // "1h 10min" → horas + minutos
        if (preg_match('/(\d+)h/', $duracion, $match)) {
            $totalMinutos += intval($match[1]) * 60;
        }

        // "10 min" o "1h 10min" → minutos
        if (preg_match('/(\d+)\s*min/', $duracion, $match)) {
            $totalMinutos += intval($match[1]);
        }

        return $totalMinutos;
}


    //info reserva usuario
public function detalle($id){
    $reserva = Reserva::with('servicio')->findOrFail($id);
    $esMultiple=false;
    if ($reserva->multiple) {
        $esMultiple=true;
        // Es una reserva múltiple: buscar todas las reservas que comparten el mismo ID de grupo
        $reservas = Reserva::with('servicio')
            ->where('multiple', $reserva->multiple)
            ->get();

        // Buscar el grupo de reserva (reserva_servicios)
        $grupo = ReservaServicio::findOrFail($reserva->multiple);

        // Usar el total desde reservas_servicios
        $totalConIVA = floatval($grupo->total_payment);
    } else {
        $esMultiple=false;
        // Solo una reserva
        $reservas = collect([$reserva]);
        $totalConIVA = floatval($reserva->servicio->precio);
    }

    // Calcular subtotal e impuestos
    $subtotal = $totalConIVA / 1.21; // calcular base imponible
    $impuestos = $totalConIVA - $subtotal;

    // Preparar lista de servicios
    $servicios = [];
    foreach ($reservas as $r) {
        $duracionFormateada = $this->formatearDuracion($r->duration);
        $nombreProfesional = $r->empleada->nombre ?? 'Profesional';

        $servicios[] = [
            'nombre' => $r->servicio->nombre,
            'duracion' => $duracionFormateada ,
            'profesional' => $nombreProfesional,
            'precio' => number_format($r->servicio->precio, 2, ',', '')
        ];
    }

    // OBTENER FECHA FORMATO DESEADO
    $inicio = Carbon::parse($reservas->first()->date_time);

    // Obtener duración total sumada de todos los servicios de la reserva (si son múltiples)
    $duracionTotalMin = 0;
    foreach ($reservas as $r) {
       $duracionTotalMin += intval($r->duration);
    }

    // Fecha de fin
    $fin = $inicio->copy()->addMinutes($duracionTotalMin);

    // Fecha en formato español
    $fechaTexto = $inicio->translatedFormat('l, d \d\e F'); // Ej: "miércoles, 26 de noviembre"

    // Hora inicio y fin
    $horaInicio = $inicio->format('H:i');
    $horaFin = $fin->format('H:i');

    // Formato final solicitado
    $fechaCompleta = ucfirst($fechaTexto) . ", $horaInicio - $horaFin";
    //FIN OBTENER FECHA FORMATO DESEADO


    $fecha = Carbon::parse($reservas->first()->date_time);
    $confirmar_modificacion = $reservas->first()->cliente_confirmo_modificacion;
    $reserva_finalizada = $reservas->first()->status;
    return response()->json([
        'servicios' => $servicios,
        'confirmar_modificacion' => $confirmar_modificacion,
        'reserva_finalizada' => $reserva_finalizada,
        'fecha' => $fecha->format('d/m/Y'),
        'hora' => $fecha->format('H:i'),
        'fechaISO' => $fecha->format('Ymd\THis'),
        'fechaFinISO' => $fecha->copy()->addHour()->format('Ymd\THis'),
        'status' => $reserva->status,
        'impuestos' => number_format($impuestos, 2, ',', ''),
        'total' => number_format($totalConIVA, 2, ',', ''),
        'urlMapa' => 'https://maps.google.com/?q=Tu+Establecimiento',
        'infoEstablecimiento' => 'Dirección: Calle Falsa 123, Teléfono: 123456789',
        'fechaCompleta' => $fechaCompleta,
        'multiple' => $reserva->multiple
    ]);
}
//formatea duración del campo duration bd


    // public function confirmarReserva(Request $request){
    //     $id_reserva = $request->input('id_reserva');
    //     $reserva = Reserva::find($id_reserva);
    //     $confirmada = false;
    //     $pendingCount3 = 0;
    //     if ($reserva) {

    //         $reserva->status = 'confirmed';
    //         $reserva->save();
    //         $confirmada = true;
    //         $pendingCount3 = Reserva::where('status', 'pending')->count();
    //         if ($pendingCount3 >= 0) {
    //             broadcast(new NewReserv($reserva, $pendingCount3));
    //         }
    //         return response()->json([
    //             'confirmada' => $confirmada,
    //             'pendingCount' => $pendingCount3
    //         ]);

    //         // return response()->json(['success' => true]);
    //     }
    //     return response()->json([
    //         'confirmada' => $confirmada,
    //         'pendingCount' => $pendingCount3
    //     ]);
    // }
    public function confirmarReserva(Request $request){
        $id_reserva = $request->input('id_reserva');
        $reserva = Reserva::find($id_reserva);

        $confirmada = false;
        $pendingCount3 = 0;

        if ($reserva) {

            // Si es reserva múltiple → obtener TODAS
            if ($reserva->multiple !== null) {
                $reservasMultiples = Reserva::where('multiple', $reserva->multiple)->get();
            } else {
                $reservasMultiples = collect([$reserva]);
            }

            // Confirmar todas
            foreach ($reservasMultiples as $r) {
                $r->status = 'confirmed';
                $r->save();
            }

            // Marcar confirmado
            $confirmada = true;

            // Contador actualizado
            $pendingCount3 = Reserva::where('status', 'pending')->count();

            // Notificación
            if ($pendingCount3 >= 0) {
                broadcast(new NewReserv($reserva, $pendingCount3));
            }

            return response()->json([
                'confirmada' => $confirmada,
                'pendingCount' => $pendingCount3
            ]);
        }

        return response()->json([
            'confirmada' => $confirmada,
            'pendingCount' => $pendingCount3
        ]);
    }


    public function guardarInasistencia(Request $request){
        $creada = false;
        $id_reserva = $request->input('id_reserva');

        $reserva = Reserva::find($id_reserva);

        if (!$reserva) {
            return response()->json([
                'creada' => false,
                'error' => 'Reserva no encontrada.'
            ], 404);
        }

        // Si es múltiple, obtener TODAS las reservas del grupo
        if ($reserva->multiple !== null) {
            $reservasMultiples = Reserva::where('multiple', $reserva->multiple)->get();
        } else {
            // Reserva simple
            $reservasMultiples = collect([$reserva]);
        }

        // Marcar las reservas como inasistencia (si tienes status)
        foreach ($reservasMultiples as $r) {
            $r->status = 'no_asistida'; // si usas este estado
            $r->save();
        }

        // Registrar la inasistencia en la tabla inasistencias
        $inasistencia = new Inasistencia();
        $inasistencia->id_user = $reserva->user_id;

        // Si es múltiple guardamos el ID del grupo
        $inasistencia->id_reserva = $reserva->multiple ?? $reserva->id;

        $inasistencia->fecha = $reserva->date_time;
        $inasistencia->save();

        $creada = true;

        return response()->json([
            'creada' => $creada
        ]);
    }


    public function saveConfigReserv(Request $request){
        $guardada = false;
        $configuracion = ConfiguracionReserva::first();
        // Usamos el método update() para modificar los atributos del modelo
        if($configuracion){
            $configuracion->update($request->all());
            $guardada = true;
            return response()->json([
                'guardada' => $guardada,
                'configuracion' => $configuracion
            ]);
        }else{
            $guardada = false;
            return response()->json([
                'guardada' => $guardada
            ]);
        }
    }

    public function cancelledReservaMultiple(Request $request){
        // dd($request->all());
       // Obtener los IDs de las reservas desde la solicitud
        $reservasIds = $request->input('reservasIds');

        // Obtener las reservas por los IDs
        $reservas = Reserva::whereIn('id', $reservasIds)->get();

        // Verificar si hay reservas que cancelar
        if ($reservas->isEmpty()) {
            return response()->json(['canceladas' => false, 'message' => 'No se encontraron reservas']);
        }

        // Procesar cada reserva y realizar la cancelación
        foreach ($reservas as $reserva) {

            // Lógica para cancelar la reserva
            // Ejemplo: $reserva->cancelar(); o cualquier lógica de cancelación que tengas
            $reserva->status = 'cancelled'; // Ejemplo de actualización del estado
            $reserva->save();
        }

        // Retornar respuesta indicando éxito
        return response()->json(['canceladas' => true]);
    }

 public function cancelledReserva(Request $request)
{
    $id_reserva = $request->input('id_reserva');
    $reserva = Reserva::find($id_reserva);

    $cancelada = false;
    $pendingCount3 = 0;

    if ($reserva) {

        // Si es una reserva múltiple, obtenemos TODAS las reservas del grupo
        if ($reserva->multiple !== null) {
            $reservasMultiples = Reserva::where('multiple', $reserva->multiple)->get();
        } else {
            // Reserva simple
            $reservasMultiples = collect([$reserva]);
        }

        // Cambiar el estado de TODAS a cancelled
        foreach ($reservasMultiples as $r) {
            $r->status = 'cancelled';
            $r->save();
        }

        // Registrar la cancelación (una sola entrada si es múltiple)
        $user = User::find($request->input('idResponsable'));

        // $tipoUsuario = $user->is_admin == 1 ? 'empleado' : 'cliente';
        $tipoUsuario = match ($user->is_admin) {
            1 => 'admin',
            2 => 'empleado',
            default => 'cliente',
        };

        $cancelacion = new Cancelacion();

        // Si es múltiple guardamos el grupo
        $cancelacion->reserva_id = $reserva->multiple ?? $reserva->id;

        $cancelacion->motivo_cancelacion = $request->input('motivoCancelacion', 'No especificado');
        $cancelacion->cancelado_por = $request->input('responsablecancelacion');
        $cancelacion->id_user = $request->input('idResponsable');
        $cancelacion->tipo_usuario = $tipoUsuario;

        $cancelacion->save();

        // Marcar como cancelada
        $cancelada = true;

        // Actualizar contador
        $pendingCount3 = Reserva::where('status', 'pending')
            ->orWhere('status', 'confirmed')
            ->count();

        if ($pendingCount3 >= 0) {
            // Enviar notificación
            broadcast(new NewReserv($reserva, $pendingCount3));
        }

        return response()->json([
            'cancelada' => $cancelada,
            'pendingCount' => $pendingCount3
        ]);
    }

    return response()->json([
        'cancelada' => $cancelada,
        'pendingCount' => $pendingCount3
    ]);
}


    public function anularcancelledReservaMultiple(Request $request){
    //  dd($request->all());
       // Obtener los IDs de las reservas desde la solicitud
        $id_reservas = $request->input('id_reservas');
        $status = $request->input('oldStatus');
        // Obtener las reservas por los IDs
        $reservas = Reserva::whereIn('id', $id_reservas)->get();
        // dd($reservas);
        // Verificar si hay reservas que cancelar
        if ($reservas->isEmpty()) {
            return response()->json(['canceladas' => false, 'message' => 'No se encontraron reservas']);
        }

        // Procesar cada reserva y realizar la cancelación
        foreach ($reservas as $index => $reserva) {
            $oldStatus = $status[$index];
            // Lógica para cancelar la reserva
            // Ejemplo: $reserva->cancelar(); o cualquier lógica de cancelación que tengas
            $reserva->status = $oldStatus; // Ejemplo de actualización del estado
            $reserva->save();
        }

        // Retornar respuesta indicando éxito
        return response()->json(['canceladas' => true]);
        }

    public function anularcancelledReserva(Request $request){
        // dd($request->input('oldStatus'));
        $id_reserva = $request->input('id_reserva');
        $reserva = Reserva::findOrFail($id_reserva);
        $anularCancelacion = false;
        $pendingCount3 = 0;
        if ($reserva) {
            $reserva->status = $request->input('oldStatus');
            $reserva->save();
            $cancelacion = $reserva->cancelaciones()->where('reserva_id', $reserva->id)->first();
            $cancelacion->delete();
            $anularCancelacion = true;

            return response()->json([
                'anulada' => $anularCancelacion,
            ]);
        }
    }

    public function obtenerHoras(Request $request){
        // Obtener la fecha seleccionada y convertirla a un objeto Carbon
        $fechaSeleccionada = Carbon::createFromFormat('Y-m-d', $request->input('fecha'));
        $duracion = $request->input('duracion');  // Duración en minutos (ej. 90 para 1h 30m)

        // Inicializar el array de horas disponibles
        $horasDisponibles = [];
        $minutoRedondeado = 0;

        // Comprobar si la fecha seleccionada es hoy
        if ($fechaSeleccionada->isToday()) {
            $horaActual = Carbon::now('Europe/Madrid');

            // Si la hora actual es 20:00 o más, se pasa al siguiente día y no muestra horas del día actual
            if ($horaActual->hour >= 20) {
                $fechaSeleccionada->addDay(); // Incrementa el día en uno
                $horaInicio = 9; // Empezar desde las 9:00 del día siguiente
            } else {
                // Si es hoy y no ha pasado de las 20:00, empezar desde la hora actual redondeada al próximo múltiplo de 15
                $minutoRedondeado = ceil($horaActual->minute / 15) * 15;
                if ($minutoRedondeado == 60) {
                    $horaActual->addHour();
                    $minutoRedondeado = 0;
                }
                $horaInicio = $horaActual->hour;
            }
        } else {
            // Si no es hoy, empezar desde las 9:00
            $horaInicio = 9;
        }

       // Definir la hora de cierre del negocio según el día de la semana
        $horaCierre = $fechaSeleccionada->isSaturday() ? $fechaSeleccionada->copy()->setTime(14, 15) : $fechaSeleccionada->copy()->setTime(20, 1);

        // Definir la hora de inicio del almuerzo y de fin del almuerzo
        $inicioAlmuerzo = $fechaSeleccionada->copy()->setTime(14, 15);
        $finAlmuerzo = $fechaSeleccionada->copy()->setTime(15, 0);

        // Generar horas disponibles desde la hora de inicio hasta la hora de cierre
        for ($hora = $horaInicio; $hora < $horaCierre->hour; $hora++) {
            for ($minuto = ($hora == $horaInicio ? $minutoRedondeado : 0); $minuto < 60; $minuto += 15) {
                $horaInicioReserva = $fechaSeleccionada->copy()->setTime($hora, $minuto);
                $horaFinReserva = $horaInicioReserva->copy()->addMinutes($duracion); // Fin de la reserva basado en la duración

                // Verificar que la hora de fin no exceda la hora de cierre
                if ($horaFinReserva->greaterThan($horaCierre)) {
                    continue; // Salta a la siguiente iteración si excede la hora de cierre
                }

                // Verificar que la reserva no interfiera con el horario de comida
                if (($horaInicioReserva->lessThan($finAlmuerzo) && $horaFinReserva->greaterThanOrEqualTo($inicioAlmuerzo))) {
                    continue; // Salta si el servicio abarca el horario de comida
                }

                $empleadasDisponibles = Empleada::whereDoesntHave('reservas', function ($query) use ($horaInicioReserva, $horaFinReserva) {
                    $query->where(function ($query) use ($horaInicioReserva, $horaFinReserva) {
                        $query->where('date_time', '<', $horaFinReserva) // Ocupación antes de la hora de fin
                            ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaInicioReserva]); // Ocupación que empieza antes de la hora de inicio
                    })
                    ->where('status', '!=', 'cancelled'); // Añadir condición para que el estado no sea "cancelled"
                })->exists();


                // Si hay al menos una empleada disponible, añadir la franja horaria (solo una vez)
                if ($empleadasDisponibles) {
                    $horasDisponibles[] = $horaInicioReserva->format('H:i');
                }
            }
        }
        // Devuelve las horas disponibles como respuesta JSON
        return response()->json([
            'horasDisponibles' => $horasDisponibles
        ]);
        // return response()->json($horasDisponibles);
    }

    // private function verificarDisponibilidad($empleadoId, $horaReserva, $duracion, $reservaId = null){
    //     // Buscar a la empleada por ID
    //     $empleada = Empleada::find($empleadoId);

    //     // Si no se encuentra la empleada, devolver no disponible
    //     if (!$empleada) {
    //         return false;
    //     }

    //     // Convertir $horaReserva a un objeto Carbon si es una cadena de texto
    //     $horaReserva = Carbon::parse($horaReserva);

    //     // Calcular la hora de fin de la reserva solicitada
    //     $horaFinReserva = $horaReserva->copy()->addMinutes($duracion);

    //     // Verificar si hay reservas que entren en conflicto con la hora solicitada
    //     $query = Reserva::where('empleada_id', $empleada->id)
    //         ->where(function ($query) use ($horaReserva, $horaFinReserva) {
    //             // Buscar reservas que empiecen antes del fin de la reserva solicitada
    //             $query->where('date_time', '<', $horaFinReserva)
    //                 // Y que terminen después del inicio de la reserva solicitada
    //                 ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva]);
    //         });

    //     // Excluir la reserva que estamos modificando (si existe)
    //     if ($reservaId) {
    //         $query->where('id', '!=', $reservaId);
    //     }

    //     // Verificar si existe una reserva en conflicto
    //     $reservaOcupada = $query->exists();

    //     // Si existe una reserva en conflicto, el empleado no está disponible
    //     return !$reservaOcupada; // true si está disponible, false si no lo está
    // }



// private function verificarDisponibilidad($empleadoId, $horaReserva, $duracion, $reservaId = null, $userId = null){
//     Log::info("=== verificarDisponibilidad ===", [
//         'empleadoId' => $empleadoId,
//         'horaReserva' => $horaReserva,
//         'duracion' => $duracion,
//         'reservaId_excluir' => $reservaId,
//         'userId' => $userId
//     ]);

//     $horaReserva = Carbon::parse($horaReserva);
//     $horaFinReserva = $horaReserva->copy()->addMinutes($duracion);

//     Log::info("Rango de reserva", [
//         'inicio' => $horaReserva,
//         'fin' => $horaFinReserva
//     ]);
//     if($reservaId !== null){
//         $reservaMofificar = Reserva::findOrFail($reservaId);
//     }
//     // Caso empleadoId NULL: verificar si el conflicto es por el usuario
//     if (!$empleadoId) {
//         $reservaConflicto = null;
//         $ocupadaPorUser = false;

//         if ($userId !== null) {
//             $reservaConflicto = Reserva::where('user_id', $userId)
//             ->where('date_time', '<', $horaFinReserva)
//             ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva])
//             ->first();


//             $ocupadaPorUser = $reservaConflicto ? true : false;
//         }else{
//             //aqui excluimos la reserva para el cado de la función updateReserva
//             $reservaConflicto = Reserva::where('user_id', $userId)
//                 ->where('date_time', '<', $horaFinReserva)
//                 ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva])
//                 ->when($reservaId, function($q) use ($reservaId){
//                     $q->where('id', '!=', $reservaId);
//                 })
//                 ->first();
//         }
//         Log::info("Ocupada por user", [
//             'ocupada' => $ocupadaPorUser
//         ]);
//          Log::info("Reserva conficto", [
//             'reserva' => $reservaConflicto
//         ]);
//         Log::info("Reserva modificar", [
//             'reserva' => $reservaMofificar
//         ]);
//         return [
//             'disponible' => false,
//             'ocupadaPorUser' => $ocupadaPorUser,
//             'reservaConflicto' => $reservaConflicto
//         ];
//     }

//     $empleada = Empleada::find($empleadoId);

//     if (!$empleada) {
//         Log::warning("Empleada NO encontrada");
//         return [
//             'disponible' => false,
//             'ocupadaPorUser' => false,
//             'reservaConflicto' => null
//         ];
//     }

//     $query = Reserva::where('empleada_id', $empleada->id)
//         ->where(function ($query) use ($horaReserva, $horaFinReserva) {
//             $query->where('date_time', '<', $horaFinReserva)
//                   ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva]);
//         });

//     if ($reservaId) {
//         $query->where('id', '!=', $reservaId);
//         Log::info("Excluyendo reserva ID:", [$reservaId]);
//     }

//     $existe = $query->exists();
//     Log::info("Resultado exists(): " . ($existe ? 'true' : 'false'));

//     $reservaConflicto = $query->first();
//     Log::info("Resultado first(): ", [$reservaConflicto]);

//     if (!$existe) {
//         return [
//             'disponible' => true,
//             'ocupadaPorUser' => false,
//             'reservaConflicto' => null
//         ];
//     }

//     $ocupadaPorUser = ($userId !== null && $reservaConflicto && $reservaConflicto->user_id == $userId);
//     Log::info("ocupadaPorUser = " . ($ocupadaPorUser ? 'true' : 'false'));

//     return [
//         'disponible' => false,
//         'ocupadaPorUser' => $ocupadaPorUser,
//         'reservaConflicto' => $reservaConflicto
//     ];
// }
private function verificarDisponibilidadModificarMultiple(
    $empleadoId,
    $horaReserva,
    $duracion,
    $reservaId = null,
    $userId = null,
    $multipleId = null
){
      Log::info("=== verificarDisponibilidad INICIO ===", [
        'empleadoId' => $empleadoId,
        'horaReserva' => $horaReserva,
        'duracion' => $duracion,
        'reservaId_excluir' => $reservaId,
        'userId' => $userId,
        'multipleId' => $multipleId
    ]);

    $horaReserva = Carbon::parse($horaReserva);
    $horaFinReserva = $horaReserva->copy()->addMinutes((int) $duracion);

    Log::info("Rango de reserva calculado", [
        'inicio' => $horaReserva->toDateTimeString(),
        'fin' => $horaFinReserva->toDateTimeString()
    ]);

    // Intentamos obtener la reserva a modificar, incluso si está soft deleted
    if ($reservaId !== null) {
        $reservaModificar = Reserva::withTrashed()->find($reservaId);

        if ($reservaModificar) {
            Log::info("Reserva a excluir encontrada", [
                'reserva' => $reservaModificar->toArray()
            ]);
        } else {
            Log::warning("Reserva a excluir NO encontrada", [
                'reservaId' => $reservaId
            ]);
        }
    }

    // ===============================
    // Caso SIN empleada → validar solo por usuario
    // ===============================
    if (!$empleadoId) {
        $reservaConflicto = Reserva::where('user_id', $userId)
            ->where('date_time', '<', $horaFinReserva)
            ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva])
            ->when($reservaId, function ($q) use ($reservaId) {
                $q->where('id', '!=', $reservaId);
            })
            ->when($multipleId, function ($q) use ($multipleId) {
                $q->where('multiple', '!=', $multipleId);
            })
            ->first();

        $ocupadaPorUser = (bool) $reservaConflicto;

        Log::info("Conflicto por usuario", [
            'ocupadaPorUser' => $ocupadaPorUser,
            'reservaConflicto' => $reservaConflicto
                ? $reservaConflicto->toArray()
                : null
        ]);

        return [
            'disponible' => !$ocupadaPorUser,
            'ocupadaPorUser' => $ocupadaPorUser,
            'reservaConflicto' => $reservaConflicto
        ];
    }

    // ===============================
    // Caso CON empleada
    // ===============================
    $empleada = Empleada::find($empleadoId);

    if (!$empleada) {
        Log::warning("Empleada NO encontrada", ['empleadaId' => $empleadoId]);

        return [
            'disponible' => false,
            'ocupadaPorUser' => false,
            'reservaConflicto' => null
        ];
    }

    $query = Reserva::where('empleada_id', $empleada->id)
        ->where(function ($query) use ($horaReserva, $horaFinReserva) {
            $query->where('date_time', '<', $horaFinReserva)
                  ->whereRaw(
                      'DATE_ADD(date_time, INTERVAL duration MINUTE) > ?',
                      [$horaReserva]
                  );
        });

    // ⛔ Excluir la reserva actual
    if ($reservaId) {
        $query->where('id', '!=', $reservaId);
        Log::info("Excluyendo reserva por ID", ['reservaId' => $reservaId]);
    }

    // ⛔ Excluir TODA la reserva múltiple, pero NO las individuales
    if ($multipleId) {
        $query->where(function ($q) use ($multipleId) {
            $q->whereNull('multiple')
            ->orWhere('multiple', '!=', $multipleId);
        });

        Log::info("Excluyendo reservas del mismo multiple (permitiendo NULL)", [
            'multipleId' => $multipleId
        ]);
    }

    $reservaConflicto = $query->first();
    $existeConflicto = (bool) $reservaConflicto;

    Log::info("Resultado de disponibilidad para la empleada", [
        'existe_conflicto' => $existeConflicto,
        'reservaConflicto' => $reservaConflicto
            ? $reservaConflicto->toArray()
            : null
    ]);

    $ocupadaPorUser = (
        $userId !== null &&
        $reservaConflicto &&
        $reservaConflicto->user_id == $userId
    );

    Log::info("Resultado final verificarDisponibilidad", [
        'disponible' => !$existeConflicto,
        'ocupadaPorUser' => $ocupadaPorUser
    ]);

    return [
        'disponible' => !$existeConflicto,
        'ocupadaPorUser' => $ocupadaPorUser,
        'reservaConflicto' => $reservaConflicto
    ];
}


private function verificarDisponibilidad($empleadoId, $horaReserva, $duracion, $reservaId = null, $userId = null)
{
    Log::info("=== verificarDisponibilidad INICIO ===", [
        'empleadoId' => $empleadoId,
        'horaReserva' => $horaReserva,
        'duracion' => $duracion,
        'reservaId_excluir' => $reservaId,
        'userId' => $userId
    ]);

    $horaReserva = Carbon::parse($horaReserva);
    $horaFinReserva = $horaReserva->copy()->addMinutes($duracion);

    Log::info("Rango de reserva calculado", [
        'inicio' => $horaReserva->toDateTimeString(),
        'fin' => $horaFinReserva->toDateTimeString()
    ]);

    // Intentamos obtener la reserva a modificar, incluso si está eliminada (soft delete)
    $reservaMofificar = null;
    if ($reservaId !== null) {
        $reservaMofificar = Reserva::withTrashed()->find($reservaId);
        if (!$reservaMofificar) {
            Log::warning("Reserva a excluir NO encontrada", ['reservaId' => $reservaId]);
        } else {
            Log::info("Reserva a excluir encontrada", ['reserva' => $reservaMofificar->toArray()]);
        }
    }

    // Caso empleadoId NULL: verificar conflicto solo por usuario
    if (!$empleadoId) {
        $reservaConflicto = Reserva::where('user_id', $userId)
            ->where('date_time', '<', $horaFinReserva)
            ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva])
            ->when($reservaId, function($q) use ($reservaId){
                $q->where('id', '!=', $reservaId);
            })
            ->first();

        $ocupadaPorUser = $reservaConflicto ? true : false;

        Log::info("Conflicto por usuario", [
            'ocupadaPorUser' => $ocupadaPorUser,
            'reservaConflicto' => $reservaConflicto ? $reservaConflicto->toArray() : null
        ]);

        return [
            'disponible' => !$ocupadaPorUser,
            'ocupadaPorUser' => $ocupadaPorUser,
            'reservaConflicto' => $reservaConflicto
        ];
    }

    // Caso empleado específico
    $empleada = Empleada::find($empleadoId);
    if (!$empleada) {
        Log::warning("Empleada NO encontrada", ['empleadaId' => $empleadoId]);
        return [
            'disponible' => false,
            'ocupadaPorUser' => false,
            'reservaConflicto' => null
        ];
    }

    $query = Reserva::where('empleada_id', $empleada->id)
        ->where(function ($query) use ($horaReserva, $horaFinReserva) {
            $query->where('date_time', '<', $horaFinReserva)
                  ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$horaReserva]);
        });

    if ($reservaId) {
        $query->where('id', '!=', $reservaId);
        Log::info("Excluyendo reserva ID de la verificación", ['reservaId' => $reservaId]);
    }

    $reservaConflicto = $query->first();
    $existe = $reservaConflicto ? true : false;

    Log::info("Resultado de disponibilidad para la empleada", [
        'existe_conflicto' => $existe,
        'reservaConflicto' => $reservaConflicto ? $reservaConflicto->toArray() : null
    ]);

    $ocupadaPorUser = ($userId !== null && $reservaConflicto && $reservaConflicto->user_id == $userId);

    Log::info("Resultado final verificarDisponibilidad", [
        'disponible' => !$existe,
        'ocupadaPorUser' => $ocupadaPorUser
    ]);

    return [
        'disponible' => !$existe,
        'ocupadaPorUser' => $ocupadaPorUser,
        'reservaConflicto' => $reservaConflicto
    ];
}





    //VERIFICA DISPONIBILIDAD DE TODOS LOS EMPLEADOS
    public function verificarDisponibilidadEmpleados(Request $request) {
        // dd($request->all());
        $fechaString = $request->input('fechaReserva'); // Fecha en formato 'Y-m-d'
        $horaInicioString = $request->input('horaInicioReserva'); // Hora en formato 'H:i'
        $duracionString = $request->input('duracionReserva'); // Duración en minutos (string)

        // 🔹 NUEVO: extraer IDs de reservas eliminadas (si existen)
        $serviciosEliminadosTemporalesRaw = $request->input('serviciosEliminadosTemporales', []);
        $serviciosEliminadosTemporales = [];

        // Seguridad: asegurar array
       if (is_array($serviciosEliminadosTemporalesRaw)) {
            foreach ($serviciosEliminadosTemporalesRaw as $item) {
                if (isset($item['id_reserva'])) {
                    $serviciosEliminadosTemporales[] = (int) $item['id_reserva'];
                }
            }
        }

        // Combinar la fecha y la hora de inicio en un solo objeto Carbon
        $fechaHoraReserva = Carbon::createFromFormat('Y-m-d H:i', $fechaString . ' ' . $horaInicioString);

        // Convertir la duración (string) en minutos
        $duracion = intval($duracionString);

        // Obtener todos los empleados
        $empleados = Empleada::all();

        // Inicializar un array para almacenar la disponibilidad de cada empleado
        $disponibilidadEmpleados = [];

        // Calcular la hora de fin de la reserva solicitada
        $horaFinReserva = $fechaHoraReserva->copy()->addMinutes($duracion);

        // Recorrer cada empleado y verificar su disponibilidad
        // Recorrer cada empleado y verificar su disponibilidad
        foreach ($empleados as $empleado) {
            // Verificar si hay reservas que entren en conflicto con la hora y fecha solicitada
            $reservaOcupada = Reserva::where('empleada_id', $empleado->id)
                ->where('status', '!=', 'cancelled') // Añadir la condición de que el estado no sea "cancelled"

                // 🔹 NUEVO: excluir reservas eliminadas temporalmente (si existen)
                ->when(!empty($serviciosEliminadosTemporales), function ($q) use ($serviciosEliminadosTemporales) {
                    $q->whereNotIn('id', $serviciosEliminadosTemporales);
                })

                ->where(function ($query) use ($fechaHoraReserva, $horaFinReserva) {
                    // Buscar reservas que empiecen antes del fin de la reserva solicitada
                    $query->where('date_time', '<', $horaFinReserva)
                        // Y que terminen después del inicio de la reserva solicitada
                        ->whereRaw('DATE_ADD(date_time, INTERVAL duration MINUTE) > ?', [$fechaHoraReserva]);
                })
                ->exists();

            // Si no hay reservas en conflicto, está disponible
            $disponibilidadEmpleados[] = [
                'idEmpleado' => $empleado->id,
                'empleado' => $empleado->nombre,  // O puedes usar $empleado->id si prefieres
                'disponible' => !$reservaOcupada,
                'fecha_hora_reserva' => $fechaHoraReserva
            ];
        }


        // Retornar la disponibilidad de los empleados
        return response()->json([
            'disponibilidadEmpleados' => $disponibilidadEmpleados
        ]);
    }

    public function obtenerEmpleadoCualquiera(Request $request){
        // Obtener la fecha y hora de inicio y duración de la reserva
        $fechaInicio = Carbon::parse($request->date_time);
        $fechaFin = $fechaInicio->copy()->addMinutes($request->duration);

        // Obtener empleados ocupados en el rango de tiempo
        $empleadasOcupadas = Reserva::where(function ($query) use ($fechaInicio, $fechaFin) {
            $query->where(function ($q) use ($fechaInicio, $fechaFin) {
                // Comprobar solapamiento
                $q->where('date_time', '<', $fechaFin)
                  ->whereRaw("DATE_ADD(date_time, INTERVAL duration MINUTE) > ?", [$fechaInicio]);
            });
        })->pluck('empleada_id')->toArray();

        // // Obtener todos los IDs de empleados (esto debería idealmente venir de la tabla Empleadas)
        // $todasEmpleadas = Reserva::distinct()->pluck('empleada_id')->toArray();

        // // Obtener empleados disponibles
        // $empleadasDisponibles = array_diff($todasEmpleadas, $empleadasOcupadas);
        // 3. Obtener todas las empleadas registradas
        $todasEmpleadas = Empleada::pluck('id')->toArray();

        // 4. Filtrar disponibles
        $empleadasDisponibles = array_values(array_diff($todasEmpleadas, $empleadasOcupadas));

        // Si hay empleados disponibles, seleccionar uno aleatoriamente
        if (!empty($empleadasDisponibles)) {
            $empleadaSeleccionada = $empleadasDisponibles[array_rand($empleadasDisponibles)];

            // Asignar el empleado seleccionado al request
            $request->merge(['empleada_id' => $empleadaSeleccionada]);

            return true; // Indica que se asignó un empleado
        }

        // Si no hay empleados disponibles
        return false; // No se asignó ningún empleado
    }

public function obtenerEmpleadoMenosOcupado($dateTime, $duracion)
{
    \Log::debug('⏱️ [INICIO] obtenerEmpleadoMenosOcupado()', [
        'dateTime' => $dateTime,
        'duracion' => $duracion
    ]);

    // 1. Fechas clave
    $fechaInicio = Carbon::parse($dateTime);
    $fechaFin = $fechaInicio->copy()->addMinutes($duracion);
    $inicioDelDia = $fechaInicio->copy()->startOfDay();
    $finDelDia = $fechaInicio->copy()->endOfDay();

    \Log::debug('🕒 Rango de tiempo:', [
        'fechaInicio' => $fechaInicio,
        'fechaFin' => $fechaFin,
        'inicioDelDia' => $inicioDelDia,
        'finDelDia' => $finDelDia
    ]);

    // 2. Empleadas ocupadas en ese rango de tiempo
    $empleadasOcupadas = Reserva::where(function ($query) use ($fechaInicio, $fechaFin) {
        $query->where('date_time', '<', $fechaFin)
              ->whereRaw("DATE_ADD(date_time, INTERVAL duration MINUTE) > ?", [$fechaInicio]);
    })->pluck('empleada_id')->toArray();

    \Log::debug('❌ Empleadas ocupadas:', $empleadasOcupadas);

    // 3. Todas las empleadas
    $todasEmpleadas = Empleada::pluck('id')->toArray();
    \Log::debug('👥 Todas las empleadas:', $todasEmpleadas);

    // 4. Empleadas disponibles
    $empleadasDisponibles = array_values(array_diff($todasEmpleadas, $empleadasOcupadas));
    \Log::debug('✅ Empleadas disponibles:', $empleadasDisponibles);

    if (empty($empleadasDisponibles)) {
        \Log::warning('⚠️ No hay empleadas disponibles para este horario.');
        return null;
    }

    // // 5. Contar reservas por empleada ese día
    // $conteoPorEmpleada = Reserva::whereIn('empleada_id', $empleadasDisponibles)
    //     ->whereBetween('date_time', [$inicioDelDia, $finDelDia])
    //     ->selectRaw('empleada_id, COUNT(*) as total')
    //     ->groupBy('empleada_id')
    //     ->pluck('total', 'empleada_id')
    //     ->toArray();

    // \Log::debug('📊 Conteo de reservas por empleada:', $conteoPorEmpleada);

    // // 6. Seleccionar empleada menos ocupada
    // $empleadaSeleccionada = null;
    // $minReservas = PHP_INT_MAX;

    // foreach ($empleadasDisponibles as $id) {
    //     $reservas = $conteoPorEmpleada[$id] ?? 0;
    //     if ($reservas < $minReservas) {
    //         $minReservas = $reservas;
    //         $empleadaSeleccionada = $id;
    //     }
    // }
     // Si hay empleados disponibles, seleccionar uno aleatoriamente
    if (!empty($empleadasDisponibles)) {
        $empleadaSeleccionada = $empleadasDisponibles[array_rand($empleadasDisponibles)];

        // Asignar el empleado seleccionado al request
       return $empleadaSeleccionada;
    }
    \Log::info('🎯 Empleada seleccionada:', [
        'empleada_id' => $empleadaSeleccionada,
        'reservasEseDia' => $minReservas
    ]);

    // return $empleadaSeleccionada;
}

public function updateReservaMultiple(Request $request)
{
    // dd($request->all());

    DB::beginTransaction();

    try {

        // ===============================
        // Servicios recibidos del frontend
        // ===============================
        $servicios = json_decode($request->arrayCompleto, true);

        if (empty($servicios)) {
            throw new \Exception('No hay servicios');
        }

        // =========================================================
        // 1️⃣ CREAR ReservaServicio si la reserva original era SIMPLE
        // =========================================================

        $reservaServicio = null;

        // Buscar reserva simple (si viene)
        $reservaSimple = null;
        if ($request->id_reserva_simple) {
            $reservaSimple = Reserva::find($request->id_reserva_simple);
        }

        // Caso: era simple → convertir a múltiple
        if ($reservaSimple && $reservaSimple->multiple == null) {

            $reservaServicio = ReservaServicio::create([
                'user_id' => $reservaSimple->user_id,
                'total_payment' => $request->total_payment,
                'notaDelcliente_multiple' => $request->nota,
                'nota_interna' => $request->nota_interna,
                'message_for_client' => $request->mensaje_cliente,
                'status' => 'modificada',
            ]);

            // Vincular reserva simple al grupo
            $reservaSimple->multiple = $reservaServicio->id;
            $reservaSimple->save();

        } else {
            // Ya era múltiple
            $reservaServicio = ReservaServicio::findOrFail($request->id_reserva_modificar);

            // Update del grupo
            $reservaServicio->update([
                'total_payment' => $request->total_payment,
                'notaDelcliente_multiple' => $request->nota,
                'nota_interna' => $request->nota_interna,
                'message_for_client' => $request->mensaje_cliente,
                'status' => 'modificada',
            ]);
        }

        // ===============================
        // 2. Reservas actuales del grupo
        // ===============================
        $reservasActuales = Reserva::where('multiple', $reservaServicio->id)
            ->whereNull('deleted_at')
            ->get();

        $reservasPorId = $reservasActuales->keyBy('id');

        $idsReservasFrontend = collect($servicios)
            ->pluck('id_reserva')
            ->filter()
            ->toArray();

        // ===============================
        // 3. ELIMINAR reservas quitadas
        // ===============================
        foreach ($reservasActuales as $reserva) {

            if (!in_array($reserva->id, $idsReservasFrontend)) {

                $reserva->update([
                    'status' => 'eliminada',
                    'cliente_confirmo_modificacion' => 'pendiente'
                ]);

                $reserva->delete();
            }
        }

        $listaReservas = [];

        // ===============================
        // 4. Crear / actualizar reservas
        // ===============================
        foreach ($servicios as $servicio) {

            $empleadaId = $servicio['id_empleado'];

            if ($empleadaId === 'cualquiera') {
                $empleadaId = $this->obtenerEmpleadoMenosOcupado(
                    $servicio['date_time'],
                    $servicio['duracion']
                );
            }

            // Buscar reserva existente
            $reservaExistente = null;
            if (!empty($servicio['id_reserva']) && isset($reservasPorId[$servicio['id_reserva']])) {
                $reservaExistente = $reservasPorId[$servicio['id_reserva']];
            }

            $idAExcluir = $reservaExistente ? $reservaExistente->id : null;

            // Validar disponibilidad
            $disponible = $this->verificarDisponibilidadModificarMultiple(
                $empleadaId,
                $servicio['date_time'],
                $servicio['duracion'],
                $idAExcluir,
                null,
                $reservaServicio->id
            );

            if (!$disponible['disponible']) {
                throw new \Exception('Horario no disponible');
            }

            // BONUS: si cambia servicio → delete + create
            if ($reservaExistente) {

                $servicioHaCambiado = $reservaExistente->service_id != $servicio['id'];

                if ($servicioHaCambiado) {

                    $reservaExistente->update([
                        'status' => 'modificada',
                        'cliente_confirmo_modificacion' => 'pendiente'
                    ]);
                    $reservaExistente->delete();

                    $reserva = Reserva::create([
                        'user_id' => $request->user_id,
                        'service_id' => $servicio['id'],
                        'date_time' => $servicio['date_time'],
                        'duration' => $servicio['duracion'],
                        'empleada_id' => $empleadaId,
                        'status' => $request->status,
                        'multiple' => $reservaServicio->id,
                        'cliente_confirmo_modificacion' => 'pendiente',
                        'empleado_seleccionado' => $servicio['seleccionaCliente'],
                        'nota_interna' => $request->nota_interna,
                        'mensaje_cliente' => $request->mensaje_cliente,
                    ]);

                    //esto es por si quiero update en vez de delete
                    //  $reservaExistente->update([
                    //     'user_id' => $request->user_id,
                    //     'service_id' => $servicio['id'], // ahora sí se actualiza
                    //     'date_time' => $servicio['date_time'],
                    //     'duration' => $servicio['duracion'],
                    //     'empleada_id' => $empleadaId,
                    //     'status' => $request->status,
                    //     'cliente_confirmo_modificacion' => 'pendiente',
                    //     'nota_interna' => $request->nota_interna,
                    //     'mensaje_cliente' => $request->mensaje_cliente,
                    //     'empleado_seleccionado' => $servicio['seleccionaCliente'],
                    // ]);

                    // $reserva = $reservaExistente;

                } else {

                    $reservaExistente->update([
                        'user_id' => $request->user_id,
                        'date_time' => $servicio['date_time'],
                        'duration' => $servicio['duracion'],
                        'empleada_id' => $empleadaId,
                        'status' => $request->status,
                        // 'multiple' => $reservaServicio->id,
                        'cliente_confirmo_modificacion' => 'pendiente',
                        'nota_interna' => $request->nota_interna,
                        'mensaje_cliente' => $request->mensaje_cliente,
                        'empleado_seleccionado' => $servicio['seleccionaCliente'],
                    ]);

                    $reserva = $reservaExistente;
                }

            } else {

                $reserva = Reserva::create([
                    'user_id' => $request->user_id,
                    'service_id' => $servicio['id'],
                    'date_time' => $servicio['date_time'],
                    'duration' => $servicio['duracion'],
                    'empleada_id' => $empleadaId,
                    'status' => $request->status,
                    'multiple' => $reservaServicio->id,
                    'cliente_confirmo_modificacion' => 'pendiente',
                    'empleado_seleccionado' => $servicio['seleccionaCliente'],
                    'nota_interna' => $request->nota_interna,
                    'mensaje_cliente' => $request->mensaje_cliente,
                ]);
            }

            $reserva->load('user', 'servicio', 'empleada');
            $listaReservas[] = $reserva;
        }

        // ===============================
        // 5. Guardar historial REAL
        // ===============================
        $idsReservasVinculadas = Reserva::withTrashed()
            ->where('multiple', $reservaServicio->id)
            ->pluck('id')
            ->toArray();

        $reservaServicio->reservas_vinculadas = $idsReservasVinculadas;
        $reservaServicio->save();

        // Enviar correo al usuario (solo si hay reservas y si hay usuario)
        $statusMultiple = $request->status;
        if (count($listaReservas) > 0) {
            if($request['user_id'] != null && in_array($statusMultiple, ['pending', 'confirmed', 'pagada'])){

                 // Crear el mailable
                $mail = new ModificacionReservaMail($listaReservas);

                // Renderizar el contenido (HTML)
                $contenido = $mail->render();

                // Enviar el correo
                Mail::to($listaReservas[0]->user->email)->send($mail);

                // Registrar en la tabla
                MensajeEnviado::create([
                    'id_reserva'   => $listaReservas[0]->id,
                    'id_usuario'   => $listaReservas[0]->user->id,
                    'tipo_mensaje' => 'modificacion_reserva',
                    'canal'        => 'email',
                    'contenido'    => $contenido,
                    'enviado_en'   => now(),
                ]);
            }
        }

        DB::commit();

        return response()->json([
            'reservaActualizada' => true,
            'multiple_id' => $reservaServicio->id,
            'mensaje' => 'Reserva múltiple actualizada correctamente'
        ]);

    } catch (\Exception $e) {

        DB::rollBack();

        return response()->json([
            'reservaActualizada' => false,
            'mensaje' => $e->getMessage()
        ], 422);
    }
}




// public function updateReservaMultiple(Request $request)
// {
//     // dd($request->all());
//     DB::beginTransaction();

//     try {
//         $actualizadas = false;
//         $servicesWithTimes = json_decode($request->input('arrayCompleto'), true);

//         // 1. Revisar si ya existe una reserva_servicio (reserva múltiple)
//         $reserva_servicio = ReservaServicio::find($request['id_reserva_modificar']);
//         $oldStatusMultiple ='';
//         if (!$reserva_servicio) {// No existe, entonces crear la reserva_servicio (grupo)
//             $reserva_servicio = ReservaServicio::create([
//                 'total_payment' => $request['total_payment'],
//                 'notaDelCliente_multiple' => $request['nota'],
//                 'nota_interna' => $request['nota_interna'],
//                 'message_for_client' => $request['mensaje_cliente'],
//             ]);

            // en vez de actualizar la emimino ya que se crea de nuevo actualizada
//             $reserva_simple = Reserva::find($request['id_reserva_modificar']);
//             $oldStatusMultiple = $reserva_simple->status;
//             if ($reserva_simple) {
//                 $reserva_simple->delete(); // <- Elimina la reserva simple
//             }
//         } else {
//             // Si ya existe, puedes actualizar info general si lo deseas
//             $reserva_status =  Reserva::where('multiple', $request['id_reserva_modificar'])->first();
//             // dd($reserva_status);
//             $oldStatusMultiple = $reserva_status->status;
//             // $status = $reserva->status;
//             $reserva_servicio->update([
//                 'total_payment' => $request['total_payment'],
//                 'notaDelCliente_multiple' => $request['nota'],
//                 'nota_interna' => $request['nota_interna'],
//                 'message_for_client' => $request['mensaje_cliente'],
//             ]);

//         }
//         // dd($request['user_id']);
//         $reservas_existentes = Reserva::where('multiple', $reserva_servicio->id)->get()->values();
//         //en reservas_existentes están todas que coinciden con el id multiple

//         $listaReservas = [];//para enviar el email
//         foreach ($servicesWithTimes as $index => $servicio) {
//             $duracion = $servicio['duracion'];
//             $empleadaId = $servicio['id_empleado'];
//             $horaReserva = $servicio['date_time'];

//             if ($empleadaId == 'cualquiera') {
//                 $empleadaId = $this->obtenerEmpleadoMenosOcupado($horaReserva, $duracion);
//             }

//             $reserva = $reservas_existentes->get($index);
//             if ($reserva) {
//                 // 🔁 Actualizar reserva existente

//                 $reserva->update([
//                     'user_id' => $request['user_id'],
//                     'service_id' => $servicio['id'],
//                     'date_time' => $servicio['date_time'],
//                     'status' => $request->status,
//                     'cliente_confirmo_modificacion' => 'pendiente',
//                     'duration' => $duracion,
//                     'empleada_id' => $empleadaId,
//                     'mensaje_for_client' => $request['mensaje_cliente'],
//                     'empleado_seleccionado' => $servicio['seleccionaCliente'],
//                     'nota_interna' => $request->nota_interna,
//                     'mensaje_cliente' => $request->mensaje_cliente,
//                     'multiple' => $reserva_servicio->id
//                 ]);
//             } else {
//                 // 🆕 Crear nueva reserva
//                 $reserva = Reserva::create([
//                     'user_id' => $request['user_id'],
//                     'service_id' => $servicio['id'],
//                     'date_time' => $servicio['date_time'],
//                     'status' => $request->status,
//                     'cliente_confirmo_modificacion' => 'pendiente',
//                     'duration' => $duracion,
//                     'empleada_id' => $empleadaId,
//                     'mensaje_for_client' => $request['mensaje_cliente'],
//                     'empleado_seleccionado' => $servicio['seleccionaCliente'],
//                     'nota_interna' => $request->nota_interna,
//                     'mensaje_cliente' => $request->mensaje_cliente,
//                     'multiple' => $reserva_servicio->id
//                 ]);
//             }

//             // ✅ En ambos casos, cargamos relaciones y lo agregamos al array
//             $reserva->load('user', 'servicio', 'empleada');
//             $listaReservas[] = $reserva;
//         }
//         $statusMultiple = $request->status;
//         // dd($listaReservas[0]->id);
//         // Enviar correo al usuario (solo si hay reservas y si hay usuario)
//         if (count($listaReservas) > 0) {
//             if($request['user_id'] != null && in_array($statusMultiple, ['pending', 'confirmed', 'pagada']) ||
//                $request['user_id'] != null && in_array($oldStatusMultiple, ['pending', 'confirmed', 'pagada'])){
//                 // Mail::to($listaReservas[0]->user->email)->send(new ModificacionReservaMail($listaReservas));

//                  // Crear el mailable
//                 $mail = new ModificacionReservaMail($listaReservas);

//                 // Renderizar el contenido (HTML)
//                 $contenido = $mail->render();

//                 // Enviar el correo
//                 Mail::to($listaReservas[0]->user->email)->send($mail);

//                 // Registrar en la tabla
//                 MensajeEnviado::create([
//                     'id_reserva'   => $listaReservas[0]->id,
//                     'id_usuario'   => $listaReservas[0]->user->id,
//                     'tipo_mensaje' => 'modificacion_reserva',
//                     'canal'        => 'email',
//                     'contenido'    => $contenido,
//                     'enviado_en'   => now(),
//                 ]);

//                 //al actualizar la reserva eliminamos la notificación de proxima cita si existe
//                 // MensajeEnviado::where('id_reserva', $listaReservas[0]->id)
//                 // ->where('tipo_mensaje', 'recordatorio')
//                 // ->where('id_usuario', $listaReservas[0]->user->id)
//                 // ->delete();
//             }
//         }

//         DB::commit();

//         return response()->json([
//             'reservaActualizada' => true,
//             'mensaje' => 'Reserva múltiple actualizada con éxito'
//         ]);
//     } catch (\Exception $e) {
//         DB::rollBack();
//         return response()->json([
//             'reservaActualizada' => false,
//             'mensaje' => $e->getMessage()
//         ]);
//     }
// }


function storeReservaMultiple(Request $request){
//    dd($request->all());
    $idCitaReprogramar = null;
    if( $request['reprogramarCita'] == true){
        $idCitaReprogramar = $request['idCitaReprogramar'];
    }
    $creada = false;

    $servicesWithTimes = json_decode($request->input('arrayCompleto'), true);

    DB::beginTransaction();

    try {

        // Crear la cabecera de la reserva múltiple
        $reserva_servicio = ReservaServicio::create([
            'total_payment' => $request['total_payment'],
            'notaDelCliente_multiple' => $request['nota'],
            'nota_interna' => $request['nota_interna'],
            'message_for_client' => $request['mensaje_cliente'],
        ]);

        $listaReservas = [];

        foreach ($servicesWithTimes as $service) {

            $duracion = $service['duracion'];
            $empleadaId = $service['id_empleado'];
            $horaReserva = $service['date_time'];

            // Si el cliente eligió "cualquiera"
            if ($empleadaId == 'cualquiera') {
                $empleadaId = $this->obtenerEmpleadoMenosOcupado($horaReserva, $duracion);
            }

            // NUEVA COMPROBACIÓN DE DISPONIBILIDAD
            $disponibilidad = $this->verificarDisponibilidad(
                $empleadaId,
                $horaReserva,
                $duracion,
                $idCitaReprogramar,                  // No reprogramamos
                $request['user_id']    // <-- Importante
            );
            // dd($disponibilidad);
            // Si NO está disponible
            if (!$disponibilidad['disponible']) {

                DB::rollBack();

                // Si el conflicto es del mismo usuario
                if ($disponibilidad['ocupadaPorUser']) {
                    return response()->json([
                        'reservaCreada' => false,
                        'motivo' => 'Ya tienes una reserva en este horario.'
                    ]);
                }

                // Si el conflicto es por otra persona
                return response()->json([
                    'reservaCreada' => false,
                    'motivo' => 'La empleada no está disponible en este horario.'
                ]);
            }

            // Crear reserva individual
            $reserva = Reserva::create([
                'user_id' => $request['user_id'],
                'service_id' => $service['id'],
                'date_time' => $horaReserva,
                'status' => $request->status,
                'duration' => $duracion,
                'empleada_id' => $empleadaId,
                'mensaje_for_client' => $request['mensaje_cliente'],
                'empleado_seleccionado' => $service['seleccionaCliente'],
                'nota_interna' => $request->nota_interna,
                'mensaje_cliente' => $request->mensaje_cliente,
                'multiple' => $reserva_servicio->id
            ]);

            $reserva->load('user', 'servicio', 'empleada');
            $listaReservas[] = $reserva;
        }
        if ($reserva_servicio && !empty($listaReservas)) {

            // Crear un array con los IDs de todas las reservas en $listaReservas
            $reservasVinculadas = collect($listaReservas)
                ->pluck('id')    // Obtener solo los IDs
                ->toArray();

            // Guardar en el campo JSON
            $reserva_servicio->update([
                'reservas_vinculadas' => $reservasVinculadas
            ]);
        }

        // Correo al cliente
        if (count($listaReservas) > 0 && $request['user_id'] != null) {
            Mail::to($listaReservas[0]->user->email)->send(
                new ReservaConfirmadaMail($listaReservas)
            );
        }

        DB::commit();

        return response()->json([
            'reservaCreada' => true
        ]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'reservaCreada' => false,
            'motivo' => $e->getMessage()
        ]);
    }
}


function storeReserva(Request $request){
    // dd($request->all());
     $idCitaReprogramar = null;
    if( $request['reprogramarCita'] == true){
        $idCitaReprogramar = $request['idCitaReprogramar'];
    }
    $creada = false;
    if ($request['empleada_id'] == 'cualquiera') {
        $request->merge([
            'empleada_id' => $this->obtenerEmpleadoMenosOcupado($request->date_time, $request->duration)
        ]);
    }

    //última comprobación por si hay dos personas al mismo tiempo haciendo reserva
    $disponible = $this->verificarDisponibilidad($request->empleada_id, $request->date_time, $request->duration, $idCitaReprogramar, $request->user_id);
    Log::info("variable disponible", [
            'disponible' => $disponible
        ]);
        Log::info("id empleada", [
            'id empleada' => $request->empleada_id
        ]);
    if (!$disponible['disponible']) {
        // Si el conflicto es del mismo usuario
        if ($disponible['ocupadaPorUser']) {
            return response()->json([
                'reservaCreada' => false,
                'motivo' => 'Ya tienes una reserva en este horario.'
            ]);
        }

        // Si el conflicto es por otra persona
        return response()->json([
            'reservaCreada' => false,
            'motivo' => 'La empleada no está disponible en este horario.'
        ]);
    }else{
         Log::info("id empleada dentro el else para crear reserva", [
            'id empleada' => $request->empleada_id
        ]);
        //  dd( $request->empleada_id);
        $reserva = Reserva::create($request->all());

        // Cargar relaciones necesarias (user, servicio, empleada)
        $reserva->load('user', 'servicio', 'empleada');
        if($reserva && $reserva->user_id != null){
            // Enviar el correo
            Mail::to($reserva->user->email)->send(new ReservaConfirmadaMail($reserva));
        }


        //verificar si existen reservas pendientes
        $comfim_pendingCount = Reserva::where(function($query) {
            $query->where('status', 'confirmed')
                ->orWhere('status', 'pending');
        })
        ->where('comprobada', 'no')
        ->count();
        $creada = true;

        //Emitir el evento si hay pendientes o no
        broadcast(new NewReserv($reserva, $comfim_pendingCount));
        return response()->json([
            'reservaCreada' => $creada
        ]);
    }
}

// public function updateReserva(Request $request)
// {
//     // dd($request->all());

//     $empleadaId =  $request->empleada_id;
//     $horaReserva = $request->data_time;
//     $duracion = $request->duration;
//     if ($empleadaId == 'cualquiera') {
//         $empleadaId = $this->obtenerEmpleadoMenosOcupado($horaReserva, $duracion);
//     }else{
//         $empleadaId = $request->empleada_id;
//     }

//     $responsableModificacion='';
//     $cliente_confirmo_modificacion='';
//     if($request->reprogramarCita){
//         $responsableModificacion = $request->user_id;
//         $cliente_confirmo_modificacion ='confirmado';
//     }else{
//         $responsableModificacion = auth()->id();
//         $cliente_confirmo_modificacion ='pendiente';
//     }

//     //comprobar si antes era multiple y ha quedado en uno
//     $reservas = null;
//     $reserva= null;
//     if($request->eramultiple === true || $request->eramultiple === "true"){
//         $reservas = Reserva::where('multiple', $request->id_reserva_modificar)->get();
//         // Guardamos los IDs para el campo JSON antes de filtrar/eliminar
//         $ids_reservas_vinculadas = $reservas->pluck('id')->toArray();
//         // dd($ids_reservas_vinculadas);

//         if ($reservas->isNotEmpty()) {
//             // 1. Eliminar de la BD las NO coincidentes
//            $noCoincidentes = Reserva::where('multiple', $request->id_reserva_modificar)
//                 ->where(function($q) use ($request) {
//                     $q->where('date_time', '!=', $request->date_time)
//                     ->orWhere('service_id', '!=', $request->service_id);
//                 })
//                 ->get();

//             // Cambiar status a modificada antes del soft delete
//             foreach ($noCoincidentes as $res) {
//                 $res->status = 'modificada';
//                 $res->save();
//                 $res->delete(); // soft delete
//             }

//             // 2. Mantener en la colección solo las que coinciden
//             $reservas = $reservas->filter(function($r) use ($request) {
//                 return $r->date_time == $request->date_time &&
//                     $r->service_id == $request->service_id;
//             })->values();
//         }

//         $reserva = $reservas->first();
//         //cambiamos el campo multiple a null
//         if ($reserva) {
//             $reserva->multiple = null;
//             // $reserva->status = 'confirmed';
//             $reserva->save();
//         }
//         // 1. Obtener la reserva
//         $reservaServicio = ReservaServicio::findOrFail($request->id_reserva_modificar);

//         // 2. Cambiar el campo status
//         $reservaServicio->status = 'modificada';
//         // dd($ids_reservas_vinculadas);
//         $reservaServicio->reservas_vinculadas = $ids_reservas_vinculadas;
//         $reservaServicio->save();

//         // 3. Borrado suave (soft delete)
//         $reservaServicio->delete();

//     } else {
//         $reserva = Reserva::find($request->id_reserva_modificar);
//     }
//     //  dd($reserva);

//     $oldStatus = $reserva->status;
//     if (!$reserva) {
//         return response()->json([
//             'reservaActualizada' => false,
//             'mensaje' => 'Reserva no encontrada'
//         ]);
//     }

//     // Verificar disponibilidad con la nueva fecha y hora
//     $disponible = $this->verificarDisponibilidad(
//         $empleadaId,
//         $request->date_time,
//         $request->duration,
//         $reserva->id // Pasamos el ID de la reserva actual para excluirla de la verificación
//     );

//      if (!$disponible['disponible']) {
//         return response()->json([
//             'reservaActualizada' => false,
//             'mensaje' => 'La nueva fecha y hora no están disponibles'
//         ]);
//     }

//     // Actualizar los campos necesarios
//     $reserva->update([
//         'user_id'         => $request->user_id,
//         'service_id'     => $request->service_id,
//         'date_time'       => $request->date_time,
//         'status'          => $request->status,
//         'cliente_confirmo_modificacion' => $cliente_confirmo_modificacion,
//         'duration'        => $request->duration,
//         'empleada_id'     => $empleadaId,
//         'nota'            => $request->nota, // Por ahora es null
//         'total_payment'   => $request->total_payment,
//         'nota_interna'    => $request->nota_interna,
//         'mensaje_cliente' => $request->mensaje_cliente,
//         'empleado_seleccionado' => $request->empleado_seleccionado,
//     ]);

//     // Cargar relaciones si es necesario
//     $reserva->load('user', 'servicio', 'empleada');

//     // Si quieres reenviar el correo
//    if ($reserva->user_id && in_array($reserva->status, ['pending', 'confirmed', 'pagada']) || $reserva->user_id && in_array($oldStatus, ['pending', 'confirmed', 'pagada'])) {
//         // Mail::to($reserva->user->email)->send(new ModificacionReservaMail($reserva));
//         // Crear el mailable
//         $mail = new ModificacionReservaMail($reserva);

//         // Renderizar el contenido (HTML)
//         $contenido = $mail->render();

//         // Enviar el correo
//         Mail::to($reserva->user->email)->send($mail);

//         // Registrar en la tabla
//         MensajeEnviado::create([
//             'id_reserva'   => $reserva->id,
//             'id_usuario'   => $reserva->user->id,
//             'tipo_mensaje' => 'modificacion_reserva',
//             'canal'        => 'email',
//             'contenido'    => $contenido,
//             'enviado_en'   => now(),
//         ]);

//         //al actualizar la reserva eliminamos la notificación de proxima cita si existe
//         // MensajeEnviado::where('id_reserva', $reserva->id)
//         // ->where('tipo_mensaje', 'recordatorio')
//         // ->where('id_usuario', $reserva->user->id)
//         // ->delete();
//     }

//     // Verificar si hay reservas pendientes
//     $comfim_pendingCount = Reserva::where(function($query) {
//         $query->where('status', 'confirmed')
//               ->orWhere('status', 'pending');
//     })->where('comprobada', 'no')->count();

//     // Emitir evento
//     broadcast(new NewReserv($reserva, $comfim_pendingCount));

//     return response()->json([
//         'reservaActualizada' => true,
//         'mensaje' => 'Reserva actualizada correctamente'
//     ]);
// }


public function updateReserva(Request $request)
{
    DB::beginTransaction();

    try {

        // ===============================
        // 1. Resolver empleada
        // ===============================
        $empleadaId = $request->empleada_id;
        $horaReserva = $request->date_time;
        $duracion = $request->duration;

        if ($empleadaId === 'cualquiera') {
            $empleadaId = $this->obtenerEmpleadoMenosOcupado($horaReserva, $duracion);
        }

        // ===============================
        // 2. Responsable modificación
        // ===============================
        if ($request->reprogramarCita) {
            $responsableModificacion = $request->user_id;
            $cliente_confirmo_modificacion = 'confirmado';
        } else {
            $responsableModificacion = auth()->id();
            $cliente_confirmo_modificacion = 'pendiente';
        }

        // ===============================
        // 3. Resolver reserva REAL
        // ===============================
        $reserva = null;

        if ($request->eramultiple === true || $request->eramultiple === "true") {

            $reservasGrupo = Reserva::where('multiple', $request->id_reserva_modificar)->get();

            if ($reservasGrupo->isEmpty()) {
                throw new \Exception('No se encontraron reservas del grupo');
            }

            $idsReservasVinculadas = $reservasGrupo->pluck('id')->toArray();

            $noCoincidentes = Reserva::where('multiple', $request->id_reserva_modificar)
                ->where(function ($q) use ($request) {
                    $q->where('date_time', '!=', $request->date_time)
                      ->orWhere('service_id', '!=', $request->service_id);
                })
                ->get();

            foreach ($noCoincidentes as $r) {
                $r->status = 'modificada';
                $r->save();
                $r->delete(); // soft delete
            }

            $reserva = Reserva::where('multiple', $request->id_reserva_modificar)
                ->where('date_time', $request->date_time)
                ->where('service_id', $request->service_id)
                ->first();

            if (!$reserva) {
                throw new \Exception('Reserva resultante no encontrada');
            }

            $reserva->multiple = null;
            $reserva->save();

            $reservaServicio = ReservaServicio::findOrFail($request->id_reserva_modificar);
            $reservaServicio->status = 'modificada';
            $reservaServicio->reservas_vinculadas = $idsReservasVinculadas;
            $reservaServicio->save();
            $reservaServicio->delete();

        } else {
            $reserva = Reserva::find($request->id_reserva_modificar);
        }

        if (!$reserva) {
            throw new \Exception('Reserva no encontrada');
        }

        $oldStatus = $reserva->status;

        // ===============================
        // 4. Verificar disponibilidad
        // ===============================
        $disponible = $this->verificarDisponibilidad(
            $empleadaId,
            $request->date_time,
            $request->duration,
            $reserva->id
        );

        if (!$disponible['disponible']) {
            throw new \Exception('La nueva fecha y hora no están disponibles');
        }

        // ===============================
        // 5. Actualizar reserva
        // ===============================
        $reserva->update([
            'user_id'         => $request->user_id,
            'service_id'      => $request->service_id,
            'date_time'       => $request->date_time,
            'status'          => $request->status,
            'cliente_confirmo_modificacion' => $cliente_confirmo_modificacion,
            'duration'        => $request->duration,
            'empleada_id'     => $empleadaId,
            'nota'            => $request->nota,
            'total_payment'   => $request->total_payment,
            'nota_interna'    => $request->nota_interna,
            'mensaje_cliente' => $request->mensaje_cliente,
            'empleado_seleccionado' => $request->empleado_seleccionado,
        ]);
        $reserva->load('user', 'servicio', 'empleada');

        // ===============================
        // 6. Email + evento (sin tocar)
        // ===============================
        if (
            $reserva->user_id &&
            (
                in_array($reserva->status, ['pending', 'confirmed', 'pagada']) ||
                in_array($oldStatus, ['pending', 'confirmed', 'pagada'])
            )
        ) {
            $mail = new ModificacionReservaMail($reserva);
            $contenido = $mail->render();

            Mail::to($reserva->user->email)->send($mail);

            MensajeEnviado::create([
                'id_reserva'   => $reserva->id,
                'id_usuario'   => $reserva->user->id,
                'tipo_mensaje' => 'modificacion_reserva',
                'canal'        => 'email',
                'contenido'    => $contenido,
                'enviado_en'   => now(),
            ]);
        }

        $pendingCount = Reserva::whereIn('status', ['confirmed', 'pending'])
            ->where('comprobada', 'no')
            ->count();

        broadcast(new NewReserv($reserva, $pendingCount));

        // ===============================
        // TODO OK → COMMIT
        // ===============================
        DB::commit();

        return response()->json([
            'reservaActualizada' => true,
            'mensaje' => 'Reserva actualizada correctamente'
        ]);

    } catch (\Throwable $e) {

        // ❌ DESHACE TODO
        DB::rollBack();

        Log::error('Error updateReserva', [
            'error' => $e->getMessage()
        ]);

        return response()->json([
            'reservaActualizada' => false,
            'mensaje' => $e->getMessage()
        ], 422);
    }
}

// public function updateReserva(Request $request)
// {
//         // dd($request->all());
//         // ===============================
//         // 1. Resolver empleada
//         // ===============================
//         $empleadaId = $request->empleada_id;
//         $horaReserva = $request->date_time;
//         $duracion = $request->duration;

//         if ($empleadaId === 'cualquiera') {
//             $empleadaId = $this->obtenerEmpleadoMenosOcupado($horaReserva, $duracion);
//         }

//         // ===============================
//         // 2. Responsable modificación
//         // ===============================
//         if ($request->reprogramarCita) {
//             $responsableModificacion = $request->user_id;
//             $cliente_confirmo_modificacion = 'confirmado';
//         } else {
//             $responsableModificacion = auth()->id();
//             $cliente_confirmo_modificacion = 'pendiente';
//         }

//         // ===============================
//         // 3. Resolver reserva REAL (clave)
//         // ===============================
//         $reserva = null;

//         // 🔥 CASO: venía de reserva múltiple y ahora queda en una
//         if ($request->eramultiple === true || $request->eramultiple === "true") {
//             // dd($request->all());
//             Log::info("ACTUALIZAR RESERVA SIMPLE QUE ANTES ERA MULTIPLE", [
//                 'Lo que recibe' => $request->all()
//             ]);
//             // Reservas activas del grupo
//             $reservasGrupo = Reserva::where('multiple', $request->id_reserva_modificar)->get();

//             if ($reservasGrupo->isEmpty()) {
//                 return response()->json([
//                     'reservaActualizada' => false,
//                     'mensaje' => 'No se encontraron reservas del grupo'
//                 ]);
//             }

//             // Guardamos IDs históricos
//             $idsReservasVinculadas = $reservasGrupo->pluck('id')->toArray();

//             // Eliminamos las que ya no coinciden
//             $noCoincidentes = Reserva::where('multiple', $request->id_reserva_modificar)
//                 ->where(function ($q) use ($request) {
//                     $q->where('date_time', '!=', $request->date_time)
//                     ->orWhere('service_id', '!=', $request->service_id);
//                 })
//                 ->get();
//             // dd($noCoincidentes);
//             foreach ($noCoincidentes as $r) {
//                 $r->status = 'modificada';
//                 $r->save();
//                 $r->delete(); // soft delete
//             }

//             // Nos quedamos SOLO con la que permanece
//             $reserva = Reserva::where('multiple', $request->id_reserva_modificar)
//                 ->where('date_time', $request->date_time)
//                 ->where('service_id', $request->service_id)
//                 ->first();
//             // dd($reserva);
//             if (!$reserva) {
//                 return response()->json([
//                     'reservaActualizada' => false,
//                     'mensaje' => 'Reserva resultante no encontrada'
//                 ]);
//             }

//             // 🔑 Convertir en reserva simple
//             $reserva->multiple = null;
//             $reserva->save();

//             // Actualizar y cerrar el grupo
//             $reservaServicio = ReservaServicio::findOrFail($request->id_reserva_modificar);
//             $reservaServicio->status = 'modificada';
//             $reservaServicio->reservas_vinculadas = $idsReservasVinculadas;
//             $reservaServicio->save();
//             $reservaServicio->delete();

//         } else {
//             // 🔹 Reserva simple normal
//             $reserva = Reserva::find($request->id_reserva_modificar);
//         }

//         if (!$reserva) {
//             return response()->json([
//                 'reservaActualizada' => false,
//                 'mensaje' => 'Reserva no encontrada'
//             ]);
//         }

//         $oldStatus = $reserva->status;

//         // ===============================
//         // 4. Verificar disponibilidad (ID CORRECTO)
//         // ===============================
//         $disponible = $this->verificarDisponibilidad(
//             $empleadaId,
//             $request->date_time,
//             $request->duration,
//             $reserva->id // ✅ ID REAL (ej: 494)
//         );

//         if (!$disponible['disponible']) {
//             return response()->json([
//                 'reservaActualizada' => false,
//                 'mensaje' => 'La nueva fecha y hora no están disponibles'
//             ]);
//         }

//         // ===============================
//         // 5. Actualizar reserva
//         // ===============================
//         $reserva->update([
//             'user_id'         => $request->user_id,
//             'service_id'      => $request->service_id,
//             'date_time'       => $request->date_time,
//             'status'          => $request->status,
//             'cliente_confirmo_modificacion' => $cliente_confirmo_modificacion,
//             'duration'        => $request->duration,
//             'empleada_id'     => $empleadaId,
//             'nota'            => $request->nota,
//             'total_payment'   => $request->total_payment,
//             'nota_interna'    => $request->nota_interna,
//             'mensaje_cliente' => $request->mensaje_cliente,
//             'empleado_seleccionado' => $request->empleado_seleccionado,
//         ]);

//         $reserva->load('user', 'servicio', 'empleada');

//         // ===============================
//         // 6. Email + evento (sin tocar)
//         // ===============================
//         if (
//             $reserva->user_id &&
//             (
//                 in_array($reserva->status, ['pending', 'confirmed', 'pagada']) ||
//                 in_array($oldStatus, ['pending', 'confirmed', 'pagada'])
//             )
//         ) {
//             $mail = new ModificacionReservaMail($reserva);
//             $contenido = $mail->render();

//             Mail::to($reserva->user->email)->send($mail);

//             MensajeEnviado::create([
//                 'id_reserva'   => $reserva->id,
//                 'id_usuario'   => $reserva->user->id,
//                 'tipo_mensaje' => 'modificacion_reserva',
//                 'canal'        => 'email',
//                 'contenido'    => $contenido,
//                 'enviado_en'   => now(),
//             ]);
//         }

//         $pendingCount = Reserva::whereIn('status', ['confirmed', 'pending'])
//             ->where('comprobada', 'no')
//             ->count();

//         broadcast(new NewReserv($reserva, $pendingCount));

//         return response()->json([
//             'reservaActualizada' => true,
//             'mensaje' => 'Reserva actualizada correctamente'
//         ]);
// }



public function getMultiServices(Request $request){
    $reservaServicios = Reserva::where('multiple', $request->id_multiple)->get();

    return response()->json([
        'serviciosMultiple' => $reservaServicios
    ]);
}

public function actualizarFechaReserva(Request $request){

    // Validación de los datos entrantes
    $validated = $request->validate([
        'reserva_id' => 'required|exists:reservas,id',  // Asegura que la reserva existe
        'nueva_fecha' => 'required|date',  // Validar que la nueva fecha es una fecha válida
    ]);

    // Encontrar la reserva por su ID
    $reserva = Reserva::find($request->reserva_id);

    // Si la reserva se encuentra, se actualiza la fecha
    if ($reserva) {
        $nuevaFecha = Carbon::parse($request->nueva_fecha)->setTimezone('Europe/Madrid');
        $reserva->date_time = $nuevaFecha;
        $reserva->empleada_id = $request->nuevo_empleado_id; // Actualizar el empleado si es necesario
        $reserva->save();

        return response()->json(['success' => true, 'nueva_fecha' => $nuevaFecha]);

        // Si la reserva no puede ser actualizada, devolver error
        // return response()->json(['success' => false, 'message' => 'No se puede reprogramar una cita con este estado.'], 400);
    }

    // Si no se encuentra la reserva, respondemos con un error
    return response()->json(['success' => false, 'message' => 'Reserva no encontrada.'], 400);

}

public function upStatusEndReserv(Request $request){
$updteEnd = false;
$color = 'black';
$idReserva = $request->input('reserva_id');
    $reserva = Reserva::findOrFail($idReserva);
    if ($reserva) {
       // Actualizar el estado
    $reserva->status = 'Finalizada';
    $reserva->save();
    $updteEnd = true;
    }
    return response()->json([
        'updteEnd' => $updteEnd,
        'color' =>$color
    ]);

}

public function getEmpleadosCalendar(){
    return response()->json(Empleada::all()->map(function ($empleado) {
        return [
            'id' => $empleado->id,
            'title' => $empleado->nombre, // Nombre del empleado
        ];
    }));
}

public function getReservas()
{
    $reservas = Reserva::with(['servicio', 'empleada', 'user'])
        ->where('status', '!=', 'cancelled')
        ->get();

    $eventos = $reservas->map(function ($reserva) {

        $start = Carbon::parse($reserva->date_time);
        $end   = Carbon::parse($reserva->date_time)->addMinutes($reserva->duration);

        // Color por estado
        $color = match($reserva->status) {
            'confirmed' => '#00BE70',
            'pending' => 'orange',
            'cancelled' => 'red',
            'Finalizada' => 'black',
            default => 'gray',
        };
          /*
        |--------------------------------------------------------------------------
        | crear id_unico
        |--------------------------------------------------------------------------
        */
        $fechaUnica = $start->format('Y-m-d');
        $horaInicio = $start->format('H_i');
        $horaFin    = $end->format('H_i');
        $idServicio = $reserva->servicio->id ?? 'null';
        $idEmpleada = $reserva->empleada->id ?? 'null';

        $idUnico = "{$fechaUnica}_{$idServicio}_{$horaInicio}__{$horaFin}_{$idEmpleada}";
        /*
        |--------------------------------------------------------------------------
        | NUEVA LÓGICA COMPLETA: recibos + payments
        |--------------------------------------------------------------------------
        */


        $recibos = collect();
        $payments = collect();

        if ($reserva->status_payment === "Pagado") {

            // Si multiple es null → usar id de la reserva
            $idParaBuscar = $reserva->multiple === null
                ? $reserva->id
                : $reserva->multiple;

            // Obtener recibos asociados
            $recibos = Recibo::where('id_reserva', $idParaBuscar)->get();

            // Obtener payments según los recibos
            $payments = Payment::whereIn('recibo_id', $recibos->pluck('id'))->get();
        }

        return [
            'id' => 'eventoTemporalAsignado_1_' . $reserva->id,
            'title' => $this->getDescripcion($reserva),
            'start' => $start->toDateTimeString(),
            'end'   => $end->toDateTimeString(),
            'description' => $reserva->nota,
            'color' => $color,
            'resourceId' => $reserva->empleada->id,
            'id_unico' => $idUnico,
            'extendedProps' => [
                'servicio' => [
                    'id' => $reserva->servicio->id,
                    'categoria' => $reserva->servicio->categoria ?? null,
                    'nombre' => $reserva->servicio->nombre ?? 'Servicio no especificado',
                    'descripcion' => $reserva->servicio->descripcion ?? null,
                    'precio' => $reserva->servicio->precio ?? null,
                    'duracion' => $reserva->servicio->duration ?? null,
                    'reservM' => $reserva->servicio->minutosNewService,
                    'reservH' => $reserva->servicio->horaNewService,
                    'borderColor' => $reserva->servicio->borderColor
                ],

                'empleada' => [
                    'id' => $reserva->empleada->id ?? null,
                    'nombre' => $reserva->empleada->nombre ?? 'Sin asignar',
                    'apellido' => $reserva->empleada->primerApellido,
                    'imagenEmple' => $reserva->empleada->img_empleada ?? null,
                    'telefono' => $reserva->empleada->telefono ?? null,
                ],

                'usuario' => [
                    'id' => $reserva->user->id ?? null,
                    'nombre' => $reserva->user->name ?? 'Usuario no registrado',
                    'primerApellido' => $reserva->user->primer_apellido ?? 'Usuario no registrado',
                    'email' => $reserva->user->email ?? 'email@no-disponible.com',
                    'telefono' => $reserva->user->telefono ?? null,
                    'imagenUser' => $reserva->user->profile_photo_path ?? null,
                ],

                'fecha' => $reserva->date_time,
                'duracion' => $reserva->duration,
                'reservaId' => $reserva->id,
                'status' => $reserva->status,
                'nota' => $reserva->nota,
                'fecha_creacion' => $reserva->created_at->toDateTimeString(),
                'fecha_actualizacion' => $reserva->updated_at->toDateTimeString(),
                'seleccionado_cliente' => $reserva->empleado_seleccionado,
                'nota_interna' => $reserva->nota_interna,
                'mensaje_cliente' => $reserva->mensaje_cliente,
                'multiple' => $reserva->multiple,
                'status_payment' => $reserva->status_payment,
                'confirma_cliente_modificacion' => $reserva->cliente_confirmo_modificacion,

                // ⭐ NUEVO
                'recibos' => $recibos,
                'payments' => $payments,
            ]
        ];
    });

    return response()->json($eventos);
}


// public function getReservas()
// {
//     // Cargar reservas con las relaciones
//     $reservas = Reserva::with(['servicio', 'empleada', 'user'])
//     ->where('status', '!=', 'cancelled')
//     ->get();

//     $eventos = $reservas->map(function ($reserva) {

//         $start = Carbon::parse($reserva->date_time);

//         $end = Carbon::parse($reserva->date_time)
//             ->addMinutes($reserva->duration);

//         // Establecer el color según el estado de la reserva
//         $color = match($reserva->status) {
//             'confirmed' => '#00BE70',
//             'pending' => 'orange',
//             'cancelled' => 'red',
//             'Finalizada' => 'black',
//             default => 'gray', // Color por defecto si no coincide con ninguno
//         };

//         return [
//             // 'title' => $reserva->servicio->nombre ?? 'Reserva de Servicio', // Título basado en el servicio
//             'id' => 'eventoTemporalAsignado_1_' . $reserva->id,
//             'title' =>  $this->getDescripcion($reserva),
//             'start' => $start->toDateTimeString(),
//             'end' => $end->toDateTimeString(),
//             'description' => $reserva->nota,
//             'color' => $color, // Asignar color aquí
//             'resourceId' => $reserva->empleada->id, // ID del empleado
//             'extendedProps' => [
//                 'servicio' => [
//                     'id' => $reserva->servicio->id,
//                     'categoria' => $reserva->servicio->categoria ?? null,
//                     'nombre' => $reserva->servicio->nombre ?? 'Servicio no especificado',
//                     'descripcion' => $reserva->servicio->descripcion ?? null,
//                     'precio' => $reserva->servicio->precio ?? null,
//                     'duracion' => $reserva->servicio->duration ?? null,
//                     'reservM' =>$reserva->servicio->minutosNewService,
//                     'reservH' =>$reserva->servicio->horaNewService,
//                     'borderColor' =>$reserva->servicio->borderColor
//                 ],
//                 'empleada' => [
//                     'id' => $reserva->empleada->id ?? null,
//                     'nombre' => $reserva->empleada->nombre ?? 'Sin asignar',
//                     'apellido' =>$reserva->empleada->primerApellido,
//                     'imagenEmple' => $reserva->empleada->img_empleada ?? null,
//                     'telefono' => $reserva->empleada->telefono ?? null,
//                 ],
//                 'usuario' => [
//                     'id' => $reserva->user->id ?? null,
//                     'nombre' => $reserva->user->name ?? 'Usuario no registrado',
//                     'primerApellido' => $reserva->user->primer_apellido ?? 'Usuario no registrado',
//                     'email' => $reserva->user->email ?? 'email@no-disponible.com',
//                     'telefono' => $reserva->user->telefono ?? null,
//                     'imagenUser' => $reserva->user->profile_photo_path ?? null,
//                 ],
//                 'fecha' =>$reserva->date_time,
//                 'duracion' =>$reserva->duration,
//                 'reservaId' =>$reserva->id,
//                 'status' => $reserva->status,
//                 'nota' => $reserva->nota,
//                 'fecha_creacion' => $reserva->created_at->toDateTimeString(),
//                 'fecha_actualizacion' => $reserva->updated_at->toDateTimeString(),
//                 'seleccionado_cliente'=>$reserva->empleado_seleccionado,
//                 'nota_interna' =>$reserva->nota_interna,
//                 'mensaje_cliente'=>$reserva->mensaje_cliente,
//                 'multiple' =>$reserva->multiple,
//                 'status_payment' => $reserva->status_payment,
//             ]
//         ];
//     });

//     return response()->json($eventos);
// }

// Función para obtener la descripción según el usuario
public function getDescripcion($reserva)
{
    if ($reserva->user && $reserva->user->id !== null) {
        // Si el usuario tiene un ID, mostramos su nombre, apellido y el servicio
        return $reserva->user->name . ' ' . $reserva->user->primer_apellido . ' • ' . $reserva->servicio->nombre;
    } else {
        // Si no tiene ID o no hay usuario, mostramos "Cliente sin cita previa" seguido del servicio
        return 'Cliente sin cita previa • ' . $reserva->servicio->nombre;
    }
}

public function checkPendingReservations($path = null)
{
    // Obtener reservas pendientes o confirmadas y NO comprobadas
    $reservasPendientes = Reserva::whereIn('status', ['confirmed', 'pending'])
        ->where('comprobada', 'no')
        ->with(['user', 'servicio'])
        ->get();

    // Agrupar por 'multiple' (null significa reserva de un solo servicio)
    $reservasAgrupadas = $reservasPendientes->groupBy(function ($item) {
        return $item->multiple ?? 'single_' . $item->id;
    })->map(function ($group) {

        $reserva = $group->first();

        return [
            'reserva_id' => $reserva->id,
            'user'       => $reserva->user,
            'status'     => $reserva->status,
            'multiple'   => $reserva->multiple,
            'confirmaCliente' => $reserva->cliente_confirmo_modificacion,

            // 🔥 LISTA de fechas y duraciones (uno por servicio)
            'horarios' => $group->map(function ($item) {
                return [
                    'date_time' => $item->date_time,
                    'duration'  => $item->duration
                ];
            })->values(),

            // Lista completa de servicios
            'servicios' => $group->pluck('servicio')->values()
        ];
    })->values();

    // ===== CANCELADAS =====
    $reservasCanceladas = Reserva::where('status', 'cancelled')
        ->where('comprobada', 'no')
        ->with(['user', 'servicio'])
        ->get();

    return response()->json([
        'pending'       => $reservasAgrupadas->isNotEmpty(),
        'cancelled'     => $reservasCanceladas->isNotEmpty(),
        'reservas'      => $reservasAgrupadas,
        'canceladas'    => $reservasCanceladas,
        'pendingCount2' => $reservasAgrupadas->count() + $reservasCanceladas->count(),
    ]);
}




//metodo de prueba




public function obtenerHoraRedondeadaSegunMes($fecha)
{
    // Convertir la fecha recibida a un objeto Carbon en la zona horaria 'Europe/Madrid'
    $horaActual = Carbon::parse($fecha, 'Europe/Madrid')->setTimezone('Europe/Madrid');

    // Obtener el mes actual
    $mesActual = Carbon::now('Europe/Madrid')->month;

    // Verificar si el mes recibido es diferente al mes actual
    if ($horaActual->month != $mesActual) {
        // Si el mes no es el actual, devolver las 9:00 del primer día del mes recibido
        $horaActual->setDate($horaActual->year, $horaActual->month, 1);
        $horaActual->setTime(9, 0);  // Establecer las 9:00 AM
        // Poner los segundos a cero para un redondeo exacto
        $horaActual->second = 0;

        // Formatear la hora redondeada a 'H:i' y devolverla
        return $horaActual->format('H:i');
    } else {
        // Si el mes es el actual, usar la función que redondea la hora
        $horaActual = $this->obtenerHoraRedondeada2();
        return $horaActual;
    }

    // Devolver la hora en el formato deseado

}
public function getAllDays(){
        $horaFin2 = Carbon::createFromTime(20, 0, 1);
        Carbon::setLocale('es');
        $horaInicio2 =  $this->obtenerHoraRedondeada2();
        $fechaActual = Carbon::now('Europe/Madrid'); // Fecha actual
        $fechaActual2 = Carbon::now('Europe/Madrid'); // Fecha actual
        $fechaActual3 = Carbon::now('Europe/Madrid'); // Fecha actual
        $anioActual = Carbon::now('Europe/Madrid')->format('Y');
        $ultimoDiaDel2030 = Carbon::create(2026, 12, 31); // 31 de diciembre del 2030
        $diasHasta2030 = []; // Inicializar el array


        if ($fechaActual->hour > 20 || ($fechaActual->hour === 20 && $fechaActual->minute >= 15)) {
            $fechaActual->addDay(); // Pasa al siguiente día
            $fechaActual2->addDay();
            $fechaActual3->addDay();
        }

        //Si la fecha actual es domingo (7), avanzar hasta el próximo lunes (1)
        if ($fechaActual->isSunday()) {
            $fechaActual2->next(Carbon::MONDAY); // Avanza al próximo lunes
            $fechaActual3->next(Carbon::MONDAY);
        }
        // Recorrer desde la fecha actual hasta el 31 de diciembre de 2030
        for ($fecha = $fechaActual->copy(); $fecha->lte($ultimoDiaDel2030); $fecha->addDay()) {
            $diasHasta2030[] = [
                'dia_semana' => $fecha->translatedFormat('D'),  // Nombre del día
                'numero_dia' => $fecha->format('d'),            // Número del día
                'mes_anio'   => $fecha->translatedFormat('F Y'), // Mes y año
                'fecha'      => $fecha->format('Y-m-d'),
                'mes'        => $fecha->translatedFormat('F'),   // Mes en español (ej. "Septiembre")
                'anio'       => $fecha->format('Y'),             // Formato completo de fecha (YYYY-MM-DD)
            ];
        }
        $fechaActual2 = $fechaActual2->format('Y-m-d');
        $mesActual = $fechaActual->translatedFormat('F Y'); // Mes y año actual
        return response()->json([
            'allDays' => $diasHasta2030, // Pasas el array normalmente
            'mesActualAllDays' => $mesActual,
            'fechaActual' => $fechaActual->format('Y-m-d'), // Pasar la fecha actual a la vista
            'fechaActual2AllDays' => $fechaActual2,
            'fechaActual3' => $fechaActual3,
            'horaInicioAllDays' => $horaInicio2,
            'horaFin' => $horaFin2->format('H:i'),
            'anioActualAllDays' => $anioActual,
        ]);

}


public function getDiasByMes(Request $request){
    // Obtener la fecha en formato "Sat Feb 01 2025 00:00:00 GMT+0100 (hora estándar de Europa central)"
    $fechaString = $request->input('nombre_mes');  // Ejemplo: "Sat Feb 01 2025 00:00:00 GMT+0100 (hora estándar de Europa central)"

    // Eliminar la parte del texto que no es relevante: "(hora estándar de Europa central)"
    $fechaString = preg_replace('/\s*\(.*\)$/', '', $fechaString);

    // Usamos la función obtenerHoraRedondeadaSegunMes()
    $horaInicioSegunMes = $this->obtenerHoraRedondeadaSegunMes($fechaString);

    // Usar Carbon::parse para convertir la fecha al formato de Carbon
    try {
        // Parsear la fecha
        $fecha = Carbon::parse($fechaString);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Formato de fecha incorrecto'], 400);
    }

    // Obtener el mes actual
    $mesActual = Carbon::now()->month;

    // Establecer el primer día del mes según el mes recibido
    if ($fecha->month == $mesActual) {
        // Si el mes seleccionado es el mes actual, ajustamos el primer día al día de hoy
        // $primerDiaDelMes = Carbon::now()->startOfDay();
        $fechaActual = Carbon::now('Europe/Madrid');
        if ($fechaActual->hour > 20 || ($fechaActual->hour === 20 && $fechaActual->minute >= 15)) {
            $fechaActual->addDay(); // Pasa al siguiente día
        }
        if ($fechaActual->isSunday()) {
            $fechaActual->addDay(); // Avanza al próximo lunes
        }
    }else {
        $fechaActual = $fecha->copy()->startOfMonth();

        // Si el mes seleccionado no es el actual, usamos el primer día del mes
        if ($fechaActual->isSunday()) {
            $fechaActual->next(Carbon::MONDAY); // Avanza al próximo lunes
        }
    }

    // Obtenemos el último día del mes
    $ultimoDiaDelMes = $fechaActual->copy()->endOfMonth();

    // Inicializamos el array de los días del mes
    $diasMes = [];

    // Iteramos sobre todos los días del mes
    for ($fecha = $fechaActual; $fecha <= $ultimoDiaDelMes; $fecha->addDay()) {
        $diasMes[] = [
            'dia_semana' => $fecha->translatedFormat('D'),  // Nombre del día (ej. "Lun", "Mar", etc.)
            'numero_dia' => $fecha->format('d'),            // Número del día (ej. "01", "02", etc.)
            'mes_anio'   => $fecha->translatedFormat('F Y'), // Mes y año (ej. "Enero 2025")
            'fecha'      => $fecha->format('Y-m-d'),         // Fecha completa (ej. "2025-01-01")
            'mes'        => $fecha->translatedFormat('F'),   // Mes en español (ej. "Enero")
            'anio'       => $fecha->format('Y'),             // Año (ej. "2025")
        ];
    }

    // Devolver la respuesta JSON
    return response()->json([
        'diasMesSeleccionado' => $diasMes,
        'horaInicioSegunMes' => $horaInicioSegunMes
    ]);
}


public function comprobarDisponibilidad(Request $request){
    // dd($request->all());
    $fecha = $request->fecha;
    $hora = $request->hora;
    $servicios = $request->servicios ?? null; // Aquí asumimos que ahora pasas los servicios con sus duraciones individuales

    //comprobar si es una reprogramación para que no incluya la reserva
    $idReservaEditar = $request->idCitaReprogramar ?? null;

    // Si no recibes array de servicios, tomamos la duración total como antes
    if (!$servicios) {
        $duracionTotal = (int) $request->duracion;
        $servicios = [['duration' => $duracionTotal]];
    } else {
        $duracionTotal = array_sum(array_column($servicios, 'duration'));
    }

    $cierreMediodia = Carbon::parse("{$fecha} 14:00");
    $aperturaTarde = Carbon::parse("{$fecha} 15:00");
    $cierreDia = Carbon::parse("{$fecha} 20:00");
    $aperturaDiaSiguiente = Carbon::parse("{$fecha} 09:00")->addDay();

    $inicioReserva = Carbon::parse("{$fecha} {$hora}");
    $inicioReserva2 = Carbon::parse("{$fecha} {$hora}");
    $bloquesProcesados = [];
    $mensajeExtra = '';
    $mensajeSecundario = '';

    // ⛔ Validar si la hora seleccionada ya ha pasado
    $ahora = Carbon::now();
    $finReserva33 = $inicioReserva->copy()->addMinutes($duracionTotal);

    if ($inicioReserva->lte($ahora)) {
        return response()->json([
            'disponible' => false,
            'mensaje' => "La hora seleccionada es errónea.<br>Fecha: " . $inicioReserva->translatedFormat('l d-m-Y') . " - Hora seleccionada: " . $inicioReserva->format('H:i'),
            'mensajeSecundario' => '¡Buenas noticias! Hemos encontrado algunas opciones disponibles que podrían interesarte.',
            'sugerencias' => $this->buscarPrimeraHoraDisponibleInterna($fecha, $duracionTotal, true, $idReservaEditar),
            'soloFecha' => $inicioReserva->translatedFormat('l d-m-Y'),
        ]);
    }

      // Reagendar si es domingo
    if ($inicioReserva->dayOfWeek === Carbon::SUNDAY) {
        do {
            $inicioReserva->addDay();
        } while ($inicioReserva->dayOfWeek === Carbon::SUNDAY);

        $inicioReserva->setTime(9, 0);
        $mensajeExtra .= "El domingo el local permanece cerrado. Tu reserva ha sido reprogramada para el siguiente día hábil.";
    }

    // Reagendar si es sábado y la duración total excede las 14:00
    if ($inicioReserva->dayOfWeek === Carbon::SATURDAY) {
        $finPrevisto = $inicioReserva->copy()->addMinutes($duracionTotal);
        $sabadoCierre = Carbon::parse("{$fecha} 14:00");
        $sabadoCierreTarde = Carbon::parse("{$fecha} 20:00");

        if ($finPrevisto->gt($sabadoCierre) || $finPrevisto->gt($sabadoCierreTarde)) {
            do {
                $inicioReserva->addDay();
            } while ($inicioReserva->dayOfWeek === Carbon::SUNDAY);

            $inicioReserva->setTime(9, 0);
            $mensajeExtra .= "El sábado cerramos a las 14:00. El total de los servicios seleccionados excede el horario de cierre.";
        }
    }

    // Procesar cada servicio individualmente, ajustando la hora si cruza horario comida
    foreach ($servicios as $servicio) {
        $duracion = (int) $servicio['duration'];

        $inicioBloque = $inicioReserva->copy();
        $finBloque = $inicioBloque->copy()->addMinutes($duracion);

        // Si el bloque cruza el cierre de comida, reagendamos para empezar a las 15:00
        if ($inicioBloque->lt($cierreMediodia) && $finBloque->gt($cierreMediodia)) {
            $inicioBloque = $aperturaTarde->copy();
            $finBloque = $inicioBloque->copy()->addMinutes($duracion);
            $mensajeExtra .= "¡Disponible! El total de los servicios seleccionados excede el horario de cierre de comer (14:00), por lo que uno o varios de tus servicios los realizaremos a partir de las 15:00 a la vuelta de la comida.";
            $mensajeSecundario .= "";
        }

        // Si el bloque empieza entre 14:00 y 15:00, también lo reagendamos (por seguridad)
       if ($inicioBloque->gte($cierreMediodia) && $inicioBloque->lt($aperturaTarde)) {
            // Caso 1: Entre 14:00 y 15:00 → reagendar y explicar
            $inicioBloque = $aperturaTarde->copy();
            $finBloque = $inicioBloque->copy()->addMinutes($duracion);
            $mensajeExtra .= "¡Disponible! El total de los servicios seleccionados excede el horario de cierre de comer (14:00), por lo que uno o varios de tus servicios los realizaremos a partir de las 15:00 a la vuelta de la comida.";
            $mensajeSecundario .= "";
        } elseif ($inicioBloque->gte($aperturaTarde)) {
            // Caso 2: Ya empieza a las 15:00 → solo marcar como disponible
            $mensajeExtra .= "";
            $mensajeSecundario .= "";
        }

        // Si el bloque cruza el cierre del día (20:00), se mueve al día siguiente a partir de las 09:00
        if ($finBloque->gt($cierreDia) ) {
            if ($inicioReserva2->dayOfWeek === Carbon::SATURDAY) {
                 $mensajeExtra .= "";
            }else{
                 $mensajeExtra .= "El total de los servicios seleccionados excede el horario de cierre del local 20:00.";
            }
            $minutosHoy = $cierreDia->diffInMinutes($inicioBloque);
            $minutosDiaSiguiente = $duracion - $minutosHoy;

            $inicioDiaSiguiente = $aperturaDiaSiguiente->copy();
            $finDiaSiguiente = $inicioDiaSiguiente->copy()->addMinutes($minutosDiaSiguiente);

            // Ajustar finBloque para reflejar que parte de la reserva sigue el día siguiente
            $finBloque = $finDiaSiguiente;


            $mensajeSecundario.="¡Buenas noticias! Hemos encontrado algunas opciones disponibles que podrían interesarte.";

            // ✅ Obtener sugerencias adicionales (sin retornar JSON aún)
            $duracionTotal = array_sum(array_column($servicios, 'duration'));
            $sugerencias = $this->buscarPrimeraHoraDisponibleInterna($fecha, $duracionTotal, true, $idReservaEditar);

            return response()->json([
                'disponible' => false,
                'mensaje' => trim($mensajeExtra),
                'mensajeSecundario' => trim($mensajeSecundario),
                'reprogramado' => [
                    'inicio' => $inicioBloque->toDateTimeString(),
                    'fin' => $finBloque->toDateTimeString(),
                ],
                'sugerencias' => $sugerencias ?? [],
            ]);
        }

        $bloquesProcesados[] = [
            'inicio' => $inicioBloque,
            'fin' => $finBloque,
            'duracion' => $duracion
        ];

        // Actualizar el inicioReserva para el siguiente bloque (comienza justo después del anterior)
        $inicioReserva = $finBloque->copy();
    }

    // Comprobamos disponibilidad por bloques distribuidos entre empleadas
    $fechaSiguiente = Carbon::parse($fecha)->addDay()->toDateString();
    $empleadas = Empleada::all();
    $asignaciones = [];

    foreach ($bloquesProcesados as $bloque) {
        $bloqueAsignado = false;

        foreach ($empleadas as $empleada) {
            $reservasHoy = Reserva::where('empleada_id', $empleada->id)
                ->whereDate('date_time', $fecha)
                ->when($idReservaEditar, function ($q) use ($idReservaEditar) {
                    $q->where('id', '!=', $idReservaEditar);
                })
                ->get();

            $reservasManana = Reserva::where('empleada_id', $empleada->id)
                ->whereDate('date_time', $fechaSiguiente)
                ->when($idReservaEditar, function ($q) use ($idReservaEditar) {
                    $q->where('id', '!=', $idReservaEditar);
                })
                ->get();


            $inicioBloque = $bloque['inicio'];
            $finBloque = $bloque['fin'];

            \Log::info("🔍 Evaluando empleada ID: {$empleada->id} para bloque {$inicioBloque->format('H:i')} - {$finBloque->format('H:i')}");

            $conflicto = false;

            // Reservas hoy
            foreach ($reservasHoy as $reserva) {
                $inicioReserva = Carbon::parse($reserva->date_time);
                $finReserva = (clone $inicioReserva)->addMinutes($reserva->duration);

                if ($inicioBloque->lt($finReserva) && $finBloque->gt($inicioReserva)) {
                    \Log::warning("❌ Conflicto HOY con reserva de {$inicioReserva->format('H:i')} a {$finReserva->format('H:i')} para empleada {$empleada->id}");
                    $conflicto = true;
                    break;
                }
            }

            // Reservas mañana
            if (!$conflicto && $inicioBloque->isAfter($cierreDia)) {
                foreach ($reservasManana as $reserva) {
                    $inicioReserva = Carbon::parse($reserva->date_time);
                    $finReserva = (clone $inicioReserva)->addMinutes($reserva->duration);

                    if ($inicioBloque->lt($finReserva) && $finBloque->gt($inicioReserva)) {
                        \Log::warning("❌ Conflicto MAÑANA con reserva de {$inicioReserva->format('H:i')} a {$finReserva->format('H:i')} para empleada {$empleada->id}");
                        $conflicto = true;
                        break;
                    }
                }
            }

            if (!$conflicto) {
                \Log::info("✅ Bloque asignado a empleada {$empleada->id}");
                $asignaciones[] = [
                    'empleada_id' => $empleada->id,
                    'inicio' => $inicioBloque,
                    'fin' => $finBloque,
                    'duracion' => $bloque['duracion']
                ];
                $bloqueAsignado = true;
                break; // Pasamos al siguiente bloque
            }
        }

        if (!$bloqueAsignado) {
            \Log::warning("⛔ No se pudo asignar el bloque {$inicioBloque->format('H:i')} - {$finBloque->format('H:i')} a ninguna empleada");
            // Si al menos un bloque no se puede asignar, devolvemos sugerencias
            // return $this->buscarPrimeraHoraDisponibleInterna($fecha, array_sum(array_column($servicios, 'duration')));
            return $this->buscarPrimeraHoraDisponibleInterna($fecha, array_sum(array_column($servicios, 'duration')), false,  $idReservaEditar);

        }
    }

    // Si todos los bloques fueron asignados con éxito:
    $primerInicio = $asignaciones[0]['inicio'];
    $ultimoFin = end($asignaciones)['fin'];

    return response()->json([
        'disponible' => true,
        'mensaje' => trim($mensajeExtra) ?: 'El horario seleccionado está disponible.',
        'mensajeSecundario' => trim($mensajeSecundario),
        'nuevoFin' => 'El ' . $primerInicio->translatedFormat('l, j \d\e F \d\e\l Y') .
                    ' de ' . $primerInicio->format('H:i') .
                    ' a ' . $ultimoFin->format('H:i'),
        'soloFecha' => 'El ' . $primerInicio->translatedFormat('l, j \d\e F'),
        'bloques' => array_map(function ($asignacion) {
            return [
                'inicio' => $asignacion['inicio']->toDateTimeString(),
                'fin' => $asignacion['fin']->toDateTimeString(),
                'duracion' => $asignacion['duracion'],
                'empleada_id' => $asignacion['empleada_id'],
            ];
        }, $asignaciones),
    ]);

    // Si no hay disponibilidad para ninguna empleada, buscamos la siguiente franja
    // return $this->buscarPrimeraHoraDisponibleInterna($fecha, array_sum(array_column($servicios, 'duration')));
     return $this->buscarPrimeraHoraDisponibleInterna($fecha, array_sum(array_column($servicios, 'duration')), false,  $idReservaEditar);
}




//buscar primera hora disponible
private function buscarPrimeraHoraDisponibleInterna($fecha, $duracion, $soloDatos = false, $idReservaEditar = null){
    if ($soloDatos) {
        $fecha = Carbon::parse($fecha)->addDay();
    } else {
        $fecha = Carbon::parse($fecha);
    }

    $maxDiasBusqueda = 7;
    $horaInicioDia = '09:00';
    $horaComidaInicio = '14:00';
    $horaComidaFin = '15:00';
    $horaCierre = '20:00';

    $franjas = [];
    $sugerencias = [];
    // $maxSugerencias = 14;
    $maxSugerencias = ($duracion <= 60) ? 38 : 14;


    // ⏱️ Hora actual sin segundos, para comparar con precisión
    $ahoraRedondeado = Carbon::now()->format('Y-m-d H:i');

    for ($i = 0; $i < $maxDiasBusqueda; $i++) {
        $dia = $fecha->copy()->addDays($i);

        // ❌ Saltar sábados (6) y domingos (0)
        if ($dia->isSaturday() || $dia->isSunday()) {
            \Log::info("⛔ Día no hábil ({$dia->format('l')}). Se salta.");
            continue;
        }

        $diaStr = $dia->toDateString();
        $horaActual = Carbon::parse("$diaStr $horaInicioDia");
        $finDia = Carbon::parse("$diaStr $horaCierre");

        $inicioPausa = Carbon::parse("$diaStr $horaComidaInicio");
        $finPausa = Carbon::parse("$diaStr $horaComidaFin");

        \Log::info("📅 Día a revisar: {$diaStr}");

        while ($horaActual->copy()->addMinutes($duracion)->lte($finDia)) {
            $horaFin = $horaActual->copy()->addMinutes($duracion);

            // ✅ SALTAR si la franja está en el pasado (hoy)
            if ($dia->isToday() && $horaActual->lt(Carbon::parse($ahoraRedondeado))) {
                \Log::info("⏩ Franja {$horaActual->format('H:i')} - {$horaFin->format('H:i')} está en el pasado. Saltando.");
                $horaActual->addMinutes(15);
                continue;
            }

            \Log::info("⏱️ Evaluando franja: {$horaActual->format('H:i')} - {$horaFin->format('H:i')}");

            $interfiereConPausa = (
                ($horaActual->gte($inicioPausa) && $horaActual->lt($finPausa)) ||
                ($horaActual->lt($inicioPausa) && $horaFin->gt($inicioPausa))
            );

            $superaCierre = $horaFin->gt($finDia);

            if ($interfiereConPausa) {
                \Log::info("⚠️ Franja interfiere con la pausa. Saltando.");
                if ($horaActual->lt($finPausa)) {
                    $horaActual = $finPausa->copy();
                    \Log::info("➡️ Saltamos al final de la pausa: {$horaActual->format('H:i')}");
                } else {
                    $horaActual->addMinutes(15);
                }
                continue;
            }

            if ($superaCierre) {
                \Log::info("⚠️ Franja supera la hora de cierre. Saltando.");
                break;
            }

            foreach (Empleada::all() as $empleada) {
                $reservas = Reserva::where('empleada_id', $empleada->id)
                    ->whereDate('date_time', $diaStr)
                    ->when($idReservaEditar, function ($q) use ($idReservaEditar) {
                        $q->where('id', '!=', $idReservaEditar);
                    })
                    ->get();
                 \Log::info("id reserva evitar:{$idReservaEditar}");
                \Log::info("reervas que no es la reserva a evitar {$reservas} ");
                $disponible = true;
                foreach ($reservas as $reserva) {
                    $inicio = Carbon::parse($reserva->date_time);
                    $fin = (clone $inicio)->addMinutes($reserva->duration);
                    if ($horaActual->lt($fin) && $horaFin->gt($inicio)) {
                        \Log::info("⛔ No disponible para empleada ID {$empleada->id} entre {$inicio->format('H:i')} y {$fin->format('H:i')}");
                        $disponible = false;
                        break;
                    }
                }

                if ($disponible) {
                    $clave = $horaActual->format('Y-m-d H:i') . '|' . $horaFin->format('Y-m-d H:i');
                    if (!isset($franjas[$clave])) {
                        $franja = [
                            'inicio' => $horaActual->format('Y-m-d H:i'),
                            'fin' => $horaFin->format('Y-m-d H:i')
                        ];
                        $franjas[$clave] = $franja;
                        $sugerencias[] = $franja;
                        \Log::info("✅ Añadida franja disponible: {$franja['inicio']} - {$franja['fin']}");
                    }
                    break; // ya se encontró una empleada para esta franja
                }
            }

            $horaActual->addMinutes(15);
        }

        if (count($sugerencias) >= $maxSugerencias) {
            \Log::info("✅ Se alcanzó el máximo de sugerencias ({$maxSugerencias})");
            break;
        }
    }
    if (!empty($sugerencias)) {
        $sugerencias = array_slice(array_values($sugerencias), 0, $maxSugerencias);
        if ($soloDatos) {
            return $sugerencias;
        }
        $mensajeSecundario = '¡Buenas noticias! Hemos encontrado algunas opciones disponibles que podrían interesarte.';
        return response()->json([
            'disponible' => false,
            'mensaje' => 'Parece que esa hora ya está ocupada.',
            'mensajeSecundario' => trim($mensajeSecundario),
            'sugerencias' => $sugerencias
        ]);
    }

    \Log::info("❌ No se encontró ninguna sugerencia disponible en los próximos 7 días.");

    return response()->json([
        'disponible' => false,
        'mensaje' => 'No se encontró una hora disponible en los próximos 7 días.'
    ]);
}

public function ingresosMensualesPorAnioGrafica($anio = null)
{
    // Año actual si no se especifica
    $anio = $anio ?? Carbon::now()->year;

    // Obtener todos los recibos del año
    $recibos = Recibo::whereYear('fecha', $anio)->get();

    // Inicializamos los ingresos por mes
    $ingresosMensuales = array_fill(1, 12, 0);

    foreach ($recibos as $recibo) {
        $mes = Carbon::parse($recibo->fecha)->month;
        $ingresosMensuales[$mes] += $recibo->valor_bruto; // Ingreso real recibido
    }

    // Formato para Chart.js
    $labels = [];
    $data = [];

    foreach (range(1, 12) as $mes) {
        $labels[] = Carbon::create()->month($mes)->translatedFormat('F'); // Ej: Septiembre
        $data[] = $ingresosMensuales[$mes];
    }

    // Log opcional
    \Log::debug('Datos ingresos desde recibos:', [
        'labels' => $labels,
        'data' => $data
    ]);

    return response()->json([
        'labels' => $labels,
        'data' => $data
    ]);
}


public function marcarReservaComoPagada(Request $request)
{
    // Obtener el JSON como string
    $json = $request->input('reservaSeleccionadaNotPay');

    // Decodificarlo
    $data = json_decode($json, true);

    // Si es venta rápida
    if (!$data) {
        return response()->json([
            'pagadas' => true,
            'ventaRapida' => true
        ]);
    }

    // Crear un flag que indique si todas fueron pagadas correctamente
    $todoCorrecto = true;

    // Procesar si es una reserva simple
    if ($data['tipo'] === 'simple') {

        $id = $data['reservas'][0]['id'];
        $reservaBD = Reserva::find($id);

        if ($reservaBD) {
            $reservaBD->status_payment = 'Pagado';
            $reservaBD->save();

            // Verificar que realmente se guardó
            if ($reservaBD->status_payment !== 'Pagado') {
                $todoCorrecto = false;
            }
        } else {
            $todoCorrecto = false;
        }

    } else {
        // Varias reservas
        foreach ($data['reservas'] as $reservaData) {

            $reservaBD = Reserva::find($reservaData['id']);

            if ($reservaBD) {
                $reservaBD->status_payment = 'Pagado';
                $reservaBD->save();

                // Verificar guardado
                if ($reservaBD->status_payment !== 'Pagado') {
                    $todoCorrecto = false;
                }
            } else {
                $todoCorrecto = false;
            }
        }
    }

    return response()->json([
        'todocorrecto' => $todoCorrecto,
        'ventaRapida' => false
    ]);
}



//FUNCIÓN PARA OBTENER PAYMENTS PARA VISTA VENTA RÁPIDA/TRANSACCIONES
public function obtenerPyments()
{
    // $payments = Payment::orderBy('fecha', 'desc')->get();
    // $payments = Payment::with('recibo')->get(); // <-- Aquí estás cargando la relación
    //cargar relación
     $payments = Payment::with('recibo')
        ->orderBy('fecha', 'desc')
        ->get();
    return response()->json($payments);
}

public function obtenerRecibos(Request $request)
{
    $idReciboShow = $request->input('id_recibo_show');

    // Cargar el recibo con cliente y pagos
    $recibo = Recibo::with(['cliente', 'payments'])->find($idReciboShow);

    if (!$recibo) {
        return response()->json(['error' => 'Recibo no encontrado'], 404);
    }

    // Determinar si es venta rápida o con reserva
    if (is_null($recibo->id_reserva)) {
        // Venta rápida
        $servicios = $recibo->detallesVentasRapidas()
                            ->with(['servicio', 'empleado'])
                            ->get();
    } else {
        // Con reserva
        $servicios = $recibo->serviciosVendidos()
                            ->with(['servicio', 'empleado'])
                            ->get();
    }
    $recibo->fecha_formateada = \Carbon\Carbon::parse($recibo->fecha)->locale('es')->isoFormat('D MMM YYYY');
    // Resultado: "11 sep. 2025"
    foreach ($recibo->payments as $payment) {
      $payment->fecha_formateada2 = \Carbon\Carbon::parse($payment->fecha)
    ->format('d/m/Y, H:i');
    }
    //resultado;"14/09/2025, 19:55"
    return response()->json([
        'recibo' => $recibo,
        'cliente' => $recibo->cliente,
        'servicios' => $servicios,
        'pagos' => $recibo->payments, // Aquí agregamos los métodos de pago
        'fecha_formateada' => $recibo->fecha_formateada
    ]);

}

//FUNCION DEVUELVE RESERVAS PENDIENTE DE PAGO
public function reservEndNoPay()
{
   $reservas = Reserva::with(['servicio', 'user', 'reservaServicio', 'empleada'])// carga la relación servicio
        ->where('status_payment', 'Pendiente')
        ->where('status', 'Finalizada')
        ->orderBy('date_time', 'desc')
        ->get();

    $ahora = Carbon::now();
    $hoy = $ahora->copy()->startOfDay();
    $ayer = Carbon::yesterday()->startOfDay();

    $agrupadas = [
        'hoy' => [],
        'ayer' => [],
        'otros' => []
    ];

    foreach ($reservas as $reserva) {
        $fechaHoraReserva = Carbon::parse($reserva->date_time);
        $soloFecha = $fechaHoraReserva->copy()->startOfDay();

        if ($soloFecha->equalTo($hoy) && $fechaHoraReserva->lessThanOrEqualTo($ahora)) {
            $agrupadas['hoy'][] = $reserva;
        } elseif ($soloFecha->equalTo($ayer)) {
            $agrupadas['ayer'][] = $reserva;
        } else {
            $agrupadas['otros'][] = $reserva;
        }
    }

    return response()->json($agrupadas);
}

public function reservFutureNoPay(){
     $ahora = Carbon::now();
    $hoy = $ahora->copy()->startOfDay();
    $maniana = $ahora->copy()->addDay()->startOfDay();
    $finManiana = $maniana->copy()->endOfDay();

    $reservas = Reserva::with(['servicio', 'user', 'reservaServicio', 'empleada']) // Carga relaciones
        ->where('status_payment', 'Pendiente')
        ->whereIn('status', ['pending', 'confirmed', 'completada', 'no_asistida', 'Finalizada'])
        ->where('date_time', '>', now()) // ⏱ solo futuras
        ->orderBy('date_time', 'desc')
        ->get();
    $agrupadas = [
        'hoy' => [],
        'maniana' => [],
        'otros' => []
    ];

    foreach ($reservas as $reserva) {
        $fechaHora = Carbon::parse($reserva->date_time);
        $soloFecha = $fechaHora->copy()->startOfDay();

        if ($soloFecha->equalTo($hoy)) {
            $agrupadas['hoy'][] = $reserva;
        } elseif ($soloFecha->equalTo($maniana)) {
            $agrupadas['maniana'][] = $reserva;
        } else {
            $agrupadas['otros'][] = $reserva;
        }
    }

    return response()->json($agrupadas);
}

//FUNCION QUE DEVUELVE CITAS PROXIMAS Y PASADAS
public function actualizarCitasProximasyPasadas($path = null){
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

    $citasProximas1 = $citasAgrupadasProximas->map(function ($grupo) {
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

    $citasPasadas1 = $citasAgrupadasTerminadas->map(function ($grupo) {
        $primeraCita = $grupo->first();
        $numeroServicios = $grupo->count();
        $precioTotal = $grupo->sum(fn($cita) => $cita->servicio->precio);

        $primeraCita->numero_servicios = $numeroServicios;
        $primeraCita->precio_total = $precioTotal;

        return $primeraCita;
    })->values();
    return response()->json([
        'proximas' => $citasProximas1,
        'pasadas' => $citasPasadas1,
    ]);
}
/**
 * 'pending','confirmed','completada','no_asistida','Finalizada'
*/

//obtener historial de cambios de reservas por id
function obtenerHistorialCambiosReservasById($reservaId){
    // Obtener historial de reserva simple o múltiple
    $historial = ReservaHistorial::where('reserva_id', $reservaId)
        ->orWhere('booking_group_id', $reservaId)
        ->orderBy('created_at', 'asc')
        ->get();

    return response()->json($historial);
}

// //obtener historial de cambios de reservas por id
// function obtenerHistorialCambiosReservas(){
//     // Obtener historial de reserva simple o múltiple
//         $historialCompleto = ReservaHistorial::with([
//             'responsable',      // quien hizo el cambio (admin)
//             'reserva',      // usuario dueño de la reserva
//             'reserva.servicio',
//             'reservaServicio'
//         ])
//         ->orderBy('created_at', 'asc')
//         ->get();
//     // dd($historialCompleto);
//     return response()->json($historialCompleto);
// }

function obtenerHistorialCambiosReservas(){

    $historialCompleto = ReservaHistorial::withTrashed() // 👈 IMPORTANTE
        ->with([
            'responsable',
            'reserva' => function($query){
                $query->withTrashed(); // 👈 también para reservas eliminadas
            },
            'reserva.user',
            'reserva.servicio',
            'reservaServicio' => function($query){
                $query->withTrashed(); // 👈 si también usa SoftDeletes
            }
        ])
        ->orderBy('created_at', 'asc')
        ->get();

    return response()->json($historialCompleto);
}


//obtener historial de cambios de reservas por id
function obtenerHistorialCambiosReservasVista(){
    // Obtener historial de reserva simple o múltiple
    $historial = ReservaHistorial::orderBy('created_at', 'desc')->get();
    // dd($historialCompleto);
     return view('components.panel-admin-administrator.historial.historial-modificacion-reserva', compact('historial'));
}
}
