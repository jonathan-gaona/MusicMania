import api from '../api/axios';

export const login = async (correo, password) => {
  const { data } = await api.post('/auth/login', { correo, password });
  localStorage.setItem('token', data.token);
  localStorage.setItem('usuarioSesion', JSON.stringify(data.usuario));
  return data.usuario;
};

export const registrar = async (datos) => {
  const { data } = await api.post('/auth/register', datos);
  return data;
};

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuarioSesion');
};
