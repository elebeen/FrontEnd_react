import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Pago from './pages/Pago';
import Login from './pages/Login';
import RutaProtegida from './components/RutaProtegida';
import Register from './pages/Register';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<RutaProtegida><Cart /></RutaProtegida>} />
          <Route path="/pago" element={<RutaProtegida><Pago /></RutaProtegida>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
