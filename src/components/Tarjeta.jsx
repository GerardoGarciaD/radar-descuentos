import { useState } from "react";
import { COLOR_NIVEL, VEREDICTO } from "../config/textos.js";
import { dinero, nombreCorto } from "../lib/catalogo.js";
import IconoPrenda from "./IconoPrenda.jsx";

// Tarjeta compacta: lo necesario para decidir. El análisis completo está en "Ver detalles".
export default function Tarjeta({ p, esFavorito, enComparar, onFavorito, onComparar, onDetalle }) {
  const v = VEREDICTO[p.veredicto] || VEREDICTO.D;
  const [sinFoto, setSinFoto] = useState(false);
  const tieneAntes = p.precio_original && p.precio_original > p.precio;

  return (
    <article className="tarjeta" id={`p-${p.id}`} style={{ "--c": COLOR_NIVEL[p.nivel] }}>
      <div className="arte">
        {p.imagen && !sinFoto ? <img onError={() => setSinFoto(true)} className="foto" src={p.imagen} alt={`${nombreCorto(p.nombre)} en ${p.color_mostrado}`} loading="lazy" referrerPolicy="no-referrer" /> : <IconoPrenda categoria={p.categoria} />}
        {p.descuento > 0 && <span className="descuento">−{p.descuento}%</span>}
        {p.destacado && <span className="destacada" title="Mejor compra">★<span className="destacada-txt"> Mejor compra</span></span>}
        <button className="favorito" aria-pressed={esFavorito} aria-label={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"} onClick={() => onFavorito(p.id)}>
          {esFavorito ? "♥" : "♡"}
        </button>
      </div>

      <div className="cuerpo">
        <div className="marca">{p.marca} · {p.tienda}{p.genero !== "unisex" ? ` · ${p.genero}` : ""}</div>
        <h3>{nombreCorto(p.nombre)}</h3>
        <div className="precio">
          {p.precio_es_desde && <span className="desde">desde</span>}
          <span className="ahora">{dinero(p.precio)}</span>
          {tieneAntes && <s>{dinero(p.precio_original)}</s>}
        </div>
        <p className="veredicto">
          <span className="sello-v" style={{ "--v": v.color }}>{v.texto}</span>
          {p.vale_la_pena}
        </p>
        <div className="acciones">
          <a className="ir" href={p.url} target="_blank" rel="noopener noreferrer">Ver en tienda ↗</a>
          <button className="secundario" onClick={() => onDetalle(p.id)}>Detalles</button>
          <button className="comparar" aria-pressed={enComparar} aria-label={enComparar ? "Quitar de comparar" : "Agregar a comparar"} title="Comparar" onClick={() => onComparar(p.id)}>
            {enComparar ? "✓" : "⇄"}
          </button>
        </div>
      </div>
    </article>
  );
}
