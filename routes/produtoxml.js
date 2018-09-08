var express = require('express');
var router = express.Router();
var fs           = require('fs');
var xml2js       = require('xml2js');
var parser       = new xml2js.Parser();
var multer  = require('multer');
var upload = multer({storage });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ storage: storage })




router.post('/', upload.single('upXml'), function(req, res, next) {
  var xml= req.file;
  console.log(xml);

  fs.readFile("uploads/"+xml.filename, "utf-8", function (error, text) {
    if (error) {

      throw error;

  }else {

      parser.parseString(text, function (err, result) {

       
          console.log(result);
        

        // res.render('produtoxml', { produtos:  produtos });
    
      });

  }

});
});

router.get('/', function(req, res, next) {
  res.render('produtoxml', { });
});

module.exports = router;