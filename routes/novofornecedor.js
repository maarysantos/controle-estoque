var express = require('express');
var db = require('../db');

var router = express.Router();


  router.get('/', function(req,res){
          res.render('novofornecedor');
          
      });
  
 router.post('/', function(req, res) {
    var connection = db();
    var formfornecedor = req.body;
    console.log(formfornecedor);
    connection.query("insert into fornecedor set ?", formfornecedor, function(err, result) {
        if(err){
            console.error(err);
        }else{
            console.log(result);
        }
        res. redirect('/');
    });
  });
  
module.exports=router;