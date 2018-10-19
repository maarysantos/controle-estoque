var express = require('express');

var usuarioModel= require('../models/usuarioModel');

module.exports.post = (req, res, next) => {
   
    usuarioModel.validarUsuario(function(error, result){
        if(error){throw error;}
      
        if (result[0].nm_usuario =! undefined ){
            req.session.autorizado = true;
            req.session.nome= result[0].nm_usuario;
            console.log(result);
            res.render('novoproduto')
    };
});
};

       



    
