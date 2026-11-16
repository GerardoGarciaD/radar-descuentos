import { useEffect, useRef } from "react";
import { NOMBRE_CORTO, TODAS } from "../config/textos.js";

// Pestañas de categoría.
// En escritorio se acomodan en varias filas; en el celular van en una fila que se desliza.
export default function Categorias({ categorias, conteo, total, actual, onElegir, className = "" }) {
  const ref = useRef(null);
  const opciones = [{ id: TODAS.id }, ...categorias];

  // En la fila deslizable, mantiene visible la categoría elegida.
  useEffect(() => {
    // Solo desliza la fila hacia los lados; nunca mueve la página hacia abajo.
    const fila = ref.current;
    const activa = fila?.querySelector('[aria-pressed="true"]');
    if (activa && fila.scrollWidth > fila.clientWidth) {
      const izquierda = activa.offsetLeft - (fila.clientWidth - activa.offsetWidth) / 2;
      fila.scrollTo({ left: Math.max(0, izquierda), behavior: "smooth" });
    }
  }, [actual]);

  return (
    <nav ref={ref} className={`categorias ${className}`} aria-label="Categorías">
      {opciones.map((c) => {
        const n = c.id === TODAS.id ? total : conteo[c.id] || 0;
        return (
          <button
            key={c.id}
            className="categoria"
            aria-pressed={c.id === actual}
            disabled={!n}
            title={n ? undefined : "Pendiente: falta la talla de calzado"}
            onClick={() => onElegir(c.id)}
          >
            {NOMBRE_CORTO[c.id] || c.nombre}
            <span className="cat-n">{n || "pronto"}</span>
          </button>
        );
      })}
    </nav>
  );
}
