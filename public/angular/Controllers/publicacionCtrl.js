/* Información y acciones para la página individual de una publicación */

angular.module('PublicacionCtrl',[]).controller('PublicacionController', function ($scope, $routeParams, $location, $uibModal, Publicacion){

	// Variables
	$scope.publicacion = {};

	$scope.getPublicacion = function(){
		Publicacion.get($routeParams.id)
		.then(function(res){
			// Success
			$scope.publicacion = res.data;
		}, function(res){
			// Fail
			console.error('Error de conexión con la base de datos: ', res);
		});
	};

	// Elimnia una publicación de la base de datos
	$scope.delete = function(publicacionID){
		Publicacion.delete(publicacionID)
			.then(function(res){
				alert("Publicación eliminada");
				$location.url('/publicacion'); // Redirigin a página de eventos
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
    				$uibModalInstance.close();
    				$scope.delete(publicacionID);
    			};
    		}
    	});
    }

	$scope.getPublicacion();
})