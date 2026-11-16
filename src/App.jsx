import { useCallback, useMemo, useRef, useState } from "react";
import { MAX_COMPARAR, TODAS } from "./config/textos.js";
import { useCatalogo } from "./hooks/useCatalogo.js";
import { useGuardado } from "./hooks/useGuardado.js";
import { filtrar, ordenar, rangoPrecios, valoresUnicos } from "./lib/catalogo.js";
import Portada from "./components/Portada.jsx";
import Categorias from "./components/Categorias.jsx";
import Filtros from "./components/Filtros.jsx";
import IntroCategoria from "./components/IntroCategoria.jsx";
import Tarjeta from "./components/Tarjeta.jsx";
import Descartados from "./components/Descartados.jsx";
import Aviso from "./components/Aviso.jsx";
import EstrellaNordica from "./components/EstrellaNordica.jsx";
import { BandejaComparar, HojaComparar } from "./components/Comparador.jsx";
import Detalle from "./components/Detalle.jsx";
import Armador from "./components/Armador.jsx";
import Perfil from "./components/Perfil.jsx";
import { coincideGenero, enTalla, tallasDisponibles } from "./lib/variantes.js";

const FILTROS_VACIOS = {
  nivel: "", tienda: "", marca: "", precioMin: "", precioMax: "", orden: "rec",
  soloOfertas: false, soloDescuento: false, soloFavoritos: false,
};

export default function App() {
  const { datos, error } = useCatalogo();
  const [categoria, setCategoria] = useGuardado("kn-cat", "shell");
  const [favLista, setFavLista] = useGuardado("ro-favs", []);
  const [genero, setGenero] = useGuardado("ro-genero", "todos");
  const [talla, setTalla] = useGuardado("ro-talla", "M");
  const [filtros, setFiltros] = useState(FILTROS_VACIOS);
  const [comparar, setComparar] = useState([]);
  const [hojaAbierta, setHojaAbierta] = useState(false);
  const [detalleId, setDetalleId] = useState(null);
  const [aviso, setAviso] = useState("");
  const temporizador = useRef(0);

  const favoritos = useMemo(() => new Set(favLista), [favLista]);
  const crudos = datos?.productos || [];
  const tallas = useMemo(() => tallasDisponibles(crudos), [crudos]);
  // Lo que se ve depende del género y la talla elegidos.
  const productos = useMemo(
    () => crudos.filter((p) => coincideGenero(p, genero)).map((p) => enTalla(p, talla)).filter(Boolean),
    [crudos, genero, talla]
  );

  const conteo = useMemo(() => {
    const c = {};
    productos.forEach((p) => (c[p.categoria] = (c[p.categoria] || 0) + 1));
    return c;
  }, [productos]);

  const categoriaValida = categoria === TODAS.id || conteo[categoria] ? categoria : "shell";
  const deCategoria = useMemo(
    () => productos.filter((p) => categoriaValida === TODAS.id || p.categoria === categoriaValida),
    [productos, categoriaValida]
  );
  const visibles = useMemo(
    () => ordenar(filtrar(productos, { ...filtros, categoria: categoriaValida }, favoritos), filtros.orden),
    [productos, filtros, categoriaValida, favoritos]
  );

  const mostrarAviso = useCallback((texto) => {
    setAviso(texto);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(""), 1600);
  }, []);

  const cambiar = (clave, valor) => {
    if (clave === "categoria") return setCategoria(valor);
    setFiltros((f) => ({ ...f, [clave]: valor }));
  };

  const alternarFavorito = (id) => {
    const quitar = favoritos.has(id);
    setFavLista(quitar ? favLista.filter((x) => x !== id) : [...favLista, id]);
    mostrarAviso(quitar ? "Quitado de favoritos" : "♥ Guardado en favoritos");
  };

  const alternarComparar = (id) => {
    if (comparar.includes(id)) return setComparar(comparar.filter((x) => x !== id));
    if (comparar.length >= MAX_COMPARAR) return mostrarAviso(`Puedes comparar hasta ${MAX_COMPARAR} prendas`);
    setComparar([...comparar, id]);
    mostrarAviso("Agregada a comparar");
  };

  const irA = (id) => {
    const el = document.getElementById(`p-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.animate([{ boxShadow: "0 0 0 3px var(--accent)" }, { boxShadow: "0 0 0 0 transparent" }], { duration: 1400 });
  };

  // Desde el armador: abre la categoría de la prenda, quita filtros y baja hasta su tarjeta.
  const verEnCatalogo = (p) => {
    setFiltros((f) => ({ ...FILTROS_VACIOS, orden: f.orden }));
    setCategoria(p.categoria);
    setTimeout(() => irA(p.id), 120);
  };

  if (error) return <p className="vacio">No se pudo cargar el catálogo. Recarga la página.</p>;
  if (!datos) return <p className="vacio">Cargando catálogo…</p>;

  const meta = datos.meta;
  const info = categoriaValida === TODAS.id
    ? { titulo: TODAS.nombre, nota: TODAS.nota }
    : { titulo: meta.categorias.find((c) => c.id === categoriaValida)?.nombre, nota: meta.notas_categoria[categoriaValida] };

  return (
    <div className="envoltura">
      <Portada total={productos.length} />
      <Perfil genero={genero} talla={talla} tallas={tallas} onGenero={setGenero} onTalla={setTalla} />
      <Armador productos={productos} onVer={verEnCatalogo} />
      <Categorias className="solo-escritorio" categorias={meta.categorias} conteo={conteo} total={productos.length} actual={categoriaValida} onElegir={setCategoria} />
      <Filtros
        categoriasMovil={<Categorias className="deslizable" categorias={meta.categorias} conteo={conteo} total={productos.length} actual={categoriaValida} onElegir={setCategoria} />}
        filtros={filtros}
        cambiar={cambiar}
        limpiar={() => setFiltros({ ...FILTROS_VACIOS, orden: filtros.orden })}
        tiendas={valoresUnicos(productos, "tienda")}
        marcas={valoresUnicos(productos, "marca")}
        rango={rangoPrecios(deCategoria)}
        mostrados={visibles.length}
        total={deCategoria.length}
      />
      <IntroCategoria titulo={info.titulo} nota={info.nota} productos={deCategoria} onIr={irA} />

      <section className="rejilla" aria-live="polite">
        {visibles.length ? (
          visibles.map((p) => (
            <Tarjeta
              key={p.id}
              p={p}
              esFavorito={favoritos.has(p.id)}
              enComparar={comparar.includes(p.id)}
              onFavorito={alternarFavorito}
              onComparar={alternarComparar}
              onDetalle={setDetalleId}
            />
          ))
        ) : (
          <p className="vacio">
            {filtros.soloFavoritos ? "Aún no guardas favoritos aquí. Toca ♡ en una tarjeta." : "Nada coincide con estos filtros."}
          </p>
        )}
      </section>

      <Descartados lista={datos.descartados} />

      <footer className="pie">
        <EstrellaNordica className="pie-estrella" />
        <span>
          Precios verificados el {meta.actualizado}. Cambian a diario: confirma talla y color en la tienda antes de pagar.
          El precio mostrado es el más bajo en la talla elegida.
        </span>
      </footer>

      <BandejaComparar cantidad={comparar.length} onLimpiar={() => setComparar([])} onAbrir={() => setHojaAbierta(true)} />
      {hojaAbierta && comparar.length > 0 && (
        <HojaComparar productos={comparar.map((id) => productos.find((p) => p.id === id)).filter(Boolean)} onCerrar={() => setHojaAbierta(false)} />
      )}
      {detalleId && (
        <Detalle
          p={productos.find((p) => p.id === detalleId)}
          esFavorito={favoritos.has(detalleId)}
          onFavorito={alternarFavorito}
          onCerrar={() => setDetalleId(null)}
        />
      )}
      <Aviso texto={aviso} />
    </div>
  );
}
