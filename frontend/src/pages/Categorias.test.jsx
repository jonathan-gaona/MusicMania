import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Categorias } from './Categorias';
import * as productosService from '../services/productosService';

vi.mock('../services/productosService', () => ({ listar: vi.fn() }));

const PRODUCTOS = [
  { id: 'alb-1', categoria: 'vinilos', titulo: 'Naturaleza Muerta', artista: 'Ley 20 mil', precio: 17990, imagen: '/img/a.jpg' },
  { id: 'eq-1', categoria: 'equipos', titulo: 'Amplificador de Guitarra Marshall', nombre: 'Amplificador de Guitarra Marshall', precio: 399990, imagen: '/img/b.jpg' },
];

// Wrapper para componentes que usan <Link> de react-router-dom
const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Pruebas Unitarias para Categorias', () => {
  beforeEach(() => {
    productosService.listar.mockResolvedValue(PRODUCTOS);
  });

  // 1. Renderizado correcto (título, filtros y productos de la API)
  it('debe renderizar el título de Categorías, los filtros y los productos', async () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);

    expect(screen.getByRole('heading', { name: /CATEGORÍAS/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Vinilos/i })).toBeInTheDocument();
    expect(await screen.findByText(/Naturaleza Muerta/i)).toBeInTheDocument();
  });

  // 2. Renderizado condicional / Filtros
  it('debe filtrar productos al hacer clic en el botón de la categoría "Equipos"', async () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);
    await screen.findByText(/Naturaleza Muerta/i);

    fireEvent.click(screen.getByRole('button', { name: /^Equipos$/i }));

    expect(screen.getByText(/Amplificador de Guitarra Marshall/i)).toBeInTheDocument();
    expect(screen.queryByText(/Naturaleza Muerta/i)).not.toBeInTheDocument();
  });

  // 3. Props y eventos (onClick)
  it('debe llamar a la función agregarAlCarrito al presionar "Añadir"', async () => {
    const mockAgregarAlCarrito = vi.fn();
    renderWithRouter(<Categorias agregarAlCarrito={mockAgregarAlCarrito} />);

    const botonesAñadir = await screen.findAllByRole('button', { name: /Añadir/i });
    fireEvent.click(botonesAñadir[0]);

    expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
  });

  // 4. Estado (Notificación Toast)
  it('debe mostrar la notificación Toast tras añadir un producto', async () => {
    renderWithRouter(<Categorias agregarAlCarrito={() => {}} />);

    const botonesAñadir = await screen.findAllByRole('button', { name: /Añadir/i });
    fireEvent.click(botonesAñadir[0]);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/se agregó al carrito/i)).toBeInTheDocument();
  });
});
