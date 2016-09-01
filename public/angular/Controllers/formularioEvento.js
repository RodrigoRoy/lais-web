/*
    Controlador del formulario para eventos.
*/

angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope, $location, Lugar, Evento, Upload) {
    $scope.evento = {}; // Contiene los datos del evento
    
    $scope.calendar = false; // Indicador para mostrar/ocultar el calendario
    $scope.secondCalendar = false; // Indicador para mostrar/ocultar el calendario en FechaFin
    // $scope.hourButton = true;
    // $scope.hourField = false;
    
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
    // $scope.showFechaFin = function(){
    //     $scope.fechaFin = true; // Mostrar DIV con texto e input
    // };
    // $scope.showHour = function(){
    //     $scope.hourField = true;
    //     $scope.hourButton = false;
    // };

    // $scope.roundTime = function(){ // auxiliar para redondear los minutos a módulo 5
    //     while(($scope.evento.horario.getMinutes() % 5) != 0)
    //         $scope.evento.horario.setMinutes($scope.evento.horario.getMinutes() + 1);
    // };
    // $scope.roundTime();

    $scope.maxLengthRealizadores = 10; // Cantidad máxima de realizadores
    $scope.realizadores = [{nombre: ""}]; // Arreglo de "personas" (objetos con propiedad 'nombre')
    $scope.add = function(){ // Agrega un nuevo realizador (otro input en la vista)
        if(($scope.realizadores[$scope.realizadores.length - 1].nombre !== "") && ($scope.realizadores.length < $scope.maxLengthRealizadores))
            $scope.realizadores.push({
                nombre: ""
            });
    };

    // Google Maps map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 19.356751, lng: -99.166728}, // Mora Madrid (se actualiza al marker)
        zoom: 15,
        disableDefaultUI: true,
        scrollwheel: false, // Evitar hacer zoom con el scroll del mouse
        styles: [ // Lunar Landscape
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
    // Google Maps API Autocomplete
    var options = {
        componentRestrictions: {country: 'mx'}
    };
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'), options);
    var marker;
    autocomplete.addListener('place_changed', function(){
        var place = autocomplete.getPlace();
        console.log(place);
        if(place.geometry){
            if(marker){
                marker.setMap(null);
            }
            $scope.evento.lugar = place.place_id; // Asignar el ID como "Lugar" para el evento
            marker = new google.maps.Marker({
                position: place.geometry.location,
                map: map
                // animation: google.maps.Animation.DROP
            });
            map.setCenter(place.geometry.location); // Actualizar vista al centro del mapa para marcar el lugar
        }
        else{
            console.log("No results");
            if (marker) {
                marker.setMap(null);
            }
            $scope.evento.lugar = undefined;
        }
    });

    // Cambia y asigna el arreglo de objetos "$scope.realizadores" por el arreglo de strings "$scope.evento.realizador"
    $scope.updateRealizador = function(){
        // Parse de realizadores para agregar solo el texto (sin ser objetos)
        if(!(($scope.realizadores.length == 1) && ($scope.realizadores[0].nombre === "")))
        $scope.evento.realizador = [];
        for(var i in $scope.realizadores)
            if($scope.realizadores[i].nombre !== "")
                $scope.evento.realizador[i] = $scope.realizadores[i].nombre;
    };

    $scope.enviar = function(){
        Evento.create($scope.evento) // Subir la información del evento a la base de datos
        .then(function(res){
            console.log("Evento creado exitosamente", res.data.id);
            alert("Se ha guardado la información del evento.\nSerás redirigido a la página de eventos.");
            $location.url('/eventos'); // Redirigir a la página de eventos
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación del evento.", res);
        });
    };

    $scope.showImgDiv = true;
    // Sube archivo (imagen) al servidor
    $scope.uploadImage = function(file){
        Upload.upload({
            url: 'api/upload', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) { // Función cuando el archivo es subido exitosamente
            // console.log("resp", resp);
            if(resp.data.status === "OK")
                console.log("Node responde con status 'OK'");
            // console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            // console.log('return ' + resp.config.data.file.name);

            // NOTA: $scope.evento.imagenPrincipal NO es igual a $scope.imagenPrincipal
            // Esta última sirve para previsualizar la imagen en HTML
            // Asignación del nombre de la imagen a $scope.evento
            $scope.evento.imagenPrincipal = resp.config.data.file.name;
            $scope.showImgDiv = false;
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
            console.log("resp", resp);
            if(resp.data.status === "OK")
                console.log("Node responde con status 'OK'");
            
            // console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
            // console.log('return ' + resp.config.data.file.name);

            // NOTA: $scope.evento.imagenPrincipal NO es igual a $scope.imagenPrincipal
            // Esta última sirve para previsualizar la imagen en HTML
            // Asignación del nombre de la imagen a $scope.evento
            //$scope.evento.imagenPrincipal = resp.config.data.file.name;
            $scope.evento.documentos = [];
            for(var i in resp.config.data.file)
                $scope.evento.documentos[i] = resp.config.data.file[i].name;
        }, function (resp) { // Función para manejo de error
            console.log('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});