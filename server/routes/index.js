var express = require('express');
var controller = require('../controllers/index');


var router = express.Router();

  router.get('/', controller.get);

  router.post('/', controller.post);
     
  module.exports = router;


  
