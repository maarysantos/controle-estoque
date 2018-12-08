var express = require('express');
var router = express.Router();
var controller = require('../controllers/relatorio');

router.get('/relatorios', controller.getPagRelatorios);
      
router.post('/relatorios/relatorio', controller.carregaRelatorio);

router.get('/relatorios/relatorio/todosprodutos', controller.carregaRelatorioProdutos);

router.get('/relatorios/relatorio/todosfornecedores', controller.carregaRelatorioFornecedores);

router. get('/info/fornecedor/:id', controller.getInfoFornecedor);


module.exports = router;