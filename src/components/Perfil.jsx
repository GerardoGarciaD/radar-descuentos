import { GENEROS } from "../lib/variantes.js";

// "¿Para quién buscas?": género y talla. Todo lo de abajo (armador y catálogo) se ajusta.
export default function Perfil({ genero, talla, tallas, onGenero, onTalla }) {
  return (
    <section className="perfil" aria-label="Para quién buscas">
      <div className="perfil-grupo">
        <span className="perfil-et">Para</span>
        <div className="segmentos" role="group" aria-label="Género">
          {GENEROS.map((g) => (
            <button key={g.id} aria-pressed={genero === g.id} onClick={() => onGenero(g.id)}>{g.texto}</button>
          ))}
        </div>
      </div>
      <div className="perfil-grupo">
        <span className="perfil-et">Talla</span>
        <div className="segmentos" role="group" aria-label="Talla">
          {tallas.map((t) => (
            <button key={t} aria-pressed={talla === t} onClick={() => onTalla(t)}>{t}</button>
          ))}
          <button aria-pressed={talla === "todas"} onClick={() => onTalla("todas")}>Todas</button>
        </div>
      </div>
    </section>
  );
}
