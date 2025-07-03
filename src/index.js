// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // 👈 importante

// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import './App.css'; // Tus estilos personalizados (App.css)


// Renderizado principal de la app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);