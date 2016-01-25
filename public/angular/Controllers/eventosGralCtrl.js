/*Controlador de la página de eventos, se encarga de obtener todos los eventos existentes de la base de datos */

angular.module('EventosCtrl', []).controller('EventosController', function ($scope, $location, $cookies, Evento) {
	
	$scope.currentPage = 1; //Indica el número de página actual
	$scope.maxSize = 5; //Maximo numero de páginas a mostrar para escojer
	$scope.itemsPerPage = 9; //Maximo numero de eventos a mostrar por página, lo cuál son 9

	Evento.all() //Se trae todos los eventos usando el servicio de Evento
		.then(function(res){ 
			$scope.eventos = res.data; //Todos los eventos
			$scope.totalItems = res.data.length; //Número total de eventos

		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});
	
});
