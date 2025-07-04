import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { CartContext } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

const renderCart = (carrito = [], funcionesMock = {}) => {
  const defaultFuncs = {
    eliminarDelCarrito: jest.fn(),
    vaciarCarrito: jest.fn(),
    actualizarCantidad: jest.fn()
  };

  render(
    <CartContext.Provider value={{ carrito, ...defaultFuncs, ...funcionesMock }}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartContext.Provider>
  );
};

describe('Cart.js', () => {
  test('muestra mensaje si el carrito está vacío', () => {
    renderCart([]);
    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
  });

  test('renderiza los productos del carrito', () => {
    const carritoMock = [
      { id: 1, nombre: 'Cupcake', precio: 5, cantidad: 2 }
    ];
    renderCart(carritoMock);
    expect(screen.getByText('Cupcake')).toBeInTheDocument();
    expect(screen.getByText('S/ 5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Cambiado a getAllByText para evitar error de texto duplicado
    const totalItems = screen.getAllByText('S/ 10.00');
    expect(totalItems.length).toBeGreaterThan(0);
  });

  test('botón "Quitar" llama a eliminarDelCarrito', () => {
    const eliminarMock = jest.fn();
    const carritoMock = [{ id: 1, nombre: 'Cupcake', precio: 5, cantidad: 1 }];
    renderCart(carritoMock, { eliminarDelCarrito: eliminarMock });

    fireEvent.click(screen.getByRole('button', { name: /quitar/i }));
    expect(eliminarMock).toHaveBeenCalledWith(1);
  });

  test('botón "Vaciar Carrito" llama a vaciarCarrito', () => {
    const vaciarMock = jest.fn();
    const carritoMock = [{ id: 1, nombre: 'Cupcake', precio: 5, cantidad: 1 }];
    renderCart(carritoMock, { vaciarCarrito: vaciarMock });

    fireEvent.click(screen.getByText(/vaciar carrito/i));
    expect(vaciarMock).toHaveBeenCalledTimes(1);
  });

  test('botón "+" llama a actualizarCantidad con cantidad + 1', () => {
    const actualizarMock = jest.fn();
    const carritoMock = [{ id: 1, nombre: 'Cupcake', precio: 5, cantidad: 2 }];
    renderCart(carritoMock, { actualizarCantidad: actualizarMock });

    const botonMas = screen.getAllByRole('button', { name: '+' })[0];
    fireEvent.click(botonMas);
    expect(actualizarMock).toHaveBeenCalledWith(1, 3);
  });

  test('botón "-" llama a actualizarCantidad con cantidad - 1', () => {
    const actualizarMock = jest.fn();
    const carritoMock = [{ id: 1, nombre: 'Cupcake', precio: 5, cantidad: 2 }];
    renderCart(carritoMock, { actualizarCantidad: actualizarMock });

    const botonMenos = screen.getAllByRole('button', { name: '−' })[0]; // símbolo unicode
    fireEvent.click(botonMenos);
    expect(actualizarMock).toHaveBeenCalledWith(1, 1);
  });

  test('muestra el total correctamente calculado', () => {
    const carritoMock = [
      { id: 1, nombre: 'Cupcake', precio: 5, cantidad: 2 },
      { id: 2, nombre: 'Torta', precio: 10, cantidad: 1 }
    ];
    renderCart(carritoMock);

    // Forma robusta para validar texto partido entre h4 y strong
    const totalText = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === 'strong' &&
        content.includes('S/ 20.00')
      );
    });
    expect(totalText).toBeInTheDocument();
  });
});