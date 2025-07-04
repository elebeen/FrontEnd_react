import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer'; // Asegúrate de que la ruta sea correcta

describe('Footer', () => {
  test('muestra el título "¡Conéctate con Nosotros!"', () => {
    render(<Footer />);
    expect(screen.getByText(/¡conéctate con nosotros!/i)).toBeInTheDocument();
  });

  test('muestra los iconos de WhatsApp, Instagram y Facebook con sus textos', () => {
    render(<Footer />);
    expect(screen.getByText(/whatsapp/i)).toBeInTheDocument();
    expect(screen.getByText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
  });

  test('los íconos tienen los enlaces correctos', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /whatsapp/i })).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', expect.stringContaining('instagram.com'));
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', expect.stringContaining('facebook.com'));
  });

  test('muestra el mensaje de derechos de autor', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`Sweetify Perú © ${year}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/todos los derechos reservados/i)).toBeInTheDocument();
  });
});