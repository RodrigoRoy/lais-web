/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y 
eliminar datos de los eventos a la base de datos*/


angular.module('EventoService', []).factory('Evento', ['$http', function($http){
	return {
		// Obtiene todos los eventos
		// Permite filtrar por tipo de evento (Académico o Docencia)
		all: function(tipoEvento){
			if(tipoEvento)
				return $http.get('/api/eventos?tipo=' + tipoEvento);
			else
				return $http.get('/api/eventos');
		},

		// Obtiene todos los eventos agrupados por año (en orden descendente)
		byDate: function(){
			return $http.get('/api/eventos?group=fecha');
		},

		// Obtiene el evento en particular con el eventoID
		get: function(eventoID){
			return $http.get('/api/eventos/' + eventoID);
		},

		//Crea un nuevo evento, con el lo que le enviemos de datos(eventoData)
		create: function(eventoData){
			return $http.post('/api/eventos', eventoData);
		},

		// Actualiza la información de un evento (mediante el eventoID y la información nueva eventoID)
		// 
		update: function(eventoID, eventoData){
			return $http.put('/api/eventos/' + eventoID, eventoData);
		},

		//Elimina el evento con su respectivo eventoID
		delete: function(eventoID){
			return $http.delete('/api/eventos/' + eventoID);
		},

		//Obtiene los 4 eventos más recientes
		news: function(){
			return $http.get('/api/eventos/news');
		},

		// Determina los eventos que contengan al archivoID como documento adjunto
		attachment: function(archivoID){
			return $http.get('/api/eventos/search?attachment=' + archivoID);
		}
	}
}]);