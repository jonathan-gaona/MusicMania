import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Blog } from './Blog';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Blog', () => {
  it('debe renderizar el título del blog y las publicaciones de curiosidades', () => {
    renderWithRouter(<Blog />);

    // Verificar encabezado principal
    expect(screen.getByRole('heading', { level: 2, name: /Blog de Curiosidades/i })).toBeInTheDocument();

    // Verificar noticias del catálogo
    expect(screen.getByText(/La canción más corta de la historia/i)).toBeInTheDocument();
    expect(screen.getByText(/La obra musical más larga jamás interpretada/i)).toBeInTheDocument();
  });
});