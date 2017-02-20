/*
API para manejo de la base de datos con la colección de "Archivos"
Permite obtener datos en formato JSON mediante verbos HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/archivos
POST   http://localhost:8080/api/archivos
GET    http://localhost:8080/api/archivos/1234567890
PUT    http://localhost:8080/api/archivos/1234567890
DELETE http://localhost:8080/api/archivos/1234567890
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var Archivo = require('../models/archivo'); // Modelo de la colección "Archivos"
var fs = require('fs'); // File system utility
var filesize = require('filesize'); // Human readable file size string from number
var verifyToken = require('./token'); // Función de verificación de token

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Archivos.');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos archivos
	.get(function(req, res){
        var dirbase = 'public/files/';
        // Por ubicación en subdirectorios
        var path = req.query.path || '';
        Archivo.find({location: {$regex: '^' + path + '/?$', $options: 'im'}})
        .lean()
        .sort({createdAt: 'desc'})
        .exec(function(err, archivos){
            if(err)
                res.send(err);
            for(var i in archivos){
                try{
                    // Verifica si existe el archivo, en caso contrario se dispara excepción (se maneja en catch)
                    fs.accessSync(dirbase + archivos[i].location + archivos[i].filename, (fs.constants || fs).F_OK);
                    archivos[i].size = filesize(fs.statSync(dirbase + archivos[i].location + archivos[i].filename).size, {round: 0});
                }catch(err){
                    archivos[i].size = filesize(0, {round: 0});
                }
            }
            res.send(archivos);
        });
    })

    // Agregar un nuevo archivo o en caso de ser un arreglo agrega varios archivos
    .post(function(req, res){
        // Para comprobar que se recibe un arreglo de archivos en vez de uno solo, se pregunta por la longitud del objeto
        if(req.body.length && req.body.length > 0){
            var files = req.body;
            for(var i in files){ // Si no contienen descripción, se borra esa propiedad
                if(files[i].descripcion === '')
                    files[i].descripcion = undefined;
            }
            Archivo.insertMany(files, function(err, archivos){ // Bulk insert
                if(err){
                    if(err.code == 11000)
                        return res.status(400).send({success: false, message: 'Nombre de archivo o carpeta duplicado.'});
                    else
                        return res.status(400).send({success: false, message: 'Error en la base de datos', error: err});
                }
                res.send({
                    success: true,
                    message: 'Archivos agregados al servidor',
                    files: archivos
                });
            });
        }
        else{ // En caso de que no sea un arreglo, se procede normalmente para un archivo
            var archivo = new Archivo();
            
            if(req.body.filename)
                archivo.filename = req.body.filename;
            if(req.body.descripcion)
                archivo.descripcion = req.body.descripcion;
            if(req.body.location)
                archivo.location = req.body.location;
            if(req.body.directory)
                archivo.directory = req.body.directory;
            if(req.body.usuario)
                archivo.usuario = req.body.usuario;

            // TODO:
            if(archivo.directory){
                var path = archivo.location ? 'public/files/' + archivo.location : 'public/files/';
                fs.access(path, (fs.constants || fs).F_OK, function(err){
                    if(err)
                        console.log('Error. No existe la carpeta ' + path, err);
                    fs.mkdir(path + archivo.filename, function(err){
                        if(err)
                            console.log('Error al crear carpeta ' + path + archivo.filename, err);
                    });
                });
            }

            archivo.save(function(err){
                if(err){
                    if(err.code == 11000)
                        return res.status(400).send({success: false, message: 'Nombre de archivo o carpeta duplicado.'});
                    else
                        return res.status(400).send({success: false, message: 'Error en la base de datos', error: err});
                }
                res.json({
                    success: true,
                    message: 'Archivo agregado al servidor',
                    id: archivo._id
                });
            })
        }
    })

// En peticiones con un ID
router.route('/:archivo_id')
	// Obtener un archivo particular (mediante el ID)
    .get(function(req, res){
        Archivo.findById(req.params.archivo_id)
        .exec(function(err, archivo){
            if(err)
                res.send(err);
            res.json(archivo);
        })
    })

    // Actualizar un archivo en particular (mediante el ID)
    .put(function(req, res){
        Archivo.findById(req.params.archivo_id, function(err, archivo){
            if(err)
                return res.send(err);
            
            // El nombre del archivo no se debe cambiar para no perder la referencia en sistema de archivos
            // if(req.body.filename)
            //     archivo.filename = req.body.filename;
            if(req.body.descripcion)
                archivo.descripcion = req.body.descripcion;
            if(req.body.location)
                archivo.location = req.body.location;
            if(req.body.directory)
                archivo.directory = req.body.directory;
            if(req.body.usuario)
                archivo.usuario = req.body.usuario;

            archivo.save(function(err){
                if(err)
                    return res.send(err);
                res.json({
                    success: true,
                    message: 'Información de archivo modificado'
                });
            });
        });
    })

    // Eliminar un archivo en particular (mediante el ID)
    .delete(function(req, res){
        Archivo.remove({
            _id: req.params.archivo_id
        }, function(err, archivo){
            if(err)
                res.send(err);
            res.json({
                success: true, 
                message: 'El archivo con Id: ' + archivo._id + ' ha sido eliminado'
            });
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js