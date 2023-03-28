const mongoose = require('mongoose');
const comentario = require('./Comentarios');


const foroSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique:true },
    tipo: { type: String, required: true },
    comentarios: [{type: comentario}]
});

const Foro = mongoose.model('Foro', foroSchema);

module.exports = Foro;