import React from 'react';
import { Link } from 'react-router-dom';

export const PagoError = ({ orden }) => {
  return (
    <main className="container py-5 text-white text-center">
      <div className="card bg-dark border-danger p-5 max-w-lg mx-auto shadow-lg">
        <i className="bi bi-x-circle-fill text-danger display-1 mb-3"></i>
        <h1 className="fw-bold text-danger">NO SE PUDO REALIZAR EL PAGO</h1>
        <p className="text-white-50 mb-4">Hubo un inconveniente al procesar tu tarjeta. No se ha realizado ningún cargo.</p>
        
        <div className="d-flex justify-content-center gap-3">
          <Link to="/checkout" className="btn btn-danger fw-bold">Volver a Intentar</Link>
          <Link to="/carrito" className="btn btn-outline-light">Ir al Carrito</Link>
        </div>
      </div>
    </main>
  );
};