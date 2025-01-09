const path = require("path");
const { readData, writeData } = require("../utils/fileOperations");
const {
  calcularMelhorMesVendas,
  calcularVariacaoOrcamentoAnoAnterior,
  calcularVariacaoVendasAnoAnterior,
  calcularVariacaoSaldoAnoAnterior,
} = require("../utils/fileOperations");

const financePath = path.join(__dirname, "..", "..", "data", "financeiro.json");
const purchasesPath = path.join(__dirname, "..", "..", "data", "compras.json");
const despesasPath = path.join(__dirname, "..", "..", "data", "despesas.json");

const updateFinanceData = () => {
  const financeiro = readData(financePath) || {};
  if (!financeiro) {
    throw new Error("Erro ao carregar dados financeiros.");
  }
  financeiro.gastos = readData(despesasPath).reduce(
    (acc, despesa) => acc + despesa.valor,
    0
  );
  financeiro.saldoVendas = readData(purchasesPath).reduce(
    (acc, compra) => acc + compra.valorCompra,
    0
  );

  financeiro.melhorMesOrcamento = "Janeiro";
  financeiro.melhorMesRealizado = calcularMelhorMesVendas(
    readData(purchasesPath)
  );
  financeiro.melhorMesSaldo = "Março";

  financeiro.vsOrcamentoAnoAnterior = calcularVariacaoOrcamentoAnoAnterior(
    financeiro.orcamento
  );
  financeiro.vsRealizadoAnoAnterior = calcularVariacaoVendasAnoAnterior(
    financeiro.saldoVendas
  );
  financeiro.vsSaldoAnoAnterior = calcularVariacaoSaldoAnoAnterior(
    financeiro.saldo
  );

  financeiro.totalExpenses = financeiro.gastos;
  financeiro.totalProfit = financeiro.saldoVendas;

  writeData(financePath, financeiro);

  return financeiro;
};

const getFinanceiroData = (req, res) => {
  try {
    const financeiro = updateFinanceData();
    res.json(financeiro);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados financeiros" });
  }
};

const getExpensesByPeriod = (req, res) => {
  try {
    const despesas = readData(despesasPath);
    const expensesByPeriod = despesas.reduce((acc, despesa) => {
      const periodo = new Date(despesa.data).toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      if (!acc[periodo]) {
        acc[periodo] = 0;
      }
      acc[periodo] += despesa.valor;
      return acc;
    }, {});

    const expensesArray = Object.keys(expensesByPeriod).map((periodo) => ({
      label: periodo,
      value: expensesByPeriod[periodo],
    }));

    res.json({ totalExpenses: expensesArray });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar despesas por período" });
  }
};

module.exports = {
  updateFinanceData,
  getFinanceiroData,
  getExpensesByPeriod,
};
