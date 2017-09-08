/*Controlador de la página de eventos, se encarga de obtener todos los eventos existentes de la base de datos */

angular.module('EventosCtrl', []).controller('EventosController', function ($scope, $location, $routeParams, Evento) {
	
	$scope.currentPage = 1; //Indica el número de página actual
	$scope.maxSize = 10; //Maximo numero de páginas a mostrar para escojer
	$scope.itemsPerPage = 12; //Maximo numero de eventos a mostrar por página, lo cuál son 9
	$scope.active = 0; // Indice del tab activo (por default es el primero: cero)
	if($routeParams.show)
		$scope.active = parseInt($routeParams.show);

	// Obtiene la información de todos los eventos
	$scope.getEvents = function(){
		Evento.byDate()
		.then(function(res){ 
			$scope.eventos = res.data; //Todos los eventos
		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});
	};

	// Determina si una fecha es menor que el día de hoy (en tiempo de ejecución)
	$scope.isAvaliable = function(fechaStr){
		if(fechaStr === undefined)
			return false
		var today = new Date(),
			fecha = new Date(fechaStr);
		return today.getTime() < fecha.getTime();
	};

	$scope.setUrl = function(index){
		$location.search('show', index);
	};

	// INICIALIZACION: obtener eventos
	$scope.getEvents();
	
});
