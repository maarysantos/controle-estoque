var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req, res) {
  var connection = db();
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
res.send(produtos);

  connection.query("insert into estoque set ?", produtos, function(err, result) {
    if(err){
        console.error(err);
    }else{
        console.log(result);
    }
   
});
});
module.exports = router;