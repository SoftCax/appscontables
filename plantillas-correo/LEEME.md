# Plantillas · correos de licencia y vencimiento

Dos correos con la misma marca, listos para pegar en Apps Script. Reemplazan a
las plantillas anteriores de SOFTCAX PERU.

| Archivo | Archivo en Apps Script | Función que lo envía |
|---|---|---|
| `licencia.html` | `mnsLicencia` | `enviarCorreoLicencia` |
| `vencimiento.html` | `mnsVencimiento` | `enviarRecordatorioVencimientoProducto` |

## Cómo usarlas

1. Copia el contenido del HTML en el archivo de Apps Script con ese nombre
   (Apps Script añade `.html`; la función lo busca sin extensión).
2. No cambies los marcadores: la función los sustituye por los datos reales.
3. Los campos `COLOR`, `COLOR_BORDE` y `COLOR_LINK` de `ConfigProductos` ya no
   afectan a estos correos: traen los colores fijos de la marca. Déjalos como
   están por si otras plantillas los usan.

Cada archivo es un correo completo. Si tu editor guarda **solo el cuerpo** (como
la plantilla anterior, que empezaba en `<p>&nbsp;</p>`), pega desde
`<table role="presentation" width="100%"` hasta el último `</table>`. El bloque
`<style>` del head es opcional: solo ajusta los tamaños en móvil; sin él, el
correo se ve igual en escritorio.

## Apps Script

- Los `<?= … ?>` son los mismos marcadores de las plantillas anteriores.
  Funcionan tanto si `generarMensajeDesdeHTML` lee el archivo y reemplaza texto
  como si usa `createTemplateFromFile(...).evaluate()`.
- No cambies los marcadores a `{{ … }}` sin cambiar también la función.
- Cada marcador aparece **una sola vez** en el HTML, para que funcione incluso si
  la función reemplaza solo la primera aparición.

## Marcadores de `licencia.html`

| Marcador | Contenido |
|---|---|
| `<?= NOMBRE ?>` | Nombre del cliente |
| `<?= PRODUCTO ?>` | Nombre del producto (Buzón SOL) |
| `<?= INTRO ?>` | Frase introductoria del tipo de licencia |
| `<?= TIPO ?>` | "licencia anual", "licencia de prueba", etc. |
| `<?= CODIGO ?>` | Código de PC |
| `<?= ALIAS ?>` | Alias del equipo, con su formato (paréntesis, guion, etc.) |
| `<?= LICENCIA ?>` | Clave de licencia |
| `<?= LINE1 ?>` | Línea de condiciones o vigencia |

## Marcadores de `vencimiento.html`

| Marcador | Contenido |
|---|---|
| `<?= NOMBRE ?>` | Nombre del cliente |
| `<?= PRODUCTO ?>` | Nombre del producto (Buzón SOL) |
| `<?= CODIGO ?>` | Código de PC |
| `<?= ALIAS ?>` | Alias del equipo, ya con su texto (" alias LAPTOP") |
| `<?= DIAS ?>` | Estado: "Vence hoy", "Vence mañana", "Licencia suspendida" |
| `<?= LINE1 ?>` | Mensaje principal (`msgPorVencer` / `msgSuspendido`) |
| `<?= LINE2 ?>` | Frase de cierre |

### Ojo con `DIAS`

`DIAS` se muestra tal cual, en grande y en negrita. La función actual le pasa
texto con guiones bajos para centrarlo a mano:

```js
DIAS: '_____Faltan_' + dias + '_dias_____'
DIAS: '_______SUSPENDIDO_______'
```

En esta plantilla sobra ese relleno: el bloque de estado ya está centrado y los
guiones bajos se verían como parte del texto. Cambia esas dos líneas de
`enviarRecordatorioVencimientoProducto` por:

```js
// por vencer (dias 0 o 1)
DIAS: dias === 0 ? 'Vence hoy' : 'Vence mañana',

// vencida (dias entre -1 y -2)
DIAS: 'Licencia suspendida',
```

Si prefieres el aviso original sin cambios, la plantilla seguirá funcionando,
pero mostrará los guiones bajos.

## Imágenes

Ningún correo admite SVG: usan dos PNG alojados en Google Drive.

| Uso | URL directa |
|---|---|
| Cabecera (logo) | `https://lh3.googleusercontent.com/d/1NrLOf1jLcsMv8yjVq576eJXkobp507RV` |
| Pie (icono) | `https://lh3.googleusercontent.com/d/1wd8KHorY75ZXpmSCOmoaw-TIJUEAkB9O` |

No uses el enlace `/file/d/…/view?usp=sharing`: es la página del visor, no la
imagen. Tampoco conviene `drive.google.com/uc?export=view&id=…`: en las pruebas
no cargó de forma fiable. El formato `lh3.googleusercontent.com/d/ID` es el CDN
de Google y devuelve el PNG directo.

Drive sirve para salir del paso, pero tiene dos límites: algunos clientes
bloquean imágenes externas y Google puede limitar las descargas si el archivo se
populariza. Cuando publiques el sitio, es más estable cambiar estas dos URL por:

```
https://appscontables.com/logo-apps-contables/logo-oscuro.png
https://appscontables.com/logo-apps-contables/icono-96.png
```

Los archivos son los mismos: están en `../logo-apps-contables/`. Si cambias el
logotipo, vuelve a exportar esos PNG (420×137 y 96×96) y súbelos a Drive
conservando los IDs, o actualiza las URL.

## Detalles técnicos

- Ancho fijo de 600 px, una sola columna, tablas y estilos en línea: se ve bien
  en Outlook, Gmail, Apple Mail y clientes móviles.
- Fuentes del sistema (Arial/Helvetica). No se cargan fuentes web: Gmail no las
  muestra y el resultado sería distinto en cada cliente.
- Paleta del sitio: cabecera y pie morados `#1B1035` / `#150D26`, franja verde
  `#10B583`, acentos `#4A1FA0` y `#2DD4A0`.
- En la licencia, el código va en morado `#4A1FA0` sobre `#F1EBFD` (contraste
  9:1), en lugar del rojo anterior.
- En `vencimiento.html`, el estado va en un bloque morado con texto blanco: sirve
  tanto para un aviso como para una licencia suspendida, sin cambiar de color.
- Se declara `color-scheme: light` para que los clientes con modo oscuro no
  inviertan la cabecera ni el pie.
- Cada plantilla pesa ~6-7 KB, muy por debajo del límite de recorte de Gmail
  (102 KB).

## Probar sin enviar

Reemplaza los marcadores por datos de ejemplo y cambia las URL de las imágenes
por las locales. El resultado se puede abrir en el navegador; para el móvil,
reduce la ventana a 390 px o usa la vista responsive del navegador.
