import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter', () => {
  const mockCategorias = [
    { id: 'cat1', nombre: 'Tortas' },
    { id: 'cat2', nombre: 'Cupcakes' }
  ];

  const mockOnChangeCategoria = jest.fn();
  const mockOnChangeBusqueda = jest.fn();

  beforeEach(() => {
    render(
      <CategoryFilter
        categorias={mockCategorias}
        onChangeCategoria={mockOnChangeCategoria}
        onChangeBusqueda={mockOnChangeBusqueda}
      />
    );
  });

  test('renderiza opciones de categoría correctamente', () => {
    expect(screen.getByText('Todas las categorías')).toBeInTheDocument();
    expect(screen.getByText('Tortas')).toBeInTheDocument();
    expect(screen.getByText('Cupcakes')).toBeInTheDocument();
  });

  test('llama a onChangeCategoria cuando se selecciona una categoría', () => {
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'cat2' } });
    expect(mockOnChangeCategoria).toHaveBeenCalledWith('cat2');
  });

  test('llama a onChangeBusqueda cuando se escribe en el input', () => {
    const input = screen.getByPlaceholderText(/buscar productos/i);
    fireEvent.change(input, { target: { value: 'chocolate' } });
    expect(mockOnChangeBusqueda).toHaveBeenCalledWith('chocolate');
  });

  test('la opción por defecto debe decir "Todas las categorías"', () => {
    const select = screen.getByRole('combobox');
    expect(select.firstChild.textContent).toBe('Todas las categorías');
  });
});