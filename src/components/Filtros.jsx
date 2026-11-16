import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NIVELES } from "../config/textos.js";

const ORDENES = [
  ["rec", "Recomendados"],
  ["precio-asc", "Menor precio"],
  ["precio-desc", "Mayor precio"],
  ["desc", "Mayor descuento"],
];

// Barra fija de filtros.
// Escritorio: Ordenar, Precio y Presupuesto a la vista; el resto en "Más filtros".
// Celular: una fila compacta (Filtros + Ordenar) y una hoja que sube desde abajo con todo lo demás.
export default function Filtros({ filtros, cambiar, limpiar, tiendas, marcas, rango, mostrados, total, categoriasMovil }) {
  const [masAbierto, setMasAbierto] = useState(false);
  const [hojaAbierta, setHojaAbierta] = useState(false);

  const extras = [filtros.tienda, filtros.marca, filtros.soloOfertas, filtros.soloDescuento, filtros.soloFavoritos].filter(Boolean).length;
  const activos = extras + [filtros.nivel, filtros.precioMin !== "", filtros.precioMax !== ""].filter(Boolean).length;

  useEffect(() => {
    if (!hojaAbierta) return;
    const tecla = (e) => e.key === "Escape" && setHojaAbierta(false);
    document.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
    };
  }, [hojaAbierta]);

  const id = (base, sufijo) => `${base}${sufijo}`;

  const campoOrden = ({ s = "" }) => (
    <label className="campo">
      <span>Ordenar</span>
      <select id={id("f-orden", s)} value={filtros.orden} onChange={(e) => cambiar("orden", e.target.value)}>
        {ORDENES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </label>
  );

  const campoPrecio = ({ s = "" }) => (
    <div className="campo">
      <span>Precio</span>
      <div className="rango">
        <input id={id("f-min", s)} type="number" inputMode="numeric" min="0" placeholder={`$${rango[0]}`} value={filtros.precioMin} onChange={(e) => cambiar("precioMin", e.target.value)} aria-label="Precio mínimo" />
        <span aria-hidden="true">a</span>
        <input id={id("f-max", s)} type="number" inputMode="numeric" min="0" placeholder={`$${rango[1]}`} value={filtros.precioMax} onChange={(e) => cambiar("precioMax", e.target.value)} aria-label="Precio máximo" />
      </div>
    </div>
  );

  const campoPresupuesto = ({ s = "" }) => (
    <label className="campo">
      <span>Presupuesto</span>
      <select id={id("f-nivel", s)} value={filtros.nivel} onChange={(e) => cambiar("nivel", e.target.value)}>
        <option value="">Todos</option>
        {NIVELES.map((n) => <option key={n} value={n}>{n[0].toUpperCase() + n.slice(1)}</option>)}
      </select>
    </label>
  );

  const campoExtras = ({ s = "" }) => (
    <>
      <label className="campo">
        <span>Tienda</span>
        <select id={id("f-tienda", s)} value={filtros.tienda} onChange={(e) => cambiar("tienda", e.target.value)}>
          <option value="">Todas</option>
          {tiendas.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="campo">
        <span>Marca</span>
        <select id={id("f-marca", s)} value={filtros.marca} onChange={(e) => cambiar("marca", e.target.value)}>
          <option value="">Todas</option>
          {marcas.map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>
      <div className="casillas">
        {[["soloOfertas", "Solo mejores compras"], ["soloDescuento", "Solo con descuento"], ["soloFavoritos", "Solo mis favoritos"]].map(([k, t]) => (
          <label key={k} className="casilla">
            <input type="checkbox" id={id(`f-${k}`, s)} checked={filtros[k]} onChange={(e) => cambiar(k, e.target.checked)} />
            {t}
          </label>
        ))}
      </div>
    </>
  );

  return (
    <div className="barra">
      {/* ---- Escritorio ---- */}
      <div className="filtros solo-escritorio">
        {campoOrden({})}
        {campoPrecio({})}
        {campoPresupuesto({})}
        <button className="mas" aria-expanded={masAbierto} onClick={() => setMasAbierto(!masAbierto)}>
          Más filtros{extras ? <span className="burbuja">{extras}</span> : null}
        </button>
        <div className="resumen">
          <span>{mostrados} de {total}</span>
          {activos ? <button className="limpiar" onClick={limpiar}>Limpiar</button> : null}
        </div>
      </div>
      {masAbierto && <div className="filtros-extra solo-escritorio">{campoExtras({})}</div>}

      {/* ---- Celular ---- */}
      <div className="solo-movil movil-barra">
        {categoriasMovil}
        <div className="movil-fila">
          <button className="btn-filtros" onClick={() => setHojaAbierta(true)}>
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            Filtros{activos ? <span className="burbuja">{activos}</span> : null}
          </button>
          <select id="f-orden-m" className="orden-movil" aria-label="Ordenar" value={filtros.orden} onChange={(e) => cambiar("orden", e.target.value)}>
            {ORDENES.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
          <span className="movil-conteo">{mostrados} prendas</span>
        </div>
      </div>

      {/* La hoja va directo en <body>: la barra usa backdrop-filter y atraparía un elemento fijo. */}
      {hojaAbierta && createPortal(
        <div className="hoja hoja-filtros" onClick={(e) => e.target === e.currentTarget && setHojaAbierta(false)}>
          <div className="hoja-in" role="dialog" aria-modal="true" aria-labelledby="titulo-filtros">
            <div className="agarradera" aria-hidden="true" />
            <div className="hoja-cabeza">
              <h2 id="titulo-filtros">Filtros</h2>
              {activos ? <button onClick={limpiar}>Limpiar</button> : <button onClick={() => setHojaAbierta(false)}>Cerrar</button>}
            </div>
            <div className="hoja-campos">
              {campoOrden({ s: "-m" })}
              {campoPrecio({ s: "-m" })}
              {campoPresupuesto({ s: "-m" })}
              {campoExtras({ s: "-m" })}
            </div>
            <div className="hoja-pie">
              <button className="ir" onClick={() => setHojaAbierta(false)}>Ver {mostrados} prendas</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
