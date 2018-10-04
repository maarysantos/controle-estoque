var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req, res) {
    var connection = db();
    var codigo = req.body.cd_produto;
    var descricao = req.body.ds_produto;
    var quantidade = req.body.qt_produto;

    connection.query("SELECT qt_produto from estoque where cd_produto ="+codigo+"", function(error, result) {
        if (error){ console.log(error);}
        else{
            var qt_saida = result[0].qt_produto;
            var res= qt_saida - quantidade;
            console.log(res);
            if( res >= 0){
                
                connection.query("UPDATE estoque set qt_produto=:Saida where cd_produto=:Codigo", {Saida: qt_saida, Codigo:codigo },
                function(error, result){
                if (error) throw error;
                                   console.log("Atualizado!");
                                });
               
        }
    }
                   
                            });  
                        });  
module.exports = router;