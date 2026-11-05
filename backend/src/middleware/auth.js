const jwt = require('jsonwebtoken');

function leerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

// Exige un JWT válido. Deja el payload en req.user = { id_usuario, rol }
function auth(req, res, next) {
  const token = leerToken(req);
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

// Si hay token válido lo usa; si no, deja pasar como invitado (checkout sin sesión)
function optionalAuth(req, _res, next) {
  const token = leerToken(req);
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      /* token inválido: se trata como invitado */
    }
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.user?.rol !== 'Administrador') {
    return res.status(403).json({ message: 'Acceso solo para administradores' });
  }
  next();
}

module.exports = { auth, optionalAuth, requireAdmin };
