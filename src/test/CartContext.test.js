import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, CartContext } from '../context/CartContext';

// Helper para renderizar el contexto
const renderCart = () => {
  let result;
  renderHook(() => {
    result = React.useContext(CartContext);
    return result;
  }, {
    wrapper: CartProvider
  });
  return result;
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear(); // limpiar entre pruebas
  });

  test('agrega un producto al carrito', () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 1, nombre: 'Cupcake', stock: 5 });
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(1);
  });

  test('incrementa cantidad si el producto ya está', () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 2, nombre: 'Torta', stock: 5 });
      result.current.agregarAlCarrito({ id: 2, nombre: 'Torta', stock: 5 });
    });

    expect(result.current.carrito[0].cantidad).toBe(2);
  });

  test('no permite agregar más del stock', () => {
    global.alert = jest.fn(); // mock de alert

    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      for (let i = 0; i < 6; i++) {
        result.current.agregarAlCarrito({ id: 3, nombre: 'Brownie', stock: 5 });
      }
    });

    expect(global.alert).toHaveBeenCalledWith("No hay suficiente stock disponible ❌");
    expect(result.current.carrito[0].cantidad).toBe(5);
  });

  test('elimina un producto del carrito', () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 4, nombre: 'Galleta', stock: 10 });
      result.current.eliminarDelCarrito(4);
    });

    expect(result.current.carrito).toHaveLength(0);
  });

  test('vacía el carrito', () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 5, nombre: 'Tarta', stock: 10 });
      result.current.vaciarCarrito();
    });

    expect(result.current.carrito).toHaveLength(0);
  });

  test('actualiza la cantidad de un producto', () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 6, nombre: 'Cheesecake', stock: 10 });
      result.current.actualizarCantidad(6, 3);
    });

    expect(result.current.carrito[0].cantidad).toBe(3);
  });

  test('elimina producto si cantidad nueva es menor a 1', () => {
    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 7, nombre: 'Tiramisú', stock: 10 });
      result.current.actualizarCantidad(7, 0);
    });

    expect(result.current.carrito).toHaveLength(0);
  });

  test('no permite actualizar si cantidad nueva supera stock', () => {
    global.alert = jest.fn();

    const { result } = renderHook(() => React.useContext(CartContext), {
      wrapper: CartProvider,
    });

    act(() => {
      result.current.agregarAlCarrito({ id: 8, nombre: 'Roll', stock: 3 });
      result.current.actualizarCantidad(8, 5);
    });

    expect(global.alert).toHaveBeenCalledWith("No puedes agregar más de lo que hay en stock ❌");
    expect(result.current.carrito[0].cantidad).toBe(1);
  });
});