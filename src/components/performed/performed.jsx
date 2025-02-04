import React, { useState, useEffect } from "react";
import "./performed.css";
import api from "../../service/api.js";

export default function Performed() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        const lowStockProducts = response.data.filter(
          (product) => product.quantidadeEmEstoque < 5
        );
        setProducts(lowStockProducts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/produtos");
        const lowStockProducts = response.data.filter(
          (product) => product.quantidadeEmEstoque < 5
        );
        setProducts(lowStockProducts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setProducts([]);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="performed">
      <h1 className="tittle-performed">Produtos com Baixo Estoque</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tamanho</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.nome}</td>
                <td>{product.tamanho}</td>
                <td>{product.quantidadeEmEstoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
