import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productosService from '../services/productosService';

export const Ofertas = ({ agregarAlCarrito }) => {
  const [ofertasData, setOfertasData] = useState([]);

  useEffect(() => {
    productosService
      .listar('ofertas')
      .then((lista) =>
        setOfertasData(
          lista.map((p) => ({
            id: p.id,
            nombre: p.titulo,
            precioAntes: p.precioAntes || p.precio,
            precioOferta: p.precio,
            imagen: p.imagen,
            descuento: p.precioAntes ? `${Math.round((1 - p.precio / p.precioAntes) * 100)}% OFF` : 'OFERTA',
          }))
        )
      )
      .catch(() => setOfertasData([]));
  }, []);

  return (
    <main className="container py-5 text-white">
      <header className="text-center mb-5">
        <h1 className="fw-bold text-uppercase text-danger">OFERTAS ESPECIALES</h1>
        <p className="text-white-50">Aprovecha descuentos exclusivos por tiempo limitado.</p>
      </header>

      <div className="row g-4">
        {ofertasData.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <div className="card bg-dark text-white border-danger shadow-sm position-relative">
              <span className="position-absolute top-0 start-0 bg-danger text-white fw-bold px-3 py-1 rounded-end m-2">
                {item.descuento}
              </span>
              <img src={item.imagen} alt={item.nombre} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h5 className="fw-bold">{item.nombre}</h5>
                <p className="text-white-50 text-decoration-line-through mb-1">$ {item.precioAntes.toLocaleString('es-CL')}</p>
                <p className="fs-4 fw-bold text-danger">$ {item.precioOferta.toLocaleString('es-CL')}</p>
                <button onClick={() => agregarAlCarrito({ ...item, precio: item.precioOferta })} className="btn btn-danger w-100 fw-bold">
                  Aprovechar Oferta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};