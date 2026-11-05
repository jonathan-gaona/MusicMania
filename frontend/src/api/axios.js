import axios from 'axios';

// La URL del backend se configura en frontend/.env (VITE_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
});

// Adjunta el JWT guardado en el login a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el servidor dice que el token venció, se limpia la sesión local
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioSesion');
    }
    return Promise.reject(error);
  }
);

export const mensajeError = (error, porDefecto = 'Ocurrió un error. Intenta nuevamente.') =>
  error?.response?.data?.message || porDefecto;

export default api;
