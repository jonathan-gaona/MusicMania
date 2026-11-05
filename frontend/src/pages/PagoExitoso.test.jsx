import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PagoExitoso } from './PagoExitoso';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista PagoExitoso', () => {
  it('debe renderizar el número de orden y los datos pasados por props', () => {
    const ordenMock = {
      nroOrden: '#123456',
      cliente: { correo: 'cliente@duoc.cl', calle: 'Av. Siempre Viva 123', comuna: 'Santiago' },
      total: 50000
    };

    renderWithRouter(<PagoExitoso orden={ordenMock} />);

    // Verificar que se muestre el código de orden recibido vía props
    expect(screen.getByText('#123456')).toBeInTheDocument();
    expect(screen.getByText('cliente@duoc.cl')).toBeInTheDocument();
  });
});