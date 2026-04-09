import imagen9 from '../assets/images/Asoc_13.jpg'
import imagen10 from '../assets/images/Asoc_14.jpg'
import imagen12 from '../assets/images/Asoc_15.jpg'

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
                    <img className="d-block w-100" src={imagen9} alt="slide 1"  />
                </div>

                <div className="carousel-item">
                    <img className="d-block w-100" src={imagen10} alt="slide 2" />
                </div>

                <div className="carousel-item">
                    <img className="d-block w-100" src={imagen12} alt="slide 3" />
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