//Controlador que enlista todos los materiales de archivo

angular.module('AudiovisualesListCtrl',[]).controller('AudiovisualesListController', function ($scope, $location, $uibModal, Audiovisual) {
	// No permitir ingresar a la página de este controlador sin sesión iniciada
	if(!$scope.loggedIn)
		$location.path('/');
	
	$scope.propertyName = 'fecha';
	$scope.reverse = true;

	// Obtener todos los materiales de archivo
	$scope.getAudiovisuales = function(){
		Audiovisual.all()
			.then(function(res){
				$scope.audiovisuales = res.data;
			}, function(res){
				console.error('Error de conexión con la base de datos', res);
			});
	};

	// Redirige a la página de edición del material de archivo cuyo ID es dado como parámetro
	$scope.edit = function(id){
		$location.url('/audiovisuales/' + id + '/edit'); // $location.path() también funciona
	};

	// Redirige a la página de creación para una nueva publicación
	$scope.new = function(){
		$location.url('/audiovisuales/nuevo');
	};

	// Asigna la propiedad usada para el orden de la tabla de materiales de archivo
	$scope.sortBy = function(propertyName){
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

	// Elimina un material de archivo de la base de datos
	$scope.delete = function(audiovisualID){
		Audiovisual.delete(audiovisualID)
			.then(function(res){
            	$scope.getAudiovisuales(); // Recargar la vista actual (no es una recarga completa de la página)
			}, function(res){
				alert("Error al eliminar. Por favor intentalo más tarde.");
				console.error("Error al eliminar material de archivo en la base de datos", res);
			});
	};

	// Muestra un modal de advertencia al borrar un material de archivo
    $scope.openModal = function(audiovisual){
    	$uibModal.open({
    		ariaDescribedBy: 'modal-body',
    		size: 'sm',
    		templateUrl: 'modal-template.html',
    		scope: $scope, // pasar el actual $scope (evitar 'crear' otro controlador)
    		controller: function($uibModalInstance){
    			$scope.audiovisual = audiovisual;
    			$scope.closeModal = function(){
    				$uibModalInstance.dismiss('cancel');
    			};
    			$scope.deleteConfirmed = function(audiovisualID){
    				$scope.delete(audiovisualID);
    				$uibModalInstance.close();
    			};
    		}
    	});
    }

	// INICIALIZACIÓN: Obtener todos los materiales de archivo
	$scope.getAudiovisuales();

})