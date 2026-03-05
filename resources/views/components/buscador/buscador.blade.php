@props(['id_inputSearchClient', "onkeyup"])

<div class="" style="width: 100%">
    <div class="w-100 d-flex align-items-center searchbox-form_SearchBox__wrapper__6HWA_">
        <img
            class="searchbox-form_SearchBox__icon--magnifier__yXxdh"
            src="{{ asset('storage/buscador/search-icon.svg') }}" width="20" height="20"
            alt="Search Icon Magnifier">
        <div class="searchbox-form_SearchBox__fakePlaceholder__VhWWB w-100 position-absolute pl-5">
            <span class=""> Buscar servicio</span>

        </div>
        <input style="font-family: 'gualazonF';font-weight: 700;" onkeyup="buscar('#{{ $id_inputSearchClient }}')" id="{{ $id_inputSearchClient }}" type="search" class="searchbox-form-input w-100 searchbox-form_SearchBox__input__kl64p"
            autocomplete="off" value="">
    </div>
</div>
