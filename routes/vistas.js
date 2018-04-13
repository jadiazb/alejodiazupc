var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* GET home page. */
router.get('/', function (req, res, next) {

  models.Semilleros.findAll()
    .then((lista) => {
      console.log(lista);
      res.render('index', {info:lista});
    })
    .catch(
      (error) => {
        console.log(error);
        res.render('error');
      }
    );
});

router.get('/listaSemilleros', function(req, res, next){
  res.render('listaSemilleros');
});

router.get('/crearSemillero', function(req, res, next){
  res.render('crearSemillero');
});

module.exports = router;
