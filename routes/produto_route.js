const express = require('express');
const productController = require('../controllers/produto_controller');

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/usuario/:userId', productController.getProductsByClient);
router.delete ('/deletarTodosProdutos', productController.deleteAllProdutos);
router.delete ('/deletarProduto/:id', productController.deleteProductById);
router.patch ('/alterarProduto/:produtoId', productController.updateProductById)
router.get('/:id', productController.getProductById);

module.exports = router;