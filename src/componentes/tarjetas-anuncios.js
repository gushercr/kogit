import './../css/styles.css';
import { BookHalf,People,CheckSquare } from 'react-bootstrap-icons';
import Sabias from "./../multimedia/SabiasQue.png";
function anuncios() {
    return (
        <div className="container" id="tarjetas-anuncios">
            <div className="row text-center">
                <div className="col-4">
                    <div className="card cards shadow-sm p-3 mb-5 bg-body rounded">
                        <h3 className="text-center">Aprende</h3>
                        <BookHalf color="#192E42" size={100} className="iconos-Anuncios"/>
                        <div class="card-body">
                                <p class="card-text">Inicia en el mundo de la programacion con los lenguajes mas solicitados en el mercado</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card cards shadow-sm p-3 mb-5 bg-body rounded">
                        <h3 className="text-center">Comparte</h3>
                        <People color="#192E42" size={100} className="iconos-Anuncios"/>
                        <div class="card-body">
                                <p class="card-text">Comparte tu codigo y recibe las opiniones de tus proyectos</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card cards shadow-sm p-3 mb-5 bg-body rounded">
                        <h3 className="text-center">Mejora</h3>
                        <CheckSquare color="#192E42" size={100} className="iconos-Anuncios"/>
                        <div class="card-body">
                            <p class="card-text">Mejora tus proyectos con la evaluacion y opinion de los demas</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <img src={Sabias} width="100%" />
            </div>

        </div>

    );
}export default anuncios;
