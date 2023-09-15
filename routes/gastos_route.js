const express = require('express');
const gastosController = require('../controllers/gastos_controller');

const router = express.Router();

router.post('/', gastosController.createGastos);
router.get('/usuario/:userId', gastosController.getGastoByUsaurio);
router.get ('/totalGasto/:userId', gastosController.getGastoTotal);
router.get ('/usuarioReceita/:userId', gastosController.getReceitaTotal);
router.delete ('/deletarGasto/:id', gastosController.deleteGastoById);
router.delete('/deletarTodosGastos', gastosController.deleteAllGastos)
router.patch ('/alterarGasto/:id', gastosController.updateGastoById)


module.exports = router;