var express = require('express');
var router = express.Router();
var fornecedorModel = require('../models/fornecedorModel');

module.exports.getNovoFornecedor = (req, res, next) => {
    if (req.session.autorizado){ 
        var usuario = req.session.nome; 
        res.render('novofornecedor');            
    } else{
      res.render('index');
      };
    };

    module.exports.insereNovoFornecedor = (req, res, next) =>{
        var formfornecedor = req.body;
        fornecedorModel.insereNovoFornecedor(formfornecedor, req, res, next);

    }

