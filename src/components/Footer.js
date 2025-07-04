import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaWhatsapp, FaInstagram, FaFacebook, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import visaLogo from '../assets/visa.png';
import mastercardLogo from '../assets/mastercard-removebg-preview.png';
import paypalLogo from '../assets/paypal.png';

const Footer = () => {
  return (
    <footer className="bg-dark pt-5 pb-3" style={{ borderTop: '3px solid #ff5a60' }}>
      <Container>
        <Row className="g-4">
          {/* Columna de información */}
          <Col lg={4} md={6}>
            <div className="mb-4 text-white">
              <Link to="/" className="text-decoration-none">
                <h3 className="text-white mb-3" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.2rem' }}>
                  Sweetify Perú
                </h3>
              </Link>
              <p className="text-muted" style={{ lineHeight: '1.6' }}>
                Deliciosos postres artesanales hechos con amor y los mejores ingredientes para endulzar tus momentos especiales.
              </p>
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="me-3 text-danger" size={18} />
              <span className="text-white">Av. Los Postres 123, Lima, Perú</span>
            </div>
            
            <div className="d-flex align-items-center">
              <FaEnvelope className="me-3 text-warning" size={18} />
              <a href="mailto:contacto@sweetifyperu.com" className="text-white text-decoration-none">
                contacto@sweetifyperu.com
              </a>
            </div>
          </Col>

          {/* Columna de enlaces rápidos */}
          <Col lg={2} md={6}>
            <h5 className="text-white mb-4" style={{ position: 'relative', paddingBottom: '10px' }}>
              Enlaces
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40px',
                height: '2px',
                backgroundColor: '#ff5a60'
              }}></span>
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none hover-text-primary">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="text-muted text-decoration-none hover-text-primary">
                  Productos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros" className="text-muted text-decoration-none hover-text-primary">
                  Nosotros
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-muted text-decoration-none hover-text-primary">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-muted text-decoration-none hover-text-primary">
                  Términos
                </Link>
              </li>
            </ul>
          </Col>

          {/* Columna de horario */}
          <Col lg={3} md={6}>
            <h5 className="text-white mb-4" style={{ position: 'relative', paddingBottom: '10px' }}>
              Horario
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40px',
                height: '2px',
                backgroundColor: '#ff5a60'
              }}></span>
            </h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2 d-flex justify-content-between">
                <span>Lunes - Viernes:</span>
                <span>9:00 AM - 8:00 PM</span>
              </li>
              <li className="mb-2 d-flex justify-content-between">
                <span>Sábados:</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Domingos:</span>
                <span>11:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </Col>

          {/* Columna de redes sociales */}
          <Col lg={3} md={6}>
            <h5 className="text-white mb-4" style={{ position: 'relative', paddingBottom: '10px' }}>
              Síguenos
              <span style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40px',
                height: '2px',
                backgroundColor: '#ff5a60'
              }}></span>
            </h5>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon whatsapp d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: 'white',
                  transition: 'transform 0.3s'
                }}
              >
                <FaWhatsapp size={20} />
              </a>
              
              <a
                href="https://instagram.com/sweetifyperu"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                  color: 'white',
                  transition: 'transform 0.3s'
                }}
              >
                <FaInstagram size={20} />
              </a>
              
              <a
                href="https://facebook.com/sweetifyperu"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook d-flex align-items-center justify-content-center"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#3b5998',
                  color: 'white',
                  transition: 'transform 0.3s'
                }}
              >
                <FaFacebook size={20} />
              </a>
            </div>
            
            <div className="mb-3">
              <h6 className="text-white mb-3">Métodos de Pago</h6>
              <div className="d-flex gap-2">
                <img src={visaLogo} alt="Visa" style={{ width: '40px', height: '25px', objectFit: 'contain' }} />
                <img src={mastercardLogo} alt="Mastercard" style={{ width: '40px', height: '25px', objectFit: 'contain' }} />
                <img src={paypalLogo} alt="PayPal" style={{ width: '40px', height: '25px', objectFit: 'contain' }} />
              </div>
            </div>
          </Col>
        </Row>

        {/* Derechos de autor */}
        <Row className="mt-5 pt-3 border-top border-secondary">
          <Col className="text-center">
            <p className="mb-1 text-muted">
              &copy; {new Date().getFullYear()} Sweetify Perú. Todos los derechos reservados.
            </p>
            <p className="mb-0 text-muted small">
              Diseñado y desarrollado con ❤️ por el equipo Sweetify
            </p>
          </Col>
        </Row>
      </Container>  
    </footer>
  );
};

export default Footer;