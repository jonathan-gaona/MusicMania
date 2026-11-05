CREATE DATABASE IF NOT EXISTS musicmania CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE musicmania;

CREATE TABLE IF NOT EXISTS USUARIO (
  id_usuario    INT AUTO_INCREMENT PRIMARY KEY,
  run           VARCHAR(12) NULL UNIQUE,
  nombre        VARCHAR(120) NOT NULL,
  correo        VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  region        VARCHAR(80) NULL,
  comuna        VARCHAR(80) NULL,
  direccion     VARCHAR(200) NULL,
  rol           ENUM('Administrador','Cliente') NOT NULL DEFAULT 'Cliente',
  creado_en     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PRODUCTO (
  id_producto  VARCHAR(30) PRIMARY KEY,           -- 'alb-1', 'eq-3', 'acc-1', 'prod-...'
  categoria    VARCHAR(30) NOT NULL,              -- vinilos | equipos | accesorios | ofertas
  titulo       VARCHAR(160) NOT NULL,
  artista      VARCHAR(100) NULL,                 -- artista o marca
  descripcion  TEXT NULL,
  sku          VARCHAR(60) NULL,
  precio       INT NOT NULL,                      -- CLP
  precio_antes INT NULL,                          -- solo ofertas
  stock        INT NOT NULL DEFAULT 5,
  imagen       VARCHAR(255) NULL,
  anio         SMALLINT NULL,
  spotify_url  VARCHAR(400) NULL,
  creado_en    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_producto_categoria (categoria)
);

CREATE TABLE IF NOT EXISTS ORDEN (
  id_orden       VARCHAR(30) PRIMARY KEY,         -- 'BOL-2026-123456'
  id_usuario     INT NULL,                        -- NULL si compró como invitado
  cliente_nombre VARCHAR(160) NOT NULL,
  correo         VARCHAR(120) NOT NULL,
  rut            VARCHAR(12) NULL,
  direccion      VARCHAR(255) NOT NULL,
  region         VARCHAR(80) NULL,
  comuna         VARCHAR(80) NULL,
  indicaciones   TEXT NULL,
  metodo_pago    VARCHAR(60) NOT NULL,
  estado         ENUM('Pendiente','En preparación','Enviado','Entregado','Cancelado') NOT NULL DEFAULT 'Pendiente',
  total          INT NOT NULL,
  fecha          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE SET NULL,
  INDEX idx_orden_correo (correo)
);

CREATE TABLE IF NOT EXISTS DETALLE_ORDEN (
  id_detalle      INT AUTO_INCREMENT PRIMARY KEY,
  id_orden        VARCHAR(30) NOT NULL,
  id_producto     VARCHAR(30) NULL,
  nombre          VARCHAR(160) NOT NULL,          -- copia del nombre al momento de la compra
  precio_unitario INT NOT NULL,
  cantidad        INT NOT NULL,
  FOREIGN KEY (id_orden) REFERENCES ORDEN(id_orden) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto) ON DELETE SET NULL
);
