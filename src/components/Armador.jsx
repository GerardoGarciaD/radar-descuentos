import { useMemo, useState } from "react";
import { MEDIDORES, NIVEL_TEXTO, PLANES, ZONAS } from "../config/planes.js";
import { useGuardado } from "../hooks/useGuardado.js";
import { dinero, nombreCorto } from "../lib/catalogo.js";
import SelectorPrenda from "./SelectorPrenda.jsx";

// Íconos de los planes (trazo simple, heredan el color del texto).
const ICONOS = {
  ciudad: <path d="M4 21V9l5-4v16M9 21V5l6 3v13M15 21v-9l5 2v7M3 21h18" />,
  montana: <><path d="M3 20l6-10 4 6 3-4 5 8z" /><circle cx="17" cy="6" r="2" /></>,
  aurora: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M5 18h14M8 21h8" /></>,
  lluvia: <><path d="M7 15a4 4 0 010-8 5 5 0 019.6 1.5A3.5 3.5 0 0117 15z" /><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" /></>,
};
const Icono = ({ nombre }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONOS[nombre]}
  </svg>
);

// Posición de cada número sobre la figura (en % de la figura).
const PUNTOS = { cabeza: [50, 9], torso: [50, 34], manos: [86, 41], piernas: [40, 70], pies: [40, 93] };

function Medidor({ etiqueta, valor }) {
  return (
    <div className="medidor">
      <span>{etiqueta}</span>
      <div className="medidor-barras" aria-hidden="true">
        {[1, 2, 3].map((n) => <i key={n} className={n <= valor ? "lleno" : ""} />)}
      </div>
      <strong>{NIVEL_TEXTO[valor]}</strong>
    </div>
  );
}

// Armador de outfits: eliges un plan, ves qué pide y un outfit de ejemplo sobre la silueta.
export default function Armador({ productos, onVer }) {
  const [planId, setPlanId] = useGuardado("kn-plan", "ciudad");
  const [cambios, setCambios] = useGuardado("ro-outfit-cambios", {});
  const [zonaId, setZonaId] = useState("torso");
  const [eligiendo, setEligiendo] = useState(null); // { zona, capa }

  const porId = useMemo(() => Object.fromEntries(productos.map((p) => [p.id, p])), [productos]);
  const plan = PLANES.find((p) => p.id === planId) || PLANES[0];
  const cambiosPlan = cambios[plan.id] || {};

  // Prenda elegida para una capa: primero el cambio del usuario, si no el ejemplo.
  // Si la prenda del ejemplo no existe en este género o talla, se elige sola la mejor de esa capa.
  const RANGO = { R: 0, B: 1, D: 2, N: 3 };
  const mejorPara = (zona, i, usados) => {
    const cats = ZONAS.find((z) => z.id === zona)?.capas[i]?.categorias || [];
    const preferida = plan.preferir?.[`${zona}-${i}`];
    return productos
      .filter((p) => cats.includes(p.categoria) && !usados.has(p.id))
      .sort((a, b) => (preferida ? (b.categoria === preferida) - (a.categoria === preferida) : 0) || (RANGO[a.veredicto] ?? 2) - (RANGO[b.veredicto] ?? 2) || a.precio - b.precio)[0] || null;
  };
  const usados = new Set();
  const prendaDe = (zona, i) => {
    const clave = `${zona}-${i}`;
    const id = clave in cambiosPlan ? cambiosPlan[clave] : plan.outfit[zona]?.[i];
    if (id === null) return null;
    const p = (id && porId[id]) || (clave in cambiosPlan ? null : mejorPara(zona, i, usados));
    if (p) usados.add(p.id);
    return p;
  };

  const resumen = ZONAS.map((z) => {
    const prendas = z.capas.map((_, i) => prendaDe(z.id, i));
    const llenas = prendas.filter(Boolean);
    return { ...z, prendas, llenas, total: llenas.reduce((s, p) => s + p.precio, 0) };
  });
  const total = resumen.reduce((s, z) => s + z.total, 0);
  const hayCambios = Object.keys(cambiosPlan).length > 0;
  const zona = resumen.find((z) => z.id === zonaId) || resumen[1];

  const elegir = (id) => {
    const clave = `${eligiendo.zona}-${eligiendo.capa}`;
    setCambios({ ...cambios, [plan.id]: { ...cambiosPlan, [clave]: id } });
    setEligiendo(null);
  };

  const textoZona = (z) => {
    if (z.pendiente) return z.pendiente;
    if (!z.llenas.length) return "Nada extra";
    const principal = nombreCorto(z.llenas[0].nombre);
    const extra = z.llenas.length - 1;
    return extra ? `${principal} + ${extra} ${extra === 1 ? "capa" : "capas"}` : principal;
  };

  return (
    <section className="armador" aria-labelledby="titulo-armador">
      <div className="armador-cabeza">
        <span className="eyebrow">¿Qué me pongo?</span>
        <h2 id="titulo-armador">Vístete para el plan</h2>
      </div>

      <div className="planes" role="tablist" aria-label="Planes del día">
        {PLANES.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === plan.id}
            className="plan"
            onClick={() => { setPlanId(p.id); setZonaId("torso"); }}
          >
            <Icono nombre={p.icono} />
            <span>{p.nombre}</span>
          </button>
        ))}
      </div>

      <div className="armador-cuerpo">
        <div className="pide">
          <span className="eyebrow violeta">Qué pide este plan</span>
          <p>{plan.explicacion}</p>
          <div className="medidores">
            {MEDIDORES.map(([k, t]) => <Medidor key={k} etiqueta={t} valor={plan.medidores[k]} />)}
          </div>
          <div className="listas">
            <div>
              <h3 className="si">Necesitas</h3>
              <ul>{plan.necesitas.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className="no">Puedes dejar</h3>
              <ul>{plan.dejar.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="outfit">
          <div className="outfit-barra">
            <span className="ejemplo">{hayCambios ? "Tu outfit" : "Outfit de ejemplo"}</span>
            <strong className="num">{dinero(total)}</strong>
            {hayCambios && (
              <button className="restablecer" onClick={() => setCambios({ ...cambios, [plan.id]: {} })}>
                Volver al ejemplo
              </button>
            )}
          </div>

          <div className="silueta">
            {["izq", "der"].map((lado) => (
              <div key={lado} className={`silueta-col ${lado}`}>
                {resumen.filter((z) => z.lado === lado).map((z) => (
                  <button
                    key={z.id}
                    className={`zona${z.id === zona.id ? " activa" : ""}${z.pendiente ? " pendiente" : ""}`}
                    style={{ gridRow: z.fila }}
                    disabled={!!z.pendiente}
                    aria-pressed={z.id === zona.id}
                    onClick={() => setZonaId(z.id)}
                  >
                    <span className="zona-et">{z.fila} · {z.nombre}</span>
                    <span className="zona-prenda">{textoZona(z)}</span>
                    {z.total > 0 && <span className="zona-precio num">{dinero(z.total)}</span>}
                  </button>
                ))}
              </div>
            ))}
            <div className="figura">
              <svg viewBox="0 0 150 320" aria-hidden="true">
                <circle cx="75" cy="30" r="22" />
                <path d="M44 62h62l18 70-14 6-12-46v96H52V92l-12 46-14-6z" />
                <path className="piernas" d="M52 188h46l4 116H82l-7-90-7 90H48z" />
              </svg>
              {resumen.map((z) => (
                <span
                  key={z.id}
                  className={`punto${z.id === zona.id ? " activo" : ""}${z.pendiente ? " pendiente" : ""}`}
                  style={{ left: `${PUNTOS[z.id][0]}%`, top: `${PUNTOS[z.id][1]}%` }}
                  aria-hidden="true"
                >
                  {z.fila}
                </span>
              ))}
            </div>
          </div>

          <div className="capas-zona">
            <h3>{zona.nombre} · {plan.corto}</h3>
            <ol>
              {zona.capas.map((capa, i) => {
                const p = zona.prendas[i];
                const nota = plan.notas[`${zona.id}-${i}`];
                return (
                  <li key={capa.rol} className={p ? "" : "vacia"}>
                    <span className="capa-rol">{capa.rol}</span>
                    <div className="capa-info">
                      {p ? (
                        <>
                          <strong>{nombreCorto(p.nombre)}</strong>
                          <span>{p.marca} · {p.tienda}</span>
                        </>
                      ) : (
                        <strong className="capa-nota">{nota || "Sin prenda"}</strong>
                      )}
                    </div>
                    {p && <span className="capa-precio num">{dinero(p.precio)}</span>}
                    <div className="capa-acciones">
                      {p && <button onClick={() => onVer(p)}>Ver</button>}
                      <button onClick={() => setEligiendo({ zona: zona.id, capa: i })}>{p ? "Cambiar" : "Agregar"}</button>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="consejo">{plan.consejo}</p>
          </div>
        </div>
      </div>

      {eligiendo && (
        <SelectorPrenda
          titulo={`${ZONAS.find((z) => z.id === eligiendo.zona).nombre} · ${ZONAS.find((z) => z.id === eligiendo.zona).capas[eligiendo.capa].rol}`}
          opciones={productos.filter((p) => ZONAS.find((z) => z.id === eligiendo.zona).capas[eligiendo.capa].categorias.includes(p.categoria))}
          actual={prendaDe(eligiendo.zona, eligiendo.capa)?.id}
          onElegir={elegir}
          onQuitar={() => elegir(null)}
          onCerrar={() => setEligiendo(null)}
        />
      )}
    </section>
  );
}
