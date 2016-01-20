/*Controlador de la página de eventos, se encarga de obtener todos los eventos existentes de la base de datos */

angular.module('EventosCtrl', []).controller('EventosController', function ($scope, $location, $cookies, Evento) {
	$scope.eventos = [];
	
	Evento.all() //Se trae todos los eventos usando el servicio de Evento
		.then(function(res){ 
			$scope.eventos = res.data;
			console.log($scope.eventos);
		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});
});
