import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./purchase.css";
import api from "../../service/api";

const Purchase = () => {
  const [products, setProducts] = useState([]);
  const [purchaseList, setPurchaseList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    nome: "",
    quantidade: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setError("Erro ao carregar produtos. Tente novamente mais tarde.");
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  const addProductToList = () => {
    setError("");
    setSuccess("");

    if (!currentProduct.nome.trim()) {
      setError("O nome do produto não pode estar vazio.");
      return;
    }

    if (!currentProduct.quantidade || currentProduct.quantidade <= 0) {
      setError("A quantidade deve ser maior que zero.");
      return;
    }

    const selectedProduct = products.find(
      (p) => p.nome.toLowerCase() === currentProduct.nome.toLowerCase()
    );

    if (!selectedProduct) {
      setError("Produto não encontrado. Verifique o nome e tente novamente.");
      return;
    }

    setPurchaseList((prevList) => [
      ...prevList,
      {
        ...selectedProduct,
        quantidade: parseInt(currentProduct.quantidade, 10),
      },
    ]);

    setCurrentProduct({ nome: "", quantidade: "" });
  };

  const calculateTotalValue = () => {
    return purchaseList
      .reduce((total, product) => {
        return total + product.valorVenda * product.quantidade;
      }, 0)
      .toFixed(2);
  };

  const handleSubmit = async () => {
    if (purchaseList.length === 0) {
      setError("Adicione pelo menos um produto à lista.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    const payload = purchaseList.map((product, index) => ({
      id: index + 1,
      produtoId: product.id,
      quantidade: product.quantidade.toString(),
      dataHoraCompra: new Date().toISOString(),
    }));

    try {
      const response = await api.post("/compras", payload);
      if (response && response.status === 201) {
        setSuccess("Compra realizada com sucesso!");
        setPurchaseList([]);
      } else {
        setError(
          "Erro ao efetuar a compra. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro:", error);
      if (error.response) {
        console.error("Erro na resposta:", error.response);
        setError(
          `Erro HTTP: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
        setError("Erro na requisição. Tente novamente mais tarde.");
      } else {
        console.error("Erro desconhecido:", error.message);
        setError("Erro desconhecido. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="purchase-container">
      <h1 className="purchase-title">Efetuar Compra</h1>

      <div className="purchase-form">
        {/* Campo de nome do produto */}
        <motion.div
          className="purchase-form-group"
          whileHover={{ scale: 1.05 }}
        >
          <label className="purchase-label">Nome do Produto</label>
          <input
            type="text"
            name="nome"
            value={currentProduct.nome}
            onChange={handleChange}
            className="purchase-input"
            placeholder="Digite o nome do produto"
          />
        </motion.div>

        {/* Campo de quantidade */}
        <motion.div
          className="purchase-form-group"
          whileHover={{ scale: 1.05 }}
        >
          <label className="purchase-label">Quantidade</label>
          <input
            type="number"
            name="quantidade"
            value={currentProduct.quantidade}
            onChange={handleChange}
            className="purchase-input"
            min="1"
          />
        </motion.div>

        {/* Botão de adicionar produto */}
        <motion.button
          type="button"
          onClick={addProductToList}
          className="purchase-btn-add"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Adicionar Produto
        </motion.button>
      </div>

      {/* Lista de produtos */}
      <ul className="purchase-list">
        {purchaseList.map((product, index) => (
          <li key={index} className="purchase-item">
            <img
              className="produto-imagem"
              src={`http://localhost:5000${product.imagem}`}
              alt={product.nome}
            />
            <div>
              <p>{product.nome}</p>
              <p>Qtd: {product.quantidade}</p>
              <p>R$ {(product.valorVenda * product.quantidade).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Total e botão de compra */}
      <div className="purchase-total">
        <p>Valor Total: R$ {calculateTotalValue()}</p>
      </div>
      <motion.button
        className="purchase-btn-submit"
        onClick={handleSubmit}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? "Processando..." : "Finalizar Compra"}
      </motion.button>

      {/* Mensagens de erro ou sucesso */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Purchase;
