import api from '../api/axios';

export const listar = async () => (await api.get('/usuarios')).data;
export const crear = async (usuario) => (await api.post('/usuarios', usuario)).data;
export const actualizar = async (id, cambios) => (await api.put(`/usuarios/${id}`, cambios)).data;
export const eliminar = async (id) => (await api.delete(`/usuarios/${id}`)).data;
