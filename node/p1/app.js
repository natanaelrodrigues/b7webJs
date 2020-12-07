const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./helpers');
const errorHendler = require('./handlers/errorHandler');


// configurações
const app = express();

//criação de helpers
app.use((req, res, next)=>{
    res.locals.h = helpers;
   //res.locals.titlePage = "Pagina padrão";
    next();
});

// retorna o post em forma de objeto.
app.use(express.json());


app.use('/', router);

app.use(errorHendler.notFound);


app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname + '/views');

module.exports = app;