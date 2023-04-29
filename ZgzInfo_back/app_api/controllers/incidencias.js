const axios = require('axios');
const mongoose = require('mongoose');
const Incidencia = mongoose.model('Incidencia');
const Foro = mongoose.model('Foro');
const Usuario = mongoose.model('Usuario');

// GET /api/incidenciasLista
const incidenciasLista = async (req, res) => {
    try {
        const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia.json?');
        const tam = Object.keys(response.data.result).length;
        const listaIncidencias = [];
        let inserted = false;
        for (let i = 0; i < tam; i++) {
            const newForo = new Foro({
                id: response.data.result[i].id,
                titulo: response.data.result[i].title,
                tipo: response.data.result[i].tipo.title,
                comentarios: null
            });
            await newForo.save();
            const getIncidencia = new Incidencia({
                id: response.data.result[i].id,
                tipo: response.data.result[i].tipo.title,
                titulo: response.data.result[i].title,
                inicio: response.data.result[i].inicio,
                fin: response.data.result[i].fin,
                motivo: response.data.result[i].motivo || 'Motivo no especificado',
                calle: response.data.result[i].calle,
                coordenadaX: response.data.result[i].geometry?.coordinates[0] || null,
                coordenadaY: response.data.result[i].geometry?.coordinates[1] || null,
                foro: newForo
            });
            listaIncidencias.push(getIncidencia);
            const newIncidencia = await Incidencia.findOne({id: getIncidencia.id});
            if (!newIncidencia) {
                await getIncidencia.save();
                inserted = true;
            }
        }
        if (listaIncidencias.length || inserted) {
            console.log(`Se han guardado ${listaIncidencias.length} incidencias en la base de datos`);
            res.send(listaIncidencias);
        } else {
            console.log(`No se ha insertado ninguna nueva incidencia en la base de datos`);
            res.send([]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


//http://localhost:3000/api/getIndicenciasid/17401
const getIndicenciasByid = async (req, res) => {
    try {
        const incidencia = await Incidencia.find({id: req.params.id});
        if (!incidencia) {
            return res.status(404).send({message: 'Incidencia no encontrada'});
        }
        res.send(incidencia);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error al obtener la incidencia'});
    }
};

//http://localhost:3000/api/getIncidenciasByTipo/Afecciones Importantes
const getIncidenciasByTipo = async (req, res) => {
    try {
        const incidencia = await Incidencia.find({tipo: req.params.tipo});
        if (!incidencia) {
            return res.status(404).send({message: 'Incidencia no encontrada'});
        }
        res.send(incidencia);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error al obtener la incidencia'});
    }
};
//POST http://localhost:3000/api/suscribirIncidencia
/*
{
  "email": "opalacin@gmail.com",
  "incidencia": "17373"
}
 */
const suscribirIncidencia = async (req, res) => {
    const { email, incidencia } = req.body;
    try {
        console.log(incidencia);
        // Buscar la incidencia por su ID
        const incidenciaEncontrada = await Incidencia.findOne({ id: incidencia });
        if (!incidenciaEncontrada) {
            return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
        }
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        // Verificar si el usuario ya está suscrito a la incidencia
        if (usuario.incidencia.includes(incidenciaEncontrada._id)) {
            return res.status(400).json({ mensaje: 'El usuario ya está suscrito a esta incidencia' });
        }
        // Agregar la incidencia a la lista de incidencias suscritas del usuario
        usuario.incidencia.push(incidenciaEncontrada._id);
        await usuario.save();
        return res.json({ mensaje: 'Suscripción exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
//http://localhost:3000/api/getsuscripcionesByUsuario/opalacin@gmail.com
const getIncidenciasUsuario = async (req, res) => {
    try {
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email: req.params.email});
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        let listaIncidencias = [];
        tam = usuario.incidencia.length;
        for(let i = 0; i < tam; i++){
            let incidencia = await Incidencia.findById(usuario.incidencia[i]);
            listaIncidencias.push(incidencia);
        }
        res.send(listaIncidencias);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
module.exports = {
    incidenciasLista,
    getIndicenciasByid,
    getIncidenciasByTipo,
    suscribirIncidencia,
    getIncidenciasUsuario
};




  