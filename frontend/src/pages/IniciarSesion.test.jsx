// Verifica que al enviar credenciales el formulario llame al servicio de autenticación (API).

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IniciarSesion } from './IniciarSesion';
import * as authService from '../services/authService';

vi.mock('../services/authService', () => ({ login: vi.fn(), loginConGoogle: vi.fn() }));

describe('Prueba Unitaria - IniciarSesion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe llamar a login con las credenciales y mostrar la bienvenida', async () => {
    authService.login.mockResolvedValue({ nombre: 'Administrador Principal', correo: 'usuario.prueba@duoc.cl', rol: 'Administrador' });

    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('nombre@duoc.cl'), { target: { value: 'usuario.prueba@duoc.cl' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'clave123' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    await waitFor(() => expect(authService.login).toHaveBeenCalledWith('usuario.prueba@duoc.cl', 'clave123'));
    expect(await screen.findByText(/Bienvenido Administrador Principal/i)).toBeInTheDocument();
  });

  it('debe mostrar el error que devuelve el servidor si las credenciales son incorrectas', async () => {
    authService.login.mockRejectedValue({ response: { data: { message: 'Correo o contraseña incorrectos.' } } });

    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('nombre@duoc.cl'), { target: { value: 'usuario.prueba@duoc.cl' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'mala' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    expect(await screen.findByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
  });
});
