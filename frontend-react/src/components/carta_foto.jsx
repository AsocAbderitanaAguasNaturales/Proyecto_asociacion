import '../styles/carta_foto2.css'

function Carta_foto({imagen,titulo}){
    return(
        <div className="carta-foto">
            <div>
                 <img src={imagen} alt={titulo} />
            </div>
            <div>
                <p>{titulo}</p>
            </div>
            
        </div>
    )
}

export default Carta_foto