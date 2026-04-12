<div>
    <div class="b-scrollable b-w-100p h-full">
        <div class="b-container b-container-wide h-full">
            <div class="_promoteContent_1ia2l_7 b-px-6 b-m-0">
                <div class="_invite_3swam_7" data-testid="import-and-invite-clients-view">
                    <header style="background-color: transparent"
                        class="b-custom-header b-custom-header_header_oZL1I b-custom-header_headerPadding_gg5dx">

                        <span
                            class="exit_export_contacts  {{ $clientes->isEmpty() ? 'emptyClients' : '' }} b-icon iconFont icon-nav-arrow-left b-custom-header_icon_XtAgm"
                            data-testid="exit_export_contacts" style="font-size: 20px;padding-top: 7px;"
                            id="exit_export_contacts">
                        </span>
                        <div class="min-w-0 flex-1">
                            <div data-testid="add-new-client-header"
                                class="b-custom-header_headerTitle_ogW55 txt--ellipsis _headerTitle_170cv_28 truncate">
                                <span class="b-custom-header_title_GTxIs b-custom-header_wordBreakAll_U_pxk">
                                    Importar e invitar a clientes</span>
                            </div>
                        </div>

                        <div class="b-custom-header_right b-custom-header_right_uT_uU">
                            <div class="b-custom-header_right _right_170cv_20">
                                <div class="_theme--default_1g06a_44 _size--lg_1g06a_85 mr-4">
                                    <div class="_buttonWrapper_1g06a_7">
                                        <div class="_markWrapper_1g06a_25">
                                            <div class="_markContainer_1g06a_29">
                                                <div class="_questionMark_1g06a_37">?</div>
                                            </div>
                                        </div>
                                        <div class="_buttonText_1g06a_41">Cómo funciona</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="_content_3swam_12">
                        {{-- pestañas superiores --}}
                        <div class="scrollable-x _container_pvhha_12 _containerDefault_pvhha_18 _tabs_3swam_21">
                            <div class="_content_pvhha_25">
                                <ul class="_tabs_pvhha_43">
                                    @if ($clientes->isNotEmpty())
                                        <li class="_tab_pvhha_43 _tabDefault_pvhha_66 _tabDefaultActive_pvhha_78"
                                            tabindex="-1" data-testid="invite_to_book">
                                            <div>Invita a reservar</div>
                                        </li>
                                    @endif

                                    <li class="_tab_pvhha_43 _tabDefault_pvhha_66
                                        {{ $clientes->isEmpty() ? '_tabDefaultActive_pvhha_78' : '' }}"
                                        tabindex="-1" data-testid="import_and_invite">
                                        <div>Importar</div>
                                    </li>

                                    <li class="_tab_pvhha_43 _tabDefault_pvhha_66" tabindex="0"
                                        data-testid="quick_invite">
                                        <div>Invitación rápida</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="_tabContent_3swam_24">
                            {{-- tab vista qr --}}
                            <div class="_importFromXlsx_nqvuz_7 import_and_invite" id="import_and_invite"
                                style="display: {{ $clientes->isEmpty() ? 'block' : 'none' }};">
                                <div class="b-flex b-items-center b-flex-column b-pb-12">
                                    <div class="b-flex b-items-center b-flex-column b-pb-8 _container_4f3ma_7">
                                        <div data-testid="qrcode-container" class="_qrCodeContainer_4f3ma_11 b-p-2">
                                            {!! $qr !!}
                                        </div>
                                        <h3 class="b-font-h3 b-font-bold b-mt-6 b-mb-2">Importar contactos mediante
                                            código QR</h3>
                                        <p class="b-text-secondary">Escanea el código QR con la cámara de tu teléfono
                                            para importar contactos fácilmente desde tu móvil.</p>
                                        <hr class="b-my-8 b-hr b-w-100p">
                                        <h3 class="b-font-h3 b-font-bold b-mb-2">Importar contactos desde un archivo
                                        </h3>
                                        <p class="b-text-secondary">Importa tus contactos desde un archivo CSV o XLS
                                            existente.</p>
                                        <button id="uid-202-input"
                                            class="_button_15l74_7 _size--md_15l74_19 _theme--primary_15l74_39 _slotTheme--default_15l74_121 b-my-5"
                                            data-testid="upload-button">
                                            <div class="_caption_15l74_19">Empezar</div>
                                        </button>
                                        <p id="mensaje"></p>
                                    </div>
                                </div>
                                <input id="csv-file" class="_invisible_nqvuz_23" type="file" name="file">
                                <div class="_modal_qmh3o_7 modal" tabindex="-1" style="display: none;">
                                    <div class="modal__body _modalBody_1tlxo_7">
                                        <header class="b-custom-header _header_170cv_7 _header_1tlxo_12"
                                            icon-height="32px">
                                            <div class="b-custom-header_left _hasIcon_170cv_41 _left_170cv_11 flex-1">
                                                <button data-testid="b-custom-header-icon-back"
                                                    class="_icon_170cv_48 _iconNoEllipsis_170cv_53"><svg
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-x">
                                                        <path fill="currentColor" fill-rule="evenodd"
                                                            d="M10.596 8.646 20 18.05l9.404-9.404a1.379 1.379 0 0 1 1.95 1.95L21.949 20l9.405 9.404a1.379 1.379 0 0 1-1.95 1.95L20 21.949l-9.404 9.405a1.379 1.379 0 1 1-1.95-1.95L18.05 20l-9.404-9.404a1.379 1.379 0 1 1 1.95-1.95">
                                                        </path>
                                                    </svg></button>
                                                <div class="min-w-0 flex-1">
                                                    <div class="_headerTitle_170cv_28" data-testid="header"><span
                                                            class="_title_170cv_56">¿Tienes un archivo con tu base de
                                                            clientes?</span></div>
                                                </div>
                                            </div>
                                            <div class="b-custom-header_right _right_170cv_20"></div>
                                        </header>
                                        <div>
                                            <div class="_modalTile_1tlxo_18">
                                                <div class="_textsContainer_1tlxo_30 flex-1">
                                                    <p class="_textTop_1tlxo_30">Sí</p>
                                                    <p class="_textBottom_1tlxo_35">Pulsa aquí si tienes un archivo con
                                                        tu base de clientes para subirlo a Booksy</p>
                                                </div><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                    height="24" viewBox="0 0 40 40" role="img"
                                                    class="b-svg b-svg-name-arrow-right _templateIcon_1tlxo_15">
                                                    <path fill="currentColor"
                                                        d="M14.8 32.2c-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.7-.7 3.9-4.1 9.7-10.3-5.8-6.2-9-9.6-9.7-10.3-.4-.4-.4-1 0-1.4s1-.4 1.4 0c1 1.1 9.4 9.9 10.4 11 .4.4.4 1 0 1.4-1 1.1-9.4 9.9-10.4 11-.2.2-.5.3-.7.3">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div class="_modalTile_1tlxo_18">
                                                <div class="_textsContainer_1tlxo_30 flex-1">
                                                    <p class="_textTop_1tlxo_30">No</p>
                                                    <p class="_textBottom_1tlxo_35">Pulsa aquí si no tienes un archivo
                                                        con tu base de clientes</p>
                                                </div><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                    height="24" viewBox="0 0 40 40" role="img"
                                                    class="b-svg b-svg-name-arrow-right _templateIcon_1tlxo_15">
                                                    <path fill="currentColor"
                                                        d="M14.8 32.2c-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.7-.7 3.9-4.1 9.7-10.3-5.8-6.2-9-9.6-9.7-10.3-.4-.4-.4-1 0-1.4s1-.4 1.4 0c1 1.1 9.4 9.9 10.4 11 .4.4.4 1 0 1.4-1 1.1-9.4 9.9-10.4 11-.2.2-.5.3-.7.3">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{-- tab vista invitar a reservar --}}
                            @if ($clientes->isNotEmpty())
                                <div class="_invite_1k0g9_7 invite_to_book" id="invite_to_book">
                                    <div class="_customers_lt26r_7" data-testid="invite-to-book-tab">
                                        {{-- cabecera con el buscador --}}
                                        <div>
                                            <p class="_description_lt26r_66">Consulta a continuación el estado de tus
                                                invitaciones existentes. Vuelve a invitar a los clientes que no
                                                respondieron a tu último mensaje.</p>
                                            <div class="_searchContainer_lt26r_19">
                                                <div class="b-form-field">
                                                    <div class="b-form-group">
                                                        <div class="b-form-group-icon"><svg
                                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" class="b-icon" role="img"
                                                                stroke-width="1.5" width="24" height="24">
                                                                <path fill="currentColor" fill-rule="evenodd"
                                                                    d="M10.33 2.5a7.83 7.83 0 1 0 4.943 13.904l4.861 4.862a.8.8 0 0 0 1.132-1.132l-4.862-4.862A7.83 7.83 0 0 0 10.33 2.5M4.1 10.33a6.23 6.23 0 1 1 12.46 0 6.23 6.23 0 0 1-12.46 0"
                                                                    clip-rule="evenodd"></path>
                                                            </svg></div>
                                                        <input type="text" name="search"
                                                            class="flex-1 b-form-control"
                                                            placeholder="Buscar clientes">
                                                        <div class="b-form-group-placeholder">Buscar clientes</div>
                                                    </div>
                                                </div><button id="uid-2347-input"
                                                    class="_button_15l74_7 _size--md_15l74_19 _theme--primary_15l74_39 _slotTheme--default_15l74_121 _inviteAllButton_lt26r_73">
                                                    <div class="_caption_15l74_19">Invitar a todos</div>
                                                </button>
                                            </div>
                                        </div>
                                        {{-- lista de clientes --}}
                                        <div class="flex-1">
                                            <div
                                                class="b-inifinite-scroll _scrollable_1oe3e_7 scrollable _contentScroll_lt26r_16 flex-1">
                                                <div class="_content_1oe3e_17">
                                                    <ul class="_customersList_lt26r_13 flex-1"
                                                        data-testid="invite-customers-list"
                                                        style="padding-left: 0px!important">
                                                        @foreach ($clientes as $index => $cliente)
                                                            <li>
                                                                <div class="_customerItem_lt26r_24">
                                                                    <div class="_customerItemWrapper_lt26r_78 flex-1"
                                                                        data-testid="invite-customer-item">
                                                                        <div class="_customerItem_1htnk_7">
                                                                            @if ($cliente->profile_photo_url)
                                                                                <div class="_avatar_y56f5_7 _avatarHasImage_y56f5_13"
                                                                                    title="{{ $cliente->nombre }} {{ $cliente->primer_apellido }}"
                                                                                    style="width: 40px; height: 40px; flex: 0 0 40px;">

                                                                                    <div class="_avatarImage_y56f5_16"
                                                                                        style="background-image: url('{{ $cliente->profile_photo_url }}');">
                                                                                    </div>
                                                                                </div>
                                                                            @else
                                                                                <div class="_avatar_y56f5_7"
                                                                                    title="{{ $cliente->nombre }}"
                                                                                    style="width: 40px; height: 40px; flex: 0 0 40px;">

                                                                                    <div class="_avatarInitials_y56f5_24"
                                                                                        style="font-size: 16px;">
                                                                                        {{ $iniciales[$index] }}
                                                                                    </div>
                                                                                </div>
                                                                            @endif
                                                                            <div class="_customerItemText_1htnk_11"
                                                                                data-testid="customer-item-name">
                                                                                {{ $cliente->name }}
                                                                                {{ $cliente->primer_apellido }}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="_buttonContainer_lt26r_37">
                                                                        @if ($cliente->invitado == 1)
                                                                            <div class="_invitedInfo_lt26r_42">
                                                                                <div class="_invitedInfoText_lt26r_54"
                                                                                    data-testid="client-invitation-status">
                                                                                    Invitado recientemente
                                                                                </div>
                                                                            </div>
                                                                        @endif
                                                                        <button id="uid-2354-input"
                                                                            class="_button_15l74_7 _size--md_15l74_19 _theme--default_15l74_39 _slotTheme--default_15l74_121">
                                                                            <div class="_caption_15l74_19">Invita a
                                                                                reservar</div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        @endforeach
                                                    </ul>
                                                    <div class="_detectorWrapper_1oe3e_24">
                                                        <div class="_detector_1oe3e_24" style="height: 10px;"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endif
                            {{-- tab vista invitacion rápida --}}
                            <div class="_invite_1rxlf_7 quick_invite" data-testid="quick-invite-tab"
                                id="quick_invite">
                                <div class="_imageWrapper_1rxlf_14"><img
                                        src="https://d10n9ka7jp2kfo.cloudfront.net/pro/e6d5300c/assets/img_quick-invite-PROMA2n9.svg"
                                        alt="Quick Invite"></div>
                                <p class="_description_1rxlf_38">Introduce el número de teléfono o la dirección de
                                    correo electrónico de la persona a la que quieres invitar. Le enviaremos una
                                    invitación en tu nombre. En la invitación aparecerán los pasos a seguir para
                                    registrarse en Booksy y empezar a reservar citas contigo a través de la aplicación.
                                </p>
                                <p class="_note_1rxlf_47"><span class="uppercase">Nota: </span><span>Cuando envías una
                                        invitación rápida, los destinatarios no se añaden a la lista de clientes.</span>
                                </p>
                                <div class="_buttonsWrapper_1rxlf_27" data-testid="quick-invite-wrapper"
                                    style="width: 100%">
                                    <div class="relative _container_nq4h9_7 _input_1rxlf_21"
                                        data-testid="error-input">
                                        <div class="b-my-2 mx-0.5 _input_1rxlf_21" data-testid="quick-invite-input">
                                            <div class="b-form-field">
                                                <div class="form-groupInput mb-3">
                                                    <input type="text" placeholder=" " class="gualazonF"
                                                        id="telef_email_invit_client001" value=""
                                                        required="" name="telef_email_invit_client001">
                                                    <label for="telef_email_invit_client001"
                                                        class="styles_label_hleTI" style="font-size: 16px;">Número de
                                                        teléfono o email</label>
                                                </div>
                                                {{-- <div class="b-form-group b-form-group-md">
                                                    <input type="text" id="uid-3207-input" autocomplete="on"
                                                        inputmode="text" placeholder="Número de teléfono o email"
                                                        class="b-form-control" style="min-width: 0px;">
                                                    <div class="b-form-group-placeholder">Número de teléfono o email
                                                    </div>
                                                </div> --}}
                                            </div>
                                        </div>
                                    </div><button id="uid-3209-input"
                                        class="_button_15l74_7 _size--md_15l74_19 _theme--primary_15l74_39 _slotTheme--default_15l74_121 _sendButton_1rxlf_33"
                                        data-testid="send-button" style="width: 100%;">
                                        <div class="_caption_15l74_19">Invitar</div>
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
