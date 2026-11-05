const router = require('express').Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { auth, requireAdmin } = require('../middleware/auth');
const { usuario } = require('../utils/mappers');

const ADMIN_PRINCIPAL = 'admin@duoc.cl';

router.use(auth, requireAdmin);

router.get('/', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM USUARIO ORDER BY id_usuario');
  res.json(rows.map(usuario));
});

router.post('/', async (req, res) => {
  const { nombre, run, correo, password, rol = 'Cliente' } = req.body;
  if (!nombre?.trim() || !correo?.trim() || !password?.trim())
    return res.status(400).json({ message: 'Por favor completa todos los campos obligatorios.' });
  if (!['Administrador', 'Cliente'].includes(rol)) return res.status(400).json({ message: 'Rol inválido.' });

  try {
    const correoNorm = correo.trim().toLowerCase();
    const [existe] = await pool.query('SELECT 1 FROM USUARIO WHERE correo = ?', [correoNorm]);
    if (existe.length) return res.status(409).json({ message: 'El correo ingresado ya se encuentra registrado.' });

    const hash = await bcrypt.hash(password.trim(), 10);
    const [r] = await pool.query(
      'INSERT INTO USUARIO (run, nombre, correo, password_hash, rol) VALUES (?,?,?,?,?)',
      [run?.trim() || null, nombre.trim(), correoNorm, hash, rol]
    );
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [r.insertId]);
    res.status(201).json(usuario(rows[0]));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al crear el usuario.' });
  }
});

router.put('/:id', async (req, res) => {
  const { nombre, run, correo, password, rol } = req.body;
  if (!nombre?.trim() || !correo?.trim())
    return res.status(400).json({ message: 'El nombre y el correo no pueden estar vacíos.' });
  if (rol && !['Administrador', 'Cliente'].includes(rol)) return res.status(400).json({ message: 'Rol inválido.' });

  try {
    const [actual] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [req.params.id]);
    if (!actual.length) return res.status(404).json({ message: 'Usuario no encontrado.' });
    if (actual[0].correo === ADMIN_PRINCIPAL && rol && rol !== 'Administrador')
      return res.status(400).json({ message: 'El Administrador Principal debe seguir siendo administrador.' });

    const correoNorm = correo.trim().toLowerCase();
    const [dup] = await pool.query('SELECT 1 FROM USUARIO WHERE correo = ? AND id_usuario <> ?', [correoNorm, req.params.id]);
    if (dup.length) return res.status(409).json({ message: 'El correo ingresado ya se encuentra registrado.' });

    const campos = ['nombre = ?', 'run = ?', 'correo = ?', 'rol = ?'];
    const valores = [nombre.trim(), run?.trim() || null, correoNorm, rol || actual[0].rol];
    if (password?.trim()) {
      campos.push('password_hash = ?');
      valores.push(await bcrypt.hash(password.trim(), 10));
    }
    await pool.query(`UPDATE USUARIO SET ${campos.join(', ')} WHERE id_usuario = ?`, [...valores, req.params.id]);
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [req.params.id]);
    res.json(usuario(rows[0]));
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado.' });
    if (rows[0].correo === ADMIN_PRINCIPAL)
      return res.status(400).json({ message: 'No se puede eliminar la cuenta del Administrador Principal.' });
    if (rows[0].id_usuario === req.user.id_usuario)
      return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta.' });

    await pool.query('DELETE FROM USUARIO WHERE id_usuario = ?', [req.params.id]);
    res.json({ message: 'Usuario eliminado.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
});

module.exports = router;
