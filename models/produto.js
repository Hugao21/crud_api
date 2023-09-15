const mongoose = require ("mongoose");


const produtoSchema = new mongoose.Schema({
    title: String,
    descricao: String,
    preco: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  });

  module.exports = mongoose.model('Produto', produtoSchema);