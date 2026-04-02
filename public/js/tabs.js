var tabLinks1 = document.querySelectorAll(".tablinks");
var tabLinks2 = document.querySelectorAll(".tablinks2");
var tabLinks = [...tabLinks1, ...tabLinks2];

var tabContent = document.querySelectorAll(".tabcontent");

var tabLinksAdministrator1 = document.querySelectorAll(
    ".tablinksAdministrator",
);
var tabLinksAdministrator = [...tabLinksAdministrator1, ...tabLinks2];
var tabContentAdministrator = document.querySelectorAll(
    ".tabcontentAdministrator",
);
// var initUrlImage= 'http://localhost/laravel/salon-manicura-git/';
var initUrlImage = "http://salonnail.kesug.com/";
tabLinksAdministrator.forEach(function (el) {
    el.addEventListener("click", openTabsAdministrator);
});

tabLinks.forEach(function (el) {
    el.addEventListener("click", openTabs);
});
function openTabsAdministrator(el) {
    // console.log(el, "clic en tab");
    initIsotope();
    let btnTarget = el.currentTarget;
    //    console.log(btnTarget, "btn tarjet");

    let nameTab = btnTarget.dataset.pannel;
    //    console.log(nameTab, "nameTab");

    tabContentAdministrator.forEach(function (el) {
        el.classList.remove("active");
    });
    tabLinksAdministrator.forEach(function (el) {
        el.classList.remove("active");
    });
    document.querySelector("#" + nameTab).classList.add("active");
    btnTarget.classList.add("active");
    cambiarURL("admin/dashboard/" + nameTab);
    let tabresponsive = document.getElementById("tabsResponsiveid");
    if (tabresponsive) {
        // console.log('siiiii');
        tabresponsive.style.width = "0px";
    } else {
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
    const botones = document.querySelectorAll(".citasTerProx");
    botones.forEach(function (boton) {
        boton.classList.remove("--selected");
    });
    let botonSelect = document.getElementById(idBoton);
    botonSelect.classList.add("--selected");
    if (idBoton === "botonProximas") {
        showDivPagos("citasProcimasContainer");
    } else {
        showDivPagos("citasTerminadasContainer");
    }
}

//ESCONDER TABUSER PARA QUE NO SE VEA MIENTRAS SE CARGA LA PÁGINA
document.addEventListener("DOMContentLoaded", function () {
    // Ocultar el div al inicio
    const userAdministrator = document.getElementById("User_administrator");
    if (userAdministrator) {
        userAdministrator.style.opacity = "0";

        // Mostrar el div cuando la página está completamente cargada
        window.addEventListener("load", function () {
            userAdministrator.style.opacity = "1";
        });
    }
});

function openTabs(el) {
    // console.log("clic en tab");
    initIsotope();
    let btnTarget = el.currentTarget;
    let nameTab = btnTarget.dataset.pannel;
    tabContent.forEach(function (el) {
        el.classList.remove("active");
    });
    tabLinks.forEach(function (el) {
        el.classList.remove("active");
    });
    document.querySelector("#" + nameTab).classList.add("active");
    btnTarget.classList.add("active");
    cambiarURL("panel/" + nameTab);
    let tabresponsive = document.getElementById("tabsResponsiveid");
    if (tabresponsive) {
        // console.log('siiiii');
        tabresponsive.style.width = "0px";
    } else {
        // console.log('no existe');
    }
    quitarInputsSeleccionados();
    //    resetDropselecCategoria();
    //    resetCategoriaGrupal();
    // console.log("tabssssss");
}

function UpProduct(content, tab_button, url) {
    // console.log("ejecución UpProduct");
    // console.log( tab_button,"parametros");
    //quitamos active de boton
    tabLinks.forEach(function (el) {
        el.classList.remove("active");
    });
    //quitamos active de contenido
    tabContent.forEach(function (el) {
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

    let tabresponsive = document.getElementById("tabsResponsiveid");
    if (tabresponsive) {
        //  console.log('siiiii');
        tabresponsive.style.width = "0px";
    } else {
        //  console.log('no existe');
    }

    cambiarURL(url);
}

function UpProductAdministrator(content, tab_button, url) {
    // console.log("ejecución administrator");
    // console.log(content, tabContent, url, "parametros");

    // if (tab_button === 'tab_administrator_citas') {
    //     initializeCalendar();
    // }
    tabContentAdministrator.forEach(function (el) {
        el.classList.remove("active");
    });

    tabLinksAdministrator.forEach(function (el) {
        el.classList.remove("active");
    });
    document.getElementById(content).classList.add("active");
    document.getElementById(tab_button).classList.add("active");
    if (url.includes("createService")) {
        showDiv("createNew_service");
    } else if (url.includes("showAllServices")) {
        showDiv("show_all_service");
    }
    let tabresponsive = document.getElementById("tabsResponsiveid");
    if (tabresponsive) {
        // console.log('siiiii');
        tabresponsive.style.width = "0px";
    } else {
        // console.log('no existe');
    }
    cambiarURL(url);
}

// //CONFIGURACIÓN NEGOCIO PRIMERA PANTALLA LLAMAMOS A CARGAR A LA SEGUNDA
let divConfiguration_bussines = document.getElementById(
    "configuration_bussines",
);
let divConfiguration_service = document.getElementById("configuration_service");
let divShowAll_service = document.getElementById("show_all_service");
let divCreateNew_service = document.getElementById("createNew_service");

//PRIMERA PANTALLA ABRIMOS SEGUNDA
let abrirConfigServicios = document.querySelectorAll(".configuracionNegocio a");
if (abrirConfigServicios) {
    abrirConfigServicios.forEach(function (enlaceAbriconfigServicios) {
        $(enlaceAbriconfigServicios)
            .off("click")
            .on("click", function (event) {
                event.preventDefault();

                let dataUrl =
                    enlaceAbriconfigServicios.getAttribute("data-url");
                //    console.log(dataUrl, "dataUrl");

                if (dataUrl === "config.services") {
                    showDiv("configuration_service");
                } else if (dataUrl === "advant.options") {
                    showDiv("opciones_avanzadas1");
                }
            });
    });
}
function showPrincipalPageConfig() {
    showDiv("configuration_bussines");
}

//FUNCIÓN QUE RECARGA LA PÁGINA
function reloadPage() {
    window.location.reload();
}

//PRELOADER DE SOWALLSERVICES
const preloader2 = document.querySelector("#preloader2");
if (preloader2) {
    window.addEventListener("load", () => {
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
    $("#configuracionServicios55").on("click", function () {
        initIsotope(
            ".isotope-containerIndex",
            ".isotope-itemIndex",
            ".filter-manicura",
            ".isotope-filtersIndex [data-filterIndex]",
            "data-filterIndex",
        ); //servicios para
        initIsotope(
            ".isotope-containerIndex2",
            ".isotope-itemIndex2",
            ".filter-proximasIndex",
            ".isotope-filtersIndex [data-filterIndex]",
            "data-filterIndex",
        );
        initIsotope(
            ".isotope-container",
            ".isotope-item",
            "*",
            ".isotope-filters [data-filter]",
            "data-filter",
        ); //servicios y combos de servicios
    });
});
var $grid = "";
function initIsotope(container, item, filter, isotop_filter, data_filter) {
    // Inicializar Isotope
    // console.log("initIsotope");
    $grid = $(container).isotope({
        itemSelector: item, // Selector de los elementos filtrables
        layoutMode: "masonry",
        fitRows: {
            columnWidth: item,
        }, // Tipo de layout
        filter: filter,
    });

    $grid.isotope("layout");
    // Manejar el clic en los filtros
    $(isotop_filter).on("click", function () {
        // console.log("clic isotopeIndex");

        var filterValue = $(this).attr(data_filter);
        // console.log(filterValue, "filtervalue");

        $grid.isotope({ filter: filterValue });
        $(isotop_filter).removeClass("filter-active");
        $(this).addClass("filter-active");
        if (data_filter === "data-filter") {
            $(isotop_filter).removeClass("category_bgcolor--gray_PmXQU");
            $(this).addClass("category_bgcolor--gray_PmXQU");
        }
    });
}

//clic en la fleca modificar categoria
function ClicFlechaModificarCategoria() {
    $(".modifyCategory").on("click", function () {
        $grid.isotope("destroy");
        let nameCategori = $(this).data("name");
        let idCategori = $(this).data("index");

        // Asignar atributo con jquery asignar value con jquery
        $("#infoCategoriModify").attr("data-categori", idCategori);
        $("#infoCategoriModify").attr("data-categoriname", nameCategori);
        $("#nombreNuevaCategoriaModificada").val(nameCategori);
    });
}
ClicFlechaModificarCategoria();

//boton guardar modificar nombre categoria
let botonGurardarModificarCategoria = document.getElementById(
    "submitModifyCategory",
);
if (botonGurardarModificarCategoria) {
    $(botonGurardarModificarCategoria).on("click", function () {
        let newNameCategory = document.getElementById(
            "nombreNuevaCategoriaModificada",
        ).value;
        let id_categoriaModify = document
            .getElementById("infoCategoriModify")
            .getAttribute("data-categori");
        //peticion ajax modificar categoria
        let changeCategory = "change-category-name";
        let csrfToken = $('meta[name="csrf-token"]').attr("content");
        $.ajax({
            url: changeCategory,
            method: "POST",
            data: {
                _token: csrfToken,
                category_id: id_categoriaModify,
                category_name: newNameCategory,
            },
            success: function (response) {
                showAllServicesPlantilla("modificarCategoria");
            },
            error: function (xhr) {
                console.log("Error al actualizar el status", xhr);
            },
        });
    });
}
//boton guardar modificar nombre categoria
let botonEliminarCategoria = document.getElementById("submitDeleteCategory");
if (botonEliminarCategoria) {
    $(botonEliminarCategoria).on("click", function () {
        const confirmarEliminaCategoria = confirm(
            "¿Deseas eliminar esta categoria?",
        );
        if (confirmarEliminaCategoria) {
            let newNameCategory = document.getElementById(
                "nombreNuevaCategoriaModificada",
            ).value;
            let id_categoriaEliminar = document
                .getElementById("infoCategoriModify")
                .getAttribute("data-categori");
            //peticion ajax modificar categoria
            let deleteCategory = "delete-category";
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            $.ajax({
                url: deleteCategory,
                method: "POST",
                data: {
                    _token: csrfToken,
                    category_id: id_categoriaEliminar,
                    category_name: newNameCategory,
                },
                success: function (response) {
                    if (response.eliminado === true) {
                        $("#modifyCategoryModal").modal("hide");
                        showAllServicesPlantilla("eliminarCategoria");
                    }
                },
                error: function (xhr) {
                    console.log("Error al actualizar el status", xhr);
                },
            });
        } else {
            $("#modifyCategoryModal").modal("hide");
            alert("No se realizaron cambios.");
        }
    });
}

//funcion obtener todas categorias
function getAllCategories() {
    return new Promise(function (resolve, reject) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-allCategories";
        // Hacer una petición AJAX al servidor
        $.ajax({
            url: url, // Ruta que definimos en web.php
            method: "POST",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                const categorias = response.categorias;
                // console.log(categorias, "categorias todas");
                // Ejecutar el callback con los datos
                resolve(response.categorias);
            },
            error: function (xhr) {
                console.error("Error en la solicitud AJAX");
            },
        });
    });
}
//funcion obtener todos servicios activos
function getAllServices() {
    return new Promise(function (resolve, reject) {
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var url = "get-allServices";
        // Hacer una petición AJAX al servidor
        $.ajax({
            url: url, // Ruta que definimos en web.php
            method: "POST",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                const servicios = response.services;
                // console.log(servicios, "categorias todas");
                // Ejecutar el callback con los datos
                resolve(response.services);
            },
            error: function (xhr) {
                console.error("Error en la solicitud AJAX");
            },
        });
    });
}

//función que cambia el estado del input checkbox verde y rojo
if (document.querySelector("switch")) {
    document.querySelector("switch").addEventListener("click", function () {
        console.log("clic en toggle");

        this.checked = !this.checked; // Alterna el estado de "checked"
    });
}

//funcion para cargar las configuracines de base datos
function cargarConfiguraciones() {
    getConfiguracionReservas(function (configuraciones) {
        showDiv("opciones_avanzadas2");
        console.log(configuraciones, "configuraciones desde clic tarjeta");
        if (configuraciones[0].confirmacion_automatica === "si") {
            document.getElementById("toggle-3").checked = true;
        } else {
            document.getElementById("toggle-3").checked = false;
        }
        document.getElementById("uid-152-input_antelacionReserva").value =
            configuraciones[0].limite_tiempo_reserva;
        document.getElementById("uid-158-inputAntelacionReserva").value =
            configuraciones[0].antelacion_reserva;
        document.getElementById("uid-164-inputCambioFecha").value =
            configuraciones[0].cambio_fecha_reserva;

        //fondo y checket
        let divLimite_tiempo = document.querySelector(
            '.liTiempoAntelacion div[data-antelacion="' +
                configuraciones[0].limite_tiempo_reserva +
                '"]',
        );
        $(divLimite_tiempo).addClass(
            "index_--selected_oUDGp index_--highlighted__3J43",
        );

        let divAntelacion_reserva = document.querySelector(
            'div[data-antelacion="' +
                configuraciones[0].antelacion_reserva +
                '"]',
        );
        $(divAntelacion_reserva).addClass(
            "index_--selected_oUDGp index_--highlighted__3J43",
        );

        let divCambio_fecha = document.querySelector(
            'div[data-antelacion="' +
                configuraciones[0].cambio_fecha_reserva +
                '"]',
        );
        $(divCambio_fecha).addClass(
            "index_--selected_oUDGp index_--highlighted__3J43",
        );
    });
}

//funcion para cargar el historial de cambios de reservas
var historialGlobal = [];
function cargarHistorialCambiosReservas() {
    cargarSelectEmpleadas(); // 👈 cargar empleadas
    getHistorialCambiosReservas(function (cambiosReservas) {
        // para que se vea el nombre y no user id
        // console.log(cambiosReservas);

        historialGlobal = cambiosReservas.map((item) => {
            // console.log(item, "item");

            let cambios = item.cambios;

            item.user_id =
                cambios.antes?.user_id || cambios.despues?.user_id || null;
            item.cliente_nombre = "Cliente #" + item.user_id; // luego lo hacemos real

            item.empleada_id =
                cambios.antes?.empleada_id ||
                cambios.despues?.empleada_id ||
                null;
            item.empleada_nombre =
                empleadasMap[item.empleada_id] || "Sin empleada";
            return item;
        });
        //mostramos el div de las modificaciones
        showDiv("opciones_avanzadas3");
        // console.log(cambiosReservas, "Historial cambios reservas desde clic tarjeta");
        historialGlobal = cambiosReservas;
        // console.log(historialGlobal, cambiosReservas, "historial glovas modificaciones");

        renderHistorialTimeline(cambiosReservas);
    });
}

function cargarTodo(id_ofcanvasCerrar, visualizadornombre) {
    cargarHistorialCambiosReservas();
    $(`#${id_ofcanvasCerrar}`).offcanvas("hide");
    if (visualizadornombre.contain)
        document.querySelector(
            ".styles_slotLeft_k29NgClienteHistorialModificaReserva",
        ).textContent = "Selecciona cliente";
    //reseteamos los inputs menos el que mandamos
    resetInputsHistorialModificacionReservas(`.${visualizadornombre}`);
}

//función para el filtro de la fecha para filtrar historial modificaciones reservas.
document
    .getElementById("filtroFechaHistorial")
    .addEventListener("change", function () {
        const fecha = this.value; // yyyy-mm-dd
        if (!fecha) {
            renderHistorialTimeline(historialGlobal);
            return;
        }
        const filtrado = historialGlobal.filter((item) => {
            return item.created_at.startsWith(fecha);
        });

        renderHistorialTimeline(filtrado);
        //reseteo todos menos la fecha
        resetInputsHistorialModificacionReservas(
            document.getElementById("filtroFechaHistorial"),
        );
    });

//filtrar historial por empleada
function filtrarHistorialPorEmpleada(idEmpleado) {
    // Si no hay empleada (por seguridad)
    if (!idEmpleado) {
        renderHistorialTimeline(historialGlobal);
        return;
    }

    const filtrado = historialGlobal.filter(
        (item) => item.empleada_id == idEmpleado,
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

    const filtrado = historialGlobal.filter(
        (item) => item.user_id == idCliente,
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

    const filtrado = historialGlobal.filter(
        (item) => item.responsable_id == idCualquierUser,
    );

    renderHistorialTimeline(filtrado);
}

//función reseteo todos menos uno de inputs filtro historial
function resetInputsHistorialModificacionReservas(noResetear) {
    const elementos = [
        {
            el: document.getElementById("filtroFechaHistorial"),
            tipo: "fecha",
        },
        {
            el: document.querySelector(
                ".styles_slotLeft_k29NgClienteHistorialModificaReserva",
            ),
            tipo: "cliente",
            placeholder: "Selecciona cliente",
        },
        {
            el: document.querySelector(
                ".slotEmpleadoHistorialModificacionReservas",
            ),
            tipo: "empleado",
            placeholder: "Selecciona empleado",
        },
        {
            el: document.querySelector(
                ".styles_slotLeft_k29NgTodosUsersHistorialModificaReserva",
            ),
            tipo: "responsable",
            placeholder: "Selecciona responsable",
        },
    ];

    elementos.forEach(({ el, placeholder }) => {
        if (!el || el === noResetear) return;

        if ("value" in el) {
            el.value = "";
        } else {
            el.textContent = placeholder ?? "";
            el.dataset.id = "";
        }
    });
}

//función para cargar las empleadas en el array global
var empleadasMap = {}; // Global
function cargarSelectEmpleadas() {
    getAllEmpleados(function (empleados) {
        empleados.forEach((emp) => {
            empleadasMap[emp.id] = emp.nombre; // Guardamos para el historial es lo único que ses utiliza de esta funcion
        });
    });
}

function capitalizarPalabras(texto) {
    // console.log(texto, "TEXTO CAPITALIZAPALABRA");
    if (texto) {
        return texto
            .toLowerCase()
            .split(" ")
            .map(
                (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1),
            )
            .join(" ");
    }
}

//si no hay cambios muestra vista "no hay cambios"
function comprobarSiHayHistorialCambios(historial) {
    const tbody = document.getElementById("tablaHistorialReservasBody");
    tbody.innerHTML = "";
    if (historial.length === 0) {
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
}

//todas las posiciónes cumplen con la condición
function comprobarReservaFinalizada(data) {
    return data.every(
        (item) =>
            item.cambios?.antes?.status === "Finalizada" &&
            item.cambios?.despues?.status === "modificada",
    );
}

//con que sólo 1 cumpla la condición
// function esReservaFinalizadaFuncion(data){
//      return data.some(item =>
//         item.cambios?.antes?.status === 'Finalizada' &&
//         item.cambios?.despues?.status === 'modificada'
//     );
// }
function esReservaFinalizadaFuncion(data) {
    const ahora = new Date();

    return data.some((item) => {
        const condicion1 =
            item.cambios?.antes?.status === "Finalizada" &&
            item.cambios?.despues?.status === "modificada";

        const condicion2 =
            item.accion === "modificada" &&
            item.cambios?.antes?.date_time &&
            new Date(item.cambios.antes.date_time) < ahora;

        const condicion3 =
            item.accion === "creada" &&
            item.cambios?.despues?.date_time &&
            new Date(item.cambios.despues.date_time) < ahora;

        return condicion1 || condicion2 || condicion3;
    });
}

// reserva añadida en reserva finalizada comprueba si todas modificada o creada
// devuelve todas creadas
function obtenerAnidadidoReservaFinalizada(data = []) {
    if (!data.length) return [];

    // Comprobar que solo hay "creada" o "modificada"
    const soloCreadasYModificadas = data.every(
        (item) => item.accion === "creada" || item.accion === "modificada",
    );

    if (!soloCreadasYModificadas) return [];

    // Devolver todas las creadas
    return data
        .filter((item) => item.accion === "creada")
        .map((item) => ({
            reserva_id: item.reserva_id,
            servicio: item.reserva?.servicio,
        }));
}

//muestra la tabla de modificaciones
function htmlTablaModificacion(
    item,
    accionUtilizar,
    cambiosAgrupados,
    grupo,
    serviciosAgrupados,
    operacionesAgrupadas,
) {
    console.log(grupo, "GRUPO HTML TABLA");
    console.log(item, "ITEM HTML TABLA");
    let esReservaFinalizada = esReservaFinalizadaFuncion(grupo);
    let badgeReservaFinalizada = "";
    if (esReservaFinalizada) {
        badgeReservaFinalizada = `
            <span class="badge" style="background-color: #ebebeb;color: #767676;">
                finalizada
            </span>
        `;
    }

    serviciosAgrupados = obtenerServicios(grupo);
    let idUnicoBoton = grupo[0].operation_uuid;
    let color = "primary";
    if (accionUtilizar === "creada") color = "success";
    if (accionUtilizar === "eliminada") color = "danger";

    let cambios = item.cambios;
    let fecha = new Date(item.created_at).toLocaleString("es-ES");
    let responsableTipo = capitalizarPalabras(item.responsable_tipo);
    let inicialApellido = item.responsable.primer_apellido
        ?.trim()
        .charAt(0)
        .toUpperCase();

    let nombreResponsable = capitalizarPalabras(
        `${item.responsable.name} ${inicialApellido}`,
    );

    const tbody = document.getElementById("tablaHistorialReservasBody");
    tbody.innerHTML += `
        <tr style="background-color:white;">
            <td>${fecha}</td>
            <td>
                <span class="badge bg-${color} d-block">
                    ${accionUtilizar}
                </span>
                ${badgeReservaFinalizada}
            </td>

            <td>
                ${nombreResponsable}
            </td>
                <td>
                    <small class="text-muted">${responsableTipo}</small>
            </td>

            <td>${item.cliente_nombre ?? "-"}</td>

            <td>${item.empleada_nombre ?? "-"}</td>
                <td>
                <span class="badge bg-dark">
                    ${item.reserva_servicio_id ? "M-" : "S-"}${item.booking_group_id}
                </span>
            </td>
            <td>
                <button id="modalCambiosMHR${idUnicoBoton}" class="btn btn-sm btn-outline-dark" style="width: 100%;" onclick='abrirModalCambios(

                            ${JSON.stringify(cambios)},
                            "${accionUtilizar}",
                            ${JSON.stringify(item)},
                            ${JSON.stringify(cambiosAgrupados)},
                            ${JSON.stringify(grupo)},
                            ${JSON.stringify(serviciosAgrupados)},
                            ${JSON.stringify(operacionesAgrupadas)},
                        )'>
                    Ver
                </button>
            </td>
        </tr>
    `;
    console.log(serviciosAgrupados, "---SERVICIOS AGRUPADOS HTMLtABLA-------");
}

// function htmlServiciosHistorialModificacion(itemServicio, idReservaEliminada = null, servicioAniadido = null){
//     console.log( itemServicio, servicioAniadido, "SERVICIO AÑADIDO");

//     let cajaRoja = '';
//     if(idReservaEliminada && idReservaEliminada === itemServicio.reserva_id){
//         cajaRoja= `
//             <div class="px-2 py-1 bg-danger-subtle rounded">
//             ID ${idReservaEliminada}
//             </div>
//         `;
//     }
//     else{
//         cajaRoja = '';
//     }
//     return  `
//         <div class="services-wrapper_service_EEfjR mb-3" data-service="${itemServicio.servicio.id}" style="">
//             <div class="services_serviceWrapper_gug5x">
//                 <div class="services_serviceDecorator_ldMxA"
//                     style="border-color:${itemServicio.servicio.borderColor}">
//                 </div>
//                 <div class="services_serviceInfo_iDMQwAdd">
//                     <div class="services_serviceName_YhbTW services_size--16-sb_M5xdn txt--ellipsis">
//                         <span class="services_serviceName_YhbTW_span services_size--14_Mfwds">
//                             ${itemServicio.servicio.nombre}
//                         </span>
//                         <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
//                             ${itemServicio.servicio.duration}min
//                         </span>
//                     </div>
//                     <div class="services_servicePrice_wErzf services_size--16-sb_M5xdn">
//                         ${itemServicio.servicio.precio} €
//                         ${cajaRoja}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

function htmlServiciosHistorialModificacion(
    itemServicio,
    idsReservasEliminadas = [],
    serviciosAniadidos = [],
) {
    // console.log( itemServicio, serviciosAniadidos, "SERVICIO AÑADIDO CAJA VERDE");
    let itemIdReserva = itemServicio.id_reserva
        ? itemServicio.id_reserva
        : itemServicio.reserva_id;
    let cajaRoja = "";
    let cajaVerde = "";

    // 🔴 SERVICIO ELIMINADO
    const esEliminado =
        Array.isArray(idsReservasEliminadas) &&
        idsReservasEliminadas.includes(itemIdReserva);
    if (esEliminado) {
        cajaRoja = `
            <div class="px-2 py-1 bg-danger-subtle rounded mt-1">
                ID ${itemIdReserva}
            </div>
        `;
    }

    // 🟢 SERVICIO AÑADIDO
    const esAniadido =
        Array.isArray(serviciosAniadidos) &&
        serviciosAniadidos.some((s) => s.reserva_id === itemIdReserva);
    if (esAniadido) {
        cajaVerde = `
            <div class="px-2 py-1 bg-success-subtle rounded mt-1">
                ID ${itemIdReserva}
            </div>
        `;
    }

    return `
        <div class="services-wrapper_service_EEfjR mb-3"
             data-service="${itemServicio.servicio.id}">
            <div class="services_serviceWrapper_gug5x">
                <div class="services_serviceDecorator_ldMxA"
                    style="border-color:${itemServicio.servicio.borderColor}">
                </div>
                <div class="services_serviceInfo_iDMQwAdd">
                    <div class="services_serviceName_YhbTW services_size--16-sb_M5xdn txt--ellipsis">
                        <span class="services_serviceName_YhbTW_span services_size--14_Mfwds">
                            ${itemServicio.servicio.nombre}
                        </span>
                        <span class="services_serviceDuration_Zb36z duration services_size--14_Mfwds">
                            ${itemServicio.servicio.duration}min
                        </span>
                    </div>
                    <div class="services_servicePrice_wErzf services_size--16-sb_M5xdn">
                        ${itemServicio.servicio.precio} €
                        ${cajaRoja}
                        ${cajaVerde}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function htmlServiciosHistorialDespues(itemServicios) {}

//abre el modal para visualizar los cambios historial modificacion reservas

function abrirModalCambios(
    cambios,
    accionUtilizar,
    item,
    cambiosAgrupados,
    grupo,
    serviciosAgrupados,
    operacionesAgrupadas,
) {
    //esReservaCreada
    console.log(grupo, "GRUPO MODAL");
    // console.log(cambios, "CAMBIOS MODAL");
    console.log(item, "item MODAL");
    // console.log(operacionesAgrupadas, "operaciones agrupadas MODAL");
    // console.log(cambiosAgrupados, "CAMBIOS AGRUPADOS MODAL");
    // console.log(serviciosAgrupados, "SERVICIOS AGRUPADOS MODAL");

    let ids_reserva = serviciosAgrupados.map((servicio) => servicio.id_reserva);
    let esReservaCreada = todosAntesVacios(grupo);
    let hayEliminada = hayAlgunaEliminada(grupo);
    let ids_reservas_eliminadas = obtenerItemAccionEliminada(grupo); //item.accion = "eliminada"
    let servicioAniadido = seHaAnadidoServicio(grupo);
    let servicio_Aniadido2 = servicioAniadido2(grupo);
    let servicio_Aniadido3 = servicioAniadido3(grupo);
    let cambioFecha = obtenerReservasConCambioFecha(grupo);
    let idsReservasActivas = item.ids_reservas_activas || [];
    console.log(ids_reservas_eliminadas, "ids reservas eliminadas de grupo");

    let idsEliminados = [];
    let serviciosFiltradosSinEliminados = [];
    //para conseguir los servivios eliminados
    const ids_reservasArray = [...item.ids_reservas];
    let html = `<div class="list-group">`;
    let servicioshtml = "";
    let serviciosDespues = "";
    let servicioDespuesHtml = "";
    getServiciosByReservas(
        ids_reservasArray,
        function (serviciosRecibidos, reservasRecibidas) {
            console.log(serviciosRecibidos, "servicios recibidos MODAL");
            console.log(reservasRecibidas, "reservas recibidos MODAL");

            if (
                esReservaCreada &&
                !hayEliminada &&
                !servicioAniadido.length &&
                !servicio_Aniadido2
            ) {
                console.log("-----solo creado");
                cambios.despues.ids_reservas = ids_reserva.join(", ");
                html += `<strong class="text-black">SERVICIOS:</strong>`;
                serviciosAgrupados.forEach((itemServicio) => {
                    servicioshtml +=
                        htmlServiciosHistorialModificacion(itemServicio);
                });
                html += servicioshtml;

                //solo ELIMINADAS
            } else if (!esReservaCreada && hayEliminada) {
                console.log("-----hay eliminado");
                let ids_reservas_eliminadasMostrarHtml =
                    ids_reservas_eliminadas.join(", "); //muestra los ids separados por comas
                cambios.antes = {};

                //poner la condición de si tambien cambio fecha
                cambios.despues = {
                    // date_time: item.
                    delete: "ID reserva " + ids_reservas_eliminadasMostrarHtml,
                };
                html += `<strong class="text-black">ANTES:</strong>`;

                //añadimos el campo accion a cada reservaRecibida
                // obtenemos todos los ides con accion "eliminada"
                let idsAccionElimindaGrupo =
                    obtenerIdsAccionEliminadasGrupo(grupo);
                console.log(
                    idsAccionElimindaGrupo,
                    "ids con accion = eliminadas -----hay eliminado",
                );

                let reservasRecibidasConAnccion = marcarAccionReservas(
                    reservasRecibidas,
                    idsAccionElimindaGrupo,
                );
                console.log(
                    reservasRecibidasConAnccion,
                    "reserasRecibidas con accion-----hay eliminado",
                );

                idsEliminados = obtenerIdsReservasEliminadas(
                    reservasRecibidasConAnccion,
                    idsReservasActivas,
                );
                console.log(idsEliminados, "idsEliminados");
                console.log(idsReservasActivas, "ids reservas activas");

                serviciosFiltradosSinEliminados = filtrarServicios(
                    serviciosRecibidos,
                    idsEliminados,
                );

                serviciosFiltradosSinEliminados.forEach((itemServicio) => {
                    servicioshtml += htmlServiciosHistorialModificacion(
                        itemServicio,
                        ids_reservas_eliminadas,
                    );
                });
                html += servicioshtml;
                serviciosDespues = obtenerServiciosNoEliminados(
                    serviciosFiltradosSinEliminados,
                    ids_reservas_eliminadas,
                );
                // console.log(serviciosDespues, "servicios despues no eliminados");

                serviciosDespues.forEach((itemServicio) => {
                    servicioDespuesHtml +=
                        htmlServiciosHistorialModificacion(itemServicio);
                });
            } else if (
                !esReservaCreada &&
                !hayEliminada &&
                servicioAniadido.length
            ) {
                console.log("-----servicio añadido 1");

                cambios.despues.ids_reservas = ids_reserva.join(", ");
                html += `<strong class="text-black">SERVICIOS:</strong>`;
                serviciosAgrupados.forEach((itemServicio) => {
                    servicioshtml += htmlServiciosHistorialModificacion(
                        itemServicio,
                        [],
                        servicioAniadido,
                    );
                });
                cambios.antes = {};
                // ✅ Obtener todos los ids creados
                const idsCreados = servicioAniadido.map((s) => s.reserva_id);
                cambios.despues = {
                    aniadido: "ID reserva " + idsCreados.join(", "),
                };
                html += servicioshtml;
            } else if (esReservaCreada && !hayEliminada && servicio_Aniadido2) {
                console.log(servicio_Aniadido2, "servicio_añadido2");

                idsEliminados = obtenerIdsReservasEliminadas(
                    reservasRecibidas,
                    idsReservasActivas,
                );
                serviciosFiltrados = filtrarServicios(
                    serviciosRecibidos,
                    idsEliminados,
                );
                console.log("SERVICIO AÑADIDO 2");
                cambios.despues.ids_reservas = ids_reserva.join(", ");
                html += `<strong class="text-black">SERVICIOS:</strong>`;
                serviciosFiltrados.forEach((itemServicio) => {
                    servicioshtml += htmlServiciosHistorialModificacion(
                        itemServicio,
                        [],
                        servicio_Aniadido2,
                    );
                });
                cambios.antes = {};
                // ✅ Obtener todos los ids creados
                const idsCreados = servicio_Aniadido2.map((s) => s.reserva_id);
                // console.log(idsCreados, "IDS CREADOS");

                cambios.despues = {
                    aniadido: "ID reserva " + idsCreados.join(", "),
                };
                html += servicioshtml;
            } else if (servicio_Aniadido3 && !cambioFecha.length) {
                let idsCreados = "";
                let esReservaFinalizada = esReservaFinalizadaFuncion(grupo);
                if (esReservaFinalizada) {
                    let reservaCreada =
                        obtenerAnidadidoReservaFinalizada(grupo);
                    servicio_Aniadido3 = reservaCreada;
                    // idsCreados = reservaCreada.reserva_id;
                } else {
                    servicio_Aniadido3 = servicio_Aniadido3;
                    // ✅ Obtener todos los ids creados
                }

                idsCreados = servicio_Aniadido3.map((s) => s.reserva_id);

                console.log(idsCreados, "ids creados servicio_añadido3");

                // estoy aqui....
                console.log(servicio_Aniadido3, "servicio_añadido3");
                let idsAccionElimindaGrupo =
                    obtenerIdsAccionEliminadasGrupo(grupo);
                let reservasRecibidasConAnccion = marcarAccionReservas(
                    reservasRecibidas,
                    idsAccionElimindaGrupo,
                );
                console.log(idsReservasActivas, "ids reservas activas"); //las reservas que hay en el momento de la modificacion

                console.log(
                    reservasRecibidasConAnccion,
                    "RESERVAS RECIBIDAS ACCTION AÑADIDO 3",
                );
                idsEliminados = obtenerIdsReservasEliminadas(
                    reservasRecibidasConAnccion,
                    idsReservasActivas,
                );
                // idsEliminados = obtenerIdsReservasEliminadas2(reservasRecibidas, idsCreados);
                serviciosFiltrados = filtrarServicios(
                    serviciosRecibidos,
                    idsEliminados,
                );
                cambios.despues.ids_reservas = ids_reserva.join(", ");
                html += `<strong class="text-black">SERVICIOS:</strong>`;
                serviciosFiltrados.forEach((itemServicio) => {
                    servicioshtml += htmlServiciosHistorialModificacion(
                        itemServicio,
                        [],
                        servicio_Aniadido3,
                    );
                });
                cambios.antes = {};
                // console.log(idsCreados, "IDS CREADOS");
                let idsCreadosMostrarHtml = "";
                if (idsCreados.length) {
                    idsCreadosMostrarHtml = idsCreados.join(", ");
                } else {
                    idsCreadosMostrarHtml = idsCreados;
                }

                cambios.despues = {
                    aniadido: "ID reserva " + idsCreadosMostrarHtml,
                };
                html += servicioshtml;
            } else if (cambioFecha.length) {
                console.log(
                    reservasRecibidas,
                    "reservas recibidas cambiofecha",
                );
                html += `<strong class="text-black">SERVICIOS:</strong>`;
                serviciosAgrupados.forEach((itemServicio) => {
                    servicioshtml += htmlServiciosHistorialModificacion(
                        itemServicio,
                        [],
                        [],
                    );
                });
                html += servicioshtml;
            } else {
                console.log("----nada");

                servicioshtml = "";
                serviciosDespues = "";
            }
            const container = document.getElementById("modalCambiosContenido");
            container.innerHTML = "";
            console.log(cambios.despues, "CAMBIOS DESPUES MODAL");

            //añadimos los cambios anes->despues
            if (cambios.despues) {
                Object.keys(cambios.despues).forEach((campo) => {
                    html += htmlCambiosHistorial(
                        cambios,
                        accionUtilizar,
                        campo,
                        grupo,
                    );
                });
            }
            // servicios despues
            // console.log(serviciosDespues, "SERVICIOS DESPUES");
            if (serviciosDespues.length) {
                html += `<strong style="padding-top:1rem;" class="text-black">DESPUÉS:</strong>`;
                html += servicioDespuesHtml;
            }

            html += `</div>`;
            container.innerHTML = html;

            //abro el modal
            abrirModalCambiosFuncion();
        },
    );
}
// obtener el primer id reserva eliminada
// function obtenerIdReservaEliminada(data) {
//     const item = data.find(item => item.accion === "eliminada");
//     return item ? item.reserva_id : null;
// }

// obtener todos ids accion eliminada
function obtenerIdsAccionEliminadasGrupo(data) {
    return data
        .filter((item) => item.accion === "eliminada")
        .map((item) => item.reserva_id);
}

//añade el campo accion a reservasRecibidas
function marcarAccionReservas(reservasRecibidas, idsAcciosEliminadaGupo) {
    // Convertimos el array de IDs a Set para búsqueda más rápida
    const idsEliminadasSet = new Set(idsAcciosEliminadaGupo);

    return reservasRecibidas.map((reserva) => ({
        ...reserva, // copiamos todos los campos existentes
        accion: idsEliminadasSet.has(reserva.id) ? "eliminada" : null,
    }));
}

//devuelve ids de grupo que accion = eliminada
function obtenerItemAccionEliminada(data = []) {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) => item?.accion === "eliminada")
        .map((item) => item.reserva_id);
}

//obtine los ids reservas eliminadas
// function obtenerIdsReservasEliminadas(data) {
//     return data
//         .filter(item => item.accion === "eliminada")
//         .map(item => item.reserva_id);
// }

//devuelve los servicios no eliminados de un grupo
function obtenerServiciosNoEliminados(data, idsReservasEliminadas) {
    return data.filter(
        (item) => !idsReservasEliminadas.includes(item.reserva_id),
    );
}
// function obtenerServiciosNoEliminados(data, id_reservaEliminada) {
//     console.log(data, id_reservaEliminada, "obtenerServicios no eliminados");

//     return data.filter(item => item.reserva_id !== id_reservaEliminada);
// }

//devuelve el servicio eliminado de un grupo
function obtenerServiciosEliminados(data) {
    return data.filter((item) => item.accion === "eliminada");
}

//abre modal ver cambios reserva
function abrirModalCambiosFuncion() {
    let modal = new bootstrap.Modal(
        document.getElementById("modalCambiosReserva"),
    );
    modal.show();
}

//agrupa las modificaciones por Operation_uuid
function agruparPorOperation_uuid(historial) {
    let agrupados = {};
    historial.forEach((item) => {
        let operationKey = item.operation_uuid || "sin_operacion";
        if (!agrupados[operationKey]) {
            agrupados[operationKey] = [];
        }
        agrupados[operationKey].push(item);
    });
    return agrupados;
}

//elimina los cambios a reserva finalizada
function filtrarAgrupados(agrupados) {
    const resultado = {};

    Object.entries(agrupados).forEach(([operationUuid, items]) => {
        const item = items[0];

        const cumpleCondicion =
            items.length === 1 &&
            item.accion === "modificada" &&
            item.reserva?.status === "Finalizada" &&
            item.cambios?.antes?.status === "confirmed" &&
            item.cambios?.despues?.status === "Finalizada";

        // Solo lo agregamos si NO cumple la condición
        if (!cumpleCondicion) {
            resultado[operationUuid] = items;
        }
    });

    return resultado;
}

function obtenerServicios(data) {
    return data.map((item) => ({
        id_reserva: item.reserva?.id || item.reserva_id,
        servicio: item.reserva?.servicio || null,
    }));
}

function unificarCambios(grupo) {
    //este sobre escribe un registro encima de otro
    //  let cambiosUnificados = {
    //         antes: {},
    //         despues: {}
    //     };

    // grupo.forEach(registro => {
    //     if (registro.cambios?.despues) {
    //         Object.assign(cambiosUnificados.antes, registro.cambios.antes ?? {});
    //         Object.assign(cambiosUnificados.despues, registro.cambios.despues ?? {});
    //     }
    // });
    //este acumula los registros
    let cambiosUnificados = {
        antes: [],
        despues: [],
    };

    grupo.forEach((registro) => {
        if (registro.cambios?.despues) {
            cambiosUnificados.antes.push(registro.cambios.antes ?? {});
            cambiosUnificados.despues.push(registro.cambios.despues ?? {});
        }
    });
    return cambiosUnificados;
}

function comprobarSiEsCrearReserva(modificacionesAgrupadas) {
    let esReservaCreada = Object.values(modificacionesAgrupadas)[0].every(
        (item1) =>
            item1.accion === "creada" &&
            Array.isArray(item1.cambios?.antes) &&
            item1.cambios.antes.length === 0,
    );
    return esReservaCreada;
}

function crearBagetAccion(accion) {
    const clases = {
        creada: "bg-success",
        eliminada: "bg-danger",
        modificada: "bg-primary",
    };
    const clase = clases[accion] || "bg-secondary";
    return `
        <span class="badge ${clase}">
            ${accion}
        </span>
    `;
}

function iniciales(palabra) {
    return palabra?.trim().charAt(0).toUpperCase();
}

// function todosAntesVacios(data) {
//     return data.every(item =>
//         Array.isArray(item.cambios?.antes) && item.cambios.antes.length === 0
//     );
// }
// solo crear reserva, todos.antes vacios y ids_reservas.lend <= grpo.lend
function todosAntesVacios(data) {
    return data.every(
        (item) =>
            Array.isArray(item.cambios?.antes) &&
            item.cambios.antes.length === 0 &&
            Array.isArray(item.ids_reservas) &&
            item.ids_reservas.length <= data.length,
    );
}

//comprueba si hay alguna eliminada y devuelve la primera eliminada
// function hayAlgunaEliminada(data) {
//     const item = data.find(item => item.accion === "eliminada");
//     return item || null;
// }

//comprueba si hay eliminadas y devuelve la última posición
function hayAlgunaEliminada(data = []) {
    const hayEliminada = data.some((item) => item.accion === "eliminada");
    if (hayEliminada && data.length > 0) {
        return data[data.length - 1];
    }
    return null;
}

//añadimo servicio a reserva multiple existente
function seHaAnadidoServicio(data = []) {
    // console.log(data, "DATA SEHA AÑADIDO SERVICIO");

    const hayEliminada = data.some((item) => item.accion === "eliminada");
    if (hayEliminada) return [];

    const hayModificadaValida = data.some(
        (item) =>
            item.accion === "modificada" &&
            Object.keys(item.cambios?.despues || {}).length === 1 &&
            "cliente_confirmo_modificacion" in (item.cambios?.despues || {}),
    );
    if (!hayModificadaValida) return [];

    return data.filter((item) => {
        if (item.accion !== "creada") return false;

        const antes = item.cambios?.antes;

        return (
            (Array.isArray(antes) && antes.length === 0) ||
            (typeof antes === "object" &&
                antes !== null &&
                Object.keys(antes).length === 0)
        );
    });
}
//-------------------------------------------------------------------

function obtenerIdsReservasEliminadas(reservas = [], idsExcluidos = []) {
    if (!Array.isArray(reservas)) return [];
    if (!Array.isArray(idsExcluidos)) idsExcluidos = [];

    return reservas
        .filter((r) => !idsExcluidos.includes(r.id) && r.accion !== "eliminada")
        .map((r) => r.id);
}

function obtenerIdsReservasEliminadas2(reservas = [], idsExcluidos = []) {
    if (!Array.isArray(reservas)) return [];
    if (!Array.isArray(idsExcluidos)) idsExcluidos = [];

    return reservas
        .filter(
            (r) =>
                !idsExcluidos.includes(r.id) && // ❌ Caso 1: está en idsExcluidos → no incluir
                r.accion !== "eliminada", // ❌ Caso 2: accion = "eliminada" → no incluir
        )
        .map((r) => r.id);
}

// 2️⃣ Función que filtra los servicios eliminando los que tengan IDs eliminados
function filtrarServicios(servicios = [], idsEliminados = []) {
    if (!Array.isArray(servicios) || !Array.isArray(idsEliminados))
        return servicios;

    return servicios.filter((s) => !idsEliminados.includes(s.reserva_id));
}
//-------------estas dos van juntas----(las de arriba)

function servicioAniadido2(data = []) {
    // 🆕 NUEVA CONDICIÓN ESPECIAL
    if (
        data.length === 1 &&
        data[0].accion === "creada" &&
        Array.isArray(data[0].ids_reservas) &&
        data[0].ids_reservas.length > 1
    ) {
        return data;
    }
    const hayEliminada = data.some((item) => item.accion === "eliminada");
    if (hayEliminada) return [];
}

function servicioAniadido3(data = []) {
    const creadas = data
        .filter((item) => item.accion === "creada")
        .map((item) => ({
            reserva_id: item.reserva_id,
            servicio: item.reserva?.servicio,
        }));
    // Condición actualizada:
    // - si hay más de 1 y la primera es creada
    // - o si hay modificadas con multiple cambiando
    // - o si solo hay 1 y es creada
    if (
        (data.length > 1 && data[0].accion === "creada") ||
        data.some(
            (item) =>
                item.accion === "modificada" &&
                item.cambios?.antes?.multiple === null &&
                item.cambios?.despues?.multiple !== null,
        ) ||
        (data.length === 1 && data[0].accion === "creada")
    ) {
        return creadas;
    }

    if (data.some((item) => item.accion === "eliminada")) {
        return [];
    }

    return [];
}

function obtenerReservasConCambioFecha(data) {
    if (!Array.isArray(data)) return [];

    return data
        .filter((item) => {
            const antes = item?.cambios?.antes?.date_time;
            const despues = item?.cambios?.despues?.date_time;

            return despues && antes && antes !== despues;
        })
        .map((item) => ({
            reserva_id: item.reserva_id,
            servicio: item?.reserva?.servicio,
        }));
}

//  pintar la tabla de modificaciones
function renderHistorialTimeline(historial) {
    console.log(historial, "historial");

    //comprobar si hay historial si no ponemos vista que no hay
    comprobarSiHayHistorialCambios(historial);

    // AGRUPAR POR operation_uuid, agrupa los todos cambios de una acción
    let operacionesAgrupadas = agruparPorOperation_uuid(historial);
    operacionesAgrupadas = filtrarAgrupados(operacionesAgrupadas);
    //agrupar todos servivios de grupo modificacion
    // let serviciosAgrupados = agruparServicios(operacionesAgrupadas);
    console.log(operacionesAgrupadas, "GRUPO operation_uuid");

    // let esReservaCreada = comprobarSiEsCrearReserva(operacionesAgrupadas);
    let esReservaCreada = false;
    let hayEliminada = false;
    let servicioAniadido = [];
    let servicio_Aniadido2 = [];
    let servicio_Aniadido3 = [];
    let cambioFecha = [];
    // let serviciosAgrupados= [];
    //recorremos los grupos para pintar la tabla
    Object.values(operacionesAgrupadas).forEach((grupo) => {
        let cambiosAgrupados = unificarCambios(grupo);
        console.log(grupo, "GUPO TABLA");

        esReservaCreada = todosAntesVacios(grupo);
        hayEliminada = hayAlgunaEliminada(grupo);
        servicioAniadido = seHaAnadidoServicio(grupo);
        servicio_Aniadido2 = servicioAniadido2(grupo);
        servicio_Aniadido3 = servicioAniadido3(grupo);
        cambioFecha = obtenerReservasConCambioFecha(grupo);
        // const estadoReserva = {
        //     esReservaCreada: esReservaCreada,
        //     hayEliminada: hayEliminada
        // };
        let serviciosAgrupados = obtenerServicios(grupo);
        console.log(serviciosAgrupados, "SERVICIOS AGRUPADOS GRUPO");
        // seleccionamos el item y la accion a utilizar
        let item = "";
        let accionUtilizar = "";

        //solo se ha creado una reserva
        if (esReservaCreada && !servicio_Aniadido2) {
            console.log(esReservaCreada, "--1-- solo reserva creada");
            item = grupo[0];
            accionUtilizar = "creada";
        } else if (!esReservaCreada && hayEliminada) {
            console.log("--2 --hay reserva eliminada");
            console.log(grupo, "hay eliminadas");

            item = hayEliminada;
            accionUtilizar = "modificada";
        } else if (
            esReservaCreada &&
            !hayEliminada &&
            servicioAniadido.length
        ) {
            console.log("--3-- hay servicio añadido 1");
            // item será la última posición del array donde ponga "creada"
            item = grupo.filter((i) => i.accion === "creada").at(-1);
            accionUtilizar = "modificada";
            console.log(servicioAniadido, "SERVICIO AÑADIDO");
            // return;
        } else if (esReservaCreada && !hayEliminada && servicio_Aniadido2) {
            console.log("--1- -hay servicio añadido 2");
            item = grupo[0];
            accionUtilizar = "modificada";
        } else if (servicio_Aniadido3 && !cambioFecha.length > 0) {
            console.log("--1 - servicio añadido 3");
            item = grupo.filter((i) => i.accion === "creada").at(-1);
            accionUtilizar = "modificada";
            // console.log(item, "item añadido 3");

            // console.log(servicio_Aniadido3, "SERVICIO AÑADIDO 3");
        } else if (cambioFecha.length > 0) {
            console.log("--1 - cambio fecha");
            item = grupo.filter((i) => i.accion === "modificada").at(-1);
            accionUtilizar = "modificada";
        } else {
            // console.log(grupo, "GRUPO TABLA 1 ninguno");
            console.log("ninguna");
            // console.log(servicioAniadido,  esReservaCreada, servicio_Aniadido2);
        }

        // console.log(cambiosAgrupados, "CAMBIOS AGRUPADOS TABLA");
        // console.log(item, "ITEM TABLA");

        //pintamos la tabla
        htmlTablaModificacion(
            item,
            accionUtilizar,
            cambiosAgrupados,
            grupo,
            serviciosAgrupados,
            operacionesAgrupadas,
        );
    });
}

//crea el html donde se ven los cambios
function htmlCambiosHistorial(cambios, accion, campo, grupo) {
    // console.log(cambios, "CAMBIOS MODAL CAMBIOS");
    // console.log(accion, "ACCION MODAL CAMBIOS");
    // console.log(campo, "CAMPO MODAL CAMBIOS");
    // console.log(esReservaCreada, "ES RESERVA CREADA MODAL CAMBIOS");
    let esReservaCreada = todosAntesVacios(grupo);
    let servicio_Aniadido2 = servicioAniadido2(grupo);

    let nombreCampo = traduccionesCampos[campo] ?? campo;
    let icono = iconosCampos[campo] ?? "bi-pencil";
    let esCritico = camposCriticos.includes(campo);
    let antes = "";
    let despues = "";
    let antesHtml = "";
    let despuesHtml = "";
    // console.log( data, "SON IGUALES?");

    let colorHeader =
        accion === "creada" ? "success" : esCritico ? "danger" : "dark";

    let badgeCritico =
        esCritico && accion !== "creada"
            ? `<span class="badge bg-danger ms-2">Cambio crítico</span>`
            : "";

    // 👉 si es creada solo
    if (esReservaCreada && !servicio_Aniadido2 && campo !== "aniadido") {
        // console.log("es reserva creada");

        if (
            accion === "creada" &&
            !["date_time", "empleada_id", "ids_reservas"].includes(campo)
        ) {
            return "";
        }
        despues = cambios.despues[campo];
        despues = formatearValor(campo, despues);

        return `
            <div class="row list-group-item mb-2 border-success" style="margin-bottom:0!important;display:flex;gap:0!important;">
                <div class="align-items-center mb-2 col-12 col-lg-6" style="margin:0!important">
                    <i class="bi ${icono} me-2 fs-5"></i>
                    <strong class="text-black">
                        ${nombreCampo}
                    </strong>
                </div>
                <div class="d-flex align-items-center gap-2 flex-wrap col-12 col-lg-6" style="margin:0!important">
                    <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                        ${despues}
                    </div>
                </div>
            </div>
        `;
    } else {
        console.log("no es creada");
        let gap = cambios.despues?.date_time ? "gap-0" : "gap-2";
        antes = cambios.antes ? cambios.antes[campo] : null;
        despues = cambios.despues[campo];
        antes = formatearValor(campo, antes);
        despues = formatearValor(campo, despues);
        if (campo === "delete") {
            antesHtml = "";
            despuesHtml = `
            <div class="px-2 py-1 bg-danger-subtle rounded text-decoration-line-through">
                ${despues}
            </div>
            `;
        } else if (campo === "aniadido") {
            colorHeader = "success";
            antesHtml = "";
            despuesHtml = `
                <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                    ${despues}
                </div>
            `;
        } else if (
            esReservaCreada &&
            servicio_Aniadido2 &&
            campo === "aniadido"
        ) {
            despues = cambios.despues[campo];
            despues = formatearValor(campo, despues);
            console.log("es reserva añadida", campo, despues);
            if (campo === "aniadido") {
                colorHeader = "success";
                antesHtml = "";
                despuesHtml = `
                    <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                        ${despues}
                    </div>
                `;
            }
        } else {
            antesHtml = `
                <div class="px-2 py-1 bg-danger-subtle rounded text-decoration-line-through">
                    ${antes}
                </div>
                <i class="bi bi-arrow-right"></i>
            `;
            despuesHtml = `
                <div class="px-2 py-1 bg-success-subtle rounded fw-bold">
                    ${despues}
                </div>
            `;
        }
        return `
            <div class="row list-group-item mb-2 border-${colorHeader}" style="margin-bottom:0!important;display:flex;gap:0!important;">
                <div class="align-items-center mb-2 col-12 col-lg-6" style="margin:0!important">
                    <i class="bi ${icono} me-2 fs-5"></i>
                    <strong class="text-black">
                        ${nombreCampo}
                    </strong>
                    ${badgeCritico}
                </div>
                <div class="d-flex align-items-center ${gap} flex-wrap col-12 col-lg-6" style="margin:0!important">
                    ${antesHtml}
                    ${despuesHtml}
                </div>
            </div>
        `;
    }
}

const traduccionesCampos = {
    id: "ID Reserva",
    user_id: "Cliente",
    service_id: "Servicio",
    date_time: "Fecha",
    duration: "Duración (min)",
    empleada_id: "Empleada",
    status: "Estado",
    total_payment: "Precio",
    totalPagar: "Total a pagar",
    nota: "Nota",
    nota_interna: "Nota interna",
    mensaje_cliente: "Mensaje cliente",
    multiple: "Grupo reserva",
    ids_reservas: "ID Reserva",
    cliente_confirmo_modificacion: "El cliente ha confirmado la modificación",
    delete: "Eliminada",
    aniadido: "Añadida",
};

const traduccionesEstado = {
    pending: "Pendiente",
    confirmed: "Confirmada",
    pagada: "Pagada",
    Finalizada: "Finalizada",
    cancelada: "Cancelada",
};
const iconosCampos = {
    date_time: "bi-clock",
    empleada_id: "bi-person-badge",
    service_id: "bi-stars",
    total_payment: "bi-cash-coin",
    status: "bi-flag",
    duration: "bi-hourglass-split",
    id: "bi-upc-scan",
    totalPagar: "bi-cash-coin",
    delete: "bi-trash",
    ids_reservas: "bi-upc-scan",
    aniadido: "bi-stars",
};

const camposCriticos = [
    "date_time",
    "empleada_id",
    "service_id",
    "total_payment",
    "status",
    "delete",
];

//función que formatea palabras de las constantes de arriba
function formatearValor(campo, valor) {
    if (valor === null || valor === undefined) return "—";

    // Fecha
    if (campo === "date_time") {
        return new Date(valor).toLocaleString("es-ES");
    }

    // Precio
    if (campo === "total_payment") {
        return valor + " €";
    }

    // Estado
    if (campo === "status") {
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
let configReservas = document.querySelector(".configuracionNegocioA");
if (configReservas) {
    $(configReservas)
        .off("click")
        .on("click", function (event) {
            event.preventDefault();
            // console.log("config reservas");
            cargarConfiguraciones();
        });
}

//Clicas en la tarjeta de "Historial modificaciones reseras"
let historialCambiosReservas = document.querySelector(
    ".vistaHistorialModificacionesReservas",
);
if (historialCambiosReservas) {
    $(historialCambiosReservas)
        .off("click")
        .on("click", function (event) {
            event.preventDefault();
            // console.log("historial cambios reservas");
            cargarHistorialCambiosReservas();
        });
}

//funcion para guardar las configuraciones de reservas
let botonGurardarconfiguracionReserva = document.querySelector(
    ".savePreferenConfigReservas",
);
if (botonGurardarconfiguracionReserva) {
    $(botonGurardarconfiguracionReserva)
        .off("click")
        .on("click", function (event) {
            event.preventDefault();
            let tiempoReserva = document.getElementById(
                "uid-152-input_antelacionReserva",
            ).value;
            let antelacionReserva = document.getElementById(
                "uid-158-inputAntelacionReserva",
            ).value;
            let cambioFecha = document.getElementById(
                "uid-164-inputCambioFecha",
            ).value;
            let confirmacionAutomatica =
                document.getElementById("toggle-3").checked;
            if (confirmacionAutomatica === true) {
                confirmacionAutomatica = "si";
            } else {
                confirmacionAutomatica = "no";
            }
            console.log(confirmacionAutomatica, "confirmacionAutomatica");

            console.log("guardar configuraciones");
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            let url = "save-configuracionReservas";
            // Hacer una petición AJAX al servidor
            $.ajax({
                url: url, // Ruta que definimos en web.php
                method: "POST",
                data: {
                    _token: csrfToken, // Token CSRF para seguridad
                    confirmacion_automatica: confirmacionAutomatica,
                    limite_tiempo_reserva: tiempoReserva,
                    antelacion_reserva: antelacionReserva,
                    cambio_fecha_reserva: cambioFecha,
                },
                success: function (data) {
                    cargarConfiguraciones();
                    if (data.guardada === true) {
                        let stylos =
                            "position: absolute;right: auto;top: 16px;z-index: 9;";
                        insertMessageResolAction(
                            "Configuracion guardada con éxito",
                            "#Configuracion_administrator",
                            stylos,
                            "ok",
                        );
                    }
                },
                error: function (xhr) {
                    // console.log('Error al obtener las horas', xhr);
                },
            });
        });
}

// Función genérica para manejar los hover de los tooltips ayuda configurar reservas
function configurarTooltip(selector, divSelector, tooltipSelector) {
    if (document.querySelector(selector)) {
        $(selector).hover(
            function () {
                // Cuando se activa el hover (mouseenter)
                $(divSelector).addClass("b-hint_hintVisible__yt8c");
                $(tooltipSelector).addClass("b-tooltip_tooltipVisible_UHA7z");
            },
            function () {
                // Cuando se desactiva el hover (mouseleave)
                $(divSelector).removeClass("b-hint_hintVisible__yt8c");
                $(tooltipSelector).removeClass(
                    "b-tooltip_tooltipVisible_UHA7z",
                );
            },
        );
    }
}

// Llamamos a la función para cada caso
configurarTooltip(".ayudaReservConfim", ".divAddFrist", ".tooltipAddFrist");
configurarTooltip(
    ".ayudaAntelacion",
    ".divconqueAntelacion",
    ".toolTipConqueAntelacion",
);
configurarTooltip(
    ".ayudaCuantaAntalacion",
    ".divCuantaAntelacion",
    ".tooltipCuantaAntelacion",
);
configurarTooltip(
    ".ayudaModificarFecha",
    ".divModificarFecha",
    ".tooltipModificarFecha",
);

//SEGUNDA PANTALLA ABRIMOS TERCERA
let enlaces11 = document.querySelectorAll(".openConfigServicios_b a");
if (enlaces11) {
    enlaces11.forEach(function (enlace11) {
        // Clonamos el enlace para eliminar cualquier evento anterior
        let clonedEnlace = enlace11.cloneNode(true);
        enlace11.parentNode.replaceChild(clonedEnlace, enlace11);
        // Ahora trabajamos con el nuevo enlace sin eventos previos
        $(clonedEnlace)
            .off("click")
            .on("click", function (event) {
                event.preventDefault();
                let dataUrl = clonedEnlace.getAttribute("data-url2");
                if (dataUrl === "servicios.combos") {
                    let userAdminis =
                        document.getElementById("User_administrator");
                    // userAdminis.remove();
                    cambiarURL("admin/dashboard/Configuracion_showAllServices");
                    showDiv("show_all_service");
                    // reloadPage();
                    // cambiarURL('admin/dashboard/Configuracion_showAllServices');
                    window.addEventListener("load", () => {
                        showDiv("show_all_service");
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
    let nombreNuevaCategoria = document.querySelector(
        "input[name='nombreCategoria']",
    ).value;
    let imagenInput = document.querySelector("input[name='imagenCategoria']")
        .files[0]; // Obtener el archivo de imagen
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    var url = "storage-categoria";

    // Crear una nueva instancia de FormData
    let formData = new FormData();
    formData.append("_token", csrfToken); // Añadir el token CSRF
    formData.append("nombreCategoria", nombreNuevaCategoria); // Añadir el nombre de la categoría
    formData.append("imagen", imagenInput); // Añadir la imagen seleccionada

    // Hacer la petición AJAX para enviar los datos
    $.ajax({
        url: url, // Ruta que definimos en web.php
        method: "POST",
        data: formData,
        processData: false, // No procesar los datos
        contentType: false, // No establecer el tipo de contenido
        success: function (data) {
            if (data.categoriaCreada) {
                alert(
                    "Nueva categoria creada con éxito: " + data.nuevaCategoria,
                );
                let contenedorCategorias = document.querySelector(
                    ".contentAllCategories",
                );
                let urlImagenIconCategory =
                    contenedorCategorias.getAttribute("data-urlImage");
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
        error: function (xhr) {
            console.log("Error al guardar el nombre de la categoria", xhr);
        },
    });
}
if (document.getElementById("imagenCategoria")) {
    document
        .getElementById("imagenCategoria")
        .addEventListener("change", function (event) {
            const file = event.target.files[0]; // Obtener el archivo seleccionado
            const previewImage = document.getElementById("preview-image"); // Elemento de la imagen para la vista previa
            const plusSign = document.getElementById("plus-sign"); // Elemento del signo "+"

            if (file) {
                const reader = new FileReader(); // Crear un objeto FileReader

                reader.onload = function (e) {
                    // Cambiar la fuente de la imagen
                    previewImage.src = e.target.result;
                    previewImage.style.display = "block"; // Mostrar la imagen
                    plusSign.style.display = "none"; // Ocultar el signo "+"
                };

                reader.readAsDataURL(file); // Leer el archivo como URL de datos
            } else {
                previewImage.style.display = "none"; // Si no hay archivo, ocultar la vista previa
                plusSign.style.display = "block"; // Volver a mostrar el signo "+"
            }
        });
}

if (document.getElementById("imagenService")) {
    document
        .getElementById("imagenService")
        .addEventListener("change", function (event) {
            const file = event.target.files[0]; // Obtener el archivo seleccionado
            const previewImage = document.getElementById(
                "preview-imageService",
            ); // Elemento de la imagen para la vista previa
            const plusSign = document.getElementById("plus-sign"); // Elemento del signo "+"

            if (file) {
                const reader = new FileReader(); // Crear un objeto FileReader

                reader.onload = function (e) {
                    // Cambiar la fuente de la imagen
                    previewImage.src = e.target.result;
                    previewImage.style.display = "block"; // Mostrar la imagen
                    plusSign.style.display = "none"; // Ocultar el signo "+"
                };

                reader.readAsDataURL(file); // Leer el archivo como URL de datos
            } else {
                previewImage.style.display = "none"; // Si no hay archivo, ocultar la vista previa
                plusSign.style.display = "block"; // Volver a mostrar el signo "+"
            }
        });
}

var categoriaSeleccionadaNewServiceInput = document.getElementById(
    "categoriaSeleccionadaNewServiceInput",
);
var categoriaSeleccionadaNewServiceInputId = document.getElementById(
    "categoriaSeleccionadaNewServiceInputId",
);
var colorSeleccionadoNewService;

//PONE CHECK CATEGORIA SELECCIONADA ASIGNA INPUT CATEGORIA
function categoriaSeleccionadaNewService() {
    let categoria;
    let visualizadorCategroria = document.querySelector(
        ".styles_slotLeft_k29NgCategorias",
    );
    //ponemos el chek
    $(".contenedorCategorias .list")
        .off("click")
        .on("click", ".index_defaultItem_pKlHs", function (event) {
            event.preventDefault();
            // console.log("holaaaaa");
            // Primero, quitamos la clase .index_--selected_oUDGp del elemento que la tiene index_--highlighted__3J43
            $(".index_--selected_oUDGp").removeClass("index_--selected_oUDGp");
            $(".index_--highlighted__3J43").removeClass(
                "index_--highlighted__3J43",
            );

            // Luego, añadimos la clase al div que fue clicado
            $(this).addClass(
                "index_--selected_oUDGp index_--highlighted__3J43",
            );
            categoria = $(this).attr("data-category");
            // console.log(categoria, "categroai");
            // ponemos el valor categoria que se vea
            visualizadorCategroria.textContent = categoria;
            console.log("categoria, ", categoria);

            //asignamos el valor al input hidden categoria
            categoriaSeleccionadaNewServiceInput.value = categoria;
            categoriaSeleccionadaNewServiceInputId.value =
                $(this).attr("data-index");
            categoriaSeleccionadaNewServiceInput.dispatchEvent(
                new Event("input"),
            );
            cerrarModalCategorias(".contenedorCategorias");
        });
}

function comprobarHoraFinMayorQueInicio(
    slotHoraInicio,
    contenedorMensa,
    valorSeleccionado,
    contenedorBordeWarning,
    slotHoraFin,
    mostrarAlert = true,
) {
    let mensaje = `
        <p style="margin:0px" class="index_message_IeJl5" data-testid="error-input-message">La hora de fin debe ser mayor que hora inicio</p>
    `;

    let botonAniadir = document.getElementById("uid-319-inputAniadirServicio");
    let contenedorMensajeAlert = document.querySelector(contenedorMensa);
    const horaInicio = document.querySelector(slotHoraInicio).textContent;
    // Convertir las horas a objetos Date para compararlas fácilmente
    const [horasInicio, minutosInicio] = horaInicio.split(":").map(Number);
    const [horasFin, minutosFin] = valorSeleccionado.split(":").map(Number);
    const fechaInicio = new Date();
    fechaInicio.setHours(horasInicio, minutosInicio, 0);
    const fechaFin = new Date();
    fechaFin.setHours(horasFin, minutosFin, 0);

    if (fechaFin <= fechaInicio) {
        $(contenedorMensajeAlert).empty();
        $(contenedorMensajeAlert).append(mensaje);
        document
            .querySelector(contenedorBordeWarning)
            .classList.add("border-warning2");
        // Añadir 5 minutos a la hora de inicio y actualizar slotHoraFin
        let nuevaFechaFin = new Date(fechaInicio.getTime() + 5 * 60000); // 5 minutos en milisegundos
        let horasFormateadas = nuevaFechaFin
            .getHours()
            .toString()
            .padStart(2, "0");
        let minutosFormateados = nuevaFechaFin
            .getMinutes()
            .toString()
            .padStart(2, "0");
        document.querySelector(slotHoraFin).textContent =
            `${horasFormateadas}:${minutosFormateados}`;
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
        if (mostrarAlert) {
            alert("La hora fin debe superar a al hora inicio.");
        }
    } else {
        $(contenedorMensajeAlert).empty();
        document
            .querySelector(contenedorBordeWarning)
            .classList.remove("border-warning2");
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

function comprobarHoraInicioMenorQueFin(
    valorSeleccionado,
    contenedorMensa,
    slotHoraFin,
    contenedorBordeWarning,
    mostrarAlert = true,
) {
    let mensaje = `
        <p style="margin:0px" class="index_message_IeJl5" data-testid="error-input-message">La hora de inicio debe ser menor que hora fin</p>
    `;

    let botonAniadir = document.getElementById("uid-319-inputAniadirServicio");
    let contenedorMensajeAlert = document.querySelector(contenedorMensa);
    const horaFin = document.querySelector(slotHoraFin).textContent;

    // Convertir las horas a objetos Date para compararlas fácilmente
    const [horasInicio, minutosInicio] = valorSeleccionado
        .split(":")
        .map(Number);
    const [horasFin, minutosFin] = horaFin.split(":").map(Number);
    const fechaInicio = new Date();
    fechaInicio.setHours(horasInicio, minutosInicio, 0);
    const fechaFin = new Date();
    fechaFin.setHours(horasFin, minutosFin, 0);

    if (fechaInicio >= fechaFin) {
        // Añadir 5 minutos a la hora de inicio y actualizar slotHoraFin
        let nuevaFechaFin = new Date(fechaInicio.getTime() + 5 * 60000); // 5 minutos en milisegundos
        let horasFormateadas = nuevaFechaFin
            .getHours()
            .toString()
            .padStart(2, "0");
        let minutosFormateados = nuevaFechaFin
            .getMinutes()
            .toString()
            .padStart(2, "0");
        document.querySelector(slotHoraFin).textContent =
            `${horasFormateadas}:${minutosFormateados}`;
        $(contenedorMensajeAlert).empty();
        $(contenedorMensajeAlert).append(mensaje);
        document
            .querySelector(contenedorBordeWarning)
            .classList.add("border-warning2");

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
        if (mostrarAlert) {
            alert("La hora fin debe superar a al hora inicio.");
        }
    } else {
        $(contenedorMensajeAlert).empty();
        document
            .querySelector(contenedorBordeWarning)
            .classList.remove("border-warning2");

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
function seleccionarElemento(
    contenedor,
    input_id,
    claseItem,
    divVisualicer = null,
) {
    let input = document.getElementById(input_id);
    let divVisualizador = document.querySelector(divVisualicer);

    $(contenedor + " .list")
        .off("click")
        .on("click", claseItem, function (event) {
            event.preventDefault();
            // console.log(this,"this");

            // Eliminar selección previa
            $(contenedor + " .index_--selected_oUDGp").removeClass(
                "index_--selected_oUDGp",
            );
            $(contenedor + " .index_--highlighted__3J43").removeClass(
                "index_--highlighted__3J43",
            );

            // Añadir la selección actual
            $(this).addClass(
                "index_--selected_oUDGp index_--highlighted__3J43",
            );

            // Obtener el valor del atributo data-time y asignarlo al input
            let valorSeleccionado = $(this).attr("data-time");
            // console.log(valorSeleccionado, "valorseleccionado");

            //inhabilitar precio si procede
            let inputPrecio = document.getElementById("precioServicio");
            let divPrecio = document.querySelector(".divPrecio");
            if (contenedor === ".contenedorTipoPrecio") {
                if (
                    valorSeleccionado === "No mostrar" ||
                    valorSeleccionado === "Gratis" ||
                    valorSeleccionado === "Variable"
                ) {
                    inputPrecio.disabled = true; // Deshabilitar el input
                    inputPrecio.value = ""; // Opcional: limpiar el valor del input
                    inputPrecio.style.backgroundColor = "#f4f4f4";
                    divPrecio.classList.add("noHoverBlack");
                } else {
                    inputPrecio.disabled = false; // Habilitar el input si no cumple las condiciones
                    inputPrecio.style.backgroundColor = "white";
                    divPrecio.classList.remove("noHoverBlack");
                }
            }
            if (
                divVisualizador === null &&
                (contenedor === ".contenedorTiempoAntelacion" ||
                    contenedor === ".contenedorAntelacionReserva" ||
                    contenedor === ".contenedorCambioFechaReserva")
            ) {
                document.getElementById(input_id).value =
                    $(this).attr("data-antelacion");
            } else {
                // console.log(valorSeleccionado, "seleccionado");

                // Asignar el valor al input y disparar el evento 'input'
                input.value = valorSeleccionado;
                divVisualizador.textContent = valorSeleccionado;
            }

            input.dispatchEvent(new Event("input"));

            // Cerrar el modal correspondiente
            cerrarModalCategorias(contenedor);
            if (
                contenedor.trim() == ".contenedorHorasInicioCalendar" ||
                contenedor.trim() == ".contenedorHorasFinCalendar"
            ) {
                let horaInicio = document.querySelector(
                    ".slotHorasCobrarServicioCalendar",
                ).textContent;
                let fecha = document
                    .getElementById("datePikerfechaCitaInfo22")
                    .getAttribute("data-datepiker");
                let start = formatFechaConHora(fecha, horaInicio);

                //AL CAMBIAR LA HORA DE INICIO SE CAMBIA LA HORA FIN AUTOMATICO
                let hayServicioSeleccionado = document.querySelector(
                    ".services_serviceDuration_Zb36z",
                );
                let duracionServicio = "";
                let horaFinCalculada = "";
                let end = "";
                if (hayServicioSeleccionado) {
                    duracionServicio = hayServicioSeleccionado.textContent;
                    horaFinCalculada = calcularHoraFin(
                        valorSeleccionado,
                        duracionServicio,
                    );
                    end = formatFechaConHora(fecha, horaFinCalculada);
                }
                if (contenedor.trim() == ".contenedorHorasInicioCalendar") {
                    document
                        .querySelector(".slotHorasCobrarServicioCalendar")
                        .setAttribute("data-hourreserv", valorSeleccionado);
                    if (hayServicioSeleccionado) {
                        // console.log("horasInicio nueva reserva", horaFinCalculada);
                        document.querySelector(
                            ".slotHoraFinCorbrarServicioCalendar",
                        ).textContent = horaFinCalculada;
                        marcarHoraSeleccionada(
                            ".contenedorHorasFinCalendar",
                            horaFinCalculada,
                        );
                    }
                    if (
                        comprobarSiEmpleadoAsignadoNewReservCalendar(
                            ".slotEmpleadoAddInicioCalendar",
                        )
                    ) {
                        if (
                            contenedor.trim() ==
                            ".contenedorHorasInicioCalendar"
                        ) {
                            // console.log("estamos aquí-------------hola", eventIdChangeCalendar);

                            cambiarHoraInicioEvento(
                                eventIdChangeCalendar,
                                start,
                            );
                            cambiarHoraFinEvento(eventIdChangeCalendar, end);
                        }
                    }
                    cambiarHoraInicioEvento(eventIdChangeCalendar, start);
                } else {
                    let horaFin = document.querySelector(
                        ".slotHoraFinCorbrarServicioCalendar",
                    ).textContent;
                    // document.querySelector('.slotHoraFinCorbrarServicioCalendar').textContent = horaFin;
                    marcarHoraSeleccionada(
                        ".contenedorHorasFinCalendar",
                        horaFin,
                    );
                    // console.log("hora horas inicio fin");
                    if (
                        comprobarSiEmpleadoAsignadoNewReservCalendar(
                            ".slotEmpleadoAddInicioCalendar",
                        )
                    ) {
                        let fecha = document
                            .getElementById("datePikerfechaCitaInfo22")
                            .getAttribute("data-datepiker");
                        let end = formatFechaConHora(fecha, horaFin); // Fecha y hora de finalización
                        cambiarHoraFinEvento(eventIdChangeCalendar, end);
                    }
                }
            }

            if (
                contenedor.trim() == ".contenedorHorasInicioAddCalendar" ||
                contenedor.trim() == ".contenedorHorasFinAddCalendar"
            ) {
                // console.log("HORA HORAS INICIO");
                let hayServicioSeleccionado = document.querySelector(
                    ".services_serviceDuration_Zb36z",
                );
                let duracionServicio = hayServicioSeleccionado.textContent;

                let horaFinCalculada = calcularHoraFin(
                    valorSeleccionado,
                    duracionServicio,
                );
                let fecha = document
                    .getElementById("datePikerfechaCitaInfo22")
                    .getAttribute("data-datepiker");
                let end = formatFechaConHora(fecha, horaFinCalculada);

                if (contenedor.trim() == ".contenedorHorasInicioAddCalendar") {
                    document
                        .querySelector(".slotHoraFinCorbrarServicioAddCalendar")
                        .setAttribute("data-hourreserv", valorSeleccionado);
                    document.querySelector(
                        ".slotHoraFinCorbrarServicioAddCalendar",
                    ).textContent = horaFinCalculada;
                    marcarHoraSeleccionada(
                        ".contenedorHorasFinAddCalendarclass",
                        horaFinCalculada,
                    );

                    if (
                        comprobarSiEmpleadoAsignadoNewReservCalendar(
                            ".slotEmpleadoAddInicioCalendarAdd",
                        )
                    ) {
                        if (
                            contenedor.trim() ==
                            ".contenedorHorasInicioAddCalendar"
                        ) {
                            let horaInicio2 = document.querySelector(
                                ".slotHorasCobrarServicioAddCalendar",
                            ).textContent;
                            let start2 = formatFechaConHora(fecha, horaInicio2);
                            cambiarHoraInicioEvento(
                                eventIdChangeCalendar,
                                start2,
                            );
                            cambiarHoraFinEvento(eventIdChangeCalendar, end);
                        }
                        // }else{
                        //     let horaFin2 = document.querySelector('.slotHoraFinCorbrarServicioAddCalendar').textContent;
                        //     let end2 = formatFechaConHora(fecha2, horaFin2);      // Fecha y hora de finalización
                        //     cambiarHoraFinEvento(eventIdChangeCalendar, end2);
                        // }
                    }
                } else {
                    let horaFin = document.querySelector(
                        ".slotHoraFinCorbrarServicioAddCalendar",
                    ).textContent;
                    marcarHoraSeleccionada(
                        ".contenedorHorasFinAddCalendarclass",
                        horaFin,
                    );
                    if (
                        comprobarSiEmpleadoAsignadoNewReservCalendar(
                            ".slotEmpleadoAddInicioCalendar",
                        )
                    ) {
                        let fecha = document
                            .getElementById("datePikerfechaCitaInfo22")
                            .getAttribute("data-datepiker");
                        let end = formatFechaConHora(fecha, horaFin); // Fecha y hora de finalización
                        cambiarHoraFinEvento(eventIdChangeCalendar, end);
                    }
                }
            }

            if (
                contenedor.trim() == ".contenedorHorasInicio" ||
                contenedor.trim() == ".contenedorHorasFin"
            ) {
                if (contenedor.trim() == ".contenedorHorasInicio") {
                    comprobarHoraInicioMenorQueFin(
                        valorSeleccionado,
                        ".alert022",
                        ".slotHoraFinCorbrarServicio",
                        ".contenedorHorasFinClass",
                        false,
                    );
                } else {
                    comprobarHoraFinMayorQueInicio(
                        ".slotHorasCobrarServicio",
                        ".alert022",
                        valorSeleccionado,
                        ".contenedorHorasFinClass",
                        ".slotHoraFinCorbrarServicio",
                        false,
                    );
                }
                if (
                    comprobarSiEmpleadoAsignadoNewReservCalendar(
                        ".slotEmpleadoAddInicio",
                    )
                ) {
                    console.log("clic en hora inicio o hora fin");

                    let fecha2 = document
                        .querySelector(".fechaCitaInfo")
                        .getAttribute("data-datepiker");
                    if (contenedor.trim() == ".contenedorHorasInicio") {
                        console.log(
                            "clic en hora inicio",
                            eventIdChangeCalendar,
                            infoArrayEnvio,
                            infoArrayEnvio.length,
                        );
                        let horaInicio2 = document.querySelector(
                            ".slotHorasCobrarServicio",
                        ).textContent;
                        let start2 = formatFechaConHora(fecha2, horaInicio2);
                        if (eramultiple && infoArrayEnvio.length === 1) {
                            cambiarHoraInicioEvento(
                                infoArrayEnvio[0].id,
                                start2,
                            );
                        } else {
                            cambiarHoraInicioEvento(
                                eventIdChangeCalendar,
                                start2,
                            );
                        }
                    } else {
                        let horaFin2 = document.querySelector(
                            ".slotHoraFinCorbrarServicio",
                        ).textContent;
                        let end2 = formatFechaConHora(fecha2, horaFin2); // Fecha y hora de finalización
                        if (eramultiple && infoArrayEnvio.length === 1) {
                            cambiarHoraFinEvento(infoArrayEnvio[0].id, end2);
                        } else {
                            cambiarHoraFinEvento(eventIdChangeCalendar, end2);
                        }
                    }
                }
            }
            if (
                contenedor.trim() == ".contenedorHorasInicioAdd" ||
                contenedor.trim() == ".contenedorHorasFinAdd"
            ) {
                console.log("hola contenedor horas inicio add");

                // if (contenedor.trim() == '.contenedorHorasInicioAdd'){
                //     comprobarHoraInicioMenorQueFin(valorSeleccionado, '.alert021', '.slotHoraFinCorbrarServicioAdd', '.contenedorHorasFinAddclass', false);
                // }else{
                //     comprobarHoraFinMayorQueInicio('.slotHorasCobrarServicioAdd', '.alert021', valorSeleccionado, '.contenedorHorasFinAddclass', '.slotHoraFinCorbrarServicioAdd', false);
                // }
                //aunque no haya empleado seleccionado si hay servicio cambiamos hora fin
                let hayServicioSeleccionado = document.querySelector(
                    ".services_serviceDuration_Zb36z",
                ); //esto es donde dice la duracion
                let duracionServicio = "";
                let horaFinCalculada = "";
                let end = "";
                if (hayServicioSeleccionado) {
                    duracionServicio = hayServicioSeleccionado.textContent;
                    horaFinCalculada = calcularHoraFin(
                        valorSeleccionado,
                        duracionServicio,
                    );
                    document.querySelector(
                        ".slotHoraFinCorbrarServicioAdd",
                    ).textContent = horaFinCalculada;
                }
                if (
                    comprobarSiEmpleadoAsignadoNewReservCalendar(
                        ".slotEmpleadoAdd ",
                    )
                ) {
                    console.log("EMPLEADO ASIGNADO");

                    let fecha2 = document
                        .querySelector(".fechaCitaInfo")
                        .getAttribute("data-datepiker");
                    // console.log(fecha2," fecha cli hora inicio");
                    // if(!fecha2){
                    //     fecha2 = document.querySelector('.fechaCitaInfo22').getAttribute('data-datepiker');
                    //     console.log("NO HAY FECHA 2");

                    // }
                    if (contenedor.trim() == ".contenedorHorasInicioAdd") {
                        console.log("hola clic aqui contenedorHorasInicioAdd");

                        document
                            .querySelector(".slotHorasCobrarServicioAdd")
                            .setAttribute("data-hourreserv", valorSeleccionado);
                        if (hayServicioSeleccionado) {
                            duracionServicio =
                                hayServicioSeleccionado.textContent;
                            horaFinCalculada = calcularHoraFin(
                                valorSeleccionado,
                                duracionServicio,
                            );
                            end = formatFechaConHora(fecha2, horaFinCalculada);
                            // console.log("horasInicio nueva reserva", horaFinCalculada);
                            document.querySelector(
                                ".slotHoraFinCorbrarServicioAdd",
                            ).textContent = horaFinCalculada;
                            marcarHoraSeleccionada(
                                ".contenedorHorasFinAdd",
                                horaFinCalculada,
                            );
                        }
                        let horaInicio2 = document.querySelector(
                            ".slotHorasCobrarServicioAdd",
                        ).textContent;
                        let start2 = formatFechaConHora(fecha2, horaInicio2);
                        cambiarHoraInicioEvento(eventIdChangeCalendar, start2);
                        cambiarHoraFinEvento(eventIdChangeCalendar, end);
                    } else {
                        let horaFin2 = document.querySelector(
                            ".slotHoraFinCorbrarServicioAdd",
                        ).textContent;
                        let end2 = formatFechaConHora(fecha2, horaFin2); // Fecha y hora de finalización
                        cambiarHoraFinEvento(eventIdChangeCalendar, end2);
                        marcarHoraSeleccionada(
                            ".contenedorHorasFinAdd",
                            horaFin2,
                        );
                    }
                }
            }
        });
}

function getFechaDos(idDatePiker) {
    let fecha2 = document
        .getElementById(idDatePiker)
        .getAttribute("data-datepiker");
    return fecha2;
}

//comprueba si hay empleado seleccionado
function comprobarSiEmpleadoAsignadoNewReservCalendar(slotNombre) {
    let empleadoNombre = "";
    if (document.querySelector(slotNombre)) {
        empleadoNombre = document.querySelector(slotNombre).textContent;
        //si hay nombre de empleado
        if (empleadoNombre.trim() !== "Selecciona empleado") {
            let id_empleado = document
                .querySelector(slotNombre)
                .getAttribute("data-empleid");
            return id_empleado;
        } else {
            return false;
        }
    }
}

// Inicializar las funciones específicas
seleccionarElemento(
    ".contenedorHoras",
    "horaNewServiceInput",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHoras",
);
seleccionarElemento(
    ".contenedorMinutos",
    "minutosNewServiceInput",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgMinutos",
);
seleccionarElemento(
    ".contenedorTipoPrecio",
    "tipoPrecioNewServiceInput",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgTipoPrecio",
);

seleccionarElemento(
    ".contenedorHorasInicio",
    "horaNewServiceInputInicio",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasInicio",
);
seleccionarElemento(
    ".contenedorHorasFin",
    "horaNewServiceInputFin",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasFin",
);

seleccionarElemento(
    ".contenedorHorasInicioAdd",
    "horaNewServiceInputInicioAdd",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasInicioAdd",
);
seleccionarElemento(
    ".contenedorHorasFinAdd",
    "horaNewServiceInputFinAdd",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasFinAdd",
);
seleccionarElemento(
    ".contenedorEmpleados",
    "uid-1345-input",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgEmpleadoAdd",
);
seleccionarElemento(
    ".contenedorEmpleadosInicio",
    "uid-inicio-input",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgEmpleadoAddInicio",
);

seleccionarElemento(
    ".contenedorEmpleadosInicioCalendar",
    "uid-inicio-inputCalendar",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgEmpleadoAddInicioCalendar",
);
seleccionarElemento(
    ".contenedorEmpleadosInicioCalendarAdd",
    "uid-inicio-inputCalendarAdd",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgEmpleadoAddInicioCalendarAdd",
);

seleccionarElemento(
    ".contenedorHorasInicioAddCalendar",
    "horaNewServiceInputInicioAddCalendar",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasInicioAddCalendar",
);
seleccionarElemento(
    ".contenedorHorasFinAddCalendar",
    "horaNewServiceInputFinAddCalendar",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasFinAddCalendar",
);
seleccionarElemento(
    ".contenedorHorasInicioCalendar",
    "horaNewServiceInputInicioCalendar",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasInicioCalendar",
);
seleccionarElemento(
    ".contenedorHorasFinCalendar",
    "horaNewServiceInputFinCalendar",
    ".index_defaultItem_pKlHs",
    ".styles_slotLeft_k29NgHorasFinCalendar",
);
seleccionarElemento(
    ".contenedorTiempoAntelacion",
    "uid-152-input_antelacionReserva",
    ".index_defaultItem_pKlHs",
);
seleccionarElemento(
    ".contenedorAntelacionReserva",
    "uid-158-inputAntelacionReserva",
    ".index_defaultItem_pKlHs",
);
seleccionarElemento(
    ".contenedorCambioFechaReserva",
    "uid-164-inputCambioFecha",
    ".index_defaultItem_pKlHs",
);

//ABRE MODAL PARA SELECCIONAR COLOR dentro PANTALLA 4
function openModalSelectColor() {
    let backgrounBlack = document.querySelector(".contenedorColores");
    if (
        backgrounBlack.style.display === "none" ||
        backgrounBlack.style.display === ""
    ) {
        backgrounBlack.style.display = "flex"; // Mostrar
    } else {
        backgrounBlack.style.display = "none"; // Ocultar
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

function colorSeleccionadoNewService() {
    let visualizadorColorElegido = document.querySelector(
        ".styles_slotLeft_k29NgColores",
    );
    let randomColorUrl = document
        .querySelector(".styles_slotLeft_k29NgColores")
        .getAttribute("data-random-color-url");
    let contenedorColores = document.querySelector(".contenedorColores");
    let inputColorSeleccionado = document.getElementById(
        "colorSeleccionadaNewServiceInput",
    );
    let color;
    // Seleccionamos los spans que contienen los colores
    let colorSpans = document.querySelectorAll(
        ".color-picker-modal_serviceColorTile_mt88Y",
    );
    colorSpans.forEach(function (span) {
        span.addEventListener("click", function () {
            // console.log(span, 'span');
            color = span.getAttribute("data-color");
            // Eliminar cualquier ícono de check existente de todos los spans
            colorSpans.forEach(function (s) {
                let existingIcon = s.querySelector(".icon-tick");
                if (existingIcon) {
                    existingIcon.remove(); // Eliminamos el ícono si existe
                }
            });
            // Añadir el ícono de check solo al span clickeado (spanCheck)
            span.innerHTML += `
                <span class="color-picker-modal_tickIcon_Zazmf b-icon icon-tick iconFont" style="font-size: 40px;"></span>
            `;
            if (contenedorColores) {
                contenedorColores.style.display = "none"; // Ocultar el contenedor
            }
            if (color === "randomColor") {
                visualizadorColorElegido.innerHTML = `
                <img data-color="${color}" width="24px" style="height: 24px;" class="b-icon_img_I0kuC index_colorPicker_dCcsj" src="${randomColorUrl}" alt="colores">
                `;
            } else {
                visualizadorColorElegido.innerHTML = `
                    <div data-color="${color}" class="index_colorPicker_dCcsj" style="background-color: ${color};"></div>
                `;
            }
            inputColorSeleccionado.value = color;
            inputColorSeleccionado.dispatchEvent(new Event("input"));
        });
    });
}
//RESETEAR FORMULARIO CREAR NUEVO SERVICIO
function resertFormNewService() {
    let visualizadorColorElegido = document.querySelector(
        ".styles_slotLeft_k29NgColores",
    );

    let urlObjeto = new URL(window.location.href);
    let baseUrl = urlObjeto.origin;
    // let baseUrl = 'http://localhost/laravel/salon-manicura-git/public';
    let randomColorUrl = baseUrl + "/storage/colors_option/random-color.svg";
    visualizadorColorElegido.setAttribute(
        "data-random-color-url",
        randomColorUrl,
    );
    visualizadorColorElegido.innerHTML = `
    <img data-color="randomColor" width="24px" style="height: 24px;" class="b-icon_img_I0kuC index_colorPicker_dCcsj" src="${randomColorUrl}" alt="colores">
    `;

    document.getElementById("nombreServicio").value = "";

    document.querySelector(".styles_slotLeft_k29NgCategorias").textContent =
        "No categorizado";
    document.getElementById("textAreaDescripcionService").value = "";
    document.getElementById("horaNewServiceInput").value = "0h";
    document.querySelector(".styles_slotLeft_k29NgHoras").textContent = "0h";
    document.querySelector(".styles_slotLeft_k29NgMinutos").textContent =
        "30min";
    document.getElementById("minutosNewServiceInput").value = "30min";
    document.querySelector(".styles_slotLeft_k29NgTipoPrecio ").textContent =
        "Fijo";
    document.getElementById("tipoPrecioNewServiceInput").value = "Fijo";
    document.getElementById("precioServicio").value = "";
    deleteImageTemporaly();
    $(".filepond--list").empty();
    $(".index_--selected_oUDGp").removeClass("index_--selected_oUDGp");
    $(".index_--highlighted__3J43").removeClass("index_--highlighted__3J43");
    const container = document.getElementById("pasosContainer");

    const nuevoPaso = document.createElement("div");
    nuevoPaso.className = "paso-input mb-2";
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
    container.innerHTML = "";
    container.appendChild(nuevoPaso);
}

//INICIALIZA LOS CONTADORES DE PALABRAS
function initCountLeathersTextArea() {
    contadorPalabras(
        "#textAreaDescripcionService",
        ".chars-counterDescriptionService",
        640,
    );
    contadorPalabras("#nombreServicio", ".chars-counter-nameService", 70);
}

//TERCERA PANTALLA MANDAMOS CARGAR LA CUARTA (el formulario)
function asignarEventoModalNewService() {
    let enlacesCuarta = document.querySelectorAll(".add-button_button_U2OQn");
    if (enlacesCuarta) {
        enlacesCuarta.forEach(function (enlaceCuarta) {
            // Verifica si el enlace ya tiene un listener registrado
            $(enlaceCuarta)
                .off("click")
                .on("click", function (event) {
                    event.preventDefault();
                    let dataUrl = enlaceCuarta.getAttribute("data-url3");
                    if (dataUrl === "add.sevice") {
                        abrirCerrarModalAniadirServico();
                        showDiv("createNew_service");
                        changeBotonModifyCreateService(
                            ".botonModificarServicio",
                            ".botonCrearServicio",
                        );
                        changeTitleModifyCreateService(
                            ".modificarServicioTitle",
                            ".aniadirServicioTitle",
                        );
                        cambiarURL(
                            "admin/dashboard/Configuracion_createService",
                        );
                        blockPointerEvents();
                    } else if (dataUrl === "add.category") {
                        abrirCerrarModalAniadirServico();
                        abrirModal("newCategoryModal");
                    }
                });
        });
    }
}

//FLECHA ATRA DE MODIFICAR SERVICIO
let modifyServiceBack = document.querySelector(".salirDeModificarServicio");
$(modifyServiceBack)
    .off("click")
    .on("click", function (event) {
        event.preventDefault();
        resertFormNewService();

        showDiv("show_all_service");
        cambiarURL("admin/dashboard/Configuracion_showAllServices");
        initIsotope(
            ".isotope-container",
            ".isotope-item",
            "*",
            ".isotope-filters [data-filter]",
            "data-filter",
        ); //servicios y combos de servicios
    });
//quitar palomita colorSeleccionado
function quitarPalomitaColorSeleccionado() {
    let colorSpans = document.querySelectorAll(
        ".color-picker-modal_serviceColorTile_mt88Y",
    );
    colorSpans.forEach(function (s) {
        let existingIcon = s.querySelector(".icon-tick");
        if (existingIcon) {
            existingIcon.remove(); // Eliminamos el ícono si existe
        }
    });
}

//ELIMINA LAS IMAGENES SELECCIONADAS
function resetImagenUpload() {
    deleteImageTemporaly();
    $(".filepond--list").empty();
}

//CLICA BOTON CANCELAR MODIFICACIÓN SERVICIO VUELVE A SHOW ALL SERVICES
var botonCancelarModificarServicio = document.getElementById(
    "cancelModifyService",
);
if (botonCancelarModificarServicio) {
    botonCancelarModificarServicio.onclick = function (event) {
        event.preventDefault();
        quitarPalomitaColorSeleccionado();
        resetImagenUpload();
        showDiv("show_all_service");
    };
}

//MODIFICAR SERVICIO AL CLICAR EN FLECHA
function modificarServicioClicarFlecha() {
    let divServicios = document.querySelectorAll(
        ".index_serviceListItem_frUaN",
    );
    divServicios.forEach(function (divServicio) {
        $(divServicio)
            .off("click")
            .on("click", function (event) {
                event.preventDefault();
                let serviceData = JSON.parse(
                    divServicio.getAttribute("data-serviceModify"),
                );
                // console.log(serviceData.serviceColor, "serviceColor");
                quitarPalomitaColorSeleccionado();
                resetImagenUpload();

                showDiv("createNew_service");
                changeBotonModifyCreateService(
                    ".botonCrearServicio",
                    ".botonModificarServicio",
                );
                changeTitleModifyCreateService(
                    ".aniadirServicioTitle",
                    ".modificarServicioTitle",
                );
                // cambiarURL('admin/dashboard/Configuracion_createService');
                addDataModifyService(serviceData);
            });
    });
}
modificarServicioClicarFlecha();

//AÑADE LOS DATOS AL FORMULARIO MODIFICAR SERVICIO
function addDataModifyService(serviceData) {
    console.log(serviceData.servicePasos, "serviceData.servicePasos");

    let divColor = document.querySelector(".styles_slotLeft_k29NgColores");
    let inputColor = document.querySelector("input[name='colorServicio']");
    let inputNombreServicio = document.querySelector(
        "input[name='nombreServicio']",
    );
    let categoriaSeleccionadaNewServiceInputModify = document.getElementById(
        "categoriaSeleccionadaNewServiceInput",
    );
    let visualizadorCategroria = document.querySelector(
        ".styles_slotLeft_k29NgCategorias",
    );
    const textAreaDescripcionService = document.getElementById(
        "textAreaDescripcionService",
    );
    let inputHoraServicio = document.querySelector(
        "input[name='horaNewService']",
    );
    let visualizadorHora = document.querySelector(
        ".styles_slotLeft_k29NgHoras",
    );
    let inputMinutoServicio = document.querySelector(
        "input[name='minutosNewService']",
    );
    let visualizadorMinutos = document.querySelector(
        ".styles_slotLeft_k29NgMinutos",
    );
    let inputTipoPrecio = document.querySelector(
        "input[name='tipoPrecioNewService']",
    );
    let visualizadortipoPrecio = document.querySelector(
        ".styles_slotLeft_k29NgTipoPrecio",
    );
    let inputPrecio = document.querySelector("input[name='precioServicio']");
    let inputIdServicio = document.querySelector(
        "input[name='id_serviceModify']",
    );
    if (divColor) {
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
        categoriaSeleccionadaNewServiceInputModify.value =
            serviceData.serviceCategoria;
        categoriaSeleccionadaNewServiceInputModify.dispatchEvent(
            new Event("input"),
        );
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
        let pasosContainer = document.getElementById("pasosContainer");
        pasosContainer.innerHTML = ""; // borrar todos los pasos actuales

        if (serviceData.servicePasos) {
            let pasosArray = serviceData.servicePasos.split("\n");

            pasosArray.forEach((paso, index) => {
                let pasoDiv = document.createElement("div");
                pasoDiv.className = "paso-input mb-2 d-flex align-items-center";

                pasoDiv.style.flexWrap = "wrap";

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
            let pasoDiv = document.createElement("div");
            pasoDiv.className = "paso-input mb-2 d-flex align-items-center";

            pasoDiv.style.flexWrap = "wrap";

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
    let loader = document.querySelector("#loaderSperaAdministratorAll");
    loader.classList.remove("d-none");
    // Establece el valor de la acción según el botón que se presionó
    document.getElementById("actionType").value = action;
}

//CLIC EN CREAR SERVICIO SIN RECARGAR PÁGINA
$("#formCreateNewService").on("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    // Creamos un objeto FormData para enviar los datos, incluyendo archivos
    var formData = new FormData(this);
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    // Agregamos el CSRF token (aunque lo haya en el formulario, para asegurarnos de que se incluya)
    formData.append("_token", csrfToken);

    $.ajax({
        url: $(this).attr("action"), // Usamos la acción del formulario
        type: $(this).attr("method"), // Usamos el método del formulario

        data: formData, // Enviamos los datos del formulario
        processData: false, // Evita que jQuery procese los datos
        contentType: false, // Evita que jQuery establezca el Content-Type (important para multipart)
        success: function (response) {
            showAllServicesPlantilla();
        },
        error: function (xhr, status, error) {
            // Manejo de errores
            console.log("Error: " + error);
        },
    });
});

function showAllServicesPlantilla(action = null) {
    fetch("show-all-services")
        .then((response) => response.text())
        .then((data) => {
            let mensaje = "";
            document.getElementById("show_all_service").innerHTML = data;
            modificarServicioClicarFlecha();
            showDiv("show_all_service");
            cambiarURL("admin/dashboard/Configuracion_showAllServices");
            let stylos = "position: absolute;right: 5rem;top: 16px;z-index: 9;";
            if (action === null) {
                if (document.getElementById("actionType").value === "create") {
                    mensaje = "Nuevo servicio creado con éxito";
                } else if (
                    document.getElementById("actionType").value === "modify"
                ) {
                    mensaje = "Servicio modificado con éxito";
                } else if (
                    document.getElementById("actionType").value === "delete"
                ) {
                    mensaje = "Servicio eliminado con éxito";
                }
            } else {
                if (action === "modificarCategoria") {
                    mensaje = "Categoria modificada con éxito";
                } else if (action === "eliminarCategoria") {
                    mensaje = "Categoria eliminada con éxito";
                }
            }

            insertMessageResolAction(
                mensaje,
                "#Configuracion_administrator",
                stylos,
                "ok",
            );
            initIsotope(
                ".isotope-container",
                ".isotope-item",
                "*",
                ".isotope-filters [data-filter]",
                "data-filter",
            ); //servicios y combos de servicios
            showModalAddservice();
            clicFlechaAtrasServiciosyCombos();
            let loader = document.querySelector("#loaderSperaAdministratorAll");
            loader.classList.add("d-none");
        })
        .catch((error) =>
            console.error("Error al cargar los servicios:", error),
        );
}

//MODIFICA LOS BOTONES PARA CREAR SERVICIO O MODIFICAR SERVICIO
function changeBotonModifyCreateService(botonHide_class, botonShow_class) {
    // console.log(botonHide_class, "d-none", botonShow_class, "mostrar");

    let botonOcultar = document.querySelector(botonHide_class);
    if (botonOcultar) {
        botonOcultar.classList.add("d-none");
    }
    let botonMostrar = document.querySelector(botonShow_class);
    if (botonMostrar) {
        botonMostrar.classList.remove("d-none");
    }
}
//MODIFICA EL TÍTULO DE CREAR SERVICIO O MODIFICAR SERVICIO
function changeTitleModifyCreateService(titleHide_class, titleShow_class) {
    let tituloOcultar = document.querySelector(titleHide_class);
    if (tituloOcultar) {
        tituloOcultar.classList.add("d-none");
    }
    let tituloMostrar = document.querySelector(titleShow_class);
    if (tituloMostrar) {
        tituloMostrar.classList.remove("d-none");
    }
}
//funcion abre cierra modal boton negro añadir servicio
function abrirCerrarModalAniadirServico() {
    // console.log("abrirCerrarModal");
    let botonAddService;
    let botonnegro;
    let modalnewServiceCategCombo = document.querySelector(
        ".add-button_dropdown_ZXg6G",
    );
    botonAddService = document.querySelector(".add-button_overlay_nOmaV");
    botonnegro = document.querySelector(".addService");
    // Alternamos la clase para mostrar u ocultar el modal
    botonAddService.classList.toggle("add-button_open_oqadv");
    modalnewServiceCategCombo.classList.toggle("d-none");
    // Alternamos la clase del botón para cambiar su apariencia
    botonnegro.classList.toggle("add-button_addButtonClose_MWq6H");
}

//ABRIR MODAL MUESTRA Y OCULTA EL MODAL PARA CREAR NUEVO SERVICIO, COMBO DENTRO PANTALLA 3
function showModalAddservice() {
    let enlaceModal = document.querySelector(".addService");
    if (enlaceModal) {
        $(enlaceModal)
            .off("click")
            .on("click", function (event) {
                event.preventDefault();
                abrirCerrarModalAniadirServico();
                //  console.log("clic en boton negro");
            });
    }
}

//funcion modificar categoria
function modifyCategory(categoria_id) {
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
    return style.display === "none";
}

function abrirModalCategorias(contenedor) {
    //para cerrar el modal empleados al clicar en las horas
    if (
        contenedor.trim() == ".contenedorHorasInicioAddCalendar" ||
        contenedor.trim() == ".contenedorHorasFinAddCalendar"
    ) {
        !comprobarDesplegableEmpleadoAbierto(
            "contenedorEmpleadosInicioCalendarAdd",
        )
            ? $(".contenedorEmpleadosInicioCalendarAdd").slideToggle()
            : null;
    }
    if (
        contenedor.trim() == ".contenedorHorasInicioCalendar" ||
        contenedor.trim() == ".contenedorHorasFinCalendar"
    ) {
        !comprobarDesplegableEmpleadoAbierto(
            "contenedorEmpleadosInicioCalendar",
        )
            ? $(".contenedorEmpleadosInicioCalendar").slideToggle()
            : null;
    }
    if (
        contenedor.trim() == ".contenedorHorasInicio" ||
        contenedor.trim() == ".contenedorHorasFin"
    ) {
        !comprobarDesplegableEmpleadoAbierto("contenedorEmpleadosInicio")
            ? $(".contenedorEmpleadosInicio").slideToggle()
            : null;
    }
    if (
        contenedor.trim() == ".contenedorHorasInicioAdd" ||
        contenedor.trim() == ".contenedorHorasFinAdd"
    ) {
        !comprobarDesplegableEmpleadoAbierto("contenedorEmpleados")
            ? $(".contenedorEmpleados").slideToggle()
            : null;
    }
    //--------------------
    $(contenedor).slideToggle();
    categoriaSeleccionadaNewService();
}

function cerrarModalCategorias(modal) {
    // console.log('Cerrar categorías');
    $(modal).slideUp(); // Cierra el modal si está abierto
}

function xcerrarModal() {
    let contenedorColores = document.querySelector(".contenedorColores");
    contenedorColores.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the file input element
    const inputElement = document.querySelector("#imagesCreateNewService");

    // Create a FilePond instance
    const pond = FilePond.create(inputElement);
    FilePond.setOptions({
        labelIdle:
            'Arrastra y suelta tus imágenes o <span class="filepond--label-action">Explorar</span>',
        server: {
            process: "upload",
            revert: "delete",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('input[name="_token"]')
                    .value, // Token CSRF
            },
            // restore: './restore/',
            // load: './load/',
            // fetch: './fetch/',
        },
    });
});

function clicFlechaAtrasServiciosyCombos() {
    var spanGoBack3 = document.querySelector(".spanGotobackServicesCombos"); // Seleccionamos el span spanGotobackConfigureServices
    if (spanGoBack3) {
        spanGoBack3.onclick = function () {
            showDiv("configuration_service");
            cambiarURL("admin/dashboard/Configuracion_administrator");
        };
    }
}

clicFlechaAtrasServiciosyCombos();

var spanGoBack2 = document.querySelectorAll(".spanGotobackConfigureServices"); // Seleccionamos el span spanGotobackConfigureServices
if (spanGoBack2) {
    spanGoBack2.forEach(function (span) {
        span.addEventListener("click", function (event) {
            event.preventDefault();
            showDiv("configuration_bussines");
            cambiarURL("admin/dashboard/Configuracion_administrator");
        });
    });
}

//flecha atras configuracion reserva
function clicFlechaAtrasConfiguracionReseva() {
    var spanGoBack = document.querySelector(".configuracionReservaAtras");
    if (spanGoBack) {
        spanGoBack.onclick = function () {
            showDiv("opciones_avanzadas1");
            // cambiarURL('admin/dashboard/Configuracion_administrator');
        };
    }
}
clicFlechaAtrasConfiguracionReseva();

function prueba125() {
    console.log("prueba 125");
}
function agregarPaso() {
    const container = document.getElementById("pasosContainer");

    const nuevoPaso = document.createElement("div");
    nuevoPaso.className = "paso-input mb-2";
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
    const pasoDiv = boton.closest(".paso-input");
    pasoDiv.remove();
}
//     });
