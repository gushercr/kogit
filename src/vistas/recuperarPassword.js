import React, { useState,useEffect } from 'react';
import {URL_KOGIT,URL_RESTABLECER} from "../utils/constants";
import {ArrowLeftCircle } from 'react-bootstrap-icons';
import { Alert} from '@material-ui/lab';

export default function RecuperarPassword () {
    const [DatosRestaurar, setDatosRestaurar] = useState({email:'',uid:"",pregunta:"",respuesta:"",newPassword:"",confirmNewPassword:"",key:""});
    const [viewError, setViewError] = useState(false);
    const [msg, setmsg] = useState('');
    const [viewSuccess, setViewSuccess] = useState(false);
    useEffect(()=>{
        let keyParam = (new URLSearchParams(window.location.search)).get("key")
        if(keyParam){
            setDatosRestaurar({...DatosRestaurar,key:keyParam})
            setnumItem(4)
        }
    },[])
   
    var verificarRespuesta=async e=>{
        e.preventDefault();
        const url=`${URL_KOGIT}recovery/responder/${DatosRestaurar.uid}`
        var urlencoded = new URLSearchParams();
        urlencoded.append("respuesta", DatosRestaurar.respuesta);

        var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => validarRespuesta(result))
        .catch(error => console.log('error', error));
    }
    var verificarCorreo=async e=>{
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", DatosRestaurar.email);
        var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
        };
        const url=`${URL_KOGIT}recovery/verificarEmail`
        await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result.ok?Validado(result):null)
        .catch(error => console.log('error', error));
    }
    var getQuestion=async (uid)=> {
        const url=`${URL_KOGIT}recovery/preguntar/${uid}`
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
         
        const response= await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));

        if(response.ok){
            setDatosRestaurar({...DatosRestaurar,pregunta:response.data.pregunta,uid:response.data.uid})
        }
        
        setnumItem(2)
    }
    function Validado(result) {      
        getQuestion(result.data.uid);
    }
    function validarRespuesta(result) {
        if(result.ok){
            setDatosRestaurar({...DatosRestaurar,uid:result.data.uid,key:result.key})
            setnumItem(4)
        }
    }
    var cambiarPassword=async e=>{
        e.preventDefault();
        const url=`${URL_KOGIT}recovery/reset/password`
        var myHeaders = new Headers();
        myHeaders.append("token",DatosRestaurar.key );
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("newpassword", DatosRestaurar.newPassword);
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => FncambiarPassword(result))
          .catch(error => console.log('error', error));
    }
    function FncambiarPassword(result) {
        if (result.errors) {
            setViewError(true);
            setmsg(result.errors[0].msg)
            setTimeout(() => {
                setViewError(false)
              }, 5000);
        }else{
            setViewSuccess(true);
            setTimeout(() => {
                window.location.replace('/Login')
              }, 2000);
        }
    }
    function SendEmail() {
        setnumItem(5)
        var urlencoded = new URLSearchParams();
        urlencoded.append("url", URL_RESTABLECER);

        var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
        };
        const url=`${URL_KOGIT}recovery/enviarEmail/${DatosRestaurar.uid}`
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => console.log("ok"))
        .catch(error => console.log('error', error));
    }
    const [numItem, setnumItem] = useState(1);
    
    switch (numItem) {
        case 1:
            return (
                <div className="container" id="FormRecuperar">
                    <div className="card shadow-sm mb-5 bg-body rounded" id="CardRecuperar">
                        <h3 className="text-center">Ingresa tu correo electronico</h3><br />
                        <form onSubmit={verificarCorreo}>
                            <div className="inputs">
                            <p>Correo electronico</p>
                            <input type="email" className="form-control" placeholder="Correo@Kogit.com" onChange={e=>setDatosRestaurar({...DatosRestaurar,email:e.target.value})}/>
                            </div>
                            <div className="divbotones">
                                <input type="submit" className="btnlogin btn btn-primary " value="Verificar" />  
                                <a className="btn btn-outline-danger btnCancelarR" href="/">Cancelar</a>
                            </div>
                            
                        </form>
                    </div>
                </div>
            );
            break;
            case 2: 
            return(
                <div className="container" id="FormRecuperar">
                    <div className="card shadow-sm mb-5 bg-body rounded" id="CardRecuperar">
                    <h3 className="text-center">Elige una opcion</h3><br />
                        <button className="btn btn-outline-primary m-2 mt-5" onClick={()=>setnumItem(3)}>Pregunta secreta</button>
                        <button className="btn btn-outline-primary m-2" onClick={SendEmail}>Correo electronico</button>
                        <ArrowLeftCircle className="m-2" onClick={()=>setnumItem(1)} color="#AA0624" size={30} />
                    </div>
                </div>
            );
            break;
            case 3:
            return (
                <div className="container" id="FormRecuperar">
                    <div className="card shadow-sm mb-5 bg-body rounded" id="CardRecuperar">
                    <h3 className="text-center">{DatosRestaurar.pregunta}</h3><br />
                        <form onSubmit={verificarRespuesta}>
                            <div className="inputs">
                            <p>Respuesta</p>
                            <input type="text" className="form-control" value={DatosRestaurar.respuesta} placeholder="Ingresa aqui tu respuesta" onChange={e=>setDatosRestaurar({...DatosRestaurar,respuesta:e.target.value})}/>
                            </div>
                            <div className="divbotones">
                                <input type="submit" className="btnlogin btn btn-primary " value="Verificar" />  
                                <a className="btn btn-outline-danger btnCancelarR" href="/Login">Cancelar</a>
                            </div> 
                        </form>
                    </div>
                </div>
            );
            break;
            case 4:
                return (
                    <div className="container" id="FormRecuperar">
                        <div className="card shadow-sm mb-5 bg-body rounded" id="CardRecuperar">
                        <h3 className="text-center">Nueva contraseña</h3><br />
                            <form onSubmit={cambiarPassword}>
                                <div className="inputs">
                                <p>Ingrese la nueva contraseña</p>
                                <input type="password" className="form-control" value={DatosRestaurar.newPassword} required placeholder="Ingresa aqui tu respuesta" onChange={e=>setDatosRestaurar({...DatosRestaurar,newPassword:e.target.value})}/>
                                <p>Confirme su contraseña</p>
                                <input type="password" className="form-control" value={DatosRestaurar.confirmNewPassword} required placeholder="Ingresa aqui tu respuesta" onChange={e=>setDatosRestaurar({...DatosRestaurar,confirmNewPassword:e.target.value})}/>
                                </div>
                                <div className="divbotones">
                                    <input type="submit" className="btnlogin btn btn-primary " value="Guardar" disabled={DatosRestaurar.newPassword!=DatosRestaurar.confirmNewPassword?true:false}/>  
                                    <a className="btn btn-outline-danger btnCancelarR" href="/Login">Cancelar</a>
                                </div> 
                                {DatosRestaurar.newPassword!=DatosRestaurar.confirmNewPassword?(
                                <Alert className="m-3" variant="outlined" severity="warning">
                                        Las contraseñas no coinciden
                                </Alert>):null}
                                {viewError&&(
                                <Alert className="m-3" variant="outlined" severity="error">
                                        {msg}
                                </Alert>)}
                                {viewSuccess&&(
                                <Alert className="m-3" variant="outlined" severity="success">
                                       Contraseña cambiada correctamente, inicie sesion
                                </Alert>)}
                            </form>
                        </div>
                        

                    </div>
                );
                break;
            case 5:
                return(
                    <div className="container" id="FormRecuperar">
                        <div className="card shadow-sm mb-5 bg-body rounded" id="CardRecuperar">
                        <h3 className="text-center">Hemos enviado un enlace a su correo electronico, favor de comprobar</h3><br />
                            
                            <ArrowLeftCircle className="m-2" onClick={()=>setnumItem(1)} color="#AA0624" size={30} />
                        </div>
                    </div>
                )
            break;
        default:
            break;
    }
    
        
   
    
}
