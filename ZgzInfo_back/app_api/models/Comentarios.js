const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    comentario: {type: String}
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;