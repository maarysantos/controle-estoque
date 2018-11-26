var express = require('express');
var router = express.Router();
var controller = require('../controllers/relatorio');

router.get('/relatorios', controller.getPagRelatorios);
      
router.post('/relatorios/relatorio', controller.carregaRelatorio);

module.exports = router;