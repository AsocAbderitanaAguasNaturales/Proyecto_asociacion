import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/miembro.css";
function Miembro() {
    const [datos, setDatos] = useState(null);
    const [comentario, setComentario] = useState("");
    const [mensajeComentario, setMensajeComentario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/api/session", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged && data.user) {
                    setDatos(data.user);
                } else {
                    navigate("/login");
                }
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    const handleLogout = () => {
        fetch(import.meta.env.VITE_API_URL + "/api/logout", {
            method: "POST",
            credentials: "include"
        })
            .then(() => navigate("/login"))
            .catch(() => navigate("/login"));
    };

    const handleComentario = (e) => {
        e.preventDefault();

        if (!comentario.trim()) {
            setMensajeComentario({ tipo: "error", texto: "El comentario no puede estar vacío." });
            return;
        }

        fetch(import.meta.env.VITE_API_URL + "/api/comentarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ comentario })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMensajeComentario({ tipo: "exito", texto: "¡Comentario enviado correctamente!" });
                    setComentario("");
                } else {
                    setMensajeComentario({ tipo: "error", texto: data.message || "Error al enviar el comentario." });
                }
            })
            .catch(() => setMensajeComentario({ tipo: "error", texto: "Error de conexión." }));
    };

    if (!datos) {
        return <p>Cargando área de miembro...</p>;
    }

    return (
        <>
            <h1>Area de miembros</h1>
            <div id="miembro-container">
                <h2>Bienvenido {datos.username}</h2>
                <button id="btn-logout-miembro" onClick={handleLogout}>
                    Cerrar sesión
                </button>
                <div id="miembro-grid">

                    <div className="tarjeta-miembro">
                        <h3>Datos Personales</h3>
                        <p>Nombre: {datos.nombre}</p>
                        <p>Apellidos: {datos.apellidos}</p>
                        <p>DNI: {datos.dni}</p>
                        <p>Telefono: {datos.telefono}</p>
                        <p>Email: {datos.email}</p>
                    </div>
                    <div className="tarjeta-miembro" >
                        <h3>Comentarios y Sugerencias</h3>
                        <form onSubmit={handleComentario}>
                            <label htmlFor="comentario">Comentario: </label><br />
                            <textarea
                                name="comentario"
                                id="comentario"
                                cols="60"
                                rows="5"
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            ></textarea><br />
                            <input type="submit" value="Enviar" />
                        </form>
                        {mensajeComentario && (
                            <p className={`mensaje-comentario ${mensajeComentario.tipo}`}>
                                {mensajeComentario.texto}
                            </p>
                        )}
                    </div>

                </div>

            </div>
        </>
    );
}

export default Miembro;