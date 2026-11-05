import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { SobreNosotros } from './SobreNosotros';

describe('Prueba Unitaria - Sobre Nosotros', () => {
  it('debe renderizar el título y la información de la empresa', () => {
    render(
      <BrowserRouter>
        <SobreNosotros />
      </BrowserRouter>
    );

    const tituloNosotros = screen.getByText(/Nuestra Historia/i);
    expect(tituloNosotros).toBeInTheDocument();
  });
});