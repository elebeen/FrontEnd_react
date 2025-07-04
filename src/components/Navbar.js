import React, { useContext } from 'react';
import { Container, Nav, Navbar as BootstrapNavbar, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import sweetfyLogo from '../assets/icons8-pastel-de-nata-48.png'; // Asegúrate de tener el logo en la carpeta assets

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/login');
  };

  // Calcular total de items en el carrito
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <BootstrapNavbar expand="lg" className="py-3 shadow-sm" style={{ 
      borderBottom: '2px solid #ff5a60'
    }}>
      <Container>
        {/* Logo/Brand */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center me-4"
          style={{ 
            fontFamily: "'Dancing Script', cursive", 
            fontSize: '2.2rem',
            color: '#ff5a60',
            fontWeight: '700'
          }}
        >
          <img 
            src={sweetfyLogo} 
            alt="Sweetify Logo" 
            style={{ height: '50px', marginRight: '10px' }}
          />
          Sweetify
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </BootstrapNavbar.Toggle>
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Enlaces principales */}
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className="mx-2 px-3 py-2 rounded-pill nav-link-hover"
              activeClassName="active"
            >
              Inicio
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/productos" 
              className="mx-2 px-3 py-2 rounded-pill nav-link-hover"
              activeClassName="active"
            >
              Productos
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/nosotros" 
              className="mx-2 px-3 py-2 rounded-pill nav-link-hover"
              activeClassName="active"
            >
              Nosotros
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/contacto" 
              className="mx-2 px-3 py-2 rounded-pill nav-link-hover"
              activeClassName="active"
            >
              Contacto
            </Nav.Link>
          </Nav>

          {/* Enlaces de usuario/carrito */}
          <Nav className="align-items-center gap-2">
            <Nav.Link 
              as={Link} 
              to="/carrito" 
              className="position-relative mx-2 px-3 py-2 rounded-pill nav-link-hover"
              style={{ fontSize: '1.1rem' }}
            >
              <FaShoppingCart />
              {totalItems > 0 && (
                <Badge 
                  pill 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {user ? (
              <>
                <div className="d-flex align-items-center mx-3">
                  <div className="me-2 d-flex align-items-center justify-content-center bg-light rounded-circle" style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <FaUser className="text-primary" />
                  </div>
                  <span className="text-dark fw-bold">{user.username}</span>
                </div>
                <Button 
                  variant="outline-danger" 
                  onClick={cerrarSesion}
                  className="d-flex align-items-center gap-1 ms-2"
                >
                  <FaSignOutAlt /> Salir
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-primary" 
                  className="d-flex align-items-center gap-1"
                >
                  <FaSignInAlt /> Ingresar
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  className="d-flex align-items-center gap-1 ms-2"
                  style={{ backgroundColor: '#ff5a60', borderColor: '#ff5a60' }}
                >
                  <FaUserPlus /> Registrarse
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;