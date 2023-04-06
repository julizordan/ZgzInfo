const mongoose = require('mongoose');
const usuario = require('./Usuario');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, minLength :6 }
});


const comentarioSchema = new mongoose.Schema({
    usuario: [usuarioSchema],
    comentario: { type: String }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;