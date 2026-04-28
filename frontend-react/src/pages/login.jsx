import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login2.css"

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
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
    }
  };
    return (
      <>
       <h1>Login</h1>
        <main id="contenedor-login">
          <div id="card-login">

          
        <form onSubmit={handleSubmit} id="login">
            <label htmlFor="username">Username: </label>
            <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password">Password: </label>
            <input type="password" value={password} name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            <div className="botones">
              <input type="submit" value="Log In" />
              <input type="reset" value="Borrar" />
            </div>
        </form>
        <a href="./registro">Registrate</a>
        </div>
        </main>
      </>
    );
  }
  
  export default Login