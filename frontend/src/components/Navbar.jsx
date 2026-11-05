import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../services/authService';

export const Navbar = ({ totalItemsCarrito = 0 }) => {
  const navigate = useNavigate();

  // 1. OBTENER SESIÓN DESDE LOCALSTORAGE
  const sesionGuardada = localStorage.getItem('usuarioSesion');
  const usuarioSesion = sesionGuardada ? JSON.parse(sesionGuardada) : null;
  const esAdmin = usuarioSesion && usuarioSesion.rol === 'Administrador';

  // 2. FUNCIÓN PARA CERRAR SESIÓN
  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/iniciar-sesion');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-danger fs-3" to="/">
            MusicMania
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/catalogo">
                  Catálogo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/equipos">
                  Equipos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/categorias">
                  Categorías
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/ofertas">
                  Ofertas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/resenas">
                  Reseñas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/sobre-nosotros">
                  Sobre Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contacto">
                  Contacto
                </NavLink>
              </li>
            </ul>

            <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 ms-lg-auto">
              
              {/* BOTÓN PARA REGRESAR AL DASHBOARD (SOLO SE MUESTRA SI ES ADMIN) */}
              {esAdmin && (
                <Link
                  to="/admin"
                  className="btn btn-danger btn-sm fw-bold text-uppercase d-flex align-items-center justify-content-center gap-1 shadow"
                  title="Volver al Panel de Administración"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span>Panel Admin</span>
                </Link>
              )}

              {/* CONTROL DE SESIÓN DEL USUARIO */}
              {usuarioSesion ? (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-danger btn-sm dropdown-toggle fw-bold"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {usuarioSesion.nombre ? usuarioSesion.nombre.split(' ')[0] : 'Cuenta'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                    <li>
                      <span className="dropdown-item-text text-secondary small">
                        Rol: <strong className="text-light">{usuarioSesion.rol}</strong>
                      </span>
                    </li>
                    {esAdmin && (
                      <li>
                        <Link className="dropdown-item text-danger fw-bold" to="/admin">
                          <i className="bi bi-gear me-1"></i> Ir al Admin
                        </Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider border-secondary" /></li>
                    <li>
                      <button className="dropdown-item text-light" onClick={handleCerrarSesion}>
                        <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link className="nav-link text-light" to="/iniciar-sesion">
                    Iniciar sesión
                  </Link>
                  <Link className="nav-link text-light" to="/registro">
                    Registrarse
                  </Link>
                </>
              )}

              {/* CARRITO DE COMPRAS */}
              <Link className="btn btn-outline-light btn-sm fw-bold" to="/carrito" id="btn-carrito">
                Carrito ({totalItemsCarrito})
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};