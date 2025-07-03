import React from 'react';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from 'react-icons/fa';

import img1 from '../assets/Banana-Chia-Chocolate-Chip-Muffins-15-1.webp';
import img2 from '../assets/Brownies-con-nueces.png';
import img3 from '../assets/browniesinglten.jpeg';
import img4 from '../assets/cajasorpresa.jpg';
import img5 from '../assets/Cheesecake de frutos rojos.jpg';
import img6 from '../assets/chesckakemaracuya.jpeg';
import img7 from '../assets/ChocolateBelga.jpg';
import img8 from '../assets/chocolatecaliente.jpg';
import img9 from '../assets/cupcakes.webp';
import img10 from '../assets/Frapuccino de Oreo.jpg';
import img11 from '../assets/galletas d epascua.jpg';
import img12 from '../assets/galletasnavidad.webp';
import img13 from '../assets/Latte con vainilla.jpeg';
import img14 from '../assets/macarrones.webp';
import img15 from '../assets/MatchaBubbleTea.jpg';
import img16 from '../assets/Minicake.webp';
import img17 from '../assets/Parfait de yogurt y frutas.jpeg';
import img18 from '../assets/Red Velvet.jpg';
import img19 from '../assets/sanvalentin.webp';
import img20 from '../assets/Tartaleta de limón.jpeg';
import img21 from '../assets/Torta maracuya.jpg';
import img22 from '../assets/tortapaneton.png';
import img23 from '../assets/znahoria.jpeg';

const images = [
  { src: img1, alt: 'Muffins de chía', caption: 'Muffins de Chía y Chocolate' },
  { src: img2, alt: 'Brownies con nueces', caption: 'Brownies con Nueces' },
  { src: img3, alt: 'Brownies sin gluten', caption: 'Brownies sin Gluten' },
  { src: img4, alt: 'Caja sorpresa', caption: 'Caja Sorpresa' },
  { src: img5, alt: 'Cheesecake frutos rojos', caption: 'Cheesecake de Frutos Rojos' },
  { src: img6, alt: 'Cheesecake maracuyá', caption: 'Cheesecake de Maracuyá' },
  { src: img7, alt: 'Chocolate Belga', caption: 'Chocolate Belga' },
  { src: img8, alt: 'Chocolate caliente', caption: 'Chocolate Caliente' },
  { src: img9, alt: 'Cupcakes', caption: 'Cupcakes' },
  { src: img10, alt: 'Frapuccino de Oreo', caption: 'Frapuccino de Oreo' },
  { src: img11, alt: 'Galletas de Pascua', caption: 'Galletas de Pascua' },
  { src: img12, alt: 'Galletas de Navidad', caption: 'Galletas de Navidad' },
  { src: img13, alt: 'Latte con Vainilla', caption: 'Latte con Vainilla' },
  { src: img14, alt: 'Macarrones', caption: 'Macarrones' },
  { src: img15, alt: 'Matcha Bubble Tea', caption: 'Matcha Bubble Tea' },
  { src: img16, alt: 'Minicake', caption: 'Minicake' },
  { src: img17, alt: 'Parfait de yogurt', caption: 'Parfait de Yogurt y Frutas' },
  { src: img18, alt: 'Red Velvet', caption: 'Red Velvet' },
  { src: img19, alt: 'San Valentín', caption: 'Edición San Valentín' },
  { src: img20, alt: 'Tartaleta de limón', caption: 'Tartaleta de Limón' },
  { src: img21, alt: 'Torta Maracuyá', caption: 'Torta de Maracuyá' },
  { src: img22, alt: 'Torta Panetón', caption: 'Torta Navideña con Panetón' },
  { src: img23, alt: 'Torta de zanahoria', caption: 'Torta de Zanahoria' },
];

const Home = () => {
  return (
    <Container className="mt-5">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: '#6d4c41' }}>Bienvenido a Sweetify </h1>
        <p className="lead text-secondary fw-medium">
          Descubre nuestros postres, bebidas y tortas artesanales.<br />
          Todo hecho con amor y un toque gourmet.
        </p>
      </div>

      {/* Carrusel */}
      <Carousel style={{ borderRadius: '16px', overflow: 'hidden' }}>
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
            <Carousel.Caption>
              <h5>{img.caption}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="mt-5 text-light">

        {/* Nuestro Objetivo */}
        <section className="mb-5">
          <h2 style={{ color: '#70ff8a' }}> Nuestro Objetivo</h2>
          <p className="text-secondary">
            En <strong>Sweetify</strong> buscamos endulzar cada momento especial de tu vida con postres
            artesanales de alta calidad, preparados con los mejores ingredientes y mucha dedicación.
            Nuestra meta es llevar felicidad a través del sabor y el diseño de cada creación.
          </p>
        </section>

        {/* Acerca de Nosotros */}
        <section className="mb-5">
          <h2 style={{ color: '#8ab4f8' }}> Acerca de Nosotros</h2>
          <p className="text-secondary">
            Somos una pastelería creativa y moderna fundada por amantes del arte dulce.
            Nos inspiramos en las estaciones, celebraciones y emociones para crear productos únicos
            que no solo se ven bien, ¡sino que también saben increíble!
          </p>
        </section>

        {/* Contacto */}
        {/* <section className="mb-5">
          <h2 style={{ color: '#ff5a60' }}> Contáctanos</h2>
          <Row className="mt-3 text-center justify-content-center">
            <Col xs={4} md={2}>
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-success fs-3"
              >
                <FaWhatsapp /> <div className="fs-6">WhatsApp</div>
              </a>
            </Col>
            <Col xs={4} md={2}>
              <a
                href="https://instagram.com/sweetifyperu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-danger fs-3"
              >
                <FaInstagram /> <div className="fs-6">Instagram</div>
              </a>
            </Col>
            <Col xs={4} md={2}>
              <a
                href="https://facebook.com/sweetifyperu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary fs-3"
              >
                <FaFacebook /> <div className="fs-6">Facebook</div>
              </a>
            </Col>
          </Row>
        </section> */}
      </div>
    </Container>
  );
};

export default Home;
