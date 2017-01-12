/*
API para manejo de la base de datos con la colección de "Autores"
Permite obtener datos en formato JSON mediante HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/autores
POST   http://localhost:8080/api/autores
GET    http://localhost:8080/api/autores/1234567890
PUT    http://localhost:8080/api/autores/1234567890
DELETE http://localhost:8080/api/autores/1234567890
GET    http://localhost:8080/api/autores/search?q=algun+nombre
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var Autor = require('../models/autor'); // Modelo de la colección "Autores"
var verifyToken = require('./token'); // Función de verificación de token

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Autores');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los autors
	.get(function(req, res){
        Autor.find() // encontrar todos
        .exec(function(err, autores){
            if(err)
                res.send(err);
            res.send(autores);
        });
    })

    // Agregar un nuevo autor
    .post(function(req, res){
        var autor = new Autor();
        
        if(req.body.nombre)
            autor.nombre = req.body.nombre;
        if(req.body.apellido)
            autor.apellido = req.body.apellido;
        if(req.body.procedencia)
            autor.procedencia = req.body.procedencia;
        if(req.body.email)
            autor.email = req.body.email;

        autor.save(function(err){
            if(err)
                res.send(err);
            res.json({success: true, message: "Información del autor guardado", id: autor._id});
        })
    })

// En búsquedas por nombre de autor(es). Ejemplo:
// GET /searc?q=isaac+asimov
router.route('/search')
    .get(function(req, res){
        Autor.find(
            {$or: [{nombre  : {$regex: '.*' + req.query.q + '.*', $options: 'i'}},
                {apellido: {$regex: '.*' + req.query.q + '.*', $options: 'i'}}]
            }
        )
        .select({nombre: true, apellido: true})
        .exec(function(err, autores){
            if(err)
                res.send(err);
            res.send(autores);
        })
    })

// En peticiones con un ID
router.route('/:autor_id')
	// Obtener un autor particular (mediante el ID)
    .get(function(req, res){
        Autor.findById(req.params.autor_id)
        .exec(function(err, autor){
            if(err)
                res.send(err);
            res.json(autor);
        })
    })

    // Actualizar un autor en particular (mediante el ID)
    .put(function(req, res){
        Autor.findById(req.params.autor_id, function(err, autor){
            if(err)
                res.send(err);
            
            if(req.body.nombre)
                autor.nombre = req.body.nombre;
            if(req.body.apellido)
                autor.apellido = req.body.apellido;
            if(req.body.procedencia)
                autor.procedencia = req.body.procedencia;
            if(req.body.email)
                autor.email = req.body.email;

            autor.save(function(err){
                if(err)
                    res.send(err);
                res.json({success: true, message: "Información del autor actualizado"});
            });
        });
    })

    // Eliminar un autor en particular (mediante el ID)
    .delete(function(req, res){
        Autor.remove({
            _id: req.params.autor_id
        }, function(err, autor){
            if(err)
                res.send(err);
            res.json({success: true, message: "Autor borrado de la base de datos"});
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js