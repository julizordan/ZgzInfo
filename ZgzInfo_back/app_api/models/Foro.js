const mongoose = require('mongoose');

const foroSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    tipo: { type: String, required: true },
    titulo: { type: String, required: true },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario'}]
});

const Foro = mongoose.model('Foro', foroSchema);

module.exports = Foro;