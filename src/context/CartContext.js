import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 🛒 Leer el carrito desde localStorage al iniciar
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  // 🧠 Guardar el carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        const nuevaCantidad = existe.cantidad + 1;
        if (nuevaCantidad > producto.stock) {
          alert("No hay suficiente stock disponible ❌");
          return prev;
        }
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: nuevaCantidad } : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito(prev => {
      const producto = prev.find(p => p.id === id);
      if (!producto) return prev;

      if (nuevaCantidad > producto.stock) {
        alert("No puedes agregar más de lo que hay en stock ❌");
        return prev;
      }

      if (nuevaCantidad < 1) {
        return prev.filter(p => p.id !== id);
      }

      return prev.map(p =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      );
    });
  };

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      actualizarCantidad
    }}>
      {children}
    </CartContext.Provider>
  );
};
