import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ProductList.css";
import api from "../../service/api";

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/produtos");
      setAllProducts(response.data);
    } catch (err) {
      setError("Erro ao carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/produtos/${id}`);
      setAllProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      alert("Erro ao deletar o produto.");
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageButtons = () => {
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const buttons = [];
    const maxVisibleButtons = 5;
    const startPage = Math.max(
      currentPage - Math.floor(maxVisibleButtons / 2),
      1
    );
    const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <motion.button
          key={i}
          onClick={() => paginate(i)}
          className={`page-button ${currentPage === i ? "active" : ""}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {i}
        </motion.button>
      );
    }

    return buttons;
  };

  return (
    <div className="geral">
      <h1 className="title-list">Lista de Produtos</h1>

      {loading && <div className="loading">Carregando produtos...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && currentProducts.length === 0 && (
        <div className="no-products">Nenhum produto encontrado.</div>
      )}

      <motion.div
        className="product-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="product-grid">
          {currentProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={`http://localhost:5000${product.imagem}`}
                alt={product.nome}
                className="product-image"
              />
              <div className="product-details">
                <h3>{product.nome}</h3>
                <h4>ID : {product.id}</h4>
                <p>Categoria: {product.categoria}</p>
                <p>Cor: {product.cor}</p>
                <p>Quantidade: {product.quantidadeEmEstoque}</p>
                <p>Preço: R$ {product.valorVenda.toFixed(2)}</p>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="delete-button"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {allProducts.length > itemsPerPage && (
        <div className="pagination-list">
          <motion.button
            onClick={() => paginate(currentPage - 1)}
            className="page-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentPage === 1}
          >
            Anterior
          </motion.button>
          {renderPageButtons()}
          <motion.button
            onClick={() => paginate(currentPage + 1)}
            className="page-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={
              currentPage === Math.ceil(allProducts.length / itemsPerPage)
            }
          >
            Próximo
          </motion.button>
        </div>
      )}
    </div>
  );
}
