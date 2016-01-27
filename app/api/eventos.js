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
var Evento = require('../models/evento'); // Modelo de la colección "Eventos"
var Lugar = require('../models/lugar'); // Modelo de la colección "Lugar"

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Eventos.');
    next(); // Pasar el control de las rutas a la siguiente coincidencia
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los eventos
	.get(function(req, res){
        Evento.find() // encontrar todos
        .populate('lugar') // poblar la referencia a "lugar"
        .exec(function(err, eventos){
            if(err)
                res.send(err);
            res.json(eventos);
        })
    })

    // Agregar un nuevo evento
    .post(function(req, res){
        var evento = new Evento();
        
        if(req.body.titulo)
        	evento.titulo = req.body.titulo;
        if(req.body.descripcion)
        	evento.descripcion = req.body.descripcion;
        if(req.body.contenidoHTML)
        	evento.contenidoHTML = req.body.contenidoHTML;
	    if(req.body.fecha)
	    	evento.fecha = req.body.fecha;
	    // if(req.body.fechaFin)
	    // 	evento.fechaFin = req.body.fechaFin;
	    if(req.body.horario)
	    	evento.horario = req.body.horario;
	    // if(req.body.horarioFin)
	    // 	evento.horarioFin = req.body.horarioFin;
	    if(req.body.tipo)
	    	evento.tipo = req.body.tipo;
        if(req.body.imagenPrincipal)
            evento.imagenPrincipal = req.body.imagenPrincipal;
	    // Se espera que las imagenes se representen como una lista de nombres de archivo separados por comas
	    // if(req.body.imagen)
	    // 	evento.imagen = req.body.imagen.split(/\s*,\s*/); // REGEXP elimina posibles espacios en blanco entre nombres y comas
	    if(req.body.realizador)
	    	evento.realizador = req.body.realizador; //.split(/\s*,\s*/);
	    if(req.body.lugar)
	     	evento.lugar = req.body.lugar; // id del lugar
	    evento.fechaCreacion = new Date(); // fecha de creación automática al momento

        evento.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Evento creado'});
        })
    })

// Obtener los últimos 4 eventos creados
router.route('/news')
    .get(function(req, res){
        Evento.find() // encontrar todos
        .sort({fechaCreacion: 'desc'})
        .limit(4)
        .select('titulo descripcion imagenPrincipal')
        .exec(function(err, eventos){
            if(err)
                res.send(err);
            res.json(eventos);
        })
    })

router.route('/find')
    .get(function(req, res){
        Evento.find()
        .populate('lugar')
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
        .populate('lugar')
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
            
            if(req.body.titulo)
                evento.titulo = req.body.titulo;
            if(req.body.descripcion)
                evento.descripcion = req.body.descripcion;
            if(req.body.contenidoHTML)
                evento.contenidoHTML = req.body.contenidoHTML;
            if(req.body.fecha)
                evento.fecha = req.body.fecha;
            // if(req.body.fechaFin)
            //  evento.fechaFin = req.body.fechaFin;
            if(req.body.horario)
                evento.horario = req.body.horario;
            // if(req.body.horarioFin)
            //  evento.horarioFin = req.body.horarioFin;
            if(req.body.tipo)
                evento.tipo = req.body.tipo;
            if(req.body.imagenPrincipal)
                evento.imagenPrincipal = req.body.imagenPrincipal;
            // Se espera que las imagenes se representen como una lista de nombres de archivo separados por comas
            // if(req.body.imagen)
            //  evento.imagen = req.body.imagen.split(/\s*,\s*/); // REGEXP elimina posibles espacios en blanco entre nombres y comas
            if(req.body.realizador)
                evento.realizador = req.body.realizador; //.split(/\s*,\s*/);
            if(req.body.lugar)
                evento.lugar = req.body.lugar; // id del lugar
            evento.fechaCreacion = new Date(); // fecha de creación auto-actualizada

            evento.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Evento actualizado'});
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
            res.json({message: 'Evento borrado exitosamente'});
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js