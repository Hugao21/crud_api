const mongoose = require ("mongoose");

const vendaSchema = new mongoose.Schema({
   
    quantidade: Number,
    valorTotal: Number,
    dataVenda: { type: Date, default: Date.now },
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  });


  module.exports = mongoose.model('Venda', vendaSchema);