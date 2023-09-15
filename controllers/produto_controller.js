const produto = require("../models/produto");
const Product = require("../models/produto");
const User = require('../models/usuario');


exports.createProduct = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado ' });
        }

        const produto = new Product(req.body);
        const novoProduto = await produto.save();

        return res.status(201).json(novoProduto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao criar o produto' + err });
    }
};


exports.getProductsByClient = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Buscando produtos para o cliente:", userId);
        const products = await Product.find({ userId: userId });
        console.log("Produtos encontrados:", products);
        if (products.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao buscar os produtos' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const produtos = await Product.find();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produtos' });
    }
};

exports.deleteAllProdutos = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: 'Todos os produtos foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar todos usuários' });
    }
};
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Product.findOne({ id });
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produto' });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json({ message: 'Produto deletado' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar produto' });
    }
};


exports.updateProductById = async (req, res) => {
    try {
        
        const { produtoId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(produtoId, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao atualizar produto' });
    }
};
