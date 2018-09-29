var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('saidaproduto');
});

router.get('/search',function(req,res){
var connection = db();
connection.query('SELECT ds_produto from estoque where ds_produto like "%'+req.query.key+'%"',
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


module.exports = router;