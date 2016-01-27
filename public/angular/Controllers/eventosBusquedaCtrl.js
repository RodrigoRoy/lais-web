/*Controlador de la página de busqueda de eventos, se encarga de obtener todos los eventos existentes
  con la busqueda relacionada de la base de datos */

angular.module('EventosBusquedaCtrl',[]).controller('EventosBusquedaController', function ($scope, $location, EventosBusqueda) {
	$scope.currentPage = 1; //Indica el número de página actual
	$scope.maxSize = 5; //Maximo numero de páginas a mostrar para escojer
	$scope.itemsPerPage = 9; //Maximo numero de eventos a mostrar por página, lo cuál son 9


	$scope.buscar = function (query){ //Funcion que redirigue a la nueva búsqueda
		if(query)
			$location.url('/eventos/busqueda/'+query)
	}

	$scope.busqueda = $location.path().split("/")[3]; //oObtengo el valor de la busqueda

	EventosBusqueda.busqueda($scope.busqueda) 
		.then(function(res){
			$scope.eventos = res.data; //Todos los eventos del query
			$scope.totalItems = res.data.length; //Número total de eventos
			console.log("Encontrados: ",$scope.eventos);
		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});
	
})
