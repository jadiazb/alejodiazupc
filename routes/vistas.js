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

module.exports = router;
