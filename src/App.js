import React, { useState } from 'react';
import './App.css';
import Main from './pages/Main/main';
import Register from './pages/register/register';
import Menu from './components/menu/menu';
import ProductList from './pages/ProductList/ProductList';
import Purchase from './pages/Purchase/purchase';

function App() {
  const [currentPage, setCurrentPage] = useState('main');

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <Main />;
      case 'register':
        return <Register />;
      case 'product-list':
        return <ProductList />;
      case 'purchase':
        return <Purchase />;
      default:
        return <Main />;
    }
  };

  return (
    <div className="App">
      <Menu setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;