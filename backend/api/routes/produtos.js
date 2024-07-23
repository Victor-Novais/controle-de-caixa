const express = require('express');
const router = express.Router();
const {
    getAllProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto,
    getLowStockProdutos
} = require('../controllers/produtosController');

router.get('/', getAllProdutos);
router.get('/:id', getProdutoById);
router.post('/', createProduto);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);
router.get('/baixa-quantidade', getLowStockProdutos);

module.exports = router;
