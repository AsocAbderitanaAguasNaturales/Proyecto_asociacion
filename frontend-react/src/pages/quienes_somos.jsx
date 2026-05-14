import "../styles/quienes_somos2.css";
import fichaInscripcion from '../assets/documents/ficha_inscripción.pdf'

// Componente de la página de Quienes Somos
function QuienesSomos() {
  return (
    <>
      <h1>Quienes Somos</h1>

      <div className="contenedor-principal">
        <div className="texto">

          <p>
            La Asociación Abderitana Aguas Naturales, nacida en mayo de 2025, es una entidad sin ánimo de lucro constituida en Adra (Almería) y registrada oficialmente a nivel nacional.<br></br> La asociación surge como una iniciativa ciudadana comprometida con la defensa, el conocimiento y la protección del agua y de los ecosistemas asociados.<br></br>
            El agua forma parte esencial de la identidad, el paisaje y el desarrollo de nuestro territorio. En este contexto, el Delta del Adra, que constituye un acuífero de gran relevancia hidrogeológica, representa un sistema hídrico estratégico sustentado en la interacción entre aguas subterráneas y superficiales.<br></br> Este conjunto de recursos resulta fundamental para el equilibrio ambiental, el abastecimiento y, de manera especialmente significativa, para la agricultura intensiva y la ganadería, pilares clave de la economía local.<br></br>
            La asociación nace desde la convicción de que el agua no es únicamente un recurso, sino un patrimonio natural, social y colectivo que debe ser comprendido, valorado y gestionado con criterios de sostenibilidad, responsabilidad y rigor técnico.<br></br>
            La Asociación Abderitana Aguas Naturales se configura como un espacio abierto de encuentro y participación para ciudadanos, usuarios, técnicos, estudiantes, investigadores y entidades comprometidas con una gestión del agua sostenible, transparente y técnicamente fundamentada.<br></br>
            Nuestra actividad se desarrolla desde una perspectiva técnica, ambiental y social, fomentando la información rigurosa, el análisis responsable, el diálogo constructivo y la sensibilización ambiental, contribuyendo a fortalecer la cultura del agua y la protección del territorio.
          </p>
        </div>
        <div className="seccion-inferior">
          <div className="contenedor1">
            <div className="contenedor-superior">
              <div className="contenedor-izquierda">
                <h3>Misión</h3>
                <p>
                  Promover la defensa de la calidad del agua, el conocimiento de los recursos hídricos —superficiales y subterráneos— y una gestión sostenible, transparente y responsable, especialmente en el ámbito del municipio de Adra y su entorno.
                </p>
              </div>
              <div className="contenedor-derecha">
                <h3>Visión</h3>
                <p>
                  Ser una asociación de referencia en el ámbito local como espacio de participación, información y sensibilización, contribuyendo a una cultura del agua basada en el rigor técnico, la sostenibilidad y la protección del territorio.
                </p>
              </div>
            </div>


            <div className="contenedor-inferior">
              <h3>Valores</h3>
              <ul>
                <li><h4>Sostenibilidad.</h4>
                  <p>Defendemos el uso responsable y equilibrado del agua.</p>
                </li>
                <li><h4>Rigor técnico.</h4>
                  <p>Promovemos el análisis fundamentado y la información veraz.</p>
                </li>
                <li><h4>Protección ambiental.</h4>
                  <p>Impulsamos la conservación de acuíferos y ecosistemas.</p>
                </li>
                <li>
                  <h4>Participación.</h4>
                  <p>Fomentamos el diálogo y la implicación ciudadana.</p>
                </li>
                <li>
                  <h4>Transparencia.</h4>
                  <p>Apostamos por el acceso a la información y la claridad en la gestión.</p>
                </li>
                <li>
                  <h4>Compromiso con el territorio.</h4>
                  <p>Reconocemos el papel esencial del agua en el Delta del Adra y su agricultura.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="texto-socio">
            <h3>Hazte Socio</h3>
            <p>Ventajas de asociarse a la Asociación Abderitana Aguas Naturales</p>
            <ul>
              <li>Haz que tu voz sobre el agua en Adra cuente.</li>
              <li>Mantente informado/a de los asuntos más relevantes.</li>
              <li>Participa en actividades y encuentros.</li>
              <li>Contribuye al conocimiento y la divulgación.</li>
              <li>Forma parte de una red plural.</li>
              <li>Apoya la defensa del agua y del territorio.</li>
            </ul>
            <a href={fichaInscripcion} download>Descargar Ficha de Inscripción de la Asociación</a>

            <p><br></br>Más información en el enlace de la parte inferior de la página.</p>
          </div>
        </div>
      </div>




    </>
  )
}

export default QuienesSomos