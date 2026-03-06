

var tabLinks1 = document.querySelectorAll(".tablinks");
var tabLinks2 = document.querySelectorAll(".tablinks2");
var tabLinks  = [...tabLinks1, ...tabLinks2];

var tabContent = document.querySelectorAll(".tabcontent");


var tabLinksAdministrator1 = document.querySelectorAll(".tablinksAdministrator");
var tabLinksAdministrator = [...tabLinksAdministrator1, ...tabLinks2];
var tabContentAdministrator = document.querySelectorAll('.tabcontentAdministrator');
// var initUrlImage= 'http://localhost/laravel/salon-manicura-git/';
var initUrlImage= 'http://salonnail.kesug.com/';
tabLinksAdministrator.forEach(function(el) {
    el.addEventListener("click", openTabsAdministrator);
 });

tabLinks.forEach(function(el) {
   el.addEventListener("click", openTabs);
});
function openTabsAdministrator(el) {
    // console.log(el, "clic en tab");
    initIsotope();
   let btnTarget = el.currentTarget;
//    console.log(btnTarget, "btn tarjet");

   let nameTab = btnTarget.dataset.pannel;
//    console.log(nameTab, "nameTab");

   tabContentAdministrator.forEach(function(el) {
      el.classList.remove("active");
   });
   tabLinksAdministrator.forEach(function(el) {
      el.classList.remove("active");
   });
   document.querySelector("#" + nameTab).classList.add("active");
   btnTarget.classList.add("active");
   cambiarURL('admin/dashboard/'+nameTab);
   let tabresponsive = document.getElementById('tabsResponsiveid');
   if(tabresponsive){
    // console.log('siiiii');
    tabresponsive.style.width = '0px';
   }else{
    // console.log('no existe');
   }
//    $('#calendar').fullCalendar('render');
   quitarInputsSeleccionados();
//    resetDropselecCategoria();
//    resetCategoriaGrupal();
    // console.log("tabssssss");
}
//CAMBIAR BOTÓN CITAS PROXIMAS O PASADAS
function cambiarBoton(idBoton) {
    // Selecciona los botones
    const botones = document.querySelectorAll('.citasTerProx');
    botones.forEach(function(boton) {
        boton.classList.remove('--selected');
     });
     let botonSelect = document.getElementById(idBoton);
     botonSelect.classList.add('--selected')
     if (idBoton === 'botonProximas') {
        showDivPagos('citasProcimasContainer');
     }else{
        showDivPagos('citasTerminadasContainer');
     }
  }


//ESCONDER TABUSER PARA QUE NO SE VEA MIENTRAS SE CARGA LA PÁGINA
document.addEventListener('DOMContentLoaded', function () {
    // Ocultar el div al inicio
    const userAdministrator = document.getElementById('User_administrator');
    if (userAdministrator) {
        userAdministrator.style.opacity = '0';

        // Mostrar el div cuando la página está completamente cargada
        window.addEventListener('load', function () {
          userAdministrator.style.opacity = '1';
        });
    }

  });

function openTabs(el) {
    // console.log("clic en tab");
    initIsotope();
   let btnTarget = el.currentTarget;
   let nameTab = btnTarget.dataset.pannel;
   tabContent.forEach(function(el) {
      el.classList.remove("active");
   });
   tabLinks.forEach(function(el) {
      el.classList.remove("active");
   });
   document.querySelector("#" + nameTab).classList.add("active");
   btnTarget.classList.add("active");
   cambiarURL('panel/'+nameTab);
   let tabresponsive = document.getElementById('tabsResponsiveid');
   if(tabresponsive){
    // console.log('siiiii');
    tabresponsive.style.width = '0px';
   }else{
    // console.log('no existe');
   }
   quitarInputsSeleccionados();
//    resetDropselecCategoria();
//    resetCategoriaGrupal();
    // console.log("tabssssss");
}


function UpProduct(content, tab_button, url){
    // console.log("ejecución UpProduct");
    // console.log( tab_button,"parametros");
    //quitamos active de boton
    tabLinks.forEach(function(el) {
        el.classList.remove("active");
     });
     //quitamos active de contenido
    tabContent.forEach(function(el) {
        el.classList.remove("active");
     });

     //ponemos active al contenido
     document.querySelector("#" + tab_button).classList.add("active");
    document.getElementById(content).classList.add("active");
    //ponemos active al boton(para colorines supeirores)
    // document.getElementById(tab_button).classList.add("active");
    let botonPrueba = document.getElementById(tab_button);
    setTimeout(() => {
    // console.log(botonPrueba, "botonPrueba");

    }, 8000);

    let tabresponsive = document.getElementById('tabsResponsiveid');
    if(tabresponsive){
    //  console.log('siiiii');
     tabresponsive.style.width = '0px';
    }else{
    //  console.log('no existe');
    }

    cambiarURL(url);
}

function UpProductAdministrator(content, tab_button, url){
    // console.log("ejecución administrator");
    // console.log(content, tabContent, url, "parametros");

    // if (tab_button === 'tab_administrator_citas') {
    //     initializeCalendar();
    // }
    tabContentAdministrator.forEach(function(el) {
        el.classList.remove("active");
        });

        tabLinksAdministrator.forEach(function(el) {
        el.classList.remove("active");
        });
        document.getElementById(content).classList.add("active");
    document.getElementById(tab_button).classList.add("active");
    if (url.includes('createService')) {
        showDiv('createNew_service');
    }
    else if(url.includes('showAllServices')){
        showDiv('show_all_service');
    }
    let tabresponsive = document.getElementById('tabsResponsiveid');
    if(tabresponsive){
        // console.log('siiiii');
        tabresponsive.style.width = '0px';
    }else{
        // console.log('no existe');
    }
    cambiarURL(url);
}






// //CONFIGURACIÓN NEGOCIO PRIMERA PANTALLA LLAMAMOS A CARGAR A LA SEGUNDA
let divConfiguration_bussines = document.getElementById('configuration_bussines');
let divConfiguration_service = document.getElementById('configuration_service');
let divShowAll_service = document.getElementById('show_all_service');
let divCreateNew_service = document.getElementById('createNew_service');

//PRIMERA PANTALLA ABRIMOS SEGUNDA
let abrirConfigServicios = document.querySelectorAll('.configuracionNegocio a');
if(abrirConfigServicios){
    abrirConfigServicios.forEach(function(enlaceAbriconfigServicios){
             $(enlaceAbriconfigServicios).off('click').on('click', function(event) {
            event.preventDefault();

           let dataUrl = enlaceAbriconfigServicios.getAttribute('data-url');
        //    console.log(dataUrl, "dataUrl");

            if(dataUrl === 'config.services'){
                showDiv('configuration_service');
            }else if(dataUrl=== 'advant.options'){
                showDiv('opciones_avanzadas1');
            }
        });
    });
}
function showPrincipalPageConfig(){
    showDiv('configuration_bussines');
}

//FUNCIÓN QUE RECARGA LA PÁGINA
function reloadPage(){
    window.location.reload();
}

//PRELOADER DE SOWALLSERVICES
const preloader2 = document.querySelector('#preloader2');
  if (preloader2) {
    window.addEventListener('load', () => {
      preloader2.remove();
    });
  }

//   $(document).ready(function() {
    // AOS.init({ disable: true }); // Desactiva AOS

    // Añadir el evento a todos los iconos

// });

//funcion que inicializa los isotope movimientos de entrada y salida visula
$(document).ready(function () {
    // al clicar en la tarjeta configuración de servicios
$('#configuracionServicios55').on('click', function() {
    initIsotope('.isotope-containerIndex', '.isotope-itemIndex', '.filter-manicura', '.isotope-filtersIndex [data-filterIndex]','data-filterIndex');//servicios para
    initIsotope('.isotope-containerIndex2', '.isotope-itemIndex2', '.filter-proximasIndex', '.isotope-filtersIndex [data-filterIndex]', 'data-filterIndex');
    initIsotope('.isotope-container', '.isotope-item', '*', '.isotope-filters [data-filter]', 'data-filter');//servicios y combos de servicios
});


});
var $grid='';
function initIsotope(container, item, filter, isotop_filter, data_filter){
    // Inicializar Isotope
    // console.log("initIsotope");
        $grid = $(container).isotope({
        itemSelector: item,  // Selector de los elementos filtrables
        layoutMode: 'masonry',
        fitRows: {
            columnWidth: item
        },         // Tipo de layout
        filter: filter
    });

    $grid.isotope('layout');
    // Manejar el clic en los filtros
    $(isotop_filter).on('click', function () {
        // console.log("clic isotopeIndex");

        var filterValue = $(this).attr(data_filter);
        // console.log(filterValue, "filtervalue");

        $grid.isotope({ filter: filterValue });
        $(isotop_filter).removeClass('filter-active');
        $(this).addClass('filter-active');
        if (data_filter === 'data-filter') {
            $(isotop_filter).removeClass('category_bgcolor--gray_PmXQU');
            $(this).addClass('category_bgcolor--gray_PmXQU');
        }
    });
}

//clic en la fleca modificar categoria
function ClicFlechaModificarCategoria(){
    $('.modifyCategory').on('click', function() {
        $grid.isotope('destroy');
        let nameCategori = $(this).data('name');
        let idCategori = $(this).data('index');

        // Asignar atributo con jquery asignar value con jquery
        $('#infoCategoriModify').attr('data-categori', idCategori);
        $('#infoCategoriModify').attr('data-categoriname', nameCategori);
        $('#nombreNuevaCategoriaModificada').val(nameCategori);

    });
}
ClicFlechaModificarCategoria();

//boton guardar modificar nombre categoria
let botonGurardarModificarCategoria = document.getElementById('submitModifyCategory');
if (botonGurardarModificarCategoria) {
    $(botonGurardarModificarCategoria).on('click', function() {
        let newNameCategory = document.getElementById('nombreNuevaCategoriaModificada').value;
        let id_categoriaModify = document.getElementById('infoCategoriModify').getAttribute('data-categori');
        //peticion ajax modificar categoria
        let changeCategory = 'change-category-name';
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            url: changeCategory,
            method: 'POST',
            data: {
                _token: csrfToken,
                category_id: id_categoriaModify,
                category_name: newNameCategory
            },
            success: function(response) {
                showAllServicesPlantilla("modificarCategoria");
            },
            error: function(xhr) {
                console.log('Error al actualizar el status', xhr);
            }
        });
    });
}
//boton guardar modificar nombre categoria
let botonEliminarCategoria = document.getElementById('submitDeleteCategory');
if (botonEliminarCategoria) {
    $(botonEliminarCategoria).on('click', function() {
        const confirmarEliminaCategoria = confirm('¿Deseas eliminar esta categoria?');
        if (confirmarEliminaCategoria) {
            let newNameCategory = document.getElementById('nombreNuevaCategoriaModificada').value;
            let id_categoriaEliminar = document.getElementById('infoCategoriModify').getAttribute('data-categori');
            //peticion ajax modificar categoria
            let deleteCategory = 'delete-category';
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                url: deleteCategory,
                method: 'POST',
                data: {
                    _token: csrfToken,
                    category_id: id_categoriaEliminar,
                    category_name: newNameCategory
                },
                success: function(response) {
                    if(response.eliminado === true){
                        $('#modifyCategoryModal').modal('hide');
                        showAllServicesPlantilla("eliminarCategoria");
                    }

                },
                error: function(xhr) {
                    console.log('Error al actualizar el status', xhr);
                }
            });
        }else{
            $('#modifyCategoryModal').modal('hide');
            alert('No se realizaron cambios.');
        }

    });
}


//funcion obtener todas categorias
function getAllCategories(){
    return new Promise(function(resolve, reject) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-allCategories";
        // Hacer una petición AJAX al servidor
        $.ajax({
            url: url, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken
            },
            success: function(response) {
                const categorias = response.categorias;
                // console.log(categorias, "categorias todas");
                // Ejecutar el callback con los datos
                resolve(response.categorias);
            },
            error: function(xhr) {
                console.error("Error en la solicitud AJAX");
            }
        });
    });
}
//funcion obtener todos servicios activos
function getAllServices(){
    return new Promise(function(resolve, reject) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-allServices";
        // Hacer una petición AJAX al servidor
        $.ajax({
            url: url, // Ruta que definimos en web.php
            method: 'POST',
            data: {
                _token: csrfToken
            },
            success: function(response) {
                const servicios = response.services;
                // console.log(servicios, "categorias todas");
                // Ejecutar el callback con los datos
                resolve(response.services);
            },
            error: function(xhr) {
                console.error("Error en la solicitud AJAX");
            }
        });
    });
}

//función que cambia el estado del input checkbox verde y rojo
if(document.querySelector('switch')){
    document.querySelector('switch').addEventListener('click', function() {
        console.log("clic en toggle");

        this.checked = !this.checked; // Alterna el estado de "checked"
    });
}

//funcion para cargar las configuracines de base datos
function cargarConfiguraciones(){
    getConfiguracionReservas(function(configuraciones){
        showDiv('opciones_avanzadas2');
        console.log(configuraciones, "configuraciones desde clic tarjeta");
        if(configuraciones[0].confirmacion_automatica === 'si'){
            document.getElementById('toggle-3').checked = true;
        }
        else{
            document.getElementById('toggle-3').checked = false;
        }
       document.getElementById('uid-152-input_antelacionReserva').value = configuraciones[0].limite_tiempo_reserva;
       document.getElementById('uid-158-inputAntelacionReserva').value = configuraciones[0].antelacion_reserva;
       document.getElementById('uid-164-inputCambioFecha').value = configuraciones[0].cambio_fecha_reserva;

        //fondo y checket
        let divLimite_tiempo = document.querySelector('.liTiempoAntelacion div[data-antelacion="' + configuraciones[0].limite_tiempo_reserva + '"]');
        $(divLimite_tiempo).addClass('index_--selected_oUDGp index_--highlighted__3J43');

        let divAntelacion_reserva = document.querySelector('div[data-antelacion="' + configuraciones[0].antelacion_reserva + '"]');
        $(divAntelacion_reserva).addClass('index_--selected_oUDGp index_--highlighted__3J43');

        let divCambio_fecha= document.querySelector('div[data-antelacion="' + configuraciones[0].cambio_fecha_reserva + '"]');
        $(divCambio_fecha).addClass('index_--selected_oUDGp index_--highlighted__3J43');

    });
}

//funcion para cargar el historial de cambios de reservas
var historialGlobal = [];
function cargarHistorialCambiosReservas(){
    cargarSelectEmpleadas(); // 👈 cargar empleadas
    getHistorialCambiosReservas(function(cambiosReservas){
        // para que se vea el nombre y no user id
        console.log(cambiosReservas);

        historialGlobal = cambiosReservas.map(item => {
            // console.log(item, "item");

            let cambios = item.cambios;

            item.user_id = cambios.antes?.user_id || cambios.despues?.user_id || null;
            item.cliente_nombre = "Cliente #" + item.user_id; // luego lo hacemos real

            item.empleada_id = cambios.antes?.empleada_id || cambios.despues?.empleada_id || null;
            item.empleada_nombre = empleadasMap[item.empleada_id] || "Sin empleada";
            return item;
        });
        //mostramos el div de las modificaciones
        showDiv('opciones_avanzadas3');
        // console.log(cambiosReservas, "Historial cambios reservas desde clic tarjeta");
        historialGlobal = cambiosReservas;
        // console.log(historialGlobal, cambiosReservas, "historial glovas modificaciones");

        renderHistorialTimeline(cambiosReservas);
    });
}

function cargarTodo(id_ofcanvasCerrar, visualizadornombre){
    cargarHistorialCambiosReservas();
    $(`#${id_ofcanvasCerrar}`).offcanvas('hide');
    if(visualizadornombre.contain)
    document.querySelector('.styles_slotLeft_k29NgClienteHistorialModificaReserva').textContent= "Selecciona cliente"
    //reseteamos los inputs menos el que mandamos
    resetInputsHistorialModificacionReservas(`.${visualizadornombre}`);
    }

//función para el filtro de la fecha para filtrar historial modificaciones reservas.
document.getElementById('filtroFechaHistorial').addEventListener('change', function(){
    const fecha = this.value; // yyyy-mm-dd
    if(!fecha){
        renderHistorialTimeline(historialGlobal);
        return;
    }
    const filtrado = historialGlobal.filter(item => {
        return item.created_at.startsWith(fecha);
    });

    renderHistorialTimeline(filtrado);
    //reseteo todos menos la fecha
    resetInputsHistorialModificacionReservas(document.getElementById('filtroFechaHistorial'));
});


//filtrar historial por empleada
function filtrarHistorialPorEmpleada(idEmpleado) {

    // Si no hay empleada (por seguridad)
    if (!idEmpleado) {
        renderHistorialTimeline(historialGlobal);
        return;
    }

    const filtrado = historialGlobal.filter(item =>
        item.empleada_id == idEmpleado
    );

    renderHistorialTimeline(filtrado);
}

//filtrar historial por cliente
function filtrarHistorialPorCliente(idCliente) {
    // console.log(historialGlobal, "historial, cliente");

    // Si no hay empleada (por seguridad)
    if (!idCliente) {
        renderHistorialTimeline(historialGlobal);
        return;
    }

    const filtrado = historialGlobal.filter(item =>
        item.user_id == idCliente
    );

    renderHistorialTimeline(filtrado);
}

//filtrar historial por cualquier usuario
function filtrarHistorialPorCualquierUser(idCualquierUser) {
    console.log(idCualquierUser, "idCualquier");

    // Si no hay empleada (por seguridad)
    if (!idCualquierUser) {
        renderHistorialTimeline(historialGlobal);
        return;
    }

    const filtrado = historialGlobal.filter(item =>
        item.responsable_id == idCualquierUser
    );

    renderHistorialTimeline(filtrado);
}

//función reseteo todos menos uno de inputs filtro historial
function resetInputsHistorialModificacionReservas(noResetear) {
    const elementos = [
        {
            el: document.getElementById('filtroFechaHistorial'),
            tipo: 'fecha'
        },
        {
            el: document.querySelector('.styles_slotLeft_k29NgClienteHistorialModificaReserva'),
            tipo: 'cliente',
            placeholder: 'Selecciona cliente'
        },
        {
            el: document.querySelector('.slotEmpleadoHistorialModificacionReservas'),
            tipo: 'empleado',
            placeholder: 'Selecciona empleado'
        },
        {
            el: document.querySelector('.styles_slotLeft_k29NgTodosUsersHistorialModificaReserva'),
            tipo: 'responsable',
            placeholder: 'Selecciona responsable'
        }
    ];

    elementos.forEach(({ el, placeholder }) => {
        if (!el || el === noResetear) return;

        if ('value' in el) {
            el.value = '';
        } else {
            el.textContent = placeholder ?? '';
            el.dataset.id = '';
        }
    });
}




//función para cargar las empleadas en el array global
var empleadasMap = {}; // Global
function cargarSelectEmpleadas() {
    getAllEmpleados(function(empleados){
        empleados.forEach(emp => {
            empleadasMap[emp.id] = emp.nombre; // Guardamos para el historial es lo único que ses utiliza de esta funcion
        });
    });
}

function capitalizarPalabras(texto) {
    return texto
        .toLowerCase()
        .split(' ')
        .map(palabra =>
            palabra.charAt(0).toUpperCase() + palabra.slice(1)
        )
        .join(' ');
}

function renderHistorialTimeline(historial){
    const tbody = document.getElementById('tablaHistorialReservasBody');
    tbody.innerHTML = '';

    // ===============================
    // No hay modificaciones que mostrar
    // ===============================
    if(historial.length === 0){
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted py-4" style="border-bottom: none;">
                     <div class="col-12 col-lg-9 noHayModificacionesReservas b-empty-placeholder_container_jSbur index_noResults_nPiXA" style="height:100%">
                        <div class="b-image_image_QfpQF b-empty-placeholder_image_qDGRU" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/505b8295/img/empty-appointments.c27c9262.svg&quot;); background-size: contain; width: 128px; height: 52px; padding-top: 0px;"></div>
                        <p class="b-empty-placeholder_title_BNhv7 b-empty-placeholder_size--16_rr609">No hay modificaciones que mostrar</p>
                        <small class="b-empty-placeholder_description_B6M7l b-empty-placeholder_size--14_hdWAE">Parece que no hay modificaciones para los criterios seleccionados.</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // ===============================
    // AGRUPAR POR operation_uuid
    // ===============================
    let agrupados = {};
    historial.forEach(item => {
        let operationKey = item.operation_uuid || 'sin_operacion';
        if (!agrupados[operationKey]) {
            agrupados[operationKey] = [];
        }
        agrupados[operationKey].push(item);
    });

    // ===============================
    // PINTAR TABLA
    // ===============================
    let serviciosUnicos= [];
    Object.values(agrupados).forEach(grupo => {
        console.log(grupo, "GRUPO");

        // serviciosUnicos = Object.values(
        //     grupo.reduce((acc, item) => {
        //         const reservaId = item.reserva_id;

        //         // Si aún no hemos guardado este reserva_id
        //         if (!acc[reservaId] && item.reserva?.servicio) {
        //         acc[reservaId] = {
        //             reserva_id: reservaId,
        //             servicio: item.reserva.servicio
        //         };
        //         }

        //         return acc;
        //     }, {})
        // );
        // let item = grupo[0]; // usamos el primero como base
        // Si existe una eliminada en el grupo, tiene prioridad
        let item = grupo.find(r => r.accion === 'eliminada')
            ?? grupo.find(r => r.accion === 'creada')
            ?? grupo[0];
        // console.log(item,"ITEM");

        // console.log(serviciosUnicos, "SERVICVIOSUNICOS");
        // let color = 'primary';
        // if(item.accion === 'creada') color = 'success';
        // if(item.accion === 'eliminada') color = 'danger';

        let fecha = new Date(item.created_at).toLocaleString('es-ES');

        // ===============================
        // UNIFICAR CAMBIOS SI ES GRUPO
        // ===============================
        let cambiosUnificados = {
            antes: {},
            despues: {}
        };

        grupo.forEach(registro => {
            if (registro.cambios?.despues) {
                Object.assign(cambiosUnificados.antes, registro.cambios.antes ?? {});
                Object.assign(cambiosUnificados.despues, registro.cambios.despues ?? {});
            }
        });

        let cambios = cambiosUnificados;
        console.log(cambiosUnificados, "cambios unificados");


        //cojemos la primera letra del apellido
        let inicialApellido = item.responsable.primer_apellido
            ?.trim()
            .charAt(0)
            .toUpperCase();

        //ponemos las primeras en mayúsculas
        let nombreResponsable = capitalizarPalabras(
            `${item.responsable.name} ${inicialApellido}`
        );

        //tipo de responsable (cliente, empleada, admin...)
        let responsableTipo = capitalizarPalabras(item.responsable_tipo);

        // si la accion es creada pero solo es que se ha añadido un servicio a una reserva existente
        // solo cambio el badge no cambio lo que envio a abrirmodal
        let actionUtilizar = '';
        let badgetExtraModifi= '';
        if(cambiosUnificados.antes ){
            console.log("hay cambios unificadso antes");

        }else{
            console.log("no hay cambios antes");

        }
        console.log( Object.keys(cambiosUnificados.antes).length, "cambios unificados antes");
        const todosAntesVacios = grupo.every(item => {
            const antes = item.cambios?.antes;

            if (!antes) return true;

            // Si es array
            if (Array.isArray(antes)) {
                return antes.length === 0;
            }

            // Si es objeto
            return Object.keys(antes).length === 0;
        });

        console.log(todosAntesVacios,item.accion === 'creada' && Object.keys(cambiosUnificados.antes).length === 0 && todosAntesVacios && grupo.length > 1,  "TODOS ESTÁN VACÍOS");
        // si se añade un servicio a una reserva existente pero antes era simple
        if(item.accion === 'creada' && cambiosUnificados.antes.multiple === null && cambiosUnificados.despues.multiple !==null){
            console.log("entra aquií-------------1");
            actionUtilizar = 'modificada';
            color = 'primary';
            //si accion es creada pero sólo se ha añadido un servicio a reserva multiple existente
        }else if(item.accion === 'creada' && grupo.length === 1 && item.ids_reservas.length > 1){
            console.log("entra aquií-------------2");
            actionUtilizar = 'modificada';
            color = 'primary';
            //accion es crear pero hemos modificado fecha y añadido servicio a reserva multiple
        }else if(item.accion === 'creada' && grupo.length > 1 && Object.keys(cambiosUnificados.antes).length > 1 && serviciosUnicos.length > 1){
            console.log("entra aquií-------------3");
            actionUtilizar = 'modificada';
            color = 'primary';
            //creamos una reserva multiple
        }else if(item.accion === 'creada' && Object.keys(cambiosUnificados.antes).length === 0 && todosAntesVacios && grupo.length > 1){
            console.log("entra aquií-------------4");

            actionUtilizar = 'creada';
            color = 'success';
        }else{
            let esModificacionServicio = false;
            //con esto compruebo si a demás de eliminada hay cambio fecha
            if(item.accion === 'eliminada' && grupo.length > 1 && item.ids_reservas.length > 1){
                console.log("entra aquií-------------5");
                 const hayCambioFecha = historial.some(item =>
                    item.cambios?.despues?.date_time !== undefined
                );

                if (hayCambioFecha) {
                    console.log("entra aquií-------------6");
                    badgetExtraModifi =`
                        <span class="badge bg-primary" style="display: block;">
                            modificada
                        </span>
                    `;
                }else{
                    badgetExtraModifi = '';
                }
            }
            console.log("entra aquií-------------7");
            actionUtilizar = item.accion;
            color = color;
            if(item.accion === 'eliminada' && !item.cambios?.despues.length && cambiosUnificados.antes.service_id !== cambiosUnificados.despues.service_id){
                esModificacionServicio = true;
                actionUtilizar = 'modificada';
                color = 'primary';
                badgetExtraModifi='';
            }
            // se ha eliminado un servicio sin modificación && !esModificacionServicio && item.ids_reservas.length > serviciosUnicos.length
            if(item.accion === 'eliminada' && item.ids_reservas.length > serviciosUnicos.length && item.total_pagar > cambiosUnificados.despues.total_payment){
                console.log("ES ELIMINACION PERO NO ES MODIFICACION");

                 badgetExtraModifi =`
                    <span class="badge bg-danger" style="display: block;">
                        eliminada
                    </span>
                `;
            }else{
                console.log("NO LO ES---------");

                badgetExtraModifi = '';
            }

        }



        //generamos la tabla
        tbody.innerHTML += `
            <tr style="background-color:white;">
                <td>${fecha}</td>

                <td>
                        ${badgetExtraModifi}
                    <span class="badge bg-${color}">
                        ${actionUtilizar}
                    </span>
                </td>

                <td>
                    ${nombreResponsable}
                </td>

                <td>
                    <small class="text-muted">${responsableTipo}</small>
                </td>

                <td>${item.cliente_nombre ?? '-'}</td>

                <td>${item.empleada_nombre ?? '-'}</td>

                <td>
                    <span class="badge bg-dark">
                    ${item.reserva_servicio_id ? 'M-' : 'S-'}${item.booking_group_id}
                    </span>
                </td>

                <td>
                    <button class="btn btn-sm btn-outline-dark" style="width: 100%;"
                        onclick='abrirModalCambios(
                            ${JSON.stringify(cambios)},
                            "${item.accion}",
                            ${JSON.stringify(item)},
                            ${JSON.stringify(serviciosUnicos)},
                            ${JSON.stringify(grupo)}
                        )'>
                        Ver
                    </button>
                </td>
            </tr>
        `;
    });
}


//abre el modal para visualizar los cambios historial modificacion reservas
const iconosCampos = {
    date_time: 'bi-clock',
    empleada_id: 'bi-person-badge',
    service_id: 'bi-stars',
    total_payment: 'bi-cash-coin',
    status: 'bi-flag',
    duration: 'bi-hourglass-split',
    id:'bi-upc-scan',
    totalPagar: 'bi-cash-coin',
    delete: 'bi-trash',
    ids_reservas: 'bi-upc-scan'
};

const camposCriticos = [
    'date_time',
    'empleada_id',
    'service_id',
    'total_payment',
    'status',
    'delete'
];
function abrirModalCambios(cambios, accion, item, servicios, grupoRecibido){

    console.log(accion, "accion modal");
    console.log(cambios, "cambios modal");
    console.log(item, "item modal", item.reserva_id);
    console.log(servicios, "servicios modal");
    console.log(grupoRecibido, "grupo modal");



    let id_item = item.reserva_id;
    let id_servicio_item = item.reserva?.servicio?.id;
    let serviciosGloval = servicios;
    // para no confuncir en los foreach que utilizo item
    let item65 = item;

    //lo utilizo para mostrar ids servicios separados por comas
    let reservas_ids = [...item.ids_reservas];



    //lo envio a getServiciosByReservas
    const ids_reservasArray = [...item.ids_reservas];

    // html
    let html = `<div class="list-group">`;
    let servicioHtml = '';
    const container = document.getElementById('modalCambiosContenido');
    container.innerHTML = '';


    getServiciosByReservas(ids_reservasArray, function (servicios23){
        console.log("LINEA-1->" ,servicios23, servicios23.length, "servicios23", ids_reservasArray, ids_reservasArray.length, "ids reservas array", servicios, servicios.length, "servicios modal");
        let hayVistaCambioFecha33 = false;
        // distinguimos si es creación nueva reserva o que se ha modificado añadiendo un servicio.
        let serviciosAUtilizar ='';
        let arrayIdsReservasMayor = ids_reservasArray.length > servicios.length ? true:false;
        servicios.length< servicios23.length ?  serviciosAUtilizar = servicios23 : serviciosAUtilizar = servicios;

        if (accion === 'creada' && item?.reserva?.servicio) {
            console.log(cambios.antes && serviciosGloval.length > 1 && grupoRecibido.length > 1, "PRUEBA");

            //accion es crear pero se ha añadido servicio a RM más cambio fecha
            if(cambios.antes && serviciosGloval.length > 1 && grupoRecibido.length > 1){
                serviciosAUtilizar = servicios;
                console.log(servicios, servicios.length, "servicios utilizar----------");

            }
            //añadimos nuevos
            cambios.despues.totalPagar = item?.total_pagar ?? 0;
            let accionCrearAniadirServicioAhoraSimple = false;
            let cajaServicioAniadido = '';
            let tituloServicioAniadido = '';
            // accion es creada pero sólo se ha añadido servicio a reserva existente que antes era simple
            if(cambios.antes.multiple === null && cambios.despues.multiple !==null){
                accionCrearAniadirServicioAhoraSimple = true;
            }else if(item.ids_reservas.length > 1 && grupoRecibido.length === 1){

            }

            const todosAntesVaciosModal = grupoRecibido.every(item => {
                const antes = item.cambios?.antes;

                if (!antes) return true;

                // Si es array
                if (Array.isArray(antes)) {
                    return antes.length === 0;
                }

                // Si es objeto
                return Object.keys(antes).length === 0;
            });
            html += `<strong class="text-black">SERVICIOS:</strong>`;
            //creamos la vista para cambio fecha
            let vistaCambioFecha = '';

            if(!todosAntesVaciosModal &&cambios.antes && serviciosGloval.length > 1 && grupoRecibido.length > 1 && cambios.antes.date_time !== cambios.despues.date_time){
                console.log("entra aqui fecha---1");
                hayVistaCambioFecha33 = true;
                vistaCambioFecha = `
                <div class="row list-group-item mb-2 border-danger"
                        style="margin-bottom:0px!important;display:flex;gap:0px!important;">

                    <div class="align-items-center mb-2 col-12 col-lg-6" style="margin:0px!important">
                        <i class="bi bi-clock me-2 fs-5"></i>
                        <strong class="text-black">
                            Fecha
                        </strong>
                        <span class="badge bg-danger ms-2">Cambio crítico</span>
                    </div>

                    <div class="d-flex align-items-center gap-0 flex-wrap col-12 col-lg-6"
                            style="margin:0px!important;padding:0px!important;">

                                <div class="px-2 py-1 bg-danger-subtle rounded text-decoration-line-through">
                                        ${cambios.antes.date_time}
                                </div>
                                <i class="bi bi-arrow-right"></i>

                            <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                                ${cambios.despues.date_time}
                            </div>

                        </div>
                </div>

                `;
            }else{
                vistaCambioFecha = '';
            }

            serviciosAUtilizar.forEach(item => {
                console.log(item, "SERVICIOS A UTILIZAR---------");

                // let servicio = '';
                let servicio = item.servicio;
                // servicios.length< servicios23.length ?  servicio = item : servicio = item.servicio;
                let sombraServicio = '';
                if(servicios.length< servicios23.length){
                    sombraServicio = item.id === id_servicio_item ? 'filter: drop-shadow(2px 4px 6px grey);border: 1px solid;' : '';
                    cambios.despues.ids_reservas = reservas_ids.join(', ');
                }else{
                    sombraServicio = '';
                    reservas_ids = servicios.map(s => s.reserva_id);
                    cambios.despues.ids_reservas = reservas_ids.join(', ');
                }
                // let blur = item.reserva_id === id_item ? 'filter: blur(1.8px);' : '';
                console.log(item.reserva_id, id_item, item.reserva_id === id_item);
                if(accionCrearAniadirServicioAhoraSimple && item.reserva_id === cambios.despues.id){
                    console.log("CREADA ENTRA AQUÍ---1");

                    cajaServicioAniadido =`
                     <div class="px-2 py-1 bg-success-subtle rounded">
                            ID ${item.reserva_id}
                            añadido
                        </div>
                    `;
                    // tituloServicioAniadido = `
                    // <strong class="text-black">añadido</strong>
                    // `;
                }
                // a reserva multiple añadimos un servicio
                if(item65.ids_reservas.length > 1 && grupoRecibido.length === 1  && item.reserva_id === cambios.despues.id){
                     console.log("CREADA ENTRA AQUÍ---2");
                    cajaServicioAniadido =`
                     <div class="px-2 py-1 bg-success-subtle rounded">
                            ID ${item.reserva_id}
                            añadido
                        </div>
                    `;
                    //a reserva multiple añadimos servicio y cambio fecha
                }else if(cambios.antes && serviciosGloval.length > 1 && grupoRecibido.length > 1 && item.reserva_id === cambios.despues.id){
                     console.log("CREADA ENTRA AQUÍ---3");
                    cajaServicioAniadido =`
                     <div class="px-2 py-1 bg-success-subtle rounded">
                            ID ${item.reserva_id}
                            añadido
                        </div>
                    `;
                }
                servicioHtml += `

                    <div class="services-wrapper_service_EEfjR mb-3" data-service="${servicio.id}" style="${sombraServicio}">
                        <div class="services_serviceWrapper_gug5x">
                            <div class="services_serviceDecorator_ldMxA"
                                style="border-color:${servicio.borderColor}">
                            </div>
                            <div class="services_serviceInfo_iDMQwAdd">
                                <div class="services_serviceName_YhbTW services_size--16-sb_M5xdn txt--ellipsis">
                                    <span class="services_serviceName_YhbTW_span services_size--14_Mfwds">
                                        ${servicio.nombre}
                                    </span>
                                    <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                                        ${servicio.duration}min
                                    </span>
                                </div>
                                <div class="services_servicePrice_wErzf services_size--16-sb_M5xdn">
                                    ${servicio.precio} €
                                    ${cajaServicioAniadido}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // 👇 Lo agregamos una sola vez
            html += servicioHtml;
            html += vistaCambioFecha;

        }else{
            if(item.accion === 'eliminada'){
                html += `<strong class="text-black">ANTES:</strong>`;
            }else{
                html += `<strong class="text-black">SERVICIOS:</strong>`;
            }
            let esModificacionServicio=false;
            let serviciosUtilizar2 ='';
            //modificamos una reserva existente  && servicios.length> item65.ids_reservas.length
            if(!item65.cambios?.despues.length  && servicios.length> item65.ids_reservas.length && cambios?.despues?.service_id && cambios.antes.service_id !== cambios.despues.service_id){
                console.log("no hay despues y servicios mayor que reservas y nuevo servicio y son distintos");
                console.log(servicios, servicios23, "servicios y servicios23");
                serviciosUtilizar2 = servicios23;
                esModificacionServicio = true;
                 console.log("entra aqui servicios utilizar-----1 ");
            }else{
                 //se ha eliminado un servicio de una reserva multiple y pasa a ser simple
                if(item65.accion === 'eliminada' && cambios.antes.total_payment === '0.00' && cambios.despues.total_payment !== '0.00' && serviciosGloval.length< servicios23.length){
                    console.log(serviciosAUtilizar, "SERVICIOS UTILIZAR");

                    serviciosUtilizar2 = servicios23;
                    // esModificacionServicio = true;
                }else{
                    serviciosUtilizar2 = servicios;
                    esModificacionServicio = false;
                }

            }
            if(item65.accion === 'eliminada' && item65.ids_reservas.length > 1 && arrayIdsReservasMayor){


                    // const reservaIdAExcluir = item[65].reserva_id;

                    // serviciosAUtilizar = servicios.filter(servicio =>
                    //     servicio.reserva_id !== reservaIdAExcluir
                    // );
                    serviciosUtilizar2 = servicios;
                    console.log("entra aqui servicios utilizar-----2 ", serviciosUtilizar2);
            }
            let blur = '';
            let cuadradoRojo = '';
            console.log( serviciosUtilizar2, "SERVICIO UTILIZAR 2");
            console.log("entra aqui servicios utilizar-----3 ");
            serviciosUtilizar2.forEach(item => {
                let servicio88 = '';
                let servicioModificado ='';

                // console.log(item, "itemForeach");
                //modificamos una reserva existente  && servicios.length> item65.ids_reservas.length
                if(esModificacionServicio){
                    servicio88 = item.servicio;

                    // ponemos que ha sido modificado con fondo rojo
                    if(item.reserva_id === item65.reserva_id){
                         servicioModificado =`
                        <div class="px-2 py-1 bg-danger-subtle rounded">
                            ID ${item.reserva_id}
                        </div>
                        `;
                    }else{
                            servicioModificado ='';
                    }
                }else{
                    servicio88 = item.servicio;
                }


                 if(item65.accion === 'eliminada'){
                    if(item.reserva_id === id_item){
                        if(cambios.despues.service_id !== servicio88.id){
                            console.log(servicio88.id, "SERVICIO ID");

                            blur = '';
                        }else{
                            blur = 'filter: blur(1.8px);';
                        }
                    }
                    // blur = item.reserva_id === id_item ? 'filter: blur(1.8px);' : '';
                }
                //se ha eliminado un servicio de una reserva multiple
                if(item65.accion === 'eliminada' && cambios.antes.total_payment === '0.00' && cambios.despues.total_payment !== '0.00' && serviciosGloval.length< servicios23.length){
                    console.log("SE HA ELIMINADO UN SERVICIO DE UNA RESERVA MULTIPLE ");
                    if(item65.reserva_id === item.reserva_id){
                        cuadradoRojo =`
                        <div class="px-2 py-1 bg-danger-subtle rounded">
                            ID ${item.reserva_id}
                        </div>
                        `;
                    }else{
                        cuadradoRojo ='';
                    }

                }else{
                    console.log("NOOOOOOO", cambios.antes.total_payment === '0.00',cambios.antes.total_payment);


                }
                console.log(servicio88, "SERVICIO 88");
                // else{
                //     blur = '';
                // }
                // console.log(item.reserva_id, id_item, item.reserva_id === id_item, blur, item.accion === 'eliminada');

                servicioHtml += `
                    <div class="services-wrapper_service_EEfjR mb-3" data-service="${servicio88.id}" style="${blur}">
                        <div class="services_serviceWrapper_gug5x">
                            <div class="services_serviceDecorator_ldMxA"
                                style="border-color:${servicio88.borderColor}">
                            </div>
                            <div class="services_serviceInfo_iDMQwAdd">
                                <div class="services_serviceName_YhbTW services_size--16-sb_M5xdn txt--ellipsis">
                                    <span class="services_serviceName_YhbTW_span services_size--14_Mfwds">
                                        ${servicio88.nombre}
                                    </span>
                                    <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                                        ${servicio88.duration}min
                                    </span>
                                </div>
                                <div class="services_servicePrice_wErzf services_size--16-sb_M5xdn">
                                    ${servicio88.precio} €
                                    ${cuadradoRojo}
                                     ${servicioModificado}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += servicioHtml;
        }
        console.log(cambios, "CAMBIOS");
        if(item.accion === 'eliminada'){
            console.log("ESTAMOS AQUI");

            let icono = '';
            let nombreCampo = '';
            let elServicioASido ='';
            let esModificacionServicio2 = false;
            let textoTachado = '';
             if(!item65.cambios?.despues.length  && servicios.length> item65.ids_reservas.length && cambios?.despues?.service_id && cambios.antes.service_id !== cambios.despues.service_id){
                esModificacionServicio2 = true;
                icono = iconosCampos['service_id'] ?? 'bi-stars';
                nombreCampo = 'Servicio';
                elServicioASido = 'ha sido modificada';
                textoTachado = '';
            }else{
                esModificacionServicio2 = false;
                icono = iconosCampos['delete'] ?? 'bi-trash';
                nombreCampo = 'Eliminada';
                elServicioASido = 'ha sido eliminada';
                textoTachado = 'text-decoration-line-through';
            }

            let esCritico = camposCriticos.includes('delete');
            let gap = 'gap-2';
            let colorHeader = 'danger';
            let badgeCritico = `<span class="badge bg-danger ms-2">Cambio crítico</span>`;
            html += `
                <div class="row list-group-item mb-2 border-${colorHeader}"
                        style="margin-bottom:0px!important;display:flex;gap:0px!important;">

                    <div class="align-items-center mb-2 col-12 col-lg-6" style="margin:0px!important">
                        <i class="bi ${icono} me-2 fs-5"></i>
                        <strong class="text-black">
                            ${nombreCampo}
                        </strong>
                        ${badgeCritico}
                    </div>

                    <div class="d-flex align-items-center ${gap} flex-wrap col-12 col-lg-6"
                            style="margin:0px!important;padding: 0px !important;">
                            <div class="px-2 py-1 bg-danger-subtle rounded ${textoTachado}">
                                    Reserva id ${item.reserva_id} ${elServicioASido}
                            </div>
                    </div>
                </div>
            `;

            // comprobamos si a demás de eliminar hay cambio de fecha
            const fechaAntes = cambios.antes?.date_time;
            const fechaDespues = cambios.despues?.date_time;

            if (fechaAntes && fechaDespues && fechaAntes !== fechaDespues) {
               console.log("entra aqui fecha---2");

                  html += `
                    <div class="row list-group-item mb-2 border-${colorHeader}"
                        style="margin-bottom:0px!important;display:flex;gap:0px!important;">

                        <div class="align-items-center mb-2 col-12 col-lg-6" style="margin:0px!important;">
                            <i class="bi ${iconosCampos['date_time']} me-2 fs-5"></i>
                            <strong class="text-black">
                                Fecha
                            </strong>
                        </div>

                        <div class="d-flex align-items-center gap-0 flex-wrap col-12 col-lg-6"
                            style="margin:0px!important;padding:0px!important;">

                                <div class="px-2 py-1 bg-danger-subtle rounded text-decoration-line-through">
                                        ${cambios.antes.date_time}
                                </div>
                                <i class="bi bi-arrow-right"></i>

                            <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                                ${cambios.despues.date_time}
                            </div>

                        </div>
                    </div>
                `;
            }
            console.log(servicios, "SERVICIOS DESPUÉS");

            let servicioshtmlDespues = '';
            let serviciosUtilizarDespues = '';
            html += `<strong style="padding-top:1rem" class="text-black">DESPUÉS:</strong>`;
            //se ha eliminado un servicio de una reserva multiple
             if(item65.accion === 'eliminada' && cambios.antes.total_payment === '0.00' && cambios.despues.total_payment !== '0.00' && serviciosGloval.length< servicios23.length){
                serviciosUtilizarDespues = servicios23;
                console.log("servicios utilizar----------1");

             }else if(item65.accion === 'eliminada' && item65.ids_reservas.length > 1 && arrayIdsReservasMayor){
                serviciosUtilizarDespues = servicios;
                 console.log("servicios utilizar----------2");
             }else{
                serviciosUtilizarDespues = servicios;
                 console.log("servicios utilizar----------3");
             }
             console.log(serviciosUtilizarDespues,"servicios utilizar después");

            serviciosUtilizarDespues
                .filter(s => s.reserva_id !== item.reserva_id) // 👈 excluimos aquí
                .forEach(s => {

                    const servicio = s.servicio;

                    servicioshtmlDespues += `
                        <div class="services-wrapper_service_EEfjR mb-3" data-service="${servicio.id}">
                            <div class="services_serviceWrapper_gug5x">
                                <div class="services_serviceDecorator_ldMxA"
                                    style="border-color:${servicio.borderColor}">
                                </div>
                                <div class="services_serviceInfo_iDMQwAdd">
                                    <div class="services_serviceName_YhbTW services_size--16-sb_M5xdn txt--ellipsis">
                                        <span class="services_serviceName_YhbTW_span services_size--14_Mfwds">
                                            ${servicio.nombre}
                                        </span>
                                        <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                                            ${servicio.duration}min
                                        </span>
                                    </div>
                                    <div class="services_servicePrice_wErzf services_size--16-sb_M5xdn">
                                        ${servicio.precio} €
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });

            html += servicioshtmlDespues;

        }else{
            if (cambios.despues) {
                console.log("entra aqui ultimo-----");

            Object.keys(cambios.despues).forEach(campo => {

                // 👉 si es creada solo dejamos fecha y empleada
                if (accion === 'creada' && !['date_time','empleada_id', 'ids_reservas', 'totalPagar'].includes(campo)) {
                    console.log("entra aqui penultimo---");

                    return;
                }else if(accion === 'creada' && hayVistaCambioFecha33 && !['empleada_id', 'ids_reservas', 'totalPagar'].includes(campo)){
                    return;
                }

                let antes = cambios.antes ? cambios.antes[campo] : null;
                let despues = cambios.despues[campo];

                let nombreCampo = traduccionesCampos[campo] ?? campo;

                antes = formatearValor(campo, antes);
                despues = formatearValor(campo, despues);

                let icono = iconosCampos[campo] ?? 'bi-pencil';
                let esCritico = camposCriticos.includes(campo);
                let gap = nombreCampo.trim() === 'Fecha' ? 'gap-0' : 'gap-2';
                let colorHeader = accion === 'creada'
                    ? 'success'
                    : (esCritico ? 'danger' : 'dark');

                let badgeCritico = (esCritico && accion !== 'creada')
                    ? `<span class="badge bg-danger ms-2">Cambio crítico</span>`
                    : '';

                html += `
                    <div class="row list-group-item mb-2 border-${colorHeader}"
                        style="margin-bottom:0px!important;display:flex;gap:0px!important;">

                        <div class="align-items-center mb-2 col-12 col-lg-6" style="margin:0px!important">
                            <i class="bi ${icono} me-2 fs-5"></i>
                            <strong class="text-black">
                                ${nombreCampo}
                            </strong>
                            ${badgeCritico}
                        </div>

                        <div class="d-flex align-items-center ${gap} flex-wrap col-12 col-lg-6"
                            style="margin:0px!important;padding: 0px !important;">

                            ${
                                (antes !== null && accion !== 'creada')
                                ? `<div class="px-2 py-1 bg-danger-subtle rounded text-decoration-line-through">
                                        ${antes}
                                </div>
                                <i class="bi bi-arrow-right"></i>`
                                : ''
                            }

                            <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                                ${despues}
                            </div>

                        </div>
                    </div>
                `;
            });
        }
        }


        html += `</div>`;

        container.innerHTML = html;

        let modal = new bootstrap.Modal(document.getElementById('modalCambiosReserva'));
        modal.show();

    });

}



// //renderiza la vista historial modificacions reservas
// function renderHistorialTimeline(historial) {
//     const container = document.getElementById('timelineHorizontal');
//     container.innerHTML = '';
//     if(historial.length === 0){
//         container.innerHTML=`
//         <div class="col-12 col-lg-9 noHayModificacionesReservas b-empty-placeholder_container_jSbur index_noResults_nPiXA" style="height:100%">
//             <div class="b-image_image_QfpQF b-empty-placeholder_image_qDGRU" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/505b8295/img/empty-appointments.c27c9262.svg&quot;); background-size: contain; width: 128px; height: 52px; padding-top: 0px;"></div>
//             <p class="b-empty-placeholder_title_BNhv7 b-empty-placeholder_size--16_rr609">No hay modificaciones que mostrar</p>
//             <small class="b-empty-placeholder_description_B6M7l b-empty-placeholder_size--14_hdWAE">Parece que no hay modificaciones para los criterios seleccionados.</small>
//         </div>
//         `;
//     }else{
//         historial.forEach(item => {

//             let cambios = JSON.parse(item.cambios);

//             let color = 'primary';
//             if(item.accion === 'creada') color = 'success';
//             if(item.accion === 'eliminada') color = 'danger';

//             let fecha = new Date(item.created_at).toLocaleString('es-ES');

//             let htmlCambios = '';

//             if(cambios.despues){
//                 Object.keys(cambios.despues).forEach(campo => {

//                     let antes = cambios.antes ? cambios.antes[campo] : null;
//                     let despues = cambios.despues[campo];

//                     let nombreCampo = traduccionesCampos[campo] ?? campo;
//                     antes = formatearValor(campo, antes);
//                     despues = formatearValor(campo, despues);

//                     htmlCambios += `
//                         <div class="small" style="display: flex;gap: 4px;">
//                             <b>${nombreCampo}</b><br>
//                             <span class="text-danger">${antes}</span>
//                             →
//                             <span class="text-${color} fw-bold">${despues}</span>
//                         </div>
//                         <hr class="my-1">
//                     `;
//                 });
//             }
//            let nombreResponsable = capitalizarPalabras(
//                 `${item.responsable.name} ${item.responsable.primer_apellido}`
//             );
//             let responsableTipo = capitalizarPalabras(
//                 `${item.responsable_tipo}`
//             );
//             container.innerHTML += `
//                 <div class="timeline-card border-${color} mb-2">
//                     <div class="fw-bold text-${color}">
//                         ${item.accion.toUpperCase()}
//                     </div>
//                     <div class="timeline-time">${fecha} Por ${nombreResponsable} - ${responsableTipo}</div>
//                     <div class="mt-2">
//                         ${htmlCambios}
//                     </div>
//                 </div>
//             `;
//         });

//     }
// }

const traduccionesCampos = {
    id: "ID Reserva",
    user_id: "Cliente",
    service_id: "Servicio",
    date_time: "Fecha",
    duration: "Duración (min)",
    empleada_id: "Empleada",
    status: "Estado",
    total_payment: "Precio",
    totalPagar:"Total a pagar",
    nota: "Nota",
    nota_interna: "Nota interna",
    mensaje_cliente: "Mensaje cliente",
    multiple: "Grupo reserva",
    ids_reservas: "ID Reserva",
    cliente_confirmo_modificacion: "El cliente ha confirmado la modificación"
};

const traduccionesEstado = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    pagada: "Pagada",
    Finalizada: "Finalizada",
    cancelada: "Cancelada"
};
//función que formatea palabras de las constantes de arriba
function formatearValor(campo, valor) {

    if (valor === null || valor === undefined) return '—';

    // Fecha
    if (campo === 'date_time') {
        return new Date(valor).toLocaleString('es-ES');
    }

    // Precio
    if (campo === 'total_payment') {
        return valor + ' €';
    }

    // Estado
    if (campo === 'status') {
        return traduccionesEstado[valor] ?? valor;
    }

    return valor;
}

//función para que las modificaciones de reservas se pueda hacer scroll con el ratón
// const slider = document.querySelector('.timeline-horizontal-wrapper');
// let isDown = false;
// let startX;
// let scrollLeft;

// slider.addEventListener('mousedown', e => {
//   isDown = true;
//   startX = e.pageX - slider.offsetLeft;
//   scrollLeft = slider.scrollLeft;
// });

// slider.addEventListener('mouseleave', () => isDown = false);
// slider.addEventListener('mouseup', () => isDown = false);

// slider.addEventListener('mousemove', e => {
//   if(!isDown) return;
//   e.preventDefault();
//   const x = e.pageX - slider.offsetLeft;
//   const walk = (x - startX) * 2;
//   slider.scrollLeft = scrollLeft - walk;
// });

//función para cargar las configuracions reservas desde base datos a la vista
let configReservas = document.querySelector('.configuracionNegocioA');
if (configReservas) {
    $(configReservas).off('click').on('click', function(event) {
        event.preventDefault();
        // console.log("config reservas");
        cargarConfiguraciones();
    });
}


//Clicas en la tarjeta de "Historial modificaciones reseras"
let historialCambiosReservas = document.querySelector('.vistaHistorialModificacionesReservas');
if (historialCambiosReservas) {
    $(historialCambiosReservas).off('click').on('click', function(event) {
        event.preventDefault();
        // console.log("historial cambios reservas");
        cargarHistorialCambiosReservas();
    });
}


//funcion para guardar las configuraciones de reservas
let botonGurardarconfiguracionReserva = document.querySelector('.savePreferenConfigReservas');
if (botonGurardarconfiguracionReserva) {
    $(botonGurardarconfiguracionReserva).off('click').on('click', function(event) {
        event.preventDefault();
        let tiempoReserva = document.getElementById('uid-152-input_antelacionReserva').value;
        let antelacionReserva = document.getElementById('uid-158-inputAntelacionReserva').value;
        let cambioFecha = document.getElementById('uid-164-inputCambioFecha').value;
        let confirmacionAutomatica = document.getElementById('toggle-3').checked;
        if(confirmacionAutomatica === true){
            confirmacionAutomatica = 'si';
        }else{
            confirmacionAutomatica = 'no';
        }
        console.log(confirmacionAutomatica, "confirmacionAutomatica");

        console.log("guardar configuraciones");
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
                let url = "save-configuracionReservas";
                // Hacer una petición AJAX al servidor
                $.ajax({
                    url: url, // Ruta que definimos en web.php
                    method: 'POST',
                    data: {
                        _token: csrfToken, // Token CSRF para seguridad
                        confirmacion_automatica: confirmacionAutomatica,
                        limite_tiempo_reserva: tiempoReserva,
                        antelacion_reserva: antelacionReserva,
                        cambio_fecha_reserva: cambioFecha,

                    },
                    success: function(data) {
                        cargarConfiguraciones();
                        if(data.guardada === true){
                            let stylos = 'position: absolute;right: auto;top: 16px;z-index: 9;';
                            insertMessageResolAction('Configuracion guardada con éxito', '#Configuracion_administrator', stylos, 'ok');
                        }
                    },
                    error: function(xhr) {
                        // console.log('Error al obtener las horas', xhr);
                    }
                });
    });
}

// Función genérica para manejar los hover de los tooltips ayuda configurar reservas
function configurarTooltip(selector, divSelector, tooltipSelector) {
    if (document.querySelector(selector)) {
        $(selector).hover(
            function() {
                // Cuando se activa el hover (mouseenter)
                $(divSelector).addClass('b-hint_hintVisible__yt8c');
                $(tooltipSelector).addClass('b-tooltip_tooltipVisible_UHA7z');
            },
            function() {
                // Cuando se desactiva el hover (mouseleave)
                $(divSelector).removeClass('b-hint_hintVisible__yt8c');
                $(tooltipSelector).removeClass('b-tooltip_tooltipVisible_UHA7z');
            }
        );
    }
}

// Llamamos a la función para cada caso
configurarTooltip('.ayudaReservConfim', '.divAddFrist', '.tooltipAddFrist');
configurarTooltip('.ayudaAntelacion', '.divconqueAntelacion', '.toolTipConqueAntelacion');
configurarTooltip('.ayudaCuantaAntalacion', '.divCuantaAntelacion', '.tooltipCuantaAntelacion');
configurarTooltip('.ayudaModificarFecha', '.divModificarFecha', '.tooltipModificarFecha');


//SEGUNDA PANTALLA ABRIMOS TERCERA
let enlaces11 = document.querySelectorAll('.openConfigServicios_b a');
if (enlaces11) {
    enlaces11.forEach(function (enlace11) {
        // Clonamos el enlace para eliminar cualquier evento anterior
        let clonedEnlace = enlace11.cloneNode(true);
        enlace11.parentNode.replaceChild(clonedEnlace, enlace11);
        // Ahora trabajamos con el nuevo enlace sin eventos previos
        $(clonedEnlace).off('click').on('click', function(event) {
            event.preventDefault();
            let dataUrl = clonedEnlace.getAttribute('data-url2');
            if (dataUrl === 'servicios.combos') {

                let userAdminis = document.getElementById('User_administrator');
                // userAdminis.remove();
                cambiarURL('admin/dashboard/Configuracion_showAllServices');
                showDiv('show_all_service');
                // reloadPage();
                // cambiarURL('admin/dashboard/Configuracion_showAllServices');
                window.addEventListener('load', () => {

                    showDiv('show_all_service');
                  });
                // showDiv('show_all_service');

                //SI CLICA EN BOTÓN NEGRO
                showModalAddservice();
                //ASIGNAMOS EVENTOS AL MODAL CREAR NEW SERVICE, CATEGORY, COMBO
                asignarEventoModalNewService();
            }
        });
    });
}
showModalAddservice();
asignarEventoModalNewService();
//OBTENER HORAS AL CLICAR EN UN DÍA Y LLAMA A "mostrarHoras()"
function storageNewCategory() {
    let nombreNuevaCategoria = document.querySelector("input[name='nombreCategoria']").value;
    let imagenInput = document.querySelector("input[name='imagenCategoria']").files[0]; // Obtener el archivo de imagen
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "storage-categoria";

    // Crear una nueva instancia de FormData
    let formData = new FormData();
    formData.append('_token', csrfToken);  // Añadir el token CSRF
    formData.append('nombreCategoria', nombreNuevaCategoria);  // Añadir el nombre de la categoría
    formData.append('imagen', imagenInput);  // Añadir la imagen seleccionada

    // Hacer la petición AJAX para enviar los datos
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: 'POST',
        data: formData,
        processData: false,  // No procesar los datos
        contentType: false,  // No establecer el tipo de contenido
        success: function(data) {
            if(data.categoriaCreada) {
                alert("Nueva categoria creada con éxito: " + data.nuevaCategoria);
                let contenedorCategorias = document.querySelector('.contentAllCategories');
                let urlImagenIconCategory = contenedorCategorias.getAttribute('data-urlImage');
                $(contenedorCategorias).append(`
                    <div class="service-drag-mirror">
                        <div class="category_bgcolor--white_PU_d0 category_categoryName_iuwvt category_size--16-sb_ntrdG">
                            <div class="category_nameWrapper_wK6_H">
                                <span class="d-flex justify-content-center b-icon icon-grab iconFont index_grabIcon_W4ymA">
                                    <img class="modifyNameCategory" src="${urlImagenIconCategory}" alt="nueva categoria" />
                                </span>
                                <div class="category_name_JjeDF">
                                    ${data.nuevaCategoria}
                                </div>
                            </div>
                            <span class="b-icon icon-arrow-right iconFont index_arrowIcon_aAlS4" style="font-size: 26px;"></span>
                        </div>
                    </div>
                `);
            }
        },
        error: function(xhr) {
            console.log('Error al guardar el nombre de la categoria', xhr);
        }
    });
}
    if(document.getElementById('imagenCategoria')) {
         document.getElementById('imagenCategoria').addEventListener('change', function(event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        const previewImage = document.getElementById('preview-image'); // Elemento de la imagen para la vista previa
        const plusSign = document.getElementById('plus-sign'); // Elemento del signo "+"

        if (file) {
            const reader = new FileReader();  // Crear un objeto FileReader

            reader.onload = function(e) {
                // Cambiar la fuente de la imagen
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';  // Mostrar la imagen
                plusSign.style.display = 'none';  // Ocultar el signo "+"
            };

            reader.readAsDataURL(file);  // Leer el archivo como URL de datos
        } else {
            previewImage.style.display = 'none';  // Si no hay archivo, ocultar la vista previa
            plusSign.style.display = 'block';  // Volver a mostrar el signo "+"
        }
    });
    }

    if(document.getElementById('imagenService')){
         document.getElementById('imagenService').addEventListener('change', function(event) {
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        const previewImage = document.getElementById('preview-imageService'); // Elemento de la imagen para la vista previa
        const plusSign = document.getElementById('plus-sign'); // Elemento del signo "+"

        if (file) {
            const reader = new FileReader();  // Crear un objeto FileReader

            reader.onload = function(e) {
                // Cambiar la fuente de la imagen
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';  // Mostrar la imagen
                plusSign.style.display = 'none';  // Ocultar el signo "+"
            };

            reader.readAsDataURL(file);  // Leer el archivo como URL de datos
        } else {
            previewImage.style.display = 'none';  // Si no hay archivo, ocultar la vista previa
            plusSign.style.display = 'block';  // Volver a mostrar el signo "+"
        }
    });
    }



var categoriaSeleccionadaNewServiceInput = document.getElementById('categoriaSeleccionadaNewServiceInput');
var categoriaSeleccionadaNewServiceInputId = document.getElementById('categoriaSeleccionadaNewServiceInputId');
var colorSeleccionadoNewService;

//PONE CHECK CATEGORIA SELECCIONADA ASIGNA INPUT CATEGORIA
function categoriaSeleccionadaNewService(){
    let categoria;
    let visualizadorCategroria = document.querySelector('.styles_slotLeft_k29NgCategorias');
    //ponemos el chek
    $('.contenedorCategorias .list').off('click').on('click', '.index_defaultItem_pKlHs', function(event) {
        event.preventDefault();
        // console.log("holaaaaa");
        // Primero, quitamos la clase .index_--selected_oUDGp del elemento que la tiene index_--highlighted__3J43
        $('.index_--selected_oUDGp').removeClass('index_--selected_oUDGp');
        $('.index_--highlighted__3J43').removeClass('index_--highlighted__3J43');

        // Luego, añadimos la clase al div que fue clicado
        $(this).addClass('index_--selected_oUDGp index_--highlighted__3J43');
        categoria = $(this).attr('data-category');
        // console.log(categoria, "categroai");
    // ponemos el valor categoria que se vea
    visualizadorCategroria.textContent = categoria;
    console.log("categoria, ", categoria);

    //asignamos el valor al input hidden categoria
    categoriaSeleccionadaNewServiceInput.value = categoria;
    categoriaSeleccionadaNewServiceInputId.value = $(this).attr('data-index');
    categoriaSeleccionadaNewServiceInput.dispatchEvent(new Event('input'));
    cerrarModalCategorias('.contenedorCategorias');
    });
}

function comprobarHoraFinMayorQueInicio(slotHoraInicio, contenedorMensa, valorSeleccionado, contenedorBordeWarning, slotHoraFin, mostrarAlert = true){
    let mensaje = `
        <p style="margin:0px" class="index_message_IeJl5" data-testid="error-input-message">La hora de fin debe ser mayor que hora inicio</p>
    `;

    let botonAniadir = document.getElementById('uid-319-inputAniadirServicio');
    let contenedorMensajeAlert = document.querySelector(contenedorMensa);
    const horaInicio = document.querySelector(slotHoraInicio).textContent;
    // Convertir las horas a objetos Date para compararlas fácilmente
    const [horasInicio, minutosInicio] = horaInicio.split(':').map(Number);
    const [horasFin, minutosFin] = valorSeleccionado.split(':').map(Number);
    const fechaInicio = new Date();
    fechaInicio.setHours(horasInicio, minutosInicio, 0);
    const fechaFin = new Date();
    fechaFin.setHours(horasFin, minutosFin, 0);

    if (fechaFin <= fechaInicio) {
        $(contenedorMensajeAlert).empty();
        $(contenedorMensajeAlert).append(mensaje);
        document.querySelector(contenedorBordeWarning).classList.add('border-warning2');
        // Añadir 5 minutos a la hora de inicio y actualizar slotHoraFin
        let nuevaFechaFin = new Date(fechaInicio.getTime() + 5 * 60000); // 5 minutos en milisegundos
        let horasFormateadas = nuevaFechaFin.getHours().toString().padStart(2, '0');
        let minutosFormateados = nuevaFechaFin.getMinutes().toString().padStart(2, '0');
        document.querySelector(slotHoraFin).textContent = `${horasFormateadas}:${minutosFormateados}`;
        // if(contenedorMensa === '.alert021'){
        //     document.getElementById('uid-377-inputEditReserv').disabled = true;
        //     document.getElementById('uid-377-input').disabled = true;
        // }else if(contenedorMensa === '.alert022'){
        //     botonAniadir.disabled = true;
        //     let miDiv = document.querySelector('.reservCobrarFooterInfo');
        //     let botones = miDiv.getElementsByTagName('button');
        //     for (let boton of botones) {
        //         boton.disabled = true;
        //     }
        // }
        if(mostrarAlert){
            alert("La hora fin debe superar a al hora inicio.");
        }
    }else{
        $(contenedorMensajeAlert).empty();
        document.querySelector(contenedorBordeWarning).classList.remove('border-warning2');
        // if(contenedorMensa === '.alert021'){
        //     document.getElementById('uid-377-inputEditReserv').disabled = false;
        //     document.getElementById('uid-377-input').disabled = false;
        // }else if(contenedorMensa === '.alert022'){
        //     botonAniadir.disabled = false;
        //     let miDiv = document.querySelector('.reservCobrarFooterInfo');
        //     let botones = miDiv.getElementsByTagName('button');
        //     for (let boton of botones) {
        //         boton.disabled = false;
        //     }
        // }
    }
}

function comprobarHoraInicioMenorQueFin(valorSeleccionado, contenedorMensa, slotHoraFin, contenedorBordeWarning, mostrarAlert = true) {
    let mensaje = `
        <p style="margin:0px" class="index_message_IeJl5" data-testid="error-input-message">La hora de inicio debe ser menor que hora fin</p>
    `;

    let botonAniadir = document.getElementById('uid-319-inputAniadirServicio');
    let contenedorMensajeAlert = document.querySelector(contenedorMensa);
    const horaFin = document.querySelector(slotHoraFin).textContent;

    // Convertir las horas a objetos Date para compararlas fácilmente
    const [horasInicio, minutosInicio] = valorSeleccionado.split(':').map(Number);
    const [horasFin, minutosFin] = horaFin.split(':').map(Number);
    const fechaInicio = new Date();
    fechaInicio.setHours(horasInicio, minutosInicio, 0);
    const fechaFin = new Date();
    fechaFin.setHours(horasFin, minutosFin, 0);

    if (fechaInicio >= fechaFin) {
        // Añadir 5 minutos a la hora de inicio y actualizar slotHoraFin
    let nuevaFechaFin = new Date(fechaInicio.getTime() + 5 * 60000); // 5 minutos en milisegundos
    let horasFormateadas = nuevaFechaFin.getHours().toString().padStart(2, '0');
    let minutosFormateados = nuevaFechaFin.getMinutes().toString().padStart(2, '0');
    document.querySelector(slotHoraFin).textContent = `${horasFormateadas}:${minutosFormateados}`;
        $(contenedorMensajeAlert).empty();
        $(contenedorMensajeAlert).append(mensaje);
        document.querySelector(contenedorBordeWarning).classList.add('border-warning2');

        // if(contenedorMensa === '.alert021'){
        //     document.getElementById('uid-377-inputEditReserv').disabled = true;
        //     document.getElementById('uid-377-input').disabled = true;
        // } else if(contenedorMensa === '.alert022'){
        //     botonAniadir.disabled = true;
        //     let miDiv = document.querySelector('.reservCobrarFooterInfo');
        //     let botones = miDiv.getElementsByTagName('button');
        //     for (let boton of botones) {
        //         boton.disabled = true;
        //     }
        // }
        if(mostrarAlert){
            alert("La hora fin debe superar a al hora inicio.");
        }
    } else {
        $(contenedorMensajeAlert).empty();
        document.querySelector(contenedorBordeWarning).classList.remove('border-warning2');

        // if(contenedorMensa === '.alert021'){
        //     document.getElementById('uid-377-inputEditReserv').disabled = false;
        //     document.getElementById('uid-377-input').disabled = false;
        // } else if(contenedorMensa === '.alert022'){
        //     botonAniadir.disabled = false;
        //     let miDiv = document.querySelector('.reservCobrarFooterInfo');
        //     let botones = miDiv.getElementsByTagName('button');
        //     for (let boton of botones) {
        //         boton.disabled = false;
        //     }
        // }
    }
}


// Función genérica para seleccionar un elemento, asignar valor y cerrar modal
// clic en horas desplegable hora inicio hora fin desplegable horas
function seleccionarElemento(contenedor, input_id, claseItem, divVisualicer = null) {

    let input = document.getElementById(input_id);
    let divVisualizador = document.querySelector(divVisualicer);

    $(contenedor + ' .list').off('click').on('click', claseItem, function(event) {
        event.preventDefault();
        // console.log(this,"this");

        // Eliminar selección previa
        $(contenedor + ' .index_--selected_oUDGp').removeClass('index_--selected_oUDGp');
        $(contenedor + ' .index_--highlighted__3J43').removeClass('index_--highlighted__3J43');

        // Añadir la selección actual
        $(this).addClass('index_--selected_oUDGp index_--highlighted__3J43');

        // Obtener el valor del atributo data-time y asignarlo al input
        let valorSeleccionado = $(this).attr('data-time');
        // console.log(valorSeleccionado, "valorseleccionado");

        //inhabilitar precio si procede
        let inputPrecio = document.getElementById('precioServicio');
        let divPrecio = document.querySelector('.divPrecio');
        if(contenedor === '.contenedorTipoPrecio'){
            if(valorSeleccionado === 'No mostrar' ||
                valorSeleccionado === 'Gratis' ||
                valorSeleccionado === 'Variable'){
                inputPrecio.disabled = true; // Deshabilitar el input
                inputPrecio.value = ''; // Opcional: limpiar el valor del input
                inputPrecio.style.backgroundColor = '#f4f4f4';
                divPrecio.classList.add('noHoverBlack');
            } else {
                inputPrecio.disabled = false; // Habilitar el input si no cumple las condiciones
                inputPrecio.style.backgroundColor = 'white';
                divPrecio.classList.remove('noHoverBlack');
            }
        }
        if (divVisualizador === null &&
            (contenedor === '.contenedorTiempoAntelacion' ||
             contenedor === '.contenedorAntelacionReserva' ||
             contenedor === '.contenedorCambioFechaReserva')) {

            document.getElementById(input_id).value = $(this).attr('data-antelacion');
        } else{
              // console.log(valorSeleccionado, "seleccionado");

        // Asignar el valor al input y disparar el evento 'input'
        input.value = valorSeleccionado;
        divVisualizador.textContent = valorSeleccionado;
        }

        input.dispatchEvent(new Event('input'));

        // Cerrar el modal correspondiente
        cerrarModalCategorias(contenedor);
        if (contenedor.trim() == '.contenedorHorasInicioCalendar' || contenedor.trim() == '.contenedorHorasFinCalendar') {

            let horaInicio = document.querySelector('.slotHorasCobrarServicioCalendar').textContent;
            let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
            let start = formatFechaConHora(fecha, horaInicio);

            //AL CAMBIAR LA HORA DE INICIO SE CAMBIA LA HORA FIN AUTOMATICO
            let hayServicioSeleccionado = document.querySelector('.services_serviceDuration_Zb36z');
            let duracionServicio="";
            let horaFinCalculada="";
            let end="";
            if(hayServicioSeleccionado){
                duracionServicio = hayServicioSeleccionado.textContent;
                horaFinCalculada = calcularHoraFin(valorSeleccionado, duracionServicio);
                end = formatFechaConHora(fecha, horaFinCalculada);
            }
            if (contenedor.trim() == '.contenedorHorasInicioCalendar'){
                document.querySelector('.slotHorasCobrarServicioCalendar').setAttribute('data-hourreserv', valorSeleccionado);
                if(hayServicioSeleccionado){
                    // console.log("horasInicio nueva reserva", horaFinCalculada);
                    document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent = horaFinCalculada;
                    marcarHoraSeleccionada('.contenedorHorasFinCalendar', horaFinCalculada);
                }
                if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAddInicioCalendar')){
                    if (contenedor.trim() == '.contenedorHorasInicioCalendar'){
                        // console.log("estamos aquí-------------hola", eventIdChangeCalendar);

                        cambiarHoraInicioEvento(eventIdChangeCalendar, start);
                        cambiarHoraFinEvento(eventIdChangeCalendar, end);
                    }
                }
                cambiarHoraInicioEvento(eventIdChangeCalendar, start);
            }else{
                let horaFin = document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent;
                // document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent = horaFin;
                marcarHoraSeleccionada('.contenedorHorasFinCalendar', horaFin);
                // console.log("hora horas inicio fin");
                if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAddInicioCalendar')){
                    let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
                    let end = formatFechaConHora(fecha, horaFin);      // Fecha y hora de finalización
                    cambiarHoraFinEvento(eventIdChangeCalendar, end);
                }
            }
        }

        if (contenedor.trim() == '.contenedorHorasInicioAddCalendar' || contenedor.trim() == '.contenedorHorasFinAddCalendar') {
            // console.log("HORA HORAS INICIO");
            let hayServicioSeleccionado = document.querySelector('.services_serviceDuration_Zb36z');
            let duracionServicio = hayServicioSeleccionado.textContent;

            let horaFinCalculada = calcularHoraFin(valorSeleccionado, duracionServicio);
            let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
            let end = formatFechaConHora(fecha, horaFinCalculada);

            if(contenedor.trim()== '.contenedorHorasInicioAddCalendar'){
                document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').setAttribute('data-hourreserv', valorSeleccionado);
                document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent = horaFinCalculada;
                marcarHoraSeleccionada('.contenedorHorasFinAddCalendarclass', horaFinCalculada);

                if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAddInicioCalendarAdd')){
                    if (contenedor.trim() == '.contenedorHorasInicioAddCalendar'){
                        let horaInicio2 = document.querySelector('.slotHorasCobrarServicioAddCalendar').textContent;
                        let start2 = formatFechaConHora(fecha, horaInicio2);
                        cambiarHoraInicioEvento(eventIdChangeCalendar, start2);
                        cambiarHoraFinEvento(eventIdChangeCalendar, end);
                    }
                    // }else{
                    //     let horaFin2 = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent;
                    //     let end2 = formatFechaConHora(fecha2, horaFin2);      // Fecha y hora de finalización
                    //     cambiarHoraFinEvento(eventIdChangeCalendar, end2);
                    // }
                }
            }else{
                let horaFin = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent;
                marcarHoraSeleccionada('.contenedorHorasFinAddCalendarclass', horaFin);
                 if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAddInicioCalendar')){
                    let fecha = document.getElementById('datePikerfechaCitaInfo22').getAttribute('data-datepiker');
                    let end = formatFechaConHora(fecha, horaFin);      // Fecha y hora de finalización
                    cambiarHoraFinEvento(eventIdChangeCalendar, end);
                }
            }


        }

        if (contenedor.trim() == '.contenedorHorasInicio' || contenedor.trim() == '.contenedorHorasFin') {
            if (contenedor.trim() == '.contenedorHorasInicio'){
                comprobarHoraInicioMenorQueFin(valorSeleccionado, '.alert022', '.slotHoraFinCorbrarServicio', '.contenedorHorasFinClass', false);
            }else{
                comprobarHoraFinMayorQueInicio('.slotHorasCobrarServicio', '.alert022', valorSeleccionado, '.contenedorHorasFinClass', '.slotHoraFinCorbrarServicio', false);
            }
            if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAddInicio')){
                console.log("clic en hora inicio o hora fin");

                let fecha2 = document.querySelector('.fechaCitaInfo').getAttribute('data-datepiker');
                if (contenedor.trim() == '.contenedorHorasInicio'){
                    console.log("clic en hora inicio", eventIdChangeCalendar, infoArrayEnvio, infoArrayEnvio.length);
                    let horaInicio2 = document.querySelector('.slotHorasCobrarServicio').textContent;
                    let start2 = formatFechaConHora(fecha2, horaInicio2);
                    if(eramultiple && infoArrayEnvio.length === 1){
                        cambiarHoraInicioEvento(infoArrayEnvio[0].id, start2);
                    }else{
                        cambiarHoraInicioEvento(eventIdChangeCalendar, start2);
                    }
                }else{
                    let horaFin2 = document.querySelector('.slotHoraFinCorbrarServicio').textContent;
                    let end2 = formatFechaConHora(fecha2, horaFin2);      // Fecha y hora de finalización
                    if(eramultiple && infoArrayEnvio.length === 1){
                        cambiarHoraFinEvento(infoArrayEnvio[0].id, end2);
                    }else{
                        cambiarHoraFinEvento(eventIdChangeCalendar, end2);
                    }
                }
            }
        }
        if (contenedor.trim() == '.contenedorHorasInicioAdd' || contenedor.trim() == '.contenedorHorasFinAdd') {
            console.log("hola contenedor horas inicio add");

            // if (contenedor.trim() == '.contenedorHorasInicioAdd'){
            //     comprobarHoraInicioMenorQueFin(valorSeleccionado, '.alert021', '.slotHoraFinCorbrarServicioAdd', '.contenedorHorasFinAddclass', false);
            // }else{
            //     comprobarHoraFinMayorQueInicio('.slotHorasCobrarServicioAdd', '.alert021', valorSeleccionado, '.contenedorHorasFinAddclass', '.slotHoraFinCorbrarServicioAdd', false);
            // }
            //aunque no haya empleado seleccionado si hay servicio cambiamos hora fin
            let hayServicioSeleccionado = document.querySelector('.services_serviceDuration_Zb36z');//esto es donde dice la duracion
            let duracionServicio="";
            let horaFinCalculada="";
            let end="";
            if(hayServicioSeleccionado){
                duracionServicio = hayServicioSeleccionado.textContent;
                horaFinCalculada = calcularHoraFin(valorSeleccionado, duracionServicio);
                document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent = horaFinCalculada;
            }
            if(comprobarSiEmpleadoAsignadoNewReservCalendar('.slotEmpleadoAdd ')){
                console.log("EMPLEADO ASIGNADO");

                let fecha2 = document.querySelector('.fechaCitaInfo').getAttribute('data-datepiker');
                // console.log(fecha2," fecha cli hora inicio");
                // if(!fecha2){
                //     fecha2 = document.querySelector('.fechaCitaInfo22').getAttribute('data-datepiker');
                //     console.log("NO HAY FECHA 2");

                // }
                if (contenedor.trim() == '.contenedorHorasInicioAdd'){
                    console.log("hola clic aqui contenedorHorasInicioAdd");

                    document.querySelector('.slotHorasCobrarServicioAdd').setAttribute('data-hourreserv', valorSeleccionado);
                    if(hayServicioSeleccionado){
                        duracionServicio = hayServicioSeleccionado.textContent;
                        horaFinCalculada = calcularHoraFin(valorSeleccionado, duracionServicio);
                        end = formatFechaConHora(fecha2, horaFinCalculada);
                        // console.log("horasInicio nueva reserva", horaFinCalculada);
                        document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent = horaFinCalculada;
                        marcarHoraSeleccionada('.contenedorHorasFinAdd', horaFinCalculada);
                    }
                    let horaInicio2 = document.querySelector('.slotHorasCobrarServicioAdd').textContent;
                    let start2 = formatFechaConHora(fecha2, horaInicio2);
                    cambiarHoraInicioEvento(eventIdChangeCalendar, start2);
                    cambiarHoraFinEvento(eventIdChangeCalendar, end);
                }else{
                    let horaFin2 = document.querySelector('.slotHoraFinCorbrarServicioAdd').textContent;
                    let end2 = formatFechaConHora(fecha2, horaFin2);      // Fecha y hora de finalización
                    cambiarHoraFinEvento(eventIdChangeCalendar, end2);
                    marcarHoraSeleccionada('.contenedorHorasFinAdd', horaFin2);
                }
            }
        }
    });
}

function getFechaDos(idDatePiker){
    let fecha2 =  document.getElementById(idDatePiker).getAttribute('data-datepiker');
    return fecha2;
}


//comprueba si hay empleado seleccionado
function comprobarSiEmpleadoAsignadoNewReservCalendar(slotNombre){
    let empleadoNombre='';
    if(document.querySelector(slotNombre)){
        empleadoNombre = document.querySelector(slotNombre).textContent;
        //si hay nombre de empleado
        if(empleadoNombre.trim() !== 'Selecciona empleado'){
            let id_empleado = document.querySelector(slotNombre).getAttribute('data-empleid');
            return id_empleado;
        }else{
            return false;
        }
    }
}


// Inicializar las funciones específicas
seleccionarElemento('.contenedorHoras', 'horaNewServiceInput', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHoras');
seleccionarElemento('.contenedorMinutos', 'minutosNewServiceInput', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgMinutos');
seleccionarElemento('.contenedorTipoPrecio', 'tipoPrecioNewServiceInput', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgTipoPrecio');

seleccionarElemento('.contenedorHorasInicio', 'horaNewServiceInputInicio', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasInicio');
seleccionarElemento('.contenedorHorasFin', 'horaNewServiceInputFin', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasFin');

seleccionarElemento('.contenedorHorasInicioAdd', 'horaNewServiceInputInicioAdd', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasInicioAdd');
seleccionarElemento('.contenedorHorasFinAdd', 'horaNewServiceInputFinAdd', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasFinAdd');
seleccionarElemento('.contenedorEmpleados', 'uid-1345-input', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgEmpleadoAdd');
seleccionarElemento('.contenedorEmpleadosInicio', 'uid-inicio-input', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgEmpleadoAddInicio');

seleccionarElemento('.contenedorEmpleadosInicioCalendar', 'uid-inicio-inputCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgEmpleadoAddInicioCalendar');
seleccionarElemento('.contenedorEmpleadosInicioCalendarAdd', 'uid-inicio-inputCalendarAdd', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgEmpleadoAddInicioCalendarAdd');


seleccionarElemento('.contenedorHorasInicioAddCalendar', 'horaNewServiceInputInicioAddCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasInicioAddCalendar');
seleccionarElemento('.contenedorHorasFinAddCalendar', 'horaNewServiceInputFinAddCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasFinAddCalendar');
seleccionarElemento('.contenedorHorasInicioCalendar', 'horaNewServiceInputInicioCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasInicioCalendar');
seleccionarElemento('.contenedorHorasFinCalendar', 'horaNewServiceInputFinCalendar', '.index_defaultItem_pKlHs', '.styles_slotLeft_k29NgHorasFinCalendar');
seleccionarElemento('.contenedorTiempoAntelacion', 'uid-152-input_antelacionReserva', '.index_defaultItem_pKlHs');
seleccionarElemento('.contenedorAntelacionReserva', 'uid-158-inputAntelacionReserva', '.index_defaultItem_pKlHs');
seleccionarElemento('.contenedorCambioFechaReserva', 'uid-164-inputCambioFecha', '.index_defaultItem_pKlHs');


//ABRE MODAL PARA SELECCIONAR COLOR dentro PANTALLA 4
function openModalSelectColor() {
    let backgrounBlack  = document.querySelector('.contenedorColores');
        if (backgrounBlack.style.display === 'none' || backgrounBlack.style.display === '') {
            backgrounBlack.style.display = 'flex';  // Mostrar
        } else {
            backgrounBlack.style.display = 'none';  // Ocultar
        }
        colorSeleccionadoNewService();
}

// //ABRE MODAL PARA SELECCIONAR CLIENTE EN VISTA HISTORIAL MODIFICACION RESERVAS
// function openModalSelectClient() {
//     let backgrounBlack  = document.querySelector('.contenedorClientes');
//         if (backgrounBlack.style.display === 'none' || backgrounBlack.style.display === '') {
//             backgrounBlack.style.display = 'flex';  // Mostrar
//         } else {
//             backgrounBlack.style.display = 'none';  // Ocultar
//         }
//         colorSeleccionadoNewService();
// }

function colorSeleccionadoNewService(){
    let visualizadorColorElegido = document.querySelector('.styles_slotLeft_k29NgColores');
    let randomColorUrl = document.querySelector('.styles_slotLeft_k29NgColores').getAttribute('data-random-color-url');
    let contenedorColores = document.querySelector('.contenedorColores');
    let inputColorSeleccionado = document.getElementById('colorSeleccionadaNewServiceInput');
    let color;
    // Seleccionamos los spans que contienen los colores
    let colorSpans = document.querySelectorAll('.color-picker-modal_serviceColorTile_mt88Y');
    colorSpans.forEach(function (span){
        span.addEventListener('click', function(){
            // console.log(span, 'span');
            color = span.getAttribute('data-color');
            // Eliminar cualquier ícono de check existente de todos los spans
            colorSpans.forEach(function (s) {
                let existingIcon = s.querySelector('.icon-tick');
                if (existingIcon) {
                    existingIcon.remove();  // Eliminamos el ícono si existe
                }
            });
                // Añadir el ícono de check solo al span clickeado (spanCheck)
            span.innerHTML += `
                <span class="color-picker-modal_tickIcon_Zazmf b-icon icon-tick iconFont" style="font-size: 40px;"></span>
            `;
            if (contenedorColores) {
                contenedorColores.style.display = 'none';  // Ocultar el contenedor
            }
            if(color === 'randomColor'){
                visualizadorColorElegido.innerHTML=`
                <img data-color="${color}" width="24px" style="height: 24px;" class="b-icon_img_I0kuC index_colorPicker_dCcsj" src="${randomColorUrl}" alt="colores">
                `;
            }else{
                visualizadorColorElegido.innerHTML= `
                    <div data-color="${color}" class="index_colorPicker_dCcsj" style="background-color: ${color};"></div>
                `;
            }
            inputColorSeleccionado.value = color;
            inputColorSeleccionado.dispatchEvent(new Event('input'));
        });
    });
}
//RESETEAR FORMULARIO CREAR NUEVO SERVICIO
function resertFormNewService(){
    let visualizadorColorElegido = document.querySelector('.styles_slotLeft_k29NgColores');

    let urlObjeto = new URL(window.location.href);
    let baseUrl = urlObjeto.origin;
    // let baseUrl = 'http://localhost/laravel/salon-manicura-git/public';
    let randomColorUrl = baseUrl + '/storage/colors_option/random-color.svg';
    visualizadorColorElegido.setAttribute('data-random-color-url', randomColorUrl);
    visualizadorColorElegido.innerHTML=`
    <img data-color="randomColor" width="24px" style="height: 24px;" class="b-icon_img_I0kuC index_colorPicker_dCcsj" src="${randomColorUrl}" alt="colores">
    `;

    document.getElementById('nombreServicio').value='';

    document.querySelector('.styles_slotLeft_k29NgCategorias').textContent='No categorizado';
    document.getElementById('textAreaDescripcionService').value = '';
    document.getElementById('horaNewServiceInput').value='0h';
    document.querySelector('.styles_slotLeft_k29NgHoras').textContent='0h';
    document.querySelector('.styles_slotLeft_k29NgMinutos').textContent='30min';
    document.getElementById('minutosNewServiceInput').value='30min';
    document.querySelector('.styles_slotLeft_k29NgTipoPrecio ').textContent='Fijo';
    document.getElementById('tipoPrecioNewServiceInput').value='Fijo';
    document.getElementById('precioServicio').value='';
    deleteImageTemporaly();
    $('.filepond--list').empty();
    $('.index_--selected_oUDGp').removeClass('index_--selected_oUDGp');
    $('.index_--highlighted__3J43').removeClass('index_--highlighted__3J43');
    const container = document.getElementById('pasosContainer');

  const nuevoPaso = document.createElement('div');
  nuevoPaso.className = 'paso-input mb-2';
  nuevoPaso.innerHTML = `
    <div class="d-flex align-items-center" style="flex-wrap: wrap;">
       <div class="form-groupInput" style="margin-right: 5px;margin-bottom: 0px !important;width: calc(100% - 2rem);" >
            <input type="text" placeholder=" " name="pasos[]"
                class="gualazonF inputsNewService" id="pasos"
                required
                onblur="verificarInput('pasos')"/>
            <label for="pasos" class="styles_label_hleTI">Paso</label>
        </div>
    </div>
  `;
container.innerHTML = '';
container.appendChild(nuevoPaso);
}


//INICIALIZA LOS CONTADORES DE PALABRAS
function initCountLeathersTextArea(){
    contadorPalabras('#textAreaDescripcionService', '.chars-counterDescriptionService', 640);
    contadorPalabras('#nombreServicio', '.chars-counter-nameService', 70);
}

//TERCERA PANTALLA MANDAMOS CARGAR LA CUARTA (el formulario)
function asignarEventoModalNewService() {
    let enlacesCuarta = document.querySelectorAll('.add-button_button_U2OQn');
    if (enlacesCuarta) {
        enlacesCuarta.forEach(function (enlaceCuarta) {
            // Verifica si el enlace ya tiene un listener registrado
            $(enlaceCuarta).off('click').on('click', function(event) {
                event.preventDefault();
                let dataUrl = enlaceCuarta.getAttribute('data-url3');
                if (dataUrl === 'add.sevice') {
                    abrirCerrarModalAniadirServico();
                    showDiv('createNew_service');
                    changeBotonModifyCreateService('.botonModificarServicio', '.botonCrearServicio');
                    changeTitleModifyCreateService('.modificarServicioTitle', '.aniadirServicioTitle')
                    cambiarURL('admin/dashboard/Configuracion_createService');
                }
                else if(dataUrl === 'add.category'){
                    abrirCerrarModalAniadirServico();
                    abrirModal('newCategoryModal');
                }
            });
        });
    }
}

//FLECHA ATRA DE MODIFICAR SERVICIO
let modifyServiceBack = document.querySelector('.salirDeModificarServicio');
$(modifyServiceBack).off('click').on('click', function(event) {
    event.preventDefault();
    resertFormNewService();


    showDiv('show_all_service');
    cambiarURL('admin/dashboard/Configuracion_showAllServices');
    initIsotope('.isotope-container', '.isotope-item', '*', '.isotope-filters [data-filter]', 'data-filter');//servicios y combos de servicios

});
//quitar palomita colorSeleccionado
function quitarPalomitaColorSeleccionado(){
    let colorSpans = document.querySelectorAll('.color-picker-modal_serviceColorTile_mt88Y');
    colorSpans.forEach(function (s) {
        let existingIcon = s.querySelector('.icon-tick');
        if (existingIcon) {
            existingIcon.remove();  // Eliminamos el ícono si existe
        }
    });
}

//ELIMINA LAS IMAGENES SELECCIONADAS
function resetImagenUpload(){
    deleteImageTemporaly();
    $('.filepond--list').empty();
}

//CLICA BOTON CANCELAR MODIFICACIÓN SERVICIO VUELVE A SHOW ALL SERVICES
var botonCancelarModificarServicio = document.getElementById('cancelModifyService');
if (botonCancelarModificarServicio) {
    botonCancelarModificarServicio.onclick = function(event){
        event.preventDefault();
       quitarPalomitaColorSeleccionado();
       resetImagenUpload();
        showDiv('show_all_service');
     }
}

//MODIFICAR SERVICIO AL CLICAR EN FLECHA
function modificarServicioClicarFlecha(){
    let divServicios = document.querySelectorAll('.index_serviceListItem_frUaN');
    divServicios.forEach(function (divServicio){
        $(divServicio).off('click').on('click', function(event) {
            event.preventDefault();
            let serviceData = JSON.parse(divServicio.getAttribute('data-serviceModify'));
            // console.log(serviceData.serviceColor, "serviceColor");
            quitarPalomitaColorSeleccionado();
            resetImagenUpload();

            showDiv('createNew_service');
            changeBotonModifyCreateService('.botonCrearServicio', '.botonModificarServicio');
            changeTitleModifyCreateService('.aniadirServicioTitle', '.modificarServicioTitle')
            // cambiarURL('admin/dashboard/Configuracion_createService');
            addDataModifyService(serviceData);
        });
    });
}
modificarServicioClicarFlecha();

//AÑADE LOS DATOS AL FORMULARIO MODIFICAR SERVICIO
function addDataModifyService(serviceData){
    console.log(serviceData.servicePasos, "serviceData.servicePasos");

    let divColor = document.querySelector('.styles_slotLeft_k29NgColores');
    let  inputColor = document.querySelector("input[name='colorServicio']");
    let  inputNombreServicio = document.querySelector("input[name='nombreServicio']");
    let categoriaSeleccionadaNewServiceInputModify = document.getElementById('categoriaSeleccionadaNewServiceInput');
    let visualizadorCategroria = document.querySelector('.styles_slotLeft_k29NgCategorias');
    const textAreaDescripcionService = document.getElementById('textAreaDescripcionService');
    let  inputHoraServicio = document.querySelector("input[name='horaNewService']");
    let visualizadorHora = document.querySelector('.styles_slotLeft_k29NgHoras');
    let  inputMinutoServicio = document.querySelector("input[name='minutosNewService']");
    let visualizadorMinutos = document.querySelector('.styles_slotLeft_k29NgMinutos');
    let inputTipoPrecio = document.querySelector("input[name='tipoPrecioNewService']");
    let visualizadortipoPrecio = document.querySelector('.styles_slotLeft_k29NgTipoPrecio');
    let inputPrecio = document.querySelector("input[name='precioServicio']");
    let inputIdServicio = document.querySelector("input[name='id_serviceModify']");
    if(divColor){
        $(divColor).empty();
        $(divColor).append(`
            <div data-color="${serviceData.serviceColor}" class="index_colorPicker_dCcsj" style="background-color: ${serviceData.serviceColor};"></div>
        `);
        inputColor.value = serviceData.serviceColor;
        inputNombreServicio.value = serviceData.serviceName;
        // inputNombreServicio.dispatchEvent(new Event('input'));
        // divColor.style.backgroundColor = serviceData.serviceColor; horaNewService

        visualizadorCategroria.textContent = serviceData.serviceCategoria;

        //asignamos el valor al input hidden categoria
        categoriaSeleccionadaNewServiceInputModify.value = serviceData.serviceCategoria;
        categoriaSeleccionadaNewServiceInputModify.dispatchEvent(new Event('input'));
        textAreaDescripcionService.value = serviceData.serviceDescription;
        inputHoraServicio.value = serviceData.serviceHora;
        visualizadorHora.textContent = serviceData.serviceHora;
        inputMinutoServicio.value = serviceData.serviceMinuto;
        visualizadorMinutos.textContent = serviceData.serviceMinuto;
        inputTipoPrecio.value = serviceData.serviceTipoPre;
        visualizadortipoPrecio.textContent = serviceData.serviceTipoPre;
        inputPrecio.value = serviceData.servicePrecio;
        inputIdServicio.value = serviceData.serviceId;
        // Limpiar pasos previos
        let pasosContainer = document.getElementById('pasosContainer');
        pasosContainer.innerHTML = ''; // borrar todos los pasos actuales

        if (serviceData.servicePasos) {
        let pasosArray = serviceData.servicePasos.split('\n');

        pasosArray.forEach((paso, index) => {
            let pasoDiv = document.createElement('div');
            pasoDiv.className = 'paso-input mb-2 d-flex align-items-center';

            pasoDiv.style.flexWrap = 'wrap';

            pasoDiv.innerHTML = `
            <div class="form-groupInput" style="margin-right: 5px;margin-bottom: 0px !important;width: calc(100% - 2rem);" >
                <input type="text" placeholder=" " name="pasos[]" class="gualazonF inputsNewService" required value="${paso}" />
                <label class="styles_label_hleTI">Paso</label>
            </div>
            <button type="button" onclick="eliminarPaso(this)" class="text-white btn btn-danger btn-sm">X</button>
            `;

            pasosContainer.appendChild(pasoDiv);
        });
        } else {
        // Si no hay pasos, dejar uno vacío
       let pasoDiv = document.createElement('div');
            pasoDiv.className = 'paso-input mb-2 d-flex align-items-center';

            pasoDiv.style.flexWrap = 'wrap';

        pasoDiv.innerHTML = `
            <div class="form-groupInput" style="margin-right: 5px;margin-bottom: 0px !important;width: calc(100% - 2rem);" >
            <input type="text" placeholder=" " name="pasos[]" class="gualazonF inputsNewService" required />
            <label class="styles_label_hleTI">Paso</label>
            </div>
        `;
        pasosContainer.appendChild(pasoDiv);
        }
    }
}
//AÑADE AL INPUT ACCION QUE ES SI CREAR BORRAR O MODIFICAR
function setAction(action) {
    let loader = document.querySelector('#loaderSperaAdministratorAll');
    loader.classList.remove('d-none');
    // Establece el valor de la acción según el botón que se presionó
    document.getElementById('actionType').value = action;
}

//CLIC EN CREAR SERVICIO SIN RECARGAR PÁGINA
$('#formCreateNewService').on('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Creamos un objeto FormData para enviar los datos, incluyendo archivos
    var formData = new FormData(this);
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    // Agregamos el CSRF token (aunque lo haya en el formulario, para asegurarnos de que se incluya)
    formData.append('_token', csrfToken);

    $.ajax({
    url: $(this).attr('action'), // Usamos la acción del formulario
    type: $(this).attr('method'), // Usamos el método del formulario

    data: formData, // Enviamos los datos del formulario
    processData: false, // Evita que jQuery procese los datos
    contentType: false, // Evita que jQuery establezca el Content-Type (important para multipart)
    success: function(response) {
        showAllServicesPlantilla();

    },
    error: function(xhr, status, error) {
        // Manejo de errores
        console.log('Error: ' + error);
    }
    });
});

function showAllServicesPlantilla(action = null){
    fetch('show-all-services')
    .then(response => response.text())
    .then(data => {
        let mensaje='';
        document.getElementById('show_all_service').innerHTML = data;
        modificarServicioClicarFlecha();
        showDiv('show_all_service');
        cambiarURL('admin/dashboard/Configuracion_showAllServices');
        let stylos = 'position: absolute;right: 5rem;top: 16px;z-index: 9;';
        if(action === null){
            if(document.getElementById('actionType').value === 'create'){
                mensaje= 'Nuevo servicio creado con éxito';
            }else if(document.getElementById('actionType').value === 'modify'){
                mensaje= 'Servicio modificado con éxito';
            }else if(document.getElementById('actionType').value === 'delete'){
                mensaje ='Servicio eliminado con éxito';
            }
        }else{
            if(action === 'modificarCategoria'){
                mensaje = 'Categoria modificada con éxito';
            }else if(action === 'eliminarCategoria'){
                mensaje = 'Categoria eliminada con éxito';
            }
        }

        insertMessageResolAction(mensaje, '#Configuracion_administrator', stylos, 'ok');
        initIsotope('.isotope-container', '.isotope-item', '*', '.isotope-filters [data-filter]', 'data-filter');//servicios y combos de servicios
        showModalAddservice();
        clicFlechaAtrasServiciosyCombos();
        let loader = document.querySelector('#loaderSperaAdministratorAll');
        loader.classList.add('d-none');
    })
    .catch(error => console.error('Error al cargar los servicios:', error));
}

//MODIFICA LOS BOTONES PARA CREAR SERVICIO O MODIFICAR SERVICIO
function changeBotonModifyCreateService(botonHide_class, botonShow_class){
    // console.log(botonHide_class, "d-none", botonShow_class, "mostrar");

    let botonOcultar = document.querySelector(botonHide_class);
    if(botonOcultar){
        botonOcultar.classList.add('d-none');
    }
    let botonMostrar = document.querySelector(botonShow_class);
    if (botonMostrar) {
        botonMostrar.classList.remove('d-none');
    }
}
//MODIFICA EL TÍTULO DE CREAR SERVICIO O MODIFICAR SERVICIO
function changeTitleModifyCreateService(titleHide_class, titleShow_class){
    let tituloOcultar = document.querySelector(titleHide_class);
    if(tituloOcultar){
        tituloOcultar.classList.add('d-none');
    }
    let tituloMostrar = document.querySelector(titleShow_class);
    if (tituloMostrar) {
        tituloMostrar.classList.remove('d-none');
    }
}
//funcion abre cierra modal boton negro añadir servicio
function abrirCerrarModalAniadirServico(){
    // console.log("abrirCerrarModal");
    let botonAddService;
    let botonnegro;
    let modalnewServiceCategCombo= document.querySelector('.add-button_dropdown_ZXg6G');
    botonAddService = document.querySelector('.add-button_overlay_nOmaV');
    botonnegro = document.querySelector('.addService');
    // Alternamos la clase para mostrar u ocultar el modal
    botonAddService.classList.toggle('add-button_open_oqadv');
    modalnewServiceCategCombo.classList.toggle('d-none');
    // Alternamos la clase del botón para cambiar su apariencia
    botonnegro.classList.toggle('add-button_addButtonClose_MWq6H');
}

//ABRIR MODAL MUESTRA Y OCULTA EL MODAL PARA CREAR NUEVO SERVICIO, COMBO DENTRO PANTALLA 3
function showModalAddservice(){
let enlaceModal = document.querySelector('.addService');
    if(enlaceModal){
        $(enlaceModal).off('click').on('click', function(event) {
             event.preventDefault();
             abrirCerrarModalAniadirServico()
            //  console.log("clic en boton negro");
        });
    }
}


//funcion modificar categoria
function modifyCategory(categoria_id){
    // console.log(categoria_id);


}
//PASAR DATOS DEL BOTÓN AL OFFCANBA PARA RESERVAR SERVICIO

    //PONE UN CHECK CUANDO EL USUARIO CLICA EN EL SPAN QUE HAY DENTRO DEL MODAL SELECCIONAR COLOR
    // function ponerCheckColor(spanCheck) {
    //     console.log(spanCheck);

    //     let contenedorColores = document.querySelector('.contenedorColores');
    //     // Seleccionamos los spans que contienen los colores
    //     let colorSpans = document.querySelectorAll('.color-picker-modal_serviceColorTile_mt88Y');

    //     // Eliminar cualquier ícono de check existente de todos los spans
    //     colorSpans.forEach(function (span) {
    //         let existingIcon = span.querySelector('.icon-tick');
    //         if (existingIcon) {
    //             existingIcon.remove();  // Eliminamos el ícono si existe
    //         }
    //     });

    //     // Añadir el ícono de check solo al span clickeado (spanCheck)
    //     spanCheck.innerHTML += `
    //         <span class="color-picker-modal_tickIcon_Zazmf b-icon icon-tick iconFont" style="font-size: 40px;"></span>
    //     `;

    //     // Ocultar el contenedor de colores
    //     if (contenedorColores) {
    //         contenedorColores.style.display = 'none';  // Ocultar el contenedor
    //     }
    // }


    //comprueba si el desplegable empleados esta abierto
    //recibe la clase del desplegable y devuelve true si está cerrado y flase si está abierto
    function comprobarDesplegableEmpleadoAbierto(className) {
        // Seleccionamos el primer elemento con la clase proporcionada
        const element = document.querySelector(`.${className}`);

        if (!element) {
            console.error("Elemento no encontrado");
            return false;
        }

        // Obtenemos los estilos computados del elemento
        const style = window.getComputedStyle(element);

        // Comprobamos si el valor de display es 'none'
        return style.display === 'none';
    }

function abrirModalCategorias(contenedor){
    //para cerrar el modal empleados al clicar en las horas
    if (contenedor.trim() == '.contenedorHorasInicioAddCalendar' || contenedor.trim() == '.contenedorHorasFinAddCalendar') {
        !comprobarDesplegableEmpleadoAbierto('contenedorEmpleadosInicioCalendarAdd') ?  $('.contenedorEmpleadosInicioCalendarAdd').slideToggle():null;
        // $('.contenedorEmpleadosInicioCalendarAdd').slideToggle();
    }
    if (contenedor.trim() == '.contenedorHorasInicioCalendar' || contenedor.trim() == '.contenedorHorasFinCalendar') {
        !comprobarDesplegableEmpleadoAbierto('contenedorEmpleadosInicioCalendar') ?  $('.contenedorEmpleadosInicioCalendar').slideToggle():null;
        // $('.contenedorEmpleadosInicioCalendar').slideToggle();
    }
    if (contenedor.trim() == '.contenedorHorasInicio' || contenedor.trim() == '.contenedorHorasFin') {
        !comprobarDesplegableEmpleadoAbierto('contenedorEmpleadosInicio') ?  $('.contenedorEmpleadosInicio').slideToggle():null;
        // $('.contenedorEmpleadosInicio').slideToggle();
    }
    if (contenedor.trim() == '.contenedorHorasInicioAdd' || contenedor.trim() == '.contenedorHorasFinAdd') {
        !comprobarDesplegableEmpleadoAbierto('contenedorEmpleados') ?  $('.contenedorEmpleados').slideToggle():null;

        // $('.contenedorEmpleados').slideToggle();
    }
    //--------------------
    $(contenedor).slideToggle();
    categoriaSeleccionadaNewService();
}


function cerrarModalCategorias(modal) {
    // console.log('Cerrar categorías');
    $(modal).slideUp(); // Cierra el modal si está abierto
}

function xcerrarModal(){
    let contenedorColores  = document.querySelector('.contenedorColores');
    contenedorColores.style.display = 'none';

}




document.addEventListener('DOMContentLoaded', function() {


// Get a reference to the file input element
const inputElement = document.querySelector('#imagesCreateNewService');

// Create a FilePond instance
const pond = FilePond.create(inputElement);
FilePond.setOptions({
    labelIdle: 'Arrastra y suelta tus imágenes o <span class="filepond--label-action">Explorar</span>',
    server: {
        process: 'upload',
        revert: 'delete',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value, // Token CSRF
        },
        // restore: './restore/',
        // load: './load/',
        // fetch: './fetch/',
    },
});
});
    // const inputElementUpImage = document.querySelector('#imageService');
    // if(inputElementUpImage){
    //     $(inputElementUpImage).off('click').on('click', function(event) {
    //         event.preventDefault();
    //         inputElementUpImage = inputElementUpImage.cloneNode(true);
    //     });
    // }


// //envio de imágenes
// document.addEventListener('DOMContentLoaded', function() {
//     // Registrar los plugins que quieras utilizar
//     FilePond.registerPlugin(
//         FilePondPluginImagePreview,
//         FilePondPluginFileValidateSize,
//         FilePondPluginFileValidateType
//     );
//     // Seleccionar el input de archivo y convertirlo en un FilePond instance
//     const inputElement = document.getElementById('imagesCreateNewService');
//     let rutaCrearNewService = "servicio/storeImage";
//     const pond = FilePond.create(inputElement, {
//         allowMultiple: true, // Permitir múltiples archivos
//         maxFiles: 10, // Máximo número de archivos
//         maxFileSize: '3MB', // Tamaño máximo por archivo
//         acceptedFileTypes: ['image/*'], // Solo aceptar imágenes
//         imagePreviewHeight: 150, // Altura de la previsualización
//         labelIdle: 'Arrastra y suelta tus imágenes o <span class="filepond--label-action">Explorar</span>',

//         server: {
//             process: {
//                 url: rutaCrearNewService,  // Ruta para subir las imágenes
//                 method: 'POST',
//                 withCredentials: false,
//                 headers: {
//                     'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value, // Token CSRF
//                 },
//                 onload: (response) => {
//                     const parsedResponse = JSON.parse(response);
//                     console.log('Archivo subido correctamente:', parsedResponse);
//                     return parsedResponse.filename; // Devolver el nombre del archivo subido como uniqueFileId
//                 },
//                 onerror: (response) => {
//                     console.error('Error al subir el archivo:', response);
//                 },
//                 ondata: (formData) => {
//                     return formData; // Devuelve el FormData para ser enviado al servidor
//                 }
//             },
//             revert: (uniqueFileId, load, error) => {
//                 console.log('Eliminando archivo con ID:', uniqueFileId);
//                 // Realizar solicitud para eliminar el archivo del servidor
//                 fetch(`delete-image/${uniqueFileId}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value, // Token CSRF
//                     },
//                 })
//                 .then((response) => {
//                     if (response.ok) {
//                         load(); // Llamar a load() para informar que la imagen ha sido eliminada
//                     } else {
//                         error('No se pudo eliminar el archivo'); // Mostrar error si la eliminación falla
//                     }
//                 })
//                 .catch((err) => {
//                     console.error('Error al eliminar el archivo:', err);
//                     error('No se pudo eliminar el archivo'); // Manejo de error
//                 });
//             }
//         }
//     });

//     // Obtener los archivos seleccionados más tarde si es necesario
//     pond.on('processfile', (error, file) => {
//         if (error) {
//             console.error('Error al procesar el archivo:', error);
//             return;
//         }
//         console.log('Archivo procesado:', file);
//     });
// });








// document.addEventListener('livewire:load', function () {
//     attachClickEventToLinks();
// });

// Livewire.hook('message.processed', (message, component) => {
//     attachClickEventToLinks();

// });

















// // Seleccionamos todos los enlaces dentro de la clase configuracionNegocio
// var enlaces = document.querySelectorAll('.configuracionNegocio a');

// // Añadimos un evento click a cada enlace
// enlaces.forEach(function(enlace) {
//     enlace.addEventListener('click', function(event) {
//         console.log("clic en configuración negocio");
//         event.preventDefault(); // Evitamos la recarga de la página

//         // Obtenemos la URL que se encuentra en data-url
//         var url = enlace.getAttribute('data-url');
//         var seeUrl = enlace.getAttribute('data-changeurl');

//         // Realizamos la solicitud fetch
//         fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error al cargar la página');
//             }
//             return response.text(); // Obtenemos el HTML como texto
//         })
//         .then(html => {
//             // Reemplazamos el contenido dinámico en el contenedor
//             document.getElementById('Configuracion_administrator').innerHTML = html;

//             // Llamamos a la función para cambiar la URL si es necesario
//             cambiarURL(seeUrl);
//             asignarEventoOnClickAEnlaceOpenServices_b();
//             // Aquí asignamos el evento click al span cargado dinámicamente
//             asignarEventoSpan();
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la petición:', error);
//         });
//     });
// });
function clicFlechaAtrasServiciosyCombos(){
    var spanGoBack3 = document.querySelector('.spanGotobackServicesCombos'); // Seleccionamos el span spanGotobackConfigureServices
    if (spanGoBack3) {
        spanGoBack3.onclick = function(){
            showDiv('configuration_service');
            cambiarURL('admin/dashboard/Configuracion_administrator');
        };
    }
}

clicFlechaAtrasServiciosyCombos();

var spanGoBack2 = document.querySelectorAll('.spanGotobackConfigureServices'); // Seleccionamos el span spanGotobackConfigureServices
if (spanGoBack2) {
    spanGoBack2.forEach(function (span) {
        span.addEventListener('click', function(event){
            event.preventDefault();
            showDiv('configuration_bussines');
        cambiarURL('admin/dashboard/Configuracion_administrator');

        });
    });
}

//flecha atras configuracion reserva
function clicFlechaAtrasConfiguracionReseva(){
    var spanGoBack = document.querySelector('.configuracionReservaAtras');
    if (spanGoBack) {
        spanGoBack.onclick = function(){
            showDiv('opciones_avanzadas1');
            // cambiarURL('admin/dashboard/Configuracion_administrator');
        };
    }
}
clicFlechaAtrasConfiguracionReseva();
// // Función para asignar el evento al span dinámico
// function asignarEventoSpan() {
//     var spanGoBack = document.querySelector('.spanGotoback'); // Seleccionamos el span
//     if (spanGoBack) {
//         spanGoBack.onclick = function() {
//             // Acción cuando se hace clic en el span
//             console.log("Click en el span de volver atrás!");

//             // Obtenemos la URL del atributo data-url
//             var backUrl = spanGoBack.getAttribute('data-url');
//             var backChangeUrl = spanGoBack.getAttribute('data-changeurl');

//             // Realizamos otra petición fetch para la navegación inversa (go back)
//             fetch(backUrl)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error al cargar la página');
//                 }
//                 return response.text();
//             })
//             .then(html => {
//                 // Reemplazamos el contenido dinámico
//                 document.getElementById('Configuracion_administrator').innerHTML = html;

//                 // Cambiamos nuevamente la URL si es necesario
//                 cambiarURL(backChangeUrl);
//                 asignarEventoOnClickAEnlaceOpenServices_b();
//                 asignarEventoOnClickAEnlaces();
//                 // Volvemos a asignar el evento al span que fue reemplazado
//                 asignarEventoSpan();
//             })
//             .catch(error => {
//                 console.error('Error al volver atrás:', error);
//             });
//         };
//     }
// }

// function asignarEventoOnClickAEnlaces() {
//     // Seleccionamos todos los enlaces dentro de la clase configuracionNegocio
//     var enlaces = document.querySelectorAll('.configuracionNegocio a');
//     if(enlaces){
//         // Recorremos cada enlace y le asignamos el evento click
//         enlaces.forEach(function(enlace) {
//             enlace.onclick = function(event) {
//                 event.preventDefault(); // Evitamos que el enlace realice la acción por defecto

//                 // Aquí puedes poner la acción que deseas realizar cuando se hace clic
//                 console.log("Has hecho clic en un enlace dentro de configuracionNegocio");

//                 var url = enlace.getAttribute('data-url');
//                 var changeUrl = enlace.getAttribute('data-changeurl');

//                 // Ejemplo de petición fetch si lo necesitas
//                 fetch(url)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Error al cargar la página');
//                     }
//                     return response.text();
//                 })
//                 .then(html => {
//                     // Aquí puedes manejar la respuesta del fetch (por ejemplo, actualizar contenido dinámico)
//                     document.getElementById('Configuracion_administrator').innerHTML = html;
//                     cambiarURL(changeUrl);
//                     asignarEventoOnClickAEnlaceOpenServices_b();
//                     asignarEventoOnClickAEnlaces();
//                     asignarEventoSpan();
//                 })
//                 .catch(error => {
//                     console.error('Error al realizar la solicitud:', error);
//                 });
//             };
//         });
//     }

// }

// function asignarEventoOnClickAEnlaceOpenServices_b() {
//     // Seleccionamos todos los enlaces dentro de la clase configuracionNegocio
//     var enlaces = document.querySelectorAll('.openConfigServicios_b a');
//     if(enlaces){
//         // Recorremos cada enlace y le asignamos el evento click
//         enlaces.forEach(function(enlace) {
//             enlace.onclick = function(event) {
//                 event.preventDefault(); // Evitamos que el enlace realice la acción por defecto

//                 // Aquí puedes poner la acción que deseas realizar cuando se hace clic
//                 console.log("--------------------------------------");
//                 // $('.configurar-negocio-empty').empty();
//                 var url = enlace.getAttribute('data-url');
//                 var changeUrl = enlace.getAttribute('data-changeurl');
//                 // document.querySelector('configurar_servicios-open').classList.remove('d-none');
//                 //Ejemplo de petición fetch si lo necesitas
//                 fetch(url)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Error al cargar la página');
//                     }
//                     return response.text();
//                 })
//                 .then(html => {
//                     // Aquí puedes manejar la respuesta del fetch (por ejemplo, actualizar contenido dinámico)
//                     document.getElementById('Configuracion_administrator').innerHTML = html;
//                     cambiarURL(changeUrl);
//                     // asignarEventoOnClickIconAddService();
//                     asignarEventoOnClickImgChangeCategoryName();
//                     asignarEventoOnClickAEnlaceOpenServices_b()
//                     asignarEventoOnClickAEnlaces();
//                     asignarEventoSpan();
//                 })
//                 .catch(error => {
//                     console.error('Error al realizar la solicitud:', error);
//                 });
//             };
//         });
//     }
// }

// function asignarEventoOnClickImgChangeCategoryName() {
//     //modal crear servicio, categoria, combo
//     var modalEnlcesCresar = document.querySelectorAll('.add-button_button_U2OQn');
//     if(modalEnlcesCresar){
//         modalEnlcesCresar.forEach(function(enlaceModal){
//             enlaceModal.onclick = function(event){
//                 console.log("crear servicio");

//                 event.preventDefault();
//                 var dataCreate = enlaceModal.getAttribute('data-create');
//                 console.log(dataCreate," datacreate");

//                 if(dataCreate === 'add-service-btn'){
//                     Livewire.emit('loadCreateNewService');
//                 }
//             // console.log("clic dentro del modal", dataUrl);
//             }
//         });
//     }
//     //--------------------------------------------


//     // Seleccionamos todos los enlaces dentro de la clase configuracionNegocio
//     var enlaces = document.querySelectorAll('img.modifyNameCategory');
//     if(enlaces){
//         // Recorremos cada enlace y le asignamos el evento click
//         enlaces.forEach(function(enlace) {
//             enlace.onclick = function(event) {
//                 event.preventDefault(); // Evitamos que el enlace realice la acción por defecto

//                 // Aquí puedes poner la acción que deseas realizar cuando se hace clic
//                 console.log("--------------------hola desde imagen categoria------------------");
//                 var modalElement = new bootstrap.Modal(document.getElementById('modificarCategoriaModal'));
//                 modalElement.show();

//             };
//         });
//     }
// }
// function asignarEventoOnClickIconAddService() {
//     // Seleccionamos todos los enlaces dentro de la clase configuracionNegocio
//     var enlace = document.querySelector('.addService');
//     if(enlace){
//         enlace.onclick = function() {
//             console.log("hola desde el botón");
//         }
//     }
// }

// function gotoback(span){
//     console.log(span, "this-------");
//     // event.preventDefault(); // Evitamos la recarga de la página

//     // Obtenemos la URL que se encuentra en data-url
//     var url = span.getAttribute('data-url');
//     console.log(url, "url dentro de back");

//     var seeUrl = span.getAttribute('data-changeurl')
//     fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error al cargar la página');
//         }
//         console.log(response.text);

//         return response.text(); // Obtenemos el HTML como texto
//     })
//     .then(html => {
//         // Reemplazamos el contenido dinámico en el contenedor   goToBack
//         document.getElementById('Configuracion_administrator').innerHTML = html;
//         cambiarURL(seeUrl)
//     })
//     .catch(error => {
//         console.error('Hubo un problema con la petición:', error);
//     });
// }

// var goToBack = document.querySelectorAll('.spanGotoback');

//     // Añadimos un evento click a cada enlace
//     goToBack.forEach(function(enlace) {
//         enlace.addEventListener('click', function(event) {
//             console.log("estas dentro de gotobalck");

//             event.preventDefault(); // Evitamos la recarga de la página

//             // Obtenemos la URL que se encuentra en data-url
//             var url = enlace.getAttribute('data-url');
//             console.log(url, "url dentro de back");

//             var seeUrl = enlace.getAttribute('data-changeurl')
//             fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Error al cargar la página');
//                 }
//                 return response.text(); // Obtenemos el HTML como texto
//             })
//             .then(html => {
//                 // Reemplazamos el contenido dinámico en el contenedor   goToBack
//                 document.getElementById('Configuracion_administrator').innerHTML = html;
//                 cambiarURL(seeUrl)
//             })
//             .catch(error => {
//                 console.error('Hubo un problema con la petición:', error);
//             });
//         });
function prueba125(){
    console.log("prueba 125");
}
function agregarPaso() {
  const container = document.getElementById('pasosContainer');

  const nuevoPaso = document.createElement('div');
  nuevoPaso.className = 'paso-input mb-2';
  nuevoPaso.innerHTML = `
    <div class="d-flex align-items-center" style="flex-wrap: wrap;">
       <div class="form-groupInput" style="margin-right: 5px;margin-bottom: 0px !important;width: calc(100% - 2rem);" >
            <input type="text" placeholder=" " name="pasos[]"
                class="gualazonF inputsNewService" id="pasos"
                required
                onblur="verificarInput('pasos')"/>
            <label for="pasos" class="styles_label_hleTI">Paso</label>
        </div>
      <button type="button" onclick="eliminarPaso(this)" class="text-white btn btn-danger btn-sm">X</button>

    </div>
  `;

  container.appendChild(nuevoPaso);
}

function eliminarPaso(boton) {
  const pasoDiv = boton.closest('.paso-input');
  pasoDiv.remove();
}
//     });
