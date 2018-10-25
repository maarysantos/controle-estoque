var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.inserirNovoFornecedor = (formvendedor, req, res, next) =>{
    if (req.session.autorizado){ 
        var connection = db();
        connection.query("SELECT nm_tipo_embalagem FROM tipo_embalagem", function(error, result){
            res.render('novoproduto', {usuario : usuario, tipo_embalagem:result});
        });
    } else{
      res.redirect('/');
      }
    }