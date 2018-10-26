var express = require('express');
var router = express.Router();
var controller = require('../controllers/fornecedor');

router.get('/', controller.getNovoFornecedor);
router.post('/', controller.insereNovoFornecedor);

  
module.exports = router;