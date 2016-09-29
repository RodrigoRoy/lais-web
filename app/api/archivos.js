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

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Archivos.');
    next(); // Pasar el control de las rutas a la siguiente coincidencia
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los archivos
	.get(function(req, res){
        Archivo.find() // encontrar todos
        .sort({fechaCreacion: 'desc'})
        .exec(function(err, archivos){
            if(err)
                res.send(err);
            res.json(archivos);
        })
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
                    res.send(err);
                }
                res.json({status: "OK"});
            });
        }
        else{ // En caso de que no sea un arreglo, se procede normalmente para un archivo
            var archivo = new Archivo();
            
            if(req.body.filename)
                archivo.filename = req.body.filename;
            if(req.body.descripcion)
                archivo.descripcion = req.body.descripcion;
            archivo.fechaCreacion = new Date(); // fecha de creación automática al momento

            archivo.save(function(err){
                if(err)
                    res.send(err);
                res.json({status: "OK", id: archivo._id});
            })
        }
    })

// En peticiones con un ID
router.route('/:archivo_id')
	// Obtener un archivo particular (mediante el ID)
    .get(function(req, res){
        Archivo.findById(req.params.archivo_id)
        // .populate('lugar')
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
                res.send(err);
            
            // El nombre del archivo no se debe cambiar para no perder la referencia en sistema de archivos
            // if(req.body.filename)
            //     archivo.filename = req.body.filename;
            if(req.body.descripcion)
                archivo.descripcion = req.body.descripcion;
            archivo.fechaCreacion = new Date(); // fecha de creación auto-actualizada

            archivo.save(function(err){
                if(err)
                    res.send(err);
                res.json({status: "OK"});
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
            res.json({status: "OK"});
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js