<div>
    <div id="loaderSperaAdministrator2" class="loader d-none">
        <div class="spinner"></div>
    </div>
    <div class="index_settingsContainer_MIteR" style="">
        <div class="" style="overflow: hidden;">
            <div class="b-h-100p b-w-100p width-100 height-100">
                <div>
                    <header class="paddingEnlace b-custom-header b-custom-header_header_oZL1I b-custom-header_headerPadding_gg5dx">
                        <div
                            class="b-custom-header_left b-custom-header_hasIcon_uCjMI b-custom-header_hasIconEllipsis_gYB6P b-custom-header_left_bWmRf">
                            <span class="configuracionReservaAtras b-icon iconFont icon-nav-arrow-left b-custom-header_icon_XtAgm"
                                data-testid="b-custom-header-icon-back" style="font-size: 20px;"></span>
                            <div>
                                <div data-testid="header" class="b-custom-header_headerTitle_ogW55 txt--ellipsis"><span
                                    class="b-custom-header_title_GTxIs b-custom-header_wordBreakAll_U_pxk">
                                    Historial modificaciones de reservas </span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="row">

                        <div class="col-12 col-lg-9 historialModificacionesReservas" style="max-height: 79vh; overflow: auto;height:100%">
                            <div class="table-responsive">
                                <table class="table table-hover" id="tablaHistorialReservas" style="margin-bottom: 0px !important;min-height: 33rem;">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Acción</th>
                                            <th scope="col">Responsable</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Empleada</th>
                                            <th>ID Grupo</th>
                                            <th scope="col">Cambios</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tablaHistorialReservasBody"></tbody>
                                </table>
                            </div>
                            {{-- <div id="timelineHorizontal" class="timeline-horizontal"></div> --}}
                        </div>
                        <div class="col-12 col-lg-3 mb-3 filtrosModificacionesResevas" style="background: #fff;border-radius: 8px;min-height: 30rem;margin-auto;margin-bottom: 0px !important;margin:auto">
                            <div class="row">
                                {{-- seleccionar fecha --}}
                                <div class="col-md-4 col-lg-12">
                                    <div class="index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k">
                                        <div class="index_toggle_sBt35">
                                            <div class="select-dropdowColorService">
                                                <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T">
                                                    <div onclick="" style="min-width: 0px" class="styles_outerWrapper_NumuG">
                                                        <div class="styles_labelWrapper_isbmo">
                                                            <label for="fecha" class="styles_label_hleTI">Filtrar por fecha</label>
                                                        </div>
                                                        <div class="">
                                                            <div class="" style="width: 100%" >
                                                                <input type="date" id="filtroFechaHistorial" class="inputsNewService" style="max-width:none!important;width: 100%;border: none;background-color: white;padding: 0px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {{-- selecciona cliente --}}
                                <div class="col-md-4 col-lg-12">
                                    <div class="index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k">
                                        <div class="index_toggle_sBt35">
                                            <div class="select-dropdowColorService">
                                                <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T">
                                                    <div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSelectClientHistorialReserva" aria-controls="offcanvasSelectClientHistorialReserva" onclick="" style="min-width: 0px" class="styles_outerWrapper_NumuG">
                                                        <div class="styles_labelWrapper_isbmo">
                                                            <label for="cliente" class="styles_label_hleTI">Cliente</label>
                                                        </div>
                                                        <div class="styles_wrapper_hb1CA justify-content-between">
                                                            <div class="inputsNewService styles_slotLeft_k29NgClienteHistorialModificaReserva" >
                                                                {{-- <img data-color="randomColor" width="24px" style="height: 24px;" class="b-icon_img_I0kuC index_colorPicker_dCcsj" src="http://localhost/laravel/salon-manicura-git/public/storage/colors_option/random-color.svg" alt="colores"> --}}
                                                                Selecciona cliente.
                                                            </div>
                                                            <div class="styles_slotRight_TkOzM">
                                                                <i class="index_toggleIcon_EqQez"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {{-- por empleado --}}
                                <div class="col-md-4 col-lg-12">
                                    @php
                                        $data = [
                                                'contenedor' => 'contenedorEmpleadosHistorialModificacionReservas',
                                                'botonClic' =>'styles_outerWrapper_HistorialModificacionReservas',
                                                'input' => 'uid-inicio-input-HistorialModificacionReservas',
                                                'slotLeft_k29' => 'styles_slotLeft_k29NgHistorialModificacionReservas',
                                                'id_desplegableEmpleado' => 'selectEmpleModalHistorialModificacionReservas',
                                                'visualizadorNombreEmple' =>'slotEmpleadoHistorialModificacionReservas',
                                                'mostrarOpcionTodos' => 'd-block'
                                            ];
                                    @endphp
                                    <x-panel-admin-administrator.citas.modal-select-emple :data="$data" />
                                </div>
                                {{-- por responsable de la modificacion --}}
                                <div class="col-md-4 col-lg-12">
                                    <div class="index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k">
                                        <div class="index_toggle_sBt35">
                                            <div class="select-dropdowColorService">
                                                <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T">
                                                    <div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSelectResponsableHistorialReserva" aria-controls="offcanvasSelectResponsableHistorialReserva" onclick="" style="min-width: 0px" class="styles_outerWrapper_NumuG">
                                                        <div class="styles_labelWrapper_isbmo">
                                                            <label for="cliente" class="styles_label_hleTI">Responsable modificación</label>
                                                        </div>
                                                        <div class="styles_wrapper_hb1CA justify-content-between">
                                                            <div class="inputsNewService styles_slotLeft_k29NgTodosUsersHistorialModificaReserva" >
                                                                {{-- <img data-color="randomColor" width="24px" style="height: 24px;" class="b-icon_img_I0kuC index_colorPicker_dCcsj" src="http://localhost/laravel/salon-manicura-git/public/storage/colors_option/random-color.svg" alt="colores"> --}}
                                                                Selecciona responsable.
                                                            </div>
                                                            <div class="styles_slotRight_TkOzM">
                                                                <i class="index_toggleIcon_EqQez"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- offcanva seleccionar cliente --}}
    @php
        $id_inputSearchClient2 = 'inputSearchClientHistorialModificacionesReservas';
        $accion_resolver2 = 'historialModificacionReserva';
        $id_offcanvas2 = 'offcanvasSelectClientHistorialReserva';
        $mostrar_opcion_todos_clientes2 = 'd-block';
        $visualizador_nombre2 = 'styles_slotLeft_k29NgClienteHistorialModificaReserva';
    @endphp
    <x-panel-admin-administrator.ventas.offcanvas.elegir-cliente
        :idInputSearchClient="$id_inputSearchClient2"
        :accionResolver="$accion_resolver2"
        :idOfcanvas="$id_offcanvas2"
        :mostrarOpcionTodos="$mostrar_opcion_todos_clientes2"
        :visualizadorNombre="$visualizador_nombre2"
    />
     {{-- offcanva seleccionar responsable todos --}}
      @php
        $id_inputSearchClient3 = 'inputSearchResponsableHistorialModificacionesReservas';
        $accion_resolver3 = 'historialModificacionReservaResponsable';
        $id_offcanvas3 = 'offcanvasSelectResponsableHistorialReserva';
        $mostrar_opcion_todos_clientes3 = 'd-block';
        $visualizador_nombre = 'styles_slotLeft_k29NgTodosUsersHistorialModificaReserva';
    @endphp
    <x-panel-admin-administrator.ventas.offcanvas.offcanvas-elegir-todos
        :idInputSearchClient="$id_inputSearchClient3"
        :accionResolver="$accion_resolver3"
        :idOfcanvas="$id_offcanvas3"
        :mostrarOpcionTodos="$mostrar_opcion_todos_clientes3"
        :visualizadorNombre="$visualizador_nombre"
    />
    {{-- modal que muestra los cambios de la modificacion --}}
    <div class="modal fade" id="modalCambiosReserva" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Detalle de cambios</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body" id="modalCambiosContenido"></div>

        </div>
    </div>
</div>

</div>
