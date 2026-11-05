import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../services/authService';

export const AdminNavbar = ({ usuarioSesion }) => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/iniciar-sesion', { replace: true });
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary px-3 px-md-4 py-2 sticky-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
        {/* BRANDING Y BADGE ADMIN */}
        <div className="d-flex align-items-center gap-2">
          <Link to="/admin" className="navbar-brand d-flex align-items-center gap-2 m-0">
            <span className="fs-3 text-danger fw-bold">▶</span>
            <span className="fs-4 fw-bold text-uppercase tracking-wider text-light">
              Music<span className="text-danger">Mania</span>
            </span>
          </Link>
          <span className="badge bg-danger text-uppercase ms-2 px-2 py-1 fs-7">
            Panel Admin
          </span>
        </div>

        {/* CONTROLES DERECHOS */}
        <div className="d-flex align-items-center gap-3">
          
          {/* BOTÓN CLAVE: VOLVER A VISTA DE USUARIO / TIENDA */}
          <Link
            to="/"
            className="btn btn-warning fw-bold text-dark d-flex align-items-center gap-2 shadow-sm py-1.5 px-3"
            title="Ver la tienda como cliente"
          >
            <i className="bi bi-eye-fill fs-5"></i>
            <span className="d-none d-md-inline">Volver a Vista Usuario</span>
          </Link>

          {/* PERFIL RESUMIDO DEL ADMIN */}
          {usuarioSesion && (
            <div className="d-none d-lg-flex align-items-center gap-2 text-end border-start border-secondary ps-3 ms-1">
              <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '35px', height: '35px' }}>
                {usuarioSesion.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="lh-1">
                <span className="d-block text-light fw-bold small">{usuarioSesion.nombre}</span>
                <small className="text-secondary" style={{ fontSize: '0.75rem' }}>{usuarioSesion.correo}</small>
              </div>
            </div>
          )}

          {/* BOTÓN CERRAR SESIÓN */}
          <button
            onClick={handleCerrarSesion}
            className="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center gap-1 ms-2"
            title="Cerrar Sesión"
          >
            <i className="bi bi-box-arrow-right fs-6"></i>
            <span className="d-none d-sm-inline">Salir</span>
          </button>

        </div>
      </div>
    </header>
  );
};