function registro() {
    return (
      <div className="container" id="logincontainer">
        <div className="card" id="cardregistro">
            <p className="font-monospace text-center text-muted">Unete a KOgit</p>
            <h3 className="text-center">Crea tu cuenta</h3><br/>
            {/* Inicia el formulario de registro */}
              <form action="" method="POST">
                <div className="inputsRegistro">
                    <p >Nombre de usuario</p>
                    {/* input de Nombre de usuario */}
                    <input type="text" className=" inputlargo form-control" placeholder="Ejem: user1234" value="" name=""/><br/>
                    <p>Nombre</p>
                    {/* input de Nombre */}
                    <input type="text" className="form-control inputlargo" placeholder="Ejemp: Juan Perez" value="" name=""/> <br/>
                    <div className="row">
                        <div className="col">
                          <p>Correo</p>
                          <input type="email" className="form-control inputcorto" placeholder="Ejemp: 123@gmail.com " value="" name=""/>
                        </div><br/>
                        <div className="col">
                          <p>Telefono</p>
                          <input type="text" className="form-control inputcorto" placeholder="Ejemp: 125552555" value="" name=""/> 
                        </div> 
                    </div>
                    <br/>
                    <p>Contraseña</p>
                    {/* input de password */}
                    <input type="text" className="form-control inputlargo" placeholder="*****" value="" name=""/> <br/>
                    <div className="row"> 
                        <div className="col">
                          <p>Pregunta secreta</p>
                          {/* select de la pregunta secreta */}
                          <select className="form-select text-muted">
                              <option selected>Elige una opcion</option>
                              <option value="">¿Nombre de mi primera mascota?</option>
                          </select>
                        </div><br/>
                        <div className="col">
                          <p>Respuesta</p>
                          {/* input de Respuesta */}
                          <input type="text" className="form-control inputcorto" placeholder="Ejemp: Roody" value="" name=""/> 
                        </div> 
                    </div>
                </div>
                <div class="form-check">
                  {/* Aceptar politicas de privacidad */}
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                  <label class="form-check-label" for="flexCheckIndeterminate">
                    Aceptar politicas de privacidad
                  </label>
                </div><br/>
                <div className="divbotonesregistro">
                  {/* botones de registro y cancelacion */}
                    <input type="submit" className="btnlogin btn btn-primary " value="Registrarme" />  
                    <button className="btn btn-outline-danger btnlogin">Cancelar</button>
                </div>
            </form>
            <a className="link-primary text-center" href="#">¿Ya tienes una cuenta?, haz click aquí</a>
        </div>
      </div>
    );
  }
  
export default registro;
  