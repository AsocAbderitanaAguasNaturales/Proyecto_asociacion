import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/registro2.css";
// Función para modificar los datos de un miembro
function Modificar_miembro() {
    const { dni } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);
    const [cargando, setCargando] = useState(true);

    // Cargar datos del miembro al montar
    useEffect(() => {
        fetch("/api/admin/miembros/" + dni, {
            credentials: "include"
        })
            .then(res => {
                if (res.status === 403) { navigate("/login"); return null; }
                if (res.status === 404) { navigate("/admin/gestionar_miembros"); return null; }
                return res.json();
            })
            .then(data => {
                if (data) {
                    setFormData(data);
                }
                setCargando(false);
            })
            .catch(() => {
                setMensaje("Error al cargar los datos del miembro");
                setCargando(false);
            });
    }, [dni, navigate]);
    // Función para manejar el cambio de los datos  
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // Función para guardar los cambios   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setExito(false);

        // Validar password solo si se rellena
        if (password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
            if (!passwordRegex.test(password)) {
                setMensaje("La contraseña debe tener entre 8 y 15 caracteres, incluir mayúsculas, minúsculas y números");
                return;
            }
        }

        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(formData.email)) {
            setMensaje("Introduce un email válido");
            return;
        }
        // Enviar los cambios al servidor   
        const payload = { ...formData };
        if (password) payload.password = password;

        try {
            const res = await fetch("/api/admin/miembros/" + dni, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload)
            });

            let data = {};
            try {
                data = await res.json();
            } catch {
                setMensaje("Respuesta inválida del servidor");
                return;
            }

            if (!res.ok) {
                setMensaje(data.error || "Error al modificar el miembro");
            } else {
                setExito(true);
                setMensaje(data.mensaje || "Miembro actualizado correctamente");
                setPassword("");
            }
        } catch {
            setMensaje("Error al conectar con el servidor");
        }
    };

    if (cargando) {
        return <p style={{ textAlign: "center", marginTop: "40px" }}>Cargando datos del miembro...</p>;
    }

    if (!formData) return null;

    return (
        <>
            <h1>Modificar Miembro</h1>

            <main id="contenedor-registro">
                <div className="card-registro">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Nueva contraseña <span style={{ fontWeight: 400, color: "#888" }}>(dejar vacío para no cambiar)</span>:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                name="apellidos"
                                value={formData.apellidos || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>DNI:</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni || ""}
                                disabled
                                style={{ opacity: 0.6, cursor: "not-allowed" }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Teléfono:</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Rol:</label>
                            <select
                                name="rol"
                                value={formData.rol || "miembro"}
                                onChange={handleChange}
                                id="select-rol"
                                required
                            >
                                <option value="miembro">Miembro</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="botones">
                            <input type="submit" value="Guardar cambios" />
                        </div>

                    </form>

                    {mensaje && (
                        <p id="mensaje" style={{ color: exito ? "#2D6A4F" : "#B02A37" }}>
                            {mensaje}
                        </p>
                    )}

                    <button
                        id="btn-volver"
                        onClick={() => navigate("/admin/gestionar_miembros")}
                    >
                        ← Volver a gestionar miembros
                    </button>

                </div>
            </main>
        </>
    );
}

export default Modificar_miembro;