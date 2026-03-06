let addServicesArray = [];
let arrayServicesCompleto = [];
let indexOffcanvasReservaServicio = 0;
let serviciosSeleccionados = [];
var botonAbrirModalReserva = document.querySelectorAll('.divButonReservSmall');
var reprogramarCita = false;
var idCitaReprogramar='';
var oldUrlReprogramarCita='';
//si la url contiene init
if (window.location.pathname.includes('/init')) {
    // Redirige a la raíz del dominio
    window.location.href = window.location.origin + '/laravel/salon-manicura-git/public/'
    // window.location.href = window.location.origin + '/';
}


if(document.querySelector('.contenedorNewReserva')){
var fechaActual2 = document.querySelector('.contenedorNewReserva').getAttribute('data-fechaactual');
var horaInicio = document.querySelector('.contenedorNewReserva').getAttribute('data-horaInicio');
// console.log(horaInicio, "hora");
}

function asignarIndexOffcanvasReservaServicio(indexOffcanvas) {
    indexOffcanvasReservaServicio = 0;
    indexOffcanvasReservaServicio = indexOffcanvas;
    console.log(indexOffcanvasReservaServicio, "indexParaOffcanvasReservaServicio");

}

//peticion ajax configuraciones reservas para meses antelacion
function getConfiguracionReservas(callback){
var csrfToken = $('meta[name="csrf-token"]').attr("content");
var url = "obtener-configuracion-reservas";
// Hacer una petición AJAX al servidor
$.ajax({
    url: url, // Ruta que definimos en web.php
    method: 'POST',
    data: {
        _token: csrfToken, // Token CSRF para seguridad
    },
    success: function(response) {
        const configuraciones = response.configuraciones;
        // Ejecutar el callback con los datos
        callback(configuraciones);
    },
    error: function(xhr) {
        console.error("Error en la solicitud AJAX configuraciones");
         console.log(xhr.responseText); // Para ver el mensaje del servidor
          if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
            // Redirige al login si la sesión ha expirado
            window.location.href = 'login';
        }
    }
});
}

//peticion ajax configuraciones reservas para meses antelacion
function getHistorialCambiosReservas(callback){
var csrfToken = $('meta[name="csrf-token"]').attr("content");
var url = "historial.modificacion.reserva";
// Hacer una petición AJAX al servidor
$.ajax({
    url: url, // Ruta que definimos en web.php
    method: 'POST',
    data: {
        _token: csrfToken, // Token CSRF para seguridad
    },
    success: function(response) {
        // console.log(response,"RESPONSE");

        const historialModificacionesReservas = response;
        // console.log(historialModificacionesReservas, "historial modificacion");

        // Ejecutar el callback con los datos
        callback(historialModificacionesReservas);
    },
    error: function(xhr) {
        console.error("Error en la solicitud AJAX historial cambios reservas");
         console.log(xhr.responseText); // Para ver el mensaje del servidor
          if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
            // Redirige al login si la sesión ha expirado
            // window.location.href = 'login';
        }
    }
});
}

//FUNCIÓN QUE INICIA EL DATEPIKER SOLO MES Y ANIO
function initDatePikerSoloMes(index44) {
    indexOffcanvasReservaServicio = index44;
    getConfiguracionReservas(function(configuraciones){
        // console.log(configuraciones, "configuraciones", index44, "index44");

        // Accedemos al primer objeto dentro del array configuraciones
        const antelacionReserva = configuraciones[0].antelacion_reserva;
        // console.log("Antelación de reserva:", antelacionReserva);

        // Lógica para convertir las opciones de antelación en fechas
        let maxDate = null;
        const fechaActual = new Date();
        fechaActual.setMonth(fechaActual.getMonth()); // Asegúrate de que el mes actual esté bien establecido
        fechaActual.setDate(1); // Primer día del mes actual
        switch (antelacionReserva) {
            case "máx. con 7 días de antelación":
                // Si la fecha actual ya pasó el límite de 7 días, solo se permitirá seleccionar el mes actual
                maxDate = new Date();
                if (fechaActual.getDate() > 7) {
                    // Si el día actual es mayor a 7, restringimos al mes actual
                    maxDate = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0); // Último día del mes actual
                } else {
                    // Si el día es menor o igual a 7, se permite seleccionar hasta 7 días adelante
                    maxDate.setDate(fechaActual.getDate() + 7); // Máximo 7 días
                }
                break;
            case "máx. con 14 días de antelación":
                // Si la fecha actual ya pasó el límite de 14 días, solo se permitirá seleccionar el mes actual
                maxDate = new Date();
                if (fechaActual.getDate() > 14) {
                    // Si el día actual es mayor a 14, restringimos al mes actual
                    maxDate = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0); // Último día del mes actual
                } else {
                    // Si el día es menor o igual a 14, se permite seleccionar hasta 14 días adelante
                    maxDate.setDate(fechaActual.getDate() + 14); // Máximo 14 días
                }
                break;
            case "máx. con un mes de antelación":
                maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 1); // Máximo 1 mes
                break;
            case "máx. con 2 meses de antelación":
                maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 2); // Máximo 2 meses
                break;
            case "máx. con 3 meses de antelación":
                maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 3); // Máximo 3 meses
                break;
            case "máx. con 6 meses de antelación":
                maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 6); // Máximo 6 meses
                break;
            case "máx. con 12 meses de antelación":
                maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 12); // Máximo 12 meses
                break;
            case "máx. con 24 meses de antelación":
                maxDate = new Date();
                maxDate.setMonth(maxDate.getMonth() + 24); // Máximo 24 meses
                break;
            default:
                maxDate = new Date(); // Si no hay opción de antelación, no hay límite
        }

        // console.log("Fecha máxima permitida:", maxDate);

        // Inicializamos el calendario para la selección solo de meses
        let divMesAnioActual = document.querySelector('.mesAtual' + index44);
        // console.log(divMesAnioActual.textContent, "mes actual");



        // Ahora configuramos flatpickr
        const datePijerSoloMes = document.getElementById('offcanvasBottomLabelReserva' + index44);
        // console.log(datePijerSoloMes, "datePijerSoloMes");
        flatpickr(datePijerSoloMes, {
            inline: false,
            minDate: fechaActual, // No permite seleccionar meses anteriores al mes actual
            maxDate: maxDate, // Limita el mes máximo según la configuración de antelación
            disableMobile: true,
            plugins: [
                new monthSelectPlugin({
                })
            ],
            locale: {
                months: {
                    shorthand: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
                    longhand: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                },
            },
            onChange: function (selectedDates, dateStr, instance) {
                // console.log("Fecha seleccionadaGETDIASBYMEW:", selectedDates[0]); // Verifica si dateStr tiene un valor esperado
                // console.log("Fecha seleccionada2:", dateStr[0]);
                if (dateStr) {
                    console.log("Fecha seleccionada:", dateStr); // Verifica si dateStr tiene un valor esperado
                    let [mes, anio] = dateStr.split(" ");
                    // console.log("Mes:", mes);  // El mes seleccionado
                    // console.log("Año:", anio); // El año seleccionado
                } else {
                    console.log("No se ha seleccionado un mes correctamente. Asignando el mes actual.");
                    // Si no se ha seleccionado un mes, asignamos el mes y año actual
                    const fechaActual = new Date();
                    let mesActual = fechaActual.toLocaleString('default', { month: 'long' });
                    let anioActual = fechaActual.getFullYear();
                    // console.log("Mes Actual:", mesActual);
                    // console.log("Año Actual:", anioActual);

                    // Asignar el valor actual a dateStr para que pueda ser utilizado
                    dateStr = `${mesActual} ${anioActual}`;

                    // Imprimir el valor asignado a dateStr para verificar que se ha asignado correctamente
                    // console.log("Valor asignado a dateStr:", dateStr);

                    // Divulgar la selección (para el div que muestra el mes y año)
                    divMesAnioActual.textContent = dateStr;
                }

                // Cambiar el texto del div con el mes y año
                divMesAnioActual.textContent = dateStr;

                let diasSegunMesSeleccionadoArray = [];
                obtenerDiasByMes(selectedDates[0], function(diasSegunMesSeleccionado, horaInicioSegunMes){
                    console.log("OBTENER DIAS BY MES", horaInicioSegunMes);

                    // console.log(diasSegunMesSeleccionado); // Aquí tienes los días
                    diasSegunMesSeleccionadoArray = diasSegunMesSeleccionado;
                    // console.log(diasSegunMesSeleccionadoArray, "dias en array");

                    asignarAtributos(index44, diasSegunMesSeleccionadoArray[0].fecha, horaInicioSegunMes, diasSegunMesSeleccionadoArray[0].mes_anio, diasSegunMesSeleccionadoArray[0].anio);
                    montarTarjetasDias(index44, diasSegunMesSeleccionadoArray, horaInicioSegunMes);

                    let divservicioDuracion = document.querySelector(`#offcanvasBottomReserva${index44}`);
                    let servicioDuracion = divservicioDuracion.getAttribute('data-duration');


                    let fechaSeleccionada = diasSegunMesSeleccionadoArray[0].fecha;
                    let hoy = new Date();
                    let fechaHoy = hoy.toISOString().split('T')[0];

                    let usarFecha = fechaSeleccionada;
                    // Si la fecha seleccionada es hoy
                    if (fechaSeleccionada === fechaHoy) {
                        let horaActual = hoy.getHours();
                        let minutosActuales = hoy.getMinutes();
                        let totalMinutos = horaActual * 60 + minutosActuales;

                        // Si hoy es sábado (6) y son 14:00 o más
                        if (hoy.getDay() === 6 && totalMinutos >= 14 * 60) {
                            usarFecha = obtenerProximoDiaNoDomingo(hoy).toISOString().split('T')[0];
                        }
                        // Si es hoy y son las 20:00 o más
                        else if (totalMinutos >= 20 * 60) {
                            usarFecha = obtenerProximoDiaNoDomingo(hoy).toISOString().split('T')[0];
                        }
                    }
                    // Si la fecha seleccionada no es hoy pero cae en domingo
                    else {
                        let fechaObj = new Date(fechaSeleccionada);
                        if (fechaObj.getDay() === 0) {
                            usarFecha = obtenerProximoDiaNoDomingo(fechaObj).toISOString().split('T')[0];
                        }
                    }

                    manejarSeleccionFecha(usarFecha, index44, servicioDuracion, false, true);

                });
            },
        });
    });
}

function obtenerProximoDiaNoDomingo(fecha) {
    let siguiente = new Date(fecha);
    do {
        siguiente.setDate(siguiente.getDate() + 1);
    } while (siguiente.getDay() === 0); // 0 = domingo
    return siguiente;
}



//monta y muestra las tarjetas dia al cambiar el mes
function montarTarjetasDias(index4444, diasSegunMesSeleccionadoArray2, horaInicioSegunMes2){
    activarLoader(index4444);

    let carouselInerDias= document.querySelector(`#carousel_dias${index4444} .carrusel-inner-dias`);
    // Limpiar el contenedor antes de agregar los nuevos días
    carouselInerDias.innerHTML = '';

    let offcanvasPrincipal = document.querySelector('#offcanvasBottomReserva'+index4444);
    let servicios99 = offcanvasPrincipal.querySelectorAll('.servicioContenedor');
    //comprobamos si ha más de un servicio para sumar el total de duración
    let duration = servicios99.length > 1
    ? Array.from(servicios99) // Convierte los elementos de servicios en un array
        .map(el => JSON.parse(el.getAttribute('data-servicio'))) // Parsea el JSON de cada atributo data-servicio
        .reduce((total, servicio) => total + servicio.duration, 0) // Suma la duración de todos los servicios
    // Si solo hay un servicio seleccionado
    : parseInt(offcanvasPrincipal.getAttribute('data-duration'), 10); // Toma la duración desde el atributo del contenedor


    // Recorrer el array de días y generar el HTML para cada uno
    diasSegunMesSeleccionadoArray2.forEach((dia2, index) => {
        // Verificar si es el primer día (index 0)
        let diaClase = 'dia';
        if (index === 0) {
            diaClase += ' date_active'; // Añadir 'date-active' al primer día
        }
        // Verificar si el día es domingo y agregar la clase 'disabled'
        if (dia2.dia_semana === 'dom.') {
            diaClase = 'dia disabled'; // Añadir 'disabled' si es domingo
        }

        // Crear el HTML con template literals
        let diaHTML = `
            <div class="${diaClase}"
                data-index="${index4444}"
                data-diaSemana="${dia2.dia_semana}"
                data-mes="${dia2.mes}"
                data-ano="${dia2.anio}"
                data-date="${dia2.fecha}"
                data-horaInicio="${horaInicioSegunMes2}"
                onclick="${dia2.dia_semana === 'dom.' ? 'event.stopPropagation();' : `manejarSeleccionFecha('${dia2.fecha}', ${index4444}, ${duration});`}">
                <span class="nombre-dia">${dia2.dia_semana}</span>
                <span class="numero-dia">${dia2.numero_dia}</span>
                ${
                    dia2.dia_semana !== 'dom.'
                        ? `<div style="flex-direction: column; display: flex; margin-top: 0.4rem;" class="containSizeDisponibility w-100 align-items-center">
                                <div class="marker" data-testid="time-slot-marker"></div>
                        </div>`
                        : ''
                }
            </div>
        `;

        // Insertar el HTML en el contenedor correspondiente
        carouselInerDias.insertAdjacentHTML('beforeend', diaHTML);
    });

    setTimeout(() => {
        let diasVisibles = obtenerDiasVisibles(index4444);
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        let time_obtener = "obtener-horas";

        let promesas = Array.from(diasVisibles).map(dia => {
            return new Promise((resolve) => {
                let divMarketr = dia.querySelector('.marker');
                let fecha55 = dia.getAttribute('data-date');
                let diaSemana = dia.getAttribute('data-diaSemana');

                $.ajax({
                    url: time_obtener,
                    method: 'POST',
                    data: {
                        _token: csrfToken,
                        fecha: fecha55,
                        duracion: duration
                    },
                    success: function(response) {
                        const horasRecibidas = response.horasDisponibles;
                        let porcentaje = calcularPorcentajeDisponibilidad(horasRecibidas, parseInt(duration), diaSemana);

                        resolve({ dia, divMarketr, porcentaje });
                    },
                    error: function(xhr) {
                        console.error('Error al obtener las horas', xhr);
                        resolve(null); // Continua con los demás aunque falle uno
                    }
                });
            });
        });

        Promise.all(promesas).then(resultados => {
            for (let resultado of resultados) {
                if (!resultado) continue;

                const { dia, divMarketr, porcentaje } = resultado;

                if (porcentaje > 50) {
                    if (divMarketr && !divMarketr.classList.contains('markerVerde')) {
                        divMarketr.classList.remove('markerRojo', 'markerNaranja');
                        divMarketr.classList.add('markerVerde');
                    }
                    dia.classList.remove('disabledcomplet');
                } else if (porcentaje === 0) {
                    if (divMarketr && !divMarketr.classList.contains('markerRojo')) {
                        divMarketr.classList.remove('markerNaranja', 'markerVerde');
                        divMarketr.classList.add('markerRojo');
                    }
                    dia.classList.add('disabledcomplet');
                } else {
                    if (divMarketr && !divMarketr.classList.contains('markerNaranja')) {
                        divMarketr.classList.remove('markerRojo', 'markerVerde');
                        divMarketr.classList.add('markerNaranja');
                    }
                    dia.classList.remove('disabledcomplet');
                }

                console.log(`📅 Fecha: ${dia.getAttribute('data-date')} → Porcentaje: ${porcentaje}%`);
            }
            desactivarLoader(index4444);
        });

    }, 500); // Delay reducido (o puedes quitarlo)
}

//asigna valor a los atributos cuando cambiamos el mes
function asignarAtributos(index444, fecha, horaInicioSegunMes2, mes_anio, anio){
    // console.log(fecha, "fecha", horaInicioSegunMes2,"hora", mes_anio, "mes_anio", anio, "anio---------");

    //cambiamos atributo fecha actual
    let contenedorNewReservaMesSeleccionado = document.querySelector(`.contenedorNewReserva[data-index="${index444}"]`);
    // console.log(contenedorNewReservaMesSeleccionado, "contenedor");
    let fechaActual66 = actualizarFechaSeleccionada(fecha);
    contenedorNewReservaMesSeleccionado.setAttribute('data-fechaActual', fechaActual66);
    //cambiamos atributo data-horaIncio
    contenedorNewReservaMesSeleccionado.setAttribute('data-horaInicio', horaInicioSegunMes2);
    //cambiar atributo data-horainicio carusel dias
    let carouselDias = document.querySelector(`#carousel_dias${index444}`);
    carouselDias.setAttribute('data-horaInicio', horaInicioSegunMes2);
    let carouselInerDias= document.querySelector(`#carousel_dias${index444} .carrusel-inner-dias`);
    carouselInerDias.setAttribute('data-mesActual', mes_anio);
    carouselInerDias.setAttribute('data-anioActual', anio);
}

//FUNCIÓN QUE COMPRUEBA SI ES EL MES ACTUAL PARA PONER DIA ACTUAL
function actualizarFechaSeleccionada(mesSeleccionado) {
    // Obtener el mes actual
    let fechaActual = new Date();
    let mesActual = fechaActual.getMonth();  // Mes actual (0-11)
    let añoActual = fechaActual.getFullYear();  // Año actual

    // Convertir mesSeleccionado a un objeto Date para extraer el mes y el año
    let [añoSeleccionado, mesSeleccionadoNumero] = mesSeleccionado.split('-').map(Number);  // Convierte "2025-01" a [2025, 1]

    // Verificar si el mes seleccionado es el mes actual
    let fecha;
    if (añoSeleccionado === añoActual && mesSeleccionadoNumero - 1 === mesActual) {
        // Si es el mes actual, asignar el día actual
        let diaActual = fechaActual.getDate();  // Obtener el día actual
        fecha = `${añoSeleccionado}-${String(mesSeleccionadoNumero).padStart(2, '0')}-${String(diaActual).padStart(2, '0')}`;
    } else {
        // Si no es el mes actual, asignar el día 1 del mes seleccionado
        fecha = `${añoSeleccionado}-${String(mesSeleccionadoNumero).padStart(2, '0')}-01`;
    }
    return fecha;
    // Asignar la fecha al contenedor
    // contenedorNewReservaMesSeleccionado.setAttribute('data-fechaActual', fecha);
}


//FUNCIÓN QUE OBTIENE LOS DÍAS SEGÚN EL MES SELECCIONADO
function obtenerDiasByMes(nombreMes, callback){
    console.log(nombreMes, "nombre mes");

    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = urlDiasByMes;
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            nombre_mes: nombreMes,
        },
        success: function(response) {
            const diasSegunMesSeleccionado = response.diasMesSeleccionado;
            const horaInicioSegunMes = response.horaInicioSegunMes;
            // console.log(diasSegunMesSeleccionado, "dias segun");

            // Ejecutar el callback con los datos
            callback(diasSegunMesSeleccionado, horaInicioSegunMes);
        },
        error: function(xhr) {
            console.error("Error en la solicitud AJAX");
             if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                // Redirige al login si la sesión ha expirado
                window.location.href = 'login';
            }
        }
    });
}

function obtenerContenedoresReservas(index) {
    let offcanvasActiveHora = document.querySelector('#offcanvasBottomReserva'+index);
    let serviciosMultiples = offcanvasActiveHora.querySelector('.serviciosMultiples');
    let contenedoresActiveHora = serviciosMultiples.querySelectorAll('.servicioContenedor');
    return contenedoresActiveHora;

}

function esHoraPasadaHoy(fecha, hora) {
    // Obtener fecha actual en formato "YYYY-MM-DD"
    let hoy = new Date();
    let fechaHoy = hoy.toISOString().split('T')[0];

    // Si la fecha no es hoy, no evaluamos la hora
    if (fecha !== fechaHoy) return false;

    // Hora actual en minutos
    let minutosAhora = hoy.getHours() * 60 + hoy.getMinutes();

    // Hora recibida en minutos
    let [h, m] = hora.split(':').map(Number);
    let minutosObjetivo = h * 60 + m;

    // Comparar
    return minutosObjetivo < minutosAhora;
}

function obtenerHoraAhoraRedondeadaCinco() {
    let ahora = new Date();
    let minutos = ahora.getMinutes();
    let minutosRedondeados = Math.ceil(minutos / 5) * 5;

    // Si llega a 60, sube una hora y pone minutos a 0
    if (minutosRedondeados === 60) {
        ahora.setHours(ahora.getHours() + 1);
        minutosRedondeados = 0;
    }

    // Formatear horas y minutos con ceros si es necesario
    let horas = ahora.getHours().toString().padStart(2, '0');
    let minutosFormateados = minutosRedondeados.toString().padStart(2, '0');

    return `${horas}:${minutosFormateados}`;
}

//FUNCIÓN QUE RECIBE LAS HORAS LAS MUESTRA Y PONE LA HORA ACTIVA
async function manejarSeleccionFecha(fechaSeleccionada, index, duracionServicio, apagarLoader = true, diasByMes= false) {
    try {

        let horaInicio96966 = document.querySelector(`.contenedorNewReserva[data-index="${index}"]`).getAttribute('data-horainicio');
        setTimeout(() => {
            let diaActivo = obtenerDiaActivo(index);
            let fechaSegunDiaActivo = diaActivo.getAttribute('data-date');
            // console.log(fechaSegunDiaActivo, "FECHA SEGUN DIA ACTIVO");
            document.querySelector(`.contenedorNewReserva[data-index="${index}"]`).setAttribute('data-fechaactual', fechaSegunDiaActivo);
        }, 600);



        // console.log(fechaSeleccionada, "fecha seleccionada", duracionServicio, "DURACIÓN SERVICIO");
        let offcanvasActiveHora = document.querySelector('#offcanvasBottomReserva'+index);
        // let serviciosMultiples = offcanvasActiveHora.querySelector('.serviciosMultiples');
        let contenedoresActiveHora = obtenerContenedoresReservas(index);
        // console.log(contenedoresActiveHora.length, "CONTENEDORES.LENG");
        let arrayDeServicios55 = [];

        if(contenedoresActiveHora.length > 1){
            let horaInicioReservaEmpleado = offcanvasActiveHora.querySelector('.hora.time_active').getAttribute('data-hora');


            contenedoresActiveHora.forEach(contenedor => {
                let servicioData = JSON.parse(contenedor.getAttribute('data-servicio'));
                    arrayDeServicios55.push(servicioData);
            });

            let totalDuration = 0;
            arrayDeServicios55.forEach(servicio => {
                // servicio._uuid = crypto.randomUUID();
                let duracion = parseInt(servicio.duration, 10);
                if (!isNaN(duracion)) {
                    totalDuration += duracion;
                }
            });
            let listaNombres2 = document.getElementById('listaNombresServicios2');
            if(listaNombres2){
                listaNombres2.innerHTML = ''; // Limpiar la lista de servicios seleccionados
            }
            let listaNombreServiicosBody2 = document.querySelector('.listaNombreServiciosBody2');
            if(listaNombreServiicosBody2){
                listaNombreServiicosBody2.innerHTML = ''; // Limpiar el contenido del modal
            }
            //mostrar modal servicios seleccionados
            let listaNombres = document.getElementById('listaNombresServicios2');
            let totalSpan = document.getElementById('totalServiciosSeleccionados2');
            let total = 0;
            arrayDeServicios55.forEach(servicio => {
                // addServicesArray.push(servicio.id);
                const precio2 = parseFloat(servicio.precio); // Convertir a número
                total += precio2; // ✅ Sumar aquí

                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.style.setProperty('background-color', 'transparent', 'important');

                li.innerHTML = `
                    <div class="d-flex justify-content-between">
                        <div>
                            <strong>${servicio.nombre}</strong><br>
                            <small style='color: #868e96 !important;font-size:12px' class="text-muted">Duración: ${servicio.duration}</small>
                        </div>
                        <div class="text-end">${precio2.toFixed(2)}€</div>
                    </div>
                `;
                listaNombres.appendChild(li);
            });
             totalSpan.textContent = `${total.toFixed(2)}€`;
            let modal = new bootstrap.Modal(document.getElementById('modalServiciosSeleccionados2'));
            modal.show();

            fetch(comprobarDisponibilidad, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    fecha: fechaSeleccionada,
                    hora: horaInicioReservaEmpleado,
                    servicios: arrayDeServicios55.map(s => ({ duration: parseInt(s.duration, 10) }))
                })
            })
            .then(response => response.json())
            .then(data => {
                // console.log("Respuesta completa del servidor:", data);

                let contenedorSugerencias = document.querySelector('.listaNombreServiciosBody2');
                contenedorSugerencias.setAttribute("data-indexListaSugerencias", index);
                let div = document.createElement('div');
                let contenidohtml = '';
                let duracionAHoras = formatearDuracion(totalDuration);
                if (data.disponible) {
                    contenidohtml = `
                        <p>
                            <span style="color: #0bbd9a;><i style="margin-right: 5px;" class="bi bi-check-circle-fill"></i><strong> ${data.mensaje} Duración total: ${duracionAHoras}</strong></span><br>
                            Datos de la reserva:</br>
                            <span style="color: #adb1b0ff;margin-right: 5px;" class="icon mdi mdi-clock"></span>
                            ${data.nuevoFin}
                        </p>
                        <button
                            data-servicios='${JSON.stringify(arrayDeServicios55)}'
                            onclick="reservaMultipleAceptada1(this, '${horaInicioReservaEmpleado}', '${totalDuration}', '${fechaSeleccionada}')"
                            class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                            style="background-color: #d6a769!important; border-radius:4px; border-color:#d6a769!important;">
                            ¡Sí, quiero reservar!
                        </button><br>
                           <button
                            data-servicios='${JSON.stringify(arrayDeServicios55)}'
                             onclick="reservaMultipleAceptada1(this, '${horaInicioReservaEmpleado}', '${totalDuration}', '${fechaSeleccionada}');irDiaActivo('${fechaSeleccionada}', '${index}')"
                            class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                            style="background-color: #d6a769!important; border-radius:4px; border-color:#d6a769!important;">
                            Elegir otra hora para hola1 ${data.soloFecha}
                        </button><br>
                        `;
                } else {
                    let mensaje = `
                        <p style="margin-bottom: 1rem;">
                        <i class="bi bi-info-circle"></i> ${data.mensaje}<br>
                        <strong><span style='color:#0bbd9a;'>${data.mensajeSecundario}</span></strong>

                        </p>

                        `;

                    let sugerencias = [];

                    // Normalización segura de sugerencias
                    try {
                        if (data.sugerencias?.original?.sugerencias) {
                            if (Array.isArray(data.sugerencias.original.sugerencias)) {
                                sugerencias = data.sugerencias.original.sugerencias;
                            } else {
                                sugerencias = Object.values(data.sugerencias.original.sugerencias);
                            }
                        } else if (Array.isArray(data.sugerencias)) {
                            sugerencias = data.sugerencias;
                        } else if (typeof data.sugerencias === 'object' && data.sugerencias !== null) {
                            sugerencias = Object.values(data.sugerencias);
                        }
                    } catch (e) {
                        console.warn("Error procesando sugerencias:", e, data.sugerencias);
                    }

                    console.log("Sugerencias normalizadas:", sugerencias);

                    if (Array.isArray(sugerencias) && sugerencias.length > 0) {
                        mensaje += `<div class="sugerenciasDisponibles">`;

                    sugerencias
                    .filter(opcion => opcion && opcion.inicio && opcion.fin)
                    .forEach((opcion, index) => {
                        let inicio = formatearCitaSugerida(opcion.inicio);
                        let fin = formatearCitaSugerida(opcion.fin);

                        mensaje += `
                            <div class="opcion-sugerida mb-3 p-3 border rounded">
                                <div class="row">
                                    <div class="col-8">
                                        <p class="datos-sugerencia">
                                            <span class="mdi mdi-calendar-clock text-success"></span>
                                            ${inicio.diaMes} de ${inicio.hora} a ${fin.hora}
                                        </p>
                                    </div>
                                    <div class="col-4" style="margin-top: 0.5rem;">
                                        <div class="elementor-button-wrapper">
                                            <a style="text-decoration:none;"
                                                class="elementor-sugerencia elementor-button elementor-button-link elementor-size-sm entrar_registrase"
                                                href="#"
                                                onclick="reservaMultipleAceptada1(this, '${opcion.inicio}', '${totalDuration}', '${opcion.inicio}')"
                                                data-servicios='${JSON.stringify(arrayDeServicios55)}'>
                                                <span class="elementor-button-content-wrapper" style="color: white">
                                                    <span class="elementor-button-text">Me interesa!</span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    });

                        mensaje += `</div>  <br>
                     <button
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px;border-color:#d6a769!important;"
                        onclick="cleanViewMoreService();resetContadorSegunTotalArray();desmarcarCheckboxesYCerrarAcordeon();closeAddMoreService();" type="button" class="btn-close" data-bs-dismiss="modal">
                        Elegir otro día
                    </button>`;
                    } else if (data.sugerencia) {
                        let inicio = formatearCitaSugerida(data.sugerencia.inicio);
                        let fin = formatearCitaSugerida(data.sugerencia.fin);

                        mensaje += `
                            <i style="font-size: 17px;color: blue;" class="bi bi-arrow-right-circle-fill"></i>
                            Siguiente opción:<br>
                            El ${inicio.diaMes} de ${inicio.hora} a ${fin.hora}<br>`;
                    }

                    contenidohtml = mensaje;
                }

                div.innerHTML = contenidohtml;
                contenedorSugerencias.appendChild(div);
                console.log(fechaSeleccionada, "fecha reserva", horaInicioReservaEmpleado, "hora inicio reserva", arrayDeServicios55, "SERVICIOS GETBYID");
            })
            .catch(error => {
                console.error('❌ Error al comprobar disponibilidad:', error);
                alert('❌ Ocurrió un error al comprobar la disponibilidad.');
            });
            console.log("manejarSeleccion multiple");

        }else{
            // console.log("SOLO UN CONTENEDOR", fechaSeleccionada);
            // Llamar a obtenerHoras con await para esperar su resultado
            const horasRecibidas = await obtenerHoras(fechaSeleccionada, index, duracionServicio);
            // Después de obtener las horas, puedes seguir con tu lógica
            mostrarHoras(horasRecibidas, index);
            // let apagarLoader = true;
            initActiveClassHora(index, duracionServicio, apagarLoader);
            setTimeout(() => {
                 irAHoraActiva(index);
            }, 1000);
        }

    } catch (error) {
        console.log("Error al obtener las horas", error);
    }
}

//calcula el porcentaje de disponibilidad
function calcularPorcentajeDisponibilidad(horasRecibidas, duracionMinutos, diaSemana) {
    const intervalo = 15; // minutos entre bloques
    const bloquesNecesarios = duracionMinutos / intervalo;

    const horaInicio = "09:00";
    let horaFin = "20:00";
    const comidaInicio = "14:00";
    const comidaFin = "15:00";

    // Si es sábado, el horario de cierre es a las 14:00
    // if (diaSemana === "sáb.") {
    //     horaFin = "14:00"; // Cambiar la hora de cierre a las 14:00 para los sábados
    // }

    // Helper para convertir "HH:MM" a minutos desde medianoche
    function horaAminutos(hora) {
        const [h, m] = hora.split(":").map(Number);
        return h * 60 + m;
    }

    // Helper para convertir minutos desde medianoche a "HH:MM"
    function minutosAhora(minutos) {
        const h = Math.floor(minutos / 60).toString().padStart(2, "0");
        const m = (minutos % 60).toString().padStart(2, "0");
        return `${h}:${m}`;
    }

    const inicioMin = horaAminutos(horaInicio);
    const finMin = horaAminutos(horaFin);
    const comidaInicioMin = horaAminutos(comidaInicio);
    const comidaFinMin = horaAminutos(comidaFin);

    let totalPosibles = 0;
    let horaActual = inicioMin;

    while (horaActual + duracionMinutos <= finMin) {
        const finSlot = horaActual + duracionMinutos;

        // Verificar si el bloque pisa la hora de comida
        const pisaComida = (
            (horaActual >= comidaInicioMin && horaActual < comidaFinMin) ||
            (finSlot > comidaInicioMin && finSlot <= comidaFinMin) ||
            (horaActual < comidaInicioMin && finSlot > comidaFinMin)
        );

        if (!pisaComida) {
            totalPosibles++;
        }

        horaActual += intervalo;
    }

    const horasDisponibles = horasRecibidas.length;
    if (totalPosibles === 0) return 0;

    const porcentaje = (horasDisponibles / totalPosibles) * 100;
    return Math.round(porcentaje * 100) / 100; // Redondear a 2 decimales
}

//FUNCIÓN QUE RECIBE LAS HORAS LAS MUESTRA Y PONE LA HORA ACTIVA
async function manejarSeleccionFechaMultipleServicio(fechaSeleccionada, index, duracionServicio, horaInicio) {
    try {
        console.log(fechaSeleccionada, "fecha seleccionada", duracionServicio, "DURACIÓN SERVICIO");
        // Llamar a obtenerHoras con await para esperar su resultado
        obtenerHorasMultipleReserva(fechaSeleccionada, index, duracionServicio, horaInicio);
        // console.log(horasRecibidas, "horas recibidas desde manejar");
    } catch (error) {
        console.log("Error al obtener las horas", error);
    }
}

function ajustarNavbar() {
  const navbar = document.querySelector('.navbarOcultarReserva');
  if (!navbar) return; // Verifica que el elemento exista

  // Remover ambas clases antes de añadir la correcta
//   navbar.classList.remove('rd-navbar-static', 'rd-navbar-fixed');

  if (window.innerWidth > 991) {
    navbar.classList.add('rd-navbar-static');
  } else {
    navbar.classList.add('rd-navbar-fixed');
  }
}

function ponerUrlOldReprogramarCita(){
     history.pushState({}, "", oldUrlReprogramarCita);
    reprogramarCita=false;
    idCitaReprogramar='';
    oldUrlReprogramarCita='';
}

//EVENTO ONCLIC CUANDO CLICAMOS EN CANCELAR RESERVA ONE
document.querySelectorAll("[id^='cancelReservOne']").forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        //comprobamos si es reprogramar reserva
        if(reprogramarCita){
            //ponemos la antigua
            ponerUrlOldReprogramarCita();
        }
       // console.log(reprogramarCita, "REPROGRAMAR CITA");
        let indexCancel = button.getAttribute('data-index');
        let divMesAnioActualCancel = document.querySelector('.mesAtual'+indexCancel);

        divMesAnioActualCancel.textContent = obtenerMesActual();
        // setTimeout(() => {
        cerrarOffcanvas(button.getAttribute('data-closedOffcanvas'), button.getAttribute('data-date'), indexCancel);

        ajustarNavbar();

        console.log("Botón cancelado: " + button.id);
        //activar enlace añadir más servicios enlaceMasServicio

        activarEnlace('offcanvasBottomReserva'+ indexCancel);
        resetcontadorServicios();
        desmarcarCheckboxesYCerrarAcordeon();
        setTimeout(() => {
            closeAcordeonPrincipal();
        }, 600);


    console.log(arrayServicesCompleto, indexOffcanvasReservaServicio, serviciosSeleccionados, "SI CANCELAR RESERVA");

    });
});

function closeAcordeonPrincipal(){
     let divAcordeonPrincipal = document.getElementById('accordionCategory66');

        if(divAcordeonPrincipal){
            let botones = document.querySelectorAll('#accordionCategory66 .card5620 button');
            botones.forEach(boton => {
                boton.setAttribute('aria-expanded', 'false');
            });
            let divs = document.querySelectorAll('div[data-parent="#accordionCategory66"]');

            divs.forEach(div => {
                div.classList.remove('show');
            });
        }
}

//FUNCIÓN QUE OBTIENE LOS DÍAS SEGÚN EL MES SELECCIONADO
function obtenerTodosDias(callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    // var url = "get-allDays";
    var url = obtenerTodosLosDias;
    // Hacer una petición AJAX al servidor
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
        },
        success: function(response) {
            const allDays = response.allDays;
            const horaInicioAllDays = response.horaInicioAllDays;
            const fechaActualAllDays = response.fechaActual2AllDays;
            const mesActualAllDays = response.mesActualAllDays;
            const anioActualAllDays = response.anioActualAllDays;
            // const horaInicioSegunMes = response.horaInicioSegunMes;
            console.log(allDays, horaInicioAllDays, fechaActualAllDays, mesActualAllDays, anioActualAllDays, "dias segun");

            // Ejecutar el callback con los datos
            callback(allDays, horaInicioAllDays, fechaActualAllDays, mesActualAllDays, anioActualAllDays);
        },
        error: function(xhr) {
            console.error("Error en la solicitud AJAX");
             if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                // Redirige al login si la sesión ha expirado
                window.location.href = 'login';
            }
        }
    });
}

//FUNCIÓN OBTENER MES ACTUAL
function obtenerMesActual(){
    const fechaActual = new Date();
    const opciones = { year: 'numeric', month: 'long' };
    const mesActual = fechaActual.toLocaleString('es-ES', opciones).replace(' de', '');
    console.log(mesActual, "funcion mesactual"); // "febrero 2025"
    return mesActual;

}

//muestra el loader de espera
function activarLoader(index) {
     let loaderSpere = document.querySelector(`#loaderSpera${index}`);
        if(loaderSpere){
            loaderSpere.classList.remove('d-none');
        }
}

function desactivarLoader(index) {
    let spiner = document.getElementById('loaderSpera'+index);
    if (spiner) {
        spiner.classList.add('d-none'); // Ocultar el spinner
    }
}

//EVENTO ONCLIC CUANDO EL USUARIO CLICA EN RESERVAR
botonAbrirModalReserva.forEach(function (boton) {
    boton.addEventListener('click', async function(event) {
        event.preventDefault();
        // console.log(reprogramarCita, "REPROGRAMAR CITA");

        let index33 = boton.getAttribute('data-index');
        let duration = document.querySelector('#offcanvasBottomReserva'+index33).getAttribute('data-duration');
        activarLoader(index33);

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

        deshabilitar(index33);
        irDiaActivo(fechaActiva, index33);
        let apagarLoader = true;
        manejarSeleccionFecha(fechaActiva, index33, duration, apagarLoader);
    });
});

//FUNCIÓN ABRIR MESES AÑO DESDE RESERVAR SERVICIO
// Función para abrir el modal y mostrar los meses
function showMeses(modal, containerMeses) {
    console.log(modal, containerMeses, "modal y container meses");
    var myModal = new bootstrap.Modal(document.getElementById(modal));
    myModal.show();
  }



// Función para encontrar el primer día que no sea domingo
function marcarPrimerDiaActivo(index) {
    let dias = document.querySelectorAll(`#carousel_dias${index} .carrusel-inner-dias .dia`);

    // Recorremos todos los días
    for (let i = 0; i < dias.length; i++) {
        let diaSemana = dias[i].getAttribute('data-diaSemana');
        let fechaDiaSemana = dias[i].getAttribute('data-date');

        console.log(diaSemana, "DIA SEMANA", fechaDiaSemana, "FECHA DIA SEMANA");

        // Si el día no es domingo ('dom.') lo marcamos como activo
        if (diaSemana !== 'dom.') {
            dias[i].classList.add('date_active');
            break; // Detiene el bucle una vez encontrado el primer día activo
        }
    }
}



function deshabilitar(index33){
    //DESHABILITAR SI ES SABADO O DOMINGO O LA FECHA QUE QUERAMOS
    let dias = document.querySelectorAll('#carousel_dias'+index33+' .carrusel-inner-dias .dia');
    // Array que contiene los días de la semana que deseas deshabilitar
    // let diasDeshabilitados = ['sáb.', 'dom.'];
    let diasDeshabilitados = ['dom.'];
    // Recorrer los elementos seleccionados
    dias.forEach(function(dia) {
        // Obtener el texto o contenido del div que representa el día de la semana
        let diaSemana = dia.getAttribute('data-diaSemana');  // Asegúrate de quitar los espacios en blanco

        // Verificar si el día pertenece al array de días deshabilitados
        if (diasDeshabilitados.includes(diaSemana)) {
            // Si es así, agregar la clase 'disabled'
            dia.classList.add('disabled');
        }
    });
}




//DEVUELVE EL TIEMPO TOTAL PARA REALIZAR EL SERVICIO, SUMA HORA INICIO MÁS HORA Y MINUTOS DEL SERVICIO
function tiempoTotal(horaInicio, horaTime, minuTime){
        // Paso 1: Convertir horaInicio a horas y minutos
    let [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number); // 9 y 0

    // Paso 2: Convertir horaTime y minuTime a números
    let sumaHoras = parseInt(horaTime, 10);
    let sumaMinutos = parseInt(minuTime, 10);

    // Paso 3: Sumar horas y minutos a la hora de inicio
    let nuevaHora = horaInicioHoras + sumaHoras;
    let nuevosMinutos = horaInicioMinutos + sumaMinutos;

    // Paso 4: Ajustar los minutos si es mayor o igual a 60
    if (nuevosMinutos >= 60) {
        nuevaHora += Math.floor(nuevosMinutos / 60);
        nuevosMinutos = nuevosMinutos % 60;
    }

    // Paso 5: Formatear la nueva hora y minutos a HH:mm
    let nuevaHoraFormateada = `${String(nuevaHora).padStart(2, '0')}:${String(nuevosMinutos).padStart(2, '0')}`;
    // console.log(nuevaHoraFormateada);  // Resultado: "10:05"
    return nuevaHoraFormateada;

}

//DEBUELVE LOS DÍAS QUE ESTÁN EN EL CONTENEDOR VISIBLE EN LA PANTALLA
function obtenerDiasVisibles2(index) {
    let carruselInner = document.querySelector('#carousel_dias' + index);

     // El contenedor del carrusel
    // console.log(carruselInner, "CAROUSELINER********************************************");

    let dias = document.querySelectorAll('#carousel_dias'+index+' .dia'); // Todas las tarjetas de días
    let carruselRect = carruselInner.getBoundingClientRect(); // Posición y tamaño del contenedor
    carruselRect.width = carruselRect.width + 100; // Ajustar el ancho del contenedor para evitar problemas de borde
    // console.log(carruselRect, "CAROUSEL RECT");

    // Array para almacenar los días visibles
    let diasVisibles = [];

    // Contador para limitar a 6 días visibles
    let contador = 0;

    dias.forEach(dia => {
        let diaRect = dia.getBoundingClientRect(); // Obtener la posición de cada día

        // Verificamos si el día está completamente dentro de los límites visibles del carrusel
        if (
            diaRect.left >= carruselRect.left && // El lado izquierdo del día no está fuera del contenedor a la izquierda
            diaRect.right <= carruselRect.right // El lado derecho del día no está fuera del contenedor a la derecha
        ) {
            // Solo añadir si no hemos alcanzado los 6 días
            if (contador <= 7) {
                diasVisibles.push(dia); // Si está visible, lo agregamos al array
                contador++; // Incrementamos el contador
            }
        }
    });

    // console.log('Días visibles en orden:', diasVisibles.length, diasVisibles);
    return diasVisibles;
}

function obtenerDiasVisibles(index) {
    let carruselInner = document.querySelector('#carousel_dias' + index);
    let dias = document.querySelectorAll('#carousel_dias' + index + ' .dia');
    let carruselRect = carruselInner.getBoundingClientRect();
    carruselRect.width += 100; // Ajuste por margen visual

    let diasVisibles = [];
    let contador = 0;

    dias.forEach(dia => {
        let diaRect = dia.getBoundingClientRect();

        // Verifica que el día esté completamente dentro del carrusel
        let esVisible =
            diaRect.left >= carruselRect.left &&
            diaRect.right <= carruselRect.right;

        if (!esVisible) return;

        // Verifica si tiene una clase de marcador
        let divMarker = dia.querySelector('.marker');
        if (!divMarker) return;

        let clases = divMarker.classList;
        let yaMarcado =
            clases.contains('markerVerde') ||
            clases.contains('markerNaranja') ||
            clases.contains('markerRojo');

        if (yaMarcado) return; // Excluir día marcado

        // Limitar a 6 días visibles (o los que necesites)
        if (contador <= 7) {
            diasVisibles.push(dia);
            contador++;
        }
    });

    return diasVisibles;
}


//CAMBIAR EL NOMBRE DEL MES SEGÚN LA VISUALIZACIÓN DE LOS DÍAS
function changeMont(indexChangeMont, visibleSlides){
    // Selecciona los elementos visibles con la clase "tns-slide-active"


    // Crear un Set para almacenar los meses visibles y otro para los años visibles
    var mesesVisibles = new Set();
    var anosVisibles = new Set();

    // Recorremos los slides visibles y obtenemos sus atributos "data-mes" y "data-ano"
    visibleSlides.forEach(function(slide) {
        var mesVisible = slide.getAttribute('data-mes'); // Obtener mes
        // console.log(mesVisible, "mes visible");

        var anoVisible = slide.getAttribute('data-ano'); // Obtener año (agrega el atributo data-ano en el HTML)

        if (mesVisible) {
            mesesVisibles.add(mesVisible);  // Guardar el mes
        }
        if (anoVisible) {
            anosVisibles.add(anoVisible);   // Guardar el año
        }
    });

    // Convertimos los Sets a arrays
    var mesesArray = Array.from(mesesVisibles);
    var anosArray = Array.from(anosVisibles);
    // console.log(mesesArray, "messes array");
    // console.log(anosVisibles, "anos visibles");

    var titulo = '';

    // Si hay más de un mes visible y todos los meses pertenecen al mismo año
    if (mesesArray.length > 1 && anosArray.length === 1) {
        // Mostrar ambos meses seguidos por el año
        titulo = mesesArray.join(' - ') + ' ' + anosArray[0];
        // console.log(titulo, "titulo");

    }
    // Si hay más de un mes visible y meses de diferentes años
    else if (mesesArray.length > 1 && anosArray.length > 1) {
        // Mostrar ambos meses con sus años respectivos
        var mesesConAnos = new Set(); // Usamos un Set para evitar duplicados

        visibleSlides.forEach(function(slide) {
            var mesVisible = slide.getAttribute('data-mes');
            var anoVisible = slide.getAttribute('data-ano');

            // Añadimos la combinación mes y año al Set
            mesesConAnos.add(mesVisible + ' ' + anoVisible);
        });

        // Convertimos el Set de vuelta a un Array y unimos los elementos con ' - '
        titulo = Array.from(mesesConAnos).join(' - ');
    }
    // Si solo hay un mes visible
    else if (mesesArray.length === 1 && anosArray.length === 1) {
        // Mostrar solo el mes y el año
        titulo = mesesArray[0] + ' ' + anosArray[0];
    }
    let DivMesAnio = document.getElementById('offcanvasBottomLabelReserva'+indexChangeMont);
    DivMesAnio.querySelector('.mesAtual'+indexChangeMont).textContent = titulo;
}


// OBTENER HORAS AL CLICAR EN UN DÍA Y LLAMA A "mostrarHoras()"
function obtenerHoras(fechaSeleccionada, index, duracionServicio) {
    activarLoader(index);

    let elementosActivos = document.querySelectorAll('.dia.date_active');
    elementosActivos.forEach(function(item) {
        item.classList.remove('date_active');
    });
    let elemento = document.querySelector(`#offcanvasBottomReserva${index} .dia[data-date="${fechaSeleccionada}"]`);
    elemento.classList.add('date_active');
    let botonCambiarEmple = document.querySelector(`#offcanvasBottomReserva${index} .botonChangeEmple`);
    botonCambiarEmple.setAttribute('data-diaseleccionado', fechaSeleccionada);
    // Crear y retornar una promesa
    return new Promise((resolve, reject) => {
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        let time_obtener = "obtener-horas";

        // Hacer una petición AJAX al servidor
        $.ajax({
            url: time_obtener, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken, // Token CSRF para seguridad
                fecha: fechaSeleccionada,
                duracion: duracionServicio
            },
            success: function(response) {
                const horasRecibidas = response.horasDisponibles;
                resolve(horasRecibidas);  // Resolvemos la promesa con las horas
            },
            error: function(xhr) {
                console.log('Error al obtener las horas', xhr);
                reject(xhr);  // Rechazamos la promesa si hay un error
            }
        });
        resetEmpleado(index);
    });
}

//obtener horas sin marcar día activo
function obtenerHorasNoDiaActivo(fechaSeleccionada, index, duracionServicio) {

    return new Promise((resolve, reject) => {
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        let time_obtener = "obtener-horas";

        // Hacer una petición AJAX al servidor
        $.ajax({
            url: time_obtener, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken, // Token CSRF para seguridad
                fecha: fechaSeleccionada,
                duracion: duracionServicio
            },
            success: function(response) {
                const horasRecibidas = response.horasDisponibles;
                resolve(horasRecibidas);  // Resolvemos la promesa con las horas
            },
            error: function(xhr) {
                console.log('Error al obtener las horas', xhr);
                reject(xhr);  // Rechazamos la promesa si hay un error
            }
        });
        resetEmpleado(index);
    });
}

// OBTENER HORAS AL CLICAR EN UN DÍA Y LLAMA A "mostrarHoras()"
function obtenerHorasMultipleReserva(fechaSeleccionada, index, duracionServicio, horaInicio) {

    activarLoader(index);
    console.log(index, fechaSeleccionada, horaInicio, "dentro de obtenerHorasMultiple y fecha seleccionada");
    let elementosActivos = document.querySelectorAll('.dia.date_active');
    elementosActivos.forEach(function(item) {
        item.classList.remove('date_active');
    });
    let elemento = document.querySelector(`#offcanvasBottomReserva${index} .dia[data-date="${fechaSeleccionada}"]`);
    elemento.classList.add('date_active');
    let botonCambiarEmple = document.querySelector(`#offcanvasBottomReserva${index} .botonChangeEmple`);
    botonCambiarEmple.setAttribute('data-diaseleccionado', fechaSeleccionada);
    // Crear y retornar una promesa
    return new Promise((resolve, reject) => {
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        let time_obtener = "obtener-horas";

        // Hacer una petición AJAX al servidor
        $.ajax({
            url: time_obtener, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken, // Token CSRF para seguridad
                fecha: fechaSeleccionada,
                duracion: 0
            },
            success: function(response) {
            let horasDisponibles = response.horasDisponibles;
            $('#carousel_horas' + index + ' .carrusel-inner').empty();

            // Añadir horas disponibles
           horasDisponibles.forEach(function(hora) {
                // Si la hora es "14:00", salta este ciclo y no la agrega
                if (hora === "14:00") {
                    return; // Salta al siguiente ciclo
                }

                $('#carousel_horas' + index + ' .carrusel-inner').append(`
                    <div class="hora" data-hora="${hora}" onclick="addActiveHora(${index}, this)">
                        <div class="nombre-hora">${hora}</div>
                    </div>
                `);
            });

            // Verificar si hay menos de 7 horas disponibles para que no hayan huecos entre las flechas
            let horasFaltantes = 6 - horasDisponibles.length;
            if (horasFaltantes > 0) {
                for (let i = 0; i < horasFaltantes; i++) {
                    $('#carousel_horas' + index + ' .carrusel-inner').append(`
                        <div class="hora disabled" data-hora="noDisponible" style="cursor: not-allowed;">
                            No disponible
                        </div>
                    `);
                }
            }

            let contenedorHoras = document.querySelector('#carousel_horas' + index + ' .carrusel-inner');
            let horaseleccionada = contenedorHoras.querySelector(`.hora[data-hora="${horaInicio}"]`);
            // a veces si el usuario tarda en seleccionar se pasa la hora activa es decir la hora seleccioada queda en el pasado
            if(horaseleccionada){
                horaseleccionada.classList.add('time_active');
                // Desplazar el carrusel a la hora activa
                irAHoraActiva(index);
                // Ocultar el spinner si está presente
                desactivarLoader(index);

            }else{
                //el usuario ha tardado mucho en seleccionar y la hora seleccionada queda en el pasado
                // window.location.href
                window.location.reload();
            }

            },
            error: function(xhr) {
                console.log('Error al obtener las horas', xhr);
                reject(xhr);  // Rechazamos la promesa si hay un error
            }
        });
        // resetEmpleado(index);
    });
}


//AL CLICAR EN HORA PONE CLASE ACTIVE ENTRE OTROS, RESETEA EMPLEADO A CUALQUIERA
function addActiveHora(index, elemento){
    let divHoras = document.querySelectorAll('#carousel_horas'+index+' .carrusel-inner .hora');

    let offcanvasActiveHora = document.querySelector('#offcanvasBottomReserva'+index);
    let serviciosMultiples = offcanvasActiveHora.querySelector('.serviciosMultiples');
    let contenedoresActiveHora = serviciosMultiples.querySelectorAll('.servicioContenedor');
    // console.log(contenedoresActiveHora.length, "contendores.leng activehora");
    let duracionReservaEmpleado = offcanvasActiveHora.getAttribute('data-duration');


    let horaInicioReservaEmpleado = elemento.getAttribute('data-hora');
    let fechaReservaEmpleado = offcanvasActiveHora.querySelector('.dia.date_active').getAttribute('data-date');
    let arrayDeServicios44 = [];
    let empleadas_disponibles = empleadasDisponibles;
    if(contenedoresActiveHora.length > 1){

        let contenedorInicial = document.getElementById('offcanvasBottomReserva' + indexOffcanvasReservaServicio);
        let contenedoresServicios = contenedorInicial.querySelectorAll('.servicioContenedor');

        contenedoresServicios.forEach(contenedor => {
            let servicioData = JSON.parse(contenedor.getAttribute('data-servicio'));
                arrayDeServicios44.push(servicioData);
        });

        let totalDuration = 0;
        arrayDeServicios44.forEach(servicio => {
            // servicio._uuid = crypto.randomUUID();
            let duracion = parseInt(servicio.duration, 10);
            if (!isNaN(duracion)) {
                totalDuration += duracion;
            }
        });

        // vaciar el modal de servicios seleccionados

        let listaNombres2 = document.getElementById('listaNombresServicios2');
        if(listaNombres2){
            listaNombres2.innerHTML = ''; // Limpiar la lista de servicios seleccionados
        }
        let listaNombreServiicosBody2 = document.querySelector('.listaNombreServiciosBody2');
        if(listaNombreServiicosBody2){
            listaNombreServiicosBody2.innerHTML = ''; // Limpiar el contenido del modal
        }

        //mostrar modal servicios seleccionados
        let listaNombres = document.getElementById('listaNombresServicios2');
        let totalSpan = document.getElementById('totalServiciosSeleccionados2');
        let total = 0;

        arrayDeServicios44.forEach(servicio => {
            // addServicesArray.push(servicio.id);
            const precio = parseFloat(servicio.precio); // Convertir a número
            total += precio; // ✅ Sumar aquí

            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.style.setProperty('background-color', 'transparent', 'important');

            li.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${servicio.nombre}</strong><br>
                        <small style='color: #868e96 !important;font-size:12px' class="text-muted">Duración: ${servicio.duration}</small>
                    </div>
                    <div class="text-end">${precio.toFixed(2)}€</div>
                </div>
            `;
            listaNombres.appendChild(li);
        });

        totalSpan.textContent = `${total.toFixed(2)}€`;
        let modal = new bootstrap.Modal(document.getElementById('modalServiciosSeleccionados2'));
        modal.show();
        console.log("array de servicios lleno", addServicesArray);


        //añadir las opciones a la lista de servicios seleccionados
        console.log(arrayDeServicios44, "ARRAY SERVICIOS 44");
         fetch(comprobarDisponibilidad, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                fecha: fechaReservaEmpleado,
                hora: horaInicioReservaEmpleado,
                servicios: arrayDeServicios44.map(s => ({ duration: parseInt(s.duration, 10) }))
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log("Respuesta completa del servidor:", data);

            let contenedorSugerencias = document.querySelector('.listaNombreServiciosBody2');
            let div = document.createElement('div');
            let contenidohtml = '';
            let duracionAHoras = formatearDuracion(totalDuration);
            if (data.disponible) {
                contenidohtml = `
                    <p>
                        <span style="color: #0bbd9a;><i style="margin-right: 5px;" class="bi bi-check-circle-fill"></i><strong> ${data.mensaje} Duración total: ${duracionAHoras}</strong></span><br>
                        Datos de la reserva:</br>
                        <span style="color: #adb1b0ff;margin-right: 5px;" class="icon mdi mdi-clock"></span>
                        ${data.nuevoFin}
                    </p>
                    <button
                        data-servicios='${JSON.stringify(arrayDeServicios44)}'
                        onclick="reservaMultipleAceptada1(this, '${horaInicioReservaEmpleado}', '${totalDuration}', '${fechaReservaEmpleado}')"
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px;border-color:#d6a769!important;">
                        ¡Sí, quiero reservar!
                    </button><br>
                     <button
                        data-servicios='${JSON.stringify(arrayDeServicios44)}'
                        onclick="reservaMultipleAceptada1(this, '${horaInicioReservaEmpleado}', '${totalDuration}', '${fechaReservaEmpleado}');irDiaActivo('${fechaReservaEmpleado}, ${index}')"
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px;border-color:#d6a769!important;">
                        Elegir otra hora para hola2 ${data.soloFecha}
                    </button><br>
                    `;
            } else {
                let mensaje = `
                    <p style="margin-bottom: 1rem;">
                    <i class="bi bi-info-circle"></i> ${data.mensaje}<br>
                    <strong><span style='color:#0bbd9a;'>${data.mensajeSecundario}</span></strong>

                    </p>
                    `;

                let sugerencias = [];

                // Normalización segura de sugerencias
                try {
                    if (data.sugerencias?.original?.sugerencias) {
                        if (Array.isArray(data.sugerencias.original.sugerencias)) {
                            sugerencias = data.sugerencias.original.sugerencias;
                        } else {
                            sugerencias = Object.values(data.sugerencias.original.sugerencias);
                        }
                    } else if (Array.isArray(data.sugerencias)) {
                        sugerencias = data.sugerencias;
                    } else if (typeof data.sugerencias === 'object' && data.sugerencias !== null) {
                        sugerencias = Object.values(data.sugerencias);
                    }
                } catch (e) {
                    console.warn("Error procesando sugerencias:", e, data.sugerencias);
                }

                console.log("Sugerencias normalizadas:", sugerencias);

                if (Array.isArray(sugerencias) && sugerencias.length > 0) {
                    mensaje += `<div class="sugerenciasDisponibles">`;

                   sugerencias
                .filter(opcion => opcion && opcion.inicio && opcion.fin)
                .forEach((opcion, index) => {
                    let inicio = formatearCitaSugerida(opcion.inicio);
                    let fin = formatearCitaSugerida(opcion.fin);

                    mensaje += `
                        <div class="opcion-sugerida mb-3 p-3 border rounded">
                            <div class="row">
                                <div class="col-8">
                                    <p class="datos-sugerencia">
                                        <span class="mdi mdi-calendar-clock text-success"></span>
                                        ${inicio.diaMes} de ${inicio.hora} a ${fin.hora}
                                    </p>
                                </div>
                                <div class="col-4" style="margin-top: 0.5rem;">
                                    <div class="elementor-button-wrapper">
                                        <a style="text-decoration:none;"
                                            class="elementor-sugerencia elementor-button elementor-button-link elementor-size-sm entrar_registrase"
                                            href="#"
                                            onclick="reservaMultipleAceptada1(this, '${opcion.inicio}', '${totalDuration}', '${opcion.inicio}')"
                                            data-servicios='${JSON.stringify(arrayDeServicios44)}'>
                                            <span class="elementor-button-content-wrapper" style="color: white">
                                                <span class="elementor-button-text">Me interesa!</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });

                    mensaje += `</div>  <br>
                     <button
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px;border-color:#d6a769!important;"
                        onclick="cleanViewMoreService();resetContadorSegunTotalArray();desmarcarCheckboxesYCerrarAcordeon();closeAddMoreService();" type="button" class="btn-close" data-bs-dismiss="modal">
                        Elegir otro día
                    </button>`;
                } else if (data.sugerencia) {
                    let inicio = formatearCitaSugerida(data.sugerencia.inicio);
                    let fin = formatearCitaSugerida(data.sugerencia.fin);

                    mensaje += `
                        <i style="font-size: 17px;color: blue;" class="bi bi-arrow-right-circle-fill"></i>
                        Siguiente opción:<br>
                        El ${inicio.diaMes} de ${inicio.hora} a ${fin.hora}<br>`;
                }

                contenidohtml = mensaje;
            }

            div.innerHTML = contenidohtml;
            contenedorSugerencias.appendChild(div);

            console.log(fechaReservaEmpleado, "fecha reserva", horaInicioReservaEmpleado, "hora inicio reserva", arrayDeServicios44, "SERVICIOS GETBYID");
        })
        .catch(error => {
            console.error('❌ Error al comprobar disponibilidad:', error);
            alert('❌ Ocurrió un error al comprobar la disponibilidad.');

        });

    }else{
         $.ajax({
                url: empleadas_disponibles, // Ruta que definimos en web.php
                method: 'POST',
                data: {
                    _token: csrfToken, // Token CSRF para seguridad
                    horaInicioReserva: horaInicioReservaEmpleado,
                    duracionReserva: duracionReservaEmpleado,
                    fechaReserva: fechaReservaEmpleado
                },
                success: function(response) {
                    let disponibilidadEmpleados = response.disponibilidadEmpleados;
                    console.log(disponibilidadEmpleados, "disponibilidad empleados");
                    if (disponibilidadEmpleados.every(emp => emp.disponible === false)) {
                        console.log('Ningún empleado disponible');
                        Swal.fire({
                            // imageUrl: 'https://salonnail.kesug.com/storage/images/ups_manicura.png',
                            imageUrl: 'http://localhost/laravel/salon-manicura-git/public/storage/images/ups_manicura.png', // Imagen personalizada como icono
                            imageWidth: 128, // Tamaño de la imagen
                            // imageHeight: 80, // Tamaño de la imagen
                            imageAlt: 'África Nails studio dice: Esta hora no está disponible, selecciona otra.', // Texto alternativo para la imagen
                            title: 'La hora seleccionada no está disponible',
                            text: 'Por favor, elija otra.',
                            background: '#ffff', // Color de fondo suave
                            backdrop: `
                                rgba(17, 17, 18, 0.4)
                                url("http://localhost/laravel/salon-manicura-git/public/storage/images/nyan-cat.gif")
                                left top
                                no-repeat
                            `,
                            //  backdrop: `
                            //     rgba(17, 17, 18, 0.4)
                            //     url("http://https://salonnail.kesug.com/storage/images/nyan-cat.gif")
                            //     left top
                            //     no-repeat
                            // `,
                            color: '#000000', // Texto en negro
                            confirmButtonColor: '#d6a769', // Color del botón de confirmar
                            confirmButtonText: 'Cerrar',
                            showCloseButton: true, // Mostrar un botón para cerrar el alert

                            customClass: {
                                popup: 'custom-swal-popup', // Clase personalizada para poder ajustar aún más el estilo
                                title: 'custom-swal-title',
                                content: 'custom-swal-content',
                                confirmButton: 'custom-swal-button',
                            },
                            }).then(() => {
                                console.log("El alert se ha cerrado");
                                manejarSeleccionFecha(fechaReservaEmpleado, index, duracionReservaEmpleado);
                                // Llamar a tu función después de que el alert se cierra
                                // miFuncionAlCerrar();
                            });
                    }else{
                        divHoras.forEach(function(div) {
                            div.classList.remove('time_active');
                        });
                        if(elemento){
                            elemento.classList.add('time_active');
                            addTotalTime(index, elemento);
                            console.log("Hay empleados disponibles");
                            resetEmpleado(index);
                        }else{
                            window.location.reload();
                        }

                    }
                },
                error: function(xhr) {
                    console.log('Error al obtener las horas', xhr);
                     if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                        // Redirige al login si la sesión ha expirado
                        window.location.href = 'login';
                    }
                }
            });

    }
    //comprobar si hay empleados disponibles
    //al cambiar de hora resetamos empleado

}

function ponerBienLasHoras(index){

}

//funcion que cierra el offcanvas de añadir más servicios si ya está abierto
function closeAddMoreService(){
    const offcanvasEl = document.getElementById('offcanvasAddService');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
    offcanvas.hide();
}

function resetEmpleado(index){

    let visualizadorImagenEmpleadoSeleccionado12 = document.querySelector(`[data-testid="participant-label-avatar${index}"]`);

    let visualizadorNombreEmpleadoSeleccionado12 = document.querySelector(`[data-empleado="participant-label-name${index}"]`);

    $(visualizadorImagenEmpleadoSeleccionado12).empty();
    if(visualizadorNombreEmpleadoSeleccionado12){
        visualizadorNombreEmpleadoSeleccionado12.innerHTML = 'Cualquiera';
    }
}

function resetEmpleadoMultiple(index){

}

// MUESTRA LAS HORAS AL CLICAR EN UN DÍA
function mostrarHoras(horas, index) {
    horasDisponibles = horas;
    // console.log(index, "index dentro de mostrarHoras");
        // console.log(horasDisponibles.length, "HORAS DISPONIBLES LENG");
        $('#carousel_horas' + index + ' .carrusel-inner').empty();

        // Añadir horas disponibles
        horasDisponibles.forEach(function(hora) {
            $('#carousel_horas' + index + ' .carrusel-inner').append(`
                <div class="hora" data-hora="${hora}" onclick="addActiveHora(${index}, this)">
                    <div class="nombre-hora">${hora}</div>
                </div>
            `);
        });

        // Verificar si hay menos de 7 horas disponibles para que no hayan huecos entre las flechas
        let horasFaltantes = 6 - horasDisponibles.length;
        if (horasFaltantes > 0) {
            for (let i = 0; i < horasFaltantes; i++) {
                $('#carousel_horas' + index + ' .carrusel-inner').append(`
                    <div class="hora disabled" data-hora="noDisponible" style="cursor: not-allowed;">
                       No disponible
                    </div>
                `);
            }
        }
    }

//AL CLICAR EN LAS FLECHAS SLIDER DIAS SEMANA DESPLAZA DIAS DERECHA O IZQUIERDA
let desplazamientoDias = 0;
let numDiasVisiblesDias = 5;

let pixelesMargen = window.innerWidth < 980 ? 10 : 8;

window.addEventListener('resize', () => {
    pixelesMargen = window.innerWidth < 980 ? 10 : 8;
    // console.log("📏 Nuevo valor de numDiasVisiblesDias:", pixelesMargen);
});

async function desplazarDias(direccion, index) {


    let carruselInnerDias = document.querySelector('#carousel_dias' + index + ' .carrusel-inner');
    const anchoTarjeta = carruselInnerDias.children[0].offsetWidth + pixelesMargen;
    const totalHoras = carruselInnerDias.children.length;
    const maxDesplazamiento = -(anchoTarjeta * (totalHoras - numDiasVisiblesDias));

    desplazamiento += direccion * (anchoTarjeta * numDiasVisiblesDias);

    if (desplazamiento > 0) {
        desplazamiento = 0;
    } else if (desplazamiento < maxDesplazamiento) {
        desplazamiento = maxDesplazamiento;
    }

    carruselInnerDias.style.transform = `translateX(${desplazamiento}px)`;

    if (direccion === -1) {
        activarLoader(index);
        let offcanvasPrincipal = document.querySelector('#offcanvasBottomReserva' + index);
        let servicios99 = offcanvasPrincipal.querySelectorAll('.servicioContenedor');

        //comprobamos si ha más de un servicio para sumar el total de duración
        let duration = servicios99.length > 1
        ? Array.from(servicios99) // Convierte los elementos de servicios en un array
            .map(el => JSON.parse(el.getAttribute('data-servicio'))) // Parsea el JSON de cada atributo data-servicio
            .reduce((total, servicio) => total + servicio.duration, 0) // Suma la duración de todos los servicios
        // Si solo hay un servicio seleccionado
        : parseInt(offcanvasPrincipal.getAttribute('data-duration'), 10); // Toma la duración desde el atributo del contenedor


        // Usamos una espera corta solo para evitar bloqueos (puedes eliminarla si no hace falta)
        setTimeout(() => {
            let diasVisibles = obtenerDiasVisibles(index);
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            let time_obtener = "obtener-horas";

            let promesas = Array.from(diasVisibles).map(dia => {
                return new Promise((resolve) => {
                    let divMarketr = dia.querySelector('.marker');
                    let fecha55 = dia.getAttribute('data-date');
                    let diaSemana = dia.getAttribute('data-diaSemana');

                    $.ajax({
                        url: time_obtener,
                        method: 'POST',
                        data: {
                            _token: csrfToken,
                            fecha: fecha55,
                            duracion: duration
                        },
                        success: function(response) {
                            const horasRecibidas = response.horasDisponibles;
                            let porcentaje = calcularPorcentajeDisponibilidad(horasRecibidas, parseInt(duration), diaSemana);

                            resolve({ dia, divMarketr, porcentaje });
                        },
                        error: function(xhr) {
                            console.error('Error al obtener las horas', xhr);
                            resolve(null); // Continua con los demás aunque falle uno
                        }
                    });
                });
            });

            Promise.all(promesas).then(resultados => {
                for (let resultado of resultados) {
                    if (!resultado) continue;

                    const { dia, divMarketr, porcentaje } = resultado;

                    if (porcentaje > 50) {
                        if (divMarketr && !divMarketr.classList.contains('markerVerde')) {
                            divMarketr.classList.remove('markerRojo', 'markerNaranja');
                            divMarketr.classList.add('markerVerde');
                        }
                        dia.classList.remove('disabledcomplet');
                    } else if (porcentaje === 0) {
                        if (divMarketr && !divMarketr.classList.contains('markerRojo')) {
                            divMarketr.classList.remove('markerNaranja', 'markerVerde');
                            divMarketr.classList.add('markerRojo');
                        }
                        dia.classList.add('disabledcomplet');
                    } else {
                        if (divMarketr && !divMarketr.classList.contains('markerNaranja')) {
                            divMarketr.classList.remove('markerRojo', 'markerVerde');
                            divMarketr.classList.add('markerNaranja');
                        }
                        dia.classList.remove('disabledcomplet');
                    }

                   console.log(`📅 Fecha: ${dia.getAttribute('data-date')} → Porcentaje: ${porcentaje}%`);
                }


                changeMont(index, diasVisibles);
                desactivarLoader(index);
            });

        }, 500); // Delay reducido (o puedes quitarlo)
    } else {
        setTimeout(() => {
            let diasVisibles = obtenerDiasVisibles2(index);
            changeMont(index, diasVisibles);
        }, 100);
    }
}


// async function obtenerHorasCalcularPorcentajeDisponi(fecha55, duration, index, diasVisibles, dia, diaSemana, divMarketr) {
//     let csrfToken = $('meta[name="csrf-token"]').attr("content");
//     let time_obtener = "obtener-horas";
//     try {
//         const response = await fetch(time_obtener, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': csrfToken
//             },
//             body: JSON.stringify({
//                 fecha: fecha55,
//                 duracion: duration
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         const horasRecibidas = data.horasDisponibles;

//         changeMont(index, diasVisibles);

//         const porcentaje = calcularPorcentajeDisponibilidad(horasRecibidas, parseInt(duration), diaSemana);

//         if (porcentaje > 50) {
//             divMarketr?.classList.remove('markerRojo', 'markerNaranja');
//             divMarketr?.classList.add('markerVerde');
//             dia.classList.remove('disabledcomplet');
//         } else if (porcentaje === 0) {
//             divMarketr?.classList.remove('markerNaranja', 'markerVerde');
//             divMarketr?.classList.add('markerRojo');
//             dia.classList.add('disabledcomplet');
//         } else {
//             divMarketr?.classList.remove('markerRojo', 'markerVerde');
//             divMarketr?.classList.add('markerNaranja');
//             dia.classList.remove('disabledcomplet');
//         }

//         desactivarLoader(index);
//     } catch (error) {
//         console.error('❌ Error al obtener las horas:', error);
//         throw error; // Puedes manejarlo o rechazar una promesa si lo usas dentro de una
//     }
// }

//AL CLICAR EN LAS FLECHAS DESPLAZA HORAS DERECHA O IZQUIERDA
let desplazamiento = 0;
const numDiasVisibles = 6;

async function desplazar(direccion, index) {
    let carruselInner = document.querySelector('#carousel_horas'+index+' .carrusel-inner');
    const anchoTarjeta = carruselInner.children[0].offsetWidth + 10; // 10px de margen
    const totalHoras = carruselInner.children.length;
    const maxDesplazamiento = -(anchoTarjeta * (totalHoras - numDiasVisibles));
    // console.log(maxDesplazamiento, "MAXIMO DESPLAZAMIENTO");

    desplazamiento += direccion * (anchoTarjeta * numDiasVisibles);

    // Asegurarse de no sobrepasar los límites
    if (desplazamiento > 0) {
        desplazamiento = 0; // No desplazarse más a la izquierda
    } else if (desplazamiento < maxDesplazamiento) {
        desplazamiento = maxDesplazamiento; // No desplazarse más allá del último bloque
    }
    carruselInner.style.transform = `translateX(${desplazamiento}px)`;

}


// MOVER LAS HORAS HACIA LA PRIMERA CASILLA , INICIALIZAR CAROUSEL HORAS
function irAlInicio(index) {
    let carruselInner = document.querySelector('#carousel_horas'+index+' .carrusel-inner');
    desplazamiento = 0; // Restablece el desplazamiento a 0 (el inicio)
    carruselInner.style.transform = `translateX(0px)`; // Mueve el carrusel al inicio
}

//AÑADE LA CLASE ACTIVE A LA PRIMERA HORA visualiza tiempo necesario tiempo total
function initActiveClassHora(index, duration, apagarLoader = false) {
    setTimeout(() => {
        const primeraCasilla = document.querySelector('#carousel_horas'+index+' .carrusel-inner').children[0];
        // console.log(primeraCasilla, "primera casilla");

        primeraCasilla.classList.add('time_active');
        addTotalTime(index, primeraCasilla);
        if(apagarLoader === true){
        // console.log("APAGAR LOADER VERDADERO");
            desactivarLoader(index);
        }
    }, 900);
}

//AÑADE LA CLASE ACTIVE A LA HORA QUE LE MANDES
function initActiveClassHoraElegida(index, horaActiva, apagarLoader = false) {
    // console.log(index);
    // console.log('#carousel_horas'+index);

    setTimeout(() => {
         // 1. Obtener todos los divs con clase .dia
        let dias66 = document.querySelectorAll(`#carousel_horas${index} .hora`);

        // 2. Quitar la clase time_active a todos
        dias66.forEach(d => d.classList.remove('time_active'));
       let divSeleccionado = document.querySelector(`#carousel_horas${index} .hora[data-hora="${horaActiva}"]`);
        // console.log(primeraCasilla, "primera casilla");

        divSeleccionado.classList.add('time_active');
        addTotalTime(index, divSeleccionado);
        if(apagarLoader === true){
        // console.log("APAGAR LOADER VERDADERO");
            desactivarLoader(index);
        }

    }, 900);
}

//PONER TOTAL TIEMPO EN VISUALIZADOR TOTAL TIEMPO
function addTotalTime(index, casilla){
    let horaTime = document.querySelector('#offcanvasBottomReserva'+index).getAttribute('data-service_h');
    let minuTime = document.querySelector('#offcanvasBottomReserva'+index).getAttribute('data-service_m');
    let botonContinuarReserva = document.querySelector('#offcanvasBottomReserva'+index+' .confirm-button-reservaNewService');
    let horaInicio = casilla.getAttribute('data-hora');
    let totalTiempo = tiempoTotal(horaInicio, horaTime, minuTime);
    let visualizadorDesdeHasta = document.querySelector('#offcanvasBottomReserva'+index+' .tiempoNecesario');
    if (horaInicio === 'noDisponible') {
        botonContinuarReserva.classList.add('botonDisabled');
        $('.botonDisabled').prop('disabled', true);
        visualizadorDesdeHasta.textContent = ('No hay disponibilidad');
    }else{
        $('.botonDisabled').prop('disabled', false);
        botonContinuarReserva.classList.remove('botonDisabled');
        visualizadorDesdeHasta.textContent=(horaInicio +' - '+totalTiempo);
    }
    //asignamos hora inicio a todos los botones de "cambiar empleado"
    let botonesCambiarEmpleado = document.querySelectorAll('.customOpenModalSelectEmpleButton');
    botonesCambiarEmpleado.forEach(function(boton) {
        //asignar valor a atributo
        boton.setAttribute('data-inicioServicio', horaInicio);

    });
}

//AL CLICAR SOBRE UN DÍA DE LA SEMANA AÑADE LA CLASE ACTIVE ENTRE OTROS
function addDateActive(fecha, elemento, index){
    irAlInicio(index);
    initActiveClassHora(index);
    var elementosActivos = document.querySelectorAll('.dia.date_active');
    elementosActivos.forEach(function(item) {
        item.classList.remove('date_active');
    });
    // console.log(elemento);


    elemento.classList.add('date_active');
    //actualizo la fecha para el botón seleccionar empleado
    var botonesSelectEmpleadoActualizarFecha = document.querySelectorAll('.customOpenModalSelectEmpleButton');
    botonesSelectEmpleadoActualizarFecha.forEach(function (botonEmpleadofechAc) {
        botonEmpleadofechAc.setAttribute('data-diaSeleccionado', fecha);
    });
    //  console.log('Fecha seleccionada:', fecha);
}

//ABRE MODAL SELECCIONAR EMPLEADO, petición ajax disponibilidad empleado  onclick="mostrarModalSelecEmpleado('${indexOffcanvasReservaServicio}', this, 'participant-label-avatar${index}-multiple')"
var botonesSelectEmpleado = document.querySelectorAll('.customOpenModalSelectEmpleButton');
botonesSelectEmpleado.forEach(function (botonEmpleado) {
    botonEmpleado.addEventListener('click', function(event){
        let horaInicioReservaEmpleado = botonEmpleado.getAttribute('data-inicioServicio');
        console.log(horaInicioReservaEmpleado, "hora inicio empleado");
        if(horaInicioReservaEmpleado === 'noDisponible'){
            console.log("no hat disponibilidad");

        }
        else{
            let duracionReservaEmpleado = botonEmpleado.getAttribute('data-duration');
            let fechaReservaEmpleado = botonEmpleado.getAttribute('data-diaSeleccionado');
            console.log(duracionReservaEmpleado, "duración reserva", fechaReservaEmpleado, "fecha reservaEmpleadao");
            let indexCambiarEmpleado = botonEmpleado.getAttribute('data-index');
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            // let empleadas_disponibles = "empleadas-disponibles";
            let empleadas_disponibles = empleadasDisponibles;
            // Hacer una petición AJAX al servidor
            $.ajax({
                url: empleadas_disponibles, // Ruta que definimos en web.php
                method: 'POST',
                data: {
                    _token: csrfToken, // Token CSRF para seguridad
                    horaInicioReserva: horaInicioReservaEmpleado,
                    duracionReserva: duracionReservaEmpleado,
                    fechaReserva: fechaReservaEmpleado
                },
                success: function(response) {
                    const disponibilidadEmpleados = response.disponibilidadEmpleados;
                    console.log(disponibilidadEmpleados, "disponibilidad empleados");

                    // Recorrer el array usando forEach
                    actualizarDisponibilidadEmpleados(disponibilidadEmpleados, `#selectEmpleModal${indexCambiarEmpleado}`);
                    disponibilidadEmpleados.forEach(function(empleado) {

                        console.log('ID del Empleado:', empleado.idEmpleado);
                        console.log('Nombre del Empleado:', empleado.empleado);
                        console.log('Disponible:', empleado.disponible ? 'Sí' : 'No');
                    });
                },
                error: function(xhr) {
                    console.log('Error al obtener las horas', xhr);
                     if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                        // Redirige al login si la sesión ha expirado
                        window.location.href = 'login';
                    }
                }
            });

            //abrimos el modal

            event.preventDefault();
            console.log("clic botón  seleccionarEmpleado", indexCambiarEmpleado);
            var modalElement = new bootstrap.Modal(document.getElementById('selectEmpleModal'+indexCambiarEmpleado));
            modalElement.show();
        }
    });
});


// PONE ROJO SI EMPLIADO NO DISPONIBLE Y VERDE SI SI
function actualizarDisponibilidadEmpleados(disponibilidadEmpleados, modal) {
    // if(reservaMultiple=== null){
    //     reservaMultiple = '';
    // }else{
    //     reservaMultiple = reservaMultiple;
    // }
    // console.log(reservaMultiple, "RESERVA MULTIPLE EN ACTUALIZAR DISPONIBILIDAD");

    disponibilidadEmpleados.forEach(function(empleado) {
        // Seleccionar el elemento correspondiente al empleado en el DOM usando su ID
        const selectorBase = `${modal} [data-empId="${empleado.idEmpleado}"]`;
        console.log(selectorBase, "selector base empleado");

        const empleadoDiv = document.querySelector(selectorBase);
        // empleadoDiv.setAttribute('data-multiple', reservaMultiple);
        const divAvatarEmpleado = document.querySelector(`${selectorBase} .avatarEmpleado`);
        const cursorEmpleado = document.querySelector(`${selectorBase} .empleadoCambiarCursor`);
        // cursorEmpleado.setAttribute('data-multiple', reservaMultiple);

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
            }
        }
    });
}


//AL CLICAR EN EL EMPLEADO DENTRO DEL MODAL SELECCIONAR EMPLEADO
function selectEmpleado(elemento, empleado_id, empleado_nombre, empleado_imagen) {
    console.log(elemento, "ELEMENTO");
    let visualizadorImagenEmpleadoSeleccionado = '';
    let visualizadorNombreEmpleadoSeleccionado = '';
    if (elemento.classList.contains('empleadoDisabled')) return;

    let index = elemento.getAttribute('data-index');
    let empleadosPonerCheck = document.querySelectorAll('.avatarEmpleado');
    empleadosPonerCheck.forEach(function (empleado) {
        empleado.classList.remove('avatar-selected');
    });

    elemento.querySelector('.avatarEmpleado').classList.add('avatar-selected');
    let esReservaMultiple = elemento.getAttribute('data-multiple');
     console.log('RESERVA MULTIPLE selectEmpleado:', esReservaMultiple);

    let offcanvasActiveHora = document.querySelector('#offcanvasBottomReserva'+index);
    let serviciosMultiples = offcanvasActiveHora.querySelector('.serviciosMultiples');
    let contenedoresActiveHora = serviciosMultiples.querySelectorAll('.servicioContenedor');
    if(esReservaMultiple === 'null' || esReservaMultiple === null ){
         visualizadorImagenEmpleadoSeleccionado = document.querySelector(`[data-testid="participant-label-avatar${index}"]`);
        visualizadorNombreEmpleadoSeleccionado = document.querySelector(`[data-empleado="participant-label-name${index}"]`);
        console.log('NO ES RESERVA MULTIPLE', visualizadorNombreEmpleadoSeleccionado);
    }else if(contenedoresActiveHora.length === 1){
        visualizadorImagenEmpleadoSeleccionado = document.querySelector(`[data-testid="participant-label-avatar${index}"]`);
        visualizadorNombreEmpleadoSeleccionado = document.querySelector(`[data-empleado="participant-label-name${index}"]`);
        console.log('NO ES RESERVA MULTIPLE', visualizadorNombreEmpleadoSeleccionado);
    }else{
        visualizadorImagenEmpleadoSeleccionado = document.querySelector(`[data-testid="${esReservaMultiple}"]`);
        visualizadorNombreEmpleadoSeleccionado = document.querySelector(`[data-empleado="${esReservaMultiple}"]`);
        console.log('ES RESERVA MULTIPLE:', esReservaMultiple);
    }


    if (empleado_id === 0) {
        visualizadorNombreEmpleadoSeleccionado.innerHTML = 'Cualquiera';
        visualizadorNombreEmpleadoSeleccionado.setAttribute('data-empleId', 'cualquiera');
        $(visualizadorImagenEmpleadoSeleccionado).empty();
    } else {
        $(visualizadorImagenEmpleadoSeleccionado).empty();
        $(visualizadorImagenEmpleadoSeleccionado).append(`
            <div class="avatar avatar-rounded avatar-sm" style="background-image: url(../storage/${empleado_imagen});"></div>
        `);
        visualizadorNombreEmpleadoSeleccionado.innerHTML = empleado_nombre;
        visualizadorNombreEmpleadoSeleccionado.setAttribute('data-empleId', empleado_id);
    }
}



//ABRE MODAL CANCELAR RESERVA SERVIVIO
var botonesAbrirModal = document.querySelectorAll('.customOpenModalCancelServiceButton');
botonesAbrirModal.forEach(function (boton) {
    boton.addEventListener('click', function(event){
        let index44 = boton.getAttribute('data-index');
        event.preventDefault();
        console.log("clic botón abrrir cancela servicvio", index44);
        var modalElement = new bootstrap.Modal(document.getElementById('cancelReservaModal'+index44));
        modalElement.show();

    });
});


//ABRE MODAL CANCELAR RESERVA SERVIVIO DESDE CONFIRMAR SERVICIO
var botonesAbrirModal = document.querySelectorAll('.customOpenModalCancelServiceButtonComfirmService');
botonesAbrirModal.forEach(function (boton) {
    boton.addEventListener('click', function(event){
        let index44 = boton.getAttribute('data-index');
        event.preventDefault();
        console.log("clic botón abrrir cancela servicvio", index44);
        var modalElement = new bootstrap.Modal(document.getElementById('cancelReservaModalConfirmarServicio'+index44));
        modalElement.show();

    });
});

//RESETEA NOMBRE EMPLEADO A "CUALQUIERA"
function resetNameEmpleado(index){
    //reseta nombre empleado a "cualquiera"
    let visualizadorNombreEmpleadoReset = document.querySelector(`[data-empleado="participant-label-name${index}"]`);
    if(!visualizadorNombreEmpleadoReset) {
        visualizadorNombreEmpleadoReset = document.querySelector(`[data-empleado="participant-label-avatar${index}-multiple"]`);
        console.log(visualizadorNombreEmpleadoReset);

    }
    //eliminamos imagen del empleado
    let visualizadorImagenEmpleadoSeleccionadoReset = document.querySelector(`[data-testid="participant-label-avatar${index}"]`);
    if(!visualizadorImagenEmpleadoSeleccionadoReset) {
        visualizadorImagenEmpleadoSeleccionadoReset = document.querySelector(`[data-testid="participant-label-avatar${index}-multiple"]`);
    }
    $(visualizadorImagenEmpleadoSeleccionadoReset).empty();
    //ponemos cualquiera
    visualizadorNombreEmpleadoReset.textContent = ('Cualquiera');
}


function cerrarOffcanvas(idOffcanva, fechaActual, index, desdehasta = null){
    console.log("has hecho click cerrarOfCanvas1", idOffcanva);

    var offcanvasElement = document.getElementById(idOffcanva);

    // Crear una instancia del offcanvas de Bootstrap
    var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);

    // Si no existe instancia (si no ha sido inicializada), inicializarla
    if (!offcanvasInstance) {
        offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
    }
    let divfechaActiva1 = document.getElementById(`offcanvasBottomReserva${index}`);
    let divfechaActiva = divfechaActiva1.querySelector('.dia.date_active');
    console.log(divfechaActiva, "DIV FECHA");

    let fechaActiva = divfechaActiva.getAttribute('data-date');
    irDiaActivo(fechaActiva, index);
    irAHoraActiva(index);

    let idServicioInicial = document.querySelector(`#offcanvasBottomReserva${index} .serviciosMultiples[data-servicioid] `);
    idServicioInicial = idServicioInicial.getAttribute('data-servicioid');
    let fechaActual9696 = document.querySelector(`.contenedorNewReserva[data-index="${index}"]`).getAttribute('data-fechaactual');
    let horaInicio96966 = document.querySelector(`.contenedorNewReserva[data-index="${index}"]`).getAttribute('data-horainicio');


    let contenedorServicios = document.querySelectorAll(`#offcanvasBottomReserva${index} .serviciosMultiples`);

     $(contenedorServicios).empty();
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    // // var url = "get-serviceById";
    $.ajax({
        url: obtenerServicioById, // Ruta que definimos en web.php
        method: 'POST',
        data: {
            _token: csrfToken, // Token CSRF para seguridad
            id_service: idServicioInicial,
        },
        success: function(data) {
            console.log(data, "DATA SERVICIO POR ID");
            let html = `
               <div class="servicioContenedor" data-service_id="${data.servicio.id}"  data-servicio='${JSON.stringify(data.servicio)}'>
                <div class="subbooking-list" style="">
                    <div class="pos-relative box">
                        <div class="divided">
                            <div>
                                <div class=" row">
                                    <div class="col-8">
                                        <h4 style="font-family: 'gualazonF';font-size: 15px;" class="m-0 font-medium line-break-anywhere">${data.servicio.nombre}</h4>
                                    </div>
                                    <div class=" col-4 text-right">
                                        <div class="font-h4">${data.servicio.precio} €</div>
                                        <div class="text-h5 text-gray tiempoNecesario">
                                            ${desdehasta}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class=" d-flex align-items-center">
                                    <div class=" d-flex flex-column b-flex-fill">
                                        <div class=" align-items-center d-flex">
                                            <div class=" me-1 text-secondary b-font-h5">
                                                Empleado:
                                            </div>
                                            <div data-testid="participant-label-avatar${index}"
                                                class="b-mr-1">
                                            </div>
                                            <div data-empleId="cualquiera"
                                                data-empleado="participant-label-name${index}"
                                                class="b-flex-fill b-font-h5 empleadoNombreId${index}">
                                                Cualquiera
                                            </div>
                                        </div>
                                    </div>
                                    <button data-diaSeleccionado="${fechaActual9696}"
                                        data-index="${index}" data-inicioServicio="${horaInicio96966}"
                                        data-duration="${data.servicio.duration}"
                                        onclick="mostrarModalSelecEmpleado('${indexOffcanvasReservaServicio}', this)"
                                        class="customOpenModalSelectEmpleButton botonChangeEmple">cambiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            `;
             $(contenedorServicios).append(html);
        },
        error: function(xhr) {
            console.log('Error al guardar el nombre de la categoria', xhr);
             if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                    // Redirige al login si la sesión ha expirado
                    window.location.href = 'login';
                }
        }
    });
    //activar enlace añadir mas servicios
    //  let offcanvasActual = document.getElementById('offcanvasBottomReserva'+ index);
    // let enlaceAniarirMas = offcanvasActual.querySelector('.enlaceMasServicio');
    activarEnlace('offcanvasBottomReserva'+ index);
    // Cerrar el offcanvas
    offcanvasInstance.hide();
}

function cerrarOffcanvas2(idOffcanva, fechaActual, index, desdehasta = null){
    // console.log("has hecho click", idOffcanva);

    var offcanvasElement = document.getElementById(idOffcanva);

    // Crear una instancia del offcanvas de Bootstrap
    var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);

    // Si no existe instancia (si no ha sido inicializada), inicializarla
    if (!offcanvasInstance) {
        offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
    }
    let divfechaActiva1 = document.getElementById(`offcanvasBottomReserva${index}`);
    let divfechaActiva = divfechaActiva1.querySelector('.dia.date_active');
    // console.log(divfechaActiva, "DIV FECHA");

    let fechaActiva = divfechaActiva.getAttribute('data-date');
    irDiaActivo(fechaActiva, index);
    irAHoraActiva(index);
    offcanvasInstance.hide();
}


//VERIFICA SI USUARIO ESTÁ AUTENTICADO Y EMAIL VERIFICADO
function userIsAutenticated(botonDorado = null) {
    // Realizar la verificación de autenticación y validación de email
    // console.log("clic verificar");

   fetch(window.routes.verificarAuth)
        .then(response => response.json())
        .then(data => {
            if (data.authenticated && data.email_verified) {

            } else if (!data.authenticated) {
                // Si no está autenticado, redirige a la página de login
                window.location.href = 'login';
            } else if (!data.email_verified) {
                // Si el email no está verificado, redirige a la página de verificación de email
                window.location.href = 'email/verify';
            }
            if(botonDorado === 'botonDorado'){
                const servicesSection = document.getElementById('services'); // Obtener el elemento con id="services"

                if (servicesSection) {
                    servicesSection.scrollIntoView({
                        behavior: 'smooth', // Scroll suave
                        block: 'start'     // Alinear con la parte superior del viewport
                    });
                }
            }
        })
        .catch(error => console.error('Error verificando autenticación y verificación de email:', error));
}

//ASIGNAMOS VALORES A LOS DATOS DEL OFCANVAS "REVISAR Y CONFIRMAR RESERVA" Y A LOS INPUTS DEL FORMULARIO
var botonContinuarReserva = document.querySelectorAll('.confirm-button-reservaNewService');
botonContinuarReserva.forEach(function (botonContinuar) {
    botonContinuar.addEventListener('click', function(event){
        event.preventDefault();
        if(reprogramarCita){
            console.log(reprogramarCita, idCitaReprogramar, "id REPROGRAMAR CITA");
        }

        //general
        let indexContinuar = botonContinuar.getAttribute('data-index');
        let tiempoNecesario = document.querySelector('#offcanvasBottomReserva'+indexContinuar+' .tiempoNecesario').textContent;
        let durationContinuar = document.querySelector('#offcanvasBottomReserva'+indexContinuar).getAttribute('data-duration');
        // console.log(document.querySelector('.empleadoNombreId'+indexContinuar), "CLASE EMPLEADOnOMBREID");
        let empleado_id ='';
        if(document.querySelector('.empleadoNombreId'+indexContinuar)){
             empleado_id = document.querySelector('.empleadoNombreId'+indexContinuar).getAttribute('data-empleId');
        }else{
            empleado_id = document.querySelector('.empleadoNombreId0').getAttribute('data-empleId');
        }

        let empleado_nombre = ''
        if(document.querySelector('.empleadoNombreId'+indexContinuar)){
            empleado_nombre = document.querySelector('.empleadoNombreId'+indexContinuar).textContent.trim();
        }
        else{
             empleado_nombre = document.querySelector('.empleadoNombreId0').textContent.trim();
        }
        //rellenamos fecha superior
        let elemento = obtenerDiaActivo();
        let diaSemana = obtenerDiaSemanaActivo(elemento);
        let mesNombre = capitalizarPrimeraLetra(elemento.getAttribute('data-mes'));
        let anioNumeroDia = elemento.getAttribute('data-date');
        let divContinuarReserva = document.querySelector('#offcanvasBottomComfirmReserva'+indexContinuar);

        // Dividimos la fecha en partes (año, mes, día)
        let [anio, mes, diaMes] = anioNumeroDia.split('-');
        divContinuarReserva.querySelector('.bookingDate').textContent = diaSemana+', '+diaMes+' de '+mesNombre+' de '+anio;
        //-----
    //    console.log("clic en botón continuar");
        let contenedorInicial = document.getElementById('offcanvasBottomReserva' + indexOffcanvasReservaServicio);
        let contenedoresServicios = contenedorInicial.querySelectorAll('.servicioContenedor');
        // console.log(contenedoresServicios.length, "CONTENEDORES SERVICIOS");

        //container donde va el html
        let container = document.querySelector('.containerServicesComfirReserv'+indexContinuar);
        $(container).empty();
        if(contenedoresServicios.length > 1){
            console.log("RESERVA MULTIPLE ");

            //array de servicios
            let arrayReservaServiciosMultiples = [];
           contenedoresServicios.forEach((contenedor, index) => {
                let servicioDataMultiple = JSON.parse(contenedor.getAttribute('data-servicio'));

                // Obtener nombre del empleado (asegúrate de que el ID existe)
                const empleadoElem = document.querySelector('.empleadoNombreId' + index);
                const nombreEmpleado = empleadoElem ? empleadoElem.textContent.trim() : '';

                // Agregar el nombre del empleado al objeto servicio
                servicioDataMultiple.nombreEmpleado = nombreEmpleado;

                // Agregar al array
                arrayReservaServiciosMultiples.push(servicioDataMultiple);
            });
                let servicios = arrayReservaServiciosMultiples;

                let totalServicios = 0;
                let totalDuracion = 0;
                let horaInicioPrimero = '';
                let horaFinUltimo = '';
                servicios.forEach((servicio, index) => {
                    const { nombre, descripcion, precio,horaInicio, horaFin } = servicio;
                     totalServicios += parseFloat(precio);
                     totalDuracion += servicio.duration;
                     // Guardar la primera hora de inicio
                    if (index === 0) {
                        horaInicioPrimero = horaInicio;
                    }

                    // Guardar la última hora de fin
                    if (index === servicios.length - 1) {
                        horaFinUltimo = horaFin;
                    }
                    const html = `
                    <div style="padding: 1rem 0rem 1rem 0rem;border-bottom: 1px solid rgba(23, 23, 23, 0.06);" data-testid="view-confirm-main-subbooking" data-index="${index}">
                        <div class="row">
                        <div class="col">
                            <div class="serviceNameContinueReserv" style="font-size:inherit; text-transform: none; letter-spacing: normal;font-size: .875rem;line-height: 0.3rem;color: rgb(23, 23, 23, 0.7);">${nombre}</div>
                            <span style="font-size: .75rem;line-height: 1rem;color:#9f9f9f;">Empleado:  ${servicio.nombreEmpleado}</span>
                            <div data-testid="subbooking-item-summary-staffer-label" class="subtext">
                            <span class="text-lightgray empleadoName"></span>
                            </div>
                        </div>
                        <div class="col-auto text-right precioTiempoContinueReserv">
                            <div style="letter-spacing: 1.5px;font-size: .875rem;line-height: 0.8rem;" class="text-muted">${parseFloat(precio).toFixed(2)}€</div>
                            <div class="text-muted subtext subTiempoNecesario">${servicio.horaInicio} - ${servicio.horaFin}</div>
                        </div>
                        </div>
                    </div>
                    `;

                    container.insertAdjacentHTML('beforeend', html);
                });
                console.log(arrayReservaServiciosMultiples, "ARRAY RESERVA SERVICIOS MULTIPLES");
                let divTotalServicios = document.querySelector('.totalServicesBook'+indexContinuar);
                 $(divTotalServicios).empty();
                 $(divTotalServicios).append(`
                   <div  class="row">
                        <div  class="col text-right">
                            <div  data-testid="view-confirm-main.total">
                                <span  class="text-muted b-mr-2">Total: </span>
                                <span  class="font-h4" data-testid="view-confirm-main.amount">${totalServicios.toFixed(2)} €</span>
                            </div>
                        </div>
                    </div>
                `);
                document.querySelector('.total_pagarReserva0202'+indexContinuar).textContent = totalServicios.toFixed(2)+ ' €';
                divContinuarReserva.querySelector('.bookingHour').textContent = `${horaInicioPrimero} - ${horaFinUltimo} (${formatDuration(totalDuracion)})`;
                //tiempoNecesario+' ('+formatDuration(durationContinuar)+')';
                let divContenedorContinuarReserva = document.getElementById('offcanvasBottomComfirmReserva'+indexContinuar);
                divContenedorContinuarReserva.setAttribute('data-horaIni', horaInicioPrimero);
        }else{
            // console.log("SOLO UN CONTENEDOR");

            let formatoDiaAnio = `${diaMes} ${anio}`;
            let servicioId = document.querySelector('#offcanvasBottomComfirmReserva'+indexContinuar).getAttribute('data-service');

            var csrfToken = $('meta[name="csrf-token"]').attr("content");
    // // var url = "get-serviceById";
            $.ajax({
                url: obtenerServicioById, // Ruta que definimos en web.php
                method: 'POST',
                data: {
                    _token: csrfToken, // Token CSRF para seguridad
                    id_service: servicioId,
                },
                success: function(data) {
                    // console.log(data, "DATA SOLO UN SERVICOI");
                    // console.log(container);


                     // Crear HTML dinámicamente
                    container.innerHTML = `
                    <div class="divided">
                        <div class="containerServicesComfirReserv${indexContinuar}">
                        <div data-testid="view-confirm-main-subbooking" data-index="0">
                            <div class="row">
                            <div class="col">
                                <h6 style="font-size:inherit; text-transform: none; letter-spacing: normal;">
                                ${data.servicio.nombre}
                                </h6>

                                ${data.servicio.descripcion.length > 10 ? `
                                <div class="comentario-truncado text-gray">
                                    ${data.servicio.descripcion.substring(0, 10)}...
                                    <p style="color: rgb(19, 193, 172); display:contents;" class="mostrar-mas">Seguir leyendo</p>
                                </div>
                                <div class="comentario-completo" style="display: none;">
                                    ${data.servicio.descripcion}
                                    <p style="color: rgb(19, 193, 172); display:contents;" class="mostrar-menos">Mostrar menos</p>
                                </div>
                                ` : `
                                <div class="mb-3 text-muted text-h5 line-break-anywhere no mas15">
                                    ${data.servicio.descripcion}
                                </div>
                                `}

                                <div data-testid="subbooking-item-summary-staffer-label" class="subtext">
                                <span class="text-lightgray empleadoName">Empleado: ${empleado_nombre}</span>
                                </div>
                            </div>

                            <div class="col-auto text-right precioTiempoContinueReserv">
                                <div class="text-muted text-h5">${data.servicio.precio}€</div>
                                <div class="subtext subTiempoNecesario">${tiempoNecesario}</div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;
                },
                error: function(xhr) {
                    console.log('Error al guardar el nombre de la categoria', xhr);
                    if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                            // Redirige al login si la sesión ha expirado
                            window.location.href = 'login';
                        }
                }
            });
            // let tiempoNecesario = document.querySelector('#offcanvasBottomReserva'+indexContinuar+' .tiempoNecesario').textContent;
            // let durationContinuar = document.querySelector('#offcanvasBottomReserva'+indexContinuar).getAttribute('data-duration');
            // let empleado_id = document.querySelector('.empleadoNombreId'+indexContinuar).getAttribute('data-empleId');
            // let empleado_nombre = document.querySelector('.empleadoNombreId'+indexContinuar).textContent.trim();

            // setTimeout(() => {
                 // let divContinuarReserva = document.querySelector('#offcanvasBottomComfirmReserva'+indexContinuar);
                //empleado
                // divContinuarReserva.querySelector('.empleadoName').textContent = 'Empleado: ' + empleado_nombre;
                // divContinuarReserva.querySelector('#empleada_id').value = empleado_id;
                //fecha, hora y duración
                // divContinuarReserva.querySelector('.bookingDate').textContent = mesNombre+', '+diaSemana+', '+formatoDiaAnio;
                divContinuarReserva.querySelector('.bookingDate').textContent = diaSemana+', '+diaMes+' de '+mesNombre+' de '+anio;
                divContinuarReserva.querySelector('.bookingHour').textContent = tiempoNecesario+' ('+formatDuration(durationContinuar)+')';
                // divContinuarReserva.querySelector('.subTiempoNecesario').textContent = tiempoNecesario;
            // }, 500);
            // console.log(tiempoNecesario+' ('+formatDuration(durationContinuar)+')', "-----------------", tiempoNecesario);


            let fechaHoraCompleta = obtenerFechaHoraCompleta(mesNombre, anioNumeroDia, tiempoNecesario);


            //insertamos los inputs, vaciamos
            $('#form_create_new_reserv').empty();
            // document.querySelector('#offcanvasBottomComfirmReserva' + indexContinuar + ' #form_create_new_reserv').textContent = '';
            // Añadir añadimos
            $('#form_create_new_reserv').append(`
                <input type="hidden" name="service_id" id="service_id" value="${servicioId}">
                <input type="hidden" name="date_time" id="date_time" value="${fechaHoraCompleta}">
                <input type="hidden" name="duration" id="duration" value="${durationContinuar}">
                <input type="hidden" name="empleada_id" id="empleada_id" value="${empleado_id}">
            `);
        }
    });
});



//DEVUELVE FECHA COMPLETA PARA PONER EN INPUT
function obtenerFechaHoraCompleta(mesNombre, anioNumeroDia, tiempoNecesario) {
    let nuevaFecha = new Date(anioNumeroDia);
    const horaInicio = tiempoNecesario.split(" - ")[0];
    // console.log(horaInicio, " horaInicio");
    let horas = parseInt(horaInicio.split(":")[0]);
    let minutos =  parseInt(horaInicio.split(":")[1]);
    // Establecer la hora y los minutos en la fecha base
    nuevaFecha.setHours(horas, minutos, 0);
    // console.log(nuevaFecha, "NUEVA FECHA");
    let fechaHora = new Date(nuevaFecha);
    // Convertir a formato `YYYY-MM-DD HH:MM:SS`
    let anio = fechaHora.getFullYear();
    let mes = String(fechaHora.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
    let dia = String(fechaHora.getDate()).padStart(2, '0');
    let horas2 = String(fechaHora.getHours()).padStart(2, '0');
    let minutos2 = String(fechaHora.getMinutes()).padStart(2, '0');
    let segundos = String(fechaHora.getSeconds()).padStart(2, '0');
    // Formatear la cadena
    let fechaHoraFormatoBD = `${anio}-${mes}-${dia} ${horas2}:${minutos2}:${segundos}`;
    // console.log(fechaHoraFormatoBD, "FORMATO BASE DATOS"); // "2024-10-29 15:15:00"
    return fechaHoraFormatoBD;
}



//DEVUELVE LOS MINUTOS EN HORAS
function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60); // Calcula las horas
    const remainingMinutes = minutes % 60;  // Calcula los minutos restantes

    if (hours > 0 && remainingMinutes > 0) {
        return `${hours}h ${remainingMinutes}min`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else {
        return `${remainingMinutes}min`;
    }
}

//LA PRIMERA EN MAYÚSCULAS
function capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}

//OBTENER DÍA CON LA CLASE ACTIVE
function obtenerDiaActivo() {
    const diaActivo = document.querySelector('.date_active');
    if (diaActivo) {
        return diaActivo;
    }
    // Si no encuentra ningún día activo, retorna null o un mensaje de que no existe
    return null;
}

function obtenerDiaSemanaActivo(diaActivo) {
    // Mapeo de días abreviados a sus equivalentes completos
    const diasSemanaCompleto = {
        "lun.": "Lunes",
        "mar.": "Martes",
        "mié.": "Miércoles",
        "jue.": "Jueves",
        "vie.": "Viernes",
        "sáb.": "Sábado",
        "dom.": "Domingo"
    };
    // Si encuentra el elemento, obtiene el valor de "data-diasemana" y lo convierte
    if (diaActivo) {
        const diaAbreviado = diaActivo.getAttribute('data-diaSemana');
        const diaCompleto = diasSemanaCompleto[diaAbreviado] || "Día no válido";

        return diaCompleto;
    }
    // Si no encuentra ningún día activo, retorna null o un mensaje de que no existe
    return null;
}

//oculta vista confirmacion reserva y muestra la que estaba
function hideConfirmReserv(index){
    let textarea = document.querySelector('.offcanvasOcultar'+index+' .reservNote');
    textarea.value='';
    let divOcultar = document.querySelector('.offcanvasMostrar'+index);
    let divMostrar = document.querySelector('.offcanvasOcultar'+index);
    divOcultar.classList.add('d-none');
    divMostrar.classList.remove('d-none');
    //cerrar el offcanvas offcanvasBottomComfirmReserva
    let idOffcanvas = 'offcanvasBottomComfirmReserva'+index;
    let offcanvasConfirm = document.getElementById(idOffcanvas);
    let desdehasta = offcanvasConfirm.querySelector('.bookingHour').textContent;
    // console.log(desdehasta, "HORARIO DESDE HASTA");

    cerrarOffcanvas2(idOffcanvas, 'noHay', index, desdehasta);
    // cerrarOffcanvas('offcanvasBottomReserva'+index, 'noHay', index);
}

//formatear fecha entrda: 025-08-21 16:15:00 salida: Mon Aug 21 2025 16:15:00 GMT+0200 (hora de verano de Europa central)
function formatearFechaEuropaCentral(fechaStr) {
  // Corregir año si viene con 3 dígitos
  if (fechaStr.startsWith('025-')) {
    fechaStr = '2025' + fechaStr.slice(3);
  }

  // Reemplazar espacio con 'T' para formato ISO
  const fechaISO = fechaStr.replace(' ', 'T');

  // Crear objeto Date (se interpreta como UTC si hay 'T' sin zona horaria)
  const fecha = new Date(fechaISO);

  // Convertir a string con zona horaria local
  return fecha.toString();
}


//CAMBIAR ID EMPLEADO EN EL ARRAY PARA ENVIAR RESERV MULTIPLE EN CASO DE QUE EL VALOR DEL ID EMPLEADO SEA '0' (CUALQUIERA)
// Función para hacer la petición AJAX a Laravel y devolver la lista de empleados disponibles
function consultarDisponibilidad(horaInicio, duracion, fecha) {
    let csrfToken = $('meta[name="csrf-token"]').attr('content');
    let empleadas_disponibles = "empleadas-disponibles";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: empleadas_disponibles,
            method: 'POST',
            data: {
                _token: csrfToken,
                horaInicioReserva: horaInicio,
                duracionReserva: duracion,
                fechaReserva: fecha
            },
            success: function(response) {
               resolve(response.disponibilidadEmpleados); // Devuelve el array con empleados
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Función principal para recorrer y actualizar el array
async function asignarEmpleadasDisponibles(servicesWihTimes) {
    for (let servicio of servicesWihTimes) {
        if (servicio.id_empleado === "0") {
            let fecha = servicio.date_time.split(' ')[0]; // Solo la parte de la fecha
            fecha = fecha.trim(); // Eliminar espacios en blanco
            console.log("Fecha para consultar disponibilidad:", fecha, servicio.horaInicio, servicio.duracion);

            try {
                const disponibles = await consultarDisponibilidad(servicio.horaInicio, servicio.duracion, fecha);
                console.log("Empleados disponibles:", disponibles);

                // Buscar el primer empleado disponible
                const empleadoLibre = disponibles.find(e => e.disponible === true);

                if (empleadoLibre) {
                    servicio.id_empleado = empleadoLibre.idEmpleado.toString(); // Asignar idEmpleado
                }

            } catch (error) {
                console.error('Error consultando disponibilidad:', error);

            // Si la respuesta tiene JSON, intenta mostrar el mensaje
            if (error.responseJSON) {
                console.error('Respuesta del servidor:', error.responseJSON);
            } else if (error.responseText) {
                console.error('Texto del error:', error.responseText);
            } else {
                console.error('Estado:', error.status, 'Mensaje:', error.statusText);
            }
            }
        }
    }

    console.log("Resultado final:", servicesWihTimes);
    return servicesWihTimes; // Por si quieres usarlo después
}


//enviar datos crear nueva reserva
var botonesCrearReserva = document.querySelectorAll('.boton-reservar-servicio');
    botonesCrearReserva.forEach(function (botonReservar) {
        botonReservar.addEventListener('click', function(event){
            event.preventDefault();

             let indexReservar = botonReservar.getAttribute('data-index');
             activarLoader(indexReservar);
            //pedir configuracion reservas
            getConfiguracionReservas(function(configuraciones){
                let confirmacionAutomatica = configuraciones[0].confirmacion_automatica;
                confirmacionAutomatica = confirmacionAutomatica === 'si' ? 'confirmed' : 'pending';

                const nota = document.querySelector('#offcanvasBottomComfirmReserva'+indexReservar+' .reservNote').value;

                let csrfToken = $('meta[name="csrf-token"]').attr("content");
                const userId = document.querySelector("input[name='user_id']").value;//cliente
                const total_pagarReserva0202 = parseFloat(document.querySelector('.total_pagarReserva0202'+indexReservar).textContent);

                let contenedoresServiciosConfirmarReserva = obtenerContenedoresReservas(indexReservar);
                if(contenedoresServiciosConfirmarReserva.length > 1){// reserva multiple

                    //obtener date-time
                    let divContenedorContinuarReserva = document.getElementById('offcanvasBottomComfirmReserva'+indexReservar);
                    const divContieneDateTime = document.querySelector(`div.contenedorNewReserva[data-index="${indexReservar}"]`);
                    let fecha066 = divContieneDateTime.getAttribute('data-fechaactual');//2025-03-10

                     //array de servicios
                    let arrayReservaServiciosMultiplesComfrimReserv = [];
                    contenedoresServiciosConfirmarReserva.forEach((contenedor, index) => {
                        let servicioDataMultiple = JSON.parse(contenedor.getAttribute('data-servicio'));

                        // Obtener nombre del empleado (asegúrate de que el ID existe)
                        const empleadoElem2 = document.querySelector('.empleadoNombreId' + index);
                        const nombreEmpleado2 = empleadoElem2 ? empleadoElem2.textContent.trim() : '';

                        // Agregar el nombre del empleado al objeto servicio
                        servicioDataMultiple.nombreEmpleado = nombreEmpleado2;
                        servicioDataMultiple.id_empleado = empleadoElem2 ? empleadoElem2.getAttribute('data-empleid') : '';

                        // Agregar al array
                        arrayReservaServiciosMultiplesComfrimReserv.push(servicioDataMultiple);
                    });
                    let servicesWihTimes = [];

                     arrayReservaServiciosMultiplesComfrimReserv.forEach((servicio, index) => {
                        // let dateTime066 =
                        servicesWihTimes.push({
                            id: servicio.id,
                            horaInicio: servicio.horaInicio,
                            horaFin: servicio.horaFin,
                            id_empleado: servicio.id_empleado,
                            seleccionaCliente: servicio.id_empleado === 'cualquiera' ? '0' : '1',
                            duracion: servicio.duration.toString(),
                            date_time : fecha066 + ' ' + servicio.horaInicio+':00',//2025-03-10 09:00:00,
                        });
                    });
                    // console.log(arrayReservaServiciosMultiplesComfrimReserv, "ARRAY RESERVA SERVICIOS MULTIPLES CONFIRMAR RESERVA", servicesWihTimes, "ULTIMO ARRAY");
                    // console.log(userId,total_pagarReserva0202, nota, "userId, total pagar reserva, nota");

                    // asignarEmpleadasDisponibles(servicesWihTimes);
                    // console.log(servicesWihTimes, "SERVICIOS CON EMPLEADOS ASIGNADOS");
                     if(reprogramarCita){
                        console.log(reprogramarCita, idCitaReprogramar, "REPROGRAMARCITA");

                        }else{

                        }

                    let urlMultiple = "reservas-store-multiple";
                    $.ajax({
                        url: urlMultiple,
                        method: 'POST',
                        data: {
                            _token: csrfToken,
                            arrayCompleto: JSON.stringify(servicesWihTimes),
                            // date_time1: dateTime1,
                            status: confirmacionAutomatica,
                            user_id: userId,
                            total_payment: total_pagarReserva0202,
                            nota_interna: null,
                            mensaje_cliente: null,
                            nota: nota,
                            multiple: 0,
                            idCitaReprogramar: idCitaReprogramar,
                            reprogramarCita: reprogramarCita

                        },
                        success: function(response) {
                            let reserva_creada = response.reservaCreada;
                            let motivo = response.motivo;
                            if (reserva_creada === true) {
                                let offcanvasReservaConfirmar = document.querySelector('.offcanvasOcultar'+indexReservar);
                                offcanvasReservaConfirmar.classList.add("d-none");
                                let offcanvasReserva = document.querySelector('.offcanvasMostrar'+indexReservar)
                                offcanvasReserva.classList.remove('d-none');
                                let hour = document.querySelector('.offcanvasOcultar'+indexReservar+' .bookingHour').textContent;
                                let horaInicio = hour.split(" - ")[0];
                                let fecha = document.querySelector('.offcanvasOcultar'+indexReservar+' .bookingDate').textContent;

                                // document.querySelector('.offcanvasMostrar'+indexReservar+' .reservConfirmDateHour').textContent = partesFecha[1]+' '+partesFecha[2]+' de '+partesFecha[0]+' del '+ partesFecha[3]+' a las '+horaInicio;
                                document.querySelector('.offcanvasMostrar'+indexReservar+' .reservConfirmDateHour').textContent = fecha + ' a las ' + horaInicio;
                            } else {
                                 console.log(reprogramarCita, "ANTES DEL MOTIVO");
                                alert(motivo + "hola que tal");
                                 if(reprogramarCita === true){
                                     //ponemos la antigua
                                    ponerUrlOldReprogramarCita();
                                }
                            }
                            desactivarLoader(indexReservar);
                        },
                        error: function(xhr) {
                            console.log('Error al obtener las horas', xhr);
                        }
                    });

                }else{
                    // Obtener valores de los inputs ocultos
                    const serviceId = document.getElementById("service_id").value;//"4"
                    const dateTime = document.getElementById("date_time").value;//2025-03-10 09:00:00
                    const duration = document.getElementById("duration").value;//60
                    const empleadaId = document.getElementById("empleada_id").value;
                    // let empleado_seleccionado = 1;
                    let empleado_seleccionado = (empleadaId.trim() === 'cualquiera') ? 0 : 1;

                    //comprobacion si fecha hora es pasada
                    const startDate = new Date(dateTime);
                    const endDate = new Date(startDate.getTime() + duration * 60000);
                    const now = new Date();

                    if (startDate <= now || endDate <= now) {
                        let offcanvasReservaConfirmar = document.querySelector('.offcanvasOcultar'+indexReservar);
                        offcanvasReservaConfirmar.classList.add("d-none");
                        desactivarLoader(indexReservar);
                        // loader.classList.add('d-none');
                        hideConfirmReserv(indexReservar);
                        alert("La fecha seleccionada o la hora son erróneas.\nInténtelo de nuevo cambiando esos datos.");
                    }
                    let urlSegunReprogramarCitaUser='';
                    let ajaxSegunReprogramarCitaUser='';
                    // console.log(servicesWithTimes, "PARA MANDAR A REPROGRAMARCITA");

                    if(reprogramarCita){
                        urlSegunReprogramarCitaUser = 'modificar-reservaCalendar'
                          ajaxSegunReprogramarCitaUser = {
                            id_reserva_modificar: idCitaReprogramar,
                            _token: csrfToken,
                            service_id: serviceId,
                            date_time: dateTime,
                            status: confirmacionAutomatica,
                            duration: duration,
                            empleada_id: empleadaId,
                            nota: nota,
                            user_id: userId,
                            total_payment: total_pagarReserva0202,
                            empleado_seleccionado:empleado_seleccionado,
                            nota_interna:null,
                            mensaje_cliente:null,
                            reprogramarCita:reprogramarCita
                        }
                        /*
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
                        mensaje_cliente:datosReservaGeneral.mensaje_for_client
                        */
                    }else{
                        urlSegunReprogramarCitaUser = crearReserva;
                        ajaxSegunReprogramarCitaUser = {
                            _token: csrfToken,
                            service_id: serviceId,
                            date_time: dateTime,
                            status: confirmacionAutomatica,
                            duration: duration,
                            empleada_id: empleadaId,
                            nota: nota,
                            user_id: userId,
                            total_payment: total_pagarReserva0202,
                            empleado_seleccionado:empleado_seleccionado,
                            idCitaReprogramar: idCitaReprogramar,
                            reprogramarCita: reprogramarCita

                        }
                    }
                    let crear_reserva = urlSegunReprogramarCitaUser;
                    $.ajax({
                        url: crear_reserva,
                        method: 'POST',
                        data: ajaxSegunReprogramarCitaUser,
                        success: function(response) {
                            const reserva_creada = response.reservaCreada;
                            const reservaActualizadaData = response.reservaActualizada;
                            if(reserva_creada === true || reservaActualizadaData === true){

                                let offcanvasReservaConfirmar = document.querySelector('.offcanvasOcultar'+indexReservar);
                                offcanvasReservaConfirmar.classList.add("d-none");
                                let offcanvasReserva = document.querySelector('.offcanvasMostrar'+indexReservar)
                                offcanvasReserva.classList.remove('d-none');
                                // Ocultar el loader después de mostrar el div
                                desactivarLoader(indexReservar);
                                // loader.classList.add('d-none');
                                let hour = document.querySelector('.offcanvasOcultar'+indexReservar+' .bookingHour').textContent;
                                let horaInicio = hour.split(" - ")[0];
                                let fecha = document.querySelector('.offcanvasOcultar'+indexReservar+' .bookingDate').textContent;
                                document.querySelector('.offcanvasMostrar'+indexReservar+' .reservConfirmDateHour').textContent = fecha + ' a las ' + horaInicio;
                                if(reservaActualizadaData === true){
                                    console.log("Actualizacion reserva");
                                    if( document.querySelector(`#offcanvasBottomComfirmReserva${indexReservar} .h2offcanvasreservarealizada`)){
                                        document.querySelector(`#offcanvasBottomComfirmReserva${indexReservar} .h2offcanvasreservarealizada`).textContent= 'Cita reprogramada';
                                    }
                                    ponerUrlOldReprogramarCita();
                                    actualizarCitasProxiPasada();

                                }
                                else{
                                     if( document.querySelector('h2offcanvasreservarealizada')){
                                        document.querySelector('h2offcanvasreservarealizada').textContent= 'Cita confirmada';
                                    }
                                }
                            }else{
                                let offcanvasReservaConfirmar = document.querySelector('.offcanvasOcultar'+indexReservar);
                                offcanvasReservaConfirmar.classList.add("d-none");
                                desactivarLoader(indexReservar);
                                // loader.classList.add('d-none');
                                hideConfirmReserv(indexReservar);
                                //  console.log(reprogramarCita,oldUrlReprogramarCita, "ANTES DEL MOTIVO");
                                alert(response.motivo);
                                if(reprogramarCita === true){
                                     //ponemos la antigua
                                    ponerUrlOldReprogramarCita();
                                }
                                // alert('Atención!! la hora seleccionada o el empleado no están disponibles, inténtelo de nuevo cambiando esos datos');
                            }
                        },
                        error: function(xhr) {
                            console.log('Error al obtener las horas', xhr);
                            if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                                // Redirige al login si la sesión ha expirado
                                window.location.href = 'login';
                            }
                        }
                    });
                }
            });
        });
    });

function notShowNavbar(){
document.querySelector('.navbarOcultarReserva').classList.remove('rd-navbar-static');
document.querySelector('.navbarOcultarReserva').classList.remove('rd-navbar-fixed');
}


function mostrarDetalleCita(citaId) {
    let url = detalleCita.replace('__ID__', citaId);
    // console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data, "DATA DETALLE CITA");
            let offcanvascita = document.getElementById('offcanvasCita');
            offcanvascita.setAttribute('data-citaid', citaId);
            // Generar lista de servicios
            let serviciosHTML = '';
            let confirmar_modificacion = data.confirmar_modificacion;
            // console.log(data);
            let fechareservaSiModificacion ='';
            if(confirmar_modificacion === 'pendiente' && data.reserva_finalizada !== 'Finalizada'){
                document.querySelector('.opciones-citaAgrupado').style.display = 'none';
                document.querySelector('.botonesConfirmarModificacionReservaUser').style.display = 'block';
                fechareservaSiModificacion = `
                <p  class="_-wKLAw font-default-header-s-semibold">La fecha de la cita será:</p>
                <p>${data.fechaCompleta}</p>
                `;
            }else{
                document.querySelector('.opciones-citaAgrupado').style.display = 'inherit';
                document.querySelector('.botonesConfirmarModificacionReservaUser').style.display = 'none';
                fechareservaSiModificacion = '';
            }
            data.servicios.forEach(servicio => {

                serviciosHTML += `
                    <li class="Overview_self__item__1G_Oh">
                        <div class="Overview_self__item__text__Qr5gV">
                            <p class="_-wKLAw font-default-body-s-medium Overview_self__item__title__t5ZqQ">
                                ${servicio.nombre}
                            </p>
                            <p class="_-wKLAw u4xD5w font-default-body-s-regular Overview_self__item__caption__PHZDS">
                                ${servicio.duracion} con ${servicio.profesional}
                            </p>
                        </div>
                        <div class="Overview_self__item__price__CVGge">
                            <p class="_-wKLAw font-default-body-s-medium">${servicio.precio}&nbsp;€</p>
                        </div>
                    </li>
                `;
            });

            const content = `
            <p class="_-wKLAw font-default-header-s-semibold">Resumen</p>
            ${fechareservaSiModificacion}
                <ul class="Overview_self__items__Qt_ZZ">
                    ${serviciosHTML}
                </ul>
                <hr aria-orientation="horizontal" class="KT-Sqz CChbrz Sm39oz pz1yRz">
                <ul class="_5zC0N5 gap-default-0 direction-default-vertical display-default-inline-flex">
                    <li class="p_ehs5">
                        <div class="Overview_self__item__1G_Oh">
                            <p class="_-wKLAw u4xD5w font-default-body-s-regular">Impuestos</p>
                            <p class="_-wKLAw u4xD5w font-default-body-s-regular">${data.impuestos}&nbsp;€</p>
                        </div>
                    </li>
                    <li class="p_ehs5">
                        <div class="Overview_self__item__1G_Oh">
                            <p class="font-default-header-s-semibold">Total</p>
                            <p class="_-wKLAw font-default-body-s-semibold">${data.total}&nbsp;€</p>
                        </div>
                    </li>
                </ul>
            `;

            document.querySelector('.Overview_self__Cn2QV').innerHTML = content;
            const servicio = data.servicios[0];
            const title = `Cita de ${servicio.nombre}`;
            const details = `Servicio: ${servicio.nombre} con ${servicio.profesional}`;
            const location = data.infoEstablecimiento;
            const start = data.fechaISO + 'Z';
            const end = data.fechaFinISO + 'Z';

            // GOOGLE
            document.querySelector('.add-google').onclick = () => {
                const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
                window.open(url, '_blank');
            };

            // OUTLOOK
            document.querySelector('.add-outlook').onclick = () => {
                const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&startdt=${start}&enddt=${end}&location=${encodeURIComponent(location)}`;
                window.open(url, '_blank');
            };

            // APPLE / OTROS
            const ics = `BEGIN:VCALENDAR
            VERSION:2.0
            PRODID:-//TuApp//Reservas//ES
            BEGIN:VEVENT
            UID:${Date.now()}@tuapp.com
            DTSTAMP:${start}
            DTSTART:${start}
            DTEND:${end}
            SUMMARY:${title}
            DESCRIPTION:${details}
            LOCATION:${location}
            END:VEVENT
            END:VCALENDAR`;

            const blob = new Blob([ics], { type: 'text/calendar' });
            const icsUrl = URL.createObjectURL(blob);
            document.querySelector('.add-ics').href = icsUrl;
        });
}

document.addEventListener('click', function (e) {
    if (e.target.closest('.addCalendar')) {
        const bootstrapModal = new bootstrap.Modal(document.getElementById('modalCalendario'));
        bootstrapModal.show();
    }
});


//clic en flecha atras confirmar reserva
document.querySelectorAll('.card-header-backRevisarConfirmar').forEach(function (botonAtras) {
    botonAtras.addEventListener('click', function(event){
        event.preventDefault();
        let indexAtras = botonAtras.getAttribute('data-index');
        console.log("clic en botón atrás confirmar reserva", indexAtras);
        hideConfirmReserv(indexAtras);
    });
});


function vaciarContenedorServiciosAñadidos(){
    let cantidadAConservar = addServicesArray.length;

    // Seleccionar todos los divs con la clase servicioContenedor
    let contenedores = document.querySelectorAll('.servicioContenedor');

    // Eliminar todos excepto los primeros `cantidadAConservar`
    contenedores.forEach((div, index) => {
        if (index >= cantidadAConservar) {
            div.remove();
        }
    });
}

//ABRE OFFCANVAS ELEGIR MÁS SERVICIOS PARA AÑADIR
function openAddMoreService(){
    // Abrir el offcanvas
    const myOffcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasAddService'));
    myOffcanvas.show();
    desmarcarCheckboxesYCerrarAcordeon();
}

//DEVUELVE EL OFCANVAS RESERVA ABIERTO
function obtenerOffcanvasBottomReserva(index){
    let offcanbasBottomReserva = document.getElementById('offcanvasBottomReserva'+ index);
    return offcanbasBottomReserva;
}

//ACTIVA PARA QUE SE PUEDA UTILIZAR EL ENLACE "AÑADIR MÁS SERVICIOS"
function activarEnlace(idOffcanvas) {
    let offcanvasActual = document.getElementById(idOffcanvas);
    let enlace = offcanvasActual.querySelector('.enlaceMasServicio');
    if (enlace) {
        enlace.classList.remove('disabled');
        enlace.style.pointerEvents = 'auto';
        enlace.style.opacity = '1';
        // enlace.title = '';
    }
}

//DESACTIVA EL ENLACE PARA QUE NO SE PUEDAN AÑADIR MÁS SERVICIOS
function desactivarEnlace(idOffcanvas) {
    let offcanvasActual = document.getElementById(idOffcanvas);
    let enlace = offcanvasActual.querySelector('.enlaceMasServicio');
    enlace.classList.add('disabled');
    enlace.style.pointerEvents = 'none';
    enlace.style.opacity = '0.5';
    // enlace.title = 'Ya no se pueden añadir servicios después de las 19:30.';
}

//
function desmarcarCheckboxesYCerrarAcordeon() {
    let checkboxes = document.querySelectorAll('input[name="servicios_seleccionados[]"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });
        // Cierra todas las secciones del acordeón
    const acordeonItems = document.querySelectorAll('#accordionCategoryAdd .collapse');
    const acordeonBotones = document.querySelectorAll('#accordionCategoryAdd .btn[data-toggle="collapse"]');

    acordeonItems.forEach(item => {
        if (item.classList.contains('show')) {
            // Utiliza jQuery para cerrar el acordeón
            $(item).collapse('hide');
        }
    });

    // Cambia el aria-expanded de todos los botones de acordeón a "false"
    acordeonBotones.forEach(boton => {
        boton.setAttribute('aria-expanded', 'false');
    });
}

//desmarcar todos los checkboxes y cerrar los acordeontes
function cancelarAddMoreService() {
    // Vuelve a verificar la selección y actualizar los estados
    // verificarSeleccion();
    vaciarContenedorServiciosAñadidos();
    //  addServicesArray = [];
     desmarcarCheckboxesYCerrarAcordeon();
}

function verificarSeleccion() {
    let checkboxes = document.querySelectorAll('input[name="servicios_seleccionados[]"]');
    let seleccionados = Array.from(checkboxes).filter(cb => cb.checked);
    let boton = document.getElementById('mostrarListaSeleccionados');
    let contador = document.getElementById('contadorServicios');
    let sumaArrayIdsServicios = addServicesArray.length;
    let maxServicios = 4;
    if(contador){
        console.log(sumaArrayIdsServicios, "SUMA");
        contador.innerHTML = `${seleccionados.length + sumaArrayIdsServicios} / ${maxServicios} servicios`;
        boton.disabled = seleccionados.length + sumaArrayIdsServicios === 0;
        boton.classList.toggle('addserviceDisabled', seleccionados.length + sumaArrayIdsServicios === 0);
        seleccionados.length + sumaArrayIdsServicios === maxServicios ? contador.classList.add('text-danger') : contador.classList.remove('text-danger');
        if (seleccionados.length + sumaArrayIdsServicios >= maxServicios) {
            checkboxes.forEach(cb => {
                if (!cb.checked) cb.disabled = true;
            });
        } else {
            checkboxes.forEach(cb => cb.disabled = false);
        }
    }
}

//formatear duration
function formatDuration(duration1) {
    // Convertir a número
    let minutos = parseInt(duration1, 10);

    // Calcular horas y minutos
    let horas = Math.floor(minutos / 60);
    let minutosRestantes = minutos % 60;

    // Crear string formateado
    let duracionFormateada = '';
    if (horas > 0) {
    duracionFormateada += horas + 'h';
    }
    if (minutosRestantes > 0) {
    duracionFormateada += (horas > 0 ? ' ' : '') + minutosRestantes + 'min';
    }
    return duracionFormateada;
}


//verificar si hay algún check seleccionado
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('input[name="servicios_seleccionados[]"]');
    const listaNombres = document.getElementById('listaNombresServicios');
    const totalSpan = document.getElementById('totalServiciosSeleccionados');

    //MUESTRA LOS SERVICIOS SELECIONADOS CON CHECK EN EL MODAL
    function mostrarModalServicios() {

        let seleccionados = Array.from(checkboxes).filter(cb => cb.checked);
        listaNombres.innerHTML = '';
        let total = 0;

        if (seleccionados.length === 0) return;

        // Crear y añadir los servicios fijos del principio
        //añadirlos tambien en el array de ids servivicios
        arrayServicesCompleto.forEach(servicio => {
            // addServicesArray.push(servicio.id);
            const precio = parseFloat(servicio.precio); // Convertir a número
            total += precio; // ✅ Sumar aquí

            let li = document.createElement('li');
            li.classList.add('list-group-item');
            li.style.setProperty('background-color', 'transparent', 'important');
            li.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${servicio.nombre}</strong><br>
                        <small class="text-muted">Duración: ${servicio.duration}</small>
                    </div>
                    <div class="text-end">${precio.toFixed(2)}€</div>
                </div>
            `;
            listaNombres.appendChild(li);
        });

        // Ahora continuar con los seleccionados arrayServicesCompleto
        seleccionados.forEach(cb => {
            addServicesArray.push(cb.value);
            const nombre = cb.dataset.nombre ?? 'Servicio';
            const duracion = cb.dataset.duracion ?? '';
            const precio = parseFloat(cb.dataset.precio ?? 0);
            total += precio;

            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.style.setProperty('background-color', 'transparent', 'important');
            li.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${nombre}</strong><br>
                        <small class="text-muted">Duración: ${duracion}</small>
                    </div>
                    <div class="text-end">${precio.toFixed(2)}€</div>
                </div>
            `;
            listaNombres.appendChild(li);
        });

        totalSpan.textContent = `${total.toFixed(2)}€`;

        const modal = new bootstrap.Modal(document.getElementById('modalServiciosSeleccionados'));
        modal.show();
         console.log("array de servicios lleno", addServicesArray);
    }


    //CLIC EN AÑADIR DE LA LISTA DE SERVICIOS "AÑADIR SERVICIO"
    let modalServiciosSeleccionados = document.getElementById('mostrarListaSeleccionados');
    if( modalServiciosSeleccionados){
          checkboxes.forEach(cb => cb.addEventListener('change', verificarSeleccion));
        // modalServiciosSeleccionados.addEventListener('click', mostrarModalServicios);
        modalServiciosSeleccionados.addEventListener('click', () => {
            mostrarModalServicios();
            aniadirReservasTrasComprobacion();
        });
    }
    // verificarSeleccion();
    // console.log("array de servicios al inicio", addServicesArray, "array de servicios completo", arrayServicesCompleto);

});

//vaciar el array de servicios añadidos
function cleanViewMoreService(){
    // addServicesArray = [];
    //borramos todos menos el primer elemento
    // addServicesArray.length = 1;
    console.log("array de servicios", addServicesArray);
    //vaciamos el modal de la lista de servicios seleccionados
    let listaNombres = document.getElementById('listaNombresServicios');
    listaNombres.innerHTML = '';
    let contenedorSugerencias = document.querySelector('.listaNombreServiciosBody');
    contenedorSugerencias.innerHTML = '';
    // desmarcarCheckboxesYCerrarAcordeon();
    // resetContadorSegunTotalArray();

    // Paso 1: Obtener todos los IDs válidos desde arrayServicesCompleto
    /*Recorre addServicesArray con su índice.
    Para cada elemento, compara con arrayServicesCompleto[index].
    Si existe ese índice y el id coincide (como string), lo mantiene.*/
    addServicesArray = addServicesArray.filter((id, index) => {
        let servicio = arrayServicesCompleto[index];
        return servicio && String(servicio.id) === id;
    });
    irAHoraActiva(indexOffcanvasReservaServicio);
    console.log(arrayServicesCompleto, "ARRAY COMPLETO", addServicesArray, "ARRAY IDS SERVICIOS");

}


//añadir servicio inicial en el array de servicios
//conge los contenedores de servicios todos los que haya en la pantalla de inicio
//añade los ids al array de ids y los servicios al array de servicios
function addInitServicesOnArray() {
    let contenedorInicial = document.getElementById('offcanvasBottomReserva' + indexOffcanvasReservaServicio);
    let contenedoresServicios = contenedorInicial.querySelectorAll('.servicioContenedor');

    addServicesArray = []; // Reiniciar el array
    arrayServicesCompleto = []; // Reiniciar el array de servicios completos

    contenedoresServicios.forEach(contenedor => {
        let serviceId = contenedor.getAttribute('data-service_id');
        if (serviceId) {
            addServicesArray.push(serviceId);
        }
    });

    contenedoresServicios.forEach(contenedor => {
        let serviceCompletoJSON = contenedor.getAttribute('data-servicio');

        // 🔍 Buscar el div hijo con data-empleid
        let empleadoDiv = contenedor.querySelector('[data-empleid]');
        let empleadoRaw = empleadoDiv?.getAttribute('data-empleid') || null;
        let empleadoNombre = empleadoDiv?.textContent.trim() || '';

        // 👉 Lógica para convertir "cualquiera" en 0
        let empleadoId = (empleadoRaw && empleadoRaw.toLowerCase() === 'cualquiera')
            ? 0
            : parseInt(empleadoRaw, 10);

        if (serviceCompletoJSON) {
            let servicio = JSON.parse(serviceCompletoJSON);
            // servicio._uuid = crypto.randomUUID();
            // Añadir empleado_id y empleado_nombre al objeto
            servicio.empleado_id = isNaN(empleadoId) ? null : empleadoId;
            servicio.empleado_nombre = empleadoNombre;

            arrayServicesCompleto.push(servicio);
        }
    });
    console.log("servicio añadido al array de servicios", addServicesArray);
    console.log("servicio añadido al array de servicios", arrayServicesCompleto);
    let contadorServicios = document.getElementById('contadorServicios');
    contadorServicios.innerHTML='';
    contadorServicios.innerHTML = `${addServicesArray.length.toString()} / 4 seleccionados`;
}


//obtener servicios por array
function getServicesById(arrayIdServicios, callback){
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = obtenerReservasArray;
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
             if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                // Redirige al login si la sesión ha expirado
                window.location.href = 'login';
            }
        }
    });
}

//formatea la fecha sugerida
function formatearCitaSugerida(fechaISO) {
    const fecha = new Date(fechaISO);
    const opcionesFecha = { day: 'numeric', month: 'long' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: false };

    const diaMes = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const hora = fecha.toLocaleTimeString('es-ES', opcionesHora);

    return { diaMes, hora };
}

//clic en el boton añadir servicios a la reserva
  // clic en el botón añadir servicios a la reserva
function aniadirReservasTrasComprobacion() {
    console.log("clic en botón añadir servicios a la reserva ", indexOffcanvasReservaServicio);
    let spinner = document.getElementById('loaderSperaAdministrator59');
    if (spinner) {
        spinner.classList.remove('d-none'); // Mostrar el spinner
    }

    console.log(addServicesArray, "ARRAY IDS SERVICIOS");

    getServicesById(addServicesArray, function (servicios) {
        let totalDuration = 0;
        let contenedorInicial = document.getElementById('offcanvasBottomReserva' + indexOffcanvasReservaServicio);
        let fechaActiva = contenedorInicial.querySelector('.dia.date_active')?.getAttribute('data-date');
        let horaActiva = contenedorInicial.querySelector('.hora.time_active')?.getAttribute('data-hora');
        console.log(servicios , "SERVICIOS", servicios.map(s => ({ duration: parseInt(s.duration, 10) })),"MAP DE SERVICIOS", fechaActiva, horaActiva, "fecha y hora activa");


        servicios.forEach(servicio => {
            servicio._uuid = crypto.randomUUID();
            let duracion = parseInt(servicio.duration, 10);
            if (!isNaN(duracion)) {
                totalDuration += duracion;
            }
        });

        fetch(comprobarDisponibilidad, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                fecha: fechaActiva,
                hora: horaActiva,
                servicios: servicios.map(s => ({ duration: parseInt(s.duration, 10) })),
                reprogramarCita,
                idCitaReprogramar,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta completa del servidor:", data);

            let contenedorSugerencias = document.querySelector('.listaNombreServiciosBody');
            let div = document.createElement('div');
            let contenidohtml = '';
            let duracionAHoras = formatearDuracion(totalDuration);
            if (data.disponible) {
                contenidohtml = `
                    <p>
                        <span style="color: #0bbd9a;><i style="margin-right: 5px;" class="bi bi-check-circle-fill"></i><strong> ${data.mensaje} Duración total: ${duracionAHoras}</strong></span><br>
                        Datos de la reserva:</br>
                        <span style="color: #adb1b0ff;margin-right: 5px;" class="icon mdi mdi-clock"></span>
                        ${data.nuevoFin}
                    </p>
                    <button
                        data-servicios='${JSON.stringify(servicios)}'
                        onclick="reservaMultipleAceptada1(this, '${horaActiva}', '${totalDuration}', '${fechaActiva}')"
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px; border-color:#d6a769!important">
                        ¡Sí, quiero reservar!
                    </button><br>
                     <button
                        data-servicios='${JSON.stringify(servicios)}'
                        onclick="reservaMultipleAceptada1(this, '${horaActiva}', '${totalDuration}', '${fechaActiva}');irDiaActivo('${fechaActiva}, ${indexOffcanvasReservaServicio}')"
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px">
                        Elegir otra hora para hola3 ${data.soloFecha}
                    </button><br>
                    `;
            } else {
                let mensaje = `
                    <p style="margin-bottom: 1rem;">
                    <i class="bi bi-info-circle"></i> ${data.mensaje}<br>
                    <strong><span style='color:#0bbd9a;'>${data.mensajeSecundario}</span></strong>
                    </p>
                    `;

                let sugerencias = [];

                // Normalización segura de sugerencias
                try {
                    if (data.sugerencias?.original?.sugerencias) {
                        if (Array.isArray(data.sugerencias.original.sugerencias)) {
                            sugerencias = data.sugerencias.original.sugerencias;
                        } else {
                            sugerencias = Object.values(data.sugerencias.original.sugerencias);
                        }
                    } else if (Array.isArray(data.sugerencias)) {
                        sugerencias = data.sugerencias;
                    } else if (typeof data.sugerencias === 'object' && data.sugerencias !== null) {
                        sugerencias = Object.values(data.sugerencias);
                    }
                } catch (e) {
                    console.warn("Error procesando sugerencias:", e, data.sugerencias);
                }

                console.log("Sugerencias normalizadas:", sugerencias);

                if (Array.isArray(sugerencias) && sugerencias.length > 0) {
                    mensaje += `<div class="sugerenciasDisponibles">`;

                   sugerencias
                .filter(opcion => opcion && opcion.inicio && opcion.fin)
                .forEach((opcion, index) => {
                    let inicio = formatearCitaSugerida(opcion.inicio);
                    let fin = formatearCitaSugerida(opcion.fin);

                    mensaje += `
                        <div class="opcion-sugerida mb-3 p-3 border rounded">
                            <div class="row">
                                <div class="col-8">
                                    <p class="datos-sugerencia">
                                        <span class="mdi mdi-calendar-clock text-success"></span>
                                        ${inicio.diaMes} de ${inicio.hora} a ${fin.hora}
                                    </p>
                                </div>
                                <div class="col-4" style="margin-top: 0.5rem;">
                                    <div class="elementor-button-wrapper">
                                        <a style="text-decoration:none;"
                                            class="elementor-sugerencia elementor-button elementor-button-link elementor-size-sm entrar_registrase"
                                            href="#"
                                            onclick="reservaMultipleAceptada1(this, '${opcion.inicio}', '${totalDuration}', '${opcion.inicio}')"
                                            data-servicios='${JSON.stringify(servicios)}'>
                                            <span class="elementor-button-content-wrapper" style="color: white">
                                                <span class="elementor-button-text">Me interesa!</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });

                    mensaje += `</div> <br>
                     <button
                        class="confirmarServiciosBtn1 btn btn-dark w-100 mt-2"
                        style="background-color: #d6a769!important; border-radius:4px;border-color:#d6a769!important;"
                        onclick="cleanViewMoreService();resetContadorSegunTotalArray();desmarcarCheckboxesYCerrarAcordeon();closeAddMoreService();" type="button" class="btn-close" data-bs-dismiss="modal">
                        Elegir otro día
                    </button>`;
                } else if (data.sugerencia) {
                    let inicio = formatearCitaSugerida(data.sugerencia.inicio);
                    let fin = formatearCitaSugerida(data.sugerencia.fin);

                    mensaje += `
                        <i style="font-size: 17px;color: blue;" class="bi bi-arrow-right-circle-fill"></i>
                        Siguiente opción:<br>
                        El ${inicio.diaMes} de ${inicio.hora} a ${fin.hora}<br>`;
                }

                contenidohtml = mensaje;
            }

            div.innerHTML = contenidohtml;
            contenedorSugerencias.appendChild(div);

            if (spinner) {
                spinner.classList.add('d-none');
            }
            console.log(fechaActiva, "fecha reserva", horaActiva, "hora inicio reserva", servicios, "SERVICIOS GETBYID");
        })
        .catch(error => {
            console.error('❌ Error al comprobar disponibilidad:', error);
            alert('❌ Ocurrió un error al comprobar la disponibilidad.');
            if (spinner) {
                spinner.classList.add('d-none');
            }
        });
    });

}


function formatearDuracion(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    let resultado = '';
    if (horas > 0) {
        resultado += `${horas}h`;
    }
    if (mins > 0) {
        resultado += ` ${mins}min`;
    }

    return resultado.trim();
}

// funcion te desplaza a la hora activa
function irAHoraActiva(index) {
    // console.log("Buscando hora activa en carrusel:", index);

    const carruselInner = document.querySelector(`#carousel_horas${index} .carrusel-inner`);
    const horas = carruselInner.querySelectorAll('.hora');
    // console.log("Divs horas:", horas);
    const horaActiva = carruselInner.querySelector('.time_active');

    // console.log("Hora activa encontrada:", horaActiva);
    // console.log("Total de horas encontradas:", horas.length);

    if (!horaActiva || horas.length === 0) return;

    const anchoTarjeta = horas[0].offsetWidth + 10;
    const indexActiva = Array.from(horas).indexOf(horaActiva);

    // console.log("Índice de hora activa:", indexActiva);
    // console.log("Ancho tarjeta:", anchoTarjeta);

    const nuevoDesplazamiento = -(indexActiva * anchoTarjeta);
    // console.log("Nuevo desplazamiento calculado:", nuevoDesplazamiento);

    // console.log("numDiasVisibles:", numDiasVisibles);
    const totalHoras = horas.length;
    const maxDesplazamiento = -(anchoTarjeta * (totalHoras - numDiasVisibles));
    // console.log("Máximo desplazamiento permitido:", maxDesplazamiento);

    const desplazamientoFinal = Math.max(Math.min(nuevoDesplazamiento, 0), maxDesplazamiento);
    // console.log("Desplazamiento final aplicado:", desplazamientoFinal);

    carruselInner.style.transform = `translateX(${desplazamientoFinal}px)`;

    // Si usas una variable global desplazamiento
    if (typeof desplazamiento !== 'undefined') {
        desplazamiento = desplazamientoFinal;
    }
}

function irDiaActivo(fechaActiva, index){
    // console.log("voy a dia activo el que tiene la clase date_active");
 // Encontramos el contenedor del carrusel y el día activo
    let carruselInnerDias = document.querySelector('#carousel_dias' + index + ' .carrusel-inner');
    // let diaActivo = carruselInnerDias.querySelector('.dia.date_active');
    let diaActivo = carruselInnerDias.querySelector('.dia[data-date="' + fechaActiva + '"]');

    if (diaActivo) {
        // Obtenemos el ancho de una tarjeta (día) y el índice del día activo
        const anchoTarjeta = diaActivo.offsetWidth + 10; // 10px de margen
        const dias = Array.from(carruselInnerDias.children);
        const indiceDiaActivo = dias.indexOf(diaActivo);

        // Calculamos el desplazamiento para centrar el día activo
        const desplazamiento = -indiceDiaActivo * anchoTarjeta;

        // Establecemos el desplazamiento
        carruselInnerDias.style.transition = 'transform 0.5s ease'; // Desplazamiento suave
        carruselInnerDias.style.transform = `translateX(${desplazamiento}px)`;
    }
}


async function reservaMultipleAceptada1(button, horaInicio, duracionTotal, fechaActiva) {
    console.log(horaInicio, duracionTotal, "botón aceptar reserva múltiple");
    let fechaParaInicio = fechaActiva;
    // Normalizar horaInicio si viene en formato fecha completa
    if (horaInicio.includes('T') || horaInicio.includes('-')) {
        let dateObj = new Date(horaInicio);
        let horas = dateObj.getHours().toString().padStart(2, '0');
        let minutos = dateObj.getMinutes().toString().padStart(2, '0');
        horaInicio = `${horas}:${minutos}`;
    }

    // Obtener el valor de data-servicios
    let serviciosJson = button.getAttribute('data-servicios');
    let servicios = JSON.parse(serviciosJson);
    console.log("Servicios recibidos:", servicios);
    serviciosSeleccionados = [...servicios];
    // Función para sumar minutos a una hora
    function agregarMinutos(hora, minutos) {
        let [horaParte, minutoParte] = hora.split(':').map(num => parseInt(num, 10));
        let fecha = new Date(2000, 0, 1, horaParte, minutoParte);
        fecha.setMinutes(fecha.getMinutes() + minutos);
        let horas = fecha.getHours().toString().padStart(2, '0');
        let minutosFinales = fecha.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutosFinales}`;
    }

    // Calcular horarios para cada servicio
    let horaActual = horaInicio;
    let totalPrecioPagar = 0;
    let totalDuracion = 0;
    servicios.forEach(servicio => {
        servicio.duration = parseInt(servicio.duration, 10);  // Asegurarse de que sea número

        let horaFinTentativa = agregarMinutos(horaActual, servicio.duration);

        // Verificar pausa entre 14:00 - 15:00
        if (horaActual < '14:00' && horaFinTentativa > '14:00') {
            horaActual = '15:00';
        } else if (horaActual >= '14:00' && horaActual < '15:00') {
            horaActual = '15:00';
        }

        servicio.horaInicio = horaActual;
        servicio.horaFin = agregarMinutos(horaActual, servicio.duration);
        horaActual = servicio.horaFin;
        totalPrecioPagar += parseFloat(servicio.precio);
        totalDuracion += servicio.duration;
        console.log(`Servicio: ${servicio.nombre}, Hora Inicio: ${servicio.horaInicio}, Hora Fin: ${servicio.horaFin}`);
    });

    // Ocultar modales
    let offcanvasReservaServicio = document.getElementById('offcanvasBottomReserva' + indexOffcanvasReservaServicio);
    if(document.getElementById('modalServiciosSeleccionados')){
        let modal = bootstrap.Modal.getInstance(document.getElementById('modalServiciosSeleccionados'));
        if (modal) modal.hide();
    }
    if(document.getElementById('modalServiciosSeleccionados2')){
         let modal = bootstrap.Modal.getInstance(document.getElementById('modalServiciosSeleccionados2'));
        if (modal) modal.hide();
    }
    if(document.getElementById('offcanvasAddService')){
        let offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasAddService'));
        if (offcanvas) offcanvas.hide();
    }

    // Activar/desactivar enlace para añadir más servicios modalServiciosSeleccionados2
    // let offcanvasActual = document.getElementById('offcanvasBottomReserva'+ indexOffcanvasReservaServicio);
    // let enlace = offcanvasActual.querySelector('.enlaceMasServicio');
    if (servicios.length >= 4) {
        desactivarEnlace('offcanvasBottomReserva'+ indexOffcanvasReservaServicio);
    } else {
        activarEnlace('offcanvasBottomReserva'+ indexOffcanvasReservaServicio);
    }

    //SEPARAMOS LA FECHA DE LA HORA
    fechaParaInicio = fechaParaInicio.split(' ')[0];
    manejarSeleccionFechaMultipleServicio(fechaParaInicio, indexOffcanvasReservaServicio, duracionTotal, horaInicio);


    // Mostrar los servicios en el contenedor
    let contenedorServicios = offcanvasReservaServicio.querySelector('.serviciosMultiples');
    contenedorServicios.innerHTML = '';  // Limpiar contenido anterior

    servicios.forEach((servicio, index) => {
        const html = `
            <div class="servicioContenedor" data-service_id="${servicio.id}" data-removeServicioContenedor="participant-label-avatar${servicio._uuid}-multiple" data-servicio='${JSON.stringify(servicio)}'>
                <div class="subbooking-list">
                    <div class="pos-relative box" style="background-color: transparent!important">
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
        cleanViewMoreService();
        offcanvasReservaServicio.querySelector('.totalPagarReservaOffcanva').textContent=`${totalPrecioPagar} €`;
        offcanvasReservaServicio.querySelector('.tiempoTotalReservOffcanva').textContent=`${formatDuration(totalDuracion)}`;

    });

    // Finalización
    desmarcarCheckboxesYCerrarAcordeon();
    arrayServicesCompleto = [];
    addServicesArray = [];
    console.log(arrayServicesCompleto, "COMPLETO", addServicesArray, "IDS");

}


async function quitarUltimaCruzEliminarServicio(indexOffcanvas1522){
     // Contar los divs restantes con la clase "servicioContenedor"
    let div = document.querySelector('.contenedorNewReserva[data-index="' + indexOffcanvas1522 + '"]');
    let contenedorInicial = document.getElementById('offcanvasBottomReserva' + indexOffcanvas1522);
    let fechaReservaEmpleado = contenedorInicial.querySelector('.dia.date_active').getAttribute('data-date');
    let horaReservaEmpleado = contenedorInicial.querySelector('.hora.time_active').getAttribute('data-hora');
    let restantes = contenedorInicial.querySelectorAll('.servicioContenedor');
    console.log(restantes.length, "restantes");

    if (restantes.length === 1) {
        console.log("solo hay uno", indexOffcanvas1522, "index offcanvas");
        let ultimo = contenedorInicial.querySelector('.servicioContenedor');
        let servicioData = JSON.parse(ultimo.getAttribute('data-servicio'));
        console.log(servicioData.duration, "DURACION SERVICIO");
        contenedorInicial.setAttribute('data-duration', servicioData.duration);
        contenedorInicial.setAttribute('data-descripcionservicio', servicioData.descripcion);
        contenedorInicial.setAttribute('data-precio', servicioData.precio);
        contenedorInicial.setAttribute('data-nombreservio', servicioData.nombre);
        contenedorInicial.setAttribute('data-service_h', servicioData.horaNewService);
        contenedorInicial.setAttribute('data-service_m', servicioData.minutosNewService);
        let divContenedorX = ultimo.querySelector('.remove');
        console.log(divContenedorX, "ULTIMA EQUIS----");

        div.setAttribute('data-fechaactual', fechaReservaEmpleado);
        div.setAttribute('data-horainicio', horaReservaEmpleado);

        if (divContenedorX) {
            divContenedorX.remove(); // Eliminar el botón de eliminar
        }


        let divConTestId = ultimo.querySelector('[data-testid]');
        let divConName = ultimo.querySelector('[data-empleado]');
        if (divConTestId) {
            divConTestId.setAttribute('data-testid', 'participant-label-avatar' + indexOffcanvas1522);
            divConName.setAttribute('data-empleado', 'participant-label-name' + indexOffcanvas1522);
            divConName.classList.forEach(clase => {
                if (clase.startsWith('empleadoNombreId')) {
                    divConName.classList.remove(clase);
                }
            });
            divConName.classList.add('empleadoNombreId' + indexOffcanvas1522);
        }
        // let horasRecibidas = await obtenerHoras(fechaReservaEmpleado, indexOffcanvas1522, servicioData.duration);
        // mostrarHoras(horasRecibidas, indexOffcanvas1522);
        // setTimeout(() => {
        // initActiveClassHora(indexOffcanvas1522, servicioData.duration, true);

        // }, 2000);
    }
}

function resetcontadorServicios(){
    const contadores = document.querySelectorAll('#contadorServicios');

    contadores.forEach(contador => {
    contador.innerHTML = "0 / 4 servicios";
    contador.classList.remove('text-danger');
  });
}

function resetContadorSegunTotalArray(){
     let contador = document.getElementById('contadorServicios');
     let actual = arrayServicesCompleto.length;
    if (contador) {
         contador.textContent = `${actual} / 4 servicios`;
         if (actual !== 4) {
                contador.classList.remove('text-danger');
            }
    }
}

//RESTA UNO AL CONTADOR ACTUAL
function actualizarContador(){
    // 4. Actualizar el contador en #contadorServicios
    let contador = document.getElementById('contadorServicios');
    if (contador) {
        let texto = contador.textContent.trim(); // Ej: "3 / 5 servicios"
        let match = texto.match(/^(\d+)\s*\/\s*(\d+)/);
        if (match) {
            let actual = parseInt(match[1], 10);
            let maximo = parseInt(match[2], 10);

            actual = Math.max(0, actual - 1); // evitar negativos

            contador.textContent = `${actual} / ${maximo} servicios`;
             if (actual !== 4) {
                contador.classList.remove('text-danger');
            }
        }
    }
}



function removeAddServiceUser(_uuid, indexOffcanvas152) {
    let selector = `.servicioContenedor[data-removeServicioContenedor="${_uuid}"]`;
    let contenedor = document.querySelector(selector);
    // console.log(contenedor, "CONTENEDOR ELIMINADO");

    //eliminar el div
    if (contenedor) {
        contenedor.remove();
    }


    actualizarContador();
    // let offcanvasActual = document.getElementById('offcanvasBottomReserva'+ indexOffcanvas152);
    // let enlaceAniarirMas = offcanvasActual.querySelector('.enlaceMasServicio');
    // enlaceAniarirMas.classList.remove('disabled');
    activarEnlace('offcanvasBottomReserva'+ indexOffcanvas152);
    // console.log(serviciosSeleccionados,"serviciosSleccionas recalcular", _uuid, "INDEX");
    let match = _uuid.match(/avatar(.*?)-multiple/);

    let numeroRecalcular = match ? match[1] : null;
    // console.log(numeroRecalcular, "NUMERO A RECALCULAR");

    let indexAEliminar = serviciosSeleccionados.findIndex(servicio => servicio._uuid === numeroRecalcular);

    if (indexAEliminar !== -1) {
        serviciosSeleccionados.splice(indexAEliminar, 1);
    }
    // Volver a calcular horas
    let horaInicioOriginal = obtenerOffcanvasBottomReserva(indexOffcanvas152).querySelector('.hora.time_active')?.getAttribute('data-hora');
    console.log(horaInicioOriginal, "horaHoriginañ");

    recalcularHorasYRedibujar(serviciosSeleccionados, horaInicioOriginal, indexOffcanvas152);
    // desmarcarCheckboxesYCerrarAcordeon();
    quitarUltimaCruzEliminarServicio(indexOffcanvas152);
}

function recalcularHorasYRedibujar(servicios, horaInicio, indexOffcanvasReservaServicio) {
    function agregarMinutos(hora, minutos) {
        let [h, m] = hora.split(':').map(n => parseInt(n));
        let date = new Date(2000, 0, 1, h, m);
        date.setMinutes(date.getMinutes() + minutos);
        return date.toTimeString().slice(0, 5);
    }

    function minutosEntre(hora1, hora2) {
        const [h1, m1] = hora1.split(':').map(Number);
        const [h2, m2] = hora2.split(':').map(Number);
        return (h2 * 60 + m2) - (h1 * 60 + m1);
    }

    const PAUSA_INICIO = '14:00';
    const PAUSA_FIN = '15:00';

    let horaActual = horaInicio;
    let tiempoAntesPausa = minutosEntre(horaActual, PAUSA_INICIO);

    // Ordenar los servicios por duración descendente (los más largos primero)
    let serviciosOrdenados = [...servicios].sort((a, b) => b.duration - a.duration);

    let antesPausa = [];
    let despuesPausa = [];

    // Encajar los servicios que caben antes de las 14:00
    for (let i = 0; i < serviciosOrdenados.length; ) {
        const servicio = serviciosOrdenados[i];
        if (servicio.duration <= tiempoAntesPausa) {
            servicio.horaInicio = horaActual;
            servicio.horaFin = agregarMinutos(horaActual, servicio.duration);
            horaActual = servicio.horaFin;
            tiempoAntesPausa = minutosEntre(horaActual, PAUSA_INICIO);
            antesPausa.push(servicio);
            serviciosOrdenados.splice(i, 1); // lo quitamos
        } else {
            i++; // intenta con el siguiente
        }
    }

    // El resto van después de las 15:00 si la hora de inicio es menor que  las 15
    if(horaInicio > PAUSA_FIN){
        horaActual = horaInicio
    }else{
        horaActual = PAUSA_FIN;
    }

    serviciosOrdenados.forEach(servicio => {
        servicio.horaInicio = horaActual;
        servicio.horaFin = agregarMinutos(horaActual, servicio.duration);
        horaActual = servicio.horaFin;
        despuesPausa.push(servicio);
    });

    const serviciosFinal = [...antesPausa, ...despuesPausa];
    const fechaActiva = document.querySelector('.dia.date_active')?.getAttribute('data-date');
    const contenedorServicios = document.getElementById('offcanvasBottomReserva' + indexOffcanvasReservaServicio)
        .querySelector('.serviciosMultiples');
    contenedorServicios.innerHTML = '';

    serviciosFinal.forEach((servicio, index) => {
        const html = `
            <div class="servicioContenedor" data-service_id="${servicio.id}" data-removeServicioContenedor="participant-label-avatar${servicio._uuid}-multiple" data-servicio='${JSON.stringify(servicio)}'>
                <div class="subbooking-list">
                    <div class="pos-relative box">
                        <div class="remove d-flex items-center justify-center" onclick="removeAddServiceUser('participant-label-avatar${servicio._uuid}-multiple', '${indexOffcanvasReservaServicio}')">
                            <span class="icon icon-close remove__icon d-flex items-center justify-center">
                                <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <line y2="18" x2="6" y1="6" x1="18"></line>
                                    <line y2="18" x2="18" y1="6" x1="6"></line>
                                </svg>
                            </span>
                        </div>
                        <div class="divided">
                            <div class="row">
                                <div class="drag-handle"><div class="lines"></div></div>
                                <div class="col-8">
                                    <h4 style="font-family: 'gualazonF';font-size: 15px;" class="m-0 font-medium line-break-anywhere">${servicio.nombre}</h4>
                                </div>
                                <div class="col-4 text-right">
                                    <div class="font-h4">${servicio.precio} €</div>
                                    <div class="text-h5 text-gray tiempoNecesario">${servicio.horaInicio} - ${servicio.horaFin}</div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mt-1">
                                <div class="d-flex flex-column b-flex-fill">
                                    <div class="d-flex align-items-center">
                                        <div class="me-1 text-secondary b-font-h5">Empleado:</div>
                                        <div data-testid="participant-label-avatar${servicio._uuid}-multiple" class="b-mr-1"></div>
                                        <div data-empleid="cualquiera" data-empleado="participant-label-avatar${servicio._uuid}-multiple" class="b-flex-fill b-font-h5 empleadoNombreId${index}">Cualquiera</div>
                                    </div>
                                </div>
                                <button data-diaseleccionado="${fechaActiva}" data-index="${indexOffcanvasReservaServicio}" data-inicioservicio="${servicio.horaInicio}" data-duration="${servicio.duration}" class="customOpenModalSelectEmpleButton botonChangeEmple" data-multiple="participant-label-avatar${servicio._uuid}-multiple" onclick="mostrarModalSelecEmpleado('${indexOffcanvasReservaServicio}', this)">Cambiar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorServicios.insertAdjacentHTML('beforeend', html);
    });
}




function mostrarModalSelecEmpleado(indexCambiarEmpleado2, botonEmpleado2) {
         let horaInicioReservaEmpleado = botonEmpleado2.getAttribute('data-inicioServicio');
         let reservaMultiple = botonEmpleado2.getAttribute('data-multiple');
        console.log(horaInicioReservaEmpleado, "hora inicio empleado", botonEmpleado2, "BOTON EMPLEADO");
        if(horaInicioReservaEmpleado === 'noDisponible'){
            console.log("no hat disponibilidad");

        }
        else{
            let duracionReservaEmpleado = botonEmpleado2.getAttribute('data-duration');


            let fechaReservaEmpleado = botonEmpleado2.getAttribute('data-diaSeleccionado');
            console.log(duracionReservaEmpleado, "duración reserva", fechaReservaEmpleado, "fecha reservaEmpleadao");
            let indexCambiarEmpleado = botonEmpleado2.getAttribute('data-index');
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            // let empleadas_disponibles = "empleadas-disponibles";
            let empleadas_disponibles = empleadasDisponibles;
            // Hacer una petición AJAX al servidor
            $.ajax({
                url: empleadas_disponibles, // Ruta que definimos en web.php
                method: 'POST',
                data: {
                    _token: csrfToken, // Token CSRF para seguridad
                    horaInicioReserva: horaInicioReservaEmpleado,
                    duracionReserva: duracionReservaEmpleado,
                    fechaReserva: fechaReservaEmpleado
                },
                success: function(response) {
                    const disponibilidadEmpleados = response.disponibilidadEmpleados;
                    // Recorrer el array usando forEach
                    actualizarDisponibilidadEmpleados(disponibilidadEmpleados, `#selectEmpleModal${indexCambiarEmpleado2}`);
                    disponibilidadEmpleados.forEach(function(empleado) {

                        console.log('ID del Empleado:', empleado.idEmpleado);
                        console.log('Nombre del Empleado:', empleado.empleado);
                        console.log('Disponible:', empleado.disponible ? 'Sí' : 'No');
                    });
                },
                error: function(xhr) {
                    console.log('Error al obtener las horas', xhr);
                     if (xhr.responseJSON?.message === 'CSRF token mismatch.') {
                        // Redirige al login si la sesión ha expirado
                        window.location.href = 'login';
                    }
                }
            });

            //abrimos el modal


            console.log("clic botón  seleccionarEmpleado", indexCambiarEmpleado);
            var modalDOMElement = document.getElementById('selectEmpleModal' + indexCambiarEmpleado);

            // Instancias el modal de Bootstrap
            var modalElement = new bootstrap.Modal(modalDOMElement);

            // Lo muestras
            modalElement.show();

            // Esperas a que se renderice y luego accedes al DOM del modal
            setTimeout(() => {
                // Ahora usas el elemento DOM real para hacer querySelectorAll
                let divsEmpleadosOpciones = modalDOMElement.querySelectorAll('.empleadoCambiarCursor');

                divsEmpleadosOpciones.forEach(function(divEmpleado) {
                    divEmpleado.setAttribute('data-multiple', reservaMultiple);
                    console.log(divEmpleado, "div empleado");
                });
            }, 400);
        }
}

//abrir cerrr más info servicios
function showHiddenMoreInfoService(button, divInfoAdicional){
    let divInfoAdicional2 = document.querySelector(`.${divInfoAdicional}`);
       divInfoAdicional2.classList.toggle('active');

       // Cambiar el texto del botón
    var span = button.querySelector(".button-text");
    if (span.textContent.trim() === "+ info") {
        span.textContent = "- info";
    } else {
        span.textContent = "+ info";
    }
}
// });

