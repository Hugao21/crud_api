const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    senha: String,
    cpf: String,
    rg: String,
    orgao_emissor: String,
    uf: String,
    cnpj: String,
    nire: String,
    cep: String,
    numero: String,
    logradouro: String,
    bairro: String,
    municipio: String,
    estado: String,
    tipo_ramo: String,
    ramo: String
  });

module.exports = mongoose.model('User', userSchema);