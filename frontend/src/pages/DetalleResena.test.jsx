import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { DetalleResena } from './DetalleResena';

describe('Prueba Unitaria - Vista DetalleResena y Persistencia en LocalStorage', () => {
  
  // 1. LIMPIEZA Y PREPARACIÓN DEL ENTORNOS
  beforeEach(() => {
    localStorage.clear();

    // Simular un usuario logueado en localStorage antes de cada prueba
    const usuarioSimulado = {
      nombre: 'Usuario Prueba',
      correo: 'usuario@duoc.cl',
      rol: 'Cliente'
    };
    localStorage.setItem('usuarioSesion', JSON.stringify(usuarioSimulado));
  });

  it('debe permitir a un usuario publicar una reseña y verificar que se guarde en localStorage', () => {
    // Cargar la vista con la ruta dinámica del álbum 'alb-1'
    render(
      <MemoryRouter initialEntries={['/resena/alb-1']}>
        <Routes>
          <Route path="/resena/:id" element={<DetalleResena />} />
        </Routes>
      </MemoryRouter>
    );

    // 2. ESCRIBIR COMENTARIO EN EL TEXTAREA
    const textarea = screen.getByPlaceholderText(/¿Qué opinas de este disco\?.../i);
    fireEvent.change(textarea, { target: { value: 'Excelente álbum de culto' } });

    // 3. HACER CLIC EN EL BOTÓN PUBLICAR
    const botonPublicar = screen.getByRole('button', { name: /Publicar Reseña/i });
    fireEvent.click(botonPublicar);

    // 4. VERIFICACIÓN EN LA INTERFAZ (UI)
    expect(screen.getByText(/"Excelente álbum de culto"/i)).toBeInTheDocument();

    // 5. VERIFICACIÓN EN LOCALSTORAGE
    const resenasGuardadas = JSON.parse(localStorage.getItem('resenasComunidad'));
    
    expect(resenasGuardadas).not.toBeNull();
    expect(resenasGuardadas.length).toBeGreaterThan(0);

    const resenaPublicada = resenasGuardadas.find((r) => r.albumId === 'alb-1');
    expect(resenaPublicada).toBeDefined();
    expect(resenaPublicada.comentario).toBe('Excelente álbum de culto');
    expect(resenaPublicada.usuarioCorreo).toBe('usuario@duoc.cl');
    expect(resenaPublicada.usuarioNombre).toBe('Usuario Prueba');
  });
});