const mongoose = require('mongoose');

const incidenciaSchema = new mongoose.Schema({
    tipo: { type: String, required: true},
    titulo: { type: String, required: true },
    inicio: { type: Date},
    fin: { type: Date},
    motivo: { type: String, required: true },
    calle: { type: String, required: true }
});

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia;