import api from '../api/axios';

export const listar = async (categoria) => {
  const { data } = await api.get('/productos', { params: categoria ? { categoria } : {} });
  return data;
};
export const obtener = async (id) => (await api.get(`/productos/${id}`)).data;
export const crear = async (producto) => (await api.post('/productos', producto)).data;
export const actualizar = async (id, cambios) => (await api.put(`/productos/${id}`, cambios)).data;
export const eliminar = async (id) => (await api.delete(`/productos/${id}`)).data;
