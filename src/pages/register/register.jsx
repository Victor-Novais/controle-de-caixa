import React, { useState } from "react";
import api from "../../service/api";
import "./register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    tamanho: "",
    cor: "",
    valorCompra: "",
    valorVenda: "",
    quantidadeEmEstoque: "",
    marca: "",
    genero: "",
    fornecedor: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 5MB.");
        setImage(null);
        setPreview("");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "valorCompra" || key === "valorVenda") {
        data.append(key, parseFloat(formData[key]) || 0);
      } else if (key === "quantidadeEmEstoque") {
        data.append(key, parseInt(formData[key], 10) || 0);
      } else {
        data.append(key, formData[key] || "");
      }
    });

    if (image) {
      data.append("imagem", image);
    }

    console.log("Dados enviados:", Object.fromEntries(data.entries()));

    try {
      const response = await api.post("/produtos", data);
      setSuccess("Produto cadastrado com sucesso!");
      setError("");
      setFormData({
        nome: "",
        categoria: "",
        tamanho: "",
        cor: "",
        valorCompra: "",
        valorVenda: "",
        quantidadeEmEstoque: "",
        marca: "",
        genero: "",
        fornecedor: "",
      });
      setImage(null);
      setPreview("");
      console.log("Resposta do servidor:", response.data);
    } catch (err) {
      setError(
        "Erro ao cadastrar produto. Verifique os dados e tente novamente."
      );
      setSuccess("");
      console.error("Erro ao enviar:", err);
    }
  };

  return (
    <>
      <h1 className="title-register">Cadastrar Produto</h1>
      <div className="register">
        <form className="form" onSubmit={handleSubmit}>
          {[
            "nome",
            "categoria",
            "tamanho",
            "cor",
            "quantidadeEmEstoque",
            "marca",
            "genero",
            "fornecedor",
          ].map((field) => (
            <div className="form-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field.includes("quantidade") ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Digite o ${field}`}
                required
              />
            </div>
          ))}
          <div className="form-group">
            <label>Valor de Compra</label>
            <input
              type="number"
              name="valorCompra"
              value={formData.valorCompra}
              onChange={handleChange}
              placeholder="R$"
              required
            />
          </div>
          <div className="form-group">
            <label>Valor de Venda</label>
            <input
              type="number"
              name="valorVenda"
              value={formData.valorVenda}
              onChange={handleChange}
              placeholder="R$"
              required
            />
          </div>
          <div className="form-group">
            <label>Imagem do Produto</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Pré-visualização do Produto" />
              </div>
            )}
          </div>
          <button className="btn-submit" type="submit">
            Salvar
          </button>
        </form>
        {success && <p className="success-message-register">{success}</p>}
        {error && <p className="error-message-register">{error}</p>}
      </div>
    </>
  );
}
