import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registro2.css";
// Función para crear una nueva foto
function Nueva_foto() {
    const navigate = useNavigate();

    // Datos de la foto
    const [formData, setFormData] = useState({
        titulo: "",
        imagen: ""
    });

    // Mensajes
    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);

    // Función para manejar el cambio de los datos
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Función para subir las imágenes    
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Datos para subir la imagen
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        // Enviar la imagen al servidor
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/upload`, {
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

    // Función para enviar la foto al servidor
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setExito(false);

        if (!formData.titulo.trim() || !formData.imagen.trim()) {
            setMensaje("Todos los campos son obligatorios");
            return;
        }
        // Envía los datos al servidor
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/galeria/nuevo`, {
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
