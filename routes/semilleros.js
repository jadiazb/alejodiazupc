let express = require('express');
let router = express.Router();
//Accedo al modelo de la base de datos
let models = require('../models/index')

router.get('/listaSemilleros', function(req,res){
    models.Semilleros.findAll().then(
        (lista)=>{
            res.json({"data": lista});
        }
    ).catch(
        (error)=>{
            res.json(error);
        }
    );
});

router.post('/crearSemillero', function(req,res){
    let infoSemillero = {
        "nombreSemillero": req.body.nombreSemillero,
        "descripcionSemillero": req.body.descripcionSemillero,
        "liderSemillero": req.body.liderSemillero
    };
    models.Semilleros.create(infoSemillero).then(
        (nuevoSemillero, infoCreacion)=>{
            res.json(nuevoSemillero);
        }
    ).catch(
        (error)=>{
            res.json(error);
        }
    );
});

router.get('/buscarSemillero/:id', function(req, res){
    let idSemillero = req.params.id;
    models.Semilleros.find(
        {
            where:{
                'idSemillero': idSemillero
            }
        }
    ).then(
        (semillero)=>{
            res.json(semillero);
        }
    ).catch(
        (error)=>{
            res.json(error);
        }
    );
});

router.get('/eliminarSemillero/:id', function(req, res){
    let idSemillero = req.params.id;
    models.Semilleros.find(
        {
            where:{
                'idSemillero': idSemillero
            }
        }
    ).then(
        (semillero)=>{
            semillero.destroy().then(
                ()=>{
                    res.json({'msg':'Se eliminó el registro'});
                }
            ).catch(
                (error)=>{
                    res.status(400).json(error);
                }
            );
        }
    ).catch(
        (error)=>{
            res.status(400).json(error);
        }
    );
});

router.post('/modificarSemillero', function(req, res){
    let idSemillero = req.body.idSemillero;
    let infoSemillero = {
        "nombreSemillero": req.body.nombreSemillero,
        "descripcionSemillero": req.body.descripcionSemillero,
        "liderSemillero": req.body.liderSemillero
    };
    models.Semilleros.find(
        {
            where:{
                'idSemillero': idSemillero
            }
        }
    ).then(
        (semillero)=>{
            semillero.updateAttributes(infoSemillero).then(
                (semillero)=>{
                    res.json({semillero});
                }
            );
        }
    ).catch(
        (error)=>{
            res.json(error);
        }
    );
});

module.exports = router;