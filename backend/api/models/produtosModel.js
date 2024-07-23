const { readData, writeData } = require('../utils/fileOperations');
const config = require('../../config');

const getProdutos = () => readData(config.dataPath);
const saveProdutos = (produtos) => writeData(config.dataPath, produtos);

module.exports = { getProdutos, saveProdutos };
