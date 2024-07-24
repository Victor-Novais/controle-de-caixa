import React, { useState } from 'react';
import api from '../../service/api';
import { CSSTransition } from 'react-transition-group';
import InputMask from 'react-input-mask';
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
            valorCompra: parseFloat(formData.valorCompra.replace(/[^0-9,-]+/g, '').replace(',', '.')),
            valorVenda: parseFloat(formData.valorVenda.replace(/[^0-9,-]+/g, '').replace(',', '.')),
            quantidadeEmEstoque: parseInt(formData.quantidadeEmEstoque, 10)
        };

        api.post('/produtos', dataToSend)
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
                    {['nome', 'categoria', 'tamanho', 'cor', 'quantidadeEmEstoque', 'marca', 'genero', 'fornecedor'].map((field) => (
                        <div className="form-group" key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field.includes('quantidade') ? 'number' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="form-group">
                        <label>Valor de Compra</label>
                        <InputMask
                            mask="R$ 999,99"
                            value={formData.valorCompra}
                            onChange={handleChange}
                            name="valorCompra"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Valor de Venda</label>
                        <InputMask
                            mask="R$ 999,99"
                            value={formData.valorVenda}
                            onChange={handleChange}
                            name="valorVenda"
                            required
                        />
                    </div>
                    <button className="btn-submit" type="submit">Salvar</button>
                </form>
                <CSSTransition
                    in={!!error}
                    timeout={300}
                    classNames="alert"
                    unmountOnExit
                >
                    <p className="error-message-register">{error}</p>
                </CSSTransition>
                <CSSTransition
                    in={!!success}
                    timeout={300}
                    classNames="alert"
                    unmountOnExit
                >
                    <p className="success-message-register">{success}</p>
                </CSSTransition>
            </div>
        </>
    );
}
