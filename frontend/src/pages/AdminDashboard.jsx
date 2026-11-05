import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminNavbar } from '../components/AdminNavbar';
import { AdminUsuarios } from './AdminUsuarios';
import { AdminOrdenes } from './AdminOrdenes';
import { AdminBlogs } from './AdminBlogs';
import { AdminProductos } from './AdminProductos';
import { AdminCategorias } from './AdminCategorias';
import * as usuariosService from '../services/usuariosService';
import * as ordenesService from '../services/ordenesService';
import { cerrarSesion } from '../services/authService';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [usuarioSesion, setUsuarioSesion] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  // ESTADO DE NAVEGACIÓN
  const [tabActiva, setTabActiva] = useState('dashboard');

  // ESTADOS DE MÉTRICAS (DESDE LA API)
  const [metricasUsuarios, setMetricasUsuarios] = useState({
    total: 0,
    clientes: 0,
    admins: 0
  });
  const [totalVentas, setTotalVentas] = useState(0);

  // VERIFICACIÓN DE PERMISOS
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuarioSesion');

    if (!sesionGuardada) {
      navigate('/iniciar-sesion', { replace: true });
      return;
    }

    try {
      const sesion = JSON.parse(sesionGuardada);
      if (sesion && sesion.rol === 'Administrador') {
        setUsuarioSesion(sesion);
        setCargando(false);
      } else {
        navigate('/iniciar-sesion', { replace: true });
      }
    } catch (error) {
      cerrarSesion();
      navigate('/iniciar-sesion', { replace: true });
    }
  }, [navigate]);

  // ACTUALIZAR MÉTRICAS GENERALES DESDE LA API
  const actualizarMetricas = async () => {
    try {
      const [usuarios, ordenes] = await Promise.all([usuariosService.listar(), ordenesService.listarAdmin()]);

      setMetricasUsuarios({
        total: usuarios.length,
        clientes: usuarios.filter((u) => u.rol === 'Cliente').length,
        admins: usuarios.filter((u) => u.rol === 'Administrador').length,
      });
      setTotalVentas(ordenes.reduce((acc, curr) => acc + (curr.total || 0), 0));
    } catch {
      // Si el token venció, volver a iniciar sesión
      if (!localStorage.getItem('token')) navigate('/iniciar-sesion', { replace: true });
    }
  };

  useEffect(() => {
    if (!cargando) {
      actualizarMetricas();
    }
  }, [cargando, tabActiva]);

  if (cargando) {
    return (
      <div className="bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border text-danger mb-3" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <p className="text-secondary fw-bold text-uppercase fs-6">Verificando permisos de administrador...</p>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      {/* NAVBAR DE ADMINISTRADOR */}
      <AdminNavbar usuarioSesion={usuarioSesion} />

      <div className="d-flex flex-grow-1">
        {/* MENÚ LATERAL INTERACTIVO */}
        <aside
          className="bg-black bg-opacity-50 border-end border-secondary p-3 d-none d-md-flex flex-column justify-content-between"
          style={{ width: '250px' }}
        >
          <nav className="nav nav-pills flex-column gap-2">
            <button
              onClick={() => setTabActiva('dashboard')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'dashboard' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-speedometer2"></i> Dashboard
            </button>

            <button
              onClick={() => setTabActiva('ordenes')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'ordenes' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-receipt"></i> Órdenes
            </button>

            <button
              onClick={() => setTabActiva('productos')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'productos' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-disc"></i> Productos
            </button>

            <button
              onClick={() => setTabActiva('categorias')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'categorias' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-tags"></i> Categorías
            </button>

            <button
              onClick={() => setTabActiva('usuarios')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'usuarios' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-people"></i> Usuarios
            </button>

            <button
              onClick={() => setTabActiva('blogs')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'blogs' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-journal-text"></i> Blogs
            </button>

            <button
              onClick={() => setTabActiva('reportes')}
              className={`nav-link text-start d-flex align-items-center gap-2 py-2 px-3 fw-semibold rounded ${
                tabActiva === 'reportes' ? 'bg-danger text-white' : 'text-light opacity-75'
              }`}
            >
              <i className="bi bi-bar-chart-line"></i> Reportes
            </button>
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
          
          {/* VISTA 1: DASHBOARD PRINCIPAL */}
          {tabActiva === 'dashboard' && (
            <div className="animate__animated animate__fadeIn">
              <header className="mb-4 pb-3 border-bottom border-secondary">
                <h2 className="display-6 fw-bold text-uppercase mb-1">Dashboard</h2>
                <p className="text-secondary mb-0">Resumen general de las operaciones de MusicMania.</p>
              </header>

              {/* TARJETAS KPIS / RESÚMENES GENERALES */}
              <section className="row g-4 mb-5">
                <div className="col-12 col-md-4">
                  <div className="bg-primary bg-opacity-20 border border-primary p-4 rounded-3 shadow d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-uppercase fs-7 fw-bold text-white">Compras Totales</span>
                      <h3 className="display-6 fw-bold my-1">
                        ${totalVentas > 0 ? totalVentas.toLocaleString('es-CL') : '1,234,990'}
                      </h3>
                      <small className="text-light opacity-75">Hasta el día de hoy</small>
                    </div>
                    <i className="bi bi-cart-check fs-1 text-primary"></i>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="bg-success bg-opacity-20 border border-success p-4 rounded-3 shadow d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-uppercase fs-7 fw-bold text-white">Productos Totales</span>
                      <h3 className="display-6 fw-bold my-1">400</h3>
                      <small className="text-light opacity-75">Inventario del mes: <strong>700</strong></small>
                    </div>
                    <i className="bi bi-box-seam fs-1 text-success"></i>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="bg-warning bg-opacity-20 border border-warning p-4 rounded-3 shadow d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-uppercase fs-7 fw-bold text-white">Usuarios Registrados</span>
                      <h3 className="display-6 fw-bold my-1">{metricasUsuarios.total}</h3>
                      <small className="text-light opacity-75">
                        <strong>{metricasUsuarios.clientes}</strong> Clientes | <strong>{metricasUsuarios.admins}</strong> Admins
                      </small>
                    </div>
                    <i className="bi bi-people fs-1 text-warning"></i>
                  </div>
                </div>
              </section>

              {/* ACCESOS RÁPIDOS A MÓDULOS */}
              <section>
                <h4 className="fw-bold text-uppercase mb-4 text-light">Módulos del Sistema</h4>
                <div className="row g-4">
                  {[
                    { id: 'dashboard', title: 'Dashboard', desc: 'Visión general de métricas.', icon: 'bi-speedometer2', color: 'text-danger' },
                    { id: 'ordenes', title: 'Órdenes', desc: 'Gestión y seguimiento de órdenes.', icon: 'bi-receipt', color: 'text-info' },
                    { id: 'productos', title: 'Productos', desc: 'Administrar inventario y catálogo.', icon: 'bi-disc', color: 'text-success' },
                    { id: 'categorias', title: 'Categorías', desc: 'Organizar productos por géneros.', icon: 'bi-tags', color: 'text-warning' },
                    { id: 'usuarios', title: 'Usuarios', desc: `Gestión de ${metricasUsuarios.total} cuentas activas.`, icon: 'bi-people', color: 'text-primary' },
                    { id: 'blogs', title: 'Blogs', desc: 'Administración de artículos y noticias.', icon: 'bi-journal-text', color: 'text-info' },
                    { id: 'reportes', title: 'Reportes', desc: 'Generación de informes detallados.', icon: 'bi-bar-chart-line', color: 'text-danger' }
                  ].map((mod) => (
                    <div key={mod.id} className="col-12 col-md-6 col-lg-4">
                      <div
                        onClick={() => setTabActiva(mod.id)}
                        className="bg-secondary bg-opacity-10 p-4 rounded-3 border border-secondary shadow-sm text-center h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer hover-border-light"
                        style={{ cursor: 'pointer' }}
                      >
                        <i className={`bi ${mod.icon} fs-1 ${mod.color} mb-3`}></i>
                        <h5 className="fw-bold mb-2">{mod.title}</h5>
                        <p className="text-secondary small mb-0">{mod.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* VISTAS DE COMPONENTES */}
          {tabActiva === 'usuarios' && <AdminUsuarios />}
          {tabActiva === 'ordenes' && <AdminOrdenes />}
          {tabActiva === 'blogs' && <AdminBlogs />}
          {tabActiva === 'productos' && <AdminProductos />}
          {tabActiva === 'categorias' && <AdminCategorias />}

          {/* MENSAJE TEMPORAL SOLO PARA MÓDULOS PENDIENTES */}
          {tabActiva === 'reportes' && (
            <div className="text-center py-5 bg-secondary bg-opacity-10 rounded border border-secondary">
              <i className="bi bi-bar-chart-line fs-1 text-warning mb-3 d-block"></i>
              <h4 className="fw-bold text-uppercase">Módulo de Reportes</h4>
              <p className="text-secondary">Sección lista para ser conectada.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};