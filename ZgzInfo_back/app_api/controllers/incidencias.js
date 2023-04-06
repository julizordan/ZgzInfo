const axios = require('axios');
const mongoose = require('mongoose');
const Incidencia = mongoose.model('Incidencia');

/*
// GET /api/incidencias
const incidenciasLista =  async (req, res) => {
  try {
    // Hacer la petición HTTP a la fuente de datos
    const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia');

    // Extraer todas las incidencias¿?
    //const incidencias = response.data.filter(incidencia => incidencia.tipo === 'TRAFICO');

    // Enviar la lista de incidencias como respuesta
    res.send(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};*/

// GET /api/incidencias
const incidenciasLista =  async (req, res) => {
  try {
    // Hacer la petición HTTP a la fuente de datos
    const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia');

    // Guardar las incidencias en la base de datos
    //await Incidencia.create(response.data);

    // Enviar la lista de incidencias como respuesta
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// GET /api/incidencias/:calle
const incidenciasLisatCalle =  async (req, res) => {
    try {
      const calle_par = req.params.calle;
  
      // Hacer la petición HTTP a la fuente de datos
      const response = await axios.get('https://www.zaragoza.es/sede/servicio/via-publica/incidencia');
      
     // const filtradas = response.data.result.filter(incidencia => incidencia.includes(calle_par.toUpperCase()));
      const filtradas = response.data.result.filter(incidencia => incidencia.calle.includes(`${calle_par}`));


      res.send(filtradas);
      
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };
  
  module.exports = {
    incidenciasLista,
    incidenciasLisatCalle
  };
  
  
  
  
  