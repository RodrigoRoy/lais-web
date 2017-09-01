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
		},

		// Se recibe el código del año (comúnmente 4-11) y devuelve un objeto con la propiedad "next"
		// que indica el siguiente entero consecutivo (sin espacios intermedios) que le corresponde
		next: function(yearCode){
			return $http.get('/api/videos/next?year=' + yearCode);
		},

		// Devuelve el valor de una propiedad (neededProperty) que depende de otra propiedad para hacer la referencia (sourceProperty)
		// Se requiere de el valor de la segunda (valueOfSource) para realizar el match en la base de datos.
		// Por ejemplo: Se desea obtener la historia_institucional (neededProperty) de la entidad_productora (sourceProperty) "Lorem Ipsum" (valueOfSource)
		reference: function(neededProperty, sourceProperty, valueOfSource){
			return $http.get('/api/videos/reference?need=' + neededProperty + '&source=' + sourceProperty + '&value=' + valueOfSource);
		}
	}
}]);