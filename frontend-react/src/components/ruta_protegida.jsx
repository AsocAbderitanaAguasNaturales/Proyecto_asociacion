import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RutaProtegida({ children, rolRequerido }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/session", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setAuth(data))
      .catch(() => setAuth({ logged: false }));
  }, []);

  if (auth === null) return <p>Cargando...</p>;

  if (!auth.logged) return <Navigate to="/login" />;

  if (rolRequerido && auth.rol !== rolRequerido) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RutaProtegida;