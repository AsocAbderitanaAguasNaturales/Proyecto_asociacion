import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registro2.css";

function Nueva_foto() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        titulo: "",
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

        if (!formData.titulo.trim() || !formData.imagen.trim()) {
            setMensaje("Todos los campos son obligatorios");
            return;
        }

        try {
            const res = await fetch("/api/admin/galeria/nuevo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                setMensaje(data.error || "Error al añadir la foto");
            } else {
                setExito(true);
                setMensaje(data.mensaje || "Foto añadida correctamente");
                setFormData({ titulo: "", imagen: "" });
            }
        } catch {
            setMensaje("Error al conectar con el servidor");
        }
    };

    return (
        <>
            <h1>Nueva Foto</h1>

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
                            <label>URL Imagen:</label>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
                                <label htmlFor="file-upload" style={{
                                    padding: "10px 15px",
                                    background: "#1E6091",
                                    color: "white",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    whiteSpace: "nowrap"
                                }}>
                                    📁 Subir
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
                            <input type="submit" value="Añadir Foto" />
                        </div>
                    </form>

                    {mensaje && (
                        <p id="mensaje" style={{ color: exito ? "#2D6A4F" : "#B02A37" }}>
                            {mensaje}
                        </p>
                    )}

                    <button
                        id="btn-volver"
                        onClick={() => navigate("/admin/gestionar_galeria")}
                    >
                        ← Volver a gestionar galería
                    </button>
                </div>
            </main>
        </>
    );
}

export default Nueva_foto;
