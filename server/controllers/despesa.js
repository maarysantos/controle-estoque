var express = require('express');
var router = express.Router();
var despesaModel = require('../models/despesaModel');

module.exports.carregaDespesaLoja = (req, res, next) => {
    despesaModel.carregaDespesaLoja(req,res, next);
}

module.exports.carregaDespesaPessoal = (req, res, next) => {
    despesaModel.carregaDespesaPessoal(req,res, next);
}

module.exports.getNovaDespesa = (req, res, next) => {
    res.render('novaDespesa')
}