import { useEffect, useState } from "react";
import Carta_foto from "../components/carta_foto";
import "../styles/galeria2.css";

function Galeria() {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/galeria")
      .then(res => res.json())
      .then(data => {
        setFotos(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="galeria-container">
      <h1>Galería</h1>

      {fotos.length === 0 ? (
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