var express = require('express');
var db = require('../db');
var router = express.Router();


  router.get('/', function(req,res){

    if (req.session.autorizado){ 
      var usuario = req.session.nome;    
      res.render('home', {usuario : usuario});
  } else{
    res.redirect('/');
    }
      });

      router.get('/sair', function(req, res){
        req.session.destroy(function(err){
          res.render('/');
      });

      });;

      module.exports=router;
