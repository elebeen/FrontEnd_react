import React, { useContext } from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar mb-4 py-3">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
          Sweetify 🍰
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">
            <Nav.Link as={Link} to="/" className="nav-link">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos" className="nav-link">Productos</Nav.Link>
            <Nav.Link as={Link} to="/carrito" className="nav-link">Carrito 🛒</Nav.Link>

            {user ? (
              <>
                <span className="text-light">Hola, {user.username}</span>
                <Button variant="outline-danger" onClick={cerrarSesion}>Cerrar sesión</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "#d47b9c" }}>Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: "#d47b9c" }}>Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
