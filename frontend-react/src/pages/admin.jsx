import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/admin.css';

function Admin() {
    const [verificado, setVerificado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/api/session", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged && data.rol === "admin") {
                    setVerificado(true);
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

    if (!verificado) {
        return <p>Cargando panel de administrador...</p>;
    }

    return (
        <>
            <h1>Panel de administrador</h1>
            <button id="btn-logout-admin" onClick={handleLogout}>
                Cerrar sesión
            </button>

            <div id="contenedor-panel">
                <div className="gestionar">
                    <p>Miembro</p>
                    <Link to="/admin/gestionar_miembros">Gestionar</Link>
                </div>
                <div className="gestionar">
                    <p>Galería</p>
                    <Link to="/admin/gestionar_galeria">Gestionar</Link>
                </div>
                <div className="gestionar">
                    <p>Noticias</p>
                    <Link to="/admin/gestionar_noticias">Gestionar</Link>
                </div>
                <div className="gestionar">
                    <p>Comentarios</p>
                    <Link to="/admin/gestionar_comentarios">Gestionar</Link>
                </div>
            </div>
        </>
    );
}

export default Admin;