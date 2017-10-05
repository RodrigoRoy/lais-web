/*
API para manejo de la base de datos con la colección de "Eventos"
Permite obtener datos en formato JSON mediante verbos HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/eventos
POST   http://localhost:8080/api/eventos
GET    http://localhost:8080/api/eventos/1234567890
PUT    http://localhost:8080/api/eventos/1234567890
DELETE http://localhost:8080/api/eventos/1234567890
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var mongoose = require('mongoose');
var Evento = require('../models/evento'); // Modelo de la colección "Eventos"
var verifyToken = require('./token'); // Función de verificación de token

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    // console.log('Usando el API de Usuarios.');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los eventos. Permite filtrar por tipo de evento.
    // Incluye caso especial para agrupar por fecha.
    // GET http://localhost:8080/api/eventos
    // GET http://localhost:8080/api/eventos?tipo=Docencia
    // GET http://localhost:8080/api/eventos?group=fecha
	.get(function(req, res){
        if(req.query.group && req.query.group === 'fecha'){
            // Agrupar eventos por año (incluye fechas vacias)
            Evento.aggregate([
                {$sort: {fecha: -1}},
                {$group: {
                    _id: {"$substr": ["$fecha", 0, 4]},
                    eventos: {$push: "$$ROOT"}}},
                {$sort: {_id: -1}}
            ])
            .exec(function(err, eventos){
                if(err)
                    res.send(err);
                res.json(eventos);
            })
        }
        else{
            // Crear objeto query de MongoDB si y solo si existe req.query.tipo, en caso contrario se crea objeto vacio (buscar todos)
            var query = req.query.tipo ? {tipo: {$regex: '.*' + (req.query.tipo || '') + '.*', $options: 'i'}} : {};
            Evento.find(query) // encontrar todos
            .sort({fecha: 'desc'})
            // .populate('lugar') // poblar la referencia a "lugar"
            .exec(function(err, eventos){
                if(err)
                    res.send(err);
                res.json(eventos);
            })
        }
    })

    // Agregar un nuevo evento
    .post(function(req, res){
        var evento = new Evento();
        
        if(req.body.titulo)
        	evento.titulo = req.body.titulo;
        if(req.body.contenidoHTML)
        	evento.contenidoHTML = req.body.contenidoHTML;
	    if(req.body.fecha)
	    	evento.fecha = req.body.fecha;
	    if(req.body.fechaFin)
	    	evento.fechaFin = req.body.fechaFin;
	    if(req.body.horario)
	    	evento.horario = req.body.horario;
	    if(req.body.horarioFin)
	    	evento.horarioFin = req.body.horarioFin;
	    if(req.body.tipo)
	    	evento.tipo = req.body.tipo;
        if(req.body.imagen)
            evento.imagen = req.body.imagen;
	    if(req.body.coordinador)
	    	evento.coordinador = req.body.coordinador;
        if(req.body.participantes)
            evento.participantes = req.body.participantes;
	    if(req.body.lugar)
            evento.lugar = req.body.lugar; // ID del lugar
        if(req.body.notas)
            evento.notas = req.body.notas;
        if(req.body.documentos)
            evento.documentos = req.body.documentos;
        if(req.body.keywords)
            evento.keywords = req.body.keywords;
        if(req.body.usuario)
            evento.usuario = req.body.usuario;

        evento.save(function(err){
            if(err)
                res.send(err);
            res.json({
                success: true,
                message: 'Evento creado',
                event: evento
            });
        })
    })

// Obtener los últimos 4 eventos creados
router.route('/news')
    .get(function(req, res){
        Evento.find() // encontrar todos
        .sort({fecha: 'desc'})
        .limit(4)
        .select('titulo imagen')
        .exec(function(err, eventos){
            if(err)
                res.send(err);
            res.json(eventos);
        })
    })

router.route('/years')
    .get(function(req, res){
        // Agrupar eventos por año (incluye fechas vacias)
        Evento.aggregate([
            {$sort: {fecha: -1}},
            {$group: {_id: {"$substr": ["$fecha", 0, 4]}}},
            {$sort: {_id: -1}}
        ])
        .exec(function(err, years){
            if(err)
                res.send(err);
            res.json(years);
        })
    })

// Determina los eventos que contengan al archivoID como documento adjunto
// GET http://localhost:8080/api/eventos/search?attachment=58ac9a77b587bc3f9d63fcf7
router.route('/search')
    .get(function(req, res){
        var query = {};
        if(req.query.attachment){
            var ObjectId = mongoose.Types.ObjectId;
            query = {documentos: {$in: [ObjectId(req.query.attachment)]}};
        }
        Evento.find(query)
        .exec(function(err, eventos){
            if(err)
                res.send(err);
            res.json(eventos);
        })
    })

// Obtener los eventos que contengan el query de búsqueda
router.route('/find')
    .get(function(req, res){
        Evento.find()
        .populate('documentos')
        .exec(function(err, eventos){
            if(err)
                res.send(err);
            // Filtrar resultados:
            var results = []; // Conjunto de resultados
            var patt = new RegExp('.*' + req.query.search + '.*', "i"); // patrón de búsqueda
            for(var i in eventos) // eventos
                for(var j in eventos[i]) // propiedades del evento (sorpresivamente son más de las esperadas)
                    if(patt.test(eventos[i][j])){ // verificar que coincida el patrón con la propiedad
                        results.push(eventos[i]); // agregar al conjunto de resultados
                        break; // evitar repeticiones
                    }
            res.json(results);
        })
    })

// En peticiones con un ID
router.route('/:evento_id')
	// Obtener un evento particular (mediante el ID)
    .get(function(req, res){
        Evento.findById(req.params.evento_id)
        .populate('documentos')
        .exec(function(err, evento){
            if(err)
                res.send(err);
            res.json(evento);
        })
    })

    // Actualizar un evento en particular (mediante el ID)
    .put(function(req, res){
        Evento.findById(req.params.evento_id, function(err, evento){
            if(err)
                res.send(err);
            
            if(req.body.titulo != evento.titulo)
                evento.titulo = req.body.titulo;
            if(req.body.contenidoHTML != evento.contenidoHTML)
                evento.contenidoHTML = req.body.contenidoHTML;
            if(req.body.fecha != evento.fecha)
                evento.fecha = req.body.fecha;
            if(req.body.fechaFin != evento.fechaFin)
             evento.fechaFin = req.body.fechaFin;
            if(req.body.horario != evento.horario)
                evento.horario = req.body.horario;
            if(req.body.horarioFin != evento.horarioFin)
             evento.horarioFin = req.body.horarioFin;
            if(req.body.tipo != evento.tipo)
                evento.tipo = req.body.tipo;
            if(req.body.imagen != evento.imagen)
                evento.imagen = req.body.imagen;
            if(req.body.coordinador != evento.coordinador)
                evento.coordinador = req.body.coordinador;
            if(req.body.participantes != evento.participantes)
                evento.participantes = req.body.participantes;
            if(req.body.lugar != evento.lugar)
                evento.lugar = req.body.lugar; // id del lugar
            if(req.body.notas != evento.notas)
                evento.notas = req.body.notas;
            if(req.body.documentos != evento.documentos)
                evento.documentos = req.body.documentos;
            if(req.body.keywords != evento.keywords)
                evento.keywords = req.body.keywords;
            if(req.body.usuario != evento.usuario)
                evento.usuario = req.body.usuario;

            evento.save(function(err){
                if(err)
                    res.send(err);
                res.json({
                    success: true,
                    message: 'Evento actualizado',
                    event: evento
                });
            });
        });
    })

    // Eliminar un evento en particular (mediante el ID)
    .delete(function(req, res){
        Evento.remove({
            _id: req.params.evento_id
        }, function(err, evento){
            if(err)
                res.send(err);
            res.json({
                success: true,
                message: 'Evento borrado exitosamente'
            });
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js