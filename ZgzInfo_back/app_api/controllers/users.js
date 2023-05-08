const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

/*
* POST /api/register
* { "email": "juli@gmail.com",
    "password": "lololo"
  }
*/
const userCreate = async (req, res) => {
    const {email, password} = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({email: email});
        if (usuarioEncontrado) {
            return res.status(404).json({mensaje: 'usuario ya registrado encontrada'});
        }
        const newUser = new Usuario({
            email: email,
            password: password
        });
        await newUser.save();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


// PUT /api/register/:userId
const userUpdate = async (req, res) => {
    console.log(`id ${req.params.userId}`);
    console.log(`password ${req.body.password}`);
    if (!req.params.userId) {
        res.status(404).json({
            "message": "Not found, userId is required"
        });
        return;
    }
    //const user = await user.findById(req.params.userId).exec();
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
                user.password = req.body.password;
                console.log(`hemos cambiado la contraseña ${user.password}`);
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
};


// GET /api/login/:userId
const userLogin = async (req, res) => {
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
                console.log('Usuario  encontrado');
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "message": "Internal server error"
            });
        });
};




//GET  /api/grafica/NumUsuariosIncidencia
const NumUsuariosIncidencia = async (req, res) => {
    try {
      const numUsuariosIncidencia = await Usuario.aggregate([
        {
          $lookup: {
            from: "incidencias",
            localField: "incidencia",
            foreignField: "_id",
            as: "incidencias"
          }
        },
        {
          $unwind: "$incidencias"
        },
        {
          $group: {
            _id: "$incidencias.tipo",
            count: { $sum: 1 }
          }
        }
      ]);
      res.status(200).json(numUsuariosIncidencia);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el número de usuarios por incidencia." });
    }
};


module.exports = {
    userCreate,
    userUpdate,
    userLogin,
    NumUsuariosIncidencia
};
