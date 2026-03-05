<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reserva;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Mail\AvisoCitaMañana;
use App\Models\User;
use App\Models\MensajeEnviado;

class FinalizarReservasCommand extends Command
{
    /**
     * El nombre y firma del comando.
     */
    protected $signature = 'reservas:finalizar';

    /**
     * La descripción del comando.
     */
    protected $description = 'Finaliza automáticamente las reservas cuya fecha ya ha pasado';

    /**
     * Lógica principal del comando.
     */
    public function handle()
    {
        Log::channel('cron')->info('🔁 Iniciando comando reservas:finalizar');

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

        $this->info("Proceso completado. Total finalizadas: {$total}");
        Log::channel('cron')->info("🏁 Proceso completado. Total finalizadas: {$total}");
    }
}
