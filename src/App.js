import Inicio from'./vistas/Inicio';
import Login from'./vistas/login';
import Registro from'./vistas/registro';
import Perfil from'./vistas/perfilusuario';
import Header from'./componentes/header';
import Footer from'./componentes/footer';
import PageNotFound from './vistas/PageNotFound';
import recuperarPassword from './vistas/recuperarPassword';
import Publicaciones from '../src/vistas/publicaciones'
import NPost from '../src/vistas/nuevoPost'
import Post from './vistas/Post';
import ResultBusqueda from './vistas/resultBusquda';
import RecuperarPasswordEmail from './vistas/recuperarPasswordEmail';
// import name from './vistas/resultBusquda';
import './css/styles.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PerfilUsuarioE from './vistas/PerfilUsuarioE';





export default function App() {
  return (
    <div id="body">
      <Router>
        <Header />
        <Switch>
          <Route path="/Registro" component={Registro}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Perfil/:id" component={PerfilUsuarioE}/>
          <Route path="/Perfil" component={Perfil}/>
          <Route path="/Recuperar?key=:key" component={RecuperarPasswordEmail}/>
          <Route path="/Recuperar" component={recuperarPassword}/>
          <Route path="/Publicaciones" component={Publicaciones}/>
          <Route path="/Post" component={Post}/>
          <Route path="/NuevoPost" component={NPost}/>
          <Route path="/ResultBusqueda" component={ResultBusqueda}/>
          <Route path="/" component={Inicio} exact/>
          <Route path="*" component={PageNotFound}/>         
        </Switch>
        <Footer />
      </Router>
      
    </div>
  );
}   


