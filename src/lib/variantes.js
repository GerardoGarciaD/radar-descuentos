// El catálogo trae cada producto con sus tallas y, en cada talla, sus colores
// (precio, precio anterior, enlace directo y foto). Aquí se convierte al formato
// que usan las tarjetas, según el género y la talla que eligió la persona.

export const ORDEN_TALLAS = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];
export const GENEROS = [
  { id: "todos", texto: "Todos" },
  { id: "mujer", texto: "Mujer" },
  { id: "hombre", texto: "Hombre" },
];

const TALLA_UNICA = "UNICA";
const CALZADO = ["botas", "calcetines"];

// Cupón, promoción y condiciones que algunas tiendas ponen a la oferta.
const str = (v) => (typeof v === "string" ? v : "");
function extrasOferta(p) {
  const partes = [];
  const c = p.cupon;
  if (typeof c === "string") partes.push(`Cupón: ${c}.`);
  else if (c?.codigo) partes.push(`Cupón ${c.codigo}${c.descuento_pct ? ` (${c.descuento_pct}% extra)` : ""}: ${str(c.condiciones)}${c.vence ? ` Vence ${c.vence}.` : ""}`);
  const pr = p.promocion;
  if (typeof pr === "string") partes.push(`Promoción: ${pr}.`);
  else if (pr && typeof pr === "object") partes.push(`Promoción: ${pr.descuento_pct ? `${pr.descuento_pct}% extra al pagar` : ""}${pr.precio_estimado_al_pagar ? ` (≈ $${pr.precio_estimado_al_pagar})` : ""}. ${str(pr.condiciones)}`);
  if (str(p.nota_precio)) partes.push(p.nota_precio);
  if (str(p.condiciones_oferta)) partes.push(`Condiciones: ${p.condiciones_oferta}`);
  if (str(p.estado_oferta)) partes.push(`Estado de la oferta: ${p.estado_oferta}.`);
  return partes.length ? " " + partes.join(" ") : "";
}

// Tallas que aparecen en el catálogo, en orden.
export function tallasDisponibles(productos) {
  const hay = new Set();
  productos.forEach((p) => Object.keys(p.variantes || {}).forEach((t) => hay.add(t)));
  return ORDEN_TALLAS.filter((t) => hay.has(t));
}

export const coincideGenero = (p, genero) =>
  genero === "todos" || p.genero === genero || p.genero === "unisex";

// Devuelve el producto listo para mostrar en esa talla, o null si no la tiene.
export function enTalla(p, talla) {
  const variantes = p.variantes || {};
  let lista;
  let etiqueta;
  if (variantes[TALLA_UNICA]) {
    lista = variantes[TALLA_UNICA];
    etiqueta = "Talla única";
  } else if (talla === "todas" || CALZADO.includes(p.categoria)) {
    // El calzado usa su propia talla: se muestran todas.
    lista = Object.values(variantes).flat();
    etiqueta = CALZADO.includes(p.categoria) ? "Tallas de calzado" : "Todas las tallas";
  } else {
    lista = variantes[talla];
    etiqueta = `Talla ${talla}`;
  }
  if (!lista || !lista.length) {
    // Producto sin tallas confirmadas: solo se muestra con "Todas", y avisando.
    if (talla === "todas" && !Object.keys(variantes).length && p.precio) {
      return {
        ...p,
        descuento: p.precio_original > p.precio ? Math.round((1 - p.precio / p.precio_original) * 100) : 0,
        talla_m: "Tallas sin confirmar: revisa en la tienda",
        disponibilidad: (p.disponibilidad || "Tallas y existencias sin confirmar.") + extrasOferta(p),
        variantesTalla: [],
      };
    }
    return null;
  }

  // La opción más barata de esa talla es la que se muestra y a la que lleva el botón.
  const mejor = [...lista].sort((a, b) => a.precio - b.precio)[0];
  const precios = new Set(lista.map((v) => v.precio));
  const colores = [...new Set(lista.map((v) => v.color))];
  const antes = mejor.precio_original && mejor.precio_original > mejor.precio ? mejor.precio_original : null;
  const vence = lista.find((v) => v.vence)?.vence;

  let disponibilidad = `${etiqueta}: en existencia en ${colores.join(", ")}.`;
  if (vence) disponibilidad += ` Oferta hasta ${vence}.`;
  if (p.aviso_precio) disponibilidad += ` ${p.aviso_precio}`;
  disponibilidad += extrasOferta(p);

  return {
    ...p,
    precio: mejor.precio,
    precio_original: antes,
    descuento: antes ? Math.round((1 - mejor.precio / antes) * 100) : 0,
    precio_es_desde: precios.size > 1,
    url: mejor.url,
    imagen: mejor.imagen,
    color_mostrado: mejor.color,
    colores,
    talla_m: `${etiqueta}: ${colores.length} ${colores.length === 1 ? "color" : "colores"} en existencia`,
    disponibilidad,
    variantesTalla: lista,
  };
}

// Producto por talla: ¿en qué tallas existe? (para el detalle)
export const tallasDe = (p) => {
  const claves = Object.keys(p.variantes || {});
  const ropa = ORDEN_TALLAS.filter((t) => p.variantes[t]?.length);
  const otras = claves.filter((t) => !ORDEN_TALLAS.includes(t) && t !== TALLA_UNICA).sort((a, b) => parseFloat(a) - parseFloat(b));
  return [...ropa, ...otras, ...(p.variantes?.[TALLA_UNICA] ? ["Única"] : [])];
};
