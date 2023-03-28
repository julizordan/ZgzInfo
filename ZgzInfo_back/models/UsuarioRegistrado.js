const mongoose = require('mongoose');
const usuario = require('./Usuario');
const foro = require('./Foro');

const usuarioSchema = new mongoose.Schema({
  incidencia: { type: usuario},
  foros: { type: foro} //Foros guardados
});

const UsuarioRegistrado = mongoose.model('UsuarioRegistrado', usuarioSchema);

module.exports = UsuarioRegistrado;