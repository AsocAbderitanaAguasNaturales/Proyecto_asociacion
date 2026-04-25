import { useState } from "react"
import { Link } from "react-router-dom";
import Navbar from "./nav";
import logo from "../assets/images/logo.png"; // ajusta tu ruta


function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header id="header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <h1>Asociación Abderitana de Aguas Naturales</h1>
      </div>

       {/* botón hamburguesa */}
       <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`header-right ${menuOpen ? "open" : ""}`}>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;