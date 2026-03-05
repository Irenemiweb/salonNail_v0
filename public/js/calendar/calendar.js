var urlAplicacion = "https://salonnail.kesug.com";
// var urlAplicacion = "http://localhost/laravel/salon-manicura-git-push/public";
// var oldUrlReprogramarCita='';
var reprogramarCitaComprobarEmpleado = false;
var idCitaReprogramarComprobarEmpleado='';
var selectedServiceIds = [];
var selectedServiceIds2 = [];
var servicesWithTimes = [];
var nombreEmpleado='';
var apellidoEmpleado='';
var fechaReserva='';
var infoArrayEnvio=[];
var empleadosReservas=[];
var serviciosVentaRapida = [];
var serviciosVentaRapida_ids = [];
var descuentosVentaRapida = [];
var descuentoTotal=0;
var responsableCobroId='';
var tdOriginalWidth = null; // Para almacenar el ancho original del <td>
var empleadoIdOpenClosedCalendar='';
var eventIdChangeCalendar='';
var oldEventIdChangeCalendar='';
var colorBordeNewReservCalendar='';
var colorBordeSuperior='';
var colorBordeReservArray = [];
var oldStatus='';
var idEventModify = '';
var reservasAgrupadasArray = [];
var reservaSeleccionadaNoPay=[];

var idEventoEliminarEditarNewReserv='';
var idEventoInicial = '';//almacena id evento clicado multiple == null;
//clic reservas multiples
var eventIdChangeCalendarArray = [];
var oldStatusArray = [];
var nombreEmpleadosArray = [];
var botonEditarServicioReserva='';
var serviciosEliminadosTemporales=[];
var infoArrayEnvioEliminadosTemporales=[];
var idsEliminadosTemporales = [];
var arrayIdsReservas = [];
var arrayIdsReservasClicEvent = [];
var modificarReserva = false;
var fechaEventoIdUnico='';
var empleadoIdIdUnico = '';
var id_servicioIdUnico = '';
var eramultiple = false;
var id_reserva_simple = null;
var creamosNuevaReserva = false;
// Mapea íconos si los necesitas
const iconosPago = {
    'efectivo': 'cash.e7b5eb4a.svg',
    'terminal_de_tarjeta_fisica': 'creditcard.6c13eabe.svg',
    'bizum': 'check.a38c665c.svg',
    'paypal': 'paypal.492a8057.svg',
    'american_express': 'creditcard.6c13eabe.svg',
    'pago_fraccionado': 'creditcard.6c13eabe.svg',
    'suscripcion': 'creditcard.6c13eabe.svg',
    'tarjeta_regalo': 'creditcard.6c13eabe.svg',
    'bono_de_sesiones': 'creditcard.6c13eabe.svg',
    'default': 'default-icon.svg'
};
//almacena id reserva pantalla reservas no pagadas
var reservaSeleccionadaNotPayGloval = null;

//modifica el id del index enviado
function modifyServiceByIndex(index, serviceId) {
    // Modifica el valor del array en el índice especificado con el ID proporcionado
    // selectedServiceIds[index] = serviceId;
    selectedServiceIds2[index] = serviceId;
}

function modifyServicesWithTimesNewReservByIndex(index) {
    // Obtener elementos y valores una sola vez
    let horaFinElem = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar');
    let horaInicioElem = document.querySelector('.slotHorasCobrarServicioAddCalendar');
    let servicioElem = document.querySelector('.selectServiceAddCalendar');
    let empleadoElem = document.querySelector('.slotEmpleadoAddInicioCalendarAdd');

    // Validar existencia para evitar errores si algún elemento no existe
    if (!horaFinElem || !horaInicioElem || !servicioElem || !empleadoElem) {
        console.warn('Algunos elementos necesarios no se encontraron en el DOM.');
        return;
    }

    let horaFin = horaFinElem.textContent.trim();
    let horaInicio = horaInicioElem.textContent.trim();
    let duracion = calcularDuracion(horaInicio, horaFin);
    let idServicio = parseInt(servicioElem.getAttribute('data-service').trim(), 10);
    let idEmpleado = empleadoElem.getAttribute('data-empleid').trim();
    let seleccionaClienteValor = obtenerValorCorazon('.solicitadoClientePantalla2');

    // Asignar valores en el objeto correspondiente del array
    servicesWithTimes[index] = {
        ...servicesWithTimes[index], // Mantener otras propiedades
        duracion,
        horaFin,
        horaInicio,
        id: idServicio,
        id_empleado: idEmpleado,
        seleccionaCliente: seleccionaClienteValor,
    };
}


function modifyServicesWithTimesByIndex(index) {
    let horaFin = document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent.trim();
    let horaInicio = document.querySelector('.slotHorasCobrarServicioAdd').textContent.trim();
    let duracion = calcularDuracion(horaInicio, horaFin);
    console.log(duracion, horaInicio, horaFin, index,"DURACION");

    let idServivioAddTarjetaBlanca = document.querySelector('.selectServiceAdd').getAttribute('data-service');
    let idEmpleado = document.querySelector('.slotEmpleadoAdd').getAttribute('data-empleid').trim();
    let serleccionaClienteValor = obtenerValorCorazon('.solicitadoClientePantallaInfoClientePantallaDos');
    servicesWithTimes[index].duracion = duracion;
    servicesWithTimes[index].horaFin = horaFin;
    servicesWithTimes[index].horaInicio = horaInicio;
    servicesWithTimes[index].id = parseInt(idServivioAddTarjetaBlanca, 10);
    servicesWithTimes[index].id_empleado = idEmpleado;
    servicesWithTimes[index].seleccionaCliente = serleccionaClienteValor;
}

//FUNCIÓN PARA AÑADIR ID SERVICIO AL ARRAY
function addServiceArray(serviceId) {
    selectedServiceIds.push(serviceId);
    selectedServiceIds2.push(serviceId);
}

//FUNCIÓN PARA AÑADIR ARRAY DE IDS
function addServiceArrayIds(serviceIds) {
    serviceIds.forEach(id => {
        selectedServiceIds.push(id);
        selectedServiceIds2.push(id);
    });
}


//funcion añadir descuentos en array
function addServiceDiscountArray(index) {
    let importeDescuentoServi = document.getElementById('uid-335-input').value;

    if (importeDescuentoServi) {
        // Verificar si el índice ya existe en el array
        if (descuentosVentaRapida[index]) {
            // Si el índice existe, modificar el valor
            descuentosVentaRapida[index].descuentoServicio = parseFloat(importeDescuentoServi);
        } else {
            // Si el índice no existe, agregar un nuevo objeto en el array
            descuentosVentaRapida.push({
                descuentoServicio: parseFloat(importeDescuentoServi),
            });
        }
    }
}

//eliminar porcentaje
function actualizarDescuentoPrecioArrayVentaRapida(index){
    let imputPrecio = document.getElementById('uid-317-input').value;
    let imputDescuentoPorcentaje = document.getElementById('uid-319-input').value;
    if (imputDescuentoPorcentaje.endsWith('%')) {
        imputDescuentoPorcentaje = imputDescuentoPorcentaje.slice(0, -1); // Elimina el último carácter '%'
    }
    if (imputPrecio.endsWith('€')) {
        imputPrecio = imputPrecio.slice(0, -1); // Elimina el último carácter '€'
    }

     let indexActualizar = parseInt(index);
    for (let i = 0; i < serviciosVentaRapida.length; i++) {
        if (i === indexActualizar) {
            serviciosVentaRapida[i].precio = parseInt(imputPrecio);
            serviciosVentaRapida[i].descuento_servicio = parseInt(imputDescuentoPorcentaje);
            break;
        }
    }
}

function insertarVentaRapidaSoloIds(id_servicio){
    serviciosVentaRapida_ids.push(id_servicio);
    console.log(serviciosVentaRapida_ids, "insertarVentaRapida solo ids");

}

//insertar en array venta rápida
function insertarServicioEmpleadoArrayVentaRapida(id_servicio, nombreEmpleado, precioServicio, idEmpleado){
    serviciosVentaRapida.push({
        idServicio: id_servicio,
        nombre_Empleado: nombreEmpleado,
        precio: precioServicio,
        descuento_servicio: 0,
        id_empleado:idEmpleado
    });
    // console.log(serviciosVentaRapida, "desde insertarServicioEmpleadoArrayVentaRapida");
}
//eliminar de array venta rápida
// function eliminarArrayVentaRapida(serviceId) {
//     serviceId = parseInt(serviceId, 10);

//     serviciosVentaRapida = selectedServiceIds.filter(id => id !== serviceId);
// }

//FUNCIÓN PARA ELIMINAR SERVICIO DEL ARRAY
function removeServiceArray(serviceId) {
    serviceId = parseInt(serviceId, 10);
    servicesWithTimes = selectedServiceIds.filter(id => id !== serviceId);
    selectedServiceIds2 = selectedServiceIds.filter(id => id !== serviceId);
    selectedServiceIds = selectedServiceIds.filter(id => id !== serviceId);
}

function removeIdServiceArrayDeleteService(serviceId){
    serviceId = parseInt(serviceId, 10);
    selectedServiceIds2 = selectedServiceIds.filter(id => id !== serviceId);
    selectedServiceIds = selectedServiceIds.filter(id => id !== serviceId);
}

//boton eliminar notificaciones reservas
let eliminarNotificacionReserva = document.getElementById('remove_notification_reserv');
if(eliminarNotificacionReserva){
    eliminarNotificacionReserva.addEventListener('click', function(event){
        event.preventDefault();
        marcarTodasNotificacionRevisada(function(marcadas) {
            //mensaje notificaciones eliminadas
            let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
            insertMessageResolAction('Notificaciones eliminadas con éxito', '#canvasNotificationNewReserv', stylos, 'ok');
            //cambiar la vista de las notificacines
            showReservPending();
            //poner contador a cero
            removeAllRedPoin();
        });

    });
}

//eliminar notifivacion reserva indidualmente
function deleteNotification(id_reserva){
    marcarNotificacionById(id_reserva, function(reserva, marcada) {
        if(marcada === true){
            let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
            insertMessageResolAction('Notificacion eliminada', '#canvasNotificationNewReserv', stylos, 'ok');
        }
        showReservPending();
        checkPendingReservations();
    });

}

//FUNCION QUE DEVUELVE COLOR MÁS CLARO QUE EL QUE RECIBE
function lightenedColor(color, percent, opacity) {
    // Si el color está en formato 'rgb(r, g, b)', extraemos los valores de r, g y b
    if (color.startsWith('rgb')) {
        const rgbValues = color.match(/\d+/g); // Extraer los valores de r, g, b
        var r = parseInt(rgbValues[0]);
        var g = parseInt(rgbValues[1]);
        var b = parseInt(rgbValues[2]);
    }
    // Si el color ya está en formato hexadecimal, convertimos directamente
    else if (color[0] === '#') {
        color = color.slice(1);
        r = parseInt(color.substring(0, 2), 16);
        g = parseInt(color.substring(2, 4), 16);
        b = parseInt(color.substring(4, 6), 16);
    } else {
        return null;
    }

    // Aumentar el brillo de cada componente
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    // Convertir los valores RGB de nuevo a hexadecimal
    const lightenedColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    // Calcular la opacidad y devolver en formato rgba
    const alpha = Math.min(1, Math.max(0, opacity)); // Asegurar que la opacidad esté en el rango [0, 1]
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



function gravatarURL(email, size = 40) {
    return `https://www.gravatar.com/avatar/${email}?s=${size}&d=identicon&r=g`; // URL de Gravatar con parámetros
}

var calendar; // Variable global para almacenar la instancia de FullCalendar
var isCalendarInitialized = false;
function initializeCalendar() {
    if (isCalendarInitialized) {
        // Si ya está inicializado, destruye la instancia
        calendar.destroy();
        isCalendarInitialized = false;
    }
        const calendarEl = document.getElementById('calendar');
        var currentDate = new Date();

            calendar = new FullCalendar.Calendar(calendarEl, {
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source', // Necesario para vista de recursos
            dayMaxEventRows: true,
            views: {
                dayGridMonth: {
                dayMaxEventRows: 1
                },
                timeGridWeek: {
                dayMaxEventRows: 1
                },

            },
            moreLinkContent:function(args){
                return '+ '+args.num;
            },
            firstDay: 1,
            nowIndicator: "true",
            initialDate: currentDate,
            initialView: 'resourceTimeGridDay',
            headerToolbar: {
                left: 'today listWeek',
                center: 'prev title next',
                right: 'dayGridMonth ,resourceTimeGridWeek, resourceTimeGridDay'
            },
            buttonText:    {
                today:    'Hoy',
                month:    'Mes',
                week:     'Semana',
                day:      'Día',
                list:     'Lista',
                },
            slotMinTime: '09:00',
            slotMaxTime: '20:15',
            locale: 'es',
            height: 'auto', // Ajusta la altura según el contenido
            contentHeight: 'auto', // También ajusta la altura del contenido
            selectable: true,
            editable: true,
            slotDuration: '00:15:00',
            // slotLabelInterval: "",
            slotLabelInterval: '01:00',
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: 'short'  // Esto es para tener AM/PM si es necesario
            },
            noEventsText: 'No hay eventos para mostrar',
            allDaySlot: false,//ocultar sección all-day
            resources:'empleados',
            events: 'reservas',//getreservas
            eventOverlap: false, // No permitir solapamiento de eventos
            slotEventOverlap: false,
            eventContent: function(eventInfo) {
            return {
                html: (function() {
                    const start = eventInfo.event.start;
                    const end = eventInfo.event.end;
                    const durationMinutes = (end - start) / (1000 * 60); // duración en minutos

                    const containerStyle = durationMinutes < 30 ? 'display: flex;' : 'display: block;';

                    return `
                        <div class="event-container" style="${containerStyle}">
                            <div class="event-time" style="margin-right: 5px;">${formatTime(start)} - ${formatTime(end)}</div>
                            <div class="event-description">${eventInfo.event.title}</div>
                        </div>
                    `;
                })()
            };
            },
            // Definir cómo se deben cargar los recursos (empleados)
            resources: function(fetchInfo, successCallback, failureCallback) {
                let csrfToken = $('meta[name="csrf-token"]').attr("content");
                let url = "empleados"; // Ruta para obtener los empleados desde el servidor

                // Hacer una petición AJAX al servidor usando jQuery
                $.ajax({
                    url: url, // Ruta que definimos en web.php
                    method: 'GET', // Usamos GET ya que es para obtener los empleados
                    data: {
                        _token: csrfToken, // Token CSRF para seguridad
                    },
                    success: function(data) {
                        // Llamamos al successCallback con los datos recibidos
                        successCallback(data);
                    },
                    error: function(xhr, status, error) {
                        // Llamamos al failureCallback en caso de error
                        failureCallback(error);
                    }
                });
            },
            // Personalización de la celda de recursos (empleados)
            resourceLabelContent: function(arg) {
                // pestañas empleados plegar o abrir calendar vista semana y dia
                if (calendar.view.type === 'resourceTimeGridDay') {
                    return {
                        html: `
                            <span style="font-size: 14px;" class="empleado_nombre">${arg.resource.title}</span>
                            <span onclick="showHideEmpleDia(${arg.resource.id})" class="empleadoPlegarDia fc-icon fc-icon-chevron-right" role="img" data-index="empleadoPlegar${arg.resource.id}"></span>
                        `
                    };
                }
                if (calendar.view.type === 'resourceTimeGridWeek') {
                    return {
                        html: `
                            <span style="font-size: 14px;" class="empleado_nombre">${arg.resource.title}</span>
                            <span onclick="showHideEmpleSemana(${arg.resource.id})" class="empleadoPlegarSemana fc-icon fc-icon-chevron-right" role="img" data-index="empleadoPlegar${arg.resource.id}"></span>
                        `
                    };
                }
            },
            // Este evento se dispara cuando la vista del calendario se ha montado
            viewDidMount: function(info) {
                // día libre
                $('.fc-day-sun .fc-daygrid-day-events').each(function() {
                    if ($(this).find('span').length === 0) {
                        $(this).append('<span style="color: #8c8b88;text-transform: none;font-size: .75rem;font-weight: 500;line-height: 1.5em;">Día libre</span>');
                    }
                });

                // Agregar o quitar la clase 'list-view-active' dependiendo de la vista actual
                if (info.view.type === 'list') {
                    document.body.classList.add('list-view-active');
                } else {
                    document.body.classList.remove('list-view-active');
                }
            },
                //esto es para eventos
                eventDidMount: function(info) {
                const evento = info.event;
                const now = new Date();
                const eventEl = info.el;
                let iconDiv = createDivNoteCorazon();
                let iconNota = createIconNote();
                let iconCorazon = createIconCorazon();
                let iconPagado = createIconPayment();
                let iconAdvert = createIconAdvertencia();

                if(evento.extendedProps){
                    const tieneNota = evento.extendedProps.nota || evento.extendedProps.nota_interna;
                    const clienteSeleccionado = evento.extendedProps.seleccionado_cliente === 1;
                    const estaPagado = evento.extendedProps.status_payment === "Pagado";
                    const tieneAdvertencia = evento.extendedProps.confirma_cliente_modificacion === 'pendiente';

                    // Limpiar contenedor por si tiene contenido anterior
                    $(iconDiv).empty();
                    function agregarAdvertencia() {
                        if (tieneAdvertencia) {
                            $(iconDiv).append(iconAdvert);
                                eventEl.appendChild(iconDiv);
                            //  console.log(evento.extendedProps, "ICONO ADVERTENCIA", tieneAdvertencia, iconDiv);
                        }
                    }

                    // 1. Nota + Corazón + Pagado
                    if (tieneNota && clienteSeleccionado && estaPagado) {
                        agregarAdvertencia();
                        const combinado = createDivWithNoteCora(document.createElement('div')); // esto incluye nota + cora
                        $(iconDiv).append(combinado);
                        $(iconDiv).append(iconPagado); // 💰
                        eventEl.appendChild(iconDiv);
                    }
                    // 2. Nota + Corazón
                    else if (tieneNota && clienteSeleccionado) {
                        agregarAdvertencia();
                        const combinado = createDivWithNoteCora(document.createElement('div'));
                        $(iconDiv).append(combinado);
                        eventEl.appendChild(iconDiv);
                    }
                    // 3. Nota + Pagado
                    else if (tieneNota && estaPagado) {
                        agregarAdvertencia();
                        $(iconDiv).append(iconNota);
                        $(iconDiv).append(iconPagado);
                        eventEl.appendChild(iconDiv);
                    }
                    // 4. Corazón + Pagado (sin nota)
                    else if (clienteSeleccionado && estaPagado && !tieneNota) {
                        agregarAdvertencia();
                        $(iconDiv).append(iconCorazon);
                        $(iconDiv).append(iconPagado);
                        eventEl.appendChild(iconDiv);
                    }
                    // 5. Solo Nota
                    else if (tieneNota && !clienteSeleccionado && !estaPagado) {
                        agregarAdvertencia();
                        $(iconDiv).append(iconNota);
                        eventEl.appendChild(iconDiv);
                    }
                    // 6. Solo Corazón
                    else if (clienteSeleccionado && !tieneNota && !estaPagado) {
                        agregarAdvertencia();
                        $(iconDiv).append(iconCorazon);
                        eventEl.appendChild(iconDiv);
                    }
                    // 7. Solo Pagado
                    else if (estaPagado && !tieneNota && !clienteSeleccionado) {
                        agregarAdvertencia();
                        $(iconDiv).append(iconPagado);
                        eventEl.appendChild(iconDiv);
                    }
                    else if(!estaPagado && !tieneNota && !clienteSeleccionado){
                        agregarAdvertencia();
                    }

                    // 8. Ninguna condición
                    else {
                        if (iconDiv) iconDiv.remove();
                    }

                    fechaReserva =  evento.extendedProps.fecha;

                    //eventEl es el enlace html del evento
                    if(eventEl){
                            let id_unico_evento = obtenerIdUnicoSinEvent(evento);
                        // console.log(info, "INFO EN CLICo");
                        eventEl.setAttribute('data-idunicoevento', id_unico_evento);
                        eventEl.setAttribute('data-idreserv', evento.extendedProps.reservaId);
                    }
                    if (evento.extendedProps && evento.extendedProps.empleada && evento.extendedProps.empleada.imagenEmple) {
                        eventEl.setAttribute('data-urlImgEmple', evento.extendedProps.empleada.imagenEmple);
                    }

                    document.querySelector('.fechaCitaInfo').setAttribute('data-date', evento.extendedProps.fecha);
                    if(eventEl){
                        if(evento.extendedProps.servicio){
                            eventEl.style.setProperty('background-color', lightenedColor(evento.extendedProps.servicio.borderColor, 70, 0.52));
                            eventEl.style.setProperty('border-left', `4px solid ${evento.extendedProps.servicio.borderColor}`, 'important');
                            eventEl.style.setProperty('border-top', `1px solid ${evento.extendedProps.servicio.borderColor}`, 'important');
                        }
                    }

                    let divCombo = document.querySelector('.divComboStatusReserv');
                    let despleStatus = document.querySelector('.header_actions_oRFfx');
                    if (evento.extendedProps.status === 'Finalizada') {
                        eventEl ? eventEl.style.boxShadow = 'none' : null;

                        divCombo ? divCombo.classList.remove('d-none') :null;

                        //VACIAMOS EL DESPLEGABLE
                        $(despleStatus).empty();
                        $(despleStatus).append(`
                            <div onclick="actionPresButon('faltaCliente')" class="header_buttonCancel_kUEPy faltaCliente header_size--14-b_XJC3t">
                                <span class="b-icon iconFont icon-noshow" type="font" style="font-size: 22px;"></span>
                                Falta del cliente
                            </div>
                        `);
                    }
                    else if (evento.extendedProps.status === 'confirmed') {

                        divCombo ? divCombo.classList.remove('d-none') :null;

                        $(despleStatus).empty();
                        $(despleStatus).append(`
                            <div onclick="actionPresButon('cancelarCitaOption')" class="cancelarCitaOption header_buttonCancel_kUEPy header_size--14-b_XJC3t">
                                <span class="b-icon iconFont icon-cancel-thin" style="font-size: 28px;"></span>
                                Cancelar cita
                            </div>
                        `);
                    }
                    else if (evento.extendedProps.status === 'cancelled' || evento.extendedProps.status === 'pending') {
                        divCombo ? divCombo.classList.add('d-none') :null;
                    }
                    // Comprobar si el evento ha finalizado
                    if (new Date(evento.end) < now && evento.extendedProps.status !== 'completada'  && evento.extendedProps.status !== 'cancelled' && evento.extendedProps.status !== 'pagada' && evento.extendedProps.status !== 'Finalizada' && evento.extendedProps.status) {
                        let updateStatusReservUrl = 'actualizar-estado-reserva';
                        let csrfToken = $('meta[name="csrf-token"]').attr("content");
                        $.ajax({
                            url: updateStatusReservUrl,
                            method: 'POST',
                            data: {
                                _token: csrfToken,
                                reserva_id: evento.extendedProps.reservaId
                            },
                            success: function(response) {
                            },
                            error: function(xhr) {
                                //console.log('Error al actualizar el status', xhr);
                            }
                        });
                        evento.setExtendedProp('status', 'Finalizada');

                    }
                    let loader = document.querySelector('#loaderSperaAdministrator');
                    setTimeout(() => {
                        loader.classList.add('d-none');
                    }, 300);
                }

            },
        datesSet: function(info) {
            // poner la imagen de cuadrícula que hay arriba de los horarios calendario
            if (calendar.view.type === 'resourceTimeGridDay') {
                updateTableView('resourceTimeGridDay');
                } else if (calendar.view.type === 'resourceTimeGridWeek') {
                updateTableView('resourceTimeGridWeek');
                } else {
                updateTableView(); // Caso para otras vistas que no son 'timeGridDay' ni 'timeGridWeek'
                }
        },
        eventDrop: function(info) {
            console.log(info.event, "INFO EVENT DROP");

            const evento = info.event;

            const nuevaFecha = evento.start.toISOString();
            const reservaId = evento.extendedProps.reservaId;
            const nuevoEmpleadoId = evento.getResources()[0]?.id;
            console.log(nuevaFecha);

            const fechaAnterior = evento.extendedProps.fecha;
            const empleadoAnteriorId = evento.extendedProps.empleada?.id;

            // ⚠️ Si no cambió ni la fecha ni el empleado, no hacemos nada
            if (nuevaFecha === fechaAnterior && parseInt(nuevoEmpleadoId) === parseInt(empleadoAnteriorId)) {
                console.log('El evento no ha cambiado. No se realiza actualización.');
                info.revert();
                return;
            }

            // Solicitud AJAX solo si hay cambios
            const updateDateUrl = 'actualizar-fecha-reserva';
            const csrfToken = $('meta[name="csrf-token"]').attr("content");

            $.ajax({
                url: updateDateUrl,
                method: 'POST',
                data: {
                    _token: csrfToken,
                    reserva_id: reservaId,
                    nueva_fecha: nuevaFecha,
                    nuevo_empleado_id: nuevoEmpleadoId,
                },
                success: function(response) {
                    if (response.success) {
                        const confirmarModificacion = confirm('¿Deseas modificar esta cita?');
                        if (confirmarModificacion) {
                            alert('Cita actualizada correctamente');

                            // Actualizar fecha y empleada
                            evento.setExtendedProp('fecha', response.nueva_fecha);

                            // Obtener detalles del nuevo empleado
                            const urlGetEmpleadobyId = "get-empleadoById";
                            $.ajax({
                                url: urlGetEmpleadobyId,
                                method: 'POST',
                                data: {
                                    _token: csrfToken,
                                    empleado_id: nuevoEmpleadoId,
                                },
                                success: function(data) {
                                    if (data.empleado) {
                                        evento.setExtendedProp('empleada', {
                                            id: data.empleado.id,
                                            nombre: data.empleado.nombre,
                                            apellido: data.empleado.primerApellido,
                                            imagenEmple: data.empleado.img_empleada,
                                            telefono: data.empleado.telefono
                                        });
                                        console.log(evento.extendedProps, "Empleado actualizado");
                                    }
                                },
                                error: function(xhr) {
                                    console.log('Error al obtener los datos del empleado', xhr);
                                }
                            });
                        } else {
                            alert('No se realizaron cambios.');
                            info.revert();
                        }
                    } else {
                        info.revert();
                        alert(response.message || 'Hubo un problema al actualizar la cita.');
                    }
                },
                error: function(xhr) {
                    info.revert();
                    alert('Error en la comunicación con el servidor.');
                }
            });
        },

        eventResize: function(info) {
            alert('Evento redimensionado a: ' + info.event.end.toISOString());
        },
        eventClick: function (info) {
            //por si hay algún mensaje abierto lo cerramos
            if(document.querySelectorAll('div.mensajeResolucion')){
                document.querySelectorAll('div.mensajeResolucion').forEach(div => div.remove());
            }
            //botonDeshabilitado
            deshabilitarBotoensCabeceraCalendar();
            loaderWiteSmall();

            let calendar036 = document.getElementById('calendar');
            calendar036.classList.add('calendarEstrecho');

            //obtenemos la fecha para el id unico
            fechaEventoIdUnico =  info.event.start.toISOString().split('T')[0];

            if(info.event.extendedProps.multiple === null){
                console.log(info, "INFO RESERVA SIMPLE");
                eramultiple = false;
                oldStatus = info.event.extendedProps.status;
                eventIdChangeCalendar='';
                eventIdChangeCalendar = info.event.id;
                // console.log("info.event.id", info.event.id);
                colorBordeNewReservCalendar='';
                colorBordeSuperior = '';
                eventIdChangeCalendarArray = [];
                colorBordeNewReservCalendar = info.event.extendedProps.servicio.borderColor;
                colorBordeSuperior = info.event.extendedProps.servicio.borderColor;
                eventIdChangeCalendarArray.push(info.event.id);
                montarOffcanvasLateralTodaInfo(info);
                infoArrayEnvio = [];
                infoArrayEnvio = info;
                modificarReserva = true;
                id_reserva_simple = info.event.extendedProps.reservaId;
                console.log(id_reserva_simple, "ID RESERVA SIMPLE");

                eramultiple = false;
            }else{
                modificarReserva = true;
                eramultiple = true;
                id_reserva_simple = null;
                let multiple_id = info.event.extendedProps.multiple;
                //obtenemos todos los eventos
                let events = calendar.getEvents();
                // Filtramos los eventos que tienen el mismo valor en 'multiple'
                let serviciosMultiples = events.filter(event => event.extendedProps.multiple === multiple_id);
                // console.log(info, serviciosMultiples, "info multiple");

                serviciosMultiples.sort((a, b) => a.start - b.start); // Orden en orden ascendente (el evento que empieza primero va primero)

                //creo un array de ids reservas gloval
                arrayIdsReservasClicEvent = serviciosMultiples.map(
                    evento => evento.extendedProps.reservaId
                );
                infoArrayEnvio = [];
                infoArrayEnvio = serviciosMultiples;

                eventIdChangeCalendarArray = [];
                oldStatusArray = [];
                colorBordeReservArray = [];

                //guardamos los ids eventos en array
                serviciosMultiples.forEach(event => {
                    eventIdChangeCalendarArray.push(event.id);
                    oldStatusArray.push(event.extendedProps.status);
                    colorBordeReservArray.push(event.extendedProps.servicio.borderColor);
                });
                montarOffcanvasLateralTodaInfo(serviciosMultiples, multiple_id);
            }
        }
    });
    calendar.render();

    setTimeout(() => {
        calendar.updateSize();
    }, 1500);

    startCalendarAutoRefresh();
}

//SACAMOS EL SETINTERVAL FUERA DE LA FUNCION DE INITIALICERCALENDAR PARA QUE NO SE MULTIPLIQUE
var intervalRefetch = null;

function startCalendarAutoRefresh() {
    if (intervalRefetch) return;  // ya creado → no repetir offcanvasAddServicesChange

    intervalRefetch = setInterval(() => {
        const isOffcanvasOpen =
            document.getElementById('eventDetailsModal').classList.contains('show') ||
            document.getElementById('offcanvasShowAllServicesChange').classList.contains('show') ||
            document.getElementById('offcanvasAddServicesChange').classList.contains('show') ||
            document.getElementById('offcanvasSelectClient').classList.contains('show') ||
            document.getElementById('offcanvasShowAllServicesChangeAdd').classList.contains('show') ||
            document.getElementById('newReservCalendar').classList.contains('show');

        if (!isOffcanvasOpen) {
            // console.log("⏳ Offcanvas cerrado → Refetch");
            checkPendingReservations();
            calendar.refetchEvents();
        } else {
            // console.log("🚫 Offcanvas abierto → No refetch");
        }

    }, 30000);
}


// Función para añadir opciones al desplegable
function appendStatusOption(despleStatus, action, text, iconClass, fontSize) {
    $(despleStatus).append(`
        <div onclick="actionPresButon('${action}')" class="${action} header_buttonCancel_kUEPy header_size--14-b_XJC3t">
            <span class="b-icon iconFont ${iconClass}" type="font" style="font-size: ${fontSize}px;"></span>
            ${text}
        </div>
    `);
}

// poner la imagen de cuadrícula que hay arriba de los horarios calendario
function updateTableView(viewType) {
    resetAllTdVisibility();
    const citasAdministrator = document.getElementById('Citas_administrator');
    const tbody = document.querySelector('.fc-scrollgrid-section-body table tbody');

    // Eliminar la clase 'heigEspecifico' si la vista es 'timeGridDay' o 'timeGridWeek'
    citasAdministrator.classList.remove('heigEspecifico');

    if (!tbody) return; // Salir si el tbody no existe

    // Lógica para 'resourceTimeGridDay' y 'resourceTimeGridWeek'
    let trClass;
    let existingTrClass;

    if (viewType === 'resourceTimeGridDay') {
        trClass = 'custom-tr';
        existingTrClass = 'custom-tr-week';
    } else if (viewType === 'resourceTimeGridWeek') {
        trClass = 'custom-tr-week';
        existingTrClass = 'custom-tr';
    }

    // Si la vista es 'resourceTimeGridDay' o 'resourceTimeGridWeek'
    if (trClass && existingTrClass) {
        // Eliminar la fila existente con la clase de la vista anterior
        const existingTr = tbody.querySelector(`.${existingTrClass}`);
        if (existingTr) existingTr.remove();

        // Comprobar si ya existe la fila de la vista actual
        const existingTrCurrent = tbody.querySelector(`.${trClass}`);
        if (!existingTrCurrent) {
        const tr = createTableRow(trClass);
        tbody.insertBefore(tr, tbody.firstChild);
        }
    } else {
        // Si no es 'timeGridDay' ni 'timeGridWeek', agregar la clase 'heigEspecifico'
        citasAdministrator.classList.add('heigEspecifico');
    }
}
function createTableRow(className) {
    const tr = document.createElement('tr');
    tr.classList.add(className);

    const td1 = document.createElement('td');
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.classList.add('td_vacioImagen');
    tr.appendChild(td2);

    return tr;
}

//función que restablece los tds de calendar por el conflicto de cambio de vistas
function resetAllTdVisibility() {
    const allTds = document.querySelectorAll('td.oculto');
    allTds.forEach(function(td) {
        td.classList.remove('oculto');
    });

    const allThs = document.querySelectorAll('th.thOculto');
    allThs.forEach(function(th) {

        let thOcultos33 = th.querySelector('a.fc-col-header-cell-cushion');
        if(thOcultos33){
            thOcultos33.classList.remove('hideWeek');

        }else{
            //console.log("no existen");
        }
        th.classList.remove('thOculto');
    });
    const allThsNombre = document.querySelectorAll('th .nombreFlechaPlegado');
    allThsNombre.forEach(function(thNombre) {
        thNombre.classList.remove('nombreFlechaPlegado');
    });
}

// Función que se ejecuta cuando se hace clic en el botón
function showHideEmpleDia(idEmpleado) {
    empleadoIdOpenClosedCalendar = idEmpleado;

    // Selecciona la vista de día
    let vistaDia = document.querySelector('.fc-resourceTimeGridDay-view');
    // //console.log(vistaDia, "vistaDia");

    // Solo si la vista de día existe
    if (vistaDia) {
        // Selecciona todos los <td> con el data-resource-id igual a idEmpleado dentro de la vista de día
        const tds = vistaDia.querySelectorAll(`td[data-resource-id="${idEmpleado}"]`);
        const th = vistaDia.querySelector(`th[data-resource-id="${idEmpleado}"]`);
        if (th) {
            // Si el <th> tiene la clase 'thOculto', la quitamos
            if (th.classList.contains('thOculto')) {
                th.classList.remove('thOculto'); // Quitamos la clase 'thOculto'
                th.querySelector('.empleado_nombre').classList.remove('nombreFlechaPlegado');
                // //console.log("Se ha mostrado el <th> y se ha quitado la clase thOculto");
            } else {
                th.classList.add('thOculto'); // Añadimos la clase 'thOculto'
                th.querySelector('.empleado_nombre').classList.add('nombreFlechaPlegado');
                // //console.log("Se ha ocultado el <th> y se ha añadido la clase thOculto");
            }
        }
        // Si existen <td>s que coinciden
        if (tds.length > 0) {
            tds.forEach(function(td) {
                // Si el <td> tiene la clase 'oculto', lo mostramos
                if (td.classList.contains('oculto')) {
                    td.classList.remove('oculto'); // Mostrar el <td>
                    // //console.log("Se ha mostrado el <td> con el idEmpleado:", idEmpleado);
                } else {
                    td.classList.add('oculto'); // Ocultar el <td>
                    // //console.log("Se ha ocultado el <td> con el idEmpleado:", idEmpleado);
                }
            });
        }
    }
}

//abre y cierra el empleado seleccionado en la vista semana
function showHideEmpleSemana(idEmpleado) {
    empleadoIdOpenClosedCalendar = idEmpleado;
    // Selecciona la vista de día
    let vistaDia = document.querySelector('.fc-resourceTimeGridWeek-view');
    const tds = vistaDia.querySelectorAll(`td[data-resource-id="${idEmpleado}"]`);
    // Seleccionamos todos los <th> con el atributo data-resource-id igual a idEmpleado
    const ths = vistaDia.querySelectorAll(`th[data-resource-id="${idEmpleado}"]`);

    ths.forEach(function(th) {
        if (th) {
            // Verificar si el <th> tiene la clase 'thOculto'
            if (th.classList.contains('thOculto')) {
                // Verificar que el elemento 'a.fc-col-header-cell-cushion' existe antes de modificar su clase
                const cushion = th.querySelector('a.fc-col-header-cell-cushion');
                if (cushion) {
                    cushion.classList.remove('hideWeek');
                }

                // Quitamos la clase 'thOculto' del <th>
                th.classList.remove('thOculto');

                // Verificar si el elemento con clase 'empleado_nombre' existe antes de intentar modificarlo
                const empleadoNombre = th.querySelector('.empleado_nombre');
                if (empleadoNombre) {
                    empleadoNombre.classList.remove('nombreFlechaPlegado');
                }
            } else {
                // De nuevo, verificamos que 'a.fc-col-header-cell-cushion' exista antes de intentar modificar su clase
                const cushion = th.querySelector('a.fc-col-header-cell-cushion');
                if (cushion) {
                    cushion.classList.add('hideWeek');
                }

                // Añadimos la clase 'thOculto' al <th>
                th.classList.add('thOculto');

                // Verificar si el elemento con clase 'empleado_nombre' existe antes de intentar modificarlo
                const empleadoNombre = th.querySelector('.empleado_nombre');
                if (empleadoNombre) {
                    empleadoNombre.classList.add('nombreFlechaPlegado');
                }
            }
        }
    });


    // Si existen <td>s que coinciden
    if (tds.length > 0) {
        tds.forEach(function(td) {
            // Si el <td> tiene la clase 'oculto', lo mostramos
            if (td.classList.contains('oculto')) {
                td.classList.remove('oculto'); // Mostrar el <td>
            } else {
                td.classList.add('oculto'); // Ocultar el <td>
            }
        });
    } else {
        //console.log("No se encontraron <td> con el idEmpleado:", idEmpleado);
    }

}

var linksMasDos = document.querySelectorAll('.fc-daygrid-more-link.fc-more-link');
linksMasDos.forEach(function (link) {
    link.addEventListener('click', function(event){
        event.preventDefault();


    });
});

//función que ayuda a hacer scroll hasta la hora del evento
function obtenerHoraSlot(hora) {
    const [h, m] = hora.split(':').map(Number);
    return `${String(h).padStart(2,'0')}:00:00`; // baja a la hora exacta
}

//función que transforma este formato de hora 2025-11-16 21:07:18 a este formato: 19:29 • abr. 21, 2025
function formatearFechaSiReservaPagada(fechaString) {
    const fecha = new Date(fechaString.replace(' ', 'T'));
    // Reemplazo necesario para que Safari y algunos navegadores la acepten

    const opcionesHora = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    };

    const opcionesFecha = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    const hora = new Intl.DateTimeFormat("es-ES", opcionesHora).format(fecha);
    const fechaTexto = new Intl.DateTimeFormat("es-ES", opcionesFecha).format(fecha);

    return `${hora} • ${fechaTexto}`;
}


function montarOffcanvasLateralTodaInfo(info, id_multipleCalendar = null){
    // console.log(info, "INFO mostrar ofcanvas toda info");

    resetArrays();
    showDivNotas('datos_reserva0106');
    calendar.changeView('resourceTimeGridDay');
    blockPointerEvents();
    let popoverReservas = document.querySelector('.fc-popover.fc-more-popover');
    popoverReservas ? popoverReservas.remove(): null;
    let fechaFlatpickrDiv = document.querySelector('.fechaCitaInfo');
    let divNota = document.querySelector('.notasInfoCliente');
    let indicadorNota = document.querySelector('.indicatorNotasNewReservInfo');

    let divMensajeCliente = document.getElementById('business_noteInfo');
    let labelMensajeCliente = document.querySelector('.business_noteInfo ');
    let divNotaInterna = document.getElementById('business_noteNewReserv');
    let labelNotaInterna = document.querySelector('.business_noteNewReserv');

    //desplegables es global
    let divCombo = document.querySelector('.divComboStatusReserv');
    let despleStatus = document.querySelector('.header_actions_oRFfx');

    //div para poner si la reseva está pagada es global
    let containTargetReservPay = document.querySelector('.reservIsPay');

    initDatePiker();//calendario

    //para guardar los ids de las reservas los ponemos luego en la tarjeta del servicio
    arrayIdsReservas = [];
    if(id_multipleCalendar === null){ //sólo un servicio
        arrayIdsReservas.push(info.event.extendedProps.reservaId);
        // console.log(arrayIdsReservas, "arrayids sencillo");

        //hacer scroll hasta la hora del evento
        let horaEvento = info.event.end.toISOString().substring(11, 19); // "19:32:00"
        let horaSlot = obtenerHoraSlot(horaEvento); // "19:00:00"

        let td = document.querySelector(`td[data-time="${horaSlot}"]`);

        if (td) {
            td.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        //----------------

        fechaFlatpickrDiv.setAttribute('data-datePiker', info.event.start);

        let evento = info.event;
        let extendedProps = evento.extendedProps;

        //si hay nota cliente
        if(extendedProps.nota !== null){
            $(divNota).empty();
            $(divNota).append(`
                <div class="notes-and-info-tab_messageFromClient_k2cdB notes-and-info-tab_size--14-sb_n2YHe shadow">
                    <p class="notes-and-info-tab_messageFromClientLabel_Blzdv notes-and-info-tab_size--12_fjeYr">Mensaje del cliente</p>
                        ${extendedProps.nota}
                </div>
            `);
        indicadorNota.classList.add('b-tabs_tabIndicator_vu4Y2');
        }else{
            $(divNota).empty();
            indicadorNota.classList.remove('b-tabs_tabIndicator_vu4Y2');
        }

        //si hay mensaje para cliente
        if(extendedProps.mensaje_cliente !== null){
            divMensajeCliente.value = extendedProps.mensaje_cliente;
            indicadorNota.classList.contains('b-tabs_tabIndicator_vu4Y2') ? null : indicadorNota.classList.add('b-tabs_tabIndicator_vu4Y2');
            labelMensajeCliente.classList.add('labelUp');
        }else{
            divMensajeCliente.value ='';
            labelMensajeCliente.classList.remove('labelUp');
        }

        //si hay nota interna
        if(extendedProps.nota_interna !== null){
            divNotaInterna.value = extendedProps.nota_interna;
            indicadorNota.classList.contains('b-tabs_tabIndicator_vu4Y2') ? null : indicadorNota.classList.add('b-tabs_tabIndicator_vu4Y2');
            labelNotaInterna.classList.add('labelUp');
        }else{
            divNotaInterna.value ='';
            labelNotaInterna.classList.remove('labelUp');
        }

        //si empleado seleccionado por cliente
        let corazon = document.querySelector('.solicitadoClientePantallaInfoCliente');
        if(evento.extendedProps.seleccionado_cliente === 1){
            corazon.src = urlAplicacion + "/storage/calendar/corazonRojoEmpleCliente.svg";
            document.getElementById('solicictaCliente').value = 1;
        }else{
            corazon.src = urlAplicacion + "/storage/calendar/heart-empty.svg";
        }

        //si existe cliente
        let existeCliente = extendedProps.usuario.id;
        if(existeCliente){
            showDivClienInfo('basket-customer-card0101Info');
            let usuario = extendedProps.usuario;
            insertarTarjetaClienteSelecionadoExtentrop(usuario, '.basket-customer-card0101Info', 'card_empty_info');

        }else{
            showDivClienInfo('basket-customer-card0101Info');
            document.getElementById('clienteDetails').style.display = 'none';
            document.querySelector('.basket-customer-card0101Info').style.display = 'block';
        }

        //mostramos vista un sólo servicio tarjetasIncialesMostrarOcultar
        let divTarjetasIniciales = document.querySelector('.subbookings-list_container_nMAxs .tarjetasIncialesMostrarOcultar');
        divTarjetasIniciales.classList.remove('d-none');

        //vaciamos div reserva multiple
        let divTarjetasNuevas = document.querySelector('.subbookings-list_container_nMAxs .nuevasTarjetasMostrarOcultar');
        $(divTarjetasNuevas).empty();

        cambiarTotales(extendedProps.servicio.precio);

        //añadir opcion al desplegable
        // Asegurarse de que ambos elementos existen antes de continuar
        if (divCombo && despleStatus) {
            divCombo.classList.remove('d-none'); // Mostrarlo de forma predeterminada
            // Limpiar el desplegable de acciones
            $(despleStatus).empty();
            switch (extendedProps.status) {
                case 'cancelled':
                    divCombo.classList.add('d-none');
                    break;
                case 'confirmed':
                    $(despleStatus).append(`
                        <div onclick="actionPresButon('cancelarCitaOption')" class="cancelarCitaOption header_buttonCancel_kUEPy header_size--14-b_XJC3t">
                            <span class="b-icon iconFont icon-cancel-thin" style="font-size: 28px;"></span>
                            Cancelar cita
                        </div>
                    `);
                    break;
                case 'Finalizada':
                    $(despleStatus).append(`
                        <div onclick="actionPresButon('faltaCliente')" class="header_buttonCancel_kUEPy faltaCliente header_size--14-b_XJC3t">
                            <span class="b-icon iconFont icon-noshow" type="font" style="font-size: 22px;"></span>
                            Falta del cliente
                        </div>
                    `);
                    break;
                default:
                    break;
            }
        }


        if(extendedProps.status_payment === 'Pagado'){
            prepararVistaParaReservaPagadaEnOffcanvas();
            //si la reserva está pagada
            let fechaReservaPagada = extendedProps.payments[0].fecha;
            let fechaReservaPagada2 = formatearFechaSiReservaPagada(fechaReservaPagada);
            let pagoTotal = comprobarSiPagoFraccionadoObtenerTotal(extendedProps.payments);

            // console.log(esPagoFraccionaddo, "esPagoFraccionaddo");
            $(containTargetReservPay).empty();
            $(containTargetReservPay).append(`
                <div data-testid="payment-badge" class="payment-badge_badge_SnspL payment-badge_size--14_XOK3z pointer">
                    <div class="payment-badge_icon_vl1Rs">
                        <img class="b-icon-legacy_img_oO6VC" src="https://d10n9ka7jp2kfo.cloudfront.net/pro/6415e116/img/cash.e7b5eb4a.svg" height="40" width="40" data-testid="payment-badge-icon">
                    </div>
                    <div>
                        <div class="margin-bottom-4">
                            <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq margin-bottom-4">Pagado</div>
                        </div>
                        <div class="payment-badge_details_BO_gx">${fechaReservaPagada2}
                            <br>
                            <span class="payment-badge_detailsLine2_xW5pQ payment-badge_size--12_gmxU0">Cita</span>
                        </div>
                    </div>
                    <div class="payment-badge_amount_QoXEP">${pagoTotal} €</div>
                </div>
            `);

        }else{
            $(containTargetReservPay).empty();
            quitarVistaReservaPagada();
        }

        //poner clase a cabecera infoServicio
        // console.log(extendedProps, "EXTENTROP CONFIRMOMODIFICACION");
        setClass(extendedProps.status, '.headerInfoService',  extendedProps.confirma_cliente_modificacion);

        //añadimos el id del servicio al array
        addServiceArray(extendedProps.servicio.id);

        //cramos id_unico para ese servicio lo enviamos para meter en servicesWithTimes
        let idUnico = obtenerIdUnico(info);
        meterHorasArrayInicio('.slotHorasCobrarServicio', '.slotHoraFinCorbrarServicio', '.slotEmpleadoAddInicio', extendedProps.seleccionado_cliente, extendedProps.duracion, idUnico);

        // Llenar las secciones con los datos seccion servicio info
        let idOffcanvasBig = document.getElementById('eventDetailsModal');
        if (idOffcanvasBig) {
            idOffcanvasBig.setAttribute('data-idReserv', extendedProps.reservaId);
        }
        //ponemos la fecha visible
        let fechaReserva = formatDate2(extendedProps.fecha);
        document.querySelector('.fechaCitaInfo').textContent = fechaReserva;

        let duracion = extendedProps.servicio.duracion; // Ejemplo: 60, 90, etc.
        // Convertir la duración
        let duracionFormateada = duracion >= 60
            ? `${Math.floor(duracion / 60)}h ${duracion % 60 !== 0 ? duracion % 60 + 'min' : ''}`
            : `${duracion}min`;

        //TARJETA SERVICIO DENTRO OFFCANVAS INFO RESERVA
        document.querySelector('.services_serviceDecorator_ldMxA').style.borderColor = `${extendedProps.servicio.borderColor}`;
        document.querySelector('.services_serviceWrapper_gug5x').setAttribute('data-idServiceAdd',extendedProps.servicio.id );
        document.querySelector('.services_serviceWrapper_gug5x').setAttribute('data-id-unico',idUnico);
        document.querySelector('.services_serviceWrapper_gug5x').setAttribute('data-id-reserv', extendedProps.reservaId);
        // document.querySelector('.servives_serviceWrapper_gug5x').setAttribute('data-idEvent', eventId);
        document.querySelector('.services_serviceName_YhbTW').innerHTML = `
            ${extendedProps.servicio.nombre}
            <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
            ${duracionFormateada}
            </span>
        `;

        document.querySelector('.services_serviceDuration_Zb36z').setAttribute('data-oldDuration', extendedProps.servicio.duracion);
        document.querySelector('.services_servicePrice_wErzf').textContent = extendedProps.servicio.precio;
        document.querySelector('.slotHorasCobrarServicio').textContent = formatTime(extendedProps.fecha);
        document.querySelector('.slotHorasCobrarServicio').setAttribute('data-hourReserv', formatTime(extendedProps.fecha));
        document.querySelector('.slotHoraFinCorbrarServicio').textContent = obtenerHoraEuropaCentral(info.event.end);

        //marcamos las horas inicio y fin en los contenedores
        marcarHoraSeleccionada('.contenedorHorasFin', obtenerHoraEuropaCentral(info.event.end));
        marcarHoraSeleccionada('.contenedorHorasInicio', formatTime(extendedProps.fecha));

         // Hacer scroll a la hora activa en ambos contenedores
        const contenedor = document.querySelector('.contenedorHorasFin .scrollable');
        const contenedor2 = document.querySelector('.contenedorHorasInicio .scrollable');

        //función para hacer scroll hora inicio y fin activas
        function intentarScroll(contenedor) {
            if (!contenedor) return;

            const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
            if (!liActivo) return;

            const rect = contenedor.getBoundingClientRect();

            // Esperar a que sea visible (offcanvas / modal)
            if (rect.height === 0) {
                requestAnimationFrame(() => intentarScroll(contenedor));
                return;
            }

            const offset =
                liActivo.offsetTop -
                contenedor.offsetTop -
                contenedor.clientHeight / 2 +
                liActivo.clientHeight / 2;

            contenedor.scrollTop = offset;
        }
        // 🔥 Ejecutar para ambos
        intentarScroll(contenedor);
        intentarScroll(contenedor2);

        //empleado pongo nombre empleado global
        nombreEmpleado = extendedProps.empleada.nombre;
        ponerNomIdEmpleInicio(nombreEmpleado, extendedProps.empleada.id);
        apellidoEmpleado = extendedProps.empleada.apellido;
        const eventDetailsModal = new bootstrap.Offcanvas(document.getElementById('eventDetailsModal'));
        eventDetailsModal.show();

        ponerEventoInicialmenteModify(info);
    }else{
        // console.log(info[0], "info multiple");
        calendar.gotoDate(info[0].start);

        fechaFlatpickrDiv.setAttribute('data-datePiker', info[0].start);

        //hacer scroll hasta la hora del evento
        let horaEvento = info[0].end.toISOString().substring(11, 19); // "19:32:00"
        let horaSlot = obtenerHoraSlot(horaEvento); // "19:00:00"

        let td = document.querySelector(`td[data-time="${horaSlot}"]`);

        if (td) {
            td.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if(info.event){
            fechaFlatpickrDiv.setAttribute('data-datePiker', info.event.start);
        }

        let idOffcanvasBig = document.getElementById('eventDetailsModal');
        if (idOffcanvasBig) {
            idOffcanvasBig.setAttribute('data-idReserv', info[0].extendedProps.multiple);
        }

        //si está pagada la reserva
        if(info[0].extendedProps.status_payment === 'Pagado'){

            prepararVistaParaReservaPagadaEnOffcanvas();
            // console.log(esPagoFraccionaddo, "esPagoFraccionaddo");
            let fechaReservaPagada =  info[0].extendedProps.payments[0].fecha;
            let fechaReservaPagada2 = formatearFechaSiReservaPagada(fechaReservaPagada);
            let pagoTotal = comprobarSiPagoFraccionadoObtenerTotal( info[0].extendedProps.payments);
            // let pagoTotal = 0;

            // console.log("está pagada");
            $(containTargetReservPay).empty();
            $(containTargetReservPay).append(`
                <div data-testid="payment-badge" class="payment-badge_badge_SnspL payment-badge_size--14_XOK3z pointer">
                    <div class="payment-badge_icon_vl1Rs">
                        <img class="b-icon-legacy_img_oO6VC" src="https://d10n9ka7jp2kfo.cloudfront.net/pro/6415e116/img/cash.e7b5eb4a.svg" height="40" width="40" data-testid="payment-badge-icon">
                    </div>
                    <div>
                        <div class="margin-bottom-4">
                            <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq margin-bottom-4">Pagado</div>
                        </div>
                        <div class="payment-badge_details_BO_gx">${fechaReservaPagada2}
                            <br>
                            <span class="payment-badge_detailsLine2_xW5pQ payment-badge_size--12_gmxU0">Cita</span>
                        </div>
                    </div>
                     <div class="payment-badge_amount_QoXEP">${ pagoTotal} €</div>
                </div>
            `);

        }else{
            $(containTargetReservPay).empty();
            quitarVistaReservaPagada();
        }

        //si hay mensaje para el cliente:
        if(info[0].extendedProps.mensaje_cliente){
            divMensajeCliente.value = info[0].extendedProps.mensaje_cliente;
            indicadorNota.classList.contains('b-tabs_tabIndicator_vu4Y2') ? null : indicadorNota.classList.add('b-tabs_tabIndicator_vu4Y2');
            labelMensajeCliente.classList.add('labelUp');
        }else{
            divMensajeCliente.value ='';
            labelMensajeCliente.classList.remove('labelUp');
        }

        //si hay nota interna
        if(info[0].extendedProps.nota_interna){

            divNotaInterna.value = info[0].extendedProps.nota_interna;
            indicadorNota.classList.contains('b-tabs_tabIndicator_vu4Y2') ? null : indicadorNota.classList.add('b-tabs_tabIndicator_vu4Y2');
            labelNotaInterna.classList.add('labelUp');
        }else{
            divNotaInterna.value ='';
            labelNotaInterna.classList.remove('labelUp');
        }

        //si existe cliente
        let existeCliente =  info[0].extendedProps.usuario.id;
        if(existeCliente){
            showDivClienInfo('basket-customer-card0101Info');
            let usuario = info[0].extendedProps.usuario;
            insertarTarjetaClienteSelecionadoExtentrop(usuario, '.basket-customer-card0101Info', 'card_empty_info');
        }else{
            showDivClienInfo('basket-customer-card0101Info');
            document.getElementById('clienteDetails').style.display = 'none';
            document.querySelector('.basket-customer-card0101Info').style.display = 'block';
        }

        //ocultar vista un solo servicio
        let divTarjetasIniciales = document.querySelector('.subbookings-list_container_nMAxs .tarjetasIncialesMostrarOcultar');
        divTarjetasIniciales.classList.add('d-none');

        // id multiple enviado desde clic calendar al ser multiple
        let multiple_id = id_multipleCalendar;
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-multiples-forReserve";
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                _token: csrfToken,
                id_multiple: multiple_id,
            },
            success: function(data) {
                let serviciosMultiple = data.serviciosMultiple;
                serviciosMultiple.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));

                if(serviciosMultiple.length >0){
                    //vaciamos div para tarjetas multiples servicios
                    let divTarjetasNuevas = document.querySelector('.subbookings-list_container_nMAxs .nuevasTarjetasMostrarOcultar');
                    let htmlContent = '';
                    let totalPricePay=0;
                    let fechaReserva = formatDate2(serviciosMultiple[0].date_time);
                    document.querySelector('.fechaCitaInfo').textContent = fechaReserva;

                    // Crear un array con solo los service_id usando map()
                    let serviceIds = serviciosMultiple.map(service => service.service_id);

                    //metemos los ids en array de ides
                    addServiceArrayIds(serviceIds);

                    //obtenemos los servicios
                    getServicesById(serviceIds, function (servicios){
                        getAllEmpleados(function(empleadosReservas) {
                            let inicialesEmpleados = [];
                            nombreEmpleadosArray = [];
                            let apellidos = [];
                            let idsEmpleados = [];
                            // Recorremos el array servicesWithTimes
                            serviciosMultiple.forEach(service => {
                                // Buscamos el empleado correspondiente usando el id_empleado
                                let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.empleada_id));
                                if (empleado) {
                                    // Obtenemos las primeras dos letras del nombre del empleado
                                    let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                                    let nombre = empleado.nombre;
                                    let apellido = empleado.primerApellido;
                                    let idEmpleado = empleado.id;
                                    idsEmpleados.push(idEmpleado);
                                    inicialesEmpleados.push(iniciales);
                                    nombreEmpleadosArray.push(nombre);
                                    apellidos.push(apellido);
                                }
                            });

                            arrayIdsReservas = infoArrayEnvio.map(evento => evento.extendedProps.reservaId);
                            // console.log(arrayIdsReservas,serviciosMultiple, "SERVICIOSMULTIPLES IDS");
                            let idsEventosParaHtml = infoArrayEnvio.map(e => e.id);
                            // console.log(idsEventosParaHtml, "IDS EVENTOS HTML 1417");

                            servicios.forEach((servicio, index) => {

                                let fecha = serviciosMultiple[index].date_time.split(' ')[0];
                                let horaInicio03 = formatTime(serviciosMultiple[index].date_time);
                                let horaFin03 = calculateEndTime(serviciosMultiple[index].date_time, serviciosMultiple[index].duration);
                                let id_empleada03 = serviciosMultiple[index].empleada_id;
                                let seleccionaCliente03 = serviciosMultiple[index].empleado_seleccionado;
                                let duracion03 = serviciosMultiple[index].duration;

                                //en la función meterHOras... se añade el id_empleado al id_unico
                                meterHorasArrayMultiple(servicio.id, horaInicio03, horaFin03, id_empleada03, seleccionaCliente03, duracion03, arrayIdsReservas[index], fecha);

                                // Convertir el precio a número flotante
                                let precioNumerico = parseFloat(servicio.precio);
                                totalPricePay += precioNumerico;

                                // Comprobar si horaInicio es 0
                                let tiempoFormateada = comprobar603090(serviciosMultiple[index].duration);

                                // Obtener la horaInicio y horaFin del elemento correspondiente en servicesWithTimes por índice
                                let apellido55 = apellidos[index];
                                let nombreEmpleado55 = nombreEmpleadosArray[index];
                                let inicialesEmpleado33 = inicialesEmpleados[index];
                                let horaInicio = formatTime(serviciosMultiple[index].date_time);
                                let horaFin = calculateEndTime(serviciosMultiple[index].date_time, serviciosMultiple[index].duration);
                                let seleccionaCliente = serviciosMultiple[index].empleado_seleccionado;
                                let duracionServicio = `${horaInicio} - ${horaFin}`;
                                let empleado_id = idsEmpleados[index];
                                let id_evento = idsEventosParaHtml[index];
                                let id_reserva989 = serviciosMultiple[index].id;

                                // Construir HTML, en esa función se añade el id_unico
                                htmlContent += construirHtmlTarjetasFinales(
                                    servicio.borderColor,
                                    servicio.nombre,
                                    servicio.precio,
                                    duracionServicio,
                                    tiempoFormateada,
                                    nombreEmpleado55,
                                    inicialesEmpleado33,
                                    apellido55,
                                    seleccionaCliente,
                                    id_evento,
                                    servicio.id,
                                    empleado_id,
                                    id_reserva989,
                                    "1440"
                                    // eventIdChangeCalendarArray[index]
                                );
                            });

                            // Agregar todo el contenido generado al contenedor nuevo
                            $(divTarjetasNuevas).empty();
                            $(divTarjetasNuevas).append(htmlContent);

                            //cambiar el precio en pantalla principal
                            addHtmlDivPrecioFinal(totalPricePay, '#eventDetailsModal p[data-testid="appointment-price"]', '#eventDetailsModal div[data-testid="appointment-to-be-paid"]');
                            let reservaTerminaMasTarde = getReservaMasTarde(serviciosMultiple);
                            if (divCombo && despleStatus) {
                                divCombo.classList.remove('d-none'); // Mostrarlo de forma predeterminada
                                // Limpiar el desplegable de acciones
                                $(despleStatus).empty();
                                switch (reservaTerminaMasTarde.status) {
                                    case 'cancelled':
                                        divCombo.classList.add('d-none');
                                        break;
                                    case 'confirmed':
                                        $(despleStatus).append(`
                                            <div onclick="actionPresButon('cancelarCitaOption')" class="cancelarCitaOption header_buttonCancel_kUEPy header_size--14-b_XJC3t">
                                                <span class="b-icon iconFont icon-cancel-thin" style="font-size: 28px;"></span>
                                                Cancelar cita
                                            </div>
                                        `);
                                        break;
                                    case 'Finalizada':
                                        $(despleStatus).append(`
                                            <div onclick="actionPresButon('faltaCliente')" class="header_buttonCancel_kUEPy faltaCliente header_size--14-b_XJC3t">
                                                <span class="b-icon iconFont icon-noshow" type="font" style="font-size: 22px;"></span>
                                                Falta del cliente
                                            </div>
                                        `);
                                        break;
                                    default:
                                        break;
                                }
                            }
                            // console.log(info[0].confirma_cliente_modificacion, "confirma clietne multipel");

                            setClass(reservaTerminaMasTarde.status, '.headerInfoService', info[0].extendedProps.confirma_cliente_modificacion);
                            let eventDetailsModal = new bootstrap.Offcanvas(document.getElementById('eventDetailsModal'));
                            eventDetailsModal.show();

                            setTimeout(() => {
                                try {
                                    eventIdChangeCalendarArray.forEach((eventId, index) => {

                                        // Buscar el evento directamente en FullCalendar (más seguro)
                                        let eventInfo = calendar.getEventById(eventId);

                                        if (!eventInfo) {
                                            console.warn("⚠️ Evento no encontrado en el calendario:", eventId);
                                            return;
                                        }

                                        let fechaFlatpickrDiv = document.querySelector('.fechaCitaInfo');
                                        if (!fechaFlatpickrDiv) return;

                                        let fechaFlatpickr = fechaFlatpickrDiv.getAttribute('data-datePiker');
                                        if (!fechaFlatpickr) return;

                                        eventInfo.setStart(fechaFlatpickr);
                                        eventInfo.setProp('classNames', ['temporal']);
                                        eventInfo.setProp('borderColor', eventInfo.borderColor);
                                    });

                                    calendar.render();

                                } catch (e) {
                                    console.error("Error controlado en modificación múltiple:", e);

                                    // Si quieres recargar solo cuando falle algo
                                    location.reload();
                                }
                            }, 400);

                            // ponerEventoInicialmenteModify(infoArrayEnvio);
                            //añadimos los ids del evento a las tarjetas html para cuando clic en "editar" eventoTemporalAsignado_
                            let tarjetasServiciosMultiples = document.querySelectorAll('.subbookings-list_card_j4UGY');
                            tarjetasServiciosMultiples.forEach((tarjeta, index) => {
                                boton = tarjeta.querySelector('.buttonEditEvent');
                                boton.setAttribute('data-index', eventIdChangeCalendarArray[index]);
                                boton.setAttribute('data-border', colorBordeReservArray[index]);
                                boton.setAttribute('data-new', false);
                            });

                        });
                    });
                }
            },
            error: function(xhr) {
                //console.log('Error al guardar el nombre de la categoria', xhr);
            }
        });
    }
}

function obtenerIdUnico(data){
    // console.log(data.event, "OBTENER ID UNICO33",data.event.start.toISOString().split('T')[0],  "getdate33");
    //obtener la fecha
    const fechaEvento = data.event.start.toISOString().split('T')[0];
    // Obtener id del servicio extendedProps
    const idServicio = data.event.extendedProps.servicio.id;
    const id_empleado = data.event.extendedProps.empleada.id;
    // Función para extraer HH_mm desde una fecha ISO
    const formatearHora = (fechaISO) => {
    const date = new Date(fechaISO);
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}_${minutos}`;
    };

    const horaInicio = formatearHora(data.event.start);
    const horaFin = formatearHora(data.event.end);

    // Construir la variable final
    const resultado = `${fechaEvento}_${idServicio}_${horaInicio}__${horaFin}_${id_empleado}`;
    // console.log("ID UNICO", resultado);
    return resultado;
}

function obtenerIdUnicoSinEvent(data){
    // console.log(data, "OBTENER ID UNICO",data.start.toISOString().split('T')[0]);
     //obtener la fecha
    const fechaEvento = data.start.toISOString().split('T')[0];
    // Obtener id del servicio extendedProps
    let idServicio = null;
    if(data.extendedProps.servicio){
        idServicio = data.extendedProps.servicio.id;
    }else{
       let tarjetaServicio = document.querySelector('.services_serviceInfo_iDMQwAddCalendar');
       if(tarjetaServicio){
        idServicio = tarjetaServicio.getAttribute('data-indexactual');
       }

    }
    let id_empleado= null;
    if(data.extendedProps.empleada){
        id_empleado = data.extendedProps.empleada.id;
    }else{
        id_empleado = empleadoIdIdUnico;
    }

    // Función para extraer HH_mm desde una fecha ISO
    const formatearHora = (fechaISO) => {
    const date = new Date(fechaISO);
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    return `${horas}_${minutos}`;
    };

    const horaInicio = formatearHora(data.start);
    const horaFin = formatearHora(data.end);

    // Construir la variable final
    const resultado = `${fechaEvento}_${idServicio}_${horaInicio}__${horaFin}_${id_empleado}`;
    // console.log("ID UNICO", resultado);
    return resultado;
}

var divApagarOcultar = document.querySelector('.divApagar');
var divTotalAPagar = document.querySelector('.divTotalAPagar');
var botonCobrarOcultar = document.querySelector('.uid-772-input-pay');
var cambiarCliente = document.getElementById('basket-customer-card0101Info');
var datosReserva = document.getElementById('datos_reserva0106');
function prepararVistaParaReservaPagadaEnOffcanvas(){

    cambiarCliente ? cambiarCliente.style.pointerEvents = 'none' : null;
    divApagarOcultar ? divApagarOcultar.classList.add('d-none') : divApagarOcultar.classList.add('');
    divTotalAPagar ? divTotalAPagar.classList.remove('b-border-r') : divTotalAPagar.classList.remove('');
    botonCobrarOcultar ? botonCobrarOcultar.classList.add('d-none') : botonCobrarOcultar.classList.add('');
    datosReserva ? datosReserva.style.pointerEvents = 'none' : null;
}

function quitarVistaReservaPagada(){
    cambiarCliente ? cambiarCliente.style.pointerEvents = 'auto' : null;
    divApagarOcultar ? divApagarOcultar.classList.remove('d-none') : divApagarOcultar.classList.remove('');
    divTotalAPagar ? divTotalAPagar.classList.add('b-border-r') : divTotalAPagar.classList.add('');
    botonCobrarOcultar ? botonCobrarOcultar.classList.remove('d-none') : botonCobrarOcultar.classList.remove('');
    datosReserva ? datosReserva.style.pointerEvents = 'auto' : null;
}

function comprobarSiPagoFraccionadoObtenerTotal(payment){
    let esPagoFraccionaddo = payment.length > 1;
    let pagoTotal = 0;
    if (esPagoFraccionaddo) {
        pagoTotal = payment
            .reduce((sum, pago) => sum + parseFloat(pago.total), 0)
            .toFixed(2)      // "48.00"
            .replace('.', ','); // "48,00"
    }else{
        pagoTotal = payment[0].total.replace('.', ',');
    }
    return pagoTotal;
}

function cambiarTotales(total){
    total = formatearTotal(total);
    const visualizaPrecio = document.querySelector('[data-testid="appointment-price"]');
    if (visualizaPrecio) {
        visualizaPrecio.textContent = total;
    }
    const DivvisualizaPrecioAPagar = document.querySelector('[data-testid="appointment-to-be-paid"]');
    if (DivvisualizaPrecioAPagar) {
        let visualizadorPagarP = DivvisualizaPrecioAPagar.querySelector('.b-heading-xl');
        visualizadorPagarP.textContent = total;
    }
    const visualizaPrecio2 = document.querySelector('[data-testid="appointment-price2"]');
    if (visualizaPrecio2) {
        visualizaPrecio2.textContent = total;
    }
    const DivvisualizaPrecioAPagar2 = document.querySelector('[data-testid="appointment-to-be-paid2"]');
    if (DivvisualizaPrecioAPagar2) {
        let visualizadorPagarP2 = DivvisualizaPrecioAPagar2.querySelector('.b-heading-xl');
        visualizadorPagarP2.textContent = total;
    }

}

//funcion que formatea el total así: 78,00 €
function formatearTotal(total) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    }).format(total);
}

//calendario tipo datepiker de javascript calendario pequeño
function initDatePiker(){
    const fechaCitaInfo = document.getElementById('datePikerfechaCitaInfo2');
    let fechaFlatpickrDiv = document.querySelector('.fechaCitaInfo');
    // //console.log(fechaFlatpickr, "fecha del atributo");
    let fechaActual = new Date();
    let horaActual = fechaActual.getHours();
    let minutosActual = fechaActual.getMinutes();
    // Verificamos si la hora es mayor a las 19:50
    if (horaActual > 19 || (horaActual === 19 && minutosActual > 50)) {
        // Si es más tarde de las 19:50, configuramos la fecha para el día siguiente
        fechaActual.setDate(fechaActual.getDate() + 1);
        fechaActual.setHours(0, 0, 0, 0); // Establecer a medianoche para el día siguiente
    }
    let fechaFormateada= formatDateForFlatpickr(fechaActual);
    // //console.log(fechaFormateada, "fecha formateada");
    // Asignar el atributo data-piker con el formato deseado al inicio
    fechaFlatpickrDiv.setAttribute('data-datepiker', fechaActual.toString());


    fechaFlatpickrDiv.setAttribute('data-date', fechaFormateada);
    flatpickr(fechaCitaInfo, {
        inline: false, // Muestra el calendario como popup
        allowInput: true, // Permite escribir en el input
        clickOpens: true,
        enableTime: false, // Solo seleccionar fecha
        dateFormat: "D, d M.", // Formato: "lun, 2 dic"
        defaultDate: fechaFormateada, // Fecha que se marcará con un círculo
        disableMobile: true,
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                longhand: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            },
            months: {
                shorthand: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                longhand: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            },
        },
        onChange: function (selectedDates, dateStr, instance) {
            loaderWiteSmall();
            document.querySelector('.fechaCitaInfo').setAttribute('data-datepiker', selectedDates);
            // //console.log(selectedDates, dateStr, "selected y dateStr");
            let fechaGotodate = formatearFecha02(selectedDates);

            if(calendar){
                calendar.gotoDate(fechaGotodate);
            }

            let fecha = document.querySelector('.fechaCitaInfo').getAttribute('data-datepiker');
            // //console.log(fecha, "fecha");

            let horaInicio = document.querySelector('.slotHorasCobrarServicio').textContent;
            let horaFin = document.querySelector('.slotHoraFinCorbrarServicio').textContent;
            let start = formatFechaConHora(fecha, horaInicio);  // Fecha y hora de inicio
            let end = formatFechaConHora(fecha, horaFin);

            //estamos en la pantalla donde hay tarjetas drag para cambio fecha new reserv Calendar
            let existenTarjetasDrag = document.querySelectorAll('.nuevasTarjetasMostrarOcultar .subboking-drag-el');
            if(existenTarjetasDrag.length>0){
                //console.log("DATEPIKERONCHANGE--multple y servicesWitTimes", servicesWithTimes);
                setTimeout(() => {
                    mostrarEventosArrayMejorado('.fechaCitaInfo');
                }, 400);

            }else{
                //console.log("DATEPIKER ONCHANGE--simple");
                setTimeout(() => {
                    // eliminarEventoCalendario(idEventoInicial);
                    // console.log(idEventoInicial, "id a eliminar");

                    cambiarFechaEvento(eventIdChangeCalendar.trim(), start, end);
                    document.querySelector('.fechaCitaInfo').setAttribute('data-date', dateStr);

                }, 400);
            }
            fechaFlatpickrDiv.textContent = dateStr;
            ponerBotonesGuardarCambios();
        },
    });
}

function mostrarEventosArrayMejorado(datepiker){
    let eventosParaCrear = [];
    setTimeout(() => {
        eventIdChangeCalendarArray.forEach((eventId, index) => {
            //console.log(eventId, "mostrarEventosArrayMejorado--eventId");
            eventosParaCrear.push(calendar.getEventById(eventId));
            eliminarEventoCalendario(eventId);
            eliminarEventosTemporales(eventId);
        });
        eliminarEventoCalendario(idEventoInicial);

    }, 50);

    eliminarEventosTemporales('temporalArray_');
    eliminarEventosTemporales('eventoTemporal_2_');
    getServicesById(selectedServiceIds2,function (servicios){
        let title = 'Cliente sin cita previa';
        if(infoArrayEnvio.length===0){
            if(existeNombreCliente() !== false){
                title = existeNombreCliente();
            }
        }

        let fecha55 = '';
        if(document.getElementById(datepiker)){
            fecha55 = document.getElementById(datepiker).getAttribute('data-datepiker');
        }else{
            fecha55 =document.querySelector(datepiker).getAttribute('data-datepiker');
        }
        if(existeNombreClienteComun('.basket-customer-card0101Info') !== false){
            title = existeNombreClienteComun('.basket-customer-card0101Info');
        }
        let extendedProps='';
        servicios.forEach((servicio, index) => {
            // //console.log(infoArrayEnvio[index]);
            let horaInicio55 = servicesWithTimes[index].horaInicio;
            let horaFin55 = servicesWithTimes[index].horaFin;
            let id_unico = servicesWithTimes[index].id_unico;
            let id_empleado55 = servicesWithTimes[index].id_empleado
            if(eventosParaCrear[index]){
                extendedProps = eventosParaCrear[index].extendedProps;
            }else{
                extendedProps = {
                    servicio:{
                        nombre: servicio.nombre,
                        borderColor: servicio.borderColor,
                        duracion: calcularDuracion(horaInicio55.trim(), horaFin55.trim()),
                        precio: servicio.precio,
                        id: servicio.id,
                    },
                    empleada:{
                        nombre: nombreEmpleadosArray[index],
                        id: id_empleado55,
                    },
                    horaInicio: horaInicio55.trim(),
                    horaFin: horaFin55.trim(),
                    id_unico: id_unico,
                };
            }

            let start55 = formatFechaConHora(fecha55, horaInicio55);  // Fecha y hora de inicio
            let end55 = formatFechaConHora(fecha55, horaFin55);
            let fechaInicial55 = start55.split('T')[0];
            let eventData = {
                classNames: ['temporal', `temporalArray_${index}`],
                // id: `temporalArray_${index}`,//esto es lo que sirve para eliminarlo
                id: eventIdChangeCalendarArray[index],
                title:  title + ' • ' + servicio.nombre,
                start: start55,  // Fecha y hora de inicio
                end: end55,      // Fecha y hora de finalización
                extendedProps: extendedProps,
                resourceId: id_empleado55,
            };
            // //console.log(eventData);

            if (calendar) {
                calendar.addEvent(eventData);
            }
        });
        setTimeout(() => {
            servicios.forEach((servicio, index) => {
                let eventoTemporal = document.querySelector(`.fc-event.temporalArray_${index}`);
                if (eventoTemporal) {
                    // if(creamosNuevaReserva && botonEditarServicioReserva){
                    //     eventoTemporal.setAttribute('data-idunicoevento', servicesWithTimes[index].id_unico);
                    // }
                    eventoTemporal.setAttribute('data-idunicoevento', servicesWithTimes[index].id_unico);
                    eventoTemporal.style.setProperty('border-left', `4px solid ${servicio.borderColor}`, 'important');
                    eventoTemporal.style.setProperty('border-top', `1px solid ${servicio.borderColor}`, 'important');
                }
            });
        }, 1000);
        let eventos = calendar.getEvents();
    //console.log(eventos, "mostrarEventosArrayMejorado--eventos");
    });
}

/// Función que convierte un string "d-m-Y" a formato datetime (YYYY-MM-DD HH:mm:ss)
function convertir_string_dataDate(dateStr) {
    const parts = dateStr.split("-");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    return formattedDate;
  }

//mini calendario para años cliente
function initDatePikerClient(){
    const calendarFechaCliente = document.getElementById('cumpleCliente001');
    if (calendarFechaCliente) {
        flatpickr(calendarFechaCliente, {
            inline: false, // Muestra el calendario como popup
            allowInput: true, // Permite escribir en el input
            clickOpens: true,
            enableTime: false, // Solo seleccionar fecha
            dateFormat: "d-m-Y", // Formato: "lun, 2 dic"
            // defaultDate: fechaFormateada, // Fecha que se marcará con un círculo
            disableMobile: true,
            slotEventOverlap: false,
            eventOverlap: false,
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                    longhand: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                },
                months: {
                    shorthand: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                    longhand: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                },
            }, // Cambiar a español
            onChange: function (selectedDates, dateStr, instance) {
                calendarFechaCliente.setAttribute('data-happy-date',  convertir_string_dataDate(dateStr));
                // Cambia el contenido del párrafo al seleccionar una fecha
                // fechaFlatpickrDiv.textContent = dateStr;
            },
        });
    }
}

initDatePikerClient();

function closedOffcanvasInfoReserv(){
    activarLoaderUniversal('loaderSperaAdministrator2');

    let eventosConTemporalDos = document.querySelectorAll('.temporal2');
    let miDiv = document.querySelector('.fc-header-toolbar');
    let botones = miDiv.getElementsByTagName('button');
    for (let boton of botones) {
        boton.disabled = false;
    }

    let divTarjetasIniciales = document.querySelector('.subbookings-list_container_nMAxs .tarjetasIncialesMostrarOcultar');

    divTarjetasIniciales.classList.remove('d-none');
    let divTarjetasNuevas = document.querySelector('.subbookings-list_container_nMAxs .nuevasTarjetasMostrarOcultar');
    $(divTarjetasNuevas).empty()
    cerrarModalCategorias('.comboStatusReserv');
    cerrarModalCategorias('.contenedorHorasFin');
    cerrarModalCategorias('.contenedorHorasInicio');
    resetArrays();
    openCloseComboStatus();
    insertartarjetaSeleccionaCliente('.basket-customer-card0101Info', 'card_empty_info');

    //mostrar pestaña info reserva
    let pestaniaCita = document.querySelector('.cita_tab');
    if (pestaniaCita) {
        document.querySelectorAll('.b-tabs_tabDefaultActive_CYkQd').forEach(function(elemento) {
            elemento.classList.remove('b-tabs_tabDefaultActive_CYkQd');
        });
        pestaniaCita.classList.add('b-tabs_tabDefaultActive_CYkQd');
        showDivNotas('datos_reserva0106');
    }

    checkPendingReservations();
    initializeCalendar();

    let calendar037 = document.getElementById('calendar');
    calendar037.classList.remove('calendarEstrecho');
    $('#eventDetailsModal').offcanvas('hide');
    enablePointerEvents();
    calendar.render();
    showDivBotonGuardarInfo('reservCobrarFooterInfo');
    //hacer scroll hasta arriba
    let td = document.querySelector(`td[data-time="09:00:00"]`);

    if (td) {
        td.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
        desactivarLoaderUniversal('loaderSperaAdministrator2');
    }, 1000);
}

  // inputs filtrado para hora inicio hora fin
function configurarFiltroHoras(inputId, dropdownSelector) {
    const input = document.getElementById(inputId);
    const dropdown = document.querySelector(dropdownSelector);

    if (!input || !dropdown) return;

    const items = dropdown.querySelectorAll('[data-time]');

    input.addEventListener('input', function () {
        let query = input.value.toLowerCase().trim();
        console.log("query", query);

        // Mostrar el desplegable si hay algo escrito
        dropdown.style.display = query.length > 0 ? 'inline' : 'none';

        // Filtrar resultados
        items.forEach(item => {
            const text = item.getAttribute('data-time').toLowerCase();
            item.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });
}

//ABRE Y CIERRA LAS CATEGORIAS DE LOS SERVICIOS
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los encabezados primer showAllservicesChange
    const headers = document.querySelectorAll('.services-list_header_zR0q6');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            const targetId = header.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            // Alternar la visibilidad del contenido
            if (targetContent.style.display === 'none') {
                targetContent.style.display = 'block';
            } else {
                targetContent.style.display = 'none';
            }
        });
    });

    // Seleccionar todos los encabezados showAllservicesAdd
    const headersAdd = document.querySelectorAll('.services-list_header_zR0q6Add');
    headersAdd.forEach(header => {
        header.addEventListener('click', function () {
            const targetId = header.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            // Alternar la visibilidad del contenido
            if (targetContent.style.display === 'none') {
                targetContent.style.display = 'block';
            } else {
                targetContent.style.display = 'none';
            }
        });
    });
});

//CLIC EN TARJETA BLANCA AÑADIR SERVICIO PANTALLA AÑADIR SERVICIO
const tarjetaSecundaria = document.querySelector('.services_serviceInfo_iDMQwAdd');
if (tarjetaSecundaria) {
    tarjetaSecundaria.addEventListener('click', function (){

        toggleOffcanvas('offcanvasShowAllServicesChangeAdd', 'offcanvasAddServicesChange');
    });
}

//FUNCIÓN PARA METER TARJETA de servicio en vista modificar servicio
function aniadirServicioHtml(colorBorde, nombre, duracion, precio, divContenedor, clase){
    // console.log("aniadirServiicohtl");

    let divContenedorTarjeta = document.querySelector(divContenedor);
    $(divContenedorTarjeta).empty();
    $(divContenedorTarjeta).append(`
        <div class="services_serviceWrapper_gug5x ">
            <div class="services_serviceDecorator_ldMxA" style="border-color:${colorBorde}">
            </div>
            <div class="${clase}">
                <div class="services_serviceName_YhbTW services_size--16-sb_M5xdn txt--ellipsis">
                    <span class="services_serviceName_YhbTW_span services_size--14_Mfwds">
                        ${nombre}
                    </span>
                    <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                        ${duracion}min
                    </span>
                </div>
                <div class="services_servicePrice_wErzf services_size--16-sb_M5xdn">
                    ${precio} €
                </div>
            </div>
        </div>
    `);
    if(clase === 'services_serviceInfo_iDMQwAddCalendar'){
        const div = document.querySelector('.addServiceCalendar');
        // Si se encuentra el div, cambiamos la clase
        if (div) {
            div.classList.remove('addServiceCalendar'); // Eliminamos la clase antigua
            div.classList.add('addServiceCalendar66');    // Añadimos la nueva clase
            clicTarjetaModificarServicioIncialCalendar();
        }
    }
}

//CLIC TARJETA VERDE AÑADIR SERVICIO
document.addEventListener('DOMContentLoaded', function () {
    //seleccionar tarjetas serviciosAdd
    const targetServicesAdd = document.querySelectorAll('.services-list_serviceVariant_i9qZrAdd');
    if (targetServicesAdd) {
        targetServicesAdd.forEach(targetAdd => {
            targetAdd.addEventListener('click', function () {
                if(botonEditarServicioReserva){
                    let newReserv = botonEditarServicioReserva.getAttribute('data-new');
                    console.log(newReserv, "ES UNA NUEVA RESERVA??", infoArrayEnvio, "infoArrayEnvio");
                }


                let id_serviceChangeAdd = targetAdd.getAttribute('data-serviciochange');//id_servicio seleccionado
                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                var url = "get-serviceById";
                // Hacer una petición AJAX al servidor
                $.ajax({
                    url: url, // Ruta que definimos en web.php
                    method: 'POST',
                    data: {
                        _token: csrfToken, // Token CSRF para seguridad
                        id_service: id_serviceChangeAdd,
                    },
                    success: function(data) {
                        if(data.encontrado){
                            // //console.log(data.servicio);
                            //añadimos la tarjeta al html
                            aniadirServicioHtml(data.servicio.borderColor, data.servicio.nombre, data.servicio.duration, data.servicio.precio, '.selectServiceAdd', 'services_serviceInfo_iDMQwAdd');

                            //añadimos atributo
                            document.querySelector('.selectServiceAdd').setAttribute('data-service', data.servicio.id);

                            //cambiamos hora fin poniendo la horainicio + lo que dura el servicio
                            let horaInicioAdd2 = document.querySelector('.slotHorasCobrarServicioAdd').textContent;
                            let divContenedorHoraFinAdd = document.querySelector('.slotHoraFinCorbrarServicioAdd');
                            let duracionCompleta =  data.servicio.duration.toString()+'min';
                            divContenedorHoraFinAdd.textContent = calcularHoraFin(horaInicioAdd2, duracionCompleta);
                            let horaFinAdd = calcularHoraFin(horaInicioAdd2, duracionCompleta);
                            marcarHoraSeleccionada('.contenedorHorasFinAdd', horaFinAdd);

                             // Hacer scroll a la hora activa en ambos contenedores
                            const contenedor = document.querySelector('.contenedorHorasFinAdd .scrollable');
                            //función para hacer scroll hora inicio y fin activas
                            function intentarScroll(contenedor) {
                                if (!contenedor) return;

                                const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
                                if (!liActivo) return;

                                const rect = contenedor.getBoundingClientRect();

                                // Esperar a que sea visible (offcanvas / modal)
                                if (rect.height === 0) {
                                    requestAnimationFrame(() => intentarScroll(contenedor));
                                    return;
                                }

                                const offset =
                                    liActivo.offsetTop -
                                    contenedor.offsetTop -
                                    contenedor.clientHeight / 2 +
                                    liActivo.clientHeight / 2;

                                contenedor.scrollTop = offset;
                            }

                            // 🔥 Ejecutar para ambos
                            intentarScroll(contenedor);

                            //cerramos offcanvasServicios y abrimos añadirServicio
                            toggleOffcanvas('offcanvasShowAllServicesChangeAdd', 'offcanvasAddServicesChange');

                            //comprobamos si campo vacío empleado para deshabilitar botón guardar
                            let textosEmpleado = [
                                '.slotEmpleadoAddInicioCalendarAdd',
                                '.slotEmpleadoAdd',
                                '.slotEmpleadoAddInicio'
                            ];

                            let botones = [
                                document.getElementById('uid-377-input'),
                                document.getElementById('uid-377-inputEditReserv')
                            ];

                            // ¿Hay algún empleado seleccionado?
                            let empleadoSeleccionado = textosEmpleado.some(selector => {
                                let el = document.querySelector(selector);
                                return el && el.textContent.trim() !== 'Selecciona empleado';
                            });
                            // console.log("empleado seleccionado", empleadoSeleccionado);

                            if (!empleadoSeleccionado) {
                                botones.forEach(btn => {
                                    if (btn){
                                        btn.disabled = true;
                                        btn.classList.add('index_is--disabled_w97Nq');
                                    }
                                });
                            }else{
                                botones.forEach(btn => {
                                    if (btn){
                                        btn.disabled = false;
                                        btn.classList.remove('index_is--disabled_w97Nq');
                                    }
                                });
                            }

                            let eventoTemporalCalendario2 = document.querySelector('.fc-event.temporal2');
                            if(eventoTemporalCalendario2){
                               //console.log("CLIC TARJETAVERDE--hay temporaldos");

                                actualizarEvento(eventIdChangeCalendar, data.servicio.nombre, data.servicio.borderColor, '.fc-event.temporal2', horaFinAdd);
                                //tengo que cambiar colorBorde tambien
                                colorBordeNewReservCalendar = data.servicio.borderColor;
                                colorBordeSuperior = data.servicio.borderColor;
                            }else{
                                //console.log("CLIC TARJETAVERDE--NO hay temporaldos");
                                colorBordeNewReservCalendar = data.servicio.borderColor;
                                colorBordeSuperior = data.servicio.borderColor;
                            }
                        }
                    },
                    error: function(xhr) {
                        //console.log('Error al guardar el nombre de la categoria', xhr);
                    }
                });
            });
        });
    }

    // CLIKC TARJETA VERDE MODIFIVAR SERVICIO INICIAL
    const targetServices = document.querySelectorAll('.services-list_serviceVariant_i9qZr');
    if (targetServices) {
        targetServices.forEach(target => {
            target.addEventListener('click', function (event) {
                event.preventDefault();
                //obtenemos el id del servicio nuevo que queremos
                let id_serviceChange = target.getAttribute('data-serviciochange');
                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                var url = "get-serviceById";
                // Hacer una petición AJAX al servidor
                $.ajax({
                    url: url, // Ruta que definimos en web.php
                    method: 'POST',
                    data: {
                        _token: csrfToken, // Token CSRF para seguridad
                        id_service: id_serviceChange,
                    },
                    success: function(data) {
                        if(data.encontrado){
                            //cambio el data-id
                            let div_old_service = document.querySelector('.services_serviceWrapper_gug5x');
                            //obtenemos el id antiguo, lo borramos el array y añadimos el nuevo
                            let id_serviceOld = div_old_service.getAttribute('data-idserviceadd');
                            removeServiceArray(id_serviceOld);
                            addServiceArray(data.servicio.id);
                            div_old_service.setAttribute('data-idserviceadd', data.servicio.id);

                            //bordecolor, nombre servicio precioservicio
                            let borderColor = document.querySelector('.services_serviceDecorator_ldMxA');
                            let serviceName = document.querySelector('.services_serviceName_YhbTW');
                            let servicePrice = document.querySelector('.services_servicePrice_wErzf');

                            borderColor.style.borderColor = `${data.servicio.borderColor}`;
                            servicePrice.textContent = `${data.servicio.precio} €`;
                            $(serviceName).empty();
                            $(serviceName).append(`
                                ${data.servicio.nombre}
                                <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                                    ${data.servicio.duration}min
                                </span>
                            `);
                            //cambiamos el total
                            cambiarTotales(data.servicio.precio);
                            //poner hora acorde al nuevo servicio ponerHoraFinInicio(horaFin); calculateEndTime(dateTime, duration)
                            let horaInicio = obtenerHoraInicioInicio();
                            let horaFin = calculateEndTime(horaInicio, data.servicio.duration);

                            ponerHoraFinInicio(horaFin);
                            let eventoTemporalCalendario = document.querySelector('.fc-event.temporal');
                                if(eventoTemporalCalendario){
                                    //console.log(eventoTemporalCalendario, "eventoTemporalCalendarioSeleccionaSErvicio");
                                    actualizarEvento(eventIdChangeCalendar, data.servicio.nombre, data.servicio.borderColor, '.fc-event.temporal', horaFin);

                                    showDivBotonGuardarInfo('saveChangesFooterInfo');
                                    colorBordeNewReservCalendar = data.servicio.borderColor;
                                    colorBordeSuperior = data.servicio.borderColor;
                                }
                            //cerramos offcanvas de servicios y abrimos info
                            let eventDetailsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasShowAllServicesChange'));
                            if (eventDetailsOffcanvas) {
                                eventDetailsOffcanvas.hide();
                            }

                            // Abrir el offcanvas con id "offcanvasShowAllServicesChange"
                            const allServicesOffcanvas = new bootstrap.Offcanvas(document.getElementById('eventDetailsModal'));
                            allServicesOffcanvas.show();
                            setTimeout(() => {
                            ponerBotonesGuardarCambios();

                            }, 400);
                        }
                    },
                    error: function(xhr) {
                        //console.log('Error al guardar el nombre de la categoria', xhr);
                    }
                });
            });
        });
    }
});

//FUNCION OBTENER HORAS PANTALLAINICIO
function obtenerHoraInicioInicio(){
    let divHoraInicioIcinial2 = document.querySelector('.getOldService');
    if (divHoraInicioIcinial2) {
        let horaIncioIncio = document.querySelector('.slotHorasCobrarServicio').textContent;
        return horaIncioIncio;
    }
}

function obtenerHoraFinInicio(){
    if(document.querySelector('.slotHoraFinCorbrarServicio')){
        let horaFinInicio = document.querySelector('.slotHoraFinCorbrarServicio').textContent;
        return horaFinInicio;
    }
}

//funcion que cambia la hora fin en el visor de horaFin
function ponerHoraFinInicio(horaFin){
    if(document.querySelector('.slotHoraFinCorbrarServicio')){
        document.querySelector('.slotHoraFinCorbrarServicio').textContent = horaFin;
    }
}

function obtenerIdEmpleInicio(slotEmpleado){
    slotEmpleado = slotEmpleado.trim();
    if(document.querySelector(slotEmpleado)){
        return document.querySelector(slotEmpleado).getAttribute('data-empleado');
    }
}

function obtenerIdEmpleSecundario(slotEmpleado){
    if(document.querySelector(slotEmpleado)){
        return document.querySelector(slotEmpleado).getAttribute('data-empleid');
    }
}

function comprobarHorasServicioInicio(){
    let divContenedorServicioInicial = document.querySelector('.getOldService');//el servicio del inicio
    if (divContenedorServicioInicial) {
        let horaInicioComprobar = obtenerHoraInicioInicio();
        let horaFinComprobar = obtenerHoraFinInicio();
        let empleadoComprobar = obtenerIdEmpleInicio('.slotEmpleadoAddInicio');
        let firstService = servicesWithTimes[0]; // Obtener la primera posición del array

        // Comprobar si `horaInicio` y `horaFin` coinciden con las variables
        if (firstService.horaInicio !== horaInicioComprobar || firstService.horaFin !== horaFinComprobar || firstService.empleado !== empleadoComprobar) {
            // Actualizar `horaInicio` y `horaFin` si no coinciden
            firstService.horaInicio = horaInicioComprobar;
            firstService.horaFin = horaFinComprobar;
            firstService.empleado = empleadoComprobar;
        }
    }
}


//FUNCIÓN OBTENER EMPLEADO POR ID
function obtenerEmpleById(id_empleado){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "get-empleadoById";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            empleado_id: id_empleado,
        },
        success: function(data) {
            if (data.empleado) {
            }
        },
        error: function(xhr) {
            //console.log('Error desde añadir pantalla principal', xhr);
        }
    });

}

//FUNCION METER HORAS ARRAY INICIO
function meterHorasArrayInicio(slotHoraIncio, slotHoraFin, slotEmpleadoIncio, seleccionaCliente_value, duracion, idUnico = null){

   //obtener hora inicio fin y id servicio pantalla principal
    setTimeout(() => {
        let horaIncioPantallaPrincipalNoModify = document.querySelector(slotHoraIncio).textContent;
        let horaFinPantallaPrincipalNoModify = document.querySelector(slotHoraFin).textContent;
        let idEmpleada = obtenerIdEmpleInicio(slotEmpleadoIncio);
        idUnico = idUnico ? idUnico : null;
        //console.log(horaIncioPantallaPrincipalNoModify, horaFinPantallaPrincipalNoModify, "horas arrayInicio");

       selectedServiceIds.forEach((serviceId, index) => {
            servicesWithTimes.push({
                id_unico: idUnico,
                id: parseInt(serviceId, 10),
                horaInicio: horaIncioPantallaPrincipalNoModify,
                horaFin: horaFinPantallaPrincipalNoModify,
                id_empleado: idEmpleada,
                seleccionaCliente: seleccionaCliente_value,
                duracion: duracion,
                id_reserva: arrayIdsReservas[index]
            });
        });
        //reseteo el input seleccionaCliente
        let seleccionaCliente = document.getElementById('solicictaCliente');
        if(seleccionaCliente){
        seleccionaCliente.value= 0;
        }
        selectedServiceIds = [];
        // console.log(servicesWithTimes, "--sevicesWitTimes con id reserva");
    }, 600);
}

function meterHorasArrayInicioNoTimeOut(slotHoraIncio, slotHoraFin, slotEmpleadoIncio, seleccionaCliente_value, idUnico = null, fecha = null){
    //obtener hora inicio fin y id servicio pantalla principal
    // console.log(selectedServiceIds, "selectedServiceIds en no timeout");

         let horaIncioPantallaPrincipalNoModify = document.querySelector(slotHoraIncio).textContent;
         let horaFinPantallaPrincipalNoModify = document.querySelector(slotHoraFin).textContent;
         let durationCalendar = calcularDuracion(horaIncioPantallaPrincipalNoModify, horaFinPantallaPrincipalNoModify);

         let idEmpleada = obtenerIdEmpleInicio(slotEmpleadoIncio);
        //   idUnico = idUnico ? `${idUnico}_${idEmpleada}` : null;
         selectedServiceIds.forEach((serviceId, index) => {
            let idUnico2 = `${fecha}_${serviceId}_${horaIncioPantallaPrincipalNoModify.replace(/[\s:-]/g, '_')}__${horaFinPantallaPrincipalNoModify.replace(/[\s:-]/g, '_')}_${idEmpleada}`;
             servicesWithTimes.push({
                id_unico:idUnico2,
                id: parseInt(serviceId, 10),
                horaInicio: horaIncioPantallaPrincipalNoModify,
                horaFin: horaFinPantallaPrincipalNoModify,
                id_empleado: idEmpleada,
                seleccionaCliente: seleccionaCliente_value,
                duracion: durationCalendar,
                id_reserva: arrayIdsReservas[index]
             });
         });
         //reseteo el input seleccionaCliente
         let seleccionaCliente = document.getElementById('solicictaCliente');
         if(seleccionaCliente){
            seleccionaCliente.value= 0;
         }
         selectedServiceIds = [];
 }

 function meterHorasArrayMultiple(serviceId, horaIncio, horaFin, idEmpleada, seleccionaCliente_value, duracion, id_reserva = null, fecha = null){

    let id_unico = fechaEventoIdUnico + '_' + serviceId + '_' + horaIncio.replace(/[\s:-]/g, '_') + '__' + horaFin.replace(/[\s:-]/g, '_') + '_' + idEmpleada;
    servicesWithTimes.push({
        id_unico:id_unico,
        id: parseInt(serviceId, 10),
        horaInicio: horaIncio,
        horaFin: horaFin,
        id_empleado: idEmpleada,
        seleccionaCliente: seleccionaCliente_value,
        duracion: duracion,
        id_reserva:id_reserva
    });

 }

//FUNCIÓN PARA METER HORAS PANTALLA ADD SERVICIO
function meterHorasArraySecundaria(slothoraInicio, slotHoraFin, slotEmpleado, duracion, noIdReserva = false){
    let horaIncioScreenAddService = document.querySelector(slothoraInicio).textContent.trim();
    let seleccionaCliente = document.getElementById('solicictaCliente').value;

    let id_reserva = null;

    let horaFinScreenAddService = document.querySelector(slotHoraFin).textContent.trim();
    let idEmpleadaSecun = obtenerIdEmpleSecundario(slotEmpleado);

    selectedServiceIds.forEach((serviceId, index) => {
        if(noIdReserva){
            id_reserva = null;
        }else{
            id_reserva = arrayIdsReservas[index];
        }
        servicesWithTimes.push({
            id_unico: fechaEventoIdUnico + '_' + serviceId + '_' + horaIncioScreenAddService.replace(/[\s:-]/g, '_') + '__' + horaFinScreenAddService.replace(/[\s:-]/g, '_') + '_' + idEmpleadaSecun,
            id: parseInt(serviceId, 10),
            horaInicio: horaIncioScreenAddService,
            horaFin: horaFinScreenAddService,
            id_empleado:idEmpleadaSecun,
            seleccionaCliente: seleccionaCliente,
            duracion: duracion,
            id_reserva: id_reserva
        });
    });
    selectedServiceIds = [];
}

//FUNCIÓN QUE DEVUELVE DURACIÓN FORMATEADA 09:00 - 10:00
function formatearDuracion(servicio_id){
    let duracion = "";
    // Buscamos en el array servicesWithTimes el objeto que coincida con el id del servicio actual
    const serviceTime = servicesWithTimes.find(time => time.id === servicio_id);

    // Si encontramos un servicio coincidente, construimos la duración en el formato "10:45 - 12:15"
    if (serviceTime && serviceTime.horaInicio && serviceTime.horaFin) {
        duracion = `${serviceTime.horaInicio} - ${serviceTime.horaFin}`;
    }
    return duracion;
}

//FUNCIÓN PARA COMPROBAR 60,30,90
function comprobar603090(servicio_duracion){
    let duracion2 = servicio_duracion; // Ejemplo: 60, 90, etc.

    // Convertir la duración
    let tiempoFormateada = duracion2 >= 60
        ? `${Math.floor(duracion2 / 60)}h ${duracion2 % 60 !== 0 ? duracion2 % 60 + 'min' : ''}`
        : `${duracion2}min`;
        return tiempoFormateada;
}
//FUNCIÓN PARA COMPROBAR 60,30,90
function comprobar603090SinM(servicio_duracion){
    let duracion2 = servicio_duracion; // Ejemplo: 60, 90, etc.

    // Convertir la duración
    let tiempoFormateada = duracion2 >= 60
        ? `${Math.floor(duracion2 / 60)}h ${duracion2 % 60 !== 0 ? duracion2 % 60 + 'm' : ''}`
        : `${duracion2}m`;
        return tiempoFormateada;
}

//FUNCION OBTENER INICIALES
function obtenerIniciales(nombre, apellido1) {
    // Obtener la primera letra de cada apellido y convertirla a mayúsculas
    let inicial1 = nombre.trim().charAt(0).toUpperCase();

    if(apellido1 == null){
        return inicial1;
    }else{
        let inicial2 = apellido1.trim().charAt(0).toUpperCase();
        return `${inicial1}${inicial2}`;
    }
}
function obtenerIniciales2(nombreApellido) {
    // Separar el nombre completo en un arreglo con el espacio como delimitador
    let partes = nombreApellido.trim().split(' ');
    // Obtener la primera letra del nombre y del apellido, y convertirlas a mayúsculas
    let inicial1 = partes[0].charAt(0).toUpperCase(); // Primera letra del nombre
    let inicial2 = partes[1].charAt(0).toUpperCase(); // Primera letra del apellido

    // Devolver las iniciales concatenadas
    return `${inicial1}${inicial2}`;
}

//FUNCIÓN CREAR HTML TARJETAS FINALES CLIC BOTON GUARDAR 10:00 - 02:00= duracionServicio, tiempoformateado 60,90,
function construirHtmlTarjetasFinales(borderColor, nombre, precio, duracionServicio, tiempoFormateada2, empleadoNombre, inicialesEmple, empleadoApellido, seleccionaCliente, id_evento, id_servicio, id_empleado, id_reserva = null, dedondeviene = null, id_unicoEnviado = null) {

    let id_buton='';
    let atributo ='';
    // if(id_evento){
        id_buton = id_evento;
        atributo = `data-index='${id_buton}'`;
    // }
    let corazonSeleccionaCliente = '';
    if( parseInt(seleccionaCliente) === 1){
        corazonSeleccionaCliente = `
        <div class="padding-left-8">
            <img class="b-icon_img_I0kuC" src="${urlAplicacion}/storage/calendar/corazonRojoEmpleCliente.svg" data-testid="subbooking-staffer-is-requested" style="height: 15px;">
        </div>
        `;
    }
    let htmlContentTarjetaFinal = '';
    const [inicio, fin] = duracionServicio.split(' - ');
    let id_unico1 = `${inicio.replace(":", "_")}__${fin.replace(":", "_")}_${id_empleado}`;
    let id_unicoFinal = '';
    if(id_unicoEnviado === null){
        id_unicoFinal = fechaEventoIdUnico + '_' + id_servicio + '_' + id_unico1;
    }else{
        id_unicoFinal = id_unicoEnviado;
    }

    //usaremos el id_servicio y el dateTime como id para identificar el servicio en las tarjetas
    htmlContentTarjetaFinal= `
    <div class="subboking-drag-el" data-index="${id_unicoFinal}" data-id-reserva='${id_reserva}'>
         <div class="subbookings-list_card_j4UGY">
             <div class="margin-top-16 margin-bottom-16 index_booking_gZD1_">
                 <div class="index_details_QnFeq" style="max-height: 146px">
                     <div class="service_service_f0ki6">
                         <div class="service_border_sBKgz" style="border-color: ${borderColor};"></div>
                         <div class="service_name_kNYW0 service_size--16-sb_ZwJhS">
                             <div class="d-flex service_nameTitle_UOYvQ"> <span style="max-width: 6rem;" class="me-2 txt--ellipsis">${nombre}</span>  ${precio} € </div>
                             <button data-name-service="${nombre}" id="${id_buton}" data-index="${id_buton}" onclick="showModifyService(this)" data-id-unico="${id_unicoFinal}" data-id-reserva="${id_reserva}" class="buttonEditEvent index_button_TfmOz index_size--md_G1gdK index_theme--default_AtMGF index_slotTheme--default_pktIt service_pointerAll_Kr2yW margin-left-16">
                                 <div class="index_caption_W6r_J"> Editar </div>
                             </button>
                         </div>
                         <p class="mb-0 service_duration_IOD4B service_size--14_Q5I2p"> ${duracionServicio} <strong>·</strong>&nbsp;
                             <span class="service_durationTime_WILLi">
                                 <span class="duration"> ${tiempoFormateada2} </span>
                             </span>
                         </p>
                     </div>
                     <div class="index_resourceRow_cOELM">
                         <div class="padding-right-8 b-resource_resource_kWRm8 b-resource_size-xs_Da3bZ">
                             <div class="b-avatar_avatar_pJzSu" style="width: 32px; height: 32px; flex: 0 0 32px;">
                                 <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ${inicialesEmple} </div>
                             </div>
                             <div class="padding-left-8">
                                 <div class="resource_resourceLabel_yIrJp resource_size--10_lMDC9"> Empleado </div>
                                 <div class="size--14"> ${empleadoNombre} ${empleadoApellido}</div>
                             </div>
                             ${corazonSeleccionaCliente}
                         </div>
                     </div>
                     <div class="drag-icon_dragIcon_R71aJ">
                         <span class="b-icon iconFont icon-drag-n-drop" style="font-size: 10px;"></span>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 `;
 return htmlContentTarjetaFinal;
}

//FUNCIÓN CUANDO CLIC EN EDITAR SERVCIO CUANDO MULTIPLE
function showModifyService(botonServiceModify){
    //meto botonServiceModify en variable global para usarla en MANEJAR CIERRE SHOALLSERVICES clic en flecha atras editar servicio
    botonEditarServicioReserva = '';
    botonEditarServicioReserva = botonServiceModify;
    document.getElementById("uid-377-input").disabled = false;
    document.getElementById('uid-377-inputEditReserv').disabled = false;
    document.getElementById('uid-377-input').classList.remove('index_is--disabled_w97Nq');
    document.getElementById('uid-377-inputEditReserv').classList.remove('index_is--disabled_w97Nq');

    //lo he cambiado para que coja el id
    let id_evento33 = '';
    let newReserv = botonServiceModify.getAttribute('data-new');
     if(newReserv === true || newReserv === 'true'){
        id_evento33 = botonServiceModify.getAttribute('data-index');
     }else{
        id_evento33 = botonServiceModify.getAttribute('id');
     }


    let id_evento = id_evento33;
    idEventModify = '';
    idEventModify = id_evento;
    eventIdChangeCalendar = id_evento;

    let borderColor = botonServiceModify.getAttribute('data-border');
    colorBordeNewReservCalendar = borderColor;
    colorBordeSuperior = borderColor;

    if(newReserv === true || newReserv === 'true'){
        // console.log("Es nueva reserva", newReserv, id_evento33, eventIdChangeCalendar);
        document.getElementById('uid-377-inputCalendar').classList.remove('index_is--disabled_w97Nq');

        if(document.querySelector('.allServicesAddCalendar00').classList.contains('allservicesModificarInicialCalendar')){
            document.querySelector('.allServicesAddCalendar00').classList.remove('allservicesModificarInicialCalendar');
        }else if(document.querySelector('.allServicesAddCalendar00').classList.contains('allservicesVistaOtroServicioCalendar')){
            document.querySelector('.allServicesAddCalendar00').classList.remove('allservicesVistaOtroServicioCalendar');
        }
        document.querySelector('.newReservCalendar00').style.display='none';
        document.querySelector('.allServicesAddCalendar00').style.display='none';
        document.querySelector('.allServicesAddCalendar00Add').style.display='block';

        document.querySelector('.buttonEditStrackModifyNewReserv').style.display= "flex";
        document.querySelector('.buttonSavetrackModifyNewReserv').style.display= 'none';

    }else{
        toggleOffcanvas('eventDetailsModal', 'offcanvasAddServicesChange');
        document.querySelector('.buttonEditStrack').style.display= "flex";
        document.querySelector('.buttonAddStrack').style.display= 'none';
        //console.log("NO new reserv");
    }

    let event = calendar.getEventById(id_evento);
    // console.log(event, "event, botonEditar");

    let eventosConTemporalDos = document.querySelectorAll('.temporal2');
    if(eventosConTemporalDos.length > 0){
        eventosConTemporalDos.forEach(evento => {
            if(!evento.classList.contains('temporal')){
                evento.classList.add('temporal');
            }
            evento.classList.remove('temporal2');
        });
    }
    event.setProp('classNames', (event.classNames || []).concat('temporal2'));

    //ponemos el título
    let posicion = infoArrayEnvio.findIndex(evento => evento.id === id_evento33);

    let divTitulo = '';
    if(newReserv === true || newReserv === 'true'){
        divTitulo = document.querySelector('.allServicesAddCalendar00Add .b-custom-header_headerTitle_ogW55');
    }else{
        divTitulo = document.querySelector('#offcanvasAddServicesChange .b-custom-header_headerTitle_ogW55');
    }
   let titulo = `
        <span class="b-custom-header_title_GTxIs b-custom-header_wordBreakAll_U_pxk totalServiciosAñadidos">Servicio #${posicion+1}</span>
    `;
    $(divTitulo).empty();
    $(divTitulo).append(titulo);

    //insertarmos tarjeta servicio
    if(event.extendedProps.servicio){
        // console.log("hay extemtrop servicio", event.extendedProps.servicio);
        if(newReserv === true || newReserv === 'true'){
            let duracion026 = event.extendedProps.duracion;
            if(duracion026){
                duracion026 = duracion026;
            }else{
                duracion026 = calcularDuracion(obtenerHoraEuropaCentral(event.start), obtenerHoraEuropaCentral(event.end));
            }
            aniadirServicioHtml(event.extendedProps.servicio.borderColor, event.extendedProps.servicio.nombre, duracion026, event.extendedProps.servicio.precio, '.selectServiceAddCalendar', 'services_serviceInfo_iDMQwAddCalendar');
            document.querySelector('.selectServiceAddCalendar').setAttribute('data-service', event.extendedProps.servicio.id);
        }else{
            aniadirServicioHtml(event.extendedProps.servicio.borderColor, event.extendedProps.servicio.nombre, event.extendedProps.duracion, event.extendedProps.servicio.precio, '.selectServiceAdd', 'services_serviceInfo_iDMQwAdd');
            document.querySelector('.selectServiceAdd').setAttribute('data-service', event.extendedProps.servicio.id);
        }
    }else{
        // console.log("NO HAY------ hay extemtrop servicio");
    }

    let imagen = '';
    if(newReserv === true || newReserv === 'true'){
        // console.log("es una nueva reserva");
         //hora inicio fin
        document.querySelector('.slotHorasCobrarServicioAddCalendar').textContent = obtenerHoraEuropaCentral(event.start);
        document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent = obtenerHoraEuropaCentral(event.end);

        //marcamos las horas inicio y fin en los contenedores
        marcarHoraSeleccionada('.contenedorHorasFinAdd', obtenerHoraEuropaCentral(event.end));
        marcarHoraSeleccionada('.contenedorHorasInicioAdd', obtenerHoraEuropaCentral(event.start));


         // Hacer scroll a la hora activa en ambos contenedores
        const contenedor = document.querySelector('.contenedorHorasFinAdd .scrollable');
        const contenedor2 = document.querySelector('.contenedorHorasInicioAdd .scrollable');
        const contenedor35 = document.querySelector('.contenedorHorasInicioAddCalendar .scrollable');
        const contenedor45 = document.querySelector('.contenedorHorasFinAddCalendarclass  .scrollable');
        const contenedor65 = document.querySelector('.contenedorHorasFinAddCalendar .scrollable');

        //función para hacer scroll hora inicio y fin activas
        function intentarScroll(contenedor) {
            if (!contenedor) return;

            const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
            if (!liActivo) return;

            const rect = contenedor.getBoundingClientRect();

            // Esperar a que sea visible (offcanvas / modal)
            if (rect.height === 0) {
                requestAnimationFrame(() => intentarScroll(contenedor));
                return;
            }

            const offset =
                liActivo.offsetTop -
                contenedor.offsetTop -
                contenedor.clientHeight / 2 +
                liActivo.clientHeight / 2;

            contenedor.scrollTop = offset;
        }

        // 🔥 Ejecutar para ambos
        intentarScroll(contenedor);
        intentarScroll(contenedor2);
        intentarScroll(contenedor35);
        intentarScroll(contenedor45);
        intentarScroll(contenedor65);

        //empleado
        document.querySelector('.slotEmpleadoAddInicioCalendarAdd').textContent = event.extendedProps.empleada.nombre;
        document.querySelector('.slotEmpleadoAddInicioCalendarAdd').setAttribute('data-empleid', event.extendedProps.empleada.id);
        document.querySelector('.slotEmpleadoAddInicioCalendarAdd').setAttribute('data-empleado', event.extendedProps.empleada.id);
        imagen = document.querySelector('.solicitadoClientePantalla2');

        //ponemos el check a las horas inicio
        marcarHoraSeleccionada('.contenedorHorasInicioAddCalendar', obtenerHoraEuropaCentral(event.start));
        //ponemos el check a las horas fin
        marcarHoraSeleccionada('.contenedorHorasFinAddCalendar', obtenerHoraEuropaCentral(event.end));

    }else{
         //hora inicio fin
        document.querySelector('.slotHorasCobrarServicioAdd').textContent = obtenerHoraEuropaCentral(event.start);
        document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent = obtenerHoraEuropaCentral(event.end);

         //marcamos las horas inicio y fin en los contenedores
        marcarHoraSeleccionada('.contenedorHorasFinAdd', obtenerHoraEuropaCentral(event.end));
        marcarHoraSeleccionada('.contenedorHorasInicioAdd', obtenerHoraEuropaCentral(event.start));

         // Hacer scroll a la hora activa en ambos contenedores
        const contenedor = document.querySelector('.contenedorHorasFinAdd .scrollable');
        const contenedor2 = document.querySelector('.contenedorHorasInicioAdd .scrollable');

        //función para hacer scroll hora inicio y fin activas
        function intentarScroll(contenedor) {
            if (!contenedor) return;

            const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
            if (!liActivo) return;

            const rect = contenedor.getBoundingClientRect();

            // Esperar a que sea visible (offcanvas / modal)
            if (rect.height === 0) {
                requestAnimationFrame(() => intentarScroll(contenedor));
                return;
            }

            const offset =
                liActivo.offsetTop -
                contenedor.offsetTop -
                contenedor.clientHeight / 2 +
                liActivo.clientHeight / 2;

            contenedor.scrollTop = offset;
        }

        // 🔥 Ejecutar para ambos
        intentarScroll(contenedor);
        intentarScroll(contenedor2);

        //empleado
        document.querySelector('.slotEmpleadoAdd').textContent = event.extendedProps.empleada.nombre;
        document.querySelector('.slotEmpleadoAdd').setAttribute('data-empleid', event.extendedProps.empleada.id);
        document.querySelector('.slotEmpleadoAdd').setAttribute('data-empleado', event.extendedProps.empleada.id);
        imagen = document.querySelector('.solicitadoClientePantallaInfoClientePantallaDos');
    }
    //corazon
    let seleccionaCliente='';
    if(event.extendedProps.seleccionado_cliente){
        console.log("hay extentrop selecciona_cliente", event.extendedProps.seleccionado_cliente);

        seleccionaCliente = event.extendedProps.seleccionado_cliente;
    }else{
        seleccionaCliente = servicesWithTimes[posicion].seleccionaCliente;

    }
    if(seleccionaCliente === 1 || seleccionaCliente === '1'){
        imagen.src = urlAplicacion + "/storage/calendar/corazonRojoEmpleCliente.svg";
    }else{
        imagen.src = urlAplicacion + "/storage/calendar/heart-empty.svg";
    }
}

function eliminarTemporalDos(idEventModify){
    let eventRemoveTemporalDos = calendar.getEventById(idEventModify);
    if (eventRemoveTemporalDos && eventRemoveTemporalDos.classNames) {
        // Eliminar la clase 'temporal2' del array classNames
        var index = eventRemoveTemporalDos.classNames.indexOf('temporal2');
        if (index !== -1) {
            eventRemoveTemporalDos.classNames.splice(index, 1); // Elimina la clase 'temporal2'
        }
        eventRemoveTemporalDos.setProp('classNames', eventRemoveTemporalDos.classNames); // Esto actualiza las clases en el DOM del evento
    }
}

function marcarHoraSeleccionada(contenedorHoras, horaSeleccionada) {
    // Validar que horaSeleccionada tenga un valor válido
    if (!horaSeleccionada || horaSeleccionada.trim() === '') {
        console.warn('horaSeleccionada está vacía o no es válida');
        return;
    }

    let ContenedorHorasInicio = document.querySelector(contenedorHoras);
    if (!ContenedorHorasInicio) {
        // console.warn('No se encontró el contenedor: ' + contenedorHoras);
        return;
    }

    // Eliminar selección previa
    $(contenedorHoras + ' .index_--selected_oUDGp').removeClass('index_--selected_oUDGp');
    $(contenedorHoras + ' .index_--highlighted__3J43').removeClass('index_--highlighted__3J43');

    // Buscar el elemento con la hora seleccionada
    let horaInicioSeleccionada = ContenedorHorasInicio.querySelector(`[data-time="${horaSeleccionada.trim()}"]`);

    if (horaInicioSeleccionada) {
        $(horaInicioSeleccionada).addClass('index_--selected_oUDGp index_--highlighted__3J43');
        horaInicioSeleccionada.style.display = 'flex'; // Asegurarse de que el elemento esté visible
    } else {
        // console.warn('No se encontró elemento con data-time=' + horaSeleccionada);
    }
}

function guardarEditNewReserv(){
const buttonModifyNewReserv = document.getElementById('uid-377-inputEditNewReserv');
if (buttonModifyNewReserv) {
    buttonModifyNewReserv.addEventListener('click', function () {
        // eliminarTemporalDos(idEventModify);
        // console.log("GUARDAReDITnEWrESERV");

        let eventosConTemporalDos = document.querySelectorAll('.temporal2');
        if(eventosConTemporalDos.length > 0){
            eventosConTemporalDos.forEach(evento => {
                if(!evento.classList.contains('temporal')){
                    evento.classList.add('temporal');
                }
                evento.classList.remove('temporal2');
            });
        }
        let idServivioAddTarjetaBlanca = document.querySelector('.selectServiceAddCalendar').getAttribute('data-service');

        //index array a modificar
        let indexArrayModificarTex = document.querySelector('.allServicesAddCalendar00Add .totalServiciosAñadidos').textContent;
        let indexArrayModificar = indexArrayModificarTex.split('#')[1];
        indexArrayModificar = parseInt(indexArrayModificar) - 1;
        modifyServiceByIndex(indexArrayModificar, parseInt(idServivioAddTarjetaBlanca.trim(), 10));

        modifyServicesWithTimesNewReservByIndex(indexArrayModificar);

        getServicesById(selectedServiceIds2, function (servicios){
            let borderColor = document.querySelector('.selectServiceAddCalendar .services_serviceDecorator_ldMxA').style.borderColor;
            borderColor = borderColor.trim();
            let nombreServicio = document.querySelector('.selectServiceAddCalendar .services_serviceName_YhbTW_span').textContent;
            nombreServicio = nombreServicio.trim();
            let horaInicio = document.querySelector('.slotHorasCobrarServicioAddCalendar').textContent.trim();
            let horaFin = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent.trim();
            let idEmpleado = document.querySelector('.slotEmpleadoAddInicioCalendarAdd').getAttribute('data-empleid').trim();
            let nombre_Empleado = document.querySelector('.slotEmpleadoAddInicioCalendarAdd').textContent.trim();
            let precioServicio1 = document.querySelector('.selectServiceAddCalendar .services_servicePrice_wErzf').textContent.trim();
            precioServicio1 = precioServicio1.replace('€', '');
            document.querySelector('.newReservCalendar00').style.display = 'block';
            resetAddServiceScreen('.selectServiceAddCalendar', '.slotEmpleadoAddInicioCalendarAdd');
            document.querySelector('.allServicesAddCalendar00Add').style.display = 'none';

            let botonesCreateReserv = document.querySelector('.buttonSavetrackModifyNewReserv');
            botonesCreateReserv.style.display = 'flex';
            let botonesModifyService = document.querySelector('.buttonEditStrackModifyNewReserv');
            botonesModifyService.style.display = 'none';

             //esconder el contenedor de las tarjetas para poner las nueva offcPrincipal
             let divTarjetasIniciales = document.querySelector('.tarjetasIncialesMostrarOcultarCalendar');
             divTarjetasIniciales.classList.add('d-none');
             let divTarjetasNuevas = document.querySelector('.nuevasTarjetasMostrarOcultarCalendar');
             let htmlContent = '';
             let totalPricePay=0;

            //obtenemos los empleados existeNombreClienteComun
            getAllEmpleados(function(empleadosReservas) {
                //modificar el extentrop del evento:
             let eventoExtentropModificar = calendar.getEventById(idEventModify);//idEventModify viene de showModifyService
             let fechaParaCrearIdUnico = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
             let fechaIdUnico = formatearFeAnio(fechaParaCrearIdUnico);
             let id_servicioParaIdUnico = document.querySelector('.selectServiceAddCalendar').getAttribute('data-service');
             let id_unicoEvento = `${fechaIdUnico}_${id_servicioParaIdUnico}_${horaInicio.replace(/[\s:-]/g, '_')}__${horaFin.replace(/[\s:-]/g, '_')}_${idEmpleado}`;
            //  console.log(eventoExtentropModificar, "evento a modificar");
            if (eventoExtentropModificar.extendedProps && eventoExtentropModificar.extendedProps.servicio) {
                // console.log(eventoExtentropModificar.extendedProps.id_unico, "antes de modificar id unico");

                eventoExtentropModificar.extendedProps.servicio.borderColor = borderColor;
                eventoExtentropModificar.extendedProps.servicio.nombre = nombreServicio;
                eventoExtentropModificar.extendedProps.servicio.duracion = calcularDuracion(horaInicio, horaFin);
                eventoExtentropModificar.extendedProps.servicio.precio = precioServicio1;
                eventoExtentropModificar.extendedProps.servicio.id = idServivioAddTarjetaBlanca;
                eventoExtentropModificar.extendedProps.empleada.id = idEmpleado;
                eventoExtentropModificar.extendedProps.empleada.nombre = nombre_Empleado;
                eventoExtentropModificar.extendedProps.horaInicio = horaInicio;
                eventoExtentropModificar.extendedProps.horaFin = horaFin;
                //eliminar el evento de infoArrayEnvio y añadir el modificado
                let index = infoArrayEnvio.findIndex(item => item.id === idEventModify);

                if (index !== -1) {
                  // Reemplazamos el elemento en ese índice con el nuevo elemento
                  infoArrayEnvio.splice(index, 1, eventoExtentropModificar);
                }
            }else{
                // console.log("no hay eventoExtentrop", eventoExtentropModificar);

            }
            // console.log(eventoExtentropModificar, "evento despues de modificar");
            let inicialesEmpleados = [];
            nombreEmpleadosArray = [];
            let apellidos = [];
            let id_empleado = [];
            // Recorremos el array servicesWithTimes
            servicesWithTimes.forEach(service => {
                // Buscamos el empleado correspondiente usando el id_empleado
                let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.id_empleado));
                if (empleado) {
                    // Obtenemos las primeras dos letras del nombre del empleado
                    let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                    let nombre = empleado.nombre;
                    let apellido = empleado.primerApellido;
                    inicialesEmpleados.push(iniciales);
                    nombreEmpleadosArray.push(nombre);
                    apellidos.push(apellido);
                    id_empleado.push(empleado.id);
                }
            });
            // console.log(servicesWithTimes, "guardarModificación nueva reserva");

             //obtener ids de eventos para construir html
            let idsReservasServices = servicesWithTimes.map(s => s.id_reserva);
            let idsEventosParaHtml = infoArrayEnvio.map(e => e.id);
            // console.log(idsEventosParaHtml, "IDS EVENTOS HTML 2792");

            //recorremos todos los serviciosEncontrados generar html tarjetas
            //iteramos a la misma vez por las horas haciendo coincidir los indices

            servicios.forEach((servicio, index) => {
                // console.log(idsEventosParaHtml[index], "IDS EVENTOS HTML 2792");

                // Convertir el precio a número flotante
                let precioNumerico = parseFloat(servicio.precio);

                // Sumar el precio del servicio al total
                totalPricePay += precioNumerico;

                // Comprobar si horaInicio es 0
                let tiempoFormateada = comprobar603090(servicio.duration);
                let id_unico653 = servicesWithTimes[index].id_unico;

                // Obtener la horaInicio y horaFin del elemento correspondiente en servicesWithTimes por índice
                let apellido55 = apellidos[index];
                let nombreEmpleado55 = nombreEmpleadosArray[index];
                let inicialesEmpleado33 = inicialesEmpleados[index];
                let servicioHorario = servicesWithTimes[index];
                let seleccionaCliente = servicesWithTimes[index].seleccionaCliente;
                let empleadoId = id_empleado[index];
                let id_evento = idsEventosParaHtml[index];
                let id_reserva66 = servicesWithTimes[index].id_reserva;
                let duracionServicio = servicioHorario
                    ? `${servicioHorario.horaInicio} - ${servicioHorario.horaFin}`
                    : "Horario no disponible";

                // Construir HTML
                htmlContent += construirHtmlTarjetasFinales(
                    servicio.borderColor,
                    servicio.nombre,
                    servicio.precio,
                    duracionServicio,
                    tiempoFormateada,
                    nombreEmpleado55,
                    inicialesEmpleado33,
                    apellido55,
                    seleccionaCliente,
                    id_evento,
                    servicio.id,
                    empleadoId,
                    id_reserva66,
                    "2792",
                    id_unico653
                );

                //ponemos los ids unicos en los botones segun los que hay en servicesWithTimes

            });
                // Agregar todo el contenido generado al contenedor nuevo
                $(divTarjetasNuevas).empty();
                $(divTarjetasNuevas).append(htmlContent);

                //cambiar el precio en pantalla principal
                addHtmlDivPrecioFinal(totalPricePay, '#newReservCalendar p[data-testid="appointment-price2"]', '#newReservCalendar div[data-testid="appointment-to-be-paid2"]');

               //añadir los idesEventos a los botones
                let tarjetasServiciosMultiples = document.querySelectorAll('.subbookings-list_card_j4UGY');
                colorBordeReservArray = [];
                tarjetasServiciosMultiples.forEach((tarjeta, index) => {
                    let colorBorde = tarjeta.querySelector('.service_border_sBKgz').style.borderColor;
                    boton = tarjeta.querySelector('.buttonEditEvent');
                    boton.setAttribute('data-index', eventIdChangeCalendarArray[index]);
                    boton.setAttribute('data-border', colorBorde);
                    boton.setAttribute('data-new', true);
                    colorBordeReservArray.push(colorBorde);
                });
                // console.log(servicesWithTimes, infoArrayEnvio, "guardarModificado servicesTime y inofArrayEmvio");
            });
        });

    });
}
}
guardarEditNewReserv();

//clicamos en botón GUARDAR DE VISTA MODIFICAR
const buttonModifyReserv = document.getElementById('uid-377-inputEditReserv');
if (buttonModifyReserv) {
    buttonModifyReserv.addEventListener('click', function () {
        // eliminarTemporalDos(idEventModify);
        // console.log("GUARDAR MODIFICACION");

        let eventosConTemporalDos = document.querySelectorAll('.temporal2');
        if(eventosConTemporalDos.length > 0){
            eventosConTemporalDos.forEach(evento => {
                evento.classList.add('temporal');
                evento.classList.remove('temporal2');
            });
        }

        let idServivioAddTarjetaBlanca = document.querySelector('.selectServiceAdd').getAttribute('data-service');
         // añadimos servicio nuevo al array
         if(!infoArrayEnvio.event){
            selectedServiceIds=[];
        }
        selectedServiceIds.push(parseInt(idServivioAddTarjetaBlanca.trim(), 10));

        //index array a modificar
        let indexArrayModificarTex = document.querySelector('.totalServiciosAñadidos').textContent;
        let indexArrayModificar = indexArrayModificarTex.split('#')[1];
        indexArrayModificar = parseInt(indexArrayModificar) - 1;

        modifyServiceByIndex(indexArrayModificar, parseInt(idServivioAddTarjetaBlanca.trim(), 10));
        console.log(indexArrayModificar, "index array a modificar");

        modifyServicesWithTimesByIndex(indexArrayModificar);

        //console.log(selectedServiceIds," , ", selectedServiceIds2,  "BOTONgUARDAR--selectedServicesIds");
        getServicesById(selectedServiceIds2, function (servicios){
             //modificar el extentrop del evento:
             let eventoExtentropModificar = calendar.getEventById(idEventModify);
             console.log(eventoExtentropModificar, "evento a modificar");
            let id_reservaEventoModificar = eventoExtentropModificar.extendedProps.reservaId;

            //cambio si es necesario el corazón rojo del evento
            let img = document.querySelector('.solicitadoClientePantallaInfoClientePantallaDos');
            let seleccionadoPorCliente = img.getAttribute('alt');
            if(seleccionadoPorCliente.trim() === 'corazon rojo'){
                seleccionadoPorCliente = 1;
            }else{
                document.querySelectorAll(
                    `.fc-event.temporal[data-idreserv="${id_reservaEventoModificar}"] img`
                ).forEach(img => {
                    if (img.src.includes('corazonRojoPequenio.svg')) {
                        img.remove();
                    }
                });

                seleccionadoPorCliente = 0;
                console.log(seleccionadoPorCliente, "seleccionado por cliente");
            }
            if (eventoExtentropModificar.extendedProps && eventoExtentropModificar.extendedProps.servicio) {
                let borderColor = document.querySelector('.selectServiceAdd .services_serviceDecorator_ldMxA').style.borderColor;
                borderColor = borderColor.trim();
                let nombreServicio = document.querySelector('.selectServiceAdd .services_serviceName_YhbTW_span').textContent;
                nombreServicio = nombreServicio.trim();
                let horaInicio = document.querySelector('.slotHorasCobrarServicioAdd').textContent.trim();
                let horaFin = document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent.trim();
                let idEmpleado = document.querySelector('.slotEmpleadoAdd').getAttribute('data-empleid').trim();
                let nombre_Empleado = document.querySelector('.slotEmpleadoAdd').textContent.trim();
                let precioServicio1 = document.querySelector('.selectServiceAdd .services_servicePrice_wErzf').textContent.trim();
                precioServicio1 = precioServicio1.replace('€', '');
                eventoExtentropModificar.extendedProps.servicio.borderColor = borderColor;
                eventoExtentropModificar.extendedProps.servicio.nombre = nombreServicio;
                eventoExtentropModificar.extendedProps.servicio.duracion = calcularDuracion(horaInicio, horaFin);
                eventoExtentropModificar.extendedProps.servicio.precio = precioServicio1;
                eventoExtentropModificar.extendedProps.servicio.id = idServivioAddTarjetaBlanca;
                eventoExtentropModificar.extendedProps.empleada.id = idEmpleado;
                eventoExtentropModificar.extendedProps.empleada.nombre = nombre_Empleado;
                eventoExtentropModificar.extendedProps.horaInicio = horaInicio;
                eventoExtentropModificar.extendedProps.horaFin = horaFin;
                eventoExtentropModificar.extendedProps.seleccionado_cliente = seleccionadoPorCliente;
            }else{
            //console.log("no hay eventoExtentrop");

            }
            //console.log(eventoExtentropModificar, "evento a modificar con el nuevo servicio"); reservCobrarFooterInfo
            resetAddServiceScreen('.selectServiceAdd', '.slotEmpleadoAdd ');
            let botonesCobrar = document.querySelector('.reservCobrarFooterInfo');
            let botonesGuardarCobrar = document.querySelector('.saveChangesFooterInfo');
            botonesCobrar.style.display = 'none';
            botonesGuardarCobrar.style.display = 'flex';
            let botonesCreateReserv = document.querySelector('.buttonAddStrack');
            botonesCreateReserv.style.display = 'flex';
            let botonesModifyService = document.querySelector('.buttonEditStrack');
            botonesModifyService.style.display = 'none';
            toggleOffcanvas('offcanvasAddServicesChange', 'eventDetailsModal');

             //esconder el contenedor de las tarjetas para poner las nueva offcPrincipal
             let divTarjetasIniciales = document.querySelector('.subbookings-list_container_nMAxs .tarjetasIncialesMostrarOcultar');
             // $(divVaciar).empty();
             divTarjetasIniciales.classList.add('d-none');
             let divTarjetasNuevas = document.querySelector('.subbookings-list_container_nMAxs .nuevasTarjetasMostrarOcultar');
             let htmlContent = '';
             let totalPricePay=0;

            //obtenemos los empleados existeNombreClienteComun
            getAllEmpleados(function(empleadosReservas) {
                let inicialesEmpleados = [];
                nombreEmpleadosArray = [];
                let apellidos = [];
                let id_empleado = [];
                // Recorremos el array servicesWithTimes
                servicesWithTimes.forEach(service => {
                    // Buscamos el empleado correspondiente usando el id_empleado
                    let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.id_empleado));
                    if (empleado) {
                        // Obtenemos las primeras dos letras del nombre del empleado
                        let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                        let nombre = empleado.nombre;
                        let apellido = empleado.primerApellido;
                        inicialesEmpleados.push(iniciales);
                        nombreEmpleadosArray.push(nombre);
                        apellidos.push(apellido);
                        id_empleado.push(empleado.id);
                    }
                });
                 //obtener ids de eventos para construir html
                let idsReservasServices = servicesWithTimes.map(s => s.id_reserva);
                let idsEventosParaHtml = infoArrayEnvio.map(e => e.id);
                console.log(idsEventosParaHtml, "IDS EVENTOS HTML 2955");
                //recorremos todos los serviciosEncontrados generar html tarjetas
                //iteramos a la misma vez por las horas haciendo coincidir los indices
                servicios.forEach((servicio, index) => {
                    console.log(idsEventosParaHtml[index], "IDS EVENTOS HTML 2955");
                    // Convertir el precio a número flotante
                    let precioNumerico = parseFloat(servicio.precio);

                    // Sumar el precio del servicio al total
                    totalPricePay += precioNumerico;

                    // Comprobar si horaInicio es 0
                    let tiempoFormateada = comprobar603090(servicio.duration);

                    // Obtener la horaInicio y horaFin del elemento correspondiente en servicesWithTimes por índice
                    let apellido55 = apellidos[index];
                    let nombreEmpleado55 = nombreEmpleadosArray[index];
                    let inicialesEmpleado33 = inicialesEmpleados[index];
                    let servicioHorario = servicesWithTimes[index];
                    let seleccionaCliente = servicesWithTimes[index].seleccionaCliente;
                    let id_evento = idsEventosParaHtml[index];
                    let id_reserva99 = servicesWithTimes[index].id_reserva;
                    let id_empleado99 = id_empleado[index];
                    let duracionServicio = servicioHorario
                        ? `${servicioHorario.horaInicio} - ${servicioHorario.horaFin}`
                        : "Horario no disponible";

                    // Construir HTML
                    htmlContent += construirHtmlTarjetasFinales(
                        servicio.borderColor,
                        servicio.nombre,
                        servicio.precio,
                        duracionServicio,
                        tiempoFormateada,
                        nombreEmpleado55,
                        inicialesEmpleado33,
                        apellido55,
                        seleccionaCliente,
                        id_evento,
                        servicio.id,
                        id_empleado99,
                        id_reserva99,
                        "2955"
                    );
                });
                // Agregar todo el contenido generado al contenedor nuevo
                $(divTarjetasNuevas).empty();
                $(divTarjetasNuevas).append(htmlContent);

                //cambiar el precio en pantalla principal
                addHtmlDivPrecioFinal(totalPricePay, '#eventDetailsModal p[data-testid="appointment-price"]', '#eventDetailsModal div[data-testid="appointment-to-be-paid"]');

               //añadir los idesEventos a los botones
                let tarjetasServiciosMultiples = document.querySelectorAll('.subbookings-list_card_j4UGY');
                tarjetasServiciosMultiples.forEach((tarjeta, index) => {
                    boton = tarjeta.querySelector('.buttonEditEvent');
                    boton.setAttribute('data-index', eventIdChangeCalendarArray[index]);
                    boton.setAttribute('data-border', colorBordeReservArray[index]);
                    boton.setAttribute('data-new', false);
                });
                ponerBotonesGuardarCambios();
            });
        });

        //console.log(servicesWithTimes, infoArrayEnvio, "guardarModificado servicesTime y inofArrayEmvio");
    });
}


//FUNCIÓN QUE AÑADE DIV PRECIO FINAL OFFCANVAS INICIAL
function addHtmlDivPrecioFinal(totalPagar, divTotal, divApagar){
    const priceElement = document.querySelector(divTotal);//TOTAL
    let priceTobePay =  document.querySelector(divApagar);// A PAGAR
    if (priceElement) {
        priceElement.textContent= totalPagar.toFixed(2).replace('.', ',')+' €';
        $(priceTobePay).empty();
        let htmlTobePay = `
            <p style="margin:0px;" class="b-paragraph-m b-text-secondary"> A pagar </p>
            <p class="totalPagarNewReservCalendar b-heading-xl" style="font-weight: 700"> ${totalPagar.toFixed(2).replace('.', ',')} € </p>
        `;
        $(priceTobePay).append(htmlTobePay);
    }

}

function meterIdEmpleadoEnArray(arrayCompletoTodosDatos){
    let ids_empleados = [];
    // Recorremos el array con un bucle for
    for (let i = 0; i < arrayCompletoTodosDatos.length; i++) {
        ids_empleados.push(arrayCompletoTodosDatos[i].id_empleado);
    }
    return ids_empleados;
}

function getEmpleadosById(arrayCompleto, callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "obtener-empleadosByIds";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            ids_empleados: arrayCompleto,
        },
        success: function(response) {
            const empleadosReservas = response.empleados;
            // Ejecutar el callback con los datos
            callback(empleadosReservas);
        },
        error: function(xhr) {
            console.error("Error en la solicitud AJAX");
        }
    });
}

function getAllEmpleados(callback){
var csrfToken = $('meta[name="csrf-token"]').attr("content");
var url = "obtener-allEmpleados";
// Hacer una petición AJAX al servidor
$.ajax({
    url: url, // Ruta que definimos en web.php
    method: 'POST',
    data: {
        _token: csrfToken, // Token CSRF para seguridad
    },
    success: function(response) {
        const empleadosReservas = response.empleadosAll;
        // Ejecutar el callback con los datos
        callback(empleadosReservas);
    },
    error: function(xhr) {
        console.error("Error en la solicitud AJAX");
    }
});
}

//funcion marcar notificaciones como revisadas para no mostrar
function marcarTodasNotificacionRevisada(callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "marcar-notificacionRevisadaTodas";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
        },
        success: function(response) {
           const marcadas = response.marcadas;
           callback(marcadas);
        },
        error: function(xhr) {
            //console.log('Error desde añadir pantalla principal', xhr);
        }
    });
}

function marcarNotificacionById(id_reserva, callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "marcar-notificacionRevisadaById";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_reserva: id_reserva,
        },
        success: function(response) {
           const marcada = response.marcada;
           const reserva = response.reserva;
           callback(reserva, marcada);
        },
        error: function(xhr) {
            //console.log('Error al marcar la notificacion como comprobada', xhr);
        }
    });
}


function getServicesById(arrayIdServicios, callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "get-serviceByIdArray";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_serviceArray: arrayIdServicios,
        },
        success: function(response) {
           const servicios = response.serviciosEncontrados;
           callback(servicios);
        },
        error: function(xhr) {
            //console.log('Error desde añadir pantalla principal', xhr);
        }
    });
}

function getServiciosByReservas(arrayIdSReservas, callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "get-servicios-by-reservas";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            ids_reservas: arrayIdSReservas,
        },
        success: function(response) {
           const servicios = response.servicios;
           const reservas = response.reservas;
           callback(servicios, reservas);
        },
        error: function(xhr) {
            //console.log('Error desde añadir pantalla principal', xhr);
        }
    });
}

//PARA ENVIAR TAMBIEN OLDSERVICES
// function getServiciosByReservas(arrayIdSReservas, callback){
//     var csrfToken = $('meta[name="csrf-token"]').attr("content");
//     var url = "get-servicios-by-reservas";
//     // Hacer una petición AJAX al servidor
//     $.ajax({
//         url: url, // Ruta que definimos en web.php
//         method: 'POST',
//         data: {
//             _token: csrfToken, // Token CSRF para seguridad
//             ids_reservas: arrayIdSReservas,
//         },
//         success: function(response) {
//            const servicios = response.servicios;
//            const oldService = response.old_service; // aquí tienes el servicio antiguo completo
//         callback(servicios, oldService);
//         },
//         error: function(xhr) {
//             //console.log('Error desde añadir pantalla principal', xhr);
//         }
//     });
// }

function obtenerInicialesNombreYmeterEnArray() {
    let inicialesEmpleados = [];

    // Llamamos a getAllEmpleados para obtener la lista de empleados
    getAllEmpleados(function(empleadosReservas) {
        // Recorremos el array servicesWithTimes
        servicesWithTimes.forEach(service => {
            // Buscamos el empleado correspondiente usando el id_empleado
            let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.id_empleado));

            if (empleado) {
                // Obtenemos las primeras dos letras del nombre del empleado
                let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                inicialesEmpleados.push(iniciales);
            }
        });
        // Aquí puedes hacer algo con el array de iniciales de empleados
        //console.log(inicialesEmpleados, "INICIALES EMPLEADOS");  // Muestra el array con las iniciales
        return inicialesEmpleados;
    });
}


//CLIC EN BOTON GUARDAR CAMBIOS ADDSERVICE
const buttonAddServiceAdd = document.getElementById('uid-377-input');
if (buttonAddServiceAdd) {
    buttonAddServiceAdd.addEventListener('click', function (event) {
        event.preventDefault();
        let eventosConTemporalDos = document.querySelectorAll('.temporal2');
        if(eventosConTemporalDos.length > 0){
            eventosConTemporalDos.forEach(evento => {
                evento.classList.add('temporal');
                evento.classList.remove('temporal2');
            });
        }
        //TRUE OR FALSE SI ES MODIFICAR UNA RESERVA
        console.log(modificarReserva, "modificar reserva");

        //guardo el id del evento creado al asignar el empleado
        eventIdChangeCalendarArray.push(eventIdChangeCalendar);
        colorBordeReservArray.push(colorBordeNewReservCalendar);
        let idServivioAddTarjetaBlanca = document.querySelector('.selectServiceAdd').getAttribute('data-service');

        // añadimos servicio nuevo al array
        if(!infoArrayEnvio.event){
            selectedServiceIds=[];
        }

        addServiceArray(parseInt(idServivioAddTarjetaBlanca.trim(), 10));
        console.log(idServivioAddTarjetaBlanca, selectedServiceIds2,"ides 2222");

        getServicesById(selectedServiceIds2, function (servicios){
            console.log(serviciosEliminadosTemporales.length, "servicios eliminados");

           let duracion = convertirAHorasMinutos(document.querySelector('.selectServiceAdd .services_serviceDuration_Zb36z').textContent);
           let noIdReserva = true;
           meterHorasArraySecundaria('.slotHorasCobrarServicioAdd', '.slotHoraFinCorbrarServicioAdd', '.slotEmpleadoAdd', duracion, noIdReserva);
            console.log(servicesWithTimes, "meter hora array secundario 3244");
           if(servicesWithTimes.length <=1){
                comprobarHorasServicioInicio();
            }

           resetAddServiceScreen('.selectServiceAdd', '.slotEmpleadoAdd ');
            //cerrrar ofcanvas addservice abrir infopagar(principal)
            toggleOffcanvas('offcanvasAddServicesChange', 'eventDetailsModal');

             //esconder el contenedor de las tarjetas para poner las nueva offcPrincipal
             let divTarjetasIniciales = document.querySelector('.subbookings-list_container_nMAxs .tarjetasIncialesMostrarOcultar');
             // $(divVaciar).empty();
             divTarjetasIniciales.classList.add('d-none');
             let divTarjetasNuevas = document.querySelector('.subbookings-list_container_nMAxs .nuevasTarjetasMostrarOcultar');
             let htmlContent = '';
             let totalPricePay=0;

            //obtenemos los empleados existeNombreClienteComun
            getAllEmpleados(function(empleadosReservas) {
                let inicialesEmpleados = [];
                nombreEmpleadosArray = [];
                let apellidos = [];
                let id_empleado = [];
                // Recorremos el array servicesWithTimes
                servicesWithTimes.forEach(service => {
                    // Buscamos el empleado correspondiente usando el id_empleado
                    let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.id_empleado));
                    if (empleado) {
                        // Obtenemos las primeras dos letras del nombre del empleado
                        let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                        let nombre = empleado.nombre;
                        let apellido = empleado.primerApellido;
                        inicialesEmpleados.push(iniciales);
                        nombreEmpleadosArray.push(nombre);
                        apellidos.push(apellido);
                        id_empleado.push(empleado.id);
                    }
                });
                //obtener ids de eventos para construir html
                let idsReservasServices = servicesWithTimes.map(s => s.id_reserva);
                console.log(infoArrayEnvio, "infoArrayEnvio, 3260");

                let idsEventosParaHtml = infoArrayEnvio.map(e => e.id);
                console.log(idsEventosParaHtml, "IDS EVENTOS HTML 3251");
                //recorremos todos los serviciosEncontrados generar html tarjetas
                //iteramos a la misma vez por las horas haciendo coincidir los indices
                servicios.forEach((servicio, index) => {
                console.log(idsEventosParaHtml[index], "IDS EVENTOS HTML 3251");
                    // Convertir el precio a número flotante
                    let precioNumerico = parseFloat(servicio.precio);

                    // Sumar el precio del servicio al total
                    totalPricePay += precioNumerico;

                    // Comprobar si horaInicio es 0
                    let tiempoFormateada = comprobar603090(servicio.duration);

                    // Obtener la horaInicio y horaFin del elemento correspondiente en servicesWithTimes por índice
                    let apellido55 = apellidos[index];
                    let nombreEmpleado55 = nombreEmpleadosArray[index];
                    let inicialesEmpleado33 = inicialesEmpleados[index];
                    let servicioHorario = servicesWithTimes[index];
                    let seleccionaCliente = servicesWithTimes[index].seleccionaCliente;
                    let id_reserva = servicesWithTimes[index].id_reserva;
                    let id_evento44 = idsEventosParaHtml[index];
                    let id_empleado44 = id_empleado[index];
                    let duracionServicio = servicioHorario
                        ? `${servicioHorario.horaInicio} - ${servicioHorario.horaFin}`
                        : "Horario no disponible";

                    // Construir HTML
                    htmlContent += construirHtmlTarjetasFinales(
                        servicio.borderColor,
                        servicio.nombre,
                        servicio.precio,
                        duracionServicio,
                        tiempoFormateada,
                        nombreEmpleado55,
                        inicialesEmpleado33,
                        apellido55,
                        seleccionaCliente,
                        id_evento44,
                        servicio.id,
                        id_empleado44,
                        id_reserva,
                        "3251"
                    );
                });
                // Agregar todo el contenido generado al contenedor nuevo
                $(divTarjetasNuevas).empty();
                $(divTarjetasNuevas).append(htmlContent);

                //cambiar el precio en pantalla principal
                addHtmlDivPrecioFinal(totalPricePay, '#eventDetailsModal p[data-testid="appointment-price"]', '#eventDetailsModal div[data-testid="appointment-to-be-paid"]');
                // //console.log(servicesWithTimes, "servicios con tiempo");
                if(infoArrayEnvio.event){

                    eliminarEventosTemporales('eventoTemporal_');
                    // mostrarEventosArrayNewReservCalendar('.fechaCitaInfo');
                    mostrarEventosArrayMejorado('.fechaCitaInfo');
                }else{
                    // eliminarEventosTemporales('eventoTemporal_');
                }
                 //añadir los idesEventos a los botones
                 let tarjetasServiciosMultiples = document.querySelectorAll('.subbookings-list_card_j4UGY');
                 if(tarjetasServiciosMultiples.length > 0){
                    tarjetasServiciosMultiples.forEach((tarjeta, index) => {
                        boton = tarjeta.querySelector('.buttonEditEvent');
                        boton.setAttribute('data-index', eventIdChangeCalendarArray[index]);
                        boton.setAttribute('data-border', colorBordeReservArray[index]);
                        boton.setAttribute('data-new', false);
                    });
                 }
                 setTimeout(() => {
                    ponerBotonesGuardarCambios();
                 }, 400);
            });
        });
    });

}


function resetAddServiceScreen(divContenedor, slotNombreEmpleado){
    let slotNombre = document.querySelector(slotNombreEmpleado);
    if(slotNombre){
        //console.log(slotNombre, "existe slotNombre");
        let existeDataEmpleado = slotNombre.getAttribute('data-empleado');
        let existeDateEmpleadoId = slotNombre.getAttribute('data-empleid');
        if(existeDataEmpleado || existeDateEmpleadoId){
            //console.log("existe empleado");
            slotNombre.textContent="Selecciona empleado";
            slotNombre.removeAttribute('data-empleado');
            slotNombre.setAttribute('data-empleid', 'cualquiera');
        }else{
            //console.log("no existe empleado");
        }
    }else{
        //console.log("no existe slotNOmbre");
    }
    let divSelectedServiceAdd = document.querySelector(divContenedor);
    // //console.log(divContenedor, "contenedor en RESET");
    let tieneAtributo = divSelectedServiceAdd.getAttribute('data-service');
    if(tieneAtributo){
        divSelectedServiceAdd.removeAttribute('data-service');
    }
    $(divSelectedServiceAdd).empty();
    let htmlAddserviceReset = `
    <div class="services-wrapper_serviceEmpty_pbusk">
        Seleccionar servicio
        <span class="b-icon iconFont icon-arrow-right services-wrapper_serviceArrow_h8V47"></span>
    </div>
    `;
    $(divSelectedServiceAdd).append(htmlAddserviceReset);
}

//CLICAR EN "SELECCIONAR OTRO SERVICIO"
let botonAddServiceAdd = document.querySelector('.selectServiceAdd');
if (botonAddServiceAdd) {
    botonAddServiceAdd.addEventListener('click', function () {
        toggleOffcanvas('offcanvasAddServicesChange', 'offcanvasShowAllServicesChangeAdd');
    });

}

//FUNCIÓN QUE ABRE Y CIERRA OFCANVAS
function toggleOffcanvas(closeId, openId) {
    // Cerrar el offcanvas especificado por closeId
    const closeOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById(closeId));
    if (closeOffcanvas) {
        closeOffcanvas.hide();
    }

    // Abrir el offcanvas especificado por openId
    const openOffcanvas = new bootstrap.Offcanvas(document.getElementById(openId));
    openOffcanvas.show();
}

// CLICK TARJETA INICIAL MANEJA APERTURA SHOWALLSERVICES MODIFICAR SERVICIO INICIAL
const serviceInfoClosedDetailsModal = document.querySelector('.services_serviceInfo_iDMQw');
if (serviceInfoClosedDetailsModal) {
    serviceInfoClosedDetailsModal.addEventListener('click', function () {
        //console.log("entramos en los servicios");

        toggleOffcanvas('eventDetailsModal', 'offcanvasShowAllServicesChange');
    });
}

function cancelEditService(){
    // console.log("cancelar editar servicio");

      let newReserv ='';
        if(botonEditarServicioReserva){
             newReserv = botonEditarServicioReserva.getAttribute('data-new');
             botonEditarServicioReserva.style='';
        }
        //editar la reserva existente
        if(newReserv === 'false' || newReserv === false){
            // console.log("editar reserva existente");

            resetAddServiceScreen('.selectServiceAdd', '.slotEmpleadoAddInicioCalendarAdd');
            resetAddServiceScreen('.selectServiceAdd', '.slotEmpleadoAdd');
            cerrarTodosLosOffcanvas();
            // console.log(botonEditarServicioReserva, "BOTON EDITAR");

            let idEventoAntiguo = botonEditarServicioReserva.getAttribute('data-index');
            // console.log(idEventoAntiguo, "idEventoAntiguo");
            let eventoEncontrado = infoArrayEnvio.find(evento => evento.id === idEventoAntiguo);


            //volvemos a poner la apariencia visual del antiguo servicio
            let data = eventoEncontrado.extendedProps
            let eventoTemporalCalendario2 = document.querySelector('.fc-event.temporal2');
            if(eventoTemporalCalendario2){
                // console.log(eventoTemporalCalendario2);

                actualizarEvento(idEventoAntiguo, data.servicio.nombre, data.servicio.borderColor, '.fc-event.temporal2');
                //tengo que cambiar colorBorde tambien
                colorBordeNewReservCalendar = data.servicio.borderColor;
                colorBordeSuperior = data.servicio.borderColor;
                let eventObj = calendar.getEventById(idEventoAntiguo);
                eventObj.setStart(eventoEncontrado.start);
                eventObj.setEnd(eventoEncontrado.end);
                //cambiar hora visualmente del evento en el calendario

            }else{
                //console.log("CLIC TARJETAVERDE--NO hay temporaldos");
                colorBordeNewReservCalendar = data.servicio.borderColor;
                colorBordeSuperior = data.servicio.borderColor;
                let eventObj = calendar.getEventById(idEventoAntiguo);
                eventObj.setStart(eventoEncontrado.start);
                eventObj.setEnd(eventoEncontrado.end);
            }

            abrirOffcanvas('eventDetailsModal');

            //le quito el style porque se pone el borde del botón del color del servicio
            let buttons = document.querySelectorAll('.buttonEditEvent');
            if(buttons){
                buttons.forEach(button => {
                    button.removeAttribute('style');
                });
            }
            // botonEditarServicioReserva='';
            return;
        }
        // console.log("no es una reserva existente");

        let eventosConTemporalDos = document.querySelectorAll('.temporal2');
        // console.log(eventosConTemporalDos, "eventos con temporal2");

        if(eventosConTemporalDos.length > 0){
            eventosConTemporalDos.forEach(evento => {
                evento.classList.add('temporal');
                evento.classList.remove('temporal2');
            });
        }

        resetAddServiceScreen('.selectServiceAdd', '.slotEmpleadoAddInicioCalendarAdd');
        cerrarTodosLosOffcanvas();
        //quitar 1 al contador de servicios
        let totalServicios = selectedServiceIds2.length;
        let divTotalServicios = document.querySelector('.totalServiciosAñadidos');
        divTotalServicios.textContent = `Servicio #${totalServicios}`;
        let visualizaNEmpleado = document.querySelector('.visualizadorNombreEmpleado');
        visualizaNEmpleado.textContent = 'Selecciona empleado';
        visualizaNEmpleado.setAttribute('data-empleid', 'cualquiera');
        visualizaNEmpleado.setAttribute('data-empleado', 'cualquiera');
        // Método 1: Usando filter para crear un nuevo array sin el elemento
        // console.log(infoArrayEnvio," infoArrayEnvio", eventIdChangeCalendar, " eventIdChangeCalendar");
        if(eventIdChangeCalendar === ''){

        }else if(!Array.isArray(infoArrayEnvio)){


        }else{
            infoArrayEnvio = infoArrayEnvio.filter(item => item.id !== eventIdChangeCalendar);
            eliminarEventoCalendario(eventIdChangeCalendar);
            eventIdChangeCalendar='';
        }
        abrirOffcanvas('eventDetailsModal');
        let botonesGuardarModificacion = document.querySelector('.buttonEditStrack');
        if(botonesGuardarModificacion){
            botonesGuardarModificacion.style.display='none';
            document.querySelector('.buttonAddStrack').style.display='flex';
        }


}

// MANEJA CIERRE SHOWALLSERVICES
const exitShowAllServices = document.querySelectorAll('.exitShowAllServicesChange');
exitShowAllServices.forEach(service => {
    service.addEventListener('click', function () {
        cancelEditService();
    });
});

const cancelShowAllServices = document.getElementById('uid-376-input');
if(cancelShowAllServices){
    cancelShowAllServices.addEventListener('click', function () {
        cancelEditService();
    });
}

const cancelShowAllServices2 = document.getElementById('uid-376-inputEditReserv');
if(cancelShowAllServices2){
    cancelShowAllServices2.addEventListener('click', function () {
        cancelEditService();
    });
}

// var totalServiciosReservados;
//MANEJA BOTÓN AÑADIR SERVICIO
const ShowAddServices = document.getElementById('uid-319-inputAniadirServicio');//boton añadir servicio
if (ShowAddServices) {
    ShowAddServices.addEventListener('click', function () {

        botonEditarServicioReserva = '';//reiniciamos variable global
        //deshabilitar botón guardar botonEditarServicioReserva
        document.querySelector('.slotEmpleadoAddInicio').textContent = 'Selecciona empleado';
        document.querySelector('.slotEmpleadoAddInicio').setAttribute('data-empleid', 'cualquiera');

        document.querySelectorAll('.temporal2').forEach(function(element) {
            element.classList.remove('temporal2');
            element.classList.add('temporal');
        });
        document.getElementById("uid-377-input").disabled = true;
        document.getElementById('uid-377-inputEditReserv').disabled = true;
        //abrir y cerrar ofcanvas
        toggleOffcanvas('eventDetailsModal', 'offcanvasAddServicesChange');

        // let totalServicios = selectedServiceIds2.length + 1;
        let totalServicios = servicesWithTimes.length + 1;
        let divTotalServicios = document.querySelector('.totalServiciosAñadidos');
        divTotalServicios.textContent = `Servicio #${totalServicios}`;

        //ponemos hora inicio con 30 minutos de separación y hora fin
        let horaInicio='';

         let imagen = document.querySelector('.solicitadoClientePantallaInfoCliente');
        if(servicesWithTimes.length >= 2){// SERVICIO MULTIPLE O LO HA SIDO
            //obtener última posicion array
            horaInicio = servicesWithTimes[servicesWithTimes.length - 1].horaFin;
        }else if(servicesWithTimes.length === 0){
            //console.log("es igual a cero");

            let serleccionaClienteValor = obtenerValorCorazon('.solicitadoClientePantallaInfoCliente');

            let duracion = calcularDuracion(document.querySelector('.slotHorasCobrarServicio').textContent, document.querySelector('.slotHoraFinCorbrarServicio').textContent);
            meterHorasArrayInicio('.slotHorasCobrarServicio', '.slotHoraFinCorbrarServicio', '.slotEmpleadoAddInicio', serleccionaClienteValor, duracion);
            horaInicio = obtenerHoraFinInicio();

        }else{
             //comprobar si camvio corazon servicio inicial
             setTimeout(() => {
                // Comprobar si 'src' contiene 'corazonRojo'
                if (imagen && imagen.src.includes('corazonRojo')) {
                    servicesWithTimes[0].seleccionaCliente = 1;
                } else {
                    servicesWithTimes[0].seleccionaCliente = 0;
                }
                servicesWithTimes[0].horaInicio = obtenerHoraInicioInicio();
                servicesWithTimes[0].horaFin = obtenerHoraFinInicio();
                //comprobar si cambio empleado servicio inicial
                servicesWithTimes[0].id_empleado = document.querySelector('.slotEmpleadoAddInicio').getAttribute('data-empleado');
             }, 400);
             horaInicio = obtenerHoraFinInicio();
             //cojer hora fin pantalla anterior y ponerla de inicio allServicesAddCalendar00Add
        }
        document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent = calcularHoraFin(horaInicio, '30min');
        document.querySelector('.slotHorasCobrarServicioAdd').textContent = horaInicio;
        marcarHoraSeleccionada('.contenedorHorasFinAdd', calcularHoraFin(horaInicio, '30min'));
        marcarHoraSeleccionada('.contenedorHorasInicioAdd', horaInicio);

        // Hacer scroll a la hora activa en ambos contenedores
        const contenedor = document.querySelector('.contenedorHorasFinAdd .scrollable');
        const contenedor2 = document.querySelector('.contenedorHorasInicioAdd .scrollable');

        //función para hacer scroll hora inicio y fin activas
        function intentarScroll(contenedor) {
            if (!contenedor) return;

            const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
            if (!liActivo) return;

            const rect = contenedor.getBoundingClientRect();

            // Esperar a que sea visible (offcanvas / modal)
            if (rect.height === 0) {
                requestAnimationFrame(() => intentarScroll(contenedor));
                return;
            }
            const offset =
                liActivo.offsetTop -
                contenedor.offsetTop -
                contenedor.clientHeight / 2 +
                liActivo.clientHeight / 2;
            contenedor.scrollTop = offset;
        }

        // 🔥 Ejecutar para ambos
        intentarScroll(contenedor);
        intentarScroll(contenedor2);


    });
}

//ABRIR CERRAR COMBO CAMBIO ESTATUS
function openCloseComboStatus() {
    let botonAbrirComboStatus = document.querySelector('.botonAbrirComboStatus');
    let combo = document.querySelector('.comboStatusReserv');
    if (botonAbrirComboStatus) {
        $(botonAbrirComboStatus).off('click').on('click', function(event) {
            event.preventDefault();
            //console.log("clic combo status");
            if (combo.style.display === 'none' || combo.style.display === '') {
                combo.style.display = 'block'; // Mostrar el combo
            } else {
                combo.style.display = 'none'; // Ocultar el combo
            }
        });
    }
}
openCloseComboStatus();
//PONER CLASE SEGUN STATUS EN DIV CABECERA INFO SERVICIO
function setClass(status, div, confirmacionCambioReserva){
    const headerInfoService = document.querySelector(div);
    let comunClass = 'headerInfoService offcanvas-header align-items-center d-flex position-relative header_header_T53u1';
    // Establece las clases dinámicamente
    if(confirmacionCambioReserva === 'pendiente'){
        headerInfoService.className = 'status-P--bg '+ comunClass;
        document.querySelector('.reservStatus').textContent = 'El cliente tiene que confirmar';
    }else{
        if (status === 'pending') {
            headerInfoService.className = 'reservaPendiente '+ comunClass;
            document.querySelector('.reservStatus').textContent = 'Pendiente';
            let reservPendindTitle = document.querySelector('.reservStatus');
            $(reservPendindTitle).append(`
                <span class="tocaCampanita" style="font-size: small;text-transform: initial;">
                    (Toca la campanita para cambiar el estado)
                </span>
            `);
        }
        else if (status === 'Finalizada') {
            headerInfoService.className = 'reservaFinalizada '+ comunClass;
            document.querySelector('.reservStatus').textContent = 'Finalizado';
        } else if (status === 'cancelled') {
            headerInfoService.className = 'bg-danger text-white '+ comunClass;
            document.querySelector('.reservStatus').textContent = 'Cancelado';
        } else if (status === 'no_asistida') {
            headerInfoService.className = 'bg-warning text-black '+ comunClass;
            document.querySelector('.reservStatus').textContent = 'Inasistencia';
        } else if (status === 'confirmed') {
            headerInfoService.className = 'bg-success text-white '+comunClass;
            document.querySelector('.reservStatus').textContent = 'Confirmado';
        }
        else {
            // Clase por defecto si no coincide ningún estado
            headerInfoService.className = 'headerInfoService purify_Ks8Q8dHEaaaFeDYdNtADtw==';
        }
    }

}

// funcion mensajes alerta
function insertMessageResolAction(mensaje, divContenedor, style, type){
    let divDondeInsertar = document.querySelector(divContenedor);
    document.querySelectorAll('div.mensajeResolucion').forEach(div => div.remove());

    let iconType='';
    let classes ='';
    if(type === 'error'){
        iconType = ` <i style="font-size: 30px" class="fa fa-exclamation-triangle text-danger me-3 align-self-center" aria-hidden="true"></i>`;
        classes = `alert-success-dark`;
    }else if(type === 'ok'){
        iconType = `<i style="font-size: 30px" class="fa fa-check-circle text-success me-3 align-self-center" aria-hidden="true"></i>`;
        classes = `alert-success-green`;
    }
    let mensajeInsertar = `
    <div class="mensajeResolucion" style=" ${style}">
        <div style="" class="slideLeft alert ${classes} d-flex rounded-3" role="alert">
            ${iconType}
            <div class="text-content">
                <div class="notification-header">
                    <button style="right: 12px" type="button" class=" position-absolute btn-close btn-sm ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div style="top: 10px" class="notification-body position-relative"> ${mensaje}</div>
            </div>
        </div>
    </div>
    `;
    $(divDondeInsertar).append(mensajeInsertar);
}


//CANCELAR RESERVA DESDE OPCION DESPLEGABLE
function actionPresButon(butonAction){
    let idOffcanvasBig = document.getElementById('eventDetailsModal');
    let idReserva = idOffcanvasBig.getAttribute('data-idReserv');
    if(butonAction === 'cancelarCitaOption'){
        $('#modalCancelarReservaAdmin').modal('show');
        let cancelledButon = document.querySelector('.cancelledReservButton2030');
        if(cancelledButon){
            cancelledButon.addEventListener('click', function () {
                let valoresCancelacion = obtenerValoresCancelacion();

                $('#modalCancelarReservaAdmin').modal('show');
                let loader = document.querySelector('#loaderSperaAdministrator');
                loader.classList.remove('d-none');

                let csrfToken = $('meta[name="csrf-token"]').attr("content");
                let url = "cancelled-reserva";
                // Hacer una petición AJAX al servidor
                $.ajax({
                    url: url, // Ruta que definimos en web.php
                    method: 'POST',
                    data: {
                        _token: csrfToken, // Token CSRF para seguridad
                        id_reserva: idReserva,
                        responsablecancelacion: valoresCancelacion.responsableNombre,
                        motivoCancelacion: valoresCancelacion.motivoCancelacion,
                        idResponsable: valoresCancelacion.responsableId
                    },
                    success: function(data) {
                        if(data.cancelada){
                            cerrarTodosLosOffcanvas();
                            //inicializamos el calendario
                            initializeCalendar();

                            let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
                            insertMessageResolAction('Reserva cancelada con éxito', '.cal-wrapper', stylos, 'ok');
                        }
                    },
                    error: function(xhr) {
                        // //console.log('Error al obtener las horas', xhr);
                    }
                });
            });
        }
    }else if(butonAction === 'faltaCliente'){
        //console.log(butonAction, "falta cliente");
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        let url = "inasistencia-cliente";
        // Hacer una petición AJAX al servidor
        $.ajax({
            url: url, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken, // Token CSRF para seguridad
                id_reserva: idReserva,
                // responsablecancelacion: valoresCancelacion.responsableNombre,
                // motivoCancelacion: valoresCancelacion.motivoCancelacion,
                // idResponsable: valoresCancelacion.responsableId
            },
            success: function(data) {
                if(data.creada){
                    cerrarTodosLosOffcanvas();
                    //inicializamos el calendario
                    initializeCalendar();

                    let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
                    insertMessageResolAction('Inasistencia del cliente guarda', '.cal-wrapper', stylos, 'ok');
                }
            },
            error: function(xhr) {
                // //console.log('Error al obtener las horas', xhr);
            }
        });

    }

}
function obtenerValoresCancelacion() {
    let motivoCancelacion = document.getElementById("motivoCancelacion001").value;
    let inputSelectResponsable = document.querySelector('#reseponsableCancelacion001Selected .vscomp-hidden-input');
    let DivnombreResponsable = document.querySelector('#reseponsableCancelacion001Selected .vscomp-value');
    let nombreResponsable = DivnombreResponsable.getAttribute('data-tooltip');
      return {
        motivoCancelacion: motivoCancelacion,
        responsableNombre: nombreResponsable,
        responsableId: inputSelectResponsable.value
      };
}

//CANCELAR RESERVA DESDE NOTIFICATIONS CARD
function cancelledReservB(boton){
    // Muestra el loader Muestra el spinner
    let loader = document.querySelector('#loaderSperaAdministrator');
    loader.classList.remove('d-none'); // Asegúrate de que el spinner no esté oculto

    // Obtener la fecha de la reserva del atributo `data-fecha`
    const fechaReserva = boton.getAttribute('data-fecha');
    const idReservaCancelled = boton.getAttribute('data-idReserv');
    const divReserva = document.querySelector(`.cardAll[data-idReserva="${idReservaCancelled}"]`);
    const redPoindReservDelete = document.querySelector(`.redPoinNewReserv[data-reservredpoindid="${idReservaCancelled}"]`);
    //eliminar evento del offcanvas
    if (divReserva) {
        divReserva.remove();
    }
    if(redPoindReservDelete){
        redPoindReservDelete.remove();
    }
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "cancelled-reserva";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_reserva: idReservaCancelled
        },
        success: function(data) {
            if(data.cancelada){
                //cambiamos el número de la campanita
                // Selecciona el elemento <a> con la clase "notificationNewReserv"
                const notificationLink = document.querySelector('.notificationNewReserv');

                // Accede al último elemento <b> dentro de "notificationNewReserv"
                const lastBElement = notificationLink.querySelector('b:last-of-type');

                // Luego, accede al <span> dentro del último <b> si existe
                const spanInsideLastB = lastBElement ? lastBElement.querySelector('span') : null;

                if (spanInsideLastB) {
                    // Realiza las acciones que necesites con el <span>
                    spanInsideLastB.textContent = data.pendingCount;
                }

                //inicializamos el calendario
                initializeCalendar();
                // Mover el calendario a la fecha de la reserva usando `gotoDate`
                setTimeout(() => {
                    if (calendar) {
                        calendar.gotoDate(fechaReserva);
                    } else {
                        console.error("El calendario no está inicializado.");
                    }
                }, 500);
            }
        },
        error: function(xhr) {
        }
    });
}

function getReservaById(id_reserva){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "get-reservaById";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_reserva_: id_reserva
        },
        success: function(data) {
            if(data.confirmada){
                // spanInsideLastB.textContent = data.pendingCount;
            }
        },
        error: function(xhr) {
        }
    });
}

function comfirmReservB(boton){
    let loader = document.querySelector('#loaderSperaAdministrator');
    loader.classList.remove('d-none'); // Asegúrate de que el spinner no esté oculto
    // Obtener la fecha de la reserva del atributo `data-fecha`
    const fechaReserva = boton.getAttribute('data-fecha');
    const idReservaPendiente = boton.getAttribute('data-idReserv');
    const divReserva = document.querySelector(`.cardAll[data-idReserva="${idReservaPendiente}"]`);
    const redPoindReservDelete = document.querySelector(`.redPoinNewReserv[data-reservredpoindid="${idReservaPendiente}"]`);
    //eliminar evento del offcanvas
    if (divReserva) {
        divReserva.remove();
    }
    if(redPoindReservDelete){
        redPoindReservDelete.remove();
    }
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "confirmar-reserva";
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_reserva: idReservaPendiente
        },
        success: function(data) {
            if(data.confirmada){
                //cambiamos el número de la campanita
                // Selecciona el elemento <a> con la clase "notificationNewReserv"
                const notificationLink = document.querySelector('.notificationNewReserv');

                // Accede al último elemento <b> dentro de "notificationNewReserv"
                const lastBElement = notificationLink.querySelector('b:last-of-type');

                // Luego, accede al <span> dentro del último <b> si existe
                const spanInsideLastB = lastBElement ? lastBElement.querySelector('span') : null;

                if (spanInsideLastB) {
                    // Realiza las acciones que necesites con el <span>
                    spanInsideLastB.textContent = data.pendingCount;
                }
                //inicializamos el calendario
                initializeCalendar();
                // Mover el calendario a la fecha de la reserva usando `gotoDate`
                setTimeout(() => {
                    if (calendar) {
                        calendar.gotoDate(fechaReserva);

                    } else {
                        console.error("El calendario no está inicializado.");
                    }
                }, 500);
            }
        },
        error: function(xhr) {
            // //console.log('Error al obtener las horas', xhr);
        }
    });
}
//MOSTRAR RESERVAS PENDIENTES EN OFFCANVAS
function showReservPending() {

    let divTarjetas = document.getElementById('showReservPendingDiv');
    $(divTarjetas).empty();

    let csrfToken = $('meta[name="csrf-token"]').attr("content");

    fetch('check-pending-reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log(data, "DATA COMPLETA");

        // ======================================================
        //   TARJETAS DE RESERVAS PENDIENTES / CONFIRMADAS
        // ======================================================
        if (data.pending) {
            let esperConfirmacionClienteBg='';
            let svgEsperaConfirmaCliente='';

            data.reservas.forEach(reserva => {
                let inicio = reserva.horarios[0].date_time;
                let fin = calculateEndTime(
                    reserva.horarios[reserva.horarios.length - 1].date_time,
                    reserva.horarios[reserva.horarios.length - 1].duration
                );
                let horarioFinal = `
                    ${formatDate(inicio)} <br>de
                    ${formatTime(inicio)} a
                    ${fin}
                `;
                if(reserva.confirmaCliente === 'pendiente'){
                    esperConfirmacionClienteBg = 'background-color: #ffa5008c;';
                    svgEsperaConfirmaCliente = `
                    <svg class="svgAdventencia" xmlns="http://www.w3.org/2000/svg" width="505" height="423" viewBox="0 0 505 423" fill="none" style="&#10;    width: 40px;&#10;    height: 40px;&#10;">

                    <path d="M290.997 19.9999C301.446 28.1326 308.307 38.1158 314.934 49.4374C316.257 51.67 317.581 53.9017 318.907 56.1328C319.244 56.7017 319.581 57.2707 319.929 57.8569C323.508 63.8842 327.186 69.8498 330.872 75.8124C336.427 84.8125 341.95 93.8314 347.434 102.875C347.785 103.454 348.136 104.033 348.498 104.63C350.28 107.568 352.061 110.507 353.842 113.446C359.558 122.877 365.284 132.302 371.009 141.728C372.287 143.832 373.565 145.937 374.843 148.041C381.464 158.945 388.115 169.829 394.809 180.687C400.383 189.731 405.925 198.792 411.434 207.875C411.786 208.455 412.138 209.035 412.5 209.632C415.358 214.344 418.214 219.057 421.069 223.771C423.565 227.889 426.061 232.008 428.559 236.125C428.911 236.705 429.263 237.286 429.626 237.884C434.718 246.276 439.845 254.645 444.997 263C452.297 274.839 459.525 286.721 466.734 298.617C469.365 302.96 472 307.301 474.637 311.641C475.02 312.27 475.402 312.9 475.796 313.549C478.024 317.215 478.024 317.215 480.252 320.882C481.899 323.593 483.545 326.305 485.189 329.018C486.372 330.97 487.559 332.921 488.749 334.869C489.283 335.747 489.817 336.626 490.368 337.531C490.832 338.292 491.297 339.054 491.776 339.838C497.712 350.351 497.455 363.979 495.34 375.609C491.421 388.651 482.33 398.646 470.915 405.641C461.27 410.133 452.023 410.433 441.551 410.394C439.886 410.399 438.221 410.405 436.556 410.413C431.999 410.429 427.442 410.427 422.886 410.421C417.964 410.419 413.042 410.433 408.121 410.446C398.485 410.467 388.85 410.471 379.214 410.469C371.38 410.468 363.546 410.472 355.711 410.479C353.453 410.481 351.194 410.483 348.936 410.486C347.812 410.487 346.687 410.488 345.529 410.489C324.276 410.508 303.024 410.507 281.771 410.5C262.342 410.494 242.914 410.515 223.486 410.548C203.523 410.582 183.56 410.597 163.596 410.592C152.394 410.59 141.192 410.595 129.99 410.62C120.453 410.641 110.915 410.645 101.378 410.626C96.5153 410.617 91.6531 410.616 86.7905 410.636C82.3317 410.655 77.8735 410.65 73.4147 410.628C71.8091 410.624 70.2034 410.628 68.5979 410.641C52.7697 410.767 40.3925 407.174 28.8481 395.902C19.7124 386.274 15.6418 375.501 15.6215 362.312C15.5971 361.491 15.5726 360.669 15.5473 359.822C15.4933 348.206 20.2421 338.777 26.3715 329.187C27.6297 327.171 28.8875 325.154 30.145 323.137C31.1055 321.61 31.1055 321.61 32.0854 320.052C35.1043 315.231 38.0479 310.364 40.9965 305.5C42.1628 303.583 43.3295 301.666 44.4965 299.75C45.074 298.801 45.6515 297.852 46.2465 296.875C47.9965 294 49.7465 291.125 51.4965 288.25C52.0739 287.301 52.6512 286.353 53.2461 285.376C54.4143 283.457 55.5826 281.537 56.7509 279.618C59.6446 274.865 62.537 270.111 65.4262 265.355C71.5237 255.322 77.648 245.307 83.8091 235.312C91.5491 222.754 99.2101 210.148 106.855 197.532C110.046 192.268 113.241 187.008 116.436 181.747C118.202 178.838 119.969 175.929 121.735 173.019C122.085 172.443 122.435 171.867 122.795 171.273C124.951 167.722 127.106 164.172 129.261 160.622C137.929 146.34 146.605 132.063 155.295 117.794C158.196 113.03 161.096 108.265 163.997 103.5C165.163 101.583 166.33 99.6666 167.497 97.7499C168.074 96.8012 168.652 95.8524 169.247 94.8749C170.997 91.9999 172.747 89.1249 174.497 86.2499C175.075 85.3002 175.653 84.3505 176.248 83.372C177.409 81.465 178.57 79.5581 179.731 77.6513C182.738 72.7123 185.743 67.7716 188.743 62.8281C189.67 61.3015 189.67 61.3015 190.616 59.7441C191.783 57.8215 192.95 55.8983 194.116 53.9745C200.427 43.5865 206.438 33.7122 214.997 24.9999C215.56 24.4237 216.123 23.8475 216.704 23.2538C236.519 4.69165 269.375 5.54294 290.997 19.9999Z" fill="#FFB127"/>
                    <path d="M271.997 10.9999C271.648 11.5125 271.3 12.0252 270.941 12.5534C266.685 18.8714 262.663 25.317 258.684 31.8124C257.984 32.9526 257.284 34.0927 256.584 35.2328C249.398 46.9453 242.272 58.694 235.151 70.4457C231.54 76.4033 227.924 82.3577 224.309 88.3124C223.777 89.188 223.777 89.188 223.235 90.0812C216.731 100.794 210.217 111.501 203.698 122.205C200.797 126.97 197.897 131.735 194.997 136.5C193.83 138.417 192.663 140.333 191.497 142.25C190.919 143.199 190.342 144.147 189.747 145.125C178.663 163.333 167.58 181.542 156.497 199.75C155.919 200.698 155.342 201.647 154.747 202.624C153.579 204.543 152.411 206.462 151.242 208.381C148.348 213.135 145.456 217.889 142.567 222.644C136.469 232.678 130.345 242.693 124.184 252.687C118.776 261.463 113.39 270.252 108.037 279.061C107.316 280.246 106.596 281.431 105.875 282.616C102.257 288.562 98.664 294.524 95.1216 300.516C94.566 301.454 94.0104 302.393 93.438 303.36C87.3494 314.51 87.5804 327.173 91.0278 339.191C95.807 353.047 103.933 361.434 116.907 367.961C126.112 372.197 134.861 372.293 144.815 372.278C146.328 372.283 147.84 372.289 149.353 372.296C153.496 372.312 157.64 372.315 161.783 372.317C166.256 372.32 170.729 372.335 175.202 372.349C182.948 372.371 190.693 372.386 198.439 372.397C209.638 372.411 220.836 372.437 232.035 372.465C250.205 372.51 268.375 372.547 286.545 372.578C304.194 372.608 321.842 372.643 339.491 372.683C341.123 372.686 341.123 372.686 342.789 372.69C348.248 372.702 353.707 372.715 359.166 372.727C404.443 372.831 449.72 372.92 494.997 373C494.698 374.438 494.394 375.876 494.087 377.312C493.918 378.113 493.749 378.913 493.575 379.738C490.69 391.015 480.413 399.879 470.879 405.676C461.228 410.109 452.012 410.432 441.551 410.394C439.886 410.399 438.221 410.405 436.556 410.413C431.999 410.429 427.442 410.427 422.886 410.421C417.964 410.419 413.042 410.433 408.121 410.445C398.485 410.467 388.85 410.471 379.214 410.469C371.38 410.468 363.546 410.472 355.711 410.479C353.453 410.481 351.194 410.483 348.936 410.486C347.812 410.487 346.687 410.488 345.529 410.489C324.276 410.508 303.024 410.507 281.771 410.5C262.342 410.494 242.914 410.515 223.486 410.548C203.523 410.582 183.56 410.597 163.596 410.592C152.394 410.59 141.192 410.595 129.99 410.62C120.453 410.641 110.915 410.645 101.378 410.626C96.5153 410.617 91.6531 410.616 86.7905 410.636C82.3317 410.655 77.8735 410.65 73.4147 410.628C71.8091 410.624 70.2034 410.628 68.5979 410.641C52.7697 410.767 40.3925 407.174 28.8481 395.902C19.7124 386.274 15.6418 375.501 15.6215 362.312C15.5971 361.491 15.5726 360.669 15.5473 359.822C15.4933 348.206 20.2421 338.777 26.3715 329.187C27.6297 327.171 28.8875 325.154 30.145 323.137C31.1055 321.61 31.1055 321.61 32.0854 320.052C35.1043 315.231 38.0479 310.364 40.9965 305.5C42.1628 303.583 43.3295 301.666 44.4965 299.75C45.074 298.801 45.6515 297.852 46.2465 296.875C47.9965 294 49.7465 291.125 51.4965 288.25C52.0739 287.301 52.6512 286.353 53.2461 285.376C54.4143 283.456 55.5826 281.537 56.7509 279.618C59.6446 274.865 62.537 270.111 65.4262 265.355C71.5237 255.322 77.648 245.307 83.8091 235.312C91.5491 222.754 99.2101 210.148 106.855 197.532C110.046 192.268 113.241 187.007 116.436 181.747C118.202 178.838 119.969 175.929 121.735 173.019C122.085 172.443 122.435 171.866 122.795 171.273C124.951 167.722 127.106 164.172 129.261 160.622C137.929 146.34 146.605 132.063 155.295 117.794C158.196 113.03 161.096 108.265 163.997 103.5C165.163 101.583 166.33 99.6666 167.497 97.7499C168.074 96.8012 168.652 95.8524 169.247 94.8749C170.997 91.9999 172.747 89.1249 174.497 86.2499C175.075 85.3002 175.653 84.3505 176.248 83.372C177.409 81.465 178.57 79.5581 179.731 77.6513C182.738 72.7123 185.743 67.7715 188.743 62.828C189.67 61.3014 189.67 61.3014 190.616 59.744C191.783 57.8214 192.95 55.8983 194.116 53.9745C200.427 43.5864 206.438 33.7121 214.997 24.9999C215.56 24.4237 216.123 23.8475 216.704 23.2538C231.068 9.79817 253.325 6.85073 271.997 10.9999Z" fill="#FFB127"/>
                    <path d="M255.75 105.687C256.931 105.658 258.112 105.629 259.328 105.6C270.161 105.52 270.161 105.52 275 110C279.054 114.602 280.124 116.945 280.161 123.033C280.171 124.32 280.181 125.607 280.191 126.933C280.197 128.368 280.203 129.802 280.209 131.237C280.218 132.741 280.228 134.246 280.239 135.75C280.27 140.701 280.29 145.651 280.309 150.602C280.314 151.865 280.314 151.865 280.319 153.154C280.35 161.098 280.376 169.043 280.393 176.987C280.415 187.147 280.457 197.306 280.527 207.465C280.574 214.609 280.598 221.753 280.605 228.898C280.61 233.164 280.625 237.429 280.665 241.695C280.702 245.712 280.71 249.729 280.697 253.746C280.697 255.216 280.707 256.687 280.729 258.157C280.835 265.883 280.843 271.636 275.541 277.585C269.622 283.018 263.131 282.486 255.5 282.437C254.385 282.457 253.27 282.477 252.121 282.498C245.777 282.494 241.785 282.318 237 278C232.76 273.302 231.877 270.114 231.853 263.871C231.846 262.588 231.839 261.305 231.831 259.984C231.828 258.559 231.826 257.134 231.823 255.71C231.817 254.212 231.81 252.714 231.803 251.215C231.782 246.293 231.772 241.371 231.762 236.449C231.758 234.754 231.754 233.06 231.75 231.365C231.73 223.404 231.716 215.443 231.708 207.482C231.698 198.293 231.672 189.104 231.631 179.914C231.601 172.811 231.586 165.708 231.583 158.605C231.581 154.362 231.572 150.12 231.547 145.878C231.523 141.886 231.519 137.895 231.529 133.903C231.53 132.44 231.524 130.976 231.51 129.513C231.492 127.512 231.502 125.511 231.512 123.51C231.51 122.391 231.508 121.272 231.505 120.119C232.303 115.09 234.872 111.994 238.625 108.687C243.946 104.907 249.391 105.739 255.75 105.687Z" fill="#393A3A"/>
                    <path d="M248 106C248.002 106.766 248.003 107.531 248.005 108.32C248.042 126.966 248.101 145.612 248.184 164.258C248.224 173.275 248.256 182.292 248.271 191.31C248.284 199.171 248.311 207.031 248.355 214.892C248.377 219.053 248.393 223.214 248.392 227.375C248.391 231.295 248.409 235.215 248.441 239.135C248.45 240.57 248.452 242.005 248.446 243.44C248.419 251.364 248.602 257.273 253 264C257.36 268.113 263.133 267.554 268.813 267.687C269.792 267.722 270.771 267.756 271.779 267.791C274.186 267.873 276.593 267.942 279 268C279.25 272.331 278.491 274.171 275.68 277.57C269.522 282.812 263.206 282.486 255.5 282.437C254.385 282.457 253.27 282.477 252.121 282.498C245.777 282.494 241.785 282.318 237 278C232.76 273.302 231.877 270.114 231.853 263.871C231.846 262.588 231.839 261.305 231.831 259.984C231.828 258.559 231.826 257.134 231.823 255.71C231.817 254.212 231.81 252.714 231.803 251.215C231.782 246.293 231.772 241.371 231.762 236.449C231.758 234.755 231.754 233.06 231.75 231.365C231.73 223.404 231.716 215.443 231.708 207.482C231.698 198.293 231.672 189.104 231.631 179.914C231.601 172.811 231.586 165.708 231.583 158.605C231.581 154.362 231.572 150.12 231.547 145.878C231.523 141.886 231.519 137.895 231.529 133.903C231.53 132.44 231.524 130.977 231.51 129.513C231.492 127.512 231.502 125.511 231.512 123.51C231.51 122.391 231.508 121.272 231.505 120.119C232.303 115.09 234.872 111.994 238.625 108.687C242.059 106.248 243.824 105.89 248 106Z" fill="#393A3A"/>
                    <path d="M267.225 316.039C274.032 319.727 277.567 324.685 279.999 332C281.197 340.142 279.574 346.741 275.374 353.687C269.758 359.155 263.044 362.077 255.249 362.312C248.719 362.198 244.557 360.391 239.795 355.941C233.5 349.227 231.461 343.932 231.698 334.738C232.553 326.954 236.967 322.654 242.682 317.664C249.881 312.492 259.239 312.486 267.225 316.039Z" fill="#393A3A"/>
                    <path d="M256.002 314C255.581 314.664 255.159 315.328 254.725 316.012C254.177 316.895 253.629 317.778 253.065 318.687C252.247 319.993 252.247 319.993 251.412 321.324C248.432 326.98 248.073 333.377 249.651 339.527C251.763 345.53 254.392 349.811 260.002 353C263.286 354.261 266.575 355.214 270.002 356C270.002 356.66 270.002 357.32 270.002 358C262.832 361.748 255.908 363.589 247.854 361.422C241.04 358.459 235.897 352.631 232.502 346.125C231.376 339.082 230.863 332.276 234.534 325.918C240.18 318.544 246.492 313.558 256.002 314Z" fill="#3C3C3A"/>
                    </svg>
                    `;

                }else{
                    esperConfirmacionClienteBg ='';
                    svgEsperaConfirmaCliente='';
                }
                // Generar la lista de servicios
                let servicios = reserva.servicios.map(s => s.nombre);

                let serviciosHTML = servicios.length === 1
                    ? servicios[0]
                    : servicios.map(s => `• ${s}`).join("<br>");

                // Imagen del cliente
                let imgeClient = reserva.user?.profile_photo_url
                    ? `<img class="rounded-circle imgCabecera" width="35" height="35"
                        src="${reserva.user.profile_photo_url}"
                        alt="${reserva.user.name}" />`
                    : '';

                // Información del cliente
                let botonShowInfoCliente = reserva.user
                    ? `<button onclick="showClientInfo(${reserva.user.id})"
                        class="btn btn-dark" style="min-width: 80px">Cliente</button>`
                    : '';

                // Botón confirmar
                let botonConfirmar = reserva.status === 'pending'
                    ? `<button style="border:1px solid #c7cbd4"
                        onclick="comfirmReservB(this)"
                        class="btn btn-light"
                        data-idReserv="${reserva.reserva_id}"
                        data-fecha="${reserva.fecha?.split(' ')[0]}">
                        Confirmar
                    </button>`
                    : '';

                // =======================
                // TARJETA
                // =======================
                let tarjetaReserva = `
                    <div class="card cardAll" data-idReserva="${reserva.reserva_id}" style="padding-bottom:0px;${esperConfirmacionClienteBg}">
                        ${imgeClient}
                        <div class="card-body" style="display:block">
                            <div style="margin:auto;">
                                <h5 class="card-title">
                                ${svgEsperaConfirmaCliente} ${reserva.multiple ? "Reserva múltiple" : serviciosHTML}
                                </h5>

                                ${reserva.multiple
                                    ? `<p class="card-text" style="text-align: left;">${serviciosHTML}</p>`
                                    : ''
                                }

                                <p class="card-text mb-2" style="text-align: left;">${horarioFinal}</p>


                            </div>

                            <div class="">
                                <button class="btn btn-light"
                                    style="min-width:80px;border:1px solid #c7cbd4;margin-bottom: 0px;"
                                    onclick="deleteNotification(${reserva.reserva_id})">
                                    <span class="b-icon iconFont icon-trash" style="font-size:23px;"></span>
                                </button>

                                ${botonConfirmar}

                                <button onclick="cancelledReservB(this)"
                                        class="btn btn-light"
                                        style="min-width:80px;border:1px solid #c7cbd4;margin-bottom: 0px;"
                                        data-idReserv="${reserva.reserva_id}">
                                    Cancelar
                                </button>

                                ${botonShowInfoCliente}
                            </div>
                        </div>
                    </div>
                `;

                divTarjetas.insertAdjacentHTML('beforeend', tarjetaReserva);
            tippy('.svgAdventencia', {
                    content: 'A la espera de que el cliente acepte',
                    animation: 'scale',
                    arrow: true,
                    placement: 'top',
                    theme: 'white-theme'   // ← aquí aplicas el estilo blanco
                });
            });
        }



        // ======================================================
        //   TARJETAS DE RESERVAS CANCELADAS
        // ======================================================
        if (data.cancelled) {

            data.canceladas.forEach(reserva => {

                let tarjetaCancelada = `
                    <div class="card border-danger mb-3" style="background:#ffe5e5;padding-bottom:0px;">
                        <div class="card-body" style="display:block;text-align:center;">

                            <h5 class="card-title text-danger fw-bold" style="font-size: 18px;">
                                Reserva cancelada ❌
                            </h5>

                            <p class="card-text" style="margin-top: 8px; line-height: 1.4;">
                                El servicio <strong>${reserva.servicio.nombre}</strong><br>
                                del día <strong>${formatDate(reserva.date_time)}</strong><br>
                                ha sido cancelado por el cliente.
                            </p>

                            <button onclick="deleteNotification(${reserva.id})"
                                class="btn btn-outline-danger btn-sm mt-2">
                                Quitar aviso
                            </button>

                        </div>
                    </div>
                `;

                divTarjetas.insertAdjacentHTML('beforeend', tarjetaCancelada);
            });
        }
        // Si no hay nada
        if (!data.pending && !data.cancelled) {
            divTarjetas.innerHTML = '<p class="text-center">No hay avisos de reservas.</p>';
        }

    })
    .catch(error => console.error("Error al verificar reservas:", error));
}




function showClientInfo(id_cliente) {
    // Llamamos a la función para obtener el cliente por su ID
    getClientById(id_cliente).then(function(cliente) {
        // Actualiza los campos del modal con la información del cliente
        document.getElementById('clientName').textContent = cliente.name || 'No disponible';
        document.getElementById('clientEmail').textContent = cliente.email || 'No disponible';
        document.getElementById('clientPhone').textContent = cliente.telefono || 'No disponible';

        // Si estás usando Bootstrap, puedes usar el siguiente código para mostrar el modal
        var myModal = new bootstrap.Modal(document.getElementById('clientInfoModal'));
        myModal.show(); // Abre el modal
    }).catch(function(error) {
        //console.log("Error:", error); // Maneja el caso de error
    });
}

function ponerNomIdEmpleInicio(nombreEmple, id_empleado){
    let slotNomEmpleInic = document.querySelector('.slotEmpleadoAddInicio');
    if (slotNomEmpleInic) {
        slotNomEmpleInic.setAttribute('data-empleado', id_empleado);
        slotNomEmpleInic.setAttribute('data-empleid', id_empleado);
        slotNomEmpleInic.innerHTML = nombreEmple;
    }
}

function formatearFeAnio(fechaCompleta) {
    const fecha = new Date(fechaCompleta);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const día = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${día}`;
}

// Ejemplo de uso
// const fechaEjemplo = "Fri Dec 13 2024 09:00:00 GMT+0100 (hora estándar de Europa central)";
//console.log(convertirFechaAFormatoISO(fechaEjemplo)); // "2024-12-13"
function formatDate3(fecha) {
    const date = new Date(fecha);
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mes es 0-indexado
    const dia = String(date.getDate()).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}
// Ejemplo de uso
// const fecha = "Fri Dec 13 2024 09:00:00 GMT+0100 (hora estándar de Europa central)";

function formatearFecha4(fecha, horaInicio) {
    // Convertir la fecha a un objeto Date
    const date = new Date(fecha);

    // Extraer el año, mes, y día de la fecha
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mes es 0-indexado
    const dia = String(date.getDate()).padStart(2, '0');

    // Usar la horaInicio proporcionada, formateada como 'HH:MM'
    const [hora, minuto] = horaInicio.split(":");

    // Construir la cadena final en formato 'YYYY-MM-DD HH:MM:SS'
    return `${anio}-${mes}-${dia} ${hora}:${minuto}:00`;
}
// Ejemplo de uso
// const fecha = "Fri Dec 13 2024 09:00:00 GMT+0100 (hora estándar de Europa central)";
// const horaInicio = "09:00";

function convertirAHorasMinutos(cadena) {
    // Inicializamos las variables de horas y minutos
    let horas = 0;
    let minutos = 0;

    // Buscamos y extraemos la cantidad de horas (si existe)
    const regexHoras = /(\d+)\s*h/;
    const matchHoras = cadena.match(regexHoras);
    if (matchHoras) {
        horas = parseInt(matchHoras[1]);
    }

    // Buscamos y extraemos la cantidad de minutos (si existe)
    const regexMinutos = /(\d+)\s*min/;
    const matchMinutos = cadena.match(regexMinutos);
    if (matchMinutos) {
        minutos = parseInt(matchMinutos[1]);
    }

    // Convertimos todo a minutos y devolvemos el total
    return (horas * 60) + minutos;
}
// Ejemplos de uso
//console.log(convertirAHorasMinutos("1h 30min")); 90

// Función para dar formato a la fecha
function formatDate(dateTime) {
    const date = new Date(dateTime);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

formatDate();

function formatDate2(dateTime) {
    const date = new Date(dateTime);
    const options = {
        weekday: 'short', // Día de la semana abreviado
        day: 'numeric',   // Día del mes
        month: 'short'    // Mes abreviado
    };
    return date.toLocaleDateString('es-ES', options);
}

// Función para dar formato a la hora de inicio
//formato de entrada:"2024-12-18 09:00:00".
//formato de salida:"09:00".
function formatTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Calcula la hora de fin de un servicio.
 *
 * @param {string} dateTime - Formato1:"09:00", Formato2:"2024-12-18 09:00:00".
 * @param {number} duration - Foramto: 60.
 * @returns {string} Formato: "11:45".
 */
function calculateEndTime(dateTime, duration) {
    let date;
    // Verificar si el formato es solo "HH:mm"
    if (/^\d{2}:\d{2}$/.test(dateTime)) {
        const [hours, minutes] = dateTime.split(':').map(Number);
        date = new Date();
        date.setHours(hours, minutes, 0, 0); // Establece la hora y minutos en la fecha actual
    } else {
        // Asume que es un formato de fecha completa
        date = new Date(dateTime);
    }
    // Sumar la duración en minutos
    date.setMinutes(date.getMinutes() + duration);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Devuelve la fecha que se muestra en el flatPicker info reserva.
 *
 * @param {string} dateTime - Formato:"Fri Mar 14 2025 09:00:00 GMT+0100 (hora estándar de Europa central)".
 * @returns {string} Formato: "vie. 14 mar".
 */
function formatDateForFlatpickr(dateTime) {
    if (dateTime) {
        //objeto Date
        const date = new Date(dateTime);
        if (isNaN(date)) return "Fecha no válida";

        // Configuración para el formato "D, d M."
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        const formattedDate = date.toLocaleDateString('es-ES', options).replace(',', '.');
        return formattedDate;
    }
    return "Fecha inválida";
}

/**
 * Realiza una solicitud AJAX para obtener la disponibilidad de los empleados
 * en un horario y fecha específicos, llama a función que se encarga de mostrar visualmente la disponivilidad.
 * Formato de "disponibilidadEmpleados:
 * -disponible:true
 * -empleado:"África"
 * -fecha_hora_reserva:"2025-03-14T13:10:00.000000Z"
 * -idEmpleado:1"
 * @param {string} inicioServicio - Formato: "11:45".
 * @param {string} duracion - Formato:"30".
 * @param {string} diaSeleccionado - Formato:"2025-03-14".
 * @param {string} id_despleableSelecEmpleado_almohadilla - Formato:"#selectEmpleModalAddInicioCalendar".
*/
function peticionAjaxDisponibleEmpleados(inicioServicio, duracion, diaSeleccionado, id_despleableSelecEmpleado_almohadilla){
    // console.log(inicioServicio, duracion, diaSeleccionado, infoArrayEnvio,botonEditarServicioReserva ,reprogramarCita,serviciosEliminadosTemporales,  "peticion ajax");

    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let empleadas_disponibles = "empleadas-disponibles";
    $.ajax({
        url: empleadas_disponibles,
        method: 'POST',
        data: {
            _token: csrfToken,
            horaInicioReserva: inicioServicio,
            duracionReserva: duracion,
            fechaReserva: diaSeleccionado,
            serviciosEliminadosTemporales: serviciosEliminadosTemporales.length
                ? serviciosEliminadosTemporales
                : null
        },
        success: function(response) {
            const disponibilidadEmpleados = response.disponibilidadEmpleados;
            // console.log(disponibilidadEmpleados);

            actualizarDisponibilidadEmpleadosCalendar(disponibilidadEmpleados, id_despleableSelecEmpleado_almohadilla);
        },
        error: function(xhr) {
            //console.log('Error al obtener las horas', xhr);
        }
    });
}

/**
 * Obtiene los datos de un cliente a partir de su ID.
 * Realiza una solicitud AJAX, devuelve promesa que resuelve con los datos del cliente o rechaza si no se encuentra.
 *
 * @param {string} id_cliente - El ID del cliente a buscar.
 * @returns {Promise<Object>} Una resuelta con datos del cliente.
 */
function getClientById(id_cliente) {
    return new Promise(function(resolve, reject) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-clienteById";
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                _token: csrfToken,
                id_cliente_: id_cliente
            },
            success: function(data) {
                if(data.encontrado) {
                    // //console.log(data.cliente, "devolución ajax");
                    resolve(data.cliente);
                } else {
                    reject("Cliente no encontrado");
                }
            },
            error: function(xhr) {
                //console.log('Error al obtener cliente', xhr);
                reject(xhr); // Rechazamos la promesa en caso de error
            }
        });
    });
}

/**
 * Solicitud AJAX para obtener todos los clientes .
 * Retorna una promesa que se resuelve con los datos de los clientes
 *
 * @returns {Promise<Object>} Una promesa que se resuelve con un objeto que contiene:
 * - `clientes` (Array): Un array con la lista de clientes obtenidos.
 * - `iniciales` (Array): Un array con las iniciales de los clientes.Formato: "AP"
 *
 * @throws {string} Si no se encuentran clientes, la promesa se rechaza con un mensaje de error.
 * @throws {Object} Si ocurre un error en la solicitud AJAX, la promesa se rechaza con el objeto de error.
 */
function getAllClients() {
    return new Promise(function(resolve, reject) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-allClient";
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                _token: csrfToken,
            },
            success: function(data) {
                if(data.encontrado) {
                    //console.log(data.clientesAll, "CLIENTES ALL", data.iniciales);
                    resolve({clientes: data.clientesAll, iniciales: data.iniciales});
                } else {
                    reject("Cliente no encontrado"); // Rechazamos si no se encuentra el cliente
                }
            },
            error: function(xhr) {
                //console.log('Error al obtener cliente', xhr);
                reject(xhr); // Rechazamos la promesa en caso de error
            }
        });
    });
}

/**
 * Pestaña clientes. Obtiene todos los clientes y sus iniciales, luego actualiza el contenedor HTML con los datos.
 * Utiliza la función `getAllClients` para obtener los datos y después genera dinámicamente los elementos HTML
 * para mostrar los clientes en la interfaz.
 *
 * @returns {void} Esta función no retorna nada, solo actualiza el DOM con los datos de los clientes.
 * @throws {string} Si ocurre un error al obtener los datos de los clientes, se captura y se muestra en la consola.
 */
function get_all_init(){
    // Llamamos a la función para obtener los clientes y sus iniciales
    getAllClients().then(function(data) {
        const { clientes, iniciales } = data; // Desestructuramos el objeto para obtener los clientes y las iniciales
        //console.log(clientes); // Ahora puedes acceder a los clientes correctamente
        //console.log(iniciales, "iniciales");
        var container = document.getElementById('suggestions-wrapper');

        // Vaciar el contenedor solo una vez antes de agregar los nuevos elementos
        $(container).empty();

        // Recorremos los clientes para crear los elementos HTML
        clientes.forEach(function(cliente, index) {
            let iniciales2 = iniciales[index]; // Obtener las iniciales para el cliente actual
            // Crear el HTML de la estructura que necesitas, hola que tal estas
            $(container).append(`
                <div>
                    <div data-clie="${cliente.id}" data-index="${index}" class="irenemiweb item_client0202 pointer ${index === 0 ? 'customer-el-list_active_ffoQG' : ''}" onclick="funcionClicTrajeta(this)">
                        <div class="customer-el-list_searchItem_mnR8f">
                            <div title="${cliente.nombre}" class="b-avatar_avatar_pJzSu" style="width: 40px; height: 40px; flex: 0 0 40px;">
                                <!-- Mostrar las iniciales dentro del div correspondiente -->
                                <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px; background-color:pink;">
                                    ${iniciales2}
                                </div>
                            </div>
                            <div class="customer-el-list_searchItemName_LLoTq customer-el-list_size--16_uLvgO">
                                <div class="txt--ellipsis">${cliente.name} ${cliente.primer_apellido}</div>
                            </div>
                            <div class="d-flex">
                                <!-- Aquí puedes agregar más información si lo necesitas -->
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });

    }).catch(function(error) {
        //console.log("Error:", error); // Maneja el caso de error
    });
}

/**
 * Maneja la lógica para llamar a la función que marca visualmente el empleado seleccionado.
 * Esta función se activa al hacer clic en un botón y recoge la información necesaria
 * para realizar una solicitud AJAX que obtendrá la disponibilidad de los empleados
 * para un día y una hora específicos.
 *
 * @param {string} botonSelector - Selector CSS del div que abre el desplegable disponivilidad empleados.
 * @param {string} slotEmpleadoSelector - Selector CSS para el div visualizador nombre empleado
 * @param {string} horaServicioSelector - Selector CSS div hora de inicio.
 * @param {string} horaFinServicioSelector - Selector CSS div hora de fin.
 * @param {string} modalSelector - Selector CSS id para desplegable empleados que queremos abrir
 * @param {string} contenedorAtributoFecha - Selector CSS para datepiker de donde queremos obtener la fecha.
 *
 * @returns {void}
 */

function mostrarEmpleadoDisponible(botonSelector, slotEmpleadoSelector, horaServicioSelector, horaFinServicioSelector, modalSelector, contenedorAtributoFecha) {
    let botonAbrirModal = document.querySelector(botonSelector);
    if (botonAbrirModal) {
        botonAbrirModal.addEventListener('click', function(event){
            event.preventDefault();
            marcarEmpleSeleccionado(slotEmpleadoSelector);//marca al enpleado seleccionado en el desplegable
            let fechaElemento = document.querySelector(contenedorAtributoFecha);
            let inicioServicio = document.querySelector(horaServicioSelector).textContent;
            let diaSeleccionado1 = fechaElemento.getAttribute('data-datepiker');
            let horaFinServicio = document.querySelector(horaFinServicioSelector).textContent;
            let diaSeleccionado = formatearFeAnio(diaSeleccionado1);
            let duracion = calcularDuracion(inicioServicio, horaFinServicio);
            // //console.log(inicioServicio, horaFinServicio, duracion, "HORA FIN SERVICIO");
            // Llamada AJAX
            peticionAjaxDisponibleEmpleados(inicioServicio, duracion, diaSeleccionado, modalSelector);
        });
    }
}


//seleccionar empleado info reserva
mostrarEmpleadoDisponible('.styles_outerWrapper_AddEmpleInicio', '.slotEmpleadoAddInicio', '.slotHorasCobrarServicio', '.slotHoraFinCorbrarServicio', '#selectEmpleModalAddInicio', '.fechaCitaInfo');
//seleccionar empleado info reserva add
mostrarEmpleadoDisponible('.styles_outerWrapper_AddEmple', '.slotEmpleadoAdd', '.slotHorasCobrarServicioAdd', '.slotHoraFinCorbrarServicioAdd', '#selectEmpleModalAdd', '.fechaCitaInfo');
//seleccionar empleado calendar new reserv
mostrarEmpleadoDisponible('.styles_outerWrapper_AddEmpleInicioCalendar', '.slotEmpleadoAddInicioCalendar', '.slotHorasCobrarServicioCalendar', '.slotHoraFinCorbrarServicioCalendar', '#selectEmpleModalAddInicioCalendar', '.fechaCitaInfo22');
//seleccionar empleado calendar new reserv add
mostrarEmpleadoDisponible('.styles_outerWrapper_AddEmpleInicioCalendarAdd', '.slotEmpleadoAddInicioCalendarAdd', '.slotHorasCobrarServicioAddCalendar', '.slotHoraFinCorbrarServicioAddCalendar', '#selectEmpleModalAddInicioCalendarAdd', '.fechaCitaInfo22');

/**
 * Calcula la duración en minutos entre dos horas dadas en formato "HH:mm".
 *
 * @param {string} horaInicio - Formato "12:35".
 * @param {string} horaFin - Formato "13:05".
 *
 * @returns {string} Duración en minutos entre las dos horas. Foramto: "30".
 *
 * @throws {Error} Si alguno de los parámetros no está en formato "HH:mm" o si la hora de fin es anterior a la de inicio.
 *
 * @example
 * const duracion = calcularDuracion("12:35", "13:05");
 * //console.log(duracion); // "30"
 */
function calcularDuracion(horaInicio, horaFin) {
    // Convertir las horas en formato HH:mm a objetos Date
    const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
    const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);

    // Calcular los minutos totales desde las 00:00 para ambas horas
    const minutosInicio = horaInicioHoras * 60 + horaInicioMinutos;
    const minutosFin = horaFinHoras * 60 + horaFinMinutos;

    // Calcular la diferencia en minutos
    const diferenciaMinutos = minutosFin - minutosInicio;

    return diferenciaMinutos.toString();
}


/**
 * Actualiza visualmente la disponivilidad de los empleados del desplegable.
 *
 * @param {Array} disponibilidadEmpleados - Un arreglo de objetos.
 * Cada objeto tiene la siguiente estructura:
 *   - `disponible` {boolean}: Indica si el empleado está disponible (true) o no (false).
 *   - `empleado` {string}: El nombre del empleado.
 *   - `fecha_hora_reserva` {string}: La fecha y hora de la reserva en formato ISO 8601 (por ejemplo, "2025-03-14T13:10:00.000000Z").
 *   - `idEmpleado` {number}: El ID del empleado.
 *
 * @param {string} modal - El selector CSS del desplegable donde se encuentran los empleados.
 *
 * @returns {void} Solo actualiza el DOM con los cambios de disponibilidad.
 */
function actualizarDisponibilidadEmpleadosCalendar(disponibilidadEmpleados, modal) {
    let noDisponiblesCount = 0; // Contador de empleados "no disponibles"
    const totalEmpleados = disponibilidadEmpleados.length; // Total de empleados

    disponibilidadEmpleados.forEach(function(empleado) {
        // Seleccionar el elemento correspondiente al empleado en el DOM usando su ID
        const selectorBase = `${modal} [data-empId="${empleado.idEmpleado}"]`;
        const empleadoDiv = document.querySelector(selectorBase);
        const divAvatarEmpleado = document.querySelector(`${selectorBase} .avatarEmpleadoAdd`);
        const cursorEmpleado = document.querySelector(`${selectorBase} .empleadoCambiarCursor`);

        if (empleadoDiv) {
            // Limpiar cualquier mensaje anterior de disponibilidad
            const subtextDiv = empleadoDiv.querySelector('.subtext');
            // Eliminar las clases anteriores de disponibilidad
            subtextDiv.classList.remove('text-success', 'text-danger');
            // Verificar si el empleado está disponible
            if (empleado.disponible) {
                cursorEmpleado.classList.add('cursor-pointer');
                cursorEmpleado.classList.remove('empleadoDisabled');
                divAvatarEmpleado.classList.remove('opacity-50');
                subtextDiv.classList.add('text-success');
                subtextDiv.innerHTML = `
                    <span>Esteticista</span>
                    <span>
                        <span>
                            <span> • </span>
                        </span> Disponible
                    </span>`;
            } else {
                cursorEmpleado.classList.remove('cursor-pointer');
                cursorEmpleado.classList.add('empleadoDisabled');
                divAvatarEmpleado.classList.add('opacity-50');
                subtextDiv.classList.add('text-danger');
                subtextDiv.innerHTML = `
                    <span>Esteticista</span>
                    <span>
                        <span>
                            <span> • </span>
                        </span> No Disponible
                    </span>`;
                noDisponiblesCount++; // Incrementar el contador de "no disponibles"
            }
        }else{
        }
    });

    // Comprobar si todos los empleados están "no disponibles" empleadoCambiarCursorCualquiera
    let cursorEmpleadoCualquiera = document.querySelector(`${modal} .empleadoCambiarCursorCualquiera`);
    if (noDisponiblesCount === totalEmpleados) {
        if (cursorEmpleadoCualquiera) {
            cursorEmpleadoCualquiera.classList.remove('cursor-pointer');
            cursorEmpleadoCualquiera.classList.add('empleadoDisabled');
            let subtextDiv = cursorEmpleadoCualquiera.querySelector('.subtext span');
            subtextDiv.innerHTML = `
             <div class="subtext text-alert">
                <span style="color:red">
                    Todos los empleados están No Disponibles
                </span>
             </div>
            `;
        }

    }else{
        if(cursorEmpleadoCualquiera){
            cursorEmpleadoCualquiera.classList.remove('empleadoDisabled', 'opacity-50');
            cursorEmpleadoCualquiera.classList.add('cursor-pointer');
            let subtextDiv = cursorEmpleadoCualquiera.querySelector('.subtext');
            subtextDiv.innerHTML = `
                <div class="subtext text-success">
                <span>
                    Mayor disponivilidad
                </span>
            </div>
            `;
        }

    }
}

/**
 * Marca al empleado seleccionado en el interfaz visual inicialmente.
 * Marca al empleado correspondiente en el DOM agregando la clase `avatar-selected`.
 *
 * @param {string} slotNombre - El selector del elemento DOM donde se muestra el nombre del empleado.
 *
 * @returns {void} Solo actualiza el DOM.
 */
function marcarEmpleSeleccionado(slotNombre){
    // //console.log("marcarEmpleadoSeleccionado");

    let nombreEmpleadoSlot1 = document.querySelector(slotNombre);
    if(nombreEmpleadoSlot1){
    let nombreEmpleadoSlot = nombreEmpleadoSlot1.textContent;
    let empleadosPonerCheck = document.querySelectorAll('.avatarEmpleadoAdd');
        empleadosPonerCheck.forEach(function (empleado) {
            empleado.classList.remove('avatar-selected');
        });
        empleadosPonerCheck.forEach(function (empleado) {
            if(empleado.getAttribute('data-empleadaNombre') === nombreEmpleadoSlot){
                empleado.classList.add('avatar-selected');
            }
        });
    }
}

//AL CLICAR EN EL EMPLEADO DENTRO DEL MODAL SELECCIONAR EMPLEADO seleccionar empleado clic empleado
function selectEmpleadoAdd(elemento, empleado_id, empleado_nombre, slotNombre, modalAbierto, userId_empleado= null){
    if(elemento.classList.contains('empleadoDisabled')){

    }else{
        empleadoIdIdUnico = empleado_id;
        if(slotNombre.trim() === '.slotEmpleadoHistorialModificacionReservas'){
            // --- 🔥 FILTRO HISTORIAL ---
            filtrarHistorialPorEmpleada(empleado_id);
            resetInputsHistorialModificacionReservas(document.querySelector('.slotEmpleadoHistorialModificacionReservas '));

        }
        //ponemos icono avatar seleccionado
        let empleadosPonerCheck = document.querySelectorAll('.avatarEmpleadoAdd');
        empleadosPonerCheck.forEach(function (empleado) {
            empleado.classList.remove('avatar-selected');
        });
        elemento.querySelector('.avatarEmpleadoAdd').classList.add('avatar-selected');

        let visualizadorNombreEmpleadoSeleccionado = document.querySelector(slotNombre);
        //si empleado es "cualquiera"
        if(empleado_id === 0){
            visualizadorNombreEmpleadoSeleccionado.innerHTML = "Cualquier empleado";
            visualizadorNombreEmpleadoSeleccionado.setAttribute('data-empleId', 'cualquiera');
            visualizadorNombreEmpleadoSeleccionado.setAttribute('data-empleado', 'cualquiera');
        }else{

            //comprobar si hay servicio para abilitar botón guardar
            let botones = [
                document.getElementById('uid-377-input'),
                document.getElementById('uid-377-inputEditReserv'),
                document.getElementById('uid-377-inputCalendar')
            ];
            let servicioSeleccionado = comprobarServicioSeleccionado('.selectServiceAdd', 'Seleccionar servicio');
            if (!servicioSeleccionado) {
                botones.forEach(btn => {
                    if (btn) {
                        btn.setAttribute('disabled', true);
                        btn.classList.add("index_is--disabled_w97Nq");
                    }
                });
            } else {
                botones.forEach(btn => {
                    if (btn) {
                        btn.removeAttribute('disabled');
                        btn.classList.remove("index_is--disabled_w97Nq");
                    }
                });
            }

            visualizadorNombreEmpleadoSeleccionado.innerHTML = empleado_nombre;

            //manejo cambio empleado desde añadir reserva desde calendar para cambiar el evento temporal
            if(slotNombre === '.slotEmpleadoAddInicioCalendar'){
                let empleadoEliminar = document.querySelector('.slotEmpleadoAddInicioCalendar').getAttribute('data-empleid');
                if(empleadoEliminar.trim() === 'cualquiera'){
                    ponerEventoInicialmente(empleado_id);
                }else{
                    cambiarResourceIdEvento(eventIdChangeCalendar, empleado_id, ".fc-event.temporal");
                }
                //pantalla #2
            }else if(slotNombre === '.slotEmpleadoAddInicioCalendarAdd'){
                let empleadoEliminar2 = document.querySelector('.slotEmpleadoAddInicioCalendarAdd').getAttribute('data-empleid');
                if(empleadoEliminar2.trim() === 'cualquiera'){
                    ponerEventoPantalla2(empleado_id)

                }else{
                    cambiarResourceIdEvento(eventIdChangeCalendar, empleado_id, '.fc-event.temporal2');
                }
            }else if(slotNombre === '.slotEmpleadoAddInicio'){
                cambiarResourceIdEvento(eventIdChangeCalendar, empleado_id, ".fc-event.temporal");
            }else if(slotNombre === '.slotEmpleadoAdd'){
                let empleadoEliminar2 = document.querySelector('.slotEmpleadoAdd').getAttribute('data-empleid');
                if(empleadoEliminar2.trim() === 'cualquiera'){
                    ponerEventoPantalla2Info(empleado_id, empleado_nombre)
                }else{
                    cambiarResourceIdEvento(eventIdChangeCalendar, empleado_id, '.fc-event.temporal2');
                }
            }
            visualizadorNombreEmpleadoSeleccionado.setAttribute('data-empleId', empleado_id);
            visualizadorNombreEmpleadoSeleccionado.setAttribute('data-empleado', empleado_id);
        }
        cerrarModalCategorias(modalAbierto);

        //manejo habilitar deshabilitar otros botones
        let existeServicio = document.querySelector('.selectServiceAdd .services-wrapper_serviceEmpty_pbusk');
        if(!existeServicio){
            document.getElementById('uid-377-input').disabled = false;
            document.getElementById('uid-377-input').classList.remove('index_is--disabled_w97Nq');

        }
        let existeServicioCalendar = document.querySelector('.addServiceCalendar66 .services_serviceInfo_iDMQwAddCalendar')
        if (existeServicioCalendar) {
            document.getElementById('uid-798-input').classList.remove('index_is--disabled_w97Nq');
            document.getElementById('uid-3978-input').classList.remove('index_is--disabled_w97Nq');
            document.getElementById('uid-3978-input').removeAttribute('disabled');
        }

        //comprobamos que el empleado en añadir servicio #2 calendar está seleccionado
        if(document.querySelector('.allServicesAddCalendar00Add').style.display === "block"){
            let servicioSeleccionado = comprobarServicioSeleccionado('.selectServiceAddCalendar', 'Seleccionar servicio');
            if(servicioSeleccionado){

                document.getElementById('uid-377-inputCalendar').classList.remove('index_is--disabled_w97Nq');
                 document.getElementById('uid-377-inputCalendar').removeAttribute('disabled');
            }
        }

    }
    ponerBotonesGuardarCambios();
}

//comprobar que hora fin es mayor que inicio new reserv calendar
function esHoraFinMayorQueHoraInicio() {
    // Obtener las horas de inicio y fin de los elementos correspondientes
    let horaInicio = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
    let horaFin = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;

    // Convertir las horas en formato 'HH:mm' a minutos
    let [horaInicioH, horaInicioM] = horaInicio.split(':').map(Number);
    let [horaFinH, horaFinM] = horaFin.split(':').map(Number);

    // Convertir ambas horas a minutos
    let minutosInicio = horaInicioH * 60 + horaInicioM;
    let minutosFin = horaFinH * 60 + horaFinM;

    // Devolver true si la hora de fin es mayor que la hora de inicio
    return minutosFin > minutosInicio;
}


//función que calcula hora fin con formato de llegada 9:00
function calcularHoraFin(horaInicio, duracion) {
    // Separar la hora y los minutos de la hora de inicio
    const [horas, minutos] = horaInicio.split(':').map(Number);

    // Convertir la duración a minutos solo si contiene "min"
    const duracionEnMinutos = duracion.includes('min')
        ? parseInt(duracion.replace('min', '').trim(), 10)
        : parseInt(duracion, 10);

    // Crear un objeto Date para la hora de inicio
    const fecha = new Date();
    fecha.setHours(horas, minutos, 0, 0);

    // Añadir la duración al objeto Date
    fecha.setMinutes(fecha.getMinutes() + duracionEnMinutos);

    // Formatear la hora y los minutos de la hora final
    const horaFinal = String(fecha.getHours()).padStart(2, '0');
    const minutosFinal = String(fecha.getMinutes()).padStart(2, '0');

    // Devolver la hora final en formato "HH:MM"
    return `${horaFinal}:${minutosFinal}`;
}

//VENTA RÁPIDA -----------------------------------------------------------------------------------------------

//Final y cobrar mostrar tiquet
function createTicket(idCliente, importeImpuesto,valorNeto, valorBruto, sub_total,descuentoTotal, descuentoTotalPorcentaje) {
    return new Promise(function(resolve, reject) {
        console.log("ENTRAMOS EN CREAR TIKET");

        //id reserva si es simple o multiple
        let id_reservaRecibo ='';
        if (infoArrayEnvio.length) {
            id_reservaRecibo = infoArrayEnvio.map(evento => evento.extendedProps.reservaId)[0];
            console.log(id_reservaRecibo, "id servicio en reserva multiple");

        }else if(!infoArrayEnvio.length && !document.querySelector('.basket-layout_sidebar_X6qEm').getAttribute('data-idreserv')){
            id_reservaRecibo = 0; // venta rápida
            console.log(id_reservaRecibo, "id servicio en venta rápida", document.querySelector('.basket-layout_sidebar_X6qEm').getAttribute('data-idreserv'));
        }else{
            id_reservaRecibo = document.querySelector('.basket-layout_sidebar_X6qEm').getAttribute('data-idreserv');
            console.log(id_reservaRecibo, "id servicio en reserva simple");
        }

        //tipo pago si es simple o combinado
        let pagoEfectivoCambio = document.querySelector('.cambioMostrarOcultar');
        let pagoCombinado = pagoEfectivoCambio.classList.contains('d-none');// true o false

        //si es combinado
        let metodosPagosEimportes2 = ObtenerMetodosPagosEimportes();
        //si el pago no es combinado
        let metodoActivo = document.querySelector('.payment-types_paymentMethodActive_vBa20').textContent.trim();

        //petición ajax crear el recibo
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "create-ticket";
        // Hacer una petición AJAX al servidor
        $.ajax({
            url: url, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken, // Token CSRF para seguridad
                id_cliente_: idCliente,
                tipo_impuesto:"21",
                importe_impuesto:importeImpuesto,
                valor_neto:valorNeto,
                valor_bruto:valorBruto,
                subtotal:sub_total,
                descuento_total: descuentoTotal,
                descuento_total_porcentaje: descuentoTotalPorcentaje,
                responsable_cobro: responsableCobroId,
                id_reservaRecibo1: id_reservaRecibo,
                pagoCombinado1: pagoCombinado,
                metodoActivo1: metodoActivo,
                importe11:metodosPagosEimportes2.importe1,
                metodopago11: metodosPagosEimportes2.metodopago1,
                importe22: metodosPagosEimportes2.importe2,
                metodopago22: metodosPagosEimportes2.metodopago2,
                serviciosVentaRapida33: serviciosVentaRapida
            },
            success: function(data) {
                if(data.creado) {
                    //console.log(data.recibo, "tiket");
                    resolve(data.recibo); // Resolvemos la promesa con el cliente
                } else {
                    reject("tiket"); // Rechazamos si no se encuentra el cliente
                }
            },
            error: function(xhr) {
                //console.log('Error al obtener cliente', xhr);
                reject(xhr); // Rechazamos la promesa en caso de error
            }
        });
    });
}

function storeServiciosVendidos(idRecibo){
    let updateStatusReservUrl = 'store-servicios-vendidos';
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: updateStatusReservUrl, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_recibo: idRecibo,
            empleado_id: null,
            arrayServiciosVendidos: serviciosVentaRapida
        },
        success: function(response) {
            const updateEndReserv = response.updteEnd;
            if(updateEndReserv === true){
                initializeCalendar();
                //console.log("status cambiado con exito");
            }
        },
        error: function(xhr) {
            //console.log('Error al actualizar el status', xhr);
        }
    });
}

//BOTON COBRAR RESERVA
function insertTargetPayment() {
    let reservasGloval = reservaSeleccionadaNotPayGloval;
    activarLoaderAll();
    console.log(reservasGloval, "reservasGloval");
    console.log(infoArrayEnvio, "infoArrayEnvio");
    if(reservasGloval == null && !infoArrayEnvio.length){
        reservasGloval = transformarValidoInsertTargetPayment(infoArrayEnvio);
    }
    if(reservasGloval == null && infoArrayEnvio.length){
        reservasGloval = transformarEventosMultiplesFormatoFinal(infoArrayEnvio);
    }
    const pagoEfectivoCambio = document.querySelector('.cambioMostrarOcultar');
    const urlPagarServicios = "pagar-reserva";

    // Enviar pago al backend
    fetch(urlPagarServicios, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        },
        body: JSON.stringify({
            // idReserva: idsReservasAPagar,
            // ventaRapida1: ventaRapida,
            reservaSeleccionadaNotPay : JSON.stringify(reservasGloval)
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.todocorrecto, "todocorrecto");

        if (!data.todocorrecto) {
            alert(data.message || "No se pudo marcar como pagado");
            desactivarLoaderAll();
            return;
        }
        // if(data.ventaRapida){
        //     console.log(data, "Venta rápida");
        // }

        console.log(data, "RESPUESTA DE PAGADAS");

        // Elementos y datos necesarios para el ticket
        const metodoActivo = document.querySelector('.payment-types_paymentMethodActive_vBa20')?.textContent.trim() || '';
        const divCliente = document.querySelector('.customer-card_customer_PiI9d');
        const ahora = new Date();

        const fecha_hora = ahora.toLocaleString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }).replace(',', '');

        const fecha = ahora.toLocaleDateString('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric'
        }).replace(',', '');

        const fechaEmail = ahora.toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', year: 'numeric'
        }).replace(',', '');

        const horaEmail = ahora.toLocaleTimeString('es-ES', {
            hour: '2-digit', minute: '2-digit'
        }).replace(',', '');

        let cambioMostrarOcultar = '';
        let cantidadCambioMostrarOcultar = '';

        // Verifica si es pago combinado o no
        if (pagoEfectivoCambio?.classList.contains('d-none')) {
            // PAGO COMBINADO
            cambioMostrarOcultar = "0,00";
            cantidadCambioMostrarOcultar = convertirEnNumeroSolo(
                document.querySelector('.basketTotalPrecio')?.textContent || '0'
            ).toFixed(2).replace('.', ',');
        } else {
            // PAGO NO COMBINADO
            const valorInput = document.getElementById('uid-317-inputMetodoPago')?.value || "0";
            const cambioTexto = document.querySelector('.cambio_800')?.textContent || "0";

            cantidadCambioMostrarOcultar = convertirEnNumeroSolo(valorInput).toFixed(2).replace('.', ',');
            cambioMostrarOcultar = convertirEnNumeroSolo(cambioTexto).toFixed(2).replace('.', ',');
        }

        // Si hay cliente, obtén su información
        if (divCliente) {
            const id_cliente = divCliente.getAttribute('data-index');

            getClientById(id_cliente).then(cliente => {
                const cliente99 = cliente;
                const datosCliente = montarTarjetaClienteTiket(cliente99);

                // Mostrar ticket
                montarTarjetaTiket(
                    cambioMostrarOcultar,
                    cantidadCambioMostrarOcultar,
                    datosCliente,
                    fecha,
                    fecha_hora,
                    metodoActivo,
                    cliente99,
                    fechaEmail,
                    horaEmail
                );
            }).catch(error => {
                console.error("Error al obtener cliente:", error);
            });
        } else {
            // Sin cliente, generar ticket básico
            montarTarjetaTiket(
                cambioMostrarOcultar,
                cantidadCambioMostrarOcultar,
                '',
                fecha,
                fecha_hora,
                metodoActivo,
                '',
                fechaEmail,
                horaEmail
            );
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al marcar la reserva como pagada');
    });
}

//FUNCION PARA TRANSFORMAR INFOARRAYENVIO MULTIPLE VALIDO PARA LA FUNCION insertTargetPayment
function transformarEventosMultiplesFormatoFinal(eventos) {
    if (!Array.isArray(eventos) || eventos.length === 0) return null;

    const first = eventos[0];
    const firstProps = first.extendedProps;

    const multipleId = firstProps.multiple;

    // Construir todas las reservas
    const reservas = eventos.map(ev => {
        const p = ev.extendedProps;

        return {
            id: p.reservaId,
            user_id: p.usuario.id,
            service_id: p.servicio.id,
            date_time: p.fecha,
            status: p.status,
            cliente_confirmo_modificacion: "pendiente",
            created_at: p.fecha_creacion + "Z",
            updated_at: p.fecha_actualizacion + "Z",
            duration: p.duracion,
            empleada_id: p.empleada.id,
            nota: p.nota,
            status_payment: p.status_payment,
            total_payment: "0.00",   // tal cual tu ejemplo MULTIPLE
            comprobada: "no",
            empleado_seleccionado: p.seleccionado_cliente,
            nota_interna: p.nota_interna,
            mensaje_cliente: p.mensaje_cliente,
            multiple: multipleId,

            servicio: { ...p.servicio },

            user: {
                id: p.usuario.id,
                name: p.usuario.nombre,
                primer_apellido: p.usuario.primerApellido,
                email: p.usuario.email,
                telefono: p.usuario.telefono,
                email_verified_at: null,
                two_factor_confirmed_at: null,
                current_team_id: null,
                profile_photo_path: null,
                created_at: null,
                updated_at: null,
                token: null,
                connection_id: 0,
                user_status: "Offline",
                user_image: null,
                active_status: 0,
                avatar: "avatar.png",
                dark_mode: 0,
                messenger_color: null,
                is_admin: 0,
                cliente_confianza: "No",
                device_token: null,
                profile_photo_url:
                    `https://ui-avatars.com/api/?name=${p.usuario.nombre[0]}&color=7F9CF5&background=EBF4FF`
            },

            reserva_servicio: {
                id: multipleId,
                total_payment: "0.00",     // NO EXISTE EN FULLCALENDAR
                notaDelcliente_multiple: null,
                nota_interna: null,
                message_for_client: null,
                created_at: p.fecha_creacion + "Z",
                updated_at: p.fecha_actualizacion + "Z"
            },

            empleada: {
                id: p.empleada.id,
                nombre: p.empleada.nombre,
                especialidad: "",
                created_at: null,
                updated_at: null,
                img_empleada: p.empleada.imagenEmple,
                telefono: p.empleada.telefono,
                primerApellido: p.empleada.apellido
            }
        };
    });

    // Tomar el total sumando los precios reales de los servicios
    const total = eventos
        .map(ev => parseFloat(ev.extendedProps.servicio.precio))
        .reduce((acc, v) => acc + v, 0)
        .toFixed(2);

    return {
        tipo: "multiple",
        multiple_id: multipleId,
        reservas: reservas,
        usuario: reservas[0].user,
        status: firstProps.status,
        fecha: firstProps.fecha,
        total: total
    };
}



//FUNCION PARA TRANSFORMAR INFOARRAYENVIA A OBJETO VALIDO PARA LA FUNCION insertTargetPayment
function transformarValidoInsertTargetPayment(data) {
    const props = data.event.extendedProps;

    return {
        tipo: "simple",
        reservas: [
            {
                id: props.reservaId,
                user_id: props.usuario.id,
                service_id: props.servicio.id,
                date_time: props.fecha,
                status: props.status,
                cliente_confirmo_modificacion: "pendiente",
                created_at: props.fecha_creacion + "Z",
                updated_at: props.fecha_actualizacion + "Z",
                duration: props.duracion,
                empleada_id: props.empleada.id,
                nota: props.nota,
                status_payment: props.status_payment,
                total_payment: props.servicio.precio,
                comprobada: "no",
                empleado_seleccionado: props.seleccionado_cliente,
                nota_interna: props.nota_interna,
                mensaje_cliente: props.mensaje_cliente,
                multiple: props.multiple,

                servicio: {
                    ...props.servicio,
                    // en tu ejemplo el backend añade campos extra, pero no existen en el evento original
                    // así que devolvemos solo los que tenemos
                },

                user: {
                    id: props.usuario.id,
                    name: props.usuario.nombre,
                    primer_apellido: props.usuario.primerApellido,
                    email: props.usuario.email,
                    telefono: props.usuario.telefono,
                    email_verified_at: null,
                    two_factor_confirmed_at: null,
                    current_team_id: null,
                    profile_photo_path: null,
                    created_at: null,
                    updated_at: null,
                    token: null,
                    connection_id: 0,
                    user_status: "Offline",
                    user_image: null,
                    active_status: 0,
                    avatar: "avatar.png",
                    dark_mode: 0,
                    messenger_color: null,
                    is_admin: 0,
                    cliente_confianza: "No",
                    device_token: null,
                    profile_photo_url:
                        `https://ui-avatars.com/api/?name=${props.usuario.nombre[0]}&color=7F9CF5&background=EBF4FF`
                },

                reserva_servicio: null,

                empleada: {
                    id: props.empleada.id,
                    nombre: props.empleada.nombre,
                    especialidad: "",
                    created_at: null,
                    updated_at: null,
                    img_empleada: props.empleada.imagenEmple,
                    telefono: props.empleada.telefono,
                    primerApellido: props.empleada.apellido
                }
            }
        ],

        usuario: {
            id: props.usuario.id,
            name: props.usuario.nombre,
            primer_apellido: props.usuario.primerApellido,
            email: props.usuario.email,
            telefono: props.usuario.telefono,
            email_verified_at: null,
            two_factor_confirmed_at: null,
            current_team_id: null,
            profile_photo_path: null,
            created_at: null,
            updated_at: null,
            token: null,
            connection_id: 0,
            user_status: "Offline",
            user_image: null,
            active_status: 0,
            avatar: "avatar.png",
            dark_mode: 0,
            messenger_color: null,
            is_admin: 0,
            cliente_confianza: "No",
            device_token: null,
            profile_photo_url:
                `https://ui-avatars.com/api/?name=${props.usuario.nombre[0]}&color=7F9CF5&background=EBF4FF`
        },

        status: props.status,
        fecha: props.fecha,
        total: props.servicio.precio
    };
}


function activarLoaderAll(){
    document.getElementById('loaderSperaAdministratorAll').classList.remove('d-none');
}

function desactivarLoaderAll(){
    document.getElementById('loaderSperaAdministratorAll').classList.add('d-none');
}
function activarLoaderUniversal(id_loader){
    // console.log("activando loader");

    document.getElementById(id_loader).classList.remove('d-none');
}
function desactivarLoaderUniversal(id_loader){
    // console.log("desactivando loader");

    document.getElementById(id_loader).classList.add('d-none');
}

function montarTarjetaClienteTiket(cliente99){
   let datosCliente= `
    <div class="payment-receipt_receiptCustomer__F5o0">
        <div class="size--14-sb margin-right-4"> ${cliente99.name} ${cliente99.primer_apellido}, </div>
        <span class="flex inline items-center">
            <span> ${cliente99.telefono} </span>
        </span>
    </div>
   `;
   return datosCliente;
}

function ObtenerMetodosPagosEimportes() {
    const getValueOrNull = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : null;
    };

    return {
        importe1: getValueOrNull('uid-834-inputImporte1'),
        metodopago1: getValueOrNull('uid-835-inputResto1'),
        importe2: getValueOrNull('uid-834-inputImporte2'),
        metodopago2: getValueOrNull('uid-835-inputResto2')
    };
}

function montarTarjetaTiket(cambioMostrarOcultar, cantidadCambioMostrarOcultar, datosCliente, fecha, fecha_hora, metodoActivo, cliente99, fechaEmail, horaEmail) {
    let divContenedorTicket = document.querySelector('.index_checkoutView_oS9m6Secundario');
    let divContenedorTicketPrincipal = document.querySelector('.index_checkoutView_oS9m6Principal');
    let serviciosTicket='';
    getServicesById(serviciosVentaRapida_ids, function (servicios){
        servicios.forEach((servicio, index) => {
            let descuento = serviciosVentaRapida[index].descuento_servicio;
            let li_index = index;
            let servicio_idArray = serviciosVentaRapida[index].idServicio;
            // let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
            let precioAsignar = serviciosVentaRapida[index].precio;
            // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
            serviciosTicket += construirTarjetaServiciosTiket(
                li_index,
                servicio.nombre,
                comprobar603090SinM(servicio.duration),
                precioAsignar,
                servicio_idArray,
                descuento
            );
        });
        let tipoIva = "21";
        let subtotalTiket = document.querySelector('.divSubtotal').textContent;
        let valor_bruto = document.querySelector('.basketTotalPrecio').textContent;//total del tiket
        let resultadoIvaTicket = calcularIva(convertirEnNumeroSolo(valor_bruto), 0.21);
        let descuentoTotalPorcentaje = document.querySelector('.basket-discountPorcentajeShow').textContent;
        let descuentoTotalImporte = document.querySelector('.basket-discountShow').textContent;
        let metodoPagoTicket='';
        let metodosPagosEimportes = ObtenerMetodosPagosEimportes();

        if(metodoActivo.trim() === 'Pago fraccionado'){
            metodoPagoTicket = `
            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • ${metodosPagosEimportes.metodopago1} • ${fecha_hora} </div>
                <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                    <span>${metodosPagosEimportes.importe1}</span>
                </div>
            </div>
            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • ${metodosPagosEimportes.metodopago2} • ${fecha_hora} </div>
                <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                    <span>${metodosPagosEimportes.importe2}</span>
                </div>
            </div>
            `;
        }else{
            metodoPagoTicket=`
            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • ${metodoActivo} • ${fecha_hora} </div>
                <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                    <span>${valor_bruto}</span>
                </div>
            </div>
            `;
        }
        //GUARDAR DATOS BASE DATOS
        createTicket(cliente99.id, resultadoIvaTicket.importeIva, resultadoIvaTicket.valorNeto, valor_bruto, subtotalTiket, descuentoTotalImporte, descuentoTotalPorcentaje).then(function(recibo) {

            divContenedorTicketPrincipal.classList.add('d-none');
            // $(divContenedorTicket).empty();

            //mostrar ticket y pago realizado
            $(divContenedorTicket).append(`
                <div class="index_paidWrapper_QWkLS" id="pago_finalizado_100" style="">
                <div class="row width-100 height-100 padding-left-32 padding-right-32">
                    <div class="col col-auto txt--center self-center padding-left-60 padding-right-60">
                        <div class="paid_paidWrapper_PMblG text-center">
                            <img src="https://d10n9ka7jp2kfo.cloudfront.net/pro/2b253d2d/img/success.a5dea691.svg" class="margin-bottom-16 b-icon_img_I0kuC">
                            <div data-testid="checkout-paid-info" class="size--28-b margin-bottom-16"> ¡Pago finalizado! </div>
                            <div data-testid="checkout-paid-change" class="paid_paidDescription_cDRUA paid_size--18_wZkDn">
                                <span class="size--18-sb">${cambioMostrarOcultar} € </span>
                                <span class="size--18-sb">cambio</span>
                                de ${cantidadCambioMostrarOcultar} €
                            </div>
                            <button id="uid-351-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt"  style="width: 100%;">
                                <div class="index_caption_W6r_J"> Ir al calendario </div>
                            </button>
                        </div>
                    </div>
                    <div class="col h-100">
                        <div class="scrollable h-100 column justify-center position-relative">
                            <div class="receipt_receiptWrapper_ZpUQq paid_receiptWrap_KsRkP">
                                <div class="receipt_receiptContent_W16zO">
                                <header class="receipt_receiptHeader_or90S">
                                        <div class="botonesCabeceraTiquet" style="">
                                            <div class="flex justify-end w-100">
                                                <button id="uid-353-input-enviarMail" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--icon_yiHCJ" >
                                                    <div class="index_slotLeft_p6NJx">
                                                        <span class="padding-right-4 b-icon iconFont icon-ico_send" style="font-size: 30px;"></span>
                                                    </div>
                                                </button>
                                                <div class="margin-left-12 index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k">
                                                    <div class="index_toggle_sBt35">
                                                        <button id="uid-356-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--icon_yiHCJ">
                                                            <div class="index_slotLeft_p6NJx">
                                                                <span class="b-icon iconFont icon-more" style="font-size: 30px;"></span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="enviarReciboCorreo d-none">
                                            <div class="row items-center">
                                                <div class="col col-auto">
                                                    <span class="esconderEnviarEmail pointer b-icon iconFont icon-nav-arrow-left" style="font-size: 18px;padding-bottom: 1rem;"></span>
                                                </div>
                                                <div class="col">
                                                    <div data-testid="error-input" class="index_container_jtGZY index_theme--error_q2ehf">
                                                        <div class="form-groupInput" style="margin-bottom: 0px">
                                                            <input onfocus="" onclick="" type="email" placeholder=" "
                                                                class="gualazonF inputsNewService" id="emailClienteRecivoSend"
                                                                value="" required
                                                                name="emailClienteRecivoSend"
                                                                onblur=""/>
                                                            <label for="emailClienteRecivoSend" class="styles_label_hleTI">Enviar recibo al cliente por email</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col col-auto">
                                                    <button id="uid-340-inputEnviarEmail" class="index_button_TfmOz index_size--md_G1gdK index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt receipt_receiptHeaderSend_XpRqZ">
                                                        <div style="padding: 16px 16px;" class="index_caption_W6r_J"> Enviar </div>
                                                    </button>
                                                </div>
                                                <div class="col col-12">
                                                    <hr>
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                    <div class="receipt_receiptReceipt_KzM2Z">
                                        <div class="payment-receipt_receipt_KbChH payment-receipt_size--14_pkege">
                                            <div class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--md_INMcW receipt-status-badge_size--18-sb_Z0C9x"> Pagado </div>
                                            <div class="payment-receipt_receiptInfo_RrRnL margin-top-16">
                                                <div class="size--16-sb">Recibo ${recibo.numero_recibo} | ID ${recibo.id}</div>
                                                <div>${fecha}</div>
                                            </div>
                                            ${datosCliente}
                                            <div class="margin-top-16">
                                                <div class="margin-top-16"> MYA Nail art studio <div class="payment-receipt_receiptAltText_VrnDU payment-receipt_size--12_zJMLU">ourense 25, 32003, Ourense</div></div>
                                            </div>
                                            <div class="payment-receipt_receiptLabels_dbSin payment-receipt_size--10_bf2DQ">
                                                <div>Artículo</div>
                                                <div>Cantidad</div>
                                            </div>
                                            <div>
                                                ${serviciosTicket}
                                            </div>
                                            <hr class="payment-receipt_hr_6WSqP">

                                            <table class="payment-receipt_taxSummary_tF1kf">
                                                <thead class="color-08 size--10">
                                                    <tr><th></th><th>Tipo de Impuesto</th><th>Valor neto</th><th>Importe de impuesto</th><th>Valor bruto</th></tr>
                                                </thead>
                                                <tbody><tr data-testid="payment-receipt-tax-item-0"><td></td><td class="size--12">${tipoIva} %</td><td class="size--12">${resultadoIvaTicket.valorNeto.toString().replace('.',',')} €</td><td class="size--12">${resultadoIvaTicket.importeIva.toString().replace('.',',')} €</td><td class="size--12"><strong>${valor_bruto}</strong></td></tr></tbody>
                                            </table>
                                            <div data-testid="payment-receipt-summaries-subtotal" class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU">
                                                <div class="payment-receipt_receiptRowName_Me4zF"> Subtotal </div>
                                                <div class="payment-receipt_receiptRowTotal_bf2SM"> ${subtotalTiket}</div>
                                            </div>
                                            <div data-testid="${descuentoTotalPorcentaje}" class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU">
                                                <div class="payment-receipt_receiptRowName_Me4zF"> Descuento </div>
                                                <div class="payment-receipt_receiptRowTotal_bf2SM"> -${descuentoTotalImporte}</div>
                                            </div>
                                            <hr class="payment-receipt_hr_6WSqP">
                                            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowAlt_CtByz">
                                                <div class="payment-receipt_receiptRowName_Me4zF"> Total </div>
                                                <div class="payment-receipt_receiptRowTotal_bf2SM payment-receipt_receiptRowTotalAlt_L_Ovf payment-receipt_size--16-sb_LEIqn"> ${valor_bruto}</div>
                                            </div>
                                            ${metodoPagoTicket}
                                            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowTotalPaid_th16p">
                                                <div class="payment-receipt_receiptRowName_Me4zF"> Total pagado </div>
                                                <div data-testid="payment-receipt-paid" class="payment-receipt_receiptRowTotal_bf2SM size--12-b"> ${valor_bruto}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="receipt_break_EL1Lq">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
         desactivarLoaderAll();
        //guardar los servicios vendidos
                storeServiciosVendidos(recibo.id);
        //clic en el boton enviar recibo email
                $('#uid-353-input-enviarMail').on('click', function() {
                    $('.botonesCabeceraTiquet').addClass('d-none');
                    $('.enviarReciboCorreo').removeClass('d-none');
                });
                $('.esconderEnviarEmail').on('click', function() {
                    document.getElementById('emailClienteRecivoSend').value='';
                    $('.botonesCabeceraTiquet').removeClass('d-none');
                    $('.enviarReciboCorreo').addClass('d-none');
                });
                $('#uid-340-inputEnviarEmail').on('click', function() {
                    activarLoaderAll();
                    let emailCliente= document.getElementById('emailClienteRecivoSend').value;
                    let updateStatusReservUrl = 'envio-email-recibo';
                    let fecha_hora = `
                    ${fechaEmail} a las ${horaEmail}
                    `;
                    let csrfToken = $('meta[name="csrf-token"]').attr("content");
                    $.ajax({
                        url: updateStatusReservUrl,
                        method: 'POST',
                        data: {
                            _token: csrfToken,
                            emailCliente: emailCliente,
                            id_recibo: recibo.id,
                            fecha_email:fechaEmail,
                            fecha_email_hora:fecha_hora,
                            datos_cliente:cliente99,
                            tipoIva:tipoIva,
                            valor_neto: resultadoIvaTicket.valorNeto.toString().replace('.',','),
                            importe_iva:resultadoIvaTicket.importeIva.toString().replace('.',','),
                            valor_bruto: valor_bruto,
                            subtotal: subtotalTiket,
                            descuentoTotalPorcentaje:descuentoTotalPorcentaje,
                            descuentoTotalImporte:descuentoTotalImporte,
                            // metodoPagoTicket:metodoPagoTicket,
                            metodoActivo:metodoActivo,
                            importe1_: metodosPagosEimportes.importe1,
                            metodopago1_: metodosPagosEimportes.metodopago1,
                            importe2_:metodosPagosEimportes.importe2,
                            metodopago2_: metodosPagosEimportes.metodopago2,

                        },
                        success: function(response) {
                            if(response.enviado === true){
                                document.getElementById('emailClienteRecivoSend').value='';
                                document.querySelector('.enviarReciboCorreo').classList.add('d-none');
                                document.querySelector('.botonesCabeceraTiquet ').classList.remove('d-none');
                                let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
                                insertMessageResolAction('Revibo enviado con éxito', '.index_checkoutView_oS9m6Secundario', stylos, 'ok');
                                desactivarLoaderAll();
                            }else{
                                insertMessageResolAction('No hemos podido enviar el recibo', '.index_checkoutView_oS9m6Secundario', stylos, 'error');
                                desactivarLoaderAll();
                            }
                            //console.log(response.enviado, "respuesta envio email");
                        },
                        error: function(xhr) {
                            //console.log('Error al actualizar el status', xhr);
                        }
                    });

                });
        }).catch(function(error) {
            //console.log("Error:", error); // Maneja el caso de error uid-340-inputEnviarEmail
        });
    });

}
//calcular iva
function calcularIva(valorBruto, iva) {
   // Calcular el valor neto (sin IVA) y redondear a 2 decimales
   let valorNeto = (valorBruto / (1 + iva)).toFixed(2);

   // Calcular el importe del IVA y redondear a 2 decimales
   let importeIva = (valorBruto - valorNeto).toFixed(2);

    // Devolver el valor neto y el importe IVA en un objeto
    return {
        valorNeto: valorNeto,
        importeIva: importeIva
    };
}

function actionButoncloseOffcanvasSelectClient(id_input = null){
    if (id_input) {
        document.getElementById(id_input).value = '';  // Vaciar el valor del input
        buscar(`#${id_input}`);  // Llamar a la función buscar
    }
    let offcanvasSelectClientes = document.getElementById('offcanvasSelectClient');
    if (offcanvasSelectClientes.classList.contains('card_empty_calendarOffcanvas')) {
        $('#newReservCalendar').offcanvas('show');
    }
    if(offcanvasSelectClientes.classList.contains('card_empty_InfoOffcanvas')){
        $('#eventDetailsModal').offcanvas('show');
    }
    offcanvasSelectClientes.classList.remove('card_empty_ventasOffcanvas');
    offcanvasSelectClientes.classList.remove('card_empty_calendarOffcanvas');
    offcanvasSelectClientes.classList.remove('card_empty_InfoOffcanvas');
}

//FUNCION CLIC EN TARJETA VACÍA SELECCIONAR CLIENTE card_empty_calendarOffcanvas
function clicTarjetasBlancasSelectCliente(tarjetaVacia) {
    // console.log(tarjetaVacia);

    if (tarjetaVacia) {
        const offcanvas = document.getElementById('offcanvasSelectClient');
        // console.log(offcanvas);

        $('#offcanvasSelectClient').offcanvas('show'); // Mantenemos la funcionalidad de jQuery para mostrar el offcanvas

        // Primero, eliminamos todas las clases relacionadas con los estados posibles
        offcanvas.classList.remove('card_empty_ventasOffcanvas', 'card_empty_calendarOffcanvas', 'card_empty_InfoOffcanvas');

        // Dependiendo de la clase de la tarjeta vacía, agregamos la clase correspondiente
        if (tarjetaVacia.classList.contains('card_empty_ventas')) {
            offcanvas.classList.add('card_empty_ventasOffcanvas');
        } else if (tarjetaVacia.classList.contains('card_empty_calendar')) {
            offcanvas.classList.add('card_empty_calendarOffcanvas');
            $('#newReservCalendar').offcanvas('hide');
        } else if (tarjetaVacia.classList.contains('card_empty_info')) {
            offcanvas.classList.add('card_empty_InfoOffcanvas');
            $('#eventDetailsModal').offcanvas('hide');
        }
    }
}

clicTarjetasBlancasSelectCliente();

//quita tarjeta cliente seleccionado y pone seleccionar cliente
function insertartarjetaSeleccionaCliente(divContenedor, claseDiferenciadora){
    //comprobar si el modal información reserva está abierto para cambiar botón a guardar
    ponerBotonesGuardarCambios();
    //-------------------------------
    let divClienteVenta = document.querySelector(divContenedor);
    $(divClienteVenta).empty();
    $(divClienteVenta).append(`
        <div class="b-shadow-card customer-card_emptyCustomer_XKrcQ ${claseDiferenciadora} customer-card_isWalkIn__KcSW pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSelectClient" onclick="clicTarjetasBlancasSelectCliente(this)">
            <div data-v-3d594be1="" class="">
                <div data-v-3d594be1="" title="" class="b-avatar_avatar_pJzSu" style="width: 48px; height: 48px; flex: 0 0 48px;"></div>
            </div>
            <div data-v-3d594be1="" class="customer-card_customerContent_Pq14e color-07 size--16">
                <span data-v-3d594be1="">Selecciona un cliente o déjalo en blanco</span>
            </div>
            <div data-v-3d594be1="" class="customer-card_customerClose_kMCQ7">
                <span data-v-3d594be1="" class="b-icon iconFont icon-plus" style="font-size: 20px;"></span>
            </div>
        </div>
        `);
        //hacemos clic en la x cliente en nueva reserva calendar
        if(claseDiferenciadora.trim() === 'card_empty_calendar'){
            if(servicesWithTimes.length > 0){
                actualizarEventoClienteArray('Cliente sin cita previa');
            }else{
                actualizarEventoCliente(eventIdChangeCalendar, 'Cliente sin cita previa');
            }
        }
        if(claseDiferenciadora.trim() === 'card_empty_info'){
            //console.log(servicesWithTimes.length, "servicesWithTimes.length clase diferenciadora___________________");
            if(servicesWithTimes.length <= 1){
                actualizarEventoCliente(eventIdChangeCalendar, 'Cliente sin cita previa');
            }else{
                //console.log("actualizar evento array");
                actualizarEventoClienteArray('Cliente sin cita previa');
            }
        }else{
            //console.log("no es clase diferenciadora");
        }
}

// insertar tarjeta cliente seleccionado venta rápida
function insertarTarjetaClienteSelecionado(cliente, divInfoClienteEnviado, claseDiferenciadora){
    let divInfoCliente = document.querySelector(divInfoClienteEnviado);
    let iniciales = obtenerIniciales(cliente.name, cliente.primer_apellido);
    $(divInfoCliente).empty();
    $(divInfoCliente).append(`
        <div data-v-3d594be1="" class="b-shadow-card customer-card_customer_PiI9d" data-index="${cliente.id}">
            <div data-v-3d594be1="" class="customer-card_customerData_Ke3s5 d-flex">
                <div data-v-3d594be1="" title="${cliente.name} ${cliente.primer_apellido}" class="b-avatar_avatar_pJzSu" style="width: 40px; height: 40px; flex: 0 0 40px;">
                    <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ${iniciales} </div>
                </div>
                <div data-v-3d594be1="" class="customer-card_customerContent_Pq14e">
                    <div data-v-3d594be1="" class="customer-card_customerName_clLc6 customer-card_size--16-sb_kPC0E"> ${cliente.name} </div>
                    <div data-v-3d594be1="" class="color-07 size--14">
                        <span data-v-3d594be1="" class="flex inline items-center">
                            <span> ${cliente.telefono || 'No disponible'} </span>
                        </span>
                    </div>
                </div>
                <div data-v-3d594be1="" class="customer-card_customerClose_kMCQ7 flex" onclick="insertartarjetaSeleccionaCliente('${divInfoClienteEnviado}', '${claseDiferenciadora}')">
                    <span data-v-3d594be1="" class="b-icon iconFont icon-x" data-testid="basket-customer-card-close" style="font-size: 20px; align-items: center; display: flex;"></span>
                </div>
            </div>
        </div>
    `);
    clicTarjetasBlancasSelectCliente();
}
// insertar tarjeta cliente seleccionado extentorp
function insertarTarjetaClienteSelecionadoExtentrop(cliente, divInfoClienteEnviado, claseDiferenciadora){
    //console.log(cliente, "cliente");
    let divInfoCliente = document.querySelector(divInfoClienteEnviado);
    let iniciales = obtenerIniciales(cliente.nombre, cliente.primerApellido);
    $(divInfoCliente).empty();
    $(divInfoCliente).append(`
        <div data-v-3d594be1="" class="b-shadow-card customer-card_customer_PiI9d" data-index="${cliente.id}">
            <div data-v-3d594be1="" class="customer-card_customerData_Ke3s5 d-flex">
                <div data-v-3d594be1="" title="${cliente.nombre} ${cliente.primerApellido}" class="b-avatar_avatar_pJzSu" style="width: 40px; height: 40px; flex: 0 0 40px;">
                    <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ${iniciales} </div>
                </div>
                <div data-v-3d594be1="" class="customer-card_customerContent_Pq14e">
                    <div data-v-3d594be1="" class="customer-card_customerName_clLc6 customer-card_size--16-sb_kPC0E"> ${cliente.nombre} </div>
                    <div data-v-3d594be1="" class="color-07 size--14">
                        <span data-v-3d594be1="" class="flex inline items-center">
                            <span> ${cliente.telefono || 'No disponible'} </span>
                        </span>
                    </div>
                </div>
                <div data-v-3d594be1="" class="customer-card_customerClose_kMCQ7 flex" onclick="insertartarjetaSeleccionaCliente('${divInfoClienteEnviado}', '${claseDiferenciadora}')">
                    <span data-v-3d594be1="" class="b-icon iconFont icon-x" data-testid="basket-customer-card-close" style="font-size: 20px; align-items: center; display: flex;"></span>
                </div>
            </div>
        </div>
    `);
    clicTarjetasBlancasSelectCliente();
}

//clic en tarjeta cliente seleccionado inserta tarjeta de cliente seleccionado
function funcionClicTrajeta2(cliente, accionResolver, idOffcanvasClosed, idInputClear){
    // console.log(cliente,accionResolver, "CLIENTE");

    let id_cliente = cliente.getAttribute('data-index');
    getClientById(id_cliente).then(function(cliente) {
        let nombreCliente = `${cliente.name} ${cliente.primer_apellido}`;
        $(`#${idOffcanvasClosed}`).offcanvas('hide');
        document.getElementById(idInputClear).value='';
        $(".item_client0202").show();
        if(accionResolver.trim()=== 'historialModificacionReserva'){

            // $('#offcanvasSelectClient').offcanvas('hide');
            document.querySelector('.styles_slotLeft_k29NgClienteHistorialModificaReserva').textContent = nombreCliente;
            filtrarHistorialPorCliente(id_cliente);
            resetInputsHistorialModificacionReservas(document.querySelector('.styles_slotLeft_k29NgClienteHistorialModificaReserva'));
        }else if(accionResolver.trim()=== 'historialModificacionReservaResponsable'){
            console.log("por responsable");

            document.querySelector('.styles_slotLeft_k29NgTodosUsersHistorialModificaReserva').textContent = nombreCliente;
            filtrarHistorialPorCualquierUser(id_cliente);
            //reseteamos los inputs menos el que mandamos
            resetInputsHistorialModificacionReservas(document.querySelector('.styles_slotLeft_k29NgTodosUsersHistorialModificaReserva'));
        }else{
              if(document.getElementById('offcanvasSelectClient').classList.contains('card_empty_calendarOffcanvas')){
                // //console.log("cliente calendario");
                $('#newReservCalendar').offcanvas('show');
                insertarTarjetaClienteSelecionado(cliente, '.basket-customer-card0101Calendar', 'card_empty_calendar');
                actionButoncloseOffcanvasSelectClient();//quitamos las clases añadidas para diferenciarç
                //si hay muchos servicios new reserv calendar
                if(servicesWithTimes.length > 0){
                    actualizarEventoClienteArray(nombreCliente);
                }else{
                    //console.log("actualizar evento");
                    actualizarEventoCliente(eventIdChangeCalendar, nombreCliente);
                }
            }else if(document.getElementById('offcanvasSelectClient').classList.contains('card_empty_ventasOffcanvas')){
                insertarTarjetaClienteSelecionado(cliente, '.basket-customer-card0101', 'card_empty_ventas');
                actionButoncloseOffcanvasSelectClient();//quitamos las clases añadidas para diferenciar

                //modificar evento
            }else if(document.getElementById('offcanvasSelectClient').classList.contains('card_empty_InfoOffcanvas')){
                insertarTarjetaClienteSelecionado(cliente, '.basket-customer-card0101Info', 'card_empty_info');
                actionButoncloseOffcanvasSelectClient();//quitamos las clases añadidas para diferenciar
                if(servicesWithTimes.length <= 1){
                    actualizarEventoCliente(eventIdChangeCalendar, nombreCliente);
                }else{
                    actualizarEventoClienteArray(nombreCliente);
                }
            }
            // $(`#${idOffcanvasClosed}`).offcanvas('hide');
            // $('#offcanvasSelectClient').offcanvas('hide');
            setTimeout(() => {
                ponerBotonesGuardarCambios();
            }, 300);
        }

    }).catch(function(error) {
    //console.log("Error:", error); // Maneja el caso de error
    });
}


//clic en tarjeta servicios si modal asignar empleado desactivado
function workAsig002(servicio_id, indexModalVentaRapida, precioServicio){
    document.activeElement.blur();
    console.log(document.querySelector('.service-variant_item_Cye7B').getAttribute('data-bs-toggle'), "valor toggle");
    if (!document.querySelector('.service-variant_item_Cye7B').getAttribute('data-bs-toggle')) {
        insertDateService(servicio_id, indexModalVentaRapida, precioServicio);
    }
}

//inserta los datos en venta rápida de servicios sin cobrar ya que el modal está desactivado
function insertDateNotModalNotPay(){
      if (!document.querySelector('.service-variant_item_Cye7B').getAttribute('data-bs-toggle')) {
        insertDateServiceNotPay();
        reiniciarPestaniaVentaRapida();
    }
}

//CLIC en el nombre del empleado asignar venta del desplegable
function selectEmpleAMark(indexDivVisualizador = null, empleNombreAsig, elemento, idEmpleado, claseDesplegable = null, divNombreEmpleado = null, titleEmpleado = null){
    // console.log(indexDivVisualizador, 'indexVisualizdo', empleNombreAsig, 'nombreEmpleado', elemento, 'elemento', idEmpleado,'idEmpleado', claseDesplegable,'claseDesplegable', divNombreEmpleado, 'divNOmbreEmplea', titleEmpleado, 'title', "valores selectEmpleAMark");

    let desplegableEmpleados = null;
    let divNOmbreEmpleA = null;
    let titleName = null;
    if(indexDivVisualizador === null){
        desplegableEmpleados= document.querySelector(claseDesplegable);
        if (desplegableEmpleados) {
            desplegableEmpleados.classList.add('d-none');
        }
        divNOmbreEmpleA = document.querySelector(divNombreEmpleado);
        titleName = document.querySelector(titleEmpleado);
    }else{
        //cerrar el desplegable empleados
        desplegableEmpleados= document.querySelector(`.droponAbrirEmpleA${indexDivVisualizador}`);
        if (desplegableEmpleados) {
            desplegableEmpleados.classList.add('d-none');
        }
        divNOmbreEmpleA = document.querySelector(`.nombreEmpleadoA${indexDivVisualizador}`);
        titleName = document.querySelector(`.titleEmpleadoA${indexDivVisualizador}`);
    }

    //poner nombre en el div visible
    divNOmbreEmpleA.textContent = empleNombreAsig;

    //añadir atributo al divNombreEmpledo
    divNOmbreEmpleA.setAttribute('data-index', idEmpleado);

    //añadir atributo a la clase titleEmpleadoA
    titleName.setAttribute("title", empleNombreAsig);

    //poner el tick al desplegable
    const empleadosConTick = document.querySelectorAll('.select-staffer_highlight_tt5tB .b-icon.iconFont.icon-tick');
    empleadosConTick.forEach(tick => tick.remove()); // Elimina todos los ticks existentes
    let tickSpan = document.createElement('span');
    tickSpan.classList.add('margin-left-auto', 'b-icon', 'iconFont', 'icon-tick');
    tickSpan.style.fontSize = '24px'; // Ajusta el tamaño si es necesario
    elemento.appendChild(tickSpan);

    //cambiar el abatar <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> KP </div>
    let iniciales = obtenerIniciales2(empleNombreAsig);
    $(titleName).empty();
    if (empleNombreAsig === 'No hay asignación de personal') {
        $(titleName).append(`
            <div class="b-avatar_avatarImage_u3RVD" style="background-image: url(https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/no-staffer.79c3c577.svg);"></div>
        `);
    }else{
        $(titleName).append(`
            <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ${iniciales} </div>
        `);
    }
}

//CLIC en el nombre del empleado asignar venta del desplegable boton cambiar
function selectEmpleBotonCambiar(nombreEmpleado, idEmpleado){
    let modalEple = document.getElementById('droponAbrirEmpleBotonCambiar');
    let index_li = modalEple.getAttribute('data-liIndex');
    let encargadoCobro = modalEple.getAttribute('data-encargadocobro');
    let visualizaEncargadoCobro = document.querySelector('.responsableCobro');
    if(encargadoCobro === ''){
        index_li = parseInt(index_li);
        let iniciales = obtenerIniciales2(nombreEmpleado);
        let liElemento = document.querySelector(`.basket-transactions-list li[data-index="${index_li}"]`);
        //console.log(liElemento, "elemento li", nombreEmpleado, "nombreEmpelado", idEmpleado, "idEmpleado");
        //cambiamos el nombre en el array
        // let servicioId88 = liElemento.getAttribute('data-servicio');
        // Recorrer el array
        for (let i = 0; i < serviciosVentaRapida.length; i++) {
            // Comprobamos si el índice coincide con index_li
            if (i === index_li) {
                // Elimina el elemento del array en el índice i
                serviciosVentaRapida[i].nombre_Empleado = nombreEmpleado;
                serviciosVentaRapida[i].id_empleado = idEmpleado;
                break; // Terminamos el bucle después de eliminar el elemento
            }
        }

        let divNombre_avatar = liElemento.querySelector('.assigned-staffer_assignedStaffer_cmkGT');
        $(divNombre_avatar).empty();
        if(nombreEmpleado.trim() === 'No hay asignación de personal'){
            $(divNombre_avatar).append(`
                <div title="No hay asignación de personal" class="padding-0 b-avatar_avatar_pJzSu b-avatar_avatarHasImage_i8yay" style="width: 28px; height: 28px;">
                    <div class="b-avatar_avatarImage_u3RVD" style="background-image: url(https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/no-staffer.79c3c577.svg);"></div>
                </div>
                 <div class="lista_li_emple margin-left-8 margin-right-8 size--14 txt--ellipsis size--14-sb" >No hay asignación de personal</div>
                 <button id="uid-${index_li}-inputChangeEmple" data-index="${index_li}" class="index_button_TfmOz index_size--sm_z95WM index_theme--default_AtMGF index_slotTheme--icon_yiHCJ assigned-staffer_assignedStafferButton_XHCi1 margin-left-auto" data-testid="assigned-staffer-edit-commission" data-bs-toggle="modal" data-bs-target="#droponAbrirEmpleBotonCambiar" onclick="showEmpleDesple(this)">
                     <div class="index_slotLeft_p6NJx">
                         <img src="https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/comission-edit.b159197c.svg" class="padding-left-8 b-icon_img_I0kuC" style="height: 14px;"></div>
                     <div class="index_caption_W6r_J"> Cambiar </div>
                 </button>
             `);

        }else{
            $(divNombre_avatar).append(`
                <div title="${nombreEmpleado}" class="padding-0 b-avatar_avatar_pJzSu assigned-staffer_assignedStafferAvatar_tCEbS" style="width: 28px; height: 28px; flex: 0 0 28px;">
                     <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;">${iniciales}</div>
                </div>
                <div class="lista_li_emple margin-left-8 margin-right-8 size--14 txt--ellipsis size--14-sb">${nombreEmpleado}</div>
                <button id="uid-${index_li}-inputChangeEmple" data-index="${index_li}" class="index_button_TfmOz index_size--sm_z95WM index_theme--default_AtMGF index_slotTheme--icon_yiHCJ assigned-staffer_assignedStafferButton_XHCi1 margin-left-auto" data-testid="assigned-staffer-edit-commission" data-bs-toggle="modal" data-bs-target="#droponAbrirEmpleBotonCambiar" onclick="showEmpleDesple(this)">
                    <div class="index_slotLeft_p6NJx">
                        <img src="https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/comission-edit.b159197c.svg" class="padding-left-8 b-icon_img_I0kuC" style="height: 14px;"></div>
                    <div class="index_caption_W6r_J"> Cambiar </div>
                </button>
            `);
        }
    }else{
        //console.log("lleno");
        visualizaEncargadoCobro.textContent = nombreEmpleado;
        responsableCobroId = idEmpleado;
        grupoBotonesMostrarVentaRapidan('.botonesEnabledVentaRapida');
    }
}

//muestra el botón que le mando de venta rápida
function grupoBotonesMostrarVentaRapidan(selectorBotonMostrar) {

    // Ocultar los botones que siempre deben estar ocultos
    const botonesVentaRapidaEna = document.querySelector('.botonesEnabledVentaRapida');
    const botonSoloPapeleraDisable = document.querySelector('.botonesEnabledVentaRapidaSoloPapelera');
    const botonesVentaRapiDisabled = document.querySelector('.botonesDisabledVentaRapida');

    if (botonesVentaRapidaEna) botonesVentaRapidaEna.classList.add("d-none");
    if (botonSoloPapeleraDisable) botonSoloPapeleraDisable.classList.add("d-none");
    if (botonesVentaRapiDisabled) botonesVentaRapiDisabled.classList.add("d-none");

    // Mostrar el botón específico que le pasas
    const botonMostrar = document.querySelector(selectorBotonMostrar);
    if (botonMostrar) botonMostrar.classList.remove("d-none");
}

// abrir cerrar desplegable selec emple asignar venta
function openModalEmpleA(desplegableindex){
    let desplegableAbrirEmpleA = document.querySelector(`.droponAbrirEmpleA${desplegableindex}`);
    desplegableAbrirEmpleA.classList.toggle('d-none'); // La clase 'd-none' oculta el div

}
// abrir cerrar desplegable selec emple asignar venta desde reservas no pay
function openModalEmpleAreservNoPay(){
    let desplegableAbrirEmpleA = document.querySelector(`.droponAbrirEmpleadoReservNoPay`);
    desplegableAbrirEmpleA.classList.toggle('d-none'); // La clase 'd-none' oculta el div

}
//función abrir desplegable empleado boton cambiar
function openModalEmpleDesdeBoton(listaNombreCambiar){
    let desplegableAbrirEmpleA = document.querySelector(`.droponAbrirEmpleBotonCambiar`);
    desplegableAbrirEmpleA.classList.toggle('d-none'); // La clase 'd-none' oculta el div

}
function construirTarjetaServiciosTiket(indexli, nombreServicio, duracionServicio, precio, idSErvicio, discountValue){
let discountHtmlTiket = `
    <div class="payment-receipt_receiptAltText_VrnDU payment-receipt_size--12_zJMLU">
        <div class="row">
            <div class="col descuentoTiketFinal"></div>
            <div class="col-auto descuentoTiketFinal">
                <div class="txt--gray"> -${discountValue}% </div>
            </div>
        </div>
    </div>
    `;
    let htmlContentFinalTicket='';
    htmlContentFinalTicket=`
    <div class="margin-bottom-12" data-index="${indexli}" data-servicio="${idSErvicio}" data-discount="${discountValue}">
        <div class="payment-receipt_receiptItem_QWl3W">
            <div class="payment-receipt_receiptItemName_BOOqL"> ${nombreServicio} (${duracionServicio}) </div>
            <div class="payment-receipt_receiptItemQuantity_XWqsy"> x1 </div>
            <div class="payment-receipt_receiptItemTotal_U6yh4 payment-receipt_size--14-sb_r8Zux"> ${precio}€ </div>
        </div>
        ${discountHtmlTiket}
    `;
    return htmlContentFinalTicket;
}

//FUNCIÓN CREAR HTML TARJETAS FINALES CLIC BOTON GUARDAR
function construirHtmlTarjetasVentaRapida(indexli, nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, idSErvicio, discountValue){
console.log(nombreServicio, "NOMBRE SERVICIO");


    let discountHtml = `
    <div class="row margin-bottom-0">
        <div class="col padding-bottom-0">
            <div class="size--12 color-07 importeDescuento"></div>
        </div>
        <div class="col col-4 padding-bottom-0">
            <div class="size--12 color-07 txt--right porcentajeDescuento"> Descuento ${discountValue}%</div>
        </div>
    </div>
    `;
    let inicialesEmpleado77 =  obtenerIniciales2(nombreApellidosEmpleado.trim());
    let seccionAbatar='';
    if(nombreApellidosEmpleado.trim() === 'No hay asignación de personal'){
        seccionAbatar=`
        <div title="No hay asignación de personal" class="padding-0 b-avatar_avatar_pJzSu b-avatar_avatarHasImage_i8yay" style="width: 28px; height: 28px;">
            <div class="b-avatar_avatarImage_u3RVD" style="background-image: url(https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/no-staffer.79c3c577.svg);"></div>
        </div>
        `;
    }else{
        seccionAbatar=`
        <div title="${nombreApellidosEmpleado}" class="padding-0 b-avatar_avatar_pJzSu assigned-staffer_assignedStafferAvatar_tCEbS" style="width: 28px; height: 28px; flex: 0 0 28px;">
            <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;">${inicialesEmpleado77}</div>
        </div>
        `;
    }
    let htmlContentTarjetaVentaRapidaFinal = '';
    htmlContentTarjetaVentaRapidaFinal= `
   <li data-index="${indexli}" data-servicio="${idSErvicio}" data-discount="${discountValue}">
        <div class="index_basketRow_CHIX3">
            <div data-testid="basket-row" class="basket-row_basketRow_MnpGk pointer" data-bs-toggle="modal" data-bs-target="#modificarArticulo" onclick="showEditBasket('${indexli}')">
                <div class="row margin-bottom-0 items-baseline">
                    <div class="col col-7 padding-bottom-0">
                        <div class="basket-row_basketRowName_HCisM basket-row_size--14_CO65x">
                            ${nombreServicio} (${duracionServicio})
                        </div>
                    </div>
                    <div class="col col-1 padding-bottom-0">
                        <div class="size--12 color-07 text-center">x1</div>
                    </div>
                    <div class="col padding-bottom-0">
                        <div class="size--14-sb txt--right liPrecio">${precio}€</div>
                    </div>
                </div>

                <div class="row margin-bottom-0">
                    <div class="col padding-bottom-0">
                        <div class="size--12 color-07"></div>
                    </div>
                </div>
            </div>
            `+discountHtml+`
            <div data-testid="assigned-staffer" class="assigned-staffer_assignedStaffer_cmkGT">`+seccionAbatar+`
                <div class="lista_li_emple margin-left-8 margin-right-8 size--14 txt--ellipsis size--14-sb">${nombreApellidosEmpleado}</div>
                <button id="uid-${indexli}-inputChangeEmple" data-index="${indexli}" class="pointert index_button_TfmOz index_size--sm_z95WM index_theme--default_AtMGF index_slotTheme--icon_yiHCJ assigned-staffer_assignedStafferButton_XHCi1 margin-left-auto" data-testid="assigned-staffer-edit-commission" data-bs-toggle="modal" data-bs-target="#droponAbrirEmpleBotonCambiar" onclick="showEmpleDesple(this)">
                    <div class="index_slotLeft_p6NJx">
                        <img src="https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/comission-edit.b159197c.svg" class="padding-left-8 b-icon_img_I0kuC" style="height: 14px;"></div>
                    <div class="index_caption_W6r_J"> Cambiar </div>
                </button>
            </div>
        </div>
    </li>
 `;
 seccionAbatar='';
 return htmlContentTarjetaVentaRapidaFinal;
}

//muestra modal editar cesta
function showEditBasket(liElement_index){
    let liElemento = document.querySelector(`.basket-transactions-list li[data-index="${liElement_index}"]`);
    let modalEditbasket = document.getElementById('modificarArticulo');
    modalEditbasket.setAttribute('data-lista-li', liElement_index);
    //console.log(liElemento, " li EDITAR CESTA");
    let precio = liElemento.querySelector('.liPrecio').textContent;
    let porcentaje = liElemento.querySelector('.porcentajeDescuento').textContent;
    porcentaje =  porcentaje.match(/\d+%/); // Extrae el número seguido del símbolo '%' uid-335-input

    let inputTotalDescuentoServicio = document.getElementById('uid-335-input');
    let importeDescuento11='';

    if (descuentosVentaRapida[parseInt(liElement_index)]) {
        // Si el índice existe, modificar el valor
        importeDescuento11 = descuentosVentaRapida[parseInt(liElement_index)].descuentoServicio;
    }
    inputTotalDescuentoServicio.value= importeDescuento11;
    let nameService = liElemento.querySelector('.basket-row_basketRowName_HCisM').textContent;
    document.getElementById('uid-317-input').value = precio;//input del modal
    document.getElementById('uid-319-input').value = porcentaje;
    document.querySelector('.editBasketNameService').textContent = nameService;
}

//actualiza totales venta rápida
function actualizarTotalSubtotal(){
    let totalBasquet1 = 0;

    let totalDescuentosServicios = descuentosVentaRapida.reduce((total, item) => {
        return total + (item.descuentoServicio || 0);
    }, 0);

    let totalDescuentoTotal = descuentoTotal;//variable gloval

    serviciosVentaRapida.forEach(servicio => {
        let precioServicio = parseInt(servicio.precio);
        totalBasquet1 += precioServicio;  // Sumar el precio de cada servicio descuentosVentaRapida
    });
    let totalBasquetSubtotal = totalBasquet1 - totalDescuentosServicios;
    let totalBasquetTotal = totalBasquetSubtotal - totalDescuentoTotal;

    // let intTotalBasquet = let num = +str; de string a numero int
    let dibSubtotal = document.querySelector('.divSubtotal');
    let totalPrecio = document.querySelector('.basketTotalPrecio');
    let input_uid317inputMetodoPago = document.getElementById('uid-317-inputMetodoPago');
    dibSubtotal.textContent = totalBasquetSubtotal.toFixed(2).replace('.', ',')+"€";
    totalPrecio.textContent = totalBasquetTotal.toFixed(2).replace('.', ',')+"€";
    input_uid317inputMetodoPago.value = totalBasquetTotal.toFixed(2).replace('.', ',');
}

//crea div para icono nota o corazon evento
function createDivNoteCorazon(){
    let iconDiv = document.createElement('div');
    iconDiv.classList.add('icons_icons_YFduH', 'index_icons_LluzP');
    iconDiv.style.setProperty('--b1c0b092', '16px');
    return iconDiv;
}

// crea imagen nota evento
function createIconNote(){
    let iconImg = document.createElement('img');
    iconImg.classList.add('b-icon_img_I0kuC', 'icons_icon_lMJWA');
    iconImg.src = urlAplicacion + "/storage/calendar/notaCliente.svg";
    iconImg.style.zIndex = '2';
    iconImg.style.left = '5px';
    iconImg.style.position = 'relative';
    return iconImg;
}
function createDivWithNoteCora(div33){
    div33.appendChild(createIconNote());
    div33.appendChild(createIconCorazon());
    return div33;
}
// crea image corazon evento
function createIconCorazon(){
    let iconImgCorazon = document.createElement('img');
    iconImgCorazon.classList.add('b-icon_img_I0kuC', 'icons_icon_lMJWA');
    iconImgCorazon.src = urlAplicacion + "/storage/calendar/corazonRojoPequenio.svg";
    iconImgCorazon.style.zIndex = '1';
    iconImgCorazon.style.left = '0px';
    iconImgCorazon.style.position = 'relative';
    return iconImgCorazon;
}

function createIconPayment(){
    let iconImgPayment = document.createElement('img');
    iconImgPayment.classList.add('b-icon_img_I0kuC', 'icons_icon_lMJWA');
    iconImgPayment.src = urlAplicacion + "/storage/calendar/iconPaiment.svg";
    iconImgPayment.style.zIndex = '1';
    iconImgPayment.style.left = '2px';
    iconImgPayment.style.position = 'relative';
    iconImgPayment.style.width = '13px';
    return iconImgPayment;
}
function createIconAdvertencia(){
    let iconImgPayment = document.createElement('img');
    iconImgPayment.classList.add('b-icon_img_I0kuC', 'icons_icon_lMJWA');
    iconImgPayment.src = urlAplicacion + "/storage/calendar/advertenciaSvg.svg";
    iconImgPayment.style.zIndex = '1';
    iconImgPayment.style.left = '2px';
    iconImgPayment.style.position = 'relative';
    iconImgPayment.style.width = '13px';
    return iconImgPayment;
}

//CLIC EN BOTON GUARDAR uid-164-input Asignar venta insertDateService('1', '0', '10.00')id_servicio, index, servicio_precio
function insertDateService(servicio_id, indexModalVentaRapida, precioServicio){
    let htmlContentVentaRapida = '';
    let nombreVentaRapida = document.querySelector(`.nombreEmpleadoA${indexModalVentaRapida}`).textContent;
    let id_empleado = document.querySelector(`.nombreEmpleadoA${indexModalVentaRapida}`).getAttribute('data-index');
    console.log(precioServicio, "precio");

    //metemos la venta en el array
    insertarServicioEmpleadoArrayVentaRapida(servicio_id, nombreVentaRapida, parseFloat(precioServicio), id_empleado);
    // console.log(servicio_id, nombreVentaRapida, parseFloat(precioServicio), id_empleado, "INSERTDATE");
    //CON EMPLEADO:5 África Pedregosa 3 1 INSERTDATE
    //SIN EMPLEADO:7  No hay asignación de personal  45 cualquiera INSERTDATE
    console.log(serviciosVentaRapida, "SERVICIOSVENTARAPIDA ");

    insertarVentaRapidaSoloIds(servicio_id);
    console.log(serviciosVentaRapida_ids, "ARRRAY IDS");

    // addServiceDiscountArray();
    let divllenar = document.querySelector('.basketFull');
    let listaTransacciones = document.querySelector('.basket-transactions-list');

    //comprobar si el cesto está vacio
    let divCestoVacio = document.querySelector('.index_basketEmpty_VF3Lr');
    let cestoLleno = divCestoVacio.classList.contains('d-none');
    // //console.log("ESTA tiene cosas? ", cestoLleno);
    if (cestoLleno) {
        //comprobar si lista li tiene atributo data-discount
        getServicesById(serviciosVentaRapida_ids, function (servicios){
            servicios.forEach((servicio, index) => {
                let descuento = serviciosVentaRapida[index].descuento_servicio;
                let li_index = index;
                let servicio_idArray = serviciosVentaRapida[index].idServicio;
                let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
                let precioAsignar = serviciosVentaRapida[index].precio;
                let nomBreServicio = servicio.nombre;
                // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
                htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
                    li_index,
                    nomBreServicio,
                    comprobar603090SinM(servicio.duration),
                    precioAsignar,
                    nombreApellidoEmpleA,
                    servicio_idArray,
                    descuento
                );
            });
            // Agregar todo el contenido generado al contenedor nuevo
            $(listaTransacciones).empty();
            $(listaTransacciones).append(htmlContentVentaRapida);
        });
        // actualizar totales
        actualizarTotalSubtotal();
        actualizarDescuentoTotal();
    }
    else{

        divCestoVacio.classList.add('d-none');
        divllenar.classList.remove("d-none");
        getServicesById(serviciosVentaRapida_ids, function (servicios){
            servicios.forEach((servicio, index) => {
                let li_index = index;
                let precioAsignar = serviciosVentaRapida[index].precio;
                let descuento = serviciosVentaRapida[index].descuento_servicio;
                let servicio_idArray = serviciosVentaRapida[index].idServicio;
                let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
                // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
                htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
                    li_index,
                    servicio.nombre,
                    comprobar603090SinM(servicio.duration),
                    precioAsignar,
                    nombreApellidoEmpleA,
                    servicio_idArray,
                    descuento
                );
            });
            $(listaTransacciones).empty();
            $(listaTransacciones).append(htmlContentVentaRapida);
        });
        actualizarTotalSubtotal();
    }
    let divNombreResponsableCobro = document.querySelector('.responsableCobro');
    let responsableSeleccionado = divNombreResponsableCobro.textContent;
    if(responsableSeleccionado.trim() === 'No hay asignación de personal'){
        console.log("no se ha seleccionado");
         grupoBotonesMostrarVentaRapidan('.botonesEnabledVentaRapidaSoloPapelera');
    }else{
        console.log("se ha seleccionado");
         grupoBotonesMostrarVentaRapidan('.botonesEnabledVentaRapida');
    }
    // console.log(responsableSeleccionado, "se ha seleccionado empleado____");


}

function showEmpleDesple(boton){
    let modalSelecEmpleaBoton = document.getElementById('droponAbrirEmpleBotonCambiar');
    let index = boton.getAttribute('data-index');
    let optionSinAsingacion = document.querySelector('.sinAsignacionEmpleado');
    modalSelecEmpleaBoton.setAttribute('data-liIndex', index);
    let encargadoCobro = boton.getAttribute('data-responsable');
    if (encargadoCobro) {
        modalSelecEmpleaBoton.setAttribute('data-encargadoCobro', encargadoCobro);
        optionSinAsingacion.style.pointerEvents = 'none';
        optionSinAsingacion.style.opacity = '0.8';
    }else{
        modalSelecEmpleaBoton.setAttribute('data-encargadoCobro', '');
        optionSinAsingacion.style.pointerEvents = 'auto';  // Vuelve a permitir eventos del puntero
        optionSinAsingacion.style.opacity = '1';
    }
}



//controla boton eliminar desde el modal modificar cesta
let botonRemoveItemVentaRapida = document.querySelector('.buttonRemoveItem');
if (botonRemoveItemVentaRapida) {
    botonRemoveItemVentaRapida.addEventListener('click', function(event){
        event.preventDefault();
        let index_li = document.getElementById('modificarArticulo').getAttribute('data-lista-li');

        let elemento_li = document.querySelector(`.basket-transactions-list li[data-index="${index_li}"]`);
        // Recorrer el array
        //convierto string a int
        let numIndexLi = parseInt(index_li);  // Convierte el string en un número
        // Filtramos el array para eliminar el objeto con el idServicio igual al index
        for (let i = 0; i < serviciosVentaRapida.length; i++) {
            // Comprobamos si el índice coincide con index_li
            if (i === numIndexLi) {
                // Elimina el elemento del array en el índice i
                serviciosVentaRapida_ids.splice(i, 1);
                serviciosVentaRapida.splice(i, 1);
                break; // Terminamos el bucle después de eliminar el elemento
            }
        }
         //lo elimino de la vista
        if (elemento_li) {
            elemento_li.remove();
        }
        // actualizarTotalSubtotal();
    });
}

//controla el botón guardar modal modificar cesta
let botonGuardarItemVentaRapida = document.getElementById('uid-339-input');
if (botonGuardarItemVentaRapida) {
    botonGuardarItemVentaRapida.addEventListener('click', function(event){
        event.preventDefault();
        //obtenemos la etiqueta li a modificar = index del array
        let index_li = document.getElementById('modificarArticulo').getAttribute('data-lista-li');
        let elemento_li = document.querySelector(`.basket-transactions-list li[data-index="${index_li}"]`);
        //obtengo div precio
        let li_precio = elemento_li.querySelector('.liPrecio');
        //obtengo el precio desde el modal
        let precioModal = document.getElementById('uid-317-input').value;//modal
        //actualizo la vista
        precioModal.includes("€") ? li_precio.textContent = precioModal : li_precio.textContent = precioModal+"€";

        //comprobar descuento %
        let descuentoModal1 = document.getElementById('uid-319-input').value;
        let descuentoModalAtribute = document.getElementById('uid-319-input').value;
        if (descuentoModalAtribute.includes("%")) {
            descuentoModalAtribute = descuentoModalAtribute.replace("%", "");  // Elimina el símbolo '%'
        }
        let descuentoModal = descuentoModal1.includes("%") ? descuentoModal1 : descuentoModal1+"%";
        //console.log(descuentoModal, "descuentoModal");
        //añadimos atributo data-discount para montar tarjetas
        elemento_li.setAttribute('data-discount', descuentoModalAtribute);
        //actualizo vista descuento
        let divDescuento = elemento_li.querySelector('.porcentajeDescuento');
        divDescuento.textContent = 'Descuento '+descuentoModalAtribute+'%';

        // actualizar total y subtotal porcentajeDescuento
        //añadimos descuento en array
        //console.log(serviciosVentaRapida, "guardar modificar antes ");

        actualizarDescuentoPrecioArrayVentaRapida(index_li);
        //console.log(serviciosVentaRapida, "guardar modificar despues ");
        addServiceDiscountArray(index_li);
        actualizarTotalSubtotal();
        actualizarDescuentoTotal();
    });
}

//FUNCION CONTROLA DOS DECIMALES INPUT PRECIO
function formatCurrencyOnBlur(input) {
    let value = input.value.trim();

    // Si el campo está vacío, asignar valor enviado
    if (value === '') {
        value = '0.00';
    }

    // Eliminar cualquier carácter no numérico y dejar el punto decimal
    value = value.replace(/[^\d.]/g, '');

    // Verificar si tiene un punto decimal
    if (value.indexOf('.') === -1) {
        // Si no tiene punto, agregar ".00"
        value = value + '.00';
    } else {
        let parts = value.split('.');

        // Limitar los decimales a dos
        parts[1] = (parts[1] || '').substring(0, 2);

        // Si solo tiene un decimal, agregar 0
        if (parts[1].length === 1) {
            parts[1] = parts[1] + '0';
        }

        value = parts.join('.');
    }

    // Actualizar el valor del input con el nuevo formato
    input.value = value;
}

//al clicar pierde el string %
function removePercentage(input) {
    // Eliminar el '%' si está presente en el valor del input
    if (input.value.endsWith('%')) {
        input.value = input.value.slice(0, -1); // Elimina el último carácter '%'
    }
}

//FUNCIÓN QUE CONTROLA PONER EL PORCENTAJE AL FINAL EN EL INPUT
function formatDiscountRate(input) {
    let value = input.value.trim();

    // Si el campo está vacío, asignar 0
    if (value === '') {
        value = '0';
    }

    // Eliminar cualquier carácter no numérico
    value = value.replace(/[^\d]/g, '');

    // Asegurar que el valor termine con el símbolo de porcentaje
    if (!value.endsWith('%')) {
        value = value + '%';
    }

    // Actualizar el valor del input con el nuevo formato
    input.value = value;
}

//FUNCIÓN CALCULA EL TOTAL DEL DESCUENTO NOW
function updateDiscount() {
    // Obtener los valores de los campos
    const price = parseFloat(document.getElementById('uid-317-input').value) || 0; // El precio modal
    const discountRate = parseFloat(document.getElementById('uid-319-input').value.replace('%', '')) || 0; // El porcentaje de descuento

    // Calcular el importe del descuento
    const discountPrice = (price * discountRate) / 100;

    // Actualizar el campo de "importe del descuento" con el resultado
    document.getElementById('uid-335-input').value = discountPrice.toFixed(2); // Mostrar con 2 decimales
}

function actualizarPorcentajeTotal(){
    let divPorcentaje33 = document.querySelector('.basket-discountPorcentajeShow').textContent;
    document.getElementById('uid-totalDescuento-input').value = divPorcentaje33;
    //console.log(divPorcentaje33, "porcentaje cajetin");
    if (divPorcentaje33.endsWith('%')) {
        divPorcentaje33 = divPorcentaje33.slice(0, -1); // Elimina el último carácter '%'
    }
    divPorcentaje33 = parseFloat(divPorcentaje33);

}

function actualizarDescuentoTotal(){
    let subtotal15= document.querySelector('.divSubtotal').textContent;
    if (subtotal15.endsWith('€')) {
        subtotal15 = subtotal15.slice(0, -1); // Elimina el último carácter '%'
    }
    subtotal15 = parseFloat(subtotal15);
    let porcentaje115 = document.querySelector('.basket-discountPorcentajeShow').textContent;

    if(porcentaje115){
        if(porcentaje115.endsWith('%')){
            porcentaje115 = porcentaje115.slice(0, -1);
        }
        porcentaje115 = parseFloat(porcentaje115);
    }
    const discountTotalPrice115 = (subtotal15 * porcentaje115) / 100;
    descuentoTotal = discountTotalPrice115;
    actualizarTotalSubtotal();
    document.querySelector('.basket-discountShow').textContent= discountTotalPrice115+"€";
}

//boton guardar descuento total
let botonDescuentoTotal = document.getElementById('uid-guardarDescuentoTotal-input');
if (botonDescuentoTotal) {
    botonDescuentoTotal.addEventListener('click', function(event){
        event.preventDefault();

        let porcentajeDescuentoTotal = document.getElementById('uid-totalDescuento-input').value;
        let subtotalDescuentoTotal =  document.querySelector('.divSubtotal').textContent;
        if (porcentajeDescuentoTotal.endsWith('%')) {
                porcentajeDescuentoTotal = porcentajeDescuentoTotal.slice(0, -1); // Elimina el último carácter '%'
            }

        if (subtotalDescuentoTotal.endsWith('€')) {
                subtotalDescuentoTotal = subtotalDescuentoTotal.slice(0, -1); // Elimina el último carácter '%'
            }

        porcentajeDescuentoTotal = parseFloat(porcentajeDescuentoTotal);
        subtotalDescuentoTotal = parseFloat(subtotalDescuentoTotal);
         // Calcular el importe del descuento
        const discountTotalPrice = (subtotalDescuentoTotal * porcentajeDescuentoTotal) / 100;
        let formattedPrice = new Intl.NumberFormat('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(discountTotalPrice);
        let visualizaImporteDescuentoTotal = document.querySelector('.basket-discountShow');
        descuentoTotal = discountTotalPrice;

        visualizaImporteDescuentoTotal.textContent = formattedPrice+"€";
        document.querySelector('.basket-discountPorcentajeShow').textContent=porcentajeDescuentoTotal+"%";
        actualizarTotalSubtotal();
    });
}

//clic en el botón continuar cobrando cita de calendario y venta rápida
function continueButtonPayment(){
    activarLoaderUniversal('loaderVentaRapida');
    let div_HlQSH = document.querySelector('.basket-layout_basketWrapper_HlQSH');
    let input_uid317inputMetodoPago = document.getElementById('uid-317-inputMetodoPago');
    let importePago = document.querySelector('.basketTotalPrecio').textContent;
    let divBotonPagar123= document.querySelector('.insertPayButton');
    // Agregar la clase 'hidden' para hacer desaparecer el div gradualmente
    div_HlQSH.classList.add('hidden33');

    // Esperar un tiempo (la duración de la transición) antes de mostrarlo nuevamente
    setTimeout(function() {
        div_HlQSH.classList.remove('hidden33');
        showDivPagos('index_checkoutView_pvF8_VistaPagos');
        input_uid317inputMetodoPago.value= importePago;
        $(divBotonPagar123).empty();
        $(divBotonPagar123).append(`
            <button onclick="insertTargetPayment();" id="uid-1487-inputCobrar" class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
                <div class="index_caption_W6r_J botonCambiarTitulo"> COBRAR </div>
            </button>
            `);
            desactivarLoaderUniversal('loaderVentaRapida');
    }, 1000);
    //si hay reserva simple
    let id_reserva = document.getElementById('eventDetailsModal').getAttribute('data-idreserv');
    if(!infoArrayEnvio.length && !id_reserva){
        console.log("ESTO ES UNA VENTA RÁPIDA");
    }else{
        console.log(infoArrayEnvio.length, id_reserva,"ESTO ES MEDIANTE CITA PREVIA");
    }
}

// MÉTODOS DE PAGO
//cuando hacen clic en un método de pago click metodo pago
var metodosPado = document.querySelectorAll('.margin-bottom32MetodoPago .payment-types_col_ius7E');
metodosPado.forEach(function (metodo) {
    metodo.addEventListener('click', function(event){
        event.preventDefault(); // Evitar comportamiento predeterminado
        resetModalEfectivo();
        resetModalTarjeta();

        let importePago = document.querySelector('.basketTotalPrecio').textContent;
        let tipoPago = metodo.getAttribute('data-type');
        let  inputPreciApagar = document.getElementById('uid-317-inputMetodoPago');
        inputPreciApagar.setAttribute('data-type', tipoPago);
        inputPreciApagar.value = importePago;
        document.querySelector('.tipoPago2')?.setAttribute('data-tipoPago2', tipoPago);
        // let elementoTipoPago2 = document.querySelector('.tipoPago2');
        // elementoTipoPago2.setAttribute('data-tipoPago2', tipoPago);
        // Primero, eliminar la clase de cualquier div que esté actualmente activo en todos los métodos


        document.querySelector('.cambio_800').textContent = "0,00";
        removePayC();
        validarBorde();
        calcularCambio();
        document.querySelector('.payment-types_paymentMethodActive_vBa20')?.classList.remove('payment-types_paymentMethodActive_vBa20');

        // Luego, agregar la clase al div contiguo dentro del método clicado
        metodo.querySelector('div')?.classList.add('payment-types_paymentMethodActive_vBa20');

        // var divContiguo = metodo.querySelector('div'); // Esto asume que es el primer div dentro de 'metodo'
        // if (divContiguo) {
        //     divContiguo.classList.add('payment-types_paymentMethodActive_vBa20');
        // }
    });
});


//cuando hacen clic en la cantidad a pagar uid-317-inputMetodoPago
const inputPreciApagar = document.getElementById('uid-317-inputMetodoPago');
if(inputPreciApagar){
    inputPreciApagar.addEventListener('click', function(event){
        event.preventDefault(); // Evitar comportamiento predeterminado
        // let tipoPago= inputPreciApagar.getAttribute('data-type');
        validarBorde();
        calcularCambio();
        let tipoPago = document.querySelector('.tipoPago2').getAttribute('data-tipopago2');

        if (tipoPago === 'efectivo') {
            var myModal = new bootstrap.Modal(document.getElementById('modalIntroducirImporte33'));
            myModal.show();
        }else if(tipoPago === 'suscirpcion' || tipoPago ===  'tarjetaRegalo' || tipoPago === 'bonoSesiones'){
            //modal encontrar tarjeta
        }else{
            var myModal = new bootstrap.Modal(document.getElementById('modalIntroducirImporte33Tarjetas'));
            myModal.show();
            let importePago = document.querySelector('.basketTotalPrecio').textContent;
            let inputPagoTarjeta = document.getElementById('uid-730-input');
            inputPagoTarjeta.value = importePago;
            //modal con restante boton_deshabilitado
        }


        //console.log("clic en input importe pagado");
    });
}


//resetea modal efectio
function resetModalEfectivo(){
    document.getElementById('uid-3034-input').value='';
    document.getElementById('uid-183-input').value='';
}

//resetea modal tarjeta
function resetModalTarjeta(){
    document.getElementById('uid-730-input').value = document.querySelector('.basketTotalPrecio').textContent;;
    document.querySelector('.divInputRestante').textContent = "0,00";
}
//resetea totales
function resetTotales063(){
    document.getElementById('uid-317-inputMetodoPago').value = document.querySelector('.basketTotalPrecio').textContent;
    document.querySelector('.divInputRestante').textContent = "0,00";
}
//convierte string en numero solo numero
function convertirEnNumeroSolo(string){
    if (string.endsWith('€')) {
        string = string.slice(0, -1); // Elimina el último carácter '%'
    }
    let numero = parseFloat(string.replace(',', '.'));
   return numero
}


//validar importe no sea maryor que importe cesta pago tarjeta
var inputImporteTarjeta = document.getElementById('uid-730-input');
if (inputImporteTarjeta) {
    inputImporteTarjeta.addEventListener('input', function() {
        var importeExterior = convertirEnNumeroSolo(document.querySelector('.basketTotalPrecio').textContent);
        var importeInterior = convertirEnNumeroSolo(inputImporteTarjeta.value);
        //console.log(importeInterior, "importe interior", importeExterior, "importe exterior");
        let cantidadCero_inferior = document.querySelector('.cantidadCero_inferior');
        let botonHabilitado = document.getElementById('uid-3039-inputTarjeta');
        if (importeInterior > importeExterior) {

                cantidadCero_inferior.textContent="El importe no puede superar la cantidad de: "+importeExterior.toFixed(2).replace('.', ',')+"€";
                cantidadCero_inferior.classList.remove('d-none');

                botonHabilitado.classList.add('boton_deshabilitado');

            inputImporteTarjeta.value = importeExterior;
        }else{
            cantidadCero_inferior.classList.add('d-none');
            botonHabilitado.classList.remove('boton_deshabilitado');
        }
    });
}


// Crear una función para generar el HTML de cada fila
function generarFilaPagoCombinado(importe1, tipoPago1, resto, tipoPago2) {
    return `
        <div>
                <div class="row items-center margin-bottom-16">
                    <div class="col col-4">
                        <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_size--md_sPOha styles_theme--default_x92vh styles_slotTheme--default_vYr1T">
                            <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                <div class="styles_labelWrapper_isbmo">
                                    <label class="styles_label_hleTI"> Cantidad </label>
                                </div>
                                <div class="styles_wrapper_hb1CA">
                                    <div class="styles_slotLeft_k29Ng"> € </div>
                                    <input value="${importe1}€" placeholder="" data-testid="amount" id="uid-834-inputImporte1" name="amount" readonly="readonly" type="text" autocomplete="on" inputmode="text" class="styles_field_Bhxvq" style="min-width: 0px; text-transform: none;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_size--md_sPOha styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T">
                            <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                <div class="styles_labelWrapper_isbmo">
                                    <label class="styles_label_hleTI"> Método de pago </label>
                                </div>
                                <div class="styles_wrapper_hb1CA">
                                    <input data-tipoPago="${tipoPago1}" value="${tipoPago1}" placeholder="" data-testid="label" id="uid-835-inputResto1" name="label" readonly="readonly" type="text" autocomplete="on" inputmode="text" class="styles_field_Bhxvq" style="min-width: 0px; text-transform: none;"  onclick="mostrarModalOpciones007('uid-835-inputResto1')">
                                    <div class="styles_slotRight_TkOzM">
                                        <span class="b-icon iconFont icon-arrow-down"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-auto txt--right flex">
                        <span onclick="removePayC();" class=" color-11 margin-top-4 pointer b-icon iconFont icon-x" style="font-size: 24px;"></span>
                    </div>
                </div>
            </div>
            <div>
            <div class="row items-center margin-bottom-16">
                <div class="col col-4">
                    <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_size--md_sPOha styles_theme--default_x92vh styles_slotTheme--default_vYr1T">
                        <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                            <div class="styles_labelWrapper_isbmo">
                                <label class="styles_label_hleTI"> Cantidad </label>
                            </div>
                            <div class="styles_wrapper_hb1CA">
                                <div class="styles_slotLeft_k29Ng"> € </div>
                                <input value="${resto}" placeholder="" data-testid="amount" id="uid-834-inputImporte2" name="amount" readonly="readonly" type="text" autocomplete="on" inputmode="text" class="styles_field_Bhxvq" style="min-width: 0px; text-transform: none;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_size--md_sPOha styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T">
                        <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                            <div class="styles_labelWrapper_isbmo">
                                <label class="styles_label_hleTI"> Método de pago </label>
                            </div>
                            <div class="styles_wrapper_hb1CA">
                                <input data-tipoPago="${tipoPago2}" value="${tipoPago2}" placeholder="" data-testid="label" id="uid-835-inputResto2" name="label" readonly="readonly" type="text" autocomplete="on" inputmode="text" class="styles_field_Bhxvq" style="min-width: 0px; text-transform: none;" onclick="mostrarModalOpciones007('uid-835-inputResto2')">
                                <div class="styles_slotRight_TkOzM">
                                    <span class="b-icon iconFont icon-arrow-down"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-auto txt--right flex">
                    <span onclick="removePayC();" class="color-11 margin-top-4 pointer b-icon iconFont icon-x" style="font-size: 24px;"></span>
                </div>
            </div>
        </div>
    `;
}

//clic en el input abrir modal cambio tipo pago
function mostrarModalOpciones007(id_input){
    document.getElementById('modalCambiarMetodoPago').setAttribute('data-idImput', id_input);
    let inputCambioTipoPago003 = document.getElementById('uid-835-inputResto1');
    let tipoPagoOcultar = inputCambioTipoPago003.getAttribute('data-tipopago');
    //console.log(tipoPagoOcultar, " tipo pago, clic para abrir modal cambio tipo pago");
    var elementos0069 = document.querySelectorAll('#modalCambiarMetodoPago .metodoPago004');
    // Iteramos sobre los elementos encontrados y mostramos el contenido de cada uno
    elementos0069.forEach(function(elemento0069) {
        // //console.log(elemento0069.textContent.trim(), "metodoPago004");
        if(elemento0069.textContent.trim() === tipoPagoOcultar.trim()){
            //console.log(elemento0069.textContent.trim(), "Si son iguales", tipoPagoOcultar.trim());
            elemento0069.classList.add('d-none');
        }else{
            //console.log(elemento0069.textContent.trim(), "No son iguales", tipoPagoOcultar.trim());
            elemento0069.classList.remove('d-none');
        }
        // //console.log(elemento.textContent); // Muestra el contenido de cada div con clase "metodoPago004"
    });
    var myModal = new bootstrap.Modal(document.getElementById('modalCambiarMetodoPago'));
        myModal.show(); // Abre el modal
}

//clic en tarjetas modal cambio método pago
var elementos0070 = document.querySelectorAll('#modalCambiarMetodoPago .metodoPago004');
if (elementos0070) {
        // Iteramos sobre los elementos encontrados y mostramos el contenido de cada uno
        elementos0070.forEach(function(elemento0070) {
            elemento0070.addEventListener('click', function(event){
                let id_input0006 = document.getElementById('modalCambiarMetodoPago').getAttribute('data-idimput');
                //console.log(elemento0070.textContent.trim()," clic en tarjeta", id_input0006, "id del imput");
                document.getElementById(id_input0006).value = elemento0070.textContent.trim();
                // event.preventDefault();
                // let input900_id = document.getElementById('modalCambiarMetodoPago').getAttribute('data-idimput');
                // document.getElementById(input900_id).value = elemento0070.textContent;
            });
        });
}


//función para eliminar los pagos combinados y abrir el normal
function removePayC(){
     let divMostrarCambio005 = document.querySelector('.cambioMostrarOcultar');
    let pagoCombinado105 = document.querySelector('.pagoCombinado66');
    $(pagoCombinado105).empty();
    divMostrarCambio005.classList.remove('d-none');
    //console.log("clic en elliminar pagocombindo");
    let inputPrincipalPago = document.getElementById('uid-317-inputMetodoPago');
    inputPrincipalPago.setAttribute('data-type', 'efectivo');
    //ponemos active efectivo metodo pago
    aniadirActiveMetodoPago('efectivo');

    validarBorde();
}

//añade active al método pago seleccionado
function aniadirActiveMetodoPago(dataType){
    var metodoActivo = document.querySelector('.payment-types_paymentMethodActive_vBa20');
    if (metodoActivo) {
        metodoActivo.classList.remove('payment-types_paymentMethodActive_vBa20');
    }
    var metodoActivar = document.querySelector(`[data-type="${dataType}"]`);
    var divContiguo005 = metodoActivar.querySelector('div');
    if (divContiguo005) {
        divContiguo005.classList.add('payment-types_paymentMethodActive_vBa20');
    }
}

//clic en boton guardar del modal introducir importe tarjeta modal todo menos efectivo
var botonGuardarImporteTarjeta = document.getElementById('uid-3039-inputTarjeta');
if (botonGuardarImporteTarjeta) {
    botonGuardarImporteTarjeta.addEventListener('click', function(event){
        event.preventDefault();
        let inputImporteTarjeta120 = document.getElementById('uid-730-input');
        let importeTrajeta120 = convertirEnNumeroSolo(inputImporteTarjeta120.value);

        let botonHabilitado = document.getElementById('uid-3039-inputTarjeta');
        let cantidadCero_inferior = document.querySelector('.cantidadCero_inferior');
        let tipoPago033 = document.querySelector('.tipoPago2').getAttribute('data-tipoPago2');
        if(inputImporteTarjeta.value < 1){
            cantidadCero_inferior.textContent= "Introduce una cantidad superior a 0€";
            cantidadCero_inferior.classList.remove('d-none');

            botonHabilitado.classList.add('boton_deshabilitado');
        }else{
            cantidadCero_inferior.classList.add('d-none');
            botonHabilitado.classList.remove('boton_deshabilitado');
            let importeRestante01 = document.querySelector('.divInputRestante').textContent;
            //console.log(importeRestante01, "importe restante01");
            $('#modalIntroducirImporte33Tarjetas').modal('hide');
            if(importeRestante01.trim() === '0,00'){
                // document.querySelector('.pagoCombinado66').classList.add('d-none');

            }else{
                aniadirActiveMetodoPago('Pago fraccionado');
                let divCambio = document.querySelector('.cambioMostrarOcultar');
                divCambio.classList.add('d-none');
                let divCombinado = document.querySelector('.pagoCombinado66');

                // Construir el contenido HTML con los datos dinámicos
                let contenido = `
                ${generarFilaPagoCombinado(importeTrajeta120.toFixed(2), tipoPago033 ,importeRestante01, 'Efectivo')}
                `;

                // Insertar el contenido generado en el contenedor
                $(divCombinado).append(contenido);
            }


        }

    });
}


//calcular importe restante modal introducir importe tarjeta
let inputEntrada126 = document.getElementById('uid-730-input');
function comprobarResto(){
    let divRestante = document.querySelector('.divInputRestante');
    let importeTotalCestaRestante = document.querySelector('.basketTotalPrecio').textContent;
    let valorInputEntrada126 = convertirEnNumeroSolo(inputEntrada126.value);
    importeTotalCestaRestante = convertirEnNumeroSolo(importeTotalCestaRestante);
    // //console.log(valorInputEntrada126, "inputEntrada", importeTotalCestaRestante," impoteCesta-------resto");
    let restante = importeTotalCestaRestante - valorInputEntrada126;

    // Mostrar el importe restante en el div
    divRestante.textContent = restante >= 0 ? restante.toFixed(2).replace('.', ',')+"€" : "0,00€";
}

if (inputEntrada126) {
    inputEntrada126.addEventListener('input', function() {
        comprobarResto();
        });
}


//clic en el boton cancelar modal importe tarjeta
let botonCancelarpagotarjeta55 = document.getElementById('uid-223-input-cancelarCantidadTarjetas');
if (botonCancelarpagotarjeta55) {
    botonCancelarpagotarjeta55.addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('.divInputRestante').textContent="0,00";
        $('#modalIntroducirImporte33Tarjetas').modal('hide');
    });
}



//clic boton cancelar modal efectivo
let botonCancelarpagoEfectivo20 = document.getElementById('uid-223-input-cancelarCantidad');
if (botonCancelarpagoEfectivo20) {
    botonCancelarpagoEfectivo20.addEventListener('click', function(event){
        event.preventDefault();
        resetModalEfectivo();
        validarBorde();
        resetTotales063();
        // $('#modalIntroducirImporte33Tarjetas').modal('hide');
    });
}


//PONE BORDE ROJO SI CANTIDAD INFERIOR A IMPORTE
var inputMetodoPago = document.getElementById('uid-3034-input');
var bordeCambiarColor = document.querySelector('.styles_outerWrapper_NumuGIntroducirImporte');
var botonDeshabilitado = document.getElementById('uid-3039-input');

// Función para comprobar el valor y cambiar el borde
function validarBorde() {
    let importePago = document.querySelector('.basketTotalPrecio').textContent;//IMPORTE DE LA CESTA
    //console.log(importePago, "valor importe pago texcontent");

    if (importePago.endsWith('€')) {
        importePago = importePago.slice(0, -1); // Elimina el último carácter '%'
        //console.log(importePago, "valor dentro if");
    }
    importePago = parseFloat(importePago.replace(',', '.'));
    // Comprobamos si el valor del input es un número y si es mayor o igual al importePago
    if (parseFloat(inputMetodoPago.value) >= importePago) {
        bordeCambiarColor.style.border = '1px solid #ebebeb'; // Restablecer el borde
        botonDeshabilitado.classList.remove('boton_deshabilitado');
    } else {
        bordeCambiarColor.style.border = '2px solid red'; // Borde rojo
        botonDeshabilitado.classList.add('boton_deshabilitado');
    }
}

// Función que calcula el cambio y actualiza el campo correspondiente
function calcularCambio() {
    let inputCambio = document.getElementById('uid-183-input');

    // Obtener el valor introducido por el usuario (cantidad recibida)
    let cantidadRecibida = convertirEnNumeroSolo(inputMetodoPago.value);  //parseFloat(inputMetodoPago.value.replace(',', '.'));
    let importePago = document.querySelector('.basketTotalPrecio').textContent; // IMPORTE DE LA CESTA

    // Convertir el valor de importePago a número flotante
    importePago = convertirEnNumeroSolo(importePago);

    // Comprobamos que la cantidad recibida sea un número válido y que sea mayor o igual que el importe
    if (!isNaN(cantidadRecibida) && cantidadRecibida >= importePago) {

        let cambio = cantidadRecibida - importePago; // Calculamos el cambio

        // Actualizamos el campo del cambio con dos decimales
        inputCambio.value = cambio.toFixed(2); // Se muestra con dos decimales

    } else {
        // Si el valor es inválido o no suficiente, limpiamos el campo de cambio
        inputCambio.value = '';
    }
}



// Añadimos el eventListener para que valide cuando el valor del input cambie
if (inputMetodoPago) {
    inputMetodoPago.addEventListener('input', function() {
        validarBorde();
        calcularCambio();
    });
}

//clic en el boton guardar del modal introducir precio
let botonGuardarPrecioIntroducido = document.getElementById('uid-3039-input');
if(botonGuardarPrecioIntroducido){
    botonGuardarPrecioIntroducido.addEventListener('click', function(event){
        event.preventDefault();
        var inputMetodoPagovalor = document.getElementById('uid-3034-input').value;
        let visualizadorFinalImporte = document.getElementById('uid-317-inputMetodoPago');
        let inputCambiovalor = document.getElementById('uid-183-input').value;
        let visualizadoCambio = document.querySelector('.cambio_800');
        //console.log(inputMetodoPagovalor, "valor principal", inputCambiovalor, "cambio");
        visualizadorFinalImporte.value = parseFloat(inputMetodoPagovalor).toFixed(2)+"€"; // Se muestra con dos decimales
        visualizadoCambio.textContent= parseFloat(inputCambiovalor).toFixed(2).replace('.', ',')+' €';

    });
}

// CLIC EN NO VOLVER A MOSTRA MODAL ASIGNAR EMPLEADO
// Seleccionamos el input y el div contenedor
const checkbox001 = document.getElementById('uid-288-dont-ask-again');
const replacementDiv = document.querySelector('.input-checkbox_replacement_dMLsR');

// Agregamos un event listener para el evento 'change' en el checkbox
if (checkbox001) {
    checkbox001.addEventListener('change', function() {
        // Comprobamos si el checkbox está marcado
        let listaItems410 = document.querySelectorAll('.service-variant_item_Cye7B');
        let totalItems410 = listaItems410.length;
        if (checkbox001.checked) {
            // Si está marcado, agregamos la clase al div y cambiamos el valor del input a "true"
            replacementDiv.classList.add('input-checkbox_replacementChecked_uxNiJ');
            checkbox001.value = "true";

            listaItems410.forEach(function(item410) {
               item410.removeAttribute('data-bs-toggle');
               item410.removeAttribute('data-bs-target');
             });
        } else {
            // Si no está marcado, quitamos la clase del div y cambiamos el valor del input a "false"
            replacementDiv.classList.remove('input-checkbox_replacementChecked_uxNiJ');
            checkbox001.value = "false";
            listaItems410.forEach(function(item410, totalItems410) {
                item410.setAttribute('data-bs-toggle', 'modal');
                item410.setAttribute('data-bs-target', '#asignarVenta'+totalItems410);
              });
        }
    });
}
//CLIC EN EL CHECBOX NO MOSTRAR MODAL ASIGNAR VENTA RESERVNOPAY
const checkbox002 = document.getElementById('uid-288-dont-ask-againReservNotPay');
const replacementDiv002 = document.querySelector('.input-checkbox_replacement_dMLsRNopay');

// Agregamos un event listener para el evento 'change' en el checkbox
if (checkbox002) {
    checkbox002.addEventListener('change', function() {
        // Comprobamos si el checkbox está marcado
        let listaItems410 = document.querySelectorAll('.service-variant_item_Cye7B');
        let totalItems410 = listaItems410.length;
        if (checkbox002.checked) {
            // Si está marcado, agregamos la clase al div y cambiamos el valor del input a "true"
            replacementDiv002.classList.add('input-checkbox_replacementChecked_uxNiJ');
            checkbox002.value = "true";

            listaItems410.forEach(function(item410) {
               item410.removeAttribute('data-bs-toggle');
               item410.removeAttribute('data-bs-target');
             });
        } else {
            // Si no está marcado, quitamos la clase del div y cambiamos el valor del input a "false"
            replacementDiv002.classList.remove('input-checkbox_replacementChecked_uxNiJ');
            checkbox002.value = "false";
            listaItems410.forEach(function(item410, totalItems410) {
                item410.setAttribute('data-bs-toggle', 'modal');
                item410.setAttribute('data-bs-target', '#asignarVentaReservaNoPay');
              });
        }
    });
}

function reseteoVistaVentaPago(){
    reseteoVistaVenta();
    infoArrayEnvio=[];
    let divContenedorTicket = document.querySelector('.index_checkoutView_oS9m6Secundario');
    let divContenedorTicketPrincipal = document.querySelector('.index_checkoutView_oS9m6Principal');
    $(divContenedorTicket).empty();
    divContenedorTicketPrincipal.classList.remove('d-none');
    activarPestaniaNuevaVenta();
}

// function reseteoVistaVenta(){
//     let contenedorTarjetasServiciosCalendar = document.querySelector('.appointment-card_appointment_F_IwZ');
//     if(contenedorTarjetasServiciosCalendar){
//         let divContenedorFechaHora = document.querySelector('.appointment-date_date_UsCxi');
//         $(divContenedorFechaHora).empty();
//         document.querySelector('.statusReservaCalendarCobrar').textContent = '';
//         $('.tarjetasServiciosCobrarCalendar056').empty();
//         contenedorTarjetasServiciosCalendar.style.display = 'none';
//     }
//     let div_HlQSH = document.querySelector('.basket-layout_basketWrapper_HlQSH');
//     div_HlQSH.classList.add('hidden33');
//     serviciosVentaRapida = [];
//     serviciosVentaRapida_ids = [];
//     descuentosVentaRapida = [];
//     descuentoTotal=0;
//     let divCestoVacio01 = document.querySelector('.index_basketEmpty_VF3Lr');
//     let divCestolleno01 = document.querySelector('.basketFull');
//     document.querySelector('.basketTotalPrecio').textContent = "0,00€";
//     document.querySelector('.divInputRestante').textContent = "0,00";

//     document.querySelector('.basket-discountPorcentajeShow').textContent="0%";
//     document.querySelector('.basket-discountShow').textContent="0,00 €";

//     grupoBotonesMostrarVentaRapidan('.botonesDisabledVentaRapida');

//     let listaCesta01 = document.querySelector('.basket-transactions-list');
//     let divBotonPagar1234= document.querySelector('.insertPayButton');
//     let pagosCombinados01 = document.querySelector('.pagoCombinado66');
//     let cambioMostrar01 = document.querySelector('.cambioMostrarOcultar')
//     let activarEfectivo = document.querySelector('.margin-bottom32MetodoPago .payment-types_col_ius7E[data-type="efectivo"]');
//     resetModalEfectivo();
//     resetModalTarjeta();
//     // Esperar un tiempo (la duración de la transición) antes de mostrarlo nuevamente
//      setTimeout(function() {
//         div_HlQSH.classList.remove('hidden33');
//         showDivPagos('salesNavigator-indexBasketContent');
//         divCestolleno01.classList.add('d-none');
//         divCestoVacio01.classList.remove('d-none');
//        $(listaCesta01).empty();
//        $(pagosCombinados01).empty();
//        cambioMostrar01.classList.remove('d-none');
//        var metodoActivo = document.querySelector('.payment-types_paymentMethodActive_vBa20');
//         if (metodoActivo) {
//             metodoActivo.classList.remove('payment-types_paymentMethodActive_vBa20');
//         }
//         activarEfectivo.querySelector('div').classList.add('payment-types_paymentMethodActive_vBa20');

//         if(document.querySelector('.cambio_800')){
//             document.querySelector('.cambio_800').textContent="0,00€";
//         }
//         // input_uid317inputMetodoPago.value= importePago;
//         $(divBotonPagar1234).empty();
//         $(divBotonPagar1234).append(`
//             <button onclick="continueButtonPayment()" id="uid-139-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
//                 <div class="index_caption_W6r_J botonCambiarTitulo"> Continuar </div>
//             </button>
//             `);
//         insertartarjetaSeleccionaCliente('.basket-customer-card0101', 'card_empty_ventas');

//     }, 500);
// }
function reseteoVistaVenta() {
    // Contenedores principales
    let contenedorTarjetasServiciosCalendar = document.querySelector('.appointment-card_appointment_F_IwZ');
    let div_HlQSH = document.querySelector('.basket-layout_basketWrapper_HlQSH');
    let divCestoVacio01 = document.querySelector('.index_basketEmpty_VF3Lr');
    let divCestolleno01 = document.querySelector('.basketFull');
    let listaCesta01 = document.querySelector('.basket-transactions-list');
    let divBotonPagar1234 = document.querySelector('.insertPayButton');
    let pagosCombinados01 = document.querySelector('.pagoCombinado66');
    let cambioMostrar01 = document.querySelector('.cambioMostrarOcultar');
    let activarEfectivo = document.querySelector('.margin-bottom32MetodoPago .payment-types_col_ius7E[data-type="efectivo"]');
    let metodoActivo = document.querySelector('.payment-types_paymentMethodActive_vBa20');
    let cambio800 = document.querySelector('.cambio_800');

    // Reset de vistas y elementos relacionados a calendario y reserva
    if (contenedorTarjetasServiciosCalendar) {
        let divContenedorFechaHora = document.querySelector('.appointment-date_date_UsCxi');
        if (divContenedorFechaHora) {
            $(divContenedorFechaHora).empty();
        }
        let statusReserva = document.querySelector('.statusReservaCalendarCobrar');
        if (statusReserva) statusReserva.textContent = '';
        $('.tarjetasServiciosCobrarCalendar056').empty();
        contenedorTarjetasServiciosCalendar.style.display = 'none';
    }

    // Oculta temporalmente el contenedor principal
    div_HlQSH.classList.add('hidden33');

    // Reset variables globales relacionadas con venta rápida
    serviciosVentaRapida = [];
    serviciosVentaRapida_ids = [];
    descuentosVentaRapida = [];
    descuentoTotal = 0;

    // Reset textos de precios y descuentos
    let basketTotalPrecio = document.querySelector('.basketTotalPrecio');
    if (basketTotalPrecio) basketTotalPrecio.textContent = "0,00€";

    let divInputRestante = document.querySelector('.divInputRestante');
    if (divInputRestante) divInputRestante.textContent = "0,00";

    let discountPorcentajeShow = document.querySelector('.basket-discountPorcentajeShow');
    if (discountPorcentajeShow) discountPorcentajeShow.textContent = "0%";

    let discountShow = document.querySelector('.basket-discountShow');
    if (discountShow) discountShow.textContent = "0,00 €";

    // Actualiza botones (asumo que esta función está definida)
    grupoBotonesMostrarVentaRapidan('.botonesDisabledVentaRapida');

    // Resetea modales de pago
    resetModalEfectivo();
    resetModalTarjeta();

    // Timeout para esperar la transición antes de mostrar elementos
    setTimeout(() => {
        div_HlQSH.classList.remove('hidden33');
        showDivPagos('salesNavigator-indexBasketContent');

        divCestolleno01.classList.add('d-none');
        divCestoVacio01.classList.remove('d-none');

        $(listaCesta01).empty();
        $(pagosCombinados01).empty();

        if (cambioMostrar01) cambioMostrar01.classList.remove('d-none');

        if (metodoActivo) {
            metodoActivo.classList.remove('payment-types_paymentMethodActive_vBa20');
        }
        if (activarEfectivo) {
            let divInterno = activarEfectivo.querySelector('div');
            if (divInterno) {
                divInterno.classList.add('payment-types_paymentMethodActive_vBa20');
            }
        }

        if (cambio800) cambio800.textContent = "0,00€";

        $(divBotonPagar1234).empty();
        $(divBotonPagar1234).append(`
            <button onclick="continueButtonPayment()" id="uid-139-input"
                class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF
                index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
                <div class="index_caption_W6r_J botonCambiarTitulo"> Continuar </div>
            </button>
        `);

        insertartarjetaSeleccionaCliente('.basket-customer-card0101', 'card_empty_ventas');
    }, 500);
}


//CLIC BOTÓN CANCELAR VENTA MODAL CANCELAR VENTA
let cancelarBoton01 = document.getElementById('uid-223-inputCancelarVenta0102');
if (cancelarBoton01) {
    cancelarBoton01.addEventListener('click', function(event){
        event.preventDefault();

        reseteoVistaVenta();
        $('#modalCancelarVenta33').modal('hide');
       manejarLoaderTarjetasUniversal('loaderVentaRapidaLiveWire');

    });

}



// Función para mover el carrusel
function scrollCarousel(amount) {
    const nav = document.querySelector('.b-tabs_content_lxbV0OpcionesInfoCliente');
    nav.scrollLeft += amount;
}


/*CLIENTES*/
//clic en la tarjeta cliente
function funcionClicTrajeta(cliente){
     // Eliminar la clase activa del elemento actual (si existe)
     const currentActive = document.querySelector('.customer-el-list_active_ffoQG');
     if (currentActive) {
         currentActive.classList.remove('customer-el-list_active_ffoQG');
     }
     // Añadir la clase activa al elemento clicado
     cliente.classList.add('customer-el-list_active_ffoQG');
     document.querySelector('.index_customerWrapper_r1idQ').classList.add('list_customerCardMobileView_CfTzS');
     document.querySelector('.index_customerWrapper_r1idQ').classList.add('cutomers-list-with-banner');
     let id_cliente = cliente.getAttribute('data-clie');
     getFristClient(id_cliente);
}


//cambia citas proximas pasadas
const pestaniaProximaPasada = document.querySelectorAll('.li_proxima_pasada');
pestaniaProximaPasada.forEach(function(pestania) {
    pestania.addEventListener('click', function() {
        // let totalCitas0030 = pestania.getAttribute('data-total');
        const pestaniaActiva = document.querySelector('.b-tabs_tabBorderedActive_ff9lg_proximaPasada');
            if (pestaniaActiva) {
                pestaniaActiva.classList.remove('b-tabs_tabBorderedActive_ff9lg_proximaPasada');
                pestaniaActiva.setAttribute('data-testid', 'inactive');
                pestaniaActiva.setAttribute('tabindex', '-1');
            }
        pestania.classList.add('b-tabs_tabBorderedActive_ff9lg_proximaPasada');
        pestania.setAttribute('data-testid', 'active');
        pestania.setAttribute('tabindex', '0');
        if(pestania.classList.contains('li_proxima_cliente')){
            showDivClient('citasProximas_001_cliente');
        }else{
            showDivClient('citasPasadas_001_cliente');
        }
    });
});

function getFristClient(idCliente){
    //console.log(idCliente, "id cliente en frisct client");
    if (idCliente === 'primero') {
        const currentActive = document.querySelector('.customer-el-list_active_ffoQG');
        if (currentActive) {
            currentActive.classList.remove('customer-el-list_active_ffoQG');
        }
        document.querySelector('.item_client0202').classList.add('customer-el-list_active_ffoQG');
    }
    let updateStatusReservUrl = 'get-fristClient';
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: updateStatusReservUrl,
        method: 'POST',
        data: {
            _token: csrfToken,
            cliente_id: idCliente,
        },
        success: function(response) {

            montarTarjetaInfoCliente(response.firstClient, response.firstClientInitials, response.infoAdicionalCliente);

            updateClientListInfo(response.totalFinalizadas, response.totalProximas);

            // Manejo de citas terminadas y próximas
            handleAppointments(response.terminadasFclient, response.serviciosTerminados, response.empleadasTerminadas, '.listaCitasClienteTerminadas003', '.b-emptyPassadas', '.listaUl_ClienteTerminadas003');
            handleAppointments(response.proximasFclient, response.serviciosProximos, response.empleadasProximas, '.listaCitasClienteProximas003', '.b-emptyProximas', '.listaUl_ClienteProximas003');
        },
        error: function(xhr) {
            //console.log('Error al actualizar el status', xhr);
        }
    });
}

function montarTarjetaInfoCliente(primerCliente, inicialesFrisclient, infoAdicionalCliente){
    $('.inicilalesCliente0050').empty();
    $('.inicilalesCliente0050').append(`
       <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 32px;"> ${inicialesFrisclient}</div>
    `);
    document.querySelector('.index_fullName_i2BLH').textContent = primerCliente.name;
    document.querySelector('.inicilalesCliente0050').setAttribute('title', primerCliente.name);
    $('.index_headerPhone_Qcakf').empty();
    $('.index_headerPhone_Qcakf').append(`
        <span class="flex inline items-center">
            <span>${primerCliente.telefono}</span>
        </span>
     `);
     $('.index_visitsInfo_Uuncf').empty();
     $('.index_visitsInfo_Uuncf').append(`
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Citas</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff">${infoAdicionalCliente.numeroCitas}</div>
        </div>
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Inasistencias</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff">${infoAdicionalCliente.inasistencias}</div>
        </div>
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Cancelaciones</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff">${infoAdicionalCliente.cancelaciones}</div>
        </div>
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Última visita</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff">${infoAdicionalCliente.ultimaVisita}</div>
        </div>
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Ingresos totales</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff">${infoAdicionalCliente.totalIngresos} €</div>
        </div>
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Descuento</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff">${infoAdicionalCliente.descuentos}</div>
        </div>
        <div class="index_visitsInfoItem_zUjfI">
            <div class="index_title_AGBmy index_size--10_EjPcG">Cliente de confianza</div>
            <div class="index_value_kD_oD index_size--14-sb_kg1ff index_valueTrusted_sPXxO">${infoAdicionalCliente.clienteConfianza}ierne</div>
        </div>
     `);
}

// Función para actualizar la información del cliente
function updateClientListInfo(totalFinalizadas, totalProximas) {
    document.querySelector('.li_pasada_cliente').textContent = `Pasadas (${totalFinalizadas})`;
    document.querySelector('.li_proxima_cliente').textContent = `Próximas (${totalProximas})`;

    document.querySelector('.b-emptyPassadas').classList.toggle('d-none', totalFinalizadas > 0);
    document.querySelector('.listaUl_ClienteTerminadas003').classList.toggle('d-none', totalFinalizadas === 0);

    document.querySelector('.b-emptyProximas').classList.toggle('d-none', totalProximas > 0);
    document.querySelector('.listaUl_ClienteProximas003').classList.toggle('d-none', totalProximas === 0);
}

// Función para manejar citas (tanto terminadas como próximas)
function handleAppointments(citas, servicios, empleados, listSelector, emptySelector, listWrapperSelector) {
    if (citas.length === 0) return;

    $(listSelector).empty();

    citas.forEach(function(cita, index) {
        let fechaCita = new Date(cita.date_time);
        let mes = fechaCita.toLocaleString('es-ES', { month: 'short' });
        let dia = fechaCita.getDate();
        let hora = fechaCita.getHours().toString().padStart(2, '0');
        let minuto = fechaCita.getMinutes().toString().padStart(2, '0');
        let horaMinuto = `${hora}:${minuto}`;
        let status = cita.status;

        let divStatusClases = getStatusClass(status);

        let servicioNombre = servicios[index].nombre;
        let servicioBorderColor = servicios[index].borderColor;
        let duracion58 = (servicios[index].hora > 0)
            ? `${servicios[index].hora}h ${servicios[index].minuto}min`
            : `${servicios[index].minuto}min`;

        let empleado = empleados[index];
        let empleadoNombre = empleado ? `${empleado.nombre} ${empleado.apellido}` : "Empleado no disponible";
        let formattedTotal = cita.total_payment.toString().replace(".", ",") + " €";

        let divPagado = cita.status_payment === 'Pagado'
            ? `<div data-testid="receipt-status-badge-label" class="flex inline margin-bottom-4 receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq"> Pagado </div>`
            : '';

        $(listSelector).append(`
            <li>
                <div class="list_appointment_aww7c">
                    <div class="appointment_appointment_LmBLD">
                        <div class="appointment-date_date_UsCxi">
                            <div class="irenemiweb appointment-date_month_nFAjw appointment-date_size--12_Z4is5">${mes}</div>
                            <div class="appointment-date_day_zpfF4 appointment-date_size--20_BC_a_">${dia}</div>
                            <div class="appointment-date_hour_isz2C appointment-date_size--12_Z4is5">${horaMinuto}</div>
                        </div>
                        <div class="appointment_info_QK4CC">
                            <div class="${divStatusClases}">${status}</div>
                            ${divPagado}
                            <div class="appointment-service_service_KFga9">
                                <div class="appointment-service_serviceBar_d_tAg" style="border-left-width: 0px; border-color: ${servicioBorderColor};"></div>
                                <div class="appointment-service_serviceHeader_qO6qz appointment-service_size--14__gGWE margin-left-12"> ${servicioNombre} </div>
                                <div class="appointment-service_serviceSubHeader_OGHVA appointment-service_size--12_Hog21 margin-left-12">
                                    <span class="duration">${duracion58}</span>  • ${empleadoNombre}
                                </div>
                            </div>
                        </div>
                        <div class="appointment_additionals_Eg8kg appointment_additionalsLonger_J5WmT">
                            <div class="appointment_redo_m4i8Z">
                                <button type="button" class="b-button_button_QiVJW b-button_theme--iconSecondary_yYxhu appointment_redoButton_PBpSa" data-testid="appointment-redo-btn"> rehacer </button>
                            </div>
                        </div>
                        <div class="appointment_total_tXjTE appointment_size--16-sb_hG9l7">${formattedTotal}</div>
                    </div>
                    <hr class="list_hr_Am6We">
                </div>
            </li>
        `);
    });
}

// Función para obtener la clase correspondiente según el estado
function getStatusClass(status) {
    let divStatusClases = 'margin-bottom-4 style_status_xxjlV style_statusDefault_HPmTE style_status--xs_vvmA5 style_statusUpperCase_bkX7Z';
    if (status === 'confirmed' || status === 'Finalizada') {
        divStatusClases += ' style_statusGreen_lW62O';
    } else if (status === 'cancelled') {
        divStatusClases += ' style_statusGray_K1guG';
    } else if (status === 'no_asistida') {
        divStatusClases += ' style_statusRed_gfbPD';
    } else if (status === 'pending') {
        divStatusClases += ' style_statusWarning_lW62O';
    } else {
        //console.log('Estado desconocido');
    }
    return divStatusClases;
}


//flecha ocultar info cliente
var flechaOcultarInfoCliente = document.querySelector('.cerrarVistaInfoCliente');
if(flechaOcultarInfoCliente){
    flechaOcultarInfoCliente.addEventListener('click', function(){
        document.querySelector('.index_customerWrapper_r1idQ').classList.remove('list_customerCardMobileView_CfTzS');
        document.querySelector('.index_customerWrapper_r1idQ').classList.remove('cutomers-list-with-banner');

    });
}

//buscador de clientes
function buscar(inputSeachClient) {
    // console.log(inputSeachClient);

    var filtro = $(inputSeachClient).val().toUpperCase();

    // Iterar sobre cada cliente
    $(".item_client0202").each(function() {
        // Obtener el texto del nombre y apellido del cliente
        var textoCliente = $(this).find(".customer-el-list_searchItemName_LLoTq").text().toUpperCase();

        // Verificar si el texto contiene el filtro
        if (textoCliente.indexOf(filtro) >= 0) {
            $(this).show();  // Si se encuentra el filtro, mostrar el cliente
        } else {
            $(this).hide();  // Si no, ocultar el cliente
        }
    });
}
//AÑADIR RESERVA DESDE CALENDAR

//FUNCION clicar boton añadir cita en calendarABRIR MODAL AÑADIR CITA
let botonAniadirCitaCalendar = document.getElementById('uid-3777-input');
if(botonAniadirCitaCalendar){
    botonAniadirCitaCalendar.addEventListener('click', function(event){
        event.preventDefault();

        openModalNewReservCalendar();
    });
}


//FUNCION ABRIR CERRAR MODAL NUEVA CITA CALENDAR
function openModalNewReservCalendar(){
    let divContenedorDropon = document.querySelector('.droponNuevaCitaCalendar');
    if (divContenedorDropon) {
        divContenedorDropon.classList.toggle('add-event_open_RxMza');
        let modalnewReservCalendar= document.querySelector('.droponNuevaReservaCalendar');
        modalnewReservCalendar.classList.toggle('d-none');
    }
}

//FUNCION GESTIONA APERTURA MODAL NUEVA RESERVA DESDE CALENDARIO
let botonesNewReservFaltaDispoCalendario = document.querySelectorAll('.add-event_button_DtVNQ');
    if (botonesNewReservFaltaDispoCalendario) {
        botonesNewReservFaltaDispoCalendario.forEach(function (boton) {
            // Verifica si el enlace ya tiene un listener registrado
            $(boton).off('click').on('click', function(event) {
                event.preventDefault();
                let dataUrl = boton.getAttribute('data-url3');
                if (dataUrl === 'add.reserve') {
                    creamosNuevaReserva = true;
                    initDatePikerNewReservCalendar();
                    openModalNewReservCalendar();//modal para elegir entre nueva cita y añadir falta disponibilidad
                    ponerHoraInicioActual();
                    ponerHoraActualMasTreinta();
                    // Llama la función para los dos inputs/dropdowns
                    // configurarFiltroHoras('horaNewServiceInputFinCalendar', '.contenedorHorasFinCalendar');
                    // configurarFiltroHoras('horaNewServiceInputInicioCalendar', '.contenedorHorasInicioCalendar');
                    // configurarFiltroHoras('horaNewServiceInputFinAddCalendar', '.contenedorHorasFinAddCalendar');
                    // configurarFiltroHoras('horaNewServiceInputInicioAddCalendar', '.contenedorHorasInicioAddCalendar');
                    const newReservCalendarModal = new bootstrap.Offcanvas(document.getElementById('newReservCalendar'));
                    let calendar25 = document.getElementById('calendar');

                    calendar25.classList.add('calendarEstrecho');
                    initializeCalendar();
                    newReservCalendarModal.show();
                    showDivNotas('datos_reservaNewReserv0106');
                    colorBordeReservArray = [];
                    infoArrayEnvio = [];
                    // blockPointerEvents();
                     //botonDeshabilitado
                     let miDiv = document.querySelector('.fc-header-toolbar');
                     let botones = miDiv.getElementsByTagName('button');
                     for (let boton of botones) {
                     boton.disabled = true;
                     blockPointerEvents();
                     }
                }
                // else if(dataUrl === 'add.category'){
                //     abrirCerrarModalAniadirServico();
                //     abrirModal('newCategoryModal');
                // }
            });
        });
    }

//comprobar si existe servicio new reservCalendar
function existeServicioNewReservCalendar(){
    let hayServicio = '';
    if(document.querySelector('.services_serviceInfo_iDMQwAddCalendar')){
        hayServicio = document.querySelector('.services_serviceInfo_iDMQwAddCalendar').getAttribute('data-indexactual');
        if(hayServicio){
            return true;
            // title = title + ' •' + document.querySelector('.services_serviceInfo_iDMQwAddCalendar .services_serviceName_YhbTW_span').textContent;
        }else{
            return false
        }
    }
}

function existeNombreCliente(){
    let divTarjetaCliente = document.querySelector('.basket-customer-card0101Calendar .customer-card_customerData_Ke3s5');
    if(divTarjetaCliente){
       let nombreCliente = divTarjetaCliente.querySelector('.b-avatar_avatar_pJzSu').getAttribute('title');
    //    //console.log("existe cliente", nombreCliente);
       return nombreCliente;
    }else{
       return false;
    }
}

function existeNombreClienteComun(principalClass){
    // //console.log("entro en existeNombreClienteComun, principalClass: ", principalClass);

    let divTarjetaCliente = document.querySelector(`${principalClass} .customer-card_customerData_Ke3s5`);
    if(divTarjetaCliente){
       let nombreCliente = divTarjetaCliente.querySelector('.b-avatar_avatar_pJzSu').getAttribute('title');
    //    //console.log("existeNOmbreCliente", nombreCliente);
       return nombreCliente;
    }else{
       return false;
    }
}

    function ponerEventoInicialmente(id_empleado) {
        let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
        let horaInicio = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
        let horaFin = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
        let start = formatFechaConHora(fecha, horaInicio);  // Fecha y hora de inicio
        let end = formatFechaConHora(fecha, horaFin);      // Fecha y hora de finalización
        let fechaInicial = start.split('T')[0];
        let title = 'Cliente sin cita previa';
        let eventId = `eventoTemporal_1_${start.replace(/:/g, "_")}`;
            // console.log("poner evento inicialmente", fecha, "HORAINICIO",horaInicio, horaFin,"FECHA INICIAL",  fechaInicial);
        let id_unico = `${fechaInicial}_${id_servicioIdUnico}_${horaInicio}__${horaFin}_${id_empleado}`;
        if(existeNombreCliente() !== false){
            title = existeNombreCliente();
        }
        //para cambiar title si hay servicio
        if(existeServicioNewReservCalendar()){
            title = title + ' • ' + document.querySelector('.services_serviceInfo_iDMQwAddCalendar .services_serviceName_YhbTW_span').textContent.trim();
        }
        let extendedProps = {
           id_unico: id_unico,
        };
        let eventData = {
                classNames: ['temporal', eventId],
                id: eventId,//esto es lo que sirve para eliminarlo
                title: title,
                start: start,  // Fecha y hora de inicio
                end: end,      // Fecha y hora de finalización
                resourceId: id_empleado,
                extendedProps: extendedProps,
        };
        // //console.log(eventData, "eventData ponerInicialmente");

        if (calendar) {
            calendar.changeView('resourceTimeGridDay');
            calendar.gotoDate(fechaInicial);
            let horaInicioObj = new Date(start);
            let horaInicioFormateada =
                horaInicioObj.getHours().toString().padStart(2, '0') + ":" +  // Obtener la hora con 2 dígitos
                horaInicioObj.getMinutes().toString().padStart(2, '0') + ":" +  // Obtener los minutos con 2 dígitos
                horaInicioObj.getSeconds().toString().padStart(2, '0');  // Obtener los segundos con 2 dígitos
            scrollToHour(horaInicioFormateada);
            calendar.addEvent(eventData);
        }
        //para poner borde si hay evento
        setTimeout(() => {
            let eventoTemporal = document.querySelector('.fc-event.temporal');
            if (eventoTemporal) {
                if(existeServicioNewReservCalendar()){
                    eventoTemporal.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                    eventoTemporal.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                }
            }
        }, 500);
        eventIdChangeCalendar = eventId;
    }

    function obtenerValorCorazon(divCorazon){
        let imagen = document.querySelector(divCorazon);
        let serleccionaClienteValor = '';
        if (imagen && imagen.src.includes('corazonRojo')) {
            serleccionaClienteValor = 1;
        } else {
            serleccionaClienteValor = 0;
        }
        return serleccionaClienteValor;
    }

    //pone el evento visible y parpadeante en el calendario
    function ponerEventoInicialmenteModify(info){
        // console.log(info, "poner evento inicialmente modify--info");

        let event = '';
        let existeInfo = info.event;
        //si existe info.event se le asigna a event, de lo contrario a event se el asigna info
        existeInfo ?  event = info.event:  event = info;

        let csrfToken = $('meta[name="csrf-token"]').attr("content");

        if(!event.length){
            //console.log("NO HAY .LEND");

            eliminarEventoCalendario(info.event.id);
            idEventoInicial = info.event.id;

            const eventInfo = info.event;
            // console.log(eventInfo, );

            let fecha = eventInfo.start;
            let horaInicio = obtenerHoraEuropaCentral(fecha);
            let start2 = formatFechaConHora(fecha, horaInicio);


            // Extraer la información relevante
            const title = eventInfo._def.title;  // Título del evento
            const start = eventInfo._instance.range.start;  // Fecha de inicio
            const end = eventInfo._instance.range.end;  // Fecha de fin (si está presente)
            // const eventId = `eventoTemporal_1_${start2.replace(/:/g, "_")}`;
            const eventId = eventIdChangeCalendar;
            // //console.log(start, end, "start y end");

            // Si la fecha de finalización no está presente, solo usamos la fecha de inicio
            const endDate = eventInfo.end;
            const startDate = eventInfo.start;

            // Extraer colores y otras propiedades de extendedProps si están presentes
            const backgroundColor = eventInfo._def.backgroundColor || "#FF5733";  // Color de fondo
            const borderColor = eventInfo._def.borderColor || "#FF5733";  // Color del borde
            const textColor = eventInfo._def.textColor || "#FFFFFF";  // Color del texto

            //aquí el id_unico está en dentro del _def.extendfProps
            const event589 = {
                classNames: ['temporal', eventInfo._def.publicId],
                id: eventId,  // ID único del evento
                title: title,  // Título del evento
                start: startDate,  // Fecha de inicio (asegúrate de que sea un objeto Date)
                end: endDate,  // Fecha de finalización (si existe)
                borderColor: borderColor,  // Color del borde
                textColor: 'black',  // Color del texto
                extendedProps: eventInfo._def.extendedProps,  // Propiedades extendidas
                resourceId: eventInfo._def.extendedProps.empleada.id
            };
             //vamos a la fecha
             let fechaInicio = info.event._instance.range.start; // Obtener la fecha de inicio del evento
            //  //console.log(fechaInicio, "FECHA INICIO--------------");
             fechaInicio = formatearFecha02(fechaInicio);
            //  //console.log(fechaInicio, "FECHA INICIO formateada--------------");
             calendar.gotoDate(fechaInicio);
            // Añadir el evento al calendario
            calendar.addEvent(event589);

            eventIdChangeCalendar = eventId;
        }else{
            //console.log(eventIdChangeCalendarArray, "PONEREVENTO INICIALMENTE MODIFY--eventIdChangeCalendarArray");
                 //console.log("Eventos cancelados");
                // Suponiendo que `info` es un array de eventos
                const eventos = info;  // Aquí `info` es un array de eventos

                eventos.forEach((eventInfo) => {
                    // Obtener la fecha de inicio del evento
                    let fecha = eventInfo.start;
                    let horaInicio = obtenerHoraEuropaCentral(fecha);
                    let start2 = formatFechaConHora(fecha, horaInicio);

                    // Extraer la información relevante
                    const title = eventInfo._def.title;  // Título del evento
                    const start = eventInfo._instance.range.start;  // Fecha de inicio
                    const end = eventInfo._instance.range.end;  // Fecha de fin (si está presente)
                    // const eventId = `eventoTemporal_1_${start2.replace(/:/g, "_")}`;
                    const eventId = `eventoTemporal_1_${ eventInfo._def.extendedProps.reservaId}`;
                    // Si la fecha de finalización no está presente, solo usamos la fecha de inicio
                    const endDate = eventInfo.end;
                    const startDate = eventInfo.start;

                    // Extraer colores y otras propiedades de extendedProps si están presentes
                    const backgroundColor = eventInfo._def.backgroundColor || "#FF5733";  // Color de fondo
                    const borderColor = eventInfo._def.borderColor || "#FF5733";  // Color del borde
                    const textColor = eventInfo._def.textColor || "#FFFFFF";  // Color del texto

                    // aquí supuestamente el id_unico está en _def.extendedpro
                    const event = {
                        classNames: ['temporal', eventInfo._def.publicId],
                        id: eventId,  // ID único del evento
                        title: title,  // Título del evento
                        start: startDate,  // Fecha de inicio (asegúrate de que sea un objeto Date)
                        end: endDate,  // Fecha de finalización (si existe)
                        borderColor: borderColor,  // Color del borde
                        textColor: 'black',  // Color del texto
                        extendedProps: eventInfo._def.extendedProps,  // Propiedades extendidas
                        resourceId: eventInfo._def.extendedProps.empleada.id
                    };

                    // Vamos a la fecha de inicio del evento
                    let fechaInicio = eventInfo._instance.range.start; // Obtener la fecha de inicio del evento
                    fechaInicio = formatearFecha02(fechaInicio); // Formatear la fecha de inicio

                    // Mover el calendario a la fecha de inicio
                    calendar.gotoDate(fechaInicio);
                    //console.log(event, "PONEREVETO INICIALMENTE MODIFY--event");

                    // Añadir el evento al calendario
                    calendar.addEvent(event);

                    // Opcional: forzar la actualización visual del calendario
                    calendar.render();

                    // Si necesitas almacenar el ID del último evento agregado (por ejemplo, en `eventIdChangeCalendar`):
                    // eventIdChangeCalendar = eventId;
                });
        }
    }

    function loaderWite(){
        let loader = document.querySelector('#loaderSperaAdministrator2');
        loader.classList.remove('d-none');

        setTimeout(() => {
            loader.classList.add('d-none');
        }, 3500);
    }

    function loaderWiteSmall(){
        let loader = document.querySelector('#loaderSperaAdministrator2');
        loader.classList.remove('d-none');

        setTimeout(() => {
            loader.classList.add('d-none');
        }, 2000);
    }

    function loaderWiteMegaSmall(){
        let loader = document.querySelector('#loaderSperaAdministrator2');
        loader.classList.remove('d-none');

        setTimeout(() => {
            loader.classList.add('d-none');
        },1000);
    }
    function existeServicioPantalla2(tarjetaServicioClass){
        //para cambiar title si hay servicio
        let hayServicio = '';
        if(document.querySelector(tarjetaServicioClass)){
            hayServicio = document.querySelector(tarjetaServicioClass).getAttribute('data-service');
            if(hayServicio){
                return true
            }else{
                return false;
            }
        }
    }

    function ponerEventoPantalla2Info(id_empleado, empleado_nombre = null) {
        // //console.log(infoArrayEnvio, "infoArray desde pantalla2Info:" , id_empleado);

        // let fecha = infoArrayEnvio.event.start;
        let noExisteTarjetaServicio = document.querySelector('.selectServiceAdd .services-wrapper_serviceEmpty_pbusk');
        if(!noExisteTarjetaServicio){

        }
        let fecha = document.querySelector('.fechaCitaInfo').getAttribute('data-datepiker');
        let horaInicio = document.querySelector('.slotHorasCobrarServicioAdd').textContent;
        let horaFin = document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent;
        let start = formatFechaConHora(fecha, horaInicio);  // Fecha y hora de inicio
        let end = formatFechaConHora(fecha, horaFin);      // Fecha y hora de finalización
        let fechaInicial = start.split('T')[0];
        let title = 'Cliente sin cita previa';
        let eventId = `eventoTemporal_2_${start.replace(/:/g, "_")}`;
        let precioServicio1 = '';
        let borderColor = 'transparent';
        let nombreServicio = '';
        let id_servicio = '';
        // //console.log(fecha, horaInicio, horaFin, start, end,title, eventId, "datos pantallaInfo2");
        // eventIdChangeCalendarArray.push(eventId);
            // //console.log(eventId);
        if(existeNombreClienteComun('.basket-customer-card0101Info') !== false){
            title = existeNombreClienteComun('.basket-customer-card0101Info');
        }
        //para cambiar title si hay servicio(tarjeta del servicio seleccionado)
        if(existeServicioPantalla2('.selectServiceAdd')){
            loaderWite();
            precioServicio1 = document.querySelector('.selectServiceAdd .services_servicePrice_wErzf').textContent;
            precioServicio1 = precioServicio1.replace('€', '');
            precioServicio1 = precioServicio1.trim();
            borderColor = document.querySelector('.selectServiceAdd .services_serviceDecorator_ldMxA').style.borderColor;
            borderColor = borderColor.trim();
            nombreServicio= document.querySelector('.services_serviceInfo_iDMQwAdd .services_serviceName_YhbTW_span').textContent;
            nombreServicio = nombreServicio.trim();
            id_servicio = document.querySelector('.selectServiceAdd').getAttribute('data-service');
            title = title + ' • ' + document.querySelector('.services_serviceInfo_iDMQwAdd .services_serviceName_YhbTW_span').textContent.trim();
        }
        let id_unico = `${fechaInicial}_${id_servicio}_${horaInicio}__${horaFin}_${id_empleado}`;
        let eventData016 = {
                classNames: ['temporal2', eventId],
                id: eventId,//esto es lo que sirve para eliminarlo
                extendedProps: {
                    servicio:{
                        nombre: nombreServicio,
                        borderColor: borderColor,
                        duracion: calcularDuracion(horaInicio.trim(), horaFin.trim()),
                        precio: precioServicio1,
                        id: id_servicio,
                    },
                    empleada:{
                        nombre: empleado_nombre,
                        id: id_empleado,
                    },
                    horaInicio: horaInicio,
                    horaFin: horaFin,
                    id_unico: id_unico,
                },
                title: title,
                start: start,  // Fecha y hora de inicio
                end: end,      // Fecha y hora de finalización
                borderColor: colorBordeNewReservCalendar,
                resourceId: id_empleado,
                duracion: calcularDuracion(horaInicio.trim(), horaFin.trim()),
        };
        if (calendar) {
            calendar.addEvent(eventData016);
            //console.log(infoArrayEnvio, "infoArray desde pantalla2Info:");

            if(infoArrayEnvio.length){
                //console.log("hay infoArray.lend");

                infoArrayEnvio.push(eventData016);
            }else{
                //console.log("NO infoArray.lend");
                let infoArayTemporal = infoArrayEnvio.event;
                infoArrayEnvio = [];
                infoArrayEnvio.push(infoArayTemporal);
                infoArrayEnvio.push(eventData016);
                //console.log(infoArrayEnvio, "infoArray desde pantalla2Info:");
            }
        }else{
            //console.log("no hay calendar");

        }
        //para poner borde si hay evento
        setTimeout(() => {
            let eventoTemporal = document.querySelector('.fc-event.temporal2');
            if (eventoTemporal) {
                if(existeServicioPantalla2('.selectServiceAdd')){
                    eventoTemporal.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                     eventoTemporal.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                }
            }
        }, 2500);

        // //console.log(servicesWithTimes, "Evento inicial");
         calendar.render();
        eventIdChangeCalendar = eventId;
        // let events = calendar.getEvents();
        // //console.log(events, "ponerEventoPantalla2Info--events");
    }

    function ponerEventoPantalla2(id_empleado) {
        // let events = calendar.getEvents();
        // // Filtramos los eventos que tienen el mismo valor en 'multiple'
        // let idEventoPantalla2 = events.filter(event => event.id === eventIdChangeCalendar);
        // //console.log(idEventoPantalla2, "EVENTO PANTALLA 2------------");

        let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
        let horaInicio = document.querySelector('.slotHorasCobrarServicioAddCalendar').textContent;
        let horaFin = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent;
        let start = formatFechaConHora(fecha, horaInicio);  // Fecha y hora de inicio
        let end = formatFechaConHora(fecha, horaFin);      // Fecha y hora de finalización
        let fechaInicial = start.split('T')[0];
        let title = 'Cliente sin cita previa';
        let eventId = `eventoTemporal_2_${start.replace(/:/g, "_")}`;
            // //console.log(eventId);
        if(existeNombreCliente() !== false){
            title = existeNombreCliente();
        }
        //para cambiar title si hay servicio
        if(existeServicioPantalla2('.selectServiceAddCalendar')){
            title = title + ' • ' + document.querySelector('.services_serviceInfo_iDMQwAddCalendar .services_serviceName_YhbTW_span').textContent.trim();
        }
        let id_unico = `${fechaInicial}_${id_servicioIdUnico}_${horaInicio}__${horaFin}_${id_empleado}`;
        let extendedProps = {
           id_unico: id_unico,
        };
        let eventData = {
                classNames: ['temporal2', eventId],
                id: eventId,//esto es lo que sirve para eliminarlo
                title: title,
                start: start,  // Fecha y hora de inicio
                end: end,      // Fecha y hora de finalización
                description: 'Detalles de la cita',
                location: 'Ubicación de la cita',
                borderColor: colorBordeNewReservCalendar,  // Color del borde
                resourceId: id_empleado,
                extendedProps: extendedProps,
        };
        if (calendar) {
            calendar.changeView('resourceTimeGridDay');
            calendar.gotoDate(fechaInicial);
            let horaInicioObj = new Date(start);
            let horaInicioFormateada =
                horaInicioObj.getHours().toString().padStart(2, '0') + ":" +  // Obtener la hora con 2 dígitos
                horaInicioObj.getMinutes().toString().padStart(2, '0') + ":" +  // Obtener los minutos con 2 dígitos
                horaInicioObj.getSeconds().toString().padStart(2, '0');  // Obtener los segundos con 2 dígitos
            scrollToHour(horaInicioFormateada);
            calendar.addEvent(eventData);
        }
        //para poner borde si hay evento
        let eventoTemporal = document.querySelector('.fc-event.temporal2.'+eventId);
            if (eventoTemporal) {
                if(existeServicioPantalla2('.selectServiceAddCalendar')){
                    eventoTemporal.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                     eventoTemporal.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                }
            }
        eventIdChangeCalendar = eventId;
    }

    //función para cambiar el empleado del evento
    function cambiarResourceIdEvento(eventId, newResourceId, eventoTemporalEnviado) {
        // Obtener el evento por su ID
        let evento = calendar.getEventById(eventId);
        // console.log(infoArrayEnvio,servicesWithTimes, eventId, newResourceId, eventoTemporalEnviado, "CAMBIARRESOURCEIDEVNTO" );

        // Verificar si el evento existe
        if (evento) {
            // Cambiar el resourceId del evento usando setResources
            evento.setResources([newResourceId]);
            // Ahora podemos actualizar cualquier otra propiedad que queramos (si es necesario)
            //console.log(`El resourceId del evento ${eventId} ha sido actualizado a: ${newResourceId}`);
        } else {
            //console.log(`No se encontró el evento con ID: ${eventId}`);
        }
        if(eventoTemporalEnviado === '.fc-event.temporal'){
            let eventoTemporal1 = document.querySelector('.fc-event.temporal');
            //console.log("es temporal");
            let hayServicio='';
            if (eventoTemporal1) {
                //console.log("hay temporal");
                if(document.querySelector('.services_serviceInfo_iDMQwAddCalendar')){
                    hayServicio = document.querySelector('.services_serviceInfo_iDMQwAddCalendar').getAttribute('data-indexactual');
                    if(hayServicio){
                        eventoTemporal1.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                        eventoTemporal1.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                    }
                }else if(document.querySelector('.services_serviceInfo_iDMQw')){
                    eventoTemporal1.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                    eventoTemporal1.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                }
            }
        }else if(eventoTemporalEnviado === '.fc-event.temporal2'){
            let eventoTemporal2 = document.querySelector('.fc-event.temporal2');
            //console.log("es temporal2");
            if (eventoTemporal2) {
                //para cambiar borde si hay servicio
                //console.log("hay temporal2 change empleado");

                if(document.querySelector('.selectServiceAddCalendar')){
                    //console.log("estamos en selecterviceaddCalendar");
                    let hayServicio2 = document.querySelector('.selectServiceAddCalendar').getAttribute('data-service');
                    let hayServicio2ChangeInfo = document.querySelector('.selectServiceAdd').getAttribute('data-service');
                    if(hayServicio2){
                        //console.log("hay servicio en change empleado");

                        eventoTemporal2.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                        eventoTemporal2.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                    }else if(hayServicio2ChangeInfo){
                        //console.log("hay con la clase cambiada servicio en change empleado");
                        eventoTemporal2.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                        eventoTemporal2.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                    }
                }
            }else{
                let eventoTemporal1 = document.querySelector('.fc-event.temporal');
                //console.log("es temporal");
                let hayServicio='';
                if (eventoTemporal1) {
                    //console.log(eventIdChangeCalendar, "eventIdChangeCalendar");
                    if(calendar.getEventById(eventIdChangeCalendar)){
                        //console.log(calendar.getEventById(eventIdChangeCalendar));
                        let id_eventoEditar2 = eventIdChangeCalendar;
                        let eventoElement1 = id_eventoEditar2.replace(/^eventoTemporal_/, 'eventoTemporalAsignado_');
                        let eventoElement = document.querySelector(`.${eventoElement1}`);
                        //console.log(eventoElement, "eventoelement1", eventoElement1);
                        if (eventoElement) {
                            // Asignar el estilo con 'important'
                            eventoElement.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                            eventoElement.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                        }
                    }

                    else{
                        //console.log("hay temporal", eventoTemporal1);
                        if(document.querySelector('.services_serviceInfo_iDMQwAddCalendar')){
                            //console.log(colorBordeNewReservCalendar, "color");
                            hayServicio = document.querySelector('.services_serviceInfo_iDMQwAddCalendar').getAttribute('data-indexactual');
                            if(hayServicio){
                                //console.log(colorBordeNewReservCalendar, "color");
                                eventoTemporal1.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                                eventoTemporal1.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
                            }
                        }else if(document.querySelector('.services_serviceInfo_iDMQw')){

                            //console.log(colorBordeNewReservCalendar, "color", eventoTemporal1);
                            eventoTemporal1.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
                            eventoTemporal1.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');

                        }
                    }

                }
            }
        }
    }


    //función para cambiar hora inicio y posición evento añadir evento desde calendar
    function cambiarHoraInicioEvento(eventId, newStart) {
        //console.log(eventId, newStart, "cambiarHOraINicio--eventid,");

        // Obtener el evento por su ID
        let events = calendar.getEvents();
        //console.log(events, "CAMBIARhORAINCIOEVENTO--events");

        let event = calendar.getEventById(eventId);

        if(!event){
            if(eventId){
                event = document.querySelector(`.${eventId}`);
            }
        }
        //console.log(event, "CAMBIARhORAiNICIOEVENTO--event");
        // Verificar si el evento existe
        if (event) {
            //console.log('%c'+event, 'color: yellow');
            // //console.log(event, "cambiarHoraInicioEvento--event");

            // Cambiar la hora de inicio
            event.setStart(newStart);

            // No es necesario renderizar, FullCalendar lo hace automáticamente
            //console.log(`La hora de inicio del evento ${eventId} ha sido actualizada a ${newStart}.`);
        } else {
            //console.log(`No se encontró el evento con ID: ${eventId}`);
        }
        ponerBotonesGuardarCambios();
    }

    //cambia la hora fin del evento añadir desde calendario y por ende su ubicación
    function cambiarHoraFinEvento(eventId, newEnd) {
        // Obtener el evento por su ID
        let event = calendar.getEventById(eventId);

        // Verificar si el evento existe
        if (event) {
            // Cambiar la hora de fin
            event.setEnd(newEnd);

            // No es necesario renderizar, FullCalendar lo hace automáticamente
            // //console.log(`La hora de fin del evento ${eventId} ha sido actualizada a ${newEnd}.`);
        } else {
            //console.log(`No se encontró el evento con ID: ${eventId}`);
        }
        ponerBotonesGuardarCambios();
    }




function eliminarEventoCalendario(id_evento){
    // initializeCalendar();
    var eventDiv = calendar.getEventById(id_evento);
    if(eventDiv){
        eventDiv.remove();
        // console.log("%cevento eliminado: " + id_evento, "color: green;");
    }else{
        // console.log("%cno existe el evento id: " + id_evento, "color: red;");

    }
}

//recibe formato:Wed Mar 05 2025 00:00:00 GMT+0100 (hora estándar de Europa central)
//devuleve foramto: 00:00
function obtenerHoraEuropaCentral(fechaString) {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaString);

    // Extraer la hora y los minutos en formato HH:mm
    const horas = String(fecha.getHours()).padStart(2, '0'); // Asegura que tenga dos dígitos
    const minutos = String(fecha.getMinutes()).padStart(2, '0'); // Asegura que tenga dos dígitos

    return `${horas}:${minutos}`;
  }

//recibe formato: 2025-03-21T12:15:00
//devuleve foramto: Wed Mar 05 2025 00:00:00 GMT+0100 (hora estándar de Europa central)
function convertirFechaEuropaCentral(fechaString) {
    // Crear un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaString);

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
      return 'Fecha inválida';
    }

    // Devolver la fecha en el formato deseado
    return fecha.toString();
  }


// Función para convertir fecha y hora necesaria para evento calendar
function formatFechaConHora(fecha, hora) {
    // Asegurarse de que 'fecha' sea un objeto Date
    let fechaObj = new Date(fecha);  // Convertir a un objeto Date si no lo es

    // Comprobar si la conversión a Date fue exitosa
    if (isNaN(fechaObj)) {
        console.error('Fecha no válida:', fecha);
        return;  // Si la fecha no es válida, no continuar con la función
    }
    let anio = fechaObj.getFullYear();
    let mes = String(fechaObj.getMonth() + 1).padStart(2, '0');  // Los meses van de 0-11
    let dia = String(fechaObj.getDate()).padStart(2, '0');

    let fechaStr = `${anio}-${mes}-${dia}`;
    return `${fechaStr}T${hora}:00`;
}

// funcion formateo a fecha
function formatearFecha02(fecha) {
    // Creamos un objeto Date a partir de la fecha recibida
    const fechaObj = new Date(fecha);
    // Extraemos el año, mes y día
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // El mes comienza en 0, por eso sumamos 1
    const day = String(fechaObj.getDate()).padStart(2, '0'); // Aseguramos que el día tenga dos dígitos

    // Devolvemos la fecha en formato YYYY-MM-DD
    return `${year}-${month}-${day}`;
}
// Ejemplo de uso
// const fecha = "Wed Mar 05 2025 00:00:00 GMT+0100 (hora estándar de Europa central)";


// Función para redondear los minutos a la fracción de 5 minutos más cercana
function redondearMinutos(minutos) {
    return Math.round(minutos / 5) * 5;
}

// Función para redondear los minutos a la fracción de 5 minutos más cercana y sumar 10 minutos
function redondearMinutosMasDiez(minutos) {
    return Math.round(minutos / 5) * 5 + 10;
}

function ponerHoraInicioActual() {
    const input = document.getElementById('horaNewServiceInputInicioCalendar');
    let divVisualizador = document.querySelector('.slotHorasCobrarServicioCalendar');
    // Obtener la hora actual
    const ahora = new Date();
    let hora = ahora.getHours();
    let minutos = ahora.getMinutes();

    // Si son más de las 19:50, establecer la hora como 9:00 del día siguiente
    if (hora > 19 || (hora === 19 && minutos > 50)) {
        ahora.setDate(ahora.getDate() + 1); // Aumenta un día
        ahora.setHours(9, 0, 0, 0); // Establece las 9:00 del día siguiente
    } else {
        // Si es antes de las 19:50, redondear los minutos a la fracción de 5 más cercana
        minutos = redondearMinutosMasDiez(minutos);
        ahora.setMinutes(minutos);
        ahora.setSeconds(0); // Eliminar los segundos
    }

    // Verificar si es el día siguiente y son las 8:50 o después, poner las 9:00
    if (ahora.getHours() === 8 && ahora.getMinutes() >= 50) {
        ahora.setHours(9, 0, 0, 0); // Establecer las 9:00 del mismo día
    }

    // Obtener la hora en formato local "HH:mm"
    let horaFormateada = ahora.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    input.value = horaFormateada;
    divVisualizador.textContent = horaFormateada;
    document.querySelector('.slotHorasCobrarServicioCalendar').setAttribute('data-hourreserv', horaFormateada);
    marcarHoraSeleccionada('.contenedorHorasInicioCalendar', horaFormateada);

    // Hacer scroll a la hora activa en ambos contenedores
    const contenedor2 = document.querySelector('.contenedorHorasInicioCalendar .scrollable');

    //función para hacer scroll hora inicio y fin activas
    function intentarScroll(contenedor) {
        if (!contenedor) return;

        const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
        if (!liActivo) return;

        const rect = contenedor.getBoundingClientRect();

        // Esperar a que sea visible (offcanvas / modal)
        if (rect.height === 0) {
            requestAnimationFrame(() => intentarScroll(contenedor));
            return;
        }

        const offset =
            liActivo.offsetTop -
            contenedor.offsetTop -
            contenedor.clientHeight / 2 +
            liActivo.clientHeight / 2;

        contenedor.scrollTop = offset;
    }

    // 🔥 Ejecutar para ambos
    intentarScroll(contenedor2);
}

function redondearMinutos(minutos) {
    return Math.round(minutos / 5) * 5; // Redondea los minutos al múltiplo de 5 más cercano
}


function ponerHoraActualMasTreinta(){
    const inputDesde = document.getElementById('horaNewServiceInputInicioCalendar');
    const inputHasta = document.getElementById('horaNewServiceInputFinCalendar');
    let divVisualizador = document.querySelector('.slotHoraFinCorbrarServicioCalendar');
    // Obtener la hora y minutos del primer input (inputDesde)
    let horaDesde = inputDesde.value.split(":");
    let hora = parseInt(horaDesde[0]);
    let minutos = parseInt(horaDesde[1]);

    // Crear un nuevo objeto Date con la hora obtenida del primer input
    let ahora = new Date();
    ahora.setHours(hora);
    ahora.setMinutes(minutos);
    ahora.setSeconds(0);
    ahora.setMinutes(ahora.getMinutes() + 30);

    // Redondear los minutos del resultado a la fracción de 5 más cercana
    let minutosRedondeados = redondearMinutos(ahora.getMinutes());
    ahora.setMinutes(minutosRedondeados);

    // Obtener el nuevo valor en formato "HH:mm" en la zona horaria local
    let horaFormateada = ahora.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    inputHasta.value = horaFormateada;
    marcarHoraSeleccionada('.contenedorHorasFinCalendar', horaFormateada);

    // Hacer scroll a la hora activa en ambos contenedores
    const contenedor = document.querySelector('.contenedorHorasFinCalendar .scrollable');

    //función para hacer scroll hora inicio y fin activas
    function intentarScroll(contenedor) {
        if (!contenedor) return;

        const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
        if (!liActivo) return;

        const rect = contenedor.getBoundingClientRect();

        // Esperar a que sea visible (offcanvas / modal)
        if (rect.height === 0) {
            requestAnimationFrame(() => intentarScroll(contenedor));
            return;
        }

        const offset =
            liActivo.offsetTop -
            contenedor.offsetTop -
            contenedor.clientHeight / 2 +
            liActivo.clientHeight / 2;

        contenedor.scrollTop = offset;
    }

    // 🔥 Ejecutar para ambos
    intentarScroll(contenedor);
    divVisualizador.textContent = horaFormateada;
}



//FUNCION INICIALIZAR DATEPIKER NUEVA RESERVA CALENDARIO
function initDatePikerNewReservCalendar() {
    const fechaCitaInfo2 = document.getElementById('datePikerfechaCitaInfo22');
    let fechaFlatpickrDiv2 = document.querySelector('.fechaCitaInfoNewReservCalendar');
    // Obtenemos la fecha y la hora actuales
    let fechaActual = new Date();
    let horaActual = fechaActual.getHours();
    let minutosActual = fechaActual.getMinutes();
   // Verificamos si la hora es mayor a las 19:50
    if (horaActual > 19 || (horaActual === 19 && minutosActual > 50)) {
        // Si es más tarde de las 19:50, configuramos la fecha para el día siguiente
        fechaActual.setDate(fechaActual.getDate() + 1);
        fechaActual.setHours(0, 0, 0, 0); // Establecer a medianoche para el día siguiente
    }
    // Asignar el atributo data-piker con el formato deseado al inicio
    document.querySelector('.fechaCitaInfo22').setAttribute('data-datepiker', fechaActual.toString());
    // Si deseas formatear la fecha a un formato específico, puedes usar esta función (ejemplo 'D, d M.')
    let fechaFormateada2 = formatDateForFlatpickr(fechaActual); // Si la función formatDateForFlatpickr está definida
    document.querySelector('.fechaCitaInfo22').setAttribute('data-date', fechaFormateada2);

    fechaFlatpickrDiv2.textContent = fechaFormateada2;
    flatpickr(fechaCitaInfo2, {
        inline: false, // Muestra el calendario como popup
        allowInput: true, // Permite escribir en el input
        clickOpens: true,
        enableTime: false, // Solo seleccionar fecha
        dateFormat: "D, d M.", // Formato: "lun, 2 dic"
        defaultDate: fechaActual, // Fecha actual como predeterminada
        disableMobile: true,
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
                longhand: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
            },
            months: {
                shorthand: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                longhand: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            },
        }, // Cambiar a español
        onChange: function (selectedDates, dateStr, instance) {
            // Asignar el atributo data-datePiker con el formato deseado
            document.querySelector('.fechaCitaInfo22').setAttribute('data-datepiker', selectedDates);
            // //console.log(selectedDates, dateStr, "selected y dateStr");
            let fechaGotodate = formatearFecha02(selectedDates);
            if(calendar){
                calendar.gotoDate(fechaGotodate);
            }

            if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAddInicioCalendar')){
                let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
                let horaInicio = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
                let horaFin = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
                let start = formatFechaConHora(fecha, horaInicio);  // Fecha y hora de inicio
                let end = formatFechaConHora(fecha, horaFin);
                cambiarFechaEvento(eventIdChangeCalendar, start, end);
            }
            //estamos en la pantalla donde hay tarjetas drag para cambio fecha new reserv Calendar
            let existenTarjetasDrag = document.querySelectorAll('.nuevasTarjetasMostrarOcultarCalendar .subboking-drag-el');
            if(existenTarjetasDrag.length>0){
                // mostrarEventosArrayNewReservCalendar('datePikerfechaCitaInfo22');
                mostrarEventosArrayMejorado('datePikerfechaCitaInfo22');
            }

            // Cambia el contenido del párrafo al seleccionar una fecha parseInt(id_empleado)
            document.querySelector('.fechaCitaInfo22').setAttribute('data-date', dateStr);
            fechaFlatpickrDiv2.textContent = dateStr;
        },
    });
}

//cambiar fecha evento new reserv calendar
function cambiarFechaEvento(eventId, nuevaFechaInicio, nuevaFechaFin) {
// console.log("cambiarFechaEvento, ", eventId, nuevaFechaInicio, nuevaFechaFin);

    // Obtener el evento por su ID
    let evento = calendar.getEventById(eventId);
    // console.log(evento, "evento a cambiar fecha");

    // Verificar si el evento existe
    if (evento) {
        evento.setProp('classNames', (evento.classNames || []).concat('temporal'));
        // Cambiar la fecha de inicio
        evento.setStart(nuevaFechaInicio);
        // Cambiar la fecha de fin
        evento.setEnd(nuevaFechaFin);
        // //console.log(`El evento con ID: ${eventId} ha sido actualizado con nuevas fechas.`);
    } else {
        //console.log(`No se encontró el evento con ID: ${eventId}`);
    }
    setTimeout(() => {
        let eventoTemporal = document.querySelector('.fc-event.temporal');
        if (eventoTemporal) {
            // //console.log("hay temporalFecha");

            eventoTemporal.style.setProperty('border-left', `4px solid ${colorBordeNewReservCalendar}`, 'important');
            eventoTemporal.style.setProperty('border-top', `1px solid ${colorBordeSuperior}`, 'important');
        }else{
            //console.log("no hay evento temporal");

        }
    }, 900);

}

function comprobarSiNuevaReservaOClicReservaExistente(){
    let offcanvasNuevaReserva = document.getElementById('newReservCalenda');
    if(offcanvasNuevaReserva){
        return true;
    }else{
        return false;
    }
}

function comprobarSiOffcanvasInfoResevIsOpen(){
   let offcanvasInfoReserv = document.getElementById('eventDetailsModal');
    if(offcanvasInfoReserv && offcanvasInfoReserv.classList.contains('show')){
      return true;
    }else{
       return false;
    }
}



function obtenerPrimerosEventosFullcalendar() {
    // Obtener el total de servicios
    let totalServices = servicesWithTimes.length;
    let events = calendar.getEvents();
    // Obtener los últimos 5 eventos de FullCalendar
    let lastEvents = events.slice(-totalServices);  // Esto obtiene los últimos 5 eventos del array
    // return firstEvents;
    return lastEvents;
}

function cambiarFechaEventosArray(fecha) {
    let events = calendar.getEvents();
    //eliminar eventos iniciales más añadidos
    let primerosEventos = obtenerPrimerosEventosFullcalendar();

    let eventosIds = [];
    // Itera sobre los eventos y obtiene sus IDs
    primerosEventos.forEach(function(event) {
        eventosIds.push(event.id);
    });
    // Itera sobre el array de IDs de eventos
    eventosIds.forEach(function(eventId, index) {
        // Busca el evento por su ID
        var event = calendar.getEventById(eventId);
        if (event) {
            let start = formatFechaConHora(fecha, servicesWithTimes[index].horaInicio);  // Fecha y hora de inicio
            let end = formatFechaConHora(fecha, servicesWithTimes[index].horaFin);      // Fecha y hora de finalización
            // Cambia la fecha de inicio y fin del evento
            event.setStart(start);
            event.setEnd(end);  // Si el evento tiene duración, puedes ajustarlo aquí
            event.setProp('classNames', ['temporal']);
        }
    });
    calendar.render();

}



function comprobarEmpleadoSelect(slotEmpleado, contenido){
    if(document.querySelector(slotEmpleado).textContent.trim() === contenido){

        return false;
    }else{
        return true;
    }
}

function comprobarServicioSeleccionado(slotServicio, contenido){
    if(document.querySelector(slotServicio).textContent.trim() === contenido){

        return false;
    }else{
        return true;
    }
}


//FUNCION CLIC EN TRAJETAS SERVICIOS CALENDAR
// Función auxiliar para mostrar el servicio
function mostrarServicio(data, horaFin, contenedor) {
    aniadirServicioHtml(data.servicio.borderColor, data.servicio.nombre, data.servicio.duration, data.servicio.precio, contenedor, 'services_serviceInfo_iDMQwAddCalendar');
    // document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent = horaFin;
    document.querySelector('.newReservCalendar00').style.display = 'none';
    document.querySelector('.allServicesAddCalendar00').style.display = 'block';
    document.querySelector('.allservicesVistaOtroServicioCalendar').style.display = 'none';
}

// Función auxiliar para mostrar mensaje de confirmación
function confirmarExcesoDeHora(horaFinDate) {
    const horaReferencia = new Date("1970-01-01T20:00:00"); // hora de referencia 20:00
    return horaFinDate > horaReferencia;
}

// Función principal que maneja el clic en las tarjetas de servicio CALENDAR
function clicTarjetasVerdesServiciosCalendar() {
    const targetServicesAddCalendar = document.querySelectorAll('.services-list_serviceVariant_i9qZrAdd_calendar');
    if (targetServicesAddCalendar.length) {
        targetServicesAddCalendar.forEach(targetAddCale => {
            targetAddCale.addEventListener('click', function (event) {
                event.preventDefault();

                //obtenemos el id del nuevo servicio
                const id_serviceChange = targetAddCale.getAttribute('data-serviciochange');
                id_servicioIdUnico = id_serviceChange;
                const csrfToken = $('meta[name="csrf-token"]').attr("content");
                const url = "get-serviceById";

                // Hacer una petición AJAX al servidor
                $.ajax({
                    url: url,
                    method: 'POST',
                    data: {
                        _token: csrfToken,
                        id_service: id_serviceChange,
                    },
                    success: function (data) {
                        if (data.encontrado) {
                            let contenedor = '';
                            let horaFin;

                            //SI ES PANTALLA #2 servicio CALENDAR, referencia a servicios tarjeta verde calendar
                            let offcanvasInfoNewReserv = document.getElementById('newReservCalendar');
                            let soloUnServicio = offcanvasInfoNewReserv.querySelector('.addServiceCalendar66');
                            let ningunServicio = offcanvasInfoNewReserv.querySelector('.addServiceCalendar');
                            let hayEmpleadoSeleccionado = comprobarEmpleadoSelect('.slotEmpleadoAddInicioCalendarAdd', 'Selecciona empleado');
                            // console.log(hayEmpleadoSeleccionado, "hay empleado seleccionado");

                            // if(soloUnServicio && servicesWithTimes.length === 1){
                            //     //pantalla #2
                            //     console.log("solo un servicio", creamosNuevaReserva);
                            //     console.log(servicesWithTimes);//.length = 1 Estamos añadiendo el segundo servicio
                            // }else if(ningunServicio && servicesWithTimes.length === 0){//inicialmente no hay ningún servicio
                            //     //pantalla inicial
                            //     console.log("ningún servicio", creamosNuevaReserva);
                            //     console.log(servicesWithTimes);//.length = 0
                            // }else if(soloUnServicio && servicesWithTimes.length >1){// hay multiples servicios + 2
                            //     //pantalla #2
                            //     console.log("multiples servicios", creamosNuevaReserva);
                            //     console.log(servicesWithTimes);

                            // }else if(soloUnServicio &&servicesWithTimes.length === 0){//estamos modificando el primer servicio
                            //     //pantalla inicial
                            //     console.log("modificando el inicial");
                            //     console.log(servicesWithTimes);//.length = 0
                            // }
                            // si hay multiples servicios o estamos añadiendo el segundo servicio pantalla #2
                            if(soloUnServicio && servicesWithTimes.length >1 || soloUnServicio && servicesWithTimes.length === 1){
                                 document.querySelector('.selectServiceAddCalendar').setAttribute('data-service', data.servicio.id);

                                const horaInicioAddCalendar = document.querySelector('.slotHorasCobrarServicioAddCalendar').textContent;
                                horaFin = calcularHoraFin(horaInicioAddCalendar, data.servicio.duration.toString());
                                const horaFinDate = new Date("1970-01-01T" + horaFin + ":00");

                                if (confirmarExcesoDeHora(horaFinDate)) {
                                    const confirmarHoraExcedeCierre = confirm('!!Atención el servicio excede la hora de cierre, ¿Deseas continuar?');
                                    if (confirmarHoraExcedeCierre) {
                                        contenedor = '.selectServiceAddCalendar';
                                        mostrarServicio(data, horaFin, contenedor);
                                    }
                                } else {
                                    contenedor = '.selectServiceAddCalendar';
                                    mostrarServicio(data, horaFin, contenedor);
                                }
                                document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent = horaFin;
                                document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent = horaFin;
                                marcarHoraSeleccionada('.contenedorHorasFinAddCalendar', horaFin);
                                if(hayEmpleadoSeleccionado){
                                    document.getElementById('uid-377-inputCalendar').classList.remove('index_is--disabled_w97Nq');
                                    document.getElementById('uid-377-inputCalendar').removeAttribute('disabled');
                                    if(botonEditarServicioReserva){
                                        // console.log(botonEditarServicioReserva);

                                        console.log("Editar reserva en nueva reserva");

                                    }else{
                                        console.log("no hay boton editar es añadir servicio en nueva reserva");

                                    }
                                    console.log("hay empleado actualizar evento idEvento:", eventIdChangeCalendar, data.servicio.borderColor);

                                    let eventoTemporalEnviado = `.fc-event.temporal2.${eventIdChangeCalendar}`;
                                   actualizarEvento(eventIdChangeCalendar, data.servicio.nombre, data.servicio.borderColor, eventoTemporalEnviado, horaFin);
                                }else{// me he quedado aquí por eso cambia el color del borde
                                    // console.log("no hay empleado seleccinado");
                                    document.getElementById('uid-377-inputCalendar').classList.add('index_is--disabled_w97Nq');
                                    document.getElementById('uid-377-inputCalendar').setAttribute('disabled', 'true');
                                    colorBordeNewReservCalendar = data.servicio.borderColor;
                                    colorBordeSuperior = data.servicio.borderColor;
                                    // console.log(document.getElementById('uid-377-inputCalendar'), "input empleado deshabilitado");

                                }
                            }
                            //estamos modificando el primer servicio Estamos añadiendo el segundo servicio
                            if(soloUnServicio &&servicesWithTimes.length === 0 || ningunServicio && servicesWithTimes.length === 0){
                                if (document.querySelector('.allServicesAddCalendar00').classList.contains('allservicesModificarInicialCalendar')) {
                                    contenedor = '.addServiceCalendar66';
                                    const id_serviceOld = document.querySelector('.services_serviceInfo_iDMQwAddCalendar').getAttribute('data-indexActual');
                                    removeServiceArray(id_serviceOld);
                                } else {
                                    contenedor = '.addServiceCalendar';
                                }

                                if (document.querySelector('.allServicesAddCalendar00')) {
                                    document.querySelector('.allServicesAddCalendar00').style.display = 'none';
                                }

                                document.querySelector('.newReservCalendar00').style.display = 'block';
                                aniadirServicioHtml(data.servicio.borderColor, data.servicio.nombre, data.servicio.duration, data.servicio.precio, contenedor, 'services_serviceInfo_iDMQwAddCalendar');
                                document.querySelector('.services_serviceInfo_iDMQwAddCalendar').setAttribute('data-indexActual', data.servicio.id);

                                addServiceArray(data.servicio.id);
                                cambiarTotales(data.servicio.precio);

                                const horaInicio00 = document.querySelector('.slotHorasCobrarServicioCalendar').getAttribute('data-hourreserv');
                                const horafin00 = calculateEndTime(horaInicio00, data.servicio.duration);
                                // console.log(horafin00, "HORA FIN"); //slotHoraFinCorbrarServicioCalendar

                                document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent = horafin00;
                                document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent = horafin00;

                                marcarHoraSeleccionada('.contenedorHorasFinCalendar', horafin00);
                                marcarHoraSeleccionada('.contenedorHorasInicioCalendar', horaInicio00);


                                // Hacer scroll a la hora activa en ambos contenedores
                                const contenedor33 = document.querySelector('.contenedorHorasFinCalendar .scrollable');
                                //función para hacer scroll hora inicio y fin activas
                                function intentarScroll(contenedor) {
                                    if (!contenedor) return;

                                    const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
                                    if (!liActivo) return;

                                    const rect = contenedor.getBoundingClientRect();

                                    // Esperar a que sea visible (offcanvas / modal)
                                    if (rect.height === 0) {
                                        requestAnimationFrame(() => intentarScroll(contenedor));
                                        return;
                                    }

                                    const offset =
                                        liActivo.offsetTop -
                                        contenedor.offsetTop -
                                        contenedor.clientHeight / 2 +
                                        liActivo.clientHeight / 2;

                                    contenedor.scrollTop = offset;
                                }

                                // 🔥 Ejecutar para ambos
                                intentarScroll(contenedor33);

                                //comprobar si hay evento para poner border y title
                                let eventoTemporalCalendario = document.querySelector('.fc-event.temporal');
                                if(eventoTemporalCalendario){
                                    // //console.log(eventoTemporalCalendario, "eventoTemporalCalendarioSeleccionaSErvicio");
                                    actualizarEvento(eventIdChangeCalendar, data.servicio.nombre, data.servicio.borderColor, '.fc-event.temporal', horafin00);
                                    //cambiar hora fin y hora inicio si hace falta
                                }else{
                                    colorBordeNewReservCalendar = data.servicio.borderColor;
                                    colorBordeSuperior = data.servicio.borderColor;
                                }
                            }

                            const empleadoSeleccionado = comprobarEmpleadoSelect('.slotEmpleadoAddInicioCalendar', 'Selecciona empleado');
                            const hayEmpleadoSeleccionado2 = comprobarEmpleadoSelect('.slotEmpleadoAddInicioCalendarAdd', 'Selecciona empleado');

                            if (empleadoSeleccionado) {
                                document.getElementById('uid-798-input').classList.remove('index_is--disabled_w97Nq');
                                document.getElementById('uid-3978-input').classList.remove('index_is--disabled_w97Nq');
                                document.getElementById('uid-3978-input').removeAttribute('disabled');
                            }
                        }
                    },
                    error: function (xhr) {
                        //console.log('Error al guardar el nombre de la categoria', xhr);
                    }
                });
            });
        });
    }
}

clicTarjetasVerdesServiciosCalendar();

//función cambiarPrimeraParte titulo evento new reserv calendar
function cambiarSegundaParteTitleEvent(id_evento, descripcion){
     let evento = calendar.getEventById(id_evento);
     let tituloActual = evento.title; // Obtener el título actual, si existe
     evento.setProp('title', tituloActual + ' • ' + descripcion);
     if (evento) {
     }
}


// Función para actualizar la descripción y el borde del evento en new reserv calendar
function actualizarEvento(eventId, nuevaDescripcion, colorBorde, eventoTemporalEnviado, horaFin = null) {

    // Cambiamos el borde sólo visualmente para inicio
    let eventoTemporal = document.querySelector(eventoTemporalEnviado);
    if (eventoTemporal) {
        eventoTemporal.style.setProperty('border-left', `4px solid ${colorBorde}`, 'important');
         eventoTemporal.style.setProperty('border-top', `1px solid ${colorBorde}`, 'important');
    }

    // Cambiamos la variable para otros métodos que la utilizan
    let evento = calendar.getEventById(eventId);  // Obtener el evento por ID
    colorBordeNewReservCalendar = colorBorde;
    colorBordeSuperior = colorBorde;

    // Verificar si el evento existe
    if (evento) {
        // console.log(evento, "evento actualizar");
        evento.setResources([evento.extendedProps.empleada.id]);
        let tituloActual = evento.title || ''; // Obtener el título actual, si existe

        // Verificar si el título contiene un punto gordo (•)
        if (tituloActual.includes('•')) {
            // Dividir el título en dos partes: antes y después del punto gordo
            let partes = tituloActual.split('•');
            // Cambiar todo lo que está después del punto por nuevaDescripcion
            evento.setProp('title', partes[0] + ' • ' + nuevaDescripcion);
        } else {
            // Si no hay punto gordo, agregar nuevaDescripcion al final del título
            evento.setProp('title', tituloActual + ' • ' + nuevaDescripcion);
        }

        // Cambiar el estilo 'border-left' del evento
        let eventEl='';
        let idEventoUtilizar='';
        if(botonEditarServicioReserva){
            idEventoUtilizar=botonEditarServicioReserva.getAttribute('data-id-unico');
            eventEl = document.querySelector(`a[data-idunicoevento="${idEventoUtilizar}"]`);
            // console.log(evento,"hay boton editar", idEventoUtilizar, eventEl, botonEditarServicioReserva);
        }else{
            idEventoUtilizar = evento.id;
            eventEl = document.querySelector(`#${idEventoUtilizar}`);  // Obtener el elemento del evento
        }
        if (eventEl) {
            eventEl.style.setProperty('border-left', `4px solid ${colorBorde}`, 'important');
            eventEl.style.setProperty('border-top', `1px solid ${colorBorde}`, 'important');

        }
        //cambiamos la hora fin si la envian
        if (horaFin) {
            // Obtener la fecha del evento (YYYY-MM-DD)
            const fecha = evento.start.toISOString().split('T')[0];

            // Crear la fecha completa
            const nuevaFechaFin = `${fecha}T${horaFin}:00`;

            // Cambiar hora de fin
            evento.setEnd(new Date(nuevaFechaFin));
        }
    } else {
        //console.log(`No se encontró el evento con ID: ${eventId}`);
    }
}


//función que cambia el title del evento si hay cliente
function actualizarEventoCliente(eventId, cliente) {
    //console.log("entro en actualizarEventoCliente");

    //console.log("eventoId: ", eventId, "cliente: ", cliente);

    // Obtener el evento utilizando el id del evento
    let evento = calendar.getEventById(eventId);  // Usando FullCalendar como ejemplo para obtener el evento por id

    if (evento) {
        // Obtener el título actual del evento
        let tituloActual = evento.title; // Si no tiene un título, se inicializa como cadena vacía

        // Comprobar si el título contiene el "punto gordo" (•)
        if (tituloActual.includes('•')) {
            // Dividir el título en dos partes: antes y después del punto gordo
            let partes = tituloActual.split('•');
            // Cambiar todo lo que está antes del punto por la variable 'cliente'
            evento.setProp('title', cliente + ' • ' + partes[1].trim());
        } else {
            // Si no hay punto gordo, simplemente poner el título como 'cliente'
            evento.setProp('title', cliente);
        }
    } else {
        //console.log(`No se encontró el evento con id ${eventId}`);
    }
}

function actualizarEventoClienteArray(cliente) {
    // Obtener todos los eventos del calendario
    let eventos = calendar.getEvents();  // FullCalendar: Obtiene todos los eventos
    // Inicializa un array vacío para almacenar los eventos filtrados
    let eventosFiltrados = [];

    // Filtra los eventos que tienen un id que empieza con 'temporalArray_'
    eventosFiltrados = eventos.filter(evento => evento.id.startsWith('temporalArray_'));
    // Si hay elementos en infoArrayEnvio, ejecutamos más filtros
    if (infoArrayEnvio.length) {
        // Filtra los eventos que tienen un id que empieza con 'eventoTemporal_'
        eventosFiltrados = eventos.filter(evento => evento.id.startsWith('eventoTemporal_'));

        // Si se encontraron eventos de tipo 'eventoTemporal_'
        if (eventosFiltrados.length > 0) {
            // Creamos un array para almacenar los eventos correspondientes a los ids de infoArrayEnvio
            let eventosFiltrados2 = [];

            // Para cada evento en infoArrayEnvio, obtenemos el evento correspondiente del calendario
            infoArrayEnvio.forEach(eventArray => {
                eventosFiltrados2.push(calendar.getEventById(eventArray.id));
            });

            // Si se encontraron eventos en eventosFiltrados2, los unimos a los eventosFiltrados
            if (eventosFiltrados2.length > 0) {
                eventosFiltrados = [...eventosFiltrados, ...eventosFiltrados2];
            }
        } else {
            // Si no se encontraron eventos tipo 'eventoTemporal_', filtramos nuevamente por 'temporalArray_'
            eventosFiltrados = eventos.filter(evento => evento.id.startsWith('temporalArray_'));
        }

        // Si no se encontraron eventos en eventosFiltrados
        if (eventosFiltrados.length === 0) {
            //console.log("eventosFiltrados.length === 0");

            // Filtra nuevamente los eventos por 'temporalArray_'
            eventosFiltrados = eventos.filter(evento => evento.id.startsWith('temporalArray_'));

            // Si aún no se encontraron eventos, se buscan los eventos iniciales desde infoArrayEnvio
            if (eventosFiltrados.length === 0) {
                infoArrayEnvio.forEach(eventArray => {
                    eventosFiltrados.push(calendar.getEventById(eventArray.id));
                });
            }
        }
    }

    // Recorrer cada evento filtrado y actualizar su título
    eventosFiltrados.forEach(evento => {
        let tituloActual = evento.title || '';  // Obtener el título actual del evento

        // Comprobar si el título contiene el "punto gordo" (•)
        if (tituloActual.includes('•')) {
            // Dividir el título en dos partes: antes y después del punto gordo
            let partes = tituloActual.split('•');
            // Cambiar todo lo que está antes del punto por la variable 'cliente'
            evento.setProp('title', cliente + ' • ' + partes[1].trim());
        } else {
            // Si no hay punto gordo, simplemente poner el título como 'cliente'
            evento.setProp('title', cliente);
        }
    });
}

//BOTON GUARDAR NEW RESERV
function botonGuardarCalendar(){
    const botonGuardarServicio = document.getElementById('uid-377-inputCalendar');
    if(botonGuardarServicio){
        botonGuardarServicio.addEventListener('click', function () {
            if(fechaEventoIdUnico){
                // console.log("hay fecha");
            }else{
                fechaEventoIdUnico = formatearFeAnio(document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker'));
            }
            // loaderWite();
            document.getElementById('uid-377-inputCalendar').classList.add('index_is--disabled_w97Nq');

            let id_servicio0120 = document.querySelector('.selectServiceAddCalendar').getAttribute('data-service');
            addServiceArray(parseInt(id_servicio0120, 10));


            let element33 = document.querySelector('.selectServiceAddCalendar .services_serviceDecorator_ldMxA');
            let style = window.getComputedStyle(element33);
            let colorborde = style.borderColor;
            // colorborde = colorborde.split(':')[1];
            colorBordeReservArray.push(colorborde);
            let horaIncioAddCalendar = document.querySelector('.slotHorasCobrarServicioAddCalendar').textContent;
            let horaFinAddCalendar = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent;
            let duracion = calcularDuracion(horaIncioAddCalendar, horaFinAddCalendar);

            meterHorasArraySecundaria('.slotHorasCobrarServicioAddCalendar', '.slotHoraFinCorbrarServicioAddCalendar', '.slotEmpleadoAddInicioCalendarAdd', duracion);

            resetAddServiceScreen('.selectServiceAddCalendar', '.slotEmpleadoAddInicioCalendarAdd');
            document.querySelector('.allServicesAddCalendar00Add').style.display = 'none';
            document.querySelector('.newReservCalendar00').style.display = 'block';
            let divTarjetasInicialesCalendar = document.querySelector('.tarjetasIncialesMostrarOcultarCalendar');
            divTarjetasInicialesCalendar.classList.add('d-none');

            let divNuevasTrajetasCalendar = document.querySelector('.nuevasTarjetasMostrarOcultarCalendar');
            getServicesById(selectedServiceIds2,function (servicios){
               let htmlContentCalendar = '';
               let totalPricePay=0;
                //obtenemos los empleados
                getAllEmpleados(function(empleadosReservas) {
                    let inicialesEmpleados = [];
                    nombreEmpleadosArray = [];
                    let apellidos = [];
                    let id_empleado = [];
                     // Recorremos el array servicesWithTimes
                     servicesWithTimes.forEach(service => {
                        // Buscamos el empleado correspondiente usando el id_empleado
                        let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.id_empleado));
                        if (empleado) {
                            // Obtenemos las primeras dos letras del nombre del empleado
                            let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                            let nombre = empleado.nombre;
                            let apellido = empleado.primerApellido;
                            inicialesEmpleados.push(iniciales);
                            nombreEmpleadosArray.push(nombre);
                            apellidos.push(apellido);
                            id_empleado.push(empleado.id);
                        }
                    });
                     //obtener ids de eventos para construir html
                    let idsReservasServices = servicesWithTimes.map(s => s.id_reserva);
                    let idsEventosParaHtml = infoArrayEnvio.map(e => e.id);
                    // console.log(idsEventosParaHtml, "IDS EVENTOS HTML 8702");
                    servicios.forEach((servicio, index) => {
                        let id_unico653 = servicesWithTimes[index].id_unico;
                        let precioNumerico = parseFloat(servicio.precio);
                        totalPricePay += precioNumerico;
                        let tiempoFormateada = comprobar603090(servicio.duration);
                        let apellido55 = apellidos[index];
                        let nombreEmpleado55 = nombreEmpleadosArray[index];
                        let inicialesEmpleado33 = inicialesEmpleados[index];
                        let servicioHorario = servicesWithTimes[index];
                        let id_evento55 = idsEventosParaHtml[index];
                        let id_empleado55 = id_empleado[index];
                        let id_reserva55 = servicesWithTimes[index].id_reserva;
                        let seleccionaCliente = servicesWithTimes[index].seleccionaCliente;
                        let duracionServicio = servicioHorario
                            ? `${servicioHorario.horaInicio} - ${servicioHorario.horaFin}`
                            : "Horario no disponible";
                         // Construir HTML
                        htmlContentCalendar += construirHtmlTarjetasFinales(
                            servicio.borderColor,
                            servicio.nombre,
                            servicio.precio,
                            duracionServicio,
                            tiempoFormateada,
                            nombreEmpleado55,
                            inicialesEmpleado33,
                            apellido55,
                            seleccionaCliente,
                            id_evento55,
                            servicio.id,
                            id_empleado55,
                            id_reserva55,
                            "8702",
                            id_unico653
                        );
                    });
                     // Agregar todo el contenido generado al contenedor nuevo newReservCalendar
                     $(divNuevasTrajetasCalendar).empty();
                     $(divNuevasTrajetasCalendar).append(htmlContentCalendar);
                     addHtmlDivPrecioFinal(totalPricePay, '#newReservCalendar p[data-testid="appointment-price2"]', '#newReservCalendar div[data-testid="appointment-to-be-paid2"]');
                     eventIdChangeCalendarArray = [];
                     infoArrayEnvio = [];

                     let eventos = calendar.getEvents();
                    // Filtrar los eventos cuyo id empiece con "eventoTemporal_"
                    let eventosTemporales = eventos.filter(event => event.id.startsWith('eventoTemporal_'));
                    eventosTemporales.forEach(evento => {
                        eventIdChangeCalendarArray.push(evento.id);
                        infoArrayEnvio.push(evento);
                    });


                     eliminarEventosTemporales('eventoTemporal_');
                     let tarjetasServiciosMultiples = document.querySelectorAll('.subbookings-list_card_j4UGY');
                     tarjetasServiciosMultiples.forEach((tarjeta, index) => {
                         boton = tarjeta.querySelector('.buttonEditEvent');
                         boton.setAttribute('data-index', eventIdChangeCalendarArray[index]);
                         boton.setAttribute('data-border', colorBordeReservArray[index]);
                         boton.setAttribute('data-new', true);
                     });
                    mostrarEventosArrayMejorado('datePikerfechaCitaInfo22');

                });
            });
        });
    }
}
botonGuardarCalendar();
// Llamar a la función para ambos botones

//METER HORAS ARRAY VISTA CALENDAR
function meterHorasArrayVistaCalendar(){
    let horaIncioScreenCalendar = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
    let horaFinScreenCalendar = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
    let idEmpleadaCalendar = document.querySelector('.slotEmpleadoAddInicioCalendar').getAttribute('data-empleid');
    selectedServiceIds.forEach(serviceId => {
            servicesWithTimes.push({
                id_unico: fechaEventoIdUnico + '_' + serviceId + '_' + horaIncioScreenCalendar.replace(':', '_') + '__' + horaFinScreenCalendar.replace(':', '_') + '_' + idEmpleadaCalendar,
                id: serviceId,
                horaInicio: horaIncioScreenCalendar,
                horaFin: horaFinScreenCalendar,
                id_empleado:idEmpleadaCalendar
            });
        });
        //console.log(servicesWithTimes, "servicios con tiempo calendar");
        selectedServiceIds = [];
}


//función que abre allServices en la vista calendario
function openAllservicesPlantillaCalendar(){
    document.querySelector('.newReservCalendar00').style.display='none';
    document.querySelector('.allServicesAddCalendar00').style.display='block';
}

//FUNCION CLIC EN TARJETA BLANCA AÑADIR SERVICIO DESDE CALENDAR addServiceCalendar
function clicWhiteTargeAddServiceCalendar(){
    const tarjetaAniadirServicio = document.querySelector('.addServiceCalendar');
    if (tarjetaAniadirServicio) {
        tarjetaAniadirServicio.addEventListener('click', function () {
            openAllservicesPlantillaCalendar();
        });
    }
}
clicWhiteTargeAddServiceCalendar();

//FUNCIÓN CLIC EN TARJETA SERVICIO PARA MODIFICAR CALENDAR
function clicTarjetaModificarServicioIncialCalendar(){
    const tarjetaSecundarioCalendar = document.querySelector('.addServiceCalendar66');
    if (tarjetaSecundarioCalendar) {
        tarjetaSecundarioCalendar.addEventListener('click', function (){
            //console.log("CLIC EN TARJETA ");
            document.querySelector('.allServicesAddCalendar00').classList.add('allservicesModificarInicialCalendar');
        });
    }
}

//CLICAR EN "SELECCIONAR OTRO SERVICIO vista servicio #2 calendar"
function clicTarjetaSeleccionarOtroServicioCalendar(){
    let botonAddServiceAddCalendar = document.querySelector('.selectServiceAddCalendar');
    if (botonAddServiceAddCalendar) {
        botonAddServiceAddCalendar.addEventListener('click', function () {
        document.querySelector('.allServicesAddCalendar00').classList.add('allservicesVistaOtroServicioCalendar');
        openAllservicesPlantillaCalendar();
    });
}
}
clicTarjetaSeleccionarOtroServicioCalendar();

//FUNCION CLIC BOTON AÑADIR SERVICIO VISTA CALENDARIO  buttonSavetrackModifyNewReserv buttonEditStrackModifyNewReserv
function clicBotonAniaridServicioCalendar(){
    // console.log("clic botón añadir nueva reserva");
    document.querySelector('.buttonEditStrackModifyNewReserv').style.display = 'none';
    document.querySelector('.buttonSavetrackModifyNewReserv').style.display = 'flex';


    if(document.querySelector('.allServicesAddCalendar00').classList.contains('allservicesModificarInicialCalendar')){
        // console.log("contiene: allservicesModificarInicialCalendar", servicesWithTimes, infoArrayEnvio);

        document.querySelector('.allServicesAddCalendar00').classList.remove('allservicesModificarInicialCalendar');
    }else if(document.querySelector('.allServicesAddCalendar00').classList.contains('allservicesVistaOtroServicioCalendar')){
        // console.log("contiene: allservicesVistaOtroServicioCalendar");

        document.querySelector('.allServicesAddCalendar00').classList.remove('allservicesVistaOtroServicioCalendar');
    }

    let seleccionaCliente_valor = document.getElementById('solicictaCliente').value;
    let horaInicioDuracion = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
    let horaFinDuracion = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
    let duracion = calcularDuracion(horaInicioDuracion, horaFinDuracion);
    // let tarjetaInicio = document.querySelector('.tarjetasIncialesMostrarOcultarCalendar');
    let tarjetasServiciosMultiples = document.querySelectorAll('.subbookings-list_card_j4UGY');
    // console.log(tarjetasServiciosMultiples.length, "tarjetasServiciosMultiples");

    //si solo hay un servicio añadido, meter horas array inicio
    if(tarjetasServiciosMultiples.length === 0){
        // console.log("metemos horas array inicio ");
        let fechaIdUnico = formatearFeAnio(document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker'));
        let idEmpleado = document.querySelector('.slotEmpleadoAddInicioCalendar').getAttribute('data-empleid');
        let idServicio = document.querySelector('.services_serviceInfo_iDMQwAddCalendar').getAttribute('data-indexActual');
        let horaInicio = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
        let horaFin = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
        let id_unico = fechaIdUnico + '_' + idServicio + '_' + horaInicio.replace(':', '_') + '__' + horaFin.replace(':', '_') + '_' + idEmpleado;
        meterHorasArrayInicio('.slotHorasCobrarServicioCalendar', '.slotHoraFinCorbrarServicioCalendar', '.slotEmpleadoAddInicioCalendar', seleccionaCliente_valor, duracion, id_unico);
        let element = document.querySelector('.addServiceCalendar66 .services_serviceDecorator_ldMxA');
        if(element){
            let style = window.getComputedStyle(element);
            let colorborde = style.borderColor;
            // colorborde = colorborde.split(':')[1];
            colorBordeReservArray.push(colorborde);
        }
    }


    document.querySelector('.newReservCalendar00').style.display='none';
    document.querySelector('.allServicesAddCalendar00').style.display='none';
    document.querySelector('.allServicesAddCalendar00Add').style.display='block';

    let totalServicios = selectedServiceIds2.length + 1;
    let divTotalServicios = document.querySelector('.totalServiciosAñadidosCalendar');
    if(!divTotalServicios){
        divTotalServicios = document.querySelector('.allServicesAddCalendar00Add .totalServiciosAñadidos');
    }
    divTotalServicios.textContent = `Servicio #${totalServicios}`;

    let horaInicioAddCalendar='';
    let divHoraInicioAddCalendar = document.querySelector('.slotHorasCobrarServicioAddCalendar');
    if(servicesWithTimes.length >= 2){
        //obtener última posicion array
        horaInicioAddCalendar = servicesWithTimes[servicesWithTimes.length - 1].horaFin;
    }else{
        //cojer hora fin pantalla anterior y ponerla de inicio allServicesAddCalendar00Add
        horaInicioAddCalendar = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
    }

    document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent = calcularHoraFin(horaInicioAddCalendar, '30min');
    divHoraInicioAddCalendar.textContent = horaInicioAddCalendar;
    //poner el valor al input hora inicio
    document.getElementById('horaNewServiceInputInicioAddCalendar').value = horaInicioAddCalendar;
    //poner el valor al input hora fin
    document.getElementById('horaNewServiceInputFinAddCalendar').value = calcularHoraFin(horaInicioAddCalendar, '30min');
    //marcar hora inicio
    marcarHoraSeleccionada('.contenedorHorasInicioAddCalendar', horaInicioAddCalendar);
    //marcar hora fin
    marcarHoraSeleccionada('.contenedorHorasFinAddCalendar', calcularHoraFin(horaInicioAddCalendar, '30min'));

    // Hacer scroll a la hora activa en ambos contenedores
    const contenedor444 = document.querySelector('.contenedorHorasInicioAddCalendar .scrollable');
    const contenedor222 = document.querySelector('.contenedorHorasFinAddCalendar .scrollable');

    //función para hacer scroll hora inicio y fin activas
    function intentarScroll(contenedor) {
        if (!contenedor) return;

        const liActivo = contenedor.querySelector('.index_--highlighted__3J43');
        if (!liActivo) return;

        const rect = contenedor.getBoundingClientRect();

        // Esperar a que sea visible (offcanvas / modal)
        if (rect.height === 0) {
            requestAnimationFrame(() => intentarScroll(contenedor));
            return;
        }

        const offset =
            liActivo.offsetTop -
            contenedor.offsetTop -
            contenedor.clientHeight / 2 +
            liActivo.clientHeight / 2;

        contenedor.scrollTop = offset;
    }
    // 🔥 Ejecutar para ambos
    intentarScroll(contenedor444);
    intentarScroll(contenedor222);

    //resetear corazon selecionaCliente de la vista ass new reserv
    let corazonCalendarPantalla2 = document.querySelector('.solicitadoClientePantalla2 ');
    corazonCalendarPantalla2.src = urlAplicacion + "/storage/calendar/heart-empty.svg";
    document.getElementById('solicictaCliente').value = 0;
    // console.log(colorBordeReservArray, "boton añadir ArrayBorde");
    botonEditarServicioReserva = '';
    oldEventIdChangeCalendar = '';
        // console.log(oldEventIdChangeCalendar, eventIdChangeCalendar, "hola-----------");

    oldEventIdChangeCalendar = eventIdChangeCalendar;
    eventIdChangeCalendar = '';
    // console.log("no contiene ninguno", servicesWithTimes, infoArrayEnvio, botonEditarServicioReserva, eventIdChangeCalendar);
    document.getElementById('uid-377-inputCalendar').classList.add('index_is--disabled_w97Nq');
    document.getElementById('uid-377-inputCalendar').setAttribute('disabled', 'true');
}

//FLECHA ATRAS NEW RESERV
function resetPantalla2NewReservCalendar(){
    let eventosConTemporalDos = document.querySelectorAll('.temporal2');
    //colorBordeReservArray
    if(botonEditarServicioReserva){
        // console.log("hay boton editar");
        //obtenemos el antiguo servicio
        let idEventoAntiguo = botonEditarServicioReserva.getAttribute('data-index');
        // console.log(idEventoAntiguo), "id antiguo";
        let eventoEncontrado = infoArrayEnvio.find(evento => evento.id === idEventoAntiguo);

        //volvemos a poner la apariencia visual del antiguo servicio
        let data = eventoEncontrado.extendedProps
        let eventoTemporalCalendario2 = document.querySelector('.fc-event.temporal2');
        let nombreServicio = botonEditarServicioReserva.getAttribute('data-name-service').trim();
        let borderColor = botonEditarServicioReserva.getAttribute('data-border').trim();
        borderColor = borderColor.trim();
        // console.log(nombreServicio,borderColor,  "nombre Servicio");

        if(eventoTemporalCalendario2){
            actualizarEvento(idEventoAntiguo, nombreServicio, borderColor, '.fc-event.temporal2');
            //tengo que cambiar colorBorde tambien
            colorBordeNewReservCalendar = borderColor;
            colorBordeSuperior = borderColor;
            let eventObj = calendar.getEventById(idEventoAntiguo);
            eventObj.setStart(eventoEncontrado.start);
            eventObj.setEnd(eventoEncontrado.end);
            //cambiar hora visualmente del evento en el calendario

        }else{
            colorBordeNewReservCalendar = borderColor;
            colorBordeSuperior = borderColor;
            let eventObj = calendar.getEventById(idEventoAntiguo);
            eventObj.setStart(eventoEncontrado.start);
            eventObj.setEnd(eventoEncontrado.end);
        }
    }else{
        let noHayServicio = document.querySelector('.selectServiceAddCalendar .services-wrapper_serviceEmpty_pbusk');
        let contenidoSlotNombreEmpleado = document.querySelector('.slotEmpleadoAddInicioCalendarAdd').textContent.trim();
        let hayEmpleadoSeleccionado = contenidoSlotNombreEmpleado !== 'Selecciona empleado';

        if(noHayServicio ){
            console.log("no hay servicio", eventIdChangeCalendar, oldEventIdChangeCalendar);
            eventIdChangeCalendar = oldEventIdChangeCalendar;
            if(hayEmpleadoSeleccionado){
                //obtener temporal2 y eliminarlo
                // console.log("solo empleado");
                // console.log(servicesWithTimes, servicesWithTimes.length, botonEditarServicioReserva, infoArrayEnvio,"resetPantalla");
                // console.log("eliminando evento", eventIdChangeCalendar);
                // eliminarEventoCalendario(eventIdChangeCalendar);

            }else{
                //nada
            }

        }else{
            // console.log("si hay servicio");
            if(hayEmpleadoSeleccionado){
                // console.log("si empleado si servicio");
                eliminarEventoCalendario(eventIdChangeCalendar);
            }else{
                eventIdChangeCalendar = oldEventIdChangeCalendar;
                // console.log("solo servicio");
            }
        }
    }
    //general para todos
    document.getElementById('uid-377-inputCalendar').classList.add('index_is--disabled_w97Nq');
    let corazon = document.querySelector('.solicitadoClientePantalla2');
    corazon.srcc = urlAplicacion + "/storage/calendar/heart-empty.svg";

    document.querySelector('.contenedorHorasFinAddCalendarclass').classList.remove('border-warning2');
    let errorHoraFinMenorqueInicio = document.querySelector('.alert024');
    $(errorHoraFinMenorqueInicio).empty();
    resetAddServiceScreen('.selectServiceAddCalendar', '.slotEmpleadoAddInicioCalendarAdd');
    document.querySelector('.allServicesAddCalendar00Add').style.display='none';
    document.querySelector('.newReservCalendar00').style.display='block';

}
// resetPantalla2NewReservCalendar();

//flecha atras change service new reserv calendar
function backNewReservChangeInitial(){
    document.querySelector('.allServicesAddCalendar00').style.display='none';
    document.querySelector('.newReservCalendar00').style.display='block';
}

//clic en la cruz cerrar offcanvas-newReserv-calendar
function clicCruzNewReserCalendar(){
    // location.reload();
    showAllNewReservCalendarPlantilla();

    let vistaAddNewService = document.querySelector('.allServicesAddCalendar00Add');
    if(vistaAddNewService){
        vistaAddNewService.style.display='none';
    }
    let eventosConTemporalDos = document.querySelectorAll('.temporal2');
    let divErrorHoraFinMenorqueInicio= document.querySelector('.alert023');
    $(divErrorHoraFinMenorqueInicio).empty();
    document.querySelector('.contenedorHorasFinCalendarclass').classList.remove('border-warning2');


    $('#newReservCalendar').offcanvas('hide');
    resetArrays();
    colorBordeReservArray = [];

    scrollToHour('09:00:00');
    let calendar032 = document.getElementById('calendar');
    calendar032.classList.remove('calendarEstrecho');
    initializeCalendar();
    enablePointerEvents();
    // havilitar botones
    let miDiv = document.querySelector('.fc-header-toolbar');
    let botones = miDiv.getElementsByTagName('button');
    for (let boton of botones) {
        boton.disabled = false;
    }

}

//clic flecha atras vista añadir servico calendar
function clicFlechaAtrasVistaAniadirServicio(){
    const flecha = document.querySelector('.closedOffcanvasNewReservCalendar00Add');
    if (flecha) {
        flecha.addEventListener('click', function (){
            //console.log("CLIC EN flecha ");
            // showAllNewReservCalendarPlantilla();
        });
    }
}
// clicBotonAniaridServicioCalendar();

function resetArrays(){
    selectedServiceIds = [];
    selectedServiceIds2 = [];
    servicesWithTimes = [];

}
// obtener plantilla offcanvasNewReserv calendar
function showAllNewReservCalendarPlantilla(){
    fetch('show-newReservCalendar-plantilla')
    .then(response => response.text())
    .then(data => {
        $('.contenedorOfcanvasNewReservCalendar').empty();
        document.querySelector('.contenedorOfcanvasNewReservCalendar').innerHTML = data;
        clicWhiteTargeAddServiceCalendar();
        clicTarjetasVerdesServiciosCalendar();
        // clicCruzNewReserCalendar();
        seleccionarElemento('.contenedorHorasInicioAddCalendar', 'horaNewServiceInputInicioAddCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasInicioAddCalendar');
        seleccionarElemento('.contenedorHorasFinAddCalendar', 'horaNewServiceInputFinAddCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasFinAddCalendar');
        seleccionarElemento('.contenedorHorasInicioCalendar', 'horaNewServiceInputInicioCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasInicioCalendar');
        seleccionarElemento('.contenedorHorasFinCalendar', 'horaNewServiceInputFinCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasFinCalendar');
        // clicBotonAniaridServicioCalendar();
        clicTarjetasBlancasSelectCliente();
        seleccionarElemento('.contenedorEmpleadosInicioCalendar', 'uid-inicio-inputCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgEmpleadoAddInicioCalendar');
        seleccionarElemento('.contenedorEmpleadosInicioCalendarAdd', 'uid-inicio-inputCalendarAdd', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgEmpleadoAddInicioCalendarAdd');
        // Llamar a la función para ambos botones
        mostrarEmpleadoDisponible('.styles_outerWrapper_AddEmpleInicioCalendar', '.slotEmpleadoAddInicioCalendar', '.slotHorasCobrarServicioCalendar', '.slotHoraFinCorbrarServicioCalendar', '#selectEmpleModalAddInicioCalendar', '.fechaCitaInfo22');
        mostrarEmpleadoDisponible('.styles_outerWrapper_AddEmpleInicioCalendarAdd', '.slotEmpleadoAddInicioCalendarAdd', '.slotHorasCobrarServicioAddCalendar', '.slotHoraFinCorbrarServicioAddCalendar', '#selectEmpleModalAddInicioCalendarAdd', '.fechaCitaInfo22');
        clicTarjetaSeleccionarOtroServicioCalendar();
        botonGuardarCalendar();
        guardarEditNewReserv();
        gurardarReservaNewReservCalendar();
        manejarClicPestania('.cita_tabNewReserv', 'datos_reservaNewReserv0106');
        manejarClicPestania('.nota_tabNewReserv', 'notas_reservaNewReserv0106');
        // clicFlechaAtrasPantalla2NewReservCalendar();
        manejarEstilosTexareaLabel('.business_secret_noteNewReserv', 'business_secret_noteNewReserv');
        manejarEstilosTexareaLabel('.business_noteNewReservInfo', 'business_noteNewReservInfo');
        manejarEstilosTexareaLabel('.business_noteInfo', 'business_noteInfo');
        manejarEstilosTexareaLabel('.business_noteNewReserv', 'business_noteNewReserv');
        // configurarFiltroHoras('horaNewServiceInputFinCalendar', '.contenedorHorasFinCalendar');
        // configurarFiltroHoras('horaNewServiceInputInicioCalendar', '.contenedorHorasInicioCalendar');
        // configurarFiltroHoras('horaNewServiceInputFinAddCalendar', '.contenedorHorasFinAddCalendar');
        // configurarFiltroHoras('horaNewServiceInputInicioAddCalendar', '.contenedorHorasInicioAddCalendar');
        actualizarIndicadorNotaTodosInputs();
        resetArrays();
    })
    .catch(error => console.error('Error al cargar los servicios:', error));
}

//hace scroll hasta la hora recibida
function scrollToHour(targetHour) {
    // Asegúrate de que el calendario esté renderizado y disponible
    const scrollGridBody = document.querySelector('.fc-scrollgrid-section-body');  // El contenedor principal del calendario
    if (!scrollGridBody) {
        //console.log("No se pudo encontrar el contenedor del calendario.");
        return;
    }

    // Función para redondear la hora a la más cercana de 00, 15, 30, 45 minutos
    function roundToNearestQuarterHour(timeString) {
        const [hour, minute, second] = timeString.split(':').map(Number);  // Extraer hora, minuto y segundo

        // Redondear los minutos a la más cercana de 15, 30, 45 o 00 minutos
        const roundedMinute = Math.round(minute / 15) * 15;

        // Asegurarse de que si los minutos son 60, avanzamos la hora y volvemos a 00
        const finalHour = roundedMinute === 60 ? (hour + 1) % 24 : hour;
        const finalMinute = roundedMinute === 60 ? 0 : roundedMinute;

        // Reconstruir el tiempo redondeado
        return `${String(finalHour).padStart(2, '0')}:${String(finalMinute).padStart(2, '0')}:00`;
    }

    // Redondeamos la hora target al múltiplo más cercano de 15, 30, o en punto
    const roundedTime = roundToNearestQuarterHour(targetHour);

    // Buscar todos los tds dentro del tbody que contienen la hora
    const tds = scrollGridBody.querySelectorAll('table tbody tr td');

    // Buscar el td correspondiente a la hora redondeada
    for (let td of tds) {
        let dateTime = td.getAttribute('data-time'); // Asegúrate de que el atributo sea el correcto
        if (dateTime === roundedTime) {
            // Si encontramos el td que tiene el atributo con la hora correcta, hacemos scroll hacia él
            td.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }
}

//mostrar Eventos en array new reserv calendar existeNombreClienteComun
function mostrarEventosArrayNewReservCalendar(datepiker){
        let events = calendar.getEvents();
        //console.log(events, "MOSTRAREVENTOSARRAYNEWRESERVCALENDAR EVENTOS");
        eliminarEventosTemporales('temporalArray_');
        // eliminarEventosTemporales('eventoTemporalAsignado_')
        getServicesById(selectedServiceIds2,function (servicios){
            //console.log(infoArrayEnvio.length, "info-modificar");
            //console.log(infoArrayEnvio.length, "añadirCitaCalendar");


            let title = 'Cliente sin cita previa';
            if(infoArrayEnvio.length===0){
                if(existeNombreCliente() !== false){
                    title = existeNombreCliente();
                }
            }

            let fecha55 = '';
            if(document.getElementById(datepiker)){
                fecha55 = document.getElementById(datepiker).getAttribute('data-datepiker');
            }else{
                fecha55 =document.querySelector(datepiker).getAttribute('data-datepiker');
            }
            if(existeNombreClienteComun('.basket-customer-card0101Info') !== false){
                title = existeNombreClienteComun('.basket-customer-card0101Info');
            }
            servicios.forEach((servicio, index) => {
                //console.log(infoArrayEnvio[index]);

                let horaInicio55 = servicesWithTimes[index].horaInicio;
                let horaFin55 = servicesWithTimes[index].horaFin;

                let id_empleado55 = servicesWithTimes[index].id_empleado
                // //console.log(id_empleado55, "empleado 55");
                let id_unico = servicesWithTimes[index].id_unico;
                let extendedProps = {
                    id_unico: id_unico,
                };
                let start55 = formatFechaConHora(fecha55, horaInicio55);  // Fecha y hora de inicio
                let end55 = formatFechaConHora(fecha55, horaFin55);
                let fechaInicial55 = start55.split('T')[0];
                let eventData = {
                    classNames: ['temporal', `temporalArray_${index}`],
                    id: `temporalArray_${index}`,//esto es lo que sirve para eliminarlo
                    title:  title + ' • ' + servicio.nombre,
                    start: start55,  // Fecha y hora de inicio
                    end: end55,      // Fecha y hora de finalización
                    resourceId: id_empleado55,
                    extendedProps: extendedProps,
                };
                // //console.log(eventData);

                if (calendar) {
                    calendar.addEvent(eventData);
                }
            });
            setTimeout(() => {
                servicios.forEach((servicio, index) => {
                    let eventoTemporal = document.querySelector(`.fc-event.temporalArray_${index}`);
                    if (eventoTemporal) {
                        eventoTemporal.setAttribute('data-idunicoevento', servicesWithTimes[index].id_unico);
                        eventoTemporal.style.setProperty('border-left', `4px solid ${servicio.borderColor}`, 'important');
                        eventoTemporal.style.setProperty('border-top', `1px solid ${servicio.borderColor}`, 'important');
                    }
                });
            }, 2000);
        });
}


//ELIMINA LOS EVENTOS TEMPORALES NEW RESERV CALENDAR
function eliminarEventosTemporales(claseEventoTemporal) {
    //console.log("eliminarEventoTemporal", claseEventoTemporal);

    // Obtener todos los eventos del calendario
    const eventos = calendar.getEvents();
    // Filtrar los eventos cuyo id empiece con "eventoTemporal_"
    const eventosTemporales = eventos.filter(event => event.id.startsWith(claseEventoTemporal));
    eventosTemporales.forEach(evento => {
        evento.remove();
        //console.log(`Evento temporal eliminado: ${evento.id}`);
    });
}

// ELIMINA LOS EVENTOS TEMPORALES NEW RESERV CALENDAR segun clase
function eliminarEventosTemporalesByClass(claseEventoTemporal) {
    //console.log("eliminarEventoTemporal", claseEventoTemporal);

    // Obtener todos los eventos del calendario
    const eventos = calendar.getEvents();

    // Filtrar los eventos que tienen alguna clase que empieza con 'claseEventoTemporal'
    const eventosTemporales = eventos.filter(event => {
        // //console.log(event.classNames, "classnames");

        // Obtener todas las clases del evento
        const clasesEvento = event.el.classList;  // event.el es el elemento DOM asociado al evento
        // Comprobar si alguna clase empieza con 'claseEventoTemporal'
        return Array.from(clasesEvento).some(clase => clase.startsWith(claseEventoTemporal));
    });

    // Eliminar los eventos temporales encontrados
    eventosTemporales.forEach(evento => {
        evento.remove();
        // //console.log(`Evento temporal eliminado: ${evento.id}`);
    });
}

//genera los datos para usar en la función guardarReservaNewReservCalendar
function obtenerDatosGeneralesGuardarReserva(totalPagarClass, idDatePiker){
    // console.log(totalPagarClass, "clase pagar");

     // Obtener el ID del usuario
    let divuserId = document.querySelector('.customer-card_customer_PiI9d');
    let userIdCalendar = null;
    if(divuserId){
        userIdCalendar = divuserId.getAttribute('data-index');
    }

    // Obtener la fecha y hora de la cita
    let dateTime1 = document.getElementById(idDatePiker).getAttribute('data-datepiker');

    // Obtener las notas internas y el mensaje para el cliente
    let notaInternaCalendar = document.getElementById('business_secret_noteNewReserv').value.trim() || null;
    let mensaje_for_client = document.getElementById('business_noteNewReservInfo').value.trim() || null;

    // Obtener el total a pagar
    let total_pagarReservaNewCalendar = parseFloat(document.querySelector(totalPagarClass).textContent);

    // Obtener el token CSRF
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let seleccionaCliente_valor = document.getElementById('solicictaCliente').value;
     let stylos = 'position: fixed;right: 5rem;top: 76px;z-index: 9;';
    // Devolver los datos en un objeto
    return {
        userIdCalendar,
        dateTime1,
        notaInternaCalendar,
        mensaje_for_client,
        total_pagarReservaNewCalendar,
        csrfToken,
        seleccionaCliente_valor,
        stylos
    };
}

//genera los datos para usar en la función guardarReservaNewReservCalendar
function obtenerDatosGeneralesGuardarReserva2(confirmacionAutomaticaCalendar, datosReservaGeneral) {
    // console.log(servicesWithTimes, confirmacionAutomaticaCalendar, datosReservaGeneral, "datosguardar2");

    let durationCalendar = calcularDuracion(servicesWithTimes[0].horaInicio, servicesWithTimes[0].horaFin);
    let dateTimeCalendar = formatearFecha4(datosReservaGeneral, servicesWithTimes[0].horaInicio);//2024-12-13 09:00:00

    // let confirmacionAutomaticaCalendar = "Pendiente";
    let fechaActual = new Date();
    let fechaEvento = new Date(dateTimeCalendar.replace(' ', 'T'));
    let horaInicio = servicesWithTimes[0].horaInicio;
    if (fechaEvento < fechaActual) {
        confirmacionAutomaticaCalendar = "Finalizada";
    }

    return {
        durationCalendar,
        dateTimeCalendar,
        confirmacionAutomaticaCalendar,
        horaInicio
    };
}

function estrecharCalendario() {
    let calendar032 = document.getElementById('calendar');
    calendar032.classList.remove('calendarEstrecho');
}


//BOTON GUARDAR NUEVA RESERVA NEW RESERV CALENDAR
function gurardarReservaNewReservCalendar(){
    let botonGuardarNuevaReservaCalendar = document.getElementById('uid-798-input');
    if(botonGuardarNuevaReservaCalendar){
        botonGuardarNuevaReservaCalendar.addEventListener('click', function (event) {
            event.preventDefault();

            // general
            activarLoaderUniversal('loaderSperaAdministrator');
            let datosReservaGeneral = obtenerDatosGeneralesGuardarReserva('.totalPagarNewReservCalendar', 'datePikerfechaCitaInfo22');
            let crear_reserva='';

            getConfiguracionReservas(function(configuraciones){
                let confirmacionAutomaticaCalendar = configuraciones[0].confirmacion_automatica;
                confirmacionAutomaticaCalendar = confirmacionAutomaticaCalendar === 'si' ? 'confirmed' : 'pending';

                //sólo hay un servicio
                if(servicesWithTimes.length === 0){
                    servicesWithTimes = [];
                    // let horaIncio = document.getElementById('horaNewServiceInputInicioCalendar').value;
                    // let horaFin = document.getElementById('horaNewServiceInputFinCalendar').value;
                    // let idServicio878787 = selectedServiceIds[0];
                    let fecha = formatearFeAnio(datosReservaGeneral.dateTime1);

                    meterHorasArrayInicioNoTimeOut('.slotHorasCobrarServicioCalendar', '.slotHoraFinCorbrarServicioCalendar', '.slotEmpleadoAddInicioCalendar', datosReservaGeneral.seleccionaCliente_valor, fecha);
                    let datosReservaGeneral2 = obtenerDatosGeneralesGuardarReserva2(confirmacionAutomaticaCalendar, datosReservaGeneral.dateTime1);

                    let start = formatFechaConHora(datosReservaGeneral.dateTime1, datosReservaGeneral2.horaInicio);  // Fecha y hora de inicio
                    let fechaInicial = start.split('T')[0];

                    crear_reserva = "reservas-store";
                    $.ajax({
                        url: crear_reserva,
                        method: 'POST',
                        data: {
                            _token: datosReservaGeneral.csrfToken,
                            service_id: servicesWithTimes[0].id,
                            date_time: datosReservaGeneral2.dateTimeCalendar,
                            status: datosReservaGeneral2.confirmacionAutomaticaCalendar,
                            duration: datosReservaGeneral2.durationCalendar,
                            empleada_id: servicesWithTimes[0].id_empleado,
                            nota: null,
                            user_id: datosReservaGeneral.userIdCalendar,
                            total_payment: datosReservaGeneral.total_pagarReservaNewCalendar,
                            empleado_seleccionado:servicesWithTimes[0].seleccionaCliente,
                            nota_interna: datosReservaGeneral.notaInternaCalendar,
                            mensaje_cliente:datosReservaGeneral.mensaje_for_client,
                            reprogramarCita: reprogramarCita,
                            idCitaReprogramar: idCitaReprogramar,
                        },
                        success: function(response) {
                            const reserva_creada = response.reservaCreada;
                            if(reserva_creada === true){
                                showAllNewReservCalendarPlantilla();
                                $('#newReservCalendar').offcanvas('hide');
                                resetArrays();
                                estrecharCalendario();
                                initializeCalendar();
                                //para calendar gotodate
                                calendar.gotoDate(fechaInicial);
                                desactivarLoaderUniversal('loaderSperaAdministrator');
                                insertMessageResolAction('Reserva creada con éxito', '#Citas_administrator', datosReservaGeneral.stylos, "ok");
                            }else{
                                alert('Atención!! la hora seleccionada o el empleado no están disponibles, inténtelo de nuevo cambiando esos datos');
                                desactivarLoaderUniversal('loaderSperaAdministrator');
                            }
                        },
                        error: function(xhr) {
                            //console.log('Error al obtener las horas', xhr);
                        }
                    });
                }else{//muchos servicios
                    //para calendar gotodate
                    let horaInicio = servicesWithTimes[0].horaInicio;
                    let start = formatFechaConHora(datosReservaGeneral.dateTime1, horaInicio);  // Fecha y hora de inicio
                    let fechaInicial = start.split('T')[0];

                    servicesWithTimes.forEach(service => {
                        service.date_time = formatearFecha4(datosReservaGeneral.dateTime1, service.horaInicio);
                    });
                    crear_reserva = "reservas-store-multiple";
                    $.ajax({
                        url: crear_reserva,
                        method: 'POST',
                        data: {
                            _token: datosReservaGeneral.csrfToken,
                            arrayCompleto: JSON.stringify(servicesWithTimes),
                            date_time1: datosReservaGeneral.dateTime1,
                            status: confirmacionAutomaticaCalendar,
                            user_id: datosReservaGeneral.userIdCalendar,
                            total_payment: datosReservaGeneral.total_pagarReservaNewCalendar,
                            nota_interna: datosReservaGeneral.notaInternaCalendar,
                            mensaje_cliente: datosReservaGeneral.mensaje_for_client,
                            nota: null,
                            multiple: 0,
                            reprogramarCita: reprogramarCita,
                            idCitaReprogramar: idCitaReprogramar,
                        },
                        success: function(response) {
                            const reserva_creada = response.reservaCreada;
                            const motivo = response.motivo;
                            if (reserva_creada === true) {
                                showAllNewReservCalendarPlantilla();
                                $('#newReservCalendar').offcanvas('hide');
                                resetArrays();
                                estrecharCalendario();
                                initializeCalendar();
                                calendar.gotoDate(fechaInicial);
                                desactivarLoaderUniversal('loaderSperaAdministrator');
                                insertMessageResolAction('Reserva múltiple creada con éxito', '#Citas_administrator', datosReservaGeneral.stylos, "ok");
                            } else {
                                // console.log(reprogramarCita, "ANTES DEL MOTIVO");

                                alert(motivo);
                                 if(reprogramarCita === true){
                                     //ponemos la antigua
                                    history.pushState({}, "", oldUrlReprogramarCita);
                                    reprogramarCita=false;
                                    idCitaReprogramar='';
                                    oldUrlReprogramarCita='';
                                }
                                desactivarLoaderUniversal('loaderSperaAdministrator');
                            }
                        },
                        error: function(xhr) {
                            //console.log('Error al obtener las horas', xhr);
                        }
                    });
                }
                enablePointerEvents();
            });
        });
    }
}
gurardarReservaNewReservCalendar();

//devuelve la reserva del array que termina más tarde
function getReservaMasTarde(reservas) {
    let reservaMasTarde = null;
    let horaFinMasTarde = -1; // Inicializamos la hora más tardía en un valor muy bajo

    reservas.forEach(reserva => {
        // Convertimos la fecha y hora de inicio de la reserva (date_time)
        const fechaInicio = new Date(reserva.date_time); // 'date_time' está en formato 'YYYY-MM-DD HH:mm:ss'

        // Calculamos la hora de fin sumando la duración (en minutos)
        const horaFin = new Date(fechaInicio.getTime() + reserva.duration * 60000); // 60000 ms = 1 minuto

        // Comparamos si esta reserva termina más tarde que la anterior
        if (horaFin.getTime() > horaFinMasTarde) {
            horaFinMasTarde = horaFin.getTime();
            reservaMasTarde = reserva;
        }
    });

    return reservaMasTarde;
}

// cambia corazon de color y asigna al input seleccionado cliente
function changeheart(imagen) {
    ponerBotonesGuardarCambios();
    const imgElement = document.querySelector(imagen);
    if (imgElement.src.includes('heart-empty.svg')) {
        // Si es el corazón vacío, cambiar a corazón rojo
        imgElement.src = urlAplicacion + "/storage/calendar/corazonRojoEmpleCliente.svg";
        imgElement.alt = 'corazon rojo';
        document.getElementById('solicictaCliente').value = 1;
    } else {
        // Si no es el corazón vacío, cambiar a corazón vacío
        imgElement.src = urlAplicacion + "/storage/calendar/heart-empty.svg";
        imgElement.alt = 'corazon vacio';
        document.getElementById('solicictaCliente').value = 0;
    }
}

//poner y quitar estilos Función común para manejar los clics en las pestañas
function manejarClicPestania(tabSelector, divId) {
    let pestania = document.querySelector(tabSelector);
    if (pestania) {
        pestania.addEventListener('click', function () {
            // Eliminar la clase activa de todas las pestañas
            document.querySelectorAll('.b-tabs_tabDefaultActive_CYkQd').forEach(function(elemento) {
                elemento.classList.remove('b-tabs_tabDefaultActive_CYkQd');
            });
            // Añadir la clase activa a la pestaña clicada
            pestania.classList.add('b-tabs_tabDefaultActive_CYkQd');
            // Mostrar el div correspondiente
            showDivNotas(divId);
        });
    }
}
manejarClicPestania('.cita_tab', 'datos_reserva0106');
manejarClicPestania('.nota_tab', 'notas_info0106');
manejarClicPestania('.cita_tabNewReserv', 'datos_reservaNewReserv0106');
manejarClicPestania('.nota_tabNewReserv', 'notas_reservaNewReserv0106');

// Función para manejar los eventos y estilos en el textarea y su label
function manejarEstilosTexareaLabel(labelSelector, textAreaId) {
    const label = document.querySelector(labelSelector);
    const textArea = document.getElementById(textAreaId);
    if(textArea){
        // Añadimos un evento de clic para agregar la clase "labelUp"
    textArea.addEventListener('click', function() {
        // //console.log("clic textare ", textAreaId);

        label.classList.add('labelUp');
      });

      // Añadimos un evento de blur para quitar la clase "labelUp" cuando pierda el foco
      textArea.addEventListener('blur', function() {
        if (textArea.value.trim() === "") {
          label.classList.remove('labelUp');
        }
      });

      // Función para hacer crecer el textarea
      function adjustHeight() {
        textArea.style.height = 'auto';
        const newHeight = textArea.scrollHeight + 14;
        textArea.style.height = `${newHeight}px`;
      }

      // Añadimos un evento de input para ajustar la altura dinámicamente business_noteNewReservInfo, business_noteInfo, business_noteNewReserv
      textArea.addEventListener('input', adjustHeight);
    }else{
        //console.log("no existe el txtarea ", textAreaId);

    }

  }
  manejarEstilosTexareaLabel('.business_secret_noteNewReserv', 'business_secret_noteNewReserv');
  manejarEstilosTexareaLabel('.business_noteNewReservInfo', 'business_noteNewReservInfo');
  manejarEstilosTexareaLabel('.business_noteInfo', 'business_noteInfo');
  manejarEstilosTexareaLabel('.business_noteNewReserv', 'business_noteNewReserv');


  //pone y quita el punto naranja de nota o mensaje existente
  function actualizarIndicadorNota(textareaIds, spanClass) {
    // Obtener los elementos textarea
    const textareas = textareaIds.map(id => document.getElementById(id));
    const spanIndicador = document.querySelector(spanClass);
    // Comprobar si al menos uno de los textarea tiene texto
    const tieneTexto = textareas.some(textarea => textarea && textarea.value.trim());
    if (spanIndicador) {
      if (tieneTexto) {
        spanIndicador.classList.add('b-tabs_tabIndicator_vu4Y2');
      } else {
        spanIndicador.classList.remove('b-tabs_tabIndicator_vu4Y2');
      }
    }
  }

  function actualizarIndicadorNotaTodosInputs(){
    // Añadir los eventos de input para los textareas
    if(document.getElementById('business_secret_noteNewReserv')){
        document.getElementById('business_secret_noteNewReserv').addEventListener('input', () => {
            actualizarIndicadorNota(['business_secret_noteNewReserv', 'business_noteNewReservInfo'], '.indicatorNotasNewReserv');
          });
    }
    if(document.getElementById('business_noteNewReservInfo')){
        document.getElementById('business_noteNewReservInfo').addEventListener('input', () => {
            actualizarIndicadorNota(['business_secret_noteNewReserv', 'business_noteNewReservInfo'], '.indicatorNotasNewReserv');
        });
    }
    if(document.getElementById('business_noteNewReserv')){
        document.getElementById('business_noteNewReserv').addEventListener('input', () => {
            actualizarIndicadorNota(['business_noteNewReserv', 'business_noteInfo'], '.indicatorNotasNewReservInfo');
        });
    }
    if(document.getElementById('business_noteInfo')){
        document.getElementById('business_noteInfo').addEventListener('input', () => {
            actualizarIndicadorNota(['business_noteNewReserv', 'business_noteInfo'], '.indicatorNotasNewReservInfo');
          });
    }


  }
actualizarIndicadorNotaTodosInputs();

const miOffcanvas = document.getElementById('eventDetailsModal');
if(miOffcanvas){
    miOffcanvas.addEventListener('shown.bs.offcanvas', () => {
        document.getElementById('contentTabs').style.overflow = 'auto';// Habilita el scroll
    });

    miOffcanvas.addEventListener('hidden.bs.offcanvas', () => {
        document.getElementById('contentTabs').style.overflow = ''; // Vuelve a la normalidad
    });
}
//funcion que habilita botones dia, mes, flechas mover dias ...
function habilitarBotonesCabeceraCalendar(){
     let miDiv = document.querySelector('.fc-header-toolbar');
    let botones = miDiv.getElementsByTagName('button');
    for (let boton of botones) {
    boton.disabled = false;
    }
}

//funcion que deshabilitars botones dia, mes, flechas mover dias ...
function deshabilitarBotoensCabeceraCalendar(){
    let miDiv = document.querySelector('.fc-header-toolbar');
    let botones = miDiv.getElementsByTagName('button');
    for (let boton of botones) {
    boton.disabled = true;
    }
}

//metodo para bloquear los clics de los eventos cuando offcanvas abierto
function blockPointerEvents(){
    let cabecera = document.querySelector('.navbarAdminPanel');
    let pestaniasLaterales = document.querySelector('.tabsAdministrator');
    let calendarioABloquear = document.querySelector('.fc-resourceTimeGridDay-view tbody');
    let botonToday = document.querySelector('.fc-today-button');
    // Desactivar interacción
    botonToday.style.pointerEvents = 'none';
    cabecera.style.pointerEvents = 'none';
    pestaniasLaterales.style.pointerEvents = 'none';
    calendarioABloquear.style.pointerEvents = 'none';
}
function enablePointerEvents(){
    let cabecera = document.querySelector('.navbarAdminPanel');
    let pestaniasLaterales = document.querySelector('.tabsAdministrator');
    let calendarioABloquear = document.querySelector('.fc-resourceTimeGridDay-view tbody');

    cabecera.style.pointerEvents = 'auto';
    pestaniasLaterales.style.pointerEvents = 'auto';
    calendarioABloquear.style.pointerEvents = 'auto';
    //botonDeshabilitado
    habilitarBotonesCabeceraCalendar();
}

//CLICK EN BOTÓN COBRAR SERVICIO DESDE CALENDARIO MUESTRA VISTA VENTA RÁPIDA CON LOS SERVICIOS DE LA RESERVA
function showViewCobrarServicioCalendar(){

    //contenedor
    let id_reserva = document.getElementById('eventDetailsModal').getAttribute('data-idreserv');
    let divContenedorContenedores = document.querySelector('.wrapper_tabcontent');
    let contenedoresActivos = divContenedorContenedores.querySelectorAll('.active');
    contenedoresActivos.forEach(function(contenedor) {
        contenedor.classList.remove('active');
    });
    let vistaVentaRapida = document.getElementById('Ventas_administrator');
    vistaVentaRapida.classList.add('active');

    //pestanias general barra negra
    let divContenedorPestanias = document.querySelector('.tabsAdministrator');
    let pestaniasActivas = divContenedorPestanias.querySelectorAll('.active');
    pestaniasActivas.forEach(function(pestania) {
        pestania.classList.remove('active');
    });
    let pestaniaVentas = document.getElementById('tab_administrator_ventas');
    pestaniaVentas.classList.add('active');

    enablePointerEvents();
    let eventosConTemporalDos = document.querySelectorAll('.temporal2');
    // console.log(infoArrayEnvio.length, infoArrayEnvio);

    serviciosVentaRapida_ids = [];
    serviciosVentaRapida_ids = [];

    if(infoArrayEnvio.length){
        // console.log("multiple", infoArrayEnvio, "INFOaRRAYENVIO");
        insertServiciosDesdeArray(infoArrayEnvio);
        if(infoArrayEnvio[0].extendedProps.usuario.id){
            insertarTarjetaClienteSelecionadoCobrarCalendar(infoArrayEnvio[0].extendedProps.usuario, '.basket-customer-card0101', 'card_empty_ventas');
            // insertarTarjetaClienteSelecionado(cliente, '.basket-customer-card0101', 'card_empty_ventas');
        }else{
            // console.log("no tiene usuario");
        }
    }else{
        // console.log("solo unoa");
        let nombreEmpleado = `${infoArrayEnvio.event.extendedProps.empleada.nombre} ${infoArrayEnvio.event.extendedProps.empleada.apellido}`;
        let id_servicio = infoArrayEnvio.event.extendedProps.servicio.id;
        let usuario = infoArrayEnvio.event.extendedProps.usuario;
        insertDateServiceByCobrarCalendar(id_servicio, nombreEmpleado, infoArrayEnvio.event.extendedProps.empleada.id, infoArrayEnvio.event.extendedProps.servicio.precio, usuario);
        if(usuario.id){
            insertarTarjetaClienteSelecionadoCobrarCalendar(usuario, '.basket-customer-card0101', 'card_empty_ventas');
            // insertarTarjetaClienteSelecionado(cliente, '.basket-customer-card0101', 'card_empty_ventas');
        }else{
            // console.log("no tiene usuario");
        }
         document.querySelector('.basket-layout_sidebar_X6qEm').setAttribute("data-idReserv", id_reserva);
    }
    insertTarjetaServiciosCobrarCalendar();
    closedOffcanvasInfoReserv();
    cambiarURL('admin/dashboard/Ventas_administrator');
    //navegación horizontal  blanca de venta rapida (Nueva venta,Transacciones,Facturas)
    quitarActiveListaNavegacionPrincipalVentaRapida();
    activarPestaniaNuevaVenta();
    showDivPestaniasLateralesVentaRapida('divContenedorVentaRapidaBasket-menu-quick-sale');
    reiniciarPestaniaVentaRapida();
    showDivVentaRapida('index_sales_X5DVI');
}

//Navegación horizontal blanca de venta rapida (Nueva venta,Transacciones,Facturas) quitar active
function quitarActiveListaNavegacionPrincipalVentaRapida(){
    const listItems = document.querySelectorAll('ul.lista_transacciones li');
    // Recorrer cada <li> y quitar la clase si la tiene
    listItems.forEach(li => {
    li.classList.remove('b-tabs_tabDefaultActive_CYkQd');
    });
}
//activar la pestaña nueva venta Navegación horizontal blanca de venta rapida (Nueva venta,Transacciones,Facturas)
function activarPestaniaNuevaVenta(){
    quitarActiveListaNavegacionPrincipalVentaRapida();
    let pestañaNuevaVenta = document.querySelector('li[data-testid="checkout"]');
    pestañaNuevaVenta.classList.add('b-tabs_tabDefaultActive_CYkQd');
}

//maneja los clics de las pestañas de la vista de venta rápida pestañas superiores
 // Seleccionar todas las <li> dentro del <ul>
  const listItems = document.querySelectorAll('ul.lista_transacciones li');

  listItems.forEach(li => {
    // Agregar listener de clic a cada <li>
    li.addEventListener('click', () => {
    // Quitar la clase activa de todos
    listItems.forEach(item => {
    item.classList.remove('b-tabs_tabDefaultActive_CYkQd');
    });

    // Agregar la clase activa al <li> que fue clicado
    li.classList.add('b-tabs_tabDefaultActive_CYkQd');
    let dataUrl = li.getAttribute('data-testid');
    // console.log(dataUrl, "cambio pestaña venta rapida");

    if(dataUrl === 'sales.transactions'){
        showDivVentaRapida('showTransactionVentaRapida');
    }else if(dataUrl=== 'checkout'){
        showDivVentaRapida('index_sales_X5DVI');
    }

    });
  });

//ocultra y mostrar los divs de venta rápida
function showDivVentaRapida(selectedDivId){
    const divs = [
        document.querySelector('.index_sales_X5DVI'),
        document.querySelector('.showTransactionVentaRapida')
    ];
     // Recorrer todos los divs
     divs.forEach(div => {
        // Verificar si el div existe antes de intentar acceder a sus propiedades
        if (div) {
            // Si el div coincide con el ID seleccionado, mostrarlo
            if (div.id === selectedDivId) {
                div.style.display = 'block';
            } else {
                // Ocultar todos los demás divs
                div.style.display = 'none';
            }
        } else {
            // console.warn('Div no encontrado, verifica los IDs en el DOM.');
        }
    });
}
function showDivPestaniasLateralesVentaRapida(selectedDivId){
     const divs = [
        document.querySelector('.divContenedorVentaRapida.basket-menu-quick-sale'),
        document.querySelector('.divContenedorVentaRapida.basket-menu-appointments'),
    ];
     // Recorrer todos los divs
     divs.forEach(div => {
        // Verificar si el div existe antes de intentar acceder a sus propiedades
        if (div) {
            // Si el div coincide con el ID seleccionado, mostrarlo
            if (div.id === selectedDivId) {
                div.classList.remove('d-none');
                // div.style.display = 'block';
            } else {
                div.classList.add('d-none');
                // Ocultar todos los demás divs
                // div.style.display = 'none';
            }
        } else {
            // console.warn('Div no encontrado, verifica los IDs en el DOM.');
        }
    });
}


//función para flecha atrás muestra vista inicial venta rápida
$(document).ready(function () {
    $('[data-testid="b-custom-header-icon-back_transaction"]').on('click', function () {
        showDivVentaRapida('index_sales_X5DVI');
        activarPestaniaNuevaVenta();
        reiniciarPestaniaVentaRapida();
       manejarLoaderTarjetasUniversal('loaderVentaRapidaLiveWire');
    });
});

//función para flecha atrás en vista método pago

 function atrasMetodoPagoPropina(){
    // console.log("hola que tal");
    showDivPagos('salesNavigator-indexBasketContent');
    let divBotonPagar1234 = document.querySelector('.insertPayButton');
    $(divBotonPagar1234).empty();
    $(divBotonPagar1234).append(`
        <button onclick="continueButtonPayment()" id="uid-139-input"
            class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF
            index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
            <div class="index_caption_W6r_J botonCambiarTitulo"> Continuar </div>
        </button>
    `);

       manejarLoaderTarjetasUniversal('loaderVentaRapidaLiveWire');
 }

// FUNCIÓN PARA cobrar SERVICIOS DESDE ARRAY
function insertServiciosDesdeArray(infoArrayEnvio) {
    let htmlContentVentaRapida = '';
    let divllenar = document.querySelector('.basketFull');
    let listaTransacciones = document.querySelector('.basket-transactions-list');
    let divCestoVacio = document.querySelector('.index_basketEmpty_VF3Lr');
    let cestoLleno = divCestoVacio.classList.contains('d-none');

    infoArrayEnvio.forEach((evento, index) => {
        const props = evento.extendedProps;

        const servicio = props.servicio;
        const empleado = props.empleada;
        const precio = servicio.precio;

        // Insertar en arrays de ventas rápidas
        insertarServicioEmpleadoArrayVentaRapida(
            servicio.id,
            `${empleado.nombre} ${empleado.apellido}`,
            parseFloat(precio),
            empleado.id
        );

        insertarVentaRapidaSoloIds(servicio.id);
    });

    getServicesById(serviciosVentaRapida_ids, function (servicios) {
        servicios.forEach((servicio, index) => {
            // console.log(serviciosVentaRapida[index]);
            const datosVenta = serviciosVentaRapida[index];

            htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
                index,
                servicio.nombre.trim(),
                comprobar603090SinM(servicio.duration),
                datosVenta.precio,
                datosVenta.nombre_Empleado,
                datosVenta.idServicio,
                datosVenta.descuento_servicio
            );
        });

        $(listaTransacciones).empty();
        $(listaTransacciones).append(htmlContentVentaRapida);

        if (!cestoLleno) {
            divCestoVacio.classList.add('d-none');
            divllenar.classList.remove('d-none');
        }

        actualizarTotalSubtotal();
        actualizarDescuentoTotal();
    });
}



// FUNCIÓN INSERTAR DATOS PARA COBRAR DESDE CALENDAR
function insertDateServiceByCobrarCalendar(servicio_id, nombreEmpleado, id_empleado026, precioServicio){

    let htmlContentVentaRapida = '';
    let nombreVentaRapida = nombreEmpleado;
    let id_empleado = id_empleado026;
    // //console.log(precioServicio, "Precio servicio");
    //metemos la venta en el array
    insertarServicioEmpleadoArrayVentaRapida(servicio_id, nombreVentaRapida, parseFloat(precioServicio), id_empleado);

    insertarVentaRapidaSoloIds(servicio_id);
    // addServiceDiscountArray();
    let divllenar = document.querySelector('.basketFull');
    let listaTransacciones = document.querySelector('.basket-transactions-list');

    //comprobar si el cesto está vacio
    let divCestoVacio = document.querySelector('.index_basketEmpty_VF3Lr');
    let cestoLleno = divCestoVacio.classList.contains('d-none');
    // //console.log("ESTA tiene cosas? ", cestoLleno);
    if (cestoLleno) {
        //comprobar si lista li tiene atributo data-discount
        getServicesById(serviciosVentaRapida_ids, function (servicios){
            servicios.forEach((servicio, index) => {
                let descuento = serviciosVentaRapida[index].descuento_servicio;
                let li_index = index;
                let servicio_idArray = serviciosVentaRapida[index].idServicio;
                let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
                let precioAsignar = serviciosVentaRapida[index].precio;
                // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
                htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
                    li_index,
                    servicio.nombre,
                    comprobar603090SinM(servicio.duration),
                    precioAsignar,
                    nombreApellidoEmpleA,
                    servicio_idArray,
                    descuento
                );
            });
            // Agregar todo el contenido generado al contenedor nuevo
            $(listaTransacciones).empty();
            $(listaTransacciones).append(htmlContentVentaRapida);
        });
        // actualizar totales
        actualizarTotalSubtotal();
        actualizarDescuentoTotal();
    }
    else{
        divCestoVacio.classList.add('d-none');
        divllenar.classList.remove("d-none");
        getServicesById(serviciosVentaRapida_ids, function (servicios){
            servicios.forEach((servicio, index) => {
                let li_index = index;
                let precioAsignar = serviciosVentaRapida[index].precio;
                let descuento = serviciosVentaRapida[index].descuento_servicio;
                let servicio_idArray = serviciosVentaRapida[index].idServicio;
                let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
                // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
                htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
                    li_index,
                    servicio.nombre,
                    comprobar603090SinM(servicio.duration),
                    precioAsignar,
                    nombreApellidoEmpleA,
                    servicio_idArray,
                    descuento
                );
            });
            $(listaTransacciones).empty();
            $(listaTransacciones).append(htmlContentVentaRapida);
        });
        actualizarTotalSubtotal();
    }
}

// insertar tarjeta cliente seleccionado venta rápida
function insertarTarjetaClienteSelecionadoCobrarCalendar(cliente, divInfoClienteEnviado, claseDiferenciadora){
    let divInfoCliente = document.querySelector(divInfoClienteEnviado);
    let iniciales = obtenerIniciales(cliente.nombre, cliente.primerApellido);
    $(divInfoCliente).empty();
    $(divInfoCliente).append(`
        <div data-v-3d594be1="" class="b-shadow-card customer-card_customer_PiI9d" data-index="${cliente.id}">
            <div data-v-3d594be1="" class="customer-card_customerData_Ke3s5 d-flex">
                <div data-v-3d594be1="" title="${cliente.nombre} ${cliente.primerApellido}" class="b-avatar_avatar_pJzSu" style="width: 40px; height: 40px; flex: 0 0 40px;">
                    <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ${iniciales} </div>
                </div>
                <div data-v-3d594be1="" class="customer-card_customerContent_Pq14e">
                    <div data-v-3d594be1="" class="customer-card_customerName_clLc6 customer-card_size--16-sb_kPC0E"> ${cliente.nombre} </div>
                    <div data-v-3d594be1="" class="color-07 size--14">
                        <span data-v-3d594be1="" class="flex inline items-center">
                            <span> ${cliente.telefono || 'No disponible'} </span>
                        </span>
                    </div>
                </div>
                <div data-v-3d594be1="" class="customer-card_customerClose_kMCQ7 flex" onclick="insertartarjetaSeleccionaCliente('${divInfoClienteEnviado}', '${claseDiferenciadora}')">
                    <span data-v-3d594be1="" class="b-icon iconFont icon-x" data-testid="basket-customer-card-close" style="font-size: 20px; align-items: center; display: flex;"></span>
                </div>
            </div>
        </div>
    `);
    clicTarjetasBlancasSelectCliente();
}

//función que inserta la tarjeta servicio en cobrar desde calendar
function insertTarjetaServiciosCobrarCalendar(){
    document.querySelector('.appointment-card_appointment_F_IwZ').style.display = "flex";

    let divContenedorFechaHora = document.querySelector('.appointment-date_date_UsCxi');
    $(divContenedorFechaHora).empty();
    $(divContenedorFechaHora).append(`
        <div class="appointment-date_month_nFAjw appointment-date_size--12_Z4is5">abr.</div>
        <div class="appointment-date_day_zpfF4 appointment-date_size--20_BC_a_">21</div>
        <div class="appointment-date_hour_isz2C appointment-date_size--12_Z4is5">10:00</div>
    `);
    let statusCobrar = '';
    let htmlContent = '';
    if(infoArrayEnvio.length){
        //multiple
        statusCobrar = infoArrayEnvio[0].extendedProps.status;
        infoArrayEnvio.forEach(evento => {
            const servicioNombre = evento.extendedProps.servicio.nombre;

            const html = `
                <div class="appointment-card_appointmentService_gsMNj">
                    <div class="appointment-card_appointmentServiceBar_BvsJO"></div>
                    <p style="margin-bottom: 0px" class="size--14 txt--ellipsis margin-left-12">
                        ${servicioNombre}
                    </p>
                </div>
            `;
            htmlContent += html;
        });
    }else{
        statusCobrar = infoArrayEnvio.event.extendedProps.status;
        //solo uno
        htmlContent = `
         <div class="appointment-card_appointmentService_gsMNj">
            <div class="appointment-card_appointmentServiceBar_BvsJO"></div>
            <p style="margin-bottom: 0px" class="size--14 txt--ellipsis margin-left-12">${infoArrayEnvio.event.extendedProps.servicio.nombre}</p>
        </div>
        `;
    }
    document.querySelector('.statusReservaCalendarCobrar').textContent = statusCobrar;
    let divContendorServicios = document.querySelector('.tarjetasServiciosCobrarCalendar056');
    $(divContendorServicios).empty();
    $(divContendorServicios).append(htmlContent);
}

//la x borrar servicios cobrar calendar
let botonBorrarCobrarCalendar = document.querySelector('.botonCerrarTarjeta028');
if(botonBorrarCobrarCalendar){
    botonBorrarCobrarCalendar.addEventListener('click', function (event) {
        event.preventDefault();
        // console.log("boton x");

        reseteoVistaVenta();
    });
}
//botón abrir offcanvas version movil
let botonAbrirOffcanvas = document.querySelector('.side-menu_toggle_VbZoX');
if(botonAbrirOffcanvas){
    botonAbrirOffcanvas.addEventListener('click', function (event) {
        // event.preventDefault();
        // console.log("clic en menu lateral");

        let menuLateral = document.querySelector('.tabs');
        menuLateral.classList.toggle('mostrarTabs');
    });
}

//cambiar vista mes
function changeView023(){
    setTimeout(() => {
    calendar.changeView('resourceTimeGridDay');

    }, 300);
}

//botones pestañas administrator
document.querySelectorAll('.tablinksAdministrator').forEach(button => {
    button.addEventListener('click', () => {
        setMessengerId(0);
        $('meta[name="id"]').attr('content', '0');
        let newUrl = urlAplicacion+'/admin/dashboard/Mensajes_administrator/';
        let metaTag = document.querySelector('meta[name="url"]');
        // console.log(newUrl, "newurl");


        $(".messenger-list-item").removeClass("m-list-active");
        // setTimeout(() => {
        metaTag.setAttribute('content', newUrl);
        // console.log(metaTag, "metatag", setMessengerId(), "setMessengerId");
        let versionMovil = document.querySelector('.side-menu_toggle_VbZoX');
        if(versionMovil){
           if (window.innerWidth <= 980) {
                // console.log("La pantalla es igual o menor a 980px");
                let tabs = document.querySelector('.tabs');
                tabs.classList.toggle('mostrarTabs');

            }
        }

    });
  });
  //usuario normal
  document.querySelectorAll('.tablinks').forEach(button => {
    button.addEventListener('click', () => {
        setMessengerId(0);
        $('meta[name="id"]').attr('content', '0');
        let newUrl = urlAplicacion+'/admin/dashboard/Mensajes_administrator/';
        let metaTag = document.querySelector('meta[name="url"]');

        $(".messenger-list-item").removeClass("m-list-active");
        // setTimeout(() => {
        metaTag.setAttribute('content', newUrl);
        let versionMovil = document.querySelector('.side-menu_toggle_VbZoX');
        if(versionMovil){
           if (window.innerWidth <= 980) {
                // console.log("La pantalla es igual o menor a 980px");
                // let tabs = document.querySelector('.tabs');
                tabs.classList.toggle('mostrarTabs');

            }
        }
        // console.log(metaTag, "metatag", setMessengerId(), "setMessengerId");
    });
  });

  //si el navegador es edge
  let sentmessage = document.querySelector('.messenger-sendCard');
  if (navigator.userAgent.includes("Edg/")) {
    if(sentmessage){
        sentmessage.classList.add("is-edge-marginBotom");
    // console.log("estamos en edge");
    }
}else{
    if(sentmessage){
        sentmessage.classList.remove("is-edge-marginBotom");
        // console.log("no estamos en edge");

    }

}

 //inicializa gráfica ingresos mensuales
var graficaIngresosChart;
var graficaIngresosYaDibujada = false;
function dibujarGraficaIngresos(){
    if (graficaIngresosYaDibujada) {
        graficaIngresosChart.destroy();
        graficaIngresosYaDibujada = false;
    }
    let canvas = document.getElementById('graficaIngresos');
    if (!canvas) return;

    let ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(64, 111, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(64, 111, 255, 0)');
    let urlObtenerIngresosGrafica = "obtenerIngresos-graficaReservas";
    fetch(urlObtenerIngresosGrafica, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        datosIngresos = data.data;
        graficaIngresosChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Ingresos mensuales',
                    data: data.data,
                    borderColor: 'rgb(64, 111, 255)',
                    backgroundColor: gradient,
                    tension: 0.3,
                    fill: true,
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: `Ingresos Mensuales en ${new Date().getFullYear()}`
                    },
                    tooltip: {
                        backgroundColor: 'rgb(64, 111, 255)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        callbacks: {
                            title: () => [],
                            label: context => `INGRESOS: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        graficaIngresosYaDibujada = true;
    })
    .catch(error => {
        console.error('❌ Error grafica ingresos:', error);
        // alert('❌ Ocurrió un error en grafica ingresos.');
    });
}


window.addEventListener('resize', () => {
    if (graficaIngresosChart) {
        graficaIngresosChart.resize();
    }
    if(graficaReservasChart){
        graficaReservasChart.resize();
    }
});
    //inicializa gráfica
var graficaReservasChart;
var graficaYaDibujada = false;

function destruirGraficas(){
     graficaReservasChart.destroy();
     graficaIngresosChart.destroy();
}

function dibujarGraficaReservas() {
    // console.log(graficaYaDibujada, "dibujada la gráfica");

    if (graficaYaDibujada) {
        graficaReservasChart.destroy();
        graficaYaDibujada = false;
    }

    const canvas = document.getElementById('graficaReservas');
    if (!canvas) return;

    let ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 190, 112, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 190, 112, 0)');

    let datosReservas = window.appData.datosReservas || [];
    let urlObtenerDatosGraficaReservas = 'obtenerDatos-graficaReservas';
    // if(datosReservas.length === 0){
    fetch(urlObtenerDatosGraficaReservas, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        datosReservas = data;
        graficaReservasChart = new Chart(ctx, {
            responsive:true,
            type: 'line',
            data: {
                labels: [
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ],
                datasets: [{
                    label: 'Reservas por mes',
                    data: datosReservas,
                    borderColor: 'rgb(0, 190, 112)',
                    backgroundColor: gradient,
                    tension: 0.3,
                    fill: true,
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: {
                        display: true,
                        text: `Reservas Mensuales en ${new Date().getFullYear()}`
                    },
                    tooltip: {
                        backgroundColor: 'rgb(0, 190, 112)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        callbacks: {
                            title: () => [],
                            label: context => `CITAS: ${context.parsed.y}`
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        graficaYaDibujada = true;
    })
    .catch(error => {
        console.error('❌ Error en grafica reservas:', error);
        // alert('❌ Ocurrió un error en graficas reservas.');
    });
}

document.addEventListener('DOMContentLoaded', function () {
     if (window.location.href.includes('Estatistic_administrator')) {
        // console.log("SI INCLUYE ESTATISTICA");

            dibujarGraficaReservas();
            mostarFechaBoton();
            mostrarPorcentajesReservados();
            dibujarGraficaIngresos();
        }
});
     //controla los botones de las pestañas de graficas
    const tabButtons = document.querySelectorAll('.b-tabs-nav-tab');
    const tabContents = document.querySelectorAll('.tab-contentGraficas');

    const tabs = [
        { buttonClass: 'reservasPorcentaje', contentId: 'tab-panel-control' },
        { buttonClass: 'tab-citas', contentId: 'tab-citas' },
        { buttonClass: 'tab-clientes', contentId: 'tab-clientes' },
        { buttonClass: 'tab-ingresos', contentId: 'tab-ingresos' },
        { buttonClass: 'tab-caja', contentId: 'tab-caja' },
        { buttonClass: 'tab-inventario', contentId: 'tab-inventario' },
        { buttonClass: 'tab-empleados', contentId: 'tab-empleados' },
    ];

    tabs.forEach(tab => {
        const button = document.querySelector(`.${tab.buttonClass}`);
        const content = document.getElementById(tab.contentId);

        if (button && content) {
            button.addEventListener('click', () => {
                // Quitar clase "selected" de todos los botones
                tabButtons.forEach(btn => btn.classList.remove('selected'));
                // Ocultar todos los contenidos
                tabContents.forEach(cont => cont.classList.remove('active'));

                // Activar botón actual
                button.classList.add('selected');
                // Mostrar contenido correspondiente
                content.classList.add('active');
            });
        }
    });

    function mostarFechaBoton(){
         const monthNames = ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."];
        const now = new Date();
        const formatted = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
        document.getElementById('centerDateText').textContent = formatted;
    }


    //date piker seleccionar fecha grafica
    let calendarInitialized = false;

    function initCalendarPickerGrafica() {
        const radios = document.querySelectorAll('input[name="calendarMode"]');
        const content = document.getElementById('calendarContent');

        const renderMode = (mode) => {
            content.innerHTML = '';

            switch (mode) {
                case 'range':
                    content.innerHTML = `
                        <div class="b-p-3">
                            <label>Desde:</label>
                            <input type="text" id="fromDate" class="form-control mb-2">
                            <label>Hasta:</label>
                            <input type="text" id="toDate" class="form-control">
                        </div>
                    `;
                    flatpickr("#fromDate", { dateFormat: "Y-m-d" });
                    flatpickr("#toDate", { dateFormat: "Y-m-d" });
                    break;

                case 'day':
                    content.innerHTML = `
                        <div class="b-p-3 datePikerDayGrafica w-100">
                            <div id="dayPicker" class="form-control p-0 border-0"></div>
                        </div>
                    `;

                    flatpickr("#dayPicker", {
                        inline: true,
                        dateFormat: "Y-m-d",
                        locale: {
                            firstDayOfWeek: 1,
                            weekdays: {
                                shorthand: ['Dom', 'Lun', 'Mar', 'Miérc', 'Juev', 'Vier', 'Sáb'],
                                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                            },
                            months: {
                                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                            },
                        },

                        // ✅ Actualizar botón central al seleccionar un día
                        onChange: function (selectedDates) {
                            if (selectedDates.length > 0) {
                                const date = selectedDates[0];
                                const day = date.getDate().toString().padStart(2, '0');
                                const month = date.getMonth(); // 0-indexed
                                const year = date.getFullYear();

                                const monthNames = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
                                document.getElementById('centerDateText').textContent = `${day} ${monthNames[month]} ${year}`;
                            }
                        }
                    });
                    break;

               case 'week':
                    content.innerHTML = `
                        <div class="b-p-3 datePikerSemanaGrafica w-100">
                            <div id="weekPicker" class="form-control p-0 border-0"></div>
                            <small class="text-muted">Haz clic en un día para calcular la semana.</small>
                        </div>
                    `;

                    flatpickr("#weekPicker", {
                        inline: true,
                        dateFormat: "Y-m-d",
                        weekNumbers: true,
                        locale: {
                            firstDayOfWeek: 1,
                            weekdays: {
                                shorthand: ['Dom', 'Lun', 'Mar', 'Miérc', 'Juev', 'Vier', 'Sáb'],
                                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                            },
                            months: {
                                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                            },
                        },
                        onChange: function (selectedDates) {
                            if (selectedDates.length > 0) {
                                const date = selectedDates[0];

                                // Obtener lunes de la semana
                                const first = new Date(date);
                                const dayOfWeek = first.getDay();
                                const diffToMonday = (dayOfWeek + 6) % 7;
                                first.setDate(first.getDate() - diffToMonday);

                                // Obtener domingo
                                const last = new Date(first);
                                last.setDate(first.getDate() + 6);

                                // Obtener número de semana ISO
                                const getWeekNumber = (d) => {
                                    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                                    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
                                    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
                                    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
                                    return weekNo;
                                };

                                const weekNumber = getWeekNumber(date);
                                const monthNames = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];

                                const formatFullDate = (d) => {
                                const day = d.getDate().toString().padStart(2, '0');
                                const month = monthNames[d.getMonth()];
                                const year = d.getFullYear();
                                return `${day} ${month} ${year}`;
                            };

                            document.getElementById('centerDateText').textContent = `Semana ${weekNumber} (${formatFullDate(first)} - ${formatFullDate(last)})`;
                            }
                        }
                    });
                    document.querySelector('.flatpickr-weekday').textContent = "Semana";
                    break;


               case 'month':
                     content.innerHTML = `
                        <div class="b-p-3 datePikerMesGrafica">
                            <div id="monthPicker" class="form-control p-0 border-0"></div>
                        </div>
                    `;

                    flatpickr("#monthPicker", {
                        inline: true,
                        plugins: [
                            new monthSelectPlugin({})
                        ],
                        locale: {
                            months: {
                                shorthand: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                                longhand: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                            },
                        },
                        dateFormat: "Y-m",
                        altFormat: "F Y",

                        // ✅ Evento que se lanza al seleccionar mes
                        onChange: function (selectedDates, dateStr) {
                            if (selectedDates.length > 0) {
                                const selectedDate = selectedDates[0];
                                const monthNames = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];

                                const month = selectedDate.getMonth(); // 0-indexed
                                const year = selectedDate.getFullYear();

                                // Actualizar el texto del botón central
                                document.getElementById('centerDateText').textContent = `${monthNames[month]} ${year}`;
                            }
                        }
                    });
                    break;
                case 'year':
                    const currentYear = new Date().getFullYear();
                    let yearDivs = '';

                    for (let i = 0; i < 6; i++) {
                        const year = currentYear - (5 - i); // De 2020 a 2025
                        const isSelected = (year === currentYear) ? 'selected' : '';
                        yearDivs += `<div class="b-scopepicker-button ${isSelected}" data-year="${year}">${year}</div>`;
                    }

                    content.innerHTML = `
                            <div class="b-grid b-grid-cols-3 b-g-2" style="display: grid">
                                ${yearDivs}
                            </div>
                    `;

                    // Manejar selección de año
                    document.querySelectorAll('.b-scopepicker-button').forEach(div => {
                        div.addEventListener('click', function () {
                            // Quitar clase "selected" de todos
                            document.querySelectorAll('.b-scopepicker-button').forEach(el => el.classList.remove('selected'));

                            // Añadir clase "selected" al clicado
                            this.classList.add('selected');

                            const selectedYear = this.getAttribute('data-year');

                            // Actualizar texto en el botón central
                            document.getElementById('centerDateText').textContent = selectedYear;

                            // (Opcional) Ocultar dropdown si lo deseas
                            // document.querySelector('.b-dropdown-menu-scopepicker')?.classList.remove('show');
                        });
                    });
                    break;
               case 'last':
                    const lastOptions = [
                        { label: 'Últimos 7 días', value: 7 },
                        { label: 'Últimos 14 días', value: 14 },
                        { label: 'Últimos 30 días', value: 30 },
                        { label: 'Últimos 3 meses', value: 90 },
                        { label: 'Últimos 6 meses', value: 180 }
                    ];

                    let lastDivs = '';

                    lastOptions.forEach((opt, index) => {
                        // Marcar como seleccionado el primero por defecto
                        const isSelected = index === 0 ? 'selected' : '';
                        lastDivs += `<div class="b-scopepicker-button ${isSelected}" data-days="${opt.value}">${opt.label}</div>`;
                    });

                    content.innerHTML = `
                         <div class="b-grid b-grid-cols-3 b-g-2" style="display: grid">
                            ${lastDivs}
                        </div>
                    `;

                    // Manejar selección
                    document.querySelectorAll('.b-scopepicker-button').forEach(div => {
                        div.addEventListener('click', function () {
                            // Quitar clase "selected" de todos
                            document.querySelectorAll('.b-scopepicker-button').forEach(el => el.classList.remove('selected'));

                            // Añadir clase "selected" al clicado
                            this.classList.add('selected');

                            // Obtener el texto (ej: "Últimos 7 días")
                            const label = this.textContent.trim();

                            // Actualizar el texto del botón central
                            document.getElementById('centerDateText').textContent = label;
                        });
                    });
                    break;

            }
        };

        // Escucha cambios en radios
        const radios33 = document.querySelectorAll('input[name="calendarMode"]');
        radios33.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    renderMode(this.value);
                }
            });
        });

        renderMode('year'); // Modo inicial
    }

    // Asignar evento click al botón para abrir calendario

    const centerBtn = document.getElementById('centerDateBtn');
    if(centerBtn){
          centerBtn.addEventListener('click', function () {
        if (!calendarInitialized) {
            initCalendarPickerGrafica();
            calendarInitialized = true;
        }

        const dropdown = document.querySelector('.b-dropdown-menu-scopepicker');
        if (dropdown) {
            dropdown.classList.toggle('d-none'); // Puedes usar tu propia clase para mostrar/ocultar
        }
    });
    }


//PORCENTAJES DE TIEMPO RESERVADO
function mostrarPorcentajesReservados() {
    let porcentajes = window.appData.porcentajeReservas || [];
    // console.log(porcentajes, porcentajes.length, "PORCENTAJES");
    let urlObtenerPorcentajes = 'porcentajesTiempo-reservas';
    if(porcentajes.length === 0){
        fetch(urlObtenerPorcentajes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            porcentajes = data;
            const contenedor = document.getElementById('contenedorPorcentajes');
            if (!contenedor) return;

            const nombresMeses = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];

            const clasesColor = porcentaje => {
                if (porcentaje === 0) return 'b-bg-red-lt';
                if (porcentaje < 50) return 'b-bg-yellow-lt';
                if (porcentaje < 100) return 'b-bg-orange-lt';
                return 'b-bg-green-lt';
            };

            const html = porcentajes.map((p, i) => `
                <div class="b-chart-table-item">
                    <div class="b-chart-table-item-badge ${clasesColor(p)}">${p}%</div>
                </div>
            `).join('');

            contenedor.innerHTML = html;
            })
        .catch(error => {
            console.error('❌ Error al comprobar disponibilidad:', error);
            alert('❌ Ocurrió un error al comprobar la disponibilidad.');
        });
    }else{
        const contenedor = document.getElementById('contenedorPorcentajes');
        if (!contenedor) return;

        const nombresMeses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        const clasesColor = porcentaje => {
            if (porcentaje === 0) return 'b-bg-red-lt';
            if (porcentaje < 50) return 'b-bg-yellow-lt';
            if (porcentaje < 100) return 'b-bg-orange-lt';
            return 'b-bg-green-lt';
        };

        const html = porcentajes.map((p, i) => `
            <div class="b-chart-table-item">
                <div class="b-chart-table-item-badge ${clasesColor(p)}">${p}%</div>
            </div>
        `).join('');

        contenedor.innerHTML = html;
        }
}

function marcarPanelControlActivo(){
     //controla los botones de las pestañas de graficas
    let tabButtons = document.querySelectorAll('.b-tabs-nav-tab');
    let tabContents = document.querySelectorAll('.tab-contentGraficas');

     // Quitar clase "selected" de todos los botones
    tabButtons.forEach(btn => btn.classList.remove('selected'));
    // Ocultar todos los contenidos
    tabContents.forEach(cont => cont.classList.remove('active'));
    let panelControl = document.getElementById('tab-panel-control');
    let pestaniaPanelControl = document.querySelector('.reservasPorcentaje');
    if(pestaniaPanelControl){
        pestaniaPanelControl.classList.add('selected');
    }
    if(panelControl){
        panelControl.classList.add('active');
    }
}
// function marcarVentaRapida(){
//     let tabButtonsVentaRapida = document.querySelectorAll('.pestanias_laterales_ventaRapida li');
//     let tabContents = document.querySelectorAll('.tab-contentGraficas');
// }

//fdafdsafsa eventDetailsModal fdfdg
//VENTA RÁPIDA SIN CITA obtener payments para transacciones
// document.getElementById('cargarPagosBtn').addEventListener('click', async () => {
async function cargarPagosYRenderizar(){
    document.getElementById('loaderVentaRapida').classList.remove('d-none');

    let url = 'payments'
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    const groupedByDate = {};

    // Agrupar por fecha (d-m-Y)
    data.forEach(payment => {
        const fechaObj = new Date(payment.fecha);
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES'); // 13/09/2025
        const key = fechaFormateada;

        if (!groupedByDate[key]) {
            groupedByDate[key] = [];
        }

        groupedByDate[key].push(payment);
    });

    const list = document.getElementById('paymentsList');
    list.innerHTML = ''; // Limpiar contenido anterior si ya se ha cargado

    for (const [fecha, pagos] of Object.entries(groupedByDate)) {
        const pagosPorMetodo = {};
        let totalDia = 0;
        const fechaOriginal = pagos[0].fecha;
        pagos.forEach(pago => {
            if (!pagosPorMetodo[pago.metodo_pago]) {
                pagosPorMetodo[pago.metodo_pago] = 0;
            }
            pagosPorMetodo[pago.metodo_pago] += parseFloat(pago.total);
            totalDia += parseFloat(pago.total);
        });

        // Crear HTML dinámicamente
        let html = `
            <li>
                <div class="tile_container_TUxEJ margin-top-16 margin-right-16 margin-bottom-16 margin-left-24" data-testid="summary-list-item">
                    <div class="tile_wrapper_A8Ld5">
                        <div>
                            <div class="flex no-wrap justify-between items-center margin-bottom-16">
                                <div class="size--16-sb">${fecha}</div>
                                <div data-testid="summary-list-item-show-list-btn" class="flex items-center pointer" onclick="cargarPagosPorFechaExacta('${fechaOriginal}');" data-date="${fechaOriginal}">
                                    <div class="size--12">Mostrar lista</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-arrow-right">
                                        <path fill="currentColor" d="M14.8 32.2c-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.7-.7 3.9-4.1 9.7-10.3-5.8-6.2-9-9.6-9.7-10.3-.4-.4-.4-1 0-1.4s1-.4 1.4 0c1 1.1 9.4 9.9 10.4 11 .4.4.4 1 0 1.4-1 1.1-9.4 9.9-10.4 11-.2.2-.5.3-.7.3"></path>
                                    </svg>
                                </div>
                            </div>
        `;

        for (const [metodo, subtotal] of Object.entries(pagosPorMetodo)) {
            html += `
                <div class="flex no-wrap justify-between items-center">
                    <div class="size--14 color-08">${metodo}</div>
                    <div class="size--14">${subtotal.toFixed(2)} €</div>
                </div>
                <hr class="margin-top-12 margin-bottom-12 hr23">
            `;
        }

        html += `
            <div class="flex no-wrap justify-between items-center">
                <div class="size--14">Total</div>
                <div class="size--14-sb">${totalDia.toFixed(2)} €</div>
            </div>
        </div></div></div></li>`;

        list.insertAdjacentHTML('beforeend', html);

    }
    cargarPagosFechaMasReciente();
// });
};

//función obtener transacciones detalles dia
async function cargarPagosFechaMasReciente(contenedorId = 'detalleTransacciones22') {
    // console.log("ejecucion");

    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    // Limpiar contenido anterior
    contenedor.innerHTML = '';
    let url = 'payments'
    try {
        const resp = await fetch(url);
        const data = await resp.json();

        if (!Array.isArray(data) || data.length === 0) {
            contenedor.innerHTML = '<li>No hay pagos.</li>';
            desactivarLoaderUniversal('loaderVentaRapida');
            return;
        }

        // Obtener la fecha más reciente
        // Usamos reduce para encontrar el valor máximo de fecha
        const fechaMaxObj = data.reduce((max, pago) => {
            const dateP = new Date(pago.fecha);
            return dateP > max ? dateP : max;
        }, new Date(data[0].fecha));

        // Filtrar los pagos para quedarnos solo con los que tienen esa fecha exacta
       // Obtener solo la parte Y-M-D como string
        const fechaMaxStr = fechaMaxObj.toISOString().split('T')[0]; // "2025-09-14"

        const pagosRecientes = data.filter(pago => {
            const fechaPagoStr = new Date(pago.fecha).toISOString().split('T')[0];
            return fechaPagoStr === fechaMaxStr;
        });

        pagosRecientes.forEach(payment => {
            const fechaObj = new Date(payment.fecha);
            const reciboId59 = payment.recibo_id
            const hora = fechaObj.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const fecha = fechaObj.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            const metodoRaw = quitarAcentos(payment.metodo_pago.toLowerCase())
                .replace(/\s+/g, '_');
            const icono = iconosPago[metodoRaw] || iconosPago['default'];

            const html = generarPagoHTML({
                reciboId: payment.recibo_id,
                hora,
                fecha,
                metodoRaw,
                icono,
                total: payment.total,
                esCita: !!(payment.recibo && payment.recibo.id_reserva) // true si hay reserva
            });
            contenedor.insertAdjacentHTML('beforeend', html);
        });
        //  setTimeout(() => {
            document.getElementById('loaderVentaRapida').classList.add('d-none');

        // }, 3000);
    } catch (error) {
        console.error('Error al cargar pagos', error);
        contenedor.innerHTML = '<li>Error al cargar los pagos.</li>';
    }
}
//función quitar acentos
function quitarAcentos(str) {
    const acentos = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
        'ñ': 'n', 'Ñ': 'N'
    };
    // console.log(str.split('').map(letra => acentos[letra] || letra).join(''), "LETRAS SIN ACENTOS");

    return str.split('').map(letra => acentos[letra] || letra).join('');
}

//función para generar los detalles html de las transacciones
function generarPagoHTML({ reciboId, hora, fecha, metodoRaw, icono, total, esCita }) {
    return `
        <li>
            <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer" data-recibo="${reciboId}" onclick="mostrarDetallesRecibo(${reciboId})">
                <div class="transactions-list_transactionGridIcon_psmT1">
                    <div class="transactions-list_transactionIconWrapper_dYOZT">
                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO"
                            style="background-image: url('https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/${icono}'); background-size: contain; width: 40px; height: 40px; padding-top: 0px;">
                        </div>
                    </div>
                </div>
                <div class="transactions-list_transactionGridLabel_ZVgMn">
                    <div class="size--14">${hora} - ${fecha}</div>
                    ${
                        esCita
                            ? `<div class="color-08 size--12"><span>Cita</span></div>`
                            : ''
                    }
                </div>
                <div class="transactions-list_transactionGridBadge_d6g_n">
                    <div data-testid="receipt-status-badge-label"
                        class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq"
                        statuscode="${metodoRaw}">
                        Pagado
                    </div>
                </div>
                <div class="transactions-list_transactionGridPrice_M3V0r">
                    <div class="size--14-sb txt--right padding-right-16">${parseFloat(total).toFixed(2)}&nbsp;€</div>
                </div>
            </div>
            <hr class="hr23">
        </li>
    `;
}



// función que carga los detalles según la fecha
async function cargarPagosPorFechaExacta(fechaExacta, contenedorId = 'detalleTransacciones22') {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    contenedor.innerHTML = ''; // Limpiar contenido anterior

    try {
        const resp = await fetch('payments');
        const data = await resp.json();

        if (!Array.isArray(data) || data.length === 0) {
            contenedor.innerHTML = '<li>No hay pagos.</li>';
            return;
        }

        // Filtrar por la fecha exacta recibida (formato: YYYY-MM-DD HH:mm:ss)
        const pagosFiltrados = data.filter(pago => {
            const fechaPago = new Date(pago.fecha);
            const fechaFiltro = new Date(fechaExacta);

            return (
                fechaPago.getFullYear() === fechaFiltro.getFullYear() &&
                fechaPago.getMonth() === fechaFiltro.getMonth() &&
                fechaPago.getDate() === fechaFiltro.getDate()
            );
        });

        if (pagosFiltrados.length === 0) {
            contenedor.innerHTML = `<li>No hay pagos en la fecha: ${fechaExacta}</li>`;
            return;
        }
        pagosFiltrados.forEach(payment => {
            const fechaObj = new Date(payment.fecha);
            const reciboId59 = payment.recibo_id;

            const hora = fechaObj.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const fecha = fechaObj.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            const metodo68 = quitarAcentos(payment.metodo_pago.toLowerCase())
                .replace(/\s+/g, '_');
            const icono = iconosPago[metodo68] || 'default-icon.svg';//iconosPago es gloval
            // console.log(payment.recibo, "es cita o");

            const html = generarPagoHTML({
                reciboId: payment.recibo_id,
                hora,
                fecha,
                metodo68,
                icono,
                total: payment.total,
                esCita: !!(payment.recibo && payment.recibo.id_reserva) // true si hay reserva
            });

            contenedor.insertAdjacentHTML('beforeend', html);
        });

    } catch (error) {
        console.error('Error al cargar pagos', error);
        contenedor.innerHTML = '<li>Error al cargar los pagos.</li>';
    }
}

function cerrarModalDetallesRecibo(){
     let modalRecibo = document.querySelector(`.modalMotrarReciboDetalleTransaccion`);
    // console.log("Hola");
     modalRecibo.classList.add('d-none');
}

//maneja el clic de la cruz para cerrar el modal
let cerrarModalRecibo = document.querySelector('.closeModalRecibo');
if(cerrarModalRecibo){
    cerrarModalRecibo.addEventListener('click', () => {
    // cerrarModalDetallesRecibo();
    let modalRecibo = document.querySelector(`.modalMotrarReciboDetalleTransaccion`);
    // console.log("Hola");
     modalRecibo.classList.toggle('d-none');
  });
}


  // MUESTRA MODAL DETALLES RECIBO
async function mostrarDetallesRecibo(reciboId) {
    // console.log('Mostrar detalles para el recibo ID:', reciboId);

    let url = 'showRecivoDetails';

    try {
        const resp2 = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ id_recibo_show: reciboId })
        });

        const data2 = await resp2.json();
        // console.log(data2, "DETALLES serv");
        if(data2.cliente){
            console.log("hay cliente");

        }else{
            // console.log("no hay cliente");

        }
        //html de los pagos
        let pagos = data2.pagos;
        let importe1='';
        let importe2='';
        let metodo1='';
        let metodo2='';
        let fecha_hora= pagos[0].fecha_formateada2
        // console.log(pagos, "PAGOS DEL RECIBO");
        let pagosHtml = '';
        let metodoActivo = '';

        if(pagos.length >1){
            metodoActivo = 'Pago fraccionado';
            importe1 = pagos[0].total;
            importe2 = pagos[1].total;
            metodo1 = pagos[0].metodo_pago;
            metodo2 = pagos[1].metodo_pago;
             pagosHtml = `
            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • ${pagos[0].metodo_pago} • ${pagos[0].fecha_formateada2} </div>
                <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                    <span>${pagos[0].total} €</span>
                </div>
            </div>
            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • ${pagos[1].metodo_pago} • ${pagos[1].fecha_formateada2} </div>
                <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                    <span>${pagos[1].total} €</span>
                </div>
            </div>
            `;
        }else{
            metodoActivo = '';
               pagosHtml=`
            <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • ${pagos[0].metodo_pago} • ${pagos[0].fecha_formateada2} </div>
                <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                    <span>${pagos[0].total} €</span>
                </div>
            </div>
            `;
        }

        //html de los servicios
        let servicios = data2.servicios;
        let serviciosHtml = '';
        servicios.forEach((servicio, index) => {
            let descuento = servicio.descuento_porcentaje;
            let li_index = null;
            let servicio_idArray = servicio.id_servicio;
            // let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
            let precioAsignar = servicio.servicio.precio;
            // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
            serviciosHtml += construirTarjetaServiciosTiket(
                li_index,
                servicio.servicio.nombre,
                comprobar603090SinM(servicio.servicio.duration),
                precioAsignar,
                servicio_idArray,
                descuento
            );
        });

        //html datos cliente
        let datoscliente='';
        let cliente ='';
        if(data2.cliente){
            datoscliente = montarTarjetaClienteTiket(data2.cliente);
            cliente = data2.cliente;
        }else{
            datoscliente='';
            cliente='';
        }
        let contenedorDeTiketModal = document.querySelector('.receipt_receiptReceipt_KzM2ZModalMostrarRecibo');
         $(contenedorDeTiketModal).empty();
          $(contenedorDeTiketModal).append(`
             <div class="payment-receipt_receipt_KbChH payment-receipt_size--14_pkege">
                <div class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--md_INMcW receipt-status-badge_size--18-sb_Z0C9x"> Pagado </div>
                <div class="payment-receipt_receiptInfo_RrRnL margin-top-16">
                    <div class="size--16-sb">Recibo ${data2.recibo.numero_recibo} | ID ${data2.recibo.id}</div>
                    <div>${data2.fecha_formateada}</div>
                </div>
                ${datoscliente}
                <div class="margin-top-16">
                    <div class="margin-top-16"> MYA Nail art studio <div class="payment-receipt_receiptAltText_VrnDU payment-receipt_size--12_zJMLU">ourense 25, 32003, Ourense</div></div>
                </div>
                <div class="payment-receipt_receiptLabels_dbSin payment-receipt_size--10_bf2DQ">
                    <div>Artículo</div>
                    <div>Cantidad</div>
                </div>
                <div>
                    ${serviciosHtml}
                </div>
                <hr class="payment-receipt_hr_6WSqP">

                <table class="payment-receipt_taxSummary_tF1kf">
                    <thead class="color-08 size--10">
                        <tr><th></th><th>Tipo de Impuesto</th><th>Valor neto</th><th>Importe de impuesto</th><th>Valor bruto</th></tr>
                    </thead>
                    <tbody><tr data-testid="payment-receipt-tax-item-0"><td></td><td class="size--12">${data2.recibo.tipo_impuesto} %</td><td class="size--12">${data2.recibo.valor_neto.toString().replace('.',',')} €</td><td class="size--12">${data2.recibo.importe_impuesto.toString().replace('.',',')} €</td><td class="size--12"><strong>${data2.recibo.valor_bruto}</strong></td></tr></tbody>
                </table>
                <div data-testid="payment-receipt-summaries-subtotal" class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU">
                    <div class="payment-receipt_receiptRowName_Me4zF"> Subtotal </div>
                    <div class="payment-receipt_receiptRowTotal_bf2SM"> ${data2.recibo.subtotal}</div>
                </div>
                <div data-testid="${data2.recibo.descuento_total_porcentaje}" class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU">
                    <div class="payment-receipt_receiptRowName_Me4zF"> Descuento </div>
                    <div class="payment-receipt_receiptRowTotal_bf2SM"> -${data2.recibo.descuento_total}</div>
                </div>
                <hr class="payment-receipt_hr_6WSqP">
                <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowAlt_CtByz">
                    <div class="payment-receipt_receiptRowName_Me4zF"> Total </div>
                    <div class="payment-receipt_receiptRowTotal_bf2SM payment-receipt_receiptRowTotalAlt_L_Ovf payment-receipt_size--16-sb_LEIqn"> ${data2.recibo.valor_bruto}</div>
                </div>
                ${pagosHtml}
                <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowTotalPaid_th16p">
                    <div class="payment-receipt_receiptRowName_Me4zF"> Total pagado </div>
                    <div data-testid="payment-receipt-paid" class="payment-receipt_receiptRowTotal_bf2SM size--12-b"> ${data2.recibo.valor_bruto}</div>
                </div>
            `);
        //MONTAMOS EL TIKECT
         //clic en el boton enviar recibo email
        let ahora = new Date();
        let fechaEmail = ahora.toLocaleDateString('es-ES', {
            day: '2-digit', month: 'long', year: 'numeric'
        }).replace(',', '');

        let horaEmail = ahora.toLocaleTimeString('es-ES', {
            hour: '2-digit', minute: '2-digit'
        }).replace(',', '');
               $('#uid-353-input-enviarMail').on('click', function() {
                    $('.botonesCabeceraTiquet').addClass('d-none');
                    $('.enviarReciboCorreo').removeClass('d-none');
                });
                $('.esconderEnviarEmail').on('click', function() {
                    document.getElementById('emailClienteRecivoSend').value='';
                    $('.botonesCabeceraTiquet').removeClass('d-none');
                    $('.enviarReciboCorreo').addClass('d-none');
                });
                  $('#uid-340-inputEnviarEmail').on('click', function() {
                    cerrarModalDetallesRecibo();

                    activarLoaderUniversal('loaderTransacciones');
                    let emailCliente= document.getElementById('emailClienteRecivoSend').value;
                    let updateStatusReservUrl = 'envio-email-recibo';
                    let fecha_hora = `
                    ${fechaEmail} a las ${horaEmail}
                    `;
                    let csrfToken = $('meta[name="csrf-token"]').attr("content");
                    $.ajax({
                        url: updateStatusReservUrl,
                        method: 'POST',
                        data: {
                            _token: csrfToken,
                            emailCliente: emailCliente,
                            id_recibo: data2.recibo.id,
                            fecha_email:data2.fecha_formateada,
                            fecha_email_hora:fecha_hora,
                            datos_cliente:cliente,
                            tipoIva:data2.recibo.tipo_impuesto,
                            valor_neto: data2.recibo.valor_neto.toString().replace('.',','),
                            importe_iva: data2.recibo.importe_impuesto.toString().replace('.',','),
                            valor_bruto: data2.recibo.valor_bruto,
                            subtotal: data2.recibo.subtotal,
                            descuentoTotalPorcentaje:data2.recibo.descuento_total_porcentaje,
                            descuentoTotalImporte:data2.recibo.descuento_total,
                            // metodoPagoTicket:metodoPagoTicket,
                            metodoActivo:metodoActivo,
                            importe1_: importe1,
                            metodopago1_: metodo1,
                            importe2_:importe2,
                            metodopago2_: metodo2,

                        },
                        success: function(response) {
                            if(response.enviado === true){
                                document.getElementById('emailClienteRecivoSend').value='';
                                document.querySelector('.enviarReciboCorreo').classList.add('d-none');
                                document.querySelector('.botonesCabeceraTiquet ').classList.remove('d-none');
                                let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
                                ///cerrarModalDetallesRecibo();
                                 desactivarLoaderUniversal('loaderTransacciones');

                                insertMessageResolAction('Revibo enviado con éxito', '.showTransactionVentaRapida', stylos, 'ok');
                            }else{
                                cerrarModalDetallesRecibo();
                                 desactivarLoaderUniversal('loaderTransacciones');

                                insertMessageResolAction('No hemos podido enviar el recibo', '.showTransactionVentaRapida', stylos, 'error');
                            }
                            //console.log(response.enviado, "respuesta envio email");
                        },
                        error: function(xhr) {
                            //console.log('Error al actualizar el status', xhr);
                        }
                    });

                });
    } catch (error) {
        console.error('Error al cargar pagos', error);
        contenedor.innerHTML = '<li>Error al cargar los detalles de los servicios.</li>';
    }

    let modalRecibo = document.querySelector(`.modalMotrarReciboDetalleTransaccion`);
    modalRecibo.classList.toggle('d-none');
}
//reinicia marcando la pestaña inicial de venta rapida
function reiniciarPestaniaVentaRapida(){
    // quitar la clase selected a todos los li y poner al seleccionado
    let elementosliDiv = document.querySelectorAll('.pestanias_laterales_ventaRapida li div');
    elementosliDiv.forEach(div => {
        div.classList.remove('index_menuItemActive_bAiPX');
    });
    //se lo pongo al primero
    const element = document.querySelector('div[data-testid="basket-menu-quick-sale"]');
    if (element) {
    element.classList.add('index_menuItemActive_bAiPX');
    }
     // Ocultar todos los divs de contenido
    document.querySelectorAll('.divContenedorVentaRapida').forEach(contentDiv => {
        contentDiv.classList.add('d-none');
    });

    // Mostrar el div correspondiente
    const matchingDiv = document.querySelector(`.divContenedorVentaRapida.basket-menu-quick-sale`);
    if (matchingDiv) {
        matchingDiv.classList.remove('d-none');
    }
}


//PESTAÑAS LATERALES VENTA RÁPIDA
document.querySelectorAll('.pestanias_laterales_ventaRapida li').forEach(li => {
    li.onclick = function () {

        //comprobar si están en la misma pestaña que clicaron para que no haga nada si es afirmativo
        const divDentroDeLi = li.querySelector('div');
        // ⚠️ Verificar si ya está activa la pestaña
        if (divDentroDeLi.classList.contains('index_menuItemActive_bAiPX')) {
            return; // No hacer nada si ya está activa
        }

        reseteoVistaVentaPago();
        // quitar la clase selected a todos los li y poner al seleccionado
        let elementosliDiv = document.querySelectorAll('.pestanias_laterales_ventaRapida li div');
        elementosliDiv.forEach(div => {
            div.classList.remove('index_menuItemActive_bAiPX');
        });
        li.querySelector('div').classList.add('index_menuItemActive_bAiPX');

        // Obtener el atributo data-testid del <div> hijo dentro del <li>
        const dataTestId = li.querySelector('div')?.getAttribute('data-testid');
        if (!dataTestId) return;

        // Ocultar todos los divs de contenido
        document.querySelectorAll('.divContenedorVentaRapida').forEach(contentDiv => {
            contentDiv.classList.add('d-none');
        });

        // Mostrar el div correspondiente
        const matchingDiv = document.querySelector(`.divContenedorVentaRapida.${dataTestId}`);
        if (matchingDiv) {
            matchingDiv.classList.remove('d-none');
        }


        if(dataTestId === 'basket-menu-appointments'){
            reservasFinalizadasPendientesPago();

            manejarLoaderTarjetasUniversal('loaderVentaRapidaNotPAY');
        }else if (dataTestId === 'basket-menu-quick-sale'){
            manejarLoaderTarjetasUniversal('loaderVentaRapidaLiveWire');
        }

    };
});

function manejarLoaderTarjetasUniversal(id_loader){
    const loader = document.getElementById(id_loader);

    const isHidden = loader.classList.contains('d-none');

    if (isHidden) {
        // Mostrar loader
        loader.classList.remove('d-none');

        // Ocultarlo luego de 3 segundos
        setTimeout(() => {
            loader.classList.add('d-none');
        }, 3000);
    } else {
        // Si ya está visible, ocultarlo luego de 3 segundos
        setTimeout(() => {
            loader.classList.add('d-none');
        }, 3000);
    }
}


//función que llama a las reservas sin pagar y finalizadas
async function reservasFinalizadasPendientesPago(){
   try {
    const response = await fetch('reserv-end-noPay');

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }


    const data = await response.json();
    reservasAgrupadasArray = [];
    reservasAgrupadasArray = data.hoy.concat(data.ayer, data.otros);
    reservasAgrupadasArray = agruparReservasPorMultiple( reservasAgrupadasArray);
    //console.log('Reservas filtradas:', data);
    console.log(reservasAgrupadasArray, "ARRAY RESERVAS AGRUPADAS");

    //RESERVAS HOY
    let bokingItemsHoy = '';
    let reservasHoyAgrupadas = agruparReservasPorMultiple( data.hoy);
    reservasHoyAgrupadas.forEach((reserva, index) => {
        bokingItemsHoy += construirTrajetasServiciosNoPay(reserva);
    });
    let contenedorReservasHoy = document.querySelector('.booking-notPay_end_hoy');
    $(contenedorReservasHoy).empty();

    if(bokingItemsHoy === ''){
    }else{
         $(contenedorReservasHoy).append(`
            <div class="txt--uppercase size--12 color-08 margin-bottom-16">Hoy</div>
            ${bokingItemsHoy}
        `);
    }

    //RESERVAS AYER
    let bokingItemsAyer = '';
    let reservasAyerAgrupadas = agruparReservasPorMultiple( data.ayer);
        reservasAyerAgrupadas.forEach((reserva, index) => {
            bokingItemsAyer += construirTrajetasServiciosNoPay(reserva);
        });
    let contenedorReservasAyer = document.querySelector('.booking-notPay_end_ayer');
    $(contenedorReservasAyer).empty();
     if(bokingItemsAyer === ''){
    }else{
         $(contenedorReservasAyer).append(`
            <div class="txt--uppercase size--12 color-08 margin-bottom-16">Ayer</div>
            ${bokingItemsAyer}
        `);
    }

    //RESERVAS ANTIGUAS
    let bokingItemsAntiguas = '';
    let reservasAntiguasAgrupadas = agruparReservasPorMultiple( data.otros);
        reservasAntiguasAgrupadas.forEach((reserva, index) => {
            bokingItemsAntiguas += construirTrajetasServiciosNoPay(reserva);
        });
    let contenedorReservasAntiguas = document.querySelector('.booking-notPay_end_resto');
    $(contenedorReservasAntiguas).empty();
    if(bokingItemsAntiguas === ''){
    }else{
         $(contenedorReservasAntiguas).append(`
            ${bokingItemsAntiguas}
        `);
    }
    if(bokingItemsHoy === '' && bokingItemsAyer === '' && bokingItemsAntiguas === ''){
        $(contenedorReservasHoy).empty();
        $(contenedorReservasAyer).empty();
        $(contenedorReservasAntiguas).empty();
        document.querySelector('.booking-notPay_end_all33').classList.add('d-none');
        document.querySelector('.noHayTransaccionesParaCobrar').classList.remove('d-none');
    }else{
        document.querySelector('.booking-notPay_end_all33').classList.remove('d-none');
        document.querySelector('.noHayTransaccionesParaCobrar').classList.add('d-none');
    }
    desactivarLoaderUniversal('loaderVentaRapida');
    //  manejarLoaderTarjetasUniversal('loaderVentaRapidaNotPAY');
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
  }
}

async function reservasFuturasPendientesPago(){
   try {
    const response = await fetch('reserv-future-noPay');

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }


    const data = await response.json();
    reservasAgrupadasArray = [];
    reservasAgrupadasArray = data.hoy.concat(data.maniana, data.otros);
    reservasAgrupadasArray = agruparReservasPorMultiple( reservasAgrupadasArray);
    //console.log('Reservas filtradas:', data);
    // console.log(reservasAgrupadasArray, "ARRAY RESERVAS AGRUPADAS");

    //RESERVAS HOY
    let bokingItemsHoy = '';
    let reservasHoyAgrupadas = agruparReservasPorMultiple( data.hoy);
    reservasHoyAgrupadas.forEach((reserva, index) => {
        bokingItemsHoy += construirTrajetasServiciosNoPay(reserva);
    });
    let contenedorReservasHoy = document.querySelector('.booking-notPay_end_hoy');
    $(contenedorReservasHoy).empty();

    if(bokingItemsHoy === ''){
    }else{
         $(contenedorReservasHoy).append(`
            <div class="txt--uppercase size--12 color-08 margin-bottom-16">Hoy</div>
            ${bokingItemsHoy}
        `);
    }

    //RESERVAS AYER
    let bokingItemsAyer = '';
    let reservasAyerAgrupadas = agruparReservasPorMultiple( data.maniana);
        reservasAyerAgrupadas.forEach((reserva, index) => {
            bokingItemsAyer += construirTrajetasServiciosNoPay(reserva);
        });
    let contenedorReservasAyer = document.querySelector('.booking-notPay_end_ayer');
    $(contenedorReservasAyer).empty();
     if(bokingItemsAyer === ''){
    }else{
         $(contenedorReservasAyer).append(`
            <div class="txt--uppercase size--12 color-08 margin-bottom-16">Mañana</div>
            ${bokingItemsAyer}
        `);
    }

    //RESERVAS ANTIGUAS
    let bokingItemsAntiguas = '';
    let reservasAntiguasAgrupadas = agruparReservasPorMultiple( data.otros);
        reservasAntiguasAgrupadas.forEach((reserva, index) => {
            bokingItemsAntiguas += construirTrajetasServiciosNoPay(reserva);
        });
    let contenedorReservasAntiguas = document.querySelector('.booking-notPay_end_resto');
    $(contenedorReservasAntiguas).empty();
    if(bokingItemsAntiguas === ''){
    }else{
         $(contenedorReservasAntiguas).append(`
            ${bokingItemsAntiguas}
        `);
    }
    if(bokingItemsHoy === '' && bokingItemsAyer === '' && bokingItemsAntiguas === ''){
        $(contenedorReservasHoy).empty();
        $(contenedorReservasAyer).empty();
        $(contenedorReservasAntiguas).empty();
        document.querySelector('.booking-notPay_end_all33').classList.add('d-none');
        document.querySelector('.noHayTransaccionesParaCobrar').classList.remove('d-none');
    }else{
        document.querySelector('.booking-notPay_end_all33').classList.remove('d-none');
        document.querySelector('.noHayTransaccionesParaCobrar').classList.add('d-none');
    }
    //  manejarLoaderTarjetasUniversal('loaderVentaRapidaNotPAY');
    desactivarLoaderUniversal('loaderVentaRapida');
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
  }
}

//devuelve todo el html de reservas no pagadas en venta rápida
function construirTrajetasServiciosNoPay(reservaHoy){
    // console.log(reservaHoy, "construir tarjeta not pay");

    let htmlServiciosHoy = '';
    // console.log(reservaHoy, "RESERVA HOY");
    let fecha = '';
    let dia = '';
    let mes = '';
    let hora = '';
    let divfechaHora = '';
    let divTotal = '';
    if(reservaHoy.tipo === 'simple'){
        // console.log(reservaHoy.reservas[0], "reserva simple");
        fecha = new Date(reservaHoy.reservas[0].date_time);
        dia = fecha.getDate();
        mes = fecha.toLocaleString('es-ES', { month: 'short' });
        hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        divfechaHora = `
        <div class="appointment-date_date_UsCxi">
            <div class="appointment-date_month_nFAjw appointment-date_size--12_Z4is5">${mes}.</div>
            <div class="appointment-date_day_zpfF4 appointment-date_size--20_BC_a_">${dia}</div>
            <div class="appointment-date_hour_isz2C appointment-date_size--12_Z4is5">${hora}</div>
        </div>
        `;
        divTotal =`
        <div class="appointment_total_tXjTE appointment_size--16-sb_hG9l7">${reservaHoy.reservas[0].total_payment}€</div>
        `;
        htmlServiciosHoy = `
        <div class="service-variant_item_Cye7B appointment_appointment_LmBLD booking-items_appointmentItem_hsek1" data-testid="booking-item" data-bs-toggle="modal" data-bs-target="#asignarVentaReservaNoPay" data-index="${reservaHoy.reservas[0].id}" onclick="cargarDatosReservaNoPay(${reservaHoy.reservas[0].id}, this);insertDateNotModalNotPay()">
            ${divfechaHora}
            <div class="appointment_info_QK4CC">
                <div class="style_status_xxjlV style_statusDefault_HPmTE style_status--xs_vvmA5 style_statusUpperCase_bkX7Z style_statusGreen_lW62O margin-bottom-4">${reservaHoy.reservas[0].status}</div>
                <div class="appointment-service_service_KFga9">
                    <div class="appointment-service_serviceBar_d_tAg" style="border-color:${reservaHoy.reservas[0].servicio.borderColor};"></div>
                    <div class="appointment-service_serviceHeader_qO6qz appointment-service_size--14__gGWE margin-left-12">
                        ${
                            reservaHoy.reservas[0].user
                            ? capitalizarNombreCompleto(
                                `${reservaHoy.reservas[0].user.name} ${reservaHoy.reservas[0].user.primer_apellido ?? ''} ${reservaHoy.reservas[0].user.segundo_apellido ?? ''}`
                                )
                            : 'Cliente sin cita previa'
                        }
                    </div>

                    <div class="appointment-service_serviceSubHeader_OGHVA appointment-service_size--12_Hog21 margin-left-12">${reservaHoy.reservas[0].servicio.nombre}</div>
                </div>
            </div>
             <div class="appointment_additionals_Eg8kg">

            </div>
            ${divTotal}
        </div>
        `;
    }else{
        // console.log(reservaHoy, "RESERVA HOY es multiple");

        const reservas = reservaHoy.reservas;
        let servicioConCliente = '';
        let serviciosSinCliente = '';
        // let index_id = '';
        divTotal =`
            <div class="appointment_total_tXjTE appointment_size--16-sb_hG9l7">${reservaHoy.total}€</div>
        `;
        reservas.forEach((reserva, index) => {
            const color = reserva.servicio?.borderColor || 'rgb(0,0,0)';
            const nombreServicio = reserva.servicio?.nombre || 'Servicio';
            const nombreCliente = reserva.user
            // const index_id = reserva.multiple_id
            ? capitalizarNombreCompleto(
                `${reserva.user.name} ${reserva.user.primer_apellido ?? ''}`.trim()
                )
            : 'Cliente sin cita previa';


            if (index === 0) {
                servicioConCliente = `
                <div class="appointment-service_service_KFga9">
                    <div class="appointment-service_serviceBar_d_tAg" style="border-color: ${color};"></div>
                    <div class="appointment-service_serviceHeader_qO6qz appointment-service_size--14__gGWE margin-left-12">${nombreCliente}</div>
                    <div class="appointment-service_serviceSubHeader_OGHVA appointment-service_size--12_Hog21 margin-left-12">${nombreServicio}</div>
                </div>
                `;
            } else {
                serviciosSinCliente += `
                <div class="appointment-service_service_KFga9 margin-top-12">
                    <div class="appointment-service_serviceBar_d_tAg" style="border-color: ${color};"></div>
                    <div class="appointment-service_serviceSubHeader_OGHVA appointment-service_size--12_Hog21 margin-left-12">${nombreServicio}</div>
                </div>
                `;
            }
            if(index === reservas.length -1){
                fecha = new Date(reserva.date_time);
                dia = fecha.getDate();
                mes = fecha.toLocaleString('es-ES', { month: 'short' });
                hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                divfechaHora = `
                    <div class="appointment-date_date_UsCxi">
                        <div class="appointment-date_month_nFAjw appointment-date_size--12_Z4is5">${mes}.</div>
                        <div class="appointment-date_day_zpfF4 appointment-date_size--20_BC_a_">${dia}</div>
                        <div class="appointment-date_hour_isz2C appointment-date_size--12_Z4is5">${hora}</div>
                    </div>
                `;
            }
        });

        htmlServiciosHoy = `
        <div class="service-variant_item_Cye7B appointment_appointment_LmBLD booking-items_appointmentItem_hsek1" data-testid="booking-item" data-bs-toggle="modal" data-bs-target="#asignarVentaReservaNoPay" data-index="${reservaHoy.multiple_id}" onclick="cargarDatosReservaNoPay(${reservaHoy.multiple_id}, this);insertDateNotModalNotPay();">
            ${divfechaHora}
            <div class="appointment_info_QK4CC">
                <div class="style_status_xxjlV style_statusDefault_HPmTE style_status--xs_vvmA5 style_statusUpperCase_bkX7Z style_statusGreen_lW62O margin-bottom-4">
                ${reservaHoy.status}
                </div>
                ${servicioConCliente}
                ${serviciosSinCliente}
            </div>
            <div class="appointment_additionals_Eg8kg">

            </div>
            ${divTotal}
         </div>
        `;

    }

    return htmlServiciosHoy;
}

//poner primera letra en mayuscula
function capitalizarNombreCompleto(nombreCompleto) {
  return nombreCompleto
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}


// agrupa las reservas multiples
function agruparReservasPorMultiple(reservas) {
    // console.log(reservas);

  const agrupadas = [];
  const procesadas = new Set();

  reservas.forEach(reserva => {
    if (procesadas.has(reserva.id)) return;

    if (reserva.multiple !== null) {
      const grupo = reservas.filter(r => r.multiple === reserva.multiple);
      grupo.forEach(r => procesadas.add(r.id));

      agrupadas.push({
        tipo: 'multiple',
        multiple_id: reserva.multiple,
        reservas: grupo,
        usuario: reserva.user,
        status: reserva.status,
        fecha: reserva.date_time,
        total: reserva.reserva_servicio.total_payment
      });
    } else {
      procesadas.add(reserva.id);

      agrupadas.push({
        tipo: 'simple',
        reservas: [reserva],
        usuario: reserva.user,
        status: reserva.status,
        fecha: reserva.date_time,
        total: reserva.total_payment
      });
    }
  });

  return agrupadas;
}


//CUANDO CLICAS EN UNA VENTA SIN COBRAR carda los datos en el modal
function cargarDatosReservaNoPay(id_reserva, elementoClicado){
    // console.log(id_reserva, "ID DE LA RESERVA CLICADA");
    // console.log(elementoClicado, "ELEMENTO CLICADO");
    //obtenemos la reserva del array global reservasAgrupadasArray
    let reservaSeleccionada = null;
    for(let reserva of reservasAgrupadasArray){
        if(reserva.tipo === 'simple' && reserva.reservas[0].id === id_reserva){
            reservaSeleccionada = reserva;
            break;
        }else if(reserva.tipo === 'multiple' && reserva.multiple_id === id_reserva){
            reservaSeleccionada = reserva;
            break;
        }
    }
    if(!reservaSeleccionada) return;
    // console.log(reservaSeleccionada, "RESERVA SELECCIONADA");
    reservaSeleccionadaNotPayGloval = null;
    reservaSeleccionadaNotPayGloval = reservaSeleccionada;
    // console.log(reservaSeleccionadaNotPayGloval, "GLOBAL");

/*  obtener la lista ul class: listaServiciosNotPayModal he insertar tantas li como servicios tenga la reserva
    si la reserva seleccionada es simple insertar solo una
*/
    const contenedor = document.querySelector('.listaServiciosNotPayModal');
    contenedor.innerHTML = ''; // Limpiar contenido anterior
    //guardamos la reseva seleccionada en array gloval
    reservaSeleccionadaNoPay = [];
    reservaSeleccionadaNoPay = reservaSeleccionada
    reservaSeleccionada.reservas.forEach(reserva => {
        const servicio = reserva.servicio;
        const empleada = reserva.empleada;
        const li_id_reserva = reserva.id
        let imagenEmpleado ='';
        let iniciales='';
        // console.log(empleada);
        if(empleada){
            let nombreEmpleada = `${empleada.nombre} ${empleada.primerApellido}`;
            iniciales = obtenerIniciales2(nombreEmpleada);
            imagenEmpleado =`
                <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ${iniciales} </div>
            `;
        }else{
            imagenEmpleado =`
                 <div class="b-avatar_avatarImage_u3RVD" style="background-image: url(https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/no-staffer.79c3c577.svg);"></div>
            `;
        }


        // Duración formateada
        let duracionTexto = '';
        if (servicio.horaNewService > 0) {
            duracionTexto = `(${servicio.horaNewService}h ${servicio.minutosNewService}min)`;
        } else {
            duracionTexto = `(${servicio.minutosNewService}min)`;
        }

        // Crear el elemento li
        const li = document.createElement('li');
        li.setAttribute('data-li-index', li_id_reserva);
        li.innerHTML = `
            <div class="row items-center txt--left" style="margin-left: -4px;">
                <div class="col">
                    <div class="staff-commission-modal_serviceBorder_abb67" style="border-color:${servicio.borderColor};">
                        <div class="size--14">
                            ${servicio.nombre} ${duracionTexto}
                        </div>
                        <div class="size--12 color-08"> ${servicio.precio}€ </div>
                    </div>
                </div>
                <div class="col col-5">
                    <div class="b-dropdown_dropdown_SqLbd">
                        <div>
                            <label class="size--12 color-08 select-staffer_label_tsQBi"> Empleado </label>
                            <div data-date="staffer-select-opendropdown" class="select-staffer_stafferInputSelect_Diw1V" onclick="openModalEmpleAreservNoPay();">
                                <div title="${empleada ? empleada.nombre + ' ' + empleada.primerApellido : 'No hay asignación de personal'}"
                                    class="titleEmpleadoReservNotPay padding-0 b-avatar_avatar_pJzSu b-avatar_avatarHasImage_i8yay"
                                    style="width: 40px; height: 40px; flex: 0 0 40px;">
                                    ${imagenEmpleado}
                                </div>
                                <div data-index="${empleada ? empleada.id : 'cualquiera'}"
                                    class="nombreEmpleadoReservNotPay margin-left-8 size--16 txt--ellipsis size--16-sb">
                                    ${empleada ? empleada.nombre + ' ' + empleada.primerApellido : 'No hay asignación de personal'}
                                </div>
                                <span class="margin-left-auto b-icon iconFont icon-arrow-down"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="margin-top-12 margin-bottom-12">
        `;

        contenedor.appendChild(li);
    });
}


// BOTON GUARDAR DE RESERVAS SIN COBRAR
async function insertDateServiceNotPay() {
//variable gloval para guardar la reserva seleccionada : reservaSeleccionadaNoPay
// console.log(reservaSeleccionadaNoPay, "reserva seleccionadaNotPay");
let id_reservaParaAtributo = reservaSeleccionadaNoPay.reservas[0].id;

//si la reserva es simple poner el atributo data-idReserv ya que luego lo necesita para el id del recibo
document.querySelector('.basket-layout_sidebar_X6qEm').setAttribute("data-idReserv", id_reservaParaAtributo);

let divllenar = document.querySelector('.basketFull');
let listaTransacciones = document.querySelector('.basket-transactions-list');
let htmlContentVentaRapida = '';
//comprobar si el cesto está vacio
let divCestoVacio = document.querySelector('.index_basketEmpty_VF3Lr');
let cestoLleno = divCestoVacio.classList.contains('d-none');
//COMPROBAR SI HAY USUARIO
if(reservaSeleccionadaNoPay.usuario){
    insertarTarjetaClienteSelecionado(reservaSeleccionadaNoPay.usuario, '.basket-customer-card0101', 'card_empty_ventas');
}

//comprobar si ha cambido el empleado, cogiendo el id de todos los class nombreEmpleadoReservNotPay atributo data-index = id del empelado
const liElements = document.querySelectorAll('.listaServiciosNotPayModal li');

    const fetchEmpleadoById = (empleadoId) => {
        return fetch("get-empleadoById", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json'
            },
            body: JSON.stringify({ empleado_id: empleadoId })
        }).then(response => {
            if (!response.ok) throw new Error("Error al obtener datos del nuevo empleado");
            return response.json();
        });
    };

    // 1️⃣ Primero detectamos cambios de empleados y los actualizamos si es necesario
    const updates = [];

    reservaSeleccionadaNoPay.reservas.forEach((reserva) => {
        const li = Array.from(liElements).find(el => el.getAttribute('data-li-index') == reserva.id);
        if (!li) return;

        const empleadoDiv = li.querySelector('.nombreEmpleadoReservNotPay');
        if (!empleadoDiv) return;

        const nuevoEmpleadoId = empleadoDiv.getAttribute('data-index');

        if (reserva.empleada && reserva.empleada.id != nuevoEmpleadoId) {
            // console.log(`Empleado cambiado en reserva ID ${reserva.id}. Se va a actualizar.`);

            const update = fetchEmpleadoById(nuevoEmpleadoId)
                .then(data => {
                    reserva.empleada = data.empleado || data;
                })
                .catch(error => {
                    console.error(`Error al actualizar empleado para reserva ${reserva.id}:`, error);
                });

            updates.push(update);
        }
    });

    // 2️⃣ Esperar a que todos los cambios de empleados terminen
    await Promise.all(updates);

    //una vez actualizado el empleado seguimos
reservaSeleccionadaNoPay.reservas.forEach((reserva, index) => {
    // console.log(reserva);
    let nombreEmpleada = `${reserva.empleada.nombre} ${reserva.empleada.primerApellido}`;
    // let total = reserva.multiple ? reserva.reserva_servicio.total_payment : reserva.total_payment;
    let precioServicico = reserva.servicio.precio;
    insertarServicioEmpleadoArrayVentaRapida(reserva.service_id, nombreEmpleada, parseFloat(precioServicico), reserva.empleada.id);
    insertarVentaRapidaSoloIds(reserva.service_id);
});
if(cestoLleno){
    reservaSeleccionadaNoPay.reservas.forEach((reserva, index) => {
        let descuento = serviciosVentaRapida[index].descuento_servicio;
        let li_index = index;
        let servicio_idArray = serviciosVentaRapida[index].idServicio;
        let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
        let precioAsignar = serviciosVentaRapida[index].precio;
        let nomBreServicio = reserva.servicio.nombre;
         // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
        htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
            li_index,
            nomBreServicio,
            comprobar603090SinM(reserva.servicio.duration),
            precioAsignar,
            nombreApellidoEmpleA,
            servicio_idArray,
            descuento
        );
    });
    // Agregar todo el contenido generado al contenedor nuevo
    $(listaTransacciones).empty();
    $(listaTransacciones).append(htmlContentVentaRapida);
        // actualizar totales
    actualizarTotalSubtotal();
    actualizarDescuentoTotal();
}else{
    divCestoVacio.classList.add('d-none');
    divllenar.classList.remove("d-none");
    reservaSeleccionadaNoPay.reservas.forEach((reserva, index) => {
        let descuento = serviciosVentaRapida[index].descuento_servicio;
        let li_index = index;
        let servicio_idArray = serviciosVentaRapida[index].idServicio;
        let nombreApellidoEmpleA = serviciosVentaRapida[index].nombre_Empleado;
        let precioAsignar = serviciosVentaRapida[index].precio;
        let nomBreServicio = reserva.servicio.nombre;
         // Construir HTML construirHtmlTarjetasVentaRapida(nombreServicio, duracionServicio, precio, nombreApellidosEmpleado, inicialesEmpleado)
        htmlContentVentaRapida += construirHtmlTarjetasVentaRapida(
            li_index,
            nomBreServicio,
            comprobar603090SinM(reserva.servicio.duration),
            precioAsignar,
            nombreApellidoEmpleA,
            servicio_idArray,
            descuento
        );
    });

    $(listaTransacciones).empty();
    $(listaTransacciones).append(htmlContentVentaRapida);
     actualizarTotalSubtotal();
    }
    grupoBotonesMostrarVentaRapidan('.botonesEnabledVentaRapidaSoloPapelera');
    //ponemos pestaña y div en ventaRápida
    reiniciarPestaniaVentaRapida()
}

//LOADER TARJETAS
 if(document.getElementById('loaderVentaRapidaLiveWire')){
        setTimeout(() => {
            document.getElementById('loaderVentaRapidaLiveWire').classList.add('d-none')

        }, 4000);
    }
//pestañas

//PESTAÑA "POR COBRAR"
// cambiar citas, sin terminar tasa cancelación
 const items = document.querySelectorAll('li.li-citas-finalizar-tasas');
    items.forEach(item => {
        item.addEventListener('click', function () {
            // ✅ Evitar acciones si ya está activa
            if (this.classList.contains('b-tabs_tabBorderedActive_ff9lg')) {
                return;
            }
            // manejarLoaderTarjetasUniversal('loaderVentaRapidaNotPAY');
            activarLoaderUniversal('loaderVentaRapida');
            items.forEach(el => el.classList.remove('b-tabs_tabBorderedActive_ff9lg'));
            this.classList.add('b-tabs_tabBorderedActive_ff9lg');

            //cambiamos vistas
            let dataTestitContent = item.getAttribute('data-testid');
            if(dataTestitContent.trim() === 'sales'){
                // showDivCitaSinFinalizarTasas('booking-notPay_end_all33');

                reservasFinalizadasPendientesPago();
            }else if(dataTestitContent.trim() === 'nav_unfinished'){
                // showDivCitaSinFinalizarTasas('booking-notPay_activas_all33');
                // activarLoaderUniversal('loaderVentaRapida');
                reservasFuturasPendientesPago();
                // manejarLoaderTarjetasUniversal('loaderVentaRapidaNotPAY');
            }
            // desactivarLoaderUniversal('loaderVentaRapida');
        });
    });

//MODIFICAR DATOS DE LA RESERVA EN OFFCANVAS INFO RESERV
//clic en cancelar cambios
if(document.getElementById('uid-771-input-infoReserv')){
    document.getElementById('uid-771-input-infoReserv').addEventListener('click', function(){
        document.getElementById('modalDescartarCambiosInfoReserv').style.display = 'flex';
    });
}

//clic en CANCELAR CAMBIOS
if(document.getElementById('uid-2299-input')){
    // console.log("cancelar cambios");

    document.getElementById('uid-2299-input').addEventListener('click', function(){
        document.getElementById('modalDescartarCambiosInfoReserv').style.display = 'none';
        // revertirServiciosEliminados();
        closedOffcanvasInfoReserv();
        showDivBotonGuardarInfo('reservCobrarFooterInfo');
    });
}

//clic en NO CANCELAR CAMBIOS
if(document.getElementById('uid-2300-input')){
    document.getElementById('uid-2300-input').addEventListener('click', function(){
        document.getElementById('modalDescartarCambiosInfoReserv').style.display = 'none';
    });
}

//clic en guardar cambios modificar reserva ABRE MODAL DE SEGURO QUE QUIERES GUARDAR
if(document.getElementById('uid-772-input-infoReserv')){
    document.getElementById('uid-772-input-infoReserv').addEventListener('click', function(event){
        event.preventDefault();
        // console.log("clic en guardar modificación");
        document.getElementById('modalSeguroGuardarCambiosInfoReserv').style.display = 'flex';
    });
}

//clic en SI GUARDAR CAMBIOS desde modificar cita en calendar
if(document.getElementById('uid-2299-input_siGuadarCambios')){
    document.getElementById('uid-2299-input_siGuadarCambios').addEventListener('click', function(){
        // general
        activarLoaderUniversal('loaderSperaAdministrator');
        document.getElementById('modalSeguroGuardarCambiosInfoReserv').style.display = 'none';
        // activarLoaderUniversal('loaderSperaAdministrator');
        let dateTime1= document.querySelector('.fechaCitaInfo').getAttribute('data-datepiker');
        // document.getElementById('datePikerfechaCitaInfo2').setAttribute('data-datepiker', dateTimePoner);
        let datosReservaGeneral = obtenerDatosGeneralesGuardarReserva('.totalPagarNewReservCalendar', 'datePikerfechaCitaInfo2');

        //obtener la reserva a modificar
        let id_reserva_modificar ='';
        if(eramultiple && servicesWithTimes.length === 1){
            id_reserva_modificar = infoArrayEnvio[0].extendedProps.multiple;
        }else{
            id_reserva_modificar = document.getElementById('eventDetailsModal').getAttribute('data-idreserv');
        }

        let modificar_reserva ='';

        getConfiguracionReservas(function(configuraciones){
            let confirmacionAutomaticaCalendar = configuraciones[0].confirmacion_automatica;
            confirmacionAutomaticaCalendar = confirmacionAutomaticaCalendar === 'si' ? 'confirmed' : 'pending';

            //sólo hay un servicio
            if(servicesWithTimes.length === 1 || servicesWithTimes.length === 0){
                // console.log("dentro length=0", servicesWithTimes, infoArrayEnvio);

                servicesWithTimes = [];
                selectedServiceIds = [];
                let idServicio = document.querySelector('.getOldService').getAttribute('data-idserviceadd');
                selectedServiceIds.push(idServicio);

                //obtenemos la fecha YYYY-MM-DD
                let fecha = formatearFeAnio(datosReservaGeneral.dateTime1);
                meterHorasArrayInicioNoTimeOut('.slotHorasCobrarServicio', '.slotHoraFinCorbrarServicio', '.slotEmpleadoAddInicio', datosReservaGeneral.seleccionaCliente_valor, fecha);
                let datosReservaGeneral2 = obtenerDatosGeneralesGuardarReserva2(confirmacionAutomaticaCalendar, dateTime1);

                let start = formatFechaConHora(dateTime1, datosReservaGeneral2.horaInicio);  // Fecha y hora de inicio
                let fechaInicial = start.split('T')[0];

                modificar_reserva = "modificar-reservaCalendar";
                $.ajax({
                    url: modificar_reserva,
                    method: 'POST',
                    data: {
                        id_reserva_modificar: id_reserva_modificar,
                        _token: datosReservaGeneral.csrfToken,
                        service_id: servicesWithTimes[0].id,
                        date_time: datosReservaGeneral2.dateTimeCalendar,
                        status: datosReservaGeneral2.confirmacionAutomaticaCalendar,
                        duration: datosReservaGeneral2.durationCalendar,
                        empleada_id: servicesWithTimes[0].id_empleado,
                        nota: null,
                        user_id: datosReservaGeneral.userIdCalendar,
                        total_payment: datosReservaGeneral.total_pagarReservaNewCalendar,
                        empleado_seleccionado:servicesWithTimes[0].seleccionaCliente,
                        nota_interna: datosReservaGeneral.notaInternaCalendar,
                        mensaje_cliente:datosReservaGeneral.mensaje_for_client,
                        eramultiple: eramultiple,
                    },
                    success: function(response) {
                        const reserva_actualizada = response.reservaActualizada;
                        // console.log(reserva_actualizada);

                        if(reserva_actualizada === true){
                            // console.log("shownewReservPlantilla");

                            showAllNewReservCalendarPlantilla();
                            $('#eventDetailsModal').offcanvas('hide');
                            resetArrays();
                            estrecharCalendario();
                            initializeCalendar();
                            //para calendar gotodate
                            calendar.gotoDate(fechaInicial);
                            desactivarLoaderUniversal('loaderSperaAdministrator');
                            insertMessageResolAction('Reserva Modificada con éxito', '#Citas_administrator', datosReservaGeneral.stylos, "ok");
                            showDivBotonGuardarInfo('reservCobrarFooterInfo');
                            enablePointerEvents();
                        }else{
                            alert('Atención!! '+response.mensaje);
                            desactivarLoaderUniversal('loaderSperaAdministrator');
                            // enablePointerEvents();
                        }
                    },
                    error: function(xhr) {
                        // enablePointerEvents();

                        let mensaje = 'Error inesperado';

                        // 🔥 MENSAJE REAL DEL BACKEND
                        if (xhr.responseJSON && xhr.responseJSON.mensaje) {
                            mensaje = xhr.responseJSON.mensaje;
                        }

                        alert('Atención!! ' + mensaje);
                        desactivarLoaderUniversal('loaderSperaAdministrator');
                    }
                });
            }else{
                //múltiples servicios
                let horaInicio = servicesWithTimes[0].horaInicio;
                let start = formatFechaConHora(dateTime1, horaInicio);  // Fecha y hora de inicio
                let fechaInicial = start.split('T')[0];
                servicesWithTimes.forEach(service => {
                    service.date_time = formatearFecha4(dateTime1, service.horaInicio);
                });
                modificar_reserva = "modificar-reservaCalendar-multiple";
                // console.log(servicesWithTimes, "SI GUARDAR CAMBIOS");

                $.ajax({
                    url: modificar_reserva,
                    method: 'POST',
                    data: {
                        id_reserva_modificar: id_reserva_modificar,
                        _token: datosReservaGeneral.csrfToken,
                        arrayCompleto: JSON.stringify(servicesWithTimes),
                        date_time1: dateTime1,
                        status: confirmacionAutomaticaCalendar,
                        user_id: datosReservaGeneral.userIdCalendar,
                        total_payment: datosReservaGeneral.total_pagarReservaNewCalendar,
                        nota_interna: datosReservaGeneral.notaInternaCalendar,
                        mensaje_cliente: datosReservaGeneral.mensaje_for_client,
                        nota: null,
                        multiple: 1,
                        id_reserva_simple: id_reserva_simple
                    },
                    success: function(response) {
                        const reserva_creada = response.reservaActualizada;
                        const motivo = response.mensaje;
                        if (reserva_creada === true) {
                            showAllNewReservCalendarPlantilla();
                            $('#eventDetailsModal').offcanvas('hide');
                            resetArrays();
                            estrecharCalendario();
                            initializeCalendar();
                            calendar.gotoDate(fechaInicial);
                            desactivarLoaderUniversal('loaderSperaAdministrator');
                            insertMessageResolAction('Reserva múltiple actualizada con éxito', '#Citas_administrator', datosReservaGeneral.stylos, "ok");
                            showDivBotonGuardarInfo('reservCobrarFooterInfo');
                            enablePointerEvents();
                        } else {
                            // console.log(reprogramarCita, "ANTES DEL MOTIVO");
                            alert(motivo+ " hola");
                             if(reprogramarCita === true){
                                     //ponemos la antigua
                                    history.pushState({}, "", oldUrlReprogramarCita);
                                    reprogramarCita=false;
                                    idCitaReprogramar='';
                                    oldUrlReprogramarCita='';
                                }
                            desactivarLoaderUniversal('loaderSperaAdministrator');
                            // enablePointerEvents();
                        }
                    },
                    error: function(xhr) {
                        // console.log('Error al obtener las horas', xhr);
                    }
                });
            }
        });
    });
}

//clic en CANCELAR GUARDAR CAMBIOS
if(document.getElementById('uid-2300-input_noGuardarCambios')){
    document.getElementById('uid-2300-input_noGuardarCambios').addEventListener('click', function(){
        document.getElementById('modalSeguroGuardarCambiosInfoReserv').style.display = 'none';
        closedOffcanvasInfoReserv();
        showDivBotonGuardarInfo('reservCobrarFooterInfo');
    });
}

//cambia los botones para guardar cambios offcanvas info reservas
function ponerBotonesGuardarCambios(){
     let offcanvasInfoReservIsOpen = comprobarSiOffcanvasInfoResevIsOpen();
    //   console.log("entro en cambiar botones. estado offcanvas:", offcanvasInfoReservIsOpen);
        if(offcanvasInfoReservIsOpen){
            showDivBotonGuardarInfo('saveChangesFooterInfoReserv');
        }
}

//MOSTRAR CITAS PROXIMAS Y PASADAS
async function actualizarCitasProxiPasada() {
    try {
        const respuesta = await fetch('actualizar-citas-proximas-pasadas');
        const datos = await respuesta.json();
        // console.log(datos, "proximas pasadas");

        const contenedorProximas = document.getElementById('citasProcimasContainer');
        const contenedorPasadas = document.getElementById('citasTerminadasContainer');
        if (contenedorProximas) contenedorProximas.innerHTML = '';
        if (contenedorPasadas) contenedorPasadas.innerHTML = '';

        datos.proximas.forEach(cita => {
            let htmlTituloConfirmadaFinaliEtc = renderEstadoCitaHTML(cita);
            let htmlTituloSegunNumero = renderServiciosSegunNumeroHTML(cita);
            let htmlPago = renderPagoHTML(cita);
            let fecha = formatearFechaCita(cita.date_time);
            if(contenedorProximas){
                contenedorProximas.innerHTML += `
                    <div class="renderizado purify_k0v4ZT-8fQhKC1hT7Aq0iQ== purify_yuDAM9gFmI4nZWPibEYwiA== purify_rVQl9be0GWxMBAq-kDQNHQ== citaProximaDiv">
                        <div class="">
                            <a onclick="mostrarDetalleCita(${cita.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCita" style="text-decoration: none;cursor: pointer;">
                                <div class="purify_+Zj7hZGL16EFdy+wDf0BwQ== purify_Rptxv+WbCltBTrvcW8QtrQ== purify_HFhzTPIOh83XROVz6Wt4AA==">
                                    <div class="purify_ifFp4rtZeiPB1hvBeJD6Tw==">
                                        ${htmlTituloConfirmadaFinaliEtc}

                                        <div class="purify_Hcg+wuoQ5pNJqZZO2m8O7w==">
                                            <div class="">
                                                <div class="purify_NNhEf2PzlSRJmXRVgyW6sw==">
                                                    ${htmlTituloSegunNumero}
                                                    <div>
                                                        ${htmlPago}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="purify_hsCP+NQTCqJkf+lbwAN4FA== purify_Sardy6hfiet162IZ2pYFPA== purify_m9mNOPjpHD0tNTW6GC+hEw== purify_9hcoDI6SWlEpcfAmG1bmSw==">
                                        <div class="">
                                        ${fecha.mesYAnio}
                                        </div>
                                        <div class="purify_FuEGVRcYA+olaP+n5-JrWA== purify_Sardy6hfiet162IZ2pYFPA== purify_r7cfvxYj81mnUA2sO2edaA==">
                                            ${fecha.dia}
                                        </div>
                                        <div></div>
                                        <div class="">
                                            ${fecha.hora}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            }
        });

        datos.pasadas.forEach(cita => {
            let htmlTituloConfirmadaFinaliEtc2 = renderEstadoCitaHTML(cita);
            let htmlTituloSegunNumero2 = renderServiciosSegunNumeroHTML(cita);
            let htmlPago2 = renderPagoHTML(cita);
            let fecha2 = formatearFechaCita(cita.date_time);
            if(contenedorPasadas){
                contenedorPasadas.innerHTML += `
                    <div class="renderizado purify_k0v4ZT-8fQhKC1hT7Aq0iQ== purify_yuDAM9gFmI4nZWPibEYwiA== purify_rVQl9be0GWxMBAq-kDQNHQ== citaProximaDiv">
                        <div class="">
                            <a onclick="mostrarDetalleCita(${cita.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCita" style="text-decoration: none;cursor: pointer;">
                                <div class="purify_+Zj7hZGL16EFdy+wDf0BwQ== purify_Rptxv+WbCltBTrvcW8QtrQ== purify_HFhzTPIOh83XROVz6Wt4AA==">
                                    <div class="purify_ifFp4rtZeiPB1hvBeJD6Tw==">
                                        ${htmlTituloConfirmadaFinaliEtc2}

                                        <div class="purify_Hcg+wuoQ5pNJqZZO2m8O7w==">
                                            <div class="">
                                                <div class="purify_NNhEf2PzlSRJmXRVgyW6sw==">
                                                    ${htmlTituloSegunNumero2}
                                                    <div>
                                                        ${htmlPago2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="purify_hsCP+NQTCqJkf+lbwAN4FA== purify_Sardy6hfiet162IZ2pYFPA== purify_m9mNOPjpHD0tNTW6GC+hEw== purify_9hcoDI6SWlEpcfAmG1bmSw==">
                                        <div class="">
                                        ${fecha2.mesYAnio}
                                        </div>
                                        <div class="purify_FuEGVRcYA+olaP+n5-JrWA== purify_Sardy6hfiet162IZ2pYFPA== purify_r7cfvxYj81mnUA2sO2edaA==">
                                            ${fecha2.dia}
                                        </div>
                                        <div></div>
                                        <div class="">
                                            ${fecha2.hora}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            }
        });

    } catch (error) {
        console.error('Error al obtener las citas:', error);
    }
}

// Formatea la fecha de la cita proxima y terminada
function formatearFechaCita(dateString) {
    const fecha = new Date(dateString);

    return {
        mesYAnio: fecha.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
        dia: fecha.getDate(),
        hora: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
}

// Renderiza el HTML de pago según el estado de la cita
function renderPagoHTML(citaProxima) {
    const esPagado = citaProxima.status === 'pagado';

    // Calcular el precio mostrado
    const precio = citaProxima.numero_servicios > 1
        ? `${citaProxima.precio_total}€`
        : `${citaProxima.servicio.precio}€`;

    // Texto del estado de pago
    const textoPago = esPagado ? 'Pago Realizado.' : 'Pago pendiente.';

    // HTML resultante
    return `
        <div class="purify_5DKVeLWnv-4fPlLWMtmBaQ==">
            <div>${textoPago}</div>
            <div data-testid="service-price">${precio}</div>
        </div>
    `;
}

// Renderiza el HTML según el estado de la cita
function renderEstadoCitaHTML(citaProxima) {
    let html = '';

    if (citaProxima.cliente_confirmo_modificacion === 'confirmado') {
        let clases = '';

        if (citaProxima.status === 'pending' || citaProxima.status === 'Finalizada') {
            clases = 'purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_YDeoXrcjLlEdNmPC-e55Hw== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==';
        } else if (citaProxima.status === 'cancelled') {
            clases = 'purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_Mq+0nEBBXOo2GlJ3m+Dovg== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==';
        } else if (citaProxima.status === 'no_asistida') {
            clases = 'bg-warning text-black purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==';
        } else if (citaProxima.status === 'confirmed') {
            clases = 'purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==';
        }

        html += `
        <div class="${clases} purify_Ks8Q8dHEaaaFeDYdNtADtw==">
            <div style="gap: 8px" class="purify_BvwlhtQUrrEk5Sq16VFwnQ== purify_QbXCjCEw-iVf0ii07PXHcA==">
                ${citaProxima.status === 'confirmed' ? `
                    <svg style="width: 20px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path fill-rule="evenodd" d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5M3 16C3 8.82 8.82 3 16 3s13 5.82 13 13-5.82 13-13 13S3 23.18 3 16m19.224-3.69a1 1 0 0 1-.034 1.414l-7.337 7a1 1 0 0 1-1.381-.001l-3.663-3.5a1 1 0 0 1 1.382-1.446l2.972 2.84 6.647-6.34a1 1 0 0 1 1.414.033" clip-rule="evenodd"></path>
                    </svg>` : ''}
                ${citaProxima.status}
            </div>
        </div>`;
    } else {
        html += `
        <div class="purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_BbCPen5nLAPoZiEuvZs9fw== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==">
            <div class="purify_BvwlhtQUrrEk5Sq16VFwnQ== purify_QbXCjCEw-iVf0ii07PXHcA==" style="display:contents">
                Por favor, confirmar
            </div>
        </div>`;
    }

    return html;
}

// Renderiza el HTML de los servicios según el número de servicios
function renderServiciosSegunNumeroHTML(citaProxima) {
    let html = `
    <div class="purify_KbwpHGxX92tcKePw27ZpHQ==">`;

    if (citaProxima.numero_servicios > 1) {
        html += `
            <div class="purify_m0iNFIlsGaFmqMFgHvuv6w== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ==">
                ${citaProxima.servicio.nombre} + ${citaProxima.numero_servicios - 1} artículos más
            </div>`;
    } else {
        html += `
            <div class="purify_m0iNFIlsGaFmqMFgHvuv6w== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ==">
                ${citaProxima.servicio.nombre}
            </div>`;
    }

    html += `</div>`;

    return html;
}

//LLAMADA A LA FUNCIÓN ACTUALIZAR RESERVAS PROXIMAS Y PASADAS CADA MINUTO
document.addEventListener('DOMContentLoaded', actualizarCitasProxiPasada);
setInterval(() => {
    if (window.location.href.includes("panel/Reservas")) {
        // console.log("estas en panel/Reservas");
        actualizarCitasProxiPasada();
    }else{
        // console.log("no estas en panel/Reservas");
    }
}, 60 * 1000); // actualiza cada minuto



//CLIC EN LOS TRES PUNTITOS DEL RECIBO EN TRANSACCIONES
let botonPuntitos1 = document.getElementById('uid-3598-input');
if(botonPuntitos1){
    botonPuntitos1.addEventListener('click', function(){
        // console.log("clic en puntitos");
        document.querySelector('.bocadilloDroponModificarRecibo').classList.toggle('d-none');

    });
}

//CLIC EN LOS ELEMENTOS DEL BOCADILLO DE LOS PUNTITOS DEL RECIBO
document.querySelectorAll('.dropdownItem_tmznt_249Clicable').forEach(item => {

    item.addEventListener('click', () => {
        // console.log("clic");

        const action = item.dataset.testid.trim();

        switch (action) {
            case 'receipt-generate-invoice':
                console.log("Generar factura");
                // Aquí va tu lógica
                break;

            case 'receipt-edit-transaction':
                console.log("Editar transacción");
                // Aquí va tu lógica
                break;

            case 'receipt-assign-sale':
                console.log("Asignar venta");
                // Aquí va tu lógica
                break;
        }
    });

});

//MANEJAR CLIC BOTONES ACEPTAR, CANCELAR O CAMBIAR MODIFICACION RESERVA
document.addEventListener('click', async (e) => {
    const boton = e.target.closest('button[data-testid]');
    if (!boton) return;

    const id = boton.dataset.testid;

    // console.log("Click en:", id);
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    switch (id) {
        case 'aceptarCamBioCita':
            // console.log("aceptar");
            let idReserva = '';
            if(document.getElementById('offcanvasCita')){
                idReserva = document.getElementById('offcanvasCita').getAttribute('data-citaid');
            }
            // console.log(idReserva, "idReserva");
            const response = await fetch('Reservas/confirmar-modificacion/' + idReserva, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    cliente_confimo_modificacion: "confirmado"
                })
            });
            const data = await response.json();

            if (data.success) {
                console.log("Modificación confirmada!");
                cerrarTodosLosOffcanvas();
                actualizarCitasProxiPasada();
            }
            break;

        case 'cancelarCambioCita':
            // acción cancelar
            console.log("cancelar");
            let idReserva2 = '';
            if(document.getElementById('offcanvasCita')){
                idReserva2 = document.getElementById('offcanvasCita').getAttribute('data-citaid');
            }
            // console.log(idReserva2, "idReserva");
            const response2 = await fetch('Reservas/obtenerReservas/' + idReserva2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    cliente_confimo_modificacion: "confirmado"
                })
            });
            const data2 = await response2.json();

            if (data2.success) {
                console.log("cancelación confirmada!");
                console.log(data2.reservas, "CANCELAR RESERVAS");
                var myModal = new bootstrap.Modal(document.getElementById('modalPreguntaCancelarCita'));
                myModal.show();
                mostrarServicios(data2.reservas);

                //mostrar fecha
                const spanFecha = document.querySelector('[data-testid="appointment-info-time"]');
                // Tomamos la primera reserva del array
                const primeraReserva = data2.reservas[0];
                let idPrimerServicioPrimeraReserva = primeraReserva.servicio.id;
                console.log(idPrimerServicioPrimeraReserva, "idPrimerareserva");

                // Formatear e insertar
                spanFecha.textContent = formatearFechaModalCancelar(primeraReserva.date_time);
                //poner datos botón reprogramar fecha
                let contenedorbotones = document.querySelector('.contenedorBotonesPreguntarCancelRepro');
                let fechaActual = obtenerFechaActualFormato();
                $(contenedorbotones).empty();
                $(contenedorbotones).append(`
                    <button type="button" data-testid="reprogramarCitaPregunta"
                        class="reprogramarCitaPregunta b-button b-line-base b-button-primary b-button-color-sea purify_kor-DHlneZEARZEgcKfFCg== purify_2mvUXxs7EcISOD+4ZEmjzw=="
                        onclick="cambiarUrl33();initDatePikerSoloMes('${idPrimerServicioPrimeraReserva}');cerrarModalPregunta();montarOffcanvasPregunta();"
                        data-dateActual="${fechaActual}" data-index="${idPrimerServicioPrimeraReserva}" data-reservas='${JSON.stringify(data2.reservas)}'
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomReserva${idPrimerServicioPrimeraReserva}" aria-controls="offcanvasBottomReserva${idPrimerServicioPrimeraReserva}">
                        <span class="b-button-text">
                        Reprogramar cita
                        </span>
                    </button>
                    <button type="button" data-testid="cancelarCitaPregunta2" class="b-button b-line-base b-button-color-red purify_kor-DHlneZEARZEgcKfFCg== purify_2mvUXxs7EcISOD+4ZEmjzw==">
                        <span class="b-button-text">
                        Cancelar cita
                        </span>
                    </button>
                `);

            }
            break;

        case 'cambiarCambioCita':
            // acción cambiar
            console.log("cambio");

            break;
    }
});

//función que agrega horaInicio y HoraFin en el array de reservas dentro del campo servicio
function agregarHoras(reservas) {
    return reservas.map(reserva => {
        const inicio = new Date(reserva.date_time);

        // duración en minutos (preferimos la duración del servicio)
        const duracion = reserva.servicio.duration ?? reserva.duration;

        // calcular fecha fin
        const fin = new Date(inicio.getTime() + duracion * 60000);

        // formatear HH:MM
        const format = d => d.toTimeString().slice(0, 5);

        return {
            ...reserva,
            servicio: {
                ...reserva.servicio,
                horaInicio: format(inicio),
                horaFin: format(fin)
            }
        };
    });
}


async function montarOffcanvasPregunta(){
    activarLoaderUniversal('loaderUniversalUser');
    let reservas1 = JSON.parse($('.reprogramarCitaPregunta').attr('data-reservas'));
    const reservas = agregarHoras(reservas1);
    let index33 = reservas[0].servicio.id ;

    //datos para guardar la reprogramacion de la cita
    reprogramarCita = true;
    idCitaReprogramar = reservas[0].id;

        const duracionTotal = reservas.reduce((total, item) => {
            return total + (item.duration || 0);
        }, 0);
        const durationText = duracionTotal.toString();

        console.log(reservas,"montarOffcanvaspregunta", duracionTotal, durationText, index33, "Duraciontotal minutos");
        const dateTime = reservas[0].date_time; // "2025-12-02 09:00:00"
        const horaActiva = dateTime.slice(11, 16);
        const horaInicio = reservas[0].date_time.split(" ")[1].substring(0, 5);
        let duration = durationText;
        let totalPrecioPagar= 0;
        // activarLoader(index33);

        if(document.getElementById('modalServiciosSeleccionados2')){
            //  console.log("SI EXITE EL MODAL");
            let modal = bootstrap.Modal.getInstance(document.getElementById('modalServiciosSeleccionados2'));
            if (modal) modal.hide();
        }else{
            console.log("NO EXITE EL MODAL");
        }

        //quitamos la clase date_active a todos los días
        let dias = document.querySelectorAll(`#carousel_dias${index33} .carrusel-inner-dias .dia`);
        dias.forEach(dia => dia.classList.remove('date_active'));

        // obtenemos los primeros 9 días visibles
        let diasVisibles = [...dias].slice(0, 9);

        diasVisibles.forEach(dia2 => dia2.classList.remove('date_active'));
        changeMont(index33, diasVisibles);

        // Recorrer cada fecha, obtener horas y calcular porcentaje
        // let primeraActivoAsignado = false;
       let fechaActiva = null;

        // Aquí guardamos los datos útiles de cada día
        let datosDias = [];

        let promesas = diasVisibles.map(async (dia) => {
            let divMarketr = dia.querySelector('.marker');
            let diaSemana = dia.getAttribute('data-diaSemana');
            let fecha55 = dia.getAttribute('data-date');

            try {
                let horasRecibidas = await obtenerHorasNoDiaActivo(fecha55, index33, duration);
                let porcentaje = calcularPorcentajeDisponibilidad(horasRecibidas, parseInt(duration), diaSemana);

                // Colorear el marcador
                if (divMarketr) {
                    if (porcentaje > 50) {
                        divMarketr.classList.remove('markerRojo', 'markerNaranja');
                        divMarketr.classList.add('markerVerde');
                        dia.classList.remove('disabledcomplet');
                    } else if (porcentaje === 0) {
                        divMarketr.classList.remove('markerNaranja', 'markerVerde');
                        divMarketr.classList.add('markerRojo');
                        dia.classList.add('disabledcomplet');
                    } else {
                        divMarketr.classList.remove('markerRojo', 'markerVerde');
                        divMarketr.classList.add('markerNaranja');
                        dia.classList.remove('disabledcomplet');
                    }
                }

                // Guardamos los datos para usarlos más tarde
                datosDias.push({
                    dia,
                    divMarketr,
                    fecha: fecha55,
                    diaSemana,
                    porcentaje
                });

                // console.log(`📅 Fecha: ${fecha55} → Porcentaje: ${porcentaje}%--.--`);

            } catch (error) {
                console.error(`❌ Error al procesar la fecha ${fecha55}:`, error);
            }
        });

        // Esperamos a que todas las promesas terminen
        await Promise.all(promesas);

        // Ordenamos por fecha (por si no vienen en orden)
        datosDias.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        // console.log(datosDias, "DATOS DIAS ORDENADOS");

        // Asignamos `.date_active` al primer día válido
        for (const datos of datosDias) {
            if (
                datos.divMarketr &&
                datos.porcentaje > 0 &&
                datos.diaSemana.toLowerCase() !== 'dom.'
            ) {
                datos.dia.classList.add('date_active');
                fechaActiva = datos.fecha;
                // console.log(fechaActiva, "✅ FECHA ACTIVA ASIGNADA");
                break; // solo uno
            }
        }

        //marcamos el dia y la hora
        deshabilitar(index33);
        const fechaSeleccionada = reservas[0].date_time.split(" ")[0];
        manejarSeleccionFechaMultipleServicio(fechaSeleccionada, index33, duration, horaInicio)
        irDiaActivo(fechaSeleccionada, index33);

        //metemos los servicios en el contenedor
        let serviciosPregunta = reservas.map(r => ({
            ...r.servicio,
            _uuid: uuid()
        }));
        let offcanbasBottomReservaPregunta = document.getElementById(`offcanvasBottomReserva${index33}`);
        let contenedorServicios = offcanbasBottomReservaPregunta.querySelector('.serviciosMultiples');
        contenedorServicios.innerHTML = '';  // Limpiar contenido anterior

        serviciosPregunta.forEach((servicio, index) => {
            totalPrecioPagar += parseFloat(servicio.precio);
            // console.log(totalPreciPagar);

            const html = `
                <div class="servicioContenedor" data-service_id="${servicio.id}" data-removeServicioContenedor="participant-label-avatar${servicio._uuid}-multiple" data-servicio='${JSON.stringify(servicio)}'>
                    <div class="subbooking-list">
                        <div class="pos-relative box" style="background-color:transparent!important">
                            <div class="remove d-flex items-center justify-center" onclick="removeAddServiceUser('participant-label-avatar${servicio._uuid}-multiple', '${indexOffcanvasReservaServicio}')">
                                <span class="icon icon-close remove__icon d-flex items-center justify-center">
                                    <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <line y2="18" x2="6" y1="6" x1="18"></line>
                                        <line y2="18" x2="18" y1="6" x1="6"></line>
                                    </svg>
                                </span>
                            </div>
                            <div class="divided">
                                <div>
                                    <div class="row">
                                        <div class="drag-handle">
                                            <div class="lines"></div>
                                        </div>
                                        <div class="col-8">
                                            <h4 style="font-family: 'gualazonF';font-size: 15px;" class="m-0 font-medium line-break-anywhere">${servicio.nombre}</h4>
                                        </div>
                                        <div class="col-4 text-right">
                                            <div class="font-h4">${servicio.precio} €</div>
                                            <div class="text-h5 text-gray tiempoNecesario">${servicio.horaInicio} - ${servicio.horaFin}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex flex-column b-flex-fill">
                                            <div class="align-items-center d-flex">
                                                <div class="me-1 text-secondary b-font-h5">Empleado:</div>
                                            <div data-testid="participant-label-avatar${servicio._uuid}-multiple"class="b-mr-1">
                                                </div>
                                                <div data-empleid="cualquiera" data-empleado="participant-label-avatar${servicio._uuid}-multiple" class="b-flex-fill b-font-h5 empleadoNombreId${index}">Cualquiera</div>
                                            </div>
                                        </div>
                                        <button data-diaseleccionado="${fechaActiva}" data-index="${indexOffcanvasReservaServicio}" data-inicioservicio="${servicio.horaInicio}" data-duration="${servicio.duration}" class="customOpenModalSelectEmpleButton botonChangeEmple" data-multiple="participant-label-avatar${servicio._uuid}-multiple" onclick="mostrarModalSelecEmpleado('${indexOffcanvasReservaServicio}', this)">Cambiar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedorServicios.insertAdjacentHTML('beforeend', html);
        });
        //para que se vea con dos decimales
        offcanbasBottomReservaPregunta.querySelector('.totalPagarReservaOffcanva')
            .textContent = `${Number(totalPrecioPagar).toFixed(2)} €`;
        offcanbasBottomReservaPregunta.querySelector('.tiempoTotalReservOffcanva').textContent=`${formatDuration(duration)}`;
        desactivarLoaderUniversal('loaderUniversalUser');

}

// Función para generar UUID
function uuid() {
    return crypto.randomUUID(); // Navegadores modernos
    // Si necesitas compatibilidad: return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, ... );
}

//FUNCIÓN QUE NOS LLEVA A MANIPEDI
function irManiPedi(){
    window.location.href = `${BASE_URL}/reservar/manicura-pedicura`;
}

//FUNCIÓN QUE CAMBIA LA URL SIN RECARGAR LA PAGINA PÁGINA
function cambiarUrl33(){
   // Guardar la URL actual antes de cambiarla
    oldUrlReprogramarCita = window.location.href;

    history.pushState({}, "", `${BASE_URL}/reservar/manicura-pedicura`);
}

//FUNCION OBTENER FECHA ACTUAL EN FORMATO 2025-12-01 00:00:00
function obtenerFechaActualFormato() {
    const ahora = new Date();

    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');

    return `${year}-${month}-${day} 00:00:00`;
}

//FUNCION PARA MONTAR CADENA DE NOMBRES DE SERVICIOS PARA MOSTRAR EN EL MODAL CANCELAR CITA
function mostrarServicios(reservas) {
    const spanServicios = document.querySelector('[data-testid="appointment-info-services"]');

    const textoServicios = reservas
        .map(r => r.servicio.nombre)
        .join(" + ");

    spanServicios.textContent = textoServicios;
}

//FUNCION PARA OBTENER LA FECHA A MOSTRAR EN EL MODAL DE CANCELAR CITA
function formatearFechaModalCancelar(dateTimeString) {
    const fecha = new Date(dateTimeString);

    const opcionesFecha = {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
    };

    const fechaFormateada = new Intl.DateTimeFormat("es-ES", opcionesFecha)
        .format(fecha)
        .replace(".", ""); // quitar punto de "nov."

    const hora = fecha.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    // Resultado final
    return `${fechaFormateada}, ${hora}`;
}


//MANEJAR CLIC BOTONES REPROGRAMAR, CANCELAR CITA MODAL CANCELAR CITA
document.addEventListener('click', async (e) => {
    const boton = e.target.closest('button[data-testid]');
    if (!boton) return;

    const id = boton.dataset.testid;
    let idReserva3 = '';
    if(document.getElementById('offcanvasCita')){

        idReserva3 = document.getElementById('offcanvasCita').getAttribute('data-citaid');
    }

    // console.log("Click en:", id);
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    switch (id) {
        // case 'reprogramarCitaPregunta':
        //     console.log("REPROGRAMAR CITA");

        //     break;

        case 'cancelarCitaPregunta2':
            console.log("cancelarpREGUNTA2");
            const response3 = await fetch('Reservas/cancelar-modificacion/' + idReserva3, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    cliente_confimo_modificacion: "confirmado"
                })
            });
            const data3 = await response3.json();

            if (data3.success) {
                console.log("cancelación confirmada!");
                const modalEl = document.getElementById('modalPreguntaCancelarCita');
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
                cerrarTodosLosOffcanvas();
                actualizarCitasProxiPasada();
            }

            break;
    }
});

function cerrarModalPregunta(){
    const modalEl = document.getElementById('modalPreguntaCancelarCita');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

//ELIMINAR SERVICIO DESDE MODIFICAR CALENDAR
let botonElinarServicioEditService = document.getElementById('uid-738-inputEliminarServicio');
if(botonElinarServicioEditService){
    botonElinarServicioEditService.addEventListener('click', function(){
        console.log("eliminar servicio", servicesWithTimes);
        if(document.querySelector('.selectServiceAdd')){

            //obtenemos el id_unico del servico a eliminar
            let botonEditServiceModify = botonEditarServicioReserva;
            let id_serviceDelete = botonEditServiceModify.getAttribute('data-id-unico');
            let id_reserva = botonEditServiceModify.getAttribute('data-id-reserva');
            console.log(id_reserva, id_serviceDelete,  "ID RESERVA BOTON ELIMINAR");

            // obtenemos y guardamos el indice del servicio a eliminar
            const index = servicesWithTimes.findIndex(
                s => s.id_unico === id_serviceDelete
            );

            if (index === -1) return;

            // Eliminamos inmediatamente del array
            servicesWithTimes.splice(index, 1);
            // console.log(serviciosEliminadosTemporales, "servicios eliminados temporalmente", index, "indice", servicesWithTimes);

            // si eliminamos un servicio que no es una reserva previa, añadimos los ids de los servicios a los arrays ya que no se porque se eliminan
            selectedServiceIds2 = servicesWithTimes.map(item => item.id);
            selectedServiceIds = servicesWithTimes.map(item => item.id);

            if(id_reserva === null || id_reserva === undefined || id_reserva === 'null' || id_reserva === ''){
                console.log("es null");
                infoArrayEnvio = infoArrayEnvio.filter(
                    evento => evento.extendedProps.id_unico !==id_serviceDelete
                );
            }else{
                console.log(id_reserva, "no es null");
                //Eliminamos de infoArrayEnvio
                infoArrayEnvio = infoArrayEnvio.filter(
                    evento => evento.extendedProps.id_unico !== id_serviceDelete
                );
            }
            console.log(infoArrayEnvio, selectedServiceIds2, selectedServiceIds, servicesWithTimes,"OBJTO ELIMINADO DE INFOARRAYENBIO");

            //Eliminamos de los arrays de sólo ids servicios igualandolos a serviceswithtimes
            selectedServiceIds2 = servicesWithTimes.map(service => service.id);
            selectedServiceIds = servicesWithTimes.map(service => service.id);

            //pongo los botones normales en la vista modificar añadir servico
            document.querySelector('.buttonEditStrack').style.display= "none";
            document.querySelector('.buttonAddStrack').style.display= 'flex';

            // Elimino de la vista de calenadar
            let id_eventoCalendarioEliminar = botonEditarServicioReserva.getAttribute('id');
            calendar.getEventById(id_eventoCalendarioEliminar).remove();
            console.log(id_eventoCalendarioEliminar, "id_evento a eliminar-------------------");


            resetAddServiceScreen('.selectServiceAdd', '.slotEmpleadoAdd');
            cerrarTodosLosOffcanvas();
            abrirOffcanvas('eventDetailsModal');
            reprogramarCitaComprobarEmpleado = true;
            idCitaReprogramarComprobarEmpleado='';
            //compruevo si es multiple o sencillo para html
                if(servicesWithTimes.length > 1){
                    console.log("sigue siendo multiple");
                    console.log(infoArrayEnvio, id_reserva, selectedServiceIds2,  "ID RESERVA ELIMINAR-----");

                    let divTarjetasInicialesCalendar = document.querySelector('.tarjetasIncialesMostrarOcultarCalendar');
                    divTarjetasInicialesCalendar.classList.add('d-none');

                    let divNuevasTrajetasCalendar = document.querySelector('.nuevasTarjetasMostrarOcultar');

                    getServicesById(selectedServiceIds2,function (servicios){
                        let htmlContentCalendar = '';
                        let totalPricePay=0;
                        console.log(servicios, "servivios Multiples eliminar");
                        getAllEmpleados(function(empleadosReservas) {

                            let inicialesEmpleados = [];
                            nombreEmpleadosArray = [];
                            let apellidos = [];
                            let id_empleadoArray = [];
                            // Recorremos el array servicesWithTimes
                            servicesWithTimes.forEach(service => {
                                // Buscamos el empleado correspondiente usando el id_empleado
                                let empleado = empleadosReservas.find(emp => emp.id === parseInt(service.id_empleado));
                                if (empleado) {
                                    // Obtenemos las primeras dos letras del nombre del empleado
                                    let iniciales = empleado.nombre.substring(0, 2).toUpperCase();
                                    let nombre = empleado.nombre;
                                    let apellido = empleado.primerApellido;
                                    inicialesEmpleados.push(iniciales);
                                    nombreEmpleadosArray.push(nombre);
                                    apellidos.push(apellido);
                                    id_empleadoArray.push(empleado.id);
                                }
                            });
                            //Elimino el id reserva del array de ids reservas
                            // console.log(id_reserva, "id reserva eliminar arrayidsresevas 12939");
                            let idReservaInt = parseInt(id_reserva);
                            arrayIdsReservas = arrayIdsReservas.filter(id => id !== idReservaInt);
                            let arrayIdsUnicos = servicesWithTimes.map(item => item.id_unico);

                            let idsEventosParaHtml = infoArrayEnvio.map(e => e.id);
                            console.log(infoArrayEnvio, servicesWithTimes,arrayIdsUnicos,idsEventosParaHtml, "servicesWithTimes infoArrayEnvio-----");
                            servicios.forEach((servicio, index) => {
                                let precioNumerico = parseFloat(servicio.precio);
                                totalPricePay += precioNumerico;
                                let tiempoFormateada = comprobar603090(servicio.duration);
                                let apellido55 = apellidos[index];
                                let nombreEmpleado55 = nombreEmpleadosArray[index];
                                let inicialesEmpleado33 = inicialesEmpleados[index];
                                let servicioHorario = servicesWithTimes[index];
                                let seleccionaCliente = servicesWithTimes[index].seleccionaCliente;
                                let id_reserva = servicesWithTimes[index].id_reserva;
                                let idEventoParaHtml = idsEventosParaHtml[index];
                                let id_empleado8985 = id_empleadoArray[index];
                                let duracionServicio = servicioHorario
                                    ? `${servicioHorario.horaInicio} - ${servicioHorario.horaFin}`
                                    : "Horario no disponible";

                                // Construir HTML
                                htmlContentCalendar += construirHtmlTarjetasFinales(
                                    servicio.borderColor,
                                    servicio.nombre,
                                    servicio.precio,
                                    duracionServicio,
                                    tiempoFormateada,
                                    nombreEmpleado55,
                                    inicialesEmpleado33,
                                    apellido55,
                                    seleccionaCliente,
                                    idEventoParaHtml,
                                    servicio.id,
                                    id_empleado8985,
                                    id_reserva,
                                    "12984"
                                );
                            });
                            $(divNuevasTrajetasCalendar).empty();
                            $(divNuevasTrajetasCalendar).append(htmlContentCalendar);
                            addHtmlDivPrecioFinal(totalPricePay, '#newReservCalendar p[data-testid="appointment-price2"]', '#newReservCalendar div[data-testid="appointment-to-be-paid2"]');

                            cambiarTotales(totalPricePay);
                        });

                    });

                    //sigue siendo multiple
                }else{
                    console.log("ahora es reserva simple");

                    //abrimos contenedor reserva simple y vaciamos el de reservas multiples
                    document.querySelector('.tarjetasIncialesMostrarOcultar').classList.remove('d-none');
                    let divTarjetasNuevas = document.querySelector('.nuevasTarjetasMostrarOcultar');
                    $(divTarjetasNuevas).empty();

                    // let evento = nuevoInfoArrayEnvio[0];
                    let extendedProps = infoArrayEnvio[0].extendedProps;

                    //si empleado seleccionado por cliente
                    let corazon = document.querySelector('.solicitadoClientePantallaInfoCliente');
                    if(extendedProps.seleccionado_cliente === 1){
                        corazon.src = urlAplicacion + "/storage/calendar/corazonRojoEmpleCliente.svg";
                        document.getElementById('solicictaCliente').value = 1;
                    }else{
                        corazon.src = urlAplicacion + "/storage/calendar/heart-empty.svg";
                    }
                    //TARJETA SERVICIO DENTRO DEL OFFCANVAS
                    let duracion = extendedProps.servicio.duracion; // Ejemplo: 60, 90, etc.
                    // Convertir la duración
                    let duracionFormateada = duracion >= 60
                        ? `${Math.floor(duracion / 60)}h ${duracion % 60 !== 0 ? duracion % 60 + 'min' : ''}`
                        : `${duracion}min`;

                    //TARJETA SERVICIO DENTRO OFFCANVAS INFO RESERVA
                    document.querySelector('.services_serviceDecorator_ldMxA').style.borderColor = `${extendedProps.servicio.borderColor}`;
                    document.querySelector('.services_serviceWrapper_gug5x').setAttribute('data-idServiceAdd',extendedProps.servicio.id );
                    document.querySelector('.services_serviceName_YhbTW').innerHTML = `
                        ${extendedProps.servicio.nombre}
                        <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                        ${duracionFormateada}
                        </span>
                    `;

                    document.querySelector('.services_serviceDuration_Zb36z').setAttribute('data-oldDuration', extendedProps.servicio.duracion);
                    document.querySelector('.services_servicePrice_wErzf').textContent = extendedProps.servicio.precio;
                    document.querySelector('.slotHorasCobrarServicio').textContent = formatTime(extendedProps.fecha);
                    document.querySelector('.slotHorasCobrarServicio').setAttribute('data-hourReserv', formatTime(extendedProps.fecha));
                    document.querySelector('.slotHoraFinCorbrarServicio').textContent = obtenerHoraEuropaCentral(infoArrayEnvio[0].end);
                    cambiarTotales(extendedProps.servicio.precio);
                    //empleado pongo nombre empleado global
                    ponerNomIdEmpleInicio(extendedProps.empleada.nombre, extendedProps.empleada.id);
                    //reserva sencilla
            }
            setTimeout(() => {
                ponerBotonesGuardarCambios();
            }, 400);
        }

    });
}
//resetear tabla base datos poner tabla a 0 ALTER TABLE payments AUTO_INCREMENT = 1; cerrarModalPreguntaCancelarCita
 /* uid-738-inputEliminarServicio
  document.querySelector('.li-citas262'),
        document.querySelector('.li-sinFinalizar262'),
        document.querySelector('.li-tasas262'),
 */
