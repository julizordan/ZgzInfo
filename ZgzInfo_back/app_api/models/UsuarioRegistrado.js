const mongoose = require('mongoose');
const usuario = require('./Usuario');
const foro = require('./Foro');
const incidencia = require('./Incidencia');

const usuarioRegistradoSchema = new mongoose.Schema({
  incidencia: { type: incidencia},
  foros: { type: foro} //Foros guardados
}, {
  // hereda los campos del schema de usuario
  discriminatorKey: 'tipoUsuario',
  parentSchema: usuario
});

const UsuarioRegistrado = mongoose.model('usuarioRegistrado', usuarioRegistradoSchema);

module.exports = UsuarioRegistrado;