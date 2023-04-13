var express = require('express');
var router = express.Router();

const ctrlUsuarios = require('../controllers/users');
const ctrlIncidencias = require('../controllers/incidencias');
const ctrlForos = require('../controllers/foro');

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
  .route('/api/incidenciasLista')
  .get(ctrlIncidencias.incidenciasLista);

router
    .route('/api/incidencias')
    .get(ctrlIncidencias.incidencias);
router
  .route('/api/incidencias/:calle')
  .get(ctrlIncidencias.incidenciasLisatCalle);

router
  .route('/api/mapa')
  .get(ctrlIncidencias.incidenciasMapa);

router
  .route('/api/mapa/:tipo')
  .get(ctrlIncidencias.incidenciasMapaTipo);

router
  .route('/api/incidencias/:incidenciaId/:userId')
  .post(ctrlIncidencias.suscribirIncidencia);

router
  .route('/api/:userId/foros')
  .get(ctrlForos.listarForos);

router
  .route('/api/:userId/:foroId')
  .post(ctrlForos.suscribeForo);


module.exports = router;

