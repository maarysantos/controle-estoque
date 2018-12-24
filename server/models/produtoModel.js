var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.getPagNovoProduto = ( req, res, next) =>{
    var connection = db();

      connection.query("SELECT cd_fornecedor, nm_fantasia from fornecedor", function(error, result){
        if(error){throw error};
        res.render('novoproduto', { dadosFor: result, msg:{}});
    });
};


module.exports.inserirProduto = (formproduto, req, res) =>{
  var connection = db();
  let dadosProd = {...formproduto};
  delete dadosProd.nm_fantasia;
  delete dadosProd.cd_nfe;
  delete dadosProd.dt_criacao;
  delete dadosProd.dt_emissao;

  let dadosNota = { ...formproduto};
  delete dadosNota.cd_produto;
  delete dadosNota.cd_ncm;
  delete dadosNota.ds_produto;
  delete dadosNota.qt_estoque;
  delete dadosNota.nm_embalagem;
  delete dadosNota.vl_unitario;
  delete dadosNota.vl_total;
  delete dadosNota.nm_fantasia;

  if (formproduto.nm_fantasia !=='-'){
    connection.query("insert into notafiscal set ?", dadosNota, function(err, result) {
      if(err){throw(err);}
  });
};


  connection.query("insert into produto set ?", dadosProd, function(err, result) {
    if(err){
      let msg='Produto já cadastrado no sistema';
      connection.query("SELECT cd_fornecedor, nm_fantasia from fornecedor", function(error, result){
        var fornecedores = result;
        res.render('novoproduto', { nm_fantasia: fornecedores, msg:msg});
    });
    };
    
         let msg="Produto cadastrado com sucesso!";

         connection.query("SELECT cd_fornecedor, nm_fantasia from fornecedor", function(error, result){
          var fornecedores = result;
          res.render('novoproduto', { nm_fantasia: fornecedores, msg:msg});
      });
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
          res.render('saidaproduto', {msg:msg});
        });
    }     

    if (resultado < 0){ 
          let msg="Não há produtos disponíveis no estoque!";
          res.render('saidaproduto', {msg:msg});
    }
  });
};
  
module.exports.editaProduto = (form, res, req, next) => {
 var dados = form;
 /*falta implementar*/

}