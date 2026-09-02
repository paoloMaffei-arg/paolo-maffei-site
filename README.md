# Paolo Maffei - Portfolio DJ

Landing page estática. Sin build, sin dependencias: son archivos sueltos que se suben y listo.

```
paolo-maffei-site/
├── index.html          ← todo el contenido y los textos
├── assets/
│   ├── css/style.css   ← colores, tipografías, layout
│   ├── js/main.js      ← menú mobile, lightbox, animaciones
│   ├── fonts/          ← Archivo + Space Mono (self-hosted, 188 KB)
│   ├── img/            ← fotos optimizadas (.webp)
│   └── video/          ← clips comprimidos (.mp4) + posters
└── README.md
```

Peso: ~1,5 MB en la primera carga. Los videos solo se descargan si alguien
aprieta play. Las fotos originales pesaban 552 MB.

Las tipografías están hosteadas en la propia carpeta, así que la página no le
pide nada a Google. Los únicos pedidos externos son los reproductores de
Spotify y YouTube.

## La intro del logo

Al abrir la página aparece tu logo sobre negro y a los 2,5 segundos se va sola.
Tres cosas que conviene que sepas:

- **Se muestra una vez por sesión.** Si la persona recarga o vuelve, no la ve de
  nuevo. Está pensado así para no cansar a un promotor que entra y sale.
  Si la querés en *cada* carga, borrá las dos líneas de `sessionStorage` en
  `assets/js/main.js`.
- **Se puede saltear** tocando la pantalla, apretando una tecla o scrolleando.
- **Se apaga sola por CSS, no por JavaScript.** Si el JS fallara, la página
  igual queda usable. Tampoco aparece si el visitante tiene activado
  "reducir movimiento" en su sistema.

Para cambiar cuánto dura, tocá `2.5s` en la animación `introVeil` de
`style.css` y el `2500` de `main.js`; conviene que sean el mismo número.

---

## Ver el sitio en tu compu

```bash
python -m http.server 5173 --directory paolo-maffei-site
```

Después abrí `http://localhost:5173` en el navegador.

> Abrir `index.html` con doble clic también funciona, pero las fuentes y los
> embeds andan mejor con el servidor.

---

## Publicarlo (gratis)

**Netlify Drop** es lo más rápido y no pide tarjeta:

1. Entrá a <https://app.netlify.com/drop>
2. Arrastrá la carpeta `paolo-maffei-site` entera a la ventana.
3. En 20 segundos te da una URL tipo `algo-random.netlify.app`.
4. En *Site settings → Change site name* la cambiás a `paolomaffei.netlify.app`.

Cuando tengas dominio propio (`paolomaffei.com`, `paolomaffei.com.ar`), lo
conectás desde *Domain settings → Add custom domain*. El certificado HTTPS
lo genera Netlify solo.

Para actualizar el sitio: volvés a arrastrar la carpeta.

Alternativas equivalentes: [Vercel](https://vercel.com), [Cloudflare Pages](https://pages.cloudflare.com), GitHub Pages.

---

## Cosas que faltan completar

### 1. Nombres de eventos en la galería

Las tres fechas y los tres videos están etiquetados con eventos que salen del
nombre del archivo original, así que esos son seguros. En la **galería** hay
etiquetas que deduje y conviene que revises:

| Etiqueta que puse | De qué archivos salió | ¿Seguro? |
|---|---|---|
| `Playa Inkier` | `La Cumbia De los Trapos - Inkier.mp4` | sí |
| `Malianteo` | `Lean x Baby Drip - Malianteo.mp4` | sí |
| `One Break, Concepción del Uruguay` | me lo dijiste vos | sí |
| `One Break` (foto de galería) | el cartel se ve en la foto | sí |
| `Wonderland` | `WONDERLAD-*.JPG` | probable |
| `Blake` | `BLAKE-316.jpg`, `BLAKEE-16.jpg` | probable |
| `Estoy en un Cumple` | `CUMPLE-*.jpg` | probable |
| `Escenario` | `_DSC8256.jpg` | **no sé el evento** |
| `Cabina` (fotos de galería) | `_DSC00*.jpg` | **no sé el evento** |

Las dos últimas son las que más conviene corregir: si sabés el evento y el
lugar, ponelo.

> **Ojo con One Break.** En la sección de fechas figura One Break en Cruza
> Recoleta (Buenos Aires, mayo 2026), y los tres videos son de One Break en
> Concepción del Uruguay. Son dos ediciones distintas y la de Concepción no
> está listada como fecha. Si querés que la agregue, pasame el mes y el año.

### 2. El dominio en los meta tags

En `index.html` hay tres lugares que dicen `https://paolomaffei.com/`
(`<link rel="canonical">`, `og:image` y el bloque `application/ld+json`).
Cambialos por tu dominio real cuando lo tengas. Eso define qué se ve
cuando compartís el link por WhatsApp o Instagram.

---

## Cómo editar lo de siempre

**Agregar una fecha** — la sección `#fechas` son tres tarjetas con foto.
Copiá un bloque `<article class="fecha">` entero y cambiale los campos:

```html
<article class="fecha reveal">
  <div class="fecha__img">
    <img src="assets/img/TU-FOTO-900.webp" alt="Descripción de la foto"
         loading="lazy" decoding="async" width="900" height="1350">
  </div>
  <div class="fecha__body">
    <p class="fecha__when">Mes 2026</p>
    <h3 class="fecha__t">Nombre de la fiesta</h3>
    <p class="fecha__where">Lugar, Ciudad</p>
  </div>
</article>
```

La primera tarjeta lleva además `fecha--lead` (sale más grande) y un
`<p class="fecha__note">` con una línea extra de contexto.

> Si pasás de 4 o 5 fechas, avisame y lo cambio a otro formato. Una grilla de
> tarjetas deja de funcionar cuando son muchas.

**Cambiar el WhatsApp** — buscá `wa.me/5493442671518` en `index.html`.
El formato es código de país (54) + 9 + característica sin el 0 (3442) +
número sin el 15. Si en algún momento no querés el número público, borrá
ese `<a>` entero y queda solo el mail.

**Cambiar el color de acento** — en `style.css`, arriba de todo:
`--accent: #ff3b2f;`. Cambiando esa línea cambia todo el sitio.

**Cambiar la foto del header** — reemplazá los tres `hero-*.webp` en
`assets/img/` manteniendo los nombres (800, 1400 y 2400 px de ancho).

**Reglas de estilo que conviene respetar** si tocás el diseño: un solo color
de acento en toda la página, los botones y elementos clickeables van con
esquinas redondeadas completas y las fotos con esquinas casi rectas (2px),
y todo el sitio es oscuro de punta a punta (no metas una sección clara en el
medio).

---

## Agregar fotos o videos nuevos

Los originales de tu celular pesan demasiado para la web (una foto de 19 MB
tarda medio minuto en cargar). Hay que comprimirlos antes.

**Fotos** — con Python y Pillow:

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open("foto-nueva.jpg")).convert("RGB")
for w in (1800, 900):
    r = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    r.save(f"nueva-{w}.webp", "WEBP", quality=80, method=6)
```

Después copiás un bloque `<figure class="gal__i">` de la galería y cambiás
`src` (la de 900) y `data-full` (la de 1800).

**Videos** — con ffmpeg. Está instalado en tu máquina pero no en el PATH, así
que hay que llamarlo con la ruta completa:

```bash
"$HOME/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-full_build/bin/ffmpeg.exe" -i clip-nuevo.mp4 -vf "hqdn3d=3:2:4:4,scale=640:-2:flags=lanczos" -c:v libx264 -preset medium -crf 30 -maxrate 900k -bufsize 1800k -pix_fmt yuv420p -c:a aac -b:a 80k -movflags +faststart assets/video/nuevo.mp4
```

Subí el `crf` (32, 34) si querés que pese menos, bajalo (26, 24) si querés
más calidad. El poster se saca con el mismo comando cambiando el final por
`-ss 10 -frames:v 1 assets/video/nuevo-poster.jpg`.

**Ojo con los videos oscuros.** Los clips de club filmados de noche sin luz
directa quedan casi negros al comprimirlos. Antes de sumar uno, miralo en el
celular con brillo bajo: si no se distingue nada, no lo pongas.
