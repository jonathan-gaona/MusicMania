import React from 'react';
import { Link } from 'react-router-dom';

export const AlbumCard = ({ album, onAgregarAlCarrito }) => {
  const { id, titulo, artista, anio, precio, imagen, spotifyUrl } = album;

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(precio);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
        <img 
          src={imagen} 
          className="card-img-top" 
          alt={titulo} 
          style={{ height: '220px', objectFit: 'cover' }} 
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-white fw-bold">{titulo}</h5>
          <p className="card-text text-light opacity-75 small mb-2">
            {artista} • {anio}
          </p>
          
          <p className="card-text fs-5 fw-bold text-danger mb-3">
            {precioFormateado}
          </p>

          <div className="mt-auto d-flex flex-column gap-2">
            {/* Botón opcional de Spotify si la URL existe */}
            {spotifyUrl && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={spotifyUrl}
                className="btn btn-outline-success btn-sm fw-bold w-100"
              >
                <i className="bi bi-spotify me-1"></i> Escuchar Álbum
              </a>
            )}

            {/* Fila de acciones principales */}
            <div className="d-flex gap-2">
              <Link
                to={`/producto/${id}`}
                className="btn btn-outline-light btn-sm flex-fill fw-bold"
              >
                Ver Detalle
              </Link>

              <button
                type="button"
                className="btn btn-danger btn-sm flex-fill fw-bold"
                onClick={() => onAgregarAlCarrito(album)}
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};