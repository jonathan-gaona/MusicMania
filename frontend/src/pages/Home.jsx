import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <main>
      {/* Banner Principal Hero */}
      <section
        className="text-center text-white py-5 mb-5"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1350&q=80') center/cover no-repeat",
          padding: '100px 20px',
        }}
      >
        <div className="container py-4">
          <h1 className="display-3 fw-bold text-uppercase">Bienvenidos a MusicMania</h1>
          <h2 className="h3 text-warning mb-4 fw-light">
            Lo Mejor en Vinilos y Equipos de Audio
          </h2>
          <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: '650px' }}>
            Explora nuestro catálogo de discos, tornamesas, amplificadores y accesorios diseñados para los verdaderos amantes del buen sonido.
          </p>
          <Link to="/catalogo" className="btn btn-warning btn-lg fw-bold px-4 py-3 shadow">
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Sección Productos y Accesos Destacados */}
      <section className="py-5">
        <div className="container">
          <h3 className="text-center mb-2 fs-2 fw-bold">Explora MusicMania</h3>
          <p className="text-center mb-5">
            Encuentra todo lo que necesitas para elevar tu experiencia musical
          </p>

          <div className="row g-4 justify-content-center">
            {/* Tarjeta 1: Vinilos */}
            <article className="col-md-4">
              <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=600&q=80"
                  className="card-img-top img-efecto"
                  alt="Vinilos destacados"
                />
                <div className="card-body text-center d-flex flex-column">
                  <h4 className="card-title fw-bold fs-5">Vinilos &amp; LPs Exclusivos</h4>
                  <p className="card-text text-light small flex-grow-1">
                    Ediciones limitadas, clásicos del rock, jazz y los últimos lanzamientos en formato análogo.
                  </p>
                  <Link to="/catalogo" className="btn btn-danger w-100 mt-3 fw-bold">
                    Ver Álbumes
                  </Link>
                </div>
              </div>
            </article>

            {/* Tarjeta 2: Tornamesas/Equipos */}
            <article className="col-md-4">
              <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=600&q=80"
                  className="card-img-top img-efecto"
                  alt="Tornamesas y audio"
                />
                <div className="card-body text-center d-flex flex-column">
                  <h4 className="card-title fw-bold fs-5">Tornamesas &amp; Audio</h4>
                  <p className="card-text text-light small flex-grow-1">
                    Equipos de alta fidelidad, agujas de repuesto y amplificadores para tu sistema de sonido.
                  </p>
                  <Link to="/equipos" className="btn btn-danger w-100 mt-3 fw-bold">
                    Ver Equipos
                  </Link>
                </div>
              </div>
            </article>

            {/* Tarjeta 3: Blog y Noticias */}
            <article className="col-md-4">
              <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80"
                  className="card-img-top img-efecto"
                  alt="Reseñas musicales"
                />
                <div className="card-body text-center d-flex flex-column">
                  <h4 className="card-title fw-bold fs-5">Reseñas &amp; Comunidad</h4>
                  <p className="card-text text-light small flex-grow-1">
                    Lee las opiniones de nuestros expertos sobre los álbumes más icónicos de la historia.
                  </p>
                  <Link to="/blog" className="btn btn-danger w-100 mt-3 fw-bold">
                    Leer Blog
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Video Embebido */}
      <section className="py-5 bg-dark text-center">
        <div className="container">
          <h3 className="text-light mb-3">La Experiencia del Vinilo</h3>
          <p className="text-light mb-4">
            Descubre la magia del sonido análogo en nuestra tienda.
          </p>
          <div className="ratio ratio-16x9 mx-auto" style={{ maxWidth: '700px' }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ppotU2wuSeJmzcAW"
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Sección Quiénes Somos */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-3 text-center">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80"
                className="img-fluid rounded img-logo shadow-sm mb-3 mb-md-0"
                alt="Logo MusicMania"
              />
            </div>
            <div className="col-md-7 text-center text-md-start">
              <h3 className="fw-bold">¿Quiénes Somos?</h3>
              <p className="text">
                Somos un proyecto apasionado por la música física. Conoce más sobre nuestra historia y equipo.
              </p>
              <Link to="/sobre-nosotros" className="btn btn-light text-dark fw-bold">
                Conócenos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};