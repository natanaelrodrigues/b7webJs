const express = require('express');
const router = require('./routes/index')



// configurações
const app = express();
app.use('/', router);

// retorna o post em forma de objeto.
app.use(express.json());

module.exports = app;