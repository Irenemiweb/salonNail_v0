<div class="edit_customerForm_XJmIP" style="display:block">
    <div class="">
        <header style="background-color: transparent"
            class="b-custom-header b-custom-header_header_oZL1I b-custom-header_headerPadding_gg5dx">
            {{-- <div class="b-custom-header_left b-custom-header_hasIcon_uCjMI b-custom-header_hasIconEllipsis_gYB6P b-custom-header_left_bWmRf"> --}}
            <span class="b-icon iconFont icon-nav-arrow-left b-custom-header_icon_XtAgm"
                data-testid="b-custom-header-icon-back" style="font-size: 20px;padding-top: 7px;">
            </span>
            <div class="min-w-0 flex-1">
                <div data-testid="add-new-client-header"
                    class="b-custom-header_headerTitle_ogW55 txt--ellipsis _headerTitle_170cv_28 truncate">
                    <span class="b-custom-header_title_GTxIs b-custom-header_wordBreakAll_U_pxk"> Añadir nuevo
                        cliente </span>
                </div>
            </div>
            {{-- </div> --}}
            <div class="b-custom-header_right b-custom-header_right_uT_uU">
                <label for="89checkbox_blacklisted"
                    class="b-input-choice_container_aoM6F b-input-choice_containertoggler--revert_I2Vvu">
                    <div class="position-relative">
                        <x-panel-admin-administrator.clientes.botones.toggel />
                    </div>
                    <div class="b-input-choice_label_dgjUA b-input-choice_size--14_eTI26" style="margin-right: 8px;">
                        <div class="index_inputChoiceTitle_vWBIW"> ¿Activar las reservas online? </div>
                        {{-- <div class="index_inputChoiceDescription_RM6Yg"> sí </div> --}}
                    </div>
                </label>
                <div class="d-flex flex-column flex-sm-row gap-2">
                    <button style="padding: 1rem 20px;" type="button"
                        class="add-customer-button b-mr-4 b-button_button_QiVJW b-button_theme--secondary_Nu5MN"
                        data-testid="add-customer">Añadir</button>
                    <button style="padding: 1rem 20px;" type="button"
                        class="addInvit-customer-button b-button_button_QiVJW"
                        data-testid="add-and-invite-customer">Añadir e invitar</button>
                </div>
            </div>
        </header>
        <div class="layout-with-side-menu_wrapper_u82LO">
            {{-- menu lateral --}}
            <ul style="padding: 0px"
                class="index_menu_oOSnb layout-with-side-menu_menu_sGBG5 lateral-menu-info-clients">
                <li data-testid="general">
                    <div style="" data-testid="client_info_general"
                        class="b-list-item_item_e5SMN index_menuItem_ZFuFK index_menuItemActive_m3kE7">
                        <p class="b-list-item_text_K1ZUI">Información general</p>
                    </div>
                </li>
                <li data-testid="additional-info">
                    <div data-testid="client_info_additional" class="b-list-item_item_e5SMN index_menuItem_ZFuFK">
                        <p class="b-list-item_text_K1ZUI">Información adicional</p>
                    </div>
                </li>
                <li data-testid="privacy">
                    <div data-testid="client_info_privacy" class="b-list-item_item_e5SMN index_menuItem_ZFuFK">
                        <p class="b-list-item_text_K1ZUI">privacidad</p>
                    </div>
                </li>
            </ul>
            {{-- info general cliente --}}
            <div class="scrollable layout-with-side-menu_content_Q5C9O cambioTotal006">
                <div class="scrollable cambioTotal006" style="justify-content: center;">
                    {{-- contenido de pestañas --}}
                    {{-- info general --}}
                    <div class="index_wrapper_X2m39 index_tabContainer_Ji5zT client_info_general"
                        id="client_info_general">
                        {{-- imagen cliente --}}
                        <div class=" justify-content-center d-flex b-mb-4">
                            <div class="b-p-relative b-cursor-pointer">
                                <input id="avatarInput" type="file" accept="image/*" style="display: none;">
                                <div title=" " class="b-avatar_avatar_pJzSu"
                                    style="width: 76px; height: 76px; flex: 0 0 76px;">
                                    <div id="avatarPreview" class="b-avatar_avatarInitials_W2DQ5"
                                        style="font-size: 28px;"> </div>
                                </div>
                                <div class="index_avatarEdit_IgKa1 b-flex b-justify-center b-items-center b-p-absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"
                                        viewBox="0 0 24 24" role="img" class="b-icon">
                                        <path fill="currentColor" fill-rule="evenodd"
                                            d="M12 2a.9.9 0 0 1 .9.9v8.2h8.2a.9.9 0 0 1 0 1.8h-8.2v8.2a.9.9 0 1 1-1.8 0v-8.2H2.9a.9.9 0 1 1 0-1.8h8.2V2.9A.9.9 0 0 1 12 2Z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <div class="form-groupInput mb-3">
                                <input onfocus="initCountLeathersTextArea()" onclick="initCountLeathersTextArea()"
                                    type="text" placeholder=" " class="gualazonF" id="nombreCliente001"
                                    value="{{ old('nombreCliente001') }}" required name="nombreCliente001" />
                                <label for="nombreCliente001" class="styles_label_hleTI">Nombre</label>
                            </div>
                            <div class="form-groupInput mb-3">
                                <input onfocus="initCountLeathersTextArea()" onclick="initCountLeathersTextArea()"
                                    type="text" placeholder=" " class="gualazonF" id="apellidoCliente001"
                                    value="{{ old('apellidoCliente001') }}" required name="apellidoCliente001" />
                                <label for="apellidoCliente001" class="styles_label_hleTI">Apellido</label>
                            </div>
                            <div class="form-groupInput mb-3">
                                <input onfocus="initCountLeathersTextArea()" onclick="initCountLeathersTextArea()"
                                    type="text" placeholder=" " class="gualazonF" id="carnetNumeroCliente001"
                                    value="{{ old('carnetNumeroCliente001') }}" required
                                    name="carnetNumeroCliente001" />
                                <label for="carnetNumeroCliente001" class="styles_label_hleTI">Número de
                                    identificación fiscal</label>
                            </div>
                            <div class="">
                                <div class="b-row descuento_confianza" style="margin-left: auto;margin-right: auto;">
                                    <div class="b-col b-col-6" style="padding-right:11px;padding-left: 0px;">
                                        <div class="form-groupInput mb-3">
                                            <input onfocus="initCountLeathersTextArea()"
                                                onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                                class="gualazonF inputsNewService" id="descuentoCliente001"
                                                value="0%" required name="descuentoCliente001"
                                                onblur="verificarInput('titulo')"
                                                oninput="formatearPorcentaje(this)" />
                                            <label for="descuentoCliente001" class="styles_label_hleTI">Descuento
                                                cliente</label>
                                        </div>
                                    </div>
                                    <div class="b-col b-col-6 index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k index_trustedClient_psrIx b-mb-4"
                                        style="padding:0px;">
                                        <div class="index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k index_trustedClient_psrIx b-mb-4"
                                            data-testid="trusted-client-select">
                                            <div class="index_toggle_sBt35">
                                                <div data-testid="select-dropdown-">
                                                    <div class="styles_focusedOrFilled_dNjQS styles_size--md_sPOha styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T"
                                                        data-testid="select-input-">
                                                        <div onclick="abrirModalCategorias('.conteneforClienteConfianza')"
                                                            class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                                            <div class="styles_labelWrapper_isbmo"><label
                                                                    class="styles_label_hleTI"> Cliente de confianza
                                                                </label></div>
                                                            <div class="styles_wrapper_hb1CA"><input readonly
                                                                    value="No" placeholder="" id="uid-152-input"
                                                                    type="text" autocomplete="off"
                                                                    inputmode="text" class="styles_field_Bhxvq"
                                                                    style="min-width: 0px; text-transform: none;">
                                                                <div class="styles_slotRight_TkOzM"><i
                                                                        data-testid="select-input-toggle-"
                                                                        class="index_toggleIcon_EqQez"></i></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="conteneforClienteConfianza" style="display: none"
                                            class="conteneforClienteConfianza index_content_Z_JCn index_position_FV9jY index_position--bottom-left_prIxb index_position--bottom-left_prIxb33">
                                            <div class="scrollable index_scrollable_qm3Zl index_scrollable_BtJqS">
                                                <ul class="list" style="padding: 0px;margin: 0px;">
                                                    <li data-testid="dropdown-option-false">
                                                        <div data-option="No"
                                                            class="index_defaultItem_pKlHs index_--selected_oUDGp index_--highlighted__3J43">
                                                            <div class="index_defaultItemInner_HCCY6"> No </div>
                                                        </div>
                                                    </li>
                                                    <li data-testid="dropdown-option-true">
                                                        <div data-option="Si" style="border: none"
                                                            class="index_defaultItem_pKlHs index_defaultItemLast_G_jYj">
                                                            <div class="index_defaultItemInner_HCCY6"> Sí </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="font-weight: 800;" class="b-heading-xs b-my-4"> Contacto </div>
                                <div>
                                    <div class="form-groupInput mb-3">
                                        <input onfocus="initCountLeathersTextArea()"
                                            onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                            class="gualazonF" id="telefonoCliente001" value="" required
                                            name="telefonoCliente001" onblur="verificarInput('titulo')" />
                                        <label for="telefonoCliente001" class="styles_label_hleTI">Número de
                                            telefono</label>
                                    </div>
                                    <div class="form-groupInput mb-3">
                                        <input onfocus="initCountLeathersTextArea()"
                                            onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                            class="gualazonF" id="emailCliente001" value="" required
                                            name="emailCliente001" onblur="verificarInput('titulo')" />
                                        <label for="emailCliente001" class="styles_label_hleTI">Email</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- info adicional --}}
                    <div class="index_wrapper_X2m39 index_tabContainer_Ji5zT client_info_additional"
                        id="client_info_additional" style="display: none">
                        <div class="">
                            <div style="font-weight: 800;" class="b-heading-xs b-my-4"> Cumpleaños </div>
                            <div class="b-mb-6">
                                <div class="b-col">
                                    <div class="form-groupInput mb-3">
                                        <input onfocus="initCountLeathersTextArea()"
                                            onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                            class="gualazonF" id="cumpleCliente001"
                                            value="{{ old('nombreServicio') }}" required name="cumpleCliente001"
                                            onblur="verificarInput('titulo')" />
                                        <label for="cumpleCliente001" class="styles_label_hleTI">Fecha</label>
                                    </div>
                                </div>
                                <div class="main-box ubicacion-producto">
                                    <div style="font-weight: 800;" class="b-heading-xs b-my-4"> Dirección </div>
                                    <div class=" row tituloConMovimiento">
                                        <div class=" col">
                                            <p class="title_flojo mt-2 mb-2">
                                                Añadir dirección
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                    fill="none" viewBox="0 0 24 24" role="img"
                                                    class="b-text-secondary b-ml-3">
                                                    <path fill="currentColor" fill-rule="evenodd"
                                                        d="M12 2a.9.9 0 0 1 .9.9v8.2h8.2a.9.9 0 0 1 0 1.8h-8.2v8.2a.9.9 0 1 1-1.8 0v-8.2H2.9a.9.9 0 1 1 0-1.8h8.2V2.9A.9.9 0 0 1 12 2Z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </p>
                                        </div>
                                    </div>
                                    <div id="searchMap"></div>
                                    <div id="map" style="">
                                    </div>
                                </div>
                                <div style="font-weight: 800;" class="b-heading-xs b-my-4"> Resto dirección, puerta,
                                    piso ... (opcional) </div>
                                <div class="b-mb-6">
                                    <div class="b-col">
                                        <div class="form-groupInput mb-3">
                                            <input onfocus="initCountLeathersTextArea()"
                                                onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                                class="gualazonF" id="restoDireccionCliente001"
                                                value="{{ old('nombreServicio') }}" required
                                                name="restoDireccionCliente001" onblur="verificarInput('titulo')" />
                                            <label for="restoDireccionCliente001" class="styles_label_hleTI">Resto
                                                dirección</label>
                                        </div>
                                    </div>

                                </div>
                                {{-- datos Empresa --}}
                                <div style="font-weight: 800;" class="b-heading-xs b-my-4">Empresa</div>
                                {{-- Si hay datos de empresa --}}
                                <div class="add-info-company-client">
                                    <div class="_box_epq43_7 _addressPicked_epq43_31" data-testid="company-14278">
                                        <div class="_addressInfo_epq43_36">
                                            <div class="_addressInfoData_epq43_50">
                                                <p>Nombre Empresa</p>
                                                <p>NIF: 89562364</p>
                                                <p>calle palotes 33, 5-1, o barco valdeorras, 15190, A coruña, ES</p>
                                            </div>
                                        </div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-edit">
                                            <path fill="currentColor"
                                                d="M26.207 5.36a4.64 4.64 0 0 1 6.389-.165l.173.164 1.872 1.872a4.64 4.64 0 0 1 .164 6.389l-.164.173-19.58 19.58a1 1 0 0 1-.186.145l-.102.052a1 1 0 0 1-.15.051L6.122 35.94c-1.208.329-2.32-.728-2.092-1.928l.03-.134 2.328-8.534.039-.108a1 1 0 0 1 .15-.242l.05-.054zM7.773 27.415 5.969 34.03l6.613-1.804zM25.644 8.584 8.623 25.605l5.771 5.771 17.021-17.021zm5.794-1.894a2.757 2.757 0 0 0-3.762-.129l-.138.13-.563.562 5.771 5.771.564-.562a2.76 2.76 0 0 0 .242-3.623l-.118-.145-.124-.132z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                {{-- ----------- --}}
                                <div>
                                    <div class="_box_epq43_7" data-testid="add-company" data-bs-toggle="modal"
                                        data-bs-target="#modalDatosEmpresa">
                                        <div class="_boxText_epq43_20">Añadir detalles de la empresa</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14"
                                            viewBox="0 0 20 20" role="img"
                                            class="b-svg b-svg-name-plus _boxIcon_epq43_26">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                d="M19 9.4h-8.4V1a.6.6 0 1 0-1.2 0v8.4H1a.6.6 0 1 0 0 1.2h8.4V19a.6.6 0 1 0 1.2 0v-8.4H19a.6.6 0 1 0 0-1.2">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                {{-- añadir detalles empresa pequeño cuando hay datos empresa añadidos --}}
                                <div>
                                    <div class="_box_epq43_7 _boxSmall_epq43_17" data-testid="add-company">
                                        <div class="_boxText_epq43_20">Añadir detalles de la empresa</div><svg
                                            xmlns="http://www.w3.org/2000/svg" width="24" height="14"
                                            viewBox="0 0 20 20" role="img"
                                            class="b-svg b-svg-name-plus _boxIcon_epq43_26">
                                            <path fill="currentColor" fill-rule="evenodd"
                                                d="M19 9.4h-8.4V1a.6.6 0 1 0-1.2 0v8.4H1a.6.6 0 1 0 0 1.2h8.4V19a.6.6 0 1 0 1.2 0v-8.4H19a.6.6 0 1 0 0-1.2">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- acuerdo de privacidad --}}
                <div class="_tabContainer_ac6hy_30 client_info_privacy" id="client_info_privacy"
                    style="display: none">
                    <div class="_title_1hfe4_7">Acuerdos de privacidad</div>
                    <ul>
                        <li data-testid="false">
                            <div class="_agreement_1hfe4_13">
                                <label for="89checkbox_blacklisted"
                                    class="b-input-choice_container_aoM6F b-input-choice_containertoggler--revert_I2Vvu">
                                    <div class="position-relative">
                                        <div class="switch2">
                                            <label for="toggle-3" aria-label="Toggle Filter">
                                                <input type="checkbox" id="toggle-3" data-on="SI" data-off="NO">
                                            </label>
                                            <span class="led"></span>
                                        </div>

                                    </div>
                                    <div class="b-input-choice_label_dgjUA b-input-choice_size--14_eTI26"
                                        style="margin-right: 8px;">
                                        <div class="index_inputChoiceTitle_vWBIW"> Consentimiento para recibir
                                            ofertas de Forever Nails
                                        </div>

                                    </div>
                                </label>
                                <div class="_buttonWrapper_1hfe4_17">
                                    <button
                                        class="_button_vx3b8_7 _theme--secondary_vx3b8_34 _size--extra-small_vx3b8_122"
                                        type="button" data-testid="show-agreement-detais" data-bs-toggle="modal"
                                        data-bs-target="#modalConsentimientoRecibOfertas">Detalles</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- modal modalConsentimientoRecibOfertas --}}
<div class="modal fade" id="modalConsentimientoRecibOfertas" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="modalConsentimientoRecibOfertasLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <header class="_header_i3qpf_7">
                    <div class="size--28-b ml-4">Consentimiento para recibir ofertas de Africa Nail art
                        Studio</div>
                </header>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div>

                        <div class="_descriptionWrapper_i3qpf_12">
                            <div class="modal__description size--14 color-07">Acepto recibir de Africa Nail art
                                Studio, Praza
                                Da Estacion, 70, 32001, Ourense información comercial relativa a los
                                productos y servicios ofrecidos mediante comunicaciones electrónicas
                                (incluyendo la dirección de correo electrónico que ha proporcionado),
                                así como el uso de equipos de terminales de
                                telecomunicación y sistemas de llamadas automáticas, incluyendo llamadas de voz y
                                mensajes de texto, con fines de marketing.
                            </div>
                        </div>
                        <div class="mt-6"><button class="_button_vx3b8_7 w-full" type="button"
                                data-testid="close-agreement">Cerrar</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- Modal para seleccionar imagen --}}
<div id="cropModal" class="crop-modal">
    <header class="crop-confirm-btn">
        <div class="flex-1" style="display: flex; align-items: center; gap: 10px;">
            <button id="cropCloseBtn" class="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 40 40"
                    role="img" class="b-svg b-svg-name-x">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M10.596 8.646 20 18.05l9.404-9.404a1.379 1.379 0 0 1 1.95 1.95L21.949 20l9.405 9.404a1.379 1.379 0 0 1-1.95 1.95L20 21.949l-9.404 9.405a1.379 1.379 0 1 1-1.95-1.95L18.05 20l-9.404-9.404a1.379 1.379 0 1 1 1.95-1.95">
                    </path>
                </svg>
            </button>
            <h2 class="_title_1rpe1_51" style="margin-bottom: 0;">Añadir foto</h2>
        </div>
        <div class="_buttons_1rpe1_61">
            <button id="cropConfirmBtn"
                class="_button_15l74_7 _size--lg_15l74_23 _theme--default_15l74_39 _slotTheme--default_15l74_121 _submitButton_1k514_7"
                data-testid="add-image">
                <div class="_caption_15l74_19">Añadir</div>
            </button>
        </div>
    </header>

    {{-- <button id="cropConfirmBtn" class="crop-confirm-btn">Añadir</button> --}}

    <!-- Imagen -->
    <div class="crop-container">
        <img id="imageToCrop">
    </div>

</div>
{{-- modal datos de empresa --}}
<div class="modal fade" id="modalDatosEmpresa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="modalDatosEmpresaLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <header class="_header_i3qpf_7">
                    <div class="size--28-b ml-4">Detalles de la empresa</div>
                </header>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div>
                    <div>

                        <div class="_descriptionWrapper_i3qpf_12">
                            <div class="modal__description size--14 color-07">
                                <div class="b-col">
                                    <div class="form-groupInput mb-3">
                                        <input onfocus="initCountLeathersTextArea()"
                                            onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                            class="gualazonF flatpickr-input" id="nombreEmpresaCliente001"
                                            value="" required="" name="nombreEmpresaCliente001"
                                            onblur="verificarInput('titulo')">
                                        <label for="nombreEmpresaCliente001" class="styles_label_hleTI">Nombre de la
                                            empresa</label>
                                        <small class="error-text" id="error-nombreEmpresaCliente001"></small>
                                    </div>
                                </div>
                                <div class="b-col">
                                    <div class="form-groupInput mb-3">
                                        <input onfocus="initCountLeathersTextArea()"
                                            onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                            class="gualazonF flatpickr-input" id="nifEmpresaCliente001"
                                            value="" required="" name="nifEmpresaCliente001"
                                            onblur="verificarInput('titulo')">
                                        <label for="nifEmpresaCliente001" class="styles_label_hleTI">NIF</label>
                                    </div>
                                </div>
                                <div class="b-col">
                                    <div class="form-groupInput mb-3">
                                        <input onfocus="initCountLeathersTextArea()"
                                            onclick="initCountLeathersTextArea()" type="text" placeholder=" "
                                            class="gualazonF flatpickr-input" id="direccionEmpresaCliente001"
                                            value="" required="" name="direccionEmpresaCliente001"
                                            onblur="verificarInput('titulo')">
                                        <label for="direccionEmpresaCliente001"
                                            class="styles_label_hleTI">Dirección</label>
                                        <small class="error-text" id="error-direccionEmpresaCliente001"></small>
                                    </div>
                                </div>
                                {{-- ciudad, estado --}}
                                <div class="row">
                                    <div class="col col-6"
                                        style="padding: 0px !important;padding-right: 0.5rem !important;">
                                        <div class="relative _container_nq4h9_7 _error_mbwu1_7"
                                            data-testid="error-input">
                                            <div class="b-my-2 mx-0.5">
                                                <div data-testid="city" class="b-form-field">
                                                    <div class="form-groupInput mb-3">
                                                        <input type="text" placeholder=" "
                                                            class="gualazonF flatpickr-input"
                                                            id="ciudadEmpresaCliente001" value=""
                                                            required="" name="ciudadEmpresaCliente001">
                                                        <label for="ciudadEmpresaCliente001"
                                                            class="styles_label_hleTI">Ciudad</label>
                                                        <small class="error-text"
                                                            id="error-ciudadEmpresaCliente001"></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6" style="padding: 0px !important;">
                                        <div class="b-my-2 mx-0.5">
                                            <div data-testid="state" class="b-form-field">
                                                <div class="form-groupInput mb-3">
                                                    <input type="text" placeholder=" "
                                                        class="gualazonF flatpickr-input" id="estadoEmpresaCliente001"
                                                        value="" required="" name="estadoEmpresaCliente001">
                                                    <label for="estadoEmpresaCliente001"
                                                        class="styles_label_hleTI">Estado</label>
                                                    {{-- <small class="error-text" id="error-estadoEmpresaCliente001"></small> --}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {{-- codigo postal, pais --}}
                                <div class="row">
                                    <div class="col col-6"
                                        style="padding: 0px !important;padding-right: 0.5rem !important;">
                                        <div class="relative _container_nq4h9_7 _error_mbwu1_7"
                                            data-testid="error-input">
                                            <div class="b-my-2 mx-0.5">
                                                <div data-testid="city" class="b-form-field">
                                                    <div class="form-groupInput mb-3">
                                                        <input type="text" placeholder=" "
                                                            class="gualazonF flatpickr-input"
                                                            id="codigoPostalEmpresaCliente001" value=""
                                                            required="" name="codigoPostalEmpresaCliente001">
                                                        <label for="codigoPostalEmpresaCliente001"
                                                            class="styles_label_hleTI">Código Postal</label>
                                                        <small class="error-text"
                                                            id="error-codigoPostalEmpresaCliente001"></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-6" style="padding: 0px !important;">
                                        <div
                                            class="index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k b-select-duration_select_f9p18">
                                            <div class="index_toggle_sBt35">
                                                <div data-testid="select-dropdown-">
                                                    <div class="styles_container_pjyTj styles_focusedOrFilled_dNjQS styles_size--md_sPOha styles_theme--default_x92vh styles_slotTheme--blank_iI8Uf styles_slotTheme--default_vYr1T"
                                                        data-testid="select-input-">
                                                        <div onclick="abrirModalCategorias('.contenedorPaises');"
                                                            class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                                            <div class="styles_labelWrapper_isbmo">
                                                                <label class="styles_label_hleTI">Pais </label>
                                                            </div>
                                                            <div class="styles_wrapper_hb1CA justify-content-between">
                                                                <div class=" inputsNewService">
                                                                    España
                                                                </div>
                                                                <div class="styles_slotRight_TkOzM">
                                                                    <i class="index_toggleIcon_EqQez"></i>
                                                                </div>
                                                            </div>
                                                            <input hidden name="countryEmpresaCliente" value="España"
                                                                placeholder="" id="paisEmpresaCliente001"
                                                                type="" autocomplete="off" inputmode="text"
                                                                class="styles_field_Bhxvq"
                                                                style="min-width: 0px; text-transform: none;">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {{-- desplegable paises --}}
                                            <div class="contenedorPaises index_content_Z_JCn _position_1ului_17 _position--top-left_1ului_56"
                                                style="display: none;">
                                                <div class="scrollable index_scrollable_qm3Zl index_scrollable_BtJqS"
                                                    style="max-height: 150px;">
                                                    <ul class="list" style="padding-left: 0px!important">
                                                        @foreach ($paises as $pais)
                                                            <li>
                                                                @if ($pais->nombre == 'España')
                                                                    <div data-country="{{ $pais->nombre }}"
                                                                        class="index_defaultItem_pKlHs index_defaultItemLast_G_jYj index_--selected_oUDGp index_--highlighted__3J43">
                                                                        <div class="index_defaultItemInner_HCCY6">
                                                                            {{ $pais->nombre }}
                                                                        </div>
                                                                    </div>
                                                                @else
                                                                    <div data-country="{{ $pais->nombre }}"
                                                                        class="index_defaultItem_pKlHs index_defaultItemLast_G_jYj">
                                                                        <div class="index_defaultItemInner_HCCY6">
                                                                            {{ $pais->nombre }}
                                                                        </div>
                                                                    </div>
                                                                @endif
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                        {{-- <div class="b-my-2 mx-0.5">
                                            <div data-testid="state" class="b-form-field">
                                                <div class="form-groupInput mb-3">
                                                    <input type="text" placeholder=" "
                                                        class="gualazonF flatpickr-input" id="paisEmpresaCliente001"
                                                        value="" required="" name="paisEmpresaCliente001">
                                                    <label for="paisEmpresaCliente001"
                                                        class="styles_label_hleTI">País</label>
                                                </div>
                                            </div>
                                        </div> --}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div class="d-flex flex-column flex-sm-row gap-2" style="justify-content: space-around;">
                                <button style="padding: 1rem 20px;" type="button"
                                    class="add-infoEmpresa-button b-mr-4 b-button_button_QiVJW b-button_theme--secondary_Nu5MN"
                                    data-testid="add-customer">Guardar</button>
                                <button style="padding: 1rem 20px;" type="button"
                                    class="cancel-infoEmpresa-button b-button_button_QiVJW"
                                    data-testid="add-and-invite-customer">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
