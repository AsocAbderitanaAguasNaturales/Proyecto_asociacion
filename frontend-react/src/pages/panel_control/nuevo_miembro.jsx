import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registro2.css";

function NuevoMiembro() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        nombre: "",
        apellidos: "",
        dni: "",
        telefono: "",
        email: "",
        rol: "miembro"
    });

    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setExito(false);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
        if (!passwordRegex.test(formData.password)) {
            setMensaje("La contraseña debe tener entre 8 y 15 caracteres, incluir mayúsculas, minúsculas y números");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(formData.email)) {
            setMensaje("Introduce un email válido");
            return;
        }

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/api/admin/miembros/nuevo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            let data = {};
            try {
                data = await res.json();
            } catch {
                setMensaje("Respuesta inválida del servidor");
                return;
            }

            if (!res.ok) {
                setMensaje(data.error || "Error al crear el miembro");
            } else {
                setExito(true);
                setMensaje(data.mensaje || "Miembro creado correctamente");
                setFormData({
                    username: "",
                    password: "",
                    nombre: "",
                    apellidos: "",
                    dni: "",
                    telefono: "",
                    email: "",
                    rol: "miembro"
                });
            }
        } catch {
            setMensaje("Error al conectar con el servidor");
        }
    };

    const handleReset = () => {
        setFormData({
            username: "",
            password: "",
            nombre: "",
            apellidos: "",
            dni: "",
            telefono: "",
            email: "",
            rol: "miembro"
        });
        setMensaje("");
        setExito(false);
    };

    return (
        <>
            <h1>Nuevo Miembro</h1>

            <main id="contenedor-registro">
                <div className="card-registro">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Apellidos:</label>
                            <input
                                type="text"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>DNI:</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Teléfono:</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Rol:</label>
                            <select
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                id="select-rol"
                                required
                            >
                                <option value="miembro">Miembro</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="botones">
                            <input type="submit" value="Crear miembro" />
                            <input type="reset" value="Borrar" onClick={handleReset} />
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

export default NuevoMiembro;
