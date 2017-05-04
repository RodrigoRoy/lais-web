//Controlador que enlista todos los eventos

angular.module('EventosListCtrl',[]).controller('EventosListController', function ($scope, $location, $uibModal, Evento) {
	// No permitir ingresar a la página de este controlador sin sesión iniciada
    if(!$scope.loggedIn)
        $location.path('/');
    
	$scope.propertyName = 'createdAt';
	$scope.reverse = true;

	// Obtener todos los eventos
	$scope.getEvents = function(){
		Evento.all()
		.then(function(res){
			if(res.statusText === 'OK'){
				$scope.eventos = res.data;
			}
		}, function(res){
			console.error('Error de conexión con la base de datos');
		});
	};

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

	// Elimnia un evento de la base de datos
	$scope.delete = function(eventoID){
		Evento.delete(eventoID)
			.then(function(res){
				// alert("Evento eliminado");
            	$scope.getEvents(); // Recargar la vista actual (no es una recarga completa de la página)
			}, function(res){
				alert("Error al eliminar. Por favor intentalo más tarde.");
				console.error("Error al eliminar evento de la base de datos", res);
			});
	};

	// Muestra un modal de advertencia al borrar un archivo
    $scope.openModal = function(evento){
    	$uibModal.open({
    		ariaDescribedBy: 'modal-body',
    		size: 'sm',
    		templateUrl: 'modal-template.html',
    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
    		controller: function($uibModalInstance){
    			$scope.evento = evento;
    			$scope.closeModal = function(){
    				$uibModalInstance.dismiss('cancel');
    			};
    			$scope.deleteConfirmed = function(eventoID){
    				$scope.delete(eventoID);
    				$uibModalInstance.close();
    			};
    		}
    	});
    }

	// INICIALIZACION: Obtener eventos
	$scope.getEvents();
})