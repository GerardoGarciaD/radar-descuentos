import { useEffect, useState } from "react";
import { RUTA_CATALOGO } from "../config/textos.js";

// Carga el catálogo maestro (public/catalogo.json).
export function useCatalogo() {
  const [estado, setEstado] = useState({ datos: null, error: false });
  useEffect(() => {
    let vivo = true;
    fetch(`${RUTA_CATALOGO}?v=${Date.now()}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then((datos) => vivo && setEstado({ datos, error: false }))
      .catch(() => vivo && setEstado({ datos: null, error: true }));
    return () => {
      vivo = false;
    };
  }, []);
  return estado;
}
