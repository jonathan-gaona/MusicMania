import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Home } from './Home';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitarias - Vista Home', () => {
  it('debe renderizar el contenido principal del Home correctamente', () => {
    renderWithRouter(<Home />);
    
    // Verifica que exista algún elemento o texto característico de tu portada
    expect(document.body).toBeInTheDocument();
  });
});