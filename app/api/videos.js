/*
API para manejo de la base de datos con la colección de "Videos"
Permite obtener datos en formato JSON mediante verbos HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/videos
POST   http://localhost:8080/api/videos
GET    http://localhost:8080/api/videos/1234567890
PUT    http://localhost:8080/api/videos/1234567890
DELETE http://localhost:8080/api/videos/1234567890
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var mongoose = require('mongoose');
var Video = require('../models/video'); // Modelo de la colección "Eventos"
var verifyToken = require('./token'); // Función de verificación de token

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    // console.log('Usando el API de registros audiovisuales.');
    // Rutas que son excluidas de verificación de token:
    if(req.method === 'GET')
        return next();
    // Antes de usar el API de usuario se verifica que haya token y sea válido
    verifyToken(req, res, next);
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los audiovisuales
    // GET http://localhost:8080/api/videos
	.get(function(req, res){
        Video.find()
        .exec(function(err, audiovisuales){
            if(err)
                res.send(err);
            res.json(audiovisuales);
        })
    })

    // Agregar un nuevo registro audiovisual
    .post(function(req, res){
        var audiovisual = new Video();
        
        if(req.body.codigo_de_referencia)
            audiovisual.codigo_de_referencia = req.body.codigo_de_referencia;
        if(req.body.titulo_propio)
            audiovisual.titulo_propio = req.body.titulo_propio;
        if(req.body.titulo_paralelo)
            audiovisual.titulo_paralelo = req.body.titulo_paralelo;
        if(req.body.titulo_atribuido)
            audiovisual.titulo_atribuido = req.body.titulo_atribuido;
        if(req.body.pais)
            audiovisual.pais = req.body.pais;
        if(req.body.fecha)
            audiovisual.fecha = req.body.fecha;
        if(req.body.duracion)
            audiovisual.duracion = req.body.duracion;
        if(req.body.investigacion)
            audiovisual.investigacion = req.body.investigacion;
        if(req.body.realizacion)
            audiovisual.realizacion = req.body.realizacion;
        if(req.body.direccion)
            audiovisual.direccion = req.body.direccion;
        if(req.body.guion)
            audiovisual.guion = req.body.guion;
        if(req.body.adaptacion)
            audiovisual.adaptacion = req.body.adaptacion;
        if(req.body.idea_original)
            audiovisual.idea_original = req.body.idea_original;
        if(req.body.fotografia)
            audiovisual.fotografia = req.body.fotografia;
        if(req.body.fotografia_fija)
            audiovisual.fotografia_fija = req.body.fotografia_fija;
        if(req.body.edicion)
            audiovisual.edicion = req.body.edicion;
        if(req.body.sonido_grabacion)
            audiovisual.sonido_grabacion = req.body.sonido_grabacion;
        if(req.body.sonido_edicion)
            audiovisual.sonido_edicion = req.body.sonido_edicion;
        if(req.body.musica_original)
            audiovisual.musica_original = req.body.musica_original;
        if(req.body.musicalizacion)
            audiovisual.musicalizacion = req.body.musicalizacion;
        if(req.body.voces)
            audiovisual.voces = req.body.voces;
        if(req.body.actores)
            audiovisual.actores = req.body.actores;
        if(req.body.animacion)
            audiovisual.animacion = req.body.animacion;
        if(req.body.otros_colaboradores)
            audiovisual.otros_colaboradores = req.body.otros_colaboradores;
        if(req.body.archivo_procedencia)
            audiovisual.archivo_procedencia = req.body.archivo_procedencia;
        if(req.body.fondo_de_pertenencia)
            audiovisual.fondo_de_pertenencia = req.body.fondo_de_pertenencia;
        if(req.body.entidad_productora)
            audiovisual.entidad_productora = req.body.entidad_productora;
        if(req.body.productor)
            audiovisual.productor = req.body.productor;
        if(req.body.distribuidora)
            audiovisual.distribuidora = req.body.distribuidora;
        if(req.body.historia_institucional)
            audiovisual.historia_institucional = req.body.historia_institucional;
        if(req.body.resena_biografica)
            audiovisual.resena_biografica = req.body.resena_biografica;
        if(req.body.forma_de_ingreso)
            audiovisual.forma_de_ingreso = req.body.forma_de_ingreso;
        if(req.body.fecha_de_ingreso)
            audiovisual.fecha_de_ingreso = req.body.fecha_de_ingreso;
        if(req.body.proyecto_de_investigacion)
            audiovisual.proyecto_de_investigacion = req.body.proyecto_de_investigacion;
        if(req.body.sinopsis)
            audiovisual.sinopsis = req.body.sinopsis;
        if(req.body.descriptor_onomastico)
            audiovisual.descriptor_onomastico = req.body.descriptor_onomastico;
        if(req.body.descriptor_toponimico)
            audiovisual.descriptor_toponimico = req.body.descriptor_toponimico;
        if(req.body.descriptor_cronologico)
            audiovisual.descriptor_cronologico = req.body.descriptor_cronologico;
        if(req.body.tipo_de_produccion)
            audiovisual.tipo_de_produccion = req.body.tipo_de_produccion;
        if(req.body.fuentes)
            audiovisual.fuentes = req.body.fuentes;
        if(req.body.recursos)
            audiovisual.recursos = req.body.recursos;
        if(req.body.condiciones_de_acceso)
            audiovisual.condiciones_de_acceso = req.body.condiciones_de_acceso;
        if(req.body.condiciones_de_reproduccion)
            audiovisual.condiciones_de_reproduccion = req.body.condiciones_de_reproduccion;
        if(req.body.idioma_original)
            audiovisual.idioma_original = req.body.idioma_original;
        if(req.body.doblaje)
            audiovisual.doblaje = req.body.doblaje;
        if(req.body.subtitulaje)
            audiovisual.subtitulaje = req.body.subtitulaje;
        if(req.body.soporte)
            audiovisual.soporte = req.body.soporte;
        if(req.body.color)
            audiovisual.color = req.body.color;
        if(req.body.audio)
            audiovisual.audio = req.body.audio;
        if(req.body.sistema_de_grabacion)
            audiovisual.sistema_de_grabacion = req.body.sistema_de_grabacion;
        if(req.body.region_dvd)
            audiovisual.region_dvd = req.body.region_dvd;
        if(req.body.requisitos_tecnicos)
            audiovisual.requisitos_tecnicos = req.body.requisitos_tecnicos;
        if(req.body.existencia_y_localizacion_de_copias)
            audiovisual.existencia_y_localizacion_de_copias = req.body.existencia_y_localizacion_de_copias;
        if(req.body.unidades_de_descripcion_relacionadas)
            audiovisual.unidades_de_descripcion_relacionadas = req.body.unidades_de_descripcion_relacionadas;
        if(req.body.documentos_asociados)
            audiovisual.documentos_asociados = req.body.documentos_asociados;
        if(req.body.notas)
            audiovisual.notas = req.body.notas;
        if(req.body.notas_del_archivero)
            audiovisual.notas_del_archivero = req.body.notas_del_archivero;
        if(req.body.archivero)
            audiovisual.archivero = req.body.archivero;
        if(req.body.reglas_o_normas)
            audiovisual.reglas_o_normas = req.body.reglas_o_normas;
        if(req.body.imagen)
            audiovisual.imagen = req.body.imagen;

        audiovisual.save(function(err){
            if(err)
                res.send(err);
            res.json({
                success: true,
                message: 'Registro audiovisual creado',
                video: audiovisual
            });
        })
    })

// Conocer el siguiente valor consecutivo de codigo_de_referencia. Por ejemplo:
// GET http://localhost:8080/api/videos/next?year=11
// La respuesta puede ser: {next: 3}
router.route('/next')
    .get(function(req, res){
        if(req.query.year){
            Video.find({
                'codigo_de_referencia': {$regex: '^MXIM-AV-3-' + req.query.year}
            })
            .select('codigo_de_referencia')
            .exec(function(err, audiovisuales){
                if(err)
                    res.send(err);
                var container = []; // Contenedor de enteros (no necesariamente) consecutivos
                for(var i in audiovisuales){
                    var re = new RegExp('^MXIM-AV-3-' + req.query.year + '-([0-9]+)');
                    var match = re.exec(audiovisuales[i].codigo_de_referencia);
                    if(match && match[1])
                        container.push(parseInt(match[1]));
                }
                container = container.sort();
                var defitiveNext = 1; // Auxiliar que representa el siguiente entero consecutivo
                for(var i in container){ // Buscar el primer número no-consecutivo o responder con el último siguiente
                    defitiveNext = parseInt(i)+1;
                    if(parseInt(i)+1 != container[i])
                        break;
                }
                res.send({next: defitiveNext});
            })
        }
    })

// Busca los datos existentes de un campo especificado que cumpla con el query de búsqueda. Por ejemplo
// GET http://localhost:8080/api/videos/search?f=titulo_propio&q=Lorem
router.route('/search')
    .get(function(req, res){
        var mongoQuery = {};
        mongoQuery[req.query.f] = {$regex: '.*' + req.query.q + '.*', $options: 'i'};
        Video.distinct(req.query.f, mongoQuery)
        .exec(function(err, results){
            if(err)
                res.send(err);
            res.send(results);
        })
    })

// En peticiones con un ID
router.route('/:video_id')
	// Obtener un registro audiovisual particular (mediante el ID)
    .get(function(req, res){
        Video.findById(req.params.video_id)
        .populate('archivero')
        .exec(function(err, audiovisual){
            if(err)
                res.send(err);
            res.json(audiovisual);
        })
    })

    // Actualizar un registro audiovisual en particular (mediante el ID)
    .put(function(req, res){
        Video.findById(req.params.video_id, function(err, audiovisual){
            if(err)
                res.send(err);
            
            if(req.body.codigo_de_referencia != audiovisual.codigo_de_referencia)
                audiovisual.codigo_de_referencia = req.body.codigo_de_referencia;
            if(req.body.titulo_propio != audiovisual.titulo_propio)
                audiovisual.titulo_propio = req.body.titulo_propio;
            if(req.body.titulo_paralelo != audiovisual.titulo_paralelo)
                audiovisual.titulo_paralelo = req.body.titulo_paralelo;
            if(req.body.titulo_atribuido != audiovisual.titulo_atribuido)
                audiovisual.titulo_atribuido = req.body.titulo_atribuido;
            if(req.body.pais != audiovisual.pais)
                audiovisual.pais = req.body.pais;
            if(req.body.fecha != audiovisual.fecha)
                audiovisual.fecha = req.body.fecha;
            if(req.body.duracion != audiovisual.duracion)
                audiovisual.duracion = req.body.duracion;
            if(req.body.investigacion != audiovisual.investigacion)
                audiovisual.investigacion = req.body.investigacion;
            if(req.body.realizacion != audiovisual.realizacion)
                audiovisual.realizacion = req.body.realizacion;
            if(req.body.direccion != audiovisual.direccion)
                audiovisual.direccion = req.body.direccion;
            if(req.body.guion != audiovisual.guion)
                audiovisual.guion = req.body.guion;
            if(req.body.adaptacion != audiovisual.adaptacion)
                audiovisual.adaptacion = req.body.adaptacion;
            if(req.body.idea_original != audiovisual.idea_original)
                audiovisual.idea_original = req.body.idea_original;
            if(req.body.fotografia != audiovisual.fotografia)
                audiovisual.fotografia = req.body.fotografia;
            if(req.body.fotografia_fija != audiovisual.fotografia_fija)
                audiovisual.fotografia_fija = req.body.fotografia_fija;
            if(req.body.edicion != audiovisual.edicion)
                audiovisual.edicion = req.body.edicion;
            if(req.body.sonido_grabacion != audiovisual.sonido_grabacion)
                audiovisual.sonido_grabacion = req.body.sonido_grabacion;
            if(req.body.sonido_edicion != audiovisual.sonido_edicion)
                audiovisual.sonido_edicion = req.body.sonido_edicion;
            if(req.body.musica_original != audiovisual.musica_original)
                audiovisual.musica_original = req.body.musica_original;
            if(req.body.musicalizacion != audiovisual.musicalizacion)
                audiovisual.musicalizacion = req.body.musicalizacion;
            if(req.body.voces != audiovisual.voces)
                audiovisual.voces = req.body.voces;
            if(req.body.actores != audiovisual.actores)
                audiovisual.actores = req.body.actores;
            if(req.body.animacion != audiovisual.animacion)
                audiovisual.animacion = req.body.animacion;
            if(req.body.otros_colaboradores != audiovisual.otros_colaboradores)
                audiovisual.otros_colaboradores = req.body.otros_colaboradores;
            if(req.body.archivo_procedencia != audiovisual.archivo_procedencia)
                audiovisual.archivo_procedencia = req.body.archivo_procedencia;
            if(req.body.fondo_de_pertenencia != audiovisual.fondo_de_pertenencia)
                audiovisual.fondo_de_pertenencia = req.body.fondo_de_pertenencia;
            if(req.body.entidad_productora != audiovisual.entidad_productora)
                audiovisual.entidad_productora = req.body.entidad_productora;
            if(req.body.productor != audiovisual.productor)
                audiovisual.productor = req.body.productor;
            if(req.body.distribuidora != audiovisual.distribuidora)
                audiovisual.distribuidora = req.body.distribuidora;
            if(req.body.historia_institucional != audiovisual.historia_institucional)
                audiovisual.historia_institucional = req.body.historia_institucional;
            if(req.body.resena_biografica != audiovisual.resena_biografica)
                audiovisual.resena_biografica = req.body.resena_biografica;
            if(req.body.forma_de_ingreso != audiovisual.forma_de_ingreso)
                audiovisual.forma_de_ingreso = req.body.forma_de_ingreso;
            if(req.body.fecha_de_ingreso != audiovisual.fecha_de_ingreso)
                audiovisual.fecha_de_ingreso = req.body.fecha_de_ingreso;
            if(req.body.proyecto_de_investigacion != audiovisual.proyecto_de_investigacion)
                audiovisual.proyecto_de_investigacion = req.body.proyecto_de_investigacion;
            if(req.body.sinopsis != audiovisual.sinopsis)
                audiovisual.sinopsis = req.body.sinopsis;
            if(req.body.descriptor_onomastico != audiovisual.descriptor_onomastico)
                audiovisual.descriptor_onomastico = req.body.descriptor_onomastico;
            if(req.body.descriptor_toponimico != audiovisual.descriptor_toponimico)
                audiovisual.descriptor_toponimico = req.body.descriptor_toponimico;
            if(req.body.descriptor_cronologico != audiovisual.descriptor_cronologico)
                audiovisual.descriptor_cronologico = req.body.descriptor_cronologico;
            if(req.body.tipo_de_produccion != audiovisual.tipo_de_produccion)
                audiovisual.tipo_de_produccion = req.body.tipo_de_produccion;
            if(req.body.fuentes != audiovisual.fuentes)
                audiovisual.fuentes = req.body.fuentes;
            if(req.body.recursos != audiovisual.recursos)
                audiovisual.recursos = req.body.recursos;
            if(req.body.condiciones_de_acceso != audiovisual.condiciones_de_acceso)
                audiovisual.condiciones_de_acceso = req.body.condiciones_de_acceso;
            if(req.body.condiciones_de_reproduccion != audiovisual.condiciones_de_reproduccion)
                audiovisual.condiciones_de_reproduccion = req.body.condiciones_de_reproduccion;
            if(req.body.idioma_original != audiovisual.idioma_original)
                audiovisual.idioma_original = req.body.idioma_original;
            if(req.body.doblaje != audiovisual.doblaje)
                audiovisual.doblaje = req.body.doblaje;
            if(req.body.subtitulaje != audiovisual.subtitulaje)
                audiovisual.subtitulaje = req.body.subtitulaje;
            if(req.body.soporte != audiovisual.soporte)
                audiovisual.soporte = req.body.soporte;
            if(req.body.color != audiovisual.color)
                audiovisual.color = req.body.color;
            if(req.body.audio != audiovisual.audio)
                audiovisual.audio = req.body.audio;
            if(req.body.sistema_de_grabacion != audiovisual.sistema_de_grabacion)
                audiovisual.sistema_de_grabacion = req.body.sistema_de_grabacion;
            if(req.body.region_dvd != audiovisual.region_dvd)
                audiovisual.region_dvd = req.body.region_dvd;
            if(req.body.requisitos_tecnicos != audiovisual.requisitos_tecnicos)
                audiovisual.requisitos_tecnicos = req.body.requisitos_tecnicos;
            if(req.body.existencia_y_localizacion_de_copias != audiovisual.existencia_y_localizacion_de_copias)
                audiovisual.existencia_y_localizacion_de_copias = req.body.existencia_y_localizacion_de_copias;
            if(req.body.unidades_de_descripcion_relacionadas != audiovisual.unidades_de_descripcion_relacionadas)
                audiovisual.unidades_de_descripcion_relacionadas = req.body.unidades_de_descripcion_relacionadas;
            if(req.body.documentos_asociados != audiovisual.documentos_asociados)
                audiovisual.documentos_asociados = req.body.documentos_asociados;
            if(req.body.notas != audiovisual.notas)
                audiovisual.notas = req.body.notas;
            if(req.body.notas_del_archivero != audiovisual.notas_del_archivero)
                audiovisual.notas_del_archivero = req.body.notas_del_archivero;
            if(req.body.archivero != audiovisual.archivero)
                audiovisual.archivero = req.body.archivero;
            if(req.body.reglas_o_normas != audiovisual.reglas_o_normas)
                audiovisual.reglas_o_normas = req.body.reglas_o_normas;
            if(req.body.imagen != audiovisual.imagen)
                audiovisual.imagen = req.body.imagen;

            audiovisual.save(function(err){
                if(err)
                    res.send(err);
                res.json({
                    success: true,
                    message: 'Registro audiovisual actualizado',
                    video: audiovisual
                });
            });
        });
    })

    // Eliminar un registro audiovisual en particular (mediante el ID)
    .delete(function(req, res){
        Video.remove({
            _id: req.params.video_id
        }, function(err, audiovisual){
            if(err)
                res.send(err);
            res.json({
                success: true,
                message: 'Registro audiovisual (' + audiovisual._id + ') borrado exitosamente'
            });
        });
    })

module.exports = router; // Exponer el API para ser utilizado en server.js