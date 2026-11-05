const CORREO_REGEX = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

const correoValido = (c) => CORREO_REGEX.test(String(c || '').trim());
const passwordValida = (p) => typeof p === 'string' && p.length >= 4 && p.length <= 10;

module.exports = { correoValido, passwordValida };
