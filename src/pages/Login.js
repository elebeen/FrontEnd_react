import React, { useState, useContext } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // ✅ Importar el contexto

const Login = () => {
  const [credenciales, setCredenciales] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Usar login del contexto

  const manejarCambio = e => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', credenciales);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      login(res.data.access); // ✅ Actualizar el contexto con el usuario
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h3 className="login-title">Iniciar sesión 💖</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={credenciales.username}
              onChange={manejarCambio}
              className="login-input"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credenciales.password}
              onChange={manejarCambio}
              className="login-input"
              required
            />
          </Form.Group>
          <Button type="submit" className="login-button w-100">
            Ingresar
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
