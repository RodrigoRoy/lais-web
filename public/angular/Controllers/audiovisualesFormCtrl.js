/* Formulario para registrar un registro audiovisual */

angular.module('AudiovisualesFormCtrl',[]).controller('AudiovisualesFormController', function ($scope, $routeParams, $location, Audiovisual, Archivo, Upload){

	// No permitir ingresar a la página de este controlador sin sesión iniciada
    if(!$scope.loggedIn)
        $location.path('/');
    
    // Variables
    $scope.edit = false; // Determina si se está realizando nuevo ingreso o edición de un audiovisual
    $scope.audiovisual = {};
    $scope.dateOptions = { // Configuración del calendario (fecha)
        formatYear: 'yyyy',
        minMode: 'year' // Usar esta propiedad en vez de 'dateMode' evita errores al ingresar el año
    };
    $scope.imageContainer = true; // Bandera para mostrar/ocultar elemento DIV para cargar una imagen
    $scope.auxiliar = {};

    // Llamada asíncrona para obtener los tags desde archivo y filtrarlos por medio del query dado como parámetro
    $scope.loadTags = function(query, JSONfilename){
        return Audiovisual.getTags(JSONfilename)
        .then(function(res){
            var results = []; // Tags que coinciden con el query
            for(var i in res.data)
                if(res.data[i].text.toLowerCase().indexOf(query.toLowerCase()) > -1) // Si contiene texto agregarlo a "results"
                    results.push(res.data[i].text) // NOTA: la propiedad "text" contiene el nombre del tag/keyword
            return results;
        });
    };

    // Parse para guardar $scope.audiovisual.tipo_de_produccion como arreglo de string
    $scope.updateProductionType = function(){
        // Parse de keywords para agregar solo el texto (sin ser objetos)
        if($scope.auxiliar.tipo_de_produccion){
            $scope.audiovisual.tipo_de_produccion = [];
            for(var i in $scope.auxiliar.tipo_de_produccion)
                $scope.audiovisual.tipo_de_produccion[i] = $scope.auxiliar.tipo_de_produccion[i].text; // NOTA: la propiedad "text" contiene el nombre del tag/keyword
        }
    };
    // Parse para guardar $scope.audiovisual.fuentes como arreglo de string
    $scope.updateSource = function(){
        // Parse de keywords para agregar solo el texto (sin ser objetos)
        if($scope.auxiliar.fuentes){
            $scope.audiovisual.fuentes = [];
            for(var i in $scope.auxiliar.fuentes)
                $scope.audiovisual.fuentes[i] = $scope.auxiliar.fuentes[i].text; // NOTA: la propiedad "text" contiene el nombre del tag/keyword
        }
    };
    // Parse para guardar $scope.audiovisual.recursos como arreglo de string
    $scope.updateResource = function(){
        // Parse de keywords para agregar solo el texto (sin ser objetos)
        if($scope.auxiliar.recursos){
            $scope.audiovisual.recursos = [];
            for(var i in $scope.auxiliar.recursos)
                $scope.audiovisual.recursos[i] = $scope.auxiliar.recursos[i].text; // NOTA: la propiedad "text" contiene el nombre del tag/keyword
        }
    };

    // Subir imagen
    $scope.uploadImage = function(file){
        Upload.upload({
            url: 'api/images', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file, path: 'audiovisuales/'} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            $scope.audiovisual.imagen = resp.config.data.file.name;
            $scope.imageContainer = false;
        }, function (resp) { // Función para manejo de error
            console.error('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    // Elimina imagen
    $scope.deleteImage = function(){
        var filename = $scope.audiovisual.imagen; // auxiliar para guardar el nombre de la imagen
        $scope.audiovisual.imagen = undefined;
        $scope.imageContainer = true;
        // Borrar archivo del sistema:
        Archivo.unlinkImage('audiovisuales/' + filename).
            then(function(res){
                // console.log("Se ha borrado exitosamente el archivo del sistema");
            }, function(res){
                if (res.status === 400) {
                    console.error('Error al borrar archivo del sistema');
                }
                if(res.status === 404){ // res.statusText === 'Not Found'
                    console.error("El archivo ya ha sido borrado del sistema");
                }
            });
    };

    // Envia el objeto $scope.audiovisual a la base de datos
    $scope.enviar = function(){
        Audiovisual.create($scope.audiovisual) // Subir la información de la publicación a la base de datos
        .then(function(res){
            alert("Se ha guardado la información del material de archivo.");
            // TODO: Crear la vista de cada registro audiovisual 
            //$location.url('/publicacion/' + res.data.publication._id); // Redirigir a la página de la publicación creada
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación del material de archivo.", res);
        });
    };
    // Envia el objeto $scope.audiovisual a la base de datos para ser editado
    $scope.editar = function(){
        Audiovisual.update($routeParams.id, $scope.audiovisual)
        .then(function(res){
            alert("Se ha actualizado la información del material de archivo.");
            // TODO: Crear la vista de cada registro audiovisual 
            // $location.url('/publicacion/' + $routeParams.id); // Redirigir a la página de la publicación
        }, function(res){
            console.log("Error de conexión con la base de datos para la edición del material de archivo.", res);
        });
    };

    // EDICION
    // Si se desea editar un registro audiovisual, se reutiliza el formulario con información para $scope.audiovisual desde la BD
    if(/edit$/.test($location.path())){ // Prueba con expresión regular para saber si la URL termina con "edit"
        $scope.edit = true;
        Audiovisual.get($routeParams.id) // Obtener la información del registro audiovisual en la base de datos
        .then(function(res){
            $scope.audiovisual = res.data // Casi toda la información del registro audiovisual se asigna directamente
            // Parse para "tipo_de_produccion"
            if($scope.audiovisual.tipo_de_produccion && $scope.audiovisual.tipo_de_produccion.length > 0){
                $scope.auxiliar.tipo_de_produccion = [];
                for(var i in $scope.audiovisual.tipo_de_produccion)
                    $scope.auxiliar.tipo_de_produccion.push({"text": $scope.audiovisual.tipo_de_produccion[i]});
            }
            // Parse para "fuentes"
            if($scope.audiovisual.fuentes && $scope.audiovisual.fuentes.length > 0){
                $scope.auxiliar.fuentes = [];
                for(var i in $scope.audiovisual.fuentes)
                    $scope.auxiliar.fuentes.push({"text": $scope.audiovisual.fuentes[i]});
            }
            // Parse para "recursos"
            if($scope.audiovisual.recursos && $scope.audiovisual.recursos.length > 0){
                $scope.auxiliar.recursos = [];
                for(var i in $scope.audiovisual.recursos)
                    $scope.auxiliar.recursos.push({"text": $scope.audiovisual.recursos[i]});
            }
            // Parse para imagen
            if($scope.audiovisual.imagen){ // Deshabilitar div para imagen si el registro audiovisual ya tiene una
                $scope.imageContainer = false;
            }
        }, function(res){
            console.log("Error de conexión con la base de datos para obtener información del registro audiovisual.", res);
        });
    } // FIN EDICION

})