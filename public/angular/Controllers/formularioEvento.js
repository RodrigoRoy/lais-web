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

    $scope.realizadores = [{name: ""}];
    $scope.add = function(){
        //if(($scope.realizadores[$scope.realizadores.length - 1].name !== "") && ($scope.realizadores.length < 3))
        if($scope.realizadores.length < 3)
            $scope.realizadores.push({
                name: ""
            });
    };

    // $scope.upload = function (file) {
    //     Upload.upload({
    //         url: 'upload/url',
    //         data: {file: file, 'username': $scope.username}
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };
});