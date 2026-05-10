import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/gestionar_miembros.css";

function Gestionar_miembros() {
    const [miembros, setMiembros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [confirmarDni, setConfirmarDni] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();

    const cargarMiembros = () => {
        fetch(import.meta.env.VITE_API_URL + "/api/miembros", {
            credentials: "include"
        })
            .then(res => {
                if (res.status === 403) { navigate("/login"); return null; }
                return res.json();
            })
            .then(data => {
                if (data) setMiembros(data);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    };

    useEffect(() => {
        cargarMiembros();
    }, []);

    const handleEliminar = (dni) => {
        fetch(import.meta.env.VITE_API_URL + "/api/miembros/" + dni, {
            method: "DELETE",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setConfirmarDni(null);
                if (data.success) {
                    setMensaje({ tipo: "exito", texto: "Miembro eliminado correctamente." });
                    cargarMiembros();
                } else {
                    setMensaje({ tipo: "error", texto: data.message || "Error al eliminar." });
                }
            })
            .catch(() => setMensaje({ tipo: "error", texto: "Error de conexión." }));
    };

    return (
        <div id="gm-container">
            <h1>Gestionar Miembros</h1>

            {mensaje && (
                <p className={`gm-mensaje ${mensaje.tipo}`}>
                    {mensaje.texto}
                </p>
            )}

            {cargando && <p className="gm-cargando">Cargando miembros...</p>}

            {!cargando && miembros.length === 0 && (
                <p className="gm-cargando">No hay miembros registrados.</p>
            )}

            {!cargando && miembros.length > 0 && (
                <div id="gm-tabla-wrapper">
                    <table id="tabla-miembros">
                        <thead>
                            <tr>
                                <th>DNI</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {miembros.map((m) => (
                                <tr key={m.dni}>
                                    <td>{m.dni}</td>
                                    <td>{m.nombre}</td>
                                    <td>{m.apellidos}</td>
                                    <td>{m.telefono}</td>
                                    <td>{m.email}</td>
                                    <td className="gm-acciones">
                                        <button
                                            className="btn-modificar"
                                            onClick={() => navigate("/admin/gestionar_miembros/" + m.dni)}
                                        >
                                            Modificar
                                        </button>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => { setConfirmarDni(m.dni); setMensaje(null); }}
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

            <button className="btn-nuevo" onClick={() => navigate("/admin/gestionar_miembros/nuevo")}>Añadir miembro</button>

            {/* Modal de confirmación */}
            {confirmarDni && (
                <div id="gm-overlay">
                    <div id="gm-modal">
                        <p>¿Seguro que deseas eliminar al miembro con DNI <strong>{confirmarDni}</strong>?</p>
                        <p className="gm-aviso">Esta acción no se puede deshacer.</p>
                        <div id="gm-modal-botones">
                            <button
                                className="btn-eliminar"
                                onClick={() => handleEliminar(confirmarDni)}
                            >
                                Sí, eliminar
                            </button>
                            <button
                                className="btn-cancelar"
                                onClick={() => setConfirmarDni(null)}
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

export default Gestionar_miembros;