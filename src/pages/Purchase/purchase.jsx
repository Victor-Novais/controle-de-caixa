import React, { useState, useEffect } from 'react';
import './purchase.css';
import api from '../../service/api';

const Purchase = () => {
    const [purchaseData, setPurchaseData] = useState({
        produtoId: '',
        quantidade: '',
        valorCompra: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [produtoInfo, setProdutoInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPurchaseData({
            ...purchaseData,
            [name]: value
        });
    };

    useEffect(() => {
        if (purchaseData.produtoId) {
            fetchProdutoInfo(purchaseData.produtoId);
        }
    }, [purchaseData.produtoId]);

    useEffect(() => {
        if (produtoInfo && purchaseData.quantidade) {
            calculateValorCompra(produtoInfo.valorVenda, purchaseData.quantidade);
        }
    }, [produtoInfo, purchaseData.quantidade]);

    const fetchProdutoInfo = async (produtoId) => {
        try {
            setIsLoading(true);
            const response = await api.get(`/produtos/${produtoId}`);
            const produto = response.data;
            setProdutoInfo(produto);
            setIsLoading(false);
            setError('');
        } catch (error) {
            console.error('Erro ao buscar informações do produto:', error);
            setError('Produto não encontrado ou erro ao buscar informações.');
            setProdutoInfo(null);
            setIsLoading(false);
        }
    };

    const calculateValorCompra = (valorVenda, quantidade) => {
        if (valorVenda !== undefined && quantidade !== undefined) {
            const valorCompra = valorVenda * quantidade;
            setPurchaseData((prevData) => ({
                ...prevData,
                valorCompra: valorCompra.toFixed(2)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await api.post('/compras', {
                ...purchaseData,
                dataHora: new Date().toISOString()
            });
            setSuccess('Compra realizada com sucesso!');
            setPurchaseData({
                produtoId: '',
                quantidade: '',
                valorCompra: ''
            });
            setProdutoInfo(null);
            console.log('Success:', response.data);
        } catch (error) {
            setError('Erro ao efetuar a compra. Verifique os dados e tente novamente.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="purchase-title">Efetuar Compra</h1>
            <div className="purchase-container">
                <form onSubmit={handleSubmit} className="purchase-form">
                    <div className="purchase-form-group">
                        <label className="purchase-label">Produto ID</label>
                        <input
                            type="text"
                            name="produtoId"
                            value={purchaseData.produtoId}
                            onChange={handleChange}
                            className="purchase-input"
                            required
                        />
                    </div>
                    <div className="purchase-form-group">
                        <label className="purchase-label">Quantidade</label>
                        <input
                            type="number"
                            name="quantidade"
                            value={purchaseData.quantidade}
                            onChange={handleChange}
                            className="purchase-input"
                            required
                            min="1"
                        />
                    </div>
                    {isLoading && <p className="loading-message">Carregando informações do produto...</p>}
                    {produtoInfo && produtoInfo.valorVenda !== undefined && (
                        <div className="purchase-form-group">
                            <label className="purchase-label">Valor de Compra</label>
                            <input
                                type="text"
                                name="valorCompra"
                                value={`R$ ${purchaseData.valorCompra}`}
                                onChange={handleChange}
                                className="purchase-input"
                                readOnly
                            />
                            <p className="purchase-info">Valor unitário: R$ {produtoInfo.valorVenda.toFixed(2)}</p>
                            <p className="purchase-info">Valor total: R$ {(parseFloat(purchaseData.valorCompra)).toFixed(2)}</p>
                        </div>
                    )}
                    <button className="purchase-btn-submit" type="submit" disabled={isLoading}>
                        {isLoading ? 'Processando...' : 'Comprar'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </>
    );
};

export default Purchase;
