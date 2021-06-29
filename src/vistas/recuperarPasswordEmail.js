import React, { useState } from 'react';
import {URL_KOGIT,URL_RESTABLECER} from "../utils/constants";
import { Alert, AlertTitle } from '@material-ui/lab';

export default function RecuperarPasswordEmail () {
    const [DatosRestaurar, setDatosRestaurar] = useState({email:'',uid:"",pregunta:"",respuesta:"",newPassword:"",confirmNewPassword:"",key:""});
    const [viewError, setViewError] = useState(false);
    const [viewSuccess, setViewSuccess] = useState(false);
    const { match: { params } } = this.props;
    console.log(params.key)
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
            setViewError(true)
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
   
    
        
    return (
         <div className="container" id="FormRecuperar">
            <div className="card shadow-sm mb-5 bg-body rounded" id="CardRecuperar">
            <h3 className="text-center">Nueva contraseña</h3><br />
            {}
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
                            La contraseña debe contener al menos un caracter especial($@$!%*?&), una mayuscula y algun numero
                    </Alert>)}
                    {viewSuccess&&(
                    <Alert className="m-3" variant="outlined" severity="success">
                           Contraseña cambiada correctamente, inicie sesion
                    </Alert>)}
                </form>
            </div>
                        

         </div>
        );
      
    
    
        
   
    
}
