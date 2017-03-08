//Controlador que enlista todos los eventos

angular.module('PublicacionesListCtrl',[]).controller('PublicacionesListController', function ($scope, $location, $uibModal, Publicacion) {
	
	$scope.propertyName = 'fecha';
	$scope.reverse = true;

	// Obtener todas las publicaciones
	$scope.getPublicaciones = function(){
		Publicacion.all()
			.then(function(res){
				if(res.statusText === 'OK'){
					$scope.publicaciones = res.data;
				}
			}, function(res){
				console.log('Error de conexión con la base de datos');
			});
	};

	// Redirige a la página de edición de la publicación cuyo ID es dado como parámetro
	$scope.edit = function(id){
		$location.url('/publicaciones/' + id + '/edit'); // $location.path() también funciona
	};

	// Redirige a la página de creación para una nueva publicación
	$scope.new = function(){
		$location.url('/publicaciones/nuevo');
	};

	// Asigna la propiedad usada para el orden de la tabla de eventos
	$scope.sortBy = function(propertyName){
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	// Elimnia una publicación de la base de datos
	$scope.delete = function(publicacionID){
		Publicacion.delete(publicacionID)
			.then(function(res){
				// alert("Publicación eliminada");
            	$scope.getPublicaciones(); // Recargar la vista actual (no es una recarga completa de la página)
			}, function(res){
				alert("Error al eliminar. Por favor intentalo más tarde.");
				console.error("Error al eliminar publicación de la base de datos", res);
			});
	};

	// Muestra un modal de advertencia al borrar un archivo
    $scope.openModal = function(publicacion){
    	$uibModal.open({
    		ariaDescribedBy: 'modal-body',
    		size: 'sm',
    		templateUrl: 'modal-template.html',
    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
    		controller: function($uibModalInstance){
    			$scope.publicacion = publicacion;
    			$scope.closeModal = function(){
    				$uibModalInstance.dismiss('cancel');
    			};
    			$scope.deleteConfirmed = function(publicacionID){
    				$scope.delete(publicacionID);
    				$uibModalInstance.close();
    			};
    		}
    	});
    }

	// INICIALIZACIÓN: Obtener todas las publicaciones
	$scope.getPublicaciones();

})