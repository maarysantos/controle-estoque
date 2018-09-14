var express = require('express');
var router = express.Router();
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

router.post('/', upload.single('upXml'), function(req, res, next) {

  var fileDate = 'uploads/'+ req.file.filename;
  console.log(fileDate);
  fs.readFile(fileDate,'ascii', (err, data) => {
    if (err){ 
      throw err;}
    else{
    var parser       = new xml2js.Parser();

    parser.parseString(data.substring(0, data.length), function(err, result){
      var [ notaFiscal ] = result.nfeProc.NFe;
      var [ informacao ] = notaFiscal.infNFe;
      var produtos=[];

      informacao.det.forEach(i => {
        var [prod] = i.prod;
        produtos.push(prod);
      });
      res.render('produtoxml', {produtos : produtos});

    });
  };
  }); 
  });


router.get('/', function(req, res, next) {

  res.render('produtoxml', {produtos : [] });
});



module.exports = router;