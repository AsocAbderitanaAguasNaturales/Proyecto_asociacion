import { Link } from "react-router-dom";

function Footer(){
    return(
        <footer>
            <div id='Asoc'>
                <p>@ Copyright | Asociación Abderitana de aguas Naturales.</p><br />
                <p><Link to="/socio">Información de Socio</Link></p><br />
                <p><Link to="/legal">Información sobre Marco Legal</Link></p>
            </div>
            <div>

            </div>
            <div id="redes">
                <p><img src="/images/facebook-color.svg" alt="Icono de facebook."/><Link to="https://www.facebook.com/profile.php?id=61583821439577">Facebook</Link></p>
                <p><img src="/images/instagram.svg" alt="Icono de instagram." /><Link to="https://www.instagram.com/aguasabderitanasnaturales/">Instagram</Link></p>
                <p><img src="/images/tiktok.svg" alt="Icono de Tiktok." /><Link to="https://www.tiktok.com/@asocabderitana.ag">Tik Tok</Link></p>
               
            </div>
        </footer>
    )
}

export default Footer