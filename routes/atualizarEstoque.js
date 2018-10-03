var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req, res) {
    var connection = db();
    var codigo = req.body.cd_produto;
    var descricao = req.body.ds_produto;
    var quantidade = req.body.qt_produto;

    connection.query("SELECT qt_produto from estoque where cd_produto ="+codigo+"", function(error, result) {
        if (error){ throw error;}
        else{
            var vl_baixo = result[0].qt_produto;
            var res= vl_baixo - quantidade;
            if( vl_baixo - quantidade >= 0){
                connection.query("UPDATE estoque set qt_produto = qt_produto -"+ quantidade +"where cd_produto  ="+codigo+"",
                function(error, result){
                if (error) throw error;
                                   console.log("Atualizado!");
                                });
               
        }
        
                   
                            });  
                        });  
module.exports = router;