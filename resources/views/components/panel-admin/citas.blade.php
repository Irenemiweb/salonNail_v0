<div>
@php
use Illuminate\Support\Str;
@endphp
    <div id="botonesTaxdata" class="container hero justify-content-center d-flex" style="">
        <div class=" UploadStepTemplate position-relative"
            style="background-color:transparent!important;border:none!important;transform: scale(0.9);">
            <div>
                <div class=" row ">
                    {{-- <span id="barraDesplazadora" class="gualazon-tabs__indicator" style="width: 137px; left:14px"></span> --}}
                    <div class="" style="display:flex; z-index:99;">
                        <button onclick="cambiarBoton('botonProximas');" style="min-width:140px"
                            class="losdos citasTerProx rounded-pill --selected" id="botonProximas">Citas
                            Próximas</button>
                        <button onclick="cambiarBoton('botonTerminadas');" style="min-width:140px"
                            class="losdos citasTerProx rounded-pill" id="botonTerminadas">Citas Terminadas</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- modal preguntar si quiere cancelar cita --}}
     <x-reserva.servicio.offcanva-reserva-add-service/>
    <x-reserva.servicio.modal-services-selected/>
<x-reserva.servicio.offcanva-reserva-servicio :servicios="$servicios"/>
   <!-- Modal -->
<!-- Vertically centered modal -->
<div class="modal fade" id="modalPreguntaCancelarCita" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalPreguntaCancelarCitaLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
   <div class="modal-content">
      <div class="modal-header" style="border-bottom: none;!important;padding-bottom: 0px !important;">
        {{-- <h1 class="modal-title fs-5" id="modalPreguntaCancelarCitaLabel">Modal title</h1> --}}
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="    padding-top: 0px !important;">
        <div class="b-flex b-flex-column b-justify-between b-h-100p b-pt-6 b-px-4">
            <div class="md:b-mb-10 purify_1Z6orhDtSQZUILk-N4R8GQ==">
                <div class="b-flex b-items-center b-justify-end">
                    {{-- <button type="button" data-testid="close-icon" class="b-px-0 b-button b-line-base b-button-lite b-button-icononly b-button-size-xs purify_kor-DHlneZEARZEgcKfFCg==">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="img" width="24" height="24" class="b-button-icon b-icon b-text-default">
                        <path fill="currentColor" fill-rule="evenodd" d="M3.265 3.265a.9.9 0 0 1 1.272 0L12 10.727l7.463-7.462a.9.9 0 1 1 1.272 1.272L13.273 12l7.462 7.463a.9.9 0 0 1-1.272 1.272L12 13.273l-7.463 7.462a.9.9 0 0 1-1.272-1.272L10.727 12 3.265 4.537a.9.9 0 0 1 0-1.272z" clip-rule="evenodd"></path>
                        </svg>

                    </button> --}}
                </div>
                <section class="b-flex b-flex-column b-items-center b-justify-center b-text-center">
                    <div class="b-mb-4 b-icon-circle b-bg-default-lt b-text-default b-icon-circle-size-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="img" width="24" height="24" class="b-icon">
                        <path fill="currentColor" d="M13.373 4.367a1.364 1.364 0 1 1-2.728 0 1.364 1.364 0 0 1 2.728 0zm-2.669 4.672a.388.388 0 0 0-.389.388v1.477c0 .185.131.345.313.38l.473.11a.388.388 0 0 1 .312.38v8.84c0 .214.174.388.389.388h1.103a.388.388 0 0 0 .388-.389V9.427a.388.388 0 0 0-.388-.388h-2.201z"></path>
                        </svg>
                    </div>
                    <h2 data-testid="title" class="b-h1 b-font-bold b-line-base b-mb-3">
                        ¿Prefieres reprogramar esta cita?
                    </h2>
                    <p data-testid="content">
                        Sabemos que las cosas cambian, pero recuerda que si necesitas modificar la fecha o la hora de tu cita, puedes reprogramarla en lugar de cancelarla.
                    </p>
                    <p data-testid="subcontent" class="b-mt-8">
                        ¿Seguro que quieres cancelar esta cita?
                    </p>
                    <div data-testid="appointment-info" class="b-mt-8">
                        <span data-testid="appointment-info-services" class="b-block">
                            {{-- Manicura clásica --}}
                        </span>
                        <span data-testid="appointment-info-time" class="b-block">
                            {{-- sábado, nov. 29, 2025, 19:00 --}}
                        </span>
                    </div>
                </section>
            </div>
            <div class="contenedorBotonesPreguntarCancelRepro b-flex b-flex-column b-justify-center b-flex-gap-4 b-mb-4 purify_Pr1QY8Le3s+fUvAUQE5oJQ==">
                <button type="button" data-testid="reprogramarCitaPregunta"
                    class="b-button b-line-base b-button-primary b-button-color-sea purify_kor-DHlneZEARZEgcKfFCg== purify_2mvUXxs7EcISOD+4ZEmjzw==">
                    <span class="b-button-text">
                    Reprogramar cita
                    </span>
                </button>
                <button type="button" data-testid="cancelarCitaPregunta2" class="b-button b-line-base b-button-color-red purify_kor-DHlneZEARZEgcKfFCg== purify_2mvUXxs7EcISOD+4ZEmjzw==">
                    <span class="b-button-text">
                    Cancelar cita
                    </span>
                </button>
            </div>
        </div>

      </div>
      {{-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div> --}}
    </div>
</div>
</div>


    {{-- citas proximas --}}
    <div class="citasProcimasContainer" id="citasProcimasContainer">
        @foreach ($citasProximas as $index => $citaProxima)
            <div class="purify_k0v4ZT-8fQhKC1hT7Aq0iQ== purify_yuDAM9gFmI4nZWPibEYwiA== purify_rVQl9be0GWxMBAq-kDQNHQ== citaProximaDiv">
                <div class="">
                    <a onclick="mostrarDetalleCita({{ $citaProxima->id }})" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasCita" style="text-decoration: none;cursor: pointer;">
                        <div
                            class="purify_+Zj7hZGL16EFdy+wDf0BwQ== purify_Rptxv+WbCltBTrvcW8QtrQ== purify_HFhzTPIOh83XROVz6Wt4AA==">
                            <div class="purify_ifFp4rtZeiPB1hvBeJD6Tw==">
                                {{-- <p>{{ $citaProxima->cliente_confirmo_modificacion }} modificación {{ $citaProxima->date_time }}</p> --}}
                                @if($citaProxima->cliente_confirmo_modificacion === 'confirmado')
                                    <div class="
                                        @if ($citaProxima->status === 'pending' || $citaProxima->status === 'Finalizada') purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_YDeoXrcjLlEdNmPC-e55Hw== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==
                                        @elseif ($citaProxima->status === 'cancelled') purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_Mq+0nEBBXOo2GlJ3m+Dovg== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==
                                        @elseif ($citaProxima->status === 'no_asistida') bg-warning text-black purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==
                                        @elseif ($citaProxima->status === 'confirmed') purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw== @endif
                                        purify_Ks8Q8dHEaaaFeDYdNtADtw==">
                                        <div style="gap: 8px" class="purify_BvwlhtQUrrEk5Sq16VFwnQ== purify_QbXCjCEw-iVf0ii07PXHcA==">
                                            @if($citaProxima->status === 'confirmed')
                                                <svg style="width: 20px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5M3 16C3 8.82 8.82 3 16 3s13 5.82 13 13-5.82 13-13 13S3 23.18 3 16m19.224-3.69a1 1 0 0 1-.034 1.414l-7.337 7a1 1 0 0 1-1.381-.001l-3.663-3.5a1 1 0 0 1 1.382-1.446l2.972 2.84 6.647-6.34a1 1 0 0 1 1.414.033" clip-rule="evenodd"></path></svg>
                                            @endif
                                            {{ __($citaProxima->status) }}
                                        </div>
                                    </div>
                                @else
                                    <div class="purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_BbCPen5nLAPoZiEuvZs9fw== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==">
                                        <div class="purify_BvwlhtQUrrEk5Sq16VFwnQ== purify_QbXCjCEw-iVf0ii07PXHcA==" style="display:contents">
                                            {{-- -- --}}
                                            Por favor , confirmar
                                        </div>
                                    </div>
                                @endif
                                <div class="purify_Hcg+wuoQ5pNJqZZO2m8O7w==">
                                    <div class="">
                                        <div class="purify_NNhEf2PzlSRJmXRVgyW6sw==">
                                            <div class="purify_KbwpHGxX92tcKePw27ZpHQ==">
                                                @if ($citaProxima->numero_servicios > 1)
                                                    <div
                                                        class="purify_m0iNFIlsGaFmqMFgHvuv6w== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ==">
                                                    {{ $citaProxima->servicio->nombre }} + {{ $citaProxima->numero_servicios - 1 }} artículos más
                                                    </div>
                                                @else
                                                    <div
                                                        class="purify_m0iNFIlsGaFmqMFgHvuv6w== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ==">
                                                        {{ $citaProxima->servicio->nombre }}
                                                    </div>
                                                @endif
                                                {{-- <div class="purify_uEe8eX9C6ZHaEZ3YWKPaAA== purify_bGpd2qde6bN8-doCZN4Uvw== purify_EArZoL4QVSiTmRib1mvsPg== purify_m9mNOPjpHD0tNTW6GC+hEw==">
                                                Pago: Pendiente.
                                            </div> --}}
                                            </div>
                                            <div>
                                                @if ($citaProxima->status !== 'pagado')
                                                    <div class="purify_5DKVeLWnv-4fPlLWMtmBaQ==">
                                                        <div>
                                                            Pago pendiente.
                                                        </div>
                                                        <div data-testid="service-price">
                                                             @if ($citaProxima->numero_servicios > 1)
                                                                {{ $citaProxima->precio_total }}€
                                                            @else
                                                                {{ $citaProxima->servicio->precio }}€
                                                            @endif
                                                        </div>
                                                    </div>
                                                @else
                                                    <div class="purify_5DKVeLWnv-4fPlLWMtmBaQ==">
                                                        <div>
                                                            Pago Realizado.
                                                        </div>
                                                        <div data-testid="service-price">
                                                             @if ($citaProxima->numero_servicios > 1)
                                                                {{ $citaProxima->precio_total }}€
                                                            @else
                                                                {{ $citaProxima->servicio->precio }}€
                                                            @endif
                                                        </div>
                                                    </div>
                                                @endif
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            @php
                                $fecha = \Carbon\Carbon::parse($citaProxima->date_time);
                            @endphp
                            <div class="purify_hsCP+NQTCqJkf+lbwAN4FA== purify_Sardy6hfiet162IZ2pYFPA== purify_m9mNOPjpHD0tNTW6GC+hEw== purify_9hcoDI6SWlEpcfAmG1bmSw==">
                                <div class="">
                                    {{-- {{ $fecha->translatedFormat('M') }}  --}}
                                    {{ $fecha->translatedFormat('M Y') }}
                                </div>
                                <div
                                    class="purify_FuEGVRcYA+olaP+n5-JrWA== purify_Sardy6hfiet162IZ2pYFPA== purify_r7cfvxYj81mnUA2sO2edaA==">
                                    {{ $fecha->format('d') }} {{-- Día del mes --}}
                                </div>
                                <div></div>
                                <div class="">
                                    {{ $fecha->format('H:i') }} {{-- Hora en formato 24 horas --}}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
    </div>
    {{-- citas terminadas --}}
    <div class="citasTerminadasContainer" style="display: none" id="citasTerminadasContainer">
        @foreach ($citasTerminadas as $index => $citaTerminada)
            <div class="purify_k0v4ZT-8fQhKC1hT7Aq0iQ== purify_yuDAM9gFmI4nZWPibEYwiA== purify_rVQl9be0GWxMBAq-kDQNHQ== citaTerminadaDiv">
                <div class="">
                    <a onclick="mostrarDetalleCita({{ $citaTerminada->id }})" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasCita" style="text-decoration: none;cursor: pointer;">
                        <div
                            class="purify_+Zj7hZGL16EFdy+wDf0BwQ== purify_Rptxv+WbCltBTrvcW8QtrQ== purify_HFhzTPIOh83XROVz6Wt4AA==">
                            <div class="purify_ifFp4rtZeiPB1hvBeJD6Tw==">
                                <div
                                    class="
                                @if ($citaTerminada->status === 'pending' || $citaTerminada->status === 'Finalizada') purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_YDeoXrcjLlEdNmPC-e55Hw== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==
                                @elseif ($citaTerminada->status === 'cancelled') purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_Mq+0nEBBXOo2GlJ3m+Dovg== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==
                                @elseif ($citaTerminada->status === 'no_asistida') bg-warning text-black purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==
                                @elseif ($citaTerminada->status === 'confirmed') purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw== @endif
                                purify_Ks8Q8dHEaaaFeDYdNtADtw==
                            ">
                                    {{-- <div class="{{ $citaProxima->status === 'pending' ? 'bg-warning text-black purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==' : 'purify_Ks8Q8dHEaaaFeDYdNtADtw== purify_D1nq2s-huXm2lObUUwFyqA== purify_my7kvaO77EFZtdkGbwjvyA== purify_kq4BZr36QXoLgkAnN95TWw==' }} "> --}}
                                    <div style="gap: 8px" class="purify_BvwlhtQUrrEk5Sq16VFwnQ== purify_QbXCjCEw-iVf0ii07PXHcA==">
                                        <svg style="width: 20px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill-rule="evenodd" d="M16 5C9.925 5 5 9.925 5 16s4.925 11 11 11 11-4.925 11-11S22.075 5 16 5M3 16C3 8.82 8.82 3 16 3s13 5.82 13 13-5.82 13-13 13S3 23.18 3 16m19.224-3.69a1 1 0 0 1-.034 1.414l-7.337 7a1 1 0 0 1-1.381-.001l-3.663-3.5a1 1 0 0 1 1.382-1.446l2.972 2.84 6.647-6.34a1 1 0 0 1 1.414.033" clip-rule="evenodd"></path></svg>
                                        {{ __($citaTerminada->status) }}
                                        {{-- {{ $citaProxima->status }} --}}
                                    </div>
                                </div>
                                <div class="purify_Hcg+wuoQ5pNJqZZO2m8O7w==">
                                    <div class="">
                                        <div class="purify_NNhEf2PzlSRJmXRVgyW6sw==">
                                            <div class="purify_KbwpHGxX92tcKePw27ZpHQ==">
                                                @if ($citaTerminada->numero_servicios > 1)
                                                    <div
                                                        class="purify_m0iNFIlsGaFmqMFgHvuv6w== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ==">
                                                    {{ $citaTerminada->servicio->nombre }} + {{ $citaTerminada->numero_servicios - 1 }} artículos más
                                                    </div>
                                                @else
                                                    <div
                                                        class="purify_m0iNFIlsGaFmqMFgHvuv6w== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ==">
                                                        {{ $citaTerminada->servicio->nombre }}
                                                    </div>
                                                @endif
                                                {{-- <div class="purify_uEe8eX9C6ZHaEZ3YWKPaAA== purify_bGpd2qde6bN8-doCZN4Uvw== purify_EArZoL4QVSiTmRib1mvsPg== purify_m9mNOPjpHD0tNTW6GC+hEw==">
                                                Pago: Pendiente.
                                            </div> --}}
                                            </div>
                                            <div>
                                                @if ($citaTerminada->status !== 'pagado')
                                                    <div class="purify_5DKVeLWnv-4fPlLWMtmBaQ==">
                                                        <div>
                                                            Pago pendiente.
                                                        </div>
                                                        <div data-testid="service-price">
                                                             @if ($citaTerminada->numero_servicios > 1)
                                                                {{ $citaTerminada->precio_total }}€
                                                            @else
                                                                {{ $citaTerminada->servicio->precio }}€
                                                            @endif
                                                        </div>
                                                    </div>
                                                @else
                                                    <div class="purify_5DKVeLWnv-4fPlLWMtmBaQ==">
                                                        <div>
                                                            Pago Realizado.
                                                        </div>
                                                        <div data-testid="service-price">
                                                             @if ($citaTerminada->numero_servicios > 1)
                                                                {{ $citaTerminada->precio_total }}€
                                                            @else
                                                                {{ $citaTerminada->servicio->precio }}€
                                                            @endif
                                                        </div>
                                                    </div>
                                                @endif
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            @php
                                $fecha = \Carbon\Carbon::parse($citaTerminada->date_time);
                            @endphp
                            <div
                                class="purify_hsCP+NQTCqJkf+lbwAN4FA== purify_Sardy6hfiet162IZ2pYFPA== purify_m9mNOPjpHD0tNTW6GC+hEw== purify_9hcoDI6SWlEpcfAmG1bmSw==">
                                <div class="">
                                    {{-- {{ $fecha->translatedFormat('M') }}  --}}
                                    {{ $fecha->translatedFormat('M Y') }}
                                </div>
                                <div
                                    class="purify_FuEGVRcYA+olaP+n5-JrWA== purify_Sardy6hfiet162IZ2pYFPA== purify_r7cfvxYj81mnUA2sO2edaA==">
                                    {{ $fecha->format('d') }} {{-- Día del mes --}}
                                </div>
                                <div></div>
                                <div class="">
                                    {{ $fecha->format('H:i') }} {{-- Hora en formato 24 horas --}}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        @endforeach
    </div>
      <x-usuario.menu-cita-proxima/>
       {{-- Modal Bootstrap Añadir al Calendario --}}
        <div class="modal fade" id="modalCalendario" tabindex="-1" aria-labelledby="modalCalendarioLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalCalendarioLabel">Añadir cita al calendario</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
               <div class="modal-body text-center">
                <p>Elige tu calendario:</p>
                <div class="d-flex justify-content-around align-items-center">
                     {{-- Google --}}
                    <div class="cal-icon">
                    <a href="#" class="add-google" title="Google Calendar">
                        <img src="https://www.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_16_2x.png" alt="Google Calendar" width="48">
                    </a>
                    </div>
                     {{-- Outlook --}}
                    <div class="cal-icon">
                    <a href="#" class="add-outlook" title="Outlook">
                        <img style="" class="mensajes" src="{{ asset('storage/images/microsoft.svg') }}" alt="outlook" width="48" />

                    </a>
                    </div>
                     {{-- Apple / Otros --}}
                    <div class="cal-icon">
                    <a href="#" class="add-ics" download="cita.ics" title="Apple / Otros">
                        <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="Apple otros">
                    </a>
                    </div>
                    <div class="cal-icon text-center">
    <a style="text-decoration: none; color: black;" href="#" class="add-ics" download="cita.ics" title="Otros">
        <h3>
            Otros
            {{-- Icono de información --}}
            <i class="bi bi-info-circle"
               data-bs-toggle="tooltip"
               data-bs-placement="top"
               title="Se descargará un archivo (.ics). Ábrelo para añadir la cita a tu calendario.">
            </i>
        </h3>
        <img src="{{ asset('storage/images/otrosCalendarios.png') }}" alt="Otros" style="position: relative; top: -10px;">
    </a>
</div>

                </div>
                </div>

                </div>
            </div>
        </div>
            <script>
                const BASE_URL = "{{ url('/') }}";
            </script>
</div>
