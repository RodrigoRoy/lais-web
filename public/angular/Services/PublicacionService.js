/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y 
eliminar datos de las publicaciones a la base de datos*/


angular.module('PublicacionService', []).factory('Publicacion', ['$http', function($http){
	return {
		// Obtiene todas las publicaciones
		all: function(){
			return $http.get('/api/publicaciones');
		},

		// Obtiene la publicacion en particular mediante su ID
		get: function(publicacionID){
			return $http.get('/api/publicaciones/' + publicacionID);
		},

		//Crea una nueva publicacion con el objeto dado como parámetro
		create: function(publicacionData){
			return $http.post('/api/publicaciones', publicacionData);
		},

		// Actualiza la información de una publicacion (mediante su ID y el objeto dado como segundo parámetro)
		// 
		update: function(publicacionID, publicacionData){
			return $http.put('/api/publicaciones/' + publicacionID, publicacionData);
		},

		//Elimina la publicacion con su respectivo ID
		delete: function(publicacionID){
			return $http.delete('/api/publicaciones/' + publicacionID);
		},

		// Filtrar publicaciones por keyword
		tagSearch: function(query){
			return $http.get('api/publicaciones/tags?q=' + query);
		},

		// Agrupar las publicaciones por propiedad (e.g. fecha). Permite restringuir mediante match (e.g. tipo)
		groupBy: function(propiedad, match){
			return $http.get('api/publicaciones?group=' + propiedad + '&match=' + match);
		},

		// Agrupar publicaciones por autor (en orden cronológico por default)
		autor: function(autorID){
			return $http.get('api/publicaciones?autor=' + autorID);
		},

		// Determina los eventos que contengan al archivoID como documento adjunto
		attachment: function(archivoID){
			return $http.get('/api/publicaciones/search?attachment=' + archivoID);
		}
	}
}]);