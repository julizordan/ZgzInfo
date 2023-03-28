const mongoose = require('mongoose');
const usuario = require('./Usuario');

const comentarioSchema = new mongoose.Schema({
    usuario: { type: usuario},
    comentario: { type: String }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;