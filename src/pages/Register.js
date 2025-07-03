import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:8000/api/registro/', form);
      setExito(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Ocurrió un error.');
      }
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h3 className="login-title">Crear cuenta ✨</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {exito && <Alert variant="success">Registro exitoso 🎉 Redirigiendo al login...</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Escribe tu usuario"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Escribe tu contraseña"
            />
          </Form.Group>

          <Button type="submit" className="login-button w-100">
            Registrarse 📝
          </Button>
        </Form>

        <p className="mt-3 text-center text-muted">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
