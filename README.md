# HOGAREÑOS — Hogar Virtual

Sitio web del sello artístico y productora musical/audiovisual **HOGAREÑOS**
(YouTube: [@Hogarenhos](https://www.youtube.com/@Hogarenhos/)).

El objetivo es construir un **Hogar Virtual**: un espacio cálido, colectivo e
independiente que conecta personas a través de la música y el arte, da lugar a
los distintos formatos de contenido del sello y abre puertas concretas para
participar, encontrarse y sostener los proyectos.

---

## 1. Funcionalidades completas

- **Navegación SPA por hash** (`#/ruta`) con seis secciones + inicio, sin recargar página.
- **Inicio**: hero con ilustración SVG de una casa, manifiesto, valores del hogar
  (Colectivo / Independiente / Constructivo / De contención) y resumen del proyecto activo.
- **Grabaciones en estudio**: catálogo con filtros por tipo (Singles, EP's, Discos, Videoclips).
- **Audiovisuales**: filtros por formato (HOGARES, CONCIERTO, LOCALES, SESIONES), con
  tarjeta explicativa del significado de cada formato.
- **Ilustradores**: galería de obras que "interpretan el mensaje" de frases del cancionero,
  con instrucciones de participación.
- **Artistas**: perfiles de los artistas del sello con video presentación enlazado, y
  **formulario de postulación** conectado a la API de tablas.
- **Comunidad**: la "Ronda del Hogar" (encuentros, talleres, muestras, peñas) y un
  **muro de mensajes** donde la comunidad publica sus palabras.
- **Apoyar / Donar**: proyecto activo en construcción con barra de progreso, selección de
  monto, registro de aportes y "pared de gracias" de la comunidad.
- **Diseño responsive** (desktop, tablet y móvil) con menú hamburguesa.
- **Fallback de datos**: si la API de tablas no responde, las vistas se muestran igual con
  un dataset local embebido (`SEED` en `js/api.js`).

## 2. Resumen de rutas / URIs y parámetros

| Ruta (hash)     | Sección            | Renderiza |
| --------------- | ------------------ | --------- |
| `#/`            | Inicio             | Hero, puertas del hogar, valores, proyecto |
| `#/estudio`     | Grabaciones estudio| Filtro `data-filter`: `Single` `EP` `Disco` `Videoclip` |
| `#/audiovisuales`| Audiovisuales     | Filtro `data-av`: `HOGARES` `CONCIERTO` `LOCALES` `SESIONES` |
| `#/ilustradores`| Ilustradores       | Galería + convocatoria |
| `#/artistas`    | Artistas           | Perfiles + formulario `#form-postulacion` / ancla `#postular` |
| `#/comunidad`   | Comunidad          | La Ronda + muro `#form-mensaje` |
| `#/apoyar`      | Sostener el hogar  | Proyecto + `#donar` / `#form-aporte` |

### API de tablas (endpoints usados desde el navegador)

- `GET  tables/{tabla}?page=&limit=&search=&sort=`
- `POST tables/{tabla}`

Tablas: `artistas`, `lanzamientos`, `audiovisuales`, `ilustraciones`,
`postulaciones`, `proyecto`, `aportes`, `ronda`, `mensajes`.

## 3. Modelo de datos

| Tabla | Campos principales |
| ----- | ------------------ |
| `artistas` | nombre, rol, bio, video_url, genero, ciudad, instagram, spotify, destacado, orden |
| `lanzamientos` | titulo, artista, tipo (Single/EP/Disco/Videoclip), anio, descripcion, link, portada_hue, orden |
| `audiovisuales` | titulo, artista, categoria (HOGARES/CONCIERTO/LOCALES/SESIONES), descripcion, ubicacion, anio, link, duracion, portada_hue, orden |
| `ilustraciones` | titulo, ilustrador, cancion, frase, descripcion, imagen_url, link, portada_hue, orden |
| `postulaciones` | nombre, email, rol, video_url, mensaje, canales, estado, fecha |
| `proyecto` | nombre, descripcion, meta, recaudado, etapa, moneda, detalle, activo |
| `aportes` | nombre, monto, mensaje, fecha |
| `ronda` | titulo, tipo, fecha, lugar, modalidad, descripcion, link |
| `mensajes` | nombre, mensaje, ciudad, fecha |

Almacenamiento: **API RESTful de tablas** del proyecto (persistencia gestionada por la
plataforma). Los datos de demostración viven en `js/api.js` (`SEED`) y en las tablas del
almacén de vista previa.

## 4. Estructura del proyecto

```
index.html        Estructura, cabecera, navegación y footer
css/style.css     Identidad visual cálida (paleta terrosa, tipografía Fraunces/Inter)
js/api.js         Capa de datos: API de tablas + dataset de respaldo + utilidades
js/views.js       Vistas de cada sección y lógica de tarjetas/formularios
js/app.js         Router SPA por hash y arranque
```

## 5. Flujo de aportes (importante)

El sitio es **estático**: no procesa pagos. El formulario de donación **registra el
compromiso del aporte** (queda en la tabla `aportes`, se refleja en el progreso y en la
pared de gracias) y luego el sello coordina con la persona el medio de pago real
(transferencia, billetera virtual o link de pago). Es importante mantener un canal
humano de contacto para concretar cada donación.

## 6. Funcionalidades NO implementadas

- Pasarela de pago real (no es posible en un sitio estático; requiere backend/credenciales).
- Subida de archivos de audio/video/imagen al servidor (solo se enlazan URLs externas).
- Reproducción embebida de video directamente en la ficha (los links abren YouTube).
- Panel de administración autenticado (una verificación en el navegador no es segura).
- Comentarios moderados / perfiles de usuario con sesión.

## 7. Próximos pasos recomendados

1. Reemplazar los datos de demostración por los reales del sello (títulos, links y
   miniaturas de YouTube de cada video).
2. Reemplazar el arte tipográfico generado por **miniaturas reales** (`imagen_url`) usando
   las portadas de los videos del canal.
3. Sumar imágenes a la galería de Ilustradores (subir las obras a un servicio de imágenes
   y guardar la URL en `imagen_url`).
4. Integrar un **link de pago / alias** real para los aportes.
5. Añadir un canal de contacto directo (WhatsApp/email) y un aviso de privacidad en los
   formularios.
6. Revisar enlaces sociales y datos de contacto del footer.

## 8. URLs públicas

- Producción / sitio publicado: usar la **pestaña Publicar** (o Hosted Deploy) para obtener
  la URL `*.gensparksite.com` o el dominio propio.
- API de datos: rutas relativas `tables/...` servidas por la plataforma.

## 9. Paleta e identidad

- Terracota `#c2603c`, ocre `#d99a3f`, crema `#f7efe3`, papel `#fffaf3`, tinta `#2b211a`.
- Tipografía: **Fraunces** (display, serif cálida) + **Inter** (texto).
- Concepto: el hogar como refugio, la casa como primer escenario y la comunidad como red
  (`#hogarenhosenred`).

---

© HOGAREÑOS — Hecho en comunidad.
Contacto: hogarenhos@gmail.com
