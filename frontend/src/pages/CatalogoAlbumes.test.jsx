// Verifica que el catálogo pida los vinilos a la API y los renderice en pantalla.

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CatalogoAlbumes } from './CatalogoAlbumes';
import * as productosService from '../services/productosService';

vi.mock('../services/productosService', () => ({ listar: vi.fn() }));

describe('Prueba Unitaria - Catálogo Albumes', () => {
  beforeEach(() => {
    productosService.listar.mockResolvedValue([
      { id: 'alb-1', titulo: 'Naturaleza Muerta', artista: 'Ley 20 mil', anio: 2011, precio: 17990, imagen: '/img/Ley20mil.jpg', categoria: 'vinilos' },
    ]);
  });

  it('debe renderizar la lista de productos devuelta por la API', async () => {
    render(
      <BrowserRouter>
        <CatalogoAlbumes />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(await screen.findByText('Naturaleza Muerta')).toBeInTheDocument();
    expect(productosService.listar).toHaveBeenCalledWith('vinilos');
  });

  it('debe mostrar un mensaje de error si la API falla', async () => {
    productosService.listar.mockRejectedValue(new Error('fallo'));
    render(
      <BrowserRouter>
        <CatalogoAlbumes />
      </BrowserRouter>
    );

    expect(await screen.findByText(/No se pudo cargar el catálogo/i)).toBeInTheDocument();
  });
});
