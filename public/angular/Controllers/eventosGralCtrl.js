/*Controlador de la página de eventos, se encarga de obtener todos los eventos existentes de la base de datos */

angular.module('EventosCtrl', []).controller('EventosController', function ($scope, $location, Evento) {
	
	$scope.currentPage = 1; //Indica el número de página actual
	$scope.maxSize = 10; //Maximo numero de páginas a mostrar para escojer
	$scope.itemsPerPage = 9; //Maximo numero de eventos a mostrar por página, lo cuál son 9

	// Obtiene la información de todos los eventos
	$scope.getEvents = function(){
		Evento.all() //Se trae todos los eventos usando el servicio de Evento
		.then(function(res){ 
			$scope.eventos = res.data; //Todos los eventos
		}, function(res){ 
			alert('Error de Conexión con la Base de Datos');
		});
	};

	// Auxiliar para realizar busquedas (está deshabilitada esta opción)
	// $scope.buscar = function(query){
	// 	if(query)
	// 		$location.url('/eventos/busqueda/'+query)
	// }

	// Determina si una fecha es menor que el día de hoy (en tiempo de ejecución)
	$scope.isAvaliable = function(fechaStr){
		if(fechaStr === undefined)
			return false
		var today = new Date(),
			fecha = new Date(fechaStr);
		return today.getTime() < fecha.getTime();
	};

	// Objeto contenedor de filtros. Hace referencia a cada checkbox en la vista.
	// $scope.filterModel = {
	// 	academico: true,
	// 	docencia: true
	// };
	// Función que se manda a llamar durante el filtrado de Angular en la vista (ng-repeat) de los eventos.
	// Recibe como parémetro el evento (value), su índice (index) y el arreglo completo con los eventos (array)
	// Devuelve true si alguno de los checkboxs de filtrado (filterModel) es verdadero, false en otro caso.
	// $scope.filterType = function(value, index, array){
	// 	return ($scope.filterModel.academico && (value.tipo === 'academico')) || ($scope.filterModel.docencia && (value.tipo === 'docencia'));
	// 	Es decir:
	// 	if($scope.filterModel.academico && (value.tipo === 'academico'))
	// 		return true;
	// 	if($scope.filterModel.docencia && (value.tipo === 'docencia'))
	// 		return true;
	// 	return false;
	// };

	// INICIALIZACION: obtener eventos
	$scope.getEvents();
	
});
