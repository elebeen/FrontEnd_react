import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Form, Button, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Pago = () => {
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const [formulario, setFormulario] = useState({ nombre: '', correo: '', direccion: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const manejarCambio = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = e => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.correo || !formulario.direccion) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError('');
    setExito(true);
    vaciarCarrito();

    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  return (
            <div className="container pago-container">
        <h2 className="text-success">Finalizar Compra</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {exito && (
            <Alert variant="success">
            ¡Gracias por tu compra, {formulario.nombre}! 🎉
            </Alert>
        )}

        <div className="pago-row">
            <div className="pago-resumen">
            <h4 className="text-pink">Resumen del Pedido</h4>
            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div className="table-responsive">
                <Table bordered className="cart-table table table-dark table-striped table-hover">
                    <thead className="table-header">
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carrito.map(p => (
                        <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td>{p.cantidad}</td>
                        <td>S/ {(p.precio * p.cantidad).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="2"><strong>Total</strong></td>
                        <td><strong>S/ {total.toFixed(2)}</strong></td>
                    </tr>
                    </tbody>
                </Table>
                </div>
            )}
            </div>

            <div className="pago-formulario">
            <Form onSubmit={manejarEnvio}>
                <Form.Group className="mb-3">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type="email"
                    name="correo"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    required
                />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="direccion"
                    value={formulario.direccion}
                    onChange={manejarCambio}
                    required
                />
                </Form.Group>

                <Button type="submit" className="btn btn-success w-100 mt-3">
                Pagar ahora 💳
                </Button>
            </Form>
            </div>
        </div>
</div>

  );
};

export default Pago;
