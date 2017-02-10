//Controlador que enlista todos los eventos

angular.module('PublicacionesListCtrl',[]).controller('PublicacionesListController', function ($scope, $location, $route, Publicacion) {
	
	$scope.propertyName = 'createdAt';
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
				alert("Publicación eliminada");
            	$route.reload(); // Recargar la vista actual (no es una recarga completa de la página)
			}, function(res){
				alert("Error al eliminar. Por favor intentalo más tarde.");
			});
	};

	// INICIALIZACIÓN: Obtener todas las publicaciones
	$scope.getPublicaciones();

})