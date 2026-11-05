import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Ofertas } from './Ofertas';
import * as productosService from '../services/productosService';

vi.mock('../services/productosService', () => ({ listar: vi.fn() }));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Ofertas', () => {
  beforeEach(() => {
    productosService.listar.mockResolvedValue([
      { id: 'of-101', titulo: 'Tornamesa Retro Vintage', precio: 89990, precioAntes: 120000, imagen: '/img/tocadiscos.jpg' },
    ]);
  });

  it('debe ejecutar agregarAlCarrito al presionar Aprovechar Oferta', async () => {
    const mockAgregar = vi.fn();
    renderWithRouter(<Ofertas agregarAlCarrito={mockAgregar} />);

    const botonesOferta = await screen.findAllByRole('button', { name: /Aprovechar Oferta/i });
    fireEvent.click(botonesOferta[0]);

    expect(productosService.listar).toHaveBeenCalledWith('ofertas');
    expect(mockAgregar).toHaveBeenCalledWith(expect.objectContaining({ id: 'of-101', precio: 89990 }));
  });
});
