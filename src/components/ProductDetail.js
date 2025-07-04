import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Button, 
  Card, 
  Form, 
  Container, 
  Row, 
  Col, 
  Badge, 
  Spinner, 
  Alert,
  ListGroup,
  Stack
} from 'react-bootstrap';
import { 
  FaShoppingCart, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaArrowLeft,
  FaShare,
  FaHeart
} from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import Rating from 'react-rating';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const { agregarAlCarrito } = useContext(CartContext);
  const [nuevaResena, setNuevaResena] = useState({
    nombre: '',
    comentario: '',
    calificacion: 5
  });

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/productos/${id}/`);
        setProducto(response.data);
      } catch (err) {
        console.error('Error al obtener el producto:', err);
        setError('Error al cargar el producto. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad);
    setCantidad(1);
  };

  const enviarResena = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/resenas/', {
        ...nuevaResena,
        producto: producto.id
      });
      // Actualizar las reseñas sin recargar la página
      const response = await axios.get(`http://localhost:8000/api/productos/${id}/`);
      setProducto(response.data);
      setNuevaResena({ nombre: '', comentario: '', calificacion: 5 });
      Alert.success('¡Reseña enviada con éxito! 🎉');
    } catch (err) {
      console.error('Error al enviar reseña:', err);
      Alert.error('Error al enviar reseña');
    }
  };

  const calcularPromedioResenas = () => {
    if (!producto.resenas || producto.resenas.length === 0) return 0;
    const total = producto.resenas.reduce((sum, resena) => sum + resena.calificacion, 0);
    return (total / producto.resenas.length).toFixed(1);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3">Cargando producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
        <Button variant="primary" onClick={() => navigate('/productos')} className="mt-3">
          Volver a productos
        </Button>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Producto no encontrado
        </Alert>
        <Button variant="primary" onClick={() => navigate('/productos')} className="mt-3">
          Volver a productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)} 
        className="mb-4 d-flex align-items-center gap-2"
      >
        <FaArrowLeft /> Volver
      </Button>

      <Row className="g-4">
        {/* Columna de imagen */}
        <Col lg={6}>
          <Card className="h-100 border-0 shadow-sm overflow-hidden">
            <div className="ratio ratio-1x1">
              <img 
                src={producto.imagen || '/placeholder-product.jpg'} 
                alt={producto.nombre} 
                className="object-fit-cover w-100 h-100"
                style={{ maxHeight: '500px' }}
              />
            </div>
            <div className="position-absolute top-0 end-0 m-3">
              <Button 
                variant={favorito ? "danger" : "outline-danger"} 
                size="sm" 
                className="rounded-circle"
                onClick={() => setFavorito(!favorito)}
                style={{ width: '40px', height: '40px' }}
              >
                <FaHeart />
              </Button>
            </div>
          </Card>
        </Col>

        {/* Columna de información */}
        <Col lg={6}>
          <Card className="h-100 border-0">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3">
                <Badge bg="success" className="me-2">
                  {producto.categoria_nombre}
                </Badge>
                {producto.destacado && (
                  <Badge bg="warning" text="dark">
                    Destacado
                  </Badge>
                )}
              </div>

              <h1 className="mb-3">{producto.nombre}</h1>
              
              <div className="d-flex align-items-center mb-3">
                <Rating
                  initialRating={calcularPromedioResenas()}
                  readonly
                  emptySymbol={<FaRegStar className="text-warning" />}
                  fullSymbol={<FaStar className="text-warning" />}
                  fractions={2}
                />
                <span className="ms-2 text-muted">
                  ({producto.resenas?.length || 0} reseñas)
                </span>
              </div>

              <h2 className="text-primary mb-4">S/ {Number(producto.precio).toFixed(2)}</h2>

              <Card.Text className="mb-4" style={{ fontSize: '1.1rem' }}>
                {producto.descripcion}
              </Card.Text>

              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item>
                  <strong>Stock:</strong> {producto.stock > 0 ? (
                    <span className="text-success">{producto.stock} unidades disponibles</span>
                  ) : (
                    <span className="text-danger">Agotado</span>
                  )}
                </ListGroup.Item>
                {producto.marca && (
                  <ListGroup.Item>
                    <strong>Marca:</strong> {producto.marca}
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <strong>SKU:</strong> {producto.id}
                </ListGroup.Item>
              </ListGroup>

              <div className="mt-auto">
                <Form.Group className="mb-3">
                  <Form.Label><strong>Cantidad:</strong></Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={producto.stock}
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, Number(e.target.value))))}
                    style={{ width: '100px' }}
                    disabled={producto.stock === 0}
                  />
                </Form.Group>

                <Stack direction="horizontal" gap={3} className="flex-wrap">
                  <Button
                    variant="primary"
                    size="lg"
                    className="d-flex align-items-center gap-2"
                    disabled={producto.stock <= 0}
                    onClick={handleAgregarCarrito}
                  >
                    <FaShoppingCart /> Añadir al carrito
                  </Button>
                  <Button variant="outline-secondary" size="lg" className="d-flex align-items-center gap-2">
                    <FaShare /> Compartir
                  </Button>
                </Stack>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sección de reseñas */}
      <Row className="mt-5">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4 d-flex align-items-center gap-2">
                <FaStar className="text-warning" /> Reseñas de clientes
              </h4>

              {producto.resenas && producto.resenas.length > 0 ? (
                <>
                  <div className="mb-4 p-3 bg-light rounded">
                    <h5 className="d-flex align-items-center gap-2">
                      Valoración promedio: {calcularPromedioResenas()}/5
                    </h5>
                    <Rating
                      initialRating={calcularPromedioResenas()}
                      readonly
                      emptySymbol={<FaRegStar className="text-warning" size={24} />}
                      fullSymbol={<FaStar className="text-warning" size={24} />}
                      fractions={2}
                    />
                    <p className="mb-0 text-muted">Basado en {producto.resenas.length} reseñas</p>
                  </div>

                  <div className="border-top pt-4">
                    {producto.resenas.map((resena, index) => (
                      <div key={index} className="mb-4 pb-3 border-bottom">
                        <div className="d-flex justify-content-between mb-2">
                          <h6 className="mb-0">{resena.nombre}</h6>
                          <Rating
                            initialRating={resena.calificacion}
                            readonly
                            emptySymbol={<FaRegStar className="text-warning" />}
                            fullSymbol={<FaStar className="text-warning" />}
                          />
                        </div>
                        <p className="text-muted small mb-1">
                          {new Date(resena.fecha_creacion).toLocaleDateString()}
                        </p>
                        <p className="mb-0">{resena.comentario}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Alert variant="info">
                  Este producto aún no tiene reseñas. ¡Sé el primero en opinar!
                </Alert>
              )}

              {/* Formulario de reseña */}
              <Card className="mt-4 border-0 shadow-sm">
                <Card.Body>
                  <h5 className="mb-4">Escribe tu reseña</h5>
                  <Form onSubmit={enviarResena}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Tu nombre</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={nuevaResena.nombre}
                            onChange={e => setNuevaResena({ ...nuevaResena, nombre: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Tu calificación</Form.Label>
                          <Rating
                            initialRating={nuevaResena.calificacion}
                            onChange={(value) => setNuevaResena({ ...nuevaResena, calificacion: value })}
                            emptySymbol={<FaRegStar className="text-warning" size={24} />}
                            fullSymbol={<FaStar className="text-warning" size={24} />}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Tu comentario</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        required
                        value={nuevaResena.comentario}
                        onChange={e => setNuevaResena({ ...nuevaResena, comentario: e.target.value })}
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Enviar reseña
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;