import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);

  const [nuevaResena, setNuevaResena] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/productos/${id}/`)
      .then(response => setProducto(response.data))
      .catch(error => console.error('Error al obtener el producto:', error));
  }, [id]);

  const enviarResena = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/resenas/', {
      ...nuevaResena,
      producto: producto.id
    })
      .then(() => {
        alert("Reseña enviada con éxito 🎉");
        window.location.reload();
      })
      .catch(err => {
        console.error('Error al enviar reseña:', err);
        alert("Error al enviar reseña");
      });
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm mb-4">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="card-img-top" />
        <Card.Body>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{producto.descripcion}</Card.Text>
          <Card.Text><strong>Precio:</strong> S/ {producto.precio}</Card.Text>
          <Card.Text><strong>Stock disponible:</strong> {producto.stock}</Card.Text>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-25"
            />
          </Form.Group>

          <Button
            variant="primary"
            disabled={producto.stock === 0}
            onClick={() => agregarAlCarrito(producto, cantidad)}
          >
            Agregar al carrito 🛒
          </Button>
        </Card.Body>
      </Card>

      {/* 🔽 Reseñas existentes */}
      <h5 className="mt-5">Reseñas ⭐</h5>
      {producto.resenas && producto.resenas.length > 0 ? (
        producto.resenas.map((resena, index) => (
          <div key={index} className="mb-3 border-bottom pb-2">
            <strong>{resena.nombre}</strong> - <span className="stars">⭐ {resena.calificacion}/5</span>
            <p>{resena.comentario}</p>
          </div>
        ))
      ) : (
        <p>No hay reseñas aún.</p>
      )}

      {/* ✍️ Formulario para dejar reseña */}
      <h5 className="mt-5">Escribe una reseña ✍️</h5>
      <Form onSubmit={enviarResena}>
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
            onChange={e => setNuevaResena({ ...nuevaResena, calificacion: parseInt(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map(n => (
              <option key={n} value={n}>{n} estrellas</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success">Enviar reseña</Button>
      </Form>
    </div>
  );
};

export default ProductDetail;
