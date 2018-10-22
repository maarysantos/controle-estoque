var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.carregarPagProduto = (req, res) =>{
    var connection = db();
    connection.query("insert into estoque set ?", formproduto, function(err, result) {
        if(err){
            console.error(err);
        }else{
            res.redirect('novoproduto')
        }
    });
  
}

module.exports.inserirProduto = (formproduto, req, res) =>{
    var connection = db();
    connection.query("insert into estoque set ?", formproduto, function(err, result) {
        if(err){
            console.error(err);
        }else{
            res.redirect('novoproduto')
        }
    });
  
}