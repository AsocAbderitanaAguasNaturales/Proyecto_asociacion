import Carrousel from '../components/carrousel'
import '../styles/index2.css'

// Página principal
function Home() {
  return (
    <>
      <Carrousel />

      <main id="contenido-home">
        <div id="texto-home">
          <h2>¡Haz que tu voz sobre el agua en Adra, cuente!</h2>
          <p>
            La Asociación Abderitana Aguas Naturales nace como respuesta a la creciente preocupación social ante los cambios producidos en el modelo de gestión del agua en nuestro entorno, especialmente en relación con la implantación de recursos hídricos procedentes de aguas residuales regeneradas y agua desalada. La entidad surge con el objetivo de promover el conocimiento, la transparencia y el debate informado sobre la calidad, sostenibilidad y usos del agua, así como de defender una gestión equilibrada que garantice la protección de los recursos naturales y los derechos de los usuarios.
          </p>
        </div>

        <div id="imagen-home">
          <img src="/images/Asoc_7.png" alt="Presentación de la asociación" />
        </div>
      </main>
    </>
  )
}

export default Home