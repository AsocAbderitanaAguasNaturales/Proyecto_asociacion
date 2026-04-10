import { Link } from "react-router-dom";

function Nav(){

    return(
        <>
        <nav>
            <ul className="nav-horizontal">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/noticias">Noticias y Eventos</Link></li>
            <li><Link to="#">Galería</Link></li>
            <li><Link to="#">Quienes Somos</Link></li>
            <li><Link to="#">Contacto</Link></li>
            <li><Link to="#">Area Socios</Link></li>
            </ul>
        </nav>
        </>
    )
}

export default Nav