/*
    Controlador del formulario para eventos.
*/

angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope, Upload) {
    
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
    $scope.realizadores = [{nombre: ""}]; // Arreglo de "personas" (objetos con propiedad 'name')
    $scope.add = function(){
        if(($scope.realizadores[$scope.realizadores.length - 1].nombre !== "") && ($scope.realizadores.length < $scope.maxLengthRealizadores))
            $scope.realizadores.push({
                nombre: ""
            });
    };

    $scope.upload = function(file){
        Upload.upload({
            url: 'api/upload',
            data: {file: file, 'username': 'Roy'}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});