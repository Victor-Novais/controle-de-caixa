import React, { useState, useEffect } from 'react';
import './ProductList.css';
import api from '../../service/api.js';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    useEffect(() => {
        api.get('/produtos')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error:', error));
    }, []);


    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <>
            <h1 className="title-list">LISTA DE PRODUTOS</h1>
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Cor</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.nome}</td>
                                <td>{product.categoria}</td>
                                <td>{product.cor}</td>
                                <td>{product.quantidadeEmEstoque}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-list">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
}
