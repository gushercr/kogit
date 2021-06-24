import { Redirect } from "react-router";
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useLocalStorage } from '../useLocalStorage';
import {URL_KOGIT} from "../utils/constants";
    export default function Login(){ 
      const [token,saveToken]=useLocalStorage('token','');
      const [usuario,setUsuario]=useState('');
      const [password,setPassword]=useState('');
      const [mensaje,setMensaje]=useState('');
      const [className,setClass]=useState('');
      const [alert,stateAlert]=useState(true);
      const [access,stateAccess]=useState(false);
      const [uid,saveUid]=useLocalStorage('uid','');
      useEffect(()=>{
        if(token!=''){
          stateAccess(true);
        }
      })
      var onSubmit=async e=>{
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("termino", usuario);
        urlencoded.append("password", password);
        var requestOptions = {
          method: 'POST',
          body: urlencoded,
          redirect: 'follow'
        };
        const url=`${URL_KOGIT}session/login`;
        const resultado=await fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => result)
          .catch(error => console.log('error', error));
        if (resultado.ok==true) {
          saveToken(resultado.token);
          saveUid(resultado.usuario.uid)
          stateAccess(true);
          window.location.replace('');     
        }else{
          if (resultado.errors[0].msg=='Datos incorrectos (password)') {
            setMensaje('Usuario o contraseña incorrecta');
          }else{
            setMensaje('Este usuario no existe');
          }
          
          stateAlert(true);
          setClass('text-center text-danger');
        }
      }
     
     
      return(
      <div className="container" id="registrocontainer">
        {access==true?<Redirect to="/Perfil"/>:null}
        <div className="card shadow-sm mb-5 bg-body rounded" id="login">
            <h3 className="text-center">Inicia sesion</h3><br/>
              <form onSubmit={onSubmit}>
                <div className="inputs">
                    <p >Usuario</p>
                    <input type="text" className="form-control" placeholder="Ingresa tu usuario"  onChange={e=>setUsuario(e.target.value)} value={usuario}/><br/>
                    <p>Contraseña</p>
                    <input type="password" className="form-control" placeholder="Ingresa tu contraseña"  onChange={e=>setPassword(e.target.value)} value={password}/> 
                </div>
                <div className="divbotones">
                    <input type="submit" className="btnlogin btn btn-primary " value="Iniciar sesion" />  
                    <button className="btn btn-outline-danger btnCancelar">Cancelar</button>
                </div>
              </form>
            <Link className="link-primary text-center" to="/Registro">¿No tienes una cuenta?, haz click aquí</Link>
            <Link className="link-danger text-center" to="/Recuperar">Olvide mi contraseña</Link>
            {alert&&<div><p className={className}>{mensaje}</p></div>}
        </div>
      </div>
      )
      
    }

  