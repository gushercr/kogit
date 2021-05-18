import {Link} from 'react-router-dom';
function login() {
    return (
      <div className="container" id="registrocontainer">
        <div className="card shadow-sm mb-5 bg-body rounded" id="login">
            <h3 className="text-center">Inicia sesion</h3><br/>
              <form action="#" method="POST">
                <div className="inputs">
                    <p >Usuario</p>
                    <input type="text" className="form-control" placeholder="Ingresa tu usuario"  name=""/><br/>
                    <p>Contraseña</p>
                    <input type="password" className="form-control" placeholder="Ingresa tu contraseña"  name=""/> 
                </div>
                <div className="divbotones">
                    <input type="submit" className="btnlogin btn btn-primary " value="Iniciar sesion" />  
                    <button className="btn btn-outline-danger btnCancelar">Cancelar</button>
                </div>
                
            </form>
            <Link className="link-primary text-center" to="/Registro">¿No tienes una cuenta?, haz click aquí</Link>
        </div>
      </div>
    );
  }
  
export default login;
  