import React, { useState } from 'react';

const categoriasIniciales = [
  { id: 'cat-1', nombre: 'Vinilos y Álbumes', descripcion: 'Ediciones oficiales en formato vinilo y CD.', cantidad: 12 },
  { id: 'cat-2', nombre: 'Equipos de Audio', descripcion: 'Amplificadores, tornamesas, parlantes y consolas.', cantidad: 6 },
  { id: 'cat-3', nombre: 'Accesorios', descripcion: 'Limpiadores de vinilos, agujas y cables profesionales.', cantidad: 4 },
];

export const AdminCategorias = () => {
  const [categorias, setCategorias] = useState(() => {
    const guardadas = localStorage.getItem('adminCategorias');
    return guardadas ? JSON.parse(guardadas) : categoriasIniciales;
  });

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Agregar nueva categoría
  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    const nuevaCat = {
      id: `cat-${Date.now()}`,
      nombre,
      descripcion: descripcion || 'Categoría del catálogo oficial de MusicMania.',
      cantidad: 0
    };

    const listaActualizada = [...categorias, nuevaCat];
    setCategorias(listaActualizada);
    localStorage.setItem('adminCategorias', JSON.stringify(listaActualizada));
    setNombre('');
    setDescripcion('');
  };

  // Eliminar categoría
  const handleEliminar = (id) => {
    const listaFiltrada = categorias.filter((c) => c.id !== id);
    setCategorias(listaFiltrada);
    localStorage.setItem('adminCategorias', JSON.stringify(listaFiltrada));
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Módulo de Categorías</h2>
          <p className="text-secondary mb-0">Organización y clasificación de artículos del catálogo.</p>
        </div>
        <span className="badge bg-danger fs-6 px-3 py-2">{categorias.length} Categorías</span>
      </div>

      <div className="row g-4">
        {/* Formulario de Creación */}
        <div className="col-lg-4">
          <form onSubmit={handleAgregar} className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary shadow">
            <h5 className="fw-bold text-uppercase text-danger mb-3">
              <i className="bi bi-tag me-2"></i>Nueva Categoría
            </h5>
            
            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Nombre</label>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Instrumentos Musicales"
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small fw-bold">Descripción</label>
              <textarea 
                className="form-control bg-dark text-light border-secondary"
                rows="3"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Breve descripción de los artículos de esta categoría..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-bold text-uppercase py-2">
              Crear Categoría
            </button>
          </form>
        </div>

        {/* Listado de Tarjetas de Categorías */}
        <div className="col-lg-8">
          <div className="row g-3">
            {categorias.map((cat) => (
              <div key={cat.id} className="col-md-6">
                <div className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary h-100 d-flex flex-column justify-content-between shadow-sm">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold text-light mb-0">{cat.nombre}</h5>
                      <span className="badge bg-secondary">{cat.cantidad} ítems</span>
                    </div>
                    <p className="text-secondary small mb-3">{cat.descripcion}</p>
                  </div>
                  <div className="text-end border-top border-secondary pt-2">
                    <button onClick={() => handleEliminar(cat.id)} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash me-1"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};