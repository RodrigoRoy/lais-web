/*
API para manejo de la base de datos con la colección de "Lugares"
Permite obtener datos en formato JSON mediante verbos HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/lugares
POST   http://localhost:8080/api/lugares
GET    http://localhost:8080/api/lugares/1234567890
PUT    http://localhost:8080/api/lugares/1234567890
DELETE http://localhost:8080/api/lugares/1234567890
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var Lugar = require('../models/lugar'); // Modelo de la colección "Lugar"

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Lugares.');
    next(); // Pasar el control de las rutas a la siguiente coincidencia
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los lugares
	.get(function(req, res){
        Lugar.find(function(err, lugar){
            if(err)
                res.send(err);
            res.json(lugar);
        })
    })

    // Agregar un nuevo lugar
    .post(function(req, res){
        var lugar = new Lugar();
        
        if(req.body.nombre)
        	lugar.nombre = req.body.nombre;
        if(req.body.calle)
        	lugar.direccion.calle = req.body.calle;
        if(req.body.numero)
        	lugar.direccion.numero = req.body.numero;
		if(req.body.numeroInterior)
			lugar.direccion.numeroInterior = req.body.numeroInterior;
		if(req.body.colonia)
			lugar.direccion.colonia = req.body.colonia;
		if(req.body.ciudad)
			lugar.direccion.ciudad = req.body.ciudad;
		if(req.body.estado)
			lugar.direccion.estado = req.body.estado;
		if(req.body.cp)
			lugar.direccion.cp = req.body.cp;
		if(req.body.pais)
			lugar.direccion.pais = req.body.pais;
		if(req.body.telefono)
			lugar.telefono = req.body.telefono;
		if(req.body.contacto)
			lugar.contacto = req.body.contacto;

        lugar.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Lugar creado'});
        });
    });

// En peticiones con un ID
router.route('/:lugar_id')
	// Obtener un lugar particular (mediante el ID)
    .get(function(req, res){
        Lugar.findById(req.params.lugar_id, function(err, lugar){
            if(err)
                res.send(err);
            res.json(lugar);
        })
    })

    // Actualizar un lugar en particular (mediante el ID)
    .put(function(req, res){
        Lugar.findById(req.params.lugar_id, function(err, lugar){
            if(err)
                res.send(err);
            
            if(req.body.nombre)
	        	lugar.nombre = req.body.nombre;
	        if(req.body.calle)
	        	lugar.direccion.calle = req.body.calle;
	        if(req.body.numero)
	        	lugar.direccion.numero = req.body.numero;
			if(req.body.numeroInterior)
				lugar.direccion.numeroInterior = req.body.numeroInterior;
			if(req.body.colonia)
				lugar.direccion.colonia = req.body.colonia;
			if(req.body.ciudad)
				lugar.direccion.ciudad = req.body.ciudad;
			if(req.body.estado)
				lugar.direccion.estado = req.body.estado;
			if(req.body.cp)
				lugar.direccion.cp = req.body.cp;
			if(req.body.pais)
				lugar.direccion.pais = req.body.pais;
			if(req.body.telefono)
				lugar.telefono = req.body.telefono;
			if(req.body.contacto)
				lugar.contacto = req.body.contacto;

            lugar.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Lugar actualizado'});
            })
        })
    })

    // Eliminar un lugar en particular (mediante el ID)
    .delete(function(req, res){
        Lugar.remove({
            _id: req.params.lugar_id
        }, function(err, lugar){
            if(err)
                res.send(err);
            res.json({message: 'Lugar borrado exitosamente'});
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js