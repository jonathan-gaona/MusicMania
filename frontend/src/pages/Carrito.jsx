import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Carrito = ({ carrito, setCarrito }) => {
  const navigate = useNavigate();
  // Estado para la notificación interactiva (Toast)
  const [toast, setToast] = useState({ mensaje: '', tipo: 'success' });

  // Función para mostrar la notificación flotante
  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setToast({ mensaje, tipo });
    setTimeout(() => {
      setToast({ mensaje: '', tipo: 'success' });
    }, 3500);
  };

  // Función para modificar la cantidad de un producto (+1 / -1)
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((producto) => {
          if (producto.id === id) {
            const nuevaCantidad = (producto.cantidad || 1) + delta;
            return nuevaCantidad > 0 ? { ...producto, cantidad: nuevaCantidad } : null;
          }
          return producto;
        })
        .filter(Boolean)
    );
  };

  // Función para eliminar un producto individual mediante su ID
  const eliminarProducto = (id, nombre) => {
    setCarrito((prev) => prev.filter((producto) => producto.id !== id));
    mostrarNotificacion(`"${nombre}" fue eliminado del carrito.`, 'warning');
  };

  // Función para vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    mostrarNotificacion('El carrito ha sido vaciado correctamente.', 'warning');
  };

  // Redirigir al flujo de Checkout al hacer clic en PAGAR
  const irAlCheckout = () => {
    navigate('/checkout');
  };

  // Calcular el precio total considerando precio unitario * cantidad
  const total = carrito.reduce(
    (acumulador, producto) => acumulador + (producto.precio || 0) * (producto.cantidad || 1),
    0
  );

  return (
    <main className="container py-5 text-white position-relative">
      
      {/* Toast Notificación Flotante Interactiva */}
      {toast.mensaje && (
        <div 
          className="position-fixed top-0 end-0 p-3" 
          style={{ zIndex: 1055, marginTop: '70px' }}
        >
          <div 
            className={`toast show align-items-center text-bg-${toast.tipo} border-0 shadow-lg`} 
            role="alert"
          >
            <div className="d-flex">
              <div className="toast-body fw-bold fs-6">
                <i className={`bi me-2 ${toast.tipo === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}`}></i>
                {toast.mensaje}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setToast({ mensaje: '', tipo: 'success' })}
              ></button>
            </div>
          </div>
        </div>
      )}

      <h1 className="mb-4 fw-bold text-uppercase">Mi Carrito de Compras</h1>
      
      <div className="row g-4">
        {/* Sección de Productos */}
        <section className="col-lg-8" aria-label="Productos agregados al carrito">
          {carrito.length === 0 ? (
            <div className="card bg-dark border-secondary p-5 text-center shadow-sm">
              <p className="mb-4 fs-5 text-white-50">Tu carrito está vacío.</p>
              
              {/* Botones para Explorar Catálogo y Equipos */}
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link to="/catalogo" className="btn btn-danger fw-bold px-4">
                  Explorar Catálogo
                </Link>
                <Link to="/equipos" className="btn btn-outline-danger fw-bold px-4">
                  Explorar Equipos
                </Link>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {carrito.map((producto) => {
                const cantidad = producto.cantidad || 1;
                const subtotal = (producto.precio || 0) * cantidad;

                return (
                  <article 
                    key={producto.id} 
                    className="card p-3 shadow-sm border-secondary bg-dark text-white d-flex flex-row align-items-center justify-content-between flex-wrap gap-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                        className="rounded"
                      />
                      <div>
                        <h2 className="h6 mb-1 fw-bold">{producto.nombre}</h2>
                        <span className="text-danger fw-bold fs-5">
                          $ {subtotal.toLocaleString('es-CL')}
                        </span>
                      </div>
                    </div>

                    {/* Controles de Cantidad (+ / -) */}
                    <div className="d-flex align-items-center gap-2 bg-secondary bg-opacity-25 rounded px-2 py-1">
                      <button 
                        className="btn btn-sm btn-outline-light border-0 fw-bold px-2"
                        onClick={() => cambiarCantidad(producto.id, -1)}
                      >
                        -
                      </button>
                      <span className="fw-bold fs-6 px-2">{cantidad}</span>
                      <button 
                        className="btn btn-sm btn-outline-light border-0 fw-bold px-2"
                        onClick={() => cambiarCantidad(producto.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      className="btn btn-outline-danger btn-sm fw-bold"
                      onClick={() => eliminarProducto(producto.id, producto.nombre)}
                    >
                      Eliminar
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Resumen del pedido */}
        <aside className="col-lg-4">
          <div className="card bg-dark border-secondary p-4 shadow-sm">
            <h2 className="h5 fw-bold mb-4 border-bottom border-secondary pb-3 text-uppercase">
              Resumen del Pedido
            </h2>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-5 text-white-50">Total:</span>
              <strong className="fs-3 text-danger fw-bold">
                $ {total.toLocaleString('es-CL')}
              </strong>
            </div>

            <div className="d-grid gap-2">
              <button 
                type="button" 
                className="btn btn-danger btn-lg fw-bold"
                disabled={carrito.length === 0}
                onClick={irAlCheckout}
              >
                PAGAR
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-sm" 
                disabled={carrito.length === 0}
                onClick={vaciarCarrito}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};