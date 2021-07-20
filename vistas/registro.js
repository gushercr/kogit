import {Link} from 'react-router-dom';
import { Component } from 'react';

export default class registro extends Component{
  state={
    nombre:'',
    username:'',
    password:'',
    email:'',
    telefono:'',
    message:'',
    alert:false,
    class:'',
    preguntas:[{pregunta:"Nombre?"},{pregunta:"comida favorita?"}],
    pregunta:'',
    respuesta:'',
    agree:false,
    infoinput:'',
    info:false

  }
  onSubmit=async e=>{
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", this.state.nombre);
    urlencoded.append("username", this.state.username);
    urlencoded.append("password", this.state.password);
    urlencoded.append("email", this.state.email);
    urlencoded.append("telefono", this.state.telefono);
    urlencoded.append("pregunta",this.state.pregunta);
    urlencoded.append("respuesta",this.state.respuesta);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    const res = await fetch("https://kogit2.herokuapp.com/session/signup", requestOptions)
      .then(response =>response.json())
      .then(result=>result) 
      .catch(error => console.log('error', error));
    if (res.ok==true) {
      let mensajes=[{}];
      mensajes.push({mensaje:'Registro exitoso, ya puede iniciar sesion'});
      this.setState({message:mensajes,alert:true,class:'alert alert-success'})
      
      setTimeout(() => {
        this.props.history.push('/Login')
      }, 5000);
    }else{
        const errors=res.errors;
        let mensajes=[{}];
        for (const numobj in errors) {
          mensajes.push({mensaje:errors[numobj].msg});
        }
        this.setState({message:mensajes,alert:true,class:'alert alert-danger'})
        
    }
  }
 
  render(){ 
    return (
      
      <div className="container" id="logincontainer">
        <div className="card" id="cardregistro">
            <p className="font-monospace text-center text-muted">Unete a KOgit</p>
            <h3 className="text-center">Crea tu cuenta</h3><br/>
            {/* Inicia el formulario de registro */}
              <form onSubmit={this.onSubmit}>
                <div className="inputsRegistro">
                    <p >Nombre de usuario</p>
                    {/* input de Nombre de usuario */}
                    <input type="text" className="inputlargo form-control" onFocus={(e) => {this.setState({infoinput:'El nombre de usuario debe tener de 6 a 18 caracteres',info:true})}}  placeholder="Ejem: user1234" onChange={this.onChangeUsername=(e)=>{this.setState({username:e.target.value})}}/><br/>
                    <p>Nombre</p>
                    {/* input de Nombre */}
                    <input type="text" className="form-control inputlargo" onFocus={(e) => {this.setState({infoinput:'El nombre debe tener de 6 a caracteres',info:true})}} placeholder="Ejemp: Juan Perez" onChange={this.onChangeUsername=(e)=>{this.setState({nombre:e.target.value})}}/> <br/>
                    <div className="row">
                        <div className="col">
                          <p>Correo</p>
                          <input type="email" className="form-control inputcorto" placeholder="Ejemp: 123@gmail.com " onChange={this.onChangeUsername=(e)=>{this.setState({email:e.target.value})}}/>
                        </div><br/>
                        <div className="col">
                          <p>Telefono</p>
                          <input type="text" className="form-control inputcorto" placeholder="Ejemp: +00 125552555" onFocus={(e) => {this.setState({infoinput:'El telefono debe de contener lada y numero de telefono',info:true})}} onChange={this.onChangeUsername=(e)=>{this.setState({telefono:e.target.value})}}/> 
                        </div> 
                    </div>
                    <br/>
                    <p>Contraseña</p>
                    {/* input de password */}
                    <input type="password" className="form-control inputlargo" placeholder="*****" onFocus={(e) => {this.setState({infoinput:'La contraseña debe contener al menos un caracter especial($@$!%*?&), una mayuscula y algun numero',info:true})}} onChange={this.onChangeUsername=(e)=>{this.setState({password:e.target.value})}}/> <br/>
                    <div className="row"> 
                        <div className="col">
                          <p>Pregunta secreta</p>
                          {/* select de la pregunta secreta */}
                          <select className="form-select text-muted" onChange={this.onChangePregunta=(e)=>{this.setState({pregunta:e.target.value})}}>
                              <option selected disabled>Elige una opcion</option>
                              {this.state.preguntas.map((a) => (
                                  <option value={a.pregunta}>{a.pregunta}</option>
                              ))}
                          </select>
                        </div><br/>
                        <div className="col">
                          <p>Respuesta</p>
                          {/* input de Respuesta */}
                          <input type="text" className="form-control inputcorto" onFocus={(e) => {this.setState({infoinput:'La respuesta debe tener de 3 a 20 caracteres',info:true})}} onChange={this.onChangeUsername=(e)=>{this.setState({password:e.target.value})}}  onChange={this.onChangeRespuesta=(e)=>{this.setState({respuesta:e.target.value})}} placeholder="Ejemp: Roody"/> 
                        </div> 
                    </div>
                </div>
                <div class="form-check">
                  {/* Aceptar politicas de privacidad */}
                  <input class="form-check-input" type="checkbox" checked={this.state.agree} onChange={this.onChangeCheckbox=(e)=>{this.setState({agree:!this.state.agree})}} id="flexCheckIndeterminate"/>
                  <label class="form-check-label" for="flexCheckIndeterminate">
                    Aceptar politicas de privacidad
                  </label>
                </div><br/>
                <div className="divbotonesregistro">
                  {/* botones de registro y cancelacion */}
                    <input type="submit" className="btnlogin btn btn-primary " value="Registrarme" disabled={!this.state.agree} />  
                    <button className="btn btn-outline-danger btnlogin">Cancelar</button>
                </div>
              </form>      
            <Link className="link-primary text-center" to="/Login">¿Ya tienes una cuenta?, haz click aquí</Link>
            {this.state.info&&<div className="alert alert-primary" role="alert">{this.state.infoinput}</div>}
            {this.state.alert&&<div className={this.state.class} role="alert">{this.state.message.map((a) => (<p className="text-center">{a.mensaje}</p>))}</div>}

        </div>
      </div>
    )
  }
}