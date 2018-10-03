var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('saidaproduto');
});

router.get('/search',function(req,res){
var connection = db();
connection.query('SELECT * from estoque where cd_produto like "%'+req.query.key+'%" or ds_produto like "%'+req.query.key+'%"',
function(err, rows, fields) {
if (err) throw err;
var data=[];
for(i=0;i<rows.length;i++)
{
data.push(rows[i].ds_produto);

}
res.end(JSON.stringify(data));
});


});

router.get('/order', function(req, res, next) {
  var connection = db();
  var nome= req.params;                                                
connection.query('SELECT * from estoque where cd_produto like "%'+nome+'%" or ds_produto like "%'+nome+'%"',
function(err, rows, fields) {
if (err) throw err;
var data=[];
for(i=0;i<rows.length;i++)
{
data.push(rows[i].cd_produto);
data.push(rows[i].ds_produto);
data.push(rows[i].qt_produto);

}
res.send(data );
});


});

module.exports = router;