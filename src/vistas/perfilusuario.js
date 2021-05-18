import imgusuario from "./../multimedia/usuarios/imguserprueba.jpg";
import { PencilSquare,PersonFill,GeoAltFill,Twitter,Type,Globe,ShopWindow,Clipboard,KeyFill,ShieldLockFill } from 'react-bootstrap-icons';
function perfil() {
    return (
      <div className="container" id="perfil">
        <div className="row">
          <div className="col-3">
            <div className="col-12">
              <img src={imgusuario} className="imguser rounded-circle mx-auto d-block"/>
              <PencilSquare  size="36" className="mx-auto d-block editarimg"/>              
              <h3 className="text-center">Gushercr</h3>
            </div>
          </div>
          <div className="col-9">
            <div className="row datos">
              {/* inputs con los datos de usuarios */}
              <div className="col-4">
                <p>Usuario</p>
                <div class="input-group">
                  <span class="input-group-text"><PersonFill className="" color="#00000" size={18}/></span>
                  <input type="text" value="" class="form-control" placeholder="Username" disabled/>
                </div>
                <p>Ubicacion</p>
                <div class="input-group">
                  <span class="input-group-text"><GeoAltFill className="" color="#00000" size={18}/></span>
                  <input type="text" value="" class="form-control" placeholder="Ubicacion" disabled/>
                </div>
                <p>Twiter</p>
                <div class="input-group">
                  <span class="input-group-text"><Twitter className="" color="#00000" size={18}/></span>
                  <input type="text" value="" class="form-control" placeholder="@Twiter" disabled/>
                </div>
              </div>
              <div className="col-4">
                  <p>Nombre</p>
                  <div class="input-group">
                    <span class="input-group-text"><Type className="" color="#00000" size={18}/></span>
                    <input type="text" value="" class="form-control" placeholder="Nombre" disabled/>
                  </div>
                  <p>Compañia</p>
                  <div class="input-group">
                    <span class="input-group-text"><ShopWindow className="" color="#00000" size={18}/></span>
                    <input type="text" value="" class="form-control" placeholder="Kogit" disabled/>
                  </div>
                  <p>Sitio Web</p>
                  <div class="input-group">
                    <span class="input-group-text"><Globe className="" color="#00000" size={18}/></span>
                    <input type="text" value="" class="form-control" placeholder="WWW.Kogit.com" disabled/>
                  </div>
              </div>
              <div className="col-4 datos">
                <button className="btn btn-secondary"><Clipboard className="iconseditarbtn" color="#fff" size={18}/>Editar mis datos</button>
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
                <form method="POST" action="">
                    <p>Contraseña</p>
                    <div class="input-group">
                        <span class="input-group-text"><KeyFill className="" color="#00000" size={18}/></span>
                        <input type="text" value="" class="form-control" placeholder="Contraseña actual" />
                    </div>
                    <p>Nueva contraseña</p>
                    <div class="input-group">
                        <span class="input-group-text"><KeyFill className="" color="#00000" size={18}/></span>
                        <input type="text" value="" class="form-control" placeholder="Nueva contraseña" />
                    </div>
                    <p>Confirmar contraseña</p>
                    <div class="input-group">
                        <span class="input-group-text"><KeyFill className="" color="#00000" size={18}/></span>
                        <input type="text" value="" class="form-control" placeholder="confirma la nueva contraseña" />
                    </div>
                    <input type="button" className="btn btn-primary btneditar" value="Guardar"/>
                    <button className="btn btn-danger btneditar" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default perfil;
  