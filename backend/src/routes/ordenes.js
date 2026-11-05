const router = require('express').Router();
const pool = require('../config/db');
const { auth, optionalAuth, requireAdmin } = require('../middleware/auth');
const { orden } = require('../utils/mappers');

const ESTADOS = ['Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'];

async function cargarOrdenes(where = '', params = []) {
  const [ordenes] = await pool.query(`SELECT * FROM ORDEN ${where} ORDER BY fecha DESC, id_orden DESC`, params);
  if (!ordenes.length) return [];
  const [detalles] = await pool.query('SELECT * FROM DETALLE_ORDEN WHERE id_orden IN (?)', [ordenes.map((o) => o.id_orden)]);
  return ordenes.map((o) => orden(o, detalles.filter((d) => d.id_orden === o.id_orden)));
}

// Checkout: acepta invitados (sin token) o clientes con sesión.
// El servidor recalcula precios desde la BD: nunca confía en el precio que manda el navegador.
router.post('/', optionalAuth, async (req, res) => {
  const { cliente = {}, items = [], metodoPago = 'WebPay (Simulado)' } = req.body;
  const nombre = `${cliente.nombre || ''} ${cliente.apellidos || ''}`.trim();

  if (!nombre || !cliente.correo?.trim() || !cliente.calle?.trim())
    return res.status(400).json({ message: 'Faltan datos del cliente o de la dirección.' });
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ message: 'El carrito está vacío.' });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let total = 0;
    const lineas = [];
    for (const it of items) {
      const cantidad = Number(it.cantidad) || 1;
      const [[p]] = await conn.query('SELECT * FROM PRODUCTO WHERE id_producto = ? FOR UPDATE', [it.id]);
      if (!p) throw Object.assign(new Error(`Producto no encontrado: ${it.id}`), { status: 400 });
      if (cantidad < 1 || p.stock < cantidad)
        throw Object.assign(new Error(`Stock insuficiente para "${p.titulo}" (disponible: ${p.stock}).`), { status: 409 });
      total += p.precio * cantidad;
      lineas.push({ p, cantidad });
    }

    let rut = null;
    let id_usuario = null;
    if (req.user) {
      const [[u]] = await conn.query('SELECT id_usuario, run FROM USUARIO WHERE id_usuario = ?', [req.user.id_usuario]);
      if (u) { id_usuario = u.id_usuario; rut = u.run; }
    }

    const direccion = [cliente.calle.trim(), cliente.depto?.trim(), cliente.comuna].filter(Boolean).join(', ');
    let id;
    for (let i = 0; i < 5; i++) {
      id = `BOL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const [dup] = await conn.query('SELECT 1 FROM ORDEN WHERE id_orden = ?', [id]);
      if (!dup.length) break;
    }

    await conn.query(
      `INSERT INTO ORDEN (id_orden, id_usuario, cliente_nombre, correo, rut, direccion, region, comuna, indicaciones, metodo_pago, estado, total)
       VALUES (?,?,?,?,?,?,?,?,?,?,'Pendiente',?)`,
      [id, id_usuario, nombre, cliente.correo.trim().toLowerCase(), rut, direccion, cliente.region || null, cliente.comuna || null, cliente.indicaciones || null, metodoPago, total]
    );

    for (const { p, cantidad } of lineas) {
      await conn.query(
        'INSERT INTO DETALLE_ORDEN (id_orden, id_producto, nombre, precio_unitario, cantidad) VALUES (?,?,?,?,?)',
        [id, p.id_producto, p.titulo, p.precio, cantidad]
      );
      await conn.query('UPDATE PRODUCTO SET stock = stock - ? WHERE id_producto = ?', [cantidad, p.id_producto]);
    }

    await conn.commit();
    const [creada] = await cargarOrdenes('WHERE id_orden = ?', [id]);
    res.status(201).json({ ...creada, nroOrden: `#${id}` });
  } catch (e) {
    await conn.rollback();
    if (e.status) return res.status(e.status).json({ message: e.message });
    console.error(e);
    res.status(500).json({ message: 'Error al procesar la orden.' });
  } finally {
    conn.release();
  }
});

// Historial del cliente autenticado
router.get('/mias', auth, async (req, res) => {
  res.json(await cargarOrdenes('WHERE id_usuario = ?', [req.user.id_usuario]));
});

// --- Solo administradores ---
router.get('/', auth, requireAdmin, async (_req, res) => {
  res.json(await cargarOrdenes());
});

router.patch('/:id/estado', auth, requireAdmin, async (req, res) => {
  const { estado } = req.body;
  if (!ESTADOS.includes(estado)) return res.status(400).json({ message: 'Estado inválido.' });
  const [r] = await pool.query('UPDATE ORDEN SET estado = ? WHERE id_orden = ?', [estado, req.params.id]);
  if (!r.affectedRows) return res.status(404).json({ message: 'Orden no encontrada.' });
  res.json({ message: 'Estado actualizado.' });
});

router.delete('/:id', auth, requireAdmin, async (req, res) => {
  const [r] = await pool.query('DELETE FROM ORDEN WHERE id_orden = ?', [req.params.id]);
  if (!r.affectedRows) return res.status(404).json({ message: 'Orden no encontrada.' });
  res.json({ message: 'Orden eliminada.' });
});

module.exports = router;
