var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.carregaTiposdeEmbalagem = (usuario, req, res, next) =>{
    if (req.session.autorizado){ 
        var connection = db();
        connection.query("SELECT nm_tipo_embalagem FROM tipo_embalagem", function(error, result){
            res.render('novoproduto', {usuario : usuario, tipo_embalagem:result});
        });
    } else{
      res.redirect('/');
      }
    }


module.exports.inserirProduto = (formproduto, req, res) =>{
    var connection = db();
    connection.query("insert into estoque set ?", formproduto, function(err, result) {
        if(err){
            console.error(err);
        }else{
            res.redirect('/novoproduto')
        }
    });
  
}

module.exports.buscadorTypeAhead = (key, req, res) =>{
    var connection = db();
    connection.query('SELECT * from estoque where cd_produto like "%'+key+'%" or ds_produto like "%'+key+'%"',
        function(err, rows, fields) {
            if (err) throw err;
            var data=[];
            for(i=0;i<rows.length;i++)
            {
                let { cd_produto, ds_produto,qt_produto, vl_unitario} = rows[i];
                data.push({ cd_produto, ds_produto,  qt_produto, vl_unitario });

            }
            res.end(JSON.stringify(data));
        });

};
    
module.exports.atualizarEstoque = (formvenda, codigo, quantidade, req, res) =>{ 
     var connection = db();

    connection.query("SELECT qt_produto from estoque where cd_produto ="+codigo+"", function(error, result) {
    if (error){ console.log(error);} else{
            
    var qt_produto = result[0].qt_produto;
    var res = qt_produto - quantidade;
    
            
    if(res>=0){
                
    connection.query('UPDATE estoque SET qt_produto = ? WHERE cd_produto = ?', [res, codigo], function (error, results, fields) {
    if (error) throw error;
                  
    });
            
    connection.query("INSERT into saida_produto set ?",formvenda,function(error, result) {
    if (error) throw error;
            
   });
              
    }else{
            
     /* res.render('saidaproduto', { msg: 'Não há produtos disponiveís no estoque' }, function(err, html){
    if(err)throw err;
                       
    })*/
   console.log('Não há produtos disponíveis no estoque')
    }                   
    }
     });
                                            
                                       
            

}
