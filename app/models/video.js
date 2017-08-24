/*
Define y exporta el modelo de la colección "Video" (materiales audiovisuales)
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Video", incluyendo nombre del campo y el tipo de dato (key: value_type)
var VideoSchema = new Schema({
	// UNIDAD SIMPLE
    
    // 1 AREA DE IDENTIFICACION
    codigo_de_referencia: {type: String, required: true, index: {unique: true}},
    titulo_propio: {type: String},
    titulo_paralelo: {type: String},
    titulo_atribuido: {type: String},
    // titulo_de_serie: {type: String},
    // numero_de_programa: {type: String},
    pais: {type: String},
    fecha: {type: Date},
    duracion: {type: Number, min: 1}, // Duracion en minutos
    // Mención de responsabilidades:
    investigacion: {type: String},
    realizacion: {type: String},
    direccion: {type: String},
    guion: {type: String},
    adaptacion: {type: String},
    idea_original: {type: String},
    fotografia: {type: String},
    fotografia_fija: {type: String},
    edicion: {type: String},
    sonido_grabacion: {type: String},
    sonido_edicion: {type: String},
    musica_original: {type: String},
    musicalizacion: {type: String},
    voces: {type: String},
    actores: {type: String},
    animacion: {type: String},
    otros_colaboradores: {type: String},
    archivo_procedencia: {type: String}, // *NUEVA PROPIEDAD
    fondo_de_pertenencia: {type: String}, // *NUEVA PROPIEDAD

    // 2 AREA DE CONTEXTO
    entidad_productora: {type: String},
    productor: {type: String},
    distribuidora: {type: String},
    historia_institucional: {type: String},
    resena_biografica: {type: String},
    forma_de_ingreso: {type: String, enum: ['Compra', 'Donación', 'Producción propia']},
    fecha_de_ingreso: {type: Date},
    proyecto_de_investigacion: {type: String}, // *NUEVA PROPIEDAD

    // 3 AREA DE CONTENIDO Y ESTRUCTURA
    sinopsis: {type: String},
    descriptor_onomastico: {type: String},
    descriptor_toponimico: {type: String},
    descriptor_cronologico: {type: String},
    // Estructura interna:
    tipo_de_produccion: [{type: String, enum: [
        'Película de ficción', 
        'Película documental', 
        'Programa de televisión', 
        'Trailer', 'Publicidad', 
        'Propaganda', 
        'Registros fílmicos', 
        'Registros en video', 
        'Extractos de otras producciones']}],
    // genero: {type: Date},
    fuentes: [{type: String, enum: [
        'Entrevistas',
        'Grabación de campo',
        'Ficción',
        'Documentales',
        'Registros fílmicos',
        'Fotografías',
        'Pinturas',
        'Grabados',
        'Hemerografía',
        'Cartografía',
        'Testimonios orales',
        'Testimonios videorales',
        'Noticieros fílmicos',
        'Programas de tv',
        'Publicidad',
        'Videoclips',
        'Dibujos',
        'Multimedia',
        'Música de época',
        'Documentos',
        'Registros fonográficos',
        'Registros videográficos']}], 
    recursos: [{type: String, enum: [
        'Puesta en escena',
        'Animación',
        'Incidentales',
        'Narración en off',
        'Conducción',
        'Intertítulos',
        'Interactividad',
        'Musicalización',
        'Gráficos',
        'Audiovisuales']}],
    // archivos_consultados: {type: String}, // No figura en el manual
    // versiones: {type: String},
    // formato_original: {type: String},
    // material_extra: {type: String},

    // 4 AREA DE CONDICIONES DE ACCESO Y USO
    condiciones_de_acceso: {type: String, enum: ['Usos no lucrativos', 'Usos reservados para consulta in situ']},
    condiciones_de_reproduccion: {type: String}, // NOTA: no es parte de metadoc pero sí del manual
    // existencia_y_localizacion_de_originales: {type: String},
    idioma_original: {type: String},
    doblaje: {type: String},
    subtitulaje: {type: String},
    soporte: {type: String},
    color: {type: String},
    audio: {type: String},
    // numero_copias: {type: String},
    // descripcion_fisica: {type: String}, // NOTA: es parte de metadoc pero no del manual
    sistema_de_grabacion: {type: String},
    region_dvd: {type: String},
    requisitos_tecnicos: {type: String},

    // 5 AREA DE DOCUMENTACION ASOCIADA
    existencia_y_localizacion_de_copias: {type: String},
    unidades_de_descripcion_relacionadas: {type: String},
    documentos_asociados: {type: String},

    // 6 AREA DE NOTAS
    notas: {type: String},

    // 7 AREA DE CONTROL DE LA DESCRIPCION
    notas_del_archivero: {type: String},
    // archivero: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}, // TODO: Cambiar esquema de usuarios
    archivero: {type: String},
    reglas_o_normas: {type: String},
    // fecha_de_descripcion: {type: String} // es lo mismo que propiedad 'createdAt'

    // 8 INFORMACION ADICIONAL
    imagen: {type: String}

}, { // Opciones:
    collection: 'videos',
    timestamps: true //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
});

// exportar el modelo "Video"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Video', VideoSchema);