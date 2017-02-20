/*
Define y exporta el modelo de la colección Eventos
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// var publico = ['Público general', 'Estudiantes', 'Investigadores', 'Docentes'] // Para los tipos de evento

// Definición del esquema "Evento", incluyendo nombre del campo y el tipo de dato (key: value_type)
var EventoSchema = new Schema({
	titulo : {type: String, required: true},
    // descripcion: String,
    contenidoHTML: {type: String, required: true},
    tipo: {type: String, enum: ['Académico', 'Docencia']},
    fecha: {type: Date},
    fechaFin: {type: Date},
    horario: {type: Date},
    horarioFin: {type: Date},
    imagen: {type: String},
    coordinador: [{type: String}], // Reemplazo para "realizador"
    participantes: [{type: String}], // Personas importantes del evento
    lugar: {type: String}, // Google Maps ID
    creador: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'},
    keywords: [{type: String}],
    notas: {type: String},
    documentos: [{type: String}],
}, { // Opciones:
    collection: 'eventos',
    timestamps: true //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
});

// exportar el modelo "Eventos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Evento', EventoSchema);