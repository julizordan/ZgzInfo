const mongoose = require('mongoose');
const Foro = mongoose.model('Foro');
const Usuario = mongoose.model('Usuario');

//http://localhost:3000/api/getForosByid/17401
const getForosByid = async (req, res) => {
    try {
        const foro = await Foro.find({id: req.params.id});
        if (!foro) {
            return res.status(404).send({message: 'Foro no encontrado'});
        }
        res.send(foro);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error al obtener el foro'});
    }
};
//POST http://localhost:3000/api/suscribirForo
/*
{
  "email": "opalacin@gmail.com",
  "foro": "17373"
}
 */
const suscribirForo =  async (req, res) => {
    const { email, foro } = req.body;
    try {
        console.log(foro);
        // Buscar foro por su ID
        const foroEncontrado = await Foro.findOne({ id: foro });
        if (!foroEncontrado) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Verificar si el usuario ya está suscrito a la incidencia
        if (usuario.foro.includes(foroEncontrado._id)) {
            return res.status(400).json({ mensaje: 'El usuario ya está suscrito a este foro' });
        }
        // Agregar la incidencia a la lista de incidencias suscritas del usuario
        usuario.foro.push(foroEncontrado._id);
        await usuario.save();
        return res.json({ mensaje: 'Suscripción exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

//http://localhost:3000/api/getsuscripcionesByUsuario/opalacin@gmail.com
const getForosUsuario = async (req, res) => {
    try {
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email: req.params.email});
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        let listaForos = [];
        tam = usuario.foro.length;
        for(let i = 0; i < tam; i++){
            let foro = await Foro.findById(usuario.foro[i]);
            listaForos.push(foro);
        }
        res.send(listaForos);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

//POST http://localhost:3000/api/suscribirForo
/*
{
  "email": "opalacin@gmail.com",
  "foro": "17373"
}
 */
/*const comentarForo =  async (req, res) => {
    const { email, foro } = req.body;
    try {
        console.log(foro);
        // Buscar foro por su ID
        const foroEncontrado = await Foro.findOne({ id: foro });
        if (!foroEncontrado) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Verificar si el usuario ya está suscrito a la incidencia
        if (usuario.foro.includes(foroEncontrado._id)) {
            return res.status(400).json({ mensaje: 'El usuario ya está suscrito a este foro' });
        }
        // Agregar la incidencia a la lista de incidencias suscritas del usuario
        usuario.foro.push(foroEncontrado._id);
        await usuario.save();
        return res.json({ mensaje: 'Suscripción exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};*/

module.exports = {
    suscribirForo,
    getForosUsuario,
    getForosByid
};
  