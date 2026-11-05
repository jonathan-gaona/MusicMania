const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { auth } = require('../middleware/auth');
const { usuario } = require('../utils/mappers');
const { correoValido, passwordValida } = require('../utils/validaciones');

router.post('/register', async (req, res) => {
  const { run, nombre, correo, password, region, comuna, direccion } = req.body;

  if (!nombre?.trim() || !correo?.trim() || !password)
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  if (!correoValido(correo))
    return res.status(400).json({ message: 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.' });
  if (!passwordValida(password))
    return res.status(400).json({ message: 'La contraseña debe tener entre 4 y 10 caracteres.' });

  try {
    const correoNorm = correo.trim().toLowerCase();
    const [existe] = await pool.query('SELECT 1 FROM USUARIO WHERE correo = ? OR (run IS NOT NULL AND run = ?)', [
      correoNorm,
      run?.trim() || null,
    ]);
    if (existe.length) return res.status(409).json({ message: 'El correo o RUN ya se encuentra registrado.' });

    const hash = await bcrypt.hash(password, 10);
    const [r] = await pool.query(
      `INSERT INTO USUARIO (run, nombre, correo, password_hash, region, comuna, direccion, rol)
       VALUES (?,?,?,?,?,?,?, 'Cliente')`,
      [run?.trim() || null, nombre.trim(), correoNorm, hash, region || null, comuna || null, direccion?.trim() || null]
    );
    res.status(201).json({ id: r.insertId, message: 'Usuario creado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
});

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });

  try {
    const [rows] = await pool.query('SELECT * FROM USUARIO WHERE correo = ?', [correo.trim().toLowerCase()]);
    const u = rows[0];
    if (!u || !(await bcrypt.compare(password, u.password_hash)))
      return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });

    const token = jwt.sign({ id_usuario: u.id_usuario, rol: u.rol }, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.json({ token, usuario: usuario(u) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
});

// Devuelve el usuario dueño del token (para revalidar la sesión al recargar)
router.get('/me', auth, async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [req.user.id_usuario]);
  if (!rows.length) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(usuario(rows[0]));
});

module.exports = router;
