/*
Define y exporta el modelo de la colección Publicacion
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección

// Definición del esquema "Autor":
var PublicacionSchema = new Schema({
	titulo: {type: String, required: true},
	subtitulo: {type: String}, // Libro, Documental
	fecha: {type: Date},
	autor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Autores'}],
	tipo: {type: String, enum: ['Artículo', 'Ponencia', 'Libro', 'Capítulo de libro', 'Documental', 'Exposición', 'Página web']},
	publisher: {type: String}, // Libro, Capítulo de Libro
	journal: {type: String},   // Artículo
	numero: {type: String},    // Artículo
	volumen: {type: String},   // Artículo, Libro, Capítulo de Libro
	booktitle: {type: String}, // Capítulo de Libro
	paginas: {type: String},   // Artículo, Capítulo de Libro, Ponencia
	coleccion: {type: String}, // Capítulo de Libro
	isbn: {type: String},      // Libro, Capítulo de Libro?
	descripcion: {type: String},
	abstract: {type: String},  // !Página web, !Exposición
	url: {type: String, match: [/https?.*/, 'URL debe comenzar con "http(s)://"']},
	keywords: [{type: String}], 
	notas: {type: String},
	imagen: {type: String},
	adjuntos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Archivo'}],
	usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
	// timestamp: {type: Date, default: Date.now},
	// modificacion: {type: Date}
}, { // Opciones:
	collection: 'publicaciones',
	timestamps: true //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
});

// exportar el modelo "Publicacions"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Publicaciones', PublicacionSchema);