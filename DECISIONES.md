# Decisiones del proyecto

Este archivo existe para que, si retomás el sitio en otra computadora (o con
otro asistente), no se pierda el "por qué" de cada cosa. El README explica
*cómo* editar; esto explica *por qué* está así.

---

## Lo que NO conviene cambiar sin pensarlo

- **Español solamente.** Nada de versión en inglés.
- **Estética oscura de punta a punta.** No meter una sección clara en el medio.
- **HTML estático, sin frameworks ni compilación.** Son archivos sueltos que se
  suben y listo. Esto es a propósito: lo podés mantener solo.
- **El eje es el historial de fechas**, no la biografía.
- **Descartada la sección "compartí cabina con"**. Paolo no tocó con muchos
  artistas y prefiere no listarlos. No volver a ofrecerla.

**Por qué:** toca hace años en Entre Ríos (hasta 7.000 personas) pero le cuesta
entrar en CABA. La página existe para mostrarle a un promotor porteño que ya
tiene recorrido. El argumento es "tres escenarios que me repiten", no cantidad
de nombres.

---

## Reglas de diseño (respetar si se retoca)

| Regla | Detalle |
|---|---|
| Un solo color de acento | `--accent: #ff3b2f`. Texto encima siempre `--accent-ink` (contraste 5,6:1). **Blanco sobre ese rojo da 3,5:1 y NO pasa accesibilidad.** |
| Verde solo de estado | `--ok: #4ade80` es para confirmaciones (ej: "mail copiado"), no es un segundo color de marca. |
| Radios bloqueados | Interactivo = pastilla completa (`--r-pill`). Medios/fotos = 2px (`--r-media`). |
| Sin listeners de `scroll` | Todo lo que depende del scroll usa `IntersectionObserver`. |
| Fuentes self-hosted | En `assets/fonts/`. La página no le pide nada a Google. |
| Texto funcional | Nunca por debajo de 11px. Botones con área táctil de 44px. |
| Sin em-dashes | En el texto visible. |

---

## Cosas que se probaron y se descartaron

- **Recorte vertical de la foto del hero para celular.** Se llegó a implementar
  y se descartó: Paolo prefiere la portada como está.
- **Achicar el nombre del hero / ponerlo en una línea / moverlo arriba.** Se
  compararon 4 variantes; se eligió dejar la actual.
- **Cambiar la tipografía del nombre.** La actual (Archivo, condensada) le gusta.

> Si la portada vuelve a hacer ruido: el problema no es la tipografía sino el
> **velo oscuro** que se le pone a la foto para que el texto se lea. Ahí hay
> margen para ganar foto sin tocar el nombre.

---

## Detalles técnicos que cuesta redescubrir

- **La foto del hero es apaisada (3:2).** En una pantalla de celular se recorta
  **a lo ancho, no a lo alto**: no hay sobra vertical, así que `object-position`
  con valor vertical NO hace nada. Para cambiar qué parte se ve en celular hay
  que generar un recorte aparte y servirlo con `<picture>`.
- **Los `mailto:` no abren nada** en PCs sin programa de correo configurado. Por
  eso el botón del mail además copia la dirección al portapapeles y avisa.
- **Videos oscuros:** varios clips nocturnos miden 12-15 de brillo sobre 255 y
  quedan negros al comprimir. Corregir con `eq=gamma=1.20` como mucho; no lavar.
  Paolo pidió brillo natural, NO un grade fuerte.
- **Los videos arrancan solos y en silencio** al entrar en pantalla (en un
  carrusel, el primero). Eso hace que se descarguen al scrollear: son ~31 MB en
  total. Si alguna vez pesa demasiado en datos móviles, se puede revertir
  borrando ese bloque del `IntersectionObserver` en `main.js`.

---

## Los originales de fotos y videos

**No están en este repositorio** (pesan 594 MB). Son los archivos sin comprimir
que mandó Paolo, y hacen falta si alguna vez hay que rehacer un recorte o
recomprimir un video con otra calidad.

Están respaldados en el Google Drive de Paolo (polomaffei@gmail.com), en la
carpeta `Paolo Maffei - originales`, con un `INDICE.md` adentro que mapea cada
original con lo que terminó siendo en la web.
