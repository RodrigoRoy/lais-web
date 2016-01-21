/*Controlador que manda a llamar la información de un evento con su id */

angular.module('EventoCtrl',[]).controller('EventoController', function ($scope, $location, $routeParams, $cookies, Evento){

	//Obtiene el evento con su ID
	Evento.get($routeParams.id)
		.then(function(res){
			$scope.titulo = res.data.titulo;
			$scope.descripcion = res.data.descripcion;
			$scope.imagenPrincipal = res.data.imagenPrincipal;
			$scope.contenidoHTML = res.data.contenidoHTML;
			console.log(res); 
		})
})