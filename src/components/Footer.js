import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5"> {/* Fondo oscuro y texto claro */}
      <Container>
        <Row className="align-items-center"> {/* Alineamos verticalmente los elementos de la fila */}
          {/* Parte izquierda: Título */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0"> {/* Ocupa 1/3 en md+, centrado en xs, alineado a la izquierda en md+ */}
            <h3 className="mb-0" style={{ color: '#ff5a60' }}>
              ¡Conéctate con Nosotros!
            </h3>
          </Col>

          {/* Parte derecha: Iconos */}
          <Col md={8}> {/* Ocupa 2/3 en md+ */}
            <Row className="justify-content-center justify-content-md-end g-4"> {/* Centrado en xs, alineado a la derecha en md+ */}
              <Col xs={4} md={3} lg={2}> {/* Ajuste de columnas para los iconos */}
                <a
                  href="https://wa.me/51999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success text-decoration-none d-flex flex-column align-items-center"
                >
                  <FaWhatsapp className="fs-2 mb-1" />
                  <div className="fs-6 fw-bold">WhatsApp</div>
                </a>
              </Col>

              <Col xs={4} md={3} lg={2}>
                <a
                  href="https://instagram.com/sweetifyperu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-danger text-decoration-none d-flex flex-column align-items-center"
                >
                  <FaInstagram className="fs-2 mb-1" />
                  <div className="fs-6 fw-bold">Instagram</div>
                </a>
              </Col>

              <Col xs={4} md={3} lg={2}>
                <a
                  href="https://facebook.com/sweetifyperu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none d-flex flex-column align-items-center"
                >
                  <FaFacebook className="fs-2 mb-1" />
                  <div className="fs-6 fw-bold">Facebook</div>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Sección de Derechos de Autor */}
        <Row className="mt-4"> {/* Margen superior para separarlo de la sección de iconos/título */}
          <Col className="text-center text-muted">
            <p className="mb-1" style={{ color: '#ffffff' }}>Sweetify Perú © {new Date().getFullYear()}</p>
            <p className="mb-0" style={{ color: '#ffffff' }}>Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;