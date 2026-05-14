import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/miembro.css";
// Importa el Hook useEffect desde React 

// Componente de la página de Miembro
function Miembro() {
    const [datos, setDatos] = useState(null);
    const [comentario, setComentario] = useState("");
    const [mensajeComentario, setMensajeComentario] = useState(null);
    const navigate = useNavigate();
    // Importa el Hook useState desde React
    // Hook que se ejecuta cuando el componente se monta o cuando cambia navigate

    useEffect(() => {
        fetch("/api/session", {
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

    // Maneja el cierre de sesión
    const handleLogout = () => {
        fetch("/api/logout", {
            method: "POST",
            credentials: "include"
        })
            .then(() => navigate("/login"))
            .catch(() => navigate("/login"));
    };

    // Maneja el envío de comentarios
    const handleComentario = (e) => {
        e.preventDefault();

        if (!comentario.trim()) {
            setMensajeComentario({ tipo: "error", texto: "El comentario no puede estar vacío." });
            return;
        }

        fetch("/api/comentarios", {
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
    // Si no hay datos, muestra un mensaje de carga
    if (!datos) {
        return <p>Cargando área de miembro...</p>;
    }
    // Renderiza el área de miembro
    return (
        <>
            <h1>Area de miembros</h1>
            <div id="miembro-container">
                <button id="btn-logout-miembro" onClick={handleLogout}>
                    Cerrar sesión
                </button>
                <h2>Bienvenido {datos.username}</h2>

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