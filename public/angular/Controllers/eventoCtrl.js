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
			//console.log($scope.lugar);
			
			//Join para guardar a los realizadores en una cadena
			$scope.realizador = res.data.realizador.join();
			
			//Join para guardar los telefonos en una cadena
			$scope.tels = res.data.lugar.telefono.join();
			//console.log($scope.tels);
			
		})	
})