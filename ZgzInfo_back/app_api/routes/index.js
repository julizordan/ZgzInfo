var express = require('express');
var router = express.Router();

const ctrlUsuarios = require('../controllers/users');
const ctrlIncidencias = require('../controllers/incidencias');
const ctrlForos = require('../controllers/foro');
const ctrlAdmin = require('../controllers/admin');

/*
 * Usuarios
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         foro:
 *           $ref: '#/components/schemas/Foro'
 *           description: Foro al que un usuario se ha suscrito
 *         Incidencia:
 *           $ref: '#/components/schemas/Incidencia'
 *           description: Foro al que un usuario se ha suscrito
 *         tipo_incidencia:
 *           $ref: '#/components/schemas/Incidencia/properties/tipo'
 *           description: Incidencia a la que está suscrito el usuario
 *         bloqueado:
 *           type: boolean
 *           description: Indica si el usuario está bloqueado o no (solo lo podrá modificar el admin)
 *         fecha de registro:
 *           type: Date
 *           description: Fecha en la que se ha registrado un usuario
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: juan@gmail.com
 *         password: "123456"
 *         foro: VIA HISPANIDAD
 *         tipo_incidencia: Cortes de agua
 *         bloqueado: false

 *     Incidencia:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único de la incidencia
 *         tipo:
 *           type: string
 *           description: Tipo de la incidencia
 *         titulo:
 *           type: string
 *           description: Título de la incidencia
 *         inicio:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de inicio de la incidencia
 *         fin:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de finalización de la incidencia
 *         motivo:
 *           type: string
 *           description: Motivo de la incidencia
 *         calle:
 *           type: string
 *           description: Calle donde se ha producido la incidencia
 *         coordenadaX:
 *           type: number
 *           format: double
 *           description: Coordenada X de la ubicación de la incidencia
 *         coordenadaY:
 *           type: number
 *           format: double
 *           description: Coordenada Y de la ubicación de la incidencia
 *         foro:
 *           $ref: '#/components/schemas/Foro'
 *           description: Foro asociado a la incidencia
 *       required:
 *         - id
 *         - tipo
 *         - titulo
 *         - motivo
 *         - calle

 *     Foro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único del foro
 *         titulo:
 *           type: string
 *           description: Título del foro
 *         tipo:
 *           type: string
 *           description: Tipo del foro
 *         comentarios:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de comentarios del foro
 *       required:
 *         - id
 *         - tipo
 *         - titulo
 */

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Endpoints para operaciones relacionadas con los usuarios
 */
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: juan@gmail.com
 *               password: "123456"
 *     responses:
 *       '200':
 *         description: Usuario creado exitosamente
 *       '404':
 *         description: Usuario ya registrado encontrado
 *       '500':
 *         description: Error interno del servidor
 *
 *     tags:
 *       - Usuario
 */
router
    .route('/api/register')
    .post(ctrlUsuarios.userCreate);


/**
 * @swagger
 * /api/register/{email}:
 *   put:
 *     summary: Actualiza la contraseña de un usuario existente
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *             example:
 *               password: "nuevacontraseña123"
 *     responses:
 *       '200':
 *         description: Contraseña del usuario actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Se ha cambiado la contraseña
 *       '404':
 *         description: Email no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email not found
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *     tags:
 *       - Usuario
 */
router
    .route('/api/register/:email')
    .put(ctrlUsuarios.userUpdate);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Comprueba que un usuario existe y que puede entrar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: juan@gmail.com
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Login satisfactorio
 *       400:
 *         description: Email y password requeridos
 *       404:
 *         description: email o password inválidos
 *       500:
 *         description: Internal server error
 *     tags:
 *        - Usuario
 */

router
    .route('/api/login')
    .post(ctrlUsuarios.userLogin);

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
/**
 * @swagger
 * /api/incidenciasLista:
 *   get:
 *     summary: Lista de incidencias de la ciudad de Zaragoza
 *     description: Obtiene una lista de las incidencias de la ciudad de Zaragoza.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Incidencia'
 *       '500':
 *         description: Error interno del servidor
 *     tags:
 *       - Incidencias
 */
router
    .route('/api/incidenciasLista')
    .get(ctrlIncidencias.incidenciasLista);

/**
 * @swagger
 * /api/getIndicencias/{id}:
 *   get:
 *     summary: Obtiene una incidencia por su id
 *     description: Obtiene una incidencia por su id.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id de la incidencia a buscar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Incidencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Incidencia'
 *       404:
 *         description: Incidencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: Incidencia no encontrada
 *       500:
 *         description: Error al obtener la incidencia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: Error al obtener la incidencia
 *     tags:
 *       - Incidencias
 */
router
    .route('/api/getIndicencias/:id')
    .get(ctrlIncidencias.getIndicenciasByid);
/**
 * @swagger
 * tags:
 *   name: Incidencias
 *   description: Endpoints para operaciones relacionadas con las incidencias
 */

/**
 * @swagger
 * /api/suscribirIncidenciaByID:
 *   post:
 *     summary: Suscribir un usuario a una incidencia
 *     tags:
 *       - Incidencias
 *     requestBody:
 *       description: Datos del usuario y de la incidencia a la que se quiere suscribir
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               incidencia:
 *                 type: string
 *                 description: Identificador único de la incidencia
 *     responses:
 *       '200':
 *         description: Suscripción exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Suscripción exitosa
 *       '400':
 *         description: El usuario ya está suscrito a este tipo de incidencia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: El usuario ya está suscrito a este tipo de incidencia
 *       '404':
 *         description: Usuario o incidencia no encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario o incidencia no encontrados
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno del servidor
 */
router
    .route('/api/suscribirIncidenciaByID')
    .post(ctrlIncidencias.suscribirIncidenciaById);
/**
 * @swagger
 * /api/suscribirIncidenciaByTipo:
 *   post:
 *     tags:
 *       - Incidencias
 *     summary: Suscribir a un usuario a todas las incidencias de un tipo (["Afecciones Importantes", "Cortes de Tráfico", "Cortes de Agua"]) dado
 *     requestBody:
 *       description: Datos necesarios para suscribir al usuario a un tipo de incidencia
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               tipo_incidencia:
 *                 type: string
 *                 enum: ["Afecciones Importantes", "Cortes de Tráfico", "Cortes de Agua"]
 *             example:
 *               email: "opalacin@gmail.com"
 *               tipo_incidencia: "Cortes de Tráfico"
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *             example:
 *               mensaje: "Suscripción exitosa"
 *               usuario:
 *                 _id: "6157d906c45aee5c52c7ef3c"
 *                 nombre: "Juan"
 *                 email: "juan@gmail.com"
 *                 tipo_incidencia:
 *                   - "Afecciones Importantes"
 *                   - "Cortes de Tráfico"
 *       '400':
 *         description: Petición mal formada o tipo de incidencia no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "Tipo de incidencia no válido"
 *       '404':
 *         description: Usuario no encontrado o no se encontraron incidencias del tipo dado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "Usuario no encontrado"
 *       '500':
 *         description: Error interno del servidor
 */
router
    .route('/api/suscribirIncidenciaByTipo')
    .post(ctrlIncidencias.suscribirIncidenciaByTipo);

/**
 * @swagger
 *   /api/getIncidenciasByTipo/{tipo}:
 *     get:
 *       summary: Obtiene todas las incidencias del tipo especificado
 *       parameters:
 *         - in: path
 *           name: tipo
 *           description: Tipo de incidencia a buscar
 *           required: true
 *           schema:
 *             type: string
 *             enum:
 *               - Afecciones Importantes
 *               - Cortes de Tráfico
 *               - Cortes de Agua
 *       responses:
 *         "200":
 *           description: Lista de incidencias encontradas según el tipo
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Incidencia'
 *         "404":
 *           description: No se encontraron incidencias
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         "500":
 *           description: Error al obtener las incidencias
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *       tags:
 *          - Incidencias
 */
router
    .route('/api/getIncidenciasByTipo/:tipo')
    .get(ctrlIncidencias.getIncidenciasByTipo); //arreglar el example
/**
 * @swagger
 *   /api/getsuscripcionesByUsuario/{email}:
 *     get:
 *       tags:
 *         - Incidencias
 *       summary: Obtener las incidencias a las que está suscrito un usuario
 *       parameters:
 *         - name: email
 *           in: path
 *           description: Email del usuario
 *           required: true
 *           schema:
 *             type: string
 *             format: email
 *           example:
 *             email: usuario1@gmail.com
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Incidencia'
 *         '404':
 *           description: Usuario no encontrado
 *         '500':
 *           description: Error interno del servidor
 */
router
    .route('/api/getsuscripcionesByUsuario/:email')
    .get(ctrlIncidencias.getIncidenciasUsuario); //arreglar el get, sale un ejemplo raro, y el 200

/**
 * @swagger
 * tags:
 *   name: Foros
 *   description: Endpoints para operaciones relacionadas con los foros
 */

/**
 * @swagger
 * /api/suscribirForo:
 *   post:
 *     tags:
 *       - Foros
 *     summary: Suscribir a un usuario a un foro dado por su ID
 *     requestBody:
 *       description: Datos necesarios para suscribir al usuario a un foro
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               foro:
 *                 type: string
 *             example:
 *               email: "opalacin@gmail.com"
 *               foro: "17373"
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *             example:
 *               mensaje: "Suscripción exitosa"
 *               usuario:
 *                 _id: "6123c5fa70159b1d4c59f3b1"
 *                 email: "opalacin@gmail.com"
 *                 password: "123456"
 *                 bloqueado: false
 *                 incidencia: []
 *                 tipo_incidencia: []
 *                 foro: [
 *                   "17373",
 *                   "17537"
 *                 ]
 *                 fechaRegistro: "2023-05-13T15:28:13.086Z"
 *       '400':
 *         description: Petición mal formada o usuario ya suscrito al foro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "El usuario ya está suscrito a este foro"
 *       '404':
 *         description: Foro o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "Foro no encontrado"
 *       '500':
 *         description: Error interno del servidor
 */
router
    .route('/api/suscribirForo')
    .post(ctrlForos.suscribirForo);
/**
 * @swagger
 * /api/getForosUsuario/{email}:
 *   get:
 *     tags:
 *       - Foros
 *     summary: Obtener los foros suscritos por un usuario dado su email
 *     parameters:
 *       - in: path
 *         name: email
 *         description: Email del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Foro'
 *             example:
 *               - "17373"
 *               - "17537"
 *               - "17564"
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *             example:
 *               mensaje: "Usuario no encontrado"
 *       '500':
 *         description: Error interno del servidor
 */
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

