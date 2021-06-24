import Logo from './../multimedia/logo2.png'
import { Search,CaretDownFill } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
import { useEffect, useState } from 'react';
export default function Header() {
    const [token,saveToken]=useLocalStorage('token','');
    const [logueado,saveLog]=useState('');
    const [clase,saveClass]=useState('');
    useEffect(()=>{
        if (token!='') {
            saveLog('')
            saveClass('visually-hidden');
        }else{
            saveLog('visually-hidden')
            saveClass('');
        }        
    });
    function cerrarSesion(){
        saveToken('');
        window.location.replace('');   
    }
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
                    <div className={logueado}>
                        <Link className="btn bt text-light fs-5 " to="/Perfil">Mi perfil</Link>
                        <div className="dropdown">
                                <a className="btn dropdown-toggle inlines" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"/>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><button className="dropdown-item" onClick={()=>cerrarSesion()} >Cerrar sesion</button></li>
                                </ul>
                        </div>
                    </div>  
                    
                    <div className={clase}>
                        <Link className="btn text-light fs-5 inlines" to="/Login">Iniciar Sesion</Link>
                        <div className="inlines separacion"/> 
                        <Link className="btn text-light fs-5 inlines" to="/Registro" >Registrarme</Link>
                    </div>
                        
                </div>
            </div>
            <div className="direccionesHeader">
                <div className={logueado}>
                    <a href="/Publicaciones" >Publicaciones</a>
                    <a href="#" >Repositorios</a>
                </div>
                
            </div>
        </div>
        
    );
}

