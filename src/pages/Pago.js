import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Form, Button, Alert, Table, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, Person, Envelope, GeoAlt } from 'react-bootstrap-icons';
import axios from 'axios'; // Importa axios para hacer peticiones HTTP
import { AuthContext } from '../context/AuthContext'; // Importa AuthContext para el token de autenticación

const Pago = () => {
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Obtiene el usuario del contexto de autenticación para saber si está logueado y obtener el token
  const [formulario, setFormulario] = useState({ nombre: '', correo: '', direccion: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar el loading
  const navigate = useNavigate();

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const manejarCambio = e => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async e => { // La función ahora es asíncrona
    e.preventDefault();

    // 1. Validaciones iniciales
    if (!formulario.nombre || !formulario.correo || !formulario.direccion) {
      setError('Por favor, completa todos los campos de envío.');
      return;
    }
    if (carrito.length === 0) {
      setError('Tu carrito está vacío. Agrega productos antes de pagar.');
      return;
    }
    // Opcional: Si el decrementar stock requiere autenticación
    if (!user) {
        setError('Debes iniciar sesión para finalizar la compra.');
        navigate('/login'); // Redirige al login si no está autenticado
        return;
    }

    setLoading(true); // Inicia el estado de loading
    setError(''); // Limpia cualquier error previo

    const token = localStorage.getItem('access'); // Obtiene el token de acceso
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      // 2. Iterar sobre los productos en el carrito y decrementar el stock en la API
      for (const item of carrito) {
        // Realiza una petición POST por cada producto en el carrito
        await axios.post(
          `http://localhost:8000/api/productos/${item.id}/decrementar_stock/`,
          { cantidad: item.cantidad }, // Envía la cantidad a decrementar
          { headers: headers } // Incluye el token de autorización en los headers
        );
      }

      // 3. Si todas las peticiones de decremento fueron exitosas
      setExito(true); // Muestra mensaje de éxito
      vaciarCarrito(); // Vacía el carrito del frontend

      // 4. Redirige al usuario después de un breve tiempo
      setTimeout(() => {
        navigate('/');
      }, 4000);

    } catch (err) {
      // 5. Manejo de errores de la API
      console.error('Error al procesar el pago o decrementar stock:', err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(`Error: ${err.response.data.detail}`); // Mensaje de error específico de la API (ej: "Stock insuficiente")
      } else if (err.response && err.response.data) {
        // Si hay otros errores de validación de Django
        const errorMessages = Object.values(err.response.data).flat().join('; ');
        setError(`Error de validación: ${errorMessages}`);
      }
      else {
        setError('Error al procesar el pago. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setLoading(false); // Finaliza el estado de loading, sea éxito o error
    }
  };

  return (
    <div className="container my-5">
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">
            <CreditCard className="me-2" /> Finalizar Compra
          </h2>

          {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
          {exito && (
            <Alert variant="success" className="mb-4">
              ¡Gracias por tu compra, {formulario.nombre}! 🎉 Tu pedido ha sido procesado con éxito. Redirigiendo...
            </Alert>
          )}

          <div className="row">
            {/* Resumen del Pedido - Columna izquierda */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <Card className="h-100 border-0">
                <Card.Header className="bg-light">
                  <h4 className="mb-0">
                    <Truck className="me-2" /> Resumen del Pedido
                  </h4>
                </Card.Header>
                <Card.Body>
                  {carrito.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">Tu carrito está vacío.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table hover className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th style={{ width: '50%' }}>Producto</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-end">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carrito.map(p => (
                            <tr key={p.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <img 
                                    src={p.imagen || '/placeholder-product.jpg'} 
                                    alt={p.nombre}
                                    className="me-3"
                                    style={{ 
                                      width: '60px', 
                                      height: '60px', 
                                      objectFit: 'cover', 
                                      borderRadius: '4px' 
                                    }}
                                  />
                                  <div>
                                    <h6 className="mb-0">{p.nombre}</h6>
                                    <small className="text-muted">S/ {Number(p.precio).toFixed(2)} c/u</small>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                <Badge bg="secondary" pill>
                                  {p.cantidad}
                                </Badge>
                              </td>
                              <td className="text-end align-middle fw-bold">
                                S/ {(Number(p.precio) * p.cantidad).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-top">
                            <td colSpan="2" className="text-end fw-bold">Subtotal:</td>
                            <td className="text-end">S/ {total.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="text-end fw-bold">Envío:</td>
                            <td className="text-end">Gratis</td>
                          </tr>
                          <tr className="border-top">
                            <td colSpan="2" className="text-end fw-bold fs-5">Total:</td>
                            <td className="text-end fs-5 fw-bold text-primary">
                              S/ {total.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>

            {/* Formulario de Datos - Columna derecha */}
            <div className="col-lg-5">
              <Card className="h-100 border-0">
                <Card.Header className="bg-light">
                  <h4 className="mb-0">
                    <Person className="me-2" /> Datos de Envío
                  </h4>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={manejarEnvio}>
                    <Form.Group className="mb-3">
                      <Form.Label><Person className="me-2" /> Nombre completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><Envelope className="me-2" /> Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label><GeoAlt className="me-2" /> Dirección</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="direccion"
                        value={formulario.direccion}
                        onChange={manejarCambio}
                        required
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-100 mt-3"
                      disabled={carrito.length === 0}
                    >
                      <CreditCard className="me-2" /> Pagar ahora
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Pago;