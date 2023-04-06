var express = require('express');
var router = express.Router();

const ctrlUsuarios = require('../controllers/users');
const ctrlIncidencias = require('../controllers/incidencias');

// Usuarios
router
  .route('/api/register')
  .post(ctrlUsuarios.userCreate);

router
  .route('/api/register/:userId')
  .put(ctrlUsuarios.userUpdate);

router
  .route('/api/login/:userId')
  .get(ctrlUsuarios.userLogin);

router
  .route('/api/incidencias')
  .get(ctrlIncidencias.incidenciasLista);

router
  .route('/api/incidencias/:calle')
  .get(ctrlIncidencias.incidenciasLisatCalle);


module.exports = router;

