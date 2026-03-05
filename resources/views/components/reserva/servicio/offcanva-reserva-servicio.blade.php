@props(['servicios'])
@foreach ($servicios as $index => $servicio)
    @php
        // Aquí el índice ($index) será igual al $servicio->id
        $index = $servicio->id;
    @endphp
<div id="loaderSpera{{ $index }}" class="loader d-none">
    <div class="spinner"></div>
</div>
<div class="contenedorNewReserva" data-index="{{ $index }}" data-fechaActual="{{ $fechaActual2 }}"
    data-horaInicio="{{ $horaInicio2 }}" style="margin-bottom: 0px;margin-top: 0px;">

    {{-- <p>{{ $fechaActual2 }}</p> --}}
    <div data-descripcionServicio="{{ $servicio->descripcion }}" data-precio="{{ $servicio->precio }}" data-nombreServio="{{ $servicio->nombre }}"
        class="offcanvasBottomReserva container offcanvas offcanvas-bottom p-0" data-duration="{{ $servicio->duration }}"
        data-bs-backdrop="static" tabindex="-1" id="offcanvasBottomReserva{{ $index }}"
        data-service_h ="{{ $servicio->horaNewService }}" data-service_m="{{ $servicio->minutosNewService }}"
        aria-labelledby="offcanvasBottomLabelReserva{{ $index }}">
        <div class="offcanvas-header mb-3 text-capitalize align-items-center d-flex">
            <div style="margin-left: 4rem;" class="card-header-title offcanvas-title"
                id="offcanvasBottomLabelReserva{{ $index }}">
                <span class="mesAtual{{ $index }}" id="mesActual">{{ $mesActual }}</span>
                <svg id="datepickerSoloMesAnio{{ $index }}" stroke-linejoin="round" stroke-linecap="round"
                    stroke="currentColor" stroke-width="1.5" fill="none" height="16" width="16"
                    viewBox="0 0 16 16" style="transform: rotate(270deg);cursor: pointer;">
                    <path d="M10 2l-6 6l6 6"></path>
                </svg>
            </div>
            <button style="margin-right: 4rem;" data-index="{{ $index }}" type="button"
                class="btn-close customOpenModalCancelServiceButton" aria-label="Close" id=""></button>
            {{-- <button type="button" class="offcanvasBottomCategory btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onclick="showElement('.navbarAdminPanel');showElement('.footer')"></button> --}}
        </div>
        <div id="scroll-menu-categoryBotton"
            class="container offcanvas-body scroll-menu-category inputsCategoriasSecundarias carrusel-contenedor"
            style="">
            {{-- <p>{{ $fechaActual }}, {{ $fechaActual2 }}, {{ $fechaActual3 }}</p> --}}
            <div id="carousel_dias{{ $index }}" class=" carousel_dias carrusel-contenedor"
                data-horaInicio="{{ $horaInicio2 }}" style="position: relative;">
                <button class="flecha previ" onclick="desplazarDias(1, '{{ $index }}')">
                    <svg stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" stroke-width="1.5"
                        fill="none" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M10 2l-6 6l6 6"></path>
                    </svg>
                </button>
                <div class="carrusel">
                    <div class="carrusel-inner carrusel-inner-dias" data-mesActual="{{ $mesActual }}"
                        data-anioActual="{{ $anioActual }}">
                        @foreach ($diasHasta2030 as $dia)
                            {{-- <div class="dia {{ $dia['fecha'] === $fechaActual2 ? 'date_active' : 'date_noActive' }} --}}
                            {{-- <div class="dia {{ in_array($dia['dia_semana'], ['sáb.', 'dom.']) ? 'disabled' : '' }}" --}}
                            <div class="dia"  data-index="{{ $index }}"
                                data-diaSemana="{{ $dia['dia_semana'] }}" data-mes="{{ $dia['mes'] }}"
                                data-ano="{{ $dia['anio'] }}" data-date="{{ $dia['fecha'] }}"
                                data-horaInicio="{{ $horaInicio2 }}"
                                onclick="{{ in_array($dia['dia_semana'], ['dom.']) ? 'event.stopPropagation();' : 'manejarSeleccionFecha(\'' . $dia['fecha'] . '\', ' . $index . ', ' . $servicio->duration . ');' }}">
                                <span class="nombre-dia">{{ $dia['dia_semana'] }}</span>
                                <span class="numero-dia">{{ $dia['numero_dia'] }}</span>
                                @if ($dia['dia_semana'] === 'dom.')
                                @else
                                    <div style="flex-direction: column;display: flex;margin-top:0.4rem" class="containSizeDisponibility w-100 align-items-center">
                                       <div class="marker" data-testid="time-slot-marker"></div>
                                    </div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>

                <button class="flecha nextt" onclick="desplazarDias(-1, '{{ $index }}')">
                    <svg stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" stroke-width="1.5"
                        fill="none" height="16" width="16" viewBox="0 0 16 16"
                        style="transform: rotate(180deg);">
                        <path d="M10 2l-6 6l6 6"></path>
                    </svg>
                </button>
            </div>

            <div class="div_separator">
                <hr class="date_time_separator">
            </div>

            <div class="title_time">
                <div class="title_time2">
                    <h5 class=" p-2 gualazonF">Selecciona la hora.</h5>
                </div>
            </div>

            <div id="carousel_horas{{ $index }}" class="carousel_horas carrusel-contenedor"
                data-horaInicio="{{ $horaInicio2 }}" style="position: relative;">
                <button class="flecha previ" onclick="desplazar(1, '{{ $index }}')">
                    <svg stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" stroke-width="1.5"
                        fill="none" height="16" width="16" viewBox="0 0 16 16">
                        <path d="M10 2l-6 6l6 6"></path>
                    </svg>
                </button>

                <div class="carrusel">
                    <div class="carrusel-inner">
                    </div>
                </div>

                <button class="flecha nextt" onclick="desplazar(-1, '{{ $index }}')">
                    <svg stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" stroke-width="1.5"
                        fill="none" height="16" width="16" viewBox="0 0 16 16"
                        style="transform: rotate(180deg);">
                        <path d="M10 2l-6 6l6 6"></path>
                    </svg>
                </button>
            </div>
            <div class="serviciosMultiples" data-servicioId="{{ $servicio->id }}">
                <div class="servicioContenedor" data-service_id="{{ $servicio->id }}"  data-servicio='@json($servicio)'>
                <div class="subbooking-list" style="">
                    <div class="pos-relative box" style="background-color: transparent!important">
                        {{-- <div class="remove d-flex items-center justify-center">
                            <span class="icon icon-close remove__icon d-flex items-center justify-center">
                                <svg stroke-linejoin="round" stroke-linecap="round" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" height="24" width="24" class="icon" xmlns="http://www.w3.org/2000/svg"><line y2="18" x2="6" y1="6" x1="18"></line><line y2="18" x2="18" y1="6" x1="6"></line>
                                </svg>
                            </span>
                        </div> --}}
                        <div class="divided">
                            <div>
                                <div class=" row">
                                    {{-- <div class="drag-handle"><div class="lines"></div></div> --}}
                                    <div class="col-8">
                                        <h4 style="font-family: 'gualazonF';font-size: 15px;font-weight: 700;color: #151515;" class="m-0 font-medium line-break-anywhere">{{ $servicio->nombre }}</h4>
                                    </div>
                                    <div class=" col-4 text-right">
                                        <div class="font-h4">{{ $servicio->precio }}&nbsp;€</div>
                                        <div class="text-h5 text-gray tiempoNecesario">
                                            {{-- {{ $horaInicio2 }}
                                             - 13:55 --}}
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
                                            <div data-testid="participant-label-avatar{{ $index }}"
                                                class="b-mr-1">
                                                {{-- <div class="avatar avatar-rounded avatar-sm" style="background-image: url(./storage/empleadas/emple_afri.jpeg);">
                                                </div> --}}
                                            </div>
                                            <div data-empleId="cualquiera"
                                                data-empleado="participant-label-name{{ $index }}"
                                                class="b-flex-fill b-font-h5 empleadoNombreId{{ $index }}">
                                                Cualquiera
                                            </div>
                                        </div>
                                    </div>
                                    <button data-diaSeleccionado="{{ $fechaActual2 }}"
                                        data-index="{{ $index }}" data-inicioServicio=""
                                        data-duration="{{ $servicio->duration }}"
                                        class="customOpenModalSelectEmpleButton botonChangeEmple">cambiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <a style="margin-bottom: 1rem;font-size:16px;" class="add-more enlaceMasServicio" href="#" onclick="openAddMoreService();addInitServicesOnArray();">
                    <span data-v-4b2af132="" class="icon">
                        <svg stroke-linejoin="round" stroke-linecap="round"
                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                            height="24" width="24" class="icon" xmlns="http://www.w3.org/2000/svg">
                            <line y2="19" x2="12" y1="5" x1="12"></line>
                            <line y2="12" x2="19" y1="12" x1="5"></line>
                        </svg>
                    </span>
                    Añadir otro servicio
                </a>

        </div>
        <div class="offcanvas-header p-0 text-center text-capitalize align-items-center d-flex">
            <div class="card-footerTotal card-footer-sticky">
                <div class="row flextEnd mb-2">
                    <div class="text-right col-auto">
                        <span class="font-h5 ">Total: </span>
                    </div>
                    <div class="text-right col-auto">
                        <span class="font-h0 totalPagarReservaOffcanva" style="font-family: 'Montserrat';">{{ $servicio->precio }}&nbsp;€</span>
                    </div>

                </div>
                <div class=" text-secondary text-right font-h5 tiempoTotalReservOffcanva">
                    @if ($servicio->horaNewService > 0)
                        {{ $servicio->horaNewService }}h {{ $servicio->minutosNewService }}min
                    @else
                        {{ $servicio->minutosNewService }}min
                    @endif
                </div>
                <div class="row">
                    <div class=" col">
                        <button data-total="{{ $servicio->precio }}" data-index="{{ $index }}"
                            class="confirm-button-reservaNewService gualazonF confirm-button button button-shadow button-block button-primary-salon button-lg"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasBottomComfirmReserva{{ $index }}"
                            aria-controls="offcanvasBottomComfirmReserva{{ $index }}"
                            style="text-transform: uppercase">
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- OFFCANVAS CONFIRMAR RESERVA --}}
    @component('components.reserva.servicio.continue-reserv', [
        'duration' => $servicio->duration,
        'horaNewService' => $servicio->horaNewService,
        'minutosNewService' => $servicio->minutosNewService,
        'index' => $index,
        'nombreServicio' => $servicio->nombre,
        'descripcionServicio' => $servicio->descripcion,
        'id_servicio' => $servicio->id,
        'precioServicio' => $servicio->precio,
    ])
    @endcomponent

    {{-- modal cancelar reserva servicio --}}
    <div class="modal fade" id="cancelReservaModal{{ $index }}" tabindex="-1"
        aria-labelledby="cancelReservaModalLabel{{ $index }}" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 style="font-size: 19px!important" class="modal-title gualazonF" id="cancelReservaModalLabel{{ $index }}">¿Cancelar
                        reserva seguro?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body gualazonF">
                    ¿Seguro que quieres cancelar la reserva? Los cambios no guardados se perderán
                </div>
                <div class="modal-footer">
                    <button data-closedOffcanvas="offcanvasBottomReserva{{ $index }}"
                        data-date="{{ $fechaActual2 }}" data-index="{{ $index }}"
                        id="cancelReservOne{{ $index }}" data-bs-dismiss="modal" id=""
                        type="button" class="button button-white-salon button-lg button-block mt-md">Si, cancelar
                        reserva</button>
                    <button type="button" class="button button-lg button-primary-salon button-block"
                        data-bs-dismiss="modal">Continuar reservando</button>
                </div>
            </div>
        </div>
    </div>

    {{-- modal cancelar reserva servicio desde confirmarServicio --}}
    <div class="modal fade" id="cancelReservaModalConfirmarServicio{{ $index }}" tabindex="-1"
        aria-labelledby="cancelReservaModalConfirmarServicioLabel{{ $index }}" data-bs-backdrop="static"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 style="font-size: 19px" class="modal-title gualazonF"
                        id="cancelReservaModalConfirmarServicioLabel{{ $index }}">¿Cancelar reserva?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body gualazonF">
                    ¿Seguro que quieres cancelar la reserva? Los cambios no guardados se perderán
                </div>
                <div class="modal-footer">
                    <button id="cancelReservTwo{{ $index }}"
                        onclick="cerrarOffcanvas('offcanvasBottomComfirmReserva{{ $index }}', {{ $fechaActual2 }}, {{ $index }})"
                        data-bs-dismiss="modal" id="" type="button"
                        class="button button-white-salon button-lg button-block mt-md">Si, cancelar reserva</button>
                    <button type="button" class="button button-lg button-primary-salon button-block"
                        data-bs-dismiss="modal">Continuar reservando</button>
                </div>
            </div>
        </div>
    </div>

    {{-- modal seleccionar empleado --}}
    <div class="modal modalEmleados fade" id="selectEmpleModal{{ $index }}" tabindex="-1"
        aria-labelledby="selectEmpleModalLabel{{ $index }}" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content pb-2">
                <div class="modal-header">
                    <h1 class="modal-title gualazonF" id="selectEmpleModalLabel{{ $index }}">Seleccionar
                        empleado</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body gualazonF">
                    <div class="divided divided-lg">
                        <div class="select-staffer-resource-0">
                            <div data-bs-dismiss="modal" class="empleadoCambiarCursor cursor-pointer"
                                data-index="{{ $index }}"
                                onclick="selectEmpleado(this, 0, 'Cualquiera', 'nada')">
                                <div class="row items-center">
                                    <div class="col-auto">
                                        <span
                                            class="icon icon-avatar-empty avatarEmpleado avatar-md avatar-rounded avatar-selected">
                                           @include('iconos.icon-arcoEmpleadoSeleccionado')
                                        </span>
                                    </div>
                                    <div class="col-10">
                                        <span class="text-h4 mb-xs">
                                            Cualquiera
                                        </span>
                                        <div class="subtext text-success">
                                            <span>
                                                Mayor disponivilidad
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @foreach ($empleadas as $empleada)
                            <div data-staffer="{{ $empleada->id }}" data-empId="{{ $empleada->id }}" data-userId="{{ $empleada->user_id }}">
                                <div class="empleadoCambiarCursor" data-bs-dismiss="modal"
                                    data-index="{{ $index }}"
                                    onclick="selectEmpleado(this, {{ $empleada->id }}, '{{ $empleada->nombre }}', '{{ $empleada->img_empleada }}')">
                                    <div class="row items-center">
                                        <div class="col-auto">
                                            <div class="avatarEmpleado avatar-md avatar-rounded"
                                                style="background-image: url(../storage/{{ $empleada->img_empleada }});">
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <span class="text-h4 mb-xs">{{ $empleada->nombre }}</span>
                                            <div class="subtext">
                                                {{-- <span>Esteticista</span>
                                                <span>
                                                    <span>
                                                        <span> • </span>
                                                    </span> Disponible
                                                </span> --}}
                                                <span class="text-secondary">
                                                    @if ($empleada->especialidad)
                                                        {{ $empleada->especialidad }}
                                                    @else
                                                        Sin especialidad
                                                    @endif
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- <x-reserva.servicio.offcanva-reserva-add-service/> --}}
    {{-- @component('components.reserva.servicio.offcanva-reserva-add-service', ['indexOffcanva' => $index])@endcomponent --}}
</div>
@endforeach
