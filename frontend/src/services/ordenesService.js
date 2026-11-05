import api from '../api/axios';

export const crear = async (orden) => (await api.post('/ordenes', orden)).data;
export const listarAdmin = async () => (await api.get('/ordenes')).data;
export const misOrdenes = async () => (await api.get('/ordenes/mias')).data;
export const cambiarEstado = async (id, estado) => (await api.patch(`/ordenes/${id}/estado`, { estado })).data;
export const eliminar = async (id) => (await api.delete(`/ordenes/${id}`)).data;
