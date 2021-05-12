import Logo from './../multimedia/logo.png'
import './../css/styles.css';
import { Search } from 'react-bootstrap-icons';
function header() {
    return (
        <div className="header">
            <div className="row align-items-center">
                <div className="col-2">
                    <img className="logo" src={Logo} />
                </div>
                {/* barra de busqueda */}
                <div className="col-7">
                    <div className="centrar">
                        <input className="Bbusqueda" placeholder="Buscar por palabras clave"/><Search className="search" color="#344759" size={28} />
                    </div>                         
                </div>
                {/* Botones de logueo */}
                <div className="col-3">
                    <button className="btn bt text-light fs-5 inlines">Iniciar sesion</button>
                    <div className="inlines separacion"> </div>
                    <button className="btn text-light fs-5 inlines" >Registrarme</button>
                </div>
            </div>
        </div>

    );
}
export default header;
