/*Servicio(Factory) que administra las llamadas a servidor para obtener y editar datos del carrusel*/

angular.module('CarruselService', []).factory('Carrusel', ['$http', function($http){
	return {
		// Obtiene la información del carrusel
		get: function(){
			return $http.get('/api/carrusel');
		},

		// Actualiza la información del carrusel
		update: function(carouselData){
			return $http.post('/api/carrusel', carouselData);
		}
	}
}]);