const mongoose = require('mongoose');
// const dbURI = 'mongodb://127.0.0.1:27017/MyPlaces';
let dbURI = 'mongodb+srv://776390:perrito11@cluster0.br18wys.mongodb.net/ZgzInfo?retryWrites=true&w=majority';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}

mongoose.set('strictQuery', true);
// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

console.log(`About to connect to ${dbURI}`);

// Conectar a la base de datos
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongoose connected to ${dbURI}`);
    })
    .catch((error) => {
        console.error('Mongoose connection error:', error);
    });


mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./Usuario');
require('./Incidencia');
require('./Comentarios');
require('./Foro');