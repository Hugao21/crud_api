const express = require('express');
const userController = require('../controllers/usuario_controller');

const router = express.Router();

router.post('/', userController.createUsuario);
router.get('/', userController.getUsuario);
router.delete('/delete-all', userController.deleteAllUsers); 
router.delete('/deletarUsuario/:userId', userController.deleteUsuario);
router.patch('/alterarUsuario/:id', userController.updateUsuario)
router.delete('/deletarTodosUsuarios', userController.deleteAllUsers);
router.get('/:id', userController.getUsuarioById);

module.exports = router;