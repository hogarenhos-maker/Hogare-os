# HOGAREÑOS — Hogar Virtual

Sitio web del sello artístico y productora musical/audiovisual **HOGAREÑOS**
(YouTube: [@Hogarenhos](https://www.youtube.com/@Hogarenhos/)).

El objetivo es construir un **Hogar Virtual**: un espacio cálido, colectivo e
independiente que conecta personas a través de la música y el arte, da lugar a
los distintos formatos de contenido del sello y abre puertas concretas para
participar, encontrarse y sostener los proyectos.

---

## 1. Funcionalidades completas

- **Navegación SPA por hash** (`#/ruta`) con nueve secciones + inicio, sin recargar página.
- **Inicio**: hero con ilustración SVG de una casa, manifiesto, valores del hogar
  (Colectivo / Independiente / Constructivo / De contención) y resumen del proyecto activo.
- **Grabaciones en estudio**: catálogo con filtros por tipo (Singles, EP's, Discos, Videoclips).
- **Audiovisuales**: filtros por formato (HOGARES, CONCIERTO, LOCALES, SESIONES), con
  tarjeta explicativa del significado de cada formato.
- **Ilustradores**: galería de obras que "interpretan el mensaje" de frases del cancionero,
  con instrucciones de participación.
- **Artistas**: perfiles de los artistas del sello con video presentación enlazado, y
  **formulario de postulación** conectado a la API de tablas.
- **Productora**: catálogo de servicios con **valores por formato** (Single, EP, Disco,
  Videoclip, HOGARES, CONCIERTO, LOCALES, SESIONES y combos), filtros por categoría,
  pasos del proceso y **formulario de solicitud de presupuesto**.
- **Semillero**: espacio abierto donde "todo el mundo puede crear". Cualquiera planta
  una idea/letra/melodía/poema/proyecto (**formulario**) y aparece como "semilla" con su
  estado de crecimiento; incluye el **Tablón** de "Busco / Ofrezco" para encontrarse y
  colaborar (**formulario**).
- **Cursos y suscripción**: formación musical, humana y de oficios. Cursos **abiertos y
  gratuitos** para toda la comunidad + cursos **exclusivos para suscriptores**, con
  filtros por categoría. Incluye **planes de suscripción** (Vecino/a, Habitante del Hogar,
  Sostén del Hogar) y **formulario de pre-inscripción** conectado a la API.
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
| `#/productora`  | Productora         | Filtro `data-serv`: `Grabaciones en estudio` `Audiovisuales` `Combos` · formulario `#form-solicitud` / ancla `#presupuesto` |
| `#/semillero`   | Semillero          | Formulario `#form-semilla` + Tablón `#form-tablon` |
| `#/cursos`      | Cursos y suscripción| Filtro `data-cur`: `Música` `Humanidad` `Oficios` `abiertos` · planes + formulario `#form-suscripcion` / ancla `#alta` |
| `#/comunidad`   | Comunidad          | La Ronda + muro `#form-mensaje` |
| `#/apoyar`      | Sostener el hogar  | Proyecto + `#donar` / `#form-aporte` |

### API de tablas (endpoints usados desde el navegador)

- `GET  tables/{tabla}?page=&limit=&search=&sort=`
- `POST tables/{tabla}`

Tablas: `artistas`, `lanzamientos`, `audiovisuales`, `ilustraciones`,
`postulaciones`, `proyecto`, `aportes`, `ronda`, `mensajes`, `servicios`,
`solicitudes`, `semillero`, `tablon`, `cursos`, `planes`, `suscripciones`.

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
| `servicios` | nombre, categoria (Grabaciones en estudio/Audiovisuales/Combos), descripcion, precio, moneda, incluye, entrega, icono, destacado, orden |
| `solicitudes` | nombre, email, servicio, mensaje, estado, fecha |
| `semillero` | titulo, autor, tipo (Idea/Canción/Letra/Poesía/Melodía/Instrumental/Proyecto/Grabación), descripcion, estado (Semilla/En germinación/Floreciendo/Cosechada), etiquetas, fecha |
| `tablon` | modalidad (Busco/Ofrezco), titulo, detalle, autor, contacto, etiquetas, fecha |
| `cursos` | titulo, docente, categoria (Música/Humanidad/Oficios), nivel, descripcion, temario, duracion, modalidad, precio, precio_socio, moneda, acceso (Abierto/Suscriptores), cupos, icono, destacado, orden |
| `planes` | nombre, publico, precio, moneda, periodo, beneficios, destacado, orden |
| `suscripciones` | nombre, email, plan, interes, mensaje, fecha, estado (Nueva/Activa/Pausada/Cancelada) |

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

## 5. Flujo de aportes y suscripciones (importante)

El sitio es **estático**: no procesa pagos ni gestiona sesiones de usuario reales.

- **Donaciones**: el formulario **registra el compromiso del aporte** (tabla `aportes`, se
  refleja en el progreso y la pared de gracias) y luego el sello coordina el medio de pago
  real (transferencia, billetera virtual o link de pago).
- **Cursos y suscripción**: el formulario es una **pre-inscripción** (tabla `suscripciones`).
  No se cobra desde la página. El "acceso para suscriptores" es informativo: para dar
  contenido realmente protegido haría falta un backend con autenticación (fuera del
  alcance de un sitio estático). Mantener siempre un canal humano de contacto.

## 6. Funcionalidades NO implementadas

- Pasarela de pago real (no es posible en un sitio estático; requiere backend/credenciales).
- **Login / área privada real para suscriptores**: no se puede proteger de forma segura en
  el navegador. El "acceso para suscriptores" es actualmente informativo.
- Reproducción de video/audio de los cursos dentro de la página (no hay alojamiento de
  archivos; se enlazan URLs externas).
- Subida de archivos de audio/video/imagen al servidor (solo se enlazan URLs externas).
- Panel de administración autenticado (una verificación en el navegador no es segura).
- Comentarios moderados / perfiles de usuario con sesión.

## 7. Próximos pasos recomendados

1. Reemplazar los datos de demostración por los reales del sello (títulos, links y
   miniaturas de YouTube de cada video).
2. Reemplazar el arte tipográfico generado por **miniaturas reales** (`imagen_url`) usando
   las portadas de los videos del canal.
3. Sumar imágenes a la galería de Ilustradores (subir las obras a un servicio de imágenes
   y guardar la URL en `imagen_url`).
4. Integrar un **link de pago / alias** real para los aportes y las suscripciones.
5. Cargar el **temario y las fechas** reales de cada curso, y enlazar los materiales
   (PDF, videos) de cada clase.
6. Añadir un canal de contacto directo (WhatsApp/email) y un aviso de privacidad en los
   formularios.
7. Revisar enlaces sociales y datos de contacto del footer.

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
