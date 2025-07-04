import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Row, 
  Col, 
  Container, 
  Spinner, 
  Alert, 
  Button, 
  FormControl, 
  InputGroup,
  Dropdown,
  Badge,
  Form,
  Card
} from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    categoria: '',
    busqueda: '',
    orden: 'nombre-asc',
    precioMin: '',
    precioMax: '',
    soloConStock: false // Nuevo filtro para productos con stock
  });
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productosRes, categoriasRes] = await Promise.all([
          axios.get('http://localhost:8000/api/productos/'),
          axios.get('http://localhost:8000/api/categorias/')
        ]);
        setProductos(productosRes.data);
        setCategorias(categoriasRes.data);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error al cargar los productos. Intente nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtrarYOrdenarProductos = () => {
    let productosFiltrados = [...productos];

    // Filtrado por categoría
    if (filtros.categoria) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.categoria === parseInt(filtros.categoria)
      );
    }

    // Filtrado por búsqueda
    if (filtros.busqueda) {
      const terminoBusqueda = filtros.busqueda.toLowerCase();
      productosFiltrados = productosFiltrados.filter(
        producto => producto.nombre.toLowerCase().includes(terminoBusqueda) ||
                   producto.descripcion.toLowerCase().includes(terminoBusqueda)
      );
    }

    // Filtrado por rango de precio
    if (filtros.precioMin) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.precio >= parseFloat(filtros.precioMin)
      );
    }
    if (filtros.precioMax) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.precio <= parseFloat(filtros.precioMax)
      );
    }

    // Filtrado por stock (nuevo filtro)
    if (filtros.soloConStock) {
      productosFiltrados = productosFiltrados.filter(
        producto => producto.stock > 0
      );
    }

    // Ordenamiento
    const [campo, direccion] = filtros.orden.split('-');
    productosFiltrados.sort((a, b) => {
      if (campo === 'precio') {
        return direccion === 'asc' ? a.precio - b.precio : b.precio - a.precio;
      } else {
        return direccion === 'asc' 
          ? a.nombre.localeCompare(b.nombre) 
          : b.nombre.localeCompare(a.nombre);
      }
    });

    return productosFiltrados;
  };

  const resetFiltros = () => {
    setFiltros({
      categoria: '',
      busqueda: '',
      orden: 'nombre-asc',
      precioMin: '',
      precioMax: '',
      soloConStock: false
    });
  };

  const productosMostrados = filtrarYOrdenarProductos();
  const totalProductos = productosMostrados.length;

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          Nuestros Productos
          {totalProductos > 0 && (
            <Badge bg="secondary" className="ms-2">
              {totalProductos} {totalProductos === 1 ? 'producto' : 'productos'}
            </Badge>
          )}
        </h2>
        
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-orden">
            Ordenar por: {filtros.orden.includes('nombre') ? 'Nombre' : 'Precio'} 
            {filtros.orden.includes('asc') ? <FaArrowUp className="ms-1" /> : <FaArrowDown className="ms-1" />}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFiltros({...filtros, orden: 'nombre-asc'})}>
              Nombre (A-Z)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFiltros({...filtros, orden: 'nombre-desc'})}>
              Nombre (Z-A)
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setFiltros({...filtros, orden: 'precio-asc'})}>
              Precio (Menor a mayor)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFiltros({...filtros, orden: 'precio-desc'})}>
              Precio (Mayor a menor)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-4">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Buscar productos..."
            value={filtros.busqueda}
            onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
          />
          <Button 
            variant={mostrarFiltrosAvanzados ? "primary" : "outline-primary"}
            onClick={() => setMostrarFiltrosAvanzados(!mostrarFiltrosAvanzados)}
          >
            <FaFilter className="me-1" />
            Filtros
          </Button>
        </InputGroup>

        {/* Filtros avanzados */}
        {mostrarFiltrosAvanzados && (
          <Card className="mb-4">
            <Card.Body>
              <div className="row g-3">
                <div className="col-md-4">
                  <FormControl
                    as="select"
                    value={filtros.categoria}
                    onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
                  >
                    <option value="">Todas las categorías</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </FormControl>
                </div>
                <div className="col-md-3">
                  <InputGroup>
                    <InputGroup.Text>S/</InputGroup.Text>
                    <FormControl
                      placeholder="Precio mínimo"
                      type="number"
                      value={filtros.precioMin}
                      onChange={(e) => setFiltros({...filtros, precioMin: e.target.value})}
                    />
                  </InputGroup>
                </div>
                <div className="col-md-3">
                  <InputGroup>
                    <InputGroup.Text>S/</InputGroup.Text>
                    <FormControl
                      placeholder="Precio máximo"
                      type="number"
                      value={filtros.precioMax}
                      onChange={(e) => setFiltros({...filtros, precioMax: e.target.value})}
                    />
                  </InputGroup>
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <Form.Check 
                    type="switch"
                    id="stock-switch"
                    label="Solo con stock"
                    checked={filtros.soloConStock}
                    onChange={(e) => setFiltros({...filtros, soloConStock: e.target.checked})}
                  />
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={resetFiltros}
                  className="d-flex align-items-center"
                >
                  <FaTimes className="me-1" /> Limpiar filtros
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Contenido principal */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3">Cargando productos...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : productosMostrados.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4 className="text-muted">No se encontraron productos</h4>
            <p className="text-muted mb-4">Intenta ajustar tus filtros de búsqueda</p>
            <Button variant="primary" onClick={resetFiltros}>
              Mostrar todos los productos
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {productosMostrados.map(producto => (
              <Col key={producto.id}>
                <ProductCard producto={producto} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductList;