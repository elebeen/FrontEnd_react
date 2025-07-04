import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row, Col, Button, Card } from 'react-bootstrap';

import ProductCard from '../components/ProductCard';
import axios from 'axios';

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
import { Link } from 'react-router-dom';

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
  const [featuredProducts, setFeaturedProducts] = useState([]); // Inicializa como un array vacío

  useEffect(() => {
    // Realiza la llamada a la API para obtener productos
    axios.get('http://localhost:8000/api/productos/')
      .then(response => {
        // Filtra o selecciona los productos que quieres destacar en la Home.
        // Aquí tomamos los primeros 4 productos como ejemplo.
        setFeaturedProducts(response.data.slice(0, 4));
      })
      .catch(error => {
        console.error('Error al cargar productos destacados:', error);
      });
  }, []);

  return (
    <Container className="mt-5">
      {/* Sección Hero: Más impactante y con llamado a la acción */}
      <Row className="text-center py-5 rounded mb-5" style={{ backgroundColor: 'var(--accent)' }}>
        <Col>
          <h1 className="display-4 fw-bolder" style={{ color: 'var(--primary)' }}>
            Sweetify: Donde Cada Bocado es una Celebración 🎉
          </h1>
          <p className="lead" style={{ color: 'var(--text)' }}>
            Explora nuestra exquisita selección de repostería artesanal, bocados salados y bebidas gourmet.
            Todo hecho con pasión, para endulzar tu día.
          </p>
          <Button as={Link} to="/productos" className="btn-primary mt-4 fs-5">
            Ver Todos los Productos
          </Button>
        </Col>
      </Row>

      {/* Carrusel de Imágenes: Muestra la variedad */}
      <h2 className="titulo-productos text-center mb-4" style={{ color: 'var(--text)' }}>Nuestras Creaciones en Imágenes</h2>
      <Carousel interval={3000} className="mb-5 shadow rounded-4" fade> {/* Añadido fade, shadow, rounded-4 */}
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{ maxHeight: '500px', objectFit: 'cover', borderRadius: '16px' }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
              <h5 className="text-light">{img.caption}</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Sección de Productos Destacados/Novedades: Usa ProductCard */}
      <section className="mb-5 py-4">
        <h2 className="titulo-productos text-center mb-4" style={{ color: 'var(--primary)' }}>
          Sabores que Enamoran
        </h2>
        <Row className="gy-4 gx-4 justify-content-center">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(producto => (
              <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className="d-flex">
                <ProductCard producto={producto} />
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">Cargando productos destacados...</p>
          )}
        </Row>
        <div className="text-center mt-5">
          <Button as={Link} to="/productos" className="btn-primary fs-5">
            Descubre Más Delicias
          </Button>
        </div>
      </section>

      {/* Nuestra Misión: Sección con fondo suave y sombra */}
      <section className="mb-5 py-5 rounded shadow-sm" style={{ backgroundColor: 'var(--highlight)' }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="mb-3" style={{ color: 'var(--primary)' }}>Nuestra Misión 💖</h2>
            <p className="lead" style={{ color: 'var(--text)' }}>
              En <strong>Sweetify</strong> nos dedicamos a transformar ingredientes simples en obras maestras comestibles.
              Nuestro objetivo es ser parte de tus celebraciones y momentos especiales, ofreciendo postres
              artesanales de la más alta calidad, hechos con amor y dedicación. Cada creación es un reflejo de nuestra pasión
              por endulzar la vida de nuestros clientes.
            </p>
          </Col>
        </Row>
      </section>

      {/* Nuestra Historia: Sección con fondo contrastante y sombra */}
      <section className="mb-5 py-5 rounded shadow-sm" style={{ backgroundColor: 'var(--nude-claro-suave)' }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h2 className="mb-3" style={{ color: 'var(--primary)' }}>Nuestra Historia ✨</h2>
            <p className="lead" style={{ color: 'var(--text)' }}>
              Fundada por un equipo de pasteleros apasionados, Sweetify nació del deseo de compartir la alegría
              y la calidez que solo la repostería casera puede ofrecer. Nos inspiramos en sabores tradicionales
              y tendencias innovadoras para crear una experiencia única en cada bocado. ¡Bienvenido a nuestra dulce familia!
            </p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
