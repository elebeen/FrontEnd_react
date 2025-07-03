import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const CategoryFilter = ({ categorias, onChangeCategoria, onChangeBusqueda }) => {
  return (
    <Row className="mb-4 bg-accent p-3 rounded shadow-sm">
      <Col md={4}>
        <Form.Select
          className="form-select pastel-input"
          onChange={e => onChangeCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col md={8}>
        <Form.Control
          type="text"
          placeholder="Buscar productos por nombre..."
          className="pastel-input"
          onChange={e => onChangeBusqueda(e.target.value)}
        />
      </Col>
    </Row>
  );
};

export default CategoryFilter;
