import React, { useEffect, useRef, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GIS_SRC = 'https://accounts.google.com/gsi/client';

// Carga una sola vez el script de Google Identity Services
let cargaGis;
const cargarGoogle = () => {
  if (window.google?.accounts?.id) return Promise.resolve(window.google);
  if (!cargaGis) {
    cargaGis = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = GIS_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google);
      script.onerror = () => {
        cargaGis = undefined;
        reject(new Error('No se pudo cargar Google'));
      };
      document.head.appendChild(script);
    });
  }
  return cargaGis;
};

/**
 * Botón oficial "Continuar con Google".
 * onCredential recibe el ID token (JWT firmado por Google) que luego valida el backend.
 * Si no hay VITE_GOOGLE_CLIENT_ID configurado, no se muestra nada.
 */
export const GoogleLoginButton = ({ onCredential, texto = 'continue_with' }) => {
  const contenedor = useRef(null);
  const callbackRef = useRef(onCredential);
  const [error, setError] = useState(false);

  useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let activo = true;

    cargarGoogle()
      .then((google) => {
        if (!activo || !contenedor.current) return;
        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (respuesta) => callbackRef.current?.(respuesta.credential),
          ux_mode: 'popup',
        });
        google.accounts.id.renderButton(contenedor.current, {
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text: texto,
          locale: 'es',
          width: Math.min(contenedor.current.offsetWidth || 320, 400),
        });
      })
      .catch(() => activo && setError(true));

    return () => {
      activo = false;
    };
  }, [texto]);

  if (!CLIENT_ID) return null;

  return (
    <div className="my-3">
      <div className="d-flex align-items-center my-3 text-light opacity-75">
        <hr className="flex-grow-1 border-secondary" />
        <small className="mx-2">o</small>
        <hr className="flex-grow-1 border-secondary" />
      </div>
      <div ref={contenedor} className="d-flex justify-content-center w-100" />
      {error && (
        <small className="d-block text-center text-warning mt-2">
          No se pudo cargar el inicio de sesión con Google.
        </small>
      )}
    </div>
  );
};
