import React, { useState, useEffect } from 'react';
import * as usuariosService from '../services/usuariosService';
import * as ordenesService from '../services/ordenesService';
import { mensajeError } from '../api/axios';

export const AdminUsuarios = () => {
  // ESTADOS PRINCIPALES
  const [usuarios, setUsuarios] = useState([]);
  const [ordenesTodas, setOrdenesTodas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('Todos');

  // MODALES
  const [modalNuevo, setModalNuevo] = useState(false);
  const [modalEditar, setModalEditar] = useState(null);
  const [modalHistorial, setModalHistorial] = useState(null);

  // FORMULARIO NUEVO / EDITAR
  const [formData, setFormData] = useState({
    nombre: '',
    run: '',
    correo: '',
    password: '',
    rol: 'Cliente'
  });
  const [errorForm, setErrorForm] = useState('');

  // CARGAR USUARIOS Y ÓRDENES DESDE LA API
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const [listaUsuarios, listaOrdenes] = await Promise.all([usuariosService.listar(), ordenesService.listarAdmin()]);
      setUsuarios(listaUsuarios);
      setOrdenesTodas(listaOrdenes);
    } catch (error) {
      alert(mensajeError(error, 'No se pudieron cargar los usuarios.'));
    }
  };

  // MANEJO DE FORMULARIO
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // ABRIR MODAL CREAR
  const handleAbrirNuevo = () => {
    setFormData({ nombre: '', run: '', correo: '', password: '', rol: 'Cliente' });
    setErrorForm('');
    setModalNuevo(true);
  };

  // GUARDAR NUEVO USUARIO
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.password.trim()) {
      setErrorForm('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      await usuariosService.crear({ ...formData, correo: formData.correo.trim().toLowerCase() });
      await cargarUsuarios();
      setModalNuevo(false);
    } catch (error) {
      setErrorForm(mensajeError(error, 'No se pudo crear el usuario.'));
    }
  };

  // ABRIR MODAL EDITAR (la contraseña no viaja desde el servidor: vacío = no cambiarla)
  const handleAbrirEditar = (user) => {
    setModalEditar(user);
    setFormData({
      nombre: user.nombre,
      run: user.run || '',
      correo: user.correo,
      password: '',
      rol: user.rol
    });
    setErrorForm('');
  };

  // GUARDAR CAMBIOS DE EDICIÓN
  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.correo.trim()) {
      setErrorForm('El nombre y el correo no pueden estar vacíos.');
      return;
    }

    try {
      await usuariosService.actualizar(modalEditar.id, {
        nombre: formData.nombre.trim(),
        run: formData.run.trim(),
        correo: formData.correo.trim().toLowerCase(),
        password: formData.password.trim(),
        rol: formData.rol,
      });
      await cargarUsuarios();
      setModalEditar(null);
    } catch (error) {
      setErrorForm(mensajeError(error, 'No se pudo actualizar el usuario.'));
    }
  };

  // ELIMINAR USUARIO
  const handleEliminarUsuario = async (correoEliminar) => {
    if (correoEliminar.toLowerCase() === 'admin@duoc.cl') {
      alert('No se puede eliminar la cuenta del Administrador Principal.');
      return;
    }

    const objetivo = usuarios.find((u) => u.correo.toLowerCase() === correoEliminar.toLowerCase());
    if (objetivo && window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${correoEliminar}?`)) {
      try {
        await usuariosService.eliminar(objetivo.id);
        await cargarUsuarios();
      } catch (error) {
        alert(mensajeError(error, 'No se pudo eliminar el usuario.'));
      }
    }
  };

  // FILTRADO DE USUARIOS
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
      (u.run && u.run.toLowerCase().includes(busqueda.toLowerCase()));

    const coincideRol = filtroRol === 'Todos' || u.rol === filtroRol;

    return coincideBusqueda && coincideRol;
  });

  // HISTORIAL DE COMPRAS DEL CLIENTE (órdenes cargadas desde la API)
  const obtenerHistorialCliente = (correoCliente) => {
    const todasLasOrdenes = ordenesTodas;
    return todasLasOrdenes.filter(
      (orden) => orden.correo && orden.correo.toLowerCase() === correoCliente.toLowerCase()
    );
  };

  return (
    <div className="animate__animated animate__fadeIn">
      {/* CABECERA */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom border-secondary gap-3">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Gestión de Usuarios</h2>
          <p className="text-secondary mb-0">Administración de cuentas, asignación de roles e historial de clientes.</p>
        </div>

        <button
          onClick={handleAbrirNuevo}
          className="btn btn-danger fw-bold text-uppercase d-flex align-items-center gap-2 py-2 px-3 shadow"
        >
          <i className="bi bi-person-plus-fill fs-5"></i>
          <span>Nuevo Usuario</span>
        </button>
      </div>

      {/* BÚSQUEDA Y FILTROS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-black text-secondary border-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Buscar por nombre, correo o RUN..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-4">
          <select
            className="form-select bg-dark text-light border-secondary"
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
          >
            <option value="Todos">Filtrar por Rol: Todos</option>
            <option value="Administrador">Solo Administradores</option>
            <option value="Cliente">Solo Clientes</option>
          </select>
        </div>
      </div>

      {/* TABLA DE USUARIOS */}
      <div className="bg-secondary bg-opacity-10 rounded-3 border border-secondary p-3 shadow-lg overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr className="text-secondary border-bottom border-secondary">
                <th>Usuario / Nombre</th>
                <th>RUN / RUT</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((u, i) => (
                  <tr key={i}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold"
                          style={{ width: '38px', height: '38px', minWidth: '38px' }}
                        >
                          {u.nombre ? u.nombre.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <span className="fw-bold d-block text-light">{u.nombre}</span>
                          <small className="text-muted fs-7">ID: USR-{i + 101}</small>
                        </div>
                      </div>
                    </td>

                    <td className="text-light">{u.run || 'N/A'}</td>
                    <td className="text-info">{u.correo}</td>

                    <td>
                      <span
                        className={`badge ${
                          u.rol === 'Administrador' ? 'bg-danger text-white' : 'bg-info text-dark'
                        } text-uppercase px-2 py-1 fw-bold`}
                      >
                        {u.rol}
                      </span>
                    </td>

                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-2">
                        {/* EDITAR USUARIO */}
                        <button
                          onClick={() => handleAbrirEditar(u)}
                          className="btn btn-sm btn-outline-warning fw-bold d-flex align-items-center gap-1"
                          title="Editar usuario"
                        >
                          <i className="bi bi-pencil-square"></i>
                          <span className="d-none d-lg-inline">Editar</span>
                        </button>

                        {/* HISTORIAL DE COMPRAS (SÓLO PARA CLIENTES) */}
                        {u.rol === 'Cliente' && (
                          <button
                            onClick={() => setModalHistorial(u)}
                            className="btn btn-sm btn-outline-info fw-bold d-flex align-items-center gap-1"
                            title="Ver historial de compras"
                          >
                            <i className="bi bi-clock-history"></i>
                            <span className="d-none d-lg-inline">Historial</span>
                          </button>
                        )}

                        {/* ELIMINAR USUARIO */}
                        <button
                          onClick={() => handleEliminarUsuario(u.correo)}
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar usuario"
                          disabled={u.correo.toLowerCase() === 'admin@duoc.cl'}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No hay usuarios registrados que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NUEVO USUARIO */}
      {modalNuevo && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border border-secondary shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold text-uppercase text-danger">
                  <i className="bi bi-person-plus-fill me-2"></i>Crear Nuevo Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalNuevo(false)}
                ></button>
              </div>

              <form onSubmit={handleCrearUsuario}>
                <div className="modal-body p-4">
                  {errorForm && <div className="alert alert-danger py-2 mb-3 small">{errorForm}</div>}

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Ej: Cliente ejemplo"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">RUN / RUT</label>
                    <input
                      type="text"
                      id="run"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Ej: 12345678-9"
                      value={formData.run}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Correo Electrónico *</label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="usuario@gmail.com"
                      value={formData.correo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Contraseña *</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Rol de Acceso *</label>
                    <select
                      id="rol"
                      className="form-select bg-dark text-light border-secondary fw-bold"
                      value={formData.rol}
                      onChange={handleInputChange}
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Administrador">Administrador</option>
                    </select>
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
                    Guardar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR USUARIO */}
      {modalEditar && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border border-secondary shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold text-uppercase text-warning">
                  <i className="bi bi-pencil-square me-2"></i>Editar Usuario
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalEditar(null)}
                ></button>
              </div>

              <form onSubmit={handleGuardarEdicion}>
                <div className="modal-body p-4">
                  {errorForm && <div className="alert alert-danger py-2 mb-3 small">{errorForm}</div>}

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Nombre Completo</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">RUN / RUT</label>
                    <input
                      type="text"
                      id="run"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.run}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Correo Electrónico</label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control bg-dark text-light border-secondary"
                      value={formData.correo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Contraseña (dejar en blanco si no cambia)</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Nueva contraseña..."
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-secondary small">Rol de Acceso</label>
                    <select
                      id="rol"
                      className="form-select bg-dark text-light border-secondary fw-bold"
                      value={formData.rol}
                      onChange={handleInputChange}
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                </div>

                <div className="modal-footer border-top border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setModalEditar(null)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning text-dark fw-bold text-uppercase">
                    Actualizar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL DE COMPRAS (CONECTADO A LOCALSTORAGE) */}
      {modalHistorial && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-light border border-secondary shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold text-uppercase text-info">
                  <i className="bi bi-clock-history me-2"></i>Historial de Compras de Cliente
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalHistorial(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="bg-secondary bg-opacity-10 p-3 rounded mb-4 border border-secondary d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="fw-bold mb-0 text-light">{modalHistorial.nombre}</h6>
                    <small className="text-info">{modalHistorial.correo}</small>
                  </div>
                  <span className="badge bg-info text-dark text-uppercase">{modalHistorial.rol}</span>
                </div>

                <h6 className="fw-bold text-uppercase mb-3 text-secondary">Órdenes Registradas</h6>

                {obtenerHistorialCliente(modalHistorial.correo).length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-dark table-striped align-middle mb-0">
                      <thead>
                        <tr className="text-secondary small">
                          <th>Boleta #</th>
                          <th>Fecha</th>
                          <th>Productos</th>
                          <th>Total</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {obtenerHistorialCliente(modalHistorial.correo).map((compra) => (
                          <tr key={compra.id}>
                            <td className="fw-bold text-info">{compra.id}</td>
                            <td className="small">{compra.fecha}</td>
                            <td className="small">
                              {compra.productos
                                ? compra.productos.map((p) => `${p.cantidad}x ${p.nombre}`).join(', ')
                                : compra.items || 'Sin detalle'}
                            </td>
                            <td className="fw-bold text-success">${compra.total.toLocaleString('es-CL')}</td>
                            <td>
                              <span className="badge bg-success">{compra.estado}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted text-center py-4 my-0">
                    Este cliente aún no registra órdenes de compra en la plataforma.
                  </p>
                )}
              </div>

              <div className="modal-footer border-top border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={() => setModalHistorial(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};