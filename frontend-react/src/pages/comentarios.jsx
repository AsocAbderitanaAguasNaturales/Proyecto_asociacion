import { useEffect, useState } from "react";
import "../styles/comentarios.css";

// Función para mostrar los comentarios
function Comentarios() {
    // Comentarios y estado de carga
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch("/api/comentarios")
            .then(res => res.json())
            .then(data => {
                setComentarios(data);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    }, []);

    return (
        <>
            <h1>Comentarios</h1>
            <div id="comentarios-container">


                {cargando && <p className="mensaje">Cargando comentarios...</p>}

                {!cargando && comentarios.length === 0 && (
                    <p className="mensaje">Aún no hay comentarios.</p>
                )}

                {!cargando && comentarios.length > 0 && (
                    <table id="tabla-comentarios">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Comentario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comentarios.map((c, index) => (
                                <tr key={index}>
                                    <td>{c.username}</td>
                                    <td>{c.comentario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default Comentarios;