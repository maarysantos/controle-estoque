var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.getPagNovoProduto = (usuario, req, res, next) =>{
    var connection = db();

    connection.query("SELECT nm_tipo_embalagem FROM tipo_embalagem", function(error, result){
      res.render('novoproduto', {usuario : usuario, tipo_embalagem_nm_tipo_embalagem : result, msg:{}});

    });

};


module.exports.inserirProduto = (formproduto, req, res) =>{
  var connection = db();

  connection.query("insert into estoque set ?", formproduto, function(err, result) {
    if(err){throw(err);

    } else {

      connection.query("SELECT nm_tipo_embalagem FROM tipo_embalagem", function(error, result){

        if (err){throw err};

         let msg="Produto cadastrado com sucesso!";
         let usuario = req.session.nome;
    
         res.render('novoproduto', {usuario : usuario, tipo_embalagem_nm_tipo_embalagem : result, msg:msg});

      });
    }
  });
};

module.exports.buscadorTypeAhead = (key, req, res) =>{

  var connection = db();

  connection.query('SELECT * from estoque where cd_produto like "%'+key+'%" or ds_produto like "%'+key+'%"',
    function(err, rows, fields) {

      if (err){ throw err};

      var data=[];

      for(i=0;i<rows.length;i++){
            
        let { cd_produto,cd_ncm, ds_produto,qt_produto, vl_unitario, vl_total, tipo_embalagem_nm_tipo_embalagem} = rows[i];
        data.push({ cd_produto,cd_ncm, ds_produto,qt_produto, vl_unitario, vl_total, tipo_embalagem_nm_tipo_embalagem});

      }

      res.end(JSON.stringify(data));

  });

};
    
module.exports.atualizarEstoque = (formvenda, codigo, quantidade, req, res) =>{ 
  let usuario = req.session.nome;
  var connection = db();

  connection.query("SELECT qt_produto from estoque where cd_produto ="+codigo+"", function(error, result) {
   
    if (error){ console.log(error);} 
    var qt_produto = result[0].qt_produto;
    var resultado= qt_produto - quantidade;
    
    if (resultado >= 0) {
        connection.query('UPDATE estoque SET qt_produto = ? WHERE cd_produto = ?', [resultado, codigo], function (error, results, fields) {
          if (error) {throw error};
        });
            
        connection.query("INSERT into saida_produto set ?",formvenda,function(error, result) {
          if (error) {throw error};

          let msg="Produto atualizado com sucesso!";
          res.render('saidaproduto', {usuario : usuario, msg:msg});
        });
    }     

    if (resultado < 0){ 
          let msg="Não há produtos disponíveis no estoque!";
          res.render('saidaproduto', {usuario : usuario, msg:msg});
    }
  });
};
  
