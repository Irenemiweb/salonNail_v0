<div>
     {{-- lista de servicios seleccionados --}}
<div data-bs-backdrop="static" data-bs-keyboard="false" class="modalServiciosSeleccionados2 modal fade" id="modalServiciosSeleccionados2" tabindex="-1" aria-labelledby="modalServicios2Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalServicios2Label">Servicios seleccionados</h5>
        <button onclick="cleanViewMoreService();" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body" style="max-height: 41rem;overflow: auto;">
        <ul id="listaNombresServicios2" class="list-group list-group-flush"></ul>
        <div class="text-end fw-bold" style="border-bottom: 1px solid #ededed;padding-bottom: 1rem;">
          Total: <span id="totalServiciosSeleccionados2">0€</span>
        </div>
        <div class="listaNombreServiciosBody2 mt-3">

        </div>
        {{-- <button class="confirmarServiciosBtn btn btn-dark w-100 mt-2" style="background-color: #d6a769!important;border-radius:4px">
          Añadir servicios
        </button> --}}
      </div>
    </div>
  </div>
</div>
</div>
