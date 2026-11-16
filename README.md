# Radar de Ofertas

Buscador de ofertas de ropa de invierno para mujer y hombre, en varias tallas, con precios verificados en tiendas de EE. UU. Hecho con React y Vite.

## Cómo correrlo

```bash
npm install
npm run dev      # abre la página en modo desarrollo
npm run build    # genera la carpeta dist/ lista para publicar
```

## Dónde cambiar cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Productos, precios, descartados | `public/catalogo.json` |
| Textos de la portada, refrán, capas, nombres de categorías y etiquetas de recomendación | `src/config/textos.js` |
| Colores (paleta Nieve clara) y tipografías | `src/styles/base.css` (bloque `:root`) |
| Cuántas prendas se pueden comparar | `MAX_COMPARAR` en `src/config/textos.js` |
| Cómo se filtra y ordena | `src/lib/catalogo.js` |
| Planes del armador (explicaciones, medidores y outfit de ejemplo) | `src/config/planes.js` |

### Actualizar el catálogo sin recompilar

`public/catalogo.json` se carga cuando se abre la página. Si ya publicaste la carpeta `dist/`, puedes reemplazar solo `dist/catalogo.json` y recargar: no hace falta volver a correr `npm run build`.

Cada producto tiene estos campos:

- `id`, `nombre`, `marca`, `tienda`, `categoria`, `genero` (`mujer`, `hombre` o `unisex`)
- `variantes`: un objeto por talla (`"XS"`, `"M"`, `"2XL"`, `"UNICA"`…). Cada talla es una lista de colores con `talla`, `color`, `precio`, `precio_original`, `url` (enlace directo) e `imagen`; opcionales `vence` y `oferta_tienda`.
- `nivel` (`económico`, `intermedio` o `premium`), `veredicto` (`R`, `B`, `D`, `N`), `vale_la_pena`, `ventajas`, `desventajas`, `uso`, `material`, `etiquetas`
- `verificado` (fecha), `confianza` (`alta`, `media` o `baja`), `destacado`, `otras_tiendas`; opcionales `valoracion` y `aviso_precio`

La página calcula sola el precio, el descuento, los colores y el enlace según el género y la talla que elige cada persona (`src/lib/variantes.js`).

Los descartados van en `descartados`, con `nombre`, `motivo` y `tipo` (`no-cumple` o `no-verificable`).

Para abrir botas y calcetines, agrega productos con `"categoria": "botas"` o `"calcetines"`: el botón de la categoría se activa solo.

## Subir a Vercel

1. Sube esta carpeta a un repositorio de GitHub (sin `node_modules` ni `dist`).
2. En vercel.com: **Add New → Project**, elige el repositorio y presiona **Deploy**. Vercel detecta Vite solo (también está en `vercel.json`).
3. Para actualizar productos, cambia `public/catalogo.json` y haz commit: Vercel vuelve a publicar en un minuto.

Sin GitHub: instala la herramienta con `npm i -g vercel`, entra a la carpeta y corre `vercel` (la primera vez pide iniciar sesión) y luego `vercel --prod`.

## Estructura

```
src/
  App.jsx                 estado general: filtros, favoritos, comparar
  config/textos.js        textos y ajustes editables
  lib/catalogo.js         filtrar, ordenar y mejores compras (funciones puras)
  hooks/useCatalogo.js    carga catalogo.json
  hooks/useGuardado.js    recuerda favoritos y categoría en el navegador
  components/
    Portada.jsx           aurora, refrán, título y capas
    Armador.jsx           armador de outfits: planes, silueta por zonas y capas
    SelectorPrenda.jsx    hoja para cambiar la prenda de una capa
    Nieve.jsx             copos animados
    Categorias.jsx        botones de categoría
    Filtros.jsx           barra fija: categoría, precio mín/máx, orden, nivel, tienda, marca
    IntroCategoria.jsx    explicación y mejores compras por nivel
    Tarjeta.jsx           tarjeta compacta de producto
    Detalle.jsx           panel con el análisis completo
    IconoPrenda.jsx       silueta por tipo de prenda
    Comparador.jsx        bandeja y tabla de comparación
    Descartados.jsx       registro de descartados por motivo
    Aviso.jsx             mensajes breves
  styles/                 base, portada, catálogo y comparador
```

## Armador de outfits

Arriba del catálogo está "Vístete para el plan". Cada plan (ciudad, fiordos, auroras, lluvia) vive en `src/config/planes.js` con:

- `explicacion`, `medidores` (1 a 3), `necesitas`, `dejar` y `consejo`
- `outfit`: los ids del catálogo por zona y capa. Usa `null` para dejar una capa vacía y explica por qué en `notas` (por ejemplo `"piernas-0": "Tus jeans de siempre"`).

Los cambios que cada persona hace a su outfit se guardan en su navegador. "Volver al ejemplo" los borra.

## Fotos

Las tarjetas muestran una silueta de la prenda. Para usar fotos reales, descarga cada foto, guárdala en `public/fotos/` y pon la ruta en el campo `imagen` (por ejemplo `"fotos/rei-650.jpg"`). Luego, en `Tarjeta.jsx`, cambia `<IconoPrenda …/>` por `<img src={p.imagen} …/>` cuando exista.

## Publicar

Sube la carpeta `dist/` a Netlify (arrastrar y soltar) o conecta el repositorio a Vercel con el comando `npm run build` y la carpeta `dist`. Como `vite.config.js` usa `base: "./"`, también funciona en una subcarpeta o en GitHub Pages.

## Datos guardados

Favoritos y la última categoría se guardan en el navegador de cada persona. No se comparten entre dispositivos.
