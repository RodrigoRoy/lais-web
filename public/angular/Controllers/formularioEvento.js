/*
    Controlador del formulario para eventos.
*/

angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope, $location, Lugar, Evento, Upload) {
    $scope.evento = {}; // Contiene los datos del evento
    
    $scope.fecha = null; //new Date(); // Solamente importan DD, MM, YYYYY
    $scope.showDate = false; // Indicador para mostrar/ocultar el calendario
    $scope.openDate = function(){
        $scope.showDate = true;
    };

    // $scope.evento.horario = new Date(); // Solamente importan HH:MM
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

    // $scope.maxLengthTelefonos = 3; // Cantidad máxima de teléfonos para un lugar
    // $scope.telefonos = [{numero: ""}]; // Arreglo de "telefonos" (objetos con propiedad 'numero')
    // $scope.addPhone = function(){ // Agrega un nuevo teléfono (otro input en la vista)
    //     if(($scope.telefonos[$scope.telefonos.length - 1].numero !== "") && ($scope.telefonos.length < $scope.maxLengthTelefonos))
    //         $scope.telefonos.push({
    //             numero: ""
    //         });
    // };

    // Función que realmente sube al servidor la imagen
    // $scope.upload = function(file){
    //     Upload.upload({
    //         url: 'api/upload', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
    //         data: {file: file} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
    //         $scope.imagenPrincipalFilename = resp.config.data.file.name; // guardar el nombre del archivo (para enviar filename a la base de datos)
    //         Evento.update($scope.id, {imagenPrincipal: resp.config.data.file.name}).
    //         then(function(res){
    //             console.log("Evento actualizado para imagen principal");
    //         }, function(res){
    //             console.log("Error al agregar imagen principal en base de datos");
    //         });
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };

    // Busca asíncronamente lugar(es) por su nombre. Devulve un arreglo de lugares desde la base de datos
    // $scope.searchPlace = function(val){
    //     return Lugar.find(val)
    //     .then(function(res){ // callback para petición exitosa
    //         return res.data;
    //     }, function(res){ // callback para cuando hay un error
    //         //alert('Hubo un error de conexión. Por favor vuelve a intentarlo.'); // No es buena idea usar alert porque se ejecutar en cada "teclazo"
    //     });
    // };

    // $scope.showDirection = false; // Oculta el formulario para agregar un Lugar

    // Oculta el input "Lugar" y muestra el formulario para agregar un Lugar
    // $scope.openLugarForm = function(){
    //     $scope.showDirection = true;
    //     $scope.asyncLugar = undefined;
    // };

    // Google Maps API Autocomplete
    var options = {
        componentRestrictions: {country: 'mx'}
    };
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'), options);
    autocomplete.addListener('place_changed', function(){
        //console.log('Lugar seleccionado');
        var place = autocomplete.getPlace();
        // console.log(place);
        // console.log("Dirección", place.formatted_address);
        // console.log("ID", place.place_id);
        // console.log("LatLang", place.geometry.location.toString());
        $scope.evento.lugar = place.place_id;
    });

    // var getLatLang = function(){
    //     console.log('Dirección seleccionada');
    //     //var place = autocomplete.getPlace();
    //     //console.log(place);
    // };


    // Agrega un nuevo Lugar a la base de datos
    // También realiza un parse de los números telefónicos antes de enviar los datos
    // $scope.addPlace = function(){
    //     var place = $scope.lugar; // Copia del objeto "Lugar"
        
    //     place.telefono = []; // Agregar solamente los teléfonos (solamente String, sin ser object)
    //     for(var i in $scope.telefono){
    //         if($scope.telefono[i].numero !== "")
    //             place.telefono[i] = $scope.telefono[i].numero;
    //     }

    //     Lugar.create(place) // Servicio que agrega el objeto a la base de datos
    //     .then(function(res){
    //         $scope.showDirection = false; // Al ser agregado exitosamente oculta el formulario de Lugar
    //         $scope.lugar = undefined; // y limpia el campo (input) para seleccionar dicho lugar
    //     }, function(res){
    //         console.log('Error de conexión con la base de datos para crear un nuevo lugar.');
    //     });
    // };

    // Copia $scope del evento y hace un parse para realizadores y id lugar.
    // Devuelve un objeto con los datos del evento.
    // $scope.crearEvento = function(){
    //     var evento = $scope.evento;
    //     // Parse de realizadores para agregar solo el texto (sin ser objetos)
    //     evento.realizador = [];
    //     for(var i in $scope.realizadores)
    //         if($scope.realizadores[i].nombre !== "")
    //             evento.realizador[i] = $scope.realizadores[i].nombre;
    //     // Agregar el id del Lugar, solo si fué seleccionado
    //     if($scope.asyncLugar)
    //         evento.lugar = $scope.asyncLugar._id;
    //     return evento;
    // };
    
    // $scope.updateEvento = function(){
    //     // Parse de realizadores para agregar solo el texto (sin ser objetos)
    //     if(!(($scope.realizadores.length == 1) && ($scope.realizadores[0].nombre === "")))
    //     $scope.evento.realizador = [];
    //     for(var i in $scope.realizadores)
    //         if($scope.realizadores[i].nombre !== "")
    //             $scope.evento.realizador[i] = $scope.realizadores[i].nombre;
    // };
    
    // Cambia y asigna el arreglo de objetos "$scope.realizadores" por el arreglo de strings "$scope.evento.realizador"
    $scope.updateRealizador = function(){
        // Parse de realizadores para agregar solo el texto (sin ser objetos)
        if(!(($scope.realizadores.length == 1) && ($scope.realizadores[0].nombre === "")))
        $scope.evento.realizador = [];
        for(var i in $scope.realizadores)
            if($scope.realizadores[i].nombre !== "")
                $scope.evento.realizador[i] = $scope.realizadores[i].nombre;
    };

    // $scope.enviar = function(){
    //     var evento = $scope.crearEvento();

    //     if ($scope.imagenPrincipal){ // Si se agregó imagen, subirla al servidor
    //         Upload.upload({
    //             url: 'api/upload', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
    //             data: {file: $scope.imagenPrincipal} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
    //         }).then(function (resp) {
    //             console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
    //             evento.imagenPrincipal = resp.config.data.file.name; // Agregar el nombre de la imagen recien subida al servidor
    //             Evento.create(evento) // Subir la información del evento a la base de datos
    //             .then(function(res){
    //                 console.log("Evento creado exitosamente", res.data.id);
    //                 alert("Se ha creado el evento. Serás redirigido a la página de eventos.");
    //                 $location.url('/eventos'); // Redirigir a la página de eventos
    //             }, function(res){
    //                 console.log("Error de conexión con la base de datos para la creación del evento.", res);
    //             });
    //         }, function (resp) {
    //             console.log('Error status: ' + resp.status);
    //         }, function (evt) {
    //             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //             console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //         });
    //     }else{
    //         Evento.create(evento) // Subir la información del evento a la base de datos
    //         .then(function(res){
    //             console.log("Evento creado exitosamente", res.data.id);
    //             alert("Se ha creado el evento. Serás redirigido a la página de eventos.");
    //             $location.url('/eventos'); // Redirigir a la página de eventos
    //         }, function(res){
    //             console.log("Error de conexión con la base de datos para la creación del evento.", res);
    //         });
    //     }
    // };
    $scope.enviar = function(){
        var evento = $scope.crearEvento();

        if ($scope.imagenPrincipal){ // Si se agregó imagen, subirla al servidor
            Upload.upload({
                url: 'api/upload', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
                data: {file: $scope.imagenPrincipal} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
                evento.imagenPrincipal = resp.config.data.file.name; // Agregar el nombre de la imagen recien subida al servidor
                Evento.create(evento) // Subir la información del evento a la base de datos
                .then(function(res){
                    console.log("Evento creado exitosamente", res.data.id);
                    alert("Se ha creado el evento. Serás redirigido a la página de eventos.");
                    $location.url('/eventos'); // Redirigir a la página de eventos
                }, function(res){
                    console.log("Error de conexión con la base de datos para la creación del evento.", res);
                });
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }else{
            Evento.create(evento) // Subir la información del evento a la base de datos
            .then(function(res){
                console.log("Evento creado exitosamente", res.data.id);
                alert("Se ha creado el evento. Serás redirigido a la página de eventos.");
                $location.url('/eventos'); // Redirigir a la página de eventos
            }, function(res){
                console.log("Error de conexión con la base de datos para la creación del evento.", res);
            });
        }
    };

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