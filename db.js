var mysql = require ("mysql");

module.exports = function(){
    return connection = mysql.createConnection({
        host : '85.10.205.173',
        user: 'bd_estoque',
        password: 'bd_estoque',
        database: 'bd_mari_estoque'
    });

    connection.connect(function(err) {
        if (err) {
          console.error('Erro de conexão ' + err.stack);
          return;
        } else {console.log('Conectado!')};
    });
};
