var express = require('express');
var db = require('../db');
var controller = require('../controllers/index');


var router = express.Router();

  router.get('/', function(req,res){
          res.render('index');
          
      });

  router.post('/', controller.post);
      


  
module.exports=router;