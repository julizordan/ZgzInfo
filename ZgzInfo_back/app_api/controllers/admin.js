const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const Comentario = mongoose.model('Comentario');
const Foro = mongoose.model('Foro');
const Incidencia = mongoose.model('Incidencia');


//GET  /api/admin/listadoUsuarios

const listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find({}, 'nombre apellido email'); // obtener todos los usuarios y solo seleccionar nombre, apellido y correo
      res.status(200).json(usuarios); // responder con un objeto JSON que contiene la lista de usuarios
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
    }
  }

// PUT /api/admin/{userId}/bloquear
const bloquearUsuario = async (req, res) => {
    console.log(`id ${req.params.userId}`);
    if (!req.params.userId) {
        res.status(404).json({
            "message": "Not found, userId is required"
        });
        return;
    }
      Usuario.findById(req.params.userId)
      .exec()
      .then(user => {
          if (!user) {
              console.log('Usuario no encontrado');
              res.status(404).json({
                  "message": "userId not found"
              });
              return;
          } else {
              user.bloqueado = true;
              console.log(`Usuario bloqueado correctamente`);
              const savedUser = user.save();
              res.status(200).json(savedUser);
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              "message": "Internal server error"
          });
      });
}

//GET  /api/admin/{userId}/listadoMensajes
const listadoMensajes = async (req, res) => {
    if (!req.params.userId) {
        res.status(404).json({
            "message": "Not found, userId is required"
        });
        return;
    }

  try {
    const usuario = await Usuario.findById(req.params.userId);
    const comentarios = await Comentario.find({ usuario: req.params.userId });
    return res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener los mensajes del usuario' });
  }

}

// DELETE /api/admin/{userId}/eliminarMensaje
const eliminarMensaje = async (req, res) => {
    if (!req.params.userId) {
        res.status(404).json({
            "message": "Not found, userId is required"
        });
        return;
    }

  try {
    const usuario = await Usuario.findById(req.params.userId);
    // Eliminar todos los comentarios asociados al usuario
    await Comentario.deleteMany({ usuario: usuario._id });
    res.status(200).json({ message: 'Comentarios eliminados exitosamente' })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al eliminar  mensajes del usuario' });
  }

}

//GET  /api/admin/listadoForos
const listarForos = async (req, res) => {
    try {
        const foros = await Foro.find({}, { tipo: 1, titulo: 1 });
        res.status(200).json(foros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los foros' });
    }
  }

 // DELETE  /api/admin/{idForo}/eliminar

const eliminarForo = async (req, res) => {
    if (!req.params.idForo) {
        res.status(404).json({
            "message": "Not found, foroId is required"
        });
        return;
    }
  try {
    await Foro.findByIdAndRemove(req.params.idForo);
    // Devolver respuesta exitosa
    res.json({ mensaje: 'Foro eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al eliminar el foro' });
  }

}

//GET  /api/admin/grafica
const numeroIncidenciasTipo = async (req, res) => {
    try {
        const incidenciasPorTipo = await Incidencia.aggregate([
          {
            $group: {
              _id: "$tipo",
              count: { $sum: 1 }
            }
          }
        ]);
        res.status(200).json(incidenciasPorTipo);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener las incidencias por tipo." });
      }
  }

  
  module.exports = 
  { listarUsuarios,
    bloquearUsuario,
    listadoMensajes,
    eliminarMensaje,
    listarForos,
    eliminarForo,
    numeroIncidenciasTipo
  };