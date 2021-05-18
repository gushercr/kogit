import Logo from './../multimedia/logo2.png'
import { Search } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
function header() {
    return (
        <div className="header">
            <div className="row align-items-center">
                <div className="col-2">
                    <Link to="/"><img className="logo" src={Logo} /></Link>
                </div>
                {/* barra de busqueda */}
                <div className="col-7">
                    <div className="centrar">
                        <input type="" className="Bbusqueda" placeholder="Buscar por palabras clave"/><Search className="search" color="#344759" size={28} />
                    </div>                         
                </div>
                {/* Botones de logueo */}
                <div className="col-3">                   
                        <Link className="btn bt text-light fs-5 inlines" to="/Login">Iniciar Sesion</Link>
                        <div className="inlines separacion"> </div>
                        <Link className="btn text-light fs-5 inlines" to="/Registro" >Registrarme</Link>
                </div>
            </div>
            <div className="direccionesHeader">
                <a href="#" >Publicaciones</a>
                <a href="#" >Repositorios</a>
            </div>
        </div>
        
    );
}
export default header;
