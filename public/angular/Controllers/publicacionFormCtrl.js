/* Formulario para registrar una publicación */

angular.module('PublicacionFormCtrl',[]).controller('PublicacionFormController', function ($scope, $location, $routeParams, Publicacion, Autor, Archivo, Upload){

	// No permitir ingresar a la página de este controlador sin sesión iniciada
    if(!$scope.loggedIn)
        $location.path('/');
    
    // Variables
	$scope.publicacion = {}; // Representa al objeto que se ingresa en la base de datos
	$scope.adjuntos = []; // Información completa de los archivos adjuntos (para la vista)
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
	$scope.publicacion.usuario = $scope.user.id || undefined; // Obtener Id de usuario
	
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
	//$scope.adjuntos = [];
	// Sube archivos al servidor
    // $scope.adjuntos          Es la lista de archivos con TODA la información correspondiente (se usa en la vista)
    // $scope.publicacion.adjuntos Es la lista de ID's que se guarda en el Modelo de la base de datos
    // $scope.nuevosAdjuntos    Es un auxiliar que incluye la lista de archivos NO repetidos en la base o en los arreglos anteriores
    $scope.uploadFiles = function(file){
        Upload.upload({
            url: 'api/files', // Ruta de Node (usando POST) para el manejo del almacenamiento de la imagen
            data: {file: file, path: 'publicaciones/'} // Se pueden incluir datos adicionales (ej. {file: file, 'username': 'Roy'})
        }).then(function (res) { // Función cuando el archivo es subido exitosamente
            // Obtener los adjuntos a agregar
            $scope.nuevosAdjuntos = [];
            for(var i in res.config.data.file)
                $scope.nuevosAdjuntos.push({filename: res.config.data.file[i].name, location: res.data.location, usuario: $scope.publicacion.usuario});
            // Evitar repeticiones (porque cada vez que se vuelven a elegir archivos se ejecuta la subida de archivos)
            $scope.nuevosAdjuntos = $scope.nuevosAdjuntos.filter(function(item, index, array){
                for(var i in $scope.adjuntos)
                    if(item.filename === $scope.adjuntos[i].filename)
                        return false;
                return true;
            });
            // Si el (nombre de) archivo ya existe en la base de datos, rescatar y usar el mismo ID, para evitar repeticiones
            var filenames = [];
            for(var i in $scope.nuevosAdjuntos)
                filenames.push($scope.nuevosAdjuntos[i].filename);
            Archivo.findMultiple(filenames, 'publicaciones/') // consultar en la base de datos
                .then(function(res){
                    if(res.data && res.data.length > 0){ // si ya existen los archivos en la base de datos
                        for(var i in res.data){
                            $scope.adjuntos.push(res.data[i]); // agregar a $scope.adjuntos
                            if(!$scope.publicacion.adjuntos)
                                $scope.publicacion.adjuntos = [];
                            $scope.publicacion.adjuntos.push(res.data[i]._id); // agregar ID's a $scope.publicacion.adjuntos
                            for(var j in $scope.nuevosAdjuntos){
                                if($scope.nuevosAdjuntos[j].filename == res.data[i].filename)
                                    $scope.nuevosAdjuntos.splice(j, 1); // borrar del arreglo $scope.nuevosAdjuntos
                            }
                        }
                    }
                    // Ahora sí!! $scope.nuevosAdjuntos ya han sido filtrados y verificados que NO están en base de datos
                    if($scope.nuevosAdjuntos.length != 0){ // no enviar información vacia
                        Archivo.create($scope.nuevosAdjuntos)
                            .then(function(res){
                                if(res.data && res.data.files && res.data.files.length > 0){ // agregar a $scope.adjuntos y $scope.publicacion.adjuntos
                                    if(!$scope.publicacion.adjuntos)
                                        $scope.publicacion.adjuntos = [];
                                    for(var i in res.data.files)
                                        $scope.publicacion.adjuntos.push(res.data.files[0]._id);
                                    $scope.adjuntos = $scope.adjuntos.concat(res.data.files);
                                }
                            }, function(res){
                                console.error('Error al guardar en base de datos', res);
                            })
                    }
                }, function(res){
                    console.log('Error buscando archivos', res);
                });
        }, function (resp) { // Función para manejo de error
            console.log('Error status: ' + resp.status);
        }, function (evt) { // Función para notificar progreso
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ');
        });
    };
    // Elimina un archivo adjunto
    $scope.deleteFile = function(archivo){
    	// console.log('Delete file');
        var index = $scope.publicacion.adjuntos.indexOf(archivo._id); // Buscar el indice
        if(index !== -1){ // Remover de manera segura en el arreglo (ambos arreglos)
            $scope.publicacion.adjuntos.splice(index, 1);
            $scope.adjuntos.splice(index, 1);
        }
        if($scope.publicacion.adjuntos.length < 1) // Si no hay más documentos por borrar, eliminar el arreglo vacio
            $scope.publicacion.adjuntos = undefined;
        
        // Verificar si al borrar es el único existente
        Publicacion.attachment(archivo._id) // existen eventos con este archivo como adjunto?
        .then(function(res){
            if(res.data && res.data.length === 1){
                // Borrar archivo del sistema:
                Archivo.unlink(archivo.location + archivo.filename)
                .then(function(res){
                    // if(res.data.success)
                    //     console.log('Operación exitosa. ', res.data.message);
                    Archivo.delete(archivo._id)
                    .then(function(res){
                        // if(res.data.success)
                        //     console.log('Operación exitosa. ', res.data.message);
                    }, function(res){
                        console.error('No se pudo borrar archivo en base de datos. ', res);
                    });
                }, function(res){
                    console.error('No se pudo borrar archivo en servidor. ', res);
                });
            }
        }, function(res){
            console.error('Error al revisar documentos adjuntos. ', res);
        });
    };
    // Envia el objeto $scope.publicacion a la base de datos
	$scope.enviar = function(){
        Publicacion.create($scope.publicacion) // Subir la información de la publicación a la base de datos
        .then(function(res){
            alert("Se ha guardado la información de la publicación.");
            $location.url('/publicaciones/' + res.data.publication._id); // Redirigir a la página de la publicación creada
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