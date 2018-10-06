var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('saidaproduto');
});

//Procura na barra de busca
router.get('/search',function(req,res){
    var connection = db();
    connection.query('SELECT * from estoque where cd_produto like "%'+req.query.key+'%" or ds_produto like "%'+req.query.key+'%"',
        function(err, rows, fields) {
            if (err) throw err;
            var data=[];
            for(i=0;i<rows.length;i++)
            {
                let { cd_produto, ds_produto,qt_produto, vl_unitario} = rows[i];
                data.push({ cd_produto, ds_produto,  qt_produto, vl_unitario });

            }
            res.end(JSON.stringify(data));
        });
});



module.exports = router;