var mysql = require('mysql');
var db = require('../db');
var express = require('express');


module.exports.validarUsuario = (req, callback) => {
    var connection = db();
    var nome = req.body.txtNome;
    var senha = req.body.txtSenha;
    connection.query("SELECT nm_usuario from usuario where nm_usuario ='"+nome+"' and nm_senha="+ senha+"",callback);


};
    
