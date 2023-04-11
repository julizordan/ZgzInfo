const mongoose = require('mongoose');
const Comentario = require('./Comentarios');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, minLength :6 }
});


const comentarioSchema = new mongoose.Schema({
    usuario: [userSchema],
    comentario: { type: String }
});

const foroSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique:true },
    tipo: { type: String, required: true },
    suscritos : [userSchema],
    comentarios: [comentarioSchema]
});

const Foro = mongoose.model('Foro', foroSchema);

module.exports = Foro;