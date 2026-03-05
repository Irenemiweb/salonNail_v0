<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Reserva;


class AvisoCitaMañana extends Mailable
{
    use Queueable, SerializesModels;

    public $reservas;
    public $status;

    public function __construct($reservas, $status)
    {
        $this->reservas = $reservas;
        $this->status = $status;
    }

    public function build()
    {
        return $this->subject('Recordatorio de cita en África Nail Art Studio')
                    ->view('emails.aviso-cita');
    }
}
