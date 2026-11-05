// Carga los usuarios de prueba que antes se creaban en localStorage, con la contraseña hasheada.
// Uso: npm run seed:usuarios   (después de ejecutar database/01_schema.sql y 02_seed.sql)
const bcrypt = require('bcryptjs');
const pool = require('../src/config/db');

const usuarios = [
  { nombre: 'Administrador Principal', run: '111111111', correo: 'admin@duoc.cl', password: 'admin', rol: 'Administrador' },
  { nombre: 'Administrador secundario', run: '222222222', correo: 'admin2@duoc.cl', password: 'admin2', rol: 'Administrador' },
  { nombre: 'Cliente Ejemplo', run: '444444444', correo: 'cliente@gmail.com', password: '1234', rol: 'Cliente' },
  { nombre: 'Cliente Ejemplo 2', run: '33333333', correo: 'cliente2@gmail.com', password: '1234', rol: 'Cliente' },
];

(async () => {
  for (const u of usuarios) {
    const hash = await bcrypt.hash(u.password, 10);
    await pool.query(
      `INSERT INTO USUARIO (run, nombre, correo, password_hash, rol) VALUES (?,?,?,?,?)
       ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), password_hash = VALUES(password_hash), rol = VALUES(rol)`,
      [u.run, u.nombre, u.correo, hash, u.rol]
    );
    console.log(`✔ ${u.correo} (${u.rol})`);
  }
  await pool.end();
})().catch((e) => { console.error(e); process.exit(1); });
