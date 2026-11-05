import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import initialResenasComunidad from '../data/resenasComunidad.json';

export const resenasData = [
  {
    id: 'alb-1',
    titulo: 'Naturaleza Muerta',
    artista: 'Ley 20 mil',
    anio: 2011,
    precio: 17990,
    imagen: '/img/Ley20mil.jpg',
    genero: 'Hip-Hop / Boom Bap',
    calificacion: '9.2 / 10',
    description: 'Naturaleza Muerta (2011) es el álbum debut y obra de culto del grupo chileno Ley 20mil (Macrodee y Linterna Veiderr junto a DJ Jotakao). Producido casi en su totalidad por Macrodee bajo Demencia Estudio, el disco consta de 20 tracks con un sonido boom bap oscuro y pesado.',
    criticaCorta: 'Una piedra angular del hip hop subterráneo chileno. Destaca por su producción atmosférica y sombría que retrata la crudeza nocturna de Santiago con líricas crudas pero altamente poéticas.',
    analisisExtendido: [
      'Naturaleza Muerta es una pieza fundamental dentro del panorama del rap subterráneo chileno. Grabado y producido en Demencia Estudio, el disco captura la esencia más pura del boom bap noventero mediante samplers oscuros, líneas de bajo pesadas y scratches quirúrgicos ejecutados por DJ Jotakao.',
      'A lo largo de sus 20 cortes, Macrodee y Linterna Veiderr construyen una narrativa envolvente sobre las calles de Santiago. Lejos del cliché comercial, sus versos retratan la noche, la bohemia, la marginalidad urbana y la introspección cotidiana con una poética directa y visceral.',
      'En retrospectiva, el álbum ha envejecido con la dignidad de los grandes clásicos del hip-hop latinoamericano. Es un documento sonoro indispensable para comprender la evolución del movimiento independiente en Chile.'
    ]
  },
  {
    id: 'alb-2',
    titulo: 'Rap con R de Revolucion',
    artista: 'Portavoz',
    anio: 2012,
    precio: 14990,
    imagen: '/img/RdeRevolucion.jpg',
    genero: 'Hip-Hop Político / Consciente',
    calificacion: '9.5 / 10',
    description: 'Rap con R de Revolución es el álbum debut como solista del rapero chileno Portavoz (Andrés Kooper, integrante de Salvaje Decibel). Producido por el propio Portavoz junto a Beatmaker B-Souldier, el disco es un referente del rap político latinoamericano.',
    criticaCorta: 'Un Manifiesto indispensable del rap social. La habilidad lírica de Portavoz rescata la tradición de protesta combinando sampleos folclóricos y beats contundentes de manera orgánica.',
    analisisExtendido: [
      'Con Rap con R de Revolución, Portavoz entregó un manifiesto político hecho música. El álbum trasciende las fronteras del rap tradicional al fusionar el esquema clásico del boom bap con vientos andinos, guitarras folclóricas y sampleos de discursos históricos.',
      'Líricamente, Andrés Kooper demuestra un dominio técnico sobresaliente. Su métrica ágil y rima precisa abordan temas de lucha social, el conflicto en el Wallmapu, la memoria histórica chilena y la resistencia popular frente al modelo neoliberal.',
      'El impacto de este trabajo resuena a nivel continental. Es considerado un hito en la música de protesta latinoamericana del siglo XXI, conectando la métrica urbana con la herencia de la Nueva Canción Chilena.'
    ]
  },
  {
    id: 'alb-3',
    titulo: 'El Circulo',
    artista: 'Kase.O',
    anio: 2016,
    precio: 19990,
    imagen: '/img/Elcirculo.jpg',
    genero: 'Hip-Hop / Jazz Rap / Soul',
    calificacion: '9.8 / 10',
    description: 'El Círculo (2016) es el esperado y único álbum de estudio en solitario del legendario rapero español Kase.O (Javier Ibarra, miembro de Violadores del Verso). Una obra maestra introspectiva e íntima donde aborda la depresión, el amor y la espiritualidad.',
    criticaCorta: 'Una obra cumbre de madurez artística. Kase.O logra desnudarse emocionalmente sin perder la técnica aplastante que lo caracteriza, creando un paisaje sonoro rico, versátil y atemporal.',
    analisisExtendido: [
      'Tras años de silencio discográfico y tras la cima alcanzada con Violadores del Verso, Javier Ibarra (Kase.O) regresó con "El Círculo", una de las producciones más ambiciosas e íntimas en la historia del hip-hop en español.',
      'El disco no solo destaca por la infalible técnica vocal y métrica de Kase.O, sino por su valentía para abordar temas complejos como los bloqueos creativos, la depresión, la espiritualidad y la madurez personal.',
      'Musicalmente, la producción incorpora arreglos orgánicos de jazz, funk y soul, enriqueciendo el espectro sonoro sin perder la contundencia de la caja y el bombo. Un clásico instantáneo e imprescindible.'
    ]
  },
  {
    id: 'alb-4',
    titulo: "Teatro d'ira",
    artista: 'Maneskin',
    anio: 2017,
    precio: 13990,
    imagen: '/img/maneskin.jpg',
    genero: 'Hard Rock / Glam Rock / Punk',
    calificacion: '8.7 / 10',
    description: "Teatro d'ira es una producción donde la banda de rock italiana Måneskin fusiona el hard rock, el funk rock y el punk, abordando temáticas como la rabia transformadora, la catarsis, la libertad de expresión y el inconformismo.",
    criticaCorta: 'Una descarga analógica electrizante que inyecta aire fresco al rock contemporáneo. Destaca por la potencia vocal de Damiano David y una instrumentación en directo que desborda rebeldía e identidad.',
    analisisExtendido: [
      "Grabado en directo en el estudio para preservar la máxima autenticidad instrumental, Teatro d'ira devolvió al rock de guitarras el protagonismo en las listas globales de éxitos.",
      "La interpretación vocal de Damiano David desborda teatralidad y rasgado punk, respaldada por la potente sección rítmica de Victoria De Angelis y Ethan Torchio, junto a los riffs incisivos de Thomas Raggi.",
      "Cortes como 'Zitti e buoni' o 'I Wanna Be Your Slave' demuestran que la actitud analógica y la energía de estadio siguen vigentes y listas para conquistar a las nuevas generaciones."
    ]
  },
  {
    id: 'alb-5',
    titulo: 'Off The Wall',
    artista: 'Michael Jackson',
    anio: 1979,
    precio: 12990,
    imagen: '/img/michaelJackson.webp',
    genero: 'Disco / Pop / Funk / R&B',
    calificacion: '10 / 10',
    description: 'Off the Wall (1979) es el quinto álbum de estudio del cantante estadounidense Michael Jackson. Producido por Quincy Jones, el disco marcó la transición de Michael hacia una sofisticada fusión de disco, funk, pop y baladas R&B.',
    criticaCorta: 'El álbum que redefinió el pop moderno. La sublime producción de Quincy Jones combinada con la interpretación vocal exuberante de Jackson creó el molde perfecto para la música bailable.',
    analisisExtendido: [
      'Off The Wall representa el momento exacto en que Michael Jackson dejó de ser la estrella infantil prodigio para convertirse en el Rey del Pop. Con la colaboración estelar de Quincy Jones en la producción, el disco perfeccionó el sonido disco y funk de finales de los años 70.',
      'Temas legendarios como "Don\'t Stop \'Til You Get Enough" y "Rock with You" destacan por arreglos de metales refinados, líneas de bajo infecciosas y una interpretación vocal llena de brío y libertad.',
      'El álbum sentó las bases estilísticas y técnicas de la música pop moderna, abriendo el camino para el fenómeno global sin precedentes que vendría tres años después con Thriller.'
    ]
  },
  {
    id: 'alb-6',
    titulo: 'The Razors Edge',
    artista: 'AC/DC',
    anio: 1990,
    precio: 9990,
    imagen: '/img/acdc.jpg',
    genero: 'Hard Rock / Heavy Metal',
    calificacion: '9.0 / 10',
    description: 'The Razors Edge (1990) es el decimosegundo álbum de estudio de la banda australiana de hard rock AC/DC. Producido por Bruce Fairbairn, significó un masivo retorno a las listas de éxitos mundiales gracias a sencillos legendarios como "Thunderstruck".',
    criticaCorta: 'Una inyección de adrenalina pura en plena década de los 90. Muestra a Angus Young en su máxima expresión técnica, entregando himnos de estadio cargados de energía, precisión y distorsión clásica.',
    analisisExtendido: [
      'A comienzos de la década de 1990, AC/DC revitalizó su sonido histórico trabajando junto al afamado productor Bruce Fairbairn. El resultado fue The Razors Edge, un álbum potente que devolvió a la banda a la primera línea del rock mundial.',
      'El inicio con el ya mítico arpegio de guitarra de Angus Young en "Thunderstruck" es una de las introducciones más icónicas en la historia del hard rock, convirtiéndose de inmediato en un himno de estadios.',
      'La voz desgarradora de Brian Johnson junto a la muralla de guitarras rítmicas de Malcolm Young entregan una producción contundente, directa y sin añadidos innecesarios.'
    ]
  },
  {
    id: 'alb-7',
    titulo: 'YHLQMDLG',
    artista: 'Bad Bunny',
    anio: 2020,
    precio: 13990,
    imagen: '/img/badbunny.webp',
    genero: 'Reggaetón / Trap Latino / Synthwave',
    calificacion: '9.1 / 10',
    description: 'YHLQMDLG (acrónimo de "Yo Hago Lo Que Me Da La Gana", 2020) es el segundo álbum de estudio en solitario del puertorriqueño Bad Bunny. Un homenaje a las perreadas de marquesina de los años 2000 que mezcla trap, synthwave y dancehall.',
    criticaCorta: 'Un fenómeno cultural sin precedentes que revitalizó la música urbana latina. Su versatilidad de estilos y nostalgia bien ejecutada transformaron las reglas de la industria global del pop.',
    analisisExtendido: [
      'Con YHLQMDLG, Benito Martínez Ocasio rindió homenaje a la época dorada del reguetón boricua mientras experimentaba con sintetizadores ocheros, indie pop y trap contemporáneo.',
      'El proyecto demostró la capacidad de Bad Bunny para equilibrar canciones festivas e himnos de discoteca ("Safaera", "La Difícil") con piezas melancólicas e introspectivas ("Si Veo A Tu Mamá", "Un Peso").',
      'El éxito masivo del álbum rompió récords históricos en plataformas de streaming a nivel global, consolidando al artista como una de las figuras más influyentes del pop internacional en español.'
    ]
  },
  {
    id: 'alb-8',
    titulo: 'The Dark Side Of The Moon',
    artista: 'Pink Floyd',
    anio: 1973,
    precio: 15990,
    imagen: '/img/pinkfloyd.png',
    genero: 'Rock Progresivo / Psicodélico',
    calificacion: '10 / 10',
    description: 'The Dark Side of the Moon (1973) es el octavo álbum de estudio de Pink Floyd. Un álbum conceptual monumental que explora temas existenciales como el paso del tiempo, la codicia, el conflicto mental y la muerte.',
    criticaCorta: 'Una de las mayores hazañas técnicas y artísticas en la historia de la grabación musical. Su fluidez narrativa y producción impecable continúan fijando el estándar del rock progresivo universal.',
    analisisExtendido: [
      'The Dark Side of the Moon es ampliamente reconocido como una de las cumbres creativas del siglo XX. Un álbum conceptual continuo que aborda las presiones de la vida moderna: el tiempo, el dinero, el aislamiento y la locura.',
      'Bajo la brillante ingeniería de sonido de Alan Parsons en los estudios Abbey Road, Pink Floyd integró sintetizadores VCS3, grabaciones de campo, voces habladas y solos de guitarra inolvidables de David Gilmour.',
      'Pistas como "Time", "Money" o "Us and Them" mantienen una vigencia asombrosa tanto en temática como en calidad audiófila, haciendo de este vinilo una pieza imprescindible para cualquier coleccionista.'
    ]
  }
];

export const Resenas = () => {
  // Cargar reseñas comunitarias desde localStorage o JSON inicial
  const [todasLasResenas] = useState(() => {
    const guardadas = localStorage.getItem('resenasComunidad');
    return guardadas ? JSON.parse(guardadas) : initialResenasComunidad;
  });

  return (
    <main className="py-5 bg-dark text-light">
      <section className="text-center mb-5">
        <h1 className="display-5 fw-bold text-uppercase">Reseñas de Álbumes</h1>
        <p className="lead text-muted">Análisis crítico e historia de los grandes discos de la música.</p>
      </section>

      <section className="container">
        <div className="row g-4">
          {resenasData.map((item) => {
            // Filtrar y calcular promedio de la comunidad por cada álbum
            const comunidadResenasAlbum = todasLasResenas.filter(
              (resena) => resena.albumId === item.id
            );

            const promedioComunidad =
              comunidadResenasAlbum.length > 0
                ? (
                    comunidadResenasAlbum.reduce((acc, r) => acc + Number(r.puntuacion), 0) /
                    comunidadResenasAlbum.length
                  ).toFixed(1)
                : 'N/A';

            return (
              <div key={item.id} className="col-12 col-md-6">
                <div className="bg-secondary bg-opacity-10 p-4 rounded shadow border border-secondary h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="row g-3 align-items-center mb-3">
                      <div className="col-4">
                        <img
                          src={item.imagen}
                          alt={item.titulo}
                          className="img-fluid rounded border border-secondary shadow-sm"
                          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-8">
                        <span className="badge bg-danger text-uppercase mb-1">{item.genero}</span>
                        <h4 className="fw-bold text-uppercase mb-1">{item.titulo}</h4>
                        <h6 className="text-danger fw-bold mb-2">
                          {item.artista} ({item.anio})
                        </h6>

                        {/* CALIFICACIONES COMPARTIDAS (CRÍTICA Y COMUNIDAD) */}
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                          <span className="badge bg-dark border border-warning text-warning" title="Calificación Crítica">
                            ★ Crítica: {item.calificacion}
                          </span>
                          <span className="badge bg-dark border border-info text-info" title="Calificación Comunidad">
                            ♥ Comunidad: {promedioComunidad} / 10
                          </span>
                        </div>

                        <div>
                          <span className="badge bg-success text-light">
                            ${item.precio ? item.precio.toLocaleString('es-CL') : '0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-secondary small mb-4">{item.description}</p>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <Link
                      to={`/resena/${item.id}`}
                      className="btn btn-outline-light w-100 fw-bold text-uppercase py-2"
                    >
                      Leer Reseña Crítica Completa <i className="bi bi-arrow-right ms-1"></i>
                    </Link>

                    {item.spotifyUrl && (
                      <a
                        href={item.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-success w-100 fw-bold text-uppercase"
                      >
                        <i className="bi bi-spotify me-1"></i> Escuchar en Spotify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};