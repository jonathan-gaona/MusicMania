import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DetalleProducto } from './DetalleProducto';
import * as productosService from '../services/productosService';

vi.mock('../services/productosService', () => ({ obtener: vi.fn() }));

describe('Prueba Unitaria - Vista DetalleProducto', () => {
  beforeEach(() => {
    productosService.obtener.mockResolvedValue({
      id: 'eq-1',
      categoria: 'equipos',
      titulo: 'Amplificador de Guitarra Marshall',
      artista: 'Marshall',
      descripcion: 'Amplificador de alta fidelidad.',
      sku: 'AUDIO-MARSHALL-50W',
      precio: 399990,
      stock: 8,
      imagen: '/img/amplificadorMarshall.jpg',
    });
  });

  it('debe renderizar la información del producto y ejecutar agregarAlCarrito al presionar el botón', async () => {
    const agregarAlCarritoMock = vi.fn();

    render(
      <MemoryRouter initialEntries={['/producto/eq-1']}>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarritoMock} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Amplificador de Guitarra Marshall/i)).toBeInTheDocument();
    expect(productosService.obtener).toHaveBeenCalledWith('eq-1');

    fireEvent.click(screen.getByRole('button', { name: /Añadir al Carrito/i }));

    expect(agregarAlCarritoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'eq-1',
        nombre: 'Amplificador de Guitarra Marshall',
        precio: 399990,
      })
    );
  });
});
