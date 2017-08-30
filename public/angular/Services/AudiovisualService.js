/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y 
eliminar datos de los videos (registros audiovisuales) a la base de datos*/

angular.module('AudiovisualService', []).factory('Audiovisual', ['$http', function($http){
	return {
		// Obtiene todos los videos
		all: function(){
			return $http.get('/api/videos');
		},

		// Obtiene el video en particular con el videoID
		get: function(videoID){
			return $http.get('/api/videos/' + videoID);
		},

		//Crea un nuevo video, incluyendo los datos necesarios (videoData)
		create: function(videoData){
			return $http.post('/api/videos', videoData);
		},

		// Actualiza la información de un video (mediante el videoID y la información nueva videoID)
		update: function(videoID, videoData){
			return $http.put('/api/videos/' + videoID, videoData);
		},

		//Elimina el video con su respectivo videoID
		delete: function(videoID){
			return $http.delete('/api/videos/' + videoID);
		},

		// Obtener algún arreglo de tags (buscar 'ngTagsInput') contenido en archivo JSON
		getTags: function(JSONfilename){
			return $http.get('js/' + JSONfilename);
		},

		// Busquedas de contenido (sin repetición) en un campo específico
		search: function(field, query){
			return $http.get('/api/videos/search?f=' + field + '&q=' + query);
		}
	}
}]);