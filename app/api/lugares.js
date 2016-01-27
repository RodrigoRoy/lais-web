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

// Busca lugares cuyo nombre incluya la variable "search" en el URL query
// ej. /api/lugares/find?search=mora buscará coincidencias con /.*mora.*/ en "nombre"
router.get('/find', function(req, res){
    Lugar.find({"nombre": new RegExp('.*' + req.query.search + '.*', "i")})
        .select('nombre') // Solamente se requiere el nombre (y el _id, que siempre se incluye)
        .exec(function(err, lugares){
            if(err)
                res.send(err);
            res.json(lugares);
        })
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
        // console.log("request data: ");
        // console.log(req.body);
        
        if(req.body.nombre)
        	lugar.nombre = req.body.nombre;
        if(req.body.direccion){
            if(req.body.direccion.calle)
                lugar.direccion.calle = req.body.direccion.calle;
            if(req.body.direccion.numero)
                lugar.direccion.numero = req.body.direccion.numero;
            if(req.body.direccion.numeroInterior)
                lugar.direccion.numeroInterior = req.body.direccion.numeroInterior;
            if(req.body.direccion.colonia)
                lugar.direccion.colonia = req.body.direccion.colonia;
            if(req.body.direccion.ciudad)
                lugar.direccion.ciudad = req.body.direccion.ciudad;
            if(req.body.direccion.estado)
                lugar.direccion.estado = req.body.direccion.estado;
            if(req.body.direccion.cp)
                lugar.direccion.cp = req.body.direccion.cp;
            if(req.body.direccion.pais)
                lugar.direccion.pais = req.body.direccion.pais;
        }
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
            if(req.body.direccion){
                if(req.body.direccion.calle)
                    lugar.direccion.calle = req.body.direccion.calle;
                if(req.body.direccion.numero)
                    lugar.direccion.numero = req.body.direccion.numero;
                if(req.body.direccion.numeroInterior)
                    lugar.direccion.numeroInterior = req.body.direccion.numeroInterior;
                if(req.body.direccion.colonia)
                    lugar.direccion.colonia = req.body.direccion.colonia;
                if(req.body.direccion.ciudad)
                    lugar.direccion.ciudad = req.body.direccion.ciudad;
                if(req.body.direccion.estado)
                    lugar.direccion.estado = req.body.direccion.estado;
                if(req.body.direccion.cp)
                    lugar.direccion.cp = req.body.direccion.cp;
                if(req.body.direccion.pais)
                    lugar.direccion.pais = req.body.direccion.pais;
            }
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