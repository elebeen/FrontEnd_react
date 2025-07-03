import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button, Table } from 'react-bootstrap';

const Cart = () => {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad // <-- necesitas tener esta función en CartContext
  } = useContext(CartContext);

  const total = carrito.reduce((sum, prod) => sum + prod.precio * prod.cantidad, 0);

  const incrementar = (id, cantidad) => {
    actualizarCantidad(id, cantidad + 1);
  };

  const decrementar = (id, cantidad) => {
    if (cantidad > 1) {
      actualizarCantidad(id, cantidad - 1);
    }
  };

  return (
    <div className="container mt-5 cart-container">
      <h2 className="mb-4 text-primary fw-bold">Tu Carrito 🛒</h2>

      {carrito.length === 0 ? (
        <p className="text-muted">No hay productos en el carrito.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="cart-table">
            <thead className="table-header">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.nombre}</td>
                  <td>S/ {prod.precio}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => decrementar(prod.id, prod.cantidad)}
                      >
                        −
                      </Button>
                      <span>{prod.cantidad}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => incrementar(prod.id, prod.cantidad)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>S/ {(prod.precio * prod.cantidad).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarDelCarrito(prod.id)}
                      className="btn-remove"
                    >
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="mt-4 text-total">
            Total: <strong>S/ {total.toFixed(2)}</strong>
          </h4>

          <div className="d-flex gap-3 mt-4 justify-content-center">
            <Button onClick={vaciarCarrito} className="btn-empty">
              Vaciar Carrito 🗑
            </Button>
            <Button onClick={() => window.location.href = '/pago'} className="btn-checkout">
              Finalizar Compra 💳
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
