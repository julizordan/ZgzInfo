const mongoose = require('mongoose');
const Foro = mongoose.model('Foro');
const User = mongoose.model('Usuario');

//GET /api/incidencia/{incidenciaId}/foros

//POST /api/incidencias/{incidenciaId}/foros
// POST /api/register

const listarForos =  async (req, res) => {
    try {
        const userId = req.params.userId;
    
        // Buscar el usuario por su ID
        const usuario = await User.findById(userId);
        if (!usuario) {
          return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Buscamos los foros en los que está suscrito el usuario
        const foros = await Foro.find({ suscritos: usuario });

        // Devolvemos los foros encontrados
        res.send(foros);

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al buscar los foros suscritos del usuario' });
      }   
};

const suscribeForo =  async (req, res) => {
    try {
        const userId = req.params.userId;
        const foroId = req.params.foroId;
        // Buscar el usuario por su ID
        const usuario = await User.findById(userId);
        if (!usuario) {
          return res.status(404).send({ message: 'Usuario no encontrado' });
        }
        // Buscar el foro por su titulo que se su id
        const foro = await Foro.findById(foroId);
        if (!foro) {
          return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Agregamos al usuario a la lista de suscritos del foro
        foro.suscritos.push(usuario);
        await foro.save();
        // Devolvemos el foro actualizado como respuesta de la solicitud
        res.send(foro);

      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al buscar los foros suscritos del usuario' });
    }   
};

module.exports = {
    listarForos,
    suscribeForo
};
  