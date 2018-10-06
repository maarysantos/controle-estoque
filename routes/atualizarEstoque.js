var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req, res) {
    var connection = db();
    var formvenda = req.body;
    var codigo = req.body.produto_cd_produto;
    var descricao = req.body.ds_produto;
    var quantidade = req.body.qt_produto;
    var preco = req.body.vl_unitario;



    connection.query("INSERT into saida_produto set ?",formvenda
     ,function(error, result) {
        if (error) console.log(error);
        });


/*   connection.query("SELECT qt_produto from estoque where cd_produto ="+codigo+"", function(error, result) {
    if (error){ console.log(error);} else{
    var qt_produto = result[0].qt_produto;
    var res = qt_produto - quantidade;
    if(res>=0){
    
    connection.query('UPDATE estoque SET qt_produto = ? WHERE cd_produto = ?', [res, codigo], function (error, results, fields) {
        if (error) throw error;
       console.log('ola')
      });
    }     else{

        console.log("Não há produtos disponiveis em estoque");
    }                   
    }
                                });*/
                                
                            });
                       
module.exports = router;