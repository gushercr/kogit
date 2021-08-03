import imgusuario from "./../multimedia/usuarios/imguserprueba.jpg";
import { PersonFill,GeoAltFill,Twitter,Type,Globe,ShopWindow } from 'react-bootstrap-icons';
import { useLocalStorage } from "../useLocalStorage";
import AddAlertIcon from '@material-ui/icons/AddAlert';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { useState,useEffect } from "react";
import { Redirect } from "react-router";
import {useParams} from 'react-router-dom';
import {URL_KOGIT} from "../utils/constants";
import Tarjeta from "./tarjeta_publicaciones";
export default function PerfilUsuarioE() {
    const [token,saveToken]=useLocalStorage('token','');
    const [uid,saveUid]=useLocalStorage('uid','');
    const [access,stateAccess]=useState();
    const [user,saveUser]=useState([]);
    const [posts,savePosts]=useState([]);
    const [isLoad, setisLoad] = useState(true);
    const [changes, setChanges] = useState(false);
    let {id}=useParams();
     useEffect(async ()=>{
        if (token=='') {
          stateAccess(false)
        }else{
          var myHeaders = new Headers();
          myHeaders.append("token", token);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          const url=`${URL_KOGIT}usuarios/perfil/${id}`
           await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => saveDatos(result))
        }
        
    },[changes])
    var saveDatos=(a)=>{
        saveUser(a.usuario);
        savePosts(a.posts)
        setisLoad(false);
      }
    var seguirUser=async e=>{
      e.preventDefault();
      setisLoad(true);
      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };
      const url=`${URL_KOGIT}usuarios/seguir/${id}`
       await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => setChanges(!changes))
    }
    const listPosts = posts.map((post) =>
    <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20,marginTop:20 }} > 
      <Tarjeta 
        fecha={post.fecha} 
        titulo={post.titulo} 
        lenguaje={post.lenguaje}
        tags={post.tags}
        texto={post.texto} 
        likes={post.likes}
        id={post.uid}
      />
    </li>
  );
  
    return (
      <div className="container" id="perfil">
        {token==false?<Redirect to="/Login"/>:null}
        <div className="text-center">
          {isLoad&&<div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}
        </div>
        <div className="row">
        <div className="col-3">
        <div className="col-12">
            <img src={user.hasOwnProperty('imgURL')?user.imgURL:imgusuario} className="imguser rounded-circle mx-auto d-block"/>             
            <h3 className="text-center mt-2">{user.username}</h3>
        </div>
        </div>
        <div className="col-9">
        <div className="row datos">
            {/* inputs con los datos de usuarios */}
            <div className="col-4">                
                <p>Usuario</p>
                <div className="input-group">
                <span className="input-group-text"><PersonFill color="#00000" size={18}/></span>
                <input type="text" value={user.username} class="form-control" placeholder="Username" disabled/>
                </div>
                <p>Ubicacion</p>
                <div className="input-group">
                <span className="input-group-text"><GeoAltFill className="" color="#00000" size={18}/></span>
                <input type="text" value={user.hasOwnProperty('ubicacion')?user.ubicacion:"Ubicacion"}  className="form-control" placeholder="Ubicacion" disabled/>
                </div>
                <p>Twiter</p>
                <div className="input-group">
                <span className="input-group-text"><Twitter className="" color="#00000" size={18}/></span>
                <input type="text" value={user.hasOwnProperty('twitter')?user.twitter:"Twitter"}  className="form-control" placeholder="@Twiter" disabled/>
                </div>
                
            </div>
            <div className="col-4">
                <p>Nombre</p>
                <div className="input-group">
                <span className="input-group-text"><Type className="" color="#00000" size={18}/></span>
                <input type="text" value={user.hasOwnProperty('nombre')?user.nombre:"Nombre"}  className="form-control" placeholder="Nombre" disabled/>
                </div>
                <p>Compañia</p>
                <div className="input-group">
                <span className="input-group-text"><ShopWindow className="" color="#00000" size={18}/></span>
                <input type="text" value={user.hasOwnProperty('company')?user.company:"Company"}  className="form-control" placeholder="Kogit" disabled/>
                </div>
                <p>Sitio Web</p>
                <div class="input-group">
                <span className="input-group-text"><Globe className="" color="#00000" size={18}/></span>
                <input type="text" value={user.hasOwnProperty('website')?user.website:"Website"}  className="form-control" placeholder="WWW.Kogit.com" disabled/>
                </div>

            </div>
            <div className="col-4 datos">
              {user.seguido?(
                <button onClick={seguirUser} className="btn">Dejar de seguir <NotificationsOffIcon/></button>
              ):(
                <button onClick={seguirUser} className="btn">Seguir <AddAlertIcon/></button>
              )}
            
            </div>
        </div>
        </div>
        <h3 style={{marginTop:20}}>Publicaciones de {user.username}</h3>
        {listPosts}
        </div>  
    
        
        
      </div>
    )
  }
  
