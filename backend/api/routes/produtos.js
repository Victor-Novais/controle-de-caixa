const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");
const {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
  getLowStockProdutos,
  getDespesasTotais,
  renovarEstoque,
  updateProdutoVenda,
} = require("../controllers/produtosController");

router.get("/despesasTotais", getDespesasTotais);
router.get("/low-stock", getLowStockProdutos);

router.get("/", getAllProdutos);
router.get("/:id", getProdutoById);
router.post("/", upload.single("imagem"), createProduto);
router.put("/:id", upload.single("imagem"), updateProduto);
router.delete("/:id", deleteProduto);
router.put("/:id/promocao", updateProdutoVenda);
router.put("/:id/renovar-estoque", renovarEstoque);
module.exports = router;
