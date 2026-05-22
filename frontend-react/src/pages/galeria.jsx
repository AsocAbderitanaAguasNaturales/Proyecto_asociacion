import { useEffect, useState } from "react";
import Carta_foto from "../components/carta_foto";
import "../styles/galeria2.css";

// Función para mostrar la galería de fotos
function Galeria() {
  const [fotos, setFotos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar fotos de la base de datos
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/galeria`)
      .then(res => res.json())
      .then(data => {
        setFotos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  return (
    <div className="galeria-container">
      <h1>Galería</h1>

      {cargando ? (
        <p style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem" }}>Cargando fotos desde el servidor... (esto puede tardar unos segundos)</p>
      ) : fotos.length === 0 ? (
        <p>No hay Fotos</p>
      ) : (
        <div className="galeria">
          {fotos.map((foto, index) => (
            <Carta_foto
              key={index}
              titulo={foto.titulo}
              imagen={foto.imagen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Galeria;
