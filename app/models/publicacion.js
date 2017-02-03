/*
Define y exporta el modelo de la colección Publicacion
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Autor":
var PublicacionSchema = new Schema({
	titulo: {type: String, required: true},
	fecha: {type: Date},
	autor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Autores'}],
	tipo: {type: String, enum: ['Artículo', 'Libro', 'Documental', 'Página web', 'Ponencia']},
	publisher: {type: String}, // Libro, Incollection
	journal: {type: String},   // Artículo
	numero: {type: String},    // Artículo
	volumen: {type: String},   // Artículo, Libro
	booktitle: {type: String}, // Incollection
	paginas: {type: String},   // Artículo, Incollection, Ponencia
	coleccion: {type: String}, // Incollection
	isbn: {type: String},      // Libro, Incollection
	descripcion: {type: String},
	abstract: {type: String},  // !Página web
	url: {type: String, match: [/https?.*/, 'URL debe comenzar con "http(s)://"']}, // necesario en "Página web"
	keywords: [{type: String}], 
	notas: {type: String},
	adjuntos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Archivo'}],
	usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
	timestamp: {type: Date, default: Date.now},
	modificacion: {type: Date}
});

// exportar el modelo "Publicacions"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Publicaciones', PublicacionSchema);