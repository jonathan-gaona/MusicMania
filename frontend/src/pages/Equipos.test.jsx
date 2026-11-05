import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Equipos } from './Equipos';
import * as productosService from '../services/productosService';

vi.mock('../services/productosService', () => ({ listar: vi.fn() }));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Equipos', () => {
  beforeEach(() => {
    productosService.listar.mockResolvedValue([
      { id: 'eq-1', categoria: 'equipos', titulo: 'Amplificador de Guitarra Marshall', nombre: 'Amplificador de Guitarra Marshall', precio: 399990, imagen: '/img/a.jpg' },
    ]);
  });

  it('debe llamar a la función agregarAlCarrito al presionar Añadir al Carrito', async () => {
    const mockAgregar = vi.fn();
    renderWithRouter(<Equipos agregarAlCarrito={mockAgregar} />);

    const botonesAgregar = await screen.findAllByRole('button', { name: /Añadir al Carrito/i });
    fireEvent.click(botonesAgregar[0]);

    expect(productosService.listar).toHaveBeenCalledWith('equipos');
    expect(mockAgregar).toHaveBeenCalledTimes(1);
  });
});
