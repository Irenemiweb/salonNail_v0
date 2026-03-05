  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCita" aria-labelledby="offcanvasCitaLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasCitaLabel" style="display:contents">Detalle de la cita</h5>
                <button style="float: right" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
            </div>
            <div class="offcanvas-body">
                <div id="detalleCitaContent">
                    <!-- Aquí se cargará el contenido dinámicamente -->
                </div>

                {{-- <hr> --}}

                <div class="opciones-cita">
                     {{-- @if($citaProxima->cliente_confirmo_modificacion === 'confirmado') --}}
                        <div class="opciones-citaAgrupado" style="display: inherit">
                            <div class="opcion-item">
                                <div class="icon-circle">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708" />
                                    </svg>
                                </div>
                                <span>Cancelar cita</span>
                            </div>
                            <hr />
                            <div class="opcion-item">
                                <div class="icon-circle">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>

                                </div>
                                <span>Cambiar cita</span>
                            </div>

                            <hr />
                            <div class="opcion-item addCalendar">
                                <div class="icon-circle">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-calendar-plus" viewBox="0 0 16 16">
                                        <path
                                            d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7" />
                                        <path
                                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                    </svg>
                                </div>
                                <span>Añadir al calendario</span>
                            </div>
                            <hr />
                            <div class="opcion-item">
                                <div class="icon-circle">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                </div>
                                <span>Cómo llegar</span>
                            </div>
                            <hr />
                            <div class="opcion-item">
                                <div class="icon-circle">
                                    <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                                        <path
                                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                                    </svg>
                                </div>
                                <span>Información del establecimiento</span>
                            </div>
                        </div>
                        {{-- @else --}}
                        {{-- CONFIRMAR CAMBIOS EN LA CITA --}}
                            <div class="purify_siUht8CO7Jw59vB3aOMNGA== botonesConfirmarModificacionReservaUser" style="display:none">
                                <div class="purify_UcTaF-PNaUTOZU43Q8O7OQ==">
                                </div>
                                <div class="">
                                    <div class="purify_KhUpRwXoVTwRN61nU7Q-8g==">
                                        <button data-testid="aceptarCamBioCita" class="purify_d6tJdf1yW+SzGWXMuHrJsw== purify_AIxGJFcxLuleSQ+CRhaTgA== purify_xuICO5Uat1wjy-IchCAvoQ== purify_PKrQ8dPCqlSY+jU1ryPF6A== purify_OGkAbDLb+QsMv4JzzeUxIw== purify_i5GszhGef-HGfTwxTvFINA== purify_dho4u8ASQ8Ll-t7sUhgC+Q==" style="width: 100%;">
                                            Aceptar
                                        </button>
                                    </div>
                                    <div class="cambiarRechazarButon d-flex gap-2 mt-2">
                                        <button data-testid="cancelarCambioCita" class="purify_F7c3ZyVeB3QitTFcwqQ50A== purify_h5tTTvl69-u68qCeau19Xw== purify_BdDl+8X55B4tFBbX4JduFg== purify_9hcoDI6SWlEpcfAmG1bmSw== purify_kq4BZr36QXoLgkAnN95TWw== purify_AMwT3GfjPQNo3cAiuYd-hQ== purify_tjeIoPh8xL3hcXLLCwn38w==" style="width: 100%; margin:0px!important">
                                            Rechazar
                                        </button>
                                        <button data-testid="cambiarCambioCita" class="purify_d6tJdf1yW+SzGWXMuHrJsw== purify_AIxGJFcxLuleSQ+CRhaTgA== purify_xuICO5Uat1wjy-IchCAvoQ== purify_PKrQ8dPCqlSY+jU1ryPF6A== purify_OGkAbDLb+QsMv4JzzeUxIw== purify_i5GszhGef-HGfTwxTvFINA== purify_dho4u8ASQ8Ll-t7sUhgC+Q==" style="width: 100%;margin:0px!important">
                                            Cambiar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        {{-- @endif --}}
                    <hr />
                    {{-- informacion del servicio --}}
                    <div class="Overview_self__Cn2QV">

                    </div>
                    <p class="_-wKLAw u4xD5w font-default-body-s-regular">Ref. de la reserva: DCE96BF3</p>
                    {{-- ------------------------ --}}
                </div>
            </div>
        </div>

