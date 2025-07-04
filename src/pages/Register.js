import React, { useState } from 'react';
import axios from 'axios';
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
  ProgressBar 
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaPhone, 
  FaCheck, 
  FaTimes,
  FaArrowLeft
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ 
    username: '', 
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: '',
    telefono: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validación de contraseña en tiempo real
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    // Longitud mínima
    if (password.length >= 8) strength += 20;
    
    // Contiene números
    if (/\d/.test(password)) strength += 20;
    
    // Contiene mayúsculas
    if (/[A-Z]/.test(password)) strength += 20;
    
    // Contiene caracteres especiales
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    
    // Longitud extra
    if (password.length >= 12) strength += 20;
    
    setPasswordStrength(Math.min(strength, 100));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username.trim()) newErrors.username = 'Usuario requerido';
    if (!form.email.trim()) newErrors.email = 'Email requerido';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.password) newErrors.password = 'Contraseña requerida';
    if (form.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/registro/', {
        username: form.username,
        email: form.email,
        password: form.password,
        first_name: form.nombre,
        last_name: form.apellido,
        phone: form.telefono
      });
      
      toast.success('🎉 ¡Registro exitoso! Por favor inicia sesión', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      navigate('/login');
    } catch (err) {
      let errorMessage = 'Error al registrar. Intente nuevamente.';
      
      if (err.response?.data) {
        if (err.response.data.username) {
          errorMessage = 'El usuario ya existe';
        } else if (err.response.data.email) {
          errorMessage = 'El email ya está registrado';
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        }
      }
      
      toast.error(errorMessage, {
        position: "top-center"
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { id: 1, text: 'Mínimo 8 caracteres', validator: (p) => p.length >= 8 },
    { id: 2, text: 'Al menos un número', validator: (p) => /\d/.test(p) },
    { id: 3, text: 'Al menos una mayúscula', validator: (p) => /[A-Z]/.test(p) },
    { id: 4, text: 'Carácter especial', validator: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
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
                <h2 className="fw-bold text-primary">Crear Cuenta</h2>
                <p className="text-muted">Únete a nuestra comunidad</p>
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaUser />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={form.nombre}
                          onChange={handleChange}
                          isInvalid={!!errors.nombre}
                          placeholder="Tu nombre"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nombre}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        placeholder="Tu apellido"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                      placeholder="Nombre de usuario"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="tu@email.com"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaPhone />
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="Número de teléfono"
                    />
                  </InputGroup>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      placeholder="Crea una contraseña"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                  
                  {form.password && (
                    <>
                      <ProgressBar 
                        className="mt-2" 
                        now={passwordStrength} 
                        variant={
                          passwordStrength < 40 ? 'danger' : 
                          passwordStrength < 70 ? 'warning' : 'success'
                        } 
                        label={`${passwordStrength}%`}
                      />
                      
                      <div className="mt-2 small">
                        {passwordRequirements.map(req => (
                          <div 
                            key={req.id} 
                            className={`d-flex align-items-center ${
                              req.validator(form.password) ? 'text-success' : 'text-muted'
                            }`}
                          >
                            {req.validator(form.password) ? (
                              <FaCheck className="me-2" />
                            ) : (
                              <FaTimes className="me-2" />
                            )}
                            {req.text}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      placeholder="Repite tu contraseña"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                
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
                      Registrando...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </Button>
                
                <div className="text-center mt-3">
                  <p className="text-muted mb-0">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-primary fw-bold">
                      Inicia sesión
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <div className="mt-4 text-center small text-muted">
            <p>
              Al registrarte, aceptas nuestros{' '}
              <Link to="/terminos" className="text-decoration-none">
                Términos de servicio
              </Link>{' '}
              y{' '}
              <Link to="/privacidad" className="text-decoration-none">
                Política de privacidad
              </Link>
              .
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;