var express = require('express');
var router = express.Router();

const ctrlUsuarios = require('../controllers/users');
const ctrlIncidencias = require('../controllers/incidencias');
const ctrlForos = require('../controllers/foro');
const ctrlAdmin = require('../controllers/admin');

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
 * Graficas Usuarios
 */
router
    .route('/api/grafica/NumUsuariosIncidencia')
    .get(ctrlUsuarios.NumUsuariosIncidencia);
router
    .route('/api/grafica/NumForosTipo')
    .get(ctrlForos.NumForosTipo);


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
router
    .route('/api/comentarForo')
    .post(ctrlForos.comentarForo);

/*
 * Admin
 */
router
    .route('/api/admin/listadoUsuarios')
    .get(ctrlAdmin.listarUsuarios);
router
    .route('/api/admin/:userId/bloquear')
    .put(ctrlAdmin.bloquearUsuario);
router
    .route('/api/admin/:userId/listadoMensajes')
    .get(ctrlAdmin.listadoMensajes);
router
    .route('/api/admin/:userId/eliminarMensaje')
    .delete(ctrlAdmin.eliminarMensaje);
router
    .route('/api/admin/listadoForos')
    .get(ctrlAdmin.listarForos);
router
    .route('/api/admin/:idForo/eliminar')
    .delete(ctrlAdmin.eliminarForo);

/*
 * Graficas Admin
 */
router
    .route('/api/admin/grafica/numeroIncidenciasTipo')
    .get(ctrlAdmin.numeroIncidenciasTipo);
router
    .route('/api/admin/grafica/NumIncidenciasHoy')
    .get(ctrlAdmin.NumIncidenciasHoy);
router
    .route('/api/admin/grafica/NumUsuariosRegistrados')
    .get(ctrlAdmin.NumUsuariosRegistrados);
router
    .route('/api/admin/grafica/NumUsuariosBloqueados')
    .get(ctrlAdmin.NumUsuariosBloqueados);


    
module.exports = router;

