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
   
    connection.query("SELECT nm_usuario from usuario where nm_usuario ='"+nome+"' and nm_senha="+ senha+"", 
    function(error, result) {
      if(error){throw error;}
      
        if (result[0].nm_usuario =! undefined ){
            req.session.autorizado = true;
            req.session.nome= result[0].nm_usuario;
 
            res.redirect('novoproduto');
          }
      });
      
  });
  
  router.get('/sair', function(req,res){
    req.session.destroy(function(err){
        res.redirect('/');
   
});
});

module.exports=router;