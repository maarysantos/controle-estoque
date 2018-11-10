var express = require('express');
var router = express.Router();
var controller = require('../controllers/fornecedor');

router.get('/novofornecedor', controller.getNovoFornecedor);
router.post('/novofornecedor', controller.insereNovoFornecedor);

router.get('/listafornecedores', controller.listaFornecedores);
router.get('/delete/:id', controller.deleteFornecedor);

router.get('/edit/:id', controller.editarFornecedor);

  
module.exports = router;