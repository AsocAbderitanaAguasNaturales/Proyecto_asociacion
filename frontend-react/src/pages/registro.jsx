import "../styles/registro2.css"

function Registro(){
    return(
        <>
        <h1>Registro</h1>

        <main id="contenedor-registro">

            <div className="card-registro">

                <form action="" method="post" id="registro">

                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" placeholder="Username" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Password" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo:</label>
                        <input type="text" name="nombre" id="nombre" placeholder="Nombre Completo" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input type="text" pattern="[0-9]{8}[a-zA-Z]{1}" name="dni" id="dni" placeholder="DNI" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input type="tel" name="telefono" id="telefono" placeholder="Teléfono" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" name="email" id="email" placeholder="E-mail" required />
                    </div>

                    <div className="botones">
                        <input type="submit" value="Registrarse" />
                        <input type="reset" value="Borrar" />
                    </div>

                </form>

                <a href="./login">Volver</a>

            </div>

        </main>
        </>
    )
}

export default Registro