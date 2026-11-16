// Funciones puras para filtrar y ordenar el catálogo.

const ORDEN_NIVEL = { "económico": 0, intermedio: 1, premium: 2 };

export const dinero = (n) => (n == null ? "" : "$" + Number(n).toFixed(2));

export const nombreCorto = (nombre) => nombre.replace(/ - Women's$/, "").replace(/^Women's /, "");

export const esTallaUnica = (p) => /guantes|accesorios/.test(p.categoria);

/** Aplica todos los filtros de la barra. */
export function filtrar(productos, f, favoritos) {
  const min = f.precioMin === "" ? -Infinity : Number(f.precioMin);
  const max = f.precioMax === "" ? Infinity : Number(f.precioMax);
  return productos.filter(
    (p) =>
      (f.categoria === "todas" || p.categoria === f.categoria) &&
      (!f.nivel || p.nivel === f.nivel) &&
      (!f.tienda || p.tienda === f.tienda) &&
      (!f.marca || p.marca === f.marca) &&
      p.precio >= min &&
      p.precio <= max &&
      (!f.soloOfertas || p.destacado) &&
      (!f.soloDescuento || (p.descuento || 0) > 0) &&
      (!f.soloFavoritos || favoritos.has(p.id))
  );
}

/** Ordena según el selector "Ordenar". */
export function ordenar(lista, orden) {
  const copia = [...lista];
  const porRecomendado = (a, b) =>
    b.destacado - a.destacado || ORDEN_NIVEL[a.nivel] - ORDEN_NIVEL[b.nivel] || a.precio - b.precio;
  const comparadores = {
    rec: porRecomendado,
    "precio-asc": (a, b) => a.precio - b.precio,
    "precio-desc": (a, b) => b.precio - a.precio,
    desc: (a, b) => (b.descuento || 0) - (a.descuento || 0),
  };
  return copia.sort(comparadores[orden] || porRecomendado);
}

/** La mejor compra de cada nivel: primero las marcadas como destacadas, luego la más barata. */
export function mejorPorNivel(productos, nivel) {
  return productos
    .filter((p) => p.nivel === nivel)
    .sort((a, b) => b.destacado - a.destacado || a.precio - b.precio)[0];
}

export const valoresUnicos = (productos, campo) => [...new Set(productos.map((p) => p[campo]))].sort();

export function rangoPrecios(productos) {
  if (!productos.length) return [0, 0];
  const precios = productos.map((p) => p.precio);
  return [Math.floor(Math.min(...precios)), Math.ceil(Math.max(...precios))];
}
