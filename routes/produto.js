var express = require('express');
var router = express.Router();
var db = require('../db');
var controller = require('../controllers/produto');

var fs           = require('fs');
var xml2js       = require('xml2js');
var multer  = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
var upload = multer({storage});


router.get('/produto/novoproduto', controller.carregarPagProduto);
router.post('/produto/novoproduto', controller.post);

router.post('/', upload.single('upXml'), function(req, res, next) {

  var fileDate = 'uploads/'+ req.file.filename;
  fs.readFile(fileDate,'utf-8', (err, data) => {
    if (err){ 
      throw err;}
    else{
      controller.carregarNotaXML;
  };
  }); 
  });

  router.get('/produto/produtoxml', controller.carregarPagProdutoXML); 

    


  module.exports = router;