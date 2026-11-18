// Todo lo que quizá quieras cambiar sin tocar los componentes.

// Ruta del catálogo. Está en public/, así que puedes editarlo sin recompilar.
export const RUTA_CATALOGO = "catalogo.json";

export const HERO = {
  refran: "Las mejores ofertas de muchas tiendas, en un solo lugar.",
  traduccion: "Precio revisado hoy y talla confirmada antes de que llegue aquí.",
  vertical: "Ofertas verificadas · 2026",
  chips: [
    { texto: "Para", fuerte: "mujer y hombre" },
    { texto: "Tallas", fuerte: "XS a 3XL" },
    { texto: "Tiendas revisadas:", fuerte: "40" },
    { texto: "Precios de", fuerte: "hoy" },
  ],
};

export const CAPAS = [
  { noruego: "Paso 1", nombre: "Buscamos", texto: "Revisamos las ofertas y outlets de muchas tiendas.", color: "var(--warm)" },
  { noruego: "Paso 2", nombre: "Verificamos", texto: "Precio de hoy, descuento real y talla en existencia.", color: "var(--accent2)" },
  { noruego: "Paso 3", nombre: "Comparas", texto: "Filtra, guarda favoritos y elige la mejor.", color: "var(--accent)" },
];

export const TODAS = {
  id: "todas",
  nombre: "Todo el catálogo",
  nota: "Todas las prendas investigadas. Usa los filtros para acotar por presupuesto, tienda, marca o rango de precio.",
};

export const NIVELES = ["económico", "intermedio", "premium"];

export const COLOR_NIVEL = {
  "económico": "var(--ok)",
  intermedio: "var(--accent2)",
  premium: "var(--warm)",
};

export const CONFIANZA = {
  alta: { texto: "Precio y talla verificados", color: "var(--ok)" },
  media: { texto: "Precio revisado; talla M por confirmar", color: "var(--amber)" },
  baja: { texto: "Precio sin confirmar: revísalo en la tienda", color: "var(--red)" },
};

// Etiqueta corta de la recomendación de cada prenda.
export const VEREDICTO = {
  R: { texto: "Recomendada", color: "var(--ok)" },
  B: { texto: "Buena opción", color: "var(--accent2)" },
  D: { texto: "Depende", color: "var(--amber)" },
  N: { texto: "No conviene", color: "var(--red)" },
};

// Nombres cortos para los botones de categoría.
export const NOMBRE_CORTO = {
  todas: "Todo",
  shell: "Impermeables",
  aislante: "Aislantes",
  "termica-sup": "Térmica superior",
  "termica-inf": "Térmica inferior",
  fleece: "Polares",
  pantalones: "Pantalones",
  guantes: "Guantes",
  accesorios: "Gorros y cuellos",
  snowsuit: "Snowsuit",
  botas: "Botas",
  calcetines: "Calcetines",
};

export const DESCARTE = {
  "no-cumple": {
    titulo: "No cumplen los requisitos",
    texto: "Talla M agotada, descontinuados, malas reseñas o prendas que no sirven para esta búsqueda. No conviene recuperarlos.",
  },
  "no-verificable": {
    titulo: "No se pudieron verificar",
    texto: "La tienda bloqueó la consulta o no mostró precio. Se pueden recuperar revisando la tienda con el navegador.",
  },
};

export const MAX_COMPARAR = 3;
