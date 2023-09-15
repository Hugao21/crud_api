const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usuario_route = require('./routes/usuarios_route');
const produto_route = require('./routes/produto_route');
const vendas_route = require('./routes/venda_route');
const gastos_route = require ('./routes/gastos_route');
const app = express();

app.use(bodyParser.json());

// Usar as rotas importadas
app.use('/usuario', usuario_route);
app.use('/produto', produto_route);
app.use('/vendas', vendas_route);
app.use ('/gastos', gastos_route);


mongoose.connect(
    'mongodb+srv://hugo:rd9fcILQ9f605xJR@cluster0.fnni9kf.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco! Conectado na porta 3000');
    app.listen(3000)
  })
  .catch((err) => console.log(err))





