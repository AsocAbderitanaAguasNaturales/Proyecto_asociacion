import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";


function Nav() {
  const indicatorRef = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const activeLink = navRef.current.querySelector("a.active");
    const indicator = indicatorRef.current;

    if (activeLink && indicator) {
      const rect = activeLink.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();

      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - parentRect.left}px`;
    }
  }, [location]);

  return (
    <nav>
      <ul className="nav-horizontal" ref={navRef}>
        <div className="nav-indicator" ref={indicatorRef}></div>

        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Inicio
          </NavLink>
        </li>

        <li>
          <NavLink to="/noticias" className={({ isActive }) => isActive ? "active" : ""}>
            Noticias
          </NavLink>
        </li>

        <li>
          <NavLink to="/galeria" className={({ isActive }) => isActive ? "active" : ""}>
            Galería
          </NavLink>
        </li>

        <li>
          <NavLink to="/quienes_somos" className={({ isActive }) => isActive ? "active" : ""}>
            Quiénes Somos
          </NavLink>
        </li>

        <li>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? "active" : ""}>
            Contactos
          </NavLink>
        </li>

        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
            Zona Miembros
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;