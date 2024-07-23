const { readData, writeData } = require('../utils/fileOperations');
const config = require('../../config');

const getCompras = () => readData(config.purchasesPath);
const saveCompras = (compras) => writeData(config.purchasesPath, compras);

module.exports = { getCompras, saveCompras };
