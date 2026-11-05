import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogData } from './blog';

export const DetalleBlog = () => {
  const { id } = useParams();
  
  // Buscar la noticia según el id ingresado en la URL
  const noticia = blogData.find((item) => item.id === id);

  // Si el id no existe en los datos
  if (!noticia) {
    return (
      <div className="container py-5 text-center text-light">
        <h2>Noticia no encontrada</h2>
        <p>El caso que estás buscando no existe o fue removido.</p>
        <Link to="/blog" className="btn btn-danger mt-3">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <main className="py-5 bg-dark text-light">
      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Botón Volver */}
        <Link to="/blog" className="btn btn-outline-light mb-4">
          <i className="bi bi-arrow-left me-2"></i> Volver al Blog
        </Link>

        {/* Estructura de Noticia Noticiosa */}
        <article className="bg-secondary bg-opacity-10 p-4 p-md-5 rounded shadow border border-secondary">
          <span className="badge bg-danger text-uppercase tracking-wider mb-2">Curiosidades de la Música</span>
          
          <h1 className="display-6 fw-bold mb-3">{noticia.title}</h1>
          <h5 className="text-secondary mb-4 fw-normal">{noticia.subtitle}</h5>

          {/* Metadatos de la noticia */}
          <div className="d-flex align-items-center gap-3 text-secondary small mb-4 border-bottom border-secondary pb-3">
            <span><i className="bi bi-person-fill me-1"></i> {noticia.autor}</span>
            <span>•</span>
            <span><i className="bi bi-calendar3 me-1"></i> {noticia.fecha}</span>
          </div>

          {/* Imagen Principal de la Noticia */}
          <img
            src={`/${noticia.image}`}
            alt={noticia.title}
            className="img-fluid rounded w-100 mb-4 object-fit-cover shadow-sm"
            style={{ maxHeight: '420px' }}
          />

          {/* Párrafos del Contenido Extendido */}
          <div className="lh-lg text-light fs-5">
            {noticia.contenidoExtendido.map((parrafo, index) => (
              <p key={index} className="mb-4">{parrafo}</p>
            ))}
          </div>

          {/* Pie de la Noticia */}
          <div className="border-top border-secondary pt-4 mt-5 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            <span className="text-secondary small">MusicMania Blog © 2026 - Reportajes Especiales</span>
            <Link to="/blog" className="btn btn-danger">Ver más noticias</Link>
          </div>
        </article>
      </div>
    </main>
  );
};