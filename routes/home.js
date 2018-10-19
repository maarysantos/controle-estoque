var express = require('express');
var db = require('../db');
var router = express.Router();


  router.get('/', function(req,res){
          res.render('home');
          
      });
      module.exports=router;
