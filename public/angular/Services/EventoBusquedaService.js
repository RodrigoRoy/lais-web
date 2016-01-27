angular.module('EventosBusquedaService', []).factory('EventosBusqueda', ['$http', function($http){
	return {

		busqueda: function (query){
			return $http.get('/api/eventos/find?search=' + query);
		}

	}
}]);