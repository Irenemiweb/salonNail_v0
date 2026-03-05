<?php

namespace App\Traits;

use App\Models\ReservaHistorial;
use Illuminate\Support\Facades\Auth;
use App\Models\ReservaServicio;
use Illuminate\Support\Str;

trait ReservaAuditable
{
    protected static $currentOperationUuid = null;
    public static function bootReservaAuditable()
    {
        // ================= CREAR =================
        static::created(function ($model) {
            self::logHistorial($model, 'creada');
        });

        // ================= UPDATE =================
        // static::updating(function ($model) {
        //     self::logHistorial($model, 'modificada');
        // });
        static::updated(function ($model) {
            self::logHistorial($model, 'modificada');
        });

        // ================= DELETE =================
        static::deleted(function ($model) {
            self::logHistorial($model, 'eliminada');
        });
    }

    private static function logHistorial($model, $accion)
    {
        try {
            if (!self::$currentOperationUuid) {
                self::$currentOperationUuid = (string) Str::uuid();
            }

            $operationUuid = self::$currentOperationUuid;
            // 🧹 CAMPOS BASURA QUE NO QUEREMOS AUDITAR
            $ignore = [
                'created_at',
                'updated_at',
                'comprobada',
                'duration',
            ];

            //añadimos el campo totalPagar
            $totalPagar = null;

            if ($model->multiple) {

                $grupo = \App\Models\ReservaServicio::find($model->multiple);
                $totalPagar = $grupo?->total_payment;

            } else {
                // opcional: precio individual
                $totalPagar = $model->servicio->precio?? null;
            }

            // Grupo reserva (multiple o simple)
            // $bookingGroupId = $model->multiple ?? $model->id;
            $bookingGroupId = $model->multiple ?? null;

            // ===============================
            // 📌 IDS RESERVAS INVOLUCRADAS
            // ===============================
            if ($model->multiple) {

                $idsReservas = \App\Models\Reserva::withTrashed()
                    ->where('multiple', $model->multiple)
                    ->pluck('id')
                    ->toArray();

            } else {

                $idsReservas = [$model->id];
            }

            // ===============================
            // 📌 BUSCAR GRUPO HISTÓRICO POR JSON
            // ===============================

            // dd(
            //     ReservaServicio::withTrashed()
            //         ->whereRaw(
            //             "JSON_SEARCH(reservas_vinculadas, 'one', ?) IS NOT NULL",
            //             [(string)  $model->id]
            //         )
            //         ->get(['id','reservas_vinculadas'])
            // );
            // return;
            // $allBookingGroupIds = ReservaServicio::withTrashed()
            //     ->whereJsonContains('reservas_vinculadas', $model->id)
            //     ->pluck('id')
            //     ->map(fn($id) =>  $id)
            //     ->toArray();


            // dd($allBookingGroupIds);
            // Quitar timestamps
            $antes = array_diff_key($model->getOriginal(), array_flip(['created_at', 'updated_at']));
            $despues = array_diff_key($model->getDirty(), array_flip(['created_at', 'updated_at']));

            // Si no hay cambios reales en update → no loguear
            if ($accion === 'modificada' && empty($despues)) {
                return;
            }

            // En create, despues = atributos completos
            if ($accion === 'creada') {
                $antes = [];
                $despues = $model->getAttributes();
            }

            $cambios = [
                'antes'   => $antes,
                'despues' => $despues
            ];

           $reservaHistorial = ReservaHistorial::create([
                'operation_uuid'        => $operationUuid,
                'booking_group_id'      => $bookingGroupId,
                'reserva_id'            => $model->id,
                'reserva_servicio_id'   => $model->multiple,
                'accion'                => $accion,
                'cambios'               => $cambios,
                'total_pagar'           => $totalPagar,
                'ids_reservas'          => $idsReservas,
                'responsable_tipo'      => \Auth::check() ? 'admin' : 'sistema',
                'responsable_id'        => \Auth::id(),
                'ip'                    => request()->ip(),
                'user_agent'            => request()->userAgent(),
                'alls_booking_group_id' => null,
            ]);

            $relatedBookingGroupIds = ReservaHistorial::whereRaw(
                    "JSON_SEARCH(ids_reservas, 'one', ?) IS NOT NULL",
                    [(string) $model->id]
                )
                ->pluck('booking_group_id')
                ->filter()
                ->unique()
                ->values()
                ->toArray();

            $idsReservasActivas='';
            if ($model->multiple) {
                $idsReservasActivas = \App\Models\Reserva::where('multiple', $model->multiple)
                ->pluck('id')
                ->toArray();
            }else{
                $idsReservasActivas = [$model->id];
            }
             $reservaHistorial->update([
                'alls_booking_group_id' => $relatedBookingGroupIds,
                'ids_reservas_activas'  => $idsReservasActivas
            ]);

            // dd($relatedBookingGroupIds);

        } catch (\Throwable $e) {
            \Log::error("ERROR HISTORIAL RESERVA: ".$e->getMessage());
        }
    }
}
