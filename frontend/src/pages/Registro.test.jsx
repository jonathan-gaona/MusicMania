// Simula el llenado del formulario de registro y valida que se envíe al backend (servicio registrar).

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Registro } from './Registro';
import * as authService from '../services/authService';

vi.mock('../services/authService', () => ({ registrar: vi.fn(), loginConGoogle: vi.fn() }));

describe('Prueba Unitaria - Registro', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authService.registrar.mockResolvedValue({ id: 1 });
  });

  it('debe enviar los datos del nuevo usuario al backend', async () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('193091180'), { target: { value: '193091180' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Alexander' } });
    fireEvent.change(screen.getByLabelText(/Apellidos/i), { target: { value: 'Lagos' } });
    fireEvent.change(screen.getByPlaceholderText('usuario@duoc.cl'), { target: { value: 'alexander@gmail.com' } });

    const inputsPassword = screen.getAllByLabelText(/Contraseña/i);
    fireEvent.change(inputsPassword[0], { target: { value: '1234' } });
    fireEvent.change(inputsPassword[1], { target: { value: '1234' } });

    fireEvent.change(screen.getByLabelText(/Región/i), { target: { value: 'Coquimbo' } });
    fireEvent.change(screen.getByLabelText(/Comuna/i), { target: { value: 'La Serena' } });
    fireEvent.change(screen.getByPlaceholderText('Av. Siempre Viva 123'), { target: { value: 'Calle Principal 456' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarme/i }));

    await waitFor(() => expect(authService.registrar).toHaveBeenCalledTimes(1));
    expect(authService.registrar).toHaveBeenCalledWith(
      expect.objectContaining({ correo: 'alexander@gmail.com', nombre: 'Alexander Lagos', password: '1234' })
    );
    expect(await screen.findByText(/Usuario creado correctamente/i)).toBeInTheDocument();
  });
});
