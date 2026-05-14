import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/gestionar_comentarios.css";
// Función para gestionar los comentarios 
function GestionarComentarios() {
    const [comentarios, setComentarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [confirmarId, setConfirmarId] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();
    // Cargar los comentarios
    const cargarComentarios = () => {
        fetch("/api/comentarios")
            .then(res => res.json())
            .then(data => {
                setComentarios(data);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    };

    useEffect(() => {
        cargarComentarios();
    }, []);
    // Función para eliminar los comentarios
    const handleEliminar = (id) => {
        fetch("/api/admin/comentarios/" + id, {
            method: "DELETE",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setConfirmarId(null);
                if (data.success) {
                    setMensaje({ tipo: "exito", texto: "Comentario eliminado correctamente." });
                    cargarComentarios();
                } else {
                    setMensaje({ tipo: "error", texto: data.message || "Error al eliminar." });
                }
            })
            .catch(() => setMensaje({ tipo: "error", texto: "Error de conexión." }));
    };

    return (
        <div id="gc-container">
            <h1>Gestionar Comentarios</h1>

            {mensaje && (
                <p className={`gc-mensaje ${mensaje.tipo}`}>
                    {mensaje.texto}
                </p>
            )}

            {cargando && <p className="gc-cargando">Cargando comentarios...</p>}

            {!cargando && comentarios.length === 0 && (
                <p className="gc-cargando">No hay comentarios registrados.</p>
            )}

            {!cargando && comentarios.length > 0 && (
                <div id="gc-tabla-wrapper">
                    <table id="tabla-comentarios">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Comentario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comentarios.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.username}</td>
                                    <td className="gc-td-comentario">{c.comentario}</td>
                                    <td className="gc-acciones">
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => { setConfirmarId(c.id); setMensaje(null); }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div id="gc-botones-pie">
                <button className="btn-volver-admin" onClick={() => navigate("/admin")}>Volver al menú</button>
            </div>

            {/* Modal de confirmación */}
            {confirmarId && (
                <div id="gc-overlay">
                    <div id="gc-modal">
                        <p>¿Seguro que deseas eliminar este comentario?</p>
                        <p className="gc-aviso">Esta acción no se puede deshacer.</p>
                        <div id="gc-modal-botones">
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

export default GestionarComentarios;