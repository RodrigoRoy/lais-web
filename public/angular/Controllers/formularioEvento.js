/*
    Controlador del formulario para eventos. 
    Sirve tanto para crear nuevos eventos como para editar los existentes.
*/

angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope, $location, $routeParams, $http, Evento, Upload) {
    $scope.evento = {}; // Contiene los datos del evento
    $scope.maxLengthCoordinadores = 10; // Cantidad máxima de coordinadores
    $scope.coordinadores = [{nombre: ""}]; // Arreglo de "personas" (objetos con propiedad 'nombre')
    $scope.maxLengthParticipantes = 10; // Cantidad máxima de coordinadores
    $scope.participantes = [{nombre: ""}]; // Arreglo de "participantes" (objetos con propiedad 'nombre')
    $scope.calendar = false; // Indicador para mostrar/ocultar el calendario
    $scope.secondCalendar = false; // Indicador para mostrar/ocultar el calendario en FechaFin
    $scope.imageContainer = true; // Bandera para mostrar/ocultar elemento DIV para cargar una imagen
    $scope.edit = false; // Bandera para saber si es edición de un evento o registro de uno nuevo
    var map = new google.maps.Map(document.getElementById('map'), { // Google Maps map
        center: {lat: 19.356751, lng: -99.166728}, // Mora Madrid (se actualiza mediante marker)
        zoom: 15, // Se ven calles y vialidades a buena distancia
        disableDefaultUI: true, // Ocultar UI para solo darle importancia a la ubicación
        scrollwheel: false, // Evitar hacer zoom con el scroll del mouse
        styles: [ // Estilo visual "Lunar Landscape" obtenido de https://snazzymaps.com/
            {
                "stylers": [
                    {
                        "hue": "#ff1a00"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 33
                    },
                    {
                        "gamma": 0.5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2D333C"
                    }
                ]
            }
        ]
    });
    var marker; // Único marcador que se muestra según la dirección escrita en $scope.place

    // EDICION
    // Si se desea editar un evento, se reutiliza el formulario con información para $scope.evento desde la BD
    if(/edit$/.test($location.path())){ // Prueba con expresión regular para saber si la URL termina con "edit"
        $scope.edit = true;
        Evento.get($routeParams.id) // Obtener la información del evento en la base de datos
        .then(function(res){
            $scope.evento = res.data // Casi toda la información del evento se asigna directamente
            // Parse para "Coordinadores":
            if($scope.evento.coordinador && $scope.evento.coordinador.length > 0){
                $scope.coordinadores = [];
                // console.log($scope.evento.coordinador);
                for(var i in $scope.evento.coordinador)
                    $scope.coordinadores.push({nombre: $scope.evento.coordinador[i]});
            }
            // Parse para "Participantes":
            if($scope.evento.participantes && $scope.evento.participantes.length > 0){
                $scope.participantes = [];
                for(var i in $scope.evento.participantes)
                    $scope.participantes.push({nombre: $scope.evento.participantes[i]});
            }
            // Parse para "keywords":
            if($scope.evento.keywords && $scope.evento.keywords.length > 0){
                $scope.keywords = [];
                console.log($scope.evento.keywords);
                for(var i in $scope.evento.keywords)
                    $scope.keywords.push({"text": $scope.evento.keywords[i]});
            }
            if($scope.evento.imagen){ // Deshabilitar div para imagen si el evento ya tiene una
                $scope.imageContainer = false;
            }
            // Reverse Geocoding para obtener dirección a partir de PlaceID ($scope.evento.lugar)
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({placeId: $scope.evento.lugar}, function(res, status){
                if(status == google.maps.GeocoderStatus.OK){
                    marker = new google.maps.Marker({
                        position: res[0].geometry.location,
                        map: map,
                        clickable: false
                    });
                    map.setCenter(res[0].geometry.location); // Actualizar vista en mapa para marcar el lugar
                    $scope.$apply(function(){ // Actualiza binding en llamadas asíncronas
                        $scope.place = res[0].formatted_address;
                    });
                }
            });
        }, function(res){
            console.log("Error de conexión con la base de datos para obtener información del evento.", res);
        });
    } // FIN EDICION
    
    // Abrir calendarios y hacer que el segundo actualize binding para fecha mínima en base a la primera seleccionada
    // https://github.com/angular-ui/bootstrap/issues/3188
    // http://plnkr.co/edit/Ssa7ofSoCiolMqUnVWlq?p=preview
    $scope.openDate = function($event){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.calendar = true;
    };
    $scope.openFinalDate = function($event){
        $event.preventDefault();
        $event.stopPropagation();
        $scope.secondCalendar = true;
    };

    // Agrega un nuevo coordinador (otro input en la vista)
    $scope.add = function(){
        if(($scope.coordinadores[$scope.coordinadores.length - 1].nombre !== "") && ($scope.coordinadores.length < $scope.maxLengthCoordinadores))
            $scope.coordinadores.push({
                nombre: ""
            });
    };

    // Cambia y asigna el arreglo de objetos "$scope.coordinadores" por el arreglo de strings "$scope.evento.coordinador"
    $scope.updateCoordinador = function(){
        // Parse de coordinadores para agregar solo el texto (sin ser objetos)
        if(!(($scope.coordinadores.length == 1) && ($scope.coordinadores[0].nombre === "")))
        $scope.evento.coordinador = [];
        for(var i in $scope.coordinadores)
            if($scope.coordinadores[i].nombre !== "")
                $scope.evento.coordinador[i] = $scope.coordinadores[i].nombre;
    };

    // Agrega un nuevo coordinador (otro input en la vista)
    $scope.addParticipante = function(){
        if(($scope.participantes[$scope.participantes.length - 1].nombre !== "") && ($scope.participantes.length < $scope.maxLengthParticipantes))
            $scope.participantes.push({
                nombre: ""
            });
    };

    // Cambia y asigna el arreglo de objetos "$scope.coordinadores" por el arreglo de strings "$scope.evento.coordinador"
    $scope.updateParticipantes = function(){
        // Parse de participantes para agregar solo el texto (sin ser objetos)
        if(!(($scope.participantes.length == 1) && ($scope.participantes[0].nombre === "")))
        $scope.evento.participantes = [];
        for(var i in $scope.participantes)
            if($scope.participantes[i].nombre !== "")
                $scope.evento.participantes[i] = $scope.participantes[i].nombre;
    };

    // Google Maps API Autocomplete
    var options = {
        componentRestrictions: {country: 'mx'}
    };
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'), options);
    autocomplete.addListener('place_changed', function(){ // Función cada vez que se selecciona una dirección en <input id="place">
        var place = autocomplete.getPlace();
        if(place.geometry){ // Si es un lugar válido con ubicación LatLng
            if(marker){
                marker.setMap(null);
            }
            $scope.evento.lugar = place.place_id; // Asignar el ID como "Lugar" para el evento
            marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                clickable: false
            });
            map.setCenter(place.geometry.location); // Actualizar vista al centro del mapa para marcar el lugar
        }
        else{ // Si el lugar no tiene LatLng para ubicarlo en el mapa
            if (marker) // Si ya se tenía seleccionado un lugar válido hay que borrar el marcador del mapa
                marker.setMap(null);
            $scope.evento.lugar = undefined; // También se debe "borrar" el PlaceID asociado
        }
    });

    // Llamada asíncrona para obtener los tags desde archivo y filtrarlos por medio del query dado como parámetro
    $scope.loadTags = function(query){
        return $http.get('js/eventTags.json').then(function(res){
            var results = []; // Tags que coinciden con el query
            for(var i in res.data)
                if(res.data[i].text.toLowerCase().indexOf(query.toLowerCase()) > -1) // Si contiene texto agregarlo a "results"
                    results.push(res.data[i].text) // NOTA: la propiedad "text" contiene el nombre del tag/keyword
            return results;
        });
    };

    // Cambia y asigna el arreglo de objetos "$scocpe.keywords" por el arreglo de strings "$scope.evento.keywords"
    $scope.updateKeywords = function(){
        // Parse de keywords para agregar solo el texto (sin ser objetos)
        if($scope.keywords)
            $scope.evento.keywords = [];
            for(var i in $scope.keywords)
                $scope.evento.keywords[i] = $scope.keywords[i].text; // NOTA: la propiedad "text" contiene el nombre del tag/keyword
    };

    // Sube archivo (imagen) al servidor
    $scope.uploadImage = function(file){
        Upload.upload({
            url: 'api/upload', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            // if(resp.data.status === "OK")
            //     console.log("Node responde con status 'OK'");
            // console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            // console.log('return ' + resp.config.data.file.name);

            // NOTA: $scope.evento.imagen NO es igual a $scope.imagen
            // Esta última sirve para previsualizar la imagen en HTML
            // Asignación del nombre de la imagen a $scope.evento
            $scope.evento.imagen = resp.config.data.file.name;
            $scope.imageContainer = false;
        }, function (resp) { // Función para manejo de error
            console.log('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    // Sube archivos al servidor
    $scope.uploadFiles = function(file){
        Upload.upload({
            url: 'api/uploadFiles', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            // console.log("resp", resp);
            // if(resp.data.status === "OK")
            //     console.log("Node responde con status 'OK'");
            
            // console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            // console.log('return ' + resp.config.data.file.name);

            // NOTA: $scope.evento.imagen NO es igual a $scope.imagen
            // Esta última sirve para previsualizar la imagen en HTML
            // Asignación del nombre de la imagen a $scope.evento
            //$scope.evento.imagen = resp.config.data.file.name;
            $scope.evento.documentos = [];
            for(var i in resp.config.data.file)
                $scope.evento.documentos[i] = resp.config.data.file[i].name;
        }, function (resp) { // Función para manejo de error
            console.log('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ');
        });
    };

    // Elimina imagen del evento
    $scope.deleteImage = function(){
        $scope.evento.imagen = undefined;
        $scope.imageContainer = true;
    };

    // Elimina un archivo adjunto
    $scope.deleteFile = function(filename){
        var index = $scope.evento.documentos.indexOf(filename); // Buscar el indice
        if(index !== -1){ // Remover de manera segura en el arreglo
            $scope.evento.documentos.splice(index, 1);
        }
        if($scope.evento.documentos.length < 1) // Si no hay más documentos por borrar, eliminar el arreglo vacio
            $scope.evento.documentos = undefined;
    };

    // Se ejecuta en clic al botón de envio. Manda la información del evento a la base de datos
    $scope.enviar = function(){
        Evento.create($scope.evento) // Subir la información del evento a la base de datos
        .then(function(res){
            // console.log("Evento creado exitosamente", res.data.id);
            alert("Se ha guardado la información del evento.");
            $location.url('/eventos/' + res.data.id); // Redirigir a la página del evento creado
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación del evento.", res);
        });
    };

    // Se ejecuta en clic al botón de envio. Manda la información del evento a la base de datos
    $scope.editar = function(){
        Evento.update($routeParams.id, $scope.evento) // Subir la información del evento a la base de datos
        .then(function(res){
            // console.log("Evento creado exitosamente", res.data.id);
            alert("Se ha actualizado la información del evento.");
            $location.url('/eventos/' + $routeParams.id); // Redirigir a la página del evento actualizado
        }, function(res){
            console.log("Error de conexión con la base de datos en la edición del evento.", res);
        });
    };
});