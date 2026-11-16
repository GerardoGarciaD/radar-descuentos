// Estrella decorativa de ocho puntas.
export default function EstrellaNordica({ className }) {
  const puntas = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g fill="currentColor">
        {puntas.map((g) => (
          <path key={g} d="M50 6 L57 34 L50 44 L43 34 Z" transform={`rotate(${g} 50 50)`} />
        ))}
        <rect x="45" y="45" width="10" height="10" transform="rotate(45 50 50)" />
      </g>
    </svg>
  );
}
