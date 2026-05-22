import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/registro2.css";

function Modificar_foto() {
    const { id } = useParams();
    const navigate = useNavigate();
    // Función para modificar las fotos   
    const [formData, setFormData] = useState({
        titulo: "",
        imagen: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [exito, setExito] = useState(false);
    const [cargando, setCargando] = useState(true);
    // Cargar fotos de la galería   
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/galeria/` + id, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setFormData({
                        titulo: data.titulo,
                        imagen: data.imagen
                    });
                } else {
                    setMensaje(data.message || "No se pudo cargar la foto");
                }
                setCargando(false);
            })
            .catch(() => {
                setMensaje("Error de conexión");
                setCargando(false);
            });
    }, [id]);
    // Función para manejar el cambio de los datos 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // Función para subir las fotos  
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

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
    // Función para guardar los cambios    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setExito(false);
        // Enviar los cambios al servidor 
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/galeria/` + id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            // Comprobar si la respuesta es correcta
            if (!res.ok) {
                setMensaje(data.error || "Error al actualizar la foto");
            } else {
                setExito(true);
                setMensaje(data.mensaje || "Foto actualizada correctamente");
            }
        } catch {
            setMensaje("Error al conectar con el servidor");
        }
    };
    // Si está cargando, mostrar mensaje de carga
    if (cargando) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando datos...</p>;

    return (
        <>
            <h1>Modificar Foto</h1>

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
                            <input type="submit" value="Guardar Cambios" />
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

export default Modificar_foto;
