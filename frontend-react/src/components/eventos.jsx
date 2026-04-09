import './Evento.css'

function Evento({ titulo, descripcion, imagen }) {
  return (
    <div className="evento">
      <img src={imagen} alt={titulo} className="evento-img" />

      <div className="evento-info">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  )
}

export default Evento