<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PanelAdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TecnologiaelectronicamodeloController;
use App\Http\Controllers\ReservaServicioController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\CreateNewServiceController;
use App\Http\Controllers\UploadTemporaryImageNewServiceController;
use App\Http\Controllers\DeleteTemporaryImageNewServiceController;
use App\Http\Controllers\DeleteAllTemporaryImagesController;
use App\Http\Controllers\PushNotificationController;
use App\Models\Reserva;
use App\Http\Controllers\CronController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\Cliente;
use Illuminate\Http\Request;

//ruta de prueva para saber si utiliza la key de .env
Route::get('/check-key', function () {
    return config('app.key');
});

//ruta para importar contactos desde csv
Route::post('admin/dashboard/api/clientes/import-csv', function (Request $request) {

    $request->validate([
        'csv' => 'required|file|mimes:csv,txt',
    ]);

    $file = $request->file('csv');

    // Detectar separador automáticamente
    $firstLine = fgets(fopen($file->getRealPath(), 'r'));
    $delimiter = substr_count($firstLine, ';') > substr_count($firstLine, ',') ? ';' : ',';

    // Leer CSV
    $rows = array_map(function ($line) use ($delimiter) {
        return str_getcsv($line, $delimiter);
    }, file($file->getRealPath()));

    $rows = array_filter($rows);

    // Headers normalizados
    $headers = array_map(function ($header) {
        return strtolower(trim($header));
    }, array_shift($rows));

    $importados = 0;
    $saltados = 0;

    foreach ($rows as $index => $row) {

        if (count($headers) !== count($row)) {
            $saltados++;
            continue;
        }

        $data = array_combine($headers, $row);

        // 🔥 DETECCIÓN UNIVERSAL DE CAMPOS

        $telefono =
            $data['phone 1 - value'] ??
            $data['phone 2 - value'] ??
            $data['mobile'] ??
            $data['telefono'] ??
            $data['phone'] ??
            null;

        $nombre =
            $data['first name'] ??
            $data['given name'] ??
            $data['nombre'] ??
            $data['name'] ??
            '';

        $apellidos =
            $data['last name'] ??
            $data['family name'] ??
            $data['apellidos'] ??
            '';

        $email =
            $data['e-mail 1 - value'] ??
            $data['email'] ??
            null;

        $empresa =
            $data['organization name'] ??
            $data['company'] ??
            $data['empresa'] ??
            null;

        // Limpiar teléfono (solo números)
        if ($telefono) {
            $telefono = preg_replace('/\D+/', '', $telefono);
        }

        if (empty($telefono)) {
            $saltados++;
            continue;
        }

       Cliente::updateOrCreate(
            ['telefono' => $telefono],
            [
                'nombre' => $nombre,
                'apellidos' => $apellidos,
                'email' => !empty($email) ? $email : null,
                'empresa' => $empresa,
            ]
        );

        $importados++;
    }

    return response()->json([
        'success' => true,
        'importados' => $importados,
        'saltados' => $saltados
    ]);
});

//importar contactos desde el móvil
Route::post('/clientes/import-contactos', function (Request $request) {
    $contactos = $request->input('contactos', []);

    // <<< Aquí ponemos el log para depurar
    Log::info('Contactos recibidos:', $contactos);

    foreach ($contactos as $c) {
        $nombre = $c['name'][0] ?? 'Sin nombre';
	$telefono = $c['tel'][0] ?? null;
	$email = $c['email'][0] ?? null;

        if ($telefono) {
            Cliente::updateOrCreate(
                ['telefono' => $telefono],
                ['nombre' => $nombre, 'email' => $email]
            );
        }
    }

    return response()->json(['success' => true]);
});


//ruta para que valla a login desde admin dashboard/
Route::get('admin/dashboard/login', function () {
    return redirect('login');
});
//ruta para que valla a login desde admin
Route::get('/', function () {
    return redirect('login');
});

//ACTUALIZAR INFO USUARIO
Route::post('admin/dashboard/User_administrator', [AdminController::class, 'updateUserInformation'])->name('update.infoAdministratorUser');
Route::post('panel/User', [AdminController::class, 'updateUserInformation'])->name('update.infoUser');

//OBTENER HISTORIAL DE MODIFICACIONES DE RESERVAS
Route::post('admin/dashboard/historial.modificacion.reserva', [ReservaServicioController::class, 'obtenerHistorialCambiosReservas']);

//MOSTRAR DETALLES RECIBOS
Route::post('admin/dashboard/showRecivoDetails', [ReservaServicioController::class, 'obtenerRecibos']);

//OBTENER RESERVAS FINALIZADAS PENDIENTES DE PAGO
Route::get('admin/dashboard/reserv-end-noPay', [ReservaServicioController::class, 'reservEndNoPay']);

//OBTENER RESERVAS futuras PENDIENTES DE PAGO
Route::get('admin/dashboard/reserv-future-noPay', [ReservaServicioController::class, 'reservFutureNoPay']);

//OBTENER PAYMENTS VENTA RÁPIDA
Route::get('admin/dashboard/payments', [ReservaServicioController::class, 'obtenerPyments']);

//OBTENER GRAFICA PORCENTAJE TIEMPO RESERVADO
Route::post('admin/dashboard/porcentajesTiempo-reservas', [AdminController::class, 'obtenerPorcentajesHorasReservas']);
//OBTENER DATOS TOTAL RESERVAS PARA GRAFICA
Route::post('admin/dashboard/obtenerDatos-graficaReservas', [AdminController::class, 'obtenerDatosGraficaReservas']);
//OBTENER DATOS TOTAL RESERVAS PARA GRAFICA
Route::post('admin/dashboard/obtenerIngresos-graficaReservas', [ReservaServicioController::class, 'ingresosMensualesPorAnioGrafica']);

//ACTUALIZAR FINALIZADO AUTOMATICAMENTE
Route::post('/cron/finalizar-reservas', [CronController::class, 'finalizarReservas']);
Route::post('{path}/cron/finalizar-reservas',  [CronController::class, 'finalizarReservas'])
    ->where('path', '.*')->name('finalizar.reservas');

//AVISAR AL USUARIO QUE MAÑANA TIENE UNA CITA
Route::post('/cron/avisar-reservas', [CronController::class, 'avisarReservasProximas']);
Route::post('{path}/cron/avisar-reservas',  [CronController::class, 'avisarReservasProximas'])
    ->where('path', '.*')->name('avisar.reservas_proximas');

//MARCAR RESERVA COMO PAGADA DESDE VER TODAS RESERVAS SIN PAGAR
Route::post('admin/dashboard/pagar-reserva', [ReservaServicioController::class, 'marcarReservaComoPagada']);

//obtener detalles reserva cita ruta mostrar detalles reserva para usuario
Route::get('/reserva/{id}/detalle', [ReservaServicioController::class, 'detalle'])->name('info.reserva')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);


Route::get('reservar/init', [HomeController::class, 'initPage']);
//RUTAS A OTRAS VISTAS RESERVAS
Route::get('/reservar/{slug}/{id?}', [HomeController::class, 'pageBook'])->name('reservar.categoriaGeneral')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);

//Página de inicio de la aplicación
Route::get('/', [HomeController::class, 'initPage'])->name('init_page');//esta es la que se utiliza admin/dashboard/init
Route::get('/init', [HomeController::class, 'initPage'])->name('index');
// Route::get('admin/dashboard/init', [HomeController::class, 'initPage'])->name('index');
// Ruta para admin: /admin/.../init
Route::get('admin/{path}/init', [HomeController::class, 'initPage'])
    ->where('path', '.*');

// Ruta para otras secciones sin "admin": /reservar/init, /clientes/init, etc.
Route::get('{path}/init', [HomeController::class, 'initPage'])
    ->where('path', '.*');



Route::get('/Reserv', [HomeController::class, 'initPageReservServ'])->name('reserServInit');

Route::post('/obtener-configuracion-reservas', [ConfigController::class, 'getConfigReservas'])->name('getConfig.reserve');
Route::post('reservar/obtener-configuracion-reservas', [ConfigController::class, 'getConfigReservas'])->name('getConfig.reserve');

// Ruta para otras secciones sin "admin": /reservar/init, /clientes/init, etc.
Route::post('{path}/check-pending-reservations',  [ReservaServicioController::class, 'checkPendingReservations'])
    ->where('path', '.*')->name('pendingReserv.chequear')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);



// Route::post('reservar/check-pending-reservations', [ReservaServicioController::class, 'checkPendingReservations'])->name('pendingReserv.chequear')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('/check-pending-reservations', [ReservaServicioController::class, 'checkPendingReservations'])->name('pendingReserv.chequear')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
// Route::post('admin/dashboard/check-pending-reservations', [ReservaServicioController::class, 'checkPendingReservations'])->name('pendingReserv.chequear')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
// Route::post('admin/dashboard/Ventas_administrator/check-pending-reservations', [ReservaServicioController::class, 'checkPendingReservations'])->name('pendingReserv.chequear')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);

//rutas pannelUsuario normal
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'blockAdminAccess'])
    ->prefix('panel')
    ->group(function () {
        // Route::post('/get-diasByMes', [ReservaServicioController::class, 'getDiasByMes'])->name('dias.byMes');
        // Route::get('/check-pending-reservations', [ReservaServicioController::class, 'checkPendingReservations'])->name('pendingReserv.chequear');
        Route::get('/User', [PanelAdminController::class, 'panelAdminUser'])->name('panelAdmin_user');
        Route::get('/Up', [PanelAdminController::class, 'panelAdminUser_up'])->name('panelAdmin_user_up');
        Route::get('/Productos', [PanelAdminController::class, 'panelAdminUser_Product'])->name('panelAdmin_user_Product');
        Route::get('/Mensajes', [PanelAdminController::class, 'panelAdminUser_Message'])->name('panelAdmin_user_Message');
        Route::get('/Reservas', [PanelAdminController::class, 'panelAdminUser_Reservas'])->name('panelAdmin_user_Reservas');
        Route::get('/Compras', [PanelAdminController::class, 'panelAdminUser_Compras'])->name('panelAdmin_user_Compras');
        Route::get('/Estatistic', [PanelAdminController::class, 'panelAdminUser_Estatistic'])->name('panelAdmin_user_Estatistic');
        Route::get('/Favoritos', [PanelAdminController::class, 'panelAdminUser_Favoritos'])->name('panelAdmin_user_Favoritos');
        Route::get('/Monedero', [PanelAdminController::class, 'panelAdminUser_Monedero'])->name('panelAdmin_user_Monedero');
        Route::get('/GualazonPro', [PanelAdminController::class, 'panelAdminUser_GualazonPro'])->name('panelAdmin_user_GualazonPro');
        Route::get('/Ayuda', [PanelAdminController::class, 'panelAdminUser_Ayuda'])->name('panelAdmin_user_Ayuda');
        Route::get('/Configuracion', [PanelAdminController::class, 'panelAdminUser_Configuracion'])->name('panelAdmin_user_Configuracion');
        Route::delete('/deleteAll', DeleteAllTemporaryImagesController::class);
        Route::get('/', function () {
            return view('components.layouts.index');
        })->name('index');
        Route::get('/reserva/{id}/detalle', [ReservaServicioController::class, 'detalle'])->name('info.reserva');
});

//ADMINISTRADOR
Route::middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'admin'])
    ->prefix('admin/dashboard')
    ->group(function () {
        Route::get('/User_administrator', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/Ventas_administrator', [AdminController::class, 'panelAdministrator_Ventas'])->name('admin.ventas');
        Route::get('/Citas_administrator', [AdminController::class, 'panelAdministrator_Citas'])->name('admin.citas');
        Route::get('/Mensajes_administrator', [AdminController::class, 'panelAdministrator_Mensajes'])->name('admin.mensajes');
        Route::get('/Mensajes_administrator', [AdminController::class, 'panelAdministrator_Mensajes'])->name('admin.mensajes');
        Route::get('/Estatistic_administrator', [AdminController::class, 'panelAdministrator_Estatistics'])->name('admin.statistics');
        Route::get('/Inventario_administrator', [AdminController::class, 'panelAdministrator_Inventario'])->name('admin.inventario');
        Route::get('/Empleados_administrator', [AdminController::class, 'panelAdministrator_Empleados'])->name('admin.empleados');
        Route::get('/Tarjeta-bono_administrator', [AdminController::class, 'panelAdministrator_Tarjeta_bono'])->name('admin.tarjetaBono');
        Route::get('/Perfil-negocio_administrator', [AdminController::class, 'panelAdministrator_Perfil_negocio'])->name('admin.perfil-negocio');
        Route::get('/Clientes_administrator', [AdminController::class, 'panelAdministrator_Clientes'])->name('admin.clientes');
        Route::get('/Configuracion_administrator', [AdminController::class, 'panelAdministrator_Configuracion'])->name('admin.config');
        Route::get('/Configuracion_showAllServices', [AdminController::class, 'panelAdministrator_ConfiguracionShowAllServices'])->name('admin.showAllServices');
        Route::get('/Configuracion_createService', [AdminController::class, 'panelAdministrator_createService'])->name('admin.configCreate');
        //guardar imagen admin
        Route::post('/save-image', [PanelAdminController::class, 'saveImage'])->name('saveImage');
        //crear nuevo servicio
        Route::post('/upload', UploadTemporaryImageNewServiceController::class);
        Route::delete('/delete', DeleteTemporaryImageNewServiceController::class);
        Route::delete('/deleteAll', DeleteAllTemporaryImagesController::class);
        // Route::post('/servicio/create', [CreateNewServiceController::class, 'createNewService'])->name('servicio.create');
        // Route::post('/servicio/create', CreateNewServiceController::class)->name('servicio.create');
        Route::post('/servicio/create', [CreateNewServiceController::class, 'createNewService'])->name('servicio.create');
        Route::post('/create-ticket', [ConfigController::class, 'createTicket'])->name('create.tiket');
        Route::post('/store-servicios-vendidos', [ConfigController::class, 'storeServiciosVendidos'])->name('store.serviciosVendidos');
        Route::post('/envio-email-recibo', [ConfigController::class, 'enviarRecibo'])->name('send.emailRecibo');
        // Route::delete('/delete-image/{filename}', [CreateNewServiceController::class, 'deleteImage']);
        // Route::post('/servicio/storeImage', [CreateNewServiceController::class, 'storageImageNewService'])->name('servicioImage.storage'); store-servicios-vendidos
        // Route::post('/servicio/create', [CreateNewServiceController::class, 'createNewService'])->name('servicio.create');

        // Aquí puedes agregar más rutas para otras funcionalidades del administrador
        //ACTUALIZAR ESTADO RESERVA A FINALIZADO
        Route::post('/actualizar-estado-reserva', [ReservaServicioController::class, 'upStatusEndReserv'])->name('reservas.upStatusEnd')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
    });
//evento drag and drop de fullcalendar mover fecha
Route::post('admin/dashboard/actualizar-fecha-reserva', [ReservaServicioController::class, 'actualizarFechaReserva']);

//obtener plantilla servicios configuracion
Route::get('admin/dashboard/obtener-servicios', [ConfigController::class, 'obtenerVistaServiciosConfiguracion']);

//plantilla show-all-services
Route::get('admin/dashboard/show-all-services', [ConfigController::class, 'obtenerVistaShowAllServices']);

//plantilla show new reserv calendar
Route::get('admin/dashboard/show-newReservCalendar-plantilla', [ConfigController::class, 'obtenerVistaOffcanvasNewReservCalendar']);

Route::get('/index', [HomeController::class, 'index'])->name('index')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('panel/save-image', [PanelAdminController::class, 'saveImage'])->name('saveImage')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'blockAdminAccess']);

// Route::post('admin/dashboard/check-pending-reservations', [ReservaServicioController::class, 'checkPendingReservations'])->name('pendingReserv.chequear');
//reservas pendientes

//obtener días según mes
Route::post('reserva/get-diasByMes', [ReservaServicioController::class, 'getDiasByMes'])->name('dias.byMes');
// Route::post('admin/dashboard/get-diasByMes', [ReservaServicioController::class, 'getDiasByMes'])->name('dias.byMes');

//confirmar reserva
Route::post('admin/dashboard/confirmar-reserva', [ReservaServicioController::class, 'confirmarReserva'])->name('reserva.confirmar');

//cancelar reserva
Route::post('admin/dashboard/cancelled-reserva', [ReservaServicioController::class, 'cancelledReserva'])->name('reserva.cancelled');

//cancelar reservas multiples
Route::post('admin/dashboard/cancelled-reservas-multiple', [ReservaServicioController::class, 'cancelledReservaMultiple'])->name('reserva-multiple.cancelled');

//anular cancelar reserva
Route::post('admin/dashboard/anular-cancelacion', [ReservaServicioController::class, 'anularcancelledReserva'])->name('anular.cancelled');

//anular cancelar reserva multiple
Route::post('admin/dashboard/anular-cancelacion-multiple', [ReservaServicioController::class, 'anularcancelledReservaMultiple'])->name('anular.cancelledMultiple');

//guardar configuracion reserva
Route::post('admin/dashboard/save-configuracionReservas', [ReservaServicioController::class, 'saveConfigReserv'])->name('save.configReserv');

//marcar como no asistida
Route::post('admin/dashboard/inasistencia-cliente', [ReservaServicioController::class, 'guardarInasistencia'])->name('inasistencia.cliente');

//buscador clientes
Route::get('admin/dashboard/search-client', [ConfigController::class, 'searchClient'])->name('search.client');

//crear nueva categoria
Route::post('admin/dashboard/storage-categoria', [ConfigController::class, 'storageNewCategoria'])->name('storage.newCategoria');

//obtener servicio
Route::post('admin/dashboard/get-serviceById', [ConfigController::class, 'getServiceById'])->name('getService.byId');

//obtener fristClient
Route::post('admin/dashboard/get-fristClient', [ConfigController::class, 'getFristClient'])->name('get.fristClient');

//obtener fristClient
Route::post('admin/dashboard/get-allClient', [ConfigController::class, 'get_all_clients'])->name('get.allClients');

//obtener reserva by id
Route::post('admin/dashboard/get-reservaById', [ConfigController::class, 'getReservaById'])->name('getReserva.byId');

//obtener servicios by reservas array
Route::post('admin/dashboard/get-servicios-by-reservas', [ConfigController::class, 'getServiciosByReservas'])->name('getServicios.byReservas');

//obtener cliente por id
Route::post('admin/dashboard/get-clienteById', [ConfigController::class, 'getClienteById'])->name('getReserva.byId');


//obtener empleado por id
Route::post('admin/dashboard/get-empleadoById', [ConfigController::class, 'getEmpleadoById'])->name('getEmple.byId');

//cambiar nombre categoria
Route::post('admin/dashboard/change-category-name', [ConfigController::class, 'changeNameCategory'])->name('change.categoryName');

//eliminar categoria
Route::post('admin/dashboard/delete-category', [ConfigController::class, 'deleteCategory'])->name('delete.category');

//obtener todos los servicios activos
Route::post('admin/dashboard/get-allCategories', [ConfigController::class, 'getAllCategories'])->name('get.allCategories');

//obtener todas categorias
Route::post('admin/dashboard/get-allServices', [ConfigController::class, 'getAllServices'])->name('get.allServices');

//obtener empleados por id
Route::post('admin/dashboard/obtener-empleadosByIds', [ConfigController::class, 'getEmpleadosByIds'])->name('getEmples.byIds');

//obtener todos los empleados empleado
Route::post('admin/dashboard/obtener-allEmpleados', [ConfigController::class, 'getAllEmpleados'])->name('getEmples.all');


//marcar notificaciones como leidas para no mostrar
Route::post('admin/dashboard/marcar-notificacionRevisadaTodas', [ConfigController::class, 'marcarTodasNotificacionLeida'])->name('notificacionTodas.leida');


//marcar notificaciones como leidas para no mostrar
Route::post('admin/dashboard/marcar-notificacionRevisadaById', [ConfigController::class, 'marcarNotificacionLeidabyId'])->name('notificacionid.leida');

//obtener configuraciones reservas
Route::post('admin/dashboard/obtener-configuracion-reservas', [ConfigController::class, 'getConfigReservas'])->name('getConfig.reserve');


//obtener servicios Array
Route::post('admin/dashboard/get-serviceByIdArray', [ConfigController::class, 'getServicesByIdArray'])->name('getService.byIdArray');
Route::post('reservar/get-serviceByIdArray', [ConfigController::class, 'getServicesByIdArray'])->name('getService.byIdArray');

//HORAS
Route::post('/obtener-horas', [ReservaServicioController::class, 'obtenerHoras'])->name('obtener.horas');
Route::post('reservar/obtener-horas', [ReservaServicioController::class, 'obtenerHoras'])->name('obtener.horas');
Route::post('/comprobar-disponibilidad', [ReservaServicioController::class, 'comprobarDisponibilidad'])->name('comprobar.disponibilidad');


//obtener todos los dias
Route::post('/get-allDays', [ReservaServicioController::class, 'getAllDays'])->name('obtener.todosDias');


//EMPLEADOS
Route::post('/empleadas-disponibles', [ReservaServicioController::class, 'verificarDisponibilidadEmpleados'])->name('empleadas.disponibles');
Route::post('reservar/empleadas-disponibles', [ReservaServicioController::class, 'verificarDisponibilidadEmpleados'])->name('empleadas.disponibles');

//EMPLEADOS admin
Route::post('admin/dashboard/empleadas-disponibles', [ReservaServicioController::class, 'verificarDisponibilidadEmpleados'])->name('empleadas.disponibles');
//CREAR RESERVA
// Route::post('/reserva-crear', [ReservaServicioController::class, 'storeReserva'])->name('reserv.create'); get-serviceByIdArray

//borrar imágenes temporales
Route::delete('/deleteAll', DeleteAllTemporaryImagesController::class);//->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'admin']);

//COMPRUEBA SI EL USUARIO ESTÁ AUTENTICADO PARA REALIZAR RESERVA e email confirmado
Route::get('/verificar-auth-y-email', function () {
    return response()->json([
        'authenticated' => auth()->check(),
        'email_verified' => auth()->user() && auth()->user()->hasVerifiedEmail(),
    ]);
})->name('verificar.auth.email');

//ACTUALIZAR CITAS PROXIMAS Y PASADAS EN PANEL USUARIO
Route::get('panel/actualizar-citas-proximas-pasadas', [ReservaServicioController::class, 'actualizarCitasProximasyPasadas'])->name('update.citasPP')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::get('{path}/actualizar-citas-proximas-pasadas',  [ReservaServicioController::class, 'actualizarCitasProximasyPasadas'])
    ->where('path', '.*')->name('update.citasPP')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);


//GUARDAR RESERVA actualizar-estado-reserva
Route::post('/reservas-store', [ReservaServicioController::class, 'storeReserva'])->name('reservas.store')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('admin/dashboard/reservas-store', [ReservaServicioController::class, 'storeReserva'])->name('reservas.store')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);

//MODIFICAR RESERVA EXISTENTE DESDE CALENDAR
Route::post('/modificar-reservaCalendar', [ReservaServicioController::class, 'updateReserva'])->name('reservas.modify')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('admin/dashboard/modificar-reservaCalendar', [ReservaServicioController::class, 'updateReserva'])->name('reservas.modify')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('reservar/modificar-reservaCalendar', [ReservaServicioController::class, 'updateReserva'])->name('reservas.modify')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);

//MODIFICAR RESERVA multiple EXISTENTE DESDE CALENDAR
Route::post('/modificar-reservaCalendar-multiple', [ReservaServicioController::class, 'updateReservaMultiple'])->name('reservasMultiples.modify')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('admin/dashboard/modificar-reservaCalendar-multiple', [ReservaServicioController::class, 'updateReservaMultiple'])->name('reservasMultiples.modify')->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);

//GUARDAR RESERVA MULTIPLES SERVICIOS
Route::post('admin/dashboard/reservas-store-multiple', [ReservaServicioController::class, 'storeReservaMultiple'])->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('reservar/reservas-store-multiple', [ReservaServicioController::class, 'storeReservaMultiple'])->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);


//OBTENER RESERVAS Y MOSTRAR EN CALENDAR
Route::get('admin/dashboard/reservas', [ReservaServicioController::class, 'getReservas']);
// Route::get('panel/reservas', [ReservaServicioController::class, 'getReservas']);


Route::post('admin/dashboard/get-multiples-forReserve', [ReservaServicioController::class, 'getMultiServices']);

//OBTENER EMPLEADOS Y MOSTRAR EN CALENDAR
Route::get('admin/dashboard/empleados', [ReservaServicioController::class, 'getEmpleadosCalendar']);
Route::get('panel/empleados', [ReservaServicioController::class, 'getEmpleadosCalendar']);


Route::get('/admin/dashboard/Configuracion_gotoback1', [ConfigController::class, 'showConfig'])->name('config.gotoback1')
->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified', 'admin']);

Route::get('/dashboard/Configuracion/config/payments', [ConfigController::class, 'showPayments'])->name('settings.payments');
Route::get('/dashboard/Configuracion/config/info-bussines', [ConfigController::class, 'showBusinessInfo'])->name('info.bussines');
Route::get('/dashboard/Configuracion/config/avant-option', [ConfigController::class, 'showAvantOption'])->name('avant.option');
Route::get('/admin/dashboard/Configuracion_edit-services', [ConfigController::class, 'showEditServices'])->name('config.edit-services');

//CONFIRMAR MODIFICACIÓN POR EL USUARIO
Route::post('panel/Reservas/confirmar-modificacion/{id}', [ReservaServicioController::class, 'confirmarModificacion'])->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);
Route::post('panel/Reservas/cancelar-modificacion/{id}', [ReservaServicioController::class, 'cancelarModificacion'])->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);

Route::post('panel/Reservas/obtenerReservas/{id}', [ReservaServicioController::class, 'obtenerReservasById'])->middleware(['auth:sanctum', config('jetstream.auth_session'), 'verified']);


//NOTIFICACIONES PUSH
Route::get('/push-test', function () {
    return view('push-test');
})->middleware('auth');

Route::post('/guardar-device-token', [PushNotificationController::class, 'guardarToken']);
Route::post('/enviar-notificacion', [PushNotificationController::class, 'enviarNotificacion']);

