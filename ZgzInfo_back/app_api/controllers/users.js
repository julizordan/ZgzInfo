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

module.exports = {
    userCreate,
    userUpdate,
    userLogin
};
