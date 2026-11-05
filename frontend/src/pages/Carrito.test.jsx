import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Carrito } from './Carrito';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Carrito', () => {
  it('debe renderizar la lista de productos pasados por props', () => {
    const carritoMock = [
      { id: '1', nombre: 'Disco de Vinilo Retro', precio: 25000, cantidad: 2 }
    ];

    renderWithRouter(<Carrito carrito={carritoMock} setCarrito={() => {}} />);

    // Verifica que se muestre el producto recibido vía props
    expect(screen.getByText('Disco de Vinilo Retro')).toBeInTheDocument();
  });
});