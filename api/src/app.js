const express = require('express');
const cookieParser = require('cookie-parser');
const setHeaders = require("./middlewares/setHeaders");
const errorHandler = require("./middlewares/errorHandler");
const bodyParser = require('body-parser');
const morgan = require('morgan');


//require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
//server.use(morgan('dev'));
//Middleware para setear los headers
server.use(setHeaders);
//En el archivo index.js coloco las rutas
server.use('/api', require("./routes/index"));
//Middleware de manejo de eventuales errores
server.use(errorHandler);

module.exports = server;
