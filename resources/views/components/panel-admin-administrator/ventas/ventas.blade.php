<div class="content1">
    <div id="loaderVentaRapida" class="loader d-none">
        <div class="spinner"></div>
    </div>
    @include('components.panel-admin-administrator.ventas.modales.modal-modificar-articulo')
    @include('components.panel-admin-administrator.ventas.modales.modal-descuento-total')
    @include('components.panel-admin-administrator.ventas.desplegables.desplegable-empleado')
    <x-panel-admin-administrator.ventas.modales.modal-introducir-importe/>
    <x-panel-admin-administrator.ventas.modales.modal-introducir-importe-tarjetas/>
    <x-panel-admin-administrator.ventas.modales.modal-cambiar-metodo-pago/>
    <div>

    </div>
    <div class="index_sales_X5DVI" id="index_sales_X5DVI">
        <div class="index_checkoutView_pvF8_">
            <div class="index_checkoutView_oS9m6 index_checkoutView_oS9m6Principal" style="">
            {{-- <x-panel-admin-administrator.ventas.pago-finalizado/> --}}
            {{-- <x-panel-admin-administrator.ventas.mail-recibo/> --}}
                {{-- aqui el contenido de paidWrapper --}}
                <div class="basket-layout_basketWrapper_HlQSH" style="">

                    <div class="salesNavigator-indexBasketContent" id="salesNavigator-indexBasketContent">
                        {{-- pestañas superiores data-bs-toggle="modal" data-bs-target="#modalCancelarVenta33"--}}
                        <div class="sales-navigation_salesNavigation__5XXN">
                            <div class="scrollable-x b-tabs_container_mpBHN b-tabs_containerDefault_qtxhU sales-navigation_tabs_wpot8">
                                <div class="b-tabs_content_lxbV0">
                                    <ul class="b-tabs_tabs_nYRc_ lista_transacciones">
                                        <li tabindex="-1" data-testid="checkout" class="b-tabs_tab_Gc2Ei b-tabs_tabDefault_Yt0P5 b-tabs_size--12_vzhd0 b-tabs_tabDefaultActive_CYkQd">
                                            Nueva venta</li>
                                        <li id="cargarPagosBtn" tabindex="0" data-testid="sales.transactions" class="b-tabs_tab_Gc2Ei b-tabs_tabDefault_Yt0P5 b-tabs_size--12_vzhd0" onclick="cargarPagosYRenderizar();">
                                            Transacciones</li>
                                        <li tabindex="0" data-testid="sales.invoices.list" class="b-tabs_tab_Gc2Ei b-tabs_tabDefault_Yt0P5 b-tabs_size--12_vzhd0">
                                            Facturas</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="index_basketContent_rYpG1 scrollable-desktop">
                            {{-- aquí es lo que cambia de las pestañas superiores --}}
                            <div class="row">
                                {{-- pestañas laterales --}}
                                <div class="col col-12 col-sm-3 index_basketContentCol_NtMrz" style="width:18%">
                                    <ul style="padding-left: 0px;width:14%" class="pestanias_laterales_ventaRapida">
                                        <li>
                                            <div data-testid="basket-menu-quick-sale" class="b-list-item_item_e5SMN index_menuItem_o_C42 index_menuItemActive_bAiPX">
                                                <p class="b-list-item_text_K1ZUI mb-0">Venta rápida</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div data-testid="basket-menu-appointments" class="b-list-item_item_e5SMN index_menuItem_o_C42">
                                                <p class="b-list-item_text_K1ZUI mb-0">Por cobrar</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div data-testid="basket-menu-services" class="b-list-item_item_e5SMN index_menuItem_o_C42">
                                                <p class="b-list-item_text_K1ZUI mb-0">Servicios</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div data-testid="basket-menu-products" class="b-list-item_item_e5SMN index_menuItem_o_C42">
                                                <p class="b-list-item_text_K1ZUI mb-0">Productos</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div data-testid="basket-menu-custom-amount" class="b-list-item_item_e5SMN index_menuItem_o_C42">
                                                <p class="b-list-item_text_K1ZUI mb-0">Cantidad personalizada</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div data-testid="basket-menu-custom-amount" class="b-list-item_item_e5SMN index_menuItem_o_C42">
                                                <p class="b-list-item_text_K1ZUI mb-0">Suscripciones</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="divContenedorVentaRapida basket-menu-quick-sale col col-12 col-sm-9 index_basketContentCol_NtMrz" id="divContenedorVentaRapidaBasket-menu-quick-sale">
                                    {{-- LOADER TARJETAS CUADRADAS --}}
                                     <div id="loaderVentaRapidaLiveWire" class="loaderVentaRapida bg-light grid-loader">
                                        @foreach (range(1, 15) as $i)
                                            <div class="loaderouter">
                                                <div class="smcard-loader">
                                                    <div class="image1"></div>
                                                    <div class="content639">
                                                        {{-- <div class="line short"></div> --}}
                                                        <div class="line long"></div>
                                                        <div class="line long"></div>
                                                        <div class="line medium"></div>
                                                        <div class="line long"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                    {{-- aqui dentro es lo que cambia de las pestañas laterales --}}
                                    {{-- VENTA RÁPIDA --}}
                                    {{-- <x-panel-admin-administrator.ventas.pestania-lateral.venta-rapida/> --}}
                                    @livewire('ventas.venta-rapida')
                                </div>
                                {{-- PESTAÑA "POR COBRAR" --}}
                                <div class="divContenedorVentaRapida basket-menu-appointments col col-12 col-sm-9 index_basketContentCol_NtMrz d-none" id="divContenedorVentaRapidaBasket-menu-appointments">
                                    {{-- LOADER TERJETA ALARGADA --}}
                                    <div id="loaderVentaRapidaNotPAY" class="loaderVentaRapida bg-light" style="display: block;margin-top: 2rem;height: -webkit-fill-available;">
                                            @foreach (range(1, 7) as $i)
                                                <div class="loaderouter noaderNotPay mb-3 mt-3" style="">
                                                    <div class="smcard-loader2">
                                                        <div class="image2"></div>
                                                        <div class="image3"></div>
                                                        <div class="content639">
                                                            <div class="line short2"></div>
                                                            <div class="line medium"></div>
                                                            <div class="line long"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            @endforeach
                                            {{-- <div class="spinner"></div> --}}
                                        </div>
                                    <div class="index_basketWrap_Uiqyr">
                                        <div class="height-100">
                                            <div class="height-100">
                                                <div class="scrollable-x b-tabs_container_mpBHN margin-bottom-16">
                                                    {{-- -- --}}
                                                    <div class="b-tabs_content_lxbV0">
                                                        <ul class="b-tabs_tabs_nYRc_ b-tabs_tabsBordered_yoE3l b-tabs_size--14_SADcU">
                                                            <li class="li-citas-finalizar-tasas li-citas262 b-tabs_tab_Gc2Ei b-tabs_tabBordered_CjuJV b-tabs_tabBorderedActive_ff9lg" tabindex="-1" data-testid="sales">
                                                                <div class="">Citas</div>
                                                                {{-- -- --}}
                                                                {{-- -- --}}
                                                            </li>
                                                            <li class="li-citas-finalizar-tasas li-sinFinalizar262 b-tabs_tab_Gc2Ei b-tabs_tabBordered_CjuJV" tabindex="0" data-testid="nav_unfinished">
                                                                <div class="">Sin finalizar</div>
                                                                {{-- -- --}}
                                                                {{-- -- --}}
                                                            </li>
                                                            <li class="li-citas-finalizar-tasas li-tasas262 b-tabs_tab_Gc2Ei b-tabs_tabBordered_CjuJV" tabindex="0" data-testid="deposits">
                                                                <div class="">Tasas de cancelación</div>
                                                                {{-- -- --}}
                                                                {{-- -- --}}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {{-- -- --}}
                                                </div>
                                                <div class="styles_container_pjyTj styles_size--sm_dOZPQ styles_theme--default_x92vh b-input-search_field_enuVF margin-bottom-16" data-testid="appointments-search">
                                                    <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                                        {{-- -- --}}
                                                        <div class="styles_wrapper_hb1CA">
                                                            <div class="styles_slotLeft_k29Ng"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-search b-input-search_icon_HSN65"><path fill="currentColor" d="M16.8 2.933c7.658 0 13.867 6.21 13.867 13.867 0 3.445-1.257 6.597-3.337 9.022l9.424 9.424a1.067 1.067 0 0 1-1.408 1.597l-.1-.089-9.424-9.424a13.8 13.8 0 0 1-9.022 3.337c-7.658 0-13.867-6.21-13.867-13.867S9.143 2.933 16.8 2.933m0 2.134c-6.48 0-11.733 5.253-11.733 11.733S10.32 28.533 16.8 28.533 28.533 23.28 28.533 16.8 23.28 5.067 16.8 5.067"></path></svg></div><input id="uid-1038-input" type="search" role="search" autocomplete="off" inputmode="text" class="styles_field_Bhxvq" placeholder="Buscar..." value="" style="min-width: 0px;">
                                                            {{-- -- --}}
                                                            {{-- -- --}}
                                                        </div>
                                                        {{-- -- --}}
                                                    </div>
                                                    {{-- -- --}}
                                                </div>
                                                {{-- EN CASO DE NO HABER NINGUNA TRANSACCIÓN POR COBRAR --}}
                                                <div class="noHayTransaccionesParaCobrar b-empty-placeholder_container_jSbur index_noResults_nPiXA d-none">
                                                    <div class="b-image_image_QfpQF b-empty-placeholder_image_qDGRU" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/505b8295/img/empty-appointments.c27c9262.svg&quot;); background-size: contain; width: 128px; height: 52px; padding-top: 0px;"></div>
                                                    <p class="b-empty-placeholder_title_BNhv7 b-empty-placeholder_size--16_rr609">No hay citas por cobrar</p>
                                                    <small class="b-empty-placeholder_description_B6M7l b-empty-placeholder_size--14_hdWAE">Parece que todas las citas han sido cobradas.</small>
                                                </div>
                                                {{-- TRANSACCIONES POR COBRAR  FINALIZADAS--}}
                                                <div id="booking-notPay_end_all33" class="booking-notPay_end_all33 b-inifinite-scroll b-infinite-scroll_scrollable_X8X5F scrollable index_wrapperScroll_wSCCx" style="height: calc(100vh - 392px);min-height: 20rem;">
                                                    <div class="b-infinite-scroll_content_uwl9t">
                                                        <div class="booking-not-pay_all">

                                                            <div class="booking-notPay_end_hoy">

                                                            </div>
                                                            <div class="booking-notPay_end_ayer">

                                                            </div>
                                                            <div class="booking-notPay_end_resto">

                                                            </div>
                                                        </div>
                                                        <div class="b-infinite-scroll_detectorWrapper_fUQYx">
                                                            <div class="b-infinite-scroll_detector_bvPUz" style="height: 10px;"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="staff-commission-modal_inputCheckbox_o1PHa" style="font-size: small;margin-top:1.5rem">
                <label for="uid-288-dont-ask-againReservNotPay" class="input-checkbox_container_mDORR">
                    <div class="input-checkbox_wrapper_NqLQ_">
                        <input id="uid-288-dont-ask-againReservNotPay" type="checkbox" name="dont-ask-again" class="input-checkbox_realCheck_gWLaj" value="false">


                        <div class="input-checkbox_replacement_dMLsRNopay">
                            <span class="b-icon iconFont icon-tick input-checkbox_tick_tp1sR" style="font-size: 20px;"></span>
                        </div>
                        <span class="input-checkbox_label_JiaJg"></span>
                    </div>
                </label>
                No volver a mostrar la ventana asignación empleado (puedes editar las asignaciones de venta haciendo clic en cada uno de los artículos del carrito)
            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {{-- MODAL PARA SELECCIONAR EMPLEADO Y GUARDAR --}}
                                {{-- modal asignar venta --}}
                                <div class="modal fade" id="asignarVentaReservaNoPay" tabindex="-1" aria-labelledby="asignarVentaReservaNoPayModalLabel" data-idService="">
                                    <div class="modal-dialog">
                                        <div class=" modal-content">
                                            <div class="modal-body modal__body common_modal_brpwf"  style="width: 600px;">
                                                <div class="modal__header">
                                                    <header>
                                                        <span data-bs-dismiss="modal" aria-label="Close" class="b-cursor-pointer b-icon iconFont icon-x" data-date="header-icon" style="font-size: 32px;"></span>
                                                        <h1 data-date="header-title"> Asignar venta </h1>
                                                    </header>
                                                </div>
                                                <div class="modal__content">
                                                    <div>
                                                        <div>
                                                            <div class=" w-100 padding-top-48">
                                                                <div class="row" style="margin-left: -2px;">
                                                                    <div class="col txt--left">
                                                                        <span class="size--10 color-08 txt--uppercase">Artículo</span>
                                                                    </div>
                                                                </div>
                                                                <hr class="margin-top-4 margin-bottom-12">
                                                                <ul style="padding-left: 0px;" class="listaServiciosNotPayModal">
                                                                    {{-- <li>
                                                                        <div class="row items-center txt--left" style="margin-left: -4px;">
                                                                            <div class="col">
                                                                                <div class="staff-commission-modal_serviceBorder_abb67" style="border-color:{{ $servicio->borderColor }};">
                                                                                    <div class="size--14">
                                                                                            {{ $servicio->nombre }}
                                                                                        @if ($servicio->horaNewService > 0)
                                                                                            ({{ $servicio->horaNewService }}h {{ $servicio->minutosNewService }}min)
                                                                                        @else
                                                                                            ({{ $servicio->minutosNewService }}min)
                                                                                        @endif
                                                                                    </div>
                                                                                    <div class="size--12 color-08"> {{ $servicio->precio }}€ </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col col-5">
                                                                                <div class="b-dropdown_dropdown_SqLbd">
                                                                                    <div>
                                                                                        <label class="size--12 color-08 select-staffer_label_tsQBi"> Empleado </label>
                                                                                        <div data-date="staffer-select-opendropdown" class="select-staffer_stafferInputSelect_Diw1V" onclick="openModalEmpleAreservNoPay();">
                                                                                            <div title="No hay asignación de personal" class="titleEmpleadoReservNotPay padding-0 b-avatar_avatar_pJzSu b-avatar_avatarHasImage_i8yay" style="width: 40px; height: 40px; flex: 0 0 40px;">
                                                                                                <div class="b-avatar_avatarImage_u3RVD" style="background-image: url(https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/no-staffer.79c3c577.svg);"></div>
                                                                                            </div>
                                                                                            <div data-index="cualquiera" class="nombreEmpleadoReservNotPay margin-left-8 size--16 txt--ellipsis size--16-sb"> No hay asignación de personal </div>
                                                                                            <span class="margin-left-auto b-icon iconFont icon-arrow-down"></span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr class="margin-top-12 margin-bottom-12">
                                                                    </li> --}}
                                                                </ul>
                                                                {{-- desplegable empleados 2--}}
                                                                <div style="top: 255px;" class="d-none b-dropdown_body_ZYrNH b-dropdown_body_ZYrNH44 b-dropdown_position-bottom-right_TGiDy droponAbrirEmpleadoReservNoPay">
                                                                    <div class="b-dropdown_content_ewBMO" style="width: 16.1rem;float: inline-end;">
                                                                        <div class="select-staffer_staffersDropdown_CC3_Z">
                                                                            @foreach ($empleados as $index2 =>$empleado )
                                                                                <div class="select-staffer_highlight_tt5tB" data-date="select-staffer-id-187824">
                                                                                    <div data-index="{{ $empleado->id }}" class="padding-12 select-staffer_staffer_qp27E" onclick="selectEmpleAMark(null, '{{ $empleado->nombre }} {{ $empleado->primerApellido }}', this, '{{ $empleado->id }}', '.droponAbrirEmpleadoReservNoPay', '.nombreEmpleadoReservNotPay', '.titleEmpleadoReservNotPay')">
                                                                                        <div title="{{ $empleado->nombre}} {{ $empleado->primerApellido }}" class="padding-0 b-avatar_avatar_pJzSu" style="width: 40px; height: 40px; flex: 0 0 40px;">
                                                                                            @if ($empleado->nombre === 'África')
                                                                                                <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> ÁP </div>
                                                                                            @else
                                                                                                <div class="b-avatar_avatarInitials_W2DQ5" style="font-size: 16px;"> MÁ </div>
                                                                                            @endif
                                                                                        </div>
                                                                                        <div class="margin-left-8 size--16-sb txt--ellipsis"> {{ $empleado->nombre }} {{ $empleado->primerApellido }}</div>
                                                                                        {{-- al clicar insertamos el span que es el tick --}}
                                                                                    </div>
                                                                                </div>
                                                                            @endforeach
                                                                            <div class="select-staffer_highlight_tt5tB">
                                                                                <div data-index="cualquiera" class="padding-12 select-staffer_staffer_qp27E" onclick="selectEmpleAMark(null, 'No hay asignación de personal', this, 'cualquiera', '.droponAbrirEmpleadoReservNoPay', '.nombreEmpleadoReservNotPay', '.titleEmpleadoReservNotPay')">
                                                                                    <div title="No hay asignación de personal" class="padding-0 b-avatar_avatar_pJzSu b-avatar_avatarHasImage_i8yay" style="width: 40px; height: 40px; flex: 0 0 40px;">
                                                                                        <div class="b-avatar_avatarImage_u3RVD" style="background-image: url(https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/no-staffer.79c3c577.svg);"></div>
                                                                                    </div>
                                                                                    <div class="margin-left-8 size--16 color-07 txt--ellipsis"> No hay asignación de personal </div>
                                                                                    <span class="margin-left-auto b-icon iconFont icon-tick" style="font-size: 24px;"></span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="margin-top-68">
                                                                <div class="flex padding-top-12">
                                                                    <div class="b-confirm_container_EQ68J b-confirm_reverse_o9BL7 w-100 staff-commission-modal_confirmContainer_S6zBk">
                                                                        <button data-bs-dismiss="modal" onclick="insertDateServiceNotPay()" id="" class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt b-confirm_button_IBwA3 b-confirm_confirmButton_pGIAs" data-date="confirm-btn">
                                                                            <div class="index_caption_W6r_J">Guardar</div>
                                                                        </button>
                                                                        <button data-bs-dismiss="modal" id="" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--default_pktIt b-confirm_button_IBwA3 b-confirm_cancelButton_qqGj3" data-date="cancel-btn">
                                                                            <div class="index_caption_W6r_J">Cancelar</div>
                                                                        </button>
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
                                {{-- FIN MODAL --}}
                            </div>
                        </div>
                    </div>
                    {{-- vista pagar tipos de pagod --}}
                    <div id="index_checkoutView_pvF8_VistaPagos" class="h-100 index_scrollable_WEBRx index_checkoutView_pvF8_" style="display: none">
                        <div class="padding-h-24 h-100 index_basketWrap_Iw20N index_basketWrap_UiqyrMetodosPago">
                            <header class="header_header_kgQXj">
                                <div class="b-custom-header_left b-custom-header_hasIcon_uCjMI b-custom-header_hasIconEllipsis_gYB6P b-custom-header_left_bWmRf">
                                    <span class="b-icon iconFont icon-nav-arrow-left b-custom-header_icon_XtAgm"  onclick="atrasMetodoPagoPropina();" data-testid="b-custom-header-icon-back" style="font-size: 24px;"></span>
                                    <div>
                                        <div data-testid="header" class="b-custom-header_headerTitle_ogW55 txt--ellipsis">
                                            <span class="b-custom-header_title_GTxIs b-custom-header_wordBreakAll_U_pxk" onclick="atrasMetodoPagoPropina();"> Método de pago y propina </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="" style="display:flex; justify-content: center;">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#modalCancelarVenta33" class="b-button_button_QiVJW b-button_theme--danger_EEM01 b-button_size--extra-small_Z9rd5 header_button_zmS9m">Cancelar venta</button>
                                </div>
                            </header>
                            <p class="col size--18-b margin-bottom-16">Método de pago</p>
                            <div class="row row--gutter-8 margin-bottom-32 margin-bottom32MetodoPago payment-types_theme--inline_V_YxB">
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="efectivo">
                                    <div class="size--14 payment-types_paymentMethod_gcJrJ payment-types_paymentMethodActive_vBa20">
                                        <div class="payment-types_paymentMethodIconWrap_C3La3">
                                            <span class="b-icon iconFont icon-cash" style="font-size: 20px;"></span>
                                        </div>
                                        <div class="payment-types_paymentMethodLabel_syffh">Efectivo</div>
                                    </div>
                                </div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="Terminal de tarjeta física"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-credit-card" style="font-size: 24px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">Terminal de tarjeta física</div></div></div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="Bizum"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-check" style="font-size: 20px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">Bizum</div></div></div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="American Express"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-american-express" style="font-size: 16px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">American Express</div></div></div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="PayPal"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-paypal" style="font-size: 20px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">PayPal</div></div></div>
                                <div style="pointer-events: none;" class="col col--gutter-8 payment-types_col_ius7E" data-type="Pago fraccionado"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-split-payment" style="font-size: 24px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">Pago fraccionado</div></div></div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="Suscripción"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-membership" style="font-size: 20px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">Suscripción</div></div></div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="Tarjeta regalo"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-giftcard" style="font-size: 20px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">Tarjeta regalo</div></div></div>
                                <div class="col col--gutter-8 payment-types_col_ius7E" data-type="Bono de sesiones"><div class="size--14 payment-types_paymentMethod_gcJrJ"><div class="payment-types_paymentMethodIconWrap_C3La3"><span class="b-icon iconFont icon-package" style="font-size: 20px;"></span></div><div class="payment-types_paymentMethodLabel_syffh">Bono de sesiones</div></div></div>

                            </div>
                            <p data-tipoPago2="efectivo" class="tipoPago2 col size--18-b margin-bottom-16">Pago</p>
                            <div class="row margin-bottom-16 cambioMostrarOcultar">
                                <div class="col col-auto">
                                    <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_size--lg_RQ276 styles_theme--default_x92vh styles_slotTheme--default_vYr1T">
                                        <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                            <div class="styles_labelWrapper_isbmo">
                                                <label class="styles_label_hleTI">Cantidad</label>
                                            </div>
                                            <div class="styles_wrapper_hb1CA">
                                                <div class="styles_slotLeft_k29NgPrecioModificarCesta"> € </div>
                                                <input data-type="efectivo" value=""  id="uid-317-inputMetodoPago" name="item_priceMetodoPago" type="text" autocomplete="on" inputmode="text" class="styles_field_Bhxvq" style="min-width: 0px; text-transform: none;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col txt--right"><p style="margin-bottom: 0px" class="color-08 txt--uppercase">Cambio</p><p class="color-08 cambio_800">0,00 €</p></div>
                            </div>
                            {{-- EN CASO DE PAGO COMBINADO UN TANTO CON BIZUN OTRO EFECTIVO(EJEMPLO) --}}
                            <div class="pagoCombinado66">

                            </div>


                        </div>
                    </div>
                    {{-- div de momento vacío --}}
                    <div class="v-tour"> </div>
                    <div class="basket-layout_sidebar_X6qEm">
                        <div class="index_basket_mditR">
                            <div class="scrollable index_basketHeader_oeM3c" style="overflow: auto">
                                {{-- seleccionar cliente o deja en blanco --}}
                                <div class="margin-bottom-12">
                                    <div data-testid="basket-customer-card" class="basket-customer-card0101">
                                        <div class="b-shadow-card customer-card_emptyCustomer_XKrcQ card_empty_ventas customer-card_isWalkIn__KcSW pointer" onclick="clicTarjetasBlancasSelectCliente(this)">
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
                                    </div>
                                </div>

                                {{-- div vista tarjetas servicio cobrar calendar --}}
                                <div class="margin-bottom-12">
                                    <div class="b-shadow-card appointment-card_appointment_F_IwZ margin-top-8" style="display: none">
                                        <div class="appointment-card_appointmentContent_pQhcr">
                                            <div class="appointment-date_date_UsCxi appointment-card_appointmentDate_MDDuS">
                                                {{-- <div class="appointment-date_month_nFAjw appointment-date_size--12_Z4is5">abr.</div>
                                                <div class="appointment-date_day_zpfF4 appointment-date_size--20_BC_a_">21</div>
                                                <div class="appointment-date_hour_isz2C appointment-date_size--12_Z4is5">10:00</div> --}}
                                            </div>
                                            <div>
                                                <div class="statusReservaCalendarCobrar style_status_xxjlV style_statusDefault_HPmTE style_status--xs_vvmA5 style_statusUpperCase_bkX7Z style_statusGreen_lW62O b-ml-0 b-mb-1"></div>
                                                <div class="tarjetasServiciosCobrarCalendar056">
                                                    {{-- <div class="appointment-card_appointmentService_gsMNj">
                                                        <div class="appointment-card_appointmentServiceBar_BvsJO"></div>
                                                        <p style="margin-bottom: 0px" class="size--14 txt--ellipsis margin-left-12">Manicura clásica</p>
                                                    </div>
                                                    <div class="appointment-card_appointmentService_gsMNj">
                                                        <div class="appointment-card_appointmentServiceBar_BvsJO"></div>
                                                        <p style="margin-bottom: 0px" class="size--14 txt--ellipsis margin-left-12">Manicura clásica</p>
                                                    </div> --}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="appointment-card_appointmentClose_W4B_o">
                                            <button data-testid="delete-appointment" class="botonCerrarTarjeta028">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-x">
                                                    <path fill="currentColor" fill-rule="evenodd" d="M10.596 8.646 20 18.05l9.404-9.404a1.379 1.379 0 0 1 1.95 1.95L21.949 20l9.405 9.404a1.379 1.379 0 0 1-1.95 1.95L20 21.949l-9.404 9.405a1.379 1.379 0 1 1-1.95-1.95L18.05 20l-9.404-9.404a1.379 1.379 0 1 1 1.95-1.95"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div class="index_basketContent_WUvZW" style="">
                                    <div class="basketFull d-none">
                                        <div class="row index_basketHeaderRow_RJa3U">
                                            <div class="col col-6">
                                                <div class="size--10 color-07">Artículo</div>
                                            </div>
                                            <div class="col col-6 txt--right">
                                                <div class="size--10 color-07">Cantidad</div>
                                            </div>
                                            <div class="col col-12"><hr class="index_hr_bNIZC"></div>
                                        </div>

                                        <ul class="basket-transactions-list" data-testid="basket-transactions-list" style="padding-left: 0px;margin-bottom: 0rem;">
                                            {{-- div descuento si lo hay
                                            <div class="row margin-bottom-0">
                                                <div class="col padding-bottom-0">
                                                    <div class="size--12 color-07"></div>
                                                </div>
                                                <div class="col col-4 padding-bottom-0">
                                                    <div class="size--12 color-07 txt--right"> Descuento 8% </div>
                                                </div>
                                            </div> --}}
                                            {{-- <li>

                                            </li> --}}
                                        </ul>

                                        <div class="index_basketRowsHint_S5CyP">
                                            <span class="color-12 margin-right-4 b-icon iconFont icon-tap" style="font-size: 12px;"></span>
                                            <span class="size--10-sb color-08 txt--uppercase"> Seleccionar artículo para modificar </span>
                                        </div>
                                        <div class="row margin-top-4">
                                            <div class="col col-8">
                                                <div class="size--12 color-07 txt--right">Subtotal</div>
                                            </div>
                                            <div data-testid="basket-subtotal" class="col col-4">
                                                <div class="divSubtotal size--12 txt--right">0€</div>
                                            </div>
                                        </div>
                                        <hr class="index_hr_bNIZC">
                                        <div class="row items-center margin-top-4 pointer descuentoTotal" data-bs-toggle="modal" data-bs-target="#descuentoTotal" onclick="actualizarPorcentajeTotal();">
                                            <div class="col col-auto">
                                                <button type="button" class="b-button_button_QiVJW b-button_theme--icon_mi9ao index_shadowButton_SVBaz" data-testid="basket-add-discount">
                                                    <span class="b-icon iconFont icon-plus" type="font" style="font-size: 11px;"></span>
                                                </button>
                                            </div>
                                            <div data-v-step="5" data-testid="basket-discount-porcentaje" class="col col-4">
                                                <div class="size--12 color-07 txt--right basket-discountPorcentajeShow">0%</div>
                                            </div>
                                            <div class="col">
                                                <div class="size--12 color-07 txt--right">Descuento</div>
                                            </div>
                                            <div data-v-step="5" data-testid="basket-discount" class="col col-4">
                                                <div class="size--14-sb txt--right basket-discountShow">0,00 €</div>
                                            </div>
                                            <div class="col col-12"><hr class="index_hr_bNIZC"></div>
                                        </div>
                                        <div data-testid="basket-consumption" class="row items-center pointer margin-top-12">
                                            {{-- <div class="col col-auto">
                                                <button type="button" class="b-button_button_QiVJW b-button_theme--icon_mi9ao index_shadowButton_SVBaz">
                                                    <span class="b-icon iconFont icon-inventory" type="font" style="font-size: 16px;"></span>
                                                </button>
                                            </div>
                                            <div class="col col-auto">
                                                <div class="size--12 color-07 txt--right">Gasto</div>
                                            </div> --}}
                                            <div data-testid="assigned-staffer" class=" text-center" style="display: grid">
                                                <div class="d-flex justify-content-between">
                                                <p style="font-size: .875rem;font-weight: 700;">Responsable:</p>
                                                <div class="margin-left-8 margin-right-8 size--14 txt--ellipsis size--14-sb responsableCobro"> No hay asignación de personal </div>
                                                </div>
                                                <button data-responsable="assined-staffer-responsable" style="width: 100%" id="" data-index="0" class="pointert index_button_TfmOz index_size--sm_z95WM index_theme--default_AtMGF index_slotTheme--icon_yiHCJ assigned-staffer_assignedStafferButton_XHCi1 margin-left-auto" data-testid="assigned-staffer-edit-commission" data-bs-toggle="modal" data-bs-target="#droponAbrirEmpleBotonCambiar" onclick="showEmpleDesple(this)">
                                                    <div class="index_slotLeft_p6NJx">
                                                        <img src="https://d10n9ka7jp2kfo.cloudfront.net/pro/dc6927ba/img/comission-edit.b159197c.svg" class="padding-left-8 b-icon_img_I0kuC" style="height: 14px;"></div>
                                                    <div class="index_caption_W6r_J"> Seleccionar responsable </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- div vacío --}}
                                    <div data-testid="empty-basket" class="index_basketEmpty_VF3Lr">
                                        <div>
                                            <p class="size--16 margin-bottom-12">La cesta está vacía</p>
                                            <p class="size--14 color-07">Selecciona artículos que quieres añadir a la cesta.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {{-- totales --}}
                            <div class="index_basketFooter_xZHxG">
                                <p class="txt--right margin-top-20 color-07 txt--uppercase txt--s">Total</p>
                                <p data-testid="basket-total" class="txt--right margin-bottom-8 heading--1">
                                    <span class="basketTotalPrecio">0,00 €</span>
                                </p>
                                {{-- botones disabled venta rápida --}}
                                <div class="row botonesDisabledVentaRapida">
                                    <div class="col col-auto col--narrower">
                                        <button id="uid-82-input" disabled="disabled" class="index_button_TfmOz index_is--disabled_w97Nq index_size--lg_I9GTR index_theme--alert_unNNB index_theme--default_AtMGF index_slotTheme--icon_yiHCJ" data-testid="basket-delete">
                                            <div class="index_slotLeft_p6NJx">
                                                <span class="b-icon iconFont icon-trash" style="font-size: 32px;"></span>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col col--narrower b-pl-0">
                                        <button id="uid-84-input" disabled="disabled" class="index_button_TfmOz index_is--disabled_w97Nq index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
                                            <div class="index_caption_W6r_J">Continuar</div>
                                        </button>
                                    </div>
                                </div>
                                {{-- botones enabled papelera venta rápida abrir modal desde boton--}}
                                <div class="botonesEnabledVentaRapidaSoloPapelera row d-none">
                                    <div class="col col-auto col--narrower">
                                        <button data-bs-toggle="modal" data-bs-target="#modalCancelarVenta33" id="uid-137-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--alert_unNNB index_theme--default_AtMGF index_slotTheme--icon_yiHCJ" data-testid="basket-delete">
                                            <div class="index_slotLeft_p6NJx">
                                                <span class="b-icon iconFont icon-trash" style="font-size: 32px;"></span>
                                            </div>
                                        </button>
                                    </div>
                                   <div class="col col--narrower b-pl-0">
                                        <button id="uid-84-input" disabled="disabled" class="index_button_TfmOz index_is--disabled_w97Nq index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
                                            <div class="index_caption_W6r_J">Continuar</div>
                                        </button>
                                    </div>
                                </div>

                                {{-- botones enabled venta rápida abrir modal desde boton--}}
                                <div class="botonesEnabledVentaRapida row d-none">
                                    <div class="col col-auto col--narrower">
                                        <button data-bs-toggle="modal" data-bs-target="#modalCancelarVenta33" id="uid-137-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--alert_unNNB index_theme--default_AtMGF index_slotTheme--icon_yiHCJ" data-testid="basket-delete">
                                            <div class="index_slotLeft_p6NJx">
                                                <span class="b-icon iconFont icon-trash" style="font-size: 32px;"></span>
                                            </div>
                                        </button>
                                    </div>
                                    <div class="col col--narrower b-pl-0 insertPayButton">
                                        <button onclick="continueButtonPayment()" id="uid-139-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt index_resolveBtn_PxyxB" data-testid="continue-btn" style="width: 100%;">
                                            <div class="index_caption_W6r_J botonCambiarTitulo"> Continuar </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index_checkoutView_oS9m6 index_checkoutView_oS9m6Secundario">

            </div>
        </div>
    </div>
    {{-- contenedor de transacciones --}}
    @include('components.panel-admin-administrator.ventas.ventas-transacciones')
    @include('components.panel-admin-administrator.ventas.modales.modal-mostrar-recibo')
</div>
