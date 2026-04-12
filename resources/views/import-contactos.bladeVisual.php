<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Importar Contactos</title>
    @include('metadatos.metadatos-cabecera')
</head>

<body>

    <h1>Importar contactos a la app</h1>

    <input type="file" id="csv-file" accept=".csv">
    <br><br>
    <button id="btn-importar">Importar CSV</button>

    <p id="mensaje"></p>
    <button id="btn-contactos">📱 Importar desde contactos del móvil</button>
    <br><br>
    <script>
        async function importarCSV() {
            const input = document.getElementById('csv-file');
            const mensaje = document.getElementById('mensaje');

            if (input.files.length === 0) {
                mensaje.innerText = 'Selecciona un archivo CSV';
                return;
            }

            const file = input.files[0];
            const formData = new FormData();
            formData.append('csv', file);

            mensaje.innerText = 'Importando...';
            let csrfToken = $('meta[name="csrf-token"]').attr("content");
            try {
                const response = await fetch('api/clientes/import-csv', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: formData
                });

                if (response.ok) {
                    mensaje.innerText = '✅ Contactos importados correctamente';
                } else {
                    mensaje.innerText = '❌ Error al importar';
                }
            } catch (error) {
                console.error(error);
                mensaje.innerText = '❌ Error de conexión';
            }
        }

        document.getElementById('btn-importar').addEventListener('click', importarCSV);
        async function importarDesdeMovil() {

            const mensaje = document.getElementById('mensaje');

            // Verificar soporte
            if (!('contacts' in navigator && 'ContactsManager' in window)) {
                mensaje.innerText = '❌ Tu navegador no soporta acceso a contactos';
                return;
            }

            try {
                const props = ['name', 'tel', 'email', 'apell', 'empre'];
                const opts = {
                    multiple: true
                };

                const contactos = await navigator.contacts.select(props, opts);

                if (contactos.length === 0) {
                    mensaje.innerText = 'No seleccionaste contactos';
                    return;
                }

                mensaje.innerText = 'Importando contactos...';
                let csrfToken = $('meta[name="csrf-token"]').attr("content");
                // Enviar al backend
                const response = await fetch('api/clientes/import-contactos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({
                        contactos
                    })
                });

                if (response.ok) {
                    mensaje.innerText = '✅ Contactos importados correctamente';
                } else {
                    mensaje.innerText = '❌ Error al importar contactos';
                }

            } catch (error) {
                console.error(error);
                mensaje.innerText = '❌ Error o permiso denegado';
            }
        }

        document.getElementById('btn-contactos').addEventListener('click', importarDesdeMovil);
    </script>

</body>

</html>
