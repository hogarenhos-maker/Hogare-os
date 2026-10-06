/* ==========================================================================
   HOGAREÑOS — Capa de acceso a datos (API de tablas)
   ==========================================================================
   Todas las vistas leen datos mediante estas funciones. Si la API de tablas
   no está disponible (por ejemplo, al abrir el archivo en local sin backend),
   se usa un conjunto de datos de respaldo embebido para que el sitio siempre
   se vea completo.
   ========================================================================== */

const SEED = {
artistas: [
  { id: "a1", nombre: "Simón Pérez", rol: "Cantautor / Productor", bio: "Creador de Hogarenhos. Producción, grabación, arreglos, composición, mezcla y master. Autor de 'Lo que es' y 'Saber'.", video_url: "https://www.youtube.com/@Hogarenhos", genero: "Canción de autor", ciudad: "Lago Puelo / Chimpay", instagram: "https://instagram.com/saimonizo", destacado: true, orden: 1 },
  { id: "a2", nombre: "Chicho Negri", rol: "Músico", bio: "Voz, armónica y guitarra. Autor del EP 'DEHISCENTE' (La de las frutillas, Una misma historia).", video_url: "https://www.youtube.com/@Hogarenhos", genero: "Folclore / Autor", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: true, orden: 2 },
  { id: "a3", nombre: "Arthuro Mar.", rol: "Artista", bio: "Autor de 'La urgencia'. Presencia escénica y narrativa sonora en la red Hogarenhos.", video_url: "https://www.youtube.com/@Hogarenhos", genero: "Canción", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: true, orden: 3 },
  { id: "a4", nombre: "Juan Rossa", rol: "Autor", bio: "'Diarios del Silencio'. Registra el silencio y lo convierte en palabra cantada.", video_url: "https://www.youtube.com/@Hogarenhos", genero: "Canción", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: false, orden: 4 },
  { id: "a5", nombre: "La banda de la Ronda", rol: "Proyecto colectivo", bio: "'Cuidaremos la tierra'. Un proyecto pensado con la infancia y la comunidad para sembrar conciencia.", video_url: "https://www.youtube.com/@Hogarenhos", genero: "Infancias", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: false, orden: 5 }
],
lanzamientos: [
  { id: "l1", titulo: "Saltar", artista: "Simón Pérez", tipo: "Single", anio: 2020, descripcion: "Tema destacado del álbum Semillas. Un viaje sonoro que invita a la introspección.", link: "https://www.youtube.com/watch?v=MKHDZIwmU-E", portada_hue: 28, orden: 1 },
  { id: "l2", titulo: "DEHISCENTE", artista: "Chicho Negri", tipo: "EP", anio: 2024, descripcion: "Nuevo EP disponible. Incluye 'La de las frutillas' y 'Una misma historia'. Apertura espontánea y natural.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 40, orden: 2 },
  { id: "l3", titulo: "La urgencia", artista: "Arthuro Mar.", tipo: "Videoclip", anio: 2024, descripcion: "Video oficial. Una pieza que captura la intensidad del camino y la búsqueda sonora.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 18, orden: 3 },
  { id: "l4", titulo: "Saber", artista: "Simón Pérez, Sergio Cuello, Ailin Melillan", tipo: "Single", anio: 2024, descripcion: "Colaboración fresca que une voces y perspectivas en una nueva canción.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 96, orden: 4 },
  { id: "l5", titulo: "Cuidaremos la tierra", artista: "La banda de la Ronda", tipo: "Single", anio: 2024, descripcion: "Canción colectiva con las infancias: un compromiso cantado con el planeta.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 110, orden: 5 }
],
  audiovisuales: [
audiovisuales: [
  { id: "v1", titulo: "Lo que es (en Hogares)", artista: "Simón Pérez", categoria: "HOGARES", descripcion: "Registro audiovisual en vivo de una canción, grabada en el corazón de un hogar.", ubicacion: "Lago Puelo", anio: 2024, link: "https://www.youtube.com/watch?v=pUPR2Zvv44E", duracion: "04:20", portada_hue: 30, orden: 1 },
  { id: "v2", titulo: "DEHISCENTE (Full EP)", artista: "Chicho Negri", categoria: "CONCIERTO", descripcion: "Registro de la presentación del EP, con voz, armónica y guitarra en un formato íntimo.", ubicacion: "Estudio Hogarenhos", anio: 2024, link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", duracion: "12:00", portada_hue: 20, orden: 2 },
  { id: "v3", titulo: "La urgencia (Video Oficial)", artista: "Arthuro Mar.", categoria: "SESIONES", descripcion: "Sesión audiovisual que captura la esencia cruda y directa de la canción.", ubicacion: "Argentina", anio: 2024, link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", duracion: "03:45", portada_hue: 350, orden: 3 },
    { id: "v4", titulo: "Noche de peña", artista: "Mario Pérez", categoria: "CONCIERTO", descripcion: "Canción compartida a sala llena, con el público cantando el estribillo.", ubicacion: "Argentina", anio: 2023, link: "https://www.youtube.com/@Hogarenhos/", duracion: "05:20", portada_hue: 8, orden: 4 },
    { id: "v5", titulo: "Café de la esquina", artista: "Hogareños + Local", categoria: "LOCALES", descripcion: "Dos audiovisuales grabados junto a un local, compartiendo promoción entre ambos.", ubicacion: "Bar notable", anio: 2024, link: "https://www.youtube.com/@Hogarenhos/", duracion: "07:30", portada_hue: 45, orden: 5 },
    { id: "v6", titulo: "Sesiones de invierno", artista: "Colectivo Hogareños", categoria: "SESIONES", descripcion: "Tres canciones reunidas en un mismo audiovisual, con la casa como estudio.", ubicacion: "Casa Hogareños", anio: 2024, link: "https://www.youtube.com/@Hogarenhos/", duracion: "12:40", portada_hue: 200, orden: 6 },
    { id: "v7", titulo: "Sesiones de verano", artista: "Colectivo Hogareños", categoria: "SESIONES", descripcion: "Tres canciones al aire libre, con artistas del sello rotando instrumentos.", ubicacion: "Patio", anio: 2025, link: "https://www.youtube.com/@Hogarenhos/", duracion: "13:15", portada_hue: 160, orden: 7 }
  ],
  ilustraciones: [
    { id: "i1", titulo: "Saltar aunque dé miedo", ilustrador: "Ilustrador/a invitado", cancion: "Saltar — Simón Pérez", frase: "Un viaje no depende de su tiempo, como cuando una búsqueda se transforma en sueño real.", descripcion: "Interpretación visual del mensaje de la frase, con técnica mixta sobre papel.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 34, orden: 1 },
    { id: "i2", titulo: "La verdad que callamos", ilustrador: "Ilustrador/a invitado", cancion: "La verdad — Juan Rossa", frase: "Hay silencios que gritan más que cualquier voz.", descripcion: "Una pieza que traduce el silencio en textura y color.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 260, orden: 2 },
    { id: "i3", titulo: "Cuidar la tierra es cuidarnos", ilustrador: "Ilustrador/a invitado", cancion: "Cuidaremos la tierra — La banda de la Ronda", frase: "La tierra no nos pertenece, nosotros pertenecemos a la tierra.", descripcion: "Ilustración pensada para las infancias, llena de semillas y manos.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 110, orden: 3 },
    { id: "i4", titulo: "Asombro cotidiano", ilustrador: "Ilustrador/a invitado", cancion: "Sentires y Asombros — Mario Pérez", frase: "Lo cotidiano es el milagro que aprendimos a no mirar.", descripcion: "Collage digital que celebra lo pequeño.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 50, orden: 4 }
  ],
  proyecto: [
    { id: "p1", nombre: "Volumen II: Voces del Hogar", descripcion: "Compilado audiovisual con 10 artistas de la red, grabado en estudio y en hogares de distintas provincias. Un disco-documental que reúne las voces del sello en un solo hogar sonoro.", meta: 3500, recaudado: 1240, etapa: "En construcción", moneda: "USD", detalle: "Tu aporte financia: grabación y mezcla (40%), registro audiovisual y edición (35%), arte y prensa (15%), distribución digital (10%). Cada aporte recibe agradecimiento en los créditos y acceso anticipado al estreno.", activo: true }
  ],
  aportes: [
    { id: "ap1", nombre: "Una vecina del barrio", monto: 50, mensaje: "Por más canciones que abracen.", fecha: "2025-09-04T12:00:00.000Z" },
    { id: "ap2", nombre: "Colectivo amigo", monto: 300, mensaje: "Seguimos construyendo hogar.", fecha: "2025-09-07T12:00:00.000Z" },
    { id: "ap3", nombre: "Anónimo", monto: 120, mensaje: "Gracias por sostener el arte independiente.", fecha: "2025-09-10T12:00:00.000Z" }
  ],
  ronda: [
    { id: "r1", titulo: "Ronda de canciones abierta", tipo: "Encuentro", fecha: "2025-10-15T20:00:00.000Z", lugar: "Patio de la Casa Hogareños", modalidad: "Mixta", descripcion: "Cada persona trae una canción, propia o ajena. Micrófono abierto presencial y transmisión en vivo por el canal.", link: "https://www.youtube.com/@Hogarenhos/" },
    { id: "r2", titulo: "Taller: cantar lo que sentimos", tipo: "Taller", fecha: "2025-10-22T19:00:00.000Z", lugar: "Virtual", modalidad: "Virtual", descripcion: "Encuentro para escribir y musicalizar emociones, con artistas del sello como guías.", link: "" },
    { id: "r3", titulo: "Muestra de ilustradores", tipo: "Muestra", fecha: "2025-10-30T18:00:00.000Z", lugar: "Galería local", modalidad: "Presencial", descripcion: "Exposición de las obras que interpretan frases de nuestro cancionero.", link: "" },
    { id: "r4", titulo: "Peña del Hogar", tipo: "Concierto", fecha: "2025-11-08T21:00:00.000Z", lugar: "Salón comunitario", modalidad: "Presencial", descripcion: "Concierto colectivo con artistas del sello y locales amigos. Entrada a la gorra.", link: "https://www.youtube.com/@Hogarenhos/" }
  ],
  mensajes: [
    { id: "m1", nombre: "Marina", mensaje: "\"Saltar\" me acompañó en un momento difícil. Gracias por sostener este espacio.", ciudad: "Córdoba", fecha: "2025-09-08T12:00:00.000Z" },
    { id: "m2", nombre: "Tomás", mensaje: "Descubrí el canal buscando música nueva y me quedé por la calidez. Sigan así.", ciudad: "Rosario", fecha: "2025-09-11T12:00:00.000Z" }
  ],
  servicios: [
    { id: "s1", nombre: "Single", categoria: "Grabaciones en estudio", descripcion: "Tu canción grabada, mezclada y masterizada, lista para publicar en todas las plataformas.", precio: 180, moneda: "USD", incluye: "Grabación de voces e instrumentos · Mezcla profesional · Master · Distribución digital", entrega: "5 a 7 días", icono: "🎵", destacado: true, orden: 1 },
    { id: "s2", nombre: "EP", categoria: "Grabaciones en estudio", descripcion: "De 3 a 5 canciones con identidad propia. La puerta perfecta para mostrar un proyecto completo.", precio: 650, moneda: "USD", incluye: "Producción musical · Grabación · Mezcla y master · Arte de tapa · Distribución", entrega: "3 a 4 semanas", icono: "💿", destacado: false, orden: 2 },
    { id: "s3", nombre: "Disco / Álbum", categoria: "Grabaciones en estudio", descripcion: "De 8 a 12 canciones. Una obra integral, cuidada de principio a fin.", precio: 1400, moneda: "USD", incluye: "Dirección artística · Producción · Grabación · Mezcla y master · Arte · Prensado digital", entrega: "6 a 8 semanas", icono: "📀", destacado: false, orden: 3 },
    { id: "s4", nombre: "Videoclip", categoria: "Grabaciones en estudio", descripcion: "Producción audiovisual de una canción: guion, rodaje y edición.", precio: 450, moneda: "USD", incluye: "Idea y guion · Rodaje · Edición y color · Entrega para redes y YouTube", entrega: "2 a 3 semanas", icono: "🎬", destacado: false, orden: 4 },
    { id: "s5", nombre: "HOGARES", categoria: "Audiovisuales", descripcion: "Registro audiovisual en vivo de una canción en un hogar. Íntimo, cálido, real.", precio: 150, moneda: "USD", incluye: "Registro en locación · Edición · Publicación en el canal del sello", entrega: "7 a 10 días", icono: "🏡", destacado: false, orden: 5 },
    { id: "s6", nombre: "CONCIERTO", categoria: "Audiovisuales", descripcion: "Registro de una canción en un concierto o ante espectadores.", precio: 180, moneda: "USD", incluye: "Cobertura multicámara · Audio de sala · Edición · Publicación", entrega: "7 a 10 días", icono: "🎤", destacado: false, orden: 6 },
    { id: "s7", nombre: "LOCALES", categoria: "Audiovisuales", descripcion: "Dos audiovisuales grabados junto a un local, compartiendo la promoción entre ambos.", precio: 300, moneda: "USD", incluye: "2 registros audiovisuales · Difusión conjunta con el local · Publicación cruzada", entrega: "10 a 14 días", icono: "☕", destacado: false, orden: 7 },
    { id: "s8", nombre: "SESIONES", categoria: "Audiovisuales", descripcion: "Tres canciones reunidas en un mismo audiovisual, con estética de sesión en vivo.", precio: 420, moneda: "USD", incluye: "3 canciones · Dirección de arte · Rodaje · Edición · Publicación", entrega: "2 a 3 semanas", icono: "🎶", destacado: false, orden: 8 },
    { id: "s9", nombre: "Artista del Hogar", categoria: "Combos", descripcion: "El paquete de entrada: un single en estudio + un audiovisual HOGARES + difusión en la red.", precio: 280, moneda: "USD", incluye: "1 single grabado y masterizado · 1 audiovisual HOGARES · Difusión en el sello", entrega: "3 semanas", icono: "🔥", destacado: true, orden: 9 },
    { id: "s10", nombre: "Ciclo completo", categoria: "Combos", descripcion: "EP + Sesiones + arte y prensa. Todo el recorrido del sello para lanzar un proyecto.", precio: 1100, moneda: "USD", incluye: "1 EP · 1 audiovisual SESIONES · Arte de tapa · Prensa y difusión · Acompañamiento integral", entrega: "5 a 6 semanas", icono: "🌱", destacado: false, orden: 10 }
  ],
  semillero: [
    { id: "se1", titulo: "Estribillo que me ronda hace semanas", autor: "Camila R.", tipo: "Melodía", descripcion: "Tengo la melodía y el estribillo pero me falta la letra. Me encantaría que alguien la complete conmigo.", estado: "Semilla", etiquetas: "canción, colaboración, letra", fecha: "2025-09-20T12:00:00.000Z" },
    { id: "se2", titulo: "Poema: 'Casa de barro'", autor: "Ezequiel M.", tipo: "Poesía", descripcion: "Escribo desde chico pero nunca me animé a mostrarlo. Lo comparto por si a alguien le sirve para musicar.", estado: "En germinación", etiquetas: "poesía, letra", fecha: "2025-09-18T12:00:00.000Z" },
    { id: "se3", titulo: "Beat de chacarera con sintetizadores", autor: "Tomás L.", tipo: "Instrumental", descripcion: "Mezclé folclore con electrónica. Busco voces para probar algo nuevo juntos.", estado: "Floreciendo", etiquetas: "folclore, electrónica, instrumental", fecha: "2025-09-15T12:00:00.000Z" },
    { id: "se4", titulo: "Primera canción de mi hija de 9 años", autor: "Familia Gómez", tipo: "Canción", descripcion: "Compuso una canción sobre cuidar los árboles. Nos gustaría grabarla con el sello.", estado: "Semilla", etiquetas: "infancias, naturaleza", fecha: "2025-09-12T12:00:00.000Z" },
    { id: "se5", titulo: "Quiero producir un ciclo de sesiones en mi pueblo", autor: "Belén A.", tipo: "Proyecto", descripcion: "Soy de un pueblo chico y sueño con armar sesiones en vivo con artistas locales. Necesito equipo y guía.", estado: "En germinación", etiquetas: "producción, comunidad, sesiones", fecha: "2025-09-10T12:00:00.000Z" },
    { id: "se6", titulo: "Grabación casera que quiere sonar mejor", autor: "Julián P.", tipo: "Grabación", descripcion: "Grabé un demo con el celular. Me gustaría aprender a mezclar o que alguien me dé una mano.", estado: "Semilla", etiquetas: "mezcla, aprendizaje", fecha: "2025-09-08T12:00:00.000Z" }
  ],
  tablon: [
    { id: "t1", modalidad: "Busco", titulo: "Busco letrista para mis melodías", detalle: "Compongo melodías de guitarra pero me cuesta escribir letras. Busco alguien para crear juntos a distancia.", autor: "Nahuel", contacto: "vía el sello", etiquetas: "letra, colaboración", fecha: "2025-09-20T12:00:00.000Z" },
    { id: "t2", modalidad: "Ofrezco", titulo: "Ofrezco mezcla y mastering a bajo costo", detalle: "Tengo estudio en casa y quiero ayudar a artistas que recién empiezan. Tarifas solidarias para el hogar.", autor: "Estudio La Pieza", contacto: "vía el sello", etiquetas: "mezcla, estudio", fecha: "2025-09-19T12:00:00.000Z" },
    { id: "t3", modalidad: "Busco", titulo: "Busco banda para tocar mis canciones", detalle: "Tengo un repertorio de 8 canciones y quiero armarlo en vivo. Soy de zona sur.", autor: "Rocío", contacto: "vía el sello", etiquetas: "banda, vivo", fecha: "2025-09-16T12:00:00.000Z" },
    { id: "t4", modalidad: "Ofrezco", titulo: "Ofrezco ilustraciones para tapas de disco", detalle: "Soy ilustradora y quiero sumarme a proyectos del sello. Mando portfolio por mail.", autor: "Luz", contacto: "vía el sello", etiquetas: "arte, tapa, ilustración", fecha: "2025-09-14T12:00:00.000Z" },
    { id: "t5", modalidad: "Busco", titulo: "Busco local para grabar un audiovisual", detalle: "Tengo un bar y quiero grabar una sesión acústica con artistas del sello. ¿Alguien se suma?", autor: "Bar El Fogón", contacto: "vía el sello", etiquetas: "local, sesiones", fecha: "2025-09-11T12:00:00.000Z" }
  ],
  cursos: [
    { id: "c1", titulo: "Canto con el cuerpo", docente: "Belu Diehl", categoria: "Música", nivel: "Inicial", descripcion: "Encontrá tu voz desde la respiración y el movimiento, sin miedo a equivocarte. Un espacio para cantar quien sos.", temario: "Respiración y apoyo · Afinación y oído · Repertorio propio · Confianza escénica", duracion: "6 encuentros · 1 h 30", modalidad: "Virtual", precio: 90, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 20, icono: "🎤", destacado: true, orden: 1 },
    { id: "c2", titulo: "Guitarra desde cero", docente: "Simón Pérez", categoria: "Música", nivel: "Inicial", descripcion: "Tus primeros acordes y tus primeras canciones. No hace falta experiencia previa ni instrumento caro.", temario: "Acordes básicos · Ritmos · Cifrado · Tus primeras 5 canciones", duracion: "8 encuentros · 1 h", modalidad: "Virtual", precio: 120, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 25, icono: "🎸", destacado: false, orden: 2 },
    { id: "c3", titulo: "Composición de canciones", docente: "Mario Pérez", categoria: "Música", nivel: "Intermedio", descripcion: "Cómo una idea se convierte en canción: estructura, melodía, armonía y ese algo que la hace propia.", temario: "Forma y estructura · Melodía y letra juntas · Armonía al servicio de la emoción · Revisión de obras", duracion: "6 encuentros · 2 h", modalidad: "Mixta", precio: 150, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 15, icono: "🎼", destacado: true, orden: 3 },
    { id: "c4", titulo: "Producción musical en casa", docente: "Equipo Hogareños", categoria: "Música", nivel: "Intermedio", descripcion: "Grabá, mezclá y publicá tu música con lo que ya tenés. Del celular al estudio hogareño.", temario: "Home studio básico · Grabación de voces · Mezcla esencial · Distribución digital", duracion: "8 encuentros · 1 h 30", modalidad: "A tu ritmo", precio: 180, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 30, icono: "🎚️", destacado: false, orden: 4 },
    { id: "c5", titulo: "Escritura de letras y poesía", docente: "Juan Rossa", categoria: "Humanidad", nivel: "Todos los niveles", descripcion: "Poner en palabras lo que sentimos. Un taller de escritura para transformar la experiencia en canción.", temario: "Imagen y metáfora · El ritmo de la palabra · Escribir desde la verdad · Compartir y editar", duracion: "6 encuentros · 1 h 30", modalidad: "Virtual", precio: 110, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 20, icono: "✍️", destacado: false, orden: 5 },
    { id: "c6", titulo: "Escucha profunda: el arte de acompañar", docente: "Equipo Hogareños", categoria: "Humanidad", nivel: "Todos los niveles", descripcion: "Aprender a escuchar(se) y a sostener a otras personas. Herramientas humanas para el cuidado y la contención.", temario: "Escucha activa · Empatía y límites · Acompañar sin invadir · Cuidado del que cuida", duracion: "4 encuentros · 2 h", modalidad: "Virtual", precio: 0, precio_socio: 0, moneda: "USD", acceso: "Abierto", cupos: 0, icono: "🤲", destacado: true, orden: 6 },
    { id: "c7", titulo: "Cuidar la voz, cuidar la palabra", docente: "Belu Diehl", categoria: "Humanidad", nivel: "Inicial", descripcion: "Higiene vocal, expresión y bienestar. Para quienes usan la voz como herramienta y como hogar.", temario: "Anatomía de la voz · Calentamiento · Voz hablada y cantada · Descanso y cuidado", duracion: "4 encuentros · 1 h", modalidad: "Virtual", precio: 70, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 20, icono: "🫁", destacado: false, orden: 7 },
    { id: "c8", titulo: "El hogar como refugio", docente: "Equipo Hogareños", categoria: "Humanidad", nivel: "Todos los niveles", descripcion: "Un espacio de bienestar y creatividad: habitar el hogar, la casa propia y la casa interna, con conciencia.", temario: "Hogar y bienestar · Creatividad cotidiana · Rituales y vínculos · Cerrar y abrir ciclos", duracion: "5 encuentros · 1 h 30", modalidad: "Mixta", precio: 0, precio_socio: 0, moneda: "USD", acceso: "Abierto", cupos: 40, icono: "🏠", destacado: false, orden: 8 },
    { id: "c9", titulo: "Introducción al registro audiovisual", docente: "Equipo Hogareños", categoria: "Oficios", nivel: "Inicial", descripcion: "Filmar tu propia música con calidad: cámara, luz, sonido y edición. El audiovisual como otra forma de cantar.", temario: "Lenguaje audiovisual · Luz y encuadre · Sonido directo · Edición y publicación", duracion: "6 encuentros · 2 h", modalidad: "Mixta", precio: 160, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 18, icono: "🎥", destacado: false, orden: 9 },
    { id: "c10", titulo: "Ilustración para canciones", docente: "Colectivo de Ilustradores", categoria: "Oficios", nivel: "Todos los niveles", descripcion: "Traducir una canción en imagen. Del mensaje de una frase a una obra que la acompaña y la difunde.", temario: "Leer una canción · Bocetos y color · Técnica y estilo · Del dibujo a la tapa", duracion: "5 encuentros · 1 h 30", modalidad: "Virtual", precio: 100, precio_socio: 0, moneda: "USD", acceso: "Suscriptores", cupos: 25, icono: "🎨", destacado: false, orden: 10 }
  ],
  planes: [
    { id: "pl1", nombre: "Vecino/a", publico: "Para quien recién llega", precio: 5, moneda: "USD", periodo: "por mes", beneficios: "Acceso a los cursos abiertos · Participar del muro y el Tablón · Semillero completo · Newsletter del hogar", destacado: false, orden: 1 },
    { id: "pl2", nombre: "Habitante del Hogar", publico: "Para quien quiere formarse", precio: 12, moneda: "USD", periodo: "por mes", beneficios: "Todos los cursos del sello sin costo · 20% off en la Productora · Acceso anticipado a los estrenos · Biblioteca de recursos y partituras", destacado: true, orden: 2 },
    { id: "pl3", nombre: "Sostén del Hogar", publico: "Para quien sostiene la red", precio: 25, moneda: "USD", periodo: "por mes", beneficios: "Todo lo anterior · Una sesión en vivo mensual con artistas del sello · Tu nombre en los créditos · Una obra digital exclusiva por mes · Voz y voto en la Ronda", destacado: false, orden: 3 }
  ]
};

const API = {
  /** Lista registros de una tabla con fallback al dataset local. */
  async list(table, params = {}) {
    const qs = new URLSearchParams(params).toString();
    try {
      const res = await fetch(`tables/${table}${qs ? "?" + qs : ""}`, {
        headers: { Accept: "application/json" }
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      const rows = Array.isArray(json) ? json : (json.data || []);
      if (!rows.length && SEED[table]) return SEED[table];
      return rows;
    } catch (err) {
      console.warn(`[HOGAREÑOS] API no disponible para "${table}", usando datos locales.`, err.message);
      return SEED[table] || [];
    }
  },

  /** Crea un registro. Devuelve el registro creado. */
  async create(table, data) {
    const res = await fetch(`tables/${table}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("No se pudo guardar (HTTP " + res.status + ")");
    return res.json();
  }
};

/** Ordena un array por el campo `orden` de forma ascendente y estable. */
function byOrden(rows) {
  return [...rows].sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
}

/** Escapa texto para insertarlo de forma segura en HTML. */
function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
