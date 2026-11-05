import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PagoError } from './PagoError';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista PagoError', () => {
  it('debe renderizar correctamente el mensaje de error de pago y el botón de reintento', () => {
    renderWithRouter(<PagoError />);

    // Verificar el título de error
    expect(screen.getByText(/NO SE PUDO REALIZAR EL PAGO/i)).toBeInTheDocument();

    // Verificar la presencia del enlace para volver a intentar
    expect(screen.getByRole('link', { name: /Volver a Intentar/i })).toBeInTheDocument();
  });
});