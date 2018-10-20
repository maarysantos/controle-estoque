var mysql = require('mysql');
var db = require('../db');
var express = require('express');

module.exports.validarUsuario = (nome, senha ,req, res) => {
    var connection = db();
    connection.query("SELECT nm_usuario from usuario where nm_usuario ='"+nome+"' and nm_senha="+ senha+"",
    function(error, result){
    if(error){throw error;}
      
    if (result[0] != undefined ){
        req.session.autorizado = true;
        req.session.nome= result[0].nm_usuario;
        res.redirect('home');
}
else{
    res.redirect('/')
}

});
};
