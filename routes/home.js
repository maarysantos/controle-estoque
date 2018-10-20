var express = require('express');
var db = require('../db');
var router = express.Router();


  router.get('/', function(req,res){

    if (req.session.autorizado){ 
        res.redirect('/');
  } else{
          var usuario = req.session.nome;    
          res.render('home', {usuario : usuario});
    }
      });

      router.get('/sair', function(req, res){

        
      })
      module.exports=router;
