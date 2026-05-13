import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registro2.css";

function Nueva_noticia() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        imagen: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formDataUpload,
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ ...formData, imagen: data.url });
            } else {
                alert(data.error || "Error al subir la imagen");
            }
        } catch {
            alert("Error de conexión al subir la imagen");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setExito(false);

        if (!formData.titulo.trim() || !formData.descripcion.trim() || !formData.imagen.trim()) {
            setMensaje("Todos los campos son obligatorios");
            return;
        }

        try {
            const res = await fetch("/api/admin/noticias/nuevo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                setMensaje(data.error || "Error al añadir la noticia");
            } else {
                setExito(true);
                setMensaje(data.mensaje || "Noticia añadida correctamente");
                setFormData({ titulo: "", descripcion: "", imagen: "" });
            }
        } catch {
            setMensaje("Error al conectar con el servidor");
        }
    };

    return (
        <>
            <h1>Nueva Noticia</h1>

            <main id="contenedor-registro">
                <div className="card-registro">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Título:</label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Descripción:</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>URL Imagen:</label>
                            <div className="upload-container">
                                <input
                                    type="text"
                                    name="imagen"
                                    value={formData.imagen}
                                    onChange={handleChange}
                                    placeholder="/images/ejemplo.jpg"
                                    required
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    style={{ display: "none" }}
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="btn-upload">
                                    📁 Subir imagen
                                </label>
                            </div>
                            {formData.imagen && (
                                <div style={{ marginTop: "10px", textAlign: "center" }}>
                                    <p style={{ fontSize: "12px", color: "#666" }}>Vista previa:</p>
                                    <img src={formData.imagen} alt="Preview" style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "10px", border: "2px solid #52B788" }} />
                                </div>
                            )}
                        </div>

                        <div className="botones">
                            <input type="submit" value="Añadir Noticia" />
                        </div>
                    </form>

                    {mensaje && (
                        <p id="mensaje" style={{ color: exito ? "#2D6A4F" : "#B02A37" }}>
                            {mensaje}
                        </p>
                    )}

                    <button
                        id="btn-volver"
                        onClick={() => navigate("/admin/gestionar_noticias")}
                    >
                        ← Volver a gestionar noticias
                    </button>
                </div>
            </main>
        </>
    );
}

export default Nueva_noticia;
