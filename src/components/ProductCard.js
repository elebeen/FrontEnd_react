import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaStar } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ producto }) => {
   const { agregarAlCarrito } = useContext(CartContext);
  return (
    <Card className="h-100 border-0 shadow-sm product-card" style={{ 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      overflow: 'hidden'
    }}>
      {/* Badge de destacado */}
      {producto.destacado && (
        <div className="position-absolute top-0 start-0 m-2">
          <Badge bg="warning" text="dark" pill>
            <FaStar className="me-1" /> Destacado
          </Badge>
        </div>
      )}

      {/* Imagen del producto con efecto hover */}
      <div className="product-img-container" style={{
        height: '200px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Card.Img
          variant="top"
          src={producto.imagen || '/placeholder-product.jpg'}
          alt={producto.nombre}
          className="img-fluid h-100 w-100 object-fit-cover"
          style={{ transition: 'transform 0.5s ease' }}
        />
        <div className="product-overlay d-flex align-items-center justify-content-center">
          <Button 
            as={Link}
            to={`/producto/${producto.id}`}
            variant="light"
            size="sm"
            className="rounded-circle me-2"
            style={{ width: '40px', height: '40px' }}
            title="Ver detalles"
          >
            <FaEye />
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            className="rounded-circle"
            style={{ width: '40px', height: '40px' }}
            title="Añadir al carrito"
          >
            <FaShoppingCart />
          </Button>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Nombre y precio */}
        <div className="mb-2">
          <Card.Title className="mb-1">
            <Link 
              to={`/producto/${producto.id}`} 
              className="text-decoration-none text-dark fw-bold"
              style={{ fontSize: '1.1rem' }}
            >
              {producto.nombre}
            </Link>
          </Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-success mb-0 fw-bold">S/ {Number(producto.precio).toFixed(2)}</h5>
            {producto.descuento > 0 && (
              <Badge bg="danger" pill>
                -{producto.descuento}%
              </Badge>
            )}
          </div>
        </div>

        {/* Descripción */}
        <Card.Text className="text-muted mb-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {producto.descripcion.length > 80
            ? `${producto.descripcion.substring(0, 80)}...`
            : producto.descripcion}
        </Card.Text>

        {/* Stock y rating */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <small className={producto.stock > 0 ? "text-success" : "text-danger"}>
            {producto.stock > 0 ? `Disponible (${producto.stock})` : 'Agotado'}
          </small>
          <div className="text-warning">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-muted" />
            <small className="ms-1 text-muted">(24)</small>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="d-grid gap-2">
          <Button
            as={Link}
            to={`/producto/${producto.id}`}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center gap-2"
          >
            <FaEye /> Ver detalles
          </Button>
          <Button 
            variant="primary" 
            disabled={producto.stock <= 0}
            className="d-flex align-items-center justify-content-center gap-2"
            onClick={() => agregarAlCarrito(producto, 1)} // Agregar al carrito con cantidad 1
          >
            <FaShoppingCart /> Añadir al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;