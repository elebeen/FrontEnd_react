import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Spinner, 
  Form, 
  Alert, 
  Badge,
  Container,
  ListGroup,
  Stack
} from 'react-bootstrap';
import { 
  FaShoppingCart, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaArrowLeft,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import Rating from 'react-rating';

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito, carrito } = useContext(CartContext);
  const navigate = useNavigate();

  const [resenas, setResenas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const [nuevaResena, setNuevaResena] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5
  });

  // Calcular rating promedio
  const ratingPromedio = resenas.length > 0 
    ? (resenas.reduce((sum, r) => sum + r.calificacion, 0) / resenas.length).toFixed(1)
    : 0;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [productoRes, resenasRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/productos/${id}/`),
          axios.get(`http://localhost:8000/api/resenas/?producto=${id}`)
        ]);
        setProducto(productoRes.data);
        setResenas(resenasRes.data);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar el producto. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const manejarAgregarCarrito = () => {
    if (producto.stock <= 0) return;
    
    agregarAlCarrito({ ...producto, cantidad });
    navigate('/carrito');
  };

  const enviarResena = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/resenas/', {
        ...nuevaResena,
        producto: producto.id
      });
      
      const res = await axios.get(`http://localhost:8000/api/resenas/?producto=${id}`);
      setResenas(res.data);
      setNuevaResena({ nombre: '', comentario: '', calificacion: 5 });
      setMostrarFormulario(false);
      
      Alert.success('¡Reseña enviada con éxito!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error('Error al enviar reseña:', err);
      Alert.error('Error al enviar reseña', {
        position: 'top-right'
      });
    }
  };

  const incrementarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" /> Volver
        </Button>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Producto no encontrado</Alert>
        <Button variant="primary" onClick={() => navigate('/productos')}>
          Ver todos los productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4 d-flex align-items-center"
      >
        <FaArrowLeft className="me-2" /> Volver
      </Button>

      <Card className="border-0 shadow-sm mb-5">
        <Row className="g-0">
          {/* Columna de imagen */}
          <Col md={6} lg={5} className="p-4">
            <div className="position-relative">
              <Card.Img
                variant="top"
                src={producto.imagen || '/placeholder-product.jpg'}
                alt={producto.nombre}
                className="img-fluid rounded-3"
                style={{ 
                  maxHeight: '500px',
                  objectFit: 'contain',
                  width: '100%'
                }}
              />
              {producto.stock <= 0 && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-3">
                  <Badge bg="danger" className="fs-5">
                    AGOTADO
                  </Badge>
                </div>
              )}
            </div>
          </Col>

          {/* Columna de información */}
          <Col md={6} lg={7} className="p-4">
            <Card.Body>
              {/* Encabezado */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="mb-2 fw-bold">{producto.nombre}</h1>
                  <div className="d-flex align-items-center mb-3">
                    <Rating
                      initialRating={ratingPromedio}
                      readonly
                      emptySymbol={<FaRegStar className="text-warning" />}
                      fullSymbol={<FaStar className="text-warning" />}
                      fractions={2}
                    />
                    <span className="ms-2 text-muted">
                      ({resenas.length} {resenas.length === 1 ? 'reseña' : 'reseñas'})
                    </span>
                  </div>
                </div>
                <Badge bg="success" className="fs-6">
                  S/ {Number(producto.precio).toFixed(2)}
                </Badge>
              </div>

              {/* Stock y categoría */}
              <div className="mb-4">
                <p className={producto.stock > 0 ? "text-success" : "text-danger"}>
                  <strong>{producto.stock > 0 ? 'Disponible' : 'Agotado'}</strong>: {producto.stock} unidades
                </p>
                {producto.categoria && (
                  <Badge bg="info" className="me-2">
                    {producto.categoria.nombre}
                  </Badge>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="mb-3">Descripción</h5>
                <p className="text-muted" style={{ lineHeight: '1.6' }}>
                  {producto.descripcion}
                </p>
              </div>

              {/* Selector de cantidad */}
              <div className="mb-4">
                <h6 className="mb-3">Cantidad</h6>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    onClick={decrementarCantidad}
                    disabled={cantidad <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-3 fs-5">{cantidad}</span>
                  <Button 
                    variant="outline-secondary" 
                    onClick={incrementarCantidad}
                    disabled={cantidad >= producto.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="d-flex gap-3 mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-grow-1"
                  onClick={manejarAgregarCarrito}
                  disabled={producto.stock <= 0}
                >
                  <FaShoppingCart className="me-2" />
                  {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                </Button>
              </div>

              {/* Botón de reseña */}
              <Button
                variant={mostrarFormulario ? "outline-danger" : "outline-primary"}
                className="w-100 mb-4"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
              >
                {mostrarFormulario ? 'Cancelar reseña' : 'Escribir reseña'}
              </Button>

              {/* Formulario de reseña */}
              {mostrarFormulario && (
                <Card className="border-primary mb-4">
                  <Card.Body>
                    <h5 className="mb-3">Deja tu reseña</h5>
                    <Form onSubmit={enviarResena}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tu nombre</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          value={nuevaResena.nombre}
                          onChange={e => setNuevaResena({ ...nuevaResena, nombre: e.target.value })}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Calificación</Form.Label>
                        <div>
                          <Rating
                            initialRating={nuevaResena.calificacion}
                            onChange={(value) => setNuevaResena({ ...nuevaResena, calificacion: value })}
                            emptySymbol={<FaRegStar className="text-warning" size={24} />}
                            fullSymbol={<FaStar className="text-warning" size={24} />}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          required
                          value={nuevaResena.comentario}
                          onChange={e => setNuevaResena({ ...nuevaResena, comentario: e.target.value })}
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Enviar reseña
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* Sección de reseñas */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Reseñas de clientes</h3>
            <div>
              <span className="fs-4 fw-bold text-primary">{ratingPromedio}</span>
              <span className="text-muted">/5</span>
              <Rating
                initialRating={ratingPromedio}
                readonly
                emptySymbol={<FaRegStar className="text-warning ms-2" />}
                fullSymbol={<FaStar className="text-warning ms-2" />}
                fractions={2}
              />
            </div>
          </div>

          {resenas.length === 0 ? (
            <Alert variant="info">
              Este producto aún no tiene reseñas. ¡Sé el primero en opinar!
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {resenas.map((resena, index) => (
                <ListGroup.Item key={index} className="py-3 px-0">
                  <div className="d-flex justify-content-between mb-2">
                    <strong>{resena.nombre}</strong>
                    <div className="text-warning">
                      <Rating
                        initialRating={resena.calificacion}
                        readonly
                        emptySymbol={<FaRegStar />}
                        fullSymbol={<FaStar />}
                      />
                    </div>
                  </div>
                  <p className="mb-2">{resena.comentario}</p>
                  <small className="text-muted">
                    {new Date(resena.creado_en).toLocaleDateString()}
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetail;