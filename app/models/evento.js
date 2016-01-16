/*
Define y exporta el modelo de la colección Eventos
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

var tipos = 'academico docencia'.split(' '); // Para los tipos de evento

// Necesario para obtener el contador para _id de eventos
// (podría no ser necesario)
// function getNext(name){
//     var Counter = mongoose.model('Counter', new Schema({_id: String, seq: Number})); // TODO: CREAR MODELO EN ARCHIVO SEPARADO
//     var ret = db.counters.findAndModify(
//         {
//             query: {_id: name},
//             update: {$inc: {seq + 1}},
//             new: true
//         }
//     );
//     return ret.seq;
// }

// Definición del esquema "Evento", incluyendo nombre del campo y el tipo de dato (key: value_type)
var EventoSchema = new Schema({
	// _id: {type: Number},
	titulo : {type: String, required: true},
    contenidoHTML: {type: String, required: true},
    descripcion: String,
    tipo: {type: String, enum: tipos},
    fecha: {type: Date},
    fechaFin: {type: Date},
    horario: {type: Date},
    horarioFin: {type: Date},
    todoElDia: Boolean,
    
    imagen: [{type: String}],
    realizador: [{type: String}],
    lugar: {
    	nombre: {type: String},
    	direccion: {
    		calle: String,
    		numero: String,
    		colonia: String,
    		ciudad: String,
    		estado: String
    	},
    	telefono: {type: String},
    	contacto: {type: String}
    },
    fechaCreacion: {type: Date, default: Date.now}
});

// exportar el modelo "Eventos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Evento', EventoSchema);