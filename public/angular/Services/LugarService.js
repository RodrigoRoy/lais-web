/*
	Servicio (Factory) que administra las llamadas a servidor para obtener, editar, enviar y eliminar datos de los lugares a la base de datos
*/


angular.module('LugarService', []).factory('Lugar', ['$http', function($http){
	return {
		// Obtiene todos los lugares
		all: function(){
			return $http.get('/api/lugares');
		},

		// Obtiene el lugar en particular (mediante el ID)
		get: function(lugarID){
			return $http.get('/api/lugares/' + lugarID);
		},

		// Crea un nuevo lugar, recibe como parámetro la información del lugar
		create: function(lugarData){
			return $http.post('/api/lugares', lugarData);
		},

		// Actualiza la información de un lugar (mediante el ID)
		// Recibe el ID del lugar a modificar y la nueva información del lugar
		update: function(lugarID, lugarData){
			return $http.put('/api/lugares/' + lugarID, lugarData);
		},

		// Elimina un lugar (mediante el ID)
		delete: function(lugarID){
			return $http.delete('/api/lugares/' + lugarID);
		},

		find: function(val){
			return $http.get('/api/lugares/find', {params: {search: val}});
		}
	}
}]);