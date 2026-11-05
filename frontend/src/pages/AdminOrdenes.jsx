import React, { useState, useEffect } from 'react';
import * as ordenesService from '../services/ordenesService';
import { mensajeError } from '../api/axios';

export const AdminOrdenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const [modalDetalle, setModalDetalle] = useState(null);
  const [modalEstado, setModalEstado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const cargarOrdenes = async () => {
    try {
      setOrdenes(await ordenesService.listarAdmin());
    } catch (error) {
      alert(mensajeError(error, 'No se pudieron cargar las órdenes.'));
    }
  };

  const handleAbrirCambioEstado = (orden) => {
    setModalEstado(orden);
    setNuevoEstado(orden.estado);
  };

  const handleGuardarNuevoEstado = async (e) => {
    e.preventDefault();
    if (!modalEstado || !nuevoEstado) return;

    try {
      await ordenesService.cambiarEstado(modalEstado.id, nuevoEstado);
      await cargarOrdenes();
      setModalEstado(null);
    } catch (error) {
      alert(mensajeError(error, 'No se pudo actualizar el estado.'));
    }
  };

  const handleEliminarOrden = async (idOrden) => {
    if (window.confirm(`¿Estás seguro de cancelar/eliminar la orden ${idOrden}?`)) {
      try {
        await ordenesService.eliminar(idOrden);
        await cargarOrdenes();
      } catch (error) {
        alert(mensajeError(error, 'No se pudo eliminar la orden.'));
      }
    }
  };

  const ordenesFiltradas = ordenes.filter((o) => {
    const coincideBusqueda =
      o.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.correo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === 'Todos' || o.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const getBadgeEstado = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return <span className="badge bg-warning text-dark text-uppercase px-2 py-1 fw-bold">Pendiente</span>;
      case 'En preparación':
        return <span className="badge bg-info text-dark text-uppercase px-2 py-1 fw-bold">En Preparación</span>;
      case 'Enviado':
        return <span className="badge bg-primary text-white text-uppercase px-2 py-1 fw-bold">Enviado</span>;
      case 'Entregado':
        return <span className="badge bg-success text-white text-uppercase px-2 py-1 fw-bold">Entregado</span>;
      case 'Cancelado':
        return <span className="badge bg-danger text-white text-uppercase px-2 py-1 fw-bold">Cancelado</span>;
      default:
        return <span className="badge bg-secondary text-uppercase">{estado}</span>;
    }
  };

  const totalVentas = ordenes.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const cantPendientes = ordenes.filter((o) => o.estado === 'Pendiente').length;
  const cantEnviados = ordenes.filter((o) => o.estado === 'Enviado' || o.estado === 'En preparación').length;
  const cantEntregados = ordenes.filter((o) => o.estado === 'Entregado').length;

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom border-secondary gap-3">
        <div>
          <h2 className="display-6 fw-bold text-uppercase mb-1">Gestión de Órdenes</h2>
          <p className="text-secondary mb-0">Seguimiento de ventas y actualización de estados vinculados a los clientes.</p>
        </div>
      </div>

      {/* KPIS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-secondary bg-opacity-10 border border-secondary p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <small className="text-secondary text-uppercase fw-bold fs-7">Ventas Totales</small>
              <h4 className="fw-bold text-success mb-0">${totalVentas.toLocaleString('es-CL')}</h4>
            </div>
            <i className="bi bi-currency-dollar fs-2 text-success"></i>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-secondary bg-opacity-10 border border-secondary p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <small className="text-secondary text-uppercase fw-bold fs-7">Órdenes Pendientes</small>
              <h4 className="fw-bold text-warning mb-0">{cantPendientes}</h4>
            </div>
            <i className="bi bi-clock-history fs-2 text-warning"></i>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-secondary bg-opacity-10 border border-secondary p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <small className="text-secondary text-uppercase fw-bold fs-7">En Camino / Prep.</small>
              <h4 className="fw-bold text-info mb-0">{cantEnviados}</h4>
            </div>
            <i className="bi bi-truck fs-2 text-info"></i>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="bg-secondary bg-opacity-10 border border-secondary p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-between">
            <div>
              <small className="text-secondary text-uppercase fw-bold fs-7">Entregadas</small>
              <h4 className="fw-bold text-light mb-0">{cantEntregados}</h4>
            </div>
            <i className="bi bi-check-circle fs-2 text-success"></i>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-black text-secondary border-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Buscar por # Boleta, cliente o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-4">
          <select
            className="form-select bg-dark text-light border-secondary"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Filtrar por Estado: Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En preparación">En preparación</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-secondary bg-opacity-10 rounded-3 border border-secondary p-3 shadow-lg overflow-hidden">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr className="text-secondary border-bottom border-secondary">
                <th>Boleta / Fecha</th>
                <th>Cliente Registrado</th>
                <th>Total</th>
                <th>Método de Pago</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.length > 0 ? (
                ordenesFiltradas.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <span className="fw-bold text-info d-block">{o.id}</span>
                      <small className="text-muted fs-7">{o.fecha}</small>
                    </td>
                    <td>
                      <span className="fw-bold d-block text-light">{o.cliente}</span>
                      <small className="text-info d-block text-truncate" style={{ maxWidth: '180px' }}>
                        {o.correo}
                      </small>
                    </td>
                    <td className="fw-bold text-success fs-6">${o.total.toLocaleString('es-CL')}</td>
                    <td className="small text-light">{o.metodoPago || 'Webpay'}</td>
                    <td>{getBadgeEstado(o.estado)}</td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-2">
                        <button
                          onClick={() => setModalDetalle(o)}
                          className="btn btn-sm btn-outline-info fw-bold"
                          title="Ver detalle"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          onClick={() => handleAbrirCambioEstado(o)}
                          className="btn btn-sm btn-outline-warning fw-bold"
                          title="Cambiar estado"
                        >
                          <i className="bi bi-arrow-repeat"></i>
                        </button>
                        <button
                          onClick={() => handleEliminarOrden(o.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar orden"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No hay órdenes registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLE */}
      {modalDetalle && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-light border border-secondary shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold text-uppercase text-info">
                  <i className="bi bi-receipt me-2"></i>Detalle Orden {modalDetalle.id}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModalDetalle(null)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="bg-secondary bg-opacity-10 p-3 rounded border border-secondary h-100">
                      <small className="text-secondary text-uppercase fw-bold d-block mb-2">Cliente Registrado</small>
                      <p className="mb-1 fw-bold text-light">{modalDetalle.cliente}</p>
                      <p className="mb-1 small text-info">{modalDetalle.correo}</p>
                      <p className="mb-0 small text-muted">RUT: {modalDetalle.rut || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="bg-secondary bg-opacity-10 p-3 rounded border border-secondary h-100">
                      <small className="text-secondary text-uppercase fw-bold d-block mb-2">Despacho</small>
                      <p className="mb-1 small text-light">{modalDetalle.direccion}</p>
                      <p className="mb-0 small text-light">Pago: {modalDetalle.metodoPago}</p>
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold text-uppercase text-secondary mb-3">Productos</h6>
                <div className="table-responsive mb-3">
                  <table className="table table-dark table-striped align-middle mb-0">
                    <thead>
                      <tr className="text-secondary small">
                        <th>Producto</th>
                        <th className="text-center">Cant.</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalDetalle.productos?.map((prod, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold text-light">{prod.nombre}</td>
                          <td className="text-center fw-bold">{prod.cantidad}</td>
                          <td className="text-end fw-bold text-success">${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center p-3 bg-black rounded border border-secondary">
                  <span className="fw-bold text-uppercase fs-6">Total Boleta</span>
                  <span className="fs-4 fw-bold text-success">${modalDetalle.total.toLocaleString('es-CL')}</span>
                </div>
              </div>
              <div className="modal-footer border-top border-secondary">
                <button type="button" className="btn btn-outline-light" onClick={() => setModalDetalle(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CAMBIO DE ESTADO */}
      {modalEstado && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-light border border-secondary shadow-lg">
              <div className="modal-header border-bottom border-secondary">
                <h5 className="modal-title fw-bold text-uppercase text-warning">
                  <i className="bi bi-arrow-repeat me-2"></i>Estado Boleta {modalEstado.id}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setModalEstado(null)}></button>
              </div>
              <form onSubmit={handleGuardarNuevoEstado}>
                <div className="modal-body p-4">
                  <p className="small text-secondary mb-3">
                    Cliente: <strong>{modalEstado.cliente}</strong> ({modalEstado.correo})
                  </p>
                  <label className="form-label text-secondary small fw-bold">Nuevo Estado:</label>
                  <select
                    className="form-select bg-dark text-light border-secondary fw-bold"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En preparación">En preparación</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="modal-footer border-top border-secondary">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setModalEstado(null)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-warning text-dark fw-bold text-uppercase">
                    Actualizar Estado
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