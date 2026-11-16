// Silueta de la prenda por categoría (se muestra mientras no hay foto).
const OSCURO = "#eceee8"; // costuras: color de fondo de la tarjeta

const FIGURAS = {
  shell: (
    <>
      <path d="M38 14h24l6 8 14 6 8 34-10 4-4-20v62H28V52l-4 20-10-4 8-34 14-6z" fill="currentColor" opacity=".9" />
      <path d="M38 14c2 10 22 10 24 0" fill="none" stroke={OSCURO} strokeWidth="3" />
      <path d="M50 22v72" stroke={OSCURO} strokeWidth="2.5" strokeDasharray="3 3" />
    </>
  ),
  aislante: (
    <>
      <path d="M36 14h28l8 10 14 8 6 32-12 4-4-18v58H24V50l-4 18-12-4 6-32 14-8z" fill="currentColor" />
      <g stroke={OSCURO} strokeWidth="2.5" fill="none">
        <path d="M24 40h52M24 56h52M24 72h52M24 88h52" />
        <path d="M50 22v82" />
      </g>
    </>
  ),
  "termica-sup": (
    <>
      <path d="M36 16q14 8 28 0l20 8 10 40-10 3-8-28v66H24V39l-8 28-10-3 10-40z" fill="currentColor" />
      <path d="M36 16q14 8 28 0" fill="none" stroke={OSCURO} strokeWidth="3" />
      <g fill={OSCURO} opacity=".55">
        <path d="M30 56l4-4 4 4-4 4zM46 56l4-4 4 4-4 4zM62 56l4-4 4 4-4 4z" />
      </g>
    </>
  ),
  "termica-inf": (
    <>
      <path d="M30 12h40l4 90H56l-6-60-6 60H26z" fill="currentColor" />
      <path d="M30 20h40" stroke={OSCURO} strokeWidth="4" />
    </>
  ),
  fleece: (
    <>
      <path d="M36 14h28l8 6 14 8 8 36-10 4-6-22v60H24V46l-6 22-10-4 8-36 14-8z" fill="currentColor" />
      <path d="M50 18v86" stroke={OSCURO} strokeWidth="3" />
      <g fill={OSCURO} opacity=".35">
        <circle cx="32" cy="50" r="2" /><circle cx="40" cy="62" r="2" /><circle cx="32" cy="76" r="2" />
        <circle cx="60" cy="50" r="2" /><circle cx="68" cy="64" r="2" /><circle cx="60" cy="80" r="2" />
      </g>
    </>
  ),
  pantalones: (
    <>
      <path d="M28 10h44l6 94H58l-8-62-8 62H22z" fill="currentColor" />
      <path d="M28 18h44M30 60h12M58 60h12" stroke={OSCURO} strokeWidth="2.5" fill="none" />
    </>
  ),
  guantes: (
    <>
      <path d="M30 46V24q0-8 8-8t8 8v18l4-2V18q0-8 8-8t8 8v26q10-6 14 2t-8 18l-12 16v22H34V78q-4-4-4-12z" fill="currentColor" />
      <path d="M34 90h32" stroke={OSCURO} strokeWidth="3" />
      <path d="M42 62l4-4 4 4-4 4zM54 62l4-4 4 4-4 4z" fill={OSCURO} opacity=".5" />
    </>
  ),
  accesorios: (
    <>
      <path d="M18 74q0-50 32-50t32 50z" fill="currentColor" />
      <rect x="14" y="70" width="72" height="16" rx="4" fill="currentColor" />
      <circle cx="50" cy="18" r="9" fill="currentColor" />
      <path d="M14 78h72" stroke={OSCURO} strokeWidth="2.5" />
      <path d="M34 52l4-4 4 4-4 4zM46 46l4-4 4 4-4 4zM58 52l4-4 4 4-4 4z" fill={OSCURO} opacity=".5" />
    </>
  ),
  botas: (
    <>
      <path d="M30 10h28v56l28 14v20H22V72z" fill="currentColor" />
      <path d="M22 92h64" stroke={OSCURO} strokeWidth="4" />
    </>
  ),
  calcetines: (
    <>
      <path d="M36 8h28v58l16 18q6 10-4 16t-16-2L36 76z" fill="currentColor" />
      <path d="M36 20h28" stroke={OSCURO} strokeWidth="4" />
    </>
  ),
};

export default function IconoPrenda({ categoria }) {
  return (
    <svg className="icono-prenda" viewBox="0 0 100 110" aria-hidden="true">
      {FIGURAS[categoria] || FIGURAS.shell}
    </svg>
  );
}
