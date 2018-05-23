var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Modelos de la Base de Datos
var models = require("./models/index");

var index = require('./routes/vistas');

//Vinculo las rutas
var semilleros = require('./routes/semilleros');
var publicaciones = require('./routes/publicaciones');

//Passport
var passport = require('passport');
var session = require('express-session');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport Configuration
app.use(session(
  {
    secret: "Programacion Web Unipiloto",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 60 * 1000
    },
    rolling: true
  }
));

//Passport Definition

app.use(passport.initialize());
app.use(passport.session());



app.use('/', index);
app.use('/semilleros', semilleros);
app.use('/publicaciones', publicaciones);

//Enviar a la configuración de la estrategia
require('./config/passportStrategy')(passport, models.usuarios);


//Sincronización de la Base de Datos
models.sequelize.sync().then(
  function(){
    console.log("Enhorabuena! Se conectó a la BD!!!");
  }
).catch(
  function(error){
    console.log("Error en la conexión: " +error);
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
