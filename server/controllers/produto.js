var express = require('express');
var router = express.Router();
var xml2js       = require('xml2js');
var fs           = require('fs');
var produtoModel= require('../models/produtoModel');


/*============== Novo Produto ===========================*/
module.exports.carregaPagNovoProduto = (req, res, next) =>{
    produtoModel.getPagNovoProduto( req, res, next);

}

module.exports.carregaSelectCdNota = (req, res, next) =>{
    produtoModel.carregaSelectCdNota(req, res, next);

}

module.exports.post = (req, res, next) => {
    var formproduto = req.body;
    produtoModel.inserirProduto (formproduto, req, res);
}

/* ============= Produto XML ===============================*/
module.exports.carregarNotaXML = (fileDate, req, res, next) =>{
  fs.readFile(fileDate,'utf-8', (err, data) => {
    if (err){throw err;}

      var parser       = new xml2js.Parser();
      parser.parseString(data.substring(0, data.length), function(err, result){
        if(!err){
          var [ notaFiscal ] = result.nfeProc.NFe;
          var [ informacao ] = notaFiscal.infNFe;
          //Objeto com dados do Fornecedor (emissor) da notaFiscal
          var [infoForn] = informacao.emit;
          // Objeto com dados da NotaFiscal
          var [infoNota] = informacao.ide;


          //setando atributos do banco de dados tabela FORNECEDOR
          let fornecedor = {...infoForn,
             cd_cnpj : infoForn.CNPJ,
             cd_ie : infoForn.IE,
             nm_razao : infoForn.xNome,
             nm_fantasia : infoForn.xFant,
             cd_cep : infoForn.enderEmit[0].CEP,
             ds_endereco : infoForn.enderEmit[0].xLgr,
             cd_numero : infoForn.enderEmit[0].nro,
             nm_bairro : infoForn.enderEmit[0].xBairro,
             nm_cidade : infoForn.enderEmit[0].xMun,
             nm_estado : infoForn.enderEmit[0].UF,
             nm_pais : infoForn.enderEmit[0].xPais,
             cd_tel1 : infoForn.enderEmit[0].fone
          };

          //setando atributos do banco de dados tabela NOTAFISCAL

          let nota = {...infoNota,
            cd_nfe :infoNota.cNF, 
            dt_emissao: infoNota.dhEmi,
            dt_criacao : infoNota.dhSaiEnt
         };

          delete nota.cNF;
          delete nota.dhEmi;
          delete nota.dhSaiEnt;
          delete nota.nNF;
          delete nota.cDV;
          delete nota.cMunFG;
          delete nota.cUF;
          delete nota.finNFe;
          delete nota.indPag;
          delete nota.mod;
          delete nota.natOp;
          delete nota.procEmi;
          delete nota.serie;
          delete nota.tpAmb;
          delete nota.tpEmis;
          delete nota.tpNF;
          delete nota.verProc;
          delete nota.tpImp;
          delete nota.indFinal;
          delete nota.indDest;
          delete nota.indPres;
          delete nota.idDest;

          delete fornecedor.CRT;
          delete fornecedor.CNPJ;
          delete fornecedor.IE;
          delete fornecedor.xFant;
          delete fornecedor.xNome;
          delete fornecedor.enderEmit;


          // Objeto com dados dos produtos
          var produtos=[];
          informacao.det.forEach(i => {
            var [prod] = i.prod;
            produtos.push(prod);
          });

          var connection = db();

          connection.query("SELECT COUNT(1) as count from fornecedor WHERE cd_cnpj = ?", fornecedor.cd_cnpj, function (err, result){
          if(err){throw err;}
            if(result[0].count == 0){
                connection.query("INSERT INTO FORNECEDOR set ?",fornecedor, function(err, result){
                    if(err){throw err;}
                    var valores = [nota, fornecedor_cd_fornecedor = result.insertId];
                    connection.query("INSERT INTO notafiscal set ?",valores, function(err, result){
                    if(err){throw err;}
                   console.log('gravou');
                    
                });
            });

            } else {
                console.log('nao há registros');


            };
            });
          
          res.render ('produtoxml', {produtos:produtos});
        
        }
    });

  });

}

module.exports.carregarPagProdutoXML = (req, res, next) =>{
   res.render('produtoxml', {produtos : [], msg:{}});            
};


module.exports.salvarProdutosNota= (req, res, next)=>{
  var formproduto = req.body;
  const produtos = Object.keys(formproduto).reduce((sum, item) => {
    let [coluna, index] = item.split(/\[/);// extraindo o nome e o indice do campo do formulário
    index = parseInt(index.replace(/\]/));// Removendo o fecha colchete ']' e fazendo o parse do indice pra int
    if(!sum[index]){
      sum[index] = {};// Se o indice não existir cria objeto vazio
    }
    sum[index][coluna] = formproduto[item];//Preenche coluna de produto de um indice
    return sum;
  },[]).filter(p => p.selecionado).map(p => {
    const {selecionado, ...prod} = p;
                
      return prod;

  });
              
                /* const executarSql = (sql, valor) =>{
                  return new Promise((resolve, reject) =>{
                      const callback = (err, result) => {
                          if(err){
                              reject(err);
                          }else{
                              resolve(result);
                          }
                      };
                      if(valor){
                          connection.query(sql, valor, callback);
                      }else{
                          connection.query(sql, callback);
                      }
                  });
              };
              let consultas = Array.from(conjunto).map(tipo =>{
                    return new Promise((resolve, reject)=>{
                      executarSql("SELECT COUNT(1) as count from tipo_embalagem WHERE nm_tipo_embalagem = ?", tipo)
                      .then((result)=>{
                          if(result && result.length){
                              if(result[0].count == 0){
                                  executarSql("insert into tipo_embalagem set ?",{nm_tipo_embalagem:tipo, id_tipo_embalagem:0}).then((result)=>{
                                      resolve(result);
                                  }).catch(err => reject(err));
                              }else{
                                  resolve(result);
                              }
                          }
                      });
                  });
                })
                
                Promise.all(consultas).then(results => {
                  console.log(results);
                  connection.commit();
              
                  let inserts = produtos.map( produto => {
                      return new Promise((resolve, reject)=>{
                          executarSql("SELECT COUNT(1) as count, qt_produto FROM estoque WHERE cd_produto = ?", produto.cd_produto).then((result)=>{
                              if(result && result.length){
                                  let [prod] = result;
                                  if(prod.count == 0){
                                      executarSql("insert into estoque set ?", produto).then(result => resolve(result)).catch(err=>reject(err));
                                  }else{
                                      let qt_produto = prod.qt_produto + parseFloat(produto.qt_produto);
                                      executarSql("UPDATE estoque set qt_produto = ? WHERE cd_produto = ?",[qt_produto, produto.cd_produto]).then(result => resolve(result)).catch(err=>reject(err));
                                  }
                              }
                          }).catch(err=>reject(err));
                      })
                  });
                  
                  Promise.all(inserts).then((resultados)=>{
                      console.log(resultados);
                      connection.commit();
                      res.send(produtos);
                  }).catch((erros)=>{
                      res.send(erros);
                  })
                });
                
              });*/
              
  let inserts = produtos.map(produto =>{
    var connection = db();
    connection.query("insert into produto set ?", produto, function(err, result) {
    if(err){
      console.log(err);
      }else{
        console.log(result);
      }
    });
                
  });
};
              
/*============== Saída de Produto =================*/
module.exports.carregarPagSaidaProduto = (req, res, next) =>{
   res.render('saidaproduto', {msg:{}});            
};

module.exports.carregaTypeAhead = (req, res, next) =>{
  var key = req.query.key;
  produtoModel.buscadorTypeAhead(key, req, res);
 };     
          
module.exports.atualizarEstoque = (req, res, next) =>{
  var formvenda = req.body;
  var codigo = req.body.estoque_cd_produto;
  var quantidade = req.body.qt_produto;

  produtoModel.atualizarEstoque(formvenda,codigo, quantidade, req, res);
};

module.exports.getNovoFornecedor = (req, res, next) =>{
  res.render('novofornecedor');
};

module.exports.carregarEditarProduto = (req, res, next) =>{
  res.render('editarproduto');            
};


module.exports.editaProduto = (req, res, next) => {
    var form = req.body;
    produtoModel.editaProduto(form, req, res, next);
    
  };