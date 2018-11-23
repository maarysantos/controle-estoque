var express = require('express');
var router = express.Router();

router.get('/', function(req, res,next){
      let usuario =req.session.nome;
      res.render('relatorios', {usuario:usuario});
});

module.exports = router;