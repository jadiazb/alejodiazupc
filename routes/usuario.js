var express = require('express')
var router = express.Router()
var passport = require('passport');
var models = require('../models/index');


router.post('/iniciarSesion',function (req, res, next) {
    passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/'
    }, function (err, user, info) {

        if (err) {
    
            models.Semilleros.findAll()
            .then((lista) => {

                return res.render('index', { info: lista, messageInicio: err.message });
            })
            .catch((error) => {
                res.render('error');
            });

          
        }
    
        if (!user) {
            models.Semilleros.findAll()
            .then((lista) => {

                return res.render('index', { info: lista, messageInicio: info.message  });
            })
            .catch((error) => {
                res.render('error');
            });
          
        }
        return req.logIn(user, function (err) {
          if (err) {
            models.Semilleros.findAll()
            .then((lista) => {

                return res.render('index', { info: lista, messageInicio: err.message   });
            })
            .catch((error) => {
                res.render('error');
            });
          } else {    
            res.render("dashboard");            
          }
        });
      })(req, res, next)
});

router.post('/registrarUsuario',function (req, res, next) {
    passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/'
    }, function (err, user, info) {
        console.log(err);
        if (err) {
            models.Semilleros.findAll()
                .then((lista) => {

                    return res.render('index', { info: lista, message: err.message });
                })
                .catch((error) => {
                    res.render('error');
                });
             
          }
      
          if (!user) {
            models.Semilleros.findAll()
            .then((lista) => {

                return res.render('index', { info: lista, message: info.message });
            })
            .catch((error) => {
                res.render('error');
            });
            
            
          }else{
            models.Semilleros.findAll()
            .then((lista) => {

                return res.render('index', { info: lista, message: "Se ha creado el usuario" });
            })
            .catch((error) => {
                res.render('error');
            });  
          }
          
    })(req, res, next);
});

router.get('/CerrarSesion', function (req, res, next) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


module.exports = router
