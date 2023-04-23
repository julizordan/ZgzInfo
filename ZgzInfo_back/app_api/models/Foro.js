const mongoose = require('mongoose');
const Comentario = require('./Comentarios');
const usuario = require('./Usuario');

const foroSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique:true },
    tipo: { type: String, required: true },
    suscritos : [usuario],
    comentarios: [Comentario]
});

const Foro = mongoose.model('Foro', foroSchema);

module.exports = Foro;