<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserva;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\AvisoCitaMañana;
use App\Models\User;
use App\Models\MensajeEnviado;

class CronController extends Controller
{
    public function finalizarReservas($path = null)
    {
        //  \Log::debug('Entrando');
        // if ($token !== env('CRON_SECRET')) {
        //     abort(403, 'No autorizado');
        // }

        $estadosPermitidos = ['pending', 'confirmed', 'pagada'];

        // Obtener reservas que vamos a actualizar
        $reservasParaFinalizar = Reserva::where('date_time', '<', now())
            ->whereIn('status', $estadosPermitidos)
            ->get();

        $total = $reservasParaFinalizar->count();

        if ($total === 0) {
            return response()->json([
                'mensaje' => 'No había reservas pendientes para finalizar.',
                'actualizadas' => 0
            ]);
        }

        // Actualizar el status a "finalizada"
        Reserva::whereIn('id', $reservasParaFinalizar->pluck('id'))->update(['status' => 'finalizada']);
        //cambiamos el estado de confirmación de modificacion
        Reserva::whereIn('id', $reservasParaFinalizar->pluck('id'))->update(['cliente_confirmo_modificacion' => 'confirmado']);

        // Registrar detalles en log personalizado
        foreach ($reservasParaFinalizar as $reserva) {
            $datos = [
                'reserva_id' => $reserva->id,
                'cliente_id' => $reserva->user_id ?? 'N/A',
                'fecha' => $reserva->date_time,
                'estado_anterior' => $reserva->status,
                // Puedes agregar más datos aquí
            ];
            \Log::channel('reservasFinalizadas')->info('Reserva finalizada:', $datos);
        }

        return response()->json([
            'mensaje' => "Se actualizaron $total reservas a finalizadas.",
            'actualizadas' => $total
        ]);
    }

    //avisar al usuario que mañana tiene una cita
    public function avisarReservasProximas($path = null){
        //  \Log::channel('reservasProximas')->info('Entrando avisaReservasProximas');

        $maniana = now()->addDay()->startOfDay();
        $finManiana = $maniana->copy()->endOfDay();

        // \Log::channel('reservasProximas')->info('now():', ['now' => now()]);
        // \Log::channel('reservasProximas')->info('fecha mañana y fin mañana', [
        //     'mañana' => $maniana,
        //     'fin mañana' => $finManiana,
        // ]);

        $reservas = Reserva::whereBetween('date_time', [$maniana, $finManiana])
            ->whereIn('status', ['pending', 'confirmed', 'pagada'])
            ->get();

        // \Log::channel('reservasProximas')->info('Reservas encontradas', [
        //     'total' => $reservas->count()
        // ]);

        $enviadas = [];

    foreach ($reservas as $reserva) {
        // Evitar duplicado si ya se trató este grupo múltiple
        if ($reserva->multiple && in_array($reserva->multiple, $enviadas)) {
            continue;
        }

        // Agrupar reservas múltiples o individuales
        if ($reserva->multiple) {
            $grupoReservas = Reserva::where('multiple', $reserva->multiple)
                ->whereIn('status', ['pending', 'confirmed', 'pagada'])
                ->get();
            $enviadas[] = $reserva->multiple;
        } else {
            $grupoReservas = collect([$reserva]);
        }

        $reservaPrincipal = $grupoReservas->first();
        $user = $reservaPrincipal->user;

        if (!$user || !$user->email) {
            continue;
        }

        // Verificar si ya se envió el mensaje
        $yaEnviado = MensajeEnviado::where('id_usuario', $user->id)
            ->where('tipo_mensaje', 'recordatorio')
            ->where('id_reserva', $reservaPrincipal->id) // usa la principal del grupo
            ->exists();

        if ($yaEnviado) {
            // \Log::channel('reservasProximas')->info('Recordatorio ya enviado, se omite', [
            //     'reserva_id' => $reservaPrincipal->id,
            //     'usuario_id' => $user->id,
            // ]);
            continue;
        }

        // Crear el mailable
        $mail = new AvisoCitaMañana($grupoReservas, $reservaPrincipal->status);

        // Renderizar el contenido (HTML)
        $contenido = $mail->render();

        // Enviar el correo
        Mail::to($user->email)->send($mail);

        // Registrar en la tabla
        MensajeEnviado::create([
            'id_reserva'   => $reservaPrincipal->id,
            'id_usuario'   => $user->id,
            'tipo_mensaje' => 'recordatorio',
            'canal'        => 'email',
            'contenido'    => $contenido,
            'enviado_en'   => now(),
        ]);

        \Log::channel('reservasProximas')->info('Recordatorio enviado', [
            'reserva_ids' => $grupoReservas->pluck('id'),
            'usuario_id' => $user->id,
        ]);
    }

    return response()->json([
        'mensaje' => 'Se procesaron los recordatorios de citas para mañana.',
        'total' => $reservas->count()
    ]);
    }
}
