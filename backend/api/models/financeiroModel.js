const { readData, writeData } = require('../utils/fileOperations');
const config = require('../../config');

const getFinanceiro = () => readData(config.financePath);
const saveFinanceiro = (financeiro) => writeData(config.financePath, financeiro);

module.exports = { getFinanceiro, saveFinanceiro };
