var express = require('express');
var db = require('../db');

var router = express.Router();


  router.get('/', function(req,res){
    var connection = db();
      connection.query("SELECT * FROM usuario", function(error, result){
          res.render('index', { usuario : result });
          
      });
  });
  
module.exports=router;