import { Link } from "react-router-dom";

function Nav(){

    return(
        <>
        <nav>
            <ul className="nav-horizontal">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/noticias">Noticias y Eventos</Link></li>
            <li><Link to="/galeria">Galería</Link></li>
            <li><Link to="/quienes_somos">Quienes Somos</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/login">Área Socios</Link></li>
            </ul>
        </nav>
        </>
    )
}

export default Nav