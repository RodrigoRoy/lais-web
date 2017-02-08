/*
API para manejo de archivos (documentos, imagenes, videos, etc) que se suben al servidor.
La ruta por default donde se alojan estos archivos es 'public/files/'.
Es posible subir archivos a otras ubicaciones dentro de este directorio pero no fuera de él-

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
POST   http://localhost:8080/api/files/archivos
DELETE http://localhost:8080/api/files/Carpeta/Subcarpeta/archivo.jpg
POST   http://localhost:8080/api/files/publicaciones
DELETE http://localhost:8080/api/files/publicaciones?filename=foo.jpg
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var fs = require('fs'); // File system utility
var multipart = require('connect-multiparty'); // connect middleware (upload handler)
var verifyToken = require('./token'); // Función de verificación de token
var multipartMiddleware = multipart({uploadDir: './public/files'}); // definir ruta para archivos
var multipartMiddlewarePublicaciones = multipart({uploadDir: './public/files/publicaciones'}); // definir ruta para archivos

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API Files.');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// Recibe un archivo y lo sube al servidor con ayuda de 'multipart'
// Se utiliza la ruta 'public/files/' como carpeta por default para alojar los archivos
// Cuando exite el parámetro 'path', el archivo se mueve a la ubicación especificada por 'path'
router.route('/')
	.post(multipartMiddleware, function(req, res){
		var path = req.body.path || '';
		for(var i in req.files.file){ // iterar en todos los archivos
			fs.rename(req.files.file[i].path, 'public/files/' + path + req.files.file[i].name, function(err){ // renombrar/mover archivo (usar el nombre original)
				if(err)
					throw err;
			});
		}
		res.send({ // responder al cliente 
			success: true,
			message: 'Archivos subidos al servidor exitosamente',
			location: 'files/' + path
		});
	})

// Borra un archivo en el sistema de archivos. Ejemplo:
// DELETE api/files/Carpeta ejemplo/Subcarpeta/archivo.jpg
// Borrará el archivo contenido en public/files/Carpeta ejemplo/Subcarpeta/archivo.jpg
router.route('/:folder*?/:filename')
	.delete(function(req, res){
		fs.access('public/files' + decodeURI(req.path), (fs.constants || fs).F_OK, function(err){
			if(err)
				return res.status(404).send({
					success: false,
					message: "File " + req.params.filename + " don't exist",
					path: decodeURI(req.path),
					err: err
				});
			fs.unlink('public/files' + decodeURI(req.path), function(err){
				if(err)
					return res.status(404).send({
						success: false,
						message: "Can't delete " + decodeURI(req.path),
						err: err
					});
				res.send({
					success: true, 
					message: 'Archivo ' + req.params.filename + ' borrado del servidor'
				});
			});
		});
	})

// En peticiones a la raiz del API
router.route('/publicaciones')
	// Obtener todos los archivos
	.post(multipartMiddlewarePublicaciones, function(req, res){
		//console.log("  req.body", req.body); // Datos adicionales enviados
		console.log("Información de archivos");
		console.log(req.files);
		for(var i in req.files.file){ // iterar en todos los archivos
			fs.rename(req.files.file[i].path, 'public/files/publicaciones/' + req.files.file[i].name, function(err){ // renombrar archivo (usar el nombre original)
				if(err)
					throw err;
			});
		}
		res.send({ // responder al cliente 
			success: true,
			message: 'Archivos subidos al servidor exitosamente',
			location: 'files/publicaciones'
		});
	})

module.exports = router; // Exponer el API para ser utilizado en server.js