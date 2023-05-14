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
        const listaForos = [];
        let insertedI = false;
        let insertedF = false;
        for (let i = 0; i < tam; i++) {
            const getForo = new Foro({
                id: response.data.result[i].id,
                titulo: response.data.result[i].title,
                tipo: response.data.result[i].tipo.title,
                comentarios: null
            });
            listaForos.push(getForo);
            const newForo = await Foro.findOne({id: getForo.id});
            if (!newForo) {
                await getForo.save();
                insertedF = true;
            }
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
                foro: getForo
            });
            listaIncidencias.push(getIncidencia);
            const newIncidencia = await Incidencia.findOne({id: getIncidencia.id});
            if (!newIncidencia) {
                await getIncidencia.save();
                insertedI = true;
            }
        }
        if (insertedI || insertedF) {
            console.log(`Se han guardado ${listaIncidencias.length} incidencias en la base de datos`);
        } else {
            console.log(`No se ha insertado ninguna nueva incidencia en la base de datos`);
        }
        res.send(listaIncidencias);
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
  "incidencia": "Cortes de Tráfico"
}
 */
const suscribirIncidenciaById = async (req, res) => {
    const {email, incidencia} = req.body;
    try {
        console.log(incidencia);
        // Buscar la incidencia por su tipo
        const incidenciaEncontrada = await Incidencia.findOne({id: incidencia});
        if (!incidenciaEncontrada) {
            return res.status(404).json({mensaje: 'Incidencia no encontrada'});
        }
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
        }
        // Verificar si el usuario ya está suscrito al tipo incidencia
        if (usuario.incidencia.includes(incidenciaEncontrada.tipo)) {
            return res.status(400).json({mensaje: 'El usuario ya está suscrito a este tipo de incidencia'});
        }
        // Agregar la incidencia a la lista de incidencias suscritas del usuario
        usuario.incidencia.push(incidenciaEncontrada._id);
        await usuario.save();
        return res.json({mensaje: 'Suscripción exitosa', usuario});
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
//POST http://localhost:3000/api/suscribirIncidencia
/*
{
  "email": "opalacin@gmail.com",
  "tipo_incidencia": "Cortes de Tráfico"
}
 */
const suscribirIncidenciaByTipo = async (req, res) => {
    const { email, tipo_incidencia } = req.body;
    try {
        // Verificar que el tipo de incidencia es válido
        const tiposValidos = ["Afecciones Importantes", "Cortes de Tráfico", "Cortes de Agua"];
        if (!tiposValidos.includes(tipo_incidencia)) {
            return res.status(400).json({ mensaje: "Tipo de incidencia no válido" });
        }
        // Buscar las incidencias por su tipo
        const incidenciasEncontradas = await Incidencia.find({ tipo: tipo_incidencia });
        if (incidenciasEncontradas.length === 0) {
            return res.status(404).json({ mensaje: "Incidencias no encontradas" });
        }
        // Buscar el usuario por su email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        // Verificar si el usuario ya está suscrito a alguna de las incidencias
        const estaSuscrito = incidenciasEncontradas.some(incidencia => usuario.tipo_incidencia.includes(incidencia.tipo.toString()));
        if (estaSuscrito) {
            return res.status(400).json({ mensaje: "El usuario ya está suscrito a este tipo de incidencia" });
        }
        // Agregar las incidencias a la lista de incidencias suscritas del usuario, eliminando duplicados
        const nuevasIncidencias = incidenciasEncontradas.map(incidencia => incidencia.tipo.toString());
        const incidenciasUnicas = [...new Set([...usuario.tipo_incidencia, ...nuevasIncidencias])];
        usuario.tipo_incidencia = incidenciasUnicas.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        await usuario.save();
        return res.status(200).json({ mensaje: "Suscripción exitosa", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


//http://localhost:3000/api/getsuscripcionesByUsuario/opalacin@gmail.com
const getIncidenciasUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({email: req.params.email});
        if (!usuario) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
        }
        const tipos = usuario.tipo_incidencia;
        return res.status(200).json({tipo_incidencia: tipos});

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    incidenciasLista,
    getIndicenciasByid,
    getIncidenciasByTipo,
    suscribirIncidenciaById,
    suscribirIncidenciaByTipo,
    getIncidenciasUsuario
};




  