var express = require('express');
var router = express.Router();

var usuarioModel= require('../models/usuarioModel');

module.exports.get = (req, res, next) => {
    res.render('index');
}

module.exports.post = (req, res, next) => {
    var nome = req.body.txtNome;
    var senha = req.body.txtSenha;
    usuarioModel.validarUsuario (nome, senha, req, res);
}

    
