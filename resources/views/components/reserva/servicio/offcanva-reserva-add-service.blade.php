<div class="aniadirMasServiciosAcordion">

<div style="z-index: 9999" class="container offcanvas offcanvas-bottom p-0" tabindex="-1" id="offcanvasAddService" aria-labelledby="offcanvasAddServiceLabel">
  <div class="offcanvas-header" style="display:flex!important;border: none;padding:1rem!important">
    <div>
        <button id="mostrarListaSeleccionados" class="small mt-2 height-100 addServicesButton addserviceDisabled" data-testid="appointment-button-discard" style="width: 100%;">
             <span style="font-weight: 700;">AÑADIR</span>
        </button>
    </div>
   {{-- Contador clicable --}}
   <div id="contadorServicios" class="small mt-2">
    1 / 4 seleccionados
    </div>

    <div>
        <button onclick="resetContadorSegunTotalArray();desmarcarCheckboxesYCerrarAcordeon();" id="" class="height-100 cancelAddserviceButon" data-testid="appointment-button-save" style="width: 100%;"  data-bs-dismiss="offcanvas" aria-label="Close">
            <div class="index_caption_W6r_J" style="font-weight: 600"> Cancelar </div>
        </button>
    </div>


  </div>
  <div class="offcanvas-body" style="overflow-x: hidden;">
            <div class="col-12">
              <!-- Accordion -->
                <div id="accordionCategoryAdd" class="accordion">
                    <span style="box-shadow: none;border:none" class="next-element3" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="transform:translate3d(0px, 16.782px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 16.782px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span>
                    @foreach($categoriasServicios as $index => $categoria)
                    <!-- Accordion item 1 -->
                    <div class="card card5620" style="margin-bottom: 1px!important;box-shadow: none;padding:0px">
                        <div id="heading{{ $index }}Add" class="card-header border-0" style="max-height: 5rem;padding: 1.5rem 0;display: flex;align-items: center;">
                            <h2 class="mb-0" style="width: 95%;font-size: inherit;">
                            <button type="button" data-bs-toggle="collapse" data-bs-target="#collapse{{ $index }}Add" aria-expanded="false"
                                aria-controls="collapse{{ $index }}Add"
                                style="font-family: 'gualazonF';font-weight: 100 !important;font-size: 17px;padding: 11px 32px;text-align: left;border: none;
    background-color: transparent;"
                                class="font-24 afri text-dark font-weight-bold collapsible-link text-decoration-none">
                                {{ $categoria->categoria }}
                            </button>
                            </h2>
                        </div>
                        <div id="collapse{{ $index }}Add" aria-labelledby="heading{{ $index }}Add" data-parent="#accordionCategoryAdd" class="collapse">
                            <div class="card-body bg-white booked-appt-list bodyServiciosMovil" style="overflow-y: auto;height: 13rem;padding:0px">
                                @foreach($categoria->servicios as $indexServicio => $servicio)
                                    @php
                                        // Asegurarse de que la fecha actual no sea sábado o domingo
                                        if ($fechaActual2->isSaturday() || $fechaActual2->isSunday()) {
                                            $fechaActual2 = $fechaActual2->next(Carbon\Carbon::MONDAY);
                                        }
                                    @endphp
                                    <div class="timeslot bookedClearFix justify-content-between" style=";padding: 0px 12px;">
                                        <span class="timeslot-time p-0" style="font-weight: 300">
                                            {{ $servicio->nombre }}
                                            <span class="timeslot-range d-block mt-1">
                                                <i style="font-size: small" class="bi bi-clock-fill"></i>
                                                 @if ($servicio->horaNewService > 0)
                                                    {{ $servicio->horaNewService }}h {{ $servicio->minutosNewService }}min
                                                @else
                                                    {{ $servicio->minutosNewService }}min
                                                @endif
                                            </span>
                                        </span>
                                        <div class=" align-content-center">
                                            <span class="small" style="float: inline-end;">{{$servicio->precio}}€</span >
                                            </div>
                                        <span class="timeslot-people align-content-center" style="padding-right: 0px">
                                            <label class="label" for="servicio-{{ $servicio->id }}">
                                                @php
                                                    $duracion = '';
                                                    if ($servicio->horaNewService > 0) {
                                                        $duracion .= $servicio->horaNewService . 'h';
                                                    }
                                                    if ($servicio->minutosNewService > 0) {
                                                        $duracion .= ($duracion ? ' ' : '') . $servicio->minutosNewService . 'min';
                                                    }
                                                @endphp
                                                <input
                                                id="servicio-{{ $servicio->id }}"
                                                type="checkbox"
                                                class="switch"
                                                name="servicios_seleccionados[]"
                                                value="{{ $servicio->id }}"
                                                data-dateActual="{{ $fechaActual2 }}"
                                                data-index="{{ $servicio->id }}"
                                                data-precio="{{ $servicio->precio }}"
                                                data-nombre="{{ $servicio->nombre }}"
                                                data-duracion="{{ $duracion }}"
                                                />
                                                Añadir
                                            </label>
                                        </span>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div><!-- End -->
                    @endforeach
                </div>
            </div>
  </div>
</div>
        {{-- lista de servicios seleccionados --}}
<div style="z-index: 99999!important;" data-bs-backdrop="static" data-bs-keyboard="false" class="modalServiciosSeleccionados modal fade" id="modalServiciosSeleccionados" tabindex="-1" aria-labelledby="modalServiciosLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalServiciosLabel">Servicios seleccionados</h5>
        <button onclick="cleanViewMoreService();" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body" style="max-height: 41rem;overflow: auto;">
        <ul id="listaNombresServicios" class="list-group list-group-flush"></ul>
        <div class="text-end fw-bold" style="border-bottom: 1px solid #ededed;padding-bottom: 1rem;">
          Total: <span id="totalServiciosSeleccionados">0€</span>
        </div>
        <div class="listaNombreServiciosBody mt-3">

        </div>
        {{-- <button class="confirmarServiciosBtn btn btn-dark w-100 mt-2" style="background-color: #d6a769!important;border-radius:4px">
          Añadir servicios
        </button> --}}
      </div>
    </div>
  </div>
</div>
</div>
