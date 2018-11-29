var mysql = require('mysql');
var db = require('../db');
var express = require('express');



module.exports.carregaRelatorio = (form,req, res, next) => {
        var connection = db();

      if (req.body.reportControl = 1){
        connection.query("SELECT estoque_cd_produto, ds_produto, sum(qt_produto) as qt_soma FROM saida_produto GROUP BY estoque_cd_produto;", function(error, result){
        if(error){throw error};
        console.log(result);
        res.render('relatorio', {produtos: result, title:'Produtos Mais Vendidos'});
        
      });

      if (req.body.reportControl = 2){
        connection.query("SELECT estoque_cd_produto, ds_produto, sum(qt_produto) as qt_soma FROM saida_produto GROUP BY estoque_cd_produto ORDER BY sum(qt_produto) DESC;", function(error, result){
          if(error){throw error};
          res.render('relatorio', {produtos: result, title:'Produtos Menos Vendidos'});
         
        })
      }

      if(req.body.reportControl = 3){
        connection.query("Select cd_produto, ds_produto, qt_produto as qt_soma from estoque order by qt_produto DESC", function (error, result){
          if(error){throw error};
        res.render('relatorio', {produtos:result, title:'Produtos com Estoque Mínimo'})
  
        })
      }
    };

    

   

}


