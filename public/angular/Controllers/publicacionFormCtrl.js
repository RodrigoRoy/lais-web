/* Formulario para registrar una publicación */

angular.module('PublicacionFormCtrl',[]).controller('PublicacionFormController', function ($scope, $location, $routeParams, Publicacion, Autor, Archivo, Upload){

	// Variables
	$scope.publicacion = {}; // Representa al objeto que se ingresa en la base de datos
	$scope.edit = false; // Determina si se está realizando nuevo ingreso o edición de una publicación existente
	$scope.autor = {}; // Auxiliar que contiene la información de un autor a registrar
	$scope.addingAuthor = false; // Determina si se está registrando un nuevo autor
	$scope.calendar = { // Auxiliar para determinar propiedades del calendario (por ejemplo: cuándo es visible)
		open: false,
	}
	$scope.dateOptions = { // Configuración del calendario
		formatYear: 'yyyy',
	    minMode: 'year' // Usar esta propiedad en vez de 'dateMode' evita errores al ingresar el año
	};
	$scope.publicacion.usuario = $scope.user.id ? $scope.user.id : undefined; // Obtener Id de usuario
	
	// Promise para autocompletar el input 'typeahead' de Autor
	$scope.getAutor = function(query){
		return Autor.search(query).
			then(function(res){
				return res.data;
			});
	}
	// Al seleccionar un autor se agrega a la lista de autores de la publicación.
	// Detalles en: http://angular-ui.github.io/bootstrap/versioned-docs/1.0.3/#/typeahead
	// Nota: item === {Autor}
	//		 model === "Apellido, Nombre"
	$scope.onSelectAutor = function(item, model, label, event){
		if(!$scope.publicacion.autor)
			$scope.publicacion.autor = []; // Lista de Id de autores
		if(!$scope.autores)
			$scope.autores = []; // Lista de Nombres de autores
		if($scope.publicacion.autor.indexOf(item._id) === -1){ // No agregar repetidos!
			$scope.publicacion.autor.push(item._id);
			$scope.autores.push(item);
		}
		$scope.asyncAutorInput = ""; // Borrar el input text para buscar otro autor
	};
	// Mostrar inputs para registrar autor
	$scope.showAutorForm = function(){
		$scope.addingAuthor = true;
	};
	// Agrega nombre y apellido de un nuevo autor
	$scope.addAutor = function(){
		Autor.create($scope.autor).
			then(function(res){
				$scope.addingAuthor = false;
				$scope.autor = {};
				$scope.asyncAutorInput = ""; // Borrar el input text
				alert("Autor registrado. Ahora puedes agregarlo como autor de la publicación");
			});
	};
	// Abrir el calendario al dar clic en el botón con icono
	$scope.openCalendar = function(event){
		$scope.calendar.open = true;
	};
	// Promise para autocompletar y sugerir el input 'typeahead' de Keywords
	$scope.loadTags = function(query){
		return Publicacion.tagSearch(query).
			then(function(res){
				return res.data;
			});
	};
	// Agrega keywords del input a $scope.publicacion
	// Esto se debe al formato de la biblioteca "ngTagsInput" (http://mbenford.github.io/ngTagsInput/documentation/api)
	$scope.updateKeywords = function(){
		if($scope.keywords){
            $scope.publicacion.keywords = [];
            for(var i in $scope.keywords)
                $scope.publicacion.keywords[i] = $scope.keywords[i].text; // NOTA: la propiedad "text" contiene el nombre del tag/keyword
        }
	};
	// Sube archivos al servidor y después los registra a la base de datos Archivos
	// De esta manera se obtienen los Id de los archivos para $scope.publicacion.adjuntos
    $scope.uploadFiles = function(file){
        Upload.upload({
            url: 'api/files/publicaciones', // Ruta de Node (usando POST) para el manejo del almacenamiento en servidor
            data: {file: file} // Es posible incluir datos adicionales si es necesario (ej. {file: file, 'username': 'Roy'})
        }).then(function (res) { // Función cuando el archivo es subido exitosamente al servidor
            // Crear un arreglo temporal con los nombres de los archivos y su ubicación (desde response de servidor)
            $scope.adjuntos = [];
            for(var i in res.config.data.file)
                $scope.adjuntos[i] = {filename: res.config.data.file[i].name, location: res.data.location + '/'};
            // Agregarlos en la base de datos, en la colección "Archivos"
            Archivo.create($scope.adjuntos)
	            .then(function(res){
	            	$scope.publicacion.adjuntos = [];
	            	$scope.adjuntos = res.data.files; // Reusar la variable, ahora incluye Id's de los archivos
	            	// Finalmente se puede obtener el arreglo que contiene solamente los Id's
	            	for(var i in res.data.files)
	            		$scope.publicacion.adjuntos[i] = res.data.files[i]._id;
	            }, function(res){
	            	console.error('Error al registrar en la colección "Archivo" de la base de datos');
	            });
        }, function (res) { // Función para manejo de error al guardar las imagenes en el servidor
            console.log('Error status: ' + res.status);
        }, function (evt) { // Función para notificar progreso al guardar las imagenes en el servidor
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ');
        });
    };
    // Envia el objeto $scope.publicacion a la base de datos
	$scope.enviar = function(){
        Publicacion.create($scope.publicacion) // Subir la información de la publicación a la base de datos
        .then(function(res){
            alert("Se ha guardado la información de la publicación.");
            $location.url('/publicaciones/' + res.data.id); // Redirigir a la página de la publicación creada
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación de la publicación.", res);
        });
    };
    // Envia el objeto $scope.publicacion a la base de datos para ser editado
	$scope.editar = function(){
        Publicacion.update($routeParams.id, $scope.publicacion)
        .then(function(res){
            alert("Se ha actualizado la información de la publicación.");
            $location.url('/publicaciones/' + $routeParams.id); // Redirigir a la página de la publicación
        }, function(res){
            console.log("Error de conexión con la base de datos para la creación de la publicación.", res);
        });
    };

    // EDICION
    // Si se desea editar una publicación, se reutiliza el formulario con información para $scope.publicacion desde la BD
    if(/edit$/.test($location.path())){ // Prueba con expresión regular para saber si la URL termina con "edit"
        $scope.edit = true;
        Publicacion.get($routeParams.id) // Obtener la información de la publicación en la base de datos
        .then(function(res){
            $scope.publicacion = res.data // Casi toda la información de la publicación se asigna directamente
            // Parse para "autor"
    		if($scope.publicacion.autor && $scope.publicacion.autor.length > 0){
				// Copiar arreglo:
				$scope.autores = [];
				for(var i in $scope.publicacion.autor)
					$scope.autores.push($scope.publicacion.autor[i]);
				// Restaurar pero solo Id's:
				$scope.publicacion.autor = [];
				for(var i in $scope.autores)
					$scope.publicacion.autor.push($scope.autores[i]._id);
            }
            // Parse para "keywords":
            if($scope.publicacion.keywords && $scope.publicacion.keywords.length > 0){
                $scope.keywords = [];
                for(var i in $scope.publicacion.keywords)
                    $scope.keywords.push({"text": $scope.publicacion.keywords[i]});
            }
            // Parse para "adjuntos" (análogo a "autor")
            if($scope.publicacion.adjuntos && $scope.publicacion.adjuntos.length > 0){
            	$scope.adjuntos = [];
            	for(var i in $scope.publicacion.adjuntos)
            		$scope.adjuntos.push($scope.publicacion.adjuntos[i]);
            	$scope.publicacion.adjuntos = [];
            	for(var i in $scope.adjuntos)
            		$scope.publicacion.adjuntos.push($scope.adjuntos[i]._id);
            }
        }, function(res){
            console.log("Error de conexión con la base de datos para obtener información de la publicación.", res);
        });
    } // FIN EDICION
})