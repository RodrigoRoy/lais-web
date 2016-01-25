/*
    Controlador del formulario para eventos.
*/

angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope, Lugar, Upload) {
    
    $scope.fecha = null; //new Date();
    $scope.showDate = false; // Indicador para mostrar/ocultar el calendario
    $scope.openDate = function(){
        $scope.showDate = true;
    };

    $scope.horario = new Date();
    $scope.roundTime = function(){ // auxiliar para redondear los minutos a módulo 5
        while(($scope.horario.getMinutes() % 5) != 0)
            $scope.horario.setMinutes($scope.horario.getMinutes() + 1);
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
            // console.log(res.data);
            // var array = [];
            // for(var i in res.data){
            //     console.log(i, res.data[i].nombre);
            //     array[i] = res.data[i].nombre;
            // }
            return res.data;
        }, function(res){ // callback para cuando hay un error
            alert('Hubo un error de conexión. Por favor vuelve a intentarlo.');
        });;
    };
});