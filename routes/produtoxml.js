var express = require('express');
var router = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var multer  = require('multer');


//Salvando a nota com o nome original
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({storage});


router.post('/', upload.single('upXml'), function(req, res, next) {

  var fileDate = fs.readFileSync(destination.file.originalname, 'ascii');
  var parser       = new xml2js.Parser();

  parser.parseString(fileDate.substring(0, fileDate.length), function(err, result){
    var [ notaFiscal ] = result.nfeProc.NFe;
    var [ informacao ] = notaFiscal.infNFe;
    informacao.det.forEach(i => {
      var [prod] = i.prod;
      produtos.push(prod);
    });

   res.render('produtoxml', {produtos : produtos});
});
   
  });



router.get('/', function(req, res, next) {

  res.render('produtoxml', {produtos : [] });
});
module.exports = router;