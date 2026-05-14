import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/gestionar_galeria.css";

// Función para gestionar la galería
function Gestionar_galeria() {
    const [fotos, setFotos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [confirmarId, setConfirmarId] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();

    // Cargar fotos de la galería   
    const cargarFotos = () => {
        fetch("/api/galeria")
            .then(res => res.json())
            .then(data => {
                setFotos(data);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    };

    useEffect(() => {
        cargarFotos();
    }, []);

    // Función para eliminar las fotos 
    const handleEliminar = (id) => {
        fetch("/api/admin/galeria/" + id, {
            method: "DELETE",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setConfirmarId(null);
                if (data.success) {
                    setMensaje({ tipo: "exito", texto: "Foto eliminada correctamente." });
                    cargarFotos();
                } else {
                    setMensaje({ tipo: "error", texto: data.message || "Error al eliminar." });
                }
            })
            .catch(() => setMensaje({ tipo: "error", texto: "Error de conexión." }));
    };

    return (
        <div id="gg-container">
            <h1>Gestionar Galería</h1>

            {mensaje && (
                <p className={`gg-mensaje ${mensaje.tipo}`}>
                    {mensaje.texto}
                </p>
            )}

            {cargando && <p className="gg-cargando">Cargando fotos...</p>}

            {!cargando && fotos.length === 0 && (
                <p className="gg-cargando">No hay fotos en la galería.</p>
            )}

            {!cargando && fotos.length > 0 && (
                <div id="gg-tabla-wrapper">
                    <table id="tabla-galeria">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fotos.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.titulo}</td>
                                    <td>
                                        <img src={f.imagen} alt={f.titulo} className="gg-img-preview" />
                                    </td>
                                    <td className="gg-acciones">
                                        <div className="gg-acciones-div">
                                            <button
                                                className="btn-modificar"
                                                onClick={() => navigate("/admin/gestionar_galeria/" + f.id)}
                                            >
                                                Modificar
                                            </button>
                                            <button
                                                className="btn-eliminar"
                                                onClick={() => { setConfirmarId(f.id); setMensaje(null); }}
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

            <div id="gg-botones-pie">
                <button className="btn-nuevo" onClick={() => navigate("/admin/gestionar_galeria/nuevo")}>Añadir foto</button>
                <button className="btn-volver-admin" onClick={() => navigate("/admin")}>Volver al menú</button>
            </div>

            {/* Modal de confirmación */}
            {confirmarId && (
                <div id="gg-overlay">
                    <div id="gg-modal">
                        <p>¿Seguro que deseas eliminar esta foto?</p>
                        <p className="gg-aviso">Esta acción no se puede deshacer.</p>
                        <div id="gg-modal-botones">
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

export default Gestionar_galeria;