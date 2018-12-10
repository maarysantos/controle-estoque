var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.carregaDespesaLoja = ( req, res, next)=>{
    var connection = db();
    let usuario= req.session.nome;
    connection.query("select * from despesa where tipo_despesa_cd_tipo_despesa =1", function(err, result) {
      if(err){console.error(err)};
        console.log(result);
        res.render('despesaLoja', {usuario:usuario, despesa:result});
      });
  }

  module.exports.carregaDespesaPessoal = ( req, res, next)=>{
    var connection = db();
    let usuario= req.session.nome;
    connection.query("select * from despesa where tipo_despesa_cd_tipo_despesa =2", function(err, result) {
      if(err){console.error(err)};
        console.log(result);
        res.render('despesaLoja', {usuario:usuario, despesa:result});
      });
  }

  