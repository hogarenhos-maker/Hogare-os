/* ==========================================================================
   HOGAREÑOS — Router SPA y arranque de la aplicación
   ==========================================================================
   Navegación por hash (#/ruta) para funcionar como sitio estático.
   ========================================================================== */

const ROUTES = {
  "/": { view: viewHome, title: "Inicio", bind: null },
  "/estudio": { view: viewEstudio, title: "Grabaciones en estudio", bind: bindEstudioGrid },
  "/audiovisuales": { view: viewAudiovisuales, title: "Audiovisuales", bind: bindAudiovisualGrid },
  "/ilustradores": { view: viewIlustradores, title: "Ilustradores", bind: null },
  "/artistas": { view: viewArtistas, title: "Artistas", bind: bindPostulacionForm },
  "/productora": { view: viewProductora, title: "Productora", bind: bindProductora },
  "/semillero": { view: viewSemillero, title: "Semillero", bind: bindSemillero },
  "/cursos": { view: viewCursos, title: "Cursos y suscripción", bind: bindCursos },
  "/comunidad": { view: viewComunidad, title: "Comunidad", bind: bindMensajeForm },
  "/apoyar": { view: viewApoyar, title: "Sostener el hogar", bind: bindApoyar }
};

/** Devuelve la ruta normalizada actual desde el hash. */
function currentPath() {
  let hash = window.location.hash.replace(/^#/, "");
  if (!hash || hash === "/") return "/";
  if (!hash.startsWith("/")) hash = "/" + hash;
  return hash.replace(/\/+$/, "") || "/";
}

/** Marca el enlace activo en la navegación. */
function markActive(path) {
  document.querySelectorAll(".main-nav a[data-link]").forEach((a) => {
    const href = a.getAttribute("href").replace(/^#/, "");
    a.classList.toggle("active", href === path);
  });
}

/** Cierra el menú móvil. */
function closeNav() {
  const nav = document.getElementById("main-nav");
  const toggle = document.getElementById("nav-toggle");
  if (nav) nav.classList.remove("open");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
}

/** Renderiza la vista correspondiente a la ruta. */
async function render() {
  const path = currentPath();
  const route = ROUTES[path] || { view: viewNotFound, title: "No encontrado", bind: null };
  const main = document.getElementById("main");

  markActive(path);
  closeNav();

  try {
    const html = await route.view();
    main.innerHTML = html;
    if (route.bind) route.bind();
  } catch (err) {
    console.error("[HOGAREÑOS] Error al renderizar la vista:", err);
    main.innerHTML = `<div class="container"><div class="empty">Ocurrió un error al cargar esta sección. Probá de nuevo.</div></div>`;
  }

  document.title = `${route.title} · HOGAREÑOS`;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/** Maneja la navegación a un enlace ancla interna (#donar) dentro de una vista. */
function handleAnchor(e) {
  const href = e.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  if (href.startsWith("#/")) {
    e.preventDefault();
    if (window.location.hash === href) {
      render();
    } else {
      window.location.hash = href;
    }
    return;
  }
  const target = document.querySelector(href);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function init() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Intercepta los enlaces internos (delegación global).
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    handleAnchor({ currentTarget: link, preventDefault: () => e.preventDefault() });
  });

  window.addEventListener("hashchange", render);

  if (!window.location.hash) window.location.hash = "#/";
  render();
}

document.addEventListener("DOMContentLoaded", init);
