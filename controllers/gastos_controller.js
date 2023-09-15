const Gastos = require ('../models/gastos');
const User = require ('../models/usuario');
const Produto = require ('../models/produto');
const Venda = require ('../models/vendas');

exports.createGastos = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado ' });
        }

        const gastos = new Gastos(req.body);
        const novogasto = await gastos.save();

        return res.status(201).json(novogasto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao criar o produto' + err });
    }
};

exports.getGastoByUsaurio = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Buscando gastos do usuário:", userId);
        const gastos = await Gastos.find({ userId: userId });
        console.log("Gastos encontrados:", gastos);
        if (gastos.length === 0) {
            res.status(404).json({ error: 'Gasto não encontrado' });
            return;
        }
        res.status(200).json(gastos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao buscar os gastos' });
    }
};

exports.getGastoTotal = async (req, res) => {
    try {
        const { userId } = req.params;
  

        const gastos = await Gastos.find({ userId: userId });
        const gastosTotais = gastos.reduce((total, gasto) => total + gasto.gastos, 0);
     
        console.log ("O usuário é " + userId)
        console.log("O total de gastos é" + gastosTotais)
 
        res.json({ gastosTotais: gastosTotais });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao obter a receita total ' + err });
    }
};

exports.getReceitaTotal = async (req, res) => {
    try {
        const { userId } = req.params;

        const produtos = await Produto.find({ userId: userId });
    
        // Encontrar todas as vendas associadas aos produtos do usuário
        const vendas = await Venda.find({ produto: { $in: produtos.map(produto => produto._id) } });
        const valorTotal = vendas.reduce((total, venda) => total + venda.valorTotal, 0);

        const gastos = await Gastos.find({ userId: userId });
        const gastosTotais = gastos.reduce((total, gasto) => total + gasto.gastos, 0);
     
        console.log ("O usuário é " + userId)
        console.log("O total de gastos é" + gastosTotais)
        const receitaTotal = valorTotal - gastosTotais;
        
        res.json({ receitaTotal: receitaTotal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao obter a receita total ' + err });
    }
};
exports.deleteGastoById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGasto = await Gastos.findByIdAndDelete(id);

        if (!deletedGasto) {
            return res.status(404).json({ error: 'Gasto não encontrado' });
        }

        res.json({ message: 'Gasto deletado' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar gasto' });
    }
};
exports.deleteAllGastos = async (req, res) => {
    try {
        await Gastos.deleteMany({});
        res.json({ message: 'Todos os gastos foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar todos gastos' });
    }
};

exports.updateGastoById = async (req, res) => {
    try {
        
        const { id } = req.params;
        const updatedGasto = await Gastos.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedGasto) {
            return res.status(404).json({ error: 'Gasto não encontrado' });
        }

        res.json(updatedGasto);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao atualizar Gasto' });
    }
};



