var mysql = require('mysql');
var db = require('../db');

module.exports.getPagNovoProduto = ( req, res, next) =>{
    var connection = db();

      connection.query("SELECT cd_fornecedor, nm_fantasia from fornecedor", function(error, result){
        if(error){throw error};
        res.render('novoproduto', { dadosFor: result, msg:{}});
    });
};


module.exports.carregaSelectCdNota = (req, res, next) =>{
  var connection = db();
    connection.query("SELECT cd_nfe from notafiscal where fornecedor_cd_fornecedor = ?",req.body.fornecedor_cd_fornecedor, function(error, result){
      if(error){throw error};
      res.send(result);
  });
};


module.exports.inserirProduto = (formproduto, req, res) =>{
  var connection = db();
  
  let dadosProd = {...formproduto};
  delete dadosProd.nm_fantasia;
  delete dadosProd.cd_nfe;


  let data = new Date();
  let numero = Math.floor(Math.random() * 1000);

  let hoje =data.getFullYear()+'-'+ (data.getMonth() -1) +'-'+ data.getDate();
  console.log(hoje)
  let dadosLa = { ...formproduto,
     cd_lancamento:numero,
     nm_fornecedor:formproduto.nm_fantasia,
     dt_lancamento:hoje,
     qt_produto: formproduto.qt_estoque,
     nm_tipo_lancamento:'entrada',
     produto_cd_produto:formproduto.cd_produto
    };


  delete dadosLa.cd_produto;
  delete dadosLa.cd_ncm;
  delete dadosLa.ds_produto;
  delete dadosLa.qt_estoque;
  delete dadosLa.nm_embalagem;
  delete dadosLa.vl_unitario;
  delete dadosLa.vl_total;
  delete dadosLa.nm_fantasia;

  connection.query("insert into produto set ?", dadosProd, function(err, result) {
    if(err){throw err};

    connection.query("insert into lancamento set ?", dadosLa, function(err, result){
      if(err){throw err};
      let msg = 'Produto cadastrado com sucesso!';

      connection.query("SELECT cd_fornecedor, nm_fantasia from fornecedor", function(error, result){
        if(error){throw error};
        res.render('novoproduto', { dadosFor: result, msg:msg});
    });

  });
  });


}

module.exports.buscadorTypeAhead = (key, req, res) =>{

  var connection = db();

  connection.query('SELECT * from produto where cd_produto like "%'+key+'%" or ds_produto like "%'+key+'%"',
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

  connection.query("SELECT qt_produto from produto where cd_produto ="+codigo+"", function(error, result) {
   
    if (error){ console.log(error);} 
    var qt_produto = result[0].qt_produto;
    var resultado= qt_produto - quantidade;
    
    if (resultado >= 0) {
        connection.query('UPDATE produto SET qt_produto = ? WHERE cd_produto = ?', [resultado, codigo], function (error, results, fields) {
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




