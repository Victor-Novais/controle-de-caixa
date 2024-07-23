const express = require('express');
const router = express.Router();
const { createCompra } = require('../controllers/comprasController');

router.post('/', createCompra);

module.exports = router;
