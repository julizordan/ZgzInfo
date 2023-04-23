const axios = require('axios');
const mongoose = require('mongoose');
const Incidencia = mongoose.model('Incidencia');
const proj4 = require('proj4');

// GET /api/incidenciasLista
const incidenciasLista = async (req, res) => {
    const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia.json?')
        .then(response => {
            var tam = Object.keys(response.data.result).length
            const incidencias = [];
            for (let i = 0; i < tam; i++) {
                const insertarIncidencia = new Incidencia({
                    id: response.data.result[i].id,
                    tipo: response.data.result[i].tipo.title,
                    titulo: response.data.result[i].title,
                    inicio: response.data.result[i].inicio,
                    fin: response.data.result[i].fin,
                    motivo: response.data.result[i].motivo || 'Motivo no especificado',
                    calle: response.data.result[i].calle,
                    coordenadaX: response.data.result[i].geometry?.coordinates[0] || null,
                    coordenadaY: response.data.result[i].geometry?.coordinates[1] || null
                });
                incidencias.push(insertarIncidencia);
            }
            Promise.all(incidencias.map(incidencia => incidencia.save()))
                .then(() => console.log(`Se han guardado ${incidencias.length} incidencias en la base de datos`))
                .catch(error => console.error('Error al guardar las incidencias:', error));
            res.send(incidencias);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);
        });
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

// GET /api/mapa
const incidenciasMapa = async (req, res) => {
    try {
        // Hacer la petición HTTP a la fuente de datos
        const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia/conservacion-hoy');

        // Guardar los puntos de las incidencias  en la base de datos
        //await Incidencia.create(response.data)

        console.log(`cordenadas  ${response.data.result[1].geometry}`);
        // Enviar la lista de puntos de las  incidencias como respuesta
        res.send(response.data.result.map((incidencia) => incidencia.geometry));

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


// GET /api/mapa/:tipo
const incidenciasMapaTipo = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        console.log(`tipo  ${tipo}`);
        // Hacer la petición HTTP a la fuente de datos
        const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia/conservacion-hoy');

        /*
        if ( `${response.data.result[1].tipo.title}` === `${tipo}` ){
          //const filtradas = response.data.result.filter(incidencia => incidencia.tipo.title.includes(`${tipo}`));
          console.log(`tipossssss  ${response.data.result[1].tipo.id}`);
        }*/


        const filtradas = response.data.result.filter(incidencia => incidencia.tipo.title === (`${tipo}`));
        console.log(`filtradas  ${filtradas[1].geometry.type}`);

        res.send(filtradas.map(incidencia => incidencia.geometry));

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};
// POST /api/incidencias/{incidenciaId}/suscribir
const suscribirIncidencia = async (req, res) => {
    try {
        const incidenciaId = req.params.incidenciaId;
        const userId = req.params.userId;
        console.log(`id de incidencia   ${incidenciaId}`);
        console.log(`id de usuario   ${userId}`);

        // Buscar la incidencia por su ID
        const incidencia = await Incidencia.findById(incidenciaId);

        if (!incidencia) {
            return res.status(404).json({mensaje: 'Incidencia no encontrada'});
        }

        // Buscar el usuario por su ID
        const usuario = await user.findById(userId);
        if (!usuario) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
        }

        // Agregar el usuario a la lista de suscritos de la incidencia
        incidencia.suscritos.push(usuario);
        // Guardar los cambios en la base de datos
        await incidencia.save();
        res.json({mensaje: 'El usuario se ha suscrito a la incidencia exitosamente'});


    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};


module.exports = {
    incidenciasLista,
    getIndicenciasByid,
    incidenciasMapa,
    incidenciasMapaTipo,
    suscribirIncidencia
};




  