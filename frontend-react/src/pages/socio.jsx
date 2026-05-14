import '../styles/socio2.css'

// Componente de la página de Socio
function Socio() {
  return (
    <>
      <h1>Hazte Socio</h1>
      <main id="principal-socio">

        <div className="card">
          <h3>Ventajas de asociarse a la Asociación Abderitana Aguas Naturales</h3>
          <p>
            Haz que tu voz sobre el agua en Adra cuente. Formar parte de la asociación te permite participar activamente en un espacio de diálogo, reflexión y defensa del agua como recurso esencial.
          </p>
        </div>

        <div className="card">
          <h3>Mantente informado/a</h3>
          <p>Las personas asociadas reciben información sobre:</p>
          <ul>
            <li>Recursos hídricos locales</li>
            <li>Calidad y gestión del agua</li>
            <li>Proyectos e iniciativas</li>
            <li>Novedades normativas y técnicas</li>
            <li>Comunicación por WhatsApp, email y redes</li>
          </ul>
        </div>

        <div className="card">
          <h3>Participa en actividades</h3>
          <ul>
            <li>Charlas y jornadas</li>
            <li>Reuniones informativas</li>
            <li>Debates técnicos y ciudadanos</li>
            <li>Acciones de sensibilización ambiental</li>
          </ul>
          <p>Acceso preferente como socio/a.</p>
        </div>

        <div className="card">
          <h3>Conocimiento y divulgación</h3>
          <ul>
            <li>Calidad del agua</li>
            <li>Protección de acuíferos</li>
            <li>Investigación y estudios</li>
            <li>Gestión sostenible</li>
          </ul>
        </div>

        <div className="card">
          <h3>Red plural</h3>
          <ul>
            <li>Ciudadanos</li>
            <li>Regantes</li>
            <li>Técnicos</li>
            <li>Estudiantes</li>
            <li>Investigadores</li>
            <li>Entidades</li>
          </ul>
        </div>

        <div className="card">
          <h3>Defensa del agua</h3>
          <ul>
            <li>Calidad del agua</li>
            <li>Transparencia</li>
            <li>Sostenibilidad</li>
            <li>Protección ambiental</li>
          </ul>
        </div>

        <div className="card">
          <h3>Tipos de socio/a</h3>
          <p><strong>Cuota General:</strong> Personas individuales</p>
          <p><strong>Entidades:</strong> Asociaciones o empresas</p>
          <p><strong>Estudiantes:</strong> Cuota reducida</p>
          <p><strong>Jubilados/as:</strong> Modalidad adaptada</p>
          <p><strong>Investigadores:</strong> Perfil académico</p>
        </div>

        <div className="card">
          <h3>Tarifas</h3>
          <ul>
            <li>General: 20 €</li>
            <li>Entidades: 60 €</li>
            <li>Estudiantes/Jubilados: 10 €</li>
          </ul>
        </div>

        <div className="card">
          <h3>Súmate</h3>
          <p>
            Contribuye a una gestión del agua más informada, participativa y sostenible en Adra.
          </p>
        </div>

      </main>
    </>
  )
}

export default Socio