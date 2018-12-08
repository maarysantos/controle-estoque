var express = require('express');
var router = express.Router();
var despesaModel = require('../models/despesaModel');

module.exports.carregaDespesaLoja = (req, res, next) => {
    despesaModel.carregaDespesaLoja(req,res, next);
}

module.exports.getNovaDespesa = (req, res, next) => {
    let usuario=req.session.name;
    res.render('novaDespesa', {usuario:usuario})
}