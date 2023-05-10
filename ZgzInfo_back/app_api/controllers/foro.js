const mongoose = require('mongoose');
const Foro = mongoose.model('Foro');
const Usuario = mongoose.model('Usuario');
const Comentario = mongoose.model('Comentario');

//http://localhost:3000/api/getForosByid/17373
const getForosByid = async (req, res) => {
    try {
        const foro = await Foro.findOne({ id: req.params.id }).populate({
            path: "comentarios",
            populate: { path: "usuario" },
        });
        if (!foro) {
            return res.status(404).send({ message: "Foro no encontrado" });
        }
        const comentarios = foro.comentarios.map((comentario) => {
            return {
                usuario: comentario.usuario.email,
                comentario: comentario.comentario,
            };
        });
        const response = {
            id: foro.id,
            tipo: foro.tipo,
            titulo: foro.titulo,
            comentarios: comentarios,
        };
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al obtener el foro" });
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
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
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

//POST http://localhost:3000/api/comentarForo
/*
{
  "foro": "17373",
  "comentario": "me ha encantado",
  "email": "javi23@gmail.com"
}
 */
const comentarForo = async (req, res) => {
    const { foro, comentario, email } = req.body;
    try {
        // Buscar foro por su ID
        const foroEncontrado = await Foro.findOne({ id: foro });
        if (!foroEncontrado) {
            return res.status(404).json({ mensaje: 'Foro no encontrado' });
        }
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Crear un nuevo comentario
        const nuevoComentario = new Comentario({
            usuario: usuario,
            comentario: comentario
        });
        await nuevoComentario.save();
        // Actualizar la lista de comentarios del foro
        if (foroEncontrado.comentarios) {
            foroEncontrado.comentarios.push(nuevoComentario._id);
        } else {
            foroEncontrado.comentarios = [nuevoComentario._id];
        }
        await foroEncontrado.save();
        // Devolver una respuesta exitosa
        return res.json({ mensaje: 'Comentario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};



//GET  /api/grafica/NumForosTipo
const NumForosTipo = async (req, res) => {
        try {
          const usuarios = await Usuario.find().populate('foro');
          const suscripcionesPorTipo = { "Cortes de Agua": 0, "Cortes de Tráfico": 0, "Afecciones Importantes": 0 };
      
          usuarios.forEach(usuario => {
            usuario.foro.forEach(foro => {
              suscripcionesPorTipo[foro.tipo]++;
            });
          });
      
          res.json(suscripcionesPorTipo);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error al obtener el número de usuarios suscritos por tipo de foro' });
        }
  };

module.exports = {
    suscribirForo,
    getForosUsuario,
    getForosByid,
    NumForosTipo,
    comentarForo
};
  