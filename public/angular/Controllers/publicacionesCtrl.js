/* Formulario para registrar una publicación */

angular.module('PublicacionesCtrl',[]).controller('PublicacionesController', function ($scope, $routeParams, $location, Publicacion, Autor){

	// Variables
	$scope.publicaciones = [];
	$scope.collapse = {}; // auxiliar para mostrar/ocultar publicaciones: contiene como atributos el nombre de la agrupación y bool como valor
	// Establece el tipo de agrupación para las publicaciones
	// Por ejemplo, desde URL: /publicacion?group=tipo
	// var groupType = $routeParams.group || 'fecha';
	// var matchRestriction = $routeParams.match || '';
	
	var autorId = $routeParams.autor;
	$scope.autorObject = {}; // Objeto con la info del autor
	$scope.renameId = { // Auxiliar para pluralizar los nombres (id's) de cada grupo de publicaciones
		'Documental': 'Documentales',
		'Artículo': 'Artículos',
		'Ponencia': 'Ponencias',
		'Libro': 'Libros',
		'Capítulo de libro': 'Capítulos de libro',
		'Exposición': 'Exposiciones'
		'Página web': 'Sitios web',
	};

	$scope.getPublicaciones = function(){
		if(autorId){ // Si se desean las publicaciones de un autor específico
			Publicacion.autor(autorId)
			.then(function(res){ // Success
				$scope.publicaciones = res.data;
				// Banderas para colapsar información (que viene agrupada)
				for(var i in $scope.publicaciones)
					$scope.collapse[$scope.publicaciones[i]._id] = true;
				if($routeParams.show)
					$scope.collapse[$routeParams.show] = false;
				// Obtener los datos del autor (e.g. nombre)
				Autor.get(autorId)
				.then(function(res){
					$scope.autorObject = res.data;
				}, function(res){
					console.error('Error de conexión para obtener al autor: ', res);
				});
			}, function(res){ // Fail
				console.error('Error de conexión con la base de datos: ', res);
			})
		}else{
			// Si se desean agrupar por año
			// Publicacion.groupBy(groupType, matchRestriction)
			// .then(function(res){ // Success
			// 	$scope.publicaciones = res.data;
			// }, function(res){ // Fail
			// 	console.error('Error de conexión con la base de datos: ', res);
			// });
			Publicacion.group('tipo')
			.then(function(res){ // Success
				$scope.publicaciones = res.data;
				// Banderas para colapsar información (que viene agrupada)
				for(var i in $scope.publicaciones)
					$scope.collapse[$scope.publicaciones[i]._id] = true;
				if($routeParams.show)
					$scope.collapse[$routeParams.show] = false;
			}, function(res){ // Fail
				console.error('Error de conexión con la base de datos: ', res);
			});
		}
	};

	// Cambia la visibilidad de un conjunto de publicaciones
	// Adicionalmente permite modificar la URL
	$scope.toggle = function(groupId){
		// for(var i in $scope.collapse) // Si se desea solamente tener un grupo abierto a la vez
		// 	$scope.collapse[i] = true;
		$scope.collapse[groupId] = !$scope.collapse[groupId];
		$scope.setUrl(groupId);
	};

	// Establece en la URL el parámetro "show" por el valor dado
	$scope.setUrl = function(groupName){
		$location.search('show', groupName);
	};

	// Estiliza nombre y apellido al estilo deseado para hacer citas
	$scope.stylizeName = function(nombre, apellido, mode){
		var stylizedName = '';
		var styleMode = mode || 'APA';
		// Manejo de errores si es que faltan parámetros:
		if(!apellido)
			return nombre;
		if(!apellido && !nombre)
			return '';

		if(styleMode === 'APA'){
			var apellidoArray = apellido ? apellido.split(' ') : [];
			var nombreArray = nombre ? nombre.split(' ') : [];
			for(var i in apellidoArray)
				if(apellidoArray[i].charAt(0) === apellidoArray[i].charAt(0).toUpperCase()){ // si es mayúscula
					stylizedName += apellidoArray[i];
					break;
				}
			for(var i in nombreArray)
				if(nombreArray[i].charAt(0) === nombreArray[i].charAt(0).toUpperCase()){
					stylizedName += ', ' + nombreArray[i].charAt(0) + '.';
					break;
				}
			return stylizedName;
		}
		return 'nombre' + ' ' + 'apellido';
	};

	// Devuelve un conjunto de nombres al estilo deseado en forma de lista (string)
	// Recibe un arreglo de objetos que incluyen las propiedades nombres y apellido
	$scope.stylizedArrayName = function(namesArray, mode){
		var nombres = [];
		var styleMode = mode || 'APA';
		for(var i in namesArray)
			nombres.push($scope.stylizeName(namesArray[i].nombre, namesArray[i].apellido, styleMode));
		return nombres.join(', ');
	}

	// INICIALIZACION:
	$scope.getPublicaciones();
})