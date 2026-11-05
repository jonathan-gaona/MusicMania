import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contacto } from './Contacto';

describe('Prueba Unitaria - Vista Contacto', () => {
  it('debe mostrar mensaje de error al ingresar un correo con dominio no permitido', () => {
    render(<Contacto />);

    // Llenar los campos obligatorios
    fireEvent.change(screen.getByPlaceholderText(/Ingresa tu nombre/i), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByPlaceholderText(/ejemplo@gmail.com/i), { target: { value: 'test@invalid.com' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'consulta' } });
    fireEvent.change(screen.getByPlaceholderText(/Escribe tu mensaje aquí/i), { target: { value: 'Hola, tengo una consulta.' } });

    // Enviar el formulario
    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    // Validar que aparezca el mensaje de error del dominio
    expect(screen.getByText(/El correo debe pertenecer al dominio @gmail.com o @duoc.cl/i)).toBeInTheDocument();
  });
});