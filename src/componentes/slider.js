import './../css/styles.css';
import Img1 from './../multimedia/s1.jpg';
import Img2 from './../multimedia/s2.jpg';
import Img3 from './../multimedia/s3.jpg';
function slider() {
    return (
        <div className="slider">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        {/* imagenes que muestra el carrusel, puede ser de manera dinamica la actualizacion de ellas */}
                    <img src={Img1} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                    <img src={Img2} className="d-block w-100" />
                    </div>
                    <div className="carousel-item">
                    <img src={Img3} className="d-block w-100" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>

    );
}export default slider;
