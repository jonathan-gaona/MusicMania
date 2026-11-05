require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const origenes = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map((s) => s.trim());

app.use(cors({ origin: origenes }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/ordenes', require('./routes/ordenes'));

app.use((_req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API MusicMania en http://localhost:${PORT}`));
