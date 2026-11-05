import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Checkout } from './Checkout';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Prueba Unitaria - Vista Checkout', () => {
  it('debe actualizar el campo de texto cuando el usuario escribe su nombre', () => {
    const { container } = renderWithRouter(
      <Checkout 
        carrito={[{ id: '1', nombre: 'Producto Test', precio: 10000, cantidad: 1 }]} 
        setCarrito={() => {}} 
        setOrdenActual={() => {}} 
      />
    );

    // Seleccionamos directamente el input por su atributo name="nombre"
    const inputNombre = container.querySelector('input[name="nombre"]');

    fireEvent.change(inputNombre, { target: { value: 'Juan' } });

    expect(inputNombre.value).toBe('Juan');
  });
});