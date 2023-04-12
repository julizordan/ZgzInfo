const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, minLength :6 }
});

const incidenciaSchema = new mongoose.Schema({
    tipo: { type: String, required: true},
    titulo: { type: String, required: true },
    inicio: { type: Date},
    fin: { type: Date},
    motivo: { type: String, required: true },
    calle: { type: String, required: true },
    suscritos : [userSchema]
});

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia;