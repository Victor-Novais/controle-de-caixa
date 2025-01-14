import React, { useState } from "react";
import api from "../../service/api";
import "./modal-add.css";

const Modal = ({ type, product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    price: type === "promotion" ? product?.valorVenda || "" : "",
    quantity: type === "restock" ? "" : "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ID do produto:", product?.id);

    if (type === "promotion" && (!formData.price || formData.price <= 0)) {
      alert("Por favor, insira um preço válido.");
      return;
    }

    if (type === "restock" && (!formData.quantity || formData.quantity <= 0)) {
      alert("Por favor, insira uma quantidade válida.");
      return;
    }

    setIsLoading(true);

    try {
      let response;
      if (type === "promotion") {
        response = await api.put(`/produtos/${product.id}/promocao`, {
          valorVenda: parseFloat(formData.price),
        });
      } else if (type === "restock") {
        // Atualizar estoque do produto
        response = await api.put(`/produtos/${product.id}/renovar-estoque`, {
          quantidadeAdicional: parseInt(formData.quantity),
        });
      }

      alert("Operação realizada com sucesso!");
      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderModalContent = () => {
    if (type === "promotion") {
      return (
        <>
          <h2>Editar Promoção</h2>
          <label htmlFor="price">Novo Preço:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Digite o novo preço..."
            min="0"
            step="0.01"
            required
          />
        </>
      );
    }

    if (type === "restock") {
      return (
        <>
          <h2>Renovar Estoque</h2>
          <label htmlFor="quantity">Nova Quantidade:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Digite a quantidade..."
            min="0"
            step="1"
            required
          />
          <p className="current-stock">
            Quantidade atual: {product?.quantidadeEmEstoque || 0}
          </p>
        </>
      );
    }

    return null;
  };

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          {renderModalContent()}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
