import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { motion } from 'framer-motion';
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
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPurchaseData({
            ...purchaseData,
            [name]: value
        });
    };

    const onSuggestionsFetchRequested = async ({ value }) => {
        try {
            const response = await api.get(`/produtos/search`, { params: { q: value } });
            setSuggestions(response.data);
        } catch (error) {
            console.error('Erro ao buscar sugestões:', error);
            setSuggestions([]);
        }
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => suggestion.nome;

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion.nome}
        </div>
    );

    const onSuggestionSelected = (event, { suggestion }) => {
        setPurchaseData({
            ...purchaseData,
            produtoId: suggestion.id
        });
        fetchProdutoInfo(suggestion.id);
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
            const valorVendaNumerico = parseFloat(valorVenda);
            const quantidadeNumerica = parseInt(quantidade, 10);

            if (!isNaN(valorVendaNumerico) && !isNaN(quantidadeNumerica)) {
                const valorTotalCompra = valorVendaNumerico * quantidadeNumerica;
                setPurchaseData((prevData) => ({
                    ...prevData,
                    valorCompra: valorTotalCompra.toFixed(2)
                }));
            }
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
        <motion.div
            className="purchase-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="purchase-title">Efetuar Compra</h1>
            <form onSubmit={handleSubmit} className="purchase-form">
                <motion.div className="purchase-form-group" whileHover={{ scale: 1.05 }}>
                    <label className="purchase-label">Produto</label>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={{
                            name: 'produtoId',
                            value: purchaseData.produtoId,
                            onChange: handleChange,
                            className: 'purchase-input',
                            required: true
                        }}
                        onSuggestionSelected={onSuggestionSelected}
                    />
                </motion.div>
                <motion.div className="purchase-form-group" whileHover={{ scale: 1.05 }}>
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
                </motion.div>
                {isLoading && <p className="loading-message">Carregando informações do produto...</p>}
                {produtoInfo && produtoInfo.valorVenda !== undefined && (
                    <motion.div className="purchase-form-group" whileHover={{ scale: 1.05 }}>
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
                        <p className="purchase-info">Valor total: R$ {purchaseData.valorCompra}</p>
                    </motion.div>
                )}
                <motion.button
                    className="purchase-btn-submit"
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isLoading ? 'Processando...' : 'Comprar'}
                </motion.button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </motion.div>
    );
};

export default Purchase;
