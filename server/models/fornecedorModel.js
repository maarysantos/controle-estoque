var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.insereNovoFornecedor = (formfornecedor, req, res, next)=>{
  var connection = db();

  connection.query("insert into fornecedor set ?", formfornecedor, function(err, result) {

    if(err){console.error(err);

    }else{

      res. redirect('/novofornecedor');

    }
  });
}

module.exports.listaFornecedores = (req, res, next) =>{
  var connection = db();

  connection.query("select cd_fornecedor, nm_fantasia, nm_vendedor, cd_telvendedor from fornecedor",  function(err, result) {

    if(err){throw err};
      let usuario = req.session.nome;
      res.render('fornecedores', {usuario:usuario, fornecedores: result});

  });
};

module.exports.deleteFornecedor = (id, req, res,next) =>{
  var connection = db();

  connection.query("Delete from fornecedor where cd_fornecedor= ?", id, function(error, result){
    if (error){throw error;}
    /*Continuar implementando aqui*/

  });
};