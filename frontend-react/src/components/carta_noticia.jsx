import '../styles/carta_noticia2.css'

function Carta_noticia({ titulo, descripcion, imagen }) {
    return (
      <div className="carta-noticia">
        
        <div className="carta-contenido">
          <h3>{titulo}</h3>
          <p>{descripcion}</p>
        </div>
  
        <div className="carta-imagen">
          <img src={imagen} alt={titulo} />
        </div>
  
      </div>
    );
  }
  
  export default Carta_noticia;