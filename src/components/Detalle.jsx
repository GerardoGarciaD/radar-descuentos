import { useEffect } from "react";
import { CONFIANZA, VEREDICTO } from "../config/textos.js";
import { dinero, nombreCorto } from "../lib/catalogo.js";
import { tallasDe } from "../lib/variantes.js";
import IconoPrenda from "./IconoPrenda.jsx";

// Panel con el análisis completo de una prenda.
export default function Detalle({ p, onCerrar, esFavorito, onFavorito }) {
  useEffect(() => {
    const tecla = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [onCerrar]);

  const v = VEREDICTO[p.veredicto] || VEREDICTO.D;
  const conf = CONFIANZA[p.confianza] || CONFIANZA.media;

  return (
    <div className="hoja" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="hoja-in detalle" role="dialog" aria-modal="true" aria-labelledby="titulo-detalle">
        <div className="hoja-cabeza">
          <span className="marca">{p.marca} · {p.tienda}</span>
          <button onClick={onCerrar}>Cerrar</button>
        </div>

        <div className="detalle-top">
          <div className="detalle-arte">{p.imagen ? <img className="foto" src={p.imagen} alt="" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.style.display = "none")} /> : <IconoPrenda categoria={p.categoria} />}</div>
          <div>
            <h2 id="titulo-detalle">{nombreCorto(p.nombre)}</h2>
            <div className="precio">
              {p.precio_es_desde && <span className="desde">desde</span>}
              <span className="ahora">{dinero(p.precio)}</span>
              {p.precio_original > p.precio && <s>{dinero(p.precio_original)}</s>}
              {p.descuento > 0 && <span className="descuento-texto">−{p.descuento}%</span>}
            </div>
            <p className="veredicto">
              <span className="sello-v" style={{ "--v": v.color }}>{v.texto}</span>
              {p.vale_la_pena}
            </p>
          </div>
        </div>

        <dl className="ficha">
          <div><dt>Para qué sirve</dt><dd>{p.uso}</dd></div>
          <div><dt>Material</dt><dd>{p.material}</dd></div>
          <div><dt>Presupuesto</dt><dd className="cap">{p.nivel}</dd></div>
          <div><dt>Talla</dt><dd className="cap">{p.talla_m}</dd></div>
          <div><dt>Tallas que existen</dt><dd>{tallasDe(p).join(" · ")}</dd></div>
          <div>
            <dt>Colores en tu talla</dt>
            <dd>
              <ul className="variantes">
                {(p.variantesTalla || []).map((v) => (
                  <li key={v.url}>
                    <a href={v.url} target="_blank" rel="noopener noreferrer">{v.talla !== "UNICA" && p.variantesTalla.some((x) => x.talla !== v.talla) ? `${v.talla} · ` : ""}{v.color}</a>
                    <span className="num">{dinero(v.precio)}{v.precio_original > v.precio ? <s> {dinero(v.precio_original)}</s> : null}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div><dt>Disponibilidad</dt><dd>{p.disponibilidad}</dd></div>
          <div>
            <dt>Confianza</dt>
            <dd className="confianza" style={{ "--dc": conf.color }}><i />{conf.texto} · revisado el {p.verificado}</dd>
          </div>
        </dl>

        <div className="pros-contras">
          <div>
            <h3>A favor</h3>
            <ul>{p.ventajas.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div>
            <h3>En contra</h3>
            <ul>{p.desventajas.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>

        <div className="acciones">
          <a className="ir" href={p.url} target="_blank" rel="noopener noreferrer">Ver en {p.tienda} ↗</a>
          <button className="secundario" onClick={() => onFavorito(p.id)}>{esFavorito ? "♥ En favoritos" : "♡ Guardar"}</button>
        </div>
      </div>
    </div>
  );
}
