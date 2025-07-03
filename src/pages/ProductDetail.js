import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Row, Col, Spinner, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  const [resenas, setResenas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [nuevaResena, setNuevaResena] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/productos/${id}/`)
      .then(res => {
        setProducto(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar el producto:', err);
        setLoading(false);
      });

    axios.get(`http://localhost:8000/api/resenas/?producto=${id}`)
      .then(res => setResenas(res.data))
      .catch(err => console.error('Error al cargar reseñas:', err));
  }, [id]);

  const manejarAgregarCarrito = () => {
    agregarAlCarrito(producto);
    navigate('/carrito');
  };

  const enviarResena = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/resenas/', {
      ...nuevaResena,
      producto: producto.id
    })
      .then(() => {
        alert("Reseña enviada con éxito 🎉");
        setNuevaResena({ nombre: '', comentario: '', calificacion: 5 });
        setMostrarFormulario(false);
        axios.get(`http://localhost:8000/api/resenas/?producto=${id}`)
          .then(res => setResenas(res.data));
      })
      .catch(err => {
        console.error('Error al enviar reseña:', err);
        alert("Error al enviar reseña");
      });
  };

  if (loading) return <Spinner animation="border" />;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="container mt-4">
      <Card className="detalle-card">
        <Row>
          <Col md={6}>
            <Card.Img
              src={producto.imagen}
              alt={producto.nombre}
              className="detalle-imagen"
            />
          </Col>
          <Col md={6}>
            <h2 className="detalle-titulo">{producto.nombre}</h2>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <h4 className="detalle-precio">S/ {producto.precio}</h4>
            <p className="detalle-stock">Stock disponible: {producto.stock}</p>

            <Button
              variant="success"
              className="btn-agregar"
              onClick={manejarAgregarCarrito}
            >
              Agregar al carrito 🛒
            </Button>

            <div className="mt-2">
              <Button
                variant="outline-primary"
                className="btn-reseña-toggle"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
              >
                {mostrarFormulario ? 'Cancelar reseña ❌' : 'Escribir reseña ✍️'}
              </Button>
            </div>

            {mostrarFormulario && (
              <Form onSubmit={enviarResena} className="form-reseña mt-3">
                <Form.Group className="mb-2">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={nuevaResena.nombre}
                    onChange={e => setNuevaResena({ ...nuevaResena, nombre: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    required
                    value={nuevaResena.comentario}
                    onChange={e => setNuevaResena({ ...nuevaResena, comentario: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Calificación</Form.Label>
                  <Form.Select
                    value={nuevaResena.calificacion}
                    onChange={e =>
                      setNuevaResena({ ...nuevaResena, calificacion: parseInt(e.target.value) })
                    }
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} estrellas</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="btn-enviar-reseña">
                  Enviar reseña
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Card>

      {/* 🔽 Reseñas estilizadas */}
      <div className="mt-5">
        <h4 className="mb-3 detalle-subtitulo">Reseñas ⭐</h4>
        {resenas.length === 0 ? (
          <p className="text-muted">No hay reseñas aún.</p>
        ) : (
          resenas.map((r, index) => (
            <div key={index} className="detalle-reseña">
              <strong>{r.nombre}</strong> - <span className="detalle-estrella">⭐ {r.calificacion}/5</span>
              <p>{r.comentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
