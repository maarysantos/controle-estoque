var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.autorizado){ 
        var usuario = req.session.nome; 
        var connection = db();
        connection.query("SELECT nm_tipo_embalagem FROM tipo_embalagem", function(error, result){
            res.render('novoproduto', {usuario : usuario, tipo_embalagem:result});
        });
    } else{
      res.redirect('/');
      }
});

router.post('/', function(req, res) {
  var connection = db();
  var formproduto = req.body;
  connection.query("insert into estoque set ?", formproduto, function(err, result) {
      if(err){
          console.error(err);
      }else{
          console.log(result);
      }
      res. redirect('/');
  });
});
module.exports = router;