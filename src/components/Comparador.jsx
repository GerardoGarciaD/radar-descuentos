import { useEffect } from "react";
import { CONFIANZA, MAX_COMPARAR, VEREDICTO } from "../config/textos.js";
import { dinero, nombreCorto } from "../lib/catalogo.js";

export function BandejaComparar({ cantidad, onLimpiar, onAbrir }) {
  if (!cantidad) return null;
  return (
    <div className="bandeja">
      <span className="bandeja-texto">{cantidad} de {MAX_COMPARAR} prendas para comparar</span>
      <span style={{ flex: 1 }} />
      <button className="fantasma" onClick={onLimpiar}>Limpiar</button>
      <button onClick={onAbrir}>Comparar</button>
    </div>
  );
}

const FILAS = [
  ["Precio", (p) => <span className="num">{p.precio_es_desde ? "desde " : ""}{dinero(p.precio)}</span>],
  ["Antes", (p) => (p.precio_original ? <s className="num">{dinero(p.precio_original)}</s> : "—")],
  ["Descuento", (p) => (p.descuento ? `${p.descuento}%` : "—")],
  ["Tienda", (p) => p.tienda],
  ["Nivel", (p) => p.nivel],
  ["Talla", (p) => p.talla_m],
  ["Material", (p) => p.material],
  ["Uso", (p) => p.uso],
  ["En contra", (p) => p.desventajas.join("; ")],
  ["Recomendación", (p) => <><b>{(VEREDICTO[p.veredicto] || VEREDICTO.D).texto}.</b> {p.vale_la_pena}</>],
  ["Confianza", (p) => (CONFIANZA[p.confianza] || CONFIANZA.media).texto],
  ["", (p) => <a className="ir" href={p.url} target="_blank" rel="noopener noreferrer">Ver ↗</a>],
];

export function HojaComparar({ productos, onCerrar }) {
  useEffect(() => {
    const tecla = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [onCerrar]);

  return (
    <div className="hoja" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="hoja-in" role="dialog" aria-modal="true" aria-labelledby="titulo-comparar">
        <div className="hoja-cabeza">
          <h2 id="titulo-comparar">Comparar</h2>
          <button onClick={onCerrar}>Cerrar</button>
        </div>
        <div className="tabla">
          <table>
            <thead>
              <tr>
                <th />
                {productos.map((p) => (
                  <td key={p.id}><span className="marca">{p.marca}</span><br /><strong>{nombreCorto(p.nombre)}</strong></td>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILAS.map(([etiqueta, valor], i) => (
                <tr key={i}>
                  <th>{etiqueta}</th>
                  {productos.map((p) => <td key={p.id}>{valor(p)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
