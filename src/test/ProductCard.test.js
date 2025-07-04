import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const productoMock = {
  id: 1,
  nombre: 'Cupcake de Chocolate',
  descripcion: 'Este es un delicioso cupcake de chocolate con cobertura cremosa y decoraciones irresistibles.',
  imagen: 'https://example.com/cupcake.jpg',
  precio: 12.5,
  stock: 5
};

describe('ProductCard', () => {
  test('renderiza el nombre, imagen y descripción del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(productoMock.nombre)).toBeInTheDocument();
    expect(screen.getByAltText(productoMock.nombre)).toHaveAttribute('src', productoMock.imagen);
    // Valida el título usando getByRole con name
    expect(screen.getByRole('link', { name: /cupcake de chocolate/i })).toBeInTheDocument();

// Valida la descripción por contenido exacto
    expect(screen.getByText(productoMock.descripcion)).toBeInTheDocument();

  });

  test('corta la descripción si tiene más de 100 caracteres', () => {
    const descripcionLarga = 'A'.repeat(150);
    const productoLargo = { ...productoMock, descripcion: descripcionLarga };

    render(
      <MemoryRouter>
        <ProductCard producto={productoLargo} />
      </MemoryRouter>
    );

    expect(screen.getByText((content, element) => content.startsWith('A'.repeat(100)))).toBeInTheDocument();
  });

  test('muestra el precio del producto correctamente', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(/s\/ 12.5/i)).toBeInTheDocument();
  });

  test('muestra el stock del producto correctamente', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} />
      </MemoryRouter>
    );

    expect(screen.getByText(/stock: 5/i)).toBeInTheDocument();
  });

  test('el botón "Ver más" lleva al detalle del producto', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={productoMock} />
      </MemoryRouter>
    );

    const boton = screen.getByRole('button', { name: /ver más/i });
    expect(boton).toHaveAttribute('href', expect.stringMatching(new RegExp(`producto/${productoMock.id}`)));
  });
});