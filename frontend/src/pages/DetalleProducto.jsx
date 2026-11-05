import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productosService from '../services/productosService';

export const DetalleProducto = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  // Producto desde la API (por ID de la URL)
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    productosService
      .obtener(id)
      .then((p) =>
        setProducto({
          ...p,
          nombre: p.categoria === 'vinilos' && p.artista ? `${p.titulo} - ${p.artista}` : p.titulo,
        })
      )
      .catch(() => setProducto(null))
      .finally(() => setCargando(false));
  }, [id]);

  // Manejar el clic en "Añadir al Carrito"
  const handleAgregar = () => {
    if (producto) {
      if (agregarAlCarrito) {
        agregarAlCarrito({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
        });
      }

      // Mostrar el mensaje flotante Toast por 3 segundos
      setToast(`¡"${producto.nombre}" se agregó al carrito!`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  if (cargando) {
    return <main className="container py-5 text-white text-center"><p>Cargando producto...</p></main>;
  }

  if (!producto) {
    return (
      <main className="container py-5 text-center text-white">
        <h2>Producto no encontrado</h2>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </main>
    );
  }

  return (
    <main className="container py-5 text-white position-relative">
      
      {/* Toast Notificación Flotante */}
      {toast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055, marginTop: '70px' }}>
          <div className="toast show align-items-center text-bg-success border-0 shadow-lg" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-bold fs-6">
                <i className="bi bi-check-circle-fill me-2"></i>
                {toast}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setToast('')}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Botón Volver */}
      <button className="btn btn-outline-light mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {/* Tarjeta de Detalle del Producto */}
      <div className="card bg-dark text-white border-secondary p-4 shadow-lg">
        <div className="row g-4 align-items-center">
          
          {/* Imagen */}
          <div className="col-12 col-md-5 text-center">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded border border-secondary shadow"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>

          {/* Información y Acción */}
          <div className="col-12 col-md-7">
            <span className="badge bg-danger mb-2 px-3 py-2 text-uppercase fw-bold">
              SKU: {producto.sku}
            </span>

            <h1 className="fw-bold mb-3">{producto.nombre}</h1>

            <p className="text-secondary fs-6 mb-4">{producto.descripcion}</p>

            <div className="mb-4">
              <span className="display-6 fw-bold text-danger">
                $ {producto.precio.toLocaleString('es-CL')}
              </span>
              <p className="text-success small mt-1 fw-semibold">
                Stock disponible: {producto.stock} unidades
              </p>
            </div>

            <button
              className="btn btn-danger btn-lg w-100 fw-bold shadow py-3"
              onClick={handleAgregar}
            >
              Añadir al Carrito
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default DetalleProducto;