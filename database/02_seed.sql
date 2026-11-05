USE musicmania;

INSERT INTO PRODUCTO (id_producto, categoria, titulo, artista, descripcion, sku, precio, precio_antes, stock, imagen, anio, spotify_url) VALUES
-- Vinilos
('alb-1','vinilos','Naturaleza Muerta','Ley 20 mil','Álbum oficial de Ley 20 mil, edición especial en vinilo.','VINILO-ALB-1',17990,NULL,10,'/img/Ley20mil.jpg',2011,'https://open.spotify.com/intl-es/track/42qpPgUmA083IZj4qD3Wzn'),
('alb-2','vinilos','Rap con R de Revolucion','Portavoz','Álbum oficial de Portavoz, edición especial en vinilo.','VINILO-ALB-2',14990,NULL,10,'/img/RdeRevolucion.jpg',2012,'https://open.spotify.com/intl-es/album/4XvUXpek6UQmjm5ig49yL7?highlight=spotify:track:6vmrsiaeNq7LpiGdvB2bJT'),
('alb-3','vinilos','El Circulo','Kase.O','Álbum oficial de Kase.O, edición especial en vinilo.','VINILO-ALB-3',19990,NULL,10,'/img/Elcirculo.jpg',2016,'https://open.spotify.com/intl-es/album/5k8yhgvK6d0hTI28zIC3NA'),
('alb-4','vinilos','Teatro d''ira','Maneskin','Álbum oficial de Maneskin, edición especial en vinilo.','VINILO-ALB-4',13990,NULL,10,'/img/maneskin.jpg',2017,'https://open.spotify.com/intl-es/album/7KF1Ain9mYYlg5M46g0i4A'),
('alb-5','vinilos','Off The Wall','Michael Jackson','Álbum oficial de Michael Jackson, edición especial en vinilo.','VINILO-ALB-5',12990,NULL,10,'/img/michaelJackson.webp',1979,'https://open.spotify.com/intl-es/album/2ZytN2cY4Zjrr9ukb2rqTP'),
('alb-6','vinilos','The Razors Edge','AC/DC','Álbum oficial de AC/DC, edición especial en vinilo.','VINILO-ALB-6',9990,NULL,10,'/img/acdc.jpg',1990,'https://open.spotify.com/intl-es/album/4vu7F6h90Br1ZtYYaqfITy'),
('alb-7','vinilos','YHLQMDLG','Bad Bunny','Álbum oficial de Bad Bunny, edición especial en vinilo.','VINILO-ALB-7',13990,NULL,10,'/img/badbunny.webp',2020,'https://open.spotify.com/intl-es/album/5lJqux7orBlA1QzyiBGti1'),
('alb-8','vinilos','The Dark Side Of The Moon','Pink Floyd','Álbum oficial de Pink Floyd, edición especial en vinilo.','VINILO-ALB-8',15990,NULL,10,'/img/pinkfloyd.png',1973,'https://open.spotify.com/intl-es/album/4LH4d3cOWNNsVw41Gqt2kv'),
-- Equipos
('eq-1','equipos','Amplificador de Guitarra Marshall','Marshall','Amplificador de alta fidelidad; con tono cálido, distorsión clásica y potencia ideal para ensayos y estudio.','AUDIO-MARSHALL-50W',399990,NULL,8,'/img/amplificadorMarshall.jpg',NULL,NULL),
('eq-2','equipos','Micrófono de Condensador','Pro Audio','Micrófono profesional de condensador, captura sonidos nítidos y detallados para grabaciones de voz e instrumentos.','MIC-COND-PRO',149990,NULL,12,'/img/microfonopro.jpg',NULL,NULL),
('eq-3','equipos','Controladora DJ Pro','Pioneer','Controladora DJ con jogwheels de alta precisión y mezcla multicanal integrada.','DJ-CTRL-PRO',399990,NULL,5,'/img/tornamesa.jpg',NULL,NULL),
('eq-4','equipos','Parlante de P.A. Profesional','JBL','Parlante activo de alta potencia ideal para eventos y presentaciones en vivo.','SPK-PA-PRO',199990,NULL,10,'/img/parlantejbl.jpg',NULL,NULL),
('eq-5','equipos','Tornamesa Estéreo Retro Hi-Fi','Vintage Sound','Tornamesa estilo retro con reproducción a varias velocidades y salida RCA/Bluetooth.','TRN-RETRO-HIFI',99990,NULL,7,'/img/tocadiscos.jpg',NULL,NULL),
('eq-6','equipos','Parlantes Monitor Audio Bronze','Audio Bronze','Monitores de estudio con excelente respuesta de frecuencia para mezcla y producción.','SPK-MONITOR-BRZ',149990,NULL,4,'/img/parlante2.jpg',NULL,NULL),
-- Accesorios
('acc-1','accesorios','Limpiador de Vinilos v1','MusicMania','Kit de limpieza para el cuidado de tus vinilos.','ACC-LIMP-V1',15990,NULL,15,'/img/limpiadorVinilos.jpg',NULL,NULL),
('acc-2','accesorios','Limpiador de Vinilos Pro','MusicMania','Kit de limpieza profesional para el cuidado de tus vinilos.','ACC-LIMP-PRO',17990,NULL,15,'/img/Limpiavinilo2.jpg',NULL,NULL),
-- Ofertas (no aparecen en el catálogo normal; las usa la página /ofertas)
('of-101','ofertas','Tornamesa Retro Vintage','Vintage Sound','Oferta especial por tiempo limitado.','OFERTA-101',89990,120000,10,'/img/tocadiscos.jpg',NULL,NULL),
('of-102','ofertas','Parlante de P.A. Profesional','JBL','Oferta especial por tiempo limitado.','OFERTA-102',159992,199990,10,'/img/parlantejbl.jpg',NULL,NULL);

-- Los usuarios (con contraseñas hasheadas) se cargan con:  cd backend && npm run seed:usuarios
