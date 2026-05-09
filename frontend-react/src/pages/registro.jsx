import { useState } from "react"
import "../styles/registro2.css"

function Registro() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        nombre: "",
        apellidos: "",
        dni: "",
        telefono: "",
        email: ""
    })

    const [mensaje, setMensaje] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/

        if (!passwordRegex.test(formData.password)) {
            setMensaje("La contraseña debe tener entre 8 y 15 caracteres, incluir mayúsculas, minúsculas y números")
            return
        }

        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if (!emailRegex.test(formData.email)) {
            setMensaje("Introduce un email válido")
            return
        }

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + "/api/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            let data = {}

            try {
                data = await res.json()
            } catch  {
                setMensaje("Respuesta inválida del servidor")
                return
            }

            if (!res.ok) {
                setMensaje(data.error)
            } else {
                setMensaje(data.mensaje)
            }

        } catch  {
            setMensaje("Error al conectar con el servidor")
        }
    }

    const handleReset = () => {
        setFormData({
            username: "",
            password: "",
            nombre: "",
            apellidos: "",
            dni: "",
            telefono: "",
            email: ""
        })
    }

    return (
        <>
            <h1>Registro</h1>

            <main id="contenedor-registro">
                <div className="card-registro">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Username:</label>
                            <input type="text" name="username" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" name="nombre" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Apellidos:</label>
                            <input type="text" name="apellidos" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>DNI:</label>
                            <input type="text" name="dni" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Teléfono:</label>
                            <input type="tel" name="telefono" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" onChange={handleChange} required />
                        </div>

                        <div className="botones">
                            <input type="submit" value="Registrarse"/>
                            <input type="reset" value="Borrar" onClick={handleReset}/>
                        </div>

                    </form>

                    {mensaje && <p id="mensaje">{mensaje}</p>}
                        <a href="./login">Volver</a>
                </div>
          
            </main>
        </>
    )
}

export default Registro