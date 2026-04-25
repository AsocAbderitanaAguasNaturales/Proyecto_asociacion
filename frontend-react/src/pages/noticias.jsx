import { useEffect, useState } from "react";
import Carta_noticia from "../components/carta_noticia";
import '../styles/noticias.css';

function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/noticias")
      .then(res => res.json())
      .then(data => {
        
        setNoticias(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Noticias y Eventos</h1>

      {noticias.length === 0 ? (
        <p>No hay noticias</p>
      ) : (
        noticias.map((noticia, index) => (
          <Carta_noticia
            key={index}
            titulo={noticia.titulo}
            descripcion={noticia.descripcion}
            imagen={noticia.imagen}
          />
        ))
      )}
    </div>
  );
}

export default Noticias;