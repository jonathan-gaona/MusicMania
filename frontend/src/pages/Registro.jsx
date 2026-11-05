import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registrar } from '../services/authService';
import { mensajeError } from '../api/axios';

const datosRegiones = {
  'Coquimbo': ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Vicuña'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
  'Región Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'La Florida', 'Puente Alto'],
  'Biobío': ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chillán', 'Los Ángeles']
};

export const Registro = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmPassword: '',
    region: '',
    comuna: '',
    direccion: ''
  });

  const [errores, setErrores] = useState({});
  const [toastState, setToastState] = useState({
    visible: false,
    tipo: 'exito', // 'exito' o 'error'
    mensaje: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'region') {
      setFormData((prev) => ({
        ...prev,
        region: value,
        comuna: ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const mostrarToast = (tipo, mensaje) => {
    setToastState({ visible: true, tipo, mensaje });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    // 1. RUN estrictamente sin puntos ni guion
    const runRegex = /^[0-9]{7,8}[0-9kK]{1}$/;
    if (!formData.run.trim()) {
      nuevosErrores.run = 'El RUN es obligatorio.';
    } else if (!runRegex.test(formData.run.trim())) {
      nuevosErrores.run = 'Ingresa el RUN sin puntos ni guion (ejemplo: 193091180).';
    }

    // 2. Solo letras para Nombre y Apellidos
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (!soloLetrasRegex.test(formData.nombre.trim())) {
      nuevosErrores.nombre = 'El nombre solo debe contener letras.';
    }

    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios.';
    } else if (!soloLetrasRegex.test(formData.apellidos.trim())) {
      nuevosErrores.apellidos = 'Los apellidos solo deben contener letras.';
    }

    // 3. Correo permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com)
    const correoRegex = /^[\w-\.]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (!correoRegex.test(formData.correo.trim())) {
      nuevosErrores.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    // 4. Contraseña entre 4 y 10 caracteres
    if (formData.password.length < 4 || formData.password.length > 10) {
      nuevosErrores.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.';
    }

    // 5. Ubicación
    if (!formData.region) nuevosErrores.region = 'Seleccione una región.';
    if (!formData.comuna) nuevosErrores.comuna = 'Seleccione una comuna.';
    if (!formData.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      try {
        // El backend valida, encripta la contraseña y crea el usuario con rol Cliente
        await registrar({
          run: formData.run.trim(),
          nombre: `${formData.nombre.trim()} ${formData.apellidos.trim()}`,
          correo: formData.correo.trim(),
          password: formData.password.trim(),
          region: formData.region,
          comuna: formData.comuna,
          direccion: formData.direccion.trim(),
        });
      } catch (error) {
        mostrarToast('error', mensajeError(error, 'El usuario no se pudo crear'));
        return;
      }

      // Mostrar mensaje de éxito
      mostrarToast('exito', 'Usuario creado correctamente');

      // Vaciar formulario y limpiar errores
      setFormData({
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        confirmPassword: '',
        region: '',
        comuna: '',
        direccion: ''
      });
      setErrores({});
    } else {
      mostrarToast('error', 'El usuario no se pudo crear');
    }
  };

  return (
    <main className="bg-dark text-white min-vh-100 py-5 position-relative">
      
      {/* TOAST DE NOTIFICACIÓN COMPACTO */}
      {toastState.visible && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1100, marginTop: '70px' }}>
          <div
            className={`d-flex align-items-center justify-content-between p-3 rounded-3 shadow-lg ${
              toastState.tipo === 'exito' ? 'bg-success text-white' : 'bg-warning text-dark'
            }`}
            style={{ minWidth: '300px', maxWidth: '380px' }}
            role="alert"
          >
            <div className="d-flex align-items-center me-2">
              <span className="fs-5 me-2 fw-bold">
                {toastState.tipo === 'exito' ? '✔' : '⚠️'}
              </span>
              <span className="fw-semibold small">{toastState.mensaje}</span>
            </div>
            <button
              type="button"
              className={`btn-close ${toastState.tipo === 'exito' ? 'btn-close-white' : ''}`}
              onClick={() => setToastState((prev) => ({ ...prev, visible: false }))}
            ></button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card bg-secondary bg-opacity-10 text-white border-secondary shadow-lg">
              <div className="card-body p-4 p-md-5">
                
                <div className="text-center mb-4">
                  <div className="fs-1 text-danger mb-2">👤</div>
                  <h2 className="fw-bold">Registro de Usuario</h2>
                  <p className="text-light opacity-75">Crea tu cuenta para comprar en MusicMania</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">

                    {/* RUN */}
                    <div className="col-md-6">
                      <label htmlFor="run" className="form-label text-light">RUN (sin puntos ni guion)</label>
                      <input
                        type="text"
                        className={`form-control bg-dark text-white border-secondary ${errores.run ? 'is-invalid' : ''}`}
                        id="run"
                        placeholder="193091180"
                        value={formData.run}
                        onChange={handleChange}
                      />
                      {errores.run && <div className="invalid-feedback">{errores.run}</div>}
                    </div>

                    {/* Nombre */}
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label text-light">Nombre</label>
                      <input
                        type="text"
                        className={`form-control bg-dark text-white border-secondary ${errores.nombre ? 'is-invalid' : ''}`}
                        id="nombre"
                        maxLength="50"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                    </div>

                    {/* Apellidos */}
                    <div className="col-md-6">
                      <label htmlFor="apellidos" className="form-label text-light">Apellidos</label>
                      <input
                        type="text"
                        className={`form-control bg-dark text-white border-secondary ${errores.apellidos ? 'is-invalid' : ''}`}
                        id="apellidos"
                        maxLength="100"
                        value={formData.apellidos}
                        onChange={handleChange}
                      />
                      {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
                    </div>

                    {/* Correo */}
                    <div className="col-md-6">
                      <label htmlFor="correo" className="form-label text-light">Correo Electrónico</label>
                      <input
                        type="email"
                        className={`form-control bg-dark text-white border-secondary ${errores.correo ? 'is-invalid' : ''}`}
                        id="correo"
                        placeholder="usuario@duoc.cl"
                        value={formData.correo}
                        onChange={handleChange}
                      />
                      {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                    </div>

                    {/* Contraseña */}
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label text-light">Contraseña</label>
                      <input
                        type="password"
                        className={`form-control bg-dark text-white border-secondary ${errores.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                    </div>

                    {/* Confirmar Contraseña */}
                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label text-light">Confirmar Contraseña</label>
                      <input
                        type="password"
                        className={`form-control bg-dark text-white border-secondary ${errores.confirmPassword ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errores.confirmPassword && <div className="invalid-feedback">{errores.confirmPassword}</div>}
                    </div>

                    {/* Región */}
                    <div className="col-md-6">
                      <label htmlFor="region" className="form-label text-light">Región</label>
                      <select
                        className={`form-select bg-dark text-white border-secondary ${errores.region ? 'is-invalid' : ''}`}
                        id="region"
                        value={formData.region}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione Región...</option>
                        {Object.keys(datosRegiones).map((reg) => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </select>
                      {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                    </div>

                    {/* Comuna */}
                    <div className="col-md-6">
                      <label htmlFor="comuna" className="form-label text-light">Comuna</label>
                      <select
                        className={`form-select bg-dark text-white border-secondary ${errores.comuna ? 'is-invalid' : ''}`}
                        id="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        disabled={!formData.region}
                      >
                        <option value="">Seleccione Comuna...</option>
                        {formData.region &&
                          datosRegiones[formData.region].map((com) => (
                            <option key={com} value={com}>{com}</option>
                          ))}
                      </select>
                      {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                    </div>

                    {/* Dirección */}
                    <div className="col-12">
                      <label htmlFor="direccion" className="form-label text-light">Dirección</label>
                      <input
                        type="text"
                        className={`form-control bg-dark text-white border-secondary ${errores.direccion ? 'is-invalid' : ''}`}
                        id="direccion"
                        placeholder="Av. Siempre Viva 123"
                        value={formData.direccion}
                        onChange={handleChange}
                      />
                      {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                    </div>

                  </div>

                  <button type="submit" className="btn btn-danger w-100 py-2 fw-semibold mt-4">
                    Registrarme
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-light opacity-75">
                    ¿Ya tienes una cuenta? <Link to="/iniciar-sesion" className="text-danger fw-bold ms-1">Inicia sesión aquí</Link>
                  </small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};