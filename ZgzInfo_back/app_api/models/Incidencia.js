const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: false, unique: true, sparse: true},
    password: {type: String, required: true, minLength: 6}
});

const incidenciaSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    tipo: {type: String, required: true},
    titulo: {type: String, required: true},
    inicio: {type: Date},
    fin: {type: Date},
    motivo: {type: String, required: true},
    calle: {type: String, required: true},
    suscritos: {type: [userSchema],  default: null}
});

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia;