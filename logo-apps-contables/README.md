# Marca · Apps Contables

Todo lo que necesita el logotipo para web, correo y documentos. Los archivos son
SVG con el texto convertido a curvas: se ven igual en cualquier equipo, aunque no
tenga las fuentes instaladas.

## Variantes

| Archivo | Medidas | Fondo | Uso |
|---|---|---|---|
| `icono-marca.svg` | 100×100 | cualquiera | Isotipo suelto: favicon, cabecera, redes, app |
| `logo-horizontal.svg` | 306×100 | claro | Lockup principal en web y documentos |
| `logo-oscuro.svg` | 306×100 | oscuro | Lockup sobre morado o fondos con poca luz |
| `logo-horizontal-tagline.svg` | 375×112 | claro | Presentaciones y piezas con el mensaje "en un clic" |
| `logo-monocromatico.svg` | 100×100 | claro | Una sola tinta: sellos, fax, impresión a un color |
| `favicon.svg` | 100×100 | — | Favicon vectorial para navegadores modernos |
| `favicon-32.png` | 32×32 | — | Favicon de respaldo |
| `icono-96.png` | 96×96 | cualquiera | Correo: pie a 34 px (2.8×) |
| `logo-oscuro.png` | 420×137 | oscuro | Correo: cabecera a 210×69 (2×) |
| `icono-180.png` | 180×180 | morado | `apple-touch-icon` (iOS) |
| `icono-512.png` | 512×512 | morado | Android, PWA, tiendas |
| `og-image.svg` / `.png` | 1200×630 | morado | Vista previa al compartir en WhatsApp, Facebook, LinkedIn |

Los originales entregados están en `originales/`, sin tocar, solo como
referencia. No se usan en el sitio.

Los PNG de correo (`logo-oscuro.png`, `icono-96.png`) son los mismos que se
subieron a Drive para la plantilla de `../plantillas-correo/licencia.html`.

## Colores

| Color | Hex | Dónde |
|---|---|---|
| Morado | `#712CDA` | Inicio del degradado del isotipo |
| Morado profundo | `#4A1FA0` | Nombre "CONTABLES" y enlaces del sitio |
| Morado fondo | `#1B1035` / `#2A1160` | Hero, bloques oscuros y pie |
| Verde | `#10B583` | Fin del degradado, botones y acentos |
| Verde claro | `#2DD4A0` | "APPS" en fondos oscuros |
| Tinta verde | `#05261B` | Texto sobre botones verdes |

El sitio usa la misma paleta en `assets/css/estilos.css` (variables `--brand`,
`--accent`, `--accent-ink`, `--ok`). No recolorees el logo por separado.

## Tamaños mínimos

- **Isotipo:** 16 px en pantalla (favicon), 24 px recomendado en cabeceras.
  Por debajo de 24 px el check empieza a cerrarse.
- **Lockup horizontal:** 160 px de ancho en pantalla; 25 mm en impresión.
- **Lockup con tagline:** 320 px de ancho. Por debajo, la línea "en un clic"
  deja de leerse.
- **og:image:** siempre 1200×630 px, sin recortar.

## Área de respeto

Deja libre alrededor del logo el alto de la letra "A" de "APPS" (unos 30 px en
el lockup original). Nada de texto, bordes ni otros logos dentro de ese margen.

## Cómo usarlo

**Cabecera y pie del sitio.** No se inserta la imagen completa: se usa el isotipo
más texto HTML, para que el conjunto siga el tema claro/oscuro.

```html
<a class="logo" href="index.html">
  <img class="logo__icono" src="logo-apps-contables/icono-marca.svg"
       width="30" height="30" alt="" />
  <span>
    <span class="logo__marca">Apps Contables</span>
    <span class="logo__sub">Software contable</span>
  </span>
</a>
```

El `alt` va vacío porque el texto de al lado ya nombra la marca; así el lector de
pantalla no la repite.

**Favicon y vista previa.** Ya están en el `<head>` de las 11 páginas:

```html
<link rel="icon" href="logo-apps-contables/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="logo-apps-contables/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="logo-apps-contables/icono-180.png" />
<meta property="og:image" content="https://appscontables.com/logo-apps-contables/og-image.png" />
```

`og:image` debe ser una URL absoluta: WhatsApp y Facebook no resuelven rutas
relativas.

**Correo y documentos.** Usa `icono-512.png` o `logo-horizontal.svg`. En correo,
mejor PNG: muchos clientes no muestran SVG.

## Qué no hacer

- No estirar ni recortar: el cuadrado del isotipo siempre es cuadrado.
- No cambiar los colores ni invertir el degradado.
- No poner `logo-horizontal.svg` sobre morado (usa `logo-oscuro.svg`).
- No poner `logo-monocromatico.svg` sobre fondo oscuro: desaparece.
- No usar el lockup con tagline a tamaños pequeños.
- No editar el texto del SVG a mano: está convertido a curvas.
