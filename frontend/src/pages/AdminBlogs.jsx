import React, { useState, useEffect } from 'react';
import { blogData as initialBlogData } from './Blog';

export const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  // MODAL CREAR BLOG
  const [modalNuevo, setModalNuevo] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    autor: 'Redacción MusicMania',
    summary: '',
    image: '/img/cancion_corta.jpg',
    contenidoExtendido: ''
  });
  const [errorForm, setErrorForm] = useState('');

  useEffect(() => {
    cargarBlogs();
  }, []);

  const cargarBlogs = () => {
    const blogsGuardados = JSON.parse(localStorage.getItem('blogsApp'));
    if (!blogsGuardados || blogsGuardados.length === 0) {
      const datosIniciales = initialBlogData.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle || '',
        fecha: b.fecha,
        autor: b.autor || 'Redacción MusicMania',
        summary: typeof b.summary === 'string' ? b.summary : b.title,
        image: b.image || '/img/cancion_corta.jpg',
        contenidoExtendido: Array.isArray(b.contenidoExtendido)
          ? b.contenidoExtendido.join('\n\n')
          : b.contenidoExtendido || ''
      }));
      localStorage.setItem('blogsApp', JSON.stringify(datosIniciales));
      setBlogs(datosIniciales);
    } else {
      setBlogs(blogsGuardados);
    }
  };

  const guardarEnLocalStorage = (nuevaLista) => {
    setBlogs(nuevaLista);
    localStorage.setItem('blogsApp', JSON.stringify(nuevaLista));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAbrirNuevo = () => {
    setFormData({
      title: '',
      subtitle: '',
      autor: 'Redacción MusicMania',
      summary: '',
      image: '/img/cancion_corta.jpg',
      contenidoExtendido: ''
    });
    setErrorForm('');
    setModalNuevo(true);
  };

  const handleCrearBlog = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim() || !formData.contenidoExtendido.trim()) {
      setErrorForm('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    const opcionesFecha = { year: 'numeric', month: 'long', day: '2-digit' };
    const fechaActual = new Date().toLocaleDateString('es-CL', opcionesFecha);

    const nuevoBlogObj = {
      id: `blog-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      fecha: fechaActual,
      autor: formData.autor.trim() || 'Redacción MusicMania',
      summary: formData.summary.trim(),
      image: formData.image.trim() || '/img/cancion_corta.jpg',
      contenidoExtendido: formData.contenidoExtendido.trim()
    };

    const listaActualizada = [nuevoBlogObj, ...blogs];
    guardarEnLocalStorage(listaActualizada);
    setModalNuevo(false);
  };

  const handleEliminarBlog = (idBlog) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación del blog?')) {
      const listaActualizada = blogs.filter((b) => b.id !== idBlog);
      guardarEnLocalStorage(listaActualizada);
    }
  };

  const blogsFiltrados = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      b.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="animate__animated animate__fadeIn">
      {/* CABECERA SECCIÓN */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom border-secondary gap-3">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Gestión de Blog</h2>
          <p className="text-secondary mb-0">Creación, edición y administración de artículos de curiosidades musicales.</p>
        </div>

        <button
          onClick={handleAbrirNuevo}
          className="btn btn-danger fw-bold text-uppercase d-flex align-items-center gap-2 py-2 px-3 shadow"
        >
          <i className="bi bi-journal-plus fs-5"></i>
          <span>Nuevo Artículo</span>
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="input-group">
            <span className="input-group-text bg-black text-secondary border-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Buscar artículo por título o autor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* TABLA DE ARTÍCULOS */}
      <div className="bg-secondary bg-opacity-10 rounded-3 border border-secondary p-3 shadow-lg overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr className="text-secondary border-bottom border-secondary">
                <th>Portada</th>
                <th>Título / Subtítulo</th>
                <th>Autor</th>
                <th>Fecha</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {blogsFiltrados.length > 0 ? (
                blogsFiltrados.map((b) => (
                  <tr key={b.id}>
                    <td style={{ width: '70px' }}>
                      <img
                        src={b.image}
                        alt={b.title}
                        className="rounded border border-secondary"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <span className="fw-bold d-block text-light">{b.title}</span>
                      <small className="text-muted text-truncate d-block" style={{ maxWidth: '300px' }}>
                        {b.subtitle || b.summary}
                      </small>
                    </td>
                    <td className="text-info small">{b.autor}</td>
                    <td className="small text-secondary">{b.fecha}</td>
                    <td className="text-end">
                      <button
                        onClick={() => handleEliminarBlog(b.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar artículo"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No se encontraron artículos de blog registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CREAR NUEVO ARTÍCULO */}
      {modalNuevo && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-light border border-secondary shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold text-uppercase text-danger">
                  <i className="bi bi-journal-plus me-2"></i>Crear Nuevo Artículo de Blog
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalNuevo(false)}
                ></button>
              </div>

              <form onSubmit={handleCrearBlog}>
                <div className="modal-body p-4">
                  {errorForm && <div className="alert alert-danger py-2 mb-3 small">{errorForm}</div>}

                  <div className="mb-3">
                    <label htmlFor="title" className="form-label text-secondary small">Título del Artículo *</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Ej: El álbum grabado bajo el agua..."
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="subtitle" className="form-label text-secondary small">Subtítulo</label>
                      <input
                        type="text"
                        id="subtitle"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Ej: Un experimento sonoro de 1975"
                        value={formData.subtitle}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="autor" className="form-label text-secondary small">Autor</label>
                      <input
                        type="text"
                        id="autor"
                        className="form-control bg-dark text-light border-secondary"
                        value={formData.autor}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label text-secondary small">Ruta de Imagen (URL o pública)</label>
                    <input
                      type="text"
                      id="image"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="/img/cancion_corta.jpg"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="summary" className="form-label text-secondary small">Resumen Corto *</label>
                    <textarea
                      id="summary"
                      className="form-control bg-dark text-light border-secondary"
                      rows="2"
                      placeholder="Breve resumen que aparecerá en la tarjeta principal..."
                      value={formData.summary}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contenidoExtendido" className="form-label text-secondary small">Contenido Extendido del Artículo *</label>
                    <textarea
                      id="contenidoExtendido"
                      className="form-control bg-dark text-light border-secondary"
                      rows="5"
                      placeholder="Escribe aquí los párrafos completos de la noticia..."
                      value={formData.contenidoExtendido}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-top border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setModalNuevo(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-danger fw-bold text-uppercase">
                    Publicar Artículo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};