var createError = require('http-errors');
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('./app_api/models/db');

const apiRoutes = require('./app_api/routes/index');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Zaragoza Info API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://16.16.99.97:8080",
            },
        ],
    },
    apis: ['./app_api/routes/*.js'],
};

//settings
var app = express();

//app.disable('x-powered-by','app_server','views');
app.disable('x-powered-by', 'views');
app.set('view engine', 'pug');

// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'pug');

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000,http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept');
    next();
});*/

app.use(cors({
    origin: [
      'http://zgzinfobucket1.s3-website.eu-west-3.amazonaws.com',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// deberia usarse esta app.use('/', indexRouter);
app.use('/', apiRoutes);
app.use('/api', apiRoutes);

app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
