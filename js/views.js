/* ==========================================================================
   HOGAREÑOS — Vistas del sitio (renderizado de cada sección)
   ========================================================================== */

/* ---------- Utilidades visuales ---------- */

/** Devuelve un gradiente cálido a partir de un tono (hue). */
function gradient(hue = 30, deg = 150) {
  const h = Number(hue) || 30;
  return `linear-gradient(${deg}deg, hsl(${h} 62% 52%), hsl(${(h + 26) % 360} 48% 34%))`;
}

/** Iniciales para el arte tipográfico de las tarjetas. */
function initials(text) {
  return String(text || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Ícono de reproducción en SVG. */
function playIcon() {
  return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
}

/** Fecha legible en español (día + mes corto). */
function fechaPartes(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return { dia: "--", mes: "" };
  return {
    dia: d.toLocaleDateString("es-AR", { day: "2-digit" }),
    mes: d.toLocaleDateString("es-AR", { month: "short" }).replace(".", "")
  };
}

/** Fecha larga completa. */
function fechaLarga(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/* ---------- Piezas reutilizables ---------- */

/** Encabezado de sección. */
function sectionHead(eyebrow, title, lead) {
  return `
    <header class="section-head">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h2>${title}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </header>`;
}

/** Tarjeta de contenido audiovisual / lanzamiento. */
function contentCard(item, opts = {}) {
  const titulo = opts.tituloField ? item[opts.tituloField] : item.titulo;
  const sub = item.artista || item.ilustrador || "";
  const tag = item.tipo || item.categoria || "";
  const hue = item.portada_hue ?? 30;
  const link = item.link || item.video_url || "";
  const desc = item.descripcion || item.bio || "";

  const meta = [];
  if (item.anio) meta.push(`<span>📅 ${esc(item.anio)}</span>`);
  if (item.duracion) meta.push(`<span>⏱ ${esc(item.duracion)}</span>`);
  if (item.ubicacion) meta.push(`<span>📍 ${esc(item.ubicacion)}</span>`);

  const body = `
    <article class="card">
      <div class="card-thumb" style="background:${gradient(hue)}">
        <span class="card-art" aria-hidden="true">${esc(initials(titulo))}</span>
        <div class="play-badge" aria-hidden="true"><span class="play-circle">${playIcon()}</span></div>
      </div>
      <div class="card-body">
        ${tag ? `<span class="tag">${esc(tag)}</span>` : ""}
        <h3>${esc(titulo)}</h3>
        ${sub ? `<span class="card-artist">${esc(sub)}</span>` : ""}
        ${desc ? `<p>${esc(desc)}</p>` : ""}
        ${meta.length ? `<div class="card-meta">${meta.join("")}</div>` : ""}
      </div>
    </article>`;

  return link
    ? `<a href="${esc(link)}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;display:contents;" aria-label="${esc(titulo)} — abrir en YouTube">${body}</a>`
    : body;
}

/* ==========================================================================
   VISTA: INICIO
   ========================================================================== */
async function viewHome() {
  const [proyecto] = await API.list("proyecto");
  const pct = proyecto ? Math.min(100, Math.round((proyecto.recaudado / proyecto.meta) * 100)) : 0;

  return `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <p class="eyebrow">Sello artístico · Productora musical y audiovisual</p>
        <h1>Un <em>hogar virtual</em> donde el arte se comparte y se sostiene.</h1>
        <p class="lead">HOGAREÑOS conecta personas a través de la música y el arte. Grabamos en estudio, registramos canciones en hogares y conciertos, damos espacio a ilustradores y tejemos una red independiente que crece de forma colectiva.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#/audiovisuales" data-link>Explorar audiovisuales</a>
          <a class="btn btn-ghost" href="#/artistas" data-link>Sumar mi video presentación</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><strong>60+</strong><span>Obras publicadas</span></div>
          <div class="hero-stat"><strong>4</strong><span>Formatos audiovisuales</span></div>
          <div class="hero-stat"><strong>1</strong><span>Red, muchas voces</span></div>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        ${homeIllustration()}
        <span class="hero-badge"><span class="pulse-dot"></span> Proyecto activo: ${esc(proyecto ? proyecto.nombre : "Voces del Hogar")}</span>
      </div>
    </div>
  </section>

  <section class="section" id="secciones">
    <div class="container">
      ${sectionHead("Nuestro hogar", "Las puertas de la casa",
        "Cada formato es una habitación distinta del mismo hogar. Entrá por donde quieras: todas te conectan con las voces y las manos que hacen posible el sello.")}
      <div class="section-cards">
        ${cardEstudio()}
        ${cardAudiovisuales()}
        ${cardIlustradores()}
        ${cardArtistas()}
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="container">
      <div class="values">
        <article class="value"><div class="v-icon">🤝</div><h3>Colectivo</h3><p>Trabajamos en red: músicos, realizadores, productores e ilustradores que se potencian entre sí.</p></article>
        <article class="value"><div class="v-icon">🕯️</div><h3>Independiente</h3><p>Sin sellos intermediarios. Lo que producimos vuelve a la comunidad que lo hace posible.</p></article>
        <article class="value"><div class="v-icon">🌱</div><h3>Constructivo</h3><p>Cuidamos las cualidades humanas: el asombro, la ternura, la escucha y el cuidado de la tierra.</p></article>
        <article class="value"><div class="v-icon">🏠</div><h3>De contención</h3><p>Un espacio sonoro que acompaña. El hogar como refugio y como punto de partida.</p></article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="quote-band">
        <blockquote>“Un viaje no depende de su tiempo, como cuando una búsqueda se transforma en sueño real.”</blockquote>
        <cite>Manifiesto Hogareños</cite>
      </div>
    </div>
  </section>

  <section class="section" id="apoyo-destacado">
    <div class="container">
      ${sectionHead("Proyecto en construcción", "Sostengamos el próximo hogar",
        "Tu aporte hace posible un nuevo registro colectivo. Mirá en qué etapa está y sumate.")}
      ${proyecto ? projectSummary(proyecto, pct) : '<p class="empty">Pronto habrá un proyecto activo.</p>'}
    </div>
  </section>`;
}

/* ---------- Tarjetas de las cuatro puertas ---------- */
function cardEstudio() {
  return `
    <a class="home-card" href="#/estudio" data-link>
      <span class="card-icon" aria-hidden="true">🎙️</span>
      <h3>Grabaciones en estudio</h3>
      <p>Nuestras obras producidas y publicadas.</p>
      <ul class="card-list">
        <li>Singles</li>
        <li>EP's</li>
        <li>Discos</li>
        <li>Videoclips</li>
      </ul>
      <span class="card-more">Ver catálogo →</span>
    </a>`;
}

function cardAudiovisuales() {
  return `
    <a class="home-card" href="#/audiovisuales" data-link>
      <span class="card-icon" aria-hidden="true">🎬</span>
      <h3>Audiovisuales</h3>
      <p>Registros en vivo, con la casa y la calle como escenario.</p>
      <ul class="card-list">
        <li><strong>HOGARES:</strong> una canción en vivo</li>
        <li><strong>CONCIERTO:</strong> con espectadores</li>
        <li><strong>LOCALES:</strong> dos audiovisuales junto a un local</li>
        <li><strong>SESIONES:</strong> tres canciones en un audiovisual</li>
      </ul>
      <span class="card-more">Ver registros →</span>
    </a>`;
}

function cardIlustradores() {
  return `
    <a class="home-card" href="#/ilustradores" data-link>
      <span class="card-icon" aria-hidden="true">🎨</span>
      <h3>Ilustradores</h3>
      <p>“Interpretar el mensaje” de una frase de nuestras canciones.</p>
      <ul class="card-list">
        <li>Obras sobre frases del cancionero</li>
        <li>Muestra colectiva abierta</li>
      </ul>
      <span class="card-more">Ver ilustraciones →</span>
    </a>`;
}

function cardArtistas() {
  return `
    <a class="home-card" href="#/artistas" data-link>
      <span class="card-icon" aria-hidden="true">🔥</span>
      <h3>Artistas</h3>
      <p>Sumá un video presentación a los contenidos que ya compartís en el sello.</p>
      <ul class="card-list">
        <li>Perfil con tu video</li>
        <li>Ingreso al sello y a la red</li>
      </ul>
      <span class="card-more">Sumarme →</span>
    </a>`;
}

/** Resumen del proyecto (usado en inicio y en la sección de apoyo). */
function projectSummary(p, pct) {
  const money = (n) => `${p.moneda === "USD" ? "US$" : "$"} ${Number(n).toLocaleString("es-AR")}`;
  const parts = String(p.detalle || "").split(". ").filter(Boolean);
  return `
    <div class="project-card">
      <div class="project-main">
        <span class="tag" style="background:rgba(255,255,255,.16);color:#ffd98a;">${esc(p.etapa || "En construcción")}</span>
        <h2 style="margin-top:.7rem;">${esc(p.nombre)}</h2>
        <p>${esc(p.descripcion)}</p>
        ${parts.length ? `<ul class="breakdown">${parts.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ul>` : ""}
        <a class="btn btn-ghost-light" href="#/apoyar" data-link style="margin-top:1.6rem;">Quiero aportar →</a>
      </div>
      <div class="project-side">
        <span class="goal">Recaudado</span>
        <span class="amount">${money(p.recaudado)}</span>
        <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del proyecto"><div class="progress-bar" style="width:${pct}%"></div></div>
        <span class="goal">${pct}% de la meta de ${money(p.meta)}</span>
      </div>
    </div>`;
}

/** Ilustración SVG de una casa cálida. */
function homeIllustration() {
  return `
  <svg viewBox="0 0 420 360" role="img" aria-label="Ilustración de una casa cálida al atardecer">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f6d9ac"/><stop offset="55%" stop-color="#e8b47e"/><stop offset="100%" stop-color="#c98a5e"/>
      </linearGradient>
      <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8a9a63"/><stop offset="100%" stop-color="#5e6c42"/>
      </linearGradient>
    </defs>
    <rect width="420" height="360" fill="url(#sky)"/>
    <circle cx="315" cy="95" r="42" fill="#ffd98a" opacity="0.9"/>
    <circle cx="315" cy="95" r="62" fill="#ffdf9f" opacity="0.3"/>
    <path d="M0 300 Q120 240 230 290 T420 285 V360 H0 Z" fill="url(#hill)"/>
    <path d="M0 330 Q150 295 260 330 T420 325 V360 H0 Z" fill="#4d5a37" opacity="0.75"/>
    <!-- casa -->
    <rect x="120" y="200" width="180" height="110" rx="6" fill="#f3e3cd"/>
    <path d="M104 204 L210 132 L316 204 Z" fill="#b8552f"/>
    <path d="M104 204 L210 132 L316 204 Z" fill="none" stroke="#8f3f20" stroke-width="3"/>
    <rect x="188" y="248" width="46" height="62" rx="4" fill="#7a4a2a"/>
    <circle cx="226" cy="280" r="3" fill="#ffd98a"/>
    <rect x="140" y="222" width="34" height="30" rx="3" fill="#ffd98a"/>
    <rect x="248" y="222" width="34" height="30" rx="3" fill="#ffd98a"/>
    <line x1="157" y1="222" x2="157" y2="252" stroke="#b8552f" stroke-width="2"/>
    <line x1="265" y1="222" x2="265" y2="252" stroke="#b8552f" stroke-width="2"/>
    <!-- humo -->
    <path d="M276 150 q10 -18 -2 -32 q-10 -12 2 -26" fill="none" stroke="#fff" stroke-width="3" opacity="0.6" stroke-linecap="round"/>
    <!-- notas musicales -->
    <g fill="#5c3a22" opacity="0.85">
      <circle cx="96" cy="158" r="5"/><rect x="100" y="120" width="3" height="40"/>
      <circle cx="336" cy="182" r="5"/><rect x="340" y="146" width="3" height="40"/>
    </g>
  </svg>`;
}

/* ==========================================================================
   VISTA: GRABACIONES EN ESTUDIO
   ========================================================================== */
async function viewEstudio() {
  const rows = byOrden(await API.list("lanzamientos"));
  return `
  <section class="section">
    <div class="container">
      ${sectionHead("Grabaciones en estudio", "Obras producidas y publicadas",
        "Singles, EP's, discos y videoclips grabados y producidos por el sello. Cada pieza es una habitación de este hogar sonoro.")}
      <div class="filters" role="group" aria-label="Filtrar por tipo de lanzamiento">
        <button class="chip active" data-filter="all">Todos</button>
        <button class="chip" data-filter="Single">Singles</button>
        <button class="chip" data-filter="EP">EP's</button>
        <button class="chip" data-filter="Disco">Discos</button>
        <button class="chip" data-filter="Videoclip">Videoclips</button>
      </div>
      <div class="grid grid-wide" id="estudio-grid">
        ${rows.map((r) => contentCard(r, {})).join("")}
      </div>
      <p class="empty" id="estudio-empty" style="display:none;">No hay obras de este tipo todavía. Pronto sumaremos nuevas grabaciones.</p>
    </div>
  </section>`;
}

function bindEstudioGrid() {
  const grid = document.getElementById("estudio-grid");
  const empty = document.getElementById("estudio-empty");
  if (!grid) return;
  document.querySelectorAll(".chip[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-filter]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      let visibles = 0;
      grid.querySelectorAll("a, article").forEach((el) => {
        const card = el.matches("article") ? el : el.querySelector(".card");
        const tipo = card ? (card.querySelector(".tag")?.textContent || "") : "";
        const match = f === "all" || tipo.trim() === f;
        el.style.display = match ? "" : "none";
        if (match) visibles++;
      });
      if (empty) empty.style.display = visibles ? "none" : "block";
    });
  });
}

/* ==========================================================================
   VISTA: AUDIOVISUALES
   ========================================================================== */
async function viewAudiovisuales() {
  const rows = byOrden(await API.list("audiovisuales"));
  return `
  <section class="section">
    <div class="container">
      ${sectionHead("Audiovisuales", "La casa, el escenario y la calle",
        "Cuatro formas de registrar una canción. Elegí un formato y recorré sus historias.")}
      <div class="filters" role="group" aria-label="Filtrar audiovisuales por formato">
        <button class="chip active" data-av="all">Todos</button>
        <button class="chip" data-av="HOGARES">HOGARES</button>
        <button class="chip" data-av="CONCIERTO">CONCIERTO</button>
        <button class="chip" data-av="LOCALES">LOCALES</button>
        <button class="chip" data-av="SESIONES">SESIONES</button>
      </div>

      <div class="section-cards" style="margin-bottom:2.5rem;">
        ${avFormatCard("HOGARES", "🏡", "Registro audiovisual en vivo de una canción, en el corazón de un hogar.")}
        ${avFormatCard("CONCIERTO", "🎤", "Registro de una canción realizada en un concierto o con espectadores.")}
        ${avFormatCard("LOCALES", "☕", "Registro de dos audiovisuales, compartiendo promoción junto a un local.")}
        ${avFormatCard("SESIONES", "🎶", "Registro de tres canciones reunidas en un mismo audiovisual.")}
      </div>

      <div class="grid grid-wide" id="av-grid">
        ${rows.map((r) => contentCard(r)).join("")}
      </div>
      <p class="empty" id="av-empty" style="display:none;">No hay registros en este formato todavía.</p>
    </div>
  </section>`;
}

function avFormatCard(cat, icon, desc) {
  return `
    <article class="home-card" style="cursor:default;">
      <span class="card-icon" aria-hidden="true">${icon}</span>
      <h3>${cat}</h3>
      <p>${desc}</p>
    </article>`;
}

function bindAudiovisualGrid() {
  const grid = document.getElementById("av-grid");
  const empty = document.getElementById("av-empty");
  if (!grid) return;
  document.querySelectorAll(".chip[data-av]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip[data-av]").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.av;
      let visibles = 0;
      grid.querySelectorAll("a, article").forEach((el) => {
        const card = el.matches("article") ? el : el.querySelector(".card");
        const cat = card ? (card.querySelector(".tag")?.textContent || "") : "";
        const match = f === "all" || cat.trim() === f;
        el.style.display = match ? "" : "none";
        if (match) visibles++;
      });
      if (empty) empty.style.display = visibles ? "none" : "block";
    });
  });
}

/* ==========================================================================
   VISTA: ILUSTRADORES
   ========================================================================== */
async function viewIlustradores() {
  const rows = byOrden(await API.list("ilustraciones"));
  return `
  <section class="section">
    <div class="container">
      ${sectionHead("Ilustradores", "Interpretar el mensaje",
        "Convocamos a ilustradores a tomar una frase de alguna canción de nuestro canal y traducirla en imagen. El resultado es una muestra colectiva que se expone y se publica.")}

      <div class="panel" style="margin-bottom:2.5rem;">
        <h3>¿Cómo participar?</h3>
        <ul class="card-list" style="font-size:.95rem;columns:2;column-gap:2rem;">
          <li>Elegí una frase de una canción de nuestro canal.</li>
          <li>Interpretá su mensaje en una obra propia.</li>
          <li>Envianos la imagen y una breve reseña.</li>
          <li>Tu obra se suma a la muestra y a la difusión del sello.</li>
        </ul>
        <a class="btn btn-primary" style="margin-top:1rem;" href="mailto:hogarenhos@gmail.com?subject=Ilustradores%20-%20Interpretar%20el%20mensaje">Enviar mi obra</a>
      </div>

      <div class="grid">
        ${rows.map((r) => ilusCard(r)).join("")}
      </div>
    </div>
  </section>`;
}

function ilusCard(it) {
  const hue = it.portada_hue ?? 40;
  return `
    <article class="card">
      <div class="card-thumb portrait" style="background:${gradient(hue, 140)}">
        <span class="card-art" aria-hidden="true">${esc(initials(it.ilustrador))}</span>
      </div>
      <div class="card-body">
        <span class="tag">Ilustración</span>
        <h3>${esc(it.titulo)}</h3>
        <span class="card-artist">por ${esc(it.ilustrador)}</span>
        ${it.frase ? `<p style="font-style:italic;border-left:3px solid var(--ocre);padding-left:.7rem;">“${esc(it.frase)}”</p>` : ""}
        ${it.cancion ? `<p style="font-size:.82rem;"><strong>Canción:</strong> ${esc(it.cancion)}</p>` : ""}
        ${it.descripcion ? `<p>${esc(it.descripcion)}</p>` : ""}
      </div>
    </article>`;
}

/* ==========================================================================
   VISTA: ARTISTAS
   ========================================================================== */
async function viewArtistas() {
  const rows = byOrden(await API.list("artistas"));
  return `
  <section class="section">
    <div class="container">
      ${sectionHead("Artistas", "Las voces del hogar",
        "Artistas que ya comparten sus contenidos en el sello. Cada uno con un video presentación que abre la puerta a su obra.")}
      <div class="grid grid-wide">
        ${rows.map((a) => artistCard(a)).join("")}
      </div>
    </div>
  </section>

  <section class="section-tight" id="postular">
    <div class="container">
      ${sectionHead("Sumate al sello", "Agregá tu video presentación",
        "Si ya compartís contenidos con HOGAREÑOS, sumá un video presentación a tu perfil. Si querés ingresar por primera vez, contanos quién sos: leemos cada mensaje.")}
      <form class="panel" id="form-postulacion" novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="p-nombre">Nombre o proyecto *</label>
            <input id="p-nombre" name="nombre" type="text" required autocomplete="name" />
          </div>
          <div class="field">
            <label for="p-email">Email *</label>
            <input id="p-email" name="email" type="email" required autocomplete="email" />
          </div>
          <div class="field">
            <label for="p-rol">Tu rol</label>
            <select id="p-rol" name="rol">
              <option>Músico/a</option>
              <option>Cantautor/a</option>
              <option>Banda</option>
              <option>Realizador/a audiovisual</option>
              <option>Ilustrador/a</option>
              <option>Productor/a</option>
              <option>Local / espacio</option>
              <option>Otro</option>
            </select>
          </div>
          <div class="field">
            <label for="p-canales">Redes / canales</label>
            <input id="p-canales" name="canales" type="text" placeholder="Instagram, Spotify, YouTube…" />
          </div>
          <div class="field full">
            <label for="p-video">Link a tu video presentación *</label>
            <input id="p-video" name="video_url" type="url" required placeholder="https://youtube.com/…" />
          </div>
          <div class="field full">
            <label for="p-mensaje">Contanos de tu obra</label>
            <textarea id="p-mensaje" name="mensaje" placeholder="Qué hacés, con quién, qué te gustaría compartir en el hogar…"></textarea>
          </div>
        </div>
        <p class="form-note">* Campos obligatorios. Al enviar, tu presentación entra a la lista de la curaduría del sello.</p>
        <button class="btn btn-primary" type="submit" style="margin-top:1.2rem;">Enviar presentación</button>
        <div class="form-status" id="p-status" role="status" aria-live="polite"></div>
      </form>
    </div>
  </section>`;
}

function artistCard(a) {
  const hue = a.id ? (String(a.id).charCodeAt(0) * 7 + 20) % 360 : 30;
  const canales = [
    a.instagram ? `<a href="${esc(a.instagram)}" target="_blank" rel="noopener">Instagram</a>` : "",
    a.spotify ? `<a href="${esc(a.spotify)}" target="_blank" rel="noopener">Spotify</a>` : ""
  ].filter(Boolean).join(" · ");
  return `
    <article class="card">
      <div class="card-thumb" style="background:${gradient(hue, 150)}">
        <span class="card-art" aria-hidden="true">${esc(initials(a.nombre))}</span>
        ${a.video_url ? `<a class="play-badge" href="${esc(a.video_url)}" target="_blank" rel="noopener" aria-label="Ver video presentación de ${esc(a.nombre)}"><span class="play-circle">${playIcon()}</span></a>` : ""}
      </div>
      <div class="card-body">
        ${a.rol ? `<span class="tag">${esc(a.rol)}</span>` : ""}
        <h3>${esc(a.nombre)}</h3>
        ${a.genero || a.ciudad ? `<span class="card-artist">${esc([a.genero, a.ciudad].filter(Boolean).join(" · "))}</span>` : ""}
        ${a.bio ? `<p>${esc(a.bio)}</p>` : ""}
        <div class="card-meta">
          ${a.video_url ? `<a href="${esc(a.video_url)}" target="_blank" rel="noopener" style="font-weight:600;">▶ Video presentación</a>` : ""}
          ${canales ? `<span>${canales}</span>` : ""}
        </div>
      </div>
    </article>`;
}

/** Conecta el formulario de postulaciones con la API. */
function bindPostulacionForm() {
  const form = document.getElementById("form-postulacion");
  if (!form) return;
  const status = document.getElementById("p-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.nombre?.trim() || !data.email?.trim() || !data.video_url?.trim()) {
      status.className = "form-status error show";
      status.textContent = "Completá nombre, email y el link a tu video presentación.";
      return;
    }

    const payload = {
      nombre: data.nombre.trim(),
      email: data.email.trim(),
      rol: data.rol || "",
      canales: data.canales || "",
      video_url: data.video_url.trim(),
      mensaje: data.mensaje || "",
      estado: "Nueva",
      fecha: new Date().toISOString()
    };

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Enviando…";

    try {
      await API.create("postulaciones", payload);
      form.reset();
      status.className = "form-status ok show";
      status.textContent = "¡Gracias! Recibimos tu presentación. Te escribiremos a " + payload.email + ".";
    } catch (err) {
      status.className = "form-status error show";
      status.textContent = "No pudimos enviar el formulario: " + err.message + ". Escribinos a hogarenhos@gmail.com.";
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
}

/* ==========================================================================
   VISTA: COMUNIDAD (la Ronda + muro de mensajes)
   ========================================================================== */
async function viewComunidad() {
  const [ronda, mensajes] = await Promise.all([API.list("ronda"), API.list("mensajes")]);
  const orden = [...ronda].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const msgs = [...mensajes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return `
  <section class="section">
    <div class="container">
      ${sectionHead("Comunidad", "La Ronda del Hogar",
        "Encuentros abiertos, talleres, muestras y peñas. Momentos para encontrarnos, aprender y sostenernos. Sumate: el hogar se hace entre todos.")}
      <div class="round-list">
        ${orden.map((r) => roundItem(r)).join("") || '<p class="empty">Pronto anunciaremos nuevos encuentros.</p>'}
      </div>
    </div>
  </section>

  <section class="section-tight">
    <div class="container">
      ${sectionHead("Muro del hogar", "Lo que nos dejan las canciones",
        "Un espacio para dejar un mensaje, una dedicatoria o simplemente decir presente. Las palabras también construyen.")}
      <div class="message-grid" id="muro">
        ${msgs.map((m) => messageNote(m)).join("")}
      </div>
      <form class="panel" id="form-mensaje" style="margin-top:2rem;">
        <h3>Dejá tu mensaje</h3>
        <div class="form-grid">
          <div class="field">
            <label for="m-nombre">Tu nombre *</label>
            <input id="m-nombre" name="nombre" type="text" required />
          </div>
          <div class="field">
            <label for="m-ciudad">Ciudad</label>
            <input id="m-ciudad" name="ciudad" type="text" />
          </div>
          <div class="field full">
            <label for="m-mensaje">Mensaje *</label>
            <textarea id="m-mensaje" name="mensaje" required placeholder="Una frase, una dedicatoria, un gracias…"></textarea>
          </div>
        </div>
        <button class="btn btn-primary" type="submit" style="margin-top:1rem;">Publicar en el muro</button>
        <div class="form-status" id="m-status" role="status" aria-live="polite"></div>
      </form>
    </div>
  </section>`;
}

function roundItem(r) {
  const { dia, mes } = fechaPartes(r.fecha);
  return `
    <article class="round-item">
      <div class="round-date">
        <div class="d">${esc(dia)}</div>
        <div class="m">${esc(mes)}</div>
      </div>
      <div>
        <span class="tag">${esc(r.tipo)} · ${esc(r.modalidad)}</span>
        <h3 style="margin-top:.4rem;">${esc(r.titulo)}</h3>
        <p>${esc(r.descripcion)}</p>
        <p style="font-size:.82rem;margin-top:.4rem;">📍 ${esc(r.lugar)} · ${esc(fechaLarga(r.fecha))}</p>
      </div>
      <div>
        ${r.link ? `<a class="btn btn-ghost btn-sm" href="${esc(r.link)}" target="_blank" rel="noopener">Ver más</a>` : '<span class="supporter">Próximamente</span>'}
      </div>
    </article>`;
}

function messageNote(m) {
  return `
    <blockquote class="message-note">
      <p>“${esc(m.mensaje)}”</p>
      <footer>— ${esc(m.nombre)}${m.ciudad ? ", " + esc(m.ciudad) : ""}</footer>
    </blockquote>`;
}

function bindMensajeForm() {
  const form = document.getElementById("form-mensaje");
  if (!form) return;
  const status = document.getElementById("m-status");
  const muro = document.getElementById("muro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.nombre?.trim() || !data.mensaje?.trim()) {
      status.className = "form-status error show";
      status.textContent = "Tu nombre y tu mensaje son necesarios.";
      return;
    }
    const payload = {
      nombre: data.nombre.trim(),
      ciudad: data.ciudad || "",
      mensaje: data.mensaje.trim(),
      fecha: new Date().toISOString()
    };
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Publicando…";
    try {
      await API.create("mensajes", payload);
      if (muro) muro.insertAdjacentHTML("afterbegin", messageNote(payload));
      form.reset();
      status.className = "form-status ok show";
      status.textContent = "¡Gracias por dejar tu palabra en el muro!";
    } catch (err) {
      status.className = "form-status error show";
      status.textContent = "No pudimos publicar: " + err.message + ".";
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
}

/* ==========================================================================
   VISTA: APOYAR (donación al proyecto activo)
   ========================================================================== */
async function viewApoyar() {
  const [proyectos, aportes] = await Promise.all([API.list("proyecto"), API.list("aportes")]);
  const p = proyectos[0] || null;
  const pct = p ? Math.min(100, Math.round((p.recaudado / p.meta) * 100)) : 0;
  const total = aportes.reduce((s, a) => s + (Number(a.monto) || 0), 0);

  return `
  <section class="section">
    <div class="container">
      ${sectionHead("Sostener el hogar", "Doná a un proyecto en construcción",
        "Cada aporte, grande o pequeño, enciende una nueva grabación. Así se financia de forma transparente y comunitaria.")}

      ${p ? `
      <div class="project-card">
        <div class="project-main">
          <span class="tag" style="background:rgba(255,255,255,.16);color:#ffd98a;">${esc(p.etapa || "En construcción")}</span>
          <h2 style="margin-top:.7rem;">${esc(p.nombre)}</h2>
          <p>${esc(p.descripcion)}</p>
          <p style="font-size:.92rem;">${esc(p.detalle)}</p>
          <a class="btn btn-ghost-light" style="margin-top:1.2rem;" href="#donar">Elegir mi aporte ↓</a>
        </div>
        <div class="project-side">
          <span class="goal">Recaudado</span>
          <span class="amount">US$ ${Number(p.recaudado).toLocaleString("es-AR")}</span>
          <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso"><div class="progress-bar" style="width:${pct}%"></div></div>
          <span class="goal">${pct}% de la meta de US$ ${Number(p.meta).toLocaleString("es-AR")}</span>
        </div>
      </div>` : '<p class="empty">No hay un proyecto activo en este momento.</p>'}

      <div class="panel" id="donar" style="margin-top:2.5rem;">
        <h3>Elegí tu aporte</h3>
        <p class="lead" style="font-size:.95rem;">Seleccioná un monto y dejá tu mensaje. Registramos cada aporte para que toda la comunidad vea cómo crece el proyecto.</p>
        <div class="donate-options" role="group" aria-label="Monto a donar">
          <button class="amount-btn" data-amount="10">US$ 10</button>
          <button class="amount-btn active" data-amount="25">US$ 25</button>
          <button class="amount-btn" data-amount="50">US$ 50</button>
          <button class="amount-btn" data-amount="100">US$ 100</button>
        </div>
        <form id="form-aporte">
          <div class="form-grid">
            <div class="field">
              <label for="a-nombre">Tu nombre o apodo</label>
              <input id="a-nombre" name="nombre" type="text" placeholder="Dejalo vacío para donar como Anónimo" />
            </div>
            <div class="field">
              <label for="a-monto">Monto (US$)</label>
              <input id="a-monto" name="monto" type="number" min="1" step="1" value="25" required />
            </div>
            <div class="field full">
              <label for="a-mensaje">Mensaje (opcional)</label>
              <input id="a-mensaje" name="mensaje" type="text" placeholder="Una dedicatoria para el proyecto…" />
            </div>
          </div>
          <button class="btn btn-primary" type="submit" style="margin-top:1.2rem;">Registrar mi aporte</button>
          <div class="form-status" id="a-status" role="status" aria-live="polite"></div>
          <p class="form-note">Al registrarlo, sumamos tu aporte al progreso y a la pared de gracias de abajo. Para concretarlo, te contactamos y coordinamos el medio de pago (transferencia, billetera virtual o link de pago).</p>
        </form>
      </div>

      <div style="margin-top:2.5rem;">
        <h3>Pared de gracias</h3>
        <p class="lead" style="font-size:.95rem;">${aportes.length} aportes registrados · US$ ${total.toLocaleString("es-AR")} comprometidos por la comunidad.</p>
        <div class="supporter-wall" id="pared">
          ${aportes.map((a) => supporterChip(a)).join("")}
        </div>
      </div>

      <div class="section-cards" style="margin-top:3rem;">
        <article class="home-card" style="cursor:default;"><span class="card-icon">🔎</span><h3>Transparencia</h3><p>Publicamos en qué se invierte cada aporte: grabación, edición, arte y difusión.</p></article>
        <article class="home-card" style="cursor:default;"><span class="card-icon">💌</span><h3>Créditos abiertos</h3><p>Cada persona que aporta aparece en los créditos y accede al estreno anticipado.</p></article>
        <article class="home-card" style="cursor:default;"><span class="card-icon">🔁</span><h3>Retribución</h3><p>Lo recaudado vuelve a la red: más artistas grabados, más hogares sonoros.</p></article>
      </div>
    </div>
  </section>`;
}

function supporterChip(a) {
  const nombre = a.nombre || "Anónimo";
  return `<span class="supporter"><strong>${esc(nombre)}</strong> · US$ ${Number(a.monto).toLocaleString("es-AR")}${a.mensaje ? " — " + esc(a.mensaje) : ""}</span>`;
}

function bindApoyar() {
  // Selector de montos
  document.querySelectorAll(".amount-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".amount-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const input = document.getElementById("a-monto");
      if (input) input.value = btn.dataset.amount;
    });
  });

  const form = document.getElementById("form-aporte");
  if (!form) return;
  const status = document.getElementById("a-status");
  const pared = document.getElementById("pared");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    const data = Object.fromEntries(new FormData(form).entries());
    const monto = Number(data.monto);
    if (!monto || monto < 1) {
      status.className = "form-status error show";
      status.textContent = "Ingresá un monto válido.";
      return;
    }
    const payload = {
      nombre: (data.nombre || "").trim() || "Anónimo",
      monto,
      mensaje: (data.mensaje || "").trim(),
      fecha: new Date().toISOString()
    };
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Registrando…";
    try {
      await API.create("aportes", payload);
      if (pared) pared.insertAdjacentHTML("afterbegin", supporterChip(payload));
      form.reset();
      status.className = "form-status ok show";
      status.textContent = "¡Gracias! Tu aporte quedó registrado. Te contactaremos para concretarlo.";
    } catch (err) {
      status.className = "form-status error show";
      status.textContent = "No pudimos registrar el aporte: " + err.message + ".";
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
}

/* ==========================================================================
   VISTA: 404
   ========================================================================== */
function viewNotFound() {
  return `
  <section class="section">
    <div class="container" style="text-align:center;max-width:560px;">
      <p class="eyebrow">Puerta cerrada</p>
      <h1>Esa habitación no existe (todavía)</h1>
      <p class="lead" style="margin:1rem auto 2rem;">Volvé al living y elegí otra puerta del hogar.</p>
      <a class="btn btn-primary" href="#/" data-link>Volver al inicio</a>
    </div>
  </section>`;
}
