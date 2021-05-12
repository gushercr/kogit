import './../css/styles.css';
import { Facebook,Twitter,Youtube } from 'react-bootstrap-icons';
function footer() {
    return (
        <div id="footer">
            <div className="row text-center text-light p-4">
                <div className="col-4">
                   <h5>Nosotros</h5>
                   <br></br>
                   <a href="#" className="text-white-50">Aviso de privacidad</a><br></br>
                   <a href="#" className="text-white-50">Contacto</a><br></br>
                   <a href="#" className="text-white-50">Ayuda</a><br></br>
                   <a href="#" className="text-white-50">Preguntas frecuentes</a><br></br>
                   <a href="#" className="text-white-50">Mapa de Navegacion</a>
                </div>           
                <div className="col-4">
                    <h6>Universidad Tecnologíca De La Huasteca Hidalguense</h6>
                   <br></br>
                   <p className="text-white-50">Roberto Carlos Sánchez Hernández</p> 
                   <p className="text-white-50">Gustavo Angel Hernández De la Cruz</p>
                   <p className="text-white-50">Sofia Morales Zaleta</p>  
                   <p className="text-white-50">Nuribeth Hernández Hernández</p>             
                </div>
               
                <div className="col-4">
                    <h5>Contactanos</h5><br></br>
                    <Facebook color="#00000" size={35} className="iconFooter" />
                    <Twitter color="#00000" size={35} className="iconFooter iconFooterLeft" />
                    <Youtube color="#00000" size={35} className="iconFooter iconFooterLeft" />
                </div>
            </div>
        </div>

    );
}
export default footer;