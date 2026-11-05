const router = require('express').Router();
const pool = require('../config/db');
const { auth, requireAdmin } = require('../middleware/auth');
const { producto } = require('../utils/mappers');

// Lista pública. ?categoria=vinilos|equipos|accesorios|ofertas
// Sin filtro devuelve todo menos las ofertas.
router.get('/', async (req, res) => {
  try {
    const { categoria } = req.query;
    const [rows] = categoria
      ? await pool.query('SELECT * FROM PRODUCTO WHERE categoria = ? ORDER BY creado_en DESC, LENGTH(id_producto), id_producto', [categoria])
      : await pool.query("SELECT * FROM PRODUCTO WHERE categoria <> 'ofertas' ORDER BY creado_en DESC, LENGTH(id_producto), id_producto");
    res.json(rows.map(producto));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al listar productos.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM PRODUCTO WHERE id_producto = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.json(producto(rows[0]));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al obtener el producto.' });
  }
});

router.post('/', auth, requireAdmin, async (req, res) => {
  const { titulo, artista, categoria = 'vinilos', precio, stock = 5, imagen, descripcion, sku, anio, spotifyUrl } = req.body;
  if (!titulo?.trim() || precio === undefined || Number(precio) < 0)
    return res.status(400).json({ message: 'Título y precio son obligatorios.' });

  try {
    const id = `prod-${Date.now()}`;
    await pool.query(
      `INSERT INTO PRODUCTO (id_producto, categoria, titulo, artista, descripcion, sku, precio, stock, imagen, anio, spotify_url)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [id, categoria, titulo.trim(), artista || null, descripcion || null, sku || null, Number(precio), Number(stock), imagen || null, anio || null, spotifyUrl || null]
    );
    const [rows] = await pool.query('SELECT * FROM PRODUCTO WHERE id_producto = ?', [id]);
    res.status(201).json(producto(rows[0]));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al crear el producto.' });
  }
});

router.put('/:id', auth, requireAdmin, async (req, res) => {
  const mapa = {
    titulo: 'titulo', artista: 'artista', categoria: 'categoria', descripcion: 'descripcion', sku: 'sku',
    precio: 'precio', stock: 'stock', imagen: 'imagen', anio: 'anio', spotifyUrl: 'spotify_url',
  };
  const campos = Object.keys(mapa).filter((k) => req.body[k] !== undefined);
  if (!campos.length) return res.status(400).json({ message: 'Nada que actualizar.' });

  try {
    const set = campos.map((k) => `${mapa[k]} = ?`).join(', ');
    const valores = campos.map((k) => req.body[k]);
    const [r] = await pool.query(`UPDATE PRODUCTO SET ${set} WHERE id_producto = ?`, [...valores, req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ message: 'Producto no encontrado.' });
    const [rows] = await pool.query('SELECT * FROM PRODUCTO WHERE id_producto = ?', [req.params.id]);
    res.json(producto(rows[0]));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al actualizar el producto.' });
  }
});

router.delete('/:id', auth, requireAdmin, async (req, res) => {
  try {
    const [r] = await pool.query('DELETE FROM PRODUCTO WHERE id_producto = ?', [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.json({ message: 'Producto eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al eliminar el producto.' });
  }
});

module.exports = router;
