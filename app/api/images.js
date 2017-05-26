/*
API para manejo de imagenes (portadas) que se suben al servidor.
La ruta por default donde se alojan estos archivos es 'public/imgs/'.

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
POST   http://localhost:8080/api/images/imagenes
DELETE http://localhost:8080/api/images/Carpeta/Subcarpeta/imagen.jpg
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var fs = require('fs'); // File system utility
var multipart = require('connect-multiparty'); // connect middleware (upload handler)
var verifyToken = require('./token'); // Función de verificación de token
var multipartMiddleware = multipart({uploadDir: './public/imgs'}); // definir ruta para archivos

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    // console.log('Usando el API Images.');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// Recibe un solo archivo y lo sube al servidor con ayuda de 'multipart'
// Se utiliza la ruta 'public/files/' como carpeta por default para alojar los archivos
// Cuando exite el parámetro 'path', el archivo se mueve a la ubicación especificada por 'path'
router.route('/')
	.post(multipartMiddleware, function(req, res){
		var path = req.body.path || '';
		fs.rename(req.files.file.path, 'public/imgs/' + path + req.files.file.name, function(err){ // renombrar/mover archivo (usar el nombre original)
			if(err)
				throw err;
		});
		res.send({ // responder al cliente 
			success: true,
			message: 'Imagen subida al servidor exitosamente',
			location: path
		});
	})

// Borra una imagen en el sistema de archivos. Ejemplo:
// DELETE api/images/eventos/archivo.jpg
// Borrará el archivo contenido en public/imgs/eventos/archivo.jpg
router.route('/:folder*?/:filename')
	.delete(function(req, res){
		fs.access('public/imgs' + decodeURI(req.path), (fs.constants || fs).F_OK, function(err){
			if(err)
				return res.status(404).send({
					success: false,
					message: "Image " + req.params.filename + " don't exist",
					path: decodeURI(req.path),
					err: err
				});
			fs.unlink('public/imgs' + decodeURI(req.path), function(err){
				if(err)
					return res.status(404).send({
						success: false,
						message: "Can't delete " + decodeURI(req.path),
						err: err
					});
				res.send({
					success: true, 
					message: 'Imagen ' + req.params.filename + ' borrada del servidor'
				});
			});
		});
	})

module.exports = router; // Exponer el API para ser utilizado en server.js