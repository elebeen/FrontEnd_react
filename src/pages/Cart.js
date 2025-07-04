import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button, Table, Card, Badge } from 'react-bootstrap';
import { Trash, Plus, Dash, CartCheck } from 'react-bootstrap-icons';

const Cart = () => {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad
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
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <Badge bg="primary" className="me-2">
            {carrito.reduce((sum, prod) => sum + prod.cantidad, 0)}
          </Badge>
          Tu Carrito de Compras
        </h2>
        {carrito.length > 0 && (
          <Button 
            variant="outline-danger" 
            onClick={vaciarCarrito}
            size="sm"
          >
            <Trash className="me-1" /> Vaciar Todo
          </Button>
        )}
      </div>

      {carrito.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <CartCheck size={48} className="text-muted mb-3" />
            <h4 className="text-muted">Tu carrito está vacío</h4>
            <p className="text-muted">Agrega productos para continuar</p>
            <Button variant="primary" href="/productos">
              Ver Productos
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '40%' }}>Producto</th>
                  <th className="text-end">Precio Unit.</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map(prod => (
                  <tr key={prod.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={prod.imagen || '/placeholder-product.jpg'} 
                          alt={prod.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                        />
                        <div>
                          <h6 className="mb-0">{prod.nombre}</h6>
                          <small className="text-muted">SKU: {prod.id}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-end">S/ {Number(prod.precio).toFixed(2)}  </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => decrementar(prod.id, prod.cantidad)}
                          className="quantity-btn"
                        >
                          <Dash />
                        </Button>
                        <span className="px-3 py-1 mx-2 border rounded">
                          {prod.cantidad}
                        </span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => incrementar(prod.id, prod.cantidad)}
                          className="quantity-btn"
                        >
                          <Plus />
                        </Button>
                      </div>
                    </td>
                    <td className="text-end fw-bold">
                      S/ {(prod.precio * prod.cantidad).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarDelCarrito(prod.id)}
                        title="Eliminar producto"
                      >
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Card className="mt-4 border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Total a Pagar:</h5>
                  <small className="text-muted">Incluye impuestos</small>
                </div>
                <h3 className="mb-0 text-primary">
                  S/ {total.toFixed(2)}
                </h3>
              </div>
              <hr />
              <div className="d-flex justify-content-end gap-3">
                <Button 
                  variant="outline-secondary" 
                  href="/productos"
                >
                  Seguir Comprando
                </Button>
                <Button 
                  variant="success" 
                  onClick={() => window.location.href = '/pago'}
                  className="d-flex align-items-center"
                >
                  <CartCheck className="me-2" /> Proceder al Pago
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Cart;