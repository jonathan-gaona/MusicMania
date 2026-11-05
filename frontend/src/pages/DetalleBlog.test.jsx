import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { DetalleBlog } from './DetalleBlog';

describe('Prueba Unitaria - Vista DetalleBlog', () => {
  it('debe renderizar la noticia completa cuando el ID existe en las rutas', () => {
    // Simulamos la entrada a la ruta con el ID 'caso1'
    render(
      <MemoryRouter initialEntries={['/blog/caso1']}>
        <Routes>
          <Route path="/blog/:id" element={<DetalleBlog />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar el título principal de la noticia
    expect(screen.getByRole('heading', { level: 1, name: /La canción más corta de la historia/i })).toBeInTheDocument();

    // Verificar el autor y párrafos de contenido extendido
    expect(screen.getByText(/Redacción MusicMania/i)).toBeInTheDocument();
    expect(screen.getByText(/You Suffer/i)).toBeInTheDocument();
  });
});