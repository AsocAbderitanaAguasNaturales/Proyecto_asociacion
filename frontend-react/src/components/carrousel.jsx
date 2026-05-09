import '../styles/carrusel.css'

function Carrousel() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="/images/Asoc_13.jpg" alt="slide 1"  />
                </div>

                <div className="carousel-item">
                    <img className="d-block w-100" src="/images/Asoc_14.jpg" alt="slide 2" />
                </div>

                <div className="carousel-item">
                    <img className="d-block w-100" src="/images/Asoc_15.jpg" alt="slide 3" />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>

        </div>
    )
}

export default Carrousel;