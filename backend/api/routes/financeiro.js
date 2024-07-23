const express = require('express');
const router = express.Router();
const { getFinanceiroData, getExpensesByPeriod } = require('../controllers/financeiroController');

router.get('/', getFinanceiroData);
router.get('/expenses-by-period', getExpensesByPeriod);

module.exports = router;
