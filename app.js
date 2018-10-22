var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newRouter = require('./routes/new');
const homeRouter = require('./routes/home');

const novoProduto = require('./routes/produto');
const novoFornecedor = require('./routes/novofornecedor');
const novoProdutoXML = require('./routes/produto');
const salvarProdutos = require('./routes/salvarProdutos');
const saidaProdutos = require('./routes/saidaproduto');
const atualizarEstoque = require('./routes/atualizarEstoque');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  secret:'abcdfefejeg',
  resave: false,
  saveUninitialized: false
}));


/*Rotas*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/new', newRouter);
app.use('/home', homeRouter);
/*app.use('/novoproduto', novoProduto);*/
app.use('/novofornecedor', novoFornecedor);
app.use('/produtoxml', novoProdutoXML);
app.use('/salvarProdutos', salvarProdutos);
app.use('/saidaproduto', saidaProdutos);
app.use('/atualizarEstoque', atualizarEstoque);
app.use('/novoproduto', novoProduto);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
