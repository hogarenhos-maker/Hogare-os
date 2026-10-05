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
    { id: "a1", nombre: "Simón Pérez", rol: "Cantautor", bio: "Canciones que buscan el sueño real. Autor de \"Saltar\", video destacado del sello. Voz íntima y paisajes del sur.", video_url: "https://www.youtube.com/@Hogarenhos/", genero: "Canción de autor", ciudad: "Chimpay, Río Negro", instagram: "https://instagram.com/hogarenhos", destacado: true, orden: 1 },
    { id: "a2", nombre: "Belu Diehl", rol: "Cantante", bio: "Interpreta \"Talón de Aquiles\" en concierto. Una presencia escénica que transforma el dolor en ternura.", video_url: "https://www.youtube.com/@Hogarenhos/", genero: "Canción", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: true, orden: 2 },
    { id: "a3", nombre: "Mario Pérez", rol: "Compositor", bio: "Presenta \"SENTIRES Y ASOMBROS (Vol 1)\". Poesía hecha canción, búsqueda de lo humano en lo cotidiano.", video_url: "https://www.youtube.com/@Hogarenhos/", genero: "Folclore / Autor", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: true, orden: 3 },
    { id: "a4", nombre: "Juan Rossa", rol: "Autor", bio: "\"LA VERDAD\" (Diarios del Silencio - Vol 1). Registra el silencio y lo convierte en palabra cantada.", video_url: "https://www.youtube.com/@Hogarenhos/", genero: "Canción", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: false, orden: 4 },
    { id: "a5", nombre: "La banda de la Ronda", rol: "Proyecto colectivo", bio: "\"Cuidaremos la tierra\". Un proyecto pensado con la infancia y la comunidad para sembrar conciencia.", video_url: "https://www.youtube.com/@Hogarenhos/", genero: "Infancias", ciudad: "Argentina", instagram: "https://instagram.com/hogarenhos", destacado: false, orden: 5 }
  ],
  lanzamientos: [
    { id: "l1", titulo: "Saltar", artista: "Simón Pérez", tipo: "Videoclip", anio: 2024, descripcion: "Video oficial destacado. Una carrera hacia el sueño real, registrada con paisajes del sur argentino.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 28, orden: 1 },
    { id: "l2", titulo: "Sentires y Asombros (Vol 1)", artista: "Mario Pérez", tipo: "Disco", anio: 2024, descripcion: "Primer volumen de un cancionero que celebra el asombro como forma de resistencia.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 40, orden: 2 },
    { id: "l3", titulo: "Diarios del Silencio (Vol 1)", artista: "Juan Rossa", tipo: "EP", anio: 2024, descripcion: "La verdad en cuatro canciones breves, grabadas en estudio entre la noche y el silencio.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 18, orden: 3 },
    { id: "l4", titulo: "Cuidaremos la tierra", artista: "La banda de la Ronda", tipo: "Single", anio: 2024, descripcion: "Canción colectiva con las infancias: un compromiso cantado con el planeta.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 96, orden: 4 },
    { id: "l5", titulo: "Hogar Abierto", artista: "Hogareños Colectivo", tipo: "Single", anio: 2023, descripcion: "Tema que da nombre a la red. Grabado con artistas del sello en una sola toma.", link: "https://www.youtube.com/@Hogarenhos/", portada_hue: 12, orden: 5 }
  ],
  audiovisuales: [
    { id: "v1", titulo: "Ventana al sur", artista: "Simón Pérez", categoria: "HOGARES", descripcion: "Registro audiovisual en vivo de una canción, grabada en el living de una casa.", ubicacion: "Chimpay, Río Negro", anio: 2024, link: "https://www.youtube.com/@Hogarenhos/", duracion: "03:48", portada_hue: 30, orden: 1 },
    { id: "v2", titulo: "Cocina de madrugada", artista: "Belu Diehl", categoria: "HOGARES", descripcion: "Una canción entre paredes queridas: el hogar como primer escenario.", ubicacion: "Argentina", anio: 2024, link: "https://www.youtube.com/@Hogarenhos/", duracion: "04:12", portada_hue: 20, orden: 2 },
    { id: "v3", titulo: "Talón de Aquiles (en Concierto)", artista: "Belu Diehl", categoria: "CONCIERTO", descripcion: "Registro de una canción realizada en un concierto con espectadores.", ubicacion: "Argentina", anio: 2024, link: "https://www.youtube.com/@Hogarenhos/", duracion: "04:05", portada_hue: 350, orden: 3 },
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
