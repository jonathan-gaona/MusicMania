import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productosService from '../services/productosService';
import { AlbumCard } from '../components/AlbumCard';

export const CatalogoAlbumes = ({ agregarAlCarrito }) => {
  const [toast, setToast] = useState('');

  // Catálogo desde la API (categoría vinilos)
  const [listaProductos, setListaProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    productosService
      .listar('vinilos')
      .then(setListaProductos)
      .catch(() => setError('No se pudo cargar el catálogo. Intenta nuevamente.'));
  }, []);

  const handleAgregar = (album) => {
    if (agregarAlCarrito) {
      agregarAlCarrito({
        id: album.id,
        nombre: album.titulo || album.nombre,
        precio: album.precio,
        imagen: album.imagen,
        ...album
      });
    }

    setToast(`¡"${album.titulo || album.nombre}" se agregó al carrito!`);

    setTimeout(() => {
      setToast('');
    }, 3000);
  };

  return (
    <div className="bg-dark text-white min-vh-100 py-5 position-relative">
      
      {/* Toast Notificación Flotante */}
      {toast && (
        <div 
          className="position-fixed top-0 end-0 p-3" 
          style={{ zIndex: 1055, marginTop: '70px' }}
        >
          <div className="toast show align-items-center text-bg-success border-0 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-bold fs-6">
                <i className="bi bi-check-circle-fill me-2"></i>
                {toast}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setToast('')}
              ></button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <h1 className="text-center mb-5 fw-bold text-white text-uppercase">Catálogo de Álbumes</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Grid de Productos */}
        <div className="row g-4 mb-5">
          {listaProductos.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onAgregarAlCarrito={handleAgregar}
            />
          ))}
        </div>

        {/* Botón para ver reseñas */}
        <div className="d-flex justify-content-center mt-4">
          <Link
            to="/resena"
            className="btn btn-warning fw-bold px-4 py-3 shadow"
          >
            Ver Reseñas de Álbumes
          </Link>
        </div>
      </div>
    </div>
  );
};