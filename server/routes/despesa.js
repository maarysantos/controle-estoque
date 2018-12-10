var express = require('express');
var router = express.Router();
var controller = require('../controllers/despesa');

router.get('/despesa/loja', controller.carregaDespesaLoja);
router.get('/despesa/pessoal', controller.carregaDespesaPessoal);

router.get('/despesa/loja/novadespesa', controller.getNovaDespesa);


module.exports = router;
