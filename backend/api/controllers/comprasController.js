const path = require('path');
const { readData, writeData } = require('../utils/fileOperations');
const { getFinanceData, updateFinanceData } = require('./financeiroController');

const purchasesPath = path.join(__dirname, '..', '..', 'data', 'compras.json');
const produtosPath = path.join(__dirname, '..', '..', 'data', 'produtos.json');
const financePath = path.join(__dirname, '..', '..', 'data', 'financeiro.json');

const createCompra = (req, res) => {
    const purchases = readData(purchasesPath);
    const newPurchase = {
        id: purchases.length ? purchases[purchases.length - 1].id + 1 : 1,
        ...req.body,
        dataHoraCompra: new Date().toISOString()
    };
    purchases.push(newPurchase);
    writeData(purchasesPath, purchases);

    const produtos = readData(produtosPath);
    const produtoIndex = produtos.findIndex(p => p.id === parseInt(req.body.produtoId));
    if (produtoIndex !== -1) {
        produtos[produtoIndex].quantidadeEmEstoque -= parseInt(req.body.quantidade);
        writeData(produtosPath, produtos);
    }

    const financeiro = getFinanceData(financePath);
    const venda = parseFloat(req.body.valorCompra) * parseInt(req.body.quantidade);
    financeiro.saldoVendas += venda;
    updateFinanceData(financePath, financeiro);

    res.status(201).json(newPurchase);
};

module.exports = { createCompra };
