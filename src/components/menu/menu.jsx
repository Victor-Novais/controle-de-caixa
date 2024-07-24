import "./menu.css";
import { FaTachometerAlt, FaRegEdit, FaList, FaShoppingCart } from 'react-icons/fa';

export default function Menu({ setCurrentPage }) {
    return (
        <div className="menu">
            <div className="options">
                <div className="option" onClick={() => setCurrentPage('main')}>
                    <FaTachometerAlt className="icon" size={20} />
                    <h1>Desempenho</h1>
                </div>
                <div className="option" onClick={() => setCurrentPage('register')}>
                    <FaRegEdit className="icon" size={20} />
                    <h1>Cadastrar</h1>
                </div>
                <div className="option" onClick={() => setCurrentPage('product-list')}>
                    <FaList className="icon" size={20} />
                    <h1>Lista de Produtos</h1>
                </div>
                <div className="option" onClick={() => setCurrentPage('purchase')}>
                    <FaShoppingCart className="icon" size={20} />
                    <h1>Efetuar Compra</h1>
                </div>
            </div>
            <div className="line-1"></div>
        </div>
    );
}
