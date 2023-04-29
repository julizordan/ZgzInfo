var express = require('express');
var router = express.Router();

const ctrlUsuarios = require('../controllers/users');
const ctrlIncidencias = require('../controllers/incidencias');
const ctrlForos = require('../controllers/foro');

/*
 * Usuarios
 */
router
    .route('/api/register')
    .post(ctrlUsuarios.userCreate);

router
    .route('/api/register/:userId')
    .put(ctrlUsuarios.userUpdate);

router
    .route('/api/login/:userId')
    .get(ctrlUsuarios.userLogin);

/*
 * Incidencias
 */

router
    .route('/api/incidenciasLista')
    .get(ctrlIncidencias.incidenciasLista);
router
    .route('/api/getIndicencias/:id')
    .get(ctrlIncidencias.getIndicenciasByid);
router
    .route('/api/suscribirIncidencia')
    .post(ctrlIncidencias.suscribirIncidencia);
router
    .route('/api/getIncidenciasByTipo/:tipo')
    .get(ctrlIncidencias.getIncidenciasByTipo);
router
    .route('/api/getsuscripcionesByUsuario/:email')
    .get(ctrlIncidencias.getIncidenciasUsuario);

/*
 * Foro
 */
router
    .route('/api/suscribirForo')
    .post(ctrlForos.suscribirForo);
router
    .route('/api/getForosUsuario/:email')
    .get(ctrlForos.getForosUsuario);
router
    .route('/api/getForosByid/:id')
    .get(ctrlForos.getForosByid);

module.exports = router;

