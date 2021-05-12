import './../css/styles.css';
import Img1 from './../multimedia/Tp.jpg';

function tarjeta() {
    return (
        <div className="container card shadow-sm p-3 mb-5 bg-body rounded" id="TarjetaP">
            <div className="row">
                <div className="col-9 fs-5 p-3">
                    <h1>KOGit</h1>
                    <p>KOgit es una plataforma donde el aprendizaje es de todos, puedes compartir codigo o explorar en los proyectos de alguien mas.</p>
                    <p>El e-learning está cambiando. Veremos nuevos modelos y surgirán nuevas tecnologías y nuevos diseños. Entonces dejemos atrás la e, o al menos démosle una definición nueva y más amplia.</p>
                    <p> ― Elliot Masie</p>
                    <a href="#" className="link-primary">Empieza a aprender</a>
                </div>
                <div className="col-3 p-3">
                    <img className="imgTp" src={Img1} />
                </div>
            </div>
        </div>

    );
}export default tarjeta;
