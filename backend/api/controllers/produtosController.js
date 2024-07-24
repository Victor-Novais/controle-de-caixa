const path = require('path');
const { readData, writeData } = require('../utils/fileOperations');

const produtosFilePath = path.join(__dirname, '..', '..', 'data', 'produtos.json');
const despesasFilePath = path.join(__dirname, '..', '..', 'data', 'despesas.json');
const financeFilePath = path.join(__dirname, '..', '..', 'data', 'financeiro.json');

const getAllProdutos = (req, res) => {
    try {
        const produtos = readData(produtosFilePath);
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produtos', error });
    }
};

const getProdutoById = (req, res) => {
    try {
        const produtos = readData(produtosFilePath);
        const produto = produtos.find(p => p.id === parseInt(req.params.id));
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter produto', error });
    }
};

const createProduto = (req, res) => {
    try {
        const produtos = readData(produtosFilePath);
        const novoProduto = {
            id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
            ...req.body,
            dataHoraRegistro: new Date().toISOString()
        };
        produtos.push(novoProduto);
        writeData(produtosFilePath, produtos);

        const despesas = readData(despesasFilePath);
        const valorDespesa = novoProduto.valorCompra * novoProduto.quantidadeEmEstoque;
        const novaDespesa = {
            descricao: `Compra de ${novoProduto.nome}`,
            valor: valorDespesa,
            data: new Date().toISOString()
        };
        despesas.push(novaDespesa);
        writeData(despesasFilePath, despesas);


        const financeiro = readData(financeFilePath);
        financeiro.gastos = (financeiro.gastos || 0) + valorDespesa;
        financeiro.totalExpenses = (financeiro.totalExpenses || 0) + valorDespesa;
        financeiro.totalProfit = financeiro.saldoVendas - financeiro.totalExpenses;
        writeData(financeFilePath, financeiro);

        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
};

const updateProduto = (req, res) => {
    try {
        const produtos = readData(produtosFilePath);
        const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        const produtoAtualizado = { ...produtos[index], ...req.body };
        produtos[index] = produtoAtualizado;
        writeData(produtosFilePath, produtos);
        res.json(produtoAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};

const deleteProduto = (req, res) => {
    try {
        let produtos = readData(produtosFilePath);
        produtos = produtos.filter(p => p.id !== parseInt(req.params.id));
        writeData(produtosFilePath, produtos);
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover produto', error });
    }
};

const getLowStockProdutos = (req, res) => {
    try {
        const produtos = readData(produtosFilePath);
        console.log('Produtos:', produtos);
        const lowStockProdutos = produtos.filter(produto => produto.quantidadeEmEstoque < 5);
        res.json(lowStockProdutos);
    } catch (error) {
        console.error('Erro ao obter produtos com baixa quantidade:', error);
        res.status(500).json({ message: 'Erro ao obter produtos com baixa quantidade', error });
    }
};

module.exports = {
    getAllProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto,
    getLowStockProdutos
};
