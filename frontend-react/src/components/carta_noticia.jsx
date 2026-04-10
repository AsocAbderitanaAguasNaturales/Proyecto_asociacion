function carta_noticia(titulo,descripcion,imagen){
    return(
        <div>
            <div>
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
            </div>
            <div>
                <img src={imagen} alt={titulo} />
            </div>
        </div>
    )
}

export default carta_noticia