import { useEffect, useState } from "react";

// Estado que se recuerda en el navegador (favoritos, última categoría).
// Si el navegador no permite guardar (modo privado), funciona igual sin recordar.
export function useGuardado(clave, inicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado == null ? inicial : JSON.parse(guardado);
    } catch {
      return inicial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      /* sin almacenamiento disponible */
    }
  }, [clave, valor]);
  return [valor, setValor];
}
