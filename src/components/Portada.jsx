import { CAPAS, HERO } from "../config/textos.js";
import EstrellaNordica from "./EstrellaNordica.jsx";
import Nieve from "./Nieve.jsx";

export default function Portada({ total }) {
  return (
    <header className="portada">
      <div className="cielo" />
      <Nieve />
      <div className="portada-in">

        <div className="titulo">
          <h1>
            <span className="contorno">Radar</span>
            <span className="aurora-texto">Ofertas</span>
          </h1>
          <EstrellaNordica className="estrella" />
          <span className="vertical">{HERO.vertical}</span>
        </div>

        <div className="chips-portada">
          {HERO.chips.map((c) => (
            <span key={c.texto} className="chip-portada">
              {c.texto} <b>{c.fuerte}</b>
            </span>
          ))}
          <span className="chip-portada">
            <b>{total}</b> productos verificados
          </span>
        </div>

        <div className="capas">
          {CAPAS.map((c) => (
            <div key={c.nombre} className="capa" style={{ "--c": c.color }}>
              <span className="etiqueta-no">{c.noruego}</span>
              <span className="capa-nombre">{c.nombre}</span>
              <p>{c.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
