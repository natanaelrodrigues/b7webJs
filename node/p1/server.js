const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

// conexão com o banco de dados.
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error',()=>{
    console.error("ERRO:" + error.message);
})

//seta a porta do node.
app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'),()=>{
    console.log("Servidor rodando na porta: " + server.address().port);
});