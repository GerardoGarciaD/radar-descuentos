import { useEffect, useRef } from "react";

// Copos de nieve en canvas. Se apaga con "reducir movimiento" y cuando la pestaña no se ve.
export default function Nieve() {
  const ref = useRef(null);

  useEffect(() => {
    const lienzo = ref.current;
    if (!lienzo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = lienzo.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let ancho = 0, alto = 0, copos = [], cuadro = 0;

    const medir = () => {
      const caja = lienzo.getBoundingClientRect();
      ancho = lienzo.width = caja.width * dpr;
      alto = lienzo.height = caja.height * dpr;
      copos = Array.from({ length: Math.min(90, Math.round(caja.width / 9)) }, () => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        radio: (Math.random() * 1.8 + 0.6) * dpr,
        velocidad: Math.random() * 0.5 + 0.25,
        fase: Math.random() * Math.PI * 2,
      }));
    };

    const dibujar = () => {
      ctx.clearRect(0, 0, ancho, alto);
      ctx.fillStyle = "rgba(31,78,121,.28)";
      for (const c of copos) {
        c.y += c.velocidad * dpr;
        c.fase += 0.01;
        c.x += Math.sin(c.fase) * 0.3 * dpr;
        if (c.y > alto) { c.y = -4; c.x = Math.random() * ancho; }
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radio, 0, Math.PI * 2);
        ctx.fill();
      }
      cuadro = requestAnimationFrame(dibujar);
    };

    const alCambiarVisibilidad = () => {
      cancelAnimationFrame(cuadro);
      if (!document.hidden) dibujar();
    };

    medir();
    dibujar();
    window.addEventListener("resize", medir);
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("resize", medir);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, []);

  return <canvas ref={ref} className="nieve" aria-hidden="true" />;
}
