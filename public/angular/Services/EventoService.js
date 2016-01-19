/*Servicio(Factory) que administra las llamadas a servidor para obtener,editar,enviar y eliminar datos de los eventos a la base de datos*/


angular.module('EventoService', []).factory('Evento', ['$http', function($http){
	return {
		// Obtiene todos los eventos
		all: function(){
			return $http.get('/api/eventos');
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
		}
	}
}]);