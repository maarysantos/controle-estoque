var express = require('express');
var router = express.Router();

router.get('/relatorios', function(req, res,next){
      let usuario =req.session.nome;
      res.render('relatorios', {usuario:usuario});
});

router.get('/relatorios/relatorio', function(req, res,next){
      
      res.render('relatorio');
});

module.exports = router;