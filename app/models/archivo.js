/*
Define y exporta el modelo de la colección Archivos
*/

// Dependencias
var mongoose = require('mongoose'); // controlador de la base de datos
var Schema = mongoose.Schema; // "Modelo" de la colección
var fs = require('fs'); // File system utility
var filesize = require('filesize'); // Human readable file size string from number

// Definición del esquema "Archivos", incluyendo nombre del campo y el tipo de dato (key: value_type)
var ArchivoSchema = new Schema({
	filename : {type: String, trim: true, required: true}, //index: {unique: true}
    location: {type: String, default: ''}, // required: true
    descripcion: {type: String},
    directory: {type: Boolean, default: false},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
}, { // Opciones:
	collection: 'archivos',
	timestamps: true, //timestamps: {createdAt: 'creacion', updatedAt: 'actualizacion'}
	autoIndex: false,
	toObject: {virtuals: true}, // habilitar virtuals
	toJSON: {virtuals: true}
});
// Virtuals
ArchivoSchema.virtual('size').get(function(){ // tamaño en el sistema de archivos
	var dirbase = 'public/files/';
	try{
        // Verifica si existe el archivo, en caso contrario se dispara excepción (se maneja en catch)
        fs.accessSync(dirbase + this.location + this.filename, (fs.constants || fs).F_OK);
        return filesize(fs.statSync(dirbase + this.location + this.filename).size, {round: 0});
    }catch(err){
        return filesize(0, {round: 0});
    }
});
// ArchivoSchema.virtual('extension').get(function(){
//     var matches = /\.([^\.]*)$/g.exec(this.filename);
//     if(matches)
//         return matches[1];
//     return '';
// });
ArchivoSchema.virtual('filetype').get(function(){
    if(this.directory)
        return 'directory';
    else if(/\.(jpe?g|gif|png|tiff|bmp|svg|webp)$/.test(this.filename)) // imagenes
        return 'image';
    else if(/\.(ogg|mp3|wav|m4a|wma|aac|flac)$/.test(this.filename)) // audio
        return 'audio';
    else if(/\.(mp4|avi|mkv|wmv|flv|3gp|ogv|webm)$/.test(this.filename)) // video
        return 'video';
    else if(/\.pdf$/.test(this.filename)) // pdf
        return 'pdf';
    else if(/\.(docx?|f?odt|txt)$/.test(this.filename)) // documentos de texto
        return 'word';
    else if(/\.(pptx?|f?odp)$/.test(this.filename)) // presentaciones
        return 'presentation';
    else if(/\.(xlsx?|f?ods|csv)$/.test(this.filename)) // hoja de cálculo
        return 'spreadsheet';
    return 'other';
});
// Compound index
ArchivoSchema.index({filename: 1, location: 1}, {unique: true});

// exportar el modelo "Archivos"
// module.exports permite pasar el modelo a otros archivos cuando es llamado
module.exports = mongoose.model('Archivo', ArchivoSchema);