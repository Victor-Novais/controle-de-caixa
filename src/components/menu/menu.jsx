import "./menu.css"

export default function Menu({ setCurrentPage }) {
    return (
        <div className="menu">
            <div className="options">
                <div onClick={() => setCurrentPage('main')}>
                    <h1>Performance</h1>
                </div>
                <div onClick={() => setCurrentPage('register')}>
                    <h1>Cadastrar</h1>
                </div>
                <div onClick={() => setCurrentPage('product-list')}>
                    <h1>Lista de Produtos</h1>
                </div>
                <div onClick={() => setCurrentPage('purchase')}>
                    <h1>Efetuar Compra</h1>
                </div>
            </div>

            <div className="line-1"></div>
        </div >
    )
}