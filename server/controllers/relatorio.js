var express = require('express');
var router = express.Router();
var relatorioModel = require('../models/relatorioModel');


module.exports.getPagRelatorios = (req, res, next) => {
    res.render('relatorios');            

};
module.exports.carregaRelatorio = (req, res, next) => {
    relatorioModel.carregaRelatorio(req, res, next);
}

module.exports.carregaRelatorioProdutos = (req, res, next) => {
    relatorioModel.carregaRelatorioProdutos(req, res, next);
}

module.exports.carregaRelatorioFornecedores = (req, res, next) => {
    relatorioModel.carregaRelatorioFornecedores(req, res, next);
}

module.exports.getInfoFornecedor = (req, res, next) => {
    var id = req.params.id;
    relatorioModel.getInfoFornecedor (id, req, res, next);

   }