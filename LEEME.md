# Apps Contables · Sitio de Buzón SOL

Sitio estático: portada, página de producto de **Buzón SOL**, dos páginas de
aplicaciones en preparación, blog de novedades con tres notas, contacto y 404.
Sin frameworks, sin instalación y sin dependencias. Se abre con doble clic y se
sube a cualquier hosting.

Hoy hay **una sola aplicación real**: Buzón SOL. SIRE y CPE, y Facturación
electrónica, se muestran como "En preparación" y están marcadas `noindex`.

---

## 1. Cómo verlo ahora

Abre `index.html` con doble clic. Todo funciona en local: menú, modo oscuro,
enlaces, formulario (abre WhatsApp) y anchors de la portada.

Para probarlo como si estuviera publicado, desde esta carpeta:

```powershell
# Opción rápida con Python instalado
python -m http.server 8080
# Luego abre http://localhost:8080
```

---

## 2. Personalizar en 5 minutos

### 2.1 Tu marca

La marca ya está configurada como **Apps Contables**, con el dominio
**appscontables.com** y el correo **appscontablesperu@gmail.com**. El logotipo
vive en `logo-apps-contables/` y su guía de uso está en
`logo-apps-contables/README.md`.

El header y el pie no usan la imagen completa: muestran el isotipo
(`icono-marca.svg`, 30 px) más el texto en HTML ("Apps Contables" y "Software
contable"). Así el logotipo se adapta solo al tema claro y oscuro, y el nombre
sigue siendo texto seleccionable para lectores de pantalla.

Si algún día cambias de nombre, usa buscar y reemplazar en todos los `.html`,
`.css`, `.js` y `.md`:

| Buscar | Reemplazar por |
|---|---|
| `Apps Contables` | Tu nuevo nombre |
| `Software contable` (bajada del logo) | Tu bajada, ej. "Software para contadores" |
| `appscontables.com` | Tu nuevo dominio |

Para cambiar el isotipo, reemplaza `logo-apps-contables/icono-marca.svg`
manteniendo el formato: cuadrado de 100×100 con esquinas redondeadas. Después
vuelve a exportar `favicon-32.png`, `icono-180.png`, `icono-512.png` y
`og-image.png` para que favicon, app móvil y vista previa sigan coincidiendo.

Los lockups (`logo-horizontal.svg`, `logo-oscuro.svg`,
`logo-horizontal-tagline.svg`) tienen el texto convertido a curvas. Para cambiar
las palabras hay que editarlos en un editor vectorial (Illustrator, Figma,
Inkscape) o volver a generarlos.

### 2.2 WhatsApp, correo y descarga (un solo lugar)

Abre `assets/js/sitio.js` y edita el bloque de arriba:

```js
const CONFIG = {
  whatsapp: "51977109374",                 // código de país + número, sin espacios
  correo: "appscontablesperu@gmail.com",
  descarga: "https://…/BuzonSOL.exe",      // enlace directo al instalador
  formulario: "https://script.google.com/macros/s/AKfy…/exec",  // ver 2.4
  formGoogle: "https://docs.google.com/forms/d/e/…/viewform", // respaldo
};
```

Todos los botones con `data-wa="..."`, `data-correo="..."` y `data-descarga`
toman esos datos automáticamente, en todas las páginas. Los botones de prueba
de 15 días son enlaces normales a `prueba.html`.

> **Pendiente importante:** el instalador apunta hoy a
> `https://raw.githubusercontent.com/SoftCax/PublishApps/main/BuzonSOL/BuzonSOL.exe`.
> Cuando publiques el archivo en tu propio dominio, cambia solo ese valor.

### 2.3 Precios

Los planes ya están cargados en `buzon-sol.html#planes` y en la portada:

| Plan | Precio | Empresas |
|---|---|---|
| Básico | S/ 150 al año por PC | 20 |
| Estándar (más solicitado) | S/ 250 al año por PC | 100 |
| Plus | S/ 300 al año por PC | 200 |

Para cambiar un precio, edita el bloque del plan correspondiente:

```html
<p class="plan__precio">S/ 250 <span>/ PC al año</span></p>
<p class="plan__empresas">Hasta 100 empresas</p>
```

Recuerda actualizar también el `offers` del JSON-LD en `index.html` y
`buzon-sol.html`, y el resumen de `contacto.html`.

La licencia de prueba (15 días, plan Básico) se pide en `prueba.html`, con un
formulario propio. Cómo conectarlo a Google Sheets, en el punto 2.4.

### 2.4 Formulario de licencia y Google Sheets

La página `prueba.html` tiene el formulario "Obtén tu licencia de prueba" con los
mismos campos del Google Form: DNI, nombre, situación, código de PC, alias,
celular y correo.

**Estado actual:** ya está conectado. El formulario envía un `POST` al Web App de
Apps Script y escribe la fila al final de la pestaña **LPBuzonSol** de la hoja.
El script vive **solo** en el proyecto de Apps Script vinculado a la hoja
(Extensiones → Apps Script); no forma parte del sitio y no se publica.

```js
// assets/js/sitio.js
formulario: "https://script.google.com/macros/s/AKfy…/exec",
```

Funciona de dos maneras, sin cambiar el HTML:

1. **Con Apps Script (lo que está activo).** La solicitud se guarda en la hoja y
   el sitio muestra el panel de "Solicitud enviada", sin salir de la página.
2. **Sin `formulario` configurado.** Si la constante queda vacía, el botón abre el
   Google Form con los datos ya cargados (`CONFIG.formCampos` tiene los `entry.*`).
   Sirve como respaldo si el Web App deja de responder.

Para cambiar de hoja o de pestaña:

1. Edita `NOMBRE_HOJA` en el script (debe coincidir exacto con el nombre de la
   pestaña; si no existe, se crea con los encabezados).
2. Republica: **Implementar → Administrar implementaciones → lápiz → Nueva
   versión**. La URL `/exec` no cambia.
3. La implementación debe ser **Aplicación web**, con *Ejecutar como: Yo* y
   *Quién tiene acceso: Cualquier persona*.

Para comprobar que responde, abre la URL `/exec`: devuelve
`{"ok":true,"servicio":"licencias"}`.

> El script está vinculado a la hoja, por eso usa `getActiveSpreadsheet()`. Si lo
> pasas a un proyecto independiente, cámbialo por
> `SpreadsheetApp.openById("ID_DEL_LIBRO")`.
### 2.5 Tu dominio

Reemplaza `https://appscontables.com` por tu dominio real en:

- `sitemap.xml`
- `robots.txt`
- las etiquetas `<link rel="canonical">` y `og:url` de cada `.html`

Búsqueda y reemplazo global: `https://appscontables.com` → `https://tudominio.pe`.

### 2.6 Colores

Todo el sistema de diseño está en `assets/css/estilos.css`, bloque `:root` del inicio:

```css
--brand: #4a1fa0;       /* morado de enlaces, títulos y foco */
--accent: #10b583;      /* verde de los botones */
--accent-dark: #0da47a; /* verde del hover */
--accent-ink: #0a7d5e;  /* verde oscuro para textos pequeños sobre fondo claro */
--ok: #087657;          /* verde de los checks */
```

Los fondos morados (`#1b1035`, `#2a1160`) están en el hero, los bloques oscuros y
el pie. `--accent-ink` existe por accesibilidad: el verde brillante funciona en
botones, pero como texto pequeño no llega al contraste AA. Si cambias el verde,
mantén esa separación.

Cambia esos valores y el sitio entero se reajusta, incluido el modo oscuro
(que tiene su propio bloque `html[data-theme="dark"]`). El `theme-color` de las
11 páginas es `#1b1035`: si cambias el morado de fondo, actualízalo también en
el `<head>` de cada página.

---

## 3. Mapa de archivos

```
index.html                        Portada: hero, apps, cómo empezar, capacitaciones, notas, FAQ
buzon-sol.html                    Producto: Buzón SOL (el único disponible)
sire-cpe.html                     En preparación · noindex
facturacion-electronica.html      En preparación · noindex
novedades.html                    Índice del blog
novedad-revisar-buzon.html        Nota: qué revisar antes de un plazo
novedad-adjuntos.html             Nota: adjuntos y respaldos
novedad-credenciales.html         Nota: claves SOL que fallan
contacto.html                     Formulario + datos de contacto
prueba.html                       Formulario de licencia de prueba (15 días)
404.html                          Página de error
assets/css/estilos.css            Todo el diseño y el modo oscuro
logo-apps-contables/              Marca: isotipo, lockups, favicons y og:image (ver su README)
assets/img/buzon-sol-icono-*.png  Logo de Buzón SOL (128 y 256 px) para el correo del hero
plantillas-correo/licencia.html    Correo de licencia (mnsLicencia)
plantillas-correo/vencimiento.html Correo de aviso de vencimiento (mnsVencimiento)
assets/js/sitio.js                Config, tema, menú, WhatsApp, descarga, formulario
robots.txt / sitemap.xml          SEO
```

Cada página es HTML independiente: su contenido se indexa sin depender de
JavaScript. Es la diferencia principal con sitios de una sola página que cargan
todo por JS.

---

## 4. Publicar

Cualquiera de estas opciones sirve; todas son gratis con el plan básico.

1. **GitHub Pages** — repo público, Pages desde la rama principal. Ver abajo.
2. **Cloudflare Pages** — admite el repo **privado** y no pide tarjeta.
3. **Netlify** — arrastras la carpeta o conectas el repo (privado en el plan free).
4. **Amazon S3 + CloudFront** — control fino de caché y certificados; es de pago.

Como no hay build, el directorio de publicación es la raíz del proyecto.

### GitHub Pages

1. Crea un repo **público** (el plan free de Pages no publica repos privados).
2. Sube el contenido de esta carpeta **a la raíz del repo**, no en una subcarpeta.
3. Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.
4. El sitio queda en `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

El archivo `.nojekyll` ya está creado: evita que Jekyll procese el sitio y que
ignore carpetas con guion bajo. `.gitignore` deja fuera `apps-script/` y `*.gs`.

**Dominio propio:** Settings → Pages → Custom domain (`appscontables.com`), luego
en el DNS los registros `A` del dominio raíz a `185.199.108.153`,
`185.199.109.153`, `185.199.110.153` y `185.199.111.153`, y un `CNAME` de `www`
a `TU-USUARIO.github.io`. Al final, activa **Enforce HTTPS**. El `CNAME` no debe
crearse antes de tener el DNS listo: si existe, GitHub redirige la URL de prueba.

**Qué no debe llegar al repo:** el `.gs` del Web App. Un archivo borrado sigue en
el historial de git, así que la regla es no subirlo nunca (ya está en
`.gitignore`). La URL `/exec` de `assets/js/sitio.js` sí es pública por diseño:
la seguridad depende de las validaciones del script, no de esconder la URL.

---

## 5. Antes de publicar: lista de pendientes

- [x] Marca, dominio, WhatsApp y correo configurados.
- [x] Una sola página de producto real (Buzón SOL) y dos "En preparación".
- [x] Planes anuales y formulario de prueba en `prueba.html`.
- [x] Formulario de prueba conectado a la hoja (`LPBuzonSol`) por Apps Script.
- [ ] Reemplazar el enlace del instalador por uno de tu propio dominio
      (`CONFIG.descarga` en `assets/js/sitio.js`).
- [ ] Añadir un aviso de privacidad propio si vas a pedir RUC, DNI o datos
      personales (Ley N.º 29733). El formulario ya incluye una mención breve.
- [ ] Cambiar los enlaces de YouTube y Facebook del pie (hoy son `#`).
- [ ] Añadir capturas reales del aplicativo. El hero muestra hoy una adaptación
      del correo de resumen en un móvil (solo HTML/CSS, con el logo real en
      `assets/img/`). Si consigues capturas, puedes reemplazarlo por imágenes.
- [ ] Conectar Google Search Console y enviar `sitemap.xml`.

### Sobre `noindex`

`sire-cpe.html` y `facturacion-electronica.html` incluyen
`<meta name="robots" content="noindex, follow">` y **no** están en `sitemap.xml`.
Cuando alguno salga a producción: quita esa etiqueta y agrégalo al sitemap.

### Sobre las afirmaciones de SUNAT

El pie incluye la nota de que el sitio no es un canal oficial. Mantén esa
aclaración y evita frases que sugieran respaldo de SUNAT. "Revisa el Buzón SOL de
SUNAT" es correcto; "conectado oficialmente a SUNAT" no lo es.

---

## 6. Cómo funcionan los formularios

Hay dos formularios y funcionan distinto:

**`contacto.html`** no tiene backend: al enviar, arma un mensaje con los datos y
abre WhatsApp con el texto listo. Ventaja: cero costo y cero base de datos que
proteger. Si prefieres recibir correos, cambia el `submit` por un servicio como
Formspree y quita el `preventDefault()` del listener.

**`prueba.html`** sí guarda en una hoja de Google. Con `CONFIG.formulario`
configurado envía un `POST` al Web App de Apps Script (ver 2.4) y muestra el
panel de confirmación; si el envío falla o no está configurado, abre el Google
Form con los datos ya cargados para no perder la solicitud.

---

## 7. Qué se puede sumar después

- **Páginas reales para SIRE/CPE y Facturación** cuando existan.
- **Área de clientes** con descarga de instaladores por RUC (requiere backend).
- **Pagos con pasarela** (Culqi, Mercado Pago, Niubiz) en lugar de Yape/transferencia.
- **Buscador de novedades** y paginación cuando el blog crezca.
- **Versión en inglés** si apuntas a clientes fuera del Perú.

Nada de esto está implementado: el sitio es la vitrina. El orden recomendado es
publicar primero, medir qué páginas reciben visitas y recién después invertir en
backend.

---

## 8. Contenido de Buzón SOL

Toda la copy de producto sale de la guía real del aplicativo
(`GuiaUsuario.md`). Si cambias el comportamiento del software, actualiza también
`buzon-sol.html` y la FAQ de `index.html` para que no prometan algo distinto.
