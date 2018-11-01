var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.validarUsuario = (nome, senha ,req, res) => {
  var connection = db();
  connection.query("SELECT nm_usuario from usuario where nm_usuario =? and nm_senha=?",[nome, senha],
  function(error, result){
    if(error){throw error;}
      
    if (result[0] != undefined ){
      req.session.autorizado = true;
      req.session.nome= result[0].nm_usuario;
      res.render('home', {usuario: req.session.nome});
    }
    else{
      res.redirect('/')
    }

  });
};

/*
<i class="fas fa-home"></i>home
<i class="fas fa-times"></i> sair
<i class="fas fa-truck"></i> --- fornecedor
<i class="fas fa-tag"></i> -- tag -- new produto
<i class="fas fa-shopping-bag"></i> -- saida produto
<i class="far fa-clipboard"></i> - relatorios
lucro <i class="fas fa-dollar-sign"></i>
*/
