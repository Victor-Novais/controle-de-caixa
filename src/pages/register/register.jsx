import React, { useState } from 'react';
import axios from 'axios';

import './register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        nome: '',
        categoria: '',
        tamanho: '',
        cor: '',
        valorCompra: '',
        valorVenda: '',
        quantidadeEmEstoque: '',
        marca: '',
        genero: '',
        fornecedor: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSend = {
            ...formData,
            valorCompra: parseFloat(formData.valorCompra),
            valorVenda: parseFloat(formData.valorVenda),
            quantidadeEmEstoque: parseInt(formData.quantidadeEmEstoque, 10)
        };

        axios.post('http://localhost:5000/api/produtos', dataToSend)
            .then(response => {
                console.log('Sucesso:', response.data);
                setSuccess('Produto cadastrado com sucesso!');
                setError('');
                setFormData({
                    nome: '',
                    categoria: '',
                    tamanho: '',
                    cor: '',
                    valorCompra: '',
                    valorVenda: '',
                    quantidadeEmEstoque: '',
                    marca: '',
                    genero: '',
                    fornecedor: ''
                });
            })
            .catch((error) => {
                setError('Erro ao cadastrar produto. Verifique os dados e tente novamente.');
                console.error('Erro:', error);
                setSuccess('');
            });
    };

    return (
        <>
            <h1 className='title-register'>CADASTRAR ROUPA</h1>
            <div className="register">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Categoria</label>
                        <input
                            type="text"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tamanho</label>
                        <input
                            type="text"
                            name="tamanho"
                            value={formData.tamanho}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Cor</label>
                        <input
                            type="text"
                            name="cor"
                            value={formData.cor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Valor de Compra</label>
                        <input
                            type="number"
                            name="valorCompra"
                            value={formData.valorCompra}
                            onChange={handleChange}
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantidade em Estoque</label>
                        <input
                            type="number"
                            name="quantidadeEmEstoque"
                            value={formData.quantidadeEmEstoque}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Marca</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Gênero</label>
                        <input
                            type="text"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fornecedor</label>
                        <input
                            type="text"
                            name="fornecedor"
                            value={formData.fornecedor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn-submit" type="submit">Salvar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </>
    );
}
