import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProductList.css';
import api from '../../service/api.js';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [pageGroup, setPageGroup] = useState(0);

    useEffect(() => {
        api.get('/produtos')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const totalPageGroups = Math.ceil(totalPages / 10);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPageGroup = () => setPageGroup((prevGroup) => Math.min(prevGroup + 1, totalPageGroups - 1));
    const prevPageGroup = () => setPageGroup((prevGroup) => Math.max(prevGroup - 1, 0));

    const renderPageButtons = () => {
        const startPage = pageGroup * 10 + 1;
        const endPage = Math.min(startPage + 9, totalPages);
        const buttons = [];

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <motion.button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`page-button ${currentPage === i ? 'active' : ''}`}
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
        <>
            <h1 className="title-list">LISTA DE PRODUTOS</h1>
            <motion.div
                className="product-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
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
                            <motion.tr
                                key={product.id}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td>{product.id}</td>
                                <td>{product.nome}</td>
                                <td>{product.categoria}</td>
                                <td>{product.cor}</td>
                                <td>{product.quantidadeEmEstoque}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
            <div className="pagination-list">
                <motion.button
                    onClick={prevPageGroup}
                    className="page-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={pageGroup === 0}
                >
                    Anterior
                </motion.button>
                {renderPageButtons()}
                <motion.button
                    onClick={nextPageGroup}
                    className="page-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={pageGroup === totalPageGroups - 1}
                >
                    Próximo
                </motion.button>
            </div>
        </>
    );
}
