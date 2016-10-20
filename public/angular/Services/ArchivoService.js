/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y 
eliminar datos de los archivos a la base de datos*/


angular.module('ArchivoService', []).factory('Archivo', ['$http', function($http){
	return {
		// Obtiene todos los archivos
		all: function(){
			return $http.get('/api/archivos');
		},

		// Obtiene el archivo en particular con el archivoID
		get: function(archivoID){
			return $http.get('/api/archivos/' + archivoID);
		},

		//Crea un nuevo archivo, con el lo que le enviemos de datos(archivoData)
		create: function(archivoData){
			return $http.post('/api/archivos', archivoData);
		},

		// Actualiza la información de un archivo (mediante el archivoID y la información nueva archivoID)
		// 
		update: function(archivoID, archivoData){
			return $http.put('/api/archivos/' + archivoID, archivoData);
		},

		//Elimina el archivo con su respectivo archivoID
		delete: function(archivoID){
			return $http.delete('/api/archivos/' + archivoID);
		},

		// unlink: function(archivoData){
		// 	return $http.post('/api/deleteFile', archivoData);
		// },

		unlink: function(filename){
			return $http.delete('/files/' + filename);
		}

	}
}]);