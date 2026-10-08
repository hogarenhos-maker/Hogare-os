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
    { id: "l1", titulo: "Cristales (feat. Simón Pérez)", artista: "Tomás Montenegro", tipo: "Single", anio: 2019, descripcion: "Tu mirar, que encierra en mi cuerpo el diamante, cierro los ojos y siento, ansiedad.", link: "https://www.youtube.com/watch?v=mXH--YIc-zQ", portada_hue: 28, orden: 1 },
    { id: "l2", titulo: "Mañana del sur", artista: "Tomás Montenegro", tipo: "Single", anio: 2019, descripcion: "Lo eterno es solo un instante y se congela en el viento. Solo el viento te hará encontrar la voz.", link: "https://www.youtube.com/watch?v=O0yxfmp2NnY", portada_hue: 40, orden: 2 },
    { id: "l3", titulo: "Sinergia", artista: "Simón Pérez y Pabloncho Moreno", tipo: "Álbum", anio: 2019, descripcion: "Sinergia es posible gracias a todos los que aportaron sus energias para crear este mundo y compartir con una entrega de amor hacia la concentración de lo que hoy se transluce en este disco.", link: "https://www.youtube.com/watch?v=Cg0tU_KGrWQ", portada_hue: 18, orden: 3 },
    { id: "l4", titulo: "Razón de ser", artista: "Pabloncho Moreno", tipo: "Single", anio: 2019, descripcion: "Una canción será un experimento.", link: "https://www.youtube.com/watch?v=JEsKE8HkE0o", portada_hue: 96, orden: 4 },
    { id: "l6", titulo: "Semillas", artista: "Simón Pérez", tipo: "EP", anio: 2020, descripcion: "Cada una de estas canciones acompañaron un momento bisagra en mi vida, es por ello que cada una tiene su personalidad. Son parte de un experimento sensorial, ya que cada canción es una semilla, que dará como fruto 3 futuros discos. Ha sido sembrado para expandirse", link: "https://www.youtube.com/watch?v=X6B6FrOeugk", portada_hue: 110, orden: 5 },
    { id: "l7", titulo: "Aterciopelado", artista: "Ger Oboi", tipo: "EP", anio: 2020, descripcion: "Aterciopelado es el fruto de muchas vivencias e historias devenidas en canciones (todas compuestas entre 2016 y 2017). Musicalmente hay una búsqueda experimental con un gran cuidado de la canción en su etapa mas orgánica y las emociones. El amor, el sueño, los abrazos, el otoño, el desamor, el aprendizaje, lo suave, lo cálido, la luz, la oscuridad... Todo convive allí, desde un lugar que busca crecer en lo musical y, fundamentalmente, en el ser. Amor post amor", link: "https://www.youtube.com/watch?v=igrETsxFmLE", portada_hue: 110, orden: 6 },
    { id: "l8", titulo: "Transformación Astral", artista: "Mentales Cebras", tipo: "Videoclip", anio: 2020, descripcion: "Otra vez de nuevo. Para mi todo es extraño. Vuelvo a redundar", link: "https://www.youtube.com/watch?v=zvNxAjpJZKY", portada_hue: 110, orden: 7 },
    { id: "l9", titulo: "Transporte", artista: "Pabloncho Moreno", tipo: "Álbum", anio: 2020, descripcion: "Transporte es un concepto que refleja una etapa de mi vida plasmada en este registro de siete canciones compartidas y co-creadas con gente que admiro y amo. Transporte como viaje sensitivo, como dejarse llevar, y dejar ir.", link: "https://www.youtube.com/watch?v=FTt1i7H6N5g", portada_hue: 110, orden: 8 },
    { id: "20", titulo: "Llega", artista: "Pabloncho Moreno", tipo: "Videoclip", anio: 2020, descripcion: "Busca tu cielo. Busca el mar su consuelo. Mira de nuevo. Acá estoy y te espero", link: "https://www.youtube.com/watch?v=o163zglcuvc", portada_hue: 110, orden: 9 },
    { id: "21", titulo: "Sueño heroico", artista: "Mentales Cebras", tipo: "Videoclip", anio: 2020, descripcion: "Cada lugar que me llega no entiendo y pierdo el control al hacer el intento.", link: "https://www.youtube.com/watch?v=jmJ-nye0m-Y", portada_hue: 110, orden: 10 },
    { id: "22", titulo: "Todo el día", artista: "Santiago Diez", tipo: "Single", anio: 2020, descripcion: "Dame una sola cosa, llevo tiempo esperando, pero no lo ves.", link: "https://www.youtube.com/watch?v=hvQRyJFEOIk", portada_hue: 110, orden: 11 },
    { id: "23", titulo: "Un Cielo (feat. Pabloncho Moreno & Simón Pérez)", artista: "Ignacio Pol", tipo: "Single", anio: 2021, descripcion: "Ves que soy un ave buscando asilo.", link: "https://www.youtube.com/watch?v=PhnWbMu0_l0", portada_hue: 110, orden: 12 },
    { id: "24", titulo: "Pasatiempo", artista: "Santiago Diez", tipo: "Single", anio: 2021, descripcion: "Mil canciones de amor sin amor", link: "https://www.youtube.com/watch?v=DDp3_mztRbs", portada_hue: 110, orden: 13 },
    { id: "25", titulo: "Saltar", artista: "Simón Pérez", tipo: "Videoclip", anio: 2022, descripcion: "Se para crecer. Ve para soñar despierto", link: "https://www.youtube.com/watch?v=MKHDZIwmU-E", portada_hue: 110, orden: 14 },
    { id: "26", titulo: "Habitarme", artista: "Ruth", tipo: "Álbum", anio: 2022, descripcion: "Habitarme es la apertura de un portal a los sueños, a transitar y sanar desde el arte. Nace desde un viaje cuando empecé a habitar los lugares y a mí misma.  La vida me cambio en poco tiempo, animarme a sacar este material es poder poner en palabras este transitar, les invito a viajar cósmicamente, a que se habiten y abracen.", link: "https://www.youtube.com/watch?v=_6KAxob5GaQ", portada_hue: 110, orden: 15 },
    { id: "27", titulo: "Moi Non Plus", artista: "Juan Pablo & Lavanda", tipo: "Single", anio: 2022, descripcion: "No me gusta la humanidad, pero soy parte de ella.", link: "https://www.youtube.com/watch?v=v0lbgH7gd8g", portada_hue: 110, orden: 16 },
    { id: "28", titulo: "Salto al vacío", artista: "Juan Pablo & Lavanda", tipo: "Álbum", anio: 2022, descripcion: "Salto al vacío es la exposición de lo íntimo ante el universo y el astronauta es el miedo de vivir. El salto al vacío es la decisión de apropiarse del propio salto. El dejar ir, aprender a soltar. Confiar en estar preparado para la caída, lo que vendrá. No sé qué va a suceder, pero sé lo que voy a hacer. Eso está anticipado en 'Moi non plus'  Cuando vivo consciente soy y con miedo necesitas una máscara para que la realidad no te ahogue. Bienvenido a este viaje nuestro. Saltemos juntos.", link: "https://www.youtube.com/watch?v=wEO5W2Zs6vA", portada_hue: 110, orden: 17 },
    { id: "29", titulo: "Sinestesia", artista: "Ger Oboi", tipo: "Álbum", anio: 2022, descripcion: "Ger oboi es la consecuencia de un viaje desde la conciencia atravesado a su vez por la inconciencia. La búsqueda de nuevos caminos y del crecimiento personal se hizo andar a través de las canciones. Desde Chimpay a Fiske y desde Fiske a Villa María. Sinestesia es el resultado de un trayecto de ese viaje. El amor, el desamor, la soledad, el desapego, los encuentros, los reencuentros todo nutriendo a este concepto desde lugares ambivalentes. Sinestesia, también es el inicio de una búsqueda sonora y conceptual. Partiendo de la canción en su primera forma hacia la construcción de capas que reflejen un (o más) sentir/es. Un punto de partida, una búsqueda infinita.", link: "https://www.youtube.com/watch?v=rgD3Uc-jyc0", portada_hue: 110, orden: 18 },
    { id: "30", titulo: "Pantallas", artista: "Santiago Diez", tipo: "Single", anio: 2023, descripcion: "Tanto tiempo nos vimos detrás de la pantalla, ahora que nos cruzamos de frente no sé qué va a pasar", link: "https://www.youtube.com/watch?v=sPBmHOFaX0k", portada_hue: 110, orden: 19 },
    { id: "31", titulo: "Empujón", artista: "Lois Negri", tipo: "Single", anio: 2023, descripcion: "No imaginé que fuera a sentirse así. Que algo tan hermoso sepa a dolor, eso no fue amor.", link: "https://www.youtube.com/watch?v=ZVL6SDqOMag", portada_hue: 110, orden: 20 },
    { id: "32", titulo: "Paraíso de Cristal", artista: "Lois Negri", tipo: "Single", anio: 2023, descripcion: "Prende fuego ya mis venas y verás. Concreta ya con densidad, lo que tenia que pasar. Prende la llama y verás.", link: "https://www.youtube.com/watch?v=XaclP1mXoDY", portada_hue: 110, orden: 21 },
    { id: "32", titulo: "Paraíso de Cristal", artista: "Lois Negri", tipo: "Álbum", anio: 2023, descripcion: "Though time made his shell harder and thicker, its inside always remained tender.", link: "https://www.youtube.com/watch?v=x6sVVJYApZQ", portada_hue: 110, orden: 22 },
    { id: "33", titulo: "Vida mía", artista: "Laura Roggiapane y Danel Garcés (Osvaldo Fresedo)", tipo: "Single", anio: 2023, descripcion: "Vida mía, lejos, mas te quiero", link: "https://www.youtube.com/watch?v=jCxWmlDnBPI", portada_hue: 110, orden: 23 },
    { id: "34", titulo: "Sol lunar", artista: "Juan Rossa", tipo: "Álbum", anio: 2023, descripcion: "En este mundo donde lo más difícil es mirar el contenido del ser, estamos distraídos, perdiéndonos lo más elemental y lo que menos nos cuesta tener. A través de este trabajo artístico conceptual lo que se busca es que, el general de la gente, logre tener sorpresivamente un momento dedicado exclusivamente a su crecimiento interior, es Mi grano de arena como artista para ayudar a esta sociedad", link: "https://www.youtube.com/watch?v=PQ98ol_9m-E", portada_hue: 110, orden: 24 },
    { id: "35", titulo: "Qué es lo que quieren de mí", artista: "Gasti Seguí", tipo: "Single", anio: 2024, descripcion: "Ya no quiero más pensar en ti, en ti. Solo quiero deshacerme a mí, a mí.", link: "https://www.youtube.com/watch?v=_G8te48RBYU", portada_hue: 110, orden: 25 },
    { id: "36", titulo: "Ciclo sin fin", artista: "Ger Oboi", tipo: "Videoclip", anio: 2024, descripcion: "La ola ya rompió y quedamos cubiertos del error y es así un ciclo sin fin.", link: "https://www.youtube.com/watch?v=MwHtUk65iL8", portada_hue: 110, orden: 26 },
    { id: "37", titulo: "Quédate", artista: "RAIANO & Santiago Diez", tipo: "Single", anio: 2024, descripcion: "Quédate un ratito más, mirando las olas en el mar.", link: "https://www.youtube.com/watch?v=H1TdVMltvN0", portada_hue: 110, orden: 27 },
    { id: "38", titulo: "Mendigo del desierto", artista: "RAIANO & Santiago Diez", tipo: "Single", anio: 2024, descripcion: "Aquí es que se encuentran los que perdieron en el camino.", link: "https://www.youtube.com/watch?v=8odLo_KUCCY", portada_hue: 110, orden: 28 },
    { id: "39", titulo: "Evolución", artista: "Simón Pérez", tipo: "Álbum", anio: 2024, descripcion: "Si la música es mi guía en la vida, ésta etapa es un proceso evolutivo donde coseché mucha entrega desde la búsqueda interna, el reconocimiento y el llamado de la intuición a que la magia suceda.", link: "https://www.youtube.com/watch?v=sqgqcQdTCY4", portada_hue: 110, orden: 29 },
    { id: "40", titulo: "Tres Océanos", artista: "Juan Rossa", tipo: "EP", anio: 2024, descripcion: "Tres océanos es un trabajo muy comprometidos del área psicológica emocional. Habla de los tres momentos más profundos actualmente en mi vida de la bronca social de la falta de amor y del enojo por gente viviendo mal", link: "https://www.youtube.com/watch?v=mx4DBK4VWbg", portada_hue: 110, orden: 30 },
    { id: "41", titulo: "El último café", artista: "Ivana Gabetta", tipo: "Single", anio: 2025, descripcion: "Y allí, con tu impiedad me vi morir de pie.", link: "https://www.youtube.com/watch?v=n3xhBJ5ZJt4", portada_hue: 110, orden: 31 },
    { id: "42", titulo: "Gota de lluvia", artista: "Ivana Gabetta", tipo: "Single", anio: 2025, descripcion: "Pero si tu amor sólo fue visión de mi soledad.", link: "https://www.youtube.com/watch?v=AT4rNbtIpi8", portada_hue: 110, orden: 32 },
    { id: "43", titulo: "Vacío", artista: "Juan Pablo & Lavanda", tipo: "Single", anio: 2025, descripcion: "La vida siempre pesa y no te deja respirar.", link: "https://www.youtube.com/watch?v=1o81htTggEQ", portada_hue: 110, orden: 33 },
    { id: "44", titulo: "Reflejo Interno", artista: "Juan Rossa", tipo: "EP", anio: 2025, descripcion: "Reflejo interno es un trabajo que habla un poco de la bipolaridad que existe entre la sensación de libertad y amor en la adolescencia o en una etapa ideal de la vida en contracara a la actualidad enviciada, urbanizada y tóxica en la que vivimos. Sin embargo, a pesar de todo nuestro acostumbramiento a lo cotidiano siempre aparece un ser interior a recordar lo que somos en nuestro más puro estado. Nuestro Reflejo interno", link: "https://www.youtube.com/watch?v=g1hZVwazz88", portada_hue: 110, orden: 34 },
    { id: "45", titulo: "Decide", artista: "Esteban Stanfield", tipo: "Videoclip", anio: 2025, descripcion: "(Se cauto y esfuérzate por ser feliz, esa sonrisa vale más que oro en este día gris.", link: "https://www.youtube.com/watch?v=Qkv0cvhF_u0", portada_hue: 110, orden: 35 },
    { id: "46", titulo: "Persona", artista: "Juan Rossa", tipo: "EP", anio: 2025, descripcion: "Persona es un trabajo que demuestra la fuerza que da el superar un obstáculo qué se puede presentar en cualquier momento de la vida. Una persona está compuesta por muchas vivencias de distintos sentires, entre el amor, bronca, esperanza, tristeza, alegría, etcétera. En este trabajo se invita al oyente a sentirse crudo consigo mismo recordando sobre todo cómo es como persona", link: "https://www.youtube.com/watch?v=UZKfHbezW5Q", portada_hue: 110, orden: 36 },
    { id: "47", titulo: "Bajo esta luz de enero", artista: "Pasajeros", tipo: "EP", anio: 2025, descripcion: "Pasajeros vive hace muchos años, y vivió muchas transformaciones en instrumentaciones y personas que aportaron a que hoy se conforme, sea sólido su esencia y se registren estas 3 canciones de muchas composiciones emblematicas de la banda", link: "https://www.youtube.com/watch?v=EWhbwkkPnbQ", portada_hue: 110, orden: 37 },
    { id: "48", titulo: "Cielo enraizado", artista: "Néctar", tipo: "Álbum", anio: 2025, descripcion: "Que el poder de la palabra viaje a través de la música hasta tu centro y brote por tu piel, despertando esa magia única que resulta de la mezcla con tu ser.", link: "https://www.youtube.com/watch?v=WfnWHtw3y3I", portada_hue: 110, orden: 38 },
    { id: "49", titulo: "Cómo no te voy a querer", artista: "Arthuro Mar", tipo: "Single", anio: 2026, descripcion: "Solo tengo un intento para darte lo que tengo.", link: "https://www.youtube.com/watch?v=MgkMGMuyzDc", portada_hue: 110, orden: 39 },
    { id: "50", titulo: "Dehiscente", artista: "Chicho Negri", tipo: "EP", anio: 2026, descripcion: "Apertura espontánea y natural. Vivir con intensidad el camino, disfrutar los detalles, de eso se trata.", link: "https://www.youtube.com/watch?v=PPfdO0fPHls", portada_hue: 110, orden: 40 },
    { id: "51", titulo: "La urgencia", artista: "Arthuro Mar", tipo: "Single", anio: 2026, descripcion: "Es tan urgente vernos hoy, para calmar este dolor", link: "https://www.youtube.com/watch?v=i5GWs1ZfsaQ", portada_hue: 110, orden: 41 },
    { id: "52", titulo: "Mudarse", artista: "Simón Pérez", tipo: "Videoclip", anio: 2026, descripcion: "Mudarse es morir y ver; verse crecer y vuelvo a nacer.", link: "https://www.youtube.com/watch?v=TIHm_dSqTVM", portada_hue: 110, orden: 42 },
    { id: "53", titulo: "Resiliencia", artista: "Chicho Negri", tipo: "EP", anio: 2026, descripcion: "Frente a un disturbio organizamos la resistencia, reforzamos la contención y así rebrota la esperanza", link: "https://www.youtube.com/watch?v=sGT-9Ss3gFc", portada_hue: 110, orden: 43 },
    { id: "54", titulo: "Bayona (entre tanto sol)", artista: "Arthuro Mar", tipo: "Single", anio: 2026, descripcion: "Nos queda pendiente volver, volver a intentarlo otra vez.", link: "https://www.youtube.com/watch?v=KgP5ELa6wvw", portada_hue: 110, orden: 44 },
    { id: "55", titulo: "Cuidaremos la tierra", artista: "La banda de la Ronda, Andrea Barresi & Nahuel Troncoso", tipo: "Single", anio: 2026, descripcion: "Vuelve, vuelve lo verde a nacer. Con la fuerza de la Pacha y nuestras voces juntas, cuidaremos la tierra.", link: "https://www.youtube.com/watch?v=erR1m1c4lfw", portada_hue: 110, orden: 45 },
    { id: "56", titulo: "La verdad (Diarios del silencio - VOL 1)", artista: "Juan Rossa", tipo: "EP", anio: 2026, descripcion: "En este trabajo pudimos afirmar un mensaje, la verdad tiene su tiempo para ser verdad. Justamente ha pasado el tiempo y este mensaje sigue vivo. El rock y las melodías son fruto de la necesidad de expresarme. No hay nada más visceral que la misma verdad.", link: "https://www.youtube.com/watch?v=tYu4DCVX6Ts", portada_hue: 110, orden: 46 },
    { id: "57", titulo: "Sentires y asombros (VOL 1)", artista: "Mario Pérez", tipo: "EP", anio: 2026, descripcion: "Algo inesperado, maravilloso, quizás imaginado, quizás deseado, y de pronto sumergió de entre la nada o el todo....sentimientos encontrados. En este EP Volumen 1 y los que vendrán quiero interpretar algunas de las canciones que surcan hondo en mi", link: "https://www.youtube.com/watch?v=uo-akoyqPfc", portada_hue: 110, orden: 47 },
    { id: "58", titulo: "La vida (Diarios del silencio - VOL 2)", artista: "Juan Rossa", tipo: "EP", anio: 2026, descripcion: "En este trabajo pudimos afirmar un mensaje, la verdad tiene su tiempo para ser verdad. Justamente ha pasado el tiempo y este mensaje sigue vivo. El rock y las melodías son fruto de la necesidad de expresarme. No hay nada más visceral que la misma verdad.", link: "https://www.youtube.com/watch?v=gaCxB8Mwwo0", portada_hue: 110, orden: 48 },
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