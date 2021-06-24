import React, { useState } from 'react';
import {URL_KOGIT} from "../utils/constants";
export default function RecuperarPassword () {
    const [DatosRestaurar, setDatosRestaurar] = useState({email:'',uid:"",pregunta:"",respuesta:"",newPassword:""});
    const [dato, setstatedato] = useState('');
    var verificarCorreo=async e=>{
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", DatosRestaurar.email);
        console.log("aguanta")
        var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
        };
        const url=`${URL_KOGIT}recovery/verificarEmail`
        await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    const [numItem, setnumItem] = useState(1);
    if (numItem==1) {
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
                            <button className="btn btn-outline-danger btnCancelarR">Cancelar</button>
                        </div>
                        
                    </form>
                </div>
                {DatosRestaurar.uid}
            </div>
        );
    }
        
   
    
}
