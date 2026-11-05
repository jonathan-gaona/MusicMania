import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AdminBlogs } from './AdminBlogs';

describe('Prueba Unitaria - Módulo AdminBlogs y Persistencia LocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe abrir el modal, completar el formulario y guardar el nuevo artículo en localStorage', () => {
    render(<AdminBlogs />);

    // 1. Abrir modal
    const botonNuevo = screen.getByRole('button', { name: /Nuevo Artículo/i });
    fireEvent.click(botonNuevo);

    // 2. Buscar e interactuar con las entradas mediante placeholder
    const inputTitle = screen.getByPlaceholderText(/Ej: El álbum grabado bajo el agua\.../i);
    const inputSummary = screen.getByPlaceholderText(/Breve resumen que aparecerá en la tarjeta principal\.../i);
    const inputContenido = screen.getByPlaceholderText(/Escribe aquí los párrafos completos de la noticia\.../i);

    fireEvent.change(inputTitle, { target: { value: 'Nueva Curiosidad del Rock' } });
    fireEvent.change(inputSummary, { target: { value: 'Resumen de prueba para el test unitario' } });
    fireEvent.change(inputContenido, { target: { value: 'Este es el contenido extendido completo del artículo.' } });

    // 3. Publicar artículo
    const botonPublicar = screen.getByRole('button', { name: /Publicar Artículo/i });
    fireEvent.click(botonPublicar);

    // 4. Aserción en pantalla
    expect(screen.getByText('Nueva Curiosidad del Rock')).toBeInTheDocument();

    // 5. Aserción en localStorage
    const blogsGuardados = JSON.parse(localStorage.getItem('blogsApp'));
    expect(blogsGuardados).not.toBeNull();
    expect(blogsGuardados.length).toBeGreaterThan(0);

    const nuevoBlog = blogsGuardados.find((b) => b.title === 'Nueva Curiosidad del Rock');
    expect(nuevoBlog).toBeDefined();
    expect(nuevoBlog.summary).toBe('Resumen de prueba para el test unitario');
  });
});