//Controlador que enlista todos los eventos

angular.module('EventosListCtrl',[]).controller('EventosListController', function ($scope, $location, Evento) {
	
	$scope.propertyName = 'fechaCreacion';
	$scope.reverse = true;


	// Obtener todos los eventos
	Evento.all()
		.then(function(res){
			if(res.statusText === 'OK'){
				$scope.eventos = res.data;
			}
		}, function(res){
			console.log('Error de conexión con la base de datos');
		});

	// Redirige a la página de edición del evento cuyo ID es dado como parámetro
	$scope.edit = function(id){
		$location.url('/eventos/' + id + '/edit'); // $location.path() también funciona
	};

	// Redirige a la página de creación para un nuevo evento
	$scope.new = function(){
		$location.url('/eventos/nuevo');
	};

	// Asigna la propiedad usada para el orden de la tabla de eventos
	$scope.sortBy = function(propertyName){
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

})