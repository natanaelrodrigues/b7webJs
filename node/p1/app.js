const express = require('express');
const mustache = require('mustache-express');
const router = require('./routes/index');
const helpers = require('./helpers');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;


const errorHendler = require('./handlers/errorHandler');
const { autocrop } = require('jimp');
const { appendConstructorOption } = require('jimp');

// configurações
const app = express();


// retorna o post em forma de objeto.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// configuração public como pagina estática
app.use(express.static(__dirname + '/public'));

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//criação de helpers
app.use((req, res, next)=>{
    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user;
    next();
});



const User = require('./models/User');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);


app.use('/', router);

app.use(errorHendler.notFound);


app.engine('mst',mustache(__dirname+'/views/partials','.mst'));
app.set('view engine','mst');
app.set('views',__dirname + '/views');

module.exports = app;