/*
    Controlador del formulario para eventos.
*/

angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope, Lugar, Upload) {
    $scope.evento = {};
    
    $scope.fecha = null; //new Date();
    $scope.showDate = false; // Indicador para mostrar/ocultar el calendario
    $scope.openDate = function(){
        $scope.showDate = true;
    };

    $scope.evento.horario = new Date();
    $scope.roundTime = function(){ // auxiliar para redondear los minutos a módulo 5
        while(($scope.evento.horario.getMinutes() % 5) != 0)
            $scope.evento.horario.setMinutes($scope.evento.horario.getMinutes() + 1);
    };
    $scope.roundTime();

    $scope.maxLengthRealizadores = 10;
    $scope.realizadores = [{nombre: ""}]; // Arreglo de "personas" (objetos con propiedad 'nombre')
    $scope.add = function(){
        if(($scope.realizadores[$scope.realizadores.length - 1].nombre !== "") && ($scope.realizadores.length < $scope.maxLengthRealizadores))
            $scope.realizadores.push({
                nombre: ""
            });
    };

    $scope.maxLengthTelefonos = 3;
    $scope.telefonos = [{numero: ""}]; // Arreglo de "telefonos" (objetos con propiedad 'numero')
    $scope.addPhone = function(){
        if(($scope.telefonos[$scope.telefonos.length - 1].numero !== "") && ($scope.telefonos.length < $scope.maxLengthTelefonos))
            $scope.telefonos.push({
                numero: ""
            });
    };

    // Llamada para realizar la subida al servidor de la imagen (al dar clic en un botón de envio)
    $scope.submit = function(){
        if ($scope.imagenPrincipal){
            $scope.upload($scope.imagenPrincipal);
        }
    };

    // Función que realmente sube al servidor la imagen (al dar clic en "submit" o inmediatamente después de seleccionar imagen)
    $scope.upload = function(file){
        Upload.upload({
            url: 'api/upload', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


    $scope.searchPlace = function(val){
        return Lugar.find(val)
        .then(function(res){ // callback para petición exitosa
            return res.data;
        }, function(res){ // callback para cuando hay un error
            //alert('Hubo un error de conexión. Por favor vuelve a intentarlo.'); // No es buena idea usar alert porque se ejecutar en cada "teclazo"
        });
    };

    // $scope.onSelect = function(item, model, label){
    //     // $scope.$item = $item;
    //     // $scope.$model = $model;
    //     // $scope.$label = $label;
    //     console.log("Item", item);
    //     console.log("Model", model);
    //     console.log("Label", label);
    // };

    $scope.openLugarForm = function(){
        $scope.showDirection = true;
        $scope.asyncLugar = undefined;
    };

    //$scope.lugar = {};
    $scope.showDirection = false;

    $scope.addPlace = function(){
        var place = $scope.lugar;
        place.telefono = [];
        for(var i in $scope.telefono){
            if($scope.telefono[i].numero !== "")
                place.telefono[i] = $scope.telefono[i].numero;
        }
        //console.log(place);

        Lugar.create(place)
        .then(function(res){
            //console.log(res);
            $scope.showDirection = false;
            $scope.lugar = undefined;
        }, function(res){
            // Error on create
            // TODO: Agregar un aviso dentro del formulario en vez de un popup del navegador
            alert('Hubo un error de conexión. Por favor vuelve a intentarlo.');
        });
    };

    // $scope.getEvento = function(){
    //     var evento = $scope.evento;
    //     return evento;
    // };

    $scope.showEvento = function(){
        var evento = $scope.evento;
        evento.realizador = [];
        for(var i in $scope.realizadores)
            if($scope.realizadores[i].nombre !== "")
                evento.realizador[i] = $scope.realizadores[i].nombre;
        if($scope.asyncLugar)
            evento.lugar = $scope.asyncLugar._id;
        console.log("Evento:", evento);
    };
});