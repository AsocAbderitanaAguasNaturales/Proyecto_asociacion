import { useEffect, useState } from "react";
import Carta_noticia from "../components/carta_noticia";
import '../styles/noticias.css';

// Hook que se ejecuta cuando el componente se monta o cuando cambia navigate

// Componente de la página de Noticias
function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Hook que se ejecuta cuando el componente se monta o cuando cambia navigate
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/noticias`)
      .then(res => res.json())
      .then(data => {
        setNoticias(data);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <h1>Noticias y Eventos</h1>

      {cargando ? (
        <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>Cargando noticias desde el servidor... (esto puede tardar unos segundos)</p>
      ) : noticias.length === 0 ? (
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
