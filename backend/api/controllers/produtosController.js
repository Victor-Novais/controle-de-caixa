const path = require("path");
const { readData, writeData } = require("../utils/fileOperations");

const produtosFilePath = path.resolve(__dirname, "../../data/produtos.json");
const despesasFilePath = path.resolve(__dirname, "../../data/despesas.json");

const getAllProdutos = (req, res) => {
  try {
    const produtos = readData(produtosFilePath);
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter produtos", error });
  }
};

const getProdutoById = (req, res) => {
  try {
    const produtos = readData(produtosFilePath);
    const produto = produtos.find((p) => p.id === parseInt(req.params.id, 10));
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter produto", error });
  }
};

const createProduto = (req, res) => {
  try {
    const {
      nome,
      categoria,
      tamanho,
      cor,
      valorCompra,
      valorVenda,
      quantidadeEmEstoque,
      marca,
      genero,
      fornecedor,
    } = req.body;

    if (
      !nome ||
      !categoria ||
      !tamanho ||
      !cor ||
      !valorCompra ||
      !valorVenda ||
      !quantidadeEmEstoque ||
      !marca ||
      !genero ||
      !fornecedor
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const produtos = readData(produtosFilePath);
    const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;

    const produto = {
      id,
      nome,
      categoria,
      tamanho,
      cor,
      valorCompra: parseFloat(valorCompra),
      valorVenda: parseFloat(valorVenda),
      quantidadeEmEstoque: parseInt(quantidadeEmEstoque, 10),
      marca,
      genero,
      fornecedor,
      dataHoraRegistro: new Date().toISOString(),
      imagem: req.file ? `/uploads/${req.file.filename}` : null,
    };

    produtos.push(produto);
    writeData(produtosFilePath, produtos);

    const despesas = readData(despesasFilePath);
    const novaDespesa = {
      valor: produto.valorCompra * produto.quantidadeEmEstoque,
      descricao: `Compra de ${produto.nome}`,
      data: new Date().toISOString(),
    };

    despesas.push(novaDespesa);
    writeData(despesasFilePath, despesas);

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", error });
  }
};

const updateProduto = (req, res) => {
  try {
    const produtos = readData(produtosFilePath);
    const index = produtos.findIndex(
      (p) => p.id === parseInt(req.params.id, 10)
    );

    if (index === -1) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const { body, file } = req;
    const produtoAtualizado = {
      ...produtos[index],
      ...body,
      imagem: file ? `/uploads/${file.filename}` : produtos[index].imagem,
    };

    produtos[index] = produtoAtualizado;
    writeData(produtosFilePath, produtos);

    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto", error });
  }
};

const deleteProduto = (req, res) => {
  try {
    let produtos = readData(produtosFilePath);
    const produtoRemovido = produtos.find(
      (p) => p.id === parseInt(req.params.id, 10)
    );

    if (!produtoRemovido) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    produtos = produtos.filter((p) => p.id !== produtoRemovido.id);
    writeData(produtosFilePath, produtos);

    res.status(200).json({ message: "Produto removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover produto", error });
  }
};

const getLowStockProdutos = (req, res) => {
  try {
    const produtos = readData(produtosFilePath);
    const lowStockProdutos = produtos.filter(
      (produto) => produto.quantidadeEmEstoque < 5
    );
    res.status(200).json(lowStockProdutos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao obter produtos com baixa quantidade", error });
  }
};

const getDespesasTotais = (req, res) => {
  try {
    const despesas = readData(despesasFilePath);

    const despesasTotais = despesas.reduce((total, despesa) => {
      return total + parseFloat(despesa.valor || 0);
    }, 0);

    res.status(200).json({ despesasTotais: despesasTotais.toFixed(2) });
  } catch (error) {
    console.error("Erro ao obter despesas totais:", error.message);
    res.status(500).json({ message: "Erro ao obter despesas totais.", error });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
  getLowStockProdutos,
  getDespesasTotais,
};
