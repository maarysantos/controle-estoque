var express = require('express');
var router = express.Router();


var usuarioModel= require('../models/usuarioModel');

module.exports.post = (req, res, next) => {
   
    usuarioModel.validarUsuario(req, function(error, result){
        if(error){throw error;}
      
        if (result[0].nm_usuario != undefined ){
            req.session.autorizado = true;
            req.session.nome= result[0].nm_usuario;
            res.redirect('home')
    };
});
};

       



    
