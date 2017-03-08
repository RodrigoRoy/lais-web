/* Información y acciones para la página individual de una publicación */

angular.module('PublicacionCtrl',[]).controller('PublicacionController', function ($scope, $routeParams, Publicacion){

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

	$scope.getPublicacion();
})