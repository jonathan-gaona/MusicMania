import React, { useState, useEffect } from 'react';
import * as productosService from '../services/productosService';
import { mensajeError } from '../api/axios';

export const AdminProductos = () => {
  // Productos desde la API
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const [normales, ofertas] = await Promise.all([productosService.listar(), productosService.listar('ofertas')]);
      setProductos([...normales, ...ofertas]);
    } catch (error) {
      alert(mensajeError(error, 'No se pudieron cargar los productos.'));
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const [nuevoProd, setNuevoProd] = useState({
    titulo: '',
    artista: '',
    precio: '',
    stock: '',
    categoria: 'vinilos',
  });

  // Guardar nuevo producto
  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevoProd.titulo || !nuevoProd.precio) return;

    try {
      await productosService.crear({
        titulo: nuevoProd.titulo,
        artista: nuevoProd.artista || 'Artista / Marca Varios',
        precio: Number(nuevoProd.precio),
        stock: Number(nuevoProd.stock) || 5,
        imagen: nuevoProd.categoria === 'equipos' ? '/img/tornamesa.jpg' : '/img/tocadiscos.jpg',
        categoria: nuevoProd.categoria,
      });
      await cargarProductos();
      setNuevoProd({ titulo: '', artista: '', precio: '', stock: '', categoria: 'vinilos' });
    } catch (error) {
      alert(mensajeError(error, 'No se pudo crear el producto.'));
    }
  };

  // Eliminar producto
  const handleEliminar = async (id) => {
    try {
      await productosService.eliminar(id);
      await cargarProductos();
    } catch (error) {
      alert(mensajeError(error, 'No se pudo eliminar el producto.'));
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Módulo de Productos</h2>
          <p className="text-secondary mb-0">Gestión de inventario de álbumes, vinilos y equipos de audio.</p>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2">{productos.length} Productos</span>
      </div>

      {/* Formulario de Alta de Producto */}
      <form onSubmit={handleAgregar} className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary mb-4 row g-3 align-items-end shadow-sm">
        <h5 className="fw-bold text-uppercase text-danger mb-2">
          <i className="bi bi-plus-circle me-2"></i>Agregar Nuevo Producto
        </h5>
        
        <div className="col-md-3">
          <label className="form-label text-secondary small fw-bold">Título / Nombre</label>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-secondary"
            value={nuevoProd.titulo}
            onChange={(e) => setNuevoProd({ ...nuevoProd, titulo: e.target.value })}
            placeholder="Ej: Amplificador Marshall"
            required 
          />
        </div>
        
        <div className="col-md-3">
          <label className="form-label text-secondary small fw-bold">Artista / Marca</label>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-secondary"
            value={nuevoProd.artista}
            onChange={(e) => setNuevoProd({ ...nuevoProd, artista: e.target.value })}
            placeholder="Ej: Marshall" 
          />
        </div>

        <div className="col-md-2">
          <label className="form-label text-secondary small fw-bold">Categoría</label>
          <select
            className="form-select bg-dark text-light border-secondary"
            value={nuevoProd.categoria}
            onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
          >
            <option value="vinilos">Vinilos</option>
            <option value="equipos">Equipos</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label text-secondary small fw-bold">Precio ($CLP)</label>
          <input 
            type="number" 
            className="form-control bg-dark text-light border-secondary"
            value={nuevoProd.precio}
            onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
            placeholder="19990"
            required 
          />
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-danger w-100 fw-bold py-2">
            Guardar
          </button>
        </div>
      </form>

      {/* Tabla de Productos Registrados */}
      <div className="table-responsive bg-secondary bg-opacity-10 rounded-3 border border-secondary p-3 shadow">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr className="text-secondary border-bottom border-secondary">
              <th>Título / Producto</th>
              <th>Artista / Marca</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th className="text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td className="fw-bold">{prod.titulo || prod.nombre}</td>
                <td className="text-secondary">{prod.artista || 'N/A'}</td>
                <td>
                  <span className={`badge text-uppercase ${
                    prod.categoria === 'equipos' ? 'bg-primary' : prod.categoria === 'accesorios' ? 'bg-warning text-dark' : 'bg-secondary'
                  }`}>
                    {prod.categoria || 'vinilos'}
                  </span>
                </td>
                <td className="text-success fw-bold">${Number(prod.precio).toLocaleString('es-CL')}</td>
                <td className="text-end">
                  <button onClick={() => handleEliminar(prod.id)} className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};