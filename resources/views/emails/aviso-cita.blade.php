{{-- <h2>¡Hola!</h2>
<p>Te recordamos que tienes una cita programada para <strong>{{ \Carbon\Carbon::parse($reserva->date_time)->format('d/m/Y H:i') }}</strong> en África Nail Art Studio.</p>
<p>Si necesitas cancelar o cambiar la cita, contáctanos con antelación.</p>
<p>¡Gracias por elegirnos!</p> --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorio de cita en África Nail art Studio salón Ourense</title>
    <style>

    </style>
</head>
<body>
	<div bgcolor="#f9f9f9" marginheight="20" marginwidth="20">
		<center>
			<table bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%">
				<tbody>
					<tr>
						<td style="border-left: 2px solid #eee;border-right: 2px solid #eee;border-top: 2px solid #eee;">
							<a href="" target="_blank">
                                <img style="width: 58px!important; filter: invert(1);" class="mensajes" src="{{ asset('storage/images/cavecera_email_africa.png') }}" alt="África Nail art studio salón en Ourense" />
							</a>
						</td>
					</tr>
					<tr>
						<td valign="top">
							<table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-left:1px solid #f9f9f9;border-right:1px solid #f9f9f9">
								<tbody>
									<tr>
										<td style="background: #fff" valign="top">
											<div style="">
												<div style="background-color:#f9f9f9;width:100%;color:#383734;font-family:'Proxima Nova',Arial;font-size:11px;line-height:18px;font-weight:400">
													<center>
														<div style="border-bottom: 2px solid #eee;padding:15px 15px 15px 15px;border-left:2px solid #eee;border-right:2px solid #eee;background:#fff">
															<table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:10px;color:#605f5d">
																<tbody>
																	<tr>
                                                                        <td align="left" style="font-size:0;padding:0;word-break:break-word">
                                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="/* border-collapse:separate; *//* line-height:100%; */">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" bgcolor="#00be70" role="presentation" style="border:none;border-radius:14px;height:28px;background:#00be70" valign="middle">
                                                                                            <p style="display:inline-block;background:#00be70;color:#fff;font-family:Arial,Helvetica,Ubuntu,sans-serif;line-height:14px;margin:0;text-decoration:none;text-transform:none;padding:0 13px 0 5px;border-radius:14px">
                                                                                                <span>
                                                                                                    <img style="vertical-align:middle" src="https://ci3.googleusercontent.com/meips/ADKq_NbNU0v2v95cHney7ayiem5olan9P42OSZ59ZMmTQ_RFsrwOYLSWx98Z6-72cgmsWYDQfuTsnF_Uossvhis2eYe0sfTwaUvaaBYMJw2sz6fJwVp9pCKDCgZe2vxsELYmTDCHloXEhKPLtqmvt6LmSFUH9Q=s0-d-e1-ft#https://cdn-static-email-generator.fresha.com/confirmed_d98586992935e65e99e373742ec30bc0.png" width="30" height="30" class="CToWUd" data-bit="iit">
                                                                                                </span>
                                                                                                {{-- <span style="vertical-align:middle;color:#fff;background-color:#00be70"> --}}
                                                                                                    {{-- <span style=""> --}}
                                                                                                        <span style="font-size:11px;vertical-align: middle;">{{ $status }}</span>
                                                                                                    {{-- </span> --}}
                                                                                                {{-- </span> --}}
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
																</tbody>
															</table>
                                                            <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:10px;color:#605f5d">
																<tbody>
																	<tr>
																	   <td>
																		<div style="font-family:Arial,Helvetica,Ubuntu,sans-serif;font-size:28px;font-weight:700;line-height:34px;text-align:left;color:#101928">Esperamos verte pronto {{ $reservas->first()->user->name }}</</div>
																	   </td>
																	  </tr>
																</tbody>
															</table>
															{{-- <table cellpadding="0" cellspacing="0" style="width:100%;padding-bottom:10px">
															  <tbody><tr>
															   <td>
															   </td>
															  </tr>
															 </tbody></table> --}}
															<table cellpadding="0" cellspacing="0" style="width:100%;color:#605f5d">
															  <tbody>
                                                                <tr>
															   <td style="padding-bottom:15px;font-size:11px">
                                                                <p style="font-size: 17px">Te recordamos que tienes cita el {{ \Carbon\Carbon::parse($reservas->first()->date_time)->translatedFormat('l d \d\e F \a \l\a\s H:i') }} en África Nail art Studio</p>

															   </td>

															  </tr>
															 </tbody>
                                                            </table>
                                                            <table cellpadding="0" cellspacing="0" style="width:100%;color:#605f5d">
															  <tbody>
                                                              <tr>
                                                                <td align="center" bgcolor="#131313" role="presentation" style="background:white;float: inline-start;width: 70%;" valign="middle">
                                                                    <a href="#" style="border: 1px solid black;display:inline-block;background:#131313;color:#fff;font-family:Arial,Helvetica,Ubuntu,sans-serif;font-size:17px;font-weight:700;line-height:24px;margin:0;text-decoration:none;text-transform:none;padding:12px 20px;border-radius:4px" target="_blank">Cómo llegar</a>
                                                                </td>
                                                                <td align="center" bgcolor="#ffffff" role="presentation" style="width: 50%;" valign="middle">
                                                                    <a href="#" style="border: 1px solid black;display:inline-block;background:white;color:black;font-family:Arial,Helvetica,Ubuntu,sans-serif;font-size:17px;font-weight:700;line-height:24px;margin:0;text-decoration:none;text-transform:none;padding:12px 20px;border-radius:4px" target="_blank">Gestionar cita</a>

                                                                </td>
                                                              </tr>
															 </tbody>
                                                            </table>
															<table cellpadding="0" cellspacing="0" style="width:100%">
															  <thead>
															   <tr>
																<th style="text-align:left;font-weight:400;border-bottom:1px solid #e1e1e1;text-transform:uppercase;padding-top:1rem">
																 Datos de la cita
																</th>
																<th style="width:10%;border-bottom:1px solid #e1e1e1">
																</th>
																{{-- <th style="text-align:right;width:20%;font-weight:400;font-size:10px;border-bottom:1px solid #e1e1e1;color:#c3c1bc;text-transform:uppercase">
																 Cantidad
																</th> --}}
															   </tr>
															  </thead>
															 <tbody>
                                                                    @php
                                                                    $subtotal = 0;
                                                                    @endphp

                                                                    @foreach ($reservas as $reserva)
                                                                    @php
                                                                        $servicio = $reserva->servicio;
                                                                        $precio = $servicio->precio ?? 0;
                                                                        $subtotal += $precio;
                                                                    @endphp
                                                                    <tr>
                                                                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                                                                        <strong>{{ $servicio->nombre }}</strong><br>
                                                                        <span style="color: #555;">{{ $servicio->duracion }} con {{ $reserva->empleada->nombre }}</span>
                                                                        </td>
                                                                        <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">
                                                                        {{ number_format($precio, 2) }}&nbsp;€
                                                                        </td>
                                                                    </tr>
                                                                    @endforeach

                                                                    @php
                                                                    $impuestos = round($subtotal * 0.21, 2); // Asumiendo 21% de IVA, cambia si es otro
                                                                    $total = $subtotal + $impuestos;
                                                                    @endphp

                                                                    <tr>
                                                                    <td style="padding: 8px;">Impuestos</td>
                                                                    <td style="text-align: right; padding: 8px;">{{ number_format($impuestos, 2) }}&nbsp;€</td>
                                                                    </tr>
                                                                    <tr>
                                                                    <td style="padding: 8px; font-weight: bold;">Total</td>
                                                                    <td style="text-align: right; padding: 8px; font-weight: bold;">{{ number_format($total, 2) }}&nbsp;€</td>
                                                                    </tr>
                                                                </tbody>

															 </table>

															<div></div>
														</div>
														{{-- <img alt="" src="https://ci3.googleusercontent.com/meips/ADKq_NalGDY2M-HGR8yxmHD2lKJdG5yU59SkTPBzdrAJQHfFJ4aiX1tLi1hSYuyexrN-i_Hp_oGR1qSud7Rw16I1onIIi_ygu9q9pBIzg5FfIdZXP54=s0-d-e1-ft#https://static.booksy.com/static/live/es/scenarios/claws.png" style="width:100%;vertical-align:top" class="CToWUd" data-bit="iit"> --}}
													</center>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
</body>
</html>

