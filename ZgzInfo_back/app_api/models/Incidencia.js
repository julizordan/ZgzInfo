const mongoose = require('mongoose');

//igual estaria interesante crear un foro con el titulo de la incidencia. ¿que pasa con los ya creados?
const incidenciaSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    tipo: {type: String, required: true},
    titulo: {type: String, required: true},
    inicio: {type: Date},
    fin: {type: Date},
    motivo: {type: String, required: true},
    calle: {type: String, required: true},
    coordenadaX:{ type: Number, default: [0, 0] },
    coordenadaY: { type: Number, default: [0, 0] },
    foro: { type: mongoose.Schema.Types.ObjectId, ref: 'Foro'}
});

const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

module.exports = Incidencia;