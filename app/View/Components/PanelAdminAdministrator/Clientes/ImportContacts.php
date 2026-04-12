<?php

namespace App\View\Components\PanelAdminAdministrator\Clientes;

use Illuminate\View\Component;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\User;

class ImportContacts extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
         $clientes = User::orderBy('name', 'asc')      // Ordena por 'name' en orden ascendente
        ->orderBy('primer_apellido', 'asc')       // Luego, ordena por 'primer_apellido' en orden ascendente
        ->get();
        if ($clientes->isEmpty()) {
            $iniciales = collect();
        } else {
            $iniciales = $clientes->map(function($cliente) {
                $primerApellido = explode(' ', trim($cliente->primer_apellido))[0];

                return mb_strtoupper(mb_substr($cliente->name, 0, 1, 'UTF-8'), 'UTF-8')
                    . mb_strtoupper(mb_substr($primerApellido, 0, 1, 'UTF-8'), 'UTF-8');
            });
        }
        // $clientes = collect(); // lo vacías aquí
        // $iniciales = collect();
        // $url = url('/import-contactos');
        $url = url('/admin/dashboard/Clientes_administrator#exportar');
         $qr = QrCode::size(130)->generate($url);
        return view('components.panel-admin-administrator.clientes.import-contacts',compact('qr', 'iniciales', 'clientes'));
    }
}
