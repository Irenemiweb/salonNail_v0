<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Reserva;
use App\Models\Servicio;
use App\Models\User;
use App\Models\DatosNegocio;

class ReservaConfirmadaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reservas;
    public $latitud;
    public $longitud;
    public $direccionMaps;

    public function __construct($reservas)
    {
        // Asegurarse de que siempre sea una colección de reservas
        $this->reservas = collect(is_array($reservas) ? $reservas : [$reservas]);
        $negocio = DatosNegocio::first();

        $this->latitud = $negocio ? $negocio->latitud : null;
        $this->longitud = $negocio ? $negocio->longitud : null;
        $this->direccionMaps = $negocio->direccion_completa;
    }

    public function build()
    {
        return $this->subject('Confirmación de tu reserva')
                    ->view('emails.reserva_confirmada');
    }
}
