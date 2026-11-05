import React from 'react';
import { Link } from 'react-router-dom';

// Exportamos los datos para que también los use la vista de detalle
export const blogData = [
  {
    id: 'caso1',
    title: 'La canción más corta de la historia',
    subtitle: 'Un récord Guinness inmortalizado en solo 1,316 segundos',
    fecha: '05 de Octubre, 2026',
    autor: 'Redacción MusicMania',
    summary: (
      <>
        Se llama <strong>"You Suffer"</strong> de la banda Napalm Death. Dura exactamente <strong>1,316 segundos</strong> y consta de un solo acorde ultra rápido.
      </>
    ),
    image: 'img/cancion_corta.jpg',
    contenidoExtendido: [
      'En 1986, la legendaria banda británica de grindcore Napalm Death cambió las reglas de la industria musical con una composición tan fugaz como demoledora. Su tema "You Suffer" tiene una duración oficial de apenas 1,316 segundos.',
      'La pieza fue compuesta por Justin Broadrick y Nik Bullen durante los ensayos de su álbum debut "Scum". Nació casi como un chiste interno sobre la velocidad del género, pero pronto se convirtió en un ícono de la música extrema.',
      'A pesar de durar poco más de un segundo, la canción fue grabada con producción profesional en estudio y posee el récord Guinness oficial a la grabación musical más corta jamás realizada en la historia de la humanidad.'
    ]
  },
  {
    id: 'caso2',
    title: 'La obra musical más larga jamás interpretada',
    subtitle: 'Una composición concebida para sonar ininterrumpidamente durante 639 años',
    fecha: '04 de Octubre, 2026',
    autor: 'Redacción MusicMania',
    summary: (
      <>
        <strong>"ORGAN²/ASLSP"</strong> de John Cage se está interpretando en una iglesia en Alemania. Comenzó en 2001 y terminará en el año <strong>2640</strong>.
      </>
    ),
    image: 'img/cancion_larga.jpg',
    contenidoExtendido: [
      'En la iglesia de San Burchardi en Halberstadt, Alemania, se lleva a cabo uno de los experimentos conceptuales y sonoros más ambiciosos de la historia moderna: la ejecución de "ORGAN²/ASLSP" (As SLow as Possible) del compositor vanguardista John Cage.',
      'La interpretación comenzó el 5 de septiembre de 2001 y está programada para finalizar en el año 2640. Debido al tempo extremadamente lento indicado por Cage, el órgano produce sonidos continuos donde el cambio de una sola nota puede tardar varios años en ocurrir.',
      'Un fuelle eléctrico constante mantiene el flujo de aire en los tubos del órgano, convirtiendo a la pequeña iglesia en un punto de peregrinación para melómanos de todo el planeta.'
    ]
  },
  {
    id: 'caso3',
    title: 'El rango vocal agudo más extremo registrado',
    summary: (
      <>
        Alcanzado por Georgia Brown. Logró cantar una nota <strong>G10 (25,086 Hz)</strong>, una frecuencia imperceptible para el oído humano común.
      </>
    ),
    subtitle: 'Frecuencias vocales que sobrepasan los límites biológicos del oído humano',
    fecha: '02 de Octubre, 2026',
    autor: 'Redacción MusicMania',
    image: 'img/nota_aguda.jpg',
    imageStyle: { maxHeight: '280px', objectPosition: 'top' },
    contenidoExtendido: [
      'La cantante brasileña Georgia Brown dejó atónitos a científicos y especialistas de la voz al registrar la nota más alta jamás producida por un ser humano: un sorprendentemente agudo G10 (25,086 Hz).',
      'El oído humano promedio solo puede percibir sonidos hasta aproximadamente los 20,000 Hz. Esto significa que la nota alcanzada por Brown ingresa directamente en el rango del ultrasonido, siendo audible únicamente con equipos de medición acústica especializada.',
      'Con un registro abrumador de 8 octavas comprobadas, ostenta el récord Guinness del tono vocal más alto y el rango más amplio registrado en un individuo.'
    ]
  },
  {
    id: 'caso4',
    title: 'La frecuencia vocal más grave del planeta',
    subtitle: 'Notas tan profundas que solo pueden ser escuchadas por paquidermos',
    fecha: '28 de Septiembre, 2026',
    autor: 'Redacción MusicMania',
    summary: (
      <>
        Tim Storms ostenta el récord Guinness produciendo una nota de <strong>0.189 Hz (G-7)</strong>, audible prácticamente solo para paquidermos.
      </>
    ),
    image: 'img/nota_grave.jpg',
    contenidoExtendido: [
      'El cantante estadounidense Tim Storms es capaz de descender en la escala musical hasta la nota G-7 (0.189 Hz), una frecuencia infrasónica tan baja que resulta físicamente imposible de escuchar para el oído humano.',
      'Para ponerlo en perspectiva, la nota emitida por Storms es 8 octavas por debajo del G más bajo de un piano de cola. De hecho, animales de gran tamaño como los elefantes utilizan este rango de infrasonidos para comunicarse a kilómetros de distancia.',
      'Dado que ni el propio cantante puede escuchar el sonido que emite, afirma que solo puede sentir la nota a través de las intensas vibraciones mecánicas en su caja torácica.'
    ]
  }
];

export const Blog = () => {
  return (
    <main>
      <section className="py-5 bg-dark text-light rounded my-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-uppercase tracking-wider">
            Blog de Curiosidades
          </h2>

          <div className="d-flex flex-column gap-4">
            {blogData.map((item) => (
              <div key={item.id} className="bg-dark text-light p-4 rounded shadow-sm border border-secondary">
                <div className="row align-items-center g-4">
                  <div className="col-lg-6 d-flex flex-column justify-content-between">
                    <div>
                      <h3 className="fw-bold text-uppercase mb-3">{item.title}</h3>
                      <p className="text-secondary mb-3">{item.summary}</p>
                    </div>
                    <div>
                      {/* Botón que navega a la noticia extendida */}
                      <Link
                        to={`/blog/${item.id}`}
                        className="btn btn-outline-light border-2 custom-btn-case fw-bold text-uppercase mt-2"
                      >
                        Leer Noticia Completa <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <img
                      src={item.image}
                      className="img-fluid rounded w-100 object-fit-cover"
                      style={{ maxHeight: '280px', ...item.imageStyle }}
                      alt={item.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};