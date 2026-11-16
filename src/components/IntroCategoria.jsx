import { useEffect, useState } from "react";
import { COLOR_NIVEL, NIVELES } from "../config/textos.js";
import { dinero, mejorPorNivel, nombreCorto } from "../lib/catalogo.js";

// Título, explicación breve y la mejor compra de cada presupuesto.
export default function IntroCategoria({ titulo, nota, productos, onIr }) {
  const [abierta, setAbierta] = useState(false);
  useEffect(() => setAbierta(false), [titulo]);
  const mejores = NIVELES.map((nivel) => [nivel, mejorPorNivel(productos, nivel)]).filter(([, p]) => p);

  return (
    <section className="intro">
      <div className="intro-texto">
        <h2>{titulo}</h2>
        <p className={abierta ? "abierta" : ""}>{nota}</p>
        {nota && nota.length > 160 && (
          <button className="leer-mas" onClick={() => setAbierta(!abierta)}>
            {abierta ? "Leer menos" : "Leer más"}
          </button>
        )}
      </div>
      {mejores.length > 0 && (
        <div className="mejores">
          <span className="mejores-titulo">Si solo compras una</span>
          <div className="mejores-fila">
            {mejores.map(([nivel, p]) => (
              <button key={nivel} className="mejor" style={{ "--c": COLOR_NIVEL[nivel] }} onClick={() => onIr(p.id)}>
                <span className="mejor-nivel">{nivel}</span>
                <strong>{nombreCorto(p.nombre)}</strong>
                <span className="mejor-pie">
                  <span>{p.marca}</span>
                  <b>{dinero(p.precio)}</b>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
