import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Row, Col } from 'react-bootstrap';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/productos/')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error cargando productos', err));

    axios.get('http://localhost:8000/api/categorias/')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error cargando categorías', err));
  }, []);

  const filtrarProductos = () => {
    return productos.filter(producto => {
      const coincideCategoria = categoriaSeleccionada
        ? producto.categoria === parseInt(categoriaSeleccionada)
        : true;

      const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());

      return coincideCategoria && coincideBusqueda;
    });
  };

  return (
    <div className="container mt-5 lista-productos-container">
      <h2 className="titulo-productos">Nuestros Productos</h2>

      <CategoryFilter
        categorias={categorias}
        onChangeCategoria={setCategoriaSeleccionada}
        onChangeBusqueda={setBusqueda}
      />

      <Row className="gy-4 gx-4">
        {filtrarProductos().map(producto => (
          <Col key={producto.id} xs={12} sm={6} md={4} className="d-flex">
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
