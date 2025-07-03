import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
  return (
    <Card className="shadow-sm h-100 custom-card">
      <Card.Img
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title>
          <Link to={`/producto/${producto.id}`} className="card-title-link">
            {producto.nombre}
          </Link>
        </Card.Title>
        <Card.Text className="card-text">
          {producto.descripcion.length > 100
            ? producto.descripcion.slice(0, 100) + '...'
            : producto.descripcion}
        </Card.Text>
        <h5 className="text-success">S/ {producto.precio}</h5>
        <p className="text-muted">Stock: {producto.stock}</p>
        <Button
          as={Link}
          to={`/producto/${producto.id}`}
          style={{ backgroundColor: '#8ab4f8', border: 'none' }}
          className="btn rounded text-white"
        >
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
