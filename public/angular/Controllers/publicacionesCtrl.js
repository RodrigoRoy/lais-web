/* Formulario para registrar una publicación */

angular.module('PublicacionesCtrl',[]).controller('PublicacionesController', function ($scope, Publicacion){

	// Variables
	$scope.publicaciones = [];

	$scope.getPublicaciones = function(){
		Publicacion.groupBy('fecha')
		.then(function(res){
			// Success
			$scope.publicaciones = res.data;
		}, function(res){
			// Fail
			console.log('Error de conexión con la base de datos: ', res);
		});
	};

	$scope.getPublicaciones();
})