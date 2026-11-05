import React from 'react';

// Datos del equipo para renderizarlos de forma limpia mediante un map
const equipo = [
  {
    id: 1,
    nombre: 'Alexander',
    rol: 'Descubrimiento & Tendencias',
    descripcion:
      'Aporta una mirada fresca y energética al equipo. Le apasiona descubrir nuevos talentos y ayudar a cada cliente a encontrar ese disco que realmente conecta con su estilo.',
    imagen: '/img/fotoAlex.jpeg',
    posicionImagen: 'center 25%'
  },
  {
    id: 2,
    nombre: 'Jonathan',
    rol: 'Especialista en Rock & Rap',
    descripcion:
      'Se enfoca en la parte más sonora y auténtica de la música. Tiene un gran gusto por los discos con identidad y por acompañar a los amantes del rock y el rap en su próxima compra.',
    imagen: '/img/fotoJoni.jpeg',
    posicionImagen: 'center 1%'
  },
  {
    id: 3,
    nombre: 'Ricardo',
    rol: 'Asesoría de Audio & Equipos',
    descripcion:
      'Combina pasión por la música con atención al detalle. Es el encargado de orientar a quienes buscan una experiencia completa, desde el álbum favorito hasta el equipo de audio ideal.',
    imagen: '/img/fotoRicardo.jpeg',
    posicionImagen: 'center 35%'
  }
];

export const SobreNosotros = () => {
  return (
    <main className="bg-dark text-white min-vh-100 py-5">
      <div className="container">

        {/* 1. SECCIÓN HISTORIA Y PROPÓSITO */}
        <section className="row align-items-center mb-5 pb-4 border-bottom border-secondary">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <p className="text-uppercase text-danger fw-bold mb-2 tracking-wide">
              Nuestra Historia
            </p>
            <h1 className="display-5 fw-bold mb-3 text-white">
              Amamos la música y la compartimos en cada disco.
            </h1>
            <p className="lead text-light opacity-75">
              En <strong className="text-danger">MusicMania</strong> no solo vendemos álbumes, también construimos experiencias para quienes viven la música con intensidad.
            </p>
            <p className="text-light opacity-75">
              Somos un equipo apasionado por los ritmos, las letras y los sonidos que marcan momentos importantes de la vida. Nuestra misión es conectar a las personas con artistas y géneros que les hagan sentir, viajar y recordar. Cada compra es más que un disco: es llevar la esencia de la música a tu hogar.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="border border-secondary rounded shadow p-2 bg-secondary bg-opacity-10">
              <img
                src="/img/audifonos.jpg"
                alt="Equipo de música y álbumes"
                className="img-fluid rounded"
                style={{ height: '380px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>


        {/* 3. SECCIÓN PILARES / VALORES DE LA TIENDA (Sustituye la colección repetida) */}
        <section className="mb-5">
          <div className="text-center mb-5">
            <p className="text-uppercase text-warning fw-bold mb-1">
              Nuestros Valores
            </p>
            <h2 className="fw-bold text-white">¿Por qué elegir MusicMania?</h2>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4 rounded bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="fs-1 text-danger mb-3">🎧</div>
                <h4 className="h5 fw-bold text-white mb-2">Autenticidad Garantizada</h4>
                <p className="text-light opacity-75 small mb-0">
                  Trabajamos con ediciones originales y garantizamos la máxima calidad de fidelidad sonora en todos nuestros vinilos y discos.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 rounded bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="fs-1 text-warning mb-3">⚡</div>
                <h4 className="h5 fw-bold text-white mb-2">Pasión Melómana</h4>
                <p className="text-light opacity-75 small mb-0">
                  No vendemos por vender; te asesoramos personalmente para que encuentres la joya musical que estás buscando para tu colección.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 rounded bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="fs-1 text-info mb-3">💿</div>
                <h4 className="h5 fw-bold text-white mb-2">Empaque Protegido</h4>
                <p className="text-light opacity-75 small mb-0">
                  Sabemos lo importante que es para las personas un disco en excelntes condiciones. Por lo que aseguramos protección y cuidado del producto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SECCIÓN INTEGRANTES DEL EQUIPO */}
        <section className="mb-5 pb-4 border-bottom border-secondary">
          <div className="text-center mb-5">
            <p className="text-uppercase text-danger fw-bold mb-1">
              Nuestro Equipo
            </p>
            <h2 className="fw-bold text-white">
              Conoce a quienes hacen posible cada escucha
            </h2>
          </div>

          <div className="row g-4">
            {equipo.map((persona) => (
              <div key={persona.id} className="col-md-4">
                <div className="card h-100 bg-secondary bg-opacity-10 text-white border-secondary shadow-sm">
                  <img
                    src={persona.imagen}
                    className="card-img-top"
                    alt={persona.nombre}
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                      objectPosition: persona.posicionImagen
                    }}
                  />
                  <div className="card-body">
                    <h3 className="h5 fw-bold text-white mb-1">{persona.nombre}</h3>
                    <p className="text-warning small fw-semibold mb-3">{persona.rol}</p>
                    <p className="card-text text-light opacity-75 small">
                      {persona.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};