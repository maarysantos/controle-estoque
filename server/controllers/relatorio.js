var express = require('express');
var router = express.Router();
var relatorioModel = require('../models/relatorioModel');


module.exports.getPagRelatorios = (req, res, next) => {
    let usuario = req.session.nome; 
    res.render('relatorios', {usuario:usuario});            

};
module.exports.carregaRelatorio = (req, res, next) => {
    let form = req.body;
    relatorioModel.carregaRelatorio(form, req, res, next);
}