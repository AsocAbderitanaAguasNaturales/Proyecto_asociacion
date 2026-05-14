import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/login2.css"

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  // Comprobar si el usuario está autenticado
  useEffect(() => {
    fetch("/api/session", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.logged) {
          if (data.rol === "admin") navigate("/admin");
          else navigate("/miembro");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT funcionando");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username.toLowerCase(), password }),
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        if (data.rol === "admin") navigate("/admin");
        else navigate("/miembro");
      } else {
        alert("Credenciales incorrectas");
      }

    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor. Asegúrate de que el backend esté ejecutándose.");
    }
  };

  if (checking) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Comprobando sesión...</p>;
  }

  return (
    <>
      <h1>Login</h1>
      <main id="contenedor-login">
        <div id="card-login">


          <form onSubmit={handleSubmit} id="login">
            <label htmlFor="username">Username: </label>
            <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password: </label>
            <input type="password" value={password} name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            <div className="botones">
              <input type="submit" value="Log In" />
              <input type="reset" value="Borrar" onClick={() => {
                setUsername("");
                setPassword("");
              }}
              />
            </div>
          </form>
          <Link to="/registro">Regístrate</Link>
        </div>
      </main>
    </>
  );
}

export default Login