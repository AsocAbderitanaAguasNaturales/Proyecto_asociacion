import '../styles/contacto2.css'

// Página de contacto
function Contacto() {
  return (
    <>
      <h1>Contacto</h1>
      <main id="principal">

        <div className="contenedor-izquierdo">
          <h3>¿Hablamos?</h3>
          <p>Email: aguasnaturales.asc.adra@gmail.com</p>
          <p>Teléfono / WhatsApp: +34 682 783 176</p>
          <p>Dirección: Carretera de Almería, 18 – 3º A<br></br> 04770 Adra (Almería)</p>
        </div>
        <div className="contenedor-derecho">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1598.208331255083!2d-2.965975921639082!3d36.760570702044284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd704fc432616f1d%3A0x745ccd0651a0c927!2sCarr.%20de%20Almer%C3%ADa%2C%2018%2C%2004779%20Adra%2C%20Almer%C3%ADa!5e0!3m2!1ses!2ses!4v1776198146620!5m2!1ses!2ses"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </main>

    </>
  )
}

export default Contacto