<div class="">
    <div class="row justify-content-center my-5">
        <div class="col-12 col-md-6 my-4">
            <div class=" text-center" style="padding: 1rem">
                {{-- <img style="width: 200px" class="mensajes" src="{{ asset('storage/logo/Frame.png') }}" alt="subir anuncio" /> --}}
                {{-- {{ $logo }} --}}
            {{-- <span class="claudia_script" style="position: relative;top: -50px;font-size: 6rem;">mÿa</span> --}}
        {{-- <img style="filter:drop-shadow(2px 0px 6px white);width:100%;" class="mensajes" src="{{ asset('storage/cabecera/logo_coletilla.svg') }}" alt="África Nail art Studio33 salon de uñas Ourense manicura" /> --}}
            {{-- <h1 class="naruto-sign1 afri" onclick="return_viewIndex()">Hola{{ config('app.short_name') }}</h1> --}}
        <img style="filter:drop-shadow(2px 0px 6px white);width:100%;" class="mensajes" src="{{ asset('storage/images/logoEmpresa_swet.png') }}" alt="África Nail art Studio salon de uñas en Ourense manicura" />

        </div>

            <div class="card shadow-sm px-1 mx-4">
                {{ $slot }}
            </div>
        </div>
    </div>
</div>
