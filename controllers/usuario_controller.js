const Usuario = require('../models/usuario')

exports.createUsuario = async (req, res) => {
    try {
        const {username, email, senha, cpf, rg, orgao_emissor, uf, cnpj, nire, cep, numero, logradouro, bairro, municipio, estado, tipo_ramo, ramo}  = req.body; 

        const novoUsuario = await Usuario.create({ username, email, senha, cpf, rg, orgao_emissor, uf, cnpj, nire, cep, numero, logradouro, bairro, municipio, estado, tipo_ramo, ramo});
        return res.status(201).json({ msg: "Usuário criado com sucesso", usuario: novoUsuario });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao criar um usuário ' + err  });
    }
};

exports.getUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar usuários' });
    }
};


exports.deleteUsuario = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await Usuario.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário deletado' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar usuário' });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar usuário' });
    }
};


exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'Todos os usuários foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar todos usuários' });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        await Usuario.deleteMany({});
        res.json({ message: 'Todos os usuários foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar todos usuários' });
    }
};

exports.getUsuarioProduto = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Usuario.findById(userId).populate('produtos');
        res.json(user.produtos);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produtos' });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        
        const { id } = req.params;
        const udpatedUsuario = await Usuario.findByIdAndUpdate(id, req.body, { new: true });

        if (!udpatedUsuario) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json(udpatedUsuario);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao atualizar produto' });
    }
};