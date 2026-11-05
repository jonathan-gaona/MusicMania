// Convierten filas de MySQL al formato que ya usa el frontend.

const producto = (r) => ({
  id: r.id_producto,
  categoria: r.categoria,
  titulo: r.titulo,
  nombre: r.titulo,
  artista: r.artista,
  descripcion: r.descripcion,
  sku: r.sku,
  precio: r.precio,
  precioAntes: r.precio_antes,
  stock: r.stock,
  imagen: r.imagen,
  anio: r.anio,
  spotifyUrl: r.spotify_url,
});

const usuario = (r) => ({
  id: r.id_usuario,
  run: r.run || '',
  nombre: r.nombre,
  correo: r.correo,
  region: r.region,
  comuna: r.comuna,
  direccion: r.direccion,
  rol: r.rol,
});

const orden = (r, detalles = []) => ({
  id: r.id_orden,
  fecha: String(r.fecha).slice(0, 16),
  cliente: r.cliente_nombre,
  correo: r.correo,
  rut: r.rut || '',
  direccion: r.direccion,
  metodoPago: r.metodo_pago,
  estado: r.estado,
  total: r.total,
  productos: detalles.map((d) => ({
    id: d.id_producto,
    nombre: d.nombre,
    precio: d.precio_unitario,
    cantidad: d.cantidad,
  })),
});

module.exports = { producto, usuario, orden };
