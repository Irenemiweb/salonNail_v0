<!DOCTYPE html>
<html lang="en">
<head>
     @auth
        @include('Chatify::layouts.headLinks')
    @endauth
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="_token" content="{{ csrf_token() }}">
    <meta property="og:locale" content="es_ES">
    <meta property="og:type" content="website">
    <link rel="canonical" href="http://salonnail.kesug.com/">
    <meta property="og:title" content="{{ config('app.name') }} Salón NAILS Ourense - {{ config('app.name') }} Salón Ourense">
    <meta property="og:description" content="Salón de Manicura y Pedicura en Ourense Bienvenid@s a {{ config('app.name') }} Nail art Studio. Somos un centro con una amplia variedad de tratamientos de manicura y pedicura junto con otros opciones destinadas a vuestra belleza. Te esperamos en Ourense. RESERVAR CITA PREVIA http://salonnail.kesug.com/ TRATAMIENTOS Uñas & Belleza Manicura rusa Cuidamos de tus uñas y hacemos que luzcan perfectas. […]">

    <meta property="og:url" content="http://salonnail.kesug.com/">
    <meta property="og:site_name" content="{{ config('app.name') }} Salón Ourense">
        <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css2/bootstrap2.css') }}">
    <link rel="stylesheet" href="{{ asset('css2/fonts2.css') }}">
     <link rel="stylesheet" href="{{ asset('css/tabs/tabs.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.css') }}">
    <link rel="stylesheet" href="{{ asset('css2/style2.css') }}">

    <link href="{{ asset('assets2/vendor/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ asset('css/aos/aosCss.css') }}" rel="stylesheet">
    <script src="{{ asset('js/aos/aosJs.js') }}"></script>
    <title class="">Manicura pedicura Ourense uñas | {{ config('app.name') }}</title>
    <!-- cabecera -->
<link rel="stylesheet" href="{{ asset('css/cabecera/cabecera.css') }}" rel="stylesheet">
    {{-- offcanva reserva servicio --}}
<link rel="stylesheet" href="{{ asset('css/offcanva-reserva-servicio/offcanvaReservaServicio.css') }}" rel="stylesheet">
<!-- style category-list -->
<link rel="stylesheet" href="{{ asset('css/up-product/category-list/category-list.css') }}" rel="stylesheet">
<!-- botones -->
{{-- <link rel="stylesheet" href="{{ asset('css/btn/btn.css') }}" rel="stylesheet"> --}}
<!-- Vendor CSS Files -->
  {{-- <link href="{{ asset('assets2/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
  <link href="{{ asset('assets2/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet"> --}}
    {{-- ESRI MAP --}}
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
    <!-- Load Esri Leaflet from CDN -->
    <script src="https://unpkg.com/esri-leaflet@3.0.12/dist/esri-leaflet.js"></script>
    <!-- Load Esri Leaflet Geocoder from CDN -->
    <link rel="stylesheet" href="https://unpkg.com/esri-leaflet-geocoder@3.1.4/dist/esri-leaflet-geocoder.css" crossorigin="" />
    <script src="https://unpkg.com/esri-leaflet-geocoder@3.1.4/dist/esri-leaflet-geocoder.js" crossorigin=""></script>
    <script src="{{ asset('js/pusher/pusherNew.js') }}"></script>
    {{-- icono --}}
    <link style="margin-left:3px;!important" sizes="32x32" rel="icon" type="image/svg" href="{{ asset('storage/cabecera/logo_CC.svg') }}">
    <link href="{{ asset('storage/img/apple-touch-icon.png') }}" rel="apple-touch-icon">
    {{-- mensajes --}}
    <link rel="stylesheet" href="{{ asset('css/message/alert-message.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/indexverdi.css') }}" rel="stylesheet">
    <link href="{{ asset('assets2/vendor/aos/aos.css') }}" rel="stylesheet">
  <link href="{{ asset('css/aos/aosCss.css') }}" rel="stylesheet">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    {{-- calendario de javascript manifest.json --}}
     <link rel="manifest" href="https://irenemiweb.github.io/pwa-assets/manifest.json">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/es.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/plugins/monthSelect/index.js"></script>
    {{-- Alerts de javascript con sweetAlert --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


</head>
@auth
    @include('Chatify::layouts.footerLinks')
@endauth
<body class="maniPedi" style="overflow: auto">
    <div id="loaderSperaAdministrator59" class="loaderWhite d-none" style="z-index: 99999">
        <div class="spinnerGreen"></div>
    </div>
     <div class="preloader">
      <div class="preloader-body">
        <div class="cssload-jumping"><span></span><span></span><span></span><span></span><span></span></div>
      </div>
    </div>
    <div class="page">
      <!-- Page Header-->
   <header class="section page-header">
        <!-- RD Navbar-->
        <div class="rd-navbar-wrap">
            <nav class="rd-navbar rd-navbar-classic navbarOcultarReserva" data-layout="rd-navbar-fixed" data-sm-layout="rd-navbar-fixed" data-md-layout="rd-navbar-fixed" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-static" data-xl-layout="rd-navbar-static" data-xl-device-layout="rd-navbar-static" data-lg-stick-up-offset="46px" data-xl-stick-up-offset="46px" data-xxl-stick-up-offset="46px" data-lg-stick-up="true" data-xl-stick-up="true" data-xxl-stick-up="true">
                <div class="rd-navbar-collapse-toggle rd-navbar-fixed-element-1" data-rd-navbar-toggle=".rd-navbar-collapse"><span></span></div>
                <div class="rd-navbar-aside-outer rd-navbar-collapse">
                <div class="rd-navbar-aside">
                    <div class="header-info">
                    <ul class="list-inline list-inline-md">
                        <li>
                        </li>
                        <li>
                        <div class="unit unit-spacing-xs align-items-center">
                                {{-- <div class="unit-left font-weight-bold">Tienes dudas ?</div>
                                <div class="unit-body">
                                    <a href="https://wa.me/34682499506" target="_blank">
                                        <i class="fa-brands fa-whatsapp" style="color: #63E6BE;"></i>
                                    </a>
                                </div> --}}
                            <div class="unit-left font-weight-bold">Free Call:</div>
                            <div class="unit-body"><a href="tel:#">(073) 123-12-12</a></div>
                        </div>
                        </li>
                        <li>
                        <div class="unit unit-spacing-xs align-items-center">
                            <div class="unit-left font-weight-bold">Opening Hours: </div>
                            <div class="unit-body"> Mn-Fr: 10 am-8 pm</div>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div class="social-block">
                    <ul class="list-inline">
                        <li><a class="icon fa-facebook" href="#"></a></li>
                        <li><a class="icon fa-twitter" href="#"></a></li>
                        <li><a class="icon fa-google-plus" href="#"></a></li>
                        <li><a class="icon fa-vimeo" href="#"></a></li>
                        <li><a class="icon fa-youtube" href="#"></a></li>
                        <li><a class="icon fa-pinterest-p" href="#"></a></li>
                    </ul>
                    </div>
                </div>
                </div>
                <div class="rd-navbar-main-outer">
                <div class="rd-navbar-main" style="max-width: inherit;margin-left: inherit;margin-right: inherit;">
                    <!-- RD Navbar Panel-->
                    <div class="rd-navbar-panel">
                    <span style="box-shadow: none;border:none" class="next-element" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="transform:translate3d(0px, 21.473px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 21.473px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span>

                    <!-- RD Navbar Toggle-->
                    <button class="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>
                    <!-- RD Navbar Brand-->
                        <div class="rd-navbar-brand">
                            <a class="brand" href="{{ route('init_page') }}">
                                {{-- <img src="{{ asset('storage/images/logo-dark-main-257x84.png') }}" alt="afri salon uñas ourense" width="" height=""/> --}}
                                 <h3 style="position: relative;z-index:9" class="afri nameSite66">{{ config('app.name') }}</h3>
                            </a>
                        </div>
                    </div>
                <div class="rd-navbar-main-element">
                        <div class="rd-navbar-nav-wrap">
                            <!-- RD Navbar Nav-->
                            <ul class="rd-navbar-nav">
                                <li class="rd-nav-item active">
                                    <a class="rd-nav-link" href="{{ route('init_page') }}">Inicio</a>
                                </li>
                                <li class="rd-nav-item">
                                    <a class="rd-nav-link" href="#">Menú</a>
                                    <!-- Submenú desplegable -->
                                    <ul class="rd-menu rd-navbar-dropdown" style="background-color: #f5f4f4;">
                                        <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="{{ url('about-us') }}">Nosotros</a></li>
                                        <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="{{ url('pricing') }}">Precios</a></li>
                                        <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="{{ url('contacts') }}">Contacto</a></li>
                                        <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="{{ url('portfolio') }}">Portafolio</a></li>
                                        <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="{{ url('team') }}">Equipo</a></li>
                                    </ul>
                                </li>

                                <li class="rd-nav-item"><a class="rd-nav-link" href="{{ url('typography') }}">Servicios</a></li>
                                <li class="rd-nav-item"><a class="rd-nav-link" href="{{ url('contacts') }}">Para ti</a></li>
                                <li class="rd-nav-item"><a class="rd-nav-link" href="{{ url('contacts') }}">Nuestros tips</a></li>

                                @auth
                                    <li class="rd-nav-item">
                                        @if (Auth::user()->is_admin)
                                            <a class="rd-nav-link" href="{{ route('admin.dashboard') }}">Panel</a>
                                        @else
                                            <a class="rd-nav-link" href="{{ route('panelAdmin_user') }}">Panel</a>
                                        @endif
                                    {{-- </li> --}}
                                        <ul class="rd-menu rd-navbar-dropdown" style="background-color: #f5f4f4;">
                                            <li class="rd-dropdown-item">
                                                <a class="rd-dropdown-link" href="{{ route('panelAdmin_user') }}" wire:navigate>
                                                    <img class="rounded-circle imgCabecera" width="35" height="35" src="{{ Auth::user()->profile_photo_url }}" alt="{{ Auth::user()->name }}" />
                                                    <span class="submenuUser">Tú</span>
                                                </a>
                                            </li>
                                            <li class="rd-dropdown-item message_initPage">
                                                <a class="rd-dropdown-link" href="{{ route('panelAdmin_user_Message') }}">
                                                    <img style="width: 58px!important; filter: invert(1);" class="mensajes" src="{{ asset('storage/cabecera/mail_w.svg') }}" alt="mensajes" />
                                                    <span class="submenuUser">Mensajes</span>
                                                    <div class="listOfContacts listOfContactNotChat" style="width: 100%; height: 0px;"></div>
                                                </a>
                                            </li>
                                            <li class="rd-dropdown-item">
                                                <a class="rd-dropdown-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                                    <img style="filter: invert(1);" class="salir" width="35" height="35" src="{{ asset('storage/cabecera/log-out_w.svg') }}" alt="Salir" />
                                                    <span class="submenuUser">{{ __('Log Out') }}</span>
                                                </a>
                                                <form id="logout-form" method="POST" action="{{ route('logout') }}" style="margin-bottom: 0px;">
                                                    @csrf
                                                </form>
                                            </li>

                                            @if (Auth::user()->is_admin)
                                                <li class="rd-dropdown-item">
                                                    <a class="rd-dropdown-link" href="{{ route('admin.dashboard') }}">
                                                        <img style="margin-right: 5px; filter: invert(1);" width="35" height="35" src="{{ asset('storage/cabecera/panel_w.svg') }}" alt="Panel de administrador" />
                                                        <span class="submenuUser">Panel</span>
                                                    </a>
                                                </li>
                                                <li class="rd-dropdown-item">
                                                    <a class="rd-dropdown-link notificationNewReservIndex" href="{{ route('admin.citas') }}">
                                                        <img style="width: 35px; filter: invert(1);" class="mensajes" src="{{ asset('storage/cabecera/notificacion.svg') }}" alt="subir anuncio" />
                                                        <span class="ms-1 submenuUser">Notificaciones</span>
                                                    </a>
                                                </li>
                                            @else
                                                <li class="rd-dropdown-item">
                                                    <a class="rd-dropdown-link" href="{{ route('panelAdmin_user') }}" onclick="getContacts(); getFavoritesList();">
                                                        <img style="margin-right: 5px; filter: invert(1);" width="35" height="35" src="{{ asset('storage/cabecera/panel_w.svg') }}" alt="Panel User" />
                                                        <span class="submenuUser">Panel User</span>
                                                    </a>
                                                </li>
                                            @endif
                                        </ul>
                                    </li>
                                @endauth
                            </ul>
                        </div>
                    </div>

                    <div class="elementor-widget-container botonReservarNavegacion">
                        <div class="elementor-button-wrapper">
                            <a class="elementor-button elementor-button-link elementor-size-sm entrar_registrase" href="{{ Auth::check() ? "#services" : 'javascript:void(0);' }}" class="{{ Auth::check() ? '' : 'entrar_registrase' }}" data-auth="{{ Auth::check() ? 1 : 0 }}">
                            {{-- <a class="elementor-button elementor-button-link elementor-size-sm entrar_registrase" href="#services"> --}}
                                <span class="elementor-button-content-wrapper" style="color: white">
                                    <span class="elementor-button-text">Reservar</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </nav>
        </div>
    </header>
      <section class="section-page-title" style=" background-image: url('{{ asset('storage/' . $categoriaGeneral->backgroundImage) }}');background-size: cover;background-position: center;">
        <div class="container">
          {{-- background-image: url('{{ asset('storage/' . $categoriaGeneral->imagen) }}');  --}}
        </div>
      </section>
      <section class="breadcrumbs-custom" style="z-index: 1">
        <div class="container">
          <ul class="breadcrumbs-custom-path">
            <li><a href="{{ route('init_page') }}">Inicio</a></li>
            <li class="active">Reserva online {{ $categoriaGeneral->nombre }}</li>
          </ul>
        </div>
      </section>
      <section class="section section-lg bg-default">
        <div class="container">
          <div class="row row-50 align-items-lg-center justify-content-xl-between" style="margin-bottom: 0px;">
            <div class="col-12" style="z-index: 1">
              <div class="">
                <h2 class="afri d-flex elementor-heading-title"><div class="divider-lg dividerModificado"></div>{{ $categoriaGeneral->nombre }}</h2>

                <p class="big text-gray-800">{{ $categoriaGeneral->frase }}</p>
              </div>
              <div class="row row-30">
                <div class="col-md-6">
                  <div class="box-contact-info-with-icon"><span class="icon mdi mdi-clock icon-primary"></span>
                    <h5>Nuestro horario</h5>
                    <ul class="list-xs">
                      <li> <span class="text-gray-800">Lunes-Viernes: </span> 9:00 – 20:00
                      </li>
                      <li><span class="text-gray-800">Sábado:</span> 9:00 - 14:00
                      </li>
                      <li><span class="text-gray-800">Domingo: </span> Cerrado
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="box-contact-info-with-icon"><span class="icon mdi icon-primary"><i style="filter: drop-shadow(0px 1px 0.3px rgb(193, 192, 192));" class="bi bi-geo-alt-fill"></i></span>
                    <h5>Nuestra ubicación</h5>
                    <ul class="list-xs">
                      <li><span class="text-gray-800">Address: </span> Washington, USA 6036 Richmond hwy.,  VA, 2230
                      </li>
                      <li><span class="text-gray-800">Offices: </span> 284-290
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <span style="box-shadow: none;border:none" class="next-element23" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="transform:translate3d(0px, 20.082px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 20.082px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span>
            {{-- <span class="next-element24" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="transform:translate3d(0px, 20.082px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 20.082px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span> --}}

            <div class="col-12">
              <!-- Accordion -->
                <div id="accordionCategory66" class="accordion">
                    <span style="box-shadow: none;border:none" class="next-element3" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="transform:translate3d(0px, 16.782px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 16.782px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span>
                    @foreach($categoriasServicios as $index => $categoria)
                    <!-- Accordion item 1 -->
                    <div class="card card5620">
                        <div id="heading{{ $index }}" class="card-header border-0" style="max-height: 5rem;">
                            <h2 class="mb-0" style="width: 95%;font-size: inherit;">
                            <button type="button" data-toggle="collapse" data-target="#collapse{{ $index }}" aria-expanded="false"
                                aria-controls="collapse{{ $index }}"
                                class="font-24 afri btn btn-link text-dark font-weight-bold collapsible-link text-decoration-none">
                                {{ $categoria->categoria }}
                            </button>
                            </h2>
                        </div>
                        <div id="collapse{{ $index }}" aria-labelledby="heading{{ $index }}" data-parent="#accordionCategory66" class="collapse">
                            <div class="card-body bg-white booked-appt-list bodyServiciosMovil" style="overflow-y: auto;height: 25rem;padding:0px">
                                @foreach($categoria->servicios as $indexServicio => $servicio)
                                    @php
                                        // Asegurarse de que la fecha actual no sea sábado o domingo
                                        if ($fechaActual2->isSaturday() || $fechaActual2->isSunday()) {
                                            $fechaActual2 = $fechaActual2->next(Carbon\Carbon::MONDAY);
                                        }
                                    @endphp
                                    <div class="timeslot bookedClearFix justify-content-between" style="background-color: #f6f6f6;padding: 0px 12px;">
                                        <span class="timeslot-time p-0" style="font-weight: 300">
                                            {{ $servicio->nombre }}
                                            <span class="timeslot-range d-block mt-1">
                                                <i style="font-size: small" class="bi bi-clock-fill"></i>
                                                 @if ($servicio->horaNewService > 0)
                                                    {{ $servicio->horaNewService }}h {{ $servicio->minutosNewService }}min
                                                @else
                                                    {{ $servicio->minutosNewService }}min
                                                @endif
                                            </span>
                                        </span>
                                        <div class=" align-content-center">
                                            <span class="small" style="float: inline-end;">{{$servicio->precio}}€</span >
                                            </div>
                                            <div class="butonMoreInfo">
                                                 <span class="timeslot-people align-content-center" style="padding-right: 0px;display:block">
                                                    <button onclick="showHiddenMoreInfoService(this, 'informacionAdicionalServicio{{ $servicio->id }}')" style="color:black; background-color: #cef1ea;letter-spacing: 0px;font-weight: 500;margin-top: inherit;border:none!important;text-transform: none;border-radius: 28px;font-size: 13px;" class="butonHoverReserv">
                                                        <span class="button-text">+ info</span>
                                                    </button>
                                                    <button style="color:black; background-color: #cef1ea;letter-spacing: 0px;font-weight: 500;margin-top: inherit;border:none!important;text-transform: none;border-radius: 28px;font-size: 13px;"
                                                        onclick="userIsAutenticated();initDatePikerSoloMes('{{ $servicio->id }}');notShowNavbar();"
                                                        data-dateActual="{{ $fechaActual2 }}"
                                                        data-index="{{ $servicio->id }}" class="butonHoverReserv divButonReservSmall btn-sm btn-versionMovil"
                                                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomReserva{{ $servicio->id }}" aria-controls="offcanvasBottomReserva{{ $servicio->id }}">
                                                        <span class="button-text">Reservar</span>
                                                    </button>
                                                </span>
                                            </div>
                                    </div>
                                         <div class="col-12 informacionAdicionalServicio{{ $servicio->id }} slide-toggle" style="padding-left: 0px;padding-right: 0px;">
                                            <ul class="nav nav-pills nav-fill" id="sevicesTab{{ $servicio->id }}" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link active" id="descripcion-tab{{ $servicio->id }}" data-bs-toggle="tab"
                                                        href="#descripcion{{ $servicio->id }}" role="tab"
                                                        aria-controls="descripcion{{ $servicio->id }}" aria-selected="true">Descripción</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link" id="paso-a-paso-tab{{ $servicio->id }}" data-bs-toggle="tab"
                                                        href="#paso-a-paso{{ $servicio->id }}" role="tab"
                                                        aria-controls="paso-a-paso{{ $servicio->id }}" aria-selected="false">Paso a paso</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link" id="debes-saber-tab{{ $servicio->id }}" data-bs-toggle="tab"
                                                        href="#debes-saber{{ $servicio->id }}" role="tab"
                                                        aria-controls="debes-saber{{ $servicio->id }}" aria-selected="false">Debes saber</a>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <a class="nav-link" id="info-adicional-tab{{ $servicio->id }}" data-bs-toggle="tab"
                                                        href="#info-adicional{{ $servicio->id }}" role="tab"
                                                        aria-controls="info-adicional{{ $servicio->id }}" aria-selected="false">Información
                                                        adicional</a>
                                                </li>
                                            </ul>

                                            <!-- Contenido de las pestañas -->
                                            <div class="tab-content" id="sevicesContentTab{{ $servicio->id }}">
                                                <div class="tab-pane fade show active" id="descripcion{{ $servicio->id }}" role="tabpanel"
                                                    aria-labelledby="descripcion-tab{{ $servicio->id }}">
                                                    <div class="row">
                                                        <div class="col-md-6" style="margin-top:2px;display: flex;flex-direction: column;justify-content: center;">
                                                            <p class="text-gray">{{ $servicio->descripcion }}</p>
                                                        </div>
                                                        <div class="col-md-6" style="display: flex;justify-content:center">
                                                            @if($servicio->image)
                                                            <img style="width:18rem; border-radius:10px " src="{{ asset('storage/' . $servicio->image->path) }}" alt="{{ $servicio->nombre }}"
                                                                class="img-fluid" style="max-width: 100%; height: auto; max-height: 200px;">
                                                            @else
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade" id="paso-a-paso{{ $servicio->id }}" role="tabpanel"
                                                    aria-labelledby="paso-a-paso-tab{{ $servicio->id }}">
                                                    @if ($servicio->pasos)
                                                        <ul class="pasos-lista">
                                                            @foreach (explode("\n", $servicio->pasos) as $paso)
                                                                @if (trim($paso) !== '')
                                                                    <li style="display: list-item">{{ $paso }}</li>
                                                                @endif
                                                            @endforeach
                                                        </ul>
                                                    @else
                                                        <p class="text-muted">No hay pasos definidos para este servicio.</p>
                                                    @endif
                                                </div>
                                                <div class="tab-pane fade" id="debes-saber{{ $servicio->id }}" role="tabpanel"
                                                    aria-labelledby="debes-saber-tab{{ $servicio->id }}">
                                                    {{-- <h4>Información que debes saber</h4> --}}
                                                    <p>{{ $servicio->debes_saber }}</p>
                                                </div>
                                                <div class="tab-pane fade" id="info-adicional{{ $servicio->id }}" role="tabpanel"
                                                    aria-labelledby="info-adicional-tab{{ $servicio->id }}">
                                                    {{-- <h4>Información adicional</h4> --}}
                                                    <p>{{ $servicio->info_adicional }}</p>
                                                </div>
                                            </div>
                                        </div>
                                     {{-- <x-reserva.servicio.offcanva-reserva-servicio :servicio="$servicio" :index="$servicio->id" /> --}}
                                @endforeach
                            </div>
                        </div>
                    </div><!-- End -->
                    @endforeach
                <x-reserva.servicio.offcanva-reserva-add-service/>
                <x-reserva.servicio.modal-services-selected/>
                </div>
            </div>
            <x-reserva.servicio.offcanva-reserva-servicio :servicios="$servicios"/>

          </div>
        </div>

      </section>
      {{-- si pedicura manicura --}}
      @if ($categoriaGeneral->nombre == 'Manicura')
       <section class="section-page-title" style="padding-bottom: 115px;padding-top: 115px; background-image: url('{{ asset('storage/images/fondoLadrillo.jpg') }}');background-size: contain;background-position: center;">
        <div class="container d-flex justify-content-between">
            <!-- Tarjeta -->
            <div>
                 <img data-aos="fade-right" style="position: absolute;left: 0px;" class="" src="{{ asset('storage/images/expresMano.png') }}" alt="whatsapp" />
            </div>
            <div class="card tarjetaManiExpres" data-aos="flip-left" style="height: 27rem;width: 20rem; padding: 20px;" >
                <div class="elementor-element elementor-element-fdad8d1 elementor-hidden-mobile elementor-widget elementor-widget-image" data-id="fdad8d1" data-element_type="widget" data-widget_type="image.default">
                    <div class="elementor-widget-container" style="margin: -85px -218px -64px -51px;">
                        <img style="filter: drop-shadow(0 2px 8px rgb(0 0 0 / 15%));" decoding="async" width="800" height="694" src="https://laesmalteria.es/wp-content/uploads/2023/08/52-e1695125017809.png" class="attachment-large size-large wp-image-16031" alt="">															</div>
                    </div>
                <div class="elementor-widget-container text-center">
                    <h2 class="gualazonF elementor-heading-title ven elementor-size-default">¿Estás de pisa y corre?</h2>
                </div>
                <div class="elementor-widget-container text-center" style="margin-bottom: 28px;">
                    <h3 class="elementor-heading-title teloMereces elementor-size-default">
                        Prueba nuestra Manicura Express<span style="color: #DC9D5F;">.</span>
                    </h3>
                </div>
                <div style="margin-bottom: 28px;" class="text-center elementor-element elementor-element-6de8501 elementor-align-center elementor-widget elementor-widget-button" data-id="6de8501" data-element_type="widget" data-widget_type="button.default">
                    <div class="elementor-widget-container">
                        <div class="elementor-button-wrapper">
                            <a class="elementor-button elementor-button-link elementor-size-sm" href="https://laesmalteria.es/para-ti/">
                                <span class="elementor-button-content-wrapper">
                                    <span class="elementor-button-text">Si, tengo prisa</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="text-center elementor-element elementor-element-3222e04 elementor-widget elementor-widget-text-editor" data-id="3222e04" data-element_type="widget" data-widget_type="text-editor.default">
                    <div class="elementor-widget-container">
                        <p>Te damos un toque de estilo y cuidado en tan solo unos minutos.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      @elseif ($categoriaGeneral->nombre == 'Mirada')
      {{-- si mirada --}}
        <section class="section-page-title" style="padding-bottom: 115px;padding-top: 115px; background-image: url('{{ asset('storage/images/fondopigmento.png') }}');background-size: cover;background-position: center;">
        <div class="container d-flex justify-content-end">
            <!-- Tarjeta -->
            {{-- <div>
                 <img data-aos="fade-right" style="position: absolute;left: 0px;" class="" src="{{ asset('storage/images/pigmento.png') }}" alt="micropigmentación" />
            </div> --}}
            <div class="card tarjetaManiExpres" data-aos="flip-left" style="height: 27rem;width: 20rem; padding: 20px;" >
                <div class="elementor-element elementor-element-fdad8d1 elementor-hidden-mobile elementor-widget elementor-widget-image" data-id="fdad8d1" data-element_type="widget" data-widget_type="image.default">
                    <div class="elementor-widget-container" style="margin: -85px -218px -64px -51px;">
                        <img style="filter: drop-shadow(0 2px 8px rgb(0 0 0 / 15%));" decoding="async" width="800" height="694" src="{{ asset('storage/images/tirita.png') }}" class="attachment-large size-large wp-image-16031" alt="">															</div>
                    </div>
                <div class="elementor-widget-container text-center">
                    <h2 class="gualazonF elementor-heading-title ven elementor-size-default">Micropigmentación</h2>
                </div>
                <div class="elementor-widget-container text-center" style="margin-bottom: 28px;">
                    <h3 class="elementor-heading-title teloMereces elementor-size-default">
                        Di adiós a los retoques del día a día<span style="color: #DC9D5F;">.</span>
                    </h3>
                </div>
                <div style="margin-bottom: 28px;" class="text-center elementor-element elementor-element-6de8501 elementor-align-center elementor-widget elementor-widget-button" data-id="6de8501" data-element_type="widget" data-widget_type="button.default">
                    <div class="elementor-widget-container">
                        <div class="elementor-button-wrapper">
                            <a class="elementor-button elementor-button-link elementor-size-sm" href="https://laesmalteria.es/para-ti/">
                                <span class="elementor-button-content-wrapper">
                                    <span class="elementor-button-text">Yo lo quiero</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="text-center elementor-element elementor-element-3222e04 elementor-widget elementor-widget-text-editor" data-id="3222e04" data-element_type="widget" data-widget_type="text-editor.default">
                    <div class="elementor-widget-container">
                        <p>Disfruta de cejas impecables en cualquier momento y lugar. Incluye una sesión de retoque.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      @endif
      {{-- <section class="section parallax-container" data-parallax-img="images/parallax-04-1920x1320.jpg">
        <div class="parallax-content section-lg context-dark text-center section-filter-dark">
          <div class="container">
            <h2>Video Presentation </h2>
            <div class="divider-lg"></div>
            <p class="block-lg">In this video, our staff members tell about their work at Glory, how they achieve the best results for their clients every day and more. Click the Play button below to watch this presentation.</p>
          </div>
          <div class="container">
            <div class="box-video-button" data-lightgallery="group"><a class="button-play" data-lightgallery="item" href="https://www.youtube.com/watch?v=m10Vl9TXpec"><span class="icon fa-play"></span></a></div>
          </div>
        </div>
      </section> --}}
      <section class="section section-md bg-default text-center">
        <div class="container">
          <h2 class="afri">Personas con pasión por lo que hacen</h2>
          <div class="divider-lg"></div>
          <p class="block-lg">Este proyecto avanza gracias al compromiso y la dedicación de quienes lo hacen posible. Aquí te presentamos a las personas que trabajan para que cada cita sea una experiencia cómoda, cuidada y especial.</p>
          <div class="row row-30" style="margin-top: 2rem;">
            <div class="col-12">
              <!-- Owl Carousel-->
            <div class="container">
                <span style="box-shadow: none;border:none" class="next-element3 box-images-item" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="box-shadow: none;border:none ;transform:translate3d(0px, 24.065px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 24.065px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span>
                <span style="box-shadow: none;border:none" class="next-element4 box-images-item" data-parallax-scroll="{&quot;y&quot;: 30, &quot;x&quot;: 0, &quot;smoothness&quot;: 50}" style="box-shadow: none;border:none;transform:translate3d(0px, 26.033px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); -webkit-transform:translate3d(0px, 26.033px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) scaleZ(1); "></span>
                <div class="row gy-4 justify-content-evenly">
                    @foreach ($empleadas as $index => $empleada)
                    <div class="box-images-item" data-parallax-scroll="{&quot;y&quot;: -20,   &quot;smoothness&quot;: 30 }">
                    <div class="d-flex align-items-stretch" data-aos="{{ $index % 2 == 0 ? 'fade-up' : 'fade-down' }}"
                    data-aos-delay="{{ ($index + 1) * 100 }}">
                        <div class="team-member">
                            <div class="member-img" data-img="{{ asset('storage/' . $empleada->img_empleada) }}">
                                {{-- <img src="{{ asset('storage/' . $empleada->img_empleada) }}" class="img-fluid" alt=""> --}}
                                <div class="social">
                                    <a href=""><i class="bi bi-twitter-x"></i></a>
                                    <a href=""><i class="bi bi-facebook"></i></a>
                                    <a href=""><i class="bi bi-instagram"></i></a>
                                    <a href=""><i class="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                            <div class="member-info mt-3">
                                <h4 class="afri">{{ $empleada->nombre }}</h4>
                                <span>Técnica manicurista</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    @endforeach
                </div>
            </div>

            </div>
            {{-- <div class="col-12"><a class="button button-primary" href="#">View all team</a></div> --}}
          </div>
        </div>
      </section>
      <section style="padding-top: 115px" class="section section-lg bg-default reviewSection" data-aos="fade-down">
        <div class="container">
          <div class="row row-50">
            <div class="col-12 col-lg-6" style="">
              <div class="block-xs">
                <h2 class="afri heading-decorate">Opiniones<br class="d-inline"><span class="divider"></span>de nuestros clientes</h2>
                <p class="big text-gray-800">Gracias a las reseñas, testimonios y comentarios regulares de nuestros clientes podemos mejorar nuestro salón.</p>
                <p>Conoce lo que nuestros usuarios piensan de nuestros servicios. ¿Ya reservaste? Comparte tu experiencia con la comunidad.</p>
              </div>
            </div>
            <div class="col-12 col-lg-6" style="">
              <!-- Owl Carousel-->
              <div class="owl-carousel carousel-corporate" data-items="1" data-dots="true" data-nav="false" data-stage-padding="10px" data-loop="true" data-autoplay="true" data-margin="25px" data-mouse-drag="false">
                <div class="quote-corporate">
                  <div class="quote-header">
                    <h4>Jennifer Moreno</h4>
                    <p class="big">Client</p>
                  </div>
                  <div class="quote-body">
                    <div class="quote-text">
                      <p>I love my eyebrow design. I'm usually very picky about my eyebrows and not everyone can give me what I want. You are amazing. Thank you for the amazing job you’ve done, I’ll be recommending you to my friends from now on!</p>
                    </div>
                    <svg class="quote-body-mark" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="66px" height="49px" viewbox="0 0 66 49" enable-background="new 0 0 66 49" xml:space="preserve">
                      <g></g>
                      <path d="M36.903,49v-3.098c9.203-5.315,14.885-12.055,17.042-20.222c-2.335,1.524-4.459,2.288-6.37,2.288						c-3.186,0-5.875-1.29-8.071-3.876c-2.194-2.583-3.293-5.74-3.293-9.479c0-4.133,1.443-7.605,4.327-10.407						C43.425,1.405,46.973,0,51.185,0c4.213,0,7.735,1.784,10.566,5.352C64.585,8.919,66,13.359,66,18.669						c0,7.482-2.85,14.183-8.549,20.112C51.751,44.706,44.902,48.112,36.903,49z M0.69,49v-3.098						c9.205-5.315,14.887-12.055,17.044-20.222c-2.335,1.524-4.478,2.288-6.423,2.288c-3.152,0-5.823-1.29-8.02-3.876						C1.096,21.51,0,18.353,0,14.614c0-4.133,1.434-7.605,4.301-10.407C7.168,1.405,10.709,0,14.92,0c4.247,0,7.778,1.784,10.592,5.352						c2.814,3.567,4.223,8.007,4.223,13.317c0,7.482-2.843,14.183-8.524,20.112C15.53,44.706,8.69,48.112,0.69,49z"></path>
                    </svg>
                  </div>
                  <div class="quote-image">
                        <img width="90" height="90" style="" class="" src="{{ asset('storage/img/team/team-1.jpg') }}" alt="cliente" />

                    {{-- <img src="images/home-1-10-90x90.jpg" alt="" width="90" height="90"/> --}}
                  </div>
                </div>
                <div class="quote-corporate">
                  <div class="quote-header">
                    <h4>Mary Matthews</h4>
                    <p class="big">Client</p>
                  </div>
                  <div class="quote-body">
                    <div class="quote-text">
                      <p>Janette cut my hair and did partial highlights and my experience was excellent! She took her time doing my hair and I am very pleased with the results. If you are still looking where to have your hair cut the best way, head for Glory!</p>
                    </div>
                    <svg class="quote-body-mark" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="66px" height="49px" viewbox="0 0 66 49" enable-background="new 0 0 66 49" xml:space="preserve">
                      <g></g>
                      <path d="M36.903,49v-3.098c9.203-5.315,14.885-12.055,17.042-20.222c-2.335,1.524-4.459,2.288-6.37,2.288						c-3.186,0-5.875-1.29-8.071-3.876c-2.194-2.583-3.293-5.74-3.293-9.479c0-4.133,1.443-7.605,4.327-10.407						C43.425,1.405,46.973,0,51.185,0c4.213,0,7.735,1.784,10.566,5.352C64.585,8.919,66,13.359,66,18.669						c0,7.482-2.85,14.183-8.549,20.112C51.751,44.706,44.902,48.112,36.903,49z M0.69,49v-3.098						c9.205-5.315,14.887-12.055,17.044-20.222c-2.335,1.524-4.478,2.288-6.423,2.288c-3.152,0-5.823-1.29-8.02-3.876						C1.096,21.51,0,18.353,0,14.614c0-4.133,1.434-7.605,4.301-10.407C7.168,1.405,10.709,0,14.92,0c4.247,0,7.778,1.784,10.592,5.352						c2.814,3.567,4.223,8.007,4.223,13.317c0,7.482-2.843,14.183-8.524,20.112C15.53,44.706,8.69,48.112,0.69,49z"></path>
                    </svg>
                  </div>
                  <div class="quote-image">
                        <img width="90" height="90" style="" class="" src="{{ asset('storage/img/team/team-2.jpg') }}" alt="cliente" />
                  </div>
                </div>
                <div class="quote-corporate">
                  <div class="quote-header">
                    <h4>Amanda Smith</h4>
                    <p class="big">Client</p>
                  </div>
                  <div class="quote-body">
                    <div class="quote-text">
                      <p>Thank you for the first-rate beauty service! I am very happy with the outcome. I feel fortunate to have met someone with years of training in makeup who is also bright and knowledgeable enough to determine my perfect style.</p>
                    </div>
                    <svg class="quote-body-mark" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="66px" height="49px" viewbox="0 0 66 49" enable-background="new 0 0 66 49" xml:space="preserve">
                      <g></g>
                      <path d="M36.903,49v-3.098c9.203-5.315,14.885-12.055,17.042-20.222c-2.335,1.524-4.459,2.288-6.37,2.288						c-3.186,0-5.875-1.29-8.071-3.876c-2.194-2.583-3.293-5.74-3.293-9.479c0-4.133,1.443-7.605,4.327-10.407						C43.425,1.405,46.973,0,51.185,0c4.213,0,7.735,1.784,10.566,5.352C64.585,8.919,66,13.359,66,18.669						c0,7.482-2.85,14.183-8.549,20.112C51.751,44.706,44.902,48.112,36.903,49z M0.69,49v-3.098						c9.205-5.315,14.887-12.055,17.044-20.222c-2.335,1.524-4.478,2.288-6.423,2.288c-3.152,0-5.823-1.29-8.02-3.876						C1.096,21.51,0,18.353,0,14.614c0-4.133,1.434-7.605,4.301-10.407C7.168,1.405,10.709,0,14.92,0c4.247,0,7.778,1.784,10.592,5.352						c2.814,3.567,4.223,8.007,4.223,13.317c0,7.482-2.843,14.183-8.524,20.112C15.53,44.706,8.69,48.112,0.69,49z"></path>
                    </svg>
                  </div>
                  <div class="quote-image">
                   <img width="90" height="90" style="" class="" src="{{ asset('storage/img/team/team-3.jpg') }}" alt="cliente" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--Please, add the data attribute data-key="YOUR_API_KEY" in order to insert your own API key for the Google map.-->
      <!--Please note that YOUR_API_KEY should replaced with your key.-->
      <!--Example: <div class="google-map-container" data-key="YOUR_API_KEY">-->
      {{-- <div class="google-map-container" data-center="9870 St Vincent Place, Glasgow, DC 45 Fr 45." data-zoom="5" data-icon="images/gmap_marker.png" data-icon-active="images/gmap_marker_active.png" data-styles="[{&quot;featureType&quot;:&quot;landscape&quot;,&quot;stylers&quot;:[{&quot;saturation&quot;:-100},{&quot;lightness&quot;:60}]},{&quot;featureType&quot;:&quot;road.local&quot;,&quot;stylers&quot;:[{&quot;saturation&quot;:-100},{&quot;lightness&quot;:40},{&quot;visibility&quot;:&quot;on&quot;}]},{&quot;featureType&quot;:&quot;transit&quot;,&quot;stylers&quot;:[{&quot;saturation&quot;:-100},{&quot;visibility&quot;:&quot;simplified&quot;}]},{&quot;featureType&quot;:&quot;administrative.province&quot;,&quot;stylers&quot;:[{&quot;visibility&quot;:&quot;off&quot;}]},{&quot;featureType&quot;:&quot;water&quot;,&quot;stylers&quot;:[{&quot;visibility&quot;:&quot;on&quot;},{&quot;lightness&quot;:30}]},{&quot;featureType&quot;:&quot;road.highway&quot;,&quot;elementType&quot;:&quot;geometry.fill&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#ef8c25&quot;},{&quot;lightness&quot;:40}]},{&quot;featureType&quot;:&quot;road.highway&quot;,&quot;elementType&quot;:&quot;geometry.stroke&quot;,&quot;stylers&quot;:[{&quot;visibility&quot;:&quot;off&quot;}]},{&quot;featureType&quot;:&quot;poi.park&quot;,&quot;elementType&quot;:&quot;geometry.fill&quot;,&quot;stylers&quot;:[{&quot;color&quot;:&quot;#b6c54c&quot;},{&quot;lightness&quot;:40},{&quot;saturation&quot;:-40}]},{}]">
        <div class="google-map"></div>
        <ul class="google-map-markers">
          <li data-location="9870 St Vincent Place, Glasgow, DC 45 Fr 45." data-description="9870 St Vincent Place, Glasgow"></li>
        </ul>
      </div> --}}
      <footer class="section bg-default section-xs-type-1 footer-minimal">
        <div class="container">
          <div class="row row-30 align-items-lg-center justify-content-lg-between">
            <div class="col-lg-2">
              <div class="footer-brand">
                    <a href="index.html">
                    {{-- <img src="images/logo-dark-main-257x84.png" alt="" width="257" height="84"/> --}}
                    @include('logo_mya', ['width' => '17rem'])
                </a>
            </div>
            </div>
            <div class="col-lg-10">
              <div class="footer-nav">
                <ul class="rd-navbar-nav">
                  <li class="rd-nav-item"><a class="rd-nav-link" href="index.html">Home</a></li>
                  <li class="rd-nav-item active"><a class="rd-nav-link" href="about-us.html">About</a></li>
                  <li class="rd-nav-item"><a class="rd-nav-link" href="typography.html">Typography</a></li>
                  <li class="rd-nav-item"><a class="rd-nav-link" href="contacts.html">Contacts</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    <!-- Javascript-->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="{{ asset('js/nuevoIndex/core.min.js') }}"></script>
    <script src="{{ asset('js/nuevoIndex/script.js') }}"></script>

    <script src="{{ asset('assets2/vendor/purecounter/purecounter_vanilla.js') }}"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    @stack('modals')
    @livewireScripts
    @stack('scripts')
<script>
      //INVIERTE EL AOS PARA QUE CUANDO NO SE VEAN DESAPAREZCAN LOS DIVS
    document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                entry.target.classList.remove('aos-inverse');
            } else {
                entry.target.classList.remove('aos-animate');
                entry.target.classList.add('aos-inverse'); // Aplicar animación inversa
            }
        });
    });

    elements.forEach(el => observer.observe(el));

});
//poner background-image a las imágenes de los empleados
document.querySelectorAll('.member-img').forEach(el => {
    el.style.backgroundImage = `url('${el.getAttribute('data-img')}')`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
});

    //--------------------
   AOS.init({
    offset: 120,
    duration: 3000,
});
</script>
 <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</body>
</html>
<script src="{{ asset('js/navigation-menu.js') }}"></script>
    <script src="{{ asset('js/offcanva-reserva-servicio/offcanvaReservaServicio.js') }}"></script>
    <script src="{{ asset('js/universal.js') }}"></script>
    <script>
        var urlDiasByMes = "{{ route('dias.byMes') }}"; // Si defines un nombre a la ruta
    var empleadasDisponibles = "{{ route('empleadas.disponibles') }}";
    var obtenerTodosLosDias = "{{ route('obtener.todosDias') }}";
    var crearReserva = "{{ route('reservas.store') }}";
    // var chekearReserva = "{{ route('pendingReserv.chequear') }}";
    var obtenerReservasArray = "{{ route('getService.byIdArray') }}";
    var comprobarDisponibilidad = "{{ route('comprobar.disponibilidad') }}";
    var obtenerServicioById = "{{ route('getService.byId') }}";
    </script>
@auth
    @if(isset($executeJavaScript2) && $executeJavaScript2)
    <p>se ejecuta execteJavaScript2</p>
    @else
    {{-- <p>No vengo</p> --}}
    <script>
        //error al leer la ruta en js
        window.routes = {
            verificarAuth: "{{ route('verificar.auth.email') }}"
        };
        document.addEventListener('DOMContentLoaded', function () {
            getContacts();
            getFavoritesList();
        });
    // console.log("no se ejecuta execteJavaScript2");

    </script>
    @endif
    <script>
         const currentUser = {
            id: {{ auth()->user()->id }},
            id_admin: {{ auth()->user()->is_admin }}
        };
        //  console.log("probando........");
    </script>
@else
    <script>
    const currentUser = null;
    </script>
@endauth

