import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resenasData } from './Resena';
import initialResenasComunidad from '../data/resenasComunidad.json';

export const DetalleResena = () => {
  const { id } = useParams();
  const reseña = resenasData.find((item) => item.id === id);

  // Reseñas comunitarias en localStorage
  const [todasLasResenas, setTodasLasResenas] = useState(() => {
    const guardadas = localStorage.getItem('resenasComunidad');
    return guardadas ? JSON.parse(guardadas) : initialResenasComunidad;
  });

  // Sesión y Usuarios desde localStorage
  const [usuarioSesion, setUsuarioSesion] = useState(null);
  const [clientesDisponibles, setClientesDisponibles] = useState([]);
  const [nuevoUsuarioCorreo, setNuevoUsuarioCorreo] = useState('');

  // Formulario
  const [nuevaPuntuacion, setNuevaPuntuacion] = useState('10');
  const [nuevoComentario, setNuevoComentario] = useState('');

  // Carrusel Nativo
  const [indexCarrusel, setIndexCarrusel] = useState(0);

  useEffect(() => {
    // 1. Obtener la sesión activa
    const sesionActiva = JSON.parse(localStorage.getItem('usuarioSesion'));
    if (sesionActiva) {
      setUsuarioSesion(sesionActiva);
      setNuevoUsuarioCorreo(sesionActiva.correo);
    }

    // 2. Obtener usuarios registrados y filtrar al Administrador
    const usuariosApp = JSON.parse(localStorage.getItem('usuariosApp')) || [];
    const soloClientes = usuariosApp.filter((u) => u.rol !== 'Administrador');
    setClientesDisponibles(soloClientes);

    if (!sesionActiva && soloClientes.length > 0) {
      setNuevoUsuarioCorreo(soloClientes[0].correo);
    }
  }, []);

  if (!reseña) {
    return (
      <div className="container py-5 text-center text-light">
        <h2>Reseña no encontrada</h2>
        <p>El álbum que buscas no está en nuestra base de datos.</p>
        <Link to="/resena" className="btn btn-danger mt-3">
          Volver a Reseñas
        </Link>
      </div>
    );
  }

  const comunidadResenasAlbum = todasLasResenas.filter((item) => item.albumId === reseña.id);

  const promedioComunidad = comunidadResenasAlbum.length > 0
    ? (comunidadResenasAlbum.reduce((acc, item) => acc + Number(item.puntuacion), 0) / comunidadResenasAlbum.length).toFixed(1)
    : 'N/A';

  // Controles del Carrusel
  const handleAnterior = () => {
    setIndexCarrusel((prev) => (prev === 0 ? comunidadResenasAlbum.length - 1 : prev - 1));
  };

  const handleSiguiente = () => {
    setIndexCarrusel((prev) => (prev === comunidadResenasAlbum.length - 1 ? 0 : prev + 1));
  };

  // Guardar nueva reseña
  const handleAgregarResena = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const usuariosApp = JSON.parse(localStorage.getItem('usuariosApp')) || [];
    const correoFirma = usuarioSesion ? usuarioSesion.correo : nuevoUsuarioCorreo;
    const datosUsuario = usuariosApp.find((u) => u.correo === correoFirma) || {
      nombre: usuarioSesion ? usuarioSesion.nombre : 'Cliente Ejemplo',
      correo: correoFirma,
      rol: usuarioSesion ? usuarioSesion.rol : 'Cliente'
    };

    const nuevaResenaObj = {
      id: Date.now(),
      albumId: reseña.id,
      usuarioCorreo: datosUsuario.correo,
      usuarioNombre: datosUsuario.nombre,
      usuarioRol: datosUsuario.rol,
      puntuacion: Number(nuevaPuntuacion),
      comentario: nuevoComentario,
      fecha: new Date().toISOString().split('T')[0]
    };

    const listaActualizada = [nuevaResenaObj, ...todasLasResenas];
    setTodasLasResenas(listaActualizada);
    localStorage.setItem('resenasComunidad', JSON.stringify(listaActualizada));
    setNuevoComentario('');
    setIndexCarrusel(0);
  };

  const safeIndex = indexCarrusel >= comunidadResenasAlbum.length ? 0 : indexCarrusel;

  return (
    <main className="py-5 bg-dark text-light">
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link to="/resena" className="btn btn-outline-light mb-4">
          <i className="bi bi-arrow-left me-2"></i> Volver a Reseñas
        </Link>

        {/* DETALLE DEL ÁLBUM */}
        <article className="bg-secondary bg-opacity-10 p-4 p-md-5 rounded shadow border border-secondary mb-5">
          <div className="row g-4 align-items-center mb-4 pb-4 border-bottom border-secondary">
            <div className="col-md-5 text-center">
              <img
                src={reseña.imagen}
                alt={reseña.titulo}
                className="img-fluid rounded shadow-lg border border-secondary"
                style={{ maxHeight: '350px', width: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <div className="col-md-7">
              <span className="badge bg-danger text-uppercase mb-2">{reseña.genero}</span>
              <h1 className="display-6 fw-bold mb-1">{reseña.titulo}</h1>
              <h3 className="text-danger fw-bold mb-3">{reseña.artista}</h3>
              
              <div className="d-flex flex-wrap gap-3 mb-3 text-secondary small">
                <div>Año: <strong>{reseña.anio}</strong></div>
                <div>Precio: <strong>${reseña.precio ? reseña.precio.toLocaleString('es-CL') : 'N/A'}</strong></div>
              </div>

              {/* CALIFICACIONES DUALES */}
              <div className="d-flex flex-wrap gap-3 mt-3">
                <div className="p-3 bg-dark rounded border border-danger flex-fill">
                  <span className="text-secondary small d-block text-uppercase fw-bold">Calificación Crítica</span>
                  <span className="fs-3 fw-bold text-warning">★ {reseña.calificacion}</span>
                </div>

                <div className="p-3 bg-dark rounded border border-info flex-fill">
                  <span className="text-secondary small d-block text-uppercase fw-bold">Calificación Comunitaria</span>
                  <span className="fs-3 fw-bold text-info">
                    ♥ {promedioComunidad} <small className="fs-6 text-muted">/ 10 ({comunidadResenasAlbum.length} votos)</small>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-dark rounded text-light mb-4 border-start border-4 border-primary">
            <h5 className="fw-bold text-uppercase text-primary mb-2">Veredicto Profesional:</h5>
            <p className="mb-0 fst-italic">{reseña.criticaCorta}</p>
          </div>

          <h4 className="fw-bold text-uppercase mb-3 mt-4 border-bottom border-secondary pb-2">Análisis Crítico Detallado</h4>
          <div className="lh-lg text-light fs-5">
            {reseña.analisisExtendido && reseña.analisisExtendido.map((parrafo, index) => (
              <p key={index} className="mb-4">{parrafo}</p>
            ))}
          </div>
        </article>

        {/* SECCIÓN RESEÑAS DE LA COMUNIDAD */}
        <section className="bg-secondary bg-opacity-10 p-4 p-md-5 rounded shadow border border-secondary">
          <h3 className="fw-bold text-uppercase mb-4">Reseñas de la Comunidad</h3>

          {/* FORMULARIO */}
          <form onSubmit={handleAgregarResena} className="bg-dark p-4 rounded border border-secondary mb-5">
            <h5 className="fw-bold text-uppercase mb-3 text-info">Añadir tu Opinión</h5>

            {usuarioSesion ? (
              <div className="alert alert-info py-2 small mb-3">
                Sesión activa: <strong>{usuarioSesion.nombre}</strong> ({usuarioSesion.correo})
              </div>
            ) : (
              <div className="alert alert-warning py-2 small mb-3">
                No has iniciado sesión. <Link to="/iniciar-sesion" className="alert-link">Inicia sesión</Link> o selecciona un cliente de la lista.
              </div>
            )}
            
            <div className="row g-3 mb-3">
              {!usuarioSesion && (
                <div className="col-md-6">
                  <label className="form-label text-secondary small">Seleccionar Cliente (localStorage):</label>
                  <select
                    className="form-select bg-dark text-light border-secondary"
                    value={nuevoUsuarioCorreo}
                    onChange={(e) => setNuevoUsuarioCorreo(e.target.value)}
                  >
                    {clientesDisponibles.map((user) => (
                      <option key={user.correo} value={user.correo}>
                        {user.nombre} ({user.correo})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={usuarioSesion ? 'col-12' : 'col-md-6'}>
                <label className="form-label text-secondary small">Puntuación (1 al 10):</label>
                <select
                  className="form-select bg-dark text-light border-secondary"
                  value={nuevaPuntuacion}
                  onChange={(e) => setNuevaPuntuacion(e.target.value)}
                >
                  {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((nota) => (
                    <option key={nota} value={nota}>{nota} / 10 Puntos</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small">Escribe tu Reseña:</label>
              <textarea
                className="form-control bg-dark text-light border-secondary"
                rows="3"
                placeholder="¿Qué opinas de este disco?..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-danger fw-bold text-uppercase">
              Publicar Reseña
            </button>
          </form>

          {/* CARRUSEL DE RESEÑAS */}
          {comunidadResenasAlbum.length > 0 ? (
            <div className="position-relative bg-dark rounded border border-secondary p-3 p-md-4 shadow">
              {comunidadResenasAlbum.map((item, index) => {
                if (index !== safeIndex) return null;

                const nombreMostrar = item.usuarioNombre || 'Cliente Ejemplo';
                const rolMostrar = item.usuarioRol || 'Cliente';

                return (
                  <div key={item.id} className="d-flex flex-column align-items-center text-center p-3 px-md-5">
                    <div
                      className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold fs-4 mb-3 border border-light"
                      style={{ width: '70px', height: '70px' }}
                    >
                      {nombreMostrar.charAt(0).toUpperCase()}
                    </div>
                    <h5 className="mb-0 text-light fw-bold">{nombreMostrar}</h5>
                    <span className="badge bg-secondary text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>
                      {rolMostrar}
                    </span>

                    <div className="badge bg-danger text-white fw-bold mb-3 fs-6 px-3 py-2">
                      ★ {item.puntuacion} / 10 Puntos
                    </div>

                    <p className="text-light fs-5 fst-italic mb-3" style={{ maxWidth: '650px' }}>
                      "{item.comentario}"
                    </p>
                    <small className="text-muted">{item.fecha}</small>
                  </div>
                );
              })}

              {/* Botones de navegación */}
              {comunidadResenasAlbum.length > 1 && (
                <>
                  <button
                    onClick={handleAnterior}
                    className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y ms-2 border-0"
                    type="button"
                    aria-label="Anterior"
                  >
                    <span className="fs-1 text-light">&lsaquo;</span>
                  </button>

                  <button
                    onClick={handleSiguiente}
                    className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0"
                    type="button"
                    aria-label="Siguiente"
                  >
                    <span className="fs-1 text-light">&rsaquo;</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <p className="text-muted text-center my-4">Sé el primero en dejar una opinión comunitaria para este disco.</p>
          )}
        </section>
      </div>
    </main>
  );
};