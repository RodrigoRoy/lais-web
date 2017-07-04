/*
API para manejo de la información en el carrusel

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
POST   http://localhost:8080/api/carrusel
GET    http://localhost:8080/api/carrusel
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var fs = require('fs'); // File system library
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
	// Obtener toda la información de los slides
    // GET http://localhost:8080/api/carrusel
	.get(function(req, res){
        fs.access('public/js/carouselSlides.json', (fs.constants || fs).F_OK, function(err){
            if(err)
                return res.status(404).send({
                    success: false,
                    message: "File with slides data not found",
                    err: err
                });
            fs.readFile('public/js/carouselSlides.json', 'utf8', function(err, data){
                var carouselData = JSON.parse(data);
                res.send(carouselData);
            });
        });
    })

    // Agregar un nuevo evento
    .post(function(req, res){
        var carouselData = {};
        carouselData.slides = req.body;
        // console.log('carouselData: ', carouselData);
        var jsonData = JSON.stringify(carouselData);
        // res.send('Hello POST');
        fs.access('public/js/carouselSlides.json', (fs.constants || fs).F_OK, function(err){
            if(err)
                return res.status(404).send({
                    success: false,
                    message: "File with slides data not found",
                    err: err
                });
            fs.writeFile('public/js/carouselSlides.json', jsonData, 'utf8', function(err){
                res.send({
                    success: true,
                    message: 'Carousel data updated'
                });
            });
        })
    })

module.exports = router; // Exponer el API para ser utilizado en server.js