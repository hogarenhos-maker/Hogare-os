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
    { id: "l1", titulo: "Lo que es", artista: "Simón Pérez", tipo: "Single", anio: 2020, descripcion: "Tema destacado del álbum Semillas. Un viaje sonoro que invita a la introspección.", link: "https://www.youtube.com/watch?v=MKHDZIwmU-E", portada_hue: 28, orden: 1 },
    { id: "l2", titulo: "DEHISCENTE", artista: "Chicho Negri", tipo: "EP", anio: 2024, descripcion: "Nuevo EP disponible. Incluye 'La de las frutillas' y 'Una misma historia'. Apertura espontánea y natural.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 40, orden: 2 },
    { id: "l3", titulo: "La urgencia", artista: "Arthuro Mar.", tipo: "Videoclip", anio: 2024, descripcion: "Video oficial. Una pieza que captura la intensidad del camino y la búsqueda sonora.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 18, orden: 3 },
    { id: "l4", titulo: "Saber", artista: "Simón Pérez, Sergio Cuello, Ailin Melillan", tipo: "Single", anio: 2024, descripcion: "Colaboración fresca que une voces y perspectivas en una nueva canción.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 96, orden: 4 },
    { id: "l5", titulo: "Cuidaremos la tierra", artista: "La banda de la Ronda", tipo: "Single", anio: 2024, descripcion: "Canción colectiva con las infancias: un compromiso cantado con el planeta.", link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", portada_hue: 110, orden: 5 }
  ],
  audiovisuales: [
    { id: "v1", titulo: "Lo que es (en Hogares)", artista: "Simón Pérez", categoria: "HOGARES", descripcion: "Registro audiovisual en vivo de una canción, grabada en el corazón de un hogar.", ubicacion: "Lago Puelo", anio: 2024, link: "https://www.youtube.com/watch?v=pUPR2Zvv44E", duracion: "04:20", portada_hue: 30, orden: 1 },
    { id: "v2", titulo: "DEHISCENTE (Full EP)", artista: "Chicho Negri", categoria: "CONCIERTO", descripcion: "Registro de la presentación del EP, con voz, armónica y guitarra en un formato íntimo.", ubicacion: "Estudio Hogarenhos", anio: 2024, link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", duracion: "12:00", portada_hue: 20, orden: 2 },
    { id: "v3", titulo: "La urgencia (Video Oficial)", artista: "Arthuro Mar.", categoria: "SESIONES", descripcion: "Sesión audiovisual que captura la esencia cruda y directa de la canción.", ubicacion: "Argentina", anio: 2024, link: "https://www.youtube.com/watch?v=CODIGO_VIDEO_AQUI", duracion: "03:45", portada_hue: 350, orden: 3 },
    { id: "v4", titulo: "Noche de peña", artista: "Mario Pérez", categoria: "CONCIERTO", descripcion: "Canción compartida a sala llena, con el público cantando el estribillo.", ubicacion: "Argentina", anio: 2023, link: "https://www.youtube.com/@Hogarenhos/", duracion: "05:20", portada_hue: 8, orden: 4 },
    { id: "v5", titulo: "Café de la esquina", artista: "Hogareños + Local", categoria: "LOCALES", descripcion: "Dos audiovisuales grabados junto a un local, compartiendo promoción entre ambos.", ubicacion: "Bar notable", anio: 2024, link: "https://www.youtube.com/@Hogarenhos/", duracion: "07:30", portada_hue: 45, orden: 5 }
  ],
  ilustraciones: [
    { id: "i1", titulo: "Saltar aunque dé miedo", ilustrador: "Ilustrador/a invitado", cancion: "Saltar — Simón Pérez", frase: "Un viaje no depende de su tiempo, como cuando una búsqueda se transforma en sueño real.", descripcion: "Interpretación visual del mensaje de la frase, con técnica mixta sobre papel.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 34, orden: 1 },
    { id: "i2", titulo: "La verdad que callamos", ilustrador: "Ilustrador/a invitado", cancion: "La verdad — Juan Rossa", frase: "Hay silencios que gritan más que cualquier voz.", descripcion: "Una pieza que traduce el silencio en textura y color.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 260, orden: 2 }
  ],
  proyecto: [
    { id: "p1", nombre: "Volumen II: Voces del Hogar", descripcion: "Compilado audiovisual con 10 artistas de la red, grabado en estudio y en hogares de distintas provincias.", meta: 3500, recaudado: 1240, etapa: "En construcción", moneda: "USD", detalle: "Tu aporte financia: grabación y mezcla (40%), registro audiovisual y edición (35%), arte y prensa (15%), distribución digital (10%).", activo: true }
  ],
  aportes: [
    { id: "ap1", nombre: "Una vecina del barrio", monto: 50, mensaje: "Por más canciones que abracen.", fecha: "2025-09-04T12:00:00.000Z" },
    { id: "ap2", nombre: "Colectivo amigo", monto: 300, mensaje: "Seguimos construyendo hogar.", fecha: "2025-09-07T12:00:00.000Z" }
  ],
  ronda: [
    { id: "r1", titulo: "Ronda de canciones abierta", tipo: "Encuentro", fecha: "2025-10-15T20:00:00.000Z", lugar: "Patio de la Casa Hogareños", modalidad: "Mixta", descripcion: "Cada persona trae una canción, propia o ajena. Micrófono abierto presencial y transmisión en vivo.", link: "https://www.youtube.com/@Hogarenhos/" }
  ],
  mensajes: [
    { id: "m1", nombre: "Marina", mensaje: "Saltar me acompañó en un momento difícil. Gracias por sostener este espacio.", ciudad: "Córdoba", fecha: "2025-09-08T12:00:00.000Z" }
  ],
  servicios: [
    { id: "s1", nombre: "Single", categoria: "Grabaciones en estudio", descripcion: "Tu canción grabada, mezclada y masterizada, lista para publicar.", precio: 180, moneda: "USD", incluye: "Grabación · Mezcla · Master · Distribución", entrega: "5 a 7 días", icono: "🎵", destacado: true, orden: 1 },
    { id: "s2", nombre: "HOGARES", categoria: "Audiovisuales", descripcion: "Registro audiovisual en vivo de una canción en un hogar.", precio: 150, moneda: "USD", incluye: "Registro en locación · Edición · Publicación", entrega: "7 a 10 días", icono: "🏡", destacado: false, orden: 2 }
  ],
  semillero: [
    { id: "se1", titulo: "Estribillo que me ronda", autor: "Camila R.", tipo: "Melodía", descripcion: "Tengo la melodía pero me falta la letra.", estado: "Semilla", etiquetas: "canción, colaboración", fecha: "2025-09-20T12:00:00.000Z" }
  ],
  tablon: [
    { id: "t1", modalidad: "Busco", titulo: "Busco letrista", detalle: "Compongo melodías pero me cuesta escribir letras.", autor: "Nahuel", contacto: "vía el sello", etiquetas: "letra, colaboración", fecha: "2025-09-20T12:00:00.000Z" }
  ],
  cursos: [
    { id: "c1", titulo: "Canto con el cuerpo", docente: "Belu Diehl", categoria: "Música", nivel: "Inicial", descripcion: "Encontrá tu voz desde la respiración y el movimiento.", temario: "Respiración · Afinación · Repertorio", duracion: "6 encuentros", modalidad: "Virtual", precio: 90, moneda: "USD", acceso: "Suscriptores", cupos: 20, icono: "🎤", destacado: true, orden: 1 },
    { id: "c2", titulo: "Escucha profunda", docente: "Equipo Hogareños", categoria: "Humanidad", nivel: "Todos", descripcion: "Aprender a escuchar(se) y a sostener a otras personas.", temario: "Escucha activa · Empatía", duracion: "4 encuentros", modalidad: "Virtual", precio: 0, moneda: "USD", acceso: "Abierto", cupos: 0, icono: "🤲", destacado: true, orden: 2 }
  ],
  planes: [
    { id: "pl1", nombre: "Vecino/a", publico: "Para quien recién llega", precio: 5, moneda: "USD", periodo: "por mes", beneficios: "Acceso a cursos abiertos · Muro y Tablón · Semillero", destacado: false, orden: 1 },
    { id: "pl2", nombre: "Habitante del Hogar", publico: "Para quien quiere formarse", precio: 12, moneda: "USD", periodo: "por mes", beneficios: "Todos los cursos sin costo · 20% off en Productora", destacado: true, orden: 2 }
  ]
};

const API = {
  async list(table, params = {}) {
    const qs = new URLSearchParams(params).toString();
    try {
      const res = await fetch(`tables/${table}${qs ? "?" + qs : ""}`, { headers: { Accept: "application/json" } });
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

function byOrden(rows) {
  return [...rows].sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999));
}

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}