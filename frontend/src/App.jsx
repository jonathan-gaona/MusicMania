import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importación de componentes globales
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Vistas públicas
import { Home } from './pages/Home';
import { CatalogoAlbumes } from './pages/CatalogoAlbumes';
import { Equipos } from './pages/Equipos';
import { SobreNosotros } from './pages/SobreNosotros';
import { Registro } from './pages/Registro';
import { Contacto } from './pages/Contacto';
import { Carrito } from './pages/Carrito';
import { Resenas } from './pages/Resena';
import { DetalleResena } from './pages/DetalleResena';
import { Blog } from './pages/blog';
import { DetalleBlog } from './pages/DetalleBlog';
import { IniciarSesion } from './pages/IniciarSesion';
import { Categorias } from './pages/Categorias';
import { Ofertas } from './pages/Ofertas';
import { DetalleProducto } from './pages/DetalleProducto';
import { Checkout } from './pages/Checkout';
import { PagoExitoso } from './pages/PagoExitoso';
import { PagoError } from './pages/PagoError';

// Vista de Administración
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  const location = useLocation();

  // Comprobamos si la ruta actual es la de administración
  const esRutaAdmin = location.pathname.startsWith('/admin');

  // Estado global para el carrito de compras
  const [carrito, setCarrito] = useState([]);

  // Estado global para la orden de compra en Checkout
  const [ordenActual, setOrdenActual] = useState(null);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const idProducto = producto.id || producto.nombre;
      const existe = prev.find((item) => (item.id || item.nombre) === idProducto);
      
      if (existe) {
        return prev.map((item) =>
          (item.id || item.nombre) === idProducto
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }
      
      return [...prev, { ...producto, id: idProducto, cantidad: 1 }];
    });
  };

  // Total de items en el carrito para la insignia (badge)
  const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-between">
      <div>
        {/* 1. Solo se muestra el Navbar de la tienda si NO estamos en /admin */}
        {!esRutaAdmin && <Navbar totalItemsCarrito={totalItems} />}

        {/* 2. Ruteo central de la aplicación */}
        <Routes>
          {/* Rutas Principales */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogoAlbumes agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/equipos" element={<Equipos agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/resena" element={<Resenas />} />
          <Route path="/resenas" element={<Resenas />} />
          <Route path="/resena/:id" element={<DetalleResena />} />
          <Route path="/resenas/:id" element={<DetalleResena />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />

          {/* Vista de Administración */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Vistas adicionales */}
          <Route path="/categorias" element={<Categorias agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/ofertas" element={<Ofertas agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />

          {/* Flujo de Carrito y Pago */}
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
          <Route 
            path="/checkout" 
            element={<Checkout carrito={carrito} setCarrito={setCarrito} setOrdenActual={setOrdenActual} />} 
          />
          <Route path="/pago-exitoso" element={<PagoExitoso orden={ordenActual} />} />
          <Route path="/pago-error" element={<PagoError orden={ordenActual} />} />
        </Routes>
      </div>

      {/* 3. Solo se muestra el Footer si NO estamos en /admin */}
      {!esRutaAdmin && <Footer />}
    </div>
  );
}

export default App;