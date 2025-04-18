/*
API para manejo de la base de datos con la colección de "Publicaciones"
Permite obtener datos en formato JSON mediante HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/publicaiones
POST   http://localhost:8080/api/publicaiones
GET    http://localhost:8080/api/publicaiones/1234567890
PUT    http://localhost:8080/api/publicaiones/1234567890
DELETE http://localhost:8080/api/publicaiones/1234567890
*/

// Dependencias
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router(); // para modularizar las rutas
var Autor = require('../models/autor'); // Modelo de la colección "Autor"
var Archivo = require('../models/archivo') // Modelo de la colección "Archivos"
var Usuario = require('../models/usuario') // Modelo de la colección "Usuario"
var Publicacion = require('../models/publicacion'); // Modelo de la colección "Publicacion"
var verifyToken = require('./token'); // Función de verificación de token

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    // console.log('Usando el API de Publicaciones');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los publicacions
	.get(function(req, res){

        // En caso de búsquedas mediante keywords. Por ejemplo:
        // GET api/publicaciones?tag=libro
        if(req.query.tag){
            Publicacion.find({keywords: {$regex: '.*' + req.query.tag + '.*', $options: 'i'}})
            .exec(function(err, publicaciones){
                if(err)
                    res.send(err);
                res.send(publicaciones);
            });
        // En caso de desear agrupaciones de publicaciones. Por ejemplo, agrupar por fecha y filtrar por tipo:
        // GET api/publicaciones?group=tipo[&match=Documental]
        }else if(req.query.group){
            Publicacion.aggregate([
                // {$match: {tipo: {$regex: '.*' + req.query.match + '.*', $options: 'i'}}},
                {$sort: {fecha: -1, titulo: 1}},
                {$group: {
                    _id: "$" + req.query.group, 
                    publicaciones: {$push: "$$ROOT"}}}
                // {$sort: {_id: -1}}
            ])
            .exec(function(err, publicaciones){
                if(err)
                    res.send(err);
                // Populate después del operador aggregate (utilizando resultado del callback anterior)
                // https://mongoosejs.com/docs/api.html#model_Model.populate
                Autor.populate(publicaciones, {path: "publicaciones.autor"}, function(err, populatedPublicaciones){
                    if(err)
                        res.send(err);
                    res.send(populatedPublicaciones);
                });
            });
        // En caso de pedir las publicaciones de un autor en particular
        // GET api/publicaciones?autor=1234567890
        }else if(req.query.autor){
            // PARA AGRUPAR LAS PUBLICACIONES POR fecha:
            Publicacion.aggregate([
                {$match: {autor: mongoose.Types.ObjectId(req.query.autor)}},
                {$sort: {fecha: -1, titulo: 1}},
                {$group: {
                    // _id: {"$substr": ["$fecha", 0, 4]},
                    _id: "$tipo",
                    publicaciones: {$push: '$$ROOT'}}},
                // {$sort: {_id: -1}}
            ])
            .exec(function(err, publicaciones){
                if(err)
                    res.send(err);
                Autor.populate(publicaciones, {path: 'publicaciones.autor'}, function(err, populatedPublicaciones){
                    if(err)
                        res.send(err);
                    res.send(populatedPublicaciones);
                });
            });
        }else{
            Publicacion.find() // encontrar todos
            .sort({fecha: 'desc'})
            .populate('autor')
            .populate('adjuntos')
            .populate('usuario')
            .exec(function(err, publicaciones){
                if(err)
                    res.send(err);
                res.send(publicaciones);
            });
        }

    })

    // Agregar una nueva publicación
    .post(function(req, res){
        var publicacion = new Publicacion();
        
        if(req.body.titulo)
            publicacion.titulo = req.body.titulo;
        if(req.body.autor)
            publicacion.autor = req.body.autor;
        if(req.body.tipo)
            publicacion.tipo = req.body.tipo;
        if(req.body.fecha)
            publicacion.fecha = req.body.fecha;
        if(req.body.coleccion)
            publicacion.coleccion = req.body.coleccion;
        if(req.body.publisher)
            publicacion.publisher = req.body.publisher;
        if(req.body.journal)
            publicacion.journal = req.body.journal;
        if(req.body.volumen)
            publicacion.volumen = req.body.volumen;
        if(req.body.paginas)
            publicacion.paginas = req.body.paginas;
        if(req.body.numero)
            publicacion.numero = req.body.numero;
        if(req.body.booktitle)
            publicacion.booktitle = req.body.booktitle;
        if(req.body.descripcion)
            publicacion.descripcion = req.body.descripcion;
        if(req.body.isbn)
            publicacion.isbn = req.body.isbn;
        if(req.body.abstract)
            publicacion.abstract = req.body.abstract;
        if(req.body.url)
            publicacion.url = req.body.url;
        if(req.body.keywords)
            publicacion.keywords = req.body.keywords;
        if(req.body.notas)
            publicacion.notas = req.body.notas;
        if(req.body.imagen)
            publicacion.imagen = req.body.imagen;
        if(req.body.usuario)
            publicacion.usuario = req.body.usuario;
        if(req.body.adjuntos)
            publicacion.adjuntos = req.body.adjuntos;

        publicacion.save(function(err){
            if(err)
                res.send(err);
            res.json({
                success: true, 
                message: "Información de la publicación guardado", 
                publication: publicacion
            });
        })
    })

// En búsquedas por nombre de autor(es). Ejemplo:
// GET /api/publicaciones/tags
router.route('/tags')
    .get(function(req, res){
        // En caso de búsquedas de keywords. Por ejemplo:
        // GET api/publicaciones/tags?q=libro
        if(req.query.q){
            Publicacion.find({keywords: {$regex: '.*' + req.query.q + '.*', $options: 'i'}})
            .distinct('keywords')
            .exec(function(err, keywords){
                if(err)
                    res.send(err);
                res.send(keywords);
            });
        }else{ // Obtener todas las keywords existentes
            Publicacion.find()
                .distinct('keywords')
                .exec(function(err, keywords){
                    if(err)
                        res.send(err);
                    res.send(keywords);
                });
        }
    })

// Determina las publicaciones que contengan al archivoID como documento adjunto
// GET http://localhost:8080/api/publicaciones/search?attachment=58ac9a77b587bc3f9d63fcf7
router.route('/search')
    .get(function(req, res){
        var query = {};
        if(req.query.attachment){
            var ObjectId = mongoose.Types.ObjectId;
            query = {documentos: {$in: [ObjectId(req.query.attachment)]}};
        }
        Publicacion.find(query)
        .exec(function(err, publicaciones){
            if(err)
                res.send(err);
            res.json(publicaciones);
        })
    })

// En peticiones con un ID
router.route('/:publicacion_id')
	// Obtener un publicacion particular (mediante el ID)
    .get(function(req, res){
        Publicacion.findById(req.params.publicacion_id)
        .populate('autor', 'nombre apellido')
        .populate('adjuntos')
        .exec(function(err, publicacion){
            if(err)
                res.send(err);
            res.json(publicacion);
        })
    })

    // Actualizar un publicacion en particular (mediante el ID)
    .put(function(req, res){
        Publicacion.findById(req.params.publicacion_id, function(err, publicacion){
            if(err)
                res.send(err);
            
            if(req.body.titulo != publicacion.titulo)
                publicacion.titulo = req.body.titulo;
            if(req.body.autor != publicacion.autor)
                publicacion.autor = req.body.autor;
            if(req.body.tipo != publicacion.tipo)
                publicacion.tipo = req.body.tipo;
            if(req.body.fecha != publicacion.fecha)
                publicacion.fecha = req.body.fecha;
            if(req.body.coleccion != publicacion.coleccion)
                publicacion.coleccion = req.body.coleccion;
            if(req.body.publisher != publicacion.publisher)
                publicacion.publisher = req.body.publisher;
            if(req.body.journal != publicacion.journal)
                publicacion.journal = req.body.journal;
            if(req.body.volumen != publicacion.volumen)
                publicacion.volumen = req.body.volumen;
            if(req.body.paginas != publicacion.paginas)
                publicacion.paginas = req.body.paginas;
            if(req.body.numero != publicacion.numero)
                publicacion.numero = req.body.numero;
            if(req.body.booktitle != publicacion.booktitle)
                publicacion.booktitle = req.body.booktitle;
            if(req.body.descripcion != publicacion.descripcion)
                publicacion.descripcion = req.body.descripcion;
            if(req.body.isbn != publicacion.isbn)
                publicacion.isbn = req.body.isbn;
            if(req.body.abstract != publicacion.abstract)
                publicacion.abstract = req.body.abstract;
            if(req.body.url != publicacion.url)
                publicacion.url = req.body.url;
            if(req.body.keywords != publicacion.keywords)
                publicacion.keywords = req.body.keywords;
            if(req.body.notas != publicacion.notas)
                publicacion.notas = req.body.notas;
            if(req.body.imagen != publicacion.imagen)
                publicacion.imagen = req.body.imagen;
            if(req.body.usuario != publicacion.usuario)
                publicacion.usuario = req.body.usuario;
            if(req.body.adjuntos != publicacion.adjuntos)
                publicacion.adjuntos = req.body.adjuntos;

            publicacion.save(function(err){
                if(err)
                    res.send(err);
                res.json({success: true, message: "Información de la publicación actualizado"});
            });
        });
    })

    // Eliminar un publicacion en particular (mediante el ID)
    .delete(function(req, res){
        Publicacion.remove({
            _id: req.params.publicacion_id
        }, function(err, publicacion){
            if(err)
                res.send(err);
            res.json({success: true, message: "Publicación borrada de la base de datos"});
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js