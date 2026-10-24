# RUNDI · Landing Page — Design Spec & Build Prompt

> Documento de diseño exhaustivo del mockup `rundi-mockup.html`. Sirve como spec
> para reconstruir la landing en React (o cualquier stack) y como prompt para un
> agente de código. Todo lo descrito corresponde al estado real del archivo.

---

## 1. Producto y concepto

**Rundi** — plataforma nicaragüense de movilidad (ride-hailing) con sede en Managua.
Diferenciador estrella: **Conductor designado** — un conductor verificado maneja
*tu propio* vehículo para llevarte a casa seguro.

**Dirección de arte:** *Editorial premium nocturno + producto real.*
Estética de revista de lujo (folios numerados, mono uppercase, hairlines,
outline type) fusionada con UI real de ride-hailing: widget de reserva tipo Uber,
menú desplegable tipo inDrive, mapa estilizado con pines del producto, screenshots
reales de la app como artefactos flotantes.

**Sistema de doble acento (regla central del diseño):**

| Color | Significado |
|---|---|
| 🟡 Oro | Marca, premium, navegación, titulares, stats, hairlines |
| 🟣 Violeta | Acción, "designado", estados en-vivo, selección del servicio insignia |

El violeta no es decorativo: en la app real el modo "Designado" ya es violeta,
así que la landing lo usa como lenguaje de producto.

---

## 2. Stack del mockup actual

- **Un solo archivo HTML** — CSS inline en `<style>`, JS vanilla al final.
- Sin build, sin dependencias; assets por rutas relativas (`assets/...`).
- Theming por **CSS custom properties** + `data-theme` en `<html>`.
- Fuentes por CDN (Fontshare + Google Fonts).

### Fuentes

| Familia | Uso | Carga |
|---|---|---|
| **Satoshi** (Fontshare) | Display: titulares, stats, brand, RUNDI footer | `f[]=satoshi@300,301,400,401,500,501,700,701,900,901` |
| **Instrument Sans** | Cuerpo, UI, botones | Google Fonts 400–700 + italic |
| **IBM Plex Mono** | Folios, etiquetas técnicas, captions, metadata | Google Fonts 400,500 |

Variables: `--disp`, `--sans`, `--mono`.

---

## 3. Design tokens

Toda la paleta pasa por CSS variables en `:root` (oscuro, default) y
`[data-theme="light"]`. **Nunca hardcodear colores en componentes.**

### 3.1 Tema oscuro (default)

```css
/* superficies */
--ink:        #0A0C10;   /* fondo base */
--ink-2:      #0E1118;   /* secciones alternas */
--ink-3:      #141926;   /* bordes internos, inputs */
--card:       #131826;   /* cards */
/* oro — marca */
--gold:       #D4AF37;
--gold-2:     #F1D37A;
--gold-deep:  #A8842A;
--gold-select:#14100A;   /* texto/icono SOBRE relleno dorado */
--gold-vivid: #D4AF37;   /* oro fijo para acentos sobre fotos (no cambia por tema) */
/* crema (marcos de arte, QR, chips de íconos) */
--cream:      #F4EFE3;
--cream-2:    #EAE2CE;
/* texto */
--text:       #F5F2E9;
--muted:      #A49B8A;
--muted-2:    #6E6A5F;
/* líneas */
--line:       rgba(212,175,55,.18);   /* hairline dorada */
--line-soft:  rgba(245,242,233,.08);  /* hairline neutra */
/* violeta — acción / designado / en-vivo */
--violet:       #9B87FF;
--violet-2:     #C4B5FD;
--violet-deep:  #6D4ED8;
--violet-soft:  rgba(155,135,255,.13);
--violet-line:  rgba(155,135,255,.34);
--violet-glow:  rgba(155,135,255,.17);
/* superficies específicas */
--nav-bg:       rgba(10,12,16,.72);
--chip-bg:      rgba(14,17,24,.9);
--rin-bg:       rgba(10,12,16,.45);
--glass-bg:     rgba(10,12,16,.55);
--panel-grad:   linear-gradient(140deg,#1b1710 0%,#12100c 55%,#171310 100%);
--map-bg:       radial-gradient(120% 120% at 30% 20%,#141a26 0%,var(--ink) 70%);
--map-grid:     rgba(245,242,233,.07);
--map-road:     rgba(245,242,233,.11);
--map-lake:     rgba(96,165,250,.07);
--ptag-bg:      rgba(10,12,16,.8);
--store-bg:     var(--text);
--store-fg:     var(--ink);
--store-sm:     #444;
--grid-line:    rgba(212,175,55,.045);
--foot-stroke:  rgba(212,175,55,.16);
--scroll-thumb: #2A2F3C;
--hero-scrim:   linear-gradient(100deg,#0A0C10 34%,rgba(10,12,16,.82) 58%,rgba(10,12,16,.26) 100%),
                linear-gradient(0deg,#0A0C10 0%,transparent 32%);
/* layout & motion */
--wrap:      1240px;
--ease-out:  cubic-bezier(.22,1,.36,1);
```

### 3.2 Tema claro ("papel editorial crema" — no es inversión)

```css
--ink:        #F5F1E8;
--ink-2:      #EDE7D8;
--ink-3:      #FCFAF3;
--card:       #FFFFFF;
--gold:       #A8842A;   /* oro profundizado para contraste */
--gold-2:     #8A6A1C;
--gold-deep:  #7A5F18;
--text:       #221B11;
--muted:      #6E6455;
--muted-2:    #9C9280;
--line:       rgba(168,132,42,.32);
--line-soft:  rgba(34,27,17,.10);
--nav-bg:       rgba(245,241,232,.8);
--chip-bg:      rgba(255,255,255,.94);
--rin-bg:       rgba(255,255,255,.65);
--glass-bg:     rgba(255,255,255,.66);
--print-shadow: 0 34px 64px -22px rgba(96,74,20,.34),0 0 0 1px rgba(168,132,42,.32);
--card-shadow:  0 30px 60px -26px rgba(96,74,20,.26);
--panel-grad:   linear-gradient(140deg,#FBF5E3 0%,#F4EBD3 55%,#F8F0DA 100%);
--map-bg:       radial-gradient(120% 120% at 30% 20%,#FDFAF0 0%,#F0EADA 70%);
--map-grid:     rgba(34,27,17,.055);
--map-road:     rgba(34,27,17,.13);
--map-lake:     rgba(96,165,250,.22);
--ptag-bg:      rgba(255,255,255,.92);
--store-bg:     #221B11;
--store-fg:     #F5F1E8;
--store-sm:     #A79B84;
--grid-line:    rgba(168,132,42,.10);
--foot-stroke:  rgba(168,132,42,.24);
--scroll-thumb: #D3C8AE;
--hero-scrim:   linear-gradient(100deg,#F5F1E8 34%,rgba(245,241,232,.84) 58%,rgba(245,241,232,.30) 100%),
                linear-gradient(0deg,#F5F1E8 0%,transparent 32%);
/* violeta profundizado sobre papel */
--violet:       #6E44D9;
--violet-2:     #7B53E0;
--violet-deep:  #5533B8;
--violet-soft:  rgba(110,68,217,.10);
--violet-line:  rgba(110,68,217,.32);
--violet-glow:  rgba(110,68,217,.13);
```

### Reglas de color

- `--gold-select` = **el único** color de texto sobre relleno dorado. Aplicar en:
  `::selection`, `.btn-gold`, `.nav-cta`, `.book-cta`, `.veh.sel`.
- Degradado dorado canónico (botones, hl, selección):
  `linear-gradient(135deg,#F1D37A,#D4AF37 55%–58%,#A8842A)` — **siempre colores fijos**,
  no variables, para que el oro se vea igual en ambos temas.
- Degradado violeta canónico:
  `linear-gradient(135deg,var(--violet-2),var(--violet) 55%,var(--violet-deep))` — sí usa
  tokens (cambia por tema). Texto sobre violeta: `#F7F4FF` (chips) o `#F7DF8F` (display).
- Blooms ambientales: `radial-gradient(closest-side, rgba(212,175,55,.16-.22), transparent)`
  para oro; `var(--violet-glow)` para violeta. Siempre `filter:blur(28-40px)` +
  `pointer-events:none`.
- Transición de tema: `body, body *{ transition:background-color .45s, border-color .45s, box-shadow .45s }`.

---

## 4. Tipografía y escala

| Elemento | Font | Size | Peso | Otros |
|---|---|---|---|---|
| Hero h1 | Satoshi | `clamp(52px,6.4vw,96px)` | 600 | `line-height:.98`, `ls:-.03em`, 3 líneas block |
| Sec-title h2 | Satoshi | `clamp(38px,4.4vw,62px)` | 600 | `lh:1.04`, `ls:-.03em` |
| Card h3 | Satoshi | 24px (flagship 30→`clamp(28,2.7vw,38)`) | 700 | `ls:-.02em` |
| Quote | Satoshi | `clamp(34px,4.6vw,64px)` | 500 | `lh:1.12`, `ls:-.03em` |
| Stats | Satoshi | `clamp(30px,2.6vw,40px)` | 700 | `tabular-nums`, color `gold-2` |
| Steps snum | Satoshi | 56px | 700 | `color:transparent` + `-webkit-text-stroke:1px gold` |
| Foot-word "RUNDI" | Satoshi | `clamp(90px,16vw,230px)` | 900 | outline: `text-stroke:1px var(--foot-stroke)` |
| Folio/labels/captions | IBM Plex Mono | 9–12px | 400–500 | `uppercase`, `ls:.16–.3em` |
| Cuerpo | Instrument Sans | 17px | 400 | `lh:1.6` |
| Botones | Instrument Sans | 13–15px | 600–700 | `ls:.02–.05em` |

### Acentos de texto

1. **`<em>` plano** — itálica Satoshi `color:var(--gold)` (en hero h1: `var(--violet-2)`), peso 500.
2. **Highlight box `.hl`** (estilo inDrive — caja sólida detrás de la palabra):

```css
.hl{ display:inline-block; padding:.03em .24em .08em .18em; border-radius:.1em; line-height:1; }
em.hl-gold{   background:linear-gradient(135deg,#F1D37A,#D4AF37 58%,#A8842A); color:#4B2FC0; font-weight:700; }
em.hl-violet{ background:linear-gradient(135deg,var(--violet-2),var(--violet) 55%,var(--violet-deep)); color:#F7DF8F; font-weight:700; }
```

**Distribución actual de acentos** (mezcla intencional de ambas variantes):

| Sección | Palabra | Tratamiento |
|---|---|---|
| Hero | "Tu conductor." | `hl-gold` |
| Servicios | "realidad" | `hl-violet` |
| Cómo funciona | "ruta" | `<em>` oro plano |
| La app | "Diseñada" / "dos" | `hl-gold` / `hl-violet` |
| Conductores | "Nosotros" | `hl-gold` |
| Quote | "bien" / "rápido" | `<em>` oro / `hl-violet` |
| Cobertura | "Managua" | `<em>` oro plano |
| Descargá | "Rundi" | `<em>` oro plano |

---

## 5. Layout

- Contenedor `.wrap`: `max-width:1240px`, padding `0 clamp(20px,4vw,48px)`.
- Secciones `.sec-pad`: `clamp(96px,11vw,150px)` vertical.
- Bento: `grid-template-columns:repeat(12,1fr)`, `grid-auto-rows:minmax(120px,auto)`, gap 14px.
  Spans: flagship `7×2`, luego `5+5`, luego `4+4+4`.
- Splits 2 columnas: `1.05fr .95fr` (drive), `.95fr 1.05fr` (app), `1fr 1fr` (cobertura), `1.1fr .9fr` (CTA).
- **Breakpoints:** `1020px` (todo a 1 col, bento 12/6, chips off, scrim vertical) y `640px` (menú 1 col, veh-row wrap, bento todo 12).

---

## 6. Componentes (uno por uno)

### 6.1 Progress bar
Barra fija top, 2px, `linear-gradient(90deg,gold-deep,gold 45%,violet)`, `width` = % de scroll (JS).

### 6.2 Nav (reducido, estilo inDrive)
- Fijo, `backdrop-filter:blur(14px)`, bg `--nav-bg`, border-bottom `line-soft`. Altura **88px**.
- Izquierda: logo `assets/images/splash-icon.png` a **110px** de ancho.
- Derecha: `theme-btn` (40px círculo, sol/luna SVG, hover rota 18°) → `menu-btn` pill "≡ Menú" → `nav-cta` pill oro "Descargar".
- `menu-ico`: dos líneas 15×1.8px que animan a X (`rotate ±45deg`).

### 6.3 Menu panel desplegable
- Card centrada `min(860px,100%-40px)`, `--card` bg, borde `line`, radius 22, shadow, `grid 1.15fr .85fr`, padding 36×40.
- Entra: `opacity 0→1` + `translateY(-16px)→0` + `scale(.985)→1`, origin top.
- Col 1 "Navegación": 6 links display 24px, prefijo mono `01–06` — **números pares en violeta, impares en oro** (`a:nth-child(even) em{color:violet}`). Separadores dashed. Hover: `padding-left+10px`, color `gold-2`.
- Col 2 "Por qué Rundi": 3 links destacados `b` + `span` descriptivo.
- `menu-mark`: `rundi_mark.png` 230px, `opacity:.07`, `rotate(10deg)`, decorativo bottom-right.
- Comportamiento: toggle al click, cierra con link click / click fuera / `Escape`; `aria-expanded` + texto "Menú"↔"Cerrar"; clase `.menu-open` en `<header>`.

### 6.4 Hero
- `padding:168px 0 110px`. Fondo: `Hero.jpeg` `center 38%/cover`, `scale(1.05)`, **parallax al mouse** (`translate(x*-14px, y*-9px)`, transición 1s).
- `hero-scrim` sobre la foto (por tema); `hero-bloom` oro arriba-derecha + `hero-bloom.v` violeta abajo-izquierda.
- Eyebrow: pill mono 12px oro + dot pulsante (`@keyframes pulse`, box-shadow ring 9px cada 2.2s). Texto: "Ya en Managua, Nicaragua".
- h1 en 3 líneas `.l` reveals escalonados: "Tu ciudad." / "Tu viaje." / `hl-gold` "Tu conductor."
- `hero-sub`: 480px max, `strong` en color texto ("conductor designado").

### 6.5 Booking widget (Uber-style)
Card `max-width:520px`, radius 22, gradiente `ink-3→ink-2`, padding 22.

- **Header:** título "¿A dónde vamos?" (disp 19) + pill `book-now` (mono 10.5 uppercase, `gold-2` + borde `gold`, ícono `requests_pin2x.png` 12px) → "Pedir ahora".
- **Route inputs:** 3 filas `.rin` (label clickeable, radius 14, `--rin-bg`, hover/focus-within borde `line` + tint oro):
  1. `origin_marker.png` → **"Tu ubicación"** / "Managua · GPS activo"
  2. `selectextradestination.png` → "Parada extra" / "opcional — agregá una parada" (dim)
  3. `selectfinaldestination.png` → "¿A dónde vas?" / "escribí tu destino" (dim)
  - Íconos reales 22px; **conector punteado** `border-left:1.5px dashed rgba(212,175,55,.4)` a left:27px entre las filas.
- **Vehicle select** `.veh-row` — 3 botones flex:1, ícono 38px (coches top-view rotados 90°):
  | Veh | Icon | Sub | `data-fare` | Estado sel |
  |---|---|---|---|---|
  | Rundi Car | `Convertible_Car_Sedan.png` | 4 asientos | `C$ 95 – 130` | oro sólido |
  | Rundi Moto | `moto_icon.png` | más ágil | `C$ 55 – 80` | oro sólido |
  | Designado | `car_safed.png` | tu carro | `C$ 150 – 200` | **violeta sólido** |
  - `.veh.sel`: relleno gradiente oro + texto `gold-select` + glow oro. `.veh.v.sel`: relleno gradiente violeta + texto `#F7F4FF` + glow violeta.
- **CTA** `.book-cta` oro full-width → estado `.done` ghost. Lógica JS: click → "Calculando…" con puntos (~1.3s) → `≈ {data-fare} · 12 min` y flecha→✓. Cambiar de vehículo tras calcular actualiza la tarifa.
- Nota mono: "tarifa clara antes de confirmar · ¿cómo funciona?".
- **Stats** bajo el widget, border-top: `1200+` Viajes completados · `350+` Conductores verificados · `4.9` Calificación promedio. `sup` "+" en violeta.

### 6.6 Marquee
Track infinito `animation:mq 30s linear` (duplicado por JS), pausa en hover.
Items disp 21px separados por `rundi_mark.png` 16px:
`Conductor designado · Viajes seguros · Multi-destino · Pagos flexibles · Tiempo real · Botón SOS`.
Los `<em>` van en itálica (alternando violeta). Fondo con tint oro en los bordes.

### 6.7 Section headers — "folio" editorial
`NN` en oro + label mono uppercase + **hairline** `linear-gradient(90deg,var(--line),var(--violet-line) 60%,transparent)` que funde oro→violeta. Folios `01–06`.

### 6.8 Bento de servicios
`.bcard`: radius 20, gradiente `card→ink-2`, padding 26 (flagship 34). Hover: `-5px` + borde `line` + shadow.
`.bicon`: ícono util real 52px en cuadrado crema redondeado, arriba-derecha absoluto, hover `rotate(-6deg) scale(1.08)`.
`.artframe`: marco crema con hairline dorada + inset shadow; img `object-fit:cover`, hover `scale(1.05)`.
`.idx` mono 11 ls .22 en oro.

| Card | Span | Ícono | Arte | Contenido |
|---|---|---|---|---|
| b-a flagship | 7×2 | car_safed | `dessignated-home.png` | Ver 6.9 |
| b-b | 5 | safe_shield | `safe_ride.png` | Seguridad primero — verificados, SOS |
| b-c | 5 | card_cash | — (lista) | Pagos flexibles: efectivo, tarjeta, tarifa clara (`.list` dashed "—") |
| b-d | 4 | realtime | `realtime.png` | Tiempo real |
| b-e | 4 | map | `moto_ride.png` | Multi-destino |
| b-f | 4 | sms | `safe_confidence.png` | Registro por SMS |

### 6.9 Flagship card (Conductor designado) — estructura especial
- `::before`: bloom violeta radial top-right difuminado.
- `.split` 2 col: copia | media.
- Copia: `.b-a-top` (flag "Servicio insignia" = pill degradado violeta + `idx` oro), h3 grande, párrafo, luego:
- **`.des-toggle`** — réplica del toggle de la app real: pill degradado violeta + sedán 20px + "Modo designado" + knob blanco ON (`.dtg` 36×20 radio full, `i` círculo blanco 15px a la derecha). Glow violeta.
- **`.des-steps`** — mini-stepper mono violeta 01/02/03, filas dashed top+bottom: "Pedís el servicio en la app" / "Llega un conductor verificado a tu punto" / "Maneja tu carro y te deja en casa".
- `.b-a-media` (relative, min-height 320): **screenshot real** `dessignated-home.png` — `width:100%`, radius 16, borde `line`, shadow fuerte, `rotate(-2deg)` → hover `rotate(0) scale(1.02)`. Caption pill mono oscuro + borde `violet-line`: "App del conductor · Designado".

### 6.10 Cómo funciona — ruta dibujada
- Sección `--ink-2` + bloom violeta.
- SVG `viewBox 0 0 1000 260` absoluto detrás de los steps: `.dash` path punteada oro + `.progress-path` que **se dibuja al entrar en viewport** (`stroke-dasharray:1200`, `dashoffset 1200→0`, 2.6s, clase `.drawn` via IO).
- Path: `M60,190 C220,90 340,230 500,140 C660,50 780,190 945,90`. Waypoints = `<image>` con los **pines reales** (origin/extra/final).
- 3 `.step` cards: `snum` outline 56px (stroke oro; el del medio **violeta**), tag mono top-right (Origen/En curso/Destino), h3 23px, p 14.5.
  Copy: "Solicitá tu viaje" / "Seguilo en vivo" / "Llegá seguro".

### 6.11 La app — placa fotográfica
- `.photo-plate`: `outside.jpeg` a `min(560px,100%)`, radius 24, borde `line`, shadow, `rotate(-1.2deg)` → hover `rotate(-.15deg) scale(1.01)`. Glow oro radial detrás (`::before`).
- `.shot-cap`: pill mono oscuro + borde oro: "Rundi en la calle · Managua".
- `.show-list`: 3 ítems letra mono oro (a. b. c.) + `b` + `span`: mapa vivo / paradas extra / modo conductor.

### 6.12 Conductores (estilo inDrive)
- Split 1.05/.95. Perks `.drive-perks`: 4 filas con `.pcheck` — círculo 26px borde+fondo violeta, "✓" violeta.
  Copy: Ganá a tu ritmo / Pagos semanales / Vos elegís los viajes / Soporte local.
- CTA `btn-gold` "Registrate como conductor →" (data-magnet).
- `.drive-phones`: dos screenshots de prototipo rotados (±5–6°, `phone-2` con `margin-left:-30px`, float animado desfasado), `.ring` 420px hairline oro, `.earn-chip` flotante (16px radius, blur, `C$ 3,850` disp 24 oro-2 + "esta semana" mono), labels mono "Conductor"/"En línea".
- Bloom violeta `::after` bottom-left.

### 6.13 Pull quote
Banda `linear-gradient(105deg,rgba(212,175,55,.06),var(--violet-soft) 85%)`, bordes `line`, centrado.
`qmark` "“" 80px violeta. Copy: `Llegar <em>bien</em> es el nuevo / llegar <hl-violet>rápido</hl-violet>.`
Cite: "— Manifiesto Rundi, Managua".

### 6.14 Cobertura — mapa estilizado
`.mapbox` aspect 1:1, radius 24, `--map-bg` radial.
SVG `viewBox 0 0 400 400` slice:
- `.mgrid` retícula de calles, `.mroad` 3 avenidas curvas, `.mlake` lago abajo.
- `.map-route`: path dashed `stroke:url(#routeGrad)` — **degradado oro→violeta** (stops CSS-classes `rs0`/`rs1` → `stop-color` por tokens, cambia con el tema). Path: `M95,300 C160,270 190,220 205,165 S260,95 315,82`.
- **Carro animado**: `<image>` del sedán (28×48, rotado 90) con `<animateMotion dur="9s" rotate="auto">` sobre la ruta.
- Pins HTML sobre el mapa: `origin_marker` round (left 24% top 75%, tag "Origen") + `selectfinaldestination` tear (79%/20%, `translate(-50%,-88%)`, tag "Destino"). `.pin::after` anillo `ping` animado 2.6s escalonado.
- `map-cap`: "MGUA · 12.11°N — 86.23°W". `map-compass`: "N↑".
- `.city-row`s: nombre disp 26 + estado mono — `live` (● oro + gold-2) "Disponible ahora" / `soon` muted "Próximamente". Managua live; León, Granada, Masaya soon. Hover `padding-left+10px`.

### 6.15 CTA Descargá
`.cta-panel` radius 28, `--panel-grad`, `grid 1.1fr .9fr`, padding clamp.
- `::before` bloom oro top-right + `::after` bloom violeta bottom-left; `.ghost` `rundi_mark.png` 340px `opacity:.08` rotate 8.
- h2 "La ciudad te espera. / `<em>Rundi</em>` te lleva." + copy SMS.
- `.store-btn`s: píldoras `--store-bg/fg` con SVG inline (Apple + Play), `.sm` 10.5 + `.lg` 16, hover `-3px` + shadow. (data-magnet)
- `.cta-card` glass: fila QR + copy. `.qr` 112px crema con `rundi_icon.png` + **QR falso** via `::after` — `conic-gradient` + `radial-gradient` de puntos con `mask` radial hueco al centro (efecto QR alrededor del logo).
- `.alt`: "o visitá rundi.app/get desde tu móvil" (link gold-2 subrayado).

### 6.16 Footer
- `.foot-grid` `1.3fr + 3×1fr`: brand (mark + "Rundi" + tagline), columnas mono Producto/Compañía/Legal, links hover `gold-2` + `translateX(4px)`.
- `.foot-word` "RUNDI" outline gigante.
- `.foot-base`: "© 2026 Rundi · Managua, Nicaragua" + "Nº 01 — Edición Managua".

### 6.17 Chrome global
- **Grain**: `body::after` fijo SVG `feTurbulence` 300px, `opacity .05` (.035 light), `steps(8)` 9s.
- **Cursor**: punto 14px ring oro, `mix-blend-mode:difference` (multiply en light), lerp `.2` por rAF; `.big`→44px+fill sobre `a,button,.bcard,.city-row`; oculto `@media (hover:none)`.
- `::selection` oro + `gold-select`. Scrollbar 10px thumb `--scroll-thumb`→`gold-deep` hover.

---

## 7. Interacciones (inventario JS)

| # | Feature | Implementación |
|---|---|---|
| 1 | Tema | `data-theme` en `<html>`; `localStorage('rundi-theme')`; fallback `prefers-color-scheme` |
| 2 | Menú | clase `.menu-open` en header; toggle/outside-click/Escape/link-close; `aria-expanded` |
| 3 | Progress | `scrollTop/(scrollHeight-clientHeight)` → width % |
| 4 | Reveals | IntersectionObserver `threshold:.14`, `rootMargin:-6%`, `.in` una vez; `data-delay` 1–6 = +80ms c/u (`translateY(30px)→0`, `opacity`, .9s ease-out) |
| 5 | Route draw | IO `threshold:.35` → `.drawn` → dashoffset 1200→0 en 2.6s |
| 6 | Counters | IO `.6` → rAF 1600ms, ease `1-(1-p)³`, formato `es-NI`, `data-count`/`data-dec` |
| 7 | Marquee | `track.innerHTML += innerHTML` para loop -50% |
| 8 | Magnetic | `[data-magnet]` translate `±(dx*.18, dy*.28)` px, reset en leave |
| 9 | Hero parallax | mousemove → `scale(1.05) translate(±14/±9px)`, reset en leave |
| 10 | Fare widget | `.sel` exclusiva; "Calculando…" puntos 260ms × ~1.3s → fare + "· 12 min" + ✓ |
| 11 | Cursor | posición lerp `.2` por rAF; `.big` en hover de interactivos |

**Reduced motion:** `@media (prefers-reduced-motion:reduce)` mata animaciones/transiciones (`.01ms`).

---

## 8. Motion spec

- **Easing canónico:** `cubic-bezier(.22,1,.36,1)` (ease-out elástico suave) — casi todo.
- Duraciones: hovers .3–.5s, reveals .9s, route 2.6s, counters 1.6s, tema .45s.
- Keyframes: `grain` (steps8), `pulse` (dot eyebrow), `float` (phones/chips ±9px), `mq` (marquee -50%), `ping` (pins 2.6s scale .3→1.5 fade).
- Stagger por `data-delay` (80ms increments).
- `will-change` en transform animados; `pointer-events:none` en decorativos.

---

## 9. Inventario de assets (rutas exactas)

### Marca
| Asset | Uso |
|---|---|
| `assets/images/splash-icon.png` | Logo del nav (110px) |
| `assets/images/rundi_mark.png` | Separador marquee, `menu-mark`, `ghost` CTA, brand footer |
| `assets/images/rundi_icon.png` | Favicon, centro del QR |

### Fotografía campaña (`assets/images/campaña2/` — ojo con la `ñ`, URL-encodear)
| Asset | Uso |
|---|---|
| `Hero.jpeg` | Fondo fotográfico del hero |
| `outside.jpeg` | Placa foto sección "La app" |
| `dessignated-home.png` | Screenshot real en flagship card |
| `safe_ride.png` | Artframe b-b |
| `realtime.png` | Artframe b-d |
| `moto_ride.png` | Artframe b-e |
| `safe_confidence.png` | Artframe b-f |
| `designed_driver.png` | Disponible (actualmente no usada en el layout) |

### Íconos de producto (`assets/images/icons/`)
| Asset | Uso |
|---|---|
| `origin_marker/origin_marker.png` | Input origen, waypoint ruta, pin mapa "Origen" |
| `select-extra-destination/selectextradestination.png` | Input parada, waypoint ruta |
| `select-final-destination/selectfinaldestination.png` | Input destino, waypoint, pin mapa "Destino" (tear) |
| `requests_pin/requests_pin2x.png` | Chip "Pedir ahora" |
| `Convertible_Car_Sedan/Convertible_Car_Sedan.png` | Veh Rundi Car, des-toggle, **carro animado del mapa** |
| `moto/moto_icon.png` | Veh Rundi Moto |
| `utils/car_safed.png` | Veh Designado + bicon flagship |
| `utils/safe_shield.png` | bicon b-b |
| `utils/card_cash.png` | bicon b-c |
| `utils/realtime.png` | bicon b-d |
| `utils/map.png` | bicon b-e |
| `utils/sms.png` | bicon b-f |

### Prototipos (`assets/images-old/prototipe_phones/`)
| Asset | Uso |
|---|---|
| `driverhome_prototipe.png` | Phone 1 sección conductores |
| `available_prototipe.png` | Phone 2 sección conductores |
| `clienthome_prototipe.png`, `activeride_prototipe.png` | Disponibles (no usados — reemplazados por `outside.jpeg`) |

---

## 10. Copy deck (textos clave)

- Hero: "Tu ciudad. / Tu viaje. / **Tu conductor.**" — sub: "…Viajes con conductor verificado, **conductor designado** para volver seguro con tu propio vehículo, y seguimiento en tiempo real…"
- Quote: "Llegar *bien* es el nuevo / llegar **rápido**." — "— Manifiesto Rundi, Managua"
- Driver: "Vos ponés el carro. / **Nosotros** los viajes."
- CTA: "La ciudad te espera. / *Rundi* te lleva." — "Escaneá y viajá" — "rundi.app/get"
- Cobertura: "Primero *Managua*. / Después, el país." — "MGUA · 12.11°N — 86.23°W"
- Footer: "Movilidad nicaragüense con estándar premium. Hecho en Managua, para Nicaragua." — "Nº 01 — Edición Managua"
- Tarifas demo: Car `C$ 95–130` · Moto `C$ 55–80` · Designado `C$ 150–200` · ETA "12 min"
- Stats: `1200+` viajes · `350+` conductores · `4.9` rating · Driver: `C$ 3,850` esta semana

---

## 11. Port a React — stack y dependencias sugeridas

### Core recomendado

```bash
npm create vite@latest rundi-landing -- --template react-ts
npm i framer-motion lucide-react clsx
npm i react-icons        # solo para marcas: SiApple, SiGoogleplay (los SVG van inline)
npm i lenis              # opcional: smooth scroll butter
```

| Dependencia | Para qué |
|---|---|
| `framer-motion` | **Todo el sistema de motion**: reveals (`whileInView`), stagger por `variants`, marquee (`animate` x loop), counters (`animate()`), magnetic buttons (`useMotionValue`+`useSpring`), hero parallax (`useMotionValue` onMouseMove), progress bar (`useScroll`+`scaleX`), route draw (`motion.path` `pathLength` 0→1 `whileInView`), menu panel (`AnimatePresence`), counters, car en mapa (`motion.g` `offsetDistance` o keep SMIL) |
| `lucide-react` | Iconos de UI: `Sun`, `Moon`, `Menu`, `X`, `ArrowRight`, `Check`, `Navigation`. **No** para íconos de producto (pines/carros → imágenes reales) ni marcas |
| `clsx` | Composición de clases condicionales (`clsx('veh', sel && 'sel', veh==='v' && 'v')`) |
| `react-icons` | Solo `SiApple`, `SiGoogleplay` para store badges (o SVG inline como el mockup) |
| `lenis` | Opcional — smooth scroll con inercia (combina bien con el editorial) |

### Theming (replicar el sistema de tokens)

- Mantener **CSS custom properties** tal cual — portar el bloque `:root`/`[data-theme="light"]` a `styles/tokens.css` o un theme de Tailwind (`tailwind.config` extendiendo `colors` con `rgb(var(--...) / <alpha-value>)` si se usa Tailwind).
- `ThemeProvider` propio: toggle `document.documentElement.dataset.theme` + `localStorage('rundi-theme')` + `matchMedia('prefers-color-scheme')` en init (misma lógica del mockup). En Next.js usar `next-themes` con `attribute="data-theme"`.
- Fuentes: links Fontshare/Google en `index.html` (o `next/font` con los woff2 locales; Satoshi está en Fontshare, no Google).

### Estructura de componentes sugerida

```
src/
  styles/tokens.css          # :root + [data-theme] (copiar bloques §3)
  App.tsx
  components/
    chrome/      ProgressBar · CustomCursor · GrainOverlay · ThemeToggle
    nav/         Nav · MenuButton · MenuPanel
    hero/        Hero · Eyebrow · BookingCard · RouteInputs · VehicleSelect · FareButton · StatRow
    Marquee.tsx
    services/    BentoGrid · FeatureCard · FlagshipCard (DesignatedToggle · MiniSteps · ShotFigure)
    how/         HowItWorks · RouteSvg · StepCard
    app/         PhotoPlate · FeatureList
    drivers/     DriveSection · PerkList · Phones · EarnChip
    Quote.tsx
    coverage/    MapBox · MapPin · CityRow
    cta/         DownloadPanel · StoreButton · QRCard
    footer/      Footer · FootWord
  hooks/         useReveal (o variants) · useTheme · useMagnetic · useCounter
```

### Mapeo motion (mockup → Framer Motion)

| Mockup | Framer Motion |
|---|---|
| `.reveal` + IO + `data-delay` | `motion.div` `initial/whileInView/variants` + `custom` delay |
| Route draw dashoffset | `<motion.path pathLength>` `whileInView` 0→1, ease `custom cubicBezier(.22,1,.36,1)` |
| Counters rAF | `animate(0, target, {duration:1.6, ease:[0,0,.2,1], onUpdate})` |
| Marquee CSS | Mantener CSS `animation` (más barato) o `animate={{x:['0%','-50%']}}` repeat Infinity linear |
| Magnetic | `useMotionValue` + `useSpring(stiffness ~150, damping ~15)` en mousemove/leave |
| Hero parallax | `useMotionValue` x/y + `useSpring` + `useTransform` → `motion.div` background |
| animateMotion (carro) | Mantener SVG SMIL dentro del JSX (válido) o `offset-path` CSS |
| Menu open/close | `AnimatePresence` + variants opacity/y/scale en `.menu-card` |
| Progress bar | `useScroll().scrollYProgress` → `scaleX` con `transform-origin:left` |
| Custom cursor | 2 `useMotionValue` + `useSpring` en `mousemove` listener |

### Notas de implementación

- `<em>` highlight: componente `<Hl variant="gold|violet">` que envuelve palabras en títulos.
- Íconos de producto y fotos: **imágenes reales** (`<img>`/`<Image>`), nunca recrear con lucide — el realismo del producto es parte del diseño.
- `assets/campaña2/` tiene `ñ`: en imports de bundler funciona, pero en URLs externas usar `%C3%B1`.
- El `animateMotion` SMIL funciona tal cual en JSX (`animateMotion` se renderiza como SVG tag).
- QR falso: replicar con `::after` + `conic-gradient`/`mask` (CSS Modules) — no usar librería de QR salvo que haya URL real.
- `prefers-reduced-motion`: `useReducedMotion()` de framer-motion para desactivar parallax/marquee además del media query CSS.

---

## 12. Prompt condensado (listo para pegar a un agente)

```
Reconstruí la landing de Rundi (app de ride-hailing de Managua, Nicaragua) en
React + TypeScript + Framer Motion + Lucide, con Vite. Dirección: "editorial
premium nocturno + producto real" — folios numerados, mono uppercase, outline
type, hairlines, combinado con UI real de ride-hailing (booking widget tipo
Uber, menú desplegable tipo inDrive, mapa SVG con carro animado).

DOBLE ACENTO obligatorio: oro #D4AF37 = marca/premium; violeta #9B87FF =
acción/servicio-designado/en-vivo. Dos temas via data-theme: oscuro tinta
#0A0C10 y claro papel crema #F5F1E8 (paleta completa en §3 de la spec — no
inventar colores, todo por CSS custom properties; texto sobre oro = #14100A
--gold-select).

Tipografía: Satoshi display (600–900, ls -.03em, itálicas como acento),
Instrument Sans cuerpo, IBM Plex Mono metadata. Highlight boxes estilo inDrive
(.hl): caja degradado oro con letra morada #4B2FC0, o caja degradado violeta
con letra oro #F7DF8F — alternar entre títulos.

Secciones: nav compacto 88px (logo splash-icon 110px + theme toggle + pill
"≡ Menú" con panel 2-col + CTA oro Descargar) → hero con foto Hero.jpeg +
scrim + parallax mouse + eyebrow "Ya en Managua" + h1 3 líneas + booking
widget funcional (origen/parada/destino con pines reales, selector Car/Moto/
Designado con tarifas C$ 95–130/55–80/150–200, botón "Ver precio estimado"
que calcula) + stats 1200+/350+/4.9 → marquee de servicios → bento 12-col
(6 servicios RND-01..06, flagship Conductor designado con toggle violeta
tipo app + mini-steps + screenshot real) → cómo funciona (ruta SVG que se
dibuja al scroll con pines reales) → la app (foto outside.jpeg en placa
rotada) → conductores (perks + teléfonos + chip C$ 3,850) → quote → cobertura
(mapa SVG con ruta oro→violeta, pines, carro animateMotion, ciudades
Managua live/León+Granada+Masaya soon) → CTA descarga (store badges, QR
falso con logo al centro) → footer con "RUNDI" outline gigante.

Motion: ease canónico cubic-bezier(.22,1,.36,1); reveals staggered
(IntersectionObserver/whileInView), route draw por pathLength, counters ease
1-(1-p)³, magnetic buttons, cursor custom con lerp, grain overlay, progress
bar oro→violeta, prefers-reduced-motion. Assets reales en assets/ (ver §9 —
pines, carros top-view, íconos utils, fotos campaña2/ con ñ, prototipos
images-old/).
```
