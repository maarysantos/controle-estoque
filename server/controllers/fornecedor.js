var express = require('express');
var router = express.Router();
var fornecedorModel = require('../models/fornecedorModel');

module.exports.getNovoFornecedor = (req, res, next) => {
        res.render('novofornecedor');            
    
};

module.exports.insereNovoFornecedor = (req, res, next) =>{
  var formfornecedor = req.body;
  fornecedorModel.insereNovoFornecedor(formfornecedor, req, res, next);

}

module.exports.listaFornecedores = (req, res, next) =>{
      
  fornecedorModel.listaFornecedores(req, res, next);

};

module.exports.deleteFornecedor = (req, res, next) => {
  let id = req.params.id;
  fornecedorModel.deleteFornecedor(id, req, res, next);
};

module.exports.editarFornecedor = (req, res, next) => {
  let id = req.params.id;
  fornecedorModel.editarFornecedor(id, req, res, next);
}


