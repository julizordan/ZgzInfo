const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema();

const UsuarioNoRegistrado = mongoose.model('UsuarioNoRegistrado', usuarioSchema);

module.exports = UsuarioNoRegistrado;