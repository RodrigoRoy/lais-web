angular.module('EventoFormCtrl', []).controller('EventoFormController', function ($scope) {
    
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

    $scope.realizadores = [{name: ""}];
    $scope.add = function(){
        //if(($scope.realizadores[$scope.realizadores.length - 1].name !== "") && ($scope.realizadores.length < 3))
        if($scope.realizadores.length < 3)
            $scope.realizadores.push({
                name: ""
            });
    };
});