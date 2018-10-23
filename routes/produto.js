var express = require('express');
var router = express.Router();
var db = require('../db');
var controller = require('../controllers/produto');

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


router.get('/novoproduto', controller.carregarPagProduto);
router.post('/novoproduto', controller.post);

router.post('/produtoxml', upload.single('upXml'), function(req, res, next) {

  var fileDate = 'uploads/'+ req.file.filename;
  controller.carregarNotaXML(fileDate, req, res, next);
  
  });

  router.get('/produtoxml', controller.carregarPagProdutoXML); 

    


  module.exports = router;