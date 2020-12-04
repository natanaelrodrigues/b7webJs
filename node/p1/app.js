const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');



// configurações
const app = express();
app.use('/', router);

// retorna o post em forma de objeto.
app.use(express.json());

app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname + '/views');

module.exports = app;