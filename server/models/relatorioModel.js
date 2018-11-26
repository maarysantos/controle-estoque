var mysql = require('mysql');
var db = require('../db');
var express = require('express');



module.exports.carregaRelatorio = (form,req, res, next) => {
        var connection = db();

      if (req.body.reportControl = 1){
        connection.query("Select estoque_cd_produto,ds_produto, qt_produto from saida_produto", function(error, result){
        if(error){throw error};
        console.log(result);
        res.render('relatorio');
      });
    

   

}

}
