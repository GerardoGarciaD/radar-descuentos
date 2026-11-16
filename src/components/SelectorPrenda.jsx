import { useEffect } from "react";
import { createPortal } from "react-dom";
import { VEREDICTO } from "../config/textos.js";
import { dinero, nombreCorto } from "../lib/catalogo.js";

const ORDEN_V = { R: 0, B: 1, D: 2, N: 3 };

// Hoja para escoger otra prenda para una capa del outfit.
export default function SelectorPrenda({ titulo, opciones, actual, onElegir, onQuitar, onCerrar }) {
  useEffect(() => {
    const tecla = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
    };
  }, [onCerrar]);

  // La prenda actual va primero; después, de la más recomendada a la menos y por precio.
  const lista = [...opciones].sort(
    (a, b) =>
      (b.id === actual) - (a.id === actual) ||
      (ORDEN_V[a.veredicto] ?? 2) - (ORDEN_V[b.veredicto] ?? 2) ||
      a.precio - b.precio
  );

  return createPortal(
    <div className="hoja" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="hoja-in selector" role="dialog" aria-modal="true" aria-labelledby="titulo-selector">
        <div className="agarradera" aria-hidden="true" />
        <div className="hoja-cabeza">
          <h2 id="titulo-selector">{titulo}</h2>
          <button onClick={onCerrar}>Cerrar</button>
        </div>
        <p className="selector-ayuda">Primero la que tienes puesta; luego de la más recomendada a la menos, y por precio.</p>
        <ul className="selector-lista">
          {lista.map((p) => {
            const v = VEREDICTO[p.veredicto] || VEREDICTO.D;
            return (
              <li key={p.id}>
                <button className={p.id === actual ? "elegida" : ""} aria-pressed={p.id === actual} onClick={() => onElegir(p.id)}>
                  <span className="sel-info">
                    {p.id === actual && <span className="sel-actual">Puesta ahora</span>}
                    <strong>{nombreCorto(p.nombre)}</strong>
                    <span>{p.marca} · {p.tienda}</span>
                  </span>
                  <span className="sel-der">
                    <span className="num">{dinero(p.precio)}</span>
                    <span className="sello-v" style={{ "--v": v.color }}>{v.texto}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {actual && (
          <button className="selector-quitar" onClick={onQuitar}>Quitar esta capa</button>
        )}
      </div>
    </div>,
    document.body
  );
}
