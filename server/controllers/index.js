let express = require('express');
let router = express.Router();
let usuarioModel= require('../models/usuarioModel');


let crypto = require('crypto');

const criptografia = {
    algoritmo : 'aes256',
    segredo : 'chaves',
    tipo: 'hex'
};

let cipher = crypto.createCipher(criptografia.algoritmo, criptografia.segredo);

//cipher.update(senha);


module.exports.get = (req, res, next) => {
    res.render('index');
}

module.exports.post = (req, res, next) => {
    let nome = req.body.txtNome;
   // cipher.update(req.body.txtSenha);
    let senha = req.body.txtSenha;
    //cipher.final(criptografia.tipo);
   // console.log(senha)
    
    usuarioModel.validarUsuario (nome, senha, req, res);
}

    
