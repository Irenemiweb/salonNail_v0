<div id="attach-elements">
	<div class="b-modal_modal_oXOJl modalMotrarReciboDetalleTransaccion d-none" tabindex="-1" data-testid="receipt-modal" style="z-index: 10001;">
		<div class="modal__body receipt_modalBody_xHm4g receipt_modalBody_xHm4gVersionMovil" style="background-color: transparent!important;">
			<div class="modal__content">
				<div class="receipt_receiptWrapper_ZpUQq">
					<div class="receipt_receiptContent_W16zO">
						<header class="receipt_receiptHeader_or90S">
                            <div class="botonesCabeceraTiquet" style="">
                                <button class="receipt_receiptHeaderClose_B4UTD closeModalRecibo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-x"><path fill="currentColor" fill-rule="evenodd" d="M10.596 8.646 20 18.05l9.404-9.404a1.379 1.379 0 0 1 1.95 1.95L21.949 20l9.405 9.404a1.379 1.379 0 0 1-1.95 1.95L20 21.949l-9.404 9.405a1.379 1.379 0 1 1-1.95-1.95L18.05 20l-9.404-9.404a1.379 1.379 0 1 1 1.95-1.95"></path></svg>
                                </button>
                                <div class="flex justify-end width-100">
                                    <button id="uid-353-input-enviarMail" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--icon_yiHCJ" data-testid="receipt-show-send-email">
                                        <div class="index_slotLeft_p6NJx">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" role="img" width="24" height="30" class="b-svg b-svg-name-ico_send padding-right-4"><path fill="currentColor" d="M17 .5c.2 0 .2 0 .3.1v.1l-.1-.1.1.1s.1.1.1.2v.3l-5.3 16c-.1.4-.7.5-.9.1l-3.4-7.1-7-3.4c-.4-.2-.4-.7 0-.9h.1l16-5.3c0-.1 0-.1.1-.1q-.15 0 0 0m-1.1 2.4-7 7 2.7 5.8zm-.8-.8L2.3 6.4l5.8 2.7z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    <div class="index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k margin-left-12 _is--overlay_7t2vu_162 _has--shadow_7t2vu_20">
                                        <div class="index_toggle_sBt35">
                                            <button id="uid-3598-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--icon_yiHCJ" data-testid="receipt-toggle-dropdown">
                                                <div class="index_slotLeft_p6NJx">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-more"><path fill="currentColor" d="M10.5 18a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m10 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5m10 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5"></path>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                        {{-- glogo para editar recibo --}}
                                        <div class="_content_7t2vu_14 _position_7t2vu_25 _position--bottom-right_7t2vu_42 bocadilloDroponModificarRecibo d-none">
                                            <div class="scrollable _scrollable_ic33a_6 _scrollable_7t2vu_157">
                                                <div class="_dropdownContent_tmznt_238">
                                                    <div class="_dropdownItem_tmznt_249 dropdownItem_tmznt_249Clicable" data-testid="receipt-generate-invoice">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 18 18" role="img" class="b-svg b-svg-name-document margin-right-12"><path fill="currentColor" d="M16.528.153a.54.54 0 0 1 .54.54v16.614a.54.54 0 0 1-.54.54H1.472a.54.54 0 0 1-.54-.54V6.145a.54.54 0 0 1 .149-.373L6.273.321a.54.54 0 0 1 .39-.168Zm-.54 1.08H7.184v4.764a.54.54 0 0 1-.54.54h-4.5a.5.5 0 0 1-.133-.017v10.247h13.977zM13.8 13.8a.6.6 0 0 1 0 1.2H4.2a.6.6 0 0 1 0-1.2zm0-3a.6.6 0 0 1 0 1.2H4.2a.6.6 0 0 1 0-1.2zm0-3a.6.6 0 0 1 0 1.2H4.2a.6.6 0 1 1 0-1.2zM6.104 2.063 2.872 5.456h3.232z"></path></svg>
                                                        Generar factura
                                                    </div>
                                                    <div class="_dropdownItem_tmznt_249 dropdownItem_tmznt_249Clicable" data-testid="receipt-edit-transaction">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-edit margin-right-12"><path fill="currentColor" d="M26.207 5.36a4.64 4.64 0 0 1 6.389-.165l.173.164 1.872 1.872a4.64 4.64 0 0 1 .164 6.389l-.164.173-19.58 19.58a1 1 0 0 1-.186.145l-.102.052a1 1 0 0 1-.15.051L6.122 35.94c-1.208.329-2.32-.728-2.092-1.928l.03-.134 2.328-8.534.039-.108a1 1 0 0 1 .15-.242l.05-.054zM7.773 27.415 5.969 34.03l6.613-1.804zM25.644 8.584 8.623 25.605l5.771 5.771 17.021-17.021zm5.794-1.894a2.757 2.757 0 0 0-3.762-.129l-.138.13-.563.562 5.771 5.771.564-.562a2.76 2.76 0 0 0 .242-3.623l-.118-.145-.124-.132z"></path></svg>
                                                        Editar
                                                    </div>
                                                    <div class="_dropdownItem_tmznt_249 dropdownItem_tmznt_249Clicable" data-testid="receipt-assign-sale">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-invite-client margin-right-8"><path fill="currentColor" fill-rule="evenodd" d="M13.818 20.355c.26 0 .507.106.686.291.485.506 1.293 1.109 2.39 1.109 1.095 0 1.903-.603 2.388-1.109a.95.95 0 0 1 .686-.29h.406c4.638 0 8.411 3.412 8.411 7.606v4.115a.93.93 0 0 1-.94.923H5.94a.93.93 0 0 1-.94-.923v-4.115c0-4.194 3.774-7.607 8.411-7.607zm-.387 1.847h-.02c-3.6 0-6.529 2.584-6.529 5.76v3.192h20.021v-3.192c0-3.105-2.8-5.645-6.29-5.757l-.259-.003c-1.991 1.81-4.933 1.809-6.923 0M30 11a1 1 0 0 1 .993.883L31 12v3h3a1 1 0 0 1 .117 1.993L34 17h-3v3a1 1 0 0 1-1.993.117L29 20v-3h-3a1 1 0 0 1-.117-1.993L26 15h3v-3a1 1 0 0 1 1-1M16.893 7c3.036 0 5.504 2.707 5.504 6.036s-2.468 6.035-5.504 6.035-5.505-2.707-5.505-6.035S13.858 7 16.893 7m0 1.846c-1.997 0-3.622 1.88-3.622 4.19s1.625 4.189 3.622 4.189c1.998 0 3.622-1.88 3.622-4.189s-1.624-4.19-3.622-4.19"></path></svg>
                                                        Asignar venta
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {{-- ------ --}}
                                    </div>
                                </div>
                            </div>
                            {{-- ENVIAR EMAIL CLIENTE --}}
                            <div class="enviarReciboCorreo d-none">
                                <div class="row items-center">
                                    <div class="col col-auto">
                                        <span class="esconderEnviarEmail pointer b-icon iconFont icon-nav-arrow-left" style="font-size: 18px;padding-bottom: 1rem;"></span>
                                    </div>
                                    <div class="col">
                                        <div data-testid="error-input" class="index_container_jtGZY index_theme--error_q2ehf">
                                            <div class="form-groupInput" style="margin-bottom: 0px">
                                                <input onfocus="" onclick="" type="email" placeholder=" "
                                                    class="gualazonF inputsNewService" id="emailClienteRecivoSend"
                                                    value="" required
                                                    name="emailClienteRecivoSend"
                                                    onblur=""/>
                                                <label for="emailClienteRecivoSend" class="styles_label_hleTI">Enviar recibo al cliente por email</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col col-auto">
                                        <button id="uid-340-inputEnviarEmail" class="index_button_TfmOz index_size--md_G1gdK index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt receipt_receiptHeaderSend_XpRqZ">
                                            <div style="padding: 16px 16px;" class="index_caption_W6r_J"> Enviar </div>
                                        </button>
                                    </div>
                                    <div class="col col-12">
                                        <hr>
                                    </div>
                                </div>
                            </div>
						</header>
						<div class="receipt_receiptReceipt_KzM2Z receipt_receiptReceipt_KzM2ZModalMostrarRecibo">
							{{-- <div class="payment-receipt_receipt_KbChH payment-receipt_size--14_pkege" data-testid="receipt-payment-receipt">
								<div data-testid="payment-receipt-status" class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--md_INMcW receipt-status-badge_size--18-sb_Z0C9x">Pagado</div>
								<div data-testid="payment-receipt-id" class="payment-receipt_receiptInfo_RrRnL margin-top-16">
									<div class="size--16-sb"><span data-testid="receipt-number">Recibo 6</span><span>| ID 35808615</span></div>
									<div>11 sep. 2025</div>
								</div>
								<div class="payment-receipt_receiptCustomer__F5o0">


								</div>

								<div class="margin-top-16">MYA NAILS
									<div class="payment-receipt_receiptAltText_VrnDU payment-receipt_size--12_zJMLU">ourense 23, 32003, Ourense</div>
								</div>
								<div class="payment-receipt_receiptLabels_dbSin payment-receipt_size--10_bf2DQ">
									<div>Artículo</div>
									<div>Cantidad</div>
								</div>
								<div class="">
									<div class="margin-bottom-12" data-testid="payment-receipt-item-0">
										<div class="payment-receipt_receiptItem_QWl3W">
											<div class="payment-receipt_receiptItemName_BOOqL">Manicura clásica (35M)</div>
											<div class="payment-receipt_receiptItemQuantity_XWqsy">x1</div>
											<div class="payment-receipt_receiptItemTotal_U6yh4 payment-receipt_size--14-sb_r8Zux">15,00&nbsp;€</div>
										</div>

									</div>
									<div class="margin-bottom-12" data-testid="payment-receipt-item-1">
										<div class="payment-receipt_receiptItem_QWl3W">
											<div class="payment-receipt_receiptItemName_BOOqL">Uñas acrílicas (1H 30M)</div>
											<div class="payment-receipt_receiptItemQuantity_XWqsy">x1</div>
											<div class="payment-receipt_receiptItemTotal_U6yh4 payment-receipt_size--14-sb_r8Zux">30,00&nbsp;€</div>
										</div>

									</div>
								</div>
								<hr class="payment-receipt_hr_6WSqP">
								<table class="payment-receipt_taxSummary_tF1kf tablaReciboVersionMovil">
									<thead class="color-08 size--10">
										<tr>
											<th></th>
											<th>Tipo de Impuesto</th>
											<th>Valor neto</th>
											<th>Importe de impuesto</th>
											<th>Valor bruto</th>
										</tr>
									</thead>
									<tbody>
										<tr data-testid="payment-receipt-tax-item-0">
											<td></td>
											<td class="size--12">21%</td>
											<td class="size--12">37,19 €</td>
											<td class="size--12">7,81 €</td>
											<td class="size--12"><strong>45,00 €</strong></td>
										</tr>
									</tbody>
								</table>
								<div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU" data-testid="payment-receipt-summaries-subtotal">
									<div class="payment-receipt_receiptRowName_Me4zF">Subtotal</div>
									<div class="payment-receipt_receiptRowTotal_bf2SM">45,00&nbsp;€</div>
								</div>
								<div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU" data-testid="payment-receipt-summaries-discount">
									<div class="payment-receipt_receiptRowName_Me4zF">Descuento</div>
									<div class="payment-receipt_receiptRowTotal_bf2SM">0,00&nbsp;€</div>
								</div>
								<hr class="payment-receipt_hr_6WSqP">
								<div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowAlt_CtByz">
									<div class="payment-receipt_receiptRowName_Me4zF">Total</div>
									<div class="payment-receipt_receiptRowTotal_bf2SM payment-receipt_receiptRowTotalAlt_L_Ovf payment-receipt_size--16-sb_LEIqn">45,00&nbsp;€</div>
								</div>
								<div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">

									<div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF">Pagado • Efectivo • 11/09/2025, 10:36</div>
									<div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM"><span>45,00&nbsp;€</span></div>
								</div>
								<div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowTotalPaid_th16p">
									<div class="payment-receipt_receiptRowName_Me4zF">Total pagado</div>
									<div data-testid="payment-receipt-paid" class="payment-receipt_receiptRowTotal_bf2SM size--12-b">45,00&nbsp;€</div>
								</div>


							</div> --}}
						</div>
					</div>
					<div class="receipt_break_EL1Lq2">
						<div></div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>
{{-- <div class="col h-100 modalMotrarReciboDetalleTransaccion  d-none" style="top:0px;position: absolute;width: 100%;background-color: rgb(12 12 12 / 39%);backdrop-filter: blur(3px);z-index: 9;">
   <div class="scrollable h-100 column" style="display: flex;justify-content: center;align-content: center;">
      <div class="receipt_receiptWrapper_ZpUQq paid_receiptWrap_KsRkP">
         <div class="receipt_receiptContent_W16zO">
            <header class="receipt_receiptHeader_or90S">
               <div class="botonesCabeceraTiquet" style="display:flex;">
                  <button class="receipt_receiptHeaderClose_B4UTD closeModalRecibo"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 40 40" role="img" class="b-svg b-svg-name-x"><path fill="currentColor" fill-rule="evenodd" d="M10.596 8.646 20 18.05l9.404-9.404a1.379 1.379 0 0 1 1.95 1.95L21.949 20l9.405 9.404a1.379 1.379 0 0 1-1.95 1.95L20 21.949l-9.404 9.405a1.379 1.379 0 1 1-1.95-1.95L18.05 20l-9.404-9.404a1.379 1.379 0 1 1 1.95-1.95"></path></svg>
                    </button>
                  <div class="flex justify-end w-100">
                     <button id="uid-353-input-enviarMail" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--icon_yiHCJ">
                        <div class="index_slotLeft_p6NJx">
                           <span class="padding-right-4 b-icon iconFont icon-ico_send" style="font-size: 30px;"></span>
                        </div>
                     </button>
                     <div class="margin-left-12 index_dropdown_yxIjB index_has--shadow_s6YH1 index_is--overlay_JG_3k">
                        <div class="index_toggle_sBt35">
                           <button id="uid-356-input" class="index_button_TfmOz index_size--lg_I9GTR index_theme--default_AtMGF index_slotTheme--icon_yiHCJ">
                              <div class="index_slotLeft_p6NJx">
                                 <span class="b-icon iconFont icon-more" style="font-size: 30px;"></span>
                              </div>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="enviarReciboCorreo d-none">
                  <div class="row items-center">
                     <div class="col col-auto">
                        <span class="esconderEnviarEmail pointer b-icon iconFont icon-nav-arrow-left" style="font-size: 18px;padding-bottom: 1rem;"></span>
                     </div>
                     <div class="col">
                        <div data-testid="error-input" class="index_container_jtGZY index_theme--error_q2ehf">
                           <div class="form-groupInput" style="margin-bottom: 0px">
                              <input onfocus="" onclick="" type="email" placeholder=" " class="gualazonF inputsNewService" id="emailClienteRecivoSend" value="" required="" name="emailClienteRecivoSend" onblur="">
                              <label for="emailClienteRecivoSend" class="styles_label_hleTI">Enviar recibo al cliente por email</label>
                           </div>
                        </div>
                     </div>
                     <div class="col col-auto">
                        <button id="uid-340-inputEnviarEmail" class="index_button_TfmOz index_size--md_G1gdK index_theme--primary_Thscb index_theme--default_AtMGF index_slotTheme--default_pktIt receipt_receiptHeaderSend_XpRqZ">
                           <div style="padding: 16px 16px;" class="index_caption_W6r_J"> Enviar </div>
                        </button>
                     </div>
                     <div class="col col-12">
                        <hr>
                     </div>
                  </div>
               </div>
            </header>
            <div class="receipt_receiptReceipt_KzM2Z">
               <div class="payment-receipt_receipt_KbChH payment-receipt_size--14_pkege">
                  <div class="receipt-status-badge_status_vwj1d receipt-status-badge_statusGreen_Aw6NK receipt-status-badge_size--md_INMcW receipt-status-badge_size--18-sb_Z0C9x"> Pagado </div>
                  <div class="payment-receipt_receiptInfo_RrRnL margin-top-16">
                     <div class="size--16-sb">Recibo 5 | ID 5</div>
                     <div>15 sept 2025</div>
                  </div>
                  <div class="payment-receipt_receiptCustomer__F5o0">
                     <div class="size--14-sb margin-right-4"> Angel Pedregosa, </div>
                     <span class="flex inline items-center">
                     <span> 634453096 </span>
                     </span>
                  </div>
                  <div class="margin-top-16">
                     <div class="margin-top-16">
                        MYA Nail art studio
                        <div class="payment-receipt_receiptAltText_VrnDU payment-receipt_size--12_zJMLU">ourense 25, 32003, Ourense</div>
                     </div>
                  </div>
                  <div class="payment-receipt_receiptLabels_dbSin payment-receipt_size--10_bf2DQ">
                     <div>Artículo</div>
                     <div>Cantidad</div>
                  </div>
                  <div>
                     <div class="margin-bottom-12" data-index="0" data-servicio="4" data-discount="0">
                        <div class="payment-receipt_receiptItem_QWl3W">
                           <div class="payment-receipt_receiptItemName_BOOqL"> Pedicura Completa (1h ) </div>
                           <div class="payment-receipt_receiptItemQuantity_XWqsy"> x1 </div>
                           <div class="payment-receipt_receiptItemTotal_U6yh4 payment-receipt_size--14-sb_r8Zux"> 20€ </div>
                        </div>
                        <div class="payment-receipt_receiptAltText_VrnDU payment-receipt_size--12_zJMLU">
                           <div class="row">
                              <div class="col descuentoTiketFinal"></div>
                              <div class="col-auto descuentoTiketFinal">
                                 <div class="txt--gray"> -0% </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <hr class="payment-receipt_hr_6WSqP">
                     <table class="payment-receipt_taxSummary_tF1kf">
                        <thead class="color-08 size--10">
                           <tr>
                              <th></th>
                              <th>Tipo de Impuesto</th>
                              <th>Valor neto</th>
                              <th>Importe de impuesto</th>
                              <th>Valor bruto</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr data-testid="payment-receipt-tax-item-0">
                              <td></td>
                              <td class="size--12">21 %</td>
                              <td class="size--12">16,53 €</td>
                              <td class="size--12">3,47 €</td>
                              <td class="size--12"><strong>20,00€</strong></td>
                           </tr>
                        </tbody>
                     </table>
                     <div data-testid="payment-receipt-summaries-subtotal" class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU">
                        <div class="payment-receipt_receiptRowName_Me4zF"> Subtotal </div>
                        <div class="payment-receipt_receiptRowTotal_bf2SM"> 20,00€</div>
                     </div>
                     <div data-testid="0%" class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU">
                        <div class="payment-receipt_receiptRowName_Me4zF"> Descuento </div>
                        <div class="payment-receipt_receiptRowTotal_bf2SM"> -0,00 €</div>
                     </div>
                     <hr class="payment-receipt_hr_6WSqP">
                     <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowAlt_CtByz">
                        <div class="payment-receipt_receiptRowName_Me4zF"> Total </div>
                        <div class="payment-receipt_receiptRowTotal_bf2SM payment-receipt_receiptRowTotalAlt_L_Ovf payment-receipt_size--16-sb_LEIqn"> 20,00€</div>
                     </div>
                     <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowPayments_JAX11">
                        <div data-testid="payment-receipt-status" class="payment-receipt_receiptRowName_Me4zF"> Pagado • Efectivo • 15/09/2025 10:29 </div>
                        <div data-testid="payment-receipt-amount-text" class="payment-receipt_receiptRowTotal_bf2SM">
                           <span>20,00€</span>
                        </div>
                     </div>
                     <div class="payment-receipt_receiptRow_n1eic payment-receipt_size--12_zJMLU payment-receipt_receiptRowTotalPaid_th16p">
                        <div class="payment-receipt_receiptRowName_Me4zF"> Total pagado </div>
                        <div data-testid="payment-receipt-paid" class="payment-receipt_receiptRowTotal_bf2SM size--12-b"> 20,00€</div>
                     </div>
                  </div>
               </div>
               <div class="receipt_break_EL1Lq">
                  <div></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div> --}}
