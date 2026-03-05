    <div class="index_settingsContainer_MIteR showTransactionVentaRapida" id="showTransactionVentaRapida" style="display: none">
        <div id="loaderTransacciones" class="loader d-none">
            <div class="spinner"></div>
        </div>
        <div class="index_settingsContent_M9Od2">
            <div class="index_settingsContainer_s8OEV width-100 height-100" data-testid="settings.payments">
                <div class="index_container_G_uGM column no-wrap width-100 height-100">
                    <div class="list_transaction_wpiLR">
                        <header class="b-custom-header b-custom-header_header_oZL1I b-custom-header_headerPadding_gg5dx">
                            <div class="b-custom-header_left b-custom-header_hasIcon_uCjMI b-custom-header_hasIconEllipsis_gYB6P b-custom-header_left_bWmRf">
                                <button data-testid="b-custom-header-icon-back_transaction" class="b-custom-header_icon_XtAgm button33">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 20" role="img" class="b-svg b-svg-name-nav-arrow-left"><path fill="currentColor" d="M.92 9.45 9.266.65a.807.807 0 0 1 1.136-.032c.323.304.338.81.033 1.131L3.368 9.2h22.128c.444 0 .804.358.804.8s-.36.8-.804.8H3.368l7.068 7.45a.8.8 0 0 1-.033 1.132.804.804 0 0 1-1.136-.033l-8.348-8.8a.797.797 0 0 1 0-1.098"></path>
                                    </svg>
                                </button>
                                <div class="">
                                    <div class="b-custom-header_headerTitle_ogW55 txt--ellipsis">
                                        <span class="b-custom-header_title_GTxIs b-custom-header_wordBreakAll_U_pxk">Todas las transacciones</span>
                                    </div>
                                </div>
                            </div>
                            <div class="b-custom-header_right b-custom-header_right_uT_uU"></div>
                        </header>
                        <section class="list_section_BY5Aq">
                            <div class="list_columnLeft_w8BUn">
                                <div class="column no-wrap height-100" style="display: flex">
                                    <div class="transactions-summary_summaryFilters_Jgtrq">
                                        <div>
                                            {{-- navegador gris --}}
                                            <div class="scrollable-x b-tabs_container_mpBHN">
                                                <div class="b-tabs_content_lxbV0">
                                                    <ul class="b-tabs_tabs_nYRc_ b-tabs_tabsBordered_yoE3l b-tabs_size--14_SADcU">
                                                        <li class="b-tabs_tab_Gc2Ei b-tabs_tabBordered_CjuJV b-tabs_tabBorderedActive_ff9lg" tabindex="-1" data-testid="day">
                                                            <div class="">Días</div>
                                                        </li>
                                                        <li class="b-tabs_tab_Gc2Ei b-tabs_tabBordered_CjuJV" tabindex="0" data-testid="month">
                                                            <div class="">Meses</div>
                                                        </li>
                                                        <li class="b-tabs_tab_Gc2Ei b-tabs_tabBordered_CjuJV" tabindex="0" data-testid="custom">
                                                            <div class="">Personalizado</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {{-- buscador de transacciones --}}
                                            <div class="styles_container_pjyTj styles_size--sm_dOZPQ styles_theme--filled_LnEz6 styles_theme--default_x92vh b-input-search_field_enuVF margin-top-4 margin-bottom-8">
                                                <div class="styles_outerWrapper_NumuG" style="min-width: 0px;">
                                                    <div class="styles_wrapper_hb1CA">
                                                        <div class="styles_slotLeft_k29Ng">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-search b-input-search_icon_HSN65">
                                                                <path fill="currentColor" d="M16.8 2.933c7.658 0 13.867 6.21 13.867 13.867 0 3.445-1.257 6.597-3.337 9.022l9.424 9.424a1.067 1.067 0 0 1-1.408 1.597l-.1-.089-9.424-9.424a13.8 13.8 0 0 1-9.022 3.337c-7.658 0-13.867-6.21-13.867-13.867S9.143 2.933 16.8 2.933m0 2.134c-6.48 0-11.733 5.253-11.733 11.733S10.32 28.533 16.8 28.533 28.533 23.28 28.533 16.8 23.28 5.067 16.8 5.067"></path>
                                                            </svg>
                                                        </div>
                                                        <input id="uid-178-input" name="transactions-summary-search" type="search" role="search" autocomplete="off" inputmode="text" class="styles_field_Bhxvq" placeholder="Buscar por cliente o número de transacción" data-testid="transactions-summary-search" value="" style="min-width: 0px;">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {{-- lista de transacciones por día  desde el más nuevo al más viejo--}}
                                    <div class="col position-relative">
                                        <div class="b-inifinite-scroll b-infinite-scroll_scrollable_X8X5F23 scrollable">
                                            <div class="b-infinite-scroll_content_uwl9t" style="overflow: auto">
                                                <ul class="transactions-summary_summaryList_RLKXY" id="paymentsList">
                                                   {{-- @foreach ($pagosAgrupados as $fecha => $pagos)
                                                        @php
                                                            // Agrupar por método de pago y sumar el total de cada uno
                                                            $pagosPorMetodo = $pagos->groupBy('metodo_pago');
                                                            $totalDia = $pagos->sum('total');
                                                        @endphp

                                                        <li>
                                                            <div class="tile_container_TUxEJ margin-top-16 margin-right-16 margin-bottom-16 margin-left-24" data-testid="summary-list-item">
                                                                <div class="tile_wrapper_A8Ld5">

                                                                    <div>
                                                                        <div class="flex no-wrap justify-between items-center margin-bottom-16">
                                                                            <div class="size--16-sb">{{ $fecha }}</div>
                                                                            <div data-testid="summary-list-item-show-list-btn" class="flex items-center pointer">
                                                                                <div class="size--12">Mostrar lista</div>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-arrow-right">
                                                                                    <path fill="currentColor" d="M14.8 32.2c-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.7-.7 3.9-4.1 9.7-10.3-5.8-6.2-9-9.6-9.7-10.3-.4-.4-.4-1 0-1.4s1-.4 1.4 0c1 1.1 9.4 9.9 10.4 11 .4.4.4 1 0 1.4-1 1.1-9.4 9.9-10.4 11-.2.2-.5.3-.7.3"></path>
                                                                                </svg>
                                                                            </div>
                                                                        </div> --}}

                                                                        {{-- Mostrar métodos de pago y sus totales --}}
                                                                        {{-- @foreach ($pagosPorMetodo as $metodo => $items)
                                                                            @php $subtotal = $items->sum('total'); @endphp
                                                                            <div class="flex no-wrap justify-between items-center">
                                                                                <div class="size--14 color-08">{{ $metodo }}</div>
                                                                                <div class="size--14">{{ number_format($subtotal, 2, ',', '.') }} €</div>
                                                                            </div>
                                                                            <hr class="margin-top-12 margin-bottom-12 hr23">
                                                                        @endforeach

                                                                        <div class="flex no-wrap justify-between items-center">
                                                                            <div class="size--14">Total</div>
                                                                            <div class="size--14-sb">{{ number_format($totalDia, 2, ',', '.') }} €</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    @endforeach --}}

                                                    {{-- <li>
                                                        <div class="tile_container_TUxEJ margin-top-16 margin-right-16 margin-bottom-16 margin-left-24" data-testid="summary-list-item">
                                                            <div class="tile_wrapper_A8Ld5">
                                                                <div class="tile_titleWrapper_Mm5GN">
                                                                    <!---->
                                                                    <h2 class="tile_title_ZZYC6 tile_size--16-sb_jCVno"></h2></div>
                                                                <div class="">
                                                                    <div class="flex no-wrap justify-between items-center margin-bottom-16">
                                                                        <div class="size--16-sb">2025-09-10</div>
                                                                        <div data-testid="summary-list-item-show-list-btn" class="flex items-center pointer">
                                                                            <div class="size--12">Mostrar lista</div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-arrow-right"><path fill="currentColor" d="M14.8 32.2c-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4.7-.7 3.9-4.1 9.7-10.3-5.8-6.2-9-9.6-9.7-10.3-.4-.4-.4-1 0-1.4s1-.4 1.4 0c1 1.1 9.4 9.9 10.4 11 .4.4.4 1 0 1.4-1 1.1-9.4 9.9-10.4 11-.2.2-.5.3-.7.3"></path></svg></div>
                                                                    </div>
                                                                    <div>
                                                                        <div class="flex no-wrap justify-between items-center">
                                                                            <div class="size--14 color-08">Bizum</div>
                                                                            <div class="size--14">20,00 €</div>
                                                                        </div>
                                                                        <hr class="margin-top-12 margin-bottom-12">
                                                                    </div>
                                                                    <div>
                                                                        <div class="flex no-wrap justify-between items-center">
                                                                            <div class="size--14 color-08">Efectivo</div>
                                                                            <div class="size--14">35,00 €</div>
                                                                        </div>
                                                                        <hr class="margin-top-12 margin-bottom-12">
                                                                    </div>
                                                                    <div>
                                                                        <div class="flex no-wrap justify-between items-center">
                                                                            <div class="size--14 color-08">PayPal</div>
                                                                            <div class="size--14">25,00 €</div>
                                                                        </div>
                                                                        <hr class="margin-top-12 margin-bottom-12">
                                                                    </div>
                                                                    <div>
                                                                        <div class="flex no-wrap justify-between items-center">
                                                                            <div class="size--14 color-08">Terminal de tarjeta física</div>
                                                                            <div class="size--14">30,00 €</div>
                                                                        </div>
                                                                        <hr class="margin-top-12 margin-bottom-12">
                                                                    </div>
                                                                    <div class="flex no-wrap justify-between items-center">
                                                                        <div class="size--14">Total</div>
                                                                        <div class="size--14-sb">110,00 €</div>
                                                                    </div>
                                                                </div>
                                                                <!---->
                                                            </div>
                                                            <!---->
                                                        </div>
                                                    </li> --}}
                                                </ul>
                                                <div class="b-infinite-scroll_detectorWrapper_fUQYx">
                                                    <div class="b-infinite-scroll_detector_bvPUz" style="height: 10px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{-- lista de transacciones una por una --}}
                            <div class="list_columnRight_VofWU">
                            <div class="column no-wrap height-100 position-relative list_transactionList_yx3BT">
                                <div class="b-inifinite-scroll b-infinite-scroll_scrollable_X8X5F scrollable">
                                    <div class="b-infinite-scroll_content_uwl9t">
                                        <ul class="padding-12 detalleTransacciones22" id="detalleTransacciones22">
                                            {{-- <li>
                                                <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer">
                                                    <div class="transactions-list_transactionGridIcon_psmT1">
                                                        <div class="transactions-list_transactionIconWrapper_dYOZT">
                                                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/paypal.492a8057.svg&quot;); background-size: contain; width: 40px; height: 40px; padding-top: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridLabel_ZVgMn">
                                                        <div class="size--14">11:38 - 10 sep., 2025</div>
                                                        <div class="color-08 size--12">
                                                        <span>Cita</span>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridBadge_d6g_n">
                                                        <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq" statuscode="paypal">Pagado</div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridPrice_M3V0r">
                                                        <div class="size--14-sb txt--right padding-right-16">25,00&nbsp;€</div>
                                                    </div>
                                                </div>
                                                <hr class="hr23">
                                            </li>
                                            <li>
                                                <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer">
                                                    <div class="transactions-list_transactionGridIcon_psmT1">
                                                        <div class="transactions-list_transactionIconWrapper_dYOZT">
                                                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/check.a38c665c.svg&quot;); background-size: contain; width: 40px; height: 40px; padding-top: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridLabel_ZVgMn">
                                                        <div class="size--14">11:38 - 10 sep., 2025</div>
                                                        <div class="color-08 size--12">
                                                        <span>Cita</span>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridBadge_d6g_n">
                                                        <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq" statuscode="check">Pagado</div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridPrice_M3V0r">
                                                        <div class="size--14-sb txt--right padding-right-16">20,00&nbsp;€</div>
                                                    </div>
                                                </div>
                                                <hr class="hr23">
                                            </li>
                                            <li>
                                                <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer">
                                                    <div class="transactions-list_transactionGridIcon_psmT1">
                                                        <div class="transactions-list_transactionIconWrapper_dYOZT">
                                                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/creditcard.6c13eabe.svg&quot;); background-size: contain; width: 40px; height: 40px; padding-top: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridLabel_ZVgMn">
                                                        <div class="size--14">11:31 - 10 sep., 2025</div>
                                                        <div class="color-08 size--12">
                                                        <span>Cita</span>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridBadge_d6g_n">
                                                        <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq" statuscode="credit_card">Pagado</div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridPrice_M3V0r">
                                                        <div class="size--14-sb txt--right padding-right-16">20,00&nbsp;€</div>
                                                    </div>
                                                </div>
                                                <hr class="hr23">
                                            </li>
                                            <li>
                                                <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer">
                                                    <div class="transactions-list_transactionGridIcon_psmT1">
                                                        <div class="transactions-list_transactionIconWrapper_dYOZT">
                                                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/cash.e7b5eb4a.svg&quot;); background-size: contain; width: 40px; height: 40px; padding-top: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridLabel_ZVgMn">
                                                        <div class="size--14">11:30 - 10 sep., 2025</div>
                                                        <div class="color-08 size--12">

                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridBadge_d6g_n">
                                                        <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq" statuscode="cash">Pagado</div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridPrice_M3V0r">
                                                        <div class="size--14-sb txt--right padding-right-16">30,00&nbsp;€</div>
                                                    </div>
                                                </div>
                                                <hr class="hr23">
                                            </li>
                                            <li>
                                                <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer">
                                                    <div class="transactions-list_transactionGridIcon_psmT1">
                                                        <div class="transactions-list_transactionIconWrapper_dYOZT">
                                                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/cash.e7b5eb4a.svg&quot;); background-size: contain; width: 40px; height: 40px; padding-top: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridLabel_ZVgMn">
                                                        <div class="size--14">11:28 - 10 sep., 2025</div>
                                                        <div class="color-08 size--12">

                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridBadge_d6g_n">
                                                        <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq" statuscode="cash">Pagado</div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridPrice_M3V0r">
                                                        <div class="size--14-sb txt--right padding-right-16">5,00&nbsp;€</div>
                                                    </div>
                                                </div>
                                                <hr class="hr23">
                                            </li>
                                            <li>
                                                <div data-testid="transactions-list-item" class="flex items-center transactions-list_transactionRow_KKPOy u-pointer">
                                                    <div class="transactions-list_transactionGridIcon_psmT1">
                                                        <div class="transactions-list_transactionIconWrapper_dYOZT">
                                                        <div class="b-image_image_QfpQF transactions-list_transactionIcon_WeYGO" style="background-image: url(&quot;https://d10n9ka7jp2kfo.cloudfront.net/pro/9e51541d/img/creditcard.6c13eabe.svg&quot;); background-size: contain; width: 40px; height: 40px; padding-top: 0px;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridLabel_ZVgMn">
                                                        <div class="size--14">11:28 - 10 sep., 2025</div>
                                                        <div class="color-08 size--12">

                                                        </div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridBadge_d6g_n">
                                                        <div data-testid="receipt-status-badge-label" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--xs_EtgLy receipt-status-badge_size--9-sb_zgSEq" statuscode="credit_card">Pagado</div>
                                                    </div>
                                                    <div class="transactions-list_transactionGridPrice_M3V0r">
                                                        <div class="size--14-sb txt--right padding-right-16">10,00&nbsp;€</div>
                                                    </div>
                                                </div>
                                                <hr class="hr23">
                                            </li> --}}
                                        </ul>

                                        <div class="b-infinite-scroll_detectorWrapper_fUQYx">
                                        <div class="b-infinite-scroll_detector_bvPUz" style="height: 10px;"></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
