<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Chatify\Facades\ChatifyMessenger as Chatify;
use Illuminate\Support\Facades\Auth;
use App\Models\TemporaryImageNewService;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class AdminController extends Controller
{
    public $valuesMap;
    public $colorOptions;
    public function __construct()
    {
        $this->valuesMap = [
            'user' => ['User_administrator', 'tab_administrator_button', 'admin/dashboard/User'],
            'ventas' => ['Ventas_administrator', 'tab_administrator_ventas', 'admin/dashboard/Ventas_administrator'],
            'citas' => ['Citas_administrator', 'tab_administrator_citas', 'admin/dashboard/Citas_administrator'],
            'message' => ['Mensajes_administrator', 'tab_administrator_message', 'admin/dashboard/Mensajes_administrator'],
            'estatistic' => ['Estatistic_administrator', 'tab_administrator_estatistic', 'admin/dashboard/Estatistic_administrator'],
            'inventario' => ['Inventario_administrator', 'tab_administrator_inventario', 'admin/dashboard/Inventario'],
            'empleados' => ['Empleados_administrator', 'tab_administrator_empleados', 'admin/dashboard/Empleados'],
            'tarjetabono' => ['Tarjeta-bono_administrator', 'tab_administrator_tarjetaBono', 'admin/dashboard/Tarjeta-bono'],
            'perfilNegocio' => ['Perfil-negocio_administrator', 'tab_administrator_perfilNegocio', 'admin/dashboard/Perfil-negocio'],
            'clientes' => ['Clientes_administrator', 'tab_administrator_clientes', 'admin/dashboard/Clientes_administrator'],
            'configuracion' => ['Configuracion_administrator', 'tab_administrator_configuracion', 'admin/dashboard/Configuracion_administrator'],
            'configuracion_createService' => ['Configuracion_administrator', 'tab_administrator_configuracion', 'admin/dashboard/Configuracion_createService'],
            'configuracion_showAllservice' => ['Configuracion_administrator', 'tab_administrator_configuracion', 'admin/dashboard/Configuracion_showAllServices'],
        ];

        $this->colorOptions = [
            'yellow' => 'Yellow',
            'blue' => 'Blue',
            'navy_blue' => 'Navy Blue',
            'beige' => 'Beige',
            'white' => 'White',
            'coral' => 'Coral',
            'gold' => 'Gold',
            'gray' => 'Gray',
            'space_gray' => 'Space Gray',
            'lilac' => 'Lilac',
            'brown' => 'Brown',
            'orange' => 'Orange',
            'black' => 'Black',
            'rose_gold' => 'Rose Gold',
            'silver' => 'Silver',
            'red' => 'Red',
            'pink' => 'Pink',
            'green' => 'Green',
            'night_green' => 'Night Green',
            'violet' => 'Violet',
            'multicolor' => 'Multicolor',
            'other' => 'Other'
        ];
    }
    public function dashboard()
    {
        $messenger_color = Auth::user()->messenger_color;

        $users = User::where('id', '!=', auth()->user()->id)->get();
        return view('components.panel-admin-administrator.administrator', [

            'users' => $users,
            'valuesMap' => $this->valuesMap,
            'id' => $id ?? 0,
            'messengerColor' => $messenger_color ? $messenger_color : Chatify::getFallbackColor(),
            'dark_mode' => Auth::user()->dark_mode < 1 ? 'light' : 'dark',
            'datosReservas' => null,
             'porcentajeReservas' => null
        ]);
    }

    public function dashboard_userNormal()
    {
        $messenger_color = Auth::user()->messenger_color;

        $users = User::where('id', '!=', auth()->user()->id)->get();
        return view('components.panel-admin.panel-admin', [

            'users' => $users,
            'valuesMap' => $this->valuesMap,
            'id' => $id ?? 0,
            'messengerColor' => $messenger_color ? $messenger_color : Chatify::getFallbackColor(),
            'dark_mode' => Auth::user()->dark_mode < 1 ? 'light' : 'dark',
            'datosReservas' => null,
             'porcentajeReservas' => null
        ]);
    }

    private function loadAdminPanelView($value, $id = null, $showDiv = null, $datosReservas = null, $porcentajes = null)
    {
        $messenger_color = Auth::user()->messenger_color;
        $executeJavaScript = true;
        $executeCalendar = true;
        // $datosReservas = "hola";
        return view('components.panel-admin-administrator.administrator', [
            'executeCalendar' => $executeCalendar,
            'executeJavaScript' => $executeJavaScript,
            'value' => $value,
            'valuesMap' => $this->valuesMap,
            'id' => $id ?? 0,
            'messengerColor' => $messenger_color ? $messenger_color : Chatify::getFallbackColor(),
            'dark_mode' => Auth::user()->dark_mode < 1 ? 'light' : 'dark',
            'colorOptions' => $this->colorOptions,
            'sowDiv' => $showDiv,
            'datosReservas' =>$datosReservas,
            'porcentajeReservas' => $porcentajes
        ]);
    }
    public function panelAdministrator_Ventas($id = null)
    {
        return $this->loadAdminPanelView('ventas', $id);
    }

    public function panelAdministrator_Citas($id = null)
    {
        return $this->loadAdminPanelView('citas', $id);
    }

    public function panelAdministrator_Mensajes($id = null)
    {

        return $this->loadAdminPanelView('message', $id);
    }
    public function obtenerDatosGraficaReservas(){
        // Agrupar reservas por mes del año actual
        $reservasPorMes = DB::table('reservas')
            ->select(
                DB::raw('MONTH(date_time) as mes'),
                DB::raw('COUNT(*) as total')
            )
            ->whereYear('date_time', date('Y')) // Solo reservas del año actual
            ->groupBy(DB::raw('MONTH(date_time)'))
            ->pluck('total', 'mes') // obtenemos un array con mes => total
            ->toArray();

        // Inicializamos los 12 meses en 0
        $datosReservas = [];
        for ($i = 1; $i <= 12; $i++) {
            $datosReservas[] = $reservasPorMes[$i] ?? 0;
        }
         return response()->json($datosReservas); // ✅ Devuelve como JSON
    }

    public function panelAdministrator_Estatistics($id = null)
    {
        // Agrupar reservas por mes del año actual
        $reservasPorMes = DB::table('reservas')
            ->select(
                DB::raw('MONTH(date_time) as mes'),
                DB::raw('COUNT(*) as total')
            )
            ->whereYear('date_time', date('Y')) // Solo reservas del año actual
            ->groupBy(DB::raw('MONTH(date_time)'))
            ->pluck('total', 'mes') // obtenemos un array con mes => total
            ->toArray();

        // Inicializamos los 12 meses en 0
        $datosReservas = [];
        for ($i = 1; $i <= 12; $i++) {
            $datosReservas[] = $reservasPorMes[$i] ?? 0;
        }

        //PORCENTAJE DEE TIEMPO RESERVADO
         $year = now()->year;
        $minutosDisponiblesPorMes = array_fill(0, 12, 0);
        $minutosReservadosPorMes = array_fill(0, 12, 0);

        // Calcula los minutos disponibles por mes (según calendario)
        $inicio = Carbon::create($year, 1, 1);
        $fin = Carbon::create($year, 12, 31);
        $periodo = CarbonPeriod::create($inicio, $fin);

        foreach ($periodo as $dia) {
            $mesIndex = $dia->month - 1;

            if ($dia->isWeekday()) {
                $minutosDisponiblesPorMes[$mesIndex] += 600; // Lunes a viernes
            } elseif ($dia->isSaturday()) {
                $minutosDisponiblesPorMes[$mesIndex] += 300; // Sábado
            }
            // Domingo cerrado → no sumamos
        }

        // Consulta minutos reservados por mes
        $reservas = \App\Models\Reserva::selectRaw('MONTH(date_time) as mes, SUM(duration) as minutosReservados')
            ->whereYear('date_time', $year)
            ->groupBy('mes')
            ->pluck('minutosReservados', 'mes');

        foreach ($reservas as $mes => $minutos) {
            $minutosReservadosPorMes[$mes - 1] = $minutos;
        }

        // Calcular porcentajes
        $porcentajes = [];
        for ($i = 0; $i < 12; $i++) {
            $disponibles = $minutosDisponiblesPorMes[$i];
            $reservados = $minutosReservadosPorMes[$i];

            $porcentaje = ($disponibles > 0) ? round(($reservados / $disponibles) * 100) : 0;
            $porcentajes[$i] = min(100, $porcentaje); // Limita al 100%
        }

        // dd($porcentajes);
        return $this->loadAdminPanelView('estatistic', $id, null, $datosReservas, $porcentajes);
    }

    public function panelAdministrator_Inventario($id = null)
    {
        return $this->loadAdminPanelView('inventario', $id);
    }

    public function panelAdministrator_Empleados($id = null)
    {
        return $this->loadAdminPanelView('empleados', $id);
    }

    public function panelAdministrator_Tarjeta_bono($id = null)
    {
        return $this->loadAdminPanelView('tarjetabono', $id);
    }

    public function panelAdministrator_Perfil_negocio($id = null)
    {
        return $this->loadAdminPanelView('perfilNegocio', $id);
    }

    public function panelAdministrator_Clientes($id = null)
    {
        return $this->loadAdminPanelView('clientes', $id);
    }

    public function panelAdministrator_Configuracion($id = null)
    {
        return $this->loadAdminPanelView('configuracion', $id);
    }
    public function panelAdministrator_ConfiguracionShowAllServices($id = null)
    {

        return $this->loadAdminPanelView('configuracion_showAllservice', $id);
    }
    public function panelAdministrator_createService($id = null)
    {
        $idUser = auth()->id();
        $temporaryImages = TemporaryImageNewService::where('id_user', $idUser)->get(); // Usar ->get() para obtener todos

        if($temporaryImages->isNotEmpty()) { // Verificar si hay imágenes temporales
            foreach ($temporaryImages as $temporaryImage) {
                // Eliminar el directorio de cada imagen temporal
                Storage::deleteDirectory('imagesServices_/tmp/' . $temporaryImage->folder);
                $temporaryImage->delete(); // Eliminar el registro de la base de datos
            }
        }
        return $this->loadAdminPanelView('configuracion_createService', $id);
    }

    public function obtenerPorcentajesHorasReservas(){
      //PORCENTAJE DEl TIEMPO RESERVADO
        $year = now()->year;
        $minutosDisponiblesPorMes = array_fill(0, 12, 0);
        $minutosReservadosPorMes = array_fill(0, 12, 0);

        // Calcula los minutos disponibles por mes (según calendario)
        $inicio = Carbon::create($year, 1, 1);
        $fin = Carbon::create($year, 12, 31);
        $periodo = CarbonPeriod::create($inicio, $fin);

        foreach ($periodo as $dia) {
            $mesIndex = $dia->month - 1;

            if ($dia->isWeekday()) {
                $minutosDisponiblesPorMes[$mesIndex] += 600; // Lunes a viernes
            } elseif ($dia->isSaturday()) {
                $minutosDisponiblesPorMes[$mesIndex] += 300; // Sábado
            }
            // Domingo cerrado → no sumamos
        }

        // Consulta minutos reservados por mes
        $reservas = \App\Models\Reserva::selectRaw('MONTH(date_time) as mes, SUM(duration) as minutosReservados')
            ->whereYear('date_time', $year)
            ->groupBy('mes')
            ->pluck('minutosReservados', 'mes');

        foreach ($reservas as $mes => $minutos) {
            $minutosReservadosPorMes[$mes - 1] = $minutos;
        }

        // Calcular porcentajes
        $porcentajes = [];
        for ($i = 0; $i < 12; $i++) {
            $disponibles = $minutosDisponiblesPorMes[$i];
            $reservados = $minutosReservadosPorMes[$i];

            $porcentaje = ($disponibles > 0) ? round(($reservados / $disponibles) * 100) : 0;
            $porcentajes[$i] = min(100, $porcentaje); // Limita al 100%
        }
        return response()->json($porcentajes); // ✅ Devuelve como JSON
    }

    //actualizar información perfil usuario
public function updateUserInformation(Request $request)
{
    $user = auth()->user();

    // Validación
    $validated = $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'photo' => 'nullable|image|max:2048',
    ]);

    $user->name = $validated['name'];
    $user->email = $validated['email'];

    if ($request->hasFile('photo')) {

        // Ruta completa de storage dentro de htdocs
        $storagePath = $_SERVER['DOCUMENT_ROOT'] . '/storage/profile-photos/';

        // Crear la carpeta si no existe
        if (!file_exists($storagePath)) {
            mkdir($storagePath, 0755, true);
        }

        // Eliminar foto anterior si existe
        if ($user->profile_photo_path && file_exists($_SERVER['DOCUMENT_ROOT'] . '/' . $user->profile_photo_path)) {
            unlink($_SERVER['DOCUMENT_ROOT'] . '/' . $user->profile_photo_path);
        }

        // Guardar nueva foto
        $file = $request->file('photo');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move($storagePath, $filename);

        // Guardar ruta relativa en la base de datos
        $user->profile_photo_path = 'profile-photos/' . $filename;
    }

    $user->save();

    // URL completa de la foto
    $photoUrl = $user->profile_photo_path ? url($user->profile_photo_path) : null;

    return response()->json([
        "message" => "Información actualizada correctamente",
        "photo_url" => $photoUrl
    ]);
}


}
