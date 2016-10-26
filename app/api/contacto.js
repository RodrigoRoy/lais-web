/*
API para manejo de la información de contacto
Permite reenviar (forward) la información de un formulario desde un correo electrónico

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
POST   http://localhost:8080/api/contacto
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var nodemailer = require('nodemailer'); // módulo para envio de correos electrónicos
var config = require('../../config'); // archivo de configuración

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Contacto.');
    next(); // Pasar el control de las rutas a la siguiente coincidencia
});

// En peticiones a la raiz del API
router.route('/')
    // Enviar la información recibida del formulario para ser enviada por correo electrónico
    // Parámetro de body en la petición req:
    //   req.body.nombre  - Nombre de la persona que envia mensaje (opcional)
    //   req.body.email   - Correo de la persona que envia mensaje (opcional)
    //   req.body.mensaje - Mensaje en texto plano
    .post(function(req, res){
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            // service: 'Gmail',
            // service: 'Hotmail',
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: 'rcolin@institutomora.edu.mx',
                pass: config.mail
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Rodrigo Colín" <rcolin@institutomora.edu.mx>', // sender address
            to: 'rodrigo.cln@ciencias.unam.mx', // list of receivers
            subject: 'Mensaje de la página del LAIS', // Subject line
            text: req.body.mensaje + '\n--------------------\nMensaje de prueba enviado automáticamente' // plaintext body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                return res.status(500).send({
                    success: false,
                    message: 'Forwarding mail service error (Gmail not respond)'
                });
            }
            console.log('Message sent: ' + info.response);
            res.send({
                success: true,
                message: 'Prueba exitosa'
            });
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js