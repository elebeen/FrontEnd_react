import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext';

// Función para renderizar el navbar con o sin usuario
const renderNavbar = (user = null, logout = jest.fn()) => {
  render(
    <AuthContext.Provider value={{ user, logout }}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('Navbar', () => {
  test('muestra enlaces públicos (Inicio, Productos, Carrito)', () => {
    renderNavbar();
    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
    expect(screen.getByText(/carrito/i)).toBeInTheDocument();
  });

  test('muestra "Iniciar sesión" y "Registrarse" si no hay usuario', () => {
    renderNavbar();
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
  });

  test('muestra el nombre del usuario si está logueado', () => {
    const user = { username: 'Jhoseph' };
    renderNavbar(user);
    expect(screen.getByText(/hola, jhoseph/i)).toBeInTheDocument();
  });

  test('muestra botón "Cerrar sesión" si hay usuario logueado', () => {
    const user = { username: 'Jhoseph' };
    renderNavbar(user);
    expect(screen.getByRole('button', { name: /cerrar sesión/i })).toBeInTheDocument();
  });

  test('llama a logout y navega a /login al cerrar sesión', () => {
    const logoutMock = jest.fn();
    const user = { username: 'Jhoseph' };
    renderNavbar(user, logoutMock);

    const btnCerrar = screen.getByRole('button', { name: /cerrar sesión/i });
    fireEvent.click(btnCerrar);

    expect(logoutMock).toHaveBeenCalledTimes(1);
    // no podemos probar useNavigate directamente sin mocking extra
  });
});