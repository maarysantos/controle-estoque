var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.carregaDespesaLoja = ( req, res, next)=>{
    var connection = db();
    let usuario= req.session.nome;
    connection.query("select * from despesa", function(err, result) {
      if(err){console.error(err)};
        console.log(result);
        res.render('despesaLoja', {usuario:usuario, despesa:result});
      });
  }
  