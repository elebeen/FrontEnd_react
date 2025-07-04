import React, { useState, useContext } from 'react';
import { 
  Form, 
  Button, 
  Alert, 
  Card, 
  Container, 
  Row, 
  Col,
  Spinner,
  InputGroup,
  FloatingLabel
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaEyeSlash, FaEye, FaGoogle, FaFacebook, FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ 
    username: '', 
    password: '' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
    
    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!credenciales.username.trim()) {
      newErrors.username = 'Usuario requerido';
    }
    
    if (!credenciales.password) {
      newErrors.password = 'Contraseña requerida';
    } else if (credenciales.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/token/', credenciales);
      
      // Guardar tokens
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      
      // Actualizar contexto de autenticación
      login({
        token: res.data.access,
      });
      
      navigate('/');
    } catch (err) {
      let errorMessage = 'Error al iniciar sesión';
      
      if (err.response?.status === 401) {
        errorMessage = 'Credenciales incorrectas';
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      
      toast.error(errorMessage, {
        position: "top-center"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Redirigir al backend para autenticación social
    window.location.href = `http://localhost:8000/auth/${provider}/`;
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate(-1)} 
            className="mb-4 d-flex align-items-center"
          >
            <FaArrowLeft className="me-2" /> Volver
          </Button>
          
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Iniciar Sesión</h2>
                <p className="text-muted">Ingresa a tu cuenta</p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Usuario o Email">
                    <Form.Control
                      type="text"
                      name="username"
                      value={credenciales.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      placeholder="Usuario o Email" 
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <FloatingLabel label="">
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={credenciales.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Contraseña"
                      />
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </FloatingLabel>
                </Form.Group>
                
                <div className="d-flex justify-content-between mb-4">
                  <Form.Check 
                    type="checkbox" 
                    label="Recordarme" 
                    id="remember-me"
                  />
                  <Link to="/recuperar-contrasena" className="text-primary">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Ingresar'
                  )}
                </Button>
                
                <div className="text-center mt-3 mb-4 position-relative">
                  <hr />
                  <span className="bg-white px-3 position-absolute top-50 start-50 translate-middle text-muted">
                    O ingresa con
                  </span>
                </div>
                
                <div className="d-flex gap-3 mb-4">
                  <Button 
                    variant="outline-danger" 
                    className="flex-grow-1"
                    onClick={() => handleSocialLogin('google')}
                  >
                    <FaGoogle className="me-2" /> Google
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    className="flex-grow-1"
                    onClick={() => handleSocialLogin('facebook')}
                  >
                    <FaFacebook className="me-2" /> Facebook
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-muted mb-0">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registro" className="text-primary fw-bold">
                      Regístrate
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;