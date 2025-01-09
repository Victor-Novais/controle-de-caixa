const express = require("express");
const router = express.Router();
const {
  createCompra,
  getLucroTotal,
  getLucroPorPeriodo,
} = require("../controllers/comprasController");

router.post("/", createCompra);
router.get("/lucro-total", getLucroTotal);
router.get("/lucro-periodo", getLucroPorPeriodo);

module.exports = router;
