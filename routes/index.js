var express = require('express');
var db = require('../db');

var router = express.Router();


  router.get('/', function(req,res){
          res.render('index');
          
      });

  router.post('/autenticar', function(req,res){
    let nome = req.body.txtNome;
    let senha = req.body.txtSenha;
    var connection = db();
    connection.query("SELECT nm_usuario, nm_senha from usuario where nm_usuario ='"+nome+"' and nm_senha="+ senha+"", 
    function(error, result) {
      if(error){throw error;}
          
      });
  });
  
module.exports=router;