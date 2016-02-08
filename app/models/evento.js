/*
Define y exporta el modelo de la colección Eventos
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

var tipos = 'academico docencia'.split(' '); // Para los tipos de evento

// Definición del esquema "Evento", incluyendo nombre del campo y el tipo de dato (key: value_type)
var EventoSchema = new Schema({
	titulo : {type: String, required: true},
    descripcion: String,
    contenidoHTML: {type: String, required: true},
    tipo: {type: String, enum: tipos},
    
    fecha: {type: Date},
    fechaFin: {type: Date},
    horario: {type: Date},
    //horarioFin: {type: Date},

    imagenPrincipal: {type: String},
    //imagen: [{type: String}],
    realizador: [{type: String}],
    
    lugar: {type: mongoose.Schema.Types.ObjectId, ref: 'Lugares'},
    //creador: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios'},
    //keywords: [String],
    notas: {type: String},
    fechaCreacion: {type: Date, default: Date.now}
});

// exportar el modelo "Eventos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Evento', EventoSchema);