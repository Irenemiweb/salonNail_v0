<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Modificación de reserva</title>
</head>
<body>
    <div bgcolor="#f9f9f9" marginheight="20" marginwidth="20">
   <center>
      <table bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%">
         <tbody>
            <tr>
               <td>
                  <a href="https://salonnail.kesug.com" target="_blank">
                    <img style="filter: invert(1);" class="mensajes" src="{{ asset('storage/image_emails/cavecera_email_africa.png') }}" alt="África Nail art studio salón de uñas en Ourense" />

                  </a>
               </td>
            </tr>
            <tr>
               <td valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-left:1px solid #f9f9f9;border-right:1px solid #f9f9f9" width="100%">
                     <tbody>
                        <tr>
                           <td style="background:#fff" valign="top">
                              <div id="m_-2327228021961542181inserted_content" style="padding:40px 0 0">
                                 <span class="im">
                                 <span style="color:#5e5e5e;font-family:arial;font-size:16px;line-height:26px">
                                 <b>
                                 <span style="text-transform: capitalize">{{ config('app.name') }}</span></b> a modificado tu reserva.

                                 <br>
                                <span style="color:#5e5e5e;font-family:arial;font-size:16px;line-height:26px">
                                    Dirígete a
                                    <a href="https://salonnail.kesug.com/" style="color:#26cbc5;text-decoration:underline" target="_blank">
                                        <b>
                                        África Nail art Studio
                                        </b>
                                    </a>
                                    después inicia sesión en tu panel para confirmar o cambiar la fecha, hora, empleado o servicio propuestos.
                                    Si no recibimos la confirmación del cambio propuesto, tu cita puede ser cancelada.
                                    </span>
                                 </span>
                                 <br>
                                 <br>
                                 </span>
                                 <div style="line-height:18px">
                                    <span class="im" style="color:black!important">
                                       <div style="background-color:#f4f4f4;padding:15px 20px;border:1px solid #fff">
                                          <div>
                                             <b style="text-transform: capitalize">
                                             {{ config('app.name') }}
                                             </b>
                                          </div>
                                          <div>
                                             Praza Da Estacion, 36, Ourense
                                          </div>
                                       </div>
                                    </span>
                                    @php
                                        use Carbon\Carbon;

                                        // Ordenar reservas por fecha de inicio
                                        $ordenadas = $reservas->sortBy('date_time');

                                        // Obtener la primera y última hora
                                        $primera = Carbon::parse($ordenadas->first()->date_time);
                                        $ultima = Carbon::parse($ordenadas->last()->date_time)->copy()->addMinutes($ordenadas->last()->duration);

                                        // Fecha con formato largo en español (asegúrate de tener la localización configurada)
                                        setlocale(LC_TIME, 'es_ES.UTF-8');
                                        $fecha_larga = ucfirst($primera->translatedFormat('l, d \\d\\e F \\d\\e Y'));
                                        $hora_inicio = $primera->format('H:i');
                                        $hora_fin = $ultima->format('H:i');
                                    @endphp
                                    {{-- FECHA RESERVA, Y HORARIO DE LA SIGUIENTE MANERA SI SON VARIAS  : HORA INICIO -> HORA INICIO DEL PRIMER SERVICIOS , HORA FIN -> HORA FIN DEL ULTIMO SERVICIO--}}
                                    <div style="padding:15px 0 10px 0">
                                       <span style="color:#5e5e5e;font-family:arial;font-size:16px;line-height:26px">
                                        La fecha de la cita será el:<br> <b>
                                       {{-- viernes, 19 de septiembre de 2025, 15:55 - 16:55 --}}
                                       {{ $fecha_larga }}, {{ $hora_inicio }} - {{ $hora_fin }}
                                       </b>
                                        </span>
                                    </div>
                                    <div style="background:#9d9d9d;height:1px;line-height:1px;font-size:1px">
                                    </div>
                                    @foreach ($ordenadas as $reserva)
                                        @php
                                            $inicio = Carbon::parse($reserva->date_time)->format('H:i');
                                            $fin = Carbon::parse($reserva->date_time)->copy()->addMinutes($reserva->duration)->format('H:i');

                                            $empleada = $reserva->empleada;
                                            // $imagen_empleada = $empleada->img_empleada
                                            //     ? asset('storage/' . $empleada->img_empleada)
                                            //     : 'https://static.booksy.com/static/live/es/img/userBlank.png';

                                            $servicio = $reserva->servicio;
                                            $precio = number_format($servicio->precio, 2, ',', '.') . ' €';
                                        @endphp
                                        <table cellpadding="0" cellspacing="0" style="border-bottom:solid 1px #ccc;line-height:18px;font-size:12px;width:100%;border-collapse:collapse">
                                        <tbody>
                                            <tr>
                                               <td style="padding:10px 0;vertical-align:middle" valign="middle" width="80px">
                                                    <img
                                                        src="{{ $empleada->img_empleada ? asset('storage/' . $empleada->img_empleada) : 'https://static.booksy.com/static/live/es/img/userBlank.png' }}"
                                                        style="background-color:#bbb;
                                                            border-radius:50%;
                                                            width:80px;
                                                            height:80px;
                                                            border:solid 1px #bbb;
                                                            vertical-align:middle;
                                                            object-fit:cover;"
                                                        alt="Imagen empleada">
                                                </td>
                                                <td style="padding-left:20px;text-align:left" valign="middle">
                                                    <div>
                                                        {{-- servicio->nombre --}}
                                                    {{-- Pedicura --}}
                                                     {{ $servicio->nombre }}
                                                    </div>
                                                    <div>
                                                        {{-- servicio->precio, servicio->precio --}}
                                                    {{-- 20,00&nbsp;€,
                                                    15:55 - 16:55 --}}
                                                     {{ $precio }}, {{ $inicio }} - {{ $fin }}
                                                    </div>
                                                    <div>
                                                        {{-- empleado->nombre empleada->primerApellido --}}
                                                    {{-- con
                                                    sofia valenzuela --}}
                                                   <span style="color:#5e5e5e;font-family:arial;font-size:16px;line-height:26px">Serás atendido por <b>{{ strtolower($empleada->nombre . ' ' . $empleada->primerApellido ?? '') }}</b></span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    @endforeach
                                    <div style="text-align:center;padding-top:20px">
                                       <div style="display:inline-block">
                                          <table border="0" cellpadding="0" cellspacing="0" style="border:1px solid #0ba3ad;border-radius:32px;background:#fff">
                                             <tbody>
                                                <tr>
                                                   <td valign="middle">
                                                      <a href="https://www.google.com/maps/search/?api=1&query={{ urlencode($direccionMaps) }}" style="color:#fff;display:inline-block;font-family:arial;font-size:12px;line-height:normal;padding:10px 5px 10px 15px;text-decoration:none" target="_blank" >
                                                      <img src="https://ci3.googleusercontent.com/meips/ADKq_NYAwcACmf0EPFpYyRspBVjDWbKvqLprcFCc0RgAl664bPoXrMwpKK3FWG7OJXtN8WUOXkqvODM-ByHnK7A5VqiMixARqwYNlcwhpDHFyf4D=s0-d-e1-ft#https://static.booksy.com/static/live/es/scenarios/map.png" class="CToWUd" data-bit="iit">
                                                      </a>
                                                   </td>
                                                   <td valign="middle">
                                                      <a href="https://www.google.com/maps/search/?api=1&query={{ urlencode($direccionMaps) }}" style="color:#0ba3ad;display:inline-block;font-family:arial;font-size:16px;line-height:normal;padding:10px 15px 10px 5px;text-decoration:none" target="_blank">
                                                      Como llegar
                                                      </a>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                          <br>
                                          <br>
                                       </div>
                                    </div>
                                 </div>
                                 <span class="im">
                                 <br>
                                 <span style="color:#5e5e5e;font-family:arial;font-size:16px;line-height:26px">
                                 Para modificar o cancelar una reserva, inicia sesión:
                                 <a href="https://salonnail.kesug.com/" style="color:#26cbc5;text-decoration:underline" target="_blank" data-saferedirecturl="">
                                 <b>
                                  {{ config('app.name') }} Nail art Studio
                                 </b>
                                 </a>
                                 Entra en tu panel personal y selecciona "Mis reservas".
                                 </span>
                                 <br>
                                 <br>
                                 </span>
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td style="background:#f3f3f3;height:1px" valign="top">
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
