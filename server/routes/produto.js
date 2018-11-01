var express = require('express');
var router = express.Router();
var controller = require('../controllers/produto');

var multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
var upload = multer({storage});

  /*=================Rotas página novoProduto ===============*/

router.get('/novoproduto', controller.carregaPagNovoProduto);
router.post('/novoproduto', controller.post);

/*============Rotas página Produto Xml ==================*/

router.post('/produtoxml', upload.single('upXml'), function(req, res, next) {

  var fileDate = 'uploads/'+ req.file.filename;
  controller.carregarNotaXML(fileDate, req, res, next);
  
  });

  router.get('/produtoxml', controller.carregarPagProdutoXML); 
  router.post('/salvarProdutos', controller.salvarProdutosNota); 

  /*=================Rotas Saída de Produto ===============*/

  router.get('/saidaproduto', controller.carregarPagSaidaProduto);
  router.get('/saidaproduto/search', controller.carregaTypeAhead );
  router.post('/atualizarEstoque', controller.atualizarEstoque);

  router.get('/editarproduto', controller.carregarEditarProduto);
  router.get('/editarproduto/search', controller.carregaTypeAhead );




  module.exports = router;