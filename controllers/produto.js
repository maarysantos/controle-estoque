var express = require('express');
var router = express.Router();


var produtoModel= require('../models/produtoModel');


/*======== Novo Produto ========*/
module.exports.carregarPagProduto = (req, res, next) =>{
    
if (req.session.autorizado){ 
    var usuario = req.session.nome; 
    var connection = db();
    connection.query("SELECT nm_tipo_embalagem FROM tipo_embalagem", function(error, result){
        res.render('novoproduto', {usuario : usuario, tipo_embalagem:result});
    });
} else{
  res.redirect('/');
  }
}

module.exports.post = (req, res, next) => {
    var formproduto = req.body;
    produtoModel.inserirProduto (formproduto, req, res);
}

/* ======Produto XML ===============*/

module.exports.carregarNotaXML = (req, res, next) =>{
    var parser       = new xml2js.Parser();

    parser.parseString(data.substring(0, data.length), function(err, result){
      if(!err){
          var [ notaFiscal ] = result.nfeProc.NFe;
          var [ informacao ] = notaFiscal.infNFe;
          var produtos=[];
          informacao.det.forEach(i => {
            var [prod] = i.prod;
            produtos.push(prod);
          });
          res.render('produtoxml', {produtos : produtos});
      }else{
          console.error(err);
      }


    });

    }
    
    module.exports.carregarPagProdutoXML = (req, res, next) =>{
    
        if (req.session.autorizado){ 
            var usuario = req.session.nome; 
            res.render('produtoxml', {produtos : [] });           
        } else{
          res.redirect('/');
          }
        }