const express = require("express");
const router = express.Router();
const {
  generateReport,
  generateSalesReportByPeriod,
} = require("../controllers/relatoriosController");

router.get("/", generateReport);
router.get("/vendas/periodo", generateSalesReportByPeriod);

module.exports = router;
