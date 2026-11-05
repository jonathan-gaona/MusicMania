# MusicMania

Tienda de vinilos y equipos de audio. El proyecto está separado en tres partes:

```
MusicMania-react/
├── frontend/   React + Vite (interfaz)
├── backend/    API REST con Node.js + Express + MySQL
└── database/   Scripts SQL (esquema y datos iniciales)
```

## Puesta en marcha

### 1. Base de datos (MySQL)
Ejecuta en MySQL Workbench / DBeaver, en este orden:
1. `database/01_schema.sql`
2. `database/02_seed.sql`

### 2. Backend (puerto 4000)
```bash
cd backend
npm install
cp .env.example .env      # edita DB_PASSWORD y JWT_SECRET
npm run seed:usuarios     # crea admin/clientes de prueba con contraseña hasheada
npm run dev
```

### 3. Frontend (puerto 5173)
```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:4000/api
npm run dev
```

Usuarios de prueba: `admin@duoc.cl` / `admin` (Administrador) y `cliente@gmail.com` / `1234` (Cliente).

## API

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login` | público |
| GET | `/api/auth/me` | sesión |
| GET | `/api/productos`, `/api/productos/:id` (`?categoria=`) | público |
| POST/PUT/DELETE | `/api/productos` | administrador |
| POST | `/api/ordenes` (checkout, acepta invitados) | público |
| GET | `/api/ordenes/mias` | sesión |
| GET/PATCH/DELETE | `/api/ordenes`, `/api/ordenes/:id/estado` | administrador |
| GET/POST/PUT/DELETE | `/api/usuarios` | administrador |

## Pruebas
`cd frontend && npm test` (los tests mockean la capa `src/services`, no necesitan backend).

## Pendiente (siguiente fase)
Reseñas, blogs y categorías del panel admin siguen guardándose en `localStorage`.
