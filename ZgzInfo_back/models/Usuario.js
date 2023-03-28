const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, minLength :6 }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;