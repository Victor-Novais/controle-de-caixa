const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/relatoriosController');
const { generateSalesReportByPeriod } = require('../controllers/relatoriosController');

router.get('/', generateReport);
router.get('/vendas/periodo', generateSalesReportByPeriod);
module.exports = router;
