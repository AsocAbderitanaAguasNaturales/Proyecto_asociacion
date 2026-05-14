import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/gestionar_noticias.css";
// Función para gestionar las noticias 
function Gestionar_noticias() {
    const [noticias, setNoticias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [confirmarId, setConfirmarId] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();
    // Cargar las noticias 
    const cargarNoticias = () => {
        fetch("/api/noticias")
            .then(res => res.json())
            .then(data => {
                setNoticias(data);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    };

    useEffect(() => {
        cargarNoticias();
    }, []);
    // Eliminar noticias 
    const handleEliminar = (id) => {
        fetch("/api/admin/noticias/" + id, {
            method: "DELETE",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setConfirmarId(null);
                if (data.success) {
                    setMensaje({ tipo: "exito", texto: "Noticia eliminada correctamente." });
                    cargarNoticias();
                } else {
                    setMensaje({ tipo: "error", texto: data.message || "Error al eliminar." });
                }
            })
            .catch(() => setMensaje({ tipo: "error", texto: "Error de conexión." }));
    };

    return (
        <div id="gn-container">
            <h1>Gestionar Noticias</h1>

            {mensaje && (
                <p className={`gn-mensaje ${mensaje.tipo}`}>
                    {mensaje.texto}
                </p>
            )}

            {cargando && <p className="gn-cargando">Cargando noticias...</p>}

            {!cargando && noticias.length === 0 && (
                <p className="gn-cargando">No hay noticias registradas.</p>
            )}

            {!cargando && noticias.length > 0 && (
                <div id="gn-tabla-wrapper">
                    <table id="tabla-noticias">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.map((n) => (
                                <tr key={n.id}>
                                    <td>{n.titulo}</td>
                                    <td className="gn-descripcion-celda">
                                        {n.descripcion.length > 50
                                            ? n.descripcion.substring(0, 50) + "..."
                                            : n.descripcion}
                                    </td>
                                    <td>
                                        <img src={n.imagen} alt={n.titulo} className="gn-img-preview" />
                                    </td>
                                    <td className="gn-acciones">
                                        <div className="gn-acciones-div">
                                            <button
                                                className="btn-modificar"
                                                onClick={() => navigate("/admin/gestionar_noticias/" + n.id)}
                                            >
                                                Modificar
                                            </button>
                                            <button
                                                className="btn-eliminar"
                                                onClick={() => { setConfirmarId(n.id); setMensaje(null); }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div id="gn-botones-pie">
                <button className="btn-nuevo" onClick={() => navigate("/admin/gestionar_noticias/nuevo")}>Añadir noticia</button>
                <button className="btn-volver-admin" onClick={() => navigate("/admin")}>Volver al menú</button>
            </div>

            {/* Modal de confirmación */}
            {confirmarId && (
                <div id="gn-overlay">
                    <div id="gn-modal">
                        <p>¿Seguro que deseas eliminar esta noticia?</p>
                        <p className="gn-aviso">Esta acción no se puede deshacer.</p>
                        <div id="gn-modal-botones">
                            <button
                                className="btn-eliminar"
                                onClick={() => handleEliminar(confirmarId)}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="btn-cancelar"
                                onClick={() => setConfirmarId(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gestionar_noticias;