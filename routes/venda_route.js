const express = require('express');
const vendaController = require('../controllers/vendas_controller');

const router = express.Router();

router.post('/', vendaController.createVenda);
router.get('/', vendaController.getVendas);
router.get('/produto/:produtoId', vendaController.getVendabyProduto);
router.get('/usuario/:userId', vendaController.getVendasByUsuario);
router.get ('/vendaTotal/:userId', vendaController.valorTotalVendasUsuario);
router.get('/:id', vendaController.getVendabyId);
router.delete ('/deletarVenda/:id', vendaController.deleteVendaById);
router.patch('/alterarVenda/:id', vendaController.udpateVenda);
router.delete('/deletarTodasVendas', vendaController.deleteAllVendas);

module.exports = router;