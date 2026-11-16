import { DESCARTE } from "../config/textos.js";

// Prendas revisadas que no entraron al catálogo, con su motivo.
export default function Descartados({ lista }) {
  const grupos = Object.keys(DESCARTE).map((tipo) => ({ tipo, items: lista.filter((d) => (d.tipo || "no-cumple") === tipo) }));
  return (
    <details className="descartados">
      <summary>
        Prendas que revisé y no incluí <small>{lista.length}</small>
      </summary>
      {grupos.map(({ tipo, items }) =>
        items.length ? (
          <div key={tipo} className={`grupo ${tipo}`}>
            <h3>{DESCARTE[tipo].titulo} <small>{items.length}</small></h3>
            <p>{DESCARTE[tipo].texto}</p>
            <ul>
              {items.map((d) => (
                <li key={d.nombre}>
                  <strong>{d.nombre}</strong>
                  <span>{d.motivo}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </details>
  );
}
