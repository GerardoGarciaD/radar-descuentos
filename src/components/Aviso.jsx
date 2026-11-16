// Mensaje breve que aparece abajo (favoritos, límite de comparar).
export default function Aviso({ texto }) {
  return (
    <div className={`aviso${texto ? " visible" : ""}`} role="status">
      {texto}
    </div>
  );
}
