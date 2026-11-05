import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { mensajeError } from '../api/axios';

export const IniciarSesion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  const [errores, setErrores] = useState({});
  const [toastState, setToastState] = useState({
    visible: false,
    tipo: 'exito',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const mostrarToast = (tipo, mensaje) => {
    setToastState({ visible: true, tipo, mensaje });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    // Validar correo
    const correoRegex = /^[\w-\.]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (!correoRegex.test(formData.correo.trim())) {
      nuevosErrores.correo = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    // Validar contraseña (4 a 10 caracteres)
    if (!formData.password) {
      nuevosErrores.password = 'La contraseña es obligatoria.';
    } else if (formData.password.length < 4 || formData.password.length > 10) {
      nuevosErrores.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      mostrarToast('error', 'Revisa los campos e inténtalo de nuevo.');
      return;
    }

    try {
      // El backend verifica la contraseña y devuelve un JWT + datos del usuario
      const usuario = await login(formData.correo.trim(), formData.password.trim());
      mostrarToast('exito', `¡Bienvenido ${usuario.nombre}!`);

      // Redireccionar según el rol (Administrador -> /admin, Cliente -> /)
      setTimeout(() => {
        navigate(usuario.rol === 'Administrador' ? '/admin' : '/');
      }, 1500);
    } catch (error) {
      mostrarToast('error', mensajeError(error, 'Correo o contraseña incorrectos.'));
    }
  };

  return (
    <main className="bg-dark text-white min-vh-100 py-5 position-relative">

      {/* TOAST ESTILO PASTILLA */}
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

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card bg-secondary bg-opacity-10 text-white border-secondary shadow-lg">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <div className="fs-1 text-danger mb-2">▶</div>
                  <h3 className="fw-bold">MusicMania</h3>
                  <p className="text-light opacity-75">Inicio de sesión</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Correo Electrónico */}
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label text-light">Correo Electrónico</label>
                    <input
                      type="email"
                      className={`form-control bg-dark text-white border-secondary ${
                        errores.correo ? 'is-invalid' : ''
                      }`}
                      id="correo"
                      maxLength="100"
                      placeholder="nombre@duoc.cl"
                      value={formData.correo}
                      onChange={handleChange}
                    />
                    {errores.correo && (
                      <div className="invalid-feedback">{errores.correo}</div>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-light">Contraseña</label>
                    <input
                      type="password"
                      className={`form-control bg-dark text-white border-secondary ${
                        errores.password ? 'is-invalid' : ''
                      }`}
                      id="password"
                      maxLength="10"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errores.password && (
                      <div className="invalid-feedback">{errores.password}</div>
                    )}
                  </div>

                  {/* Botón de Iniciar Sesión */}
                  <button type="submit" className="btn btn-danger w-100 py-2 fw-semibold mt-3">
                    Iniciar sesión
                  </button>
                </form>

                <div className="text-center mt-4">
                  <small className="text-light opacity-75">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registro" className="text-danger fw-bold ms-1">
                      Regístrate aquí
                    </Link>
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