import React, { useState } from 'react';

export const Contacto = () => {
  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  // Estado para alertas y errores
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  // Manejar el cambio de valores en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Validación y envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setExito(false);

    const { nombre, email, asunto, mensaje } = formData;

    // Validación básica
    if (!nombre.trim() || !email.trim() || !asunto || !mensaje.trim()) {
      setError('Por favor, completa todos los campos del formulario.');
      return;
    }

    // Validación de dominio de correo (@gmail.com o @duoc.cl o @profesor.duoc.cl)
    const emailRegex = /^[\w-\.]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!emailRegex.test(email)) {
      setError('El correo debe pertenecer al dominio @gmail.com o @duoc.cl o @profesor.duoc.cl');
      return;
    }

    // Si todo es válido
    setExito(true);
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <main className="container py-5 text-dark">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Contáctanos</h1>
        <p className="text-muted lead">
          ¿Tienes dudas o consultas? Escríbenos y te responderemos a la brevedad.
        </p>
      </div>

      <div className="row g-4 justify-content-center align-items-stretch">
        {/* Columna Izquierda: Información de contacto y mapa */}
        <div className="col-lg-5">
          <div
            className="card card-contacto h-100 p-4 bg-dark text-white d-flex flex-column justify-content-between shadow-sm border-0"
            style={{ borderRadius: '15px' }}
          >
            <div>
              <h3 className="fw-bold mb-4 text-danger">Información de Contacto</h3>
              <p className="text-light opacity-75 mb-4">
                Visita nuestra tienda física o comunícate directamente por nuestros canales oficiales.
              </p>

              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center gap-3">
                  <i className="bi bi-geo-alt-fill fs-4 text-danger"></i>
                  <span>Av. Providencia 1234, Santiago, Chile</span>
                </li>
                <li className="mb-3 d-flex align-items-center gap-3">
                  <i className="bi bi-envelope-fill fs-4 text-danger"></i>
                  <span>contacto@musicmania.cl</span>
                </li>
                <li className="mb-3 d-flex align-items-center gap-3">
                  <i className="bi bi-telephone-fill fs-4 text-danger"></i>
                  <span>+56 9 1234 5678</span>
                </li>
                <li className="mb-4 d-flex align-items-center gap-3">
                  <i className="bi bi-clock-fill fs-4 text-danger"></i>
                  <span>Lun - Vie: 10:00 - 19:00 hrs</span>
                </li>
              </ul>
            </div>

            {/* Mapa de Google Maps */}
            <div className="rounded overflow-hidden shadow-sm ratio ratio-16x9 border border-secondary">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.610565866164!2d-70.6148!3d-33.4258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9692cabb169f4567%3A0x5a181180b2a76f2!2sProvidencia%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación de la tienda"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="col-lg-7">
          <div
            className="card card-contacto p-4 p-md-5 bg-white shadow-sm border-0"
            style={{ borderRadius: '15px' }}
          >
            <form id="formContacto" onSubmit={handleSubmit}>
              {/* Mensajes de Estado (Alertas React) */}
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              {exito && (
                <div className="alert alert-success mb-3" role="alert">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-bold">
                  Nombre Completo:
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Ingresa tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Correo Electrónico:
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="ejemplo@gmail.com o ejemplo@duoc.cl o ejemplo@profesor.duoc.cl"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-text text-muted">
                  Solo se permiten correos @gmail.com o @duoc.cl o @profesor.duoc.cl
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="asunto" className="form-label fw-bold">
                  Motivo de consulta:
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light text-muted">
                    <i className="bi bi-chat-left-dots"></i>
                  </span>
                  <select
                    className="form-select"
                    id="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="consulta">Consulta General</option>
                    <option value="pedido">Estado de mi pedido</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label fw-bold">
                  Mensaje:
                </label>
                <textarea
                  className="form-control"
                  id="mensaje"
                  rows="4"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100 py-3 fw-bold fs-5 shadow-sm"
              >
                <i className="bi bi-send-fill me-2"></i>Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};