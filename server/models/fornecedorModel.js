var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.insereNovoFornecedor = (formfornecedor, req, res, next)=>{

  var connection = db();

  connection.query("insert into fornecedor set ?", formfornecedor, function(err, result) {

    if(err){

      console.error(err);

    }else{

      res. redirect('/novofornecedor');

    }
    
  });

}
