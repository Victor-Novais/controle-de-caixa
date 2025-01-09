const path = require("path");
const { readData, writeData } = require("../utils/fileOperations");

const purchasesPath = path.join(__dirname, "..", "..", "data", "compras.json");
const produtosPath = path.join(__dirname, "..", "..", "data", "produtos.json");

const createCompra = (req, res) => {
  const items = req.body;
  console.log("Dados recebidos:", req.body);

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error:
        "A requisição deve conter um array de produtos com produtoId, quantidade, e dataHoraCompra.",
    });
  }

  for (const item of items) {
    if (
      !item.produtoId ||
      !item.quantidade ||
      !item.dataHoraCompra ||
      isNaN(item.quantidade)
    ) {
      return res.status(400).json({
        error:
          "Cada item deve conter produtoId, quantidade (número) e dataHoraCompra.",
      });
    }
  }

  try {
    const produtos = readData(produtosPath);
    const purchases = readData(purchasesPath);

    let valorTotalCompra = 0;

    const updatedProdutos = produtos.map((produto) => {
      const item = items.find((i) => i.produtoId == produto.id);
      if (item) {
        if (produto.quantidadeEmEstoque < item.quantidade) {
          throw new Error(
            `Estoque insuficiente para o produto: ${produto.nome}`
          );
        }
        produto.quantidadeEmEstoque -= item.quantidade;
        valorTotalCompra += produto.valorVenda * item.quantidade;
      }
      return produto;
    });

    const newPurchases = items.map((item, index) => {
      const produtoRelacionado = produtos.find((p) => p.id == item.produtoId);
      if (!produtoRelacionado) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado.`);
      }
      return {
        id: purchases.length + index + 1,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        dataHoraCompra: item.dataHoraCompra,
        valorTotal: (produtoRelacionado.valorVenda * item.quantidade).toFixed(
          2
        ),
      };
    });

    purchases.push(...newPurchases);
    writeData(purchasesPath, purchases);
    writeData(produtosPath, updatedProdutos);

    return res.status(201).json(newPurchases);
  } catch (error) {
    console.error("Erro ao processar a compra:", error.message);
    return res.status(500).json({
      error:
        error.message ||
        "Erro interno no servidor. Tente novamente mais tarde.",
    });
  }
};
const getLucroTotal = (req, res) => {
  try {
    const purchases = readData(purchasesPath);

    const valorTotalCompras = purchases.reduce((total, compra) => {
      return total + parseFloat(compra.valorTotal);
    }, 0);

    res.status(200).json({ valorTotalCompras: valorTotalCompras.toFixed(2) });
  } catch (error) {
    console.error("Erro ao calcular valor total das compras:", error.message);
    res
      .status(500)
      .json({ error: "Erro ao calcular valor total das compras." });
  }
};
const getLucroPorPeriodo = (req, res) => {
  try {
    const purchases = readData(purchasesPath);

    const valorPorPeriodo = {};

    purchases.forEach((compra) => {
      const periodo = new Date(compra.dataHoraCompra).toISOString().slice(0, 7);

      if (!valorPorPeriodo[periodo]) {
        valorPorPeriodo[periodo] = 0;
      }
      valorPorPeriodo[periodo] += parseFloat(compra.valorTotal);
    });

    const response = Object.entries(valorPorPeriodo).map(
      ([periodo, valor]) => ({
        periodo,
        valorTotal: valor.toFixed(2),
      })
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao calcular valor total por período:", error.message);
    res
      .status(500)
      .json({ error: "Erro ao calcular valor total por período." });
  }
};

module.exports = { createCompra, getLucroTotal, getLucroPorPeriodo };
