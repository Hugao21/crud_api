const Venda = require('../models/vendas');
const Produto = require('../models/produto');


exports.createVenda = async (req, res) => {
    try {
        const produtoId = req.body.produtoId;
        const quantidade = req.body.quantidade;


        // Obter o produto
        const produto = await Produto.findById(produtoId);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Calcular o valor total
        const valorTotal = quantidade * produto.preco;

        // Criar e salvar a nova venda
        const venda = new Venda({
            quantidade: quantidade,
            valorTotal: valorTotal,
            dataVenda : new Date(),
            produto: produtoId
        });

        const novaVenda = await venda.save();

        return res.status(201).json(novaVenda);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao criar a Venda' });
    }
};


exports.getVendabyProduto = async (req, res) => {
    try {
        const produtoId = req.params.produtoId;
        console.log("Buscando vendas para o produto:", produtoId);
        const vendas = await Venda.find({ produto: produtoId });
        console.log("Vendas encontradas:", vendas);
        if (vendas.length === 0) {
            res.status(404).json({ error: 'Vendas não encontradas' });
            return;
        }
        const totalVendas = vendas.reduce((total, venda) => total + venda.valorTotal, 0);
        res.status(200).json({
            vendas: vendas,
            totalvendas: totalVendas
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao buscar as vendas' });
    }
};


exports.getVendas = async (req, res) => {
    try {
        const vendas = await Venda.find();
        res.json(vendas);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar vendas' });
    }
};

exports.deleteAllVendas = async (req, res) => {
    try {
        await Venda.deleteMany({});
        res.json({ message: 'Todas as vendas foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar todas vendas' });
    }
};

exports.getVendasByUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.usuarioId; // Se você está passando o ID do usuário como parâmetro na rota

        // Encontre todos os produtos associados ao usuário
        const produtos = await Produto.find({ user: usuarioId });

        // Obtenha os IDs dos produtos
        const produtoIds = produtos.map(produto => produto._id);

        // Encontre todas as vendas associadas a esses produtos
        const vendas = await Venda.find({ produto: { $in: produtoIds } });

        res.json(vendas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao buscar as vendas' });
    }
};


exports.getVendabyId = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await Venda.findOne({ id });
        if (!venda) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        res.json(venda);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produto' });
    }
};


exports.valorTotalVendasUsuario = async (req, res) => {
    try {
      const { userId } = req.params;
  

      const produtos = await Produto.find({ userId: userId });
  
      // Encontrar todas as vendas associadas aos produtos do usuário
      const vendas = await Venda.find({ produto: { $in: produtos.map(produto => produto._id) } });
      const valorTotal = vendas.reduce((total, venda) => total + venda.valorTotal, 0);
  
      return res.json({ userId, valorTotal });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteVendaById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGasto = await Venda.findByIdAndDelete(id);

        if (!deletedGasto) {
            return res.status(404).json({ error: 'venda não encontrada' });
        }

        res.json({ message: 'Venda deletada' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar Venda' });
    }
};


exports.udpateVenda = async (req, res) => {
    try {
        const { id } = req.params;
        const produtoId = req.body.produtoId;
        const quantidade = req.body.quantidade;
        const produto = await Produto.findById(produtoId);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Calcular o valor total
        const valorTotal = quantidade * produto.preco;

        // Atualizar a venda
        const updatedVenda = await Venda.findByIdAndUpdate(id, {
            quantidade: quantidade,
            valorTotal: valorTotal,
            dataVenda: new Date(),
            produto: produtoId
        }, { new: true });

        if (!updatedVenda) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }

        res.json(updatedVenda);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao atualizar venda' });
    }
};


