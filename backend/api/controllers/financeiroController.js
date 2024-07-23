const path = require('path');
const { readData, writeData } = require('../utils/fileOperations');
const { calcularMelhorMesVendas, calcularVariacaoOrcamentoAnoAnterior, calcularVariacaoVendasAnoAnterior, calcularVariacaoSaldoAnoAnterior } = require('../utils/calculations');

const financePath = path.join(__dirname, '..', '..', 'data', 'financeiro.json');
const purchasesPath = path.join(__dirname, '..', '..', 'data', 'compras.json');
const despesasPath = path.join(__dirname, '..', '..', 'data', 'despesas.json');


const getFinanceData = (filePath) => {
    const financeiro = readData(filePath);

    financeiro.gastos = financeiro.gastos ?? 0;
    financeiro.saldoVendas = financeiro.saldoVendas ?? 0;

    financeiro.melhorMesOrcamento = 'Janeiro';
    financeiro.melhorMesRealizado = calcularMelhorMesVendas(readData(purchasesPath));
    financeiro.melhorMesSaldo = 'Março';

    financeiro.vsOrcamentoAnoAnterior = calcularVariacaoOrcamentoAnoAnterior(financeiro.orcamento);
    financeiro.vsRealizadoAnoAnterior = calcularVariacaoVendasAnoAnterior(financeiro.saldoVendas);
    financeiro.vsSaldoAnoAnterior = calcularVariacaoSaldoAnoAnterior(financeiro.saldo);

    financeiro.totalExpenses = financeiro.gastos;
    financeiro.totalProfit = financeiro.saldoVendas;

    return financeiro;
};

const updateFinanceData = (filePath, financeiro) => {
    writeData(filePath, financeiro);
};

const getFinanceiroData = (req, res) => {
    const financeiro = getFinanceData(financePath);
    res.json(financeiro);
};



const getExpensesByPeriod = (req, res) => {
    try {
        const despesas = readData(despesasPath);
        const expensesByPeriod = despesas.reduce((acc, despesa) => {
            const periodo = new Date(despesa.data).toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
            if (!acc[periodo]) {
                acc[periodo] = 0;
            }
            acc[periodo] += despesa.valor;
            return acc;
        }, {});

        const expensesArray = Object.keys(expensesByPeriod).map(periodo => ({
            label: periodo,
            value: expensesByPeriod[periodo]
        }));

        res.json({ totalExpenses: expensesArray });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar despesas por período' });
    }
};

module.exports = {
    getFinanceData,
    updateFinanceData,
    getFinanceiroData,
    getExpensesByPeriod
};
