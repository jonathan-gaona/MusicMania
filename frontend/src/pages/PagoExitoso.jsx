import React from 'react';
import { Link } from 'react-router-dom';

export const PagoExitoso = ({ orden }) => {
  if (!orden) return <div className="container py-5 text-center">No hay datos de la orden.</div>;

  return (
    <main className="container py-5 text-white text-center">
      <div className="card bg-dark border-success p-5 max-w-lg mx-auto shadow-lg">
        <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
        <h1 className="fw-bold text-success">¡PAGO REALIZADO CON ÉXITO!</h1>
        <p className="text-white -5">Código de orden: <strong className="text-warning">{orden.nroOrden}</strong></p>
        <p className="text-white -5">Enviaremos un correo de confirmación a: <strong>{orden.cliente.correo}</strong></p>
        
        <div className="bg-secondary p-3 rounded text-start my-4">
          <p className="mb-1"><strong>Despachar a:</strong> {orden.cliente.calle}, {orden.cliente.comuna}</p>
          <p className="mb-0"><strong>Total Pagado:</strong> $ {orden.total.toLocaleString('es-CL')}</p>
        </div>

        <Link to="/" className="btn btn-success fw-bold px-4">Volver al Inicio</Link>
      </div>
    </main>
  );
};