import imgusuario from "./../multimedia/usuarios/imguserprueba.jpg";
import { PencilSquare,PersonFill,GeoAltFill,Twitter,Type,Globe,ShopWindow,Clipboard,KeyFill,ShieldLockFill } from 'react-bootstrap-icons';
import { useLocalStorage } from "../useLocalStorage";
import { useState,useEffect } from "react";
import { Redirect } from "react-router";
import {URL_KOGIT} from "../utils/constants";
export default function Perfil() {
    const [token,saveToken]=useLocalStorage('token','');
    const [uid,saveUid]=useLocalStorage('uid','');
    const [access,stateAccess]=useState();
    const [user,saveUser]=useState([]);
    const [passwordInput,savePassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [newPasswordConfirm,setNewPasswordConfirm]=useState('');
    const [mensaje,setMensaje]=useState('');
    const [alert,stateAlert]=useState(false);
    const [activeEdit,stateActive]=useState(false);
    const [newDates,setNewDates]=useState({username:'',nombre:'',ubicacion:'',company:'',website:'',twitter:''});
    const [mensajeArchivo, setMensajeArchivo] = useState({mensaje:'',type:'',btnDisable:false,image:null});
    const [isLoad, setisLoad] = useState(true);

     useEffect(()=>{
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
          const url=`${URL_KOGIT}usuarios/perfil/`
           fetch(url+uid, requestOptions)
            .then(response => response.json())
            .then(result => saveDatos(result.usuario))
        }
        
    },[])
    var saveDatos=(a)=>{
      saveUser(a);
      setNewDates(a);
      setisLoad(false);
    }
    var onSubmit=async e=>{
      e.preventDefault();
      stateAlert(true);
      if (newPassword!=newPasswordConfirm) {
        setMensaje('La nueva contraseña no coincide');
      }else{
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var urlencoded = new URLSearchParams();
        urlencoded.append("password", passwordInput);
        urlencoded.append("newpassword", newPassword);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const url=`${URL_KOGIT}usuarios/update/password`;
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(resultado => resultado.ok==true?setMensaje('Cambios guardados'):setMensaje('Contraseña incorrecta'))
          .catch(error => console.log('error', error));
      }
      savePassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    }
    var actualizar=async e=>{
      e.preventDefault();
      setisLoad(true);
      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var urlencoded = new URLSearchParams();
      urlencoded.append("company", newDates.company);
      urlencoded.append("twitter", newDates.twitter)
      urlencoded.append("website", newDates.website);
      urlencoded.append("ubicacion", newDates.ubicacion);
      urlencoded.append("nombre", newDates.nombre);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      const url=`${URL_KOGIT}usuarios/update/miperfil`;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => setisLoad(false))
        .catch(error => console.log('error', error));
      setTimeout(() => {
         window.location.replace('')
      }, 3000);      
    }
    const validarImg=async e=>{
      if (e[0].type=="image/png"||e[0].type=="image/jpeg") {
        setMensajeArchivo({...mensajeArchivo,mensaje:'Listo',type:'text-success',btnDisable:false,image:e[0]})
      }else{
        setMensajeArchivo({...mensajeArchivo,mensaje:'Formato no admitido',type:'text-danger',btnDisable:true})
      }
    }
    var onSubmitImage=async e=>{
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("token",token);

      var formdata = new FormData();
      formdata.append("archivo", mensajeArchivo.image, mensajeArchivo.name);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      const url=`${URL_KOGIT}usuarios/update/imagen`
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => setTimeout(()=>{window.location.replace('')},3000))
        .catch(error => console.log('error', error));
        
    }
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
              <PencilSquare  size="36" className="mx-auto d-block editarimg" data-bs-toggle="modal" data-bs-target="#formularioImagen"/>              
              <h3 className="text-center">{user.username}</h3>
            </div>
          </div>
          <div className="col-9">
            <div className="row datos">
              {/* inputs con los datos de usuarios */}
                <div className="col-4">                
                  <p>Usuario</p>
                  <div className="input-group">
                    <span className="input-group-text"><PersonFill color="#00000" size={18}/></span>
                    <input type="text" value={activeEdit==true?newDates.username:user.username} onChange={e=>setNewDates({...newDates, username:e.target.value})} class="form-control" placeholder="Username" disabled/>
                  </div>
                  <p>Ubicacion</p>
                  <div className="input-group">
                    <span className="input-group-text"><GeoAltFill className="" color="#00000" size={18}/></span>
                    <input type="text" value={activeEdit==true?newDates.ubicacion:user.ubicacion} onChange={e=>setNewDates({...newDates, ubicacion:e.target.value})} className="form-control" placeholder="Ubicacion" disabled={!activeEdit}/>
                  </div>
                  <p>Twiter</p>
                  <div className="input-group">
                    <span className="input-group-text"><Twitter className="" color="#00000" size={18}/></span>
                    <input type="text" value={activeEdit==true?newDates.twitter:user.twitter} onChange={e=>setNewDates({...newDates, twitter:e.target.value})} className="form-control" placeholder="@Twiter" disabled={!activeEdit}/>
                  </div>
                  {activeEdit&&<p>Ingrese los nuevos datos :)</p>}
              </div>
                <div className="col-4">
                  <p>Nombre</p>
                  <div className="input-group">
                    <span className="input-group-text"><Type className="" color="#00000" size={18}/></span>
                    <input type="text" value={activeEdit==true?newDates.nombre:user.nombre} onChange={e=>setNewDates({...newDates, nombre:e.target.value})} className="form-control" placeholder="Nombre" disabled={!activeEdit}/>
                  </div>
                  <p>Compañia</p>
                  <div className="input-group">
                    <span className="input-group-text"><ShopWindow className="" color="#00000" size={18}/></span>
                    <input type="text" value={activeEdit==true?newDates.company:user.company} onChange={e=>setNewDates({...newDates, company:e.target.value})} className="form-control" placeholder="Kogit" disabled={!activeEdit}/>
                  </div>
                  <p>Sitio Web</p>
                  <div class="input-group">
                    <span className="input-group-text"><Globe className="" color="#00000" size={18}/></span>
                    <input type="text" value={activeEdit==true?newDates.website:user.website} onChange={e=>setNewDates({...newDates, website:e.target.value})} className="form-control" placeholder="WWW.Kogit.com" disabled={!activeEdit}/>
                  </div>
                  {activeEdit&&<button className="btn btn-primary "id="btnActualizarPerfil" onClick={actualizar}>Actualizar</button>}
              </div>
              <div className="col-4 datos">
                <button className="btn btn-secondary" onClick={()=>stateActive(!activeEdit)}><Clipboard className="iconseditarbtn" color="#fff" size={18}/>Editar mis datos</button>
                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#formularioEditContra"><KeyFill className="iconseditarbtn" color="#fff" size={18}/>Editar contraseña</button>
              </div>
            </div>
          </div>
        </div>  
        <div class="modal fade" id="formularioEditContra" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="text-center"><ShieldLockFill className="" color="#00000" size={18}/> Ingresa los datos </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form onSubmit={onSubmit}>
                    <p>Contraseña</p>
                    <div class="input-group">
                        <span class="input-group-text"><KeyFill className="" color="#00000" size={18}/></span>
                        <input type="password" value={passwordInput} onChange={e=>savePassword(e.target.value)} class="form-control" placeholder="Contraseña actual" />
                    </div>
                    <p>Nueva contraseña</p>
                    <div class="input-group">
                        <span class="input-group-text"><KeyFill className="" color="#00000" size={18}/></span>
                        <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} class="form-control" placeholder="Nueva contraseña" />
                    </div>
                    <p>Confirmar contraseña</p>
                    <div class="input-group">
                        <span class="input-group-text"><KeyFill className="" color="#00000" size={18}/></span>
                        <input type="password" value={newPasswordConfirm} onChange={e=>setNewPasswordConfirm(e.target.value)} class="form-control" placeholder="confirma la nueva contraseña" />
                    </div>
                    <input type="submit" className="btn btn-primary btneditar" value="Guardar"/>
                    <button className="btn btn-danger btneditar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                </form>
                {alert&&<div className="alert alert-primary" id="mensajePerfil">{mensaje}</div>}
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="formularioImagen" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="text-center">Selecciona una imagen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form className="text-center" onSubmit={onSubmitImage}>
                  <p className="text-primary text-center">Nota: Solo se aceptan archivos en JPEG/PNG</p>
                    <input type="file" onChange={(e)=>validarImg(e.target.files)} className="form-control" required/>
                    <p className={mensajeArchivo.type}>{mensajeArchivo.mensaje}</p>
                    <input type="submit" className="btn btn-primary" value="Guardar" disabled={mensajeArchivo.btnDisable}/>
                    <button className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
