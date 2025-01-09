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
} = require("../controllers/produtosController");

router.get("/", getAllProdutos);
router.get("/:id", getProdutoById);
router.post("/", upload.single("imagem"), createProduto);
router.put("/:id", upload.single("imagem"), updateProduto);
router.delete("/:id", deleteProduto);
router.get("/low-stock", getLowStockProdutos);

module.exports = router;
