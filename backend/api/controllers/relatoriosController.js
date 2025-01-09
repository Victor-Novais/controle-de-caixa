const path = require("path");
const { readData } = require("../utils/fileOperations");

const purchasesPath = path.join(__dirname, "..", "..", "data", "compras.json");

const generateReport = (req, res) => {
  const compras = readData(purchasesPath);
  const totalPurchases = compras.length;
  const totalValue = compras.reduce(
    (sum, purchase) => sum + purchase.valorCompra * purchase.quantidade,
    0
  );

  const report = {
    totalPurchases,
    totalValue,
  };

  res.json(report);
};

const generateSalesReportByPeriod = (req, res) => {
  const compras = readData(purchasesPath);

  const vendasPorPeriodo = compras.reduce((acc, compra) => {
    const periodo = new Date(compra.dataHoraCompra).toLocaleString("pt-BR", {
      month: "long",
      year: "numeric",
    });
    if (!acc[periodo]) {
      acc[periodo] = 0;
    }

    acc[periodo] += parseFloat(compra.valorCompra);
    return acc;
  }, {});

  const vendasArray = Object.keys(vendasPorPeriodo).map((periodo) => ({
    periodo,
    total: vendasPorPeriodo[periodo],
  }));

  res.json(vendasArray);
};

module.exports = { generateReport, generateSalesReportByPeriod };
