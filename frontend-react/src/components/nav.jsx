import { NavLink } from "react-router-dom";

function Nav(){

    return(
        <>
        <nav>
            <ul className="nav-horizontal">
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/noticias">Noticias y Eventos</NavLink></li>
            <li><NavLink to="/galeria">Galería</NavLink></li>
            <li><NavLink to="/quienes_somos">Quienes Somos</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
            <li><NavLink to="/login">Área Socios</NavLink></li>
            </ul>
        </nav>
        </>
    )
}

export default Nav