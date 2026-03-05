<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\TemporaryImageNewService;
use App\Models\Servicio;
use App\Models\ImageNewService;

class CreateNewServiceController extends Controller
{
// public function createNewService(Request $request)
// {
//     switch ($request->input('action')) {
//         case 'create':

//             // Validación básica
//             $validator = Validator::make($request->all(), [
//                 'nombreServicio' => 'required',
//                 'descripcionServicio' => 'required',
//                 'imagenServicio' => 'nullable|image|max:2048', // nueva imagen opcional
//             ]);

//             if ($validator->fails()) {
//                 return redirect()->back()->withErrors($validator)->withInput();
//             }

//             // Asignar color aleatorio si es null o random
//             $colorNewService = $request->colorServicio;
//             if ($colorNewService === null || $colorNewService === 'randomColor') {
//                 $r = rand(0, 255);
//                 $g = rand(0, 255);
//                 $b = rand(0, 255);
//                 $colorNewService = "rgb($r, $g, $b)";
//             }

//             // Convertir array de pasos a texto
//             $pasosTexto = is_array($request->pasos)
//                 ? implode("\n", array_filter($request->pasos))
//                 : null;

//             // Crear servicio
//             $newService = Servicio::create([
//                 'nombre' => $request->nombreServicio,
//                 'descripcion' => $request->descripcionServicio,
//                 'categoria' => $request->categoryService,
//                 'precio' => $request->precioServicio,
//                 'borderColor' => $colorNewService,
//                 'horaNewService' => $request->horaNewService,
//                 'minutosNewService' => $request->minutosNewService,
//                 'tipoPrecioNewService' => $request->tipoPrecioNewService,
//                 'pasos' => $pasosTexto,
//                 'categoria_servicio_id' => $request->categoryServiceId,
//             ]);

//             // Guardar la imagen si existe usando Storage::disk('public')
//             if ($request->hasFile('imagenServicio')) {
//                 $file = $request->file('imagenServicio');
//                 $filename = time() . '_' . $file->getClientOriginalName();

//                 // Guardar en storage/app/public/imagesServices_
//                  $path = $request->file('imagenServicio')->store('imagesServices_', 'public');

//                 ImageNewService::create([
//                     'servicio_id' => $newService->id,
//                     'name' => $filename,
//                     'path' => $path // ej: imagesServices_/3636.png
//                 ]);
//             }

//             return redirect()->route('admin.showAllServices')->with('success', 'Servicio creado correctamente');
//             break;

//         case 'modify':
//             $service = Servicio::findOrFail($request->id_serviceModify);

//             $pasosTexto = is_array($request->pasos)
//                 ? implode("\n", array_filter($request->pasos))
//                 : null;

//             $service->update([
//                 'nombre' => $request->nombreServicio,
//                 'descripcion' => $request->descripcionServicio,
//                 'categoria' => $request->categoryService,
//                 'precio' => $request->precioServicio,
//                 'borderColor' => $request->colorServicio,
//                 'horaNewService' => $request->horaNewService,
//                 'minutosNewService' => $request->minutosNewService,
//                 'tipoPrecioNewService' => $request->tipoPrecioNewService,
//                 'pasos' => $pasosTexto,
//             ]);

//             return redirect()->route('admin.showAllServices')->with('success', 'Servicio Modificado correctamente');
//             break;

//         case 'delete':
//             $service = Servicio::findOrFail($request->id_serviceModify);
//             $service->activo = 'no';
//             $service->save();
//             return redirect()->route('admin.showAllServices')->with('success', 'Servicio Eliminado correctamente');
//             break;
//     }
// }

// CASO CREATE PARA INFINITYFREE
public function createNewService(Request $request)
{
    switch ($request->input('action')) {
       case 'create':

        $validator = Validator::make($request->all(), [
            'nombreServicio' => 'required',
            'descripcionServicio' => 'required',
            'imagenServicio' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Color aleatorio
        $colorNewService = $request->colorServicio;
        if ($colorNewService === null || $colorNewService === 'randomColor') {
            $r = rand(0,255);
            $g = rand(0,255);
            $b = rand(0,255);
            $colorNewService = "rgb($r, $g, $b)";
        }

        // Pasos
        $pasosTexto = is_array($request->pasos)
            ? implode("\n", array_filter($request->pasos))
            : null;

        // Crear servicio
        $newService = Servicio::create([
            'nombre' => $request->nombreServicio,
            'descripcion' => $request->descripcionServicio,
            'categoria' => $request->categoryService,
            'precio' => $request->precioServicio,
            'borderColor' => $colorNewService,
            'horaNewService' => $request->horaNewService,
            'minutosNewService' => $request->minutosNewService,
            'tipoPrecioNewService' => $request->tipoPrecioNewService,
            'pasos' => $pasosTexto,
            'categoria_servicio_id' => $request->categoryServiceId,
        ]);


        // ------------------------------------------------
        // GUARDAR IMAGEN MANUALMENTE (SIN Storage::disk)
        // ------------------------------------------------
        if ($request->hasFile('imagenServicio')) {

            // Carpeta donde se guardarán las imágenes
            // EJ: /home/vol1/.../htdocs/storage/imagesServices_
            $destination = $_SERVER['DOCUMENT_ROOT'] . '/storage/imagesServices_';

            // Crear carpeta si no existe
            if (!file_exists($destination)) {
                mkdir($destination, 0777, true);
            }

            // Archivo original
            $file = $request->file('imagenServicio');
            $filename = time() . '_' . $file->getClientOriginalName();

            // Mover archivo a carpeta pública accesible
            $file->move($destination, $filename);

            // Guardar en la BD la ruta accesible públicamente
            // (Ruta tal como se usa en <img src=""> )
            $publicPath = 'imagesServices_/' . $filename;

            ImageNewService::create([
                'servicio_id' => $newService->id,
                'name' => $filename,
                'path' => $publicPath
            ]);
        }

        return redirect()->route('admin.showAllServices')
            ->with('success', 'Servicio creado correctamente');

        break;


        case 'modify':
            $service = Servicio::findOrFail($request->id_serviceModify);

            $pasosTexto = is_array($request->pasos)
                ? implode("\n", array_filter($request->pasos))
                : null;

            $service->update([
                'nombre' => $request->nombreServicio,
                'descripcion' => $request->descripcionServicio,
                'categoria' => $request->categoryService,
                'precio' => $request->precioServicio,
                'borderColor' => $request->colorServicio,
                'horaNewService' => $request->horaNewService,
                'minutosNewService' => $request->minutosNewService,
                'tipoPrecioNewService' => $request->tipoPrecioNewService,
                'pasos' => $pasosTexto,
            ]);

            return redirect()->route('admin.showAllServices')->with('success', 'Servicio Modificado correctamente');
            break;

        case 'delete':
            $service = Servicio::findOrFail($request->id_serviceModify);
            $service->activo = 'no';
            $service->save();
            return redirect()->route('admin.showAllServices')->with('success', 'Servicio Eliminado correctamente');
            break;
    }
}


}
