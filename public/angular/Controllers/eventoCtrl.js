/*Controlador que manda a llamar la información de un evento con su id */

angular.module('EventoCtrl',[]).controller('EventoController', function ($scope, $location, $routeParams, $cookies, Evento){

	//Obtiene el evento con su ID
	Evento.get($routeParams.id)
		.then(function(res){
			$scope.titulo = res.data.titulo;
			$scope.descripcion = res.data.descripcion;
			$scope.imagenPrincipal = res.data.imagenPrincipal;
			$scope.contenidoHTML = res.data.contenidoHTML;
			$scope.tipo = res.data.tipo;
			$scope.lugar = res.data.lugar;
			console.log($scope.lugar);
			
			//For para guardar a los realizadores en una cadena
			var text = ""
			for	(index = 0; index < res.data.realizador.length; index++) {
    			text += " " + res.data.realizador[index];
    			//console.log(text);
			}
			$scope.realizador = text;	
			//console.log($scope.realizador);

			var tels = ""
			for(index = 0; index < res.data.lugar.telefono.length; index++) {
			 	tels += res.data.lugar.telefono[index]+", ";
			 	console.log(tels);
			 };
			 $scope.tels = tels;
		})
})