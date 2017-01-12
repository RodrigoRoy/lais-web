/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y 
eliminar datos de autores a la base de datos*/


angular.module('AutorService', []).factory('Autor', ['$http', function($http){
	return {
		// Obtiene todas los autores
		all: function(){
			return $http.get('/api/autores');
		},

		// Obtiene un autor en particular mediante su ID
		get: function(autorID){
			return $http.get('/api/autores/' + autorID);
		},

		//Crea un nuevo autor con el objeto dado como parámetro
		create: function(autorData){
			return $http.post('/api/autores', autorData);
		},

		// Actualiza la información de un autor (mediante su ID y el objeto dado como segundo parámetro)
		update: function(autorID, autorData){
			return $http.put('/api/autores/' + autorID, autorData);
		},

		// Elimina al autor con su respectivo ID
		delete: function(autorID){
			return $http.delete('/api/autores/' + autorID);
		},

		// Busca autor(es) por su nombre
		search: function(query){
			return $http.get('/api/autores/search?q=' + query);
		}

	}
}]);